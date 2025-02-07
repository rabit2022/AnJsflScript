/**
 * @file: 08.智能交换.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/6 19:37
 * @project: AnJsflScript
 * @description:
 */


require(["checkUtil", "SAT"], function (checkUtil, sat) {
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
        if (!checkSelection(selection, "selectElement", "Only two")) return;

        var elem1 = selection[0];
        var elem1Positon = new Vector(elem1.x, elem1.y);
        var elem2 = selection[1];
        var elem2Positon = new Vector(elem2.x, elem2.y);

        elem1.x = elem2Positon.x;
        elem1.y = elem2Positon.y;
        elem2.x = elem1Positon.x;
        elem2.y = elem1Positon.y;
    }

    Main();
});

