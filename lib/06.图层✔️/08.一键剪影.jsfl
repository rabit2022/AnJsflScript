/**
 * @file: 08.一键剪影.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 18:05
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "KeyFrameOperation",
    "ElementSelect"
], function (checkUtil, log, promptUtil, kfo, es) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { SelectBefore } = es;
    const { convertToKeyframesSafety } = kfo;

    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    /**
     * @type {Array.<Element>} 选择的元件
     */
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

        // 请选择模式（1-人白景黑，2人黑景白)：
        var mode = promptUtil.parseNumber(
            "请选择模式（1-人白景黑，2人黑景白）",
            1,
            "请输入  1或2"
        );
        if (mode === null) return;

        log.info("选择模式：" + mode);

        // 色彩效果--亮度--人白景黑(100%),人黑景白(-100%)
        var brightness = (function (mode) {
            switch (mode) {
                case 1:
                    return 100;
                case 2:
                    return -100;
                default:
                    throw new Error("未知模式：" + mode);
            }
        })(mode);

        log.info("亮度：" + brightness);

        // 设置关键帧
        convertToKeyframesSafety(timeline, [curFrameIndex]);

        SelectBefore(selection);

        // SelectStart(selection);
        // 设置所有选中元件的亮度
        // doc.setElementProperty('colorMode', 'brightness');
        // doc.setElementProperty('brightness', brightness);

        doc.setInstanceBrightness(brightness);
    }

    Main();
});
