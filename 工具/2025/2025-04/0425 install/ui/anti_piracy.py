# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : anti_piracy.py.py
# @Time    : 2025/04/28 0:23
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import sys

from PySide6.QtCore import Qt, QUrl
from PySide6.QtGui import QPixmap, QDesktopServices
from PySide6.QtWidgets import QApplication, QDialog, QVBoxLayout, QLabel, QPushButton, QSpacerItem, QSizePolicy


class AntiPiracyDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("防盗版提示")
        self.setWindowFlags(Qt.WindowCloseButtonHint)  # 只显示关闭按钮
        self.resize(400, 300)

        layout = QVBoxLayout()

        # 添加图片（可选）
        flash_label = QLabel(self)
        pixmap = QPixmap("./pic/水梓.png")  # 替换为实际图片路径，例如警告图标
        flash_label.setPixmap(pixmap)
        flash_label.setScaledContents(True)
        flash_label.setFixedSize(120, 120)
        layout.addWidget(flash_label)

        layout.addSpacerItem(QSpacerItem(20, 20, QSizePolicy.Minimum, QSizePolicy.Expanding))

        # 添加文本标签
        text_label = QLabel(self)
        text_label.setText(
            "【温馨提示】\n"
            "你可能使用的是盗版软件。本项目是开源的，如果花费了金钱购买，请退款。\n\n"
            "作者：穹的兔兔\n"
            "地址：<a href='https://github.com/rabit2022/AnJsflScript'>https://github.com/rabit2022/AnJsflScript</a>"
        )
        text_label.setOpenExternalLinks(True)  # 允许点击链接
        text_label.setWordWrap(True)
        text_label.setFixedWidth(310)
        layout.addWidget(text_label)

        # 添加 GitHub 地址按钮
        github_button = QPushButton("GitHub 地址", self)
        github_button.clicked.connect(self.open_github)  # 打开 GitHub 地址
        layout.addWidget(github_button)

        # 添加返回按钮
        return_button = QPushButton("返回", self)
        return_button.clicked.connect(self.parent().return_to_main)  # 返回到主界面
        layout.addWidget(return_button)

        self.setLayout(layout)

    def open_github(self):
        # 打开浏览器并导航到 GitHub 地址
        QDesktopServices.openUrl(QUrl("https://github.com/rabit2022/AnJsflScript"))


if __name__ == "__main__":
    app = QApplication(sys.argv)
    dialog = AntiPiracyDialog()
    dialog.exec()
    sys.exit(app.exec())
