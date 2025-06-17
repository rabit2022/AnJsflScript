/**
 * @file: 01.镜头抖动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/15 22:27
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
    "promptUtil",
    "KeyFrameOperation",
    "linqUtil",
    "SAT",
    "random"
], function (checkUtil, log, promptUtil, kfo, linqUtil, SAT, random) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { Vector } = SAT;
    const { wrapPosition } = SAT.GLOBALS;

    const { parseNumber } = promptUtil;
    const { convertToKeyframesSafety, KFrameOnlyOne } = kfo;
    const { $range } = linqUtil;

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
    var frs = CheckSelectedFrames(timeline, "请选择 至少 4 个帧", "More", {
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

        // // 首帧 转 关键帧
        // convertToKeyframesSafety(timeline, [firstFrame]);

        // 选中的第一段的 所有帧 转 关键帧
        var firstFms = $range(frs[0].startFrame, frs[0].endFrame).toArray();
        convertToKeyframesSafety(timeline, firstFms);

        firstFms.forEach(function (fm) {
            // 最后一帧不动
            if (fm === firstFms[firstFms.length - 1]) return;

            // X轴抖动=(+-1:偶数帧为-1，奇数帧为+1)*shackIndensity*[-1,3],,,5,-14最大值
            // Y轴抖动=shackIndensity*[-2,2]，，，，5,10最大值
            var direction = fm % 2 === 0 ? 1 : -1;
            var radomShack = new Vector(
                direction * shackIndensity * random.uniform(-1, 3),
                shackIndensity * random.uniform(-2, 2)
            );
            log.info("radomShack:" + radomShack);

            var cameraPosition = wrapPosition(timeline.camera.getPosition(fm));
            log.info("fm:" + fm + " cameraPosition:" + cameraPosition);

            var newPosition = cameraPosition.add(radomShack).round().noZero();
            log.info("newPosition:" + newPosition);

            timeline.camera.setPosition(fm, newPosition.x, newPosition.y);
        });
    }

    Main();
});
