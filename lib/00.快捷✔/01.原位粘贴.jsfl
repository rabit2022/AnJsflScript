/**
 * @file: 01.原位粘贴.jsfl
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
require(["checkUtil", "ElementSelect", "loglevel", "store-js"], function (
    checkUtil,
    es,
    log,
    store
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { SelectNone } = es;

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

    var ns_store = store.namespace("00-跨域剪切");

    function Main() {
        /**
         * @type {Matrix}
         */
        // var worldViewMatrixAnti =
        //     window.AnJsflScript.GLOBALS["00.跨域剪切.jsfl-tempWorldViewMatrixAnti"];
        var worldViewMatrixAnti = ns_store.get("tempWorldViewMatrixAnti");
        if (!worldViewMatrixAnti) {
            fl.trace("未找到之前的观察矩阵。请先运行脚本：00.跨域剪切.jsfl");
            return;
        }

        SelectNone();
        doc.clipPaste(true);

        // 本地摄像机的逆矩阵
        var localViewMatrixAnti = doc.viewMatrix;

        // 一个矩阵的逆可以用来撤销该矩阵所代表的变换。
        // 例如，如果有一个变换矩阵（可能包含旋转、缩放、平移等），它的逆矩阵将包含相反的变换，可以用来恢复原始状态。
        // 本地摄像机的矩阵
        var localViewMatrix = fl.Math.invertMatrix(localViewMatrixAnti); //逆矩阵

        var selection1 = doc.selection;
        for (var i = 0; i < selection1.length; i++) {
            var element = selection1[i];

            // 从一种坐标系到另一种坐标系的转换，然后立即撤销这个转换。
            // 计算一个点在不同坐标系之间的相对位置。
            // 例如，如果你有一个在世界坐标系下的点，通过乘以观察矩阵，你可以得到这个点在相机坐标系下的位置。
            // 然后，通过乘以逆观察矩阵，你可以将这个点转换回世界坐标系
            var worldMatrix = fl.Math.concatMatrix(worldViewMatrixAnti, localViewMatrix); //矩阵相乘
            var finalMatrix = fl.Math.concatMatrix(element.matrix, worldMatrix);

            element.matrix = finalMatrix;
        }
    }

    Main();
});
