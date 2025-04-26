# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : 0423  复制文件夹.py
# @Time    : 2025/04/23 22:19
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import os
import shutil

def copy_entire_folder(src_folder, dst_folder):
    """
    递归复制整个文件夹及其子文件夹
    :param src_folder: 源文件夹路径
    :param dst_folder: 目标文件夹路径
    """
    # 确保源文件夹存在
    if not os.path.exists(src_folder):
        raise FileNotFoundError(f"源文件夹 {src_folder} 不存在")

    # 如果目标文件夹不存在，创建它
    if not os.path.exists(dst_folder):
        os.makedirs(dst_folder)

    # 遍历源文件夹中的所有文件和子文件夹
    for item in os.listdir(src_folder):
        src_item = os.path.join(src_folder, item)
        dst_item = os.path.join(dst_folder, item)

        # 如果是文件，使用 shutil.copyfile 复制文件
        if os.path.isfile(src_item):
            shutil.copyfile(src_item, dst_item)
            print(f"文件 {src_item} 已复制到 {dst_item}")
        # 如果是文件夹，递归复制
        elif os.path.isdir(src_item):
            copy_entire_folder(src_item, dst_item)

# 示例用法
src_folder = "F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/AnJsflScript"
dst_folder = "F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/AnJsflScript_copy"

copy_entire_folder(src_folder, dst_folder)