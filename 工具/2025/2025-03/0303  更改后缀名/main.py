# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : main.py
# @Time    : 2025/03/03 16:27
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import os

from my_base.folder_traverser import FolderTraverser


def rename_files_to_lowercase_extension(files):
    """
    将文件路径列表中的文件后缀名从 .JS 改为 .js
    """
    for file_path in files:
        # 检查文件名是否以 .JS 结尾
        if file_path.endswith('.js'):
            # 构造新的文件路径
            new_file_path = file_path.replace('.js', '.jsfl')
            # 重命名文件
            os.rename(file_path, new_file_path)
            print(f"Renamed: {file_path} -> {new_file_path}")


if __name__ == '__main__':
    folder_traverser = FolderTraverser(
        r'F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Third\core-js-3.41.0',
        include_extensions=['.js'],
        # max_depth=5,
    )

    files = folder_traverser.FilePathList;

    # 调用函数
    rename_files_to_lowercase_extension(files)
