/**
 * @file: ${FILE_NAME}
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: ${DATE} ${TIME}
 * @project: ${PROJECT_NAME}
 * @description: ${END}
 */

(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        return true;
    }

    function checkSelection() {
        // if (selection.length < 1) {
        //     alert("请选择元件？");
        //     return false;
        // }
        // if (selection.length > 1) {
        //     alert("请选择单个元件");
        //     return false;
        // }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom()) return;
    
    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴
    
    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    var curLayer = layers[curLayerIndex];//当前图层
    var curFrame = curLayer.frames[curFrameIndex];//当前帧
    
    function Main() {
        // 检查选择的元件
        if (!checkSelection()) return;

        // 读取XML面板配置
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;

    }

    Main();
})();