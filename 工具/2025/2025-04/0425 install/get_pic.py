# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 0425 install
# @File    : get_pic.py
# @Time    : 2025/05/01 18:05
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import os
import sys


def get_resource_path(relative_path):
    """
    获取资源文件的绝对路径，适用于打包后的程序。

    :param relative_path: 相对路径
    :return: 资源文件的绝对路径
    """
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        # 打包后的程序
        base_path = sys._MEIPASS
    else:
        # 未打包的脚本
        base_path = os.path.dirname(os.path.abspath(__file__))

    return os.path.join(base_path, relative_path)


# 示例：加载图片
if __name__ == "__main__":

    # 获取图片路径
    image_path = get_resource_path("pic/水梓.png")

    print(image_path)