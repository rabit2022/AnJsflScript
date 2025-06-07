# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : modal.py
# @Time    : 2025/06/08 00:09
# @Author  : admin
# @Version : python3.8
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import numpy as np

def adaptive_ratio(current, target, max_ratio=10, min_ratio=-10):
    """
    自适应比例计算

    参数:
        current: 当前值
        target: 目标值/原始值
        max_ratio: 最大允许正比值 (默认10)
        min_ratio: 最小允许负比值 (默认-10)

    返回:
        限制范围内的合理比值
    """
    EPSILON = 1e-10  # 内部极小常量

    # 处理目标值为零或接近零的情况
    if np.isclose(target, 0.0, atol=EPSILON):
        if np.isclose(current, 0.0, atol=EPSILON):
            return 0.0  # 0/0情况返回0

        # 根据current符号动态确定limit
        limit = max_ratio if current > 0 else min_ratio
        dynamic_target = current / limit
        return current / (dynamic_target + np.copysign(EPSILON, dynamic_target))

    # 常规情况处理
    signed_target = target + np.copysign(EPSILON, target)
    raw_ratio = current / signed_target

    # 根据比值符号确定limit并应用平滑限制
    limit = max_ratio if raw_ratio > 0 else min_ratio
    return limit * np.tanh(raw_ratio / limit)