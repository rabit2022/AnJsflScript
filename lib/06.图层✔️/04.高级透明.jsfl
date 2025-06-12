/**
 * @file: 04.高级透明.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/25 22:54
 * @project: AnJsflScript
 * @description:
 */

(function () {
    const match = fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);
    if (!match) throw new Error("Can't find project path [" + fl.scriptURI + "]");
    const index = fl.scriptURI.lastIndexOf(match[0]);
    const projectPath = fl.scriptURI.substring(0, index + match[0].length);
    if (typeof require === "undefined")
        fl.runScript(projectPath + "/config/require/CheckEnvironment.jsfl");
})();
require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "JSFLConstants",
    "FilterQuery",
    "FilterOperation",
    "FramesSelect"
], function (checkUtil, log, promptUtil, JSFLConstants, fq, fo, fms) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
    const { getFilterByName } = fq;
    const { addFilterToFrame } = fo;
    const { SelectStartFms } = fms;
    const ADJUST_COLOR_FILTER = JSFLConstants.Constants.filter.name.ADJUST_COLOR_FILTER;

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
    // endregion doc

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline, "请选择需要添加模糊的帧！");
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

        var alpha = promptUtil.parseNumber(
            "请输入透明度（0-100）",
            50,
            "请输入合法的数字,例如 50"
        );
        if (alpha === null) return;
        log.info("设置透明度为：" + alpha);

        doc.setInstanceAlpha(alpha);

        if (getFilterByName(curLayer, curFrameIndex, "adjustColorFilter") === null) {
            log.info("没有找到调整颜色滤镜，添加一个");

            var adjustColorFilter = {
                name: ADJUST_COLOR_FILTER,
                enabled: true,
                brightness: 0,
                contrast: 0,
                saturation: 0,
                hue: 0
            };

            addFilterToFrame(curLayer, curFrameIndex, adjustColorFilter);
        }

        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
