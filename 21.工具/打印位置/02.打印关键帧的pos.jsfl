/**
 * @file: 02.打印所有帧的pos.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 16:20
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }

    var doc = fl.getDocumentDOM();//文档
    if (!CheckDom(doc)) return;

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
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var keyFrames = frUtil.getKeyFrames(curLayer);

        var transformArray = [];
        for (var i = 0; i < keyFrames.length; i++) {
            var frameIndex = keyFrames[i];
            var element = curLayer.frames[frameIndex].elements[0];
            var transform = wrapTransform(element);
            transformArray.push(transform);
        }

        LogArray(keyFrames);
        LogArray(transformArray);
    }

    Main();
})();