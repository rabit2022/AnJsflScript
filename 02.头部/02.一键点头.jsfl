/**
 * @file: 02.一键点头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 21:15
 * @project: AnJsflScript
 * @description:
 */

(function () {
    var descriptions={
        "file": "02.一键点头.jsfl",
        "file description": "输出 点头动作的元件，需要自己设置变形点",
        "selection": "仅一个元件",
        "selection description": "选中头部",
        "XMLPanel": false,
        "input parameters": {
            "头部朝向": "右"
        },
        "detail": "包装元件",
        "detail description": "",
        "steps": [
            "包装元件",
            "k帧",
            "更改旋转"
        ]
    }
    function checkDom() {
        if (doc == null) {
            throw new Error("请打开 [.fla] 文件");
        }
    }

    function checkSelection() {
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

    var ShakeIntensity = 20; // 震动强度
    
    function Main() {
        if (!checkSelection()) {
            return;
        }
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;
        var headDirection = promptUtil.parseDirection("输入头部朝向(默认为右，空格为左)：",
            {"右": 1, " ": -1, "左": -1});
        if (headDirection === null) return;


        var symbolName = libUtil.generateNameUntilUnique("一键点头_");
        doc.convertToSymbol('graphic', symbolName, 'center');

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();
        // 给所有图层加帧
        timeline.insertFrames(FRAME_12, true);

        // 关键帧 4，7,10
        timeline.convertToKeyframes(FRAME_4);
        timeline.convertToKeyframes(FRAME_7);
        timeline.convertToKeyframes(FRAME_10);

        // 获取元素，1,7
        var frame1_element=timeline.layers[0].frames[FRAME_1].elements[0];
        frame1_element.rotation = headDirection * ShakeIntensity;

        var frame7_element=timeline.layers[0].frames[FRAME_7].elements[0];
        frame7_element.rotation = headDirection * ShakeIntensity;

        doc.exitEditMode();
    }

    Main();
})();