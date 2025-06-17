/**
 * @file: 07.解除独白.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 19:29
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require([
    "checkUtil",
    "loglevel",
    "JSFLConstants",
    "FilterOperation",
    "KeyFrameOperation"
], function (checkUtil, log, JSFLConstants, fo, kfo) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { clearFilterAtFrame } = fo;
    const { convertToKeyframesSafety } = kfo;
    const GLOW_FILTER = JSFLConstants.Constants.filter.name.GLOW_FILTER;

    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

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
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 设置关键帧
        convertToKeyframesSafety(timeline, [curFrameIndex]);

        clearFilterAtFrame(curLayer, curFrameIndex, GLOW_FILTER);
    }

    Main();
});
