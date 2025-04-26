from pathlib import Path
from typing import Optional, Union, List, Callable, Tuple

from my_base.files import Files
from my_base.print_color import print_color, TextColor

CREATE_COLOR = TextColor.YELLOW
WARNNING_COLOR = TextColor.RED

PATH = Union[str, Path]
PATH_LIST = List[str]
CALLBACK_FUNC = Callable[[str], str]


def get_relative_path_tuple(base_path: Path, absolute_path: Path) -> Tuple:
    """
    计算给定的绝对路径相对于 base_path 的相对路径，并将其分割为元组。

    :param base_path: 基础路径
    :param absolute_path: 要处理的绝对路径
    :return: 相对路径的元组形式
    """
    relative_path = absolute_path.relative_to(base_path)
    return tuple(relative_path.parts)


def is_valid_extension(file_path: Path, extensions: Optional[PATH_LIST] = None) -> bool:
    """
    检查文件扩展名是否有效。

    :param file_path: 文件路径
    :param extensions: 允许的扩展名列表
    :return: 是否有效
    """
    return extensions is None or (file_path.suffix and file_path.suffix in extensions)


def is_excluded_extension(file_path: Path, exclude_extensions: Optional[PATH_LIST] = None) -> bool:
    """
    检查文件扩展名是否在排除列表中。

    :param file_path: 文件路径
    :param exclude_extensions: 排除的文件扩展名列表
    :return: 是否被排除
    """
    return exclude_extensions is not None and file_path.suffix in exclude_extensions


def easy_create_file(file_path: PATH, file_content: str = ""):
    """
    创建文件并写入内容。

    :param file_path: 文件路径
    :param file_content: 文件内容
    """
    with open(file_path, 'w', encoding="utf-8") as file:
        file.write(file_content)
    print_color(f"文件 '{file_path}' 已经创建。", CREATE_COLOR)


class FolderTraverser:
    """
    文件夹遍历器，只包含文件。
    """

    def __init__(self, folder_path: PATH,
                 include_extensions: Optional[PATH_LIST] = None,
                 exclude_extensions: Optional[PATH_LIST] = None,
                 include_folders: Optional[PATH_LIST] = None,
                 exclude_folders: Optional[PATH_LIST] = None,
                 max_depth: int = -1,
                 include_full_path: bool = True,
                 callbacks: Optional[CALLBACK_FUNC] = None):
        """
        初始化 FolderTraverser 类。

        :param folder_path: 要遍历的文件夹路径
        :param include_extensions: 允许的文件扩展名列表
        :param exclude_folders: 排除的文件夹名称列表
        :param exclude_extensions: 排除的文件扩展名列表
        :param max_depth: 最大遍历深度，-1 表示无限制
        :param include_full_path: 是否返回文件的完整路径
        :param callbacks: 回调函数，用于处理每个文件路径
        """
        self.folder_path = Path(folder_path)

        self.include_extensions = include_extensions
        self.exclude_extensions = exclude_extensions if exclude_extensions else []

        self.include_folders = include_folders
        self.exclude_folders = exclude_folders if exclude_folders else []

        self.max_depth = max_depth
        self.include_full_path = include_full_path
        self.callbacks = callbacks

    def traverse_folder(self, current_path: Path, file_paths: PATH_LIST):
        """
        遍历文件夹。

        :param current_path: 当前路径
        :param file_paths: 文件路径列表
        """
        for file_path in current_path.iterdir():
            try:
                folder_tuple = get_relative_path_tuple(self.folder_path, file_path)
                current_depth = len(folder_tuple)

                # 最大深度限制
                if self.max_depth != -1 and current_depth >= self.max_depth:
                    continue

                if file_path.is_file():
                    # 扩展名
                    if is_excluded_extension(file_path, self.exclude_extensions) or \
                            not is_valid_extension(file_path, self.include_extensions):
                        continue

                    if self.include_folders is not None:
                        # 设置的文件夹列表
                        for include_folder in self.include_folders:
                            if include_folder in str(file_path):
                                full_path = str(file_path) if self.include_full_path else file_path.name
                                file_paths.append(full_path)
                    else:
                        full_path = str(file_path) if self.include_full_path else file_path.name
                        file_paths.append(full_path)
                elif file_path.is_dir():
                    # 排除文件夹列表
                    for exclude_folder in self.exclude_folders:
                        if exclude_folder in str(current_path):
                            return

                    self.traverse_folder(file_path, file_paths)
            except OSError as e:
                print_color(f"无法访问 {file_path}: {e}", WARNNING_COLOR)

    @property
    def FilePaths(self) -> PATH_LIST:
        """
        获取文件路径列表。

        :return: 文件路径列表
        """
        file_paths = []
        self.traverse_folder(self.folder_path, file_paths)

        if self.callbacks:
            file_paths = [self.callbacks(path) for path in file_paths]

        return file_paths

    def ElementAt(self, index: int) -> PATH:
        """
        获取指定索引的文件路径。

        :param index: 索引
        :return: 文件路径
        """
        return self.FilePaths[index]

    __getitem__ = ElementAt

    def clear_folder_files_content(self):
        """
        清空文件夹中所有文件的内容。
        """
        fpaths = self.FilePaths
        for file_path in fpaths:
            self.clear_file_content(file_path)

    def clear_file_content(self, file_path: PATH):
        """
        清空文件内容。

        :param file_path: 文件路径
        """
        easy_create_file(file_path)

    def toFiles(self) -> Files:
        """
        将文件路径列表转换为 Files 对象。

        :return: Files 对象
        """
        return Files(self.FilePaths)


class FolderTraverserBuilder:
    """
    FolderTraverser 的建造者类，用于逐步构建 FolderTraverser 对象。
    """

    def __init__(self, folder_path: PATH):
        """
        初始化建造者。

        :param folder_path: 要遍历的文件夹路径
        """
        self.folder_path = folder_path
        self.extensions = None
        self.exclude_folders = None
        self.exclude_extensions = None
        self.max_depth = -1
        self.include_full_path = True
        self.callbacks = None

    def with_extensions(self, extensions: PATH_LIST) -> 'FolderTraverserBuilder':
        """
        设置允许的文件扩展名列表。

        :param extensions: 允许的文件扩展名列表
        :return: 当前建造者对象
        """
        self.extensions = extensions
        return self

    def with_exclude_folders(self, exclude_folders: PATH_LIST) -> 'FolderTraverserBuilder':
        """
        设置排除的文件夹名称列表。

        :param exclude_folders: 排除的文件夹名称列表
        :return: 当前建造者对象
        """
        self.exclude_folders = exclude_folders
        return self

    def with_exclude_extensions(self, exclude_extensions: PATH_LIST) -> 'FolderTraverserBuilder':
        """
        设置排除的文件扩展名列表。

        :param exclude_extensions: 排除的文件扩展名列表
        :return: 当前建造者对象
        """
        self.exclude_extensions = exclude_extensions
        return self

    def with_max_depth(self, max_depth: int) -> 'FolderTraverserBuilder':
        """
        设置最大遍历深度。

        :param max_depth: 最大遍历深度，-1 表示无限制
        :return: 当前建造者对象
        """
        self.max_depth = max_depth
        return self

    def with_include_full_path(self, include_full_path: bool) -> 'FolderTraverserBuilder':
        """
        设置是否返回文件的完整路径。

        :param include_full_path: 是否返回文件的完整路径
        :return: 当前建造者对象
        """
        self.include_full_path = include_full_path
        return self

    def with_callbacks(self, callbacks: CALLBACK_FUNC) -> 'FolderTraverserBuilder':
        """
        设置回调函数。

        :param callbacks: 回调函数，用于处理每个文件路径
        :return: 当前建造者对象
        """
        self.callbacks = callbacks
        return self

    def build(self) -> FolderTraverser:
        """
        构建 FolderTraverser 对象。

        :return: FolderTraverser 对象
        """
        return FolderTraverser(
            folder_path=self.folder_path,
            include_extensions=self.extensions,
            exclude_folders=self.exclude_folders,
            exclude_extensions=self.exclude_extensions,
            max_depth=self.max_depth,
            include_full_path=self.include_full_path,
            callbacks=self.callbacks
        )


if __name__ == '__main__':
    # 定义回调函数
    def my_callback(path: str) -> str:
        # 这里可以定义回调逻辑
        return path  # 示例：直接返回路径


    # 使用建造者模式构建 FolderTraverser 对象
    folder_traverser = FolderTraverserBuilder(folder_path=r'F:\01_programme\python\files\files_pro') \
        .with_extensions(['.txt', '.md', '.py']) \
        .with_exclude_folders(['temp', 'exclude_folder']) \
        .with_exclude_extensions(['.log']) \
        .with_max_depth(2) \
        .with_callbacks(my_callback) \
        .build()

    # 获取文件路径列表并打印
    file_paths = folder_traverser.FilePaths
    print("文件路径列表：")
    for path in file_paths:
        print(path)
