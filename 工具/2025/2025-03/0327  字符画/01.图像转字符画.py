# !/usr/bin/env python
# -*-coding:utf-8 -*-
# @Project : 文档
# @File    : main.py
# @Time    : 2025/03/27 20:47
# @Author  : 穹的兔兔
# @Version : python3.10
# @IDE     : PyCharm
# @Origin  :
# @Description: $END$


from ascii_magic import AsciiArt

my_art = AsciiArt.from_image('./output/output.png')
# my_art.to_terminal(columns=200, char='#')

# CHARS_BY_DENSITY = ' .`-_\':,;^=+/"|)\\<>)iv%xclrs{*}I?!][1taeo7zjLunT#JCwfy325Fp6mqSghVd4EgXPGZbYkOA&8U$@KHDBWNMR0Q'
# bug: chars = char if char else CHARS_BY_DENSITY
# cutom_char='@#*=-'
cutom_char = ' ###'

my_art.to_file('./output/ascii_art.txt', columns=80, monochrome=True,
               char=cutom_char
               )
