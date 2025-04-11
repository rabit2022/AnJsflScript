# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : main.py
# @Time    : 2025/04/11 22:26
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$


import re

from my_base.folder_traverser import FolderTraverser

# folder = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib"
folder = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Core"



folder_travel = FolderTraverser(folder, [".jsfl"])
files = folder_travel.toFiles()


def parser_content(content, fileobj):
    """
    在注释和 require 之间的位置插入指定的文字。

    :param fileobj:
    :param content: 原始代码内容（字符串）
    :return: 修改后的代码内容
    """
    new_file_name = fileobj.file_name
    # print(fileobj.file_name)

    # 第一步：提取整个注释块
    pattern_comment = r"/\*\*.*?\*/"
    match_comment = re.search(pattern_comment, content, re.DOTALL)
    if not match_comment:
        return content

    comment_block = match_comment.group(0)

    # 第二步：从注释块中提取 @file 后的内容
    pattern_file = r"@file:\s*(\S+)"
    match_file = re.search(pattern_file, comment_block)
    if not match_file:
        return content

    file_name = match_file.group(1)
    # return file_name

    # 第三步：将修改后的注释块替换回原始内容
    modified_content = content.replace(file_name, new_file_name, 1)

    return modified_content


contents = files.read_files(parser_content)
# print(content)
# for con in contents:
#     print(con)
files.write_new_content(contents)
