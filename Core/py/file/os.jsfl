/**
 * @file: os.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 13:06
 * @project: AnJsflScript
 * @description:
 */

define(["loglevel", "path-browserify"], function (log, path) {
    function OSPath() {}

    /**
     * 插件位置
     * @type {string}
     * @readonly
     * @static
     */
    OSPath.$PLUGIN_PATH = fl.configURI + "WindowSWF";
    /**
     * 命令位置
     * @type {string}
     * @readonly
     * @static
     */
    OSPath.$COMMAND_PATH = fl.configURI + "Commands";

    OSPath.abspath = function (relativePath) {
        const currentWorkingDirectory = OS.getcwd();
        return path.resolve(currentWorkingDirectory, relativePath);
    };
    OSPath.basename = path.basename;
    OSPath.dirname = path.dirname;
    OSPath.exists = FLfile.exists;
    OSPath.isAbs = path.isAbsolute;
    /**
     * 判断指定路径是否是文件
     * @param {string} uri 文件或文件夹的 URI
     * @return {boolean} 如果路径是文件，返回 true；否则返回 false
     */
    OSPath.isfile = function (uri) {
        // 获取路径的最后一部分（文件名或文件夹名）
        var name = uri.substring(uri.lastIndexOf("/") + 1);
        // 获取文件夹路径
        var folderURI = uri.substring(0, uri.lastIndexOf("/"));

        // 如果路径是根目录，直接返回 false
        if (folderURI === uri) {
            return false;
        }

        // 获取文件夹中的所有文件
        var fileList = FLfile.listFolder(folderURI, "files");

        // 检查文件列表中是否包含指定的文件名
        return fileList && fileList.indexOf(name) !== -1;
    };

    /**
     * 判断指定路径是否是文件夹
     * @param {string} uri 文件或文件夹的 URI
     * @return {boolean} 如果路径是文件夹，返回 true；否则返回 false
     */
    OSPath.isdir = function (uri) {
        // 获取路径的最后一部分（文件名或文件夹名）
        var name = uri.substring(uri.lastIndexOf("/") + 1);
        // 获取文件夹路径
        var folderURI = uri.substring(0, uri.lastIndexOf("/"));

        // 如果路径是根目录，直接返回 true
        if (folderURI === uri) {
            return true;
        }

        // 获取文件夹中的所有文件夹
        var folderList = FLfile.listFolder(folderURI, "directories");

        // 检查文件夹列表中是否包含指定的文件夹名
        return folderList && folderList.indexOf(name) !== -1;
    };

    /**
     * 规范路径的大小写。
     * 在 Windows 上，将路径中的所有字符都转换为小写，并将正斜杠转换为反斜杠。在其他操作系统上返回原路径。
     * @param {string} path - 要规范化的路径。
     * @return {string} - 规范化后的路径。
     */
    OSPath.normcase = function (_path) {
        // 在 Windows 上，将路径中的所有字符都转换为小写，并将正斜杠转换为反斜杠
        if (OS.$isWindows()) {
            _path = _path.toLowerCase().replace(/\\/g, "/");
            return _path;
        }

        // 在其他操作系统上，返回原路径
        return _path;
    };

    OSPath.normpath = path.normalize;

    /**
     * 合并多个路径。
     *
     * 该函数接受多个路径作为输入，并将它们合并成一个路径。
     * 路径之间使用斜杠（`/`）分隔，并将所有路径规范化。
     *
     * @param {...string} paths - 要合并的路径数组。
     * @return {string} - 合并后的路径。
     * @example
     * join(['/foo', 'bar', 'baz']) 返回 '/foo/bar/baz'
     * join(['/foo/bar', 'baz']) 返回 '/foo/bar/baz'
     */
    OSPath.join = function () {
        // 将 arguments 转换为数组
        var paths = Array.prototype.slice.call(arguments);
        // 使用 apply 将数组展开为参数
        var result = path.join.apply(path, paths);

        // 确保路径以 file:/// 开头
        result = result.replace("file:/", "file:///");
        return result;
    };

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
     * @param {string} _path - 要拆分的路径。
     * @return {[string, string]} - 一个包含head和tail的数组。
     * @example
     * 示例：
     * OSPath.split('bar') 返回 ['', 'bar']
     * OSPath.split('/foo/bar/') 返回 ['', '']
     */
    OSPath.split = function (_path) {
        const base = path.basename(_path);
        const dir = path.dirname(_path);
        return [dir, base];
    };
    /**
     * 分割路径为路径名和扩展名。
     *
     * 该函数接受一个文件路径作为输入，并将其拆分为两部分：路径名（root）和扩展名（ext）。
     * 扩展名包括前面的点（`.`），如果路径中没有扩展名，则返回一个空字符串。
     * 如果路径以点开头，则认为整个路径是一个文件名，没有扩展名。
     *
     * @param {string} _path - 要拆分的文件路径。
     * @return {[string, string]} [root, ext] - 一个包含路径名和扩展名的数组。
     * @example
     * splitext('bar') 返回 ['bar', '']，因为没有扩展名。
     * splitext('foo.bar.exe') 返回 ['foo.bar', '.exe']，扩展名包括点。
     */
    OSPath.splitext = function (_path) {
        const ext = path.extname(_path);
        const root = _path.replace(ext, "");
        return [root, ext];
    };

    OSPath.extname = path.extname;

    // 自定义函数
    /**
     * 获取路径的基本名称（basename）并去除其后缀（extension）。
     *
     * @param {string} _path - 要处理的文件路径。
     * @return {string} - 去除后缀的文件基本名称。
     */
    OSPath.$basenameWithoutExt = function (_path) {
        const [root] = this.splitext(path.basename(_path));
        return root;
    };

    function OS() {}

    OS.path = OSPath;

    OS.$isMac = function () {
        return fl.version.search(/mac/i) > -1;
    };

    /**
     * 判断是否为 Windows 操作系统。
     * WIN 24,0,0,305
     * @returns {boolean}
     */
    OS.$isWindows = function () {
        return fl.version.search(/win/i) > -1;
    };

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
    };

    /**
     * 创建目录。
     *
     * @param {string} uri - 要创建的目录的路径。
     */
    OS.mkdir = function (uri) {
        var success = FLfile.createFolder(uri);
        if (success) {
            log.info("Folder created: " + uri);
        } else {
            log.error("Failed : " + uri);
        }
    };

    /**
     * 递归创建目录。
     *
     * @param {string} uri - 要创建的目录的路径。
     * @param {boolean} [exist_ok=false] - 如果目录已存在，是否抛出异常。默认为 false。
     */
    OS.makedirs = function (uri, exist_ok) {
        if (exist_ok === undefined) {
            exist_ok = false;
        }

        const os = this;
        // 如果路径已存在，根据 exist_ok 参数决定是否抛出异常
        if (os.path.exists(uri)) {
            if (!exist_ok) {
                throw new Error("目录已存在:" + uri);
            }
            return;
        }
        // 递归创建父目录
        var parent_path = path.dirname(uri);
        if (parent_path && !os.path.exists(parent_path)) {
            this.makedirs(parent_path, exist_ok);
        }
        // 创建当前目录
        os.mkdir(uri);
        log.info("目录已创建:" + uri);
    };

    OS.rmdir = function (uri) {
        var success = FLfile.remove(uri);
        if (success) {
            log.info("Folder deleted: " + uri);
        } else {
            log.error("Failed : " + uri);
        }
    };

    /**
     * 打开文件或目录。
     *
     * @param {string} path - 要打开的文件或目录的路径。
     * @param {'open'|'printf'|'edit'|'explore'|'find'|undefined} [operation] - 要执行的操作。
     * @param {string} [args] - 要传递给操作的参数。
     * @param {string} [cwd] - 工作目录。
     * @param {number} [show_cmd] - 窗口样式。
     */
    OS.startfile = function (path, operation, args, cwd, show_cmd) {
        // 转换路径为平台路径
        var uri = FLfile.uriToPlatformPath(path);

        // 转换工作目录为平台路径（如果提供）
        var cwd_uri = cwd ? FLfile.uriToPlatformPath(cwd) : "";

        // 构建命令
        var cmd;

        if (this.$isMac()) {
            // macOS 使用 `open` 命令
            cmd = 'open "' + uri + '"';

            // 添加操作参数
            if (operation) {
                cmd += ' -a "' + operation + '"';
            }

            // 添加额外参数
            if (args) {
                cmd += " --args " + args;
            }

            // 添加工作目录
            if (cwd_uri) {
                cmd += ' --cwd "' + cwd_uri + '"';
            }
        } else if (this.$isWindows()) {
            // Windows 使用 `start` 或 `explorer.exe` 命令
            switch (operation) {
                case "open":
                    cmd = 'start "" "' + uri + '"';
                    break;
                case "printf":
                    cmd = 'start "" /print "' + uri + '"';
                    break;
                case "edit":
                    cmd = 'notepad "' + uri + '"';
                    break;
                case "explore":
                    cmd = 'explorer.exe /e,"' + uri + '"';
                    break;
                case "find":
                    cmd = 'explorer.exe /select,"' + uri + '"';
                    break;
                default:
                    cmd = 'start "" "' + uri + '"';
                    break;
            }

            // 添加工作目录
            if (cwd_uri) {
                cmd = 'pushd "' + cwd_uri + '" && ' + cmd + " && popd";
            }

            // 添加窗口样式（仅 Windows 支持）
            if (show_cmd && os.isWindows()) {
                cmd = "start /show " + show_cmd + ' "" "' + uri + '"';
            }
        }

        // 执行命令
        FLfile.runCommandLine(cmd);

        // 打印命令（调试用）
        log.info("Command executed: " + cmd);
    };

    /**
     * 返回一个包含由 path 指定目录中条目名称组成的列表。
     * @param {string} [uri='.'] - 要列出的目录的路径。
     * @returns {string[]} - 包含目录条目的数组。
     */
    OS.listdir = function (uri) {
        return FLfile.listFolder(uri);
    };

    return OS;
});
