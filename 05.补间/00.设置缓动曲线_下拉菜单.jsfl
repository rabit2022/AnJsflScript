/**
 * @file: 00.设置缓动曲线_下拉菜单.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/9 16:51
 * @project: AnJsflScript
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

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
        
        var easeType = panel.easeType;
        if (easeType === null) {
            alert("请选择缓动曲线");
            return null;
        }
        var easeInOut = panel.easeInOut;
        if (easeInOut === null) {
            alert("请选择缓动方向");
            return null;
        }
        
        var intensity =xmlPanelUtil.parseNumber(panel.intensity,"请设置缓动强度");
        if (intensity === null) return null;
        
        return {easeType: easeType, easeInOut: easeInOut, intensity: intensity};
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
        
        var config = checkXMLPanel();
        if (config === null) return;

        var easeType = config.easeType;
        var easeInOut = config.easeInOut;
        var intensity = config.intensity;

        if (easeType === "Classic") {
            timeline.createMotionTween();
            curve.setClassicEaseCurve(timeline, easeInOut, intensity);
        } else if (easeType === "No Ease") {
            var easeCurve = easeType;

            timeline.createMotionTween();
            curve.setEaseCurve(timeline, easeCurve);
        } else {
            var easeCurve = easeType + " " + easeInOut;

            timeline.createMotionTween();
            curve.setEaseCurve(timeline, easeCurve);
        }
    }

    Main();
})();

