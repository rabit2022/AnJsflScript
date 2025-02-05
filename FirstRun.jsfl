/**
 * @file: FirstRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:45
 * @project: AnJsflScript
 * @description:每一次打开An时，都要 执行此脚本，用于初始化一些必要的模块。
 */

(function () {
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
    }

    function Main() {
        // 导入模块,相对路径导入
        importMoudle("Third/requirejs-2.3.7/require.jsfl");

        require.config({
            baseUrl: getCurFolderURI(), // 设置模块的基础路径
            paths: {
                shim: "./Third/es5-shim-4.6.7/es5-shim",
                sham: "./Third/es5-shim-4.6.7/es5-sham",
                linq: "./Third/linq-4.0.3/linq",
                sat: "./Third/sat-js/SAT",

                curve:"Core/Object/curve",
                ele:"Core/Object/ele",
                frameRange:"Core/Object/frameRange",
                graphics:"Core/Object/graphics",
                moreElement:"Core/Object/moreElement",
                rect:"Core/Object/rect",
                size:"Core/Object/size",
                transform:"Core/Object/transform",
                Constants:"Core/TopLevel/Constants",
                Log:"Core/TopLevel/Log",
                Selection:"Core/TopLevel/Selection",
                checkUtil:"Core/Utils/flash/checkUtil",
                filterUtil:"Core/Utils/flash/filterUtil",
                layerUtil:"Core/Utils/flash/layerUtil",
                libUtil:"Core/Utils/flash/libUtil",
                promptUtil:"Core/Utils/flash/promptUtil",
                XMLPanelUtil:"Core/Utils/flash/XMLPanelUtil",
                array:"Core/Utils/native/array",
                arrayUtil:"Core/Utils/native/arrayUtil",
                dictUtil:"Core/Utils/native/dictUtil",
                string:"Core/Utils/native/string",
                builtInP:"Core/Utils/py/builtInP",
                os:"Core/Utils/py/os",
                random:"Core/Utils/py/random",
                StringP:"Core/Utils/py/StringP",


            }
        });

        require(["shim", "sham", "array", "string","Constants", "Log", "Selection"], function (shim, sham, array, string) {
        });

        // require(["sat"], function (sat) {
        //     var Vector = sat.SAT.Vector;
        //     var p = new Vector(10, 20);
        //     fl.trace(p.toString());
        // });

        // 导入完成
        fl.trace("=============Core modules imported.=============");

    }

    Main();
})();