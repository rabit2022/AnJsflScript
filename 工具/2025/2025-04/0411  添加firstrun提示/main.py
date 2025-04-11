# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : main.py
# @Time    : 2025/04/11 21:53
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import re

from my_base.folder_traverser import FolderTraverser

folder = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib"

folder_travel = FolderTraverser(folder, [".jsfl"])
files = folder_travel.toFiles()


def parser_content(content):
    """
    在注释和 require 之间的位置插入指定的文字。

    :param content: 原始代码内容（字符串）
    :return: 修改后的代码内容
    """
    # 使用正则表达式找到注释和 require 之间的位置
    pattern = r"(\/\*\*.*?\*\/\s*)(require\(\[.*?\],\s*function\s*\([^)]*\)\s*\{)"
    modified_code = re.sub(pattern, r"\1" + insert_text + r"\2", content, flags=re.DOTALL)

    return modified_code


# 要插入的指定文字
insert_text = r"""
if (typeof require === 'undefined') {
    var msg = '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
"""

contents = files.read_files(parser_content)
# print(content)
# for con in content:
#     print(con)
files.write_new_content(contents)