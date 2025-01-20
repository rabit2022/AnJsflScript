/**
 * @file: path.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:35
 * @project: AnJsflScript
 * @description:
 */

function OSPath() {
    // 插件位置
    this.PLUGIN_PATH = fl.configURI + "WindowSWF";
    // 命令位置
    this.COMMAND_PATH = fl.configURI + "Commands";
}

OSPath.prototype.abspath=function( relativePath) {
    // 将当前工作目录和相对路径合并
    var absolutePath = relativePath;
    var currentWorkingDirectory = getCurFolderURI();

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
OSPath.prototype.basename=function( path) {
    return path.split('/').pop();
}
OSPath.prototype.dirname=function( path) {
    return path.split('/').slice(0, -1).join('/');
}
OSPath.prototype.exists=function( path) {
    throw new Error("Not implemented");
}
OSPath.prototype.isAbs=function( path) {
    // return path.startsWith('/');
    // // Unix 和 Linux 的绝对路径判断
    // if (path.startsWith('/')) {
    //     return true;
    // }

    // Windows 的绝对路径判断
    // 检查是否以盘符加冒号和反斜杠开头，如 C:\ 或 \\server\share
    if (/^[a-zA-Z]:\\/.test(path) || /^\\\\/.test(path)) {
        return true;
    }

    // 如果不是以上情况，则不是绝对路径
    return false;
}
OSPath.prototype.normalizePath=function(parts, isWindows) {
    const separator = isWindows ? '\\' : '/';
    var normalizedParts = [];

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
 * join(['/foo/bar/', 'baz']) 返回 '/foo/bar/baz'
 * join(['/foo/bar', '/baz']) 返回 '/baz'
 * join(['C:/foo', 'bar']) 返回 'C:/foo/bar'
 * join(['C:/foo/', 'bar']) 返回 'C:/foo/bar'
 * join(['C:/foo', '/bar']) 返回 'C:/bar'
 */
OSPath.prototype.join=function(paths) {
    const isWindows = paths.some(function (part) {
        /^[A-Z]:/i.test(part)
    });
    return this.normalizePath(paths, isWindows);
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
 * OSPath.prototype.split('bar') 返回 ['', 'bar']
 * OSPath.prototype.split('/foo/bar/') 返回 ['', '']
 * OSPath.prototype.split('/foo/bar') 返回 ['/foo', 'bar']
 * OSPath.prototype.split('') 返回 ['', '']
 */
OSPath.prototype.split=function(path) {
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
 * @return {[string, string]} - 一个包含路径名和扩展名的数组。
 * @example 
 * splitext('bar') 返回 ['bar', '']，因为没有扩展名。
 * splitext('foo.bar.exe') 返回 ['foo.bar', '.exe']，扩展名包括点。
 * splitext('/foo/bar.exe') 返回 ['/foo/bar', '.exe']，路径中的斜杠不影响扩展名的提取。
 * splitext('.cshrc') 返回 ['.cshrc', '']，文件名以点开头，没有扩展名。
 * splitext('/foo/....jpg') 返回 ['/foo/....jpg', '']，文件名中的点不被视为扩展名的开始。
 */
OSPath.prototype.splitext=function(path) {
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
OSPath.prototype.basenameWithoutExt=function(path) {
    // 获取路径的基本名称
    const basename = osPath.basename(path);

    // 获取路径的扩展名
    const [root, ext] = osPath.splitext(basename);

    // 返回去除扩展名的基本名称
    return root;
}


OSPath.prototype.isMac=function() {
    return (fl.version.search(/mac/i) > -1);
}

OSPath.prototype.openDirectory=function(path) {
    var uri = FLfile.uriToPlatformPath(path);
    if (this.isMac()) {
        FLfile.runCommandLine("open " + "\"" + uri + "\"");
    } else {
        FLfile.runCommandLine("explorer " + "\"" + uri + "\"");
    }
}


var osPath = new OSPath();



