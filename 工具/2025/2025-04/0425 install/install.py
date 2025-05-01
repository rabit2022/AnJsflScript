# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : install.py
# @Time    : 2025/05/01 13:05
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

# pyinstaller -w -i loli.ico -F main.py -p alien.py --hidden-import alien

import sys
import os


def get_py_files_from_folder(folder_path):
    """
    遍历文件夹，获取其中的所有 .py 文件路径。

    :param folder_path: 文件夹路径
    :return: .py 文件路径列表
    """
    py_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".py"):
                py_files.append(os.path.join(root, file))
    return py_files


def preprocess_dependencies(dependencies):
    """
    预处理依赖模块列表，确保全部是文件路径。

    :param dependencies: 包含文件路径或文件夹路径的列表
    :return: 处理后的文件路径列表
    """
    processed_dependencies = []
    for dep in dependencies:
        if os.path.isdir(dep):  # 如果是文件夹路径
            processed_dependencies.extend(get_py_files_from_folder(dep))
        elif os.path.isfile(dep):  # 如果是文件路径
            processed_dependencies.append(dep)
        else:
            print(f"Warning: {dep} is neither a valid file nor a directory. Skipping.")
    return processed_dependencies


def generate_pyinstaller_command(icon_path, entry_file, dependencies):
    """
    生成 PyInstaller 打包命令。

    :param icon_path: 图标文件路径
    :param entry_file: 入口文件路径
    :param dependencies: 其他依赖模块的列表（可以包含文件路径或文件夹路径）
    """
    # 预处理依赖模块列表
    dependencies = preprocess_dependencies(dependencies)

    # 基础命令
    command = f"pyinstaller -w -i {icon_path} -F {entry_file}"

    # 添加依赖模块
    for dependency in dependencies:
        command += f" -p {dependency}"
        command += f" --hidden-import {os.path.splitext(os.path.basename(dependency))[0]}"

    return command


if __name__ == "__main__":
    # 示例参数
    icon_path = "./pic/水梓.png"  # 图标路径
    entry_file = "main.py"  # 入口文件路径
    dependencies = ["core",'ui']  # 依赖模块列表，包含文件和文件夹

    command=generate_pyinstaller_command(icon_path,entry_file,dependencies)
    print(command)

