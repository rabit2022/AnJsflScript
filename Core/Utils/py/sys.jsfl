/**
 * @file: sys.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/11 21:47
 * @project: AnJsflScript
 * @description:
 */

define(function() {
    var sys = {};
    sys.platform = 'AnJsflScript';
    sys.version = '1.0.0';
    sys.exit = function(msg) {
        fl.trace(msg);
        throw new Error(msg);
    };
    return sys;
});