/**
 * @file: 02.拆分音频.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 0:06
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
require(["checkUtil", "loglevel", "FramesSelect"], function (checkUtil, log, fms) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
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
    // endregion doc

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline, "请选择需要添加模糊的帧！");
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrameIndex = frs[0].startFrame;

    const firstFrameDuration = frs[0].duration; // 第一帧持续时间
    log.info("firstFrameDuration: %s", firstFrameDuration);

    // 1472 = 1frame魔法数字，表示1帧持续时间
    const EnvelopeDuration = 1472; // 拆分长度，单位：帧
    /**
     * 根据关键帧长度设置音频播放范围
     * @param {number} curFrameIndex - 进行音频拆分的关键帧位置
     * @param {number} duration - 关键帧的持续时间
     * @see https://gitee.com/ninge/WindowSWF/tree/master/
     */
    function splitAudioAtFrame(curFrameIndex, duration) {
        var frame = curLayer.frames[curFrameIndex];
        //1472 = 1frame
        var soundEnvelopeLimits = frame.getSoundEnvelopeLimits();
        //优先检查当前段上有没有音频文件
        if (soundEnvelopeLimits === null) {
            alert("当前选择帧没有音频文件");
            return;
        }
        //查看上一个关键帧的位置
        var soundLibraryItem = frame.soundLibraryItem;
        // 关键帧的开始位置
        var startFrame = frame.startFrame;

        //插入关键帧
        timeline.insertKeyframe(curFrameIndex);

        //打双帧拆分
        var newStart = soundEnvelopeLimits.start + (curFrameIndex - startFrame) * 1472;
        log.info(
            "curFrameIndex: %s  startFrame: %s  newStart: %s",
            curFrameIndex,
            startFrame,
            newStart
        );
        // fl.trace(soundEnvelopeLimits.start + "   " +newStart )
        soundEnvelopeLimits.start = newStart;

        curFrameIndex += duration;

        timeline.insertKeyframe(curFrameIndex);
        var nextFrame = curLayer.frames[curFrameIndex];
        nextFrame.soundLibraryItem = soundLibraryItem;

        nextFrame.setSoundEnvelopeLimits(soundEnvelopeLimits);
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 更加精确的拆分
        // 1, 从 选择的帧开始，往后拆分，而不是 从当前帧开始往后拆分 (防止与选中的不符，反直觉)
        // 2, 关键帧的长度，应该是当前帧的持续时间，而不是   固定长度
        splitAudioAtFrame(firstFrameIndex, firstFrameDuration);

        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
