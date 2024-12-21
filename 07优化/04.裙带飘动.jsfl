/**
 * @file: 04.裙带飘动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 21:31
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
        var XML_PANAL = [
            "<dialog title='q弹' buttons='accept, cancel'>",

            "<hbox ><label control='direction' value='选择飘动方向(默认向右，空格为左)'/><textbox id='direction' value='右' width='80' /></hbox>",
            "<hbox><label control='angle' value='输入飘动幅度（1~10)'/><textbox id='angle' value='3' width='80' /></hbox>",
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

        var inputAngle = dialog.angle;
        // 检查输入角度是否为空
        if (inputAngle === null || isNaN(Number(inputAngle))) {
            alert("角度只能输入数字，请重新输入。");
            // return;
            success = false;
        }
        // 检查输入角度是否在1~10之间
        if (Number(inputAngle) < 1 || Number(inputAngle) > 10) {
            alert("角度只能输入1~10之间的数字，请重新输入。");
            // return;
            success = false;
        }

        var inputDirection = dialog.direction;
        // 检查输入方向是否为空
        if (inputDirection === null) {
            alert("方向不能为空，请重新输入。");
            // return;
            success = false;
        }
        // 检查输入方向是否为“左”或“右”
        if (inputDirection !== " " && inputDirection !== "右") {
            alert("方向只能输入空格或右，请重新输入。");
            // return;
            success = false;
        }

        var angle = Number(inputAngle);
        var direction = inputDirection === " " ? 1 : -1;
        return {
            angle: angle,
            direction: direction,
            success: success
        }
    }


    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引


    function KFrames(angle, direction) {
        // k 帧
        doc.enterEditMode('inPlace');
        doc.selectAll();

        var timeline1 = doc.getTimeline();//时间轴

        // 删除所有帧
        timeline1.removeFrames(1, timeline1.frameCount);

        // 创建帧  30
        timeline1.currentFrame = 0;
        var _30_frame = 31 - 1;
        var _15_frame = _30_frame / 2 - 1;

        timeline1.insertFrames(_30_frame);

        // 创建关键帧,15,30
        timeline1.convertToKeyframes(_15_frame);
        timeline1.convertToKeyframes(_30_frame);

        // 更改第15帧的旋转
        timeline1.currentFrame = _15_frame;
        doc.selectAll();

        var element1 = doc.selection[0];
        // fl.trace("angle:" + angle + " direction:" + direction + " element1" + 2 * angle * direction);
        element1.rotation += 2 * angle * direction;

        // 选中所有帧
        timeline1.setSelectedFrames(0, _30_frame);

        // 创建动效
        timeline1.createMotionTween();
        setEaseCurve(timeline1, "Sine Ease-In-Out");

        doc.exitEditMode();
    }

    function Main() {
        if (!checkDom()) {
            return;
        }

        // 获取输入值
        var {angle, direction, success} = checkXMLPanel();
        if (!success) {
            return;
        }
        // fl.trace("角度：" + angle + " 方向：" + direction);

        // 包装元件
        var symbolName = ele.generateNameUntilUnique("裙带飘动_静");
        doc.convertToSymbol("graphic", symbolName, "center");

        // 获取元件
        var element = doc.selection[0];

        // // 重置注册点,到中心
        // ele.resetRegisterPoint(element);

        // 变形点 到右上角
        ele.alterTransformationPoint(element, "top right");

        // 包装元件
        var symbolName1 = ele.generateNameUseLast("裙带飘动_动");
        doc.convertToSymbol("graphic", symbolName1, "center");

        // k 帧
        KFrames(angle, direction);
    }

    Main();
})();

