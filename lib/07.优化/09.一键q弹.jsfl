/**
 * @file: 09.一键q弹.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 16:09
 * @project: AnJsflScript
 * @description:
 */

if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require(['checkUtil', 'xmlPanelUtil', 'libUtil', 'SAT'], function (
    checkUtil,
    xmlPanelUtil,
    libUtil,
    sat
) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var getOrigin = sat.GLOBALS.getOrigin;

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

        var amplitude = xmlPanelUtil.parseNumber(
            panel.amplitude,
            '抖动幅度只能输入数字，请重新输入。'
        );
        if (amplitude === null) return null;
        var frameCount = xmlPanelUtil.parseNumber(
            panel.frameCount,
            '抖动帧数只能输入数字，请重新输入。'
        );
        if (frameCount === null) return null;

        return { amplitude: amplitude, frameCount: frameCount };
    }

    /**
     * 定义一个函数，用于计算正弦波的y值
     * y = 幅度 * 2 * sin((2 * pi / 帧数) * x + -1.6) + 初始 + 幅度 * 2
     * @param {number} amplitude 振幅
     * @param {number} frameCount 帧数
     * @param {number} initial 初始值
     * @param {number} x 当前帧索引
     * @return {number} y坐标
     */
    function sine_model(amplitude, frameCount, initial, x) {
        // 计算正弦波的周期，即帧数
        var period = frameCount;
        // 计算正弦波的频率，即2 * pi / 周期
        var frequency = (2 * Math.PI) / period;
        // 计算正弦波的相位偏移
        var phaseShift = -1.6;
        // 计算正弦波的垂直偏移
        var verticalShift = initial + amplitude * 2;

        // 计算正弦波的y值
        var y = amplitude * 2 * Math.sin(frequency * x + phaseShift) + verticalShift;

        return y;
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Only one')) return;

        var config = checkXMLPanel();
        if (config === null) return;
        var amplitude = config.amplitude;
        var frameCount = config.frameCount;

        // 包装元件
        var symbolName = libUtil.generateNameUntilUnique('一键q弹_静_');
        doc.convertToSymbol('graphic', symbolName, 'top center');

        // 获取元件的变换点
        var element = doc.selection[0];
        element.setTransformationPoint(getOrigin().toObj());

        // 包装元件
        var symbolName1 = libUtil.generateNameUseLast('一键q弹_动_');
        doc.convertToSymbol('graphic', symbolName1, 'center');

        doc.enterEditMode('inPlace');
        doc.selectAll();

        // 获取初始值
        var initialElement = doc.selection[0];
        var initialHeight = initialElement.height;
        // var initialPos= new Point(initialElement.x, initialElement.y);
        var initialX = initialElement.x;
        var initialY = initialElement.y;

        // fl.trace("initial=" + initialHeight);

        var timeline1 = doc.getTimeline(); //时间轴

        // 删除所有帧
        timeline1.removeFrames(1, timeline1.frameCount);
        // 创建关键帧
        timeline1.convertToKeyframes(0, frameCount);

        for (var i = 0; i < frameCount; i++) {
            timeline1.currentFrame = i;
            var y = sine_model(amplitude, frameCount, initialHeight, i);
            // fl.trace("y=" + y);

            doc.selectAll();
            // 找到元件
            var element = doc.selection[0];
            element.height = y;

            // 重置位置
            element.x = initialX;
            element.y = initialY;
        }

        doc.exitEditMode();
    }

    Main();
});
