/**
 * @file: #06.灵魂出窍.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 20:42
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
require([
    "checkUtil",
    "SAT",
    "SymbolNameGenerator",
    "Context",
    "KeyFrameOperation",
    "LayerQuery",
    "DrawRectangle",
    "loglevel"
], function (checkUtil, sat, sng, Context, kfo, lq, dr, log) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { Vector, Size } = sat;
    const { wrapSize, getSymbolBounds, wrapRectByCenter } = sat.GLOBALS;

    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { getLayersIndexByName } = lq;
    const { convertToKeyframesSafety } = kfo;
    const { drawRectangleWithoutLine } = dr;

    const context = new Context();
    context.update();
    const {
        doc,
        selection,
        library,
        timeline,
        AllLayers,
        curLayerIndex,
        curLayer,
        curFrameIndex,
        curFrame
    } = context;
    const { firstSlLayerIndex, firstSlFrameIndex } = context;

    // 渐变遮罩层
    var MASK_LAYER_INDEX = 0;
    // 宽高=位置+100
    var MASK_WIDTH = 100;
    var MASK_HEIGHT = 100;

    // offset=Point(-width,height/5)

    function getRect(element) {
        const bounds = getSymbolBounds(element);
        // log.info("bounds", bounds,bounds.center,bounds.size);
        const size = bounds.size;
        const addSize = new Size(100, 100);
        const newSize = size.add(addSize);

        const newRect = wrapRectByCenter(bounds.center, newSize);

        // log.info("newRect", newRect);
        return newRect;
    }

    var symbolWidth = doc.selection[0].width;
    var symbolHeight = doc.selection[0].height;

    function KFrames() {
        // 此时元件1  占用 第一个图层
        doc.enterEditMode("inPlace");

        // 4.1  添加渐变遮罩层
        context.update();
        var timeline = context.timeline;
        var newLayerIndex = timeline.addNewLayer("渐变遮罩", "normal", true);

        // 4.2 添加一个shape 长方形，铺满 元件的轮廓
        // 宽高=位置+100
        var rect = getRect(selection[0]);
        // drawRectangleWithoutLine(rect)
        doc.addNewRectangle(rect, 0);

        // 设置 混合模式为 alpha

        // bug:doc.setBlendMode 只能在元件生效，不能在图层生效
        // doc.setBlendMode('alpha')
        context.update();
        var curLayer = context.curLayer;
        curLayer.setBlendModeAtFrame(0, "alpha");

        // TODO:设置笔触，填充，，填充透明度80

        // 补帧 5s----150帧,不清楚有没有必要

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        doc.clipCopy();

        // 1.创建新的图层---- 灵魂出窍，
        // 需要优化，如果有这个图层的时就不再创建，直接在那个图层上进行k帧
        var layerIndex = getLayersIndexByName(AllLayers, "灵魂出窍");
        if (layerIndex.length > 0) {
            // 已存在独白黑幕图层，直接选中
            timeline.currentLayer = layerIndex[0];
        } else {
            timeline.addNewLayer("灵魂出窍", "normal", true);
        }

        // 关键帧
        convertToKeyframesSafety(timeline, firstSlFrameIndex);

        // 2.复制选中的元件到新的图层
        // 必须true,否则会导致粘贴时出现问题:粘贴的位置没有与原位置重合
        doc.clipPaste(true);

        // 3.包装为一个新的元件
        var symbolName = generateNameUntilUnique("灵魂出窍_");
        doc.convertToSymbol("graphic", symbolName, "center");

        var element = selection[0];
        var eleSize = wrapSize(element);

        // 4. 编辑模式
        KFrames();

        // 5. 移动到左上角
        var moveDirection = new Vector(-1.5, -0.3);
        var distanceToMove = eleSize.toVector().scale(moveDirection);

        doc.moveSelectionBy(distanceToMove);

        // 6.设置 混合模式 图层
        context.update();
        var curLayer = context.curLayer;
        curLayer.setBlendModeAtFrame(firstSlFrameIndex, "layer");
    }

    Main();
});
