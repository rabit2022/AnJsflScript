/**
 * @file: ImportTips.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/11 20:42
 * @project: AnJsflScript
 * @description:
 */

define(function() {
    const alertMessageConfig = {
        'XUL': '【温馨提示】\n1.这个脚本 由于导入了XUL库，属于重型库，可能会导致卡顿异常，闪退，不兼容等情况\n2.这个脚本 会生成多个元件，用于组成字符画，以保证效果的完美，可能造成画面过于复杂，导出时可能出现问题。\n\n请确认是否继续!!!',
        'default': '是否加载模块？'
    };

    function TryLoad(moduleName) {
        var msg = alertMessageConfig[moduleName] || alertMessageConfig['default'] + ':' + moduleName;
        var ok = confirm(msg);
        if (!ok) return;

        var XUL;
        requirejs([moduleName], function(module) {
            XUL = module;
        });

        console.log(XUL);
        if (!XUL) {
            alert(moduleName + '模块加载失败');
            return;
        }

        return XUL;
    }

    return TryLoad;
});