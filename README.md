# 欢迎来到 AnJsflScript！！！

[![AnJsflScript/v0.1.0](https://badgen.net/badge/AnJsflScript/v0.1.0/green?icon=github&labelColor=black)](https://github.com/rabit2022/AnJsflScript)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Adobe Animate 2024](https://badgen.net/badge/Adobe%20Animate/2024/blue?icon=adobe&labelColor=black)](https://www.adobe.com/products/animate.html)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Documentation](https://badgen.net/badge/Documentation/Available/orange)](https://github.com/rabit2022/AnJsflScript#readme)

---

**AnJsflScript** 是一个专为 Adobe Animate 设计的 JavaScript For Flash (JSFL)
脚本集合，旨在通过自动化任务提升工作效率，帮助用户更高效地完成重复性工作，从而专注于创意与设计。

---

## 1. 安装与准备

- **Adobe Animate**：确保已安装最新版本的 Adobe Animate（例如 Adobe Animate 2024）。这是运行 AnJsflScript 的基础环境。
- **JavaScript For Flash (JSFL)**：Adobe Animate 内置了 JSFL 支持，无需额外安装。

---

## 2. 使用步骤

### 2.1 下载项目

- **下载最新版本**：访问本项目的 [GitHub 仓库](https://github.com/rabit2022/AnJsflScript/tags) 并下载最新发布的 tag
  版本。tag 版本经过相对稳定，适合大多数用户使用。当前项目可能会进行重构等操作，因此建议始终使用最新发布的 tag 版本。
- **解压到本地**：将下载的文件解压到本地的一个合适位置，例如 `C:\AnJsflScript`。

### 2.2 打开 Adobe Animate 并新建或打开文档

- **启动软件**：打开 Adobe Animate，确保软件正常运行。
- **新建或打开文档**：必须先打开一个文档，才能运行脚本。这是因为脚本需要在具体的文档环境中操作，否则可能无法正常工作。

### **2.3 运行 `FirstRun.jsfl` 脚本**

#### **功能**

- `FirstRun.jsfl` 是一个初始化脚本，主要用于配置环境和加载必要的设置，例如 `requirejs` 和 `es5-shim` 等。
- 这些设置是其他脚本正常运行的基础。

#### **运行方法**

1. **通过 Adobe Animate 运行**
    - 打开 Adobe Animate。
    - 选择 `命令 > 运行命令`。
    - 导航到解压后的 `AnJsflScript` 文件夹，选择 `FirstRun.jsfl` 脚本并运行。
2. **直接双击运行**
    - 找到解压后的 `AnJsflScript` 文件夹。
    - 直接双击 `FirstRun.jsfl` 脚本文件。
    - 如果安装了 Adobe Animate，JSFL 文件的默认打开方式是在 Adobe Animate 中打开。

#### **重要提示**

- 每次打开 Adobe Animate 时，都必须先运行 `FirstRun.jsfl` 脚本，否则其他脚本可能无法正常工作。

### **2.4 运行其他脚本**

#### **脚本位置**

- 除了 `脚本功能说明` 的脚本和文件夹外，其他脚本通常位于以数字开头的文件夹中，例如 `00.快捷/00.跨域剪切.jsfl` 等。

#### **使用方法**

- 每个脚本的具体功能和使用方法可以在其文件名或注释中找到详细说明。
- **通过 Adobe Animate 运行**
- **直接双击运行**

---

## 3. 脚本功能说明

### FirstRun.jsfl

- **功能**：初始化环境，加载必要的配置和设置。例如加载 `requirejs` 和 `es5-shim` 等核心模块。
- **使用方法**：每一次打开 Adobe Animate 软件时，都必须先运行此脚本。

### ReRun.jsfl

- **功能**：重置 `requirejs`，清除缓存，重新加载脚本。但请注意，`shim` 模块不会被重新加载。
- **使用方法**：如果你修改了 `core` 文件夹中的模块，并希望这些修改生效，必须清除 `requirejs` 缓存。运行 `ReRun.jsfl`
  脚本后，再运行 `FirstRun.jsfl` 脚本。建议在 IDE 中配置实现这一过程，以提高效率。

### Core 文件夹

- **功能**：存放核心脚本，包括各种工具类脚本。这些脚本是 AnJsflScript 的基础功能模块。
- **使用方法**：通过 `requirejs` 加载。你可以根据需要调用这些工具类脚本，实现各种自动化任务。

### Third 文件夹

- **功能**：存放第三方库脚本，例如 `requirejs` 和 `es5-shim` 等。这些库为 AnJsflScript 提供了必要的支持。
- **使用方法**：同样通过 `requirejs` 加载。这些第三方库在初始化时由 `FirstRun.jsfl` 脚本加载，为其他脚本提供支持。

### **types** 文件夹

- **功能**：
    - 存放与脚本相关的类型定义文件（通常是 `.d.ts` 文件）。这些文件为脚本提供类型支持，帮助开发者在编写代码时获得更好的提示和代码补全功能。例如，TypeScript
      类型定义文件可以确保代码的类型安全性和可维护性。
- **使用方法**：
    - 这些类型定义文件通常在开发过程中由 `requirejs` 或其他模块加载器加载。开发者在编写脚本时，可以通过引用这些类型定义文件来增强代码的可读性和稳定性。

### **文档** 文件夹

- **功能**：
    - 存放与脚本相关的文档文件，例如使用说明、API 文档、教程、例子等。这些文档为用户提供脚本的详细功能描述、使用方法和示例，帮助用户更好地理解和使用脚本。
- **使用方法**：
    - 建议开发者阅读，用户可以根据需要阅读文档。

---

## 4. 注意事项

- **运行顺序**：请确保先运行 `FirstRun.jsfl` 脚本，并且必须打开文档，否则其他脚本可能无法正常工作。
- **文档打开**：脚本需要在具体的文档环境中运行，因此必须先打开一个文档。
- **版本兼容性**：虽然 AnJsflScript 旨在与最新版本的 Adobe Animate 兼容，但由于软件更新可能导致某些功能发生变化，使用的是
  Adobe Animate 2024 版本，因此可能会遇到一些兼容性问题。

---

## 5. 贡献与反馈

- **贡献**：欢迎开发者贡献新的脚本或改进现有脚本。
- **反馈**
  ：如果在使用过程中遇到问题，或有任何建议，请通过 [GitHub Issues](https://github.com/rabit2022/AnJsflScript/issues)
  提交反馈，或者通过其他方式联系我。

---

## 6. 参考项目

[![WindowSWF](https://img.shields.io/badge/WindowSWF-Gitee-4caf50)](https://gitee.com/ninge/WindowSWF/tree/master/)
[![xJSFL](https://img.shields.io/badge/xJSFL-GitHub-2196f3)](https://github.com/davestewart/xJSFL)

[![SAT.js](https://img.shields.io/badge/SAT.js-v0.9.0-f44336)](https://github.com/jriecken/sat-js)
[![RequireJS](https://img.shields.io/badge/RequireJS-v2.3.7-ffeb3b)](https://github.com/requirejs/requirejs)

[![CoreJS](https://img.shields.io/badge/CoreJS-v3.41.0-ff9800)](https://github.com/zloirock/core-js)
[![LINQ.js](https://img.shields.io/badge/LINQ.js-v4.0.3-9c27b0)](https://github.com/neuecc/linq.js)
[![Lodash](https://img.shields.io/badge/Lodash-v4.17.21-2196f3)](https://github.com/lodash/lodash)
[![Loglevel](https://img.shields.io/badge/Loglevel-v1.9.2-4caf50)](https://github.com/pimterry/loglevel)
[![Path-Browserify](https://img.shields.io/badge/Path--Browserify-v1.0.1-ffeb3b)](https://github.com/browserify/path-browserify)

[![ES5-Shim](https://img.shields.io/badge/ES5--Shim-v4.6.7-9c27b0)](https://github.com/es-shims/es5-shim)
[![ES6-Shim](https://img.shields.io/badge/ES6--Shim-v0.35.4-ff9800)](https://github.com/es-shims/es6-shim)
[![json3-3.3.3](https://img.shields.io/badge/json3-3.3.3-blue)](https://github.com/bestiejs/json3)
[![sprintf-js-1.1.3](https://img.shields.io/badge/sprintf.js-v1.1.3-green)](https://github.com/alexei/sprintf.js)

##### 为了使得以上项目能够在 Adobe Animate 中正常运行，部分进行了大量的修改，并且全部更改为 requirejs 模块化加载。

---

## 7. 待确认

### 1. Adobe Animate 2024 支持的 ES6 特性是否在其他旧版本可用

#### 支持的 ES6 特性

- **`const`**：支持使用 `const` 声明变量，替代传统的 `var`。
- **解构赋值**：支持数组和对象的解构赋值，简化变量提取过程。

#### 示例代码

以下代码展示了在 Adobe Animate 2024 中可以使用的 ES6 特性：

```javascript
(function () {
    const fruits = ['apple', 'banana', 'cherry'];
    const [firstFruit, secondFruit] = fruits;
    console.log(firstFruit); // 输出: apple
    console.log(secondFruit); // 输出: banana
})();
```

---

## 8. 项目规模

- **代码行数**: 7862
- **字符数量**: 187924
- **脚本数量**: 68
- **第三方库数量**：11
- **界面访问量**：
  ![访问统计](https://profile-counter.glitch.me/AnJsflScript/count.svg)

---

希望这份文档能帮助你更好地了解和使用 AnJsflScript。如果你有任何疑问或建议，请随时与我们联系。感谢你的支持！

---

### 作者：[![穹的兔兔](https://badgen.net/badge/bilibili/穹的兔兔/pink?icon=bilibili&labelColor=blue)](https://space.bilibili.com/453222786?spm_id_from=333.788.0.0)

### 联系方式：

- QQ：3101829204
- Email：3101829204@qq.com
- B站：
  [![BiliBili](https://stats.justsong.cn/api/bilibili?id=453222786&theme=dark&lang=zh-CN)](https://space.bilibili.com/453222786?spm_id_from=333.788.0.0)
