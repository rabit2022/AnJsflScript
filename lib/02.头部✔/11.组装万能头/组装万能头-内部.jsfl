/**
 * @file: 组装万能头-内部.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/20 12:34
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
    "Context",
    "LayerList",
    "ElementQuery",
    "SAT",
    "JSFLConstants",
    "store-js",
    "COMPATIBILITY"
], function (
    checkUtil,
    log,
    Context,
    LayerList,
    eq,
    sat,
    JSFLConstants,
    store,
    COMPATIBILITY
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { getFrameCount } = eq;
    const { Circle, Vector } = sat;

    const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;
    const { __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__ } = COMPATIBILITY;

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

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    const MOTION_LAYER_INDEX = 0;
    const HEAD_LAYER_INDEX = 1;
    const SHAKE_LAYER_INDEX = 2;

    const ns_store = store.namespace("11-组装万能头");

    // 设置图层
    function setLayers() {
        // 分散到图层
        doc.distributeToLayers();

        // 排序
        var layerList = new LayerList(timeline);
        layerList.sort(function (a, b) {
            var aFc = getFrameCount(a.frames[0].elements[0]);
            var bFc = getFrameCount(b.frames[0].elements[0]);
            log.debug("aFc:", aFc, "bFc:", bFc);
            return bFc - aFc;
        });

        var newLayer = layerList.append("摇头动作", "normal");

        timeline.currentLayer = newLayer;
        // log.debug("newLayer:", newLayer);
    }

    // 添加摇头标记
    function drawShakeMark(elementPosition) {
        const SHACK_MARK_NAME = "摇头标记-AnJsflScript";

        var center = new Vector();
        // var center = elementPosition;
        var radius = 5;
        var circle = new Circle(center, radius);
        var circleBounds = circle.getBounds();
        log.info("circleBounds:", circleBounds);

        function addShakeSymbol() {
            // 如果“摇头标记” 已经存在
            if (library.itemExists(SHACK_MARK_NAME)) {
                library.addItemToDocument(center, SHACK_MARK_NAME);
                return;
            }

            // 添加一个圆形作为摇头标记
            doc.addNewOval(circleBounds.toObj());

            timeline.setSelectedFrames(FRAME_1, FRAME_1 + 1);

            // 转换为 元件
            doc.convertToSymbol("graphic", SHACK_MARK_NAME, "center");
        }

        // 转换为 元件
        addShakeSymbol();

        // 设置 透明度 为 0
        doc.setInstanceAlpha(0);
    }

    // 设置父级视图
    function setParentView() {
        // 必须更新，因为 图层 已经变为3个
        const MOTION_LAYER = timeline.layers[MOTION_LAYER_INDEX];
        const HEAD_LAYER = timeline.layers[HEAD_LAYER_INDEX];
        const SHAKE_LAYER = timeline.layers[SHAKE_LAYER_INDEX];

        HEAD_LAYER.setRigParentAtFrame(SHAKE_LAYER, FRAME_1);
        MOTION_LAYER.setRigParentAtFrame(SHAKE_LAYER, FRAME_1);
    }

    // 摇头动作
    function shakeAction() {
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./摇头动作.jsfl");
    }

    function Main() {
        const ElementPosition = ns_store.get("ElementPosition");
        const MAX_MOTION_FRAME_COUNT = ns_store.get("MAX_MOTION_FRAME_COUNT");
        if (!ElementPosition || !MAX_MOTION_FRAME_COUNT) {
            alert("[组装万能头-内部]    请先运行脚本  11.组装万能头.jsfl");
            return;
        }

        // region test
        // // var config = {
        // //     shakeIntensity: 3,
        // //     motionFrameCount: 6,
        // //     headDirection: -1,
        // //     shakeMode: "traditional",
        // //     frameSelector: "keyFrame"
        // // };
        // var ElementPosition = { x: 458.75, y: 312.05 };
        // log.info("layers：", layers, layers.length);
        // // log.info("layers：", AllLayers, AllLayers.length);
        // // var headconfig = {
        // //     head: layers[1].frames[0].elements[0],
        // //     expression: layers[0].frames[0].elements[0]
        // // };
        // // const { head, expression } = headconfig;
        // const MAX_MOTION_FRAME_COUNT = 300;
        // endregion test

        // currentSelection: head,expression
        setLayers();

        // context.update();
        // log.debug("currentLayer:", context.curLayerIndex);

        // currentLayer:2
        drawShakeMark(ElementPosition);

        setParentView();

        // 按照表情的长度，插入帧数
        timeline.insertFrames(MAX_MOTION_FRAME_COUNT - 1, true); // 在时间轴上插入帧

        // 选中 摇头标记 图层
        timeline.setSelectedLayers(SHAKE_LAYER_INDEX);

        shakeAction();
    }

    Main();
});
