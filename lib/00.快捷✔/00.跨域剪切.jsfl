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
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "loglevel", "store-js"], function (checkUtil, log, store) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "Only one")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc
    function Main() {
        // // 没有选择的元件时，不提示
        // if (selection.length === 0) {
        //     return;
        // }

        // 记录当前视图矩阵
        var tempWorldViewMatrixAnti = doc.viewMatrix;
        // window.AnJsflScript.GLOBALS["00.跨域剪切.jsfl-tempWorldViewMatrixAnti"] =
        //     tempWorldViewMatrixAnti;
        var ns_store = store.namespace("00-跨域剪切");
        ns_store.remove("tempWorldViewMatrixAnti");

        ns_store.set("tempWorldViewMatrixAnti", tempWorldViewMatrixAnti);

        var test = ns_store.get("tempWorldViewMatrixAnti");
        log.info("tempWorldViewMatrixAnti", test);

        // 复制元件
        doc.clipCut();
        // doc.clipCopy();
    }

    Main();
});
