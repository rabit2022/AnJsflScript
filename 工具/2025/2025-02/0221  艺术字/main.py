# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : main.py
# @Time    : 2025/02/21 12:15
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import pyfiglet

# # # 获取所有字体样式
# # fonts = pyfiglet.FigletFont.getFonts()
# fonts=[
# "sub-zero",
# # "blocky",
# # "ansi_regular",
# ]
#
# # 定义要转换为 ASCII 艺术的文本
# text = "Point"
#
# # 打印所有字体样式名称
# for font in fonts:
#     print(font)
#
#     # 使用 block 字体风格生成 ASCII 艺术
#     ascii_art = pyfiglet.figlet_format(text, font=font)
#
#     # 打印 ASCII 艺术
#     print(ascii_art)
import pyfiglet

def print_art_with_comments(text):
    """
    生成并打印带有注释的 ASCII 艺术。

    参数:
    text (str): 要转换为 ASCII 艺术的文本。
    """
    # 使用 pyfiglet 库生成 ASCII 艺术
    ascii_art_text = pyfiglet.figlet_format(text,font="sub-zero")

    # 在每一行艺术字前添加双杠空格
    formatted_art = ["// " + line for line in ascii_art_text.split("\n") if line]

    # 构建整个图案
    ascii_art = [
        "// ------------------------------------------------------------------------------------------------------------------------",
        *formatted_art,
        "// ------------------------------------------------------------------------------------------------------------------------",
        "// " + text
    ]

    # 打印 ASCII 艺术
    for line in ascii_art:
        print(line)
if __name__ == '__main__':

    # 调用函数，传入文本
    text = "Transform"
    print_art_with_comments(text)