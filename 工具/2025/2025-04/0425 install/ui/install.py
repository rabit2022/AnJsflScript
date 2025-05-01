from PySide6.QtWidgets import QDialog, QVBoxLayout, QLabel, QPushButton, QSpacerItem, QSizePolicy, QMessageBox
from PySide6.QtGui import QPixmap
from PySide6.QtCore import Qt

from core.install import install
from core.open_command_folder import open_command,open_plugin
from get_pic import get_resource_path

class InstallationCompleteDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("AnJsflScript - 安装完成！")
        self.setWindowFlags(Qt.WindowCloseButtonHint)  # 只显示关闭按钮

        layout = QVBoxLayout()

        flash_label = QLabel(self)
        img=get_resource_path("./pic/水梓.png")
        pixmap = QPixmap(img)  # 替换为实际图片路径
        flash_label.setPixmap(pixmap)
        flash_label.setScaledContents(True)
        flash_label.setFixedSize(320, 280)
        layout.addWidget(flash_label)

        layout.addSpacerItem(QSpacerItem(20, 20, QSizePolicy.Minimum, QSizePolicy.Expanding))

        text_label1 = QLabel("感谢您安装 AnJsflScript！", self)
        text_label1.setWordWrap(True)
        text_label1.setFixedWidth(310)
        layout.addWidget(text_label1)

        text_label2 = QLabel(
            "要立即开始使用 AnJsflScript，请重启 Flash，然后进入：窗口 > 其他面板 > AnJsflScript",
            self
        )
        text_label2.setWordWrap(True)
        text_label2.setFixedWidth(310)
        layout.addWidget(text_label2)

        button = QPushButton("开始安装", self)
        button.clicked.connect(self.install)  # 返回到主界面
        layout.addWidget(button)

        button = QPushButton("An命令位置", self)
        button.clicked.connect(open_command)  # 返回到主界面
        layout.addWidget(button)

        button = QPushButton("An插件位置", self)
        button.clicked.connect(open_plugin)  # 返回到主界面
        layout.addWidget(button)



        button = QPushButton("返回", self)
        button.clicked.connect(self.parent().return_to_main)  # 返回到主界面
        layout.addWidget(button)

        self.setLayout(layout)
        self.resize(360, 450)  # 设置窗口大小

    def show_confirmation_dialog(self):
        # 弹出确认对话框
        reply = QMessageBox.question(self, "安装", "安装完成！！！",
                                     QMessageBox.Yes )
        if reply == QMessageBox.Yes:
            QMessageBox.information(self, "操作成功", "【温馨提示】安装成功！！！\n 如果有bug,或者建议，请@我。\n\n作者：@穹的兔兔")
        else:
            QMessageBox.information(self, "操作取消", "您已取消操作！")

    def show_failed_dialog(self):
        # 弹出确认对话框
        reply = QMessageBox.question(self, "安装失败", "安装失败！！！",
                                     QMessageBox.Yes )
        if reply == QMessageBox.Yes:
            QMessageBox.information(self, "操作成功", "【温馨提示】安装失败！！！请把安装程序放到AnJsflScript项目文件夹！\n 如果有bug,或者建议，请@我。\n\n作者：@穹的兔兔")
        else:
            QMessageBox.information(self, "操作取消", "您已取消操作！")
    def install(self):
        success=install()
        if success:
            self.show_confirmation_dialog()
        else:
            self.show_failed_dialog()

    # def open_command(self):
    #     open_command()
