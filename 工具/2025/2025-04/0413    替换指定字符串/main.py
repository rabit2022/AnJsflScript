# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : main.py
# @Time    : 2025/04/13 11:48
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$


import re

from my_base.folder_traverser import FolderTraverser

folder = r"H:\project\沙雕动画\AnJsflScript\lib"

folder_travel = FolderTraverser(folder, [".jsfl"])
files = folder_travel.toFiles()


def parser_content(content, fileobj):
    """
    把 replace 替换为 to

    :param content: 原始代码内容（字符串）
    :return: 修改后的代码内容
    """
    print(fileobj.file_path)
    # 使用正则表达式替换指定文本
    pattern = re.escape(replace_text)  # 对replace_text进行转义，避免特殊字符干扰
    result = re.sub(pattern, to_text, content, flags=re.DOTALL)  # 使用re.DOTALL确保匹配多行
    return result


# 要插入的指定文字
replace_text = r"""
// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
"""
to_text = r"""
// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
"""


contents = files.read_files(parser_content)
# print(content)
# for con in contents:
#     print(con)

files.write_new_content(contents)
