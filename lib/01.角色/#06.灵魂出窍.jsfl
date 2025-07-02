/**
 * @file: #06.灵魂出窍.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/2 21:29
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
    "LayerOperation",
    "KeyFrameOperation",
    "SymbolNameGenerator",
    "SAT",
    "StrokeDefinitions",
    "FillDefinitions",
    "ColorPanel"
], function (checkUtil, log, lo, kfo, sng, sat, sd, fd, cp) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { addNewLayerSafety } = lo;
    const { convertToKeyframesSafety } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const { Vector, Size } = sat;

    const { NoStroke } = sd;
    const { LinearGradientFillBuilder } = fd.BUILDERS;
    const { setCustomPanel, resetCustomPanel } = cp;

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
    var selectedFrames = CheckSelectedFrames(timeline);
    if (!selectedFrames) return;
    const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "Only one")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function addNewSymbol(timeline) {
        doc.clipCopy();

        // 1.创建新的图层---- 灵魂出窍，
        addNewLayerSafety(timeline, "灵魂出窍");

        convertToKeyframesSafety(timeline, firstSlFrameIndex);

        doc.clipPaste(true);

        // 5. 移动到左上角
        var eleSize = Size.from(selection[0]);
        var moveDirection = new Vector(-1.5, -0.3);
        var distanceToMove = eleSize.toVector().scale(moveDirection.x, moveDirection.y);
        log.info("distanceToMove", distanceToMove);

        doc.moveSelectionBy(distanceToMove);

        // 3.包装为一个新的元件
        var symbolName = generateNameUntilUnique("灵魂出窍_");
        doc.convertToSymbol("graphic", symbolName, "center");
    }

    function setColorPanel() {
        var eleSize = Size.from(selection[0]);
        var symbolWidth = eleSize.width;

        function getPos1() {
            // 0----128
            // 720----133
            var x = symbolWidth;
            var y = x / 144 + 128;
            return parseInt(y);
        }

        function getPos2() {
            // 0----132
            // 720----164
            var x = symbolWidth;
            var y = (2 * x) / 45 + 132;
            return parseInt(y);
        }

        // 设置笔触，填充，，填充透明度80
        var stroke = new NoStroke();
        var fill = new LinearGradientFillBuilder()
            .addColorStop(0, "#FFFFFFCC")
            .addColorStop(getPos1(), "#FFFFFFCC")
            .addColorStop(getPos2(), "#FFFFFF00")
            .addColorStop(255, "#FFFFFF00")
            .build();
        log.info("fill", fill);
        setCustomPanel(stroke, fill);
    }

    function EditInner() {
        function getRect(element) {
            const bounds = getSymbolBounds(element);
            // log.info("bounds", bounds,bounds.center,bounds.size);
            const size = bounds.size;
            const addSize = new Size(100, 100);
            const newSize = size.clone().add(addSize);

            const newRect = wrapRectByCenter(bounds.center, newSize);

            // log.info("newRect", newRect);
            return newRect;
        }

        // 此时元件1  占用 第一个图层
        doc.enterEditMode("inPlace");

        // 4.1  添加渐变遮罩层
        var timeline = doc.getTimeline(); //时间轴

        var newLayerIndex = timeline.addNewLayer("渐变遮罩", "normal", true);

        // 设置笔触，填充，，填充透明度80
        setColorPanel();

        // 4.2 添加一个shape 长方形，铺满 元件的轮廓
        // 宽高=位置+100
        var rect = getRect(selection[0]);
        doc.addNewRectangle(rect, 0);

        // 设置 混合模式为 alpha
        // doc.setBlendMode 只能在元件生效，不能在图层生效
        // doc.setBlendMode('alpha')
        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        curLayer.setBlendModeAtFrame(0, "alpha");

        // 补帧 5s----150帧,不清楚有没有必要

        doc.exitEditMode();
    }

    function Main() {
        addNewSymbol(timeline);

        EditInner();
    }

    Main();
});
