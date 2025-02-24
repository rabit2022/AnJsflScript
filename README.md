# 欢迎来到 AnJsflScript！！！

**AnJsflScript** 是一个专为 Adobe Animate 设计的 JavaScript FL (JSFL) 脚本集合，旨在通过自动化任务提升工作效率，帮助用户更高效地完成重复性工作，从而专注于创意与设计。

---

## 1. 安装与准备

- **Adobe Animate**：确保已安装最新版本的 Adobe Animate。这是运行 AnJsflScript 的基础环境。
- **JavaScript FL (JSFL)**：Adobe Animate 内置了 JSFL 支持，无需额外安装。这意味着你可以直接使用 AnJsflScript，无需担心兼容性问题。

---

## 2. 使用步骤

### 2.1 下载项目

- **下载最新版本**：访问本项目的 GitHub 仓库并下载最新发布的[ tag 版本](https://github.com/rabit2022/AnJsflScript/tags)。tag 版本经过相对稳定，适合大多数用户使用。当前项目可能会进行重构等操作，因此建议始终使用最新发布的 tag 版本。
- **解压到本地**：将下载的文件解压到本地的一个合适位置，例如 `C:\AnJsflScript` 或 `~/Documents/AnJsflScript`。

### 2.2 打开 Adobe Animate 并新建或打开文档

- **启动软件**：打开 Adobe Animate，确保软件正常运行。
- **新建或打开文档**：必须先打开一个文档，才能运行脚本。这是因为脚本需要在具体的文档环境中操作，否则可能无法正常工作。

### 2.3 运行 FirstRun.jsfl 脚本

- **运行脚本**：在 Adobe Animate 中，选择 `命令 > 运行命令`，导航到解压后的 `AnJsflScript` 文件夹，选择 `FirstRun.jsfl` 脚本并运行。
- **脚本功能**：`FirstRun.jsfl` 是初始化脚本，用于配置环境和加载必要的设置，例如 `requirejs` 和 `es5-shim` 等。这些设置是其他脚本正常运行的基础。
- **重要提示**：每一次打开 Adobe Animate 软件时，都必须先运行此脚本，否则其他脚本可能无法正常工作。

### 2.4 运行其他脚本

- **脚本位置**：除了 `Core`, `Third` 文件夹中的脚本外的文件夹中。例如`00.跨域剪切.jsfl`等。
- **使用方法**：每个脚本的具体功能和使用方法可以在其文件名或注释中找到详细说明。一般双击脚本文件，即可运行。

---

## 3. 脚本功能说明

### FirstRun.jsfl

- **功能**：初始化环境，加载必要的配置和设置。例如加载 `requirejs` 和 `es5-shim` 等核心模块。
- **使用方法**：每一次打开 Adobe Animate 软件时，都必须先运行此脚本。

### ReRun.jsfl

- **功能**：重置 `requirejs`，清除缓存，重新加载脚本。但请注意，`shim` 模块不会被重新加载。
- **使用方法**：如果你修改了 `core` 文件夹中的模块，并希望这些修改生效，必须清除 `requirejs` 缓存。运行 `ReRun.jsfl` 脚本后，再运行 `FirstRun.jsfl` 脚本。建议在 IDE 中配置实现这一过程，以提高效率。

### Core 文件夹

- **功能**：存放核心脚本，包括各种工具类脚本。这些脚本是 AnJsflScript 的基础功能模块。
- **使用方法**：通过 `requirejs` 加载。你可以根据需要调用这些工具类脚本，实现各种自动化任务。

### Third 文件夹

- **功能**：存放第三方库脚本，例如 `requirejs` 和 `es5-shim` 等。这些库为 AnJsflScript 提供了必要的支持。
- **使用方法**：同样通过 `requirejs` 加载。这些第三方库在初始化时由 `FirstRun.jsfl` 脚本加载，为其他脚本提供支持。

---

## 4. 注意事项

- **运行顺序**：请确保先运行 `FirstRun.jsfl` 脚本，并且必须打开文档，否则其他脚本可能无法正常工作。
- **文档打开**：脚本需要在具体的文档环境中运行，因此必须先打开一个文档。
- **版本兼容性**：虽然 AnJsflScript 旨在与最新版本的 Adobe Animate 兼容，但由于软件更新可能导致某些功能发生变化，使用的是Adobe Animate 2024版本，因此可能会遇到一些兼容性问题。

---

## 5. 贡献与反馈

- **贡献**：欢迎开发者贡献新的脚本或改进现有脚本。
- **反馈**：如果在使用过程中遇到问题，或有任何建议，请通过GitHub Issues提交反馈，或者通过其他方式联系我。

---

## 6. 参考项目

- [**WindowSWF** ：b站up @见水中月](https://gitee.com/ninge/WindowSWF/tree/master/)
- [**es5-shim-4.6.7** : 当前es3环境， 补充 es5 环境的api](https://github.com/es-shims/es5-shim)
- [**es6-shim-0.35.4** : 当前es3环境，补充 es6 环境的api](https://github.com/es-shims/es6-shim)
- [**linq.js-4.0.3** : 一个jsLinq库，可以方便的进行数组的查询操作](https://github.com/neuecc/linq.js)
- [**requirejs-2.3.7** : 一个js模块加载器，可以方便的进行模块化开发](https://github.com/requirejs/requirejs)
- [**sat-js-0.9.0** : 一个js图形库，仅用到Vector代码，其他代码已经删除](https://github.com/jriecken/sat-js)

为了使得以上项目能够在 Adobe Animate 中正常运行，部分进行了大量的修改，并且全部更改为requirejs模块化加载。

---

希望这份文档能帮助你更好地了解和使用 AnJsflScript。如果你有任何疑问或建议，请随时与我们联系。感谢你的支持！

---

### 作者：穹的兔兔

### 联系方式：

- QQ：3101829204
- Email：3101829204@qq.com
- b站：[穹的兔兔](https://space.bilibili.com/453222786?spm_id_from=333.788.0.0)
