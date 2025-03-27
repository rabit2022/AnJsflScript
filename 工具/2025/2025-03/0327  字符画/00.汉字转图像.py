# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : 汉字转图像.py
# @Time    : 2025/03/27 21:10
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$


from PIL import Image, ImageDraw, ImageFont


def text_to_image(text, font_path, font_size, text_color, bg_color, output_path):
    """
    将文本转换为图片并保存。

    :param text: 要绘制的文本（支持汉字）
    :param font_path: 字体文件路径
    :param font_size: 字体大小
    :param text_color: 文本颜色（格式为 (R, G, B)）
    :param bg_color: 背景颜色（格式为 (R, G, B)）
    :param output_path: 输出图片的路径
    """
    # 创建一个字体对象
    font = ImageFont.truetype(font_path, font_size)

    # 创建一个图片对象，大小根据文本内容动态调整
    img = Image.new("RGB", (font_size * len(text) *2, font_size*2), bg_color)
    draw = ImageDraw.Draw(img)

    # 在图片上绘制文本
    draw.text((10, 10), text, font=font, fill=text_color)

    # 保存图片
    img.save(output_path)
    print(f"图片已保存到 {output_path}")


# 示例调用
text = "一万人"
font_path = r".\font\fusion-pixel.ttf"  # 替换为你的字体文件路径
font_size = 40
text_color = (255, 255, 255)  # 白色
bg_color = (0, 0, 0)  # 黑色
output_path = "./output/output.png"

text_to_image(text, font_path, font_size, text_color, bg_color, output_path)