/**
 * @file: 03.一键摆头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 21:45
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkDom() {
        if (doc == null) {
            throw new Error("请打开 [.fla] 文件");
        }
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
    checkDom();
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkSelection()) {
            return;
        }
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;

        // var myFilters = doc.getFilters();
        // for (var i = 0; i < myFilters.length; i++) {
        //     if (myFilters[i].name === "blurFilter") {
        //         myFilters[i].blurX = 50;
        //     }
        // }
        // doc.setFilters(myFilters);

        var blurFilterForce = promptUtil.parseNumber("输入动态模糊度：", 4, "动态模糊度只能输入数字，请重新输入。");
        if (blurFilterForce === null) return;
        
        // var element=selection[0];
        doc.group();
        
        SelectAll();
        var element = doc.selection[0];
        
        // 滤镜添加--失败
        var myFilters = element.getFilters();
        for (var i = 0; i < myFilters.length; i++) {
            if (myFilters[i].name === "blurFilter") {
                myFilters[i].blurX = blurFilterForce;
                myFilters[i].blurY = blurFilterForce;
            }
        }
        doc.setFilters(myFilters);
        
        // print(doc.selection.length)

        var symbolName = libUtil.generateNameUntilUnique("一键摆头_");
        doc.convertToSymbol('graphic', symbolName, 'center');


        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();
        // 给所有图层加帧
        timeline.insertFrames(FRAME_6, true);

        var _4_frames = 4 - 1;
        timeline.convertToKeyframes(FRAME_4);

        // 水平翻转
        var frame4_element=timeline.layers[0].frames[_4_frames].elements[0];
        frame4_element.scaleX=-1;
        frame4_element.scaleY=1;

        doc.exitEditMode();
    }

    Main();
})();