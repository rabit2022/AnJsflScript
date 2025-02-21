/**
 * @file: 00.曲线运动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 21:18
 * @project: AnJsflScript
 * @description:
 */


require(["checkUtil", "libUtil", "curve", "graphics", "selection", "SAT"],
    function (checkUtil, libUtil, curve, graphics, sel, sat) {
        var checkDom = checkUtil.CheckDom,
            checkSelection = checkUtil.CheckSelection;
        var Vector = sat.Vector;

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


        var GUIDE_LAYER_INDEX = 0;
        var SYMBOL_LAYER_INDEX = 1;

        // radius
        var RADIUS = 250;

        function drawLineAndMove(timeline, movePos) {

            var circleLineRect = graphics.drawCircleWithoutFill(new Vector(RADIUS, 0), RADIUS);

            // 删除bottom部分
            var bottom_rect = circleLineRect.getPart("bottom");
            doc.setSelectionRect(bottom_rect.toObj());
            doc.deleteSelection();

            var top_rect = circleLineRect.getPart("top");
            // 移动圆形
            doc.setSelectionRect(top_rect.toObj());
            doc.moveSelectionBy(movePos.toObj());

            // 计算新的位置矩形
            var moved_rect = top_rect.addOffset(movePos);
            return moved_rect;
        }

        function KFrames(timeline, movePos) {
            var _30_frames = 30 - 1;
            // 给所有图层加帧
            timeline.insertFrames(_30_frames, true);

            // 转为关键帧
            timeline.setSelectedLayers(SYMBOL_LAYER_INDEX);
            timeline.convertToKeyframes(_30_frames);

            // 设置元件位置
            var symbolElement = timeline.layers[SYMBOL_LAYER_INDEX].frames[_30_frames].elements[0];
            sel.OnlySelectCurrent(symbolElement);
            symbolElement.x = movePos.x;
            symbolElement.y = movePos.y;

            // 选中图层1的所有帧
            timeline.setSelectedFrames([SYMBOL_LAYER_INDEX, 0, _30_frames], true);

            // 补间动画
            // timeline.createMotionTween();
            curve.createTween(timeline,"motion tween");
            curve.setEaseCurve(timeline, "Sine Ease-In-Out");
        }

        function Main() {
            // 检查选择的元件
            if (!checkSelection(selection, "selectElement", "Only one")) return;

            var symbolName = libUtil.generateNameUntilUnique("曲线运动_静_");
            doc.convertToSymbol('graphic', symbolName, 'center');

            var symbolName = libUtil.generateNameUseLast("曲线运动_动_");
            doc.convertToSymbol('graphic', symbolName, 'center');

            doc.enterEditMode('inPlace');

            var timeline1 = doc.getTimeline();//时间轴

            // 添加引导层
            timeline1.addMotionGuide();

            // 画曲线
            var initialPos = new Vector(doc.viewMatrix.tx, doc.viewMatrix.ty);
            var circle_rect = drawLineAndMove(timeline1, initialPos);

            // 查找圆形的右下角位置
            var right_bottom_pos = circle_rect.getCorner("bottom right");
            var offset_pos = right_bottom_pos.clone().clone().sub(initialPos);

            KFrames(timeline1, offset_pos);

            alert("动作已生成，您可按需调整运动曲线！");
        }

        Main();
    });