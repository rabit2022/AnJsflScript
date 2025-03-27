/**
 * @file: 00.设置缓动曲线_下拉菜单.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/9 16:51
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'xmlPanelUtil', 'curveUtil'], function (
    checkUtil,
    xmlPanelUtil,
    curve
) {
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

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var easeType = panel.easeType;
        if (easeType === null) {
            alert('请选择缓动曲线');
            return null;
        }
        var easeInOut = panel.easeInOut;
        if (easeInOut === null) {
            alert('请选择缓动方向');
            return null;
        }

        var intensity = xmlPanelUtil.parseNumber(panel.intensity, '请设置缓动强度');
        if (intensity === null) return null;

        return {
            easeType: easeType,
            easeInOut: easeInOut,
            intensity: intensity
        };
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;

        var config = checkXMLPanel();
        if (config === null) return;

        var easeType = config.easeType;
        var easeInOut = config.easeInOut;
        var intensity = config.intensity;

        if (easeType === 'Classic') {
            curve.setClassicEaseCurve(timeline, easeInOut, intensity);
        } else if (easeType === 'No Ease') {
            var easeCurve = easeType;

            curve.createTween(timeline, 'motion tween');
            curve.setEaseCurve(timeline, easeCurve);
        } else {
            var easeCurve = easeType + ' ' + easeInOut;

            curve.createTween(timeline, 'motion tween');
            curve.setEaseCurve(timeline, easeCurve);
        }
    }

    Main();
});
