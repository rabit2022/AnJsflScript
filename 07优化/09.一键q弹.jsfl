/**
 * @file: 09.一键q弹.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 16:09
 * @project: WindowSWF-master
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
        var XML_PANAL = [
            "<dialog title='q弹' buttons='accept, cancel'>",

            "<hbox ><label control='frameCount' value='请输入抖动帧数（越多越慢）:'/><textbox id='frameCount' value='10' width='80' /></hbox>",
            "<hbox><label control='amplitude' value='请输入抖动幅度（越大越狠）:'/><textbox id='amplitude' value='2' width='80' /></hbox>",
            "<separator />",

            "</dialog>"
        ];
        // 从XML字符串创建对话框面板并获取相关输入控件的值以及点击的按钮
        var dialog = fl.xmlPanelFromString(XML_PANAL.join(""));

        // 如果点击的是“取消”按钮，直接返回，不执行后续代码，确保功能符合需求
        if (dialog.dismiss === "cancel") {
            alert("取消修改");
            // return;
            success = false;
        }

        var inputFrameCount = dialog.frameCount;
        var inputAmplitude = dialog.amplitude;
        // 检查输入抖动帧数是否为空
        if (inputFrameCount === null || isNaN(Number(inputFrameCount))) {
            alert("抖动帧数只能输入数字，请重新输入。");
            // return;
            success = false;
        }
        // 检查输入抖动幅度是否为空
        if (inputAmplitude === null || isNaN(Number(inputAmplitude))) {
            alert("抖动幅度只能输入数字，请重新输入。");
            // return;
            success = false;
        }

        var amplitude = Number(inputAmplitude);
        var frameCount = Number(inputFrameCount);
        return {amplitude: amplitude, frameCount: frameCount, success: success};
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引


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
        if (!checkDom()) {
            return;
        }

        // 获取输入参数
        var {amplitude, frameCount, success} = checkXMLPanel();
        if (!success) {
            return;
        }

        // 包装元件
        var symbolName = ele.generateNameUntilUnique("一键q弹_静");
        doc.convertToSymbol("graphic", symbolName, "top center");

        // 获取元件的变换点
        var element = doc.selection[0];
        element.setTransformationPoint(getZeroPoint().toObj());

        // 包装元件
        var symbolName1 = ele.generateNameUseLast("一键q弹_动");
        doc.convertToSymbol("graphic", symbolName1, "center");

        doc.enterEditMode("inPlace");
        doc.selectAll();

        // 获取初始值
        var initialElement = doc.selection[0];
        var initialHeight = initialElement.height;
        // var initialPos= new Point(initialElement.x, initialElement.y);
        var initialX = initialElement.x;
        var initialY = initialElement.y;

        // fl.trace("initial=" + initialHeight);

        var timeline1 = doc.getTimeline();//时间轴

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
})();