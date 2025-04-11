# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : files_pro
# @File    : files.py
# @Time    : 2024/07/09 13:48
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$
from typing import List

from my_base.file import File


class Files:
    def __init__(self, file_paths: List[str]):
        self.File_Obj = list(map(File, file_paths))

    def read_files(self, callback=None) -> List[str]:
        contents = []
        for file_obj in self.File_Obj:
            content = file_obj.read_file()
            if callback is not None:
                content = callback(content,file_obj)

            contents.append(content)
        return contents

    def write_new_content(self, new_contents):
        for i,fileobj in enumerate(self.File_Obj):
            content=new_contents[i]
            fileobj.write_new_content(content)

    def read_lines(self, callback=None):
        contents = []
        for file_obj in self.File_Obj:
            content = file_obj.read_lines()
            if callback is not None:
                content = callback(content)
            contents.append(content)
        return contents

    def create_files(self, file_contents=None):
        n_file = len(self.File_Obj)

        if file_contents is None:
            file_contents = [""] * n_file

        for i in range(n_file):
            file_obj = self.File_Obj[i]

            content = file_contents[i]
            file_obj.create_file(content)

    def create_folders(self):
        """
        在指定路径下创建多个文件夹。

        Args:
        names (list): 包含要创建的文件夹名字的列表。

        Returns:
        list: 创建成功的文件夹完整路径列表。
        """
        created_folders = []
        for folder_path in  self.file_paths:
            if File.create_folder(folder_path):
                created_folders.append(folder_path)

        return created_folders

if __name__ == '__main__':
    folder_path = "./res"
    from my_base.folder_traverser import FolderTraverser

    files = FolderTraverser(folder_path).get_fpaths()
    f = Files(files)
    print(f.read_files())
