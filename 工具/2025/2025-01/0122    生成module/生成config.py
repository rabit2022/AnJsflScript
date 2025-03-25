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




"Class":"Third/Class/Class.js-0.0.1/Class",
"Interface":"Third/Class/Class.js-0.0.1/Interface",
"eventemitter3":"Third/event/eventemitter3-5.0.1/eventemitter3",
"rxjs":"Third/event/rxjs-7.8.2/rxjs.umd",
"loglevel":"Third/log/loglevel-1.9.2/loglevel",
"path-browserify":"Third/modules/path-browserify-1.0.1/path-browserify",
"require":"Third/modules/requirejs-2.3.7/require",
"es5-sham":"Third/shims/es5-shim-4.6.7/es5-sham",
"es5-shim":"Third/shims/es5-shim-4.6.7/es5-shim",
"es6-sham":"Third/shims/es6-shim-0.35.4/es6-sham",
"es6-shim":"Third/shims/es6-shim-0.35.4/es6-shim",
"es7-shim":"Third/shims/es7-shim-6.0.0/es7-shim",
"json3":"Third/shims/json3-3.3.3/json3",
"es2017":"Third/shims/pollyfill/es2017",
"error-stack-parser":"Third/stack/error-stack-parser-3.0.0/error-stack-parser",
"stackframe":"Third/stack/stackframe-1.3.4/stackframe",
"linq":"Third/utils/linq-4.0.3/linq",
"lodash":"Third/utils/lodash-4.17.21/lodash",
"sprintf":"Third/utils/sprintf-js-1.1.3/sprintf",



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