import sys
from PySide6.QtWidgets import QDialog, QVBoxLayout, QLabel, QPushButton, QSpacerItem, QSizePolicy, QApplication
from PySide6.QtGui import QPixmap, QDesktopServices
from PySide6.QtCore import Qt, QUrl
from get_pic import get_resource_path

class AboutDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("关于 AnJsflScript")
        self.setWindowFlags(Qt.WindowCloseButtonHint)  # 只显示关闭按钮

        layout = QVBoxLayout()

        flash_label = QLabel(self)

        img = get_resource_path("./pic/水梓.png")
        pixmap = QPixmap(img)  # 替换为实际图片路径
        flash_label.setPixmap(pixmap)
        flash_label.setScaledContents(True)
        flash_label.setFixedSize(320, 280)
        layout.addWidget(flash_label)

        layout.addSpacerItem(QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding))

        text_label = QLabel(self)
        text_label.setText(
            "AnJsflScript 是一个专为 Adobe Animate 设计的 JavaScript For Flash (JSFL) 脚本集合，"
            "旨在通过自动化任务提升工作效率，帮助用户更高效地完成重复性工作，从而专注于创意与设计。"
        )
        text_label.setWordWrap(True)
        text_label.setFixedWidth(310)
        layout.addWidget(text_label)

        # 添加 GitHub 地址按钮
        github_button = QPushButton("GitHub 地址", self)
        github_button.clicked.connect(self.open_github)  # 打开 GitHub 地址
        layout.addWidget(github_button)

        # 添加 GitHub 地址按钮
        github_button = QPushButton("Bilibili", self)
        github_button.clicked.connect(self.open_space)  # 打开 GitHub 地址
        layout.addWidget(github_button)

        # 添加返回按钮
        return_button = QPushButton("返回", self)
        return_button.clicked.connect(self.parent().return_to_main)  # 返回到主界面
        layout.addWidget(return_button)

        self.setLayout(layout)
        self.resize(360, 400)  # 设置窗口大小

    def open_github(self):
        # 打开浏览器并导航到 GitHub 地址
        QDesktopServices.openUrl(QUrl("https://github.com/rabit2022/AnJsflScript"))

    def open_space(self):
        # 打开浏览器并导航到 GitHub 地址
        QDesktopServices.openUrl(QUrl("https://space.bilibili.com/453222786?spm_id_from=333.788.0.0"))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    dialog = AboutDialog()
    dialog.exec()
    sys.exit(app.exec())