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
"test":"Core/test/test",
"LayerManager":"Core/Third/FlashTool/LayerManager",
"LibraryManager":"Core/Third/FlashTool/LibraryManager",
"Navigation":"Core/Third/FlashTool/Navigation/Navigation",
"linqUtil":"Core/Third/linqUtil",
"satUtil":"Core/Third/satUtil",
"console":"Core/Third/xjsfl/console",
"JSFLConstants":"Core/Third/xjsfl/flash/JSFLConstants",
"JSFLInterface":"Core/Third/xjsfl/flash/JSFLInterface",
"Utils":"Core/Third/xjsfl/Utils/Utils",
"checkUtil":"Core/Utils/flash/checkUtil",
"curveUtil":"Core/Utils/flash/curveUtil",
"elementUtil":"Core/Utils/flash/elementUtil",
"filterUtil":"Core/Utils/flash/filterUtil",
"graphicsUtil":"Core/Utils/flash/graphicsUtil",
"layerUtil":"Core/Utils/flash/layerUtil",
"libUtil":"Core/Utils/flash/libUtil",
"promptUtil":"Core/Utils/flash/promptUtil",
"selectionUtil":"Core/Utils/flash/selectionUtil",
"xmlPanelUtil":"Core/Utils/flash/xmlPanelUtil",
"KeyFrameMode":"Core/Utils/mode/KeyFrameMode",
"open":"Core/Utils/py/open",
"os":"Core/Utils/py/os",
"random":"Core/Utils/py/random",
"StringP":"Core/Utils/py/StringP",



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