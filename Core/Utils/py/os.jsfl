/**
 * @file: os.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 13:06
 * @project: AnJsflScript
 * @description:
 */

function OS(){
    this.path = new OSPath();
}

OS.prototype.isMac = function() {
    return (fl.version.search(/mac/i) > -1);
}

/**
 * 判断是否为 Windows 操作系统。
 * WIN 24,0,0,305
 * @returns {boolean}
 */
OS.prototype.isWindows = function() {
    return (fl.version.search( /win/i) > -1);
}


/**
 * 获取当前工作目录。
 *
 * @return {string} - 当前工作目录的路径。
 */
OS.prototype.getcwd = function() {
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
OS.prototype.mkdir = function(uri) {
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
OS.prototype.startfile = function(path, operation, arguments, cwd, show_cmd) {
    // 转换路径为平台路径
    var uri = FLfile.uriToPlatformPath(path);

    // 转换工作目录为平台路径（如果提供）
    var cwd_uri = cwd ? FLfile.uriToPlatformPath(cwd) : "";

    // 构建命令
    var cmd;

    if (os.isMac()) {
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
    } else {
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
OS.prototype.listdir = function(uri) {
    var files = FLfile.listFolder(uri);
    // print(files);
    return files;
};

var os = new OS();

