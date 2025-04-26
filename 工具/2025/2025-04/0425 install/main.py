# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : main.py
# @Time    : 2025/04/25 23:15
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

"""
AnJsflScript  项目的安装比较复杂
3. 文件依赖问题，
    先全部复制一遍，再把lib文件夹单独处理
1. an命令,只支持Command文件夹下的一层jsfl文件
    需要把lib文件夹下的命令，全部放到AnJsflScript文件夹
2. 顺序问题，FirstRun必须在第一个，lib文件夹需要排序
    @FirstRun
    [AnJsflScript]
    #  未完成，删除
4. 项目所在文件夹，
    getcwd
"""
import os.path
import shutil
from pathlib import Path

from my_base.folder_copier import FolderCopier, CopyResult
from my_base.folder_traverser import FolderTraverser

src_folder = r'F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript'
dst_folder = "backup_folder"


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
result = copier.copy(
    src=src_folder,
    dst=dst_folder,
    progress_callback=print_progress
)

print(f"\n{result}")

# FirstRun -> @FirstRun
FirstRun_src = os.path.join(src_folder, "FirstRun.jsfl")
FirstRun_dst = os.path.join(dst_folder, "@FirstRun.jsfl")
shutil.copy(FirstRun_src, FirstRun_dst)

print("FirstRun:", FirstRun_dst)

# lib
Lib_src = os.path.join(src_folder, "lib")
Lib_dst = dst_folder

ft = FolderTraverser(Lib_src, exclude_folders=["排兵布阵_字符画", "02.排兵布阵"])
file_paths = ft.FilePaths


def getDstPath(src):
    base_name = os.path.basename(src)
    if base_name.startswith("#"):
        return None
    dst = os.path.join(Lib_dst, "[AnJsflScript]" + base_name)
    return dst


dst_paths = list(map(getDstPath, file_paths))

for file_path, dst_path in zip(file_paths, dst_paths):
    # print(file_path, dst_path)
    if file_path is None or dst_path is None:
        continue

    # 获取目标路径的父目录
    dst_dir = os.path.dirname(dst_path)

    # 如果目标目录不存在，则递归创建
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
        print(f"创建了目录：{dst_dir}")

    shutil.copy(file_path, dst_path)

# "排兵布阵_字符画", "02.排兵布阵"    复制文件夹
tr = FolderTraverser(src_folder, include_folders=["排兵布阵_字符画", "02.排兵布阵"])
file_paths = tr.FilePaths


def get_last_two_segments(full_path):
    # 将字符串路径转换为 Path 对象
    path = Path(full_path)

    # 获取所有部分
    parts = path.parts

    # 提取最后两节
    if len(parts) >= 2:
        last_two_segments = os.path.join(dst_folder, parts[-2], '[AnJsflScript]' + parts[-1])
        return last_two_segments
    else:
        raise ValueError("路径中没有足够的部分来提取最后两节")


dst_paths = list(map(get_last_two_segments, file_paths))

for file_path, dst_path in zip(file_paths, dst_paths):
    print(file_path, dst_path)
    if file_path is None or dst_path is None:
        continue

    # 获取目标路径的父目录
    dst_dir = os.path.dirname(dst_path)

    # 如果目标目录不存在，则递归创建
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
        print(f"创建了目录：{dst_dir}")

    shutil.copy(file_path, dst_path)
