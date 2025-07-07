const isNode =
    typeof process === 'object' &&
    typeof require === 'function' &&
    typeof module === 'object';
const isFlash = !isNode && typeof flash === 'object';


var os;

if (isNode) {
    // 处理 Node.js 环境

    const fs = require('fs');
    const path = require('path');

    // 创建一个类似 Python os 模块的接口
    os = {
        listdir: fs.readdirSync, // 同步列出目录内容
        path: {
            join: (...args) => path.join(...args), // 拼接路径
            exists: (filePath) => fs.existsSync(filePath), // 检查路径是否存在
            isdir: (filePath) => fs.lstatSync(filePath).isDirectory(), // 检查是否为目录
            isfile: (filePath) => fs.lstatSync(filePath).isFile(), // 检查是否为文件
            basename: (filePath) => path.basename(filePath), // 获取路径的文件名部分
            // dirname: (filePath) => path.dirname(filePath) // 获取路径的目录部分
        }
    };
} else if (isFlash) {
    // 处理 Adobe Flash 环境

    os = require('os');
} else {
    throw new Error('Unsupported environment');
}


// 自定义函数
function getExtname(filePath) {
    const basename = os.path.basename(filePath);
    const dotIndex = basename.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === 0) {
        return ''; // 没有扩展名或隐藏文件
    }
    return basename.substring(dotIndex).toLowerCase();
}


// FolderTraverser 类
class FolderTraverser {
    /**
     * 文件夹遍历器，只包含文件。
     * @param {string} folderPath - 要遍历的文件夹路径
     * @param {string[]} [extensions] - 允许的文件扩展名列表
     * @param {string[]} [excludeFolders] - 排除的文件夹名称列表
     * @param {string[]} [excludeExtensions] - 排除的文件扩展名列表
     * @param {number} [maxDepth] - 最大遍历深度，-1 表示无限制
     * @param {boolean} [includeFullPath] - 是否返回文件的完整路径
     * @param {Function} [callbacks] - 回调函数，用于处理每个文件路径
     */
    constructor(
        folderPath,
        extensions = null,
        excludeFolders = null,
        excludeExtensions = null,
        maxDepth = -1,
        includeFullPath = true,
        callbacks = null
    ) {
        this.folderPath = folderPath;
        this.extensions = extensions || [];
        this.excludeFolders = excludeFolders || [];
        this.excludeExtensions = excludeExtensions || [];
        this.maxDepth = maxDepth;
        this.includeFullPath = includeFullPath;
        this.callbacks = callbacks;
    }

    /**
     * 遍历文件夹。
     * @param {string} currentPath - 当前路径
     * @param {string[]} filePaths - 文件路径列表
     * @param {number} currentDepth - 当前深度
     */
    traverseFolder(currentPath, filePaths, currentDepth = 0) {
        // 检查是否超过最大深度
        if (this.maxDepth !== -1 && currentDepth > this.maxDepth) {
            return;
        }

        try {
            // 获取当前目录下的所有文件和子目录
            const names = os.listdir(currentPath);

            for (const name of names) {
                const filePath = os.path.join(currentPath, name);

                // 检查是否是文件
                if (os.path.isdir(filePath)) {
                    // 排除特定文件夹
                    if (this.excludeFolders.includes(name)) {
                        continue;
                    }

                    // 递归遍历子目录
                    this.traverseFolder(filePath, filePaths, currentDepth + 1);
                } else if (os.path.isfile(filePath)) {
                    // 检查是否符合允许的扩展名且不在排除列表中
                    // const ext = os.path.extname(filePath);
                    const ext = getExtname(filePath);
                    if (
                        this.excludeExtensions.includes(ext) ||
                        (this.extensions.length > 0 && !this.extensions.includes(ext))
                    ) {
                        continue;
                    }

                    // 添加文件路径
                    const pathToAdd = this.includeFullPath ? filePath : name;
                    filePaths.push(pathToAdd);

                    // 调用回调函数
                    if (this.callbacks) {
                        this.callbacks(pathToAdd);
                    }
                }
            }
        } catch (e) {
            console.warn(`无法访问 ${currentPath}: ${e.message}`);
        }
    }

    /**
     * 开始遍历
     * @returns {string[]} - 文件路径列表
     */
    start() {
        const filePaths = [];
        this.traverseFolder(this.folderPath, filePaths);
        return filePaths;
    }
}
module.exports = FolderTraverser;