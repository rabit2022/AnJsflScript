/**
 * @file: 08.一键遮罩.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/7 21:02
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
    "SymbolNameGenerator",
    "LayerOperation",
    "JSFLConstants",
    "EaseCurve",
    "KeyFrameOperation",
    "ElementChecker",
    "ElementQuery",
    "ElementSelect"
], function (checkUtil, log, sng, lo, JSFLConstants, curve, kfo, ec, eq, es) {
    const { CheckDom, CheckSelection } = checkUtil;

    const { IsSymbol, IsShape } = ec;
    const { getName } = eq;
    const { SelectAll } = es;

    const { FRAME_1, FRAME_30 } = JSFLConstants.Numerics.frame.frameList;
    const { swapLayers } = lo;
    const { setClassicEaseCurve } = curve;
    const { convertToKeyframesSafety } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    const MASK_LAYER_INDEX = 0; //遮罩层索引
    const TARGET_LAYER_INDEX = 1; //被遮层索引

    const KEY_FRAMES = [FRAME_1, FRAME_30]; //关键帧

    /**
     * 刷新内部变量
     * @note: 1,如果在函数内  进行了更改数据的操作(enterEditMode后，timeline变化)，需要调用此函数刷新内部变量
     *        2,如果需要同时使用 全局变量 和 局部变量，需要 重新 定义
     */
    function refreshTimeline() {
        // 刷新内部变量
        selection = doc.selection; //选择
        library = doc.library; //库文件
        timeline = doc.getTimeline(); //时间轴

        layers = timeline.layers; //图层
        curLayerIndex = timeline.currentLayer; //当前图层索引
        curLayer = layers[curLayerIndex]; //当前图层

        curFrameIndex = timeline.currentFrame; //当前帧索引
        curFrame = curLayer.frames[curFrameIndex]; //当前帧
    }

    function checkMaskTarget() {
        var mask, target;

        for (var i = 0; i < selection.length; i++) {
            if (IsSymbol(selection[i])) {
                target = selection[i];
            } else if (IsShape(selection[i])) {
                mask = selection[i];
            }
        }
        if (!mask || !target) {
            alert('检测到您没有选择形状，请选择"遮罩形状+被遮对象”！');
            return null;
        }
        return { mask: mask, target: target };
    }

    /**
     * 分层，确保被遮对象在最上层
     */
    function Stratify() {
        SelectAll();
        doc.distributeToLayers();

        refreshTimeline();

        var maskShape = layers[MASK_LAYER_INDEX].frames[curFrameIndex].elements[0]; //遮罩形状
        var targetShape = layers[TARGET_LAYER_INDEX].frames[curFrameIndex].elements[0]; //被遮层

        if (IsShape(maskShape) && IsSymbol(targetShape)) {
            // 正确顺序
        } else {
            // 交换位置
            swapLayers(timeline, MASK_LAYER_INDEX, TARGET_LAYER_INDEX);

            refreshTimeline();
        }
    }

    function KFrame() {
        doc.enterEditMode("inPlace");

        refreshTimeline();

        // 分层，确保被遮对象在最上层
        Stratify();

        // 增加30帧，增加关键帧(1,30,30)
        // 给所有图层加帧
        timeline.insertFrames(FRAME_30, true);

        timeline.currentLayer = TARGET_LAYER_INDEX;
        convertToKeyframesSafety(timeline, [FRAME_30]);

        // 设置遮罩层0
        // timeline.currentLayer = MASK_LAYER_INDEX;
        layers[MASK_LAYER_INDEX].layerType = JSFLConstants.Constants.layer.layerType.MASK;
        // timeline.currentLayer = TARGET_LAYER_INDEX;
        layers[TARGET_LAYER_INDEX].layerType =
            JSFLConstants.Constants.layer.layerType.MASKED;

        // 传统补间，元件1
        timeline.currentLayer = TARGET_LAYER_INDEX;

        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        setClassicEaseCurve(timeline);

        doc.exitEditMode();
    }

    function Main() {
        // 请同时选中两个对象！(遮罩形状+被遮对象)
        if (!CheckSelection(selection, "selectElement", "Only two", "遮罩形状+被遮对象"))
            return;

        const mt = checkMaskTarget();
        if (!mt) return;

        const { mask, target } = mt;
        log.info("遮罩对象：" + getName(mask) + "，被遮对象：" + getName(target));

        // 转为元件
        var symbolName = generateNameUntilUnique("一键遮罩_");
        doc.convertToSymbol("graphic", symbolName, "center");

        KFrame();
    }

    Main();
});
