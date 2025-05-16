/**
 * @file: 02.复制动作.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/16 18:40
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg = "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

require(["checkUtil", "loglevel", "SAT"], function(checkUtil, log, SAT) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { Vector } = SAT;
    const { wrapPosition } = SAT.GLOBALS;

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

        var copyMotions = [];

        // 记录第一帧的位置
        var firstFr = frs[0];
        var firstElement =
            timeline.layers[firstFr.layerIndex].frames[firstFr.startFrame].elements[0];
        var initialPosition = wrapPosition(firstElement);
        log.info("初始位置：", initialPosition);

        // frs.forEach(function(fr) {
        for (var i = 0; i < frs.length; i++) {
            var fr = frs[i];
            var firstLayerIndex = fr.layerIndex;
            var firstFrameIndex = fr.startFrame;

            var firstLayer = layers[firstLayerIndex];
            var firstFrame = firstLayer.frames[firstFrameIndex];
            log.info("复制的第一帧：", firstFrame);

            // if (firstFrame.isEmpty()) {
            //     alert("图层中不能有空帧，请检查！");
            //     // break;
            //     return;
            // }
            var element = firstFrame.elements[0];

            var framePosition = wrapPosition(firstElement);

            var frameData = {};

            // 使用相对位置
            // 将位置变化表示为相对于某个基准点的相对位置
            // (x2-x1)/x1
            frameData.relativeChangeRatio = framePosition
                .sub(initialPosition)
                .scale(initialPosition.invert());

            log.info("相对位置变化比例：", frameData.relativeChangeRatio);

            frameData.rotation = element.rotation;
            frameData.duration = firstFrame.duration;


            // TODO:frameIndex=undefined
            log.info("frameIndex", frameIndex);
            // 滤镜
            frameData.filters = firstLayer.getFiltersAtFrame(frameIndex);

            // 补间动画
            frameData.tweenType = firstFrame.tweenType;

            frameData.motionTweenRotate = frame.motionTweenRotate;
            frameData.motionTweenRotateTimes = frame.motionTweenRotateTimes;

            // colorAlphaPercent

            // TODO:ease curve


            copyMotions.push(frameData);
        }

        log.info("复制的动作：", copyMotions);
        // TODO: 保存到库文件
        // TODO: 保存为xml文件,即预设文件


    }

    Main();
});
