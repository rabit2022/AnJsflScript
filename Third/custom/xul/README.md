# XUL

欢迎使用 XUL，这是一个 由模版 生成 对应 的 XUL 控件的 JavaScript 库，主要用于为 Flash 提供 简洁的 XUL API。

## 项目概述

1. **目标**：为 Flash 提供 XUL（XML User Interface Language） 支持，通过读取 模版 文件并从中提取对应的控件，最终形成简洁的
   API。
   XUL 是一种用于描述用户界面的 XML 语言，通常用于构建跨平台的桌面应用程序，例如 Firefox 的界面就是基于 XUL 构建的。
2. **参考项目**：[XJSFL](https://github.com/davestewart/xJSFL), 提供了 类似的 API。
3. **实现方式**：通过解析 模版 文件，使用简洁的 API 生成 Flash 用户界面，并支持事件处理。

## 示例代码分析

#### 示例 1：简单对话框

```javascript
const XUL = require('./src/xul');

// 创建简单对话框
const dialog = new XUL('我的对话框')
    .addTextbox('用户名', 'username', {prompt: '请输入用户名'})
    .addColorchip('颜色', 'color', {color: '#ff0000'})
    .addPopupSlider('年龄', 'age', {value: 25, minvalue: 18, maxvalue: 99});

console.log(dialog.XML);
```

```XML

<dialog id="dialog" title="我的对话框" buttons="accept,cancel">
    <content>
        <grid>
            <columns id="columns">
                <column flex="1"/>
                <column flex="2"/>
            </columns>
            <rows id="controls">
                <row template="textbox">
                    <label value="用户名" width="100"/>
                    <textbox class="control" id="username" value="" maxlength="" prompt="请输入用户名" size=""
                             multiline="false" width="180" flex="1"/>
                </row>
                <row template="colorchip">
                    <label value="颜色" width="100"/>
                    <colorchip class="control" id="color" color="#ff0000" format="hex" width="180"/>
                </row>
                <row template="popupslider">
                    <label value="年龄" width="100"/>
                    <popupslider class="control" id="age" value="25" minvalue="18" maxvalue="99" orientation="horz"
                                 tabindex="" width="180" flex=""/>
                </row>
            </rows>
        </grid>
    </content>
</dialog>

```

#### 示例 2：高级用法

```javascript
const XUL = require('./src/xul');

// 创建简单对话框
const dialog = new XUL('我的对话框')
    .addScript('script1', 'alert("Hello, world!");')
    .updateControl("script1", "", {content: "alert('Hello,');"})
    .addMenuList('菜单', 'ascii-art-menu', {}, [
        {label: '一万人', value: '-'},
        {label: '一万人就', value: '-'},
        {label: '一万人在', value: '-'},
        {label: '一万人有', value: '-'}
    ])
    .addEvent("focus", 'ascii-art-menu', function () {
        fl.trace("focus");
    });

console.log(dialog.XML);
```

```XML

<dialog id="dialog" title="我的对话框" buttons="accept,cancel">
    <content>
        <grid>
            <columns id="columns">
                <column flex="1"/>
                <column flex="2"/>
            </columns>
            <rows id="controls">
                <row template="script">
                    <script>

                        // JavaScript code here
                        alert('Hello,');
                    </script>
                </row>
                <row template="menulist">
                    <label width="100"/>
                    <menulist class="control" id="ascii-art-menu" editable="" width="180" flex="1" tabindex=""
                              oncreate="" onsetfocus="fl.trace('focus');">
                        <menupop class="control" id="menupop" width="180">
                            <menuitem label="一万人" value="-"/>
                            <menuitem label="一万人就" value="-"/>
                            <menuitem label="一万人在" value="-"/>
                            <menuitem label="一万人有" value="-"/>
                        </menupop>
                    </menulist>
                </row>
            </rows>
        </grid>
    </content>
</dialog>
```

## 打包方法

- **命令**：`npm run build`
- **结果**：打包后的文件可以在 Flash 环境中运行，但由于依赖较多且 Flash 是单线程环境，并且不支持异步加载，所以运行起来可能会比较卡顿。


