# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : files_pro
# @File    : file.py
# @Time    : 2024/07/08 0:16
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
import os
import re

from my_base.print_color import print_color, TextColor

CREATE_COLOR = TextColor.YELLOW

WARNNING_COLOR = TextColor.RED


class File:
    def __init__(self, file_path, callbacks=None):
        self.callbacks = callbacks
        self.file_path = file_path
        # 提取文件名
        self.file_name = os.path.basename(file_path)
        # 文件内容
        self.content = self.read_file()

    def read_file(self):
        try:
            with open(self.file_path, 'r', encoding="utf-8") as file:
                content = file.read()
            if self.callbacks is not None:
                content = self.callbacks(content)
            return content
        except FileNotFoundError:
            print_color(f"File not found: {self.file_path}", WARNNING_COLOR)
            return ""

    def write_new_content(self,new_content):
        # 使用 'w' 模式打开文件，这会清空文件原有内容，并允许写入新内容
        with open(self.file_path, 'w', encoding="utf-8") as file:
            file.write(new_content)

    def read_lines(self):
        try:
            with open(self.file_path, 'r', encoding="utf-8") as file:
                content = file.readlines()
            if self.callbacks is not None:
                content = self.callbacks(content)
            return content
        except FileNotFoundError:
            print_color(f"File not found: {self.file_path}", WARNNING_COLOR)
            return None

    def create_file(self, file_content=""):
        # print(self.file_path)

        # 使用os.path.split()分割路径和文件名
        folder, filename = os.path.split(self.file_path)
        self.create_folder(folder)
        safe_filename = self.get_safe_filename(filename)

        full_name = os.path.join(folder, safe_filename)

        # 创建文件
        with open(full_name, 'w', encoding="utf-8") as file:
            file.write(file_content)

        print_color(f"文件 '{full_name}' 已经创建。", CREATE_COLOR)

    @staticmethod
    def get_safe_filename(filename):
        """
        清理文件名，移除或替换非法字符。

        :param filename: 原始文件名
        :return: 清理后的文件名
        """
        # 定义Windows系统中的非法字符
        illegal_chars = r'<>:"/\|?*'
        illegal_chars += ' '

        # 使用正则表达式替换非法字符为  删除
        safe_filename = re.sub(f'[{re.escape(illegal_chars)}]', '', filename)

        # 移除文件名开头和结尾的点
        safe_filename = safe_filename.strip('.')

        return safe_filename

    @staticmethod
    def has_extension(file_name):
        # 获得文件名的扩展名
        base_name, ext_name = os.path.splitext(file_name)

        if ext_name:
            return True

        return False

    @staticmethod
    def create_folder(folder_path):
        # 检查文件夹是否存在
        if not os.path.exists(folder_path):
            # 如果文件夹不存在，则创建文件夹
            os.makedirs(folder_path)
            print_color(f"文件夹 '{folder_path}' 已创建。", CREATE_COLOR)
            return True
        else:
            # print_color(f"文件夹 '{folder_path}' 已存在。")
            return False
