# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : 格式化.py
# @Time    : 2025/03/27 21:33
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$




def adjust_padding(file_path, out_path, padding):
    """
    修改字符画文件，确保上下左右的空格数量符合指定的padding值。

    :param file_path: 字符画文件的输入路径
    :param out_path: 字符画文件的输出路径
    :param padding: 指定的空格数量（整数）
    """
    # try:
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # 初始化边界值
    min_row = float('inf')
    max_row = -1
    min_col = float('inf')
    max_col = -1

    # 找到最大矩形的边界
    for i, line in enumerate(lines):
        for j, char in enumerate(line):
            if char != ' ' and char != '\n':
                min_row = min(min_row, i)
                max_row = max(max_row, i)
                min_col = min(min_col, j)
                max_col = max(max_col, j)

    # 调整每一行的左右空格
    adjusted_lines = []
    for i, line in enumerate(lines):
        if min_row <= i <= max_row:
            # 提取有效内容，并在两侧添加指定数量的空格
            # print("pa",padding)
            padding_space=' ' * padding
            adjusted_line = padding_space + line[min_col:max_col+1].rstrip() + padding_space
            adjusted_lines.append(adjusted_line)
        else:
            adjusted_lines.append(line)

    # 调整整个字符画的上下空格
    top_padding = [' ' * (max_col - min_col + 1 + 2 * padding)] * padding
    bottom_padding = [' ' * (max_col - min_col + 1 + 2 * padding)] * padding

    # 组合最终内容
    final_content = top_padding + adjusted_lines[min_row:max_row+1] + bottom_padding

    # 保存修改后的内容
    with open(out_path, 'w', encoding='utf-8') as file:
        file.write('\n'.join(final_content))

    print(f"字符画文件已成功调整，上下左右空格数量为：{padding}")
    print(f"调整后的文件已保存到：{out_path}")

    # except FileNotFoundError:
    #     print(f"文件未找到：{file_path}")
    # except Exception as e:
    #     print(f"发生错误：{e}")

# # 示例调用
# file_path = 'ascii_art.txt'  # 替换为你的字符画文件路径
# out_path = 'adjusted_ascii_art.txt'  # 替换为输出文件路径
# padding = 5  # 指定的空格数量（整数）
# adjust_padding(file_path, out_path, padding)


# print("jjj",' ' * 10)
# 示例调用
file_path = './output/ascii_art.txt'  # 替换为你的字符画文件路径
output_path='./output/ascii_art_format.txt'
padding = 5  # 指定的空格数量
adjust_padding(file_path, output_path,padding)
