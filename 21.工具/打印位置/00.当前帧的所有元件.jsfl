/**
 * @file: 00.打印pos.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 18:07
 * @project: AnJsflScript
 * @description:打印当前帧的所有元件pos
 */

require(['checkUtil', 'SAT'], function (checkUtil, sat) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        Transform = sat.Transform,
        wrapPosition = sat.GLOBALS.wrapPosition;
    // var LogArray = logUtil.LogArray;

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

        var transformArray = [];
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            var transform = new Transform(element);
            // fl.trace(transform.toString());
            transformArray.push(transform.toString());
        }

        // LogArray(transformArray);
        console.log("transformArray: ", transformArray);
    }

    Main();
});
