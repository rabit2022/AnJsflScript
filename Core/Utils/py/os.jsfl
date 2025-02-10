/**
 * @file: os.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 13:06
 * @project: AnJsflScript
 * @description:
 */

define(function () {

    function OSPath() {
    }

    /**
     * 插件位置
     * @type {string}
     * @readonly
     * @static
     */
    OSPath.PLUGIN_PATH = fl.configURI + "WindowSWF";
    /**
     * 命令位置
     * @type {string}
     * @readonly
     * @static
     */
    OSPath.COMMAND_PATH = fl.configURI + "Commands";

    OSPath.abspath = function (relativePath) {
        // 将当前工作目录和相对路径合并
        var absolutePath = relativePath;
        // var currentWorkingDirectory = getCurFolderURI();
        var currentWorkingDirectory = os.getcwd();

        // 如果相对路径不是以 '/' 开头，将其与当前工作目录合并
        if (!relativePath.startsWith('/')) {
            absolutePath = currentWorkingDirectory + '/' + relativePath;
        }

        // 标准化路径（例如，处理 '..' 和 '.')
        absolutePath = absolutePath.replace(/\/\//g, '/')
            .replace(/(\/\.)+/g, '/')
            .replace(/\/[^\/]+/g, function (p, offset) {
                if (p === '/..') {
                    // 如果是上一级目录，则需要去掉最后一个真实目录
                    return '/' + p;
                } else {
                    // 否则，保留当前目录
                    return p;
                }
            })
            .replace(/^\//, '');

        return absolutePath;
    }
    OSPath.basename = function (path) {
        return path.split('/').pop();
    }
    OSPath.dirname = function (path) {
        return path.split('/').slice(0, -1).join('/');
    }
    OSPath.exists = function (uri) {
        return FLfile.exists(uri);
    }
    OSPath.isAbs = function (path) {
        // return path.startsWith('/');
        // // Unix 和 Linux 的绝对路径判断
        // if (path.startsWith('/')) {
        //     return true;
        // }

        // Windows 的绝对路径判断
        // 检查是否以盘符加冒号和反斜杠开头，如 C:\ 或 \\server\share
        if (os.isWindows() && /^[a-zA-Z]:\\/.test(path) || /^\\\\/.test(path)) {
            return true;
        }

        // 如果不是以上情况，则不是绝对路径
        return false;
    }
    OSPath.isfile = function (uri) {
        var [root, ext] = this.splitext(uri);
        return ext.length > 0;
    }
    OSPath.isdir = function (uri) {
        var [root, ext] = this.splitext(uri);
        return ext.length === 0;
    }


    /**
     * 规范路径的大小写。
     * 在 Windows 上，将路径中的所有字符都转换为小写，并将正斜杠转换为反斜杠。在其他操作系统上返回原路径。
     * @param {string} path - 要规范化的路径。
     * @return {string} - 规范化后的路径。
     */
    OSPath.normcase = function (path) {
        // 在 Windows 上，将路径中的所有字符都转换为小写，并将正斜杠转换为反斜杠
        if (os.isWindows()) {
            return path.toLowerCase().replace(/\\/g, '/');
        }

        // 在其他操作系统上，返回原路径
        return path;
    }

    /**
     * 规范化路径。
     * 通过折叠多余的分隔符和对上级目录的引用来标准化路径名，所以 A//B、A/B/、A/./B 和 A/foo/../B 都会转换成 A/B。这个字符串操作可能会改变带有符号链接的路径的含义。
     * 在 Windows 上，本方法将正斜杠转换为反斜杠。要规范大小写，请使用 normcase()。
     * @param {string} path - 要规范化的路径。
     * @return {string} - 规范化后的路径。
     * @private
     */
    OSPath.normpath = function (path) {
        var isWindows = os.isWindows();
        const separator = isWindows ? '\\' : '/';
        var normalizedParts = [];

        path = path.replace(/\/\//g, '/');
        var parts = path.split(separator);

        for (var i = 0; i < parts.length; i++) {
            const part = parts[i];

            // 忽略空路径部分
            if (!part) continue;

            // 处理绝对路径
            if (part.startsWith(separator) || (isWindows && /^[A-Z]:/i.test(part))) {
                normalizedParts = [part];
            } else if (part.startsWith('..')) {
                // 处理上一级目录
                while (normalizedParts.length > 0 && !(normalizedParts[normalizedParts.length - 1] === '..')) {
                    normalizedParts.pop();
                }
                normalizedParts.push(part);
            } else if (part.startsWith('.')) {
                // 处理当前目录
                continue;
            } else {
                // 处理普通目录
                normalizedParts.push(part);
            }
        }

        return normalizedParts.join(separator);
    }


    /**
     * 合并多个路径。
     *
     * 该函数接受多个路径作为输入，并将它们合并成一个路径。
     * 路径之间使用斜杠（`/`）分隔，并将所有路径规范化。
     *
     * @param {string[]} paths - 要合并的路径数组。
     * @return {string} - 合并后的路径。
     * @example
     * join(['/foo', 'bar', 'baz']) 返回 '/foo/bar/baz'
     * join(['/foo/bar', 'baz']) 返回 '/foo/bar/baz'
     */
    OSPath.join = function (paths) {
        // return this.normpath(paths.join('/'));
        return paths.join('/');
    }

    /**
     * 分割路径为头部（head）和尾部（tail）。
     *
     * 将路径拆分为两个部分：
     * - head：路径中除了最后一部分之外的所有内容。
     * - tail：路径的最后一部分，不包含斜杠。
     *
     * 如果路径以斜杠结尾，则tail为空字符串。如果路径中没有斜杠，则head为空字符串。
     * 如果路径为空，则head和tail均为空字符串。head末尾的斜杠会被去掉，除非它是根目录。
     *
     * @param {string} path - 要拆分的文件路径。
     * @return {[string, string]} - 一个包含head和tail的数组。
     * @example
     * 示例：
     * OSPath.split('bar') 返回 ['', 'bar']
     * OSPath.split('/foo/bar/') 返回 ['', '']
     */
    OSPath.split = function (path) {
        // 处理空路径的情况
        if (path === '') {
            return ['', ''];
        }

        // 找到最后一个斜杠的位置
        const lastSlashIndex = path.lastIndexOf('/');

        // 如果路径以斜杠结尾，tail为空
        var tail = '';
        if (lastSlashIndex === path.length - 1) {
            tail = '';
        } else {
            // 否则，tail是最后一个斜杠之后的部分
            tail = path.substring(lastSlashIndex + 1);
        }

        // head是除了tail之外的所有内容
        var head = path.substring(0, lastSlashIndex);

        // 如果head以斜杠开头，保留这些斜杠，除非head是空的
        if (head === '' || head === path) {
            head = '';
        } else if (head.endsWith('/')) {
            // 去掉head末尾的斜杠，除非它是根目录
            head = head.substring(0, head.length - 1);
        }

        return [head, tail];
    }
    /**
     * 分割路径为路径名和扩展名。
     *
     * 该函数接受一个文件路径作为输入，并将其拆分为两部分：路径名（root）和扩展名（ext）。
     * 扩展名包括前面的点（`.`），如果路径中没有扩展名，则返回一个空字符串。
     * 如果路径以点开头，则认为整个路径是一个文件名，没有扩展名。
     *
     * @param {string} path - 要拆分的文件路径。
     * @return {[string, string]} [root, ext] - 一个包含路径名和扩展名的数组。
     * @example
     * splitext('bar') 返回 ['bar', '']，因为没有扩展名。
     * splitext('foo.bar.exe') 返回 ['foo.bar', '.exe']，扩展名包括点。
     */
    OSPath.splitext = function (path) {
        // 找到最后一个和倒数第二个斜杠的位置
        const lastSlashIndex = path.lastIndexOf('/');
        const secondLastSlashIndex = path.lastIndexOf('/', lastSlashIndex - 1);

        // 找到最后一个点的位置
        const lastDotIndex = path.lastIndexOf('.');

        // 如果没有找到点或者点在最后一个斜杠之后，或者点是第一个字符
        // 或者点前面是斜杠（意味着点是路径的一部分，不是扩展名的开始）
        if (lastDotIndex === -1 || lastDotIndex < lastSlashIndex + 1 || path[lastDotIndex - 1] === '/' || path[0] === '.') {
            return [path, ''];
        }

        // root是路径除了扩展名之外的所有内容
        var root = path.substring(0, lastDotIndex);

        // ext是扩展名，包括打头的句点
        var ext = path.substring(lastDotIndex);

        return [root, ext];
    }


// 自定义函数
    /**
     * 获取路径的基本名称（basename）并去除其后缀（extension）。
     *
     * @param {string} path - 要处理的文件路径。
     * @return {string} - 去除后缀的文件基本名称。
     */
    OSPath.basenameWithoutExt = function (path) {
        // 获取路径的基本名称
        const basename = OSPath.basename(path);

        // 获取路径的扩展名
        const [root, ext] = OSPath.splitext(basename);

        // 返回去除扩展名的基本名称
        return root;
    }


    function OS() {
    }

    OS.path = OSPath;

    OS.isMac = function () {
        return (fl.version.search(/mac/i) > -1);
    }

    /**
     * 判断是否为 Windows 操作系统。
     * WIN 24,0,0,305
     * @returns {boolean}
     */
    OS.isWindows = function () {
        return (fl.version.search(/win/i) > -1);
    }


    /**
     * 获取当前工作目录。
     *
     * @return {string} - 当前工作目录的路径。
     */
    OS.getcwd = function () {
        // 获取当前脚本文件的完整路径
        var scriptURI = fl.scriptURI;
        // 获取路径中最后一个“/”的位置
        var lastSlashIndex = scriptURI.lastIndexOf("/");
        // 获取脚本文件所在的文件夹路径
        var folderPath = scriptURI.substring(0, lastSlashIndex);
        return folderPath;
    }

    /**
     * 创建目录。
     *
     * @param {string} uri - 要创建的目录的路径。
     */
    OS.mkdir = function (uri) {
        var success = FLfile.createFolder(uri);
        if (success) {
            print("Folder created: " + uri);
        } else {
            print("Failed : " + uri);
        }
    }

    /**
     * 打开文件或目录。
     *
     * @param {string} path - 要打开的文件或目录的路径。
     * @param {"open"|"print"|"edit"|"explore"|"find"|undefined} [operation] - 要执行的操作。
     * @param {string} [arguments] - 要传递给操作的参数。
     * @param {string} [cwd] - 工作目录。
     * @param {number} [show_cmd] - 窗口样式。
     */
    OS.startfile = function (path, operation, arguments, cwd, show_cmd) {
        // 转换路径为平台路径
        var uri = FLfile.uriToPlatformPath(path);

        // 转换工作目录为平台路径（如果提供）
        var cwd_uri = cwd ? FLfile.uriToPlatformPath(cwd) : "";

        // 构建命令
        var cmd;

        if (this.isMac()) {
            // macOS 使用 `open` 命令
            cmd = "open \"" + uri + "\"";

            // 添加操作参数
            if (operation) {
                cmd += " -a \"" + operation + "\"";
            }

            // 添加额外参数
            if (arguments) {
                cmd += " --args " + arguments;
            }

            // 添加工作目录
            if (cwd_uri) {
                cmd += " --cwd \"" + cwd_uri + "\"";
            }
        } else if (this.isWindows()) {
            // Windows 使用 `start` 或 `explorer.exe` 命令
            switch (operation) {
                case "open":
                    cmd = "start \"\" \"" + uri + "\"";
                    break;
                case "print":
                    cmd = "start \"\" /print \"" + uri + "\"";
                    break;
                case "edit":
                    cmd = "notepad \"" + uri + "\"";
                    break;
                case "explore":
                    cmd = "explorer.exe /e,\"" + uri + "\"";
                    break;
                case "find":
                    cmd = "explorer.exe /select,\"" + uri + "\"";
                    break;
                default:
                    cmd = "start \"\" \"" + uri + "\"";
                    break;
            }

            // 添加工作目录
            if (cwd_uri) {
                cmd = "pushd \"" + cwd_uri + "\" && " + cmd + " && popd";
            }

            // 添加窗口样式（仅 Windows 支持）
            if (show_cmd && os.isWindows()) {
                cmd = "start /show " + show_cmd + " \"\" \"" + uri + "\"";
            }
        }

        // 执行命令
        FLfile.runCommandLine(cmd);

        // 打印命令（调试用）
        print("Command executed: " + cmd);
    };

    /**
     * 返回一个包含由 path 指定目录中条目名称组成的列表。
     * @param {string} [uri='.'] - 要列出的目录的路径。
     * @returns {string[]} - 包含目录条目的数组。
     */
    OS.listdir = function (uri) {
        var files = FLfile.listFolder(uri);
        // print(files);
        return files;
    };

    return OS;
});
