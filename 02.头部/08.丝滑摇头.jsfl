/**
 * @file: 08.丝滑摇头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 15:53
 * @project: AnJsflScript
 * @description:
 */

(function () {
    var descriptions={
        "file": "08.丝滑摇头.jsfl",
        "file description": "摇头的动作",
        "selection": "仅一个元件",
        "selection description": "选中头部",
        "XMLPanel": true,
        "input parameters": {
            "摇头力度": 3,
            "头部朝向": "头部向左"
        },
        "detail": "包装元件",
        "detail description": "选中头部",
        "steps": [
            "读取XML面板配置",
            "包装元件",
            "k帧",
            "设置变形点",
            "更改位置",
            "传统补间"
        ]
    };
    
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        return true;
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


        var shakeIntensity = xmlPanelUtil.parseNumber(panel.shakeIntensity, "摇头强度只能输入数字，请重新输入。");
        if (shakeIntensity === null) return null;

        var headDirection = xmlPanelUtil.parseNumber(panel.headDirection);
        if (headDirection === null) return null;

        return {shakeIntensity: shakeIntensity, headDirection: headDirection};
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


    function KFrames(headDirection, shakeIntensity) {
        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();

        // 设置变形点
        var element1 = timeline.layers[0].frames[0].elements[0];
        // var trPoint = getTrPoint(selection[0]);
        var trPoint = pointUtil.getShakeHeadTrPoint(element1);
        element1.setTransformationPoint(trPoint.toObj());

        // 给所有图层加帧
        timeline.insertFrames(FRAME_7, true);
        // 关键帧 1,4,7
        timeline.convertToKeyframes(FRAME_4);
        timeline.convertToKeyframes(FRAME_7);

        var frame4_element = timeline.layers[0].frames[FRAME_4].elements[0];
        // -57.25,-182.25    -60.25,-179.25  (-3,+3)  3,左摇头 
        // -57.25,-182.25    -54.25,-179.25  (+3,+3)  3,右摇头 
        frame4_element.x += headDirection * shakeIntensity;
        frame4_element.y += shakeIntensity;

        SelectAllTl(timeline);

        curve.setClassicEaseCurve(timeline);

        doc.exitEditMode();

    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection()) return;

        // 读取XML面板配置
        var config = checkXMLPanel();
        if (config === null) return;
        var shakeIntensity = config.shakeIntensity;
        var headDirection = config.headDirection;

        var symbolName = libUtil.generateNameUntilUnique("丝滑摇头_");
        doc.convertToSymbol('graphic', symbolName, 'center');

        KFrames(headDirection, shakeIntensity);
    }

    Main();
})();