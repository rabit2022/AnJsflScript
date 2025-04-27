# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : open_command_folder.py
# @Time    : 2025/04/28 0:39
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import os
import subprocess
import sys

from core.get_an_command import get_AnJsflScript_target


def open_command():
    # 获取目标路径（假设这是一个函数返回路径）
    AnJsflScript = get_AnJsflScript_target()

    # 获取上一级目录
    parent_directory = os.path.dirname(AnJsflScript)

    # 根据操作系统打开文件夹
    if sys.platform == "win32":  # Windows
        os.startfile(parent_directory)
    elif sys.platform == "darwin":  # macOS
        subprocess.run(["open", parent_directory])
    else:  # Linux
        subprocess.run(["xdg-open", parent_directory])
def open_plugin():
    # 获取目标路径（假设这是一个函数返回路径）
    AnJsflScript = get_AnJsflScript_target()

    # 获取上一级目录
    parent_directory = os.path.dirname(AnJsflScript)
    parent_directory = os.path.dirname(parent_directory)

    plugin=os.path.join(parent_directory,"WindowSWF")

    # 根据操作系统打开文件夹
    if sys.platform == "win32":  # Windows
        os.startfile(plugin)
    elif sys.platform == "darwin":  # macOS
        subprocess.run(["open", plugin])
    else:  # Linux
        subprocess.run(["xdg-open", plugin])