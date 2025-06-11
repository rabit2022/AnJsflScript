/**
 * @file: 10.重置摄像头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/18 20:26
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function exit(msg) {
        fl.trace(msg);
        throw new Error(msg);
    }

    // bug,FirstRun.jsfl 未运行
    if (typeof require === "undefined") {
        exit(
            "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔"
        );
    }

    // bug,Temp 未解压
    if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
        exit("【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔");
    }
})();

require(["checkUtil", "loglevel", "KeyFrameOperation", "SAT", "FramesSelect"], function (
    checkUtil,
    log,
    kfo,
    SAT,
    fms
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { KFrameOnlyOne } = kfo;
    const { getOrigin } = SAT.GLOBALS;
    const { SelectStartFms } = fms;

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

    // 摄像机
    var camera = timeline.camera; //摄像机
    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 选中摄像机图层
        if (timeline.camera.cameraEnabled === false) {
            timeline.camera.cameraEnabled = true;
        } else {
            timeline.currentLayer = 0;
        }
        // firstLayer=timeline.currentLayer;
        var cameraLayerIndex = 0;
        var cameraLayer = layers[cameraLayerIndex];
        // log.info("cameraLayerIndex", cameraLayer.name);

        timeline.currentLayer = cameraLayer;
        KFrameOnlyOne(timeline, cameraLayer);

        timeline.setSelectedFrames(firstFrame, firstFrame + 1);

        // camera.resetColorFilter(firstFrame);

        // var origin = getOrigin();
        // camera.setPosition(firstFrame, origin.x, origin.y);
        // camera.setRotation(firstFrame, 0);
        // camera.setZoom(firstFrame, 100);
        camera.reset(firstFrame);

        // bug:滤镜，色彩效果 重置不生效
        // // 滤镜
        // cameraLayer.setFiltersAtFrame(firstFrame, []);
        //
        // // 色彩效果
        // // cameraLayer.setColorTransformAtFrame(firstFrame, {"mode":"none"});
        // doc.setElementProperty('colorMode', 'none');

        // reset
        // SelectStartFms(timeline, frs);
    }

    Main();
});
