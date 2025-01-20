/**
 * @file: DictUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 20:35
 * @project: AnJsflScript
 * @description:
 */

function DictUtil() {

}

DictUtil.prototype.keys = function(dict) {
    var keys = [];
    for (var key in dict) {
        keys.push(key);
    }
    return keys;
}

DictUtil.prototype.values = function(dict) {
    var values = [];
    for (var key in dict) {
        values.push(dict[key]);
    }
    return values;
}

DictUtil.prototype.merge = function(dict1, dict2) {
    for (var key in dict2) {
        dict1[key] = dict2[key];
    }
    return dict1;
}

DictUtil.prototype.remove = function(dict, key) {
    delete dict[key];
    return dict;
}


var dictUtil = new DictUtil();