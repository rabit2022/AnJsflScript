# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : main.py
# @File    : main.py
# @Time    : 2024/12/18 13:32
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$

from my_base.files import Files
from my_base.folder_traverser import FolderTraverser

folderPath = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript"
extensions = [".jsfl"]
exclude_folders = [
    "Third",
    "test", "dp", "例子", "文档", "node_modules", r"lib\21.工具", r"lib\00.智能循环✔️", "types"
]
plist = FolderTraverser(folderPath, include_extensions=extensions, exclude_folders=exclude_folders).FilePaths

# print(len(plist))


# print(plist)
# for p in plist:
#     print(p)


def process(contents: list[str]) -> list[str]:
    res: list[str] = []
    for content in contents:
        content = content.strip()
        # 单行注释
        # 空行
        # 单行括号
        # 多行注释
        if content.startswith("//") \
                or content == "\n" \
                or content.startswith("{") or content.startswith("}") \
                or content.startswith("(") or content.startswith(")") \
                or content.startswith(") {") or content.startswith("});") or content.startswith("})();") \
                or content.startswith("*") or content.startswith("/**"):
            continue

        res.append(content)

    return res


fcs: list[list[str]] = Files(plist).read_lines(process)

# 行数
line_len = []
for fc in fcs:
    fcl = len(fc)
    line_len.append(fcl)

total = sum(line_len)
print("- **代码行数**:", total)
# 97985行

# 字符数
total = 0
for fc in fcs:
    for line in fc:
        total += len(line)

print("- **字符数量**:", total)

folderPath = r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript"
extensions = [".jsfl"]
exclude_folders = exclude_folders + ["Core",]
plist = FolderTraverser(folderPath, include_extensions=extensions, exclude_folders=exclude_folders).FilePaths

# print(plist)
# for l in plist:
#     print(l)

# 未完成，带"#"：3
# 排兵布阵  多文件排除：3
# first run:3
exclude_count = 9

print("- **脚本数量**:", len(plist) - exclude_count)
# print(plist)
# for i in plist:
#     print(i)
