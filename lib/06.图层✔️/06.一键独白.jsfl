/**
 * @file: 06.一键独白.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 19:13
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function getProjectPath() {
        const index = fl.scriptURI.lastIndexOf("AnJsflScript");
        if (index !== -1) return fl.scriptURI.substring(0, index + "AnJsflScript".length);
        throw new Error("Can't find project path.");
    }
    fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
})();
require(["checkUtil", "loglevel", "KeyFrameOperation", "FilterOperation"], function (
    checkUtil,
    log,
    kfo,
    fo
) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { addFilterToFrame } = fo;
    const { convertToKeyframesSafety } = kfo;

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

        // SelectBefore(selection);

        // 滤镜--发光--blurX=blurY=15,intensity=100,quality=medium
        var glowFilter = {
            name: "glowFilter",
            enabled: true,
            angle: 45,
            blurX: 15,
            blurY: 15,
            distance: 4,
            color: "#FFFFFF",
            quality: "medium",
            inner: false,
            knockout: false,
            hideObject: false,
            strength: 100
        };

        addFilterToFrame(curLayer, curFrameIndex, glowFilter);
    }

    Main();
});
