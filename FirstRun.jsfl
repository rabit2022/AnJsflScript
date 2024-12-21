/**
 * @file: FirstRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:45
 * @project: AnJsflScript
 * @description:
 */


/**
 * 获取当前脚本文件的所在文件夹路径
 * @returns {string}
 */
function getCurFolderURI() {
    // 获取当前脚本文件的完整路径
    var scriptURI = fl.scriptURI;
    // 获取路径中最后一个“/”的位置
    var lastSlashIndex = scriptURI.lastIndexOf("/");
    // 获取脚本文件所在的文件夹路径
    var folderPath = scriptURI.substring(0, lastSlashIndex);
    return folderPath;
}

/**
 * 导入指定脚本文件
 * @param {string} relativeScriptPath 相对于当前脚本文件的相对路径
 */
function importMoudle(relativeScriptPath) {
    var curFolderURI = getCurFolderURI();
    var scriptURI = curFolderURI + "/" + relativeScriptPath;

    fl.runScript(scriptURI);
    // fl.trace(scriptURI + " imported.");
}


// 导入模块,相对路径导入
// Object
importMoudle("Core/Object/Curve.jsfl");
importMoudle("Core/Object/Ele.jsfl");
importMoudle("Core/Object/FrameRange.jsfl");
importMoudle("Core/Object/Matrix.jsfl");
importMoudle("Core/Object/Point.jsfl");
importMoudle("Core/Object/Rect.jsfl");
importMoudle("Core/Object/Select.jsfl");

// Utils
importMoudle("Core/Utils/Log.jsfl");
importMoudle("Core/Utils/path.jsfl");
importMoudle("Core/Utils/random.jsfl");
importMoudle("Core/Utils/string.jsfl");

fl.trace("Core modules imported.");