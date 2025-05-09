# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : 生成config.py
# @Time    : 2025/02/26 22:39
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import re
from my_base.clipboard import copy_to_clipboard


# 原始的多行字符串
original_string = """






"BitmapOperation":"Core/flash/Bitmap/BitmapOperation",
"checkUtil":"Core/flash/checkUtil",
"ElementAnim":"Core/flash/Context/Element/ElementAnim",
"ElementChecker":"Core/flash/Context/Element/ElementChecker",
"ElementOperation":"Core/flash/Context/Element/ElementOperation",
"ElementQuery":"Core/flash/Context/Element/ElementQuery",
"ElementTransform":"Core/flash/Context/Element/ElementTransform",
"FrameChecker":"Core/flash/Context/Frame/FrameChecker",
"KeyFrameChecker":"Core/flash/Context/KeyFrame/KeyFrameChecker",
"KeyFrameOperation":"Core/flash/Context/KeyFrame/KeyFrameOperation",
"KeyFrameQuery":"Core/flash/Context/KeyFrame/KeyFrameQuery",
"LayerChecker":"Core/flash/Context/Layer/LayerChecker",
"LayerHierarchy":"Core/flash/Context/Layer/LayerHierarchy",
"LayerOperation":"Core/flash/Context/Layer/LayerOperation",
"LayerQuery":"Core/flash/Context/Layer/LayerQuery",
"LayerQueryEnhance":"Core/flash/Context/Layer/LayerQueryEnhance",
"LibraryOperation":"Core/flash/Context/library/LibraryOperation",
"ElementSelect":"Core/flash/Context/selection/ElementSelect",
"FramesSelect":"Core/flash/Context/selection/FramesSelect",
"FilterChecker":"Core/flash/filter/FilterChecker",
"FilterOperation":"Core/flash/filter/FilterOperation",
"FilterQuery":"Core/flash/filter/FilterQuery",
"FolderChecker":"Core/flash/Folder/FolderChecker",
"FolderQuery":"Core/flash/Folder/FolderQuery",
"DrawCircle":"Core/flash/graphics/DrawCircle",
"DrawRectangle":"Core/flash/graphics/DrawRectangle",
"promptUtil":"Core/flash/panel/promptUtil",
"xmlPanelUtil":"Core/flash/panel/xmlPanelUtil",
"MoreElement":"Core/flash/Symbol/MoreElement",
"SymbolNameGenerator":"Core/flash/Symbol/SymbolNameGenerator",
"EaseCurve":"Core/flash/tween/EaseCurve",
"Tween":"Core/flash/tween/Tween",
"FUNC":"Core/myShim/FUNC",
"open":"Core/py/file/open",
"os":"Core/py/file/os",
"shutil":"Core/py/file/shutil",
"sys":"Core/py/file/sys",
"random":"Core/py/random/random",
"StringP":"Core/py/string/StringP",
"KeyFrameMode":"Core/Utils/KeyFrameMode",
"Tips":"Core/Utils/Tips",




"""

# 使用正则表达式进行替换
# 匹配模式：": " 后跟任意字符直到逗号
pattern = r':"(.*?)"(?=,|$)'
replacement = r': ["\1"]'

# 替换操作
modified_string = re.sub(pattern, replacement, original_string)

# 打印结果
# print(modified_string)

copy_to_clipboard(modified_string)