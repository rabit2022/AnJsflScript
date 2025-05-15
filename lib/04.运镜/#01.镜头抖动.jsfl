/**
 * @file: 01.镜头抖动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/15 22:27
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

require(["checkUtil", "loglevel", "promptUtil"],
    function(checkUtil, log, promptUtil) {
        const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
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
        // 选中帧  的第一段 至少 4 个帧
        var frs = CheckSelectedFrames(timeline, "请选择 至少 4 个帧", "No limit", {
            min: 4,
            onlyFirst: true
        });
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        // endregion doc

        function Main() {
            // 检查选择的元件
            if (!CheckSelection(selection, "selectElement", "No limit")) return;

            var shackIndensity = promptUtil.parseNumber(
                "输入抖动力度（1~20）",
                5,
                "请输入合法的数字（1~20）",
                {
                    start: 1,
                    end: 20
                }
            );
            if (!shackIndensity) return;
            log.info("抖动力度：" + shackIndensity);

            // note:确保选中的图层 是 第一层,这样可以保证，k帧一定在 镜头图层，而不用担心 其他图层的影响
            if (timeline.camera.cameraEnabled === false) {
                timeline.camera.cameraEnabled = true;
            } else if (timeline.camera.cameraEnabled === true) {
                timeline.currentLayer = 0;
            }


        }

        Main();
    });
