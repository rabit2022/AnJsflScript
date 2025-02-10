/**
 * @file: 01.重置中心点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:16
 * @project: AnJsflScript
 * @description:
 */

require(["checkUtil","selection","SAT"],function(checkUtil,sel,sat) {
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

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Not Zero")) return;


        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            sel.OnlySelectCurrent(element);

            var elePos = wrapPosition(element);
            var symbolCenter = wrapRect(doc.getSelectionRect()).getCenterVector();

            var offset = symbolCenter.clone().sub(elePos);

            element.setTransformationPoint(offset.toObj());
        }

        // 还原选择
        sel.SelectStart(selection);
    }

    Main();
});