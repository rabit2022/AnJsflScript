/**
 * @file: 01.打印关键帧的pos.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 16:20
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "SAT", "KeyFrameQuery"], function (checkUtil, sat, kfq) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { wrapTransform } = sat.GLOBALS;
    const { getKeyFrames } = kfq;

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

        var keyFrames = getKeyFrames(curLayer);

        var transformArray = [];
        for (var i = 0; i < keyFrames.length; i++) {
            var frameIndex = keyFrames[i];
            var element = curLayer.frames[frameIndex].elements[0];
            if (!element) {
                transformArray.push(null);
                continue;
            }

            var transform = wrapTransform(element);
            transformArray.push(transform);
        }

        console.log("关键帧：", keyFrames);
        console.log("transform：", transformArray);
    }

    Main();
});
