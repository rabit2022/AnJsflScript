/**
 * @file: 03.打印矩形的数据.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/13 18:07
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'SAT'], function (checkUtil, sat) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        wrapPosition = sat.GLOBALS.wrapPosition,
        wrapRect = sat.GLOBALS.wrapRect;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;

        var selectedRect = wrapRect(doc.getSelectionRect());
        // print('Selected rectangle: ' + selectedRect.toString());
        var selectedCenter = selectedRect.getCenterVector();
        // print('Selected center: ' + selectedCenter.toString());
        // 宽高
        var width = selectedRect.width;
        var height = selectedRect.height;
        // print('Selected size: ' + width + ' x ' + height);

        // var radius = Math.min(width, height) / 2;
        // print("Selected radius: " + radius);
    }

    Main();
});
