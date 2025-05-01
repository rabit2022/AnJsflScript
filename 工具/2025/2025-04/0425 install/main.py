import sys

from PySide6.QtGui import QPixmap, QIcon
from PySide6.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QStackedWidget, QLabel, QSpacerItem, \
    QSizePolicy

from get_pic import get_resource_path
# 导入其他界面
from ui.about import AboutDialog
from ui.anti_piracy import AntiPiracyDialog
from ui.install import InstallationCompleteDialog
from ui.uninstall import UninstallationCompleteDialog


class MainInterface(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("AnJsflScript 主界面")
        self.resize(400, 500)

        # 设置窗口图标
        self.setWindowIcon(QIcon("./pic/水梓.png"))  # 替换为实际图标路径

        # 创建布局
        layout = QVBoxLayout()

        # 创建 QStackedWidget
        self.stacked_widget = QStackedWidget()
        layout.addWidget(self.stacked_widget)

        # 创建主界面内容
        self.main_page = QWidget()
        main_layout = QVBoxLayout()

        flash_label = QLabel(self)
        img = get_resource_path("./pic/水梓.png")
        # print(img)
        pixmap = QPixmap(img)  # 替换为实际图片路径
        flash_label.setPixmap(pixmap)
        flash_label.setScaledContents(True)
        flash_label.setFixedSize(320, 280)
        main_layout.addWidget(flash_label)

        main_layout.addSpacerItem(QSpacerItem(20, 20, QSizePolicy.Minimum, QSizePolicy.Expanding))

        install_button = QPushButton("安装", self)
        install_button.clicked.connect(self.show_installation_dialog)
        main_layout.addWidget(install_button)

        uninstall_button = QPushButton("卸载", self)
        uninstall_button.clicked.connect(self.show_uninstallation_dialog)
        main_layout.addWidget(uninstall_button)

        about_button = QPushButton("关于", self)
        about_button.clicked.connect(self.show_about_dialog)
        main_layout.addWidget(about_button)

        anti_piracy_button = QPushButton("盗版提示", self)
        anti_piracy_button.clicked.connect(self.show_anti_piracy_dialog)
        main_layout.addWidget(anti_piracy_button)

        # confirm_button = QPushButton("确定", self)
        # confirm_button.clicked.connect(self.show_confirmation_dialog)  # 点击确定按钮时弹出对话框
        # main_layout.addWidget(confirm_button)

        self.main_page.setLayout(main_layout)

        # 将主界面添加到 QStackedWidget
        self.stacked_widget.addWidget(self.main_page)

        # 创建其他界面
        self.install_page = InstallationCompleteDialog(self)  # 传递 self 作为父窗口
        self.uninstall_page = UninstallationCompleteDialog(self)  # 传递 self 作为父窗口
        self.about_page = AboutDialog(self)  # 传递 self 作为父窗口
        self.anti_piracy_page = AntiPiracyDialog(self)  # 传递 self 作为父窗口

        # 将其他界面添加到 QStackedWidget
        self.stacked_widget.addWidget(self.install_page)
        self.stacked_widget.addWidget(self.uninstall_page)
        self.stacked_widget.addWidget(self.about_page)
        self.stacked_widget.addWidget(self.anti_piracy_page)

        self.setLayout(layout)

    def show_installation_dialog(self):
        self.stacked_widget.setCurrentIndex(1)  # 切换到安装界面

    def show_uninstallation_dialog(self):
        self.stacked_widget.setCurrentIndex(2)  # 切换到卸载界面

    def show_about_dialog(self):
        self.stacked_widget.setCurrentIndex(3)  # 切换到关于界面

    def show_anti_piracy_dialog(self):
        self.stacked_widget.setCurrentIndex(4)  # 切换到关于界面

    def return_to_main(self):
        self.stacked_widget.setCurrentIndex(0)  # 返回到主界面

    # def show_confirmation_dialog(self):
    #     # 弹出确认对话框
    #     reply = QMessageBox.question(self, "确认", "您确定要执行此操作吗？",
    #                                  QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
    #     if reply == QMessageBox.Yes:
    #         QMessageBox.information(self, "操作成功", "您已成功确认操作！")
    #     else:
    #         QMessageBox.information(self, "操作取消", "您已取消操作！")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_window = MainInterface()
    main_window.show()
    sys.exit(app.exec())
