/**
 * @file: 08.图层深度.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/4 22:00
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

require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "KeyFrameOperation",
    "SAT",
    "ElementSelect",
    "os",
    "FrameOperation"
], function (checkUtil, log, promptUtil, kfo, sat, es, os, fo) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { convertToKeyframesSafety } = kfo;

    const { Vector, Rectangle, Transform } = sat;
    const { getCameraBounds, getCameraCenter, wrapPosition } = sat.GLOBALS;

    const { OnlySelectCurrent } = es;

    const { setLabel } = fo;

    // region doc
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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline, "请选择添加图层深度的关键帧！");
    if (!frs) return;
    const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } = frs;

    // endregion doc

    var modal_path = os.path.join(os.getcwd(), "08.图层深度", "modal.jsfl");
    log.info("modal_path", modal_path);

    var adaptive_ratio = function (currentDepth, targetDepth, factor) {
        throw new Error("adaptive_ratio not implemented");
    };
    require([modal_path], function (_) {
        adaptive_ratio = _;
    });

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var currentDepth = firstSlLayer.getZDepthAtFrame(firstSlFrameIndex);

        var targetDepth = promptUtil.parseNumber(
            "请输入图层深度（-5000~10000）:",
            currentDepth,
            "请输入合法的图层深度，范围为-5000~10000。",
            {
                start: -5000,
                end: 10000,
                step: 1
            }
        );
        if (targetDepth === null) return;

        log.info("设置图层深度为：" + targetDepth);

        const SCALE_FACTOR = adaptive_ratio(currentDepth, targetDepth);
        log.info("SCALE_FACTOR:", SCALE_FACTOR);

        convertToKeyframesSafety(timeline, firstSlFrameIndex, firstSlLayer);

        // 开启摄像机
        if (!timeline.camera.cameraEnabled) {
            alert("使用该功能必须开启AN自带摄像机！");
            timeline.camera.cameraEnabled = true;
        }

        firstSlLayer.setZDepthAtFrame(firstSlFrameIndex, targetDepth);

        const cameraBounds = getCameraBounds(timeline, firstSlFrameIndex);
        log.info("camera bounds", cameraBounds);

        const cameraCenter = getCameraCenter(timeline, firstSlFrameIndex);
        log.info("camera center", cameraCenter);

        selection.forEach(function (element) {
            var elementPosition = wrapPosition(element);

            OnlySelectCurrent(element);

            // 还需要考虑元素的旋转、缩放、位移等属性。
            // 缩放
            doc.scaleSelection(SCALE_FACTOR, SCALE_FACTOR);

            // 位移
            // 先将元素移动到摄像机中心,并根据需要进行缩放调整
            var offset = elementPosition.sub(cameraCenter) * SCALE_FACTOR;
            var tr = new Transform(element).setPosition(offset);
        });

        // 设置标签
        if (targetDepth > 0) {
            setLabel(timeline, firstSlFrameIndex, "图层深度：" + targetDepth);
        } else {
            setLabel(timeline, firstSlFrameIndex, "", "none");
        }
    }

    Main();
});
