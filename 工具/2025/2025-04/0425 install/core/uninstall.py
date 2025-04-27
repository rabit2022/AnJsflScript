# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : uninstall.py
# @Time    : 2025/04/27 22:48
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$


import os

from core.get_an_command import get_AnJsflScript_target


def remove_folder(folder_path):
    """
    删除整个文件夹及其内容，尝试更改权限
    :param folder_path: 要删除的文件夹路径
    """
    try:
        # 遍历文件夹中的所有文件和子文件夹
        for root, dirs, files in os.walk(folder_path, topdown=False):
            for name in files:
                file_path = os.path.join(root, name)
                # 更改文件权限为可写
                os.chmod(file_path, 0o777)
                os.remove(file_path)  # 删除文件
            for name in dirs:
                dir_path = os.path.join(root, name)
                # 更改文件夹权限为可写
                os.chmod(dir_path, 0o777)
                os.rmdir(dir_path)  # 删除文件夹
        os.rmdir(folder_path)  # 删除顶层文件夹
        print(f"文件夹 '{folder_path}' 已成功删除。")
    except Exception as e:
        print(f"删除文件夹时出错: {e}")


def uninstall():
    AnJsflScript = get_AnJsflScript_target()
    remove_folder(AnJsflScript)
