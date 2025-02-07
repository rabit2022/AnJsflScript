/**
 * @file: 06.灵魂出窍.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 20:42
 * @project: AnJsflScript
 * @description:
 */


require(["checkUtil", "SAT","libUtil"], function (checkUtil, sat, libUtil) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        wrapPosition = sat.GLOBALS.wrapPosition,
        wrapRect = sat.GLOBALS.wrapRect;

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom(doc)) return;

    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴

    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curLayer = layers[curLayerIndex];//当前图层

    var curFrameIndex = timeline.currentFrame;//当前帧索引
    var curFrame = curLayer.frames[curFrameIndex];//当前帧


    // 渐变遮罩层
    var MASK_LAYER_INDEX = 0;
    // 宽高=位置+100
    var MASK_WIDTH = 100;
    var MASK_HEIGHT = 100;
    // offset=Point(-width,height/5)
    
    var SYMBOL_LAYER_INDEX = 1;

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        doc.clipCopy();

        doc.clipPaste();

        var rect = wrapRect(doc.getSelectionRect());
        var offset = new Vector(-rect.width, rect.height / 5);

        var symbolName = libUtil.generateNameUntilUnique("一键震惊_静_");
        doc.convertToSymbol('graphic', symbolName, 'center');


        doc.enterEditMode("inPlace");


        doc.exitEditMode();


        doc.setBlendMode('layer');

        doc.moveSelectionBy(offset.reverse().toObj());
    }

    Main();
});