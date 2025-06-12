/**
 * @file: 00.查看当前帧的滤镜.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 19:31
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require(["checkUtil", "loglevel"], function (checkUtil, log) {
    const { CheckDom, CheckSelection } = checkUtil;

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

        // layer.getFiltersAtFrame(frameIndex)
        var filters = curLayer.getFiltersAtFrame(curFrameIndex);
        if (filters == null || filters.length === 0) {
            log.info("当前帧上没有滤镜");
            return;
        }
        log.info("当前帧上滤镜：", filters);
    }

    Main();
});
