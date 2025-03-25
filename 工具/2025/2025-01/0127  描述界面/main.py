import json
import os
import re
import sys

from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLineEdit, QLabel, QPushButton, QTextEdit, QMessageBox, QComboBox,
    QListWidget, QListWidgetItem, QInputDialog, QCheckBox, QScrollArea
)


def convert_to_number(parameter_value: str):
    try:
        # 检查是否为整数
        if parameter_value.isdigit():
            return int(parameter_value)
        # 检查是否为浮点数
        elif re.match(r'^-?\d+\.\d+$', parameter_value):
            return float(parameter_value)
        else:
            print("输入的字符串不是有效的数字")
            return parameter_value
    except ValueError:
        print("转换失败，输入的字符串不是有效的数字")
        return parameter_value


class JSONInputApp(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        # 创建滚动区域
        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        self.scroll_widget = QWidget()
        self.scroll_area.setWidget(self.scroll_widget)
        self.scroll_layout = QVBoxLayout(self.scroll_widget)

        # 创建按钮水平布局
        buttons_layout = QHBoxLayout()
        self.generate_button = QPushButton("生成 JSON")
        self.generate_button.clicked.connect(self.generate_json)
        buttons_layout.addWidget(self.generate_button)

        self.save_to_file_button = QPushButton("保存到文件")
        self.save_to_file_button.clicked.connect(self.save_to_file)
        buttons_layout.addWidget(self.save_to_file_button)

        # 将按钮水平布局添加到滚动布局中
        self.scroll_layout.addLayout(buttons_layout)

        # 创建输入框和标签
        self.file_input = QLineEdit()
        self.file_input.setPlaceholderText("请输入文件名")
        self.scroll_layout.addWidget(QLabel("文件名:"))
        self.scroll_layout.addWidget(self.file_input)

        self.description_input = QLineEdit()
        self.description_input.setPlaceholderText("请输入描述")
        self.scroll_layout.addWidget(QLabel("描述:"))
        self.scroll_layout.addWidget(self.description_input)

        # 创建选择框
        self.selection_combo = QComboBox()
        self.selection_combo.addItems(["仅一个元件", "两个元件", "元件2个以上", "至少一帧"])
        self.scroll_layout.addWidget(QLabel("选择数量:"))
        self.scroll_layout.addWidget(self.selection_combo)

        self.selection_description_input = QLineEdit()
        self.selection_description_input.setPlaceholderText("请输入选择描述")
        self.scroll_layout.addWidget(QLabel("选择描述:"))
        self.scroll_layout.addWidget(self.selection_description_input)

        self.detail_combo = QComboBox()
        self.detail_combo.addItems(["包装元件", "直接k帧", "更改transform", "其他"])
        self.scroll_layout.addWidget(QLabel("详细信息:"))
        self.scroll_layout.addWidget(self.detail_combo)

        self.note_input = QLineEdit()
        self.note_input.setPlaceholderText("请输入备注")
        self.scroll_layout.addWidget(QLabel("备注:"))
        self.scroll_layout.addWidget(self.note_input)

        # 创建动态输入参数区域
        self.input_parameters_layout = QVBoxLayout()
        self.input_parameters_group = QWidget()
        self.input_parameters_group.setLayout(self.input_parameters_layout)
        self.scroll_layout.addWidget(QLabel("输入参数:"))
        self.scroll_layout.addWidget(self.input_parameters_group)

        # 添加参数按钮
        self.add_parameter_button = QPushButton("添加参数")
        self.add_parameter_button.clicked.connect(self.add_parameter)
        self.scroll_layout.addWidget(self.add_parameter_button)

        # 创建步骤列表区域
        self.steps_layout = QVBoxLayout()
        self.steps_group = QWidget()
        self.steps_group.setLayout(self.steps_layout)
        self.scroll_layout.addWidget(QLabel("步骤:"))
        self.scroll_layout.addWidget(self.steps_group)

        self.steps_list = QListWidget()
        self.steps_layout.addWidget(self.steps_list)

        # 创建按钮水平布局
        buttons_layout = QHBoxLayout()
        self.add_step_button = QPushButton("添加步骤")
        self.add_step_button.clicked.connect(self.add_step)
        buttons_layout.addWidget(self.add_step_button)

        self.delete_step_button = QPushButton("删除步骤")
        self.delete_step_button.clicked.connect(self.delete_step)
        buttons_layout.addWidget(self.delete_step_button)

        # 将按钮水平布局添加到步骤布局中
        self.steps_layout.addLayout(buttons_layout)

        # 创建布尔框
        self.xmlpanel_checkbox = QCheckBox("XMLPanel")
        self.xmlpanel_checkbox.setChecked(False)
        self.scroll_layout.addWidget(self.xmlpanel_checkbox)

        # 创建文本框用于显示生成的 JSON
        self.json_output = QTextEdit()
        self.json_output.setReadOnly(True)
        self.json_output.setMinimumHeight(200)  # 设置最小高度
        self.scroll_layout.addWidget(self.json_output)

        # 设置主布局
        main_layout = QVBoxLayout()
        main_layout.addWidget(self.scroll_area)
        self.setLayout(main_layout)

        self.setWindowTitle("JSON 输入工具")
        self.resize(400, 600)

    def add_parameter(self):
        # 创建新的参数输入框
        parameter_layout = QHBoxLayout()
        parameter_name_input = QLineEdit()
        parameter_name_input.setPlaceholderText("参数名称")
        parameter_value_input = QLineEdit()
        parameter_value_input.setPlaceholderText("参数值")
        delete_button = QPushButton("删除")
        delete_button.clicked.connect(lambda: self.delete_parameter(parameter_layout))

        parameter_layout.addWidget(parameter_name_input)
        parameter_layout.addWidget(parameter_value_input)
        parameter_layout.addWidget(delete_button)
        self.input_parameters_layout.addLayout(parameter_layout)

    def delete_parameter(self, parameter_layout):
        # 删除指定的参数输入框
        while parameter_layout.count():
            item = parameter_layout.takeAt(0)
            widget = item.widget()
            if widget:
                widget.deleteLater()
        self.input_parameters_layout.removeItem(parameter_layout)

    def add_step(self):
        # 添加新的步骤
        step_text, ok = QInputDialog.getText(self, "添加步骤", "请输入步骤描述:")
        if ok and step_text:
            item = QListWidgetItem(step_text)
            self.steps_list.addItem(item)

    def delete_step(self):
        # 删除选中的步骤
        row = self.steps_list.currentRow()
        if row != -1:
            self.steps_list.takeItem(row)

    def generate_json(self):
        try:
            # 获取用户输入
            file = self.file_input.text()
            description = self.description_input.text()
            selection = self.selection_combo.currentText()
            selection_description = self.selection_description_input.text()
            detail = self.detail_combo.currentText()
            note = self.note_input.text()

            # 获取动态输入的参数
            input_parameters = {}
            for i in range(self.input_parameters_layout.count()):
                parameter_layout = self.input_parameters_layout.itemAt(i).layout()
                if parameter_layout:
                    parameter_name = parameter_layout.itemAt(0).widget().text()
                    parameter_value = parameter_layout.itemAt(1).widget().text()
                    if parameter_name and parameter_value:
                        parameter_value = convert_to_number(parameter_value)
                        input_parameters[parameter_name] = parameter_value

            # 获取步骤列表
            steps = []
            for i in range(self.steps_list.count()):
                steps.append(self.steps_list.item(i).text())

            # 获取XMLPanel的值
            xmlpanel = self.xmlpanel_checkbox.isChecked()

            # 创建 JSON 数据
            data = {
                "file": file,
                "file description": description,
                "selection": selection,
                "selection description": selection_description,
                "XMLPanel": xmlpanel,
                "input parameters": input_parameters,
                "detail": detail,
                "detail description": note,
                "steps": steps
            }

            # 将数据转换为 JSON 字符串
            json_data = json.dumps(data, indent=4, ensure_ascii=False)
            self.json_output.setText(json_data)

            # 调整 QTextEdit 高度以适应内容
            self.adjust_text_edit_height()

            print(data)

        except ValueError as e:
            # 显示错误消息
            QMessageBox.critical(self, "输入错误", str(e))
        except Exception as e:
            # 捕获其他异常
            QMessageBox.critical(self, "错误", f"发生错误：{str(e)}")

    def save_to_file(self):
        try:
            # 获取生成的JSON数据
            json_data = self.json_output.toPlainText()
            if not json_data:
                raise ValueError("没有生成的JSON数据可供保存")

            # 保存到文件
            file_name = "output.json"  # 默认文件名
            with open(file_name, 'w', encoding='utf-8') as f:
                content = "var descriptions=" + json_data + ";"
                f.write(content)

            # 显示保存成功消息
            QMessageBox.information(self, "保存成功", f"JSON数据已保存到文件：{os.path.abspath(file_name)}")

        except ValueError as e:
            # 显示错误消息
            QMessageBox.critical(self, "保存错误", str(e))
        except Exception as e:
            # 捕获其他异常
            QMessageBox.critical(self, "保存错误", f"发生错误：{str(e)}")

    def adjust_text_edit_height(self):
        # 调整 QTextEdit 高度以适应内容
        doc = self.json_output.document()
        margin = self.json_output.contentsMargins().top() + self.json_output.contentsMargins().bottom()
        new_height = doc.size().height() + margin
        self.json_output.setFixedHeight(new_height)  # 设置固定高度[^40^]


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = JSONInputApp()
    window.show()
    sys.exit(app.exec())
