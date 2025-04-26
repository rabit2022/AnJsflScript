# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : 02.py
# @Time    : 2025/04/27 0:57
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import logging
import shutil
from pathlib import Path

from my_base.folder_copier import FolderCopier, CopyResult
from my_base.folder_traverser import FolderTraverser

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# 源文件夹和目标文件夹
src_folder = Path(r'F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript')
dst_folder = Path("backup_folder")

# 确保目标文件夹存在
dst_folder.mkdir(parents=True, exist_ok=True)


# 打印进度信息的回调函数
def print_progress(result: CopyResult):
    logging.info(f"Copied: {result.copied}, Skipped: {result.skipped}")


# 使用 FolderCopier 复制文件夹
copier = FolderCopier(
    exclude_patterns=["node_modules", 'dp', 'test', '.idea', 'types', 'lib', 'FirstRun'],
    # allowed_extensions=[".jsfl"],
    # max_depth=2
)
result = copier.copy(
    src=src_folder,
    dst=dst_folder,
    progress_callback=print_progress
)

logging.info(f"Copy result: {result}")

# 复制 FirstRun.jsfl 文件
FirstRun_src = src_folder / "FirstRun.jsfl"
FirstRun_dst = dst_folder / "@FirstRun.jsfl"
shutil.copy(FirstRun_src, FirstRun_dst)
logging.info(f"FirstRun copied to: {FirstRun_dst}")


# 复制 lib 文件夹中的文件
def get_dst_path(src: Path, dst_base: Path) -> Path:
    base_name = src.name
    if base_name.startswith("#"):
        return None
    return dst_base / ("[AnJsflScript]" + base_name)


# 使用 FolderTraverser 遍历文件
ft = FolderTraverser(src_folder / "lib", exclude_folders=["排兵布阵_字符画", "02.排兵布阵"])
file_paths = ft.FilePaths

dst_paths = [get_dst_path(Path(src), dst_folder) for src in file_paths]


# 复制文件
def copy_file(src: Path, dst: Path):
    if src is None or dst is None:
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(src, dst)
    logging.info(f"Copied: {src} -> {dst}")


for file_path, dst_path in zip(file_paths, dst_paths):
    copy_file(file_path, dst_path)


# 复制特定文件夹
def get_last_two_segments(full_path: Path) -> Path:
    parts = full_path.parts
    if len(parts) >= 2:
        return dst_folder / parts[-2] / f"[AnJsflScript]{parts[-1]}"
    raise ValueError("路径中没有足够的部分来提取最后两节")


tr = FolderTraverser(src_folder, include_folders=["排兵布阵_字符画", "02.排兵布阵"])
file_paths = tr.FilePaths

dst_paths = [get_last_two_segments(Path(src)) for src in file_paths]

for file_path, dst_path in zip(file_paths, dst_paths):
    copy_file(file_path, dst_path)
