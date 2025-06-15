/**
 * @file: 00.镜头旋转.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/15 22:02
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require(["checkUtil", "loglevel", "KeyFrameOperation", "promptUtil"], function (
    checkUtil,
    log,
    kfo,
    promptUtil
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { convertToKeyframesSafety } = kfo;
    const { parseNumber } = promptUtil;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var rotation = parseNumber(
            "输入旋转角度（-180~180）:",
            0,
            "请输入合法的数字(-180~180)",
            {
                start: -180,
                end: 180,
                step: 1
            }
        );
        if (!rotation) return;

        // KFrameOnlyOne(timeline);

        // 确保选中的图层 是 第一层
        if (timeline.camera.cameraEnabled === false) {
            timeline.camera.cameraEnabled = true;
        } else if (timeline.camera.cameraEnabled === true) {
            timeline.currentLayer = 0;
        }

        convertToKeyframesSafety(timeline, [firstFrame]);

        // 旋转镜头
        timeline.camera.setRotation(firstFrame, rotation);
    }

    Main();
});
