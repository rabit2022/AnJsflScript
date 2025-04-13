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

folder = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib"

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


# # 要插入的指定文字
# replace_text = r"""
# if (typeof require === 'undefined') {
#     var msg =
#         '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
#     fl.trace(msg);
#     throw new Error(msg);
# }
# """
# to_text = r"""
# // bug,FirstRun.jsfl 未运行
# if (typeof require === 'undefined') {
#     var msg =
#         '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\\n 作者：@穹的兔兔';
#     fl.trace(msg);
#     throw new Error(msg);
# }
#
# // bug,Temp 未解压
# if ($ProjectFileDir$.includes('AppData/Local/Temp')) {
#     var msg = '【温馨提示】当前项目文件没有解压，请解压后再运行。 \\n 作者：@穹的兔兔';
#     fl.trace(msg);
#     throw new Error(msg);
# }
# """



replace_text = r"""
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
"""
to_text = r"""
// region doc
var doc = fl.getDocumentDOM(); //文档
if (!checkDom(doc)) return;

var selection = doc.selection; //选择
var library = doc.library; //库文件
var timeline = doc.getTimeline(); //时间轴

var layers = timeline.layers; //图层
var curLayerIndex = timeline.currentLayer; //当前图层索引
var curLayer = layers[curLayerIndex]; //当前图层

var curFrameIndex = timeline.currentFrame; //当前帧索引
var curFrame = curLayer.frames[curFrameIndex]; //当前帧
// endregion doc
"""

contents = files.read_files(parser_content)
# print(content)
for con in contents:
    print(con)

# files.write_new_content(contents)
