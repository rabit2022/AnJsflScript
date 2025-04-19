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



"ErrorDefinitions":"Core/myShim/ErrorDefinitions",
"FUNC":"Core/myShim/FUNC",
"frameRange":"Core/Object/frameRange",
"frameRangeUtil":"Core/Object/frameRangeUtil",
"moreElement":"Core/Object/moreElement",
"moreElementUtil":"Core/Object/moreElementUtil",
"open":"Core/py/file/open",
"os":"Core/py/file/os",
"sys":"Core/py/file/sys",
"random":"Core/py/random/random",
"StringP":"Core/py/string/StringP",
"test-module":"Core/test/test-module",
"checkUtil":"Core/Utils/flash/checkUtil",
"elementUtil":"Core/Utils/flash/element/elementUtil",
"filterUtil":"Core/Utils/flash/filter/filterUtil",
"graphicsUtil":"Core/Utils/flash/graphics/graphicsUtil",
"layerUtil":"Core/Utils/flash/layer/layerUtil",
"libUtil":"Core/Utils/flash/library/libUtil",
"promptUtil":"Core/Utils/flash/panel/promptUtil",
"xmlPanelUtil":"Core/Utils/flash/panel/xmlPanelUtil",
"selectionUtil":"Core/Utils/flash/selectionUtil",
"curveUtil":"Core/Utils/flash/tween/curveUtil",
"KeyFrameMode":"Core/Utils/mode/KeyFrameMode",
"TryLoad":"Core/Utils/module/TryLoad",





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