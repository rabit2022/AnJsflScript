# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : modal2.py
# @Time    : 2025/06/08 22:37
# @Author  : admin
# @Version : python3.8
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

import numpy as np
import matplotlib.pyplot as plt

def adaptive_ratio(currentDepth, targetDepth, factor=602):
    return (targetDepth + factor) / (currentDepth + factor)



def draw_adaptive_ratio():

    # 设置目标深度范围
    targetDepth_range = np.linspace(-5000, 10000, 100)

    # 设置不同的当前深度值
    currentDepths = [0,1,10, 100, 500, 1000, 5000]

    # 创建图形
    plt.figure(figsize=(10, 6))

    # 绘制不同当前深度下的比例曲线
    for currentDepth in currentDepths:
        ratios = [adaptive_ratio(currentDepth, targetDepth) for targetDepth in targetDepth_range]
        plt.plot(targetDepth_range, ratios, label=f'currentDepth = {currentDepth}')

    # 添加图例
    plt.legend()

    # 添加标题和标签
    plt.title('Adaptive Ratio vs Target Depth')
    plt.xlabel('Target Depth')
    plt.ylabel('Adaptive Ratio')

    # 显示图形
    plt.grid(True)
    plt.show()

if __name__ == '__main__':
    draw_adaptive_ratio()