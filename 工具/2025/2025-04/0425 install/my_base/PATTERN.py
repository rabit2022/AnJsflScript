# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : files_pro
# @File    : PATTERN.py
# @Time    : 2024/07/04 23:33
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

NEXT_LINE = (
        # r'## \d{2}\\\.' +
        r'.*?' +  # 非贪婪匹配任意字符，直到遇到后面的条件
        r'(?=\s*\n)'  # 正向前瞻断言，匹配后面是空白和[Python爬虫]的部分，但不包括在内
)
