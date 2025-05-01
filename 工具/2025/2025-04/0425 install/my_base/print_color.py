# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : files_pro
# @File    : rich_print.py
# @Time    : 2024/06/23 21:58
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

from enum import Enum

import colorama
from colorama import Fore, Style

# 初始化 colorama
colorama.init()


# 定义颜色枚举
class TextColor(Enum):
    BLACK = Fore.BLACK
    RED = Fore.RED
    GREEN = Fore.GREEN
    BLUE = Fore.BLUE
    YELLOW = Fore.YELLOW
    MAGENTA = Fore.MAGENTA
    CYAN = Fore.CYAN
    WHITE = Fore.WHITE


def print_color(message: str, color_enum: TextColor = TextColor.GREEN):
    """
    打印带有指定颜色枚举的富文本消息。

    参数:
    - message: 要打印的消息文本。
    - color_enum: 颜色枚举值，例如 Color.RED。
    """
    # 设置颜色
    color_reset = Fore.RESET
    color_code = color_enum.value

    # 打印带有颜色的消息
    print(f"{color_code}{message}{color_reset}")


if __name__ == '__main__':
    # 示例用法
    print_color("这是红色文字", TextColor.RED)
    print_color("这是绿色文字", TextColor.GREEN)
    print_color("这是蓝色文字", TextColor.BLUE)

    # 恢复默认样式
    print(Style.RESET_ALL)
