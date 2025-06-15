/**
 * @file: 06.批量删帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 13:46
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require(["checkUtil", "FramesSelect"], function (checkUtil, fms) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    const { SelectNoneFms } = fms;

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

        // var currentFrame = timeline.currentFrame;
        var startFrame = 0;
        var endFrame = timeline.frameCount;

        var direction = prompt("请输入方向：空格-向前删除 右-向后删除", "右");
        if (direction == null || direction === "") {
            alert("请输入正确的方向！");
            return;
        }

        var END_FRAME = 0;
        if (direction === " ") {
            END_FRAME = startFrame;
        } else if (direction === "右") {
            END_FRAME = endFrame;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            timeline.setSelectedLayers(i, true);
            // 删除所有帧
            timeline.removeFrames(curFrameIndex, END_FRAME);
        }

        // 回到最开始选择的帧
        timeline.currentFrame = curFrameIndex;

        // // select None
        SelectNoneFms(timeline);
    }

    Main();
});
