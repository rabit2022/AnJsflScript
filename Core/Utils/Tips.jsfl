/**
 * @file: TryLoad.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/11 20:42
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    const author = "@穹的兔兔";
    const alertMessageConfig = {
        XUL:
            "【温馨提示】\n1.这个脚本 由于导入了XUL库，属于重型库，可能会导致卡顿异常，闪退，不兼容等情况\n2.这个脚本 会生成多个元件，用于组成字符画，以保证效果的完美，可能造成画面过于复杂，导出时可能出现问题。\n请确认是否继续!!!\n\n作者: " +
            author,

        // 特殊模块的提示信息
        "default!": "是否加载模块？\n\n 作者：" + author + "\n 模块名：",
        "failed!": "加载模块失败，请联系作者！！！\n\n 作者：" + author + "\n 模块名：",

        // FirstRun提示信息
        "loading success!":
            "【温馨提示】导入成功！！！\n 如果有bug,或者建议，请@我。\n\n【注意】这个文件只是导入所需的模块，并没有安装功能。 \n作者：" +
            author,
        // 防盗链提示信息
        "loading might be not allowed!":
            "【温馨提示】你可能使用的是盗版软件，这个是开源的项目，如果花费了金钱购买，请退款。\n\n 作者：" +
            author +
            "\n 地址：https://github.com/rabit2022/AnJsflScript"
    };

    function TryLoad(moduleName) {
        var msg =
            alertMessageConfig[moduleName] || alertMessageConfig["default!"] + moduleName;
        var ok = confirm(msg);
        if (!ok) return;

        // 加载模块
        var XUL;
        try {
            requirejs([moduleName], function (module) {
                XUL = module;
            });
        } catch (e) {
            alert(alertMessageConfig["failed!"] + moduleName + "\n\n" + e.message);
        }

        return XUL;
    }

    /**
     * 检查变量是否被重新声明
     * @param {any} variable 被重复声明的变量
     * @param {string} name 变量名
     */
    function checkVariableRedeclaration(variable, name) {
        var assert;
        requirejs(["assert"], function (module) {
            assert = module;
        });
        if (typeof variable === "undefined") {
            var msg = "参数 " + name + "在函数内被重新声明，可能覆盖了外部变量。";
            console.info(msg);
            assert.fail(variable, undefined, msg, "==", checkVariableRedeclaration);
        }
    }

    function alertMessage(mode) {
        var msg = alertMessageConfig[mode];
        if (msg) {
            alert(msg);
        }
    }

    return {
        TryLoad: TryLoad,
        checkVariableRedeclaration: checkVariableRedeclaration,
        alertMessage: alertMessage
    };
});
