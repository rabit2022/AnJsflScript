/**
 * @file: 09.一键等高.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 21:30
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'ele'], function (checkUtil, ele) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

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
        if (!checkSelection(selection, 'selectElement', 'More')) return;

        var maxElement = ele.getMaxRight(selection);

        // 获取高度
        var height = maxElement.height;

        // 设置元件的高度
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            if (element === maxElement) {
                continue;
            }
            var ratio = element.width / element.height;

            element.height = height;
            element.width = height * ratio;
        }
    }

    Main();
});
