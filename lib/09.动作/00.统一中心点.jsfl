/**
 * @file: 00.统一中心点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:16
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'selectionUtil', 'elementUtil', 'SAT'], function (
    checkUtil,
    sel,
    ele,
    sat
) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var wrapPosition = sat.GLOBALS.wrapPosition;

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
        if (!checkSelection(selection, 'selectElement', 'Not Zero')) return;

        // 找到最右边的元素
        var maxElement = ele.getMaxRight(selection);

        // 获取 transformPoint
        var trPoint = wrapPosition(maxElement.getTransformationPoint());

        // 把  所有元素的形变点   设置为   最右边的元素的形变点
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            sel.OnlySelectCurrent(element);

            element.setTransformationPoint(trPoint.toObj());
        }
    }

    Main();
});
