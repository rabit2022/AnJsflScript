/**
 * @file: 00.跨域剪切.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 11:15
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"FirstRun.jsfl")})();
// @formatter:on
require(["checkUtil"], function (checkUtil) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // 没有选择的元件时，不提示
        if (selection.length === 0) {
            return;
        }

        // 记录当前视图矩阵
        var tempWorldViewMatrixAnti = doc.viewMatrix;
        window.AnJsflScript.GLOBALS["00.跨域剪切.jsfl-tempWorldViewMatrixAnti"] =
            tempWorldViewMatrixAnti;

        // 复制元件
        doc.clipCut();
        // doc.clipCopy();
    }

    Main();
});
