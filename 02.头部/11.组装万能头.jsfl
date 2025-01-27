/**
 * @file: 11.组装万能头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 19:50
 * @project: AnJsflScript
 * @description:
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

        var shakeIntensity = xmlPanelUtil.parseNumber(panel.shakeIntensity, "摇头强度只能输入数字，请重新输入。");
        if (shakeIntensity === null) return null;
        var motionFrameCount = xmlPanelUtil.parseNumber(panel.motionFrameCount, "表情帧数只能输入数字，请重新输入。");
        if (motionFrameCount === null) return null;
        var headDirection = xmlPanelUtil.parseNumber(panel.headDirection,"头部朝向只能输入数字，请重新输入。");
        if (headDirection === null) return null;
        var shakeMode = xmlPanelUtil.parseString(panel.shakeMode, "摇头模式只能输入 (传统摇头 丝滑摇头)，请重新输入。");
        if (shakeMode === null) return null;

        return {
            shakeIntensity: shakeIntensity,
            motionFrameCount: motionFrameCount,
            headDirection: headDirection,
            shakeMode: shakeMode
        };
    }

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom()) return;
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        // 检查选择的元件
        if (!checkSelection()) return;

        // 读取XML面板配置
        var config = checkXMLPanel();
        if (config === null) return;
        var shakeIntensity = config.shakeIntensity;
        var motionFrameCount = config.motionFrameCount;
        var headDirection = config.headDirection;
        var shakeMode = config.shakeMode;

        
    }

    Main();
})();