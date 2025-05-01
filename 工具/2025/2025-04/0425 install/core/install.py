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

import logging
import os
import shutil
import sys
from pathlib import Path

from my_base.folder_copier import FolderCopier, CopyResult
from my_base.folder_traverser import FolderTraverser

from core.get_an_command import get_AnJsflScript_target


def get_program_path():
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        # 打包后的程序
        program_dir = sys._MEIPASS
    else:
        # 未打包的脚本
        program_dir = os.path.dirname(os.path.abspath(__file__))
    return program_dir


def get_executable_directory():
    # 获取可执行文件的绝对路径
    executable_path = os.path.abspath(sys.argv[0])
    # 获取可执行文件所在的目录
    executable_dir = os.path.dirname(executable_path)
    return executable_dir


def install():
    # 配置日志
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    # 源文件夹和目标文件夹
    # src_folder = Path(r'F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript')
    src_folder = Path(get_executable_directory())
    logging.info("src_folder", src_folder)
    logging.info(get_program_path())

    FirstRun_src = src_folder / "FirstRun.jsfl"
    if not os.path.exists(FirstRun_src):
        logging.info("没有FirstRun玩家，非项目路径")
        return False

    # dst_folder = Path("backup_folder")
    AnJsflScript = get_AnJsflScript_target()
    dst_folder = Path(AnJsflScript)

    # 确保目标文件夹存在
    dst_folder.mkdir(parents=True, exist_ok=True)

    # 打印进度信息的回调函数
    def print_progress(result: CopyResult):
        logging.info(f"Copied: {result.copied}, Skipped: {result.skipped}")

    # 使用 FolderCopier 复制文件夹
    copier = FolderCopier(
        exclude_patterns=["node_modules", 'dp', 'test', '.idea', 'types', 'lib', 'FirstRun']
    )
    result = copier.copy(
        src=src_folder,
        dst=dst_folder,
        progress_callback=print_progress
    )

    logging.info(f"Copy result: {result}")

    # FirstRun -> @FirstRun
    FirstRun_src = src_folder / "FirstRun.jsfl"
    FirstRun_dst = dst_folder / "@FirstRun.jsfl"
    shutil.copy(FirstRun_src, FirstRun_dst)
    logging.info(f"FirstRun copied to: {FirstRun_dst}")

    # lib----直接分到AnJsflSript文件夹下面
    def get_dst_path(src: Path, dst_base: Path) -> Path:
        base_name = src.name
        if base_name.startswith("#"):
            return None
        return dst_base / ("[AnJsflScript]" + base_name)

    ft = FolderTraverser(src_folder / "lib", exclude_folders=["排兵布阵_字符画", "02.排兵布阵"])
    file_paths = ft.FilePaths

    dst_paths = [get_dst_path(Path(src), dst_folder) for src in file_paths]

    def copy_file(src: Path, dst: Path):
        if src is None or dst is None:
            return
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(src, dst)
        logging.info(f"Copied: {src} -> {dst}")

    for file_path, dst_path in zip(file_paths, dst_paths):
        copy_file(file_path, dst_path)

    # "排兵布阵_字符画", "02.排兵布阵" ----直接移动文件夹
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

    return True


if __name__ == '__main__':
    install()
