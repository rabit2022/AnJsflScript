#!/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : main.py
# @Time    : 2025/01/22 16:33
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import os

from my_base.clipboard import copy_to_clipboard
from my_base.folder_traverser import FolderTraverser


def get_filename_without_extension(file_path: str) -> str:
    """
    从绝对路径中提取文件名（不包括后缀）。

    :param file_path: 文件的绝对路径
    :return: 文件名（不包括后缀）
    """
    file_name_with_extension = os.path.basename(file_path)
    file_name_without_extension = os.path.splitext(file_name_with_extension)[0]
    return file_name_without_extension


def get_folderpath_without_extension(folder_path: str) -> str:
    """
    去除路径中文件名的后缀名。

    :param folder_path: 完整的文件路径
    :return: 去除后缀名后的路径
    """
    # 获取路径中文件名部分（包括后缀）
    file_name_with_extension = os.path.basename(folder_path)

    # 去除文件名的后缀
    file_name_without_extension = os.path.splitext(file_name_with_extension)[0]

    # 获取文件夹路径部分
    folder_dir = os.path.dirname(folder_path)

    # print(folder_dir,file_name_without_extension)

    # 重新拼接路径
    # return os.path.join(folder_dir, file_name_without_extension)
    return folder_dir+"/"+file_name_without_extension


def generate_text(module_path: str, replace_path: str, target_name: str) -> str:
    """
    生成目标文本格式。

    :param module_path: 文件路径
    :param replace_path: 要替换的路径
    :param target_name: 替换后的路径名称
    :return: 格式化后的文本
    """
    # 替换路径并格式化
    relative_path = module_path.replace(replace_path, target_name).replace("\\", "/").lstrip("/")

    relative_path = get_folderpath_without_extension(relative_path)
    # print(relative_path)
    module_name = get_filename_without_extension(relative_path)

    return f'"{module_name}":"{relative_path}",'


def process_folder(folder_path: str, extensions: list, replace_path: str, target_name: str,
                   start_keyword: str) -> str:
    """
    遍历文件夹并生成目标文本。从包含特定关键字的路径开始处理。

    :param folder_path: 要遍历的文件夹路径
    :param extensions: 允许的文件扩展名列表
    :param replace_path: 要替换的路径
    :param target_name: 替换后的路径名称
    :param start_keyword: 从包含该关键字的路径开始处理，默认为 "es5"
    :return: 生成的文本内容
    """
    exclude_folders=[r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Third\shims\core-js-3.41.0"]
    # 获取文件路径列表
    traverser = FolderTraverser(folder_path, extensions,exclude_folders)
    file_paths = traverser.FilePaths

    # 从包含特定关键字的路径开始处理
    start_processing = False
    text_list = []

    for file_path in file_paths:
        if start_keyword in file_path:
            start_processing = True

        if start_processing:
            # 生成目标文本并添加到列表中
            text = generate_text(file_path, replace_path, target_name)
            text_list.append(text)

    return "\n".join(text_list)


if __name__ == "__main__":
    # 输入参数
    folder_path = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Third"
    extensions = [".jsfl"]
    replace_path = folder_path
    target_name = "Third"
    start_keyword = ""
    # 处理文件夹并生成文本
    output_text = process_folder(folder_path, extensions, replace_path, target_name, start_keyword)

    # 将结果复制到剪贴板
    copy_to_clipboard(output_text)

    # # 输入参数
    # folder_path = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Core"
    # extensions = [".jsfl"]
    # replace_path = folder_path
    # target_name = "Core"
    # start_keyword = ""
    # # 处理文件夹并生成文本
    # output_text = process_folder(folder_path, extensions, replace_path, target_name, start_keyword)
    #
    # # 将结果复制到剪贴板
    # copy_to_clipboard(output_text)

    # # 输入参数
    # folder_path = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\types"
    # extensions = [".ts"]
    # replace_path = folder_path
    # target_name = "types"
    # start_keyword = ""
    # # 处理文件夹并生成文本
    # output_text = process_folder(folder_path, extensions, replace_path, target_name, start_keyword)
    #
    # # 将结果复制到剪贴板
    # copy_to_clipboard(output_text)

