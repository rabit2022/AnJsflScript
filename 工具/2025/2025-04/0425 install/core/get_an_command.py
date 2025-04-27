# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : an位置.py
# @Time    : 2025/04/27 22:22
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$


import os
import glob
import re
from PySide6.QtWidgets import QApplication, QMessageBox, QComboBox, QVBoxLayout, QLabel, QDialog, QPushButton

def select_path_from_list(paths):
    """
    弹出窗口，让用户从多个路径中选择一个
    """
    app = QApplication([])  # 创建应用程序实例

    # 创建一个对话框
    dialog = QDialog()
    dialog.setWindowTitle("路径选择")

    # 创建一个下拉菜单
    combo_box = QComboBox()
    for path in paths:
        combo_box.addItem(path)  # 将路径添加到下拉菜单中

    # 创建一个标签
    label = QLabel("请选择一个路径：")

    # 创建一个按钮
    button = QPushButton("确定")
    button.clicked.connect(dialog.accept)  # 点击按钮时关闭对话框

    # 布局管理器
    layout = QVBoxLayout()
    layout.addWidget(label)
    layout.addWidget(combo_box)
    layout.addWidget(button)

    dialog.setLayout(layout)
    dialog.exec()  # 显示对话框并等待用户选择

    # 获取用户选择的路径
    selected_path = combo_box.currentText()
    return selected_path

def get_AnJsflScript_target():
    # 获取环境变量 %LOCALAPPDATA%
    local_app_data = os.getenv('LOCALAPPDATA')

    # 构建基础路径
    base_path = os.path.join(local_app_data, 'Adobe', 'Animate*')

    # 使用 glob 模块来匹配通配符路径
    matched_paths = glob.glob(base_path)

    # 定义正则表达式来进一步筛选（匹配 Animate 后面跟着四位数字）
    pattern = re.compile(r'Animate\s\d{4}')  # 匹配 Animate 后面跟着任意四位数字

    # 筛选出符合条件的路径
    filtered_paths = [path for path in matched_paths if pattern.search(path)]
    # filtered_paths=filtered_paths*2

    COMMAND_PATH =None
    # 处理匹配路径
    if len(filtered_paths) == 1:
        # 如果只有一个匹配路径，直接打印
        final_path = os.path.join(filtered_paths[0], 'zh_CN', 'Configuration', 'Commands')
        # print("最终路径:", final_path)
        # return final_path
        COMMAND_PATH=final_path
    elif len(filtered_paths) > 1:
        # 如果有多个匹配路径，弹出窗口让用户选择
        print("匹配到的路径：")
        for i, path in enumerate(filtered_paths, start=1):
            print(f"{i}. {path}")

        try:
            selected_path = select_path_from_list(filtered_paths)
            final_path = os.path.join(selected_path, 'zh_CN', 'Configuration', 'Commands')
            # print("最终路径:", final_path)
            # return final_path
            COMMAND_PATH=final_path
        except Exception as e:
            print("选择失败:", e)
    else:
        print("未找到符合条件的路径")

    if COMMAND_PATH is not None:
        return os.path.join(COMMAND_PATH,"AnJsflScript")


if __name__ == '__main__':
    get_AnJsflScript_target()