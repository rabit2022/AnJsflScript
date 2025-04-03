/**
 * @file: 打印所有属性.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/12 16:44
 * @project: AnJsflScript
 * @description:
 */

(function () {
    // var PROPERTY = window;
    var PROPERTY = document;
    function Main() {
        fl.trace('All properties:[' + PROPERTY + ']');
        // 创建两个数组，分别存储普通属性和函数
        var properties = [];
        var functions = [];

        // 遍历 window 对象的所有属性
        for (var key in PROPERTY) {
            if (PROPERTY.hasOwnProperty(key)) {
                // 确保是 window 自身的属性
                var value = PROPERTY[key];

                // 根据属性类型，将属性名添加到对应的数组
                if (typeof value === 'function') {
                    functions.push(key); // 函数添加到 functions 数组
                } else {
                    properties.push(key); // 普通属性添加到 properties 数组
                }
            }
        }

        // 打印普通属性列表
        fl.trace('Properties:');
        properties.forEach(function (prop) {
            fl.trace(prop);
        });

        // 打印函数列表
        fl.trace('\nFunctions:');
        functions.forEach(function (func) {
            fl.trace(func);
        });
    }

    Main();
})();
