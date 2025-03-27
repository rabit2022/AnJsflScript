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
exclude_folders = [r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\node_modules",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Third",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\例子",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\文档",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\test",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\types",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib\21.工具",
                   r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib\00.智能循环",
                   # r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Core\Third"

                   ]
plist = FolderTraverser(folderPath, extensions, exclude_folders).FilePaths

toAddFile = [
    r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Core\Third\sat-js-0.9.0\SAT.jsfl",
    r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Core\Third\xjsfl\console.jsfl"

    ]


# print(len(plist))
# print(plist)


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
exclude_folders = exclude_folders + [r"F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\Core",
                                     ]
plist = FolderTraverser(folderPath, extensions, exclude_folders).FilePaths

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
