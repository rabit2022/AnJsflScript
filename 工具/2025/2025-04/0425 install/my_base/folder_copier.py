import os
import shutil
from typing import List, Optional, Callable


def is_path_excluded(path: str, exclude_patterns: List[str]) -> bool:
    """
    检查路径是否在排除列表中。
    
    :param path: 要检查的路径。
    :param exclude_patterns: 排除模式列表。
    :return: 如果路径包含在排除模式中，返回 True；否则返回 False。
    """
    return any(pattern in path for pattern in exclude_patterns)


def is_path_included(path: str, include_patterns: Optional[List[str]]) -> bool:
    """
    检查路径是否在包含列表中。
    
    :param path: 要检查的路径。
    :param include_patterns: 包含模式列表，如果为 None，则默认包含所有路径。
    :return: 如果路径包含在包含模式中，返回 True；否则返回 False。
    """
    return not include_patterns or any(pattern in path for pattern in include_patterns)


def has_valid_extension(filename: str, allowed_extensions: Optional[List[str]]) -> bool:
    """
    检查文件扩展名是否有效。
    
    :param filename: 文件名。
    :param allowed_extensions: 允许的扩展名列表，如果为 None，则默认允许所有扩展名。
    :return: 如果文件扩展名在允许的扩展名列表中，返回 True；否则返回 False。
    """
    return not allowed_extensions or os.path.splitext(filename)[1].lower() in allowed_extensions


def validate_paths(src: str, dst: str):
    """
    验证源路径和目标路径。
    
    :param src: 源路径。
    :param dst: 目标路径。
    :raises FileNotFoundError: 如果源路径不存在。
    :raises ValueError: 如果源路径和目标路径相同。
    """
    if not os.path.exists(src):
        raise FileNotFoundError(f"源路径不存在: {src}")
    if os.path.abspath(src) == os.path.abspath(dst):
        raise ValueError("源路径和目标路径不能相同")


def prepare_destination(dst_path: str):
    """
    准备目标目录。
    
    :param dst_path: 目标路径。
    """
    os.makedirs(dst_path, exist_ok=True)


class CopyResult:
    """
    用于存储文件夹复制的结果。
    """

    def __init__(self):
        """
        初始化 CopyResult 对象。
        """
        self.status = "success"  # 复制状态
        self.copied = 0  # 已复制的文件数
        self.skipped = 0  # 已跳过的文件数
        self.errors = []  # 错误信息列表

    def __str__(self):
        """
        返回格式化的结果字符串。
        """
        border = "=" * 40
        lines = [
            border,
            "文件夹复制结果报告",
            "-" * 40,
            f"状态: {self.status.upper()}",
            f"已复制文件: {self.copied}",
            f"已跳过文件: {self.skipped}"
        ]
        if self.errors:
            lines.extend(["-" * 40, "错误列表:"])
            lines.extend(f"  {i + 1}. {err}" for i, err in enumerate(self.errors))
        lines.append(border)
        return "\n".join(lines)

    def add_error(self, error_msg: str):
        """
        添加错误信息并更新状态。
        
        :param error_msg: 错误信息。
        """
        self.status = "error"
        self.errors.append(error_msg)

    def increment_copied(self):
        """
        增加已复制文件数。
        """
        self.copied += 1

    def increment_skipped(self):
        """
        增加已跳过文件数。
        """
        self.skipped += 1


class FolderCopier:
    """
    用于复制文件夹的类。
    """

    def __init__(
            self,
            *,
            exclude_patterns: Optional[List[str]] = None,
            allowed_extensions: Optional[List[str]] = None,
            include_patterns: Optional[List[str]] = None,
            max_depth: Optional[int] = None
    ):
        """
        初始化 FolderCopier 对象。
        
        :param exclude_patterns: 排除模式列表。
        :param allowed_extensions: 允许的扩展名列表。
        :param include_patterns: 包含模式列表。
        :param max_depth: 最大递归深度。
        """
        self.exclude_patterns = exclude_patterns or []
        self.allowed_extensions = [ext.lower() for ext in allowed_extensions] if allowed_extensions else None
        self.include_patterns = include_patterns or []
        self.max_depth = max_depth

    def copy(
            self,
            src: str,
            dst: str,
            progress_callback: Optional[Callable[[CopyResult], None]] = None
    ) -> CopyResult:
        """
        执行文件夹复制。
        
        :param src: 源路径。
        :param dst: 目标路径。
        :param progress_callback: 进度回调函数，用于实时更新进度。回调函数的参数是 CopyResult 对象。
        :return: CopyResult 对象，包含复制结果。
        """
        result = CopyResult()

        try:
            validate_paths(src, dst)
            self._copy_contents(
                src, dst,
                current_depth=0,
                result=result,
                progress_callback=progress_callback
            )
        except Exception as e:
            result.add_error(str(e))

        return result

    def _copy_contents(
            self,
            src_path: str,
            dst_path: str,
            current_depth: int,
            result: CopyResult,
            progress_callback: Optional[Callable[[CopyResult], None]]
    ):
        """
        复制目录内容。
        
        :param src_path: 源目录路径。
        :param dst_path: 目标目录路径。
        :param current_depth: 当前递归深度。
        :param result: CopyResult 对象，用于存储复制结果。
        :param progress_callback: 进度回调函数。
        """
        if self.max_depth and current_depth > self.max_depth:
            return

        prepare_destination(dst_path)

        for item in os.listdir(src_path):
            item_src = os.path.join(src_path, item)
            item_dst = os.path.join(dst_path, item)
            relative_path = os.path.relpath(item_src, src_path)

            if self._should_skip(item_src, relative_path, item):
                result.increment_skipped()
                if progress_callback:
                    progress_callback(result)
                continue

            if os.path.isdir(item_src):
                self._copy_contents(
                    item_src, item_dst,
                    current_depth + 1,
                    result, progress_callback
                )
            else:
                try:
                    shutil.copy2(item_src, item_dst)
                    result.increment_copied()
                    if progress_callback:
                        progress_callback(result)
                except Exception as e:
                    result.add_error(f"复制文件 {item_src} 时出错: {e}")

    def _should_skip(
            self,
            full_path: str,
            relative_path: str,
            filename: str
    ) -> bool:
        """
        判断是否应该跳过当前项。
        
        :param full_path: 完整路径。
        :param relative_path: 相对路径。
        :param filename: 文件名。
        :return: 如果应该跳过，返回 True；否则返回 False。
        """
        return (
                is_path_excluded(relative_path, self.exclude_patterns) or
                not is_path_included(relative_path, self.include_patterns) or
                (not os.path.isdir(full_path) and
                 not has_valid_extension(filename, self.allowed_extensions))
        )


class FolderCopierBuilder:
    """
    FolderCopier 的建造者类，用于逐步构建 FolderCopier 实例。
    """

    def __init__(self):
        """
        初始化建造者类。
        """
        self.exclude_patterns = None
        self.allowed_extensions = None
        self.include_patterns = None
        self.max_depth = None

    def set_exclude_patterns(self, patterns: List[str]):
        """
        设置排除模式。
        
        :param patterns: 排除模式列表。
        :return: 当前建造者实例。
        """
        self.exclude_patterns = patterns
        return self

    def set_allowed_extensions(self, extensions: List[str]):
        """
        设置允许的文件扩展名。
        
        :param extensions: 允许的扩展名列表。
        :return: 当前建造者实例。
        """
        self.allowed_extensions = extensions
        return self

    def set_include_patterns(self, patterns: List[str]):
        """
        设置包含模式。
        
        :param patterns: 包含模式列表。
        :return: 当前建造者实例。
        """
        self.include_patterns = patterns
        return self

    def set_max_depth(self, depth: int):
        """
        设置最大递归深度。
        
        :param depth: 最大递归深度。
        :return: 当前建造者实例。
        """
        self.max_depth = depth
        return self

    def build(self) -> 'FolderCopier':
        """
        构建并返回 FolderCopier 实例。
        
        :return: FolderCopier 实例。
        """
        return FolderCopier(
            exclude_patterns=self.exclude_patterns,
            allowed_extensions=self.allowed_extensions,
            include_patterns=self.include_patterns,
            max_depth=self.max_depth
        )


# 使用示例
if __name__ == "__main__":
    def print_progress(result: CopyResult):
        """
        打印进度信息。
        
        :param result: CopyResult 对象，包含当前的复制结果。
        """
        print(f"\rCopied: {result.copied}, Skipped: {result.skipped}", end="")


    copier = FolderCopier(
        exclude_patterns=["node_modules", 'dp', 'test', '.idea', 'types', 'lib', 'FirstRun'],
        # allowed_extensions=[".jsfl"],
        # max_depth=2
    )

    src_folder = r'F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript'
    result = copier.copy(
        src=src_folder,
        dst="backup_folder",
        progress_callback=print_progress
    )

    print(f"\n{result}")
