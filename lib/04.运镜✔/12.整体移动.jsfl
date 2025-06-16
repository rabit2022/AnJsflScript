/**
 * @file: 12.整体移动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/13 14:40
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require(["checkUtil", "loglevel", "SAT", "FramesSelect", "ElementSelect"], function (
    checkUtil,
    log,
    sat,
    fms,
    es
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { Vector, Transform, FrameRange } = sat;

    const { SelectStartFms } = fms;
    const { SelectStart } = es;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (!frs) return;
    const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        // 检查选择的图层
        if (!CheckSelectedLayers(timeline, "Only one")) return;

        var IMPORTANT_ELEMENT = selection[0];

        var INITIAL_POSITION =
            window.AnJsflScript.GLOBALS["12.整体移动.jsfl-INITIAL_POSITION"];
        log.info("INITIAL_POSITION:", INITIAL_POSITION);
        if (!INITIAL_POSITION) {
            log.info("记录初始位置");
            var initialPosition = Vector.from(IMPORTANT_ELEMENT);

            window.AnJsflScript.GLOBALS["12.整体移动.jsfl-INITIAL_POSITION"] =
                initialPosition;

            alert("整体移动已开启：请移动对象后【再次点击此按钮】！");
            return;
        }

        var FINAL_POSITION = Vector.from(IMPORTANT_ELEMENT);
        log.info("FINAL_POSITION:", FINAL_POSITION);

        var DELTA_MOVE = FINAL_POSITION.clone().sub(INITIAL_POSITION);
        log.info("移动距离：", DELTA_MOVE);

        window.AnJsflScript.GLOBALS["12.整体移动.jsfl-INITIAL_POSITION"] = undefined;

        // 选中当前图层 当前帧，选中 非选择对象，移动
        frs.forEach(function (fr, index) {
            /**
             * @type {FrameRange}
             */
            var fr = fr;
            // log.info("fr:", fr.clone());

            var selectedFrames = fr.getFirstFrame().toArray();
            log.info("selectedFrames:", selectedFrames);

            // 选中 当前图层 当前帧，所有元件
            timeline.setSelectedFrames(selectedFrames);

            doc.moveSelectionBy(DELTA_MOVE);
        });

        // IMPORTANT_ELEMENT
        // var tr=new Transform(IMPORTANT_ELEMENT).setPosition(FINAL_POSITION);
        var tr = new Transform(IMPORTANT_ELEMENT).moveSelectionBy(DELTA_MOVE.reverse());

        // 重置选择
        SelectStartFms(timeline, frs);
        SelectStart(selection);

        alert("整体移动完成！");
    }

    Main();
});
