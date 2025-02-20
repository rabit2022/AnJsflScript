/**
 * @file: 07.一键甩头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 14:56
 * @project: AnJsflScript
 * @description:
 */

require(["checkUtil", "promptUtil", "satUtil", "frUtil", "curve", "Constants"],
    function (checkUtil, promptUtil, satUtil, frUtil, curve, Constants) {
        const {checkDom, checkSelection, checkSelectedFrames} = checkUtil;
        const {pointUtil, rectUtil} = satUtil;
        const {FRAME_1, FRAME_11} = Constants;

        var descriptions = {
            "file": "07.一键甩头.jsfl",
            "file description": "头部的甩头效果的动作，必须一个图层一个元件",
            "selection": "仅一个元件",
            "selection description": "选中头部",
            "XMLPanel": false,
            "input parameters": {},
            "detail": "直接k帧",
            "detail description": "更改元件的 旋转补间,由于选中帧有多个元件时，补间动画会出现问题，所以这里选中帧的图层上，只能有一个元件。",
            "steps": [
                "设置变形点",
                "获取选择的第一帧",
                "传统补间，顺时针旋转"
            ]
        };

        var doc = fl.getDocumentDOM();//文档
        if (!checkDom(doc)) return;

        var selection = doc.selection;//选择
        var library = doc.library;//库文件
        var timeline = doc.getTimeline();//时间轴

        var layers = timeline.layers;//图层
        var curLayerIndex = timeline.currentLayer;//当前图层索引
        var curLayer = layers[curLayerIndex];//当前图层

        var curFrameIndex = timeline.currentFrame;//当前帧索引
        var curFrame = curLayer.frames[curFrameIndex];//当前帧

        function Main() {
            // 检查选择的元件
            if (!checkSelection(selection, "selectElement", "Only one")) return;


            // 选中的所有帧 的第一帧
            var frs = checkSelectedFrames(timeline);
            if (frs === null) return;
            var firstFrame = frs[0].startFrame;

            var direction = promptUtil.parseDirection("输入头部朝向(默认为右，空格为左)：",
                {"右": 1, " ": -1, "左": -1});
            if (direction === null) {
                return;
            }

            // 变形点
            var element = selection[0];
            var trPoint = pointUtil.getShakeHeadTrPoint(element);
            element.setTransformationPoint(trPoint);

            // 1,11
            var frame_1 = firstFrame + FRAME_1;
            var frame_11 = firstFrame + FRAME_11;

            // 关键帧
            var toConvertKeys = [frame_1, frame_11];
            frUtil.convertToKeyframesSafety(timeline, curLayerIndex, toConvertKeys);

            // 选中帧
            timeline.setSelectedFrames(frame_1, frame_11, true);

            // 传统补间，顺时针旋转，1
            curve.setClassicEaseCurve(timeline);
            curve.setTweenRotation(timeline, "clockwise", 1);

            // 重置选中帧
            frUtil.resetSelectedFrames(timeline, frs);

        }

        Main();
    });