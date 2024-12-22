/**
 * @file: 02.排兵布阵_neat.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 16:30
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
        if (selection.length > 1) {
            alert("请选择单个元件");
            return false;
        }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }

    function checkXMLPanel() {
        var success = true;
        // var XMLPANEL = osPath.join([folder_name, onlyName + "_neat.xml"]);
        var XMLPANEL = osPath.getXMLPath();
        var panel = doc.xmlPanel(XMLPANEL);
        if (panel.dismiss === "cancel") {
            alert("取消修改");
            success = false;
        }
        // horizontalCount  horizontalSpacing  verticalCount  verticalSpacing
        var inputHorizontalCount = panel.horizontalCount;
        if (inputHorizontalCount === null || isNaN(Number(inputHorizontalCount))) {
            alert("横向排布数量只能输入数字，请重新输入。");
            success = false;
        }
        var inputHorizontalSpacing = panel.horizontalSpacing;
        if (inputHorizontalSpacing === null || isNaN(Number(inputHorizontalSpacing))) {
            alert("横向排布间距只能输入数字，请重新输入。");
            success = false;
        }
        var inputVerticalCount = panel.verticalCount;
        if (inputVerticalCount === null || isNaN(Number(inputVerticalCount))) {
            alert("纵向排布数量只能输入数字，请重新输入。");
            success = false;
        }
        var inputVerticalSpacing = panel.verticalSpacing;
        if (inputVerticalSpacing === null || isNaN(Number(inputVerticalSpacing))) {
            alert("纵向排布间距只能输入数字，请重新输入。");
            success = false;
        }

        var horizontalCount = Number(inputHorizontalCount);
        var horizontalSpacing = Number(inputHorizontalSpacing);
        var verticalCount = Number(inputVerticalCount);
        var verticalSpacing = Number(inputVerticalSpacing);
        return {horizontalCount: horizontalCount, horizontalSpacing: horizontalSpacing, verticalCount: verticalCount, verticalSpacing: verticalSpacing, success: success}
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引
    
    function Main() {
        if (!checkDom()) {
            return;
        }

        // 整齐排布
        var {horizontalCount, horizontalSpacing, verticalCount, verticalSpacing, success} = checkXMLPanel();
        if (!success) {
            return;
        }
        
        var firstElement = selection[0];

    }

    Main();
})();

