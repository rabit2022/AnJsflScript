# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : files_pro
# @File    : 添加剪切板.py
# @Time    : 2024/05/29 13:55
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import pyperclip

from my_base.print_color import print_color, TextColor


def copy_to_clipboard(formatted_string):
    """
    格式化输入字符串为注释风格的文本，并将结果复制到剪贴板。

    Args:
        formatted_string (str): 待格式化的输入字符串。

    Returns:
        str: 格式化后的字符串，每行开头添加 "/// "。
    """

    # 将格式化后的字符串复制到剪贴板
    pyperclip.copy(formatted_string)

    print_color(f"has been copied:",TextColor.YELLOW)
    print_color(f"{formatted_string}", TextColor.GREEN)
    return formatted_string


if __name__ == '__main__':
    # 示例输入字符串
    input_string = """    This is a test.

    This is another test.

        And this is yet another test."""

    # 调用方法并打印输出
    output_string = copy_to_clipboard(input_string)
    print("Formatted text has been copied to the clipboard.")
