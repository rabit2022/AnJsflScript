/**
 * @file: path.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:35
 * @project: WindowSWF-master
 * @description:
 */

// 获取folder_name, file_name
function pathSplit(path) {
    // 首先，将所有反斜杠替换为正斜杠，以统一路径分隔符
    var normalizedPath = path.replace(/\\/g, '/');

    const pathArray= path.split("/");
    var folder_name = pathArray.slice(0, -1).join("/");
    var file_name = pathArray[pathArray.length - 1];
    // alert(folder_name+" "+file_name);
    return {folder_name: folder_name, file_name: file_name};
}


// 合并folder_name, file_name
function pathJoin(folder_name, file_name) {
    if (folder_name === "") {
        return file_name;
    }
    return folder_name + "/" + file_name;
}


// function OSPath() {}
//
// OSPath.prototype.abspath = function(path) {
//     return path;
// }