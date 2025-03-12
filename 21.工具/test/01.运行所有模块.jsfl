/**
 * @file: 01.运行所有模块.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/10 23:45
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function Main() {
        // 假设 require.s.contexts._.config 已经定义
        const config = require.s.contexts._.config || {};
        const paths = config.paths || {};

        // 提取所有模块名称
        var moduleNames = Object.keys(paths);

        // 排除 core-js 模块
        moduleNames = moduleNames.filter(function (moduleName) {
            return moduleName !== 'core-js';
        });
        console.log(moduleNames);

        require(moduleNames, function () {
            // var modules = arguments;

            // 打印加载的模块
            moduleNames.forEach(function (moduleName, index) {
                try {
                    console.log(
                        'Module "' + moduleName + '" loaded:',
                        arguments[index]
                    );
                } catch (e) {}
            });
        });
    }

    Main();
})();
