# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : movies
# @File    : timer.py
# @Time    : 2023/09/29 20:09
# @Author  : admin
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
from functools import wraps
from time import time
from typing import Callable


def to_seconds(time_str):
    """
    将时间字符中表示的时间解添秒数
    :param time_str: 时间字符中
    :return:
    """
    hours, minutes, seconds = map(int, time_str.split(":"))
    return hours * 3600 + minutes * 60 + seconds


def show_time(func: Callable):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time()
        res = func(*args, **kwargs)
        end = time()

        # # 计算耗时，并保留两位小数
        # duration = round(end - start, 2)

        print(f"耗时：{end - start:.2f}秒")
        return res

    return wrapper
