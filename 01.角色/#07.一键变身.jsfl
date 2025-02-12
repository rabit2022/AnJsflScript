/**
 * @file: 07.一键变身.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/12 18:15
 * @project: AnJsflScript
 * @description:
 */

require(["checkUtil", "elementUtil", "linqUtil", "frUtil","selection", "sat"],
    function (checkUtil, ele, linqUtil, frUtil,sel, sat) {
        var checkDom = checkUtil.CheckDom,
            checkSelection = checkUtil.CheckSelection,
            checkSelectedFrames = checkUtil.CheckSelectedFrames;
        var Vector = sat.Vector,
            Rectangle = sat.Rectangle,
            wrapPosition = sat.GLOBALS.wrapPosition,
            wrapRect = sat.GLOBALS.wrapRect;

        var doc = fl.getDocumentDOM();//文档
        if (!checkDom(doc)) return;

        var selection = doc.selection;//选择
        if (!checkSelection(selection, "selectElement", "Only two")) return;

        var library = doc.library;//库文件
        var timeline = doc.getTimeline();//时间轴

        var layers = timeline.layers;//图层
        var curLayerIndex = timeline.currentLayer;//当前图层索引
        var curLayer = layers[curLayerIndex];//当前图层

        var curFrameIndex = timeline.currentFrame;//当前帧索引
        var curFrame = curLayer.frames[curFrameIndex];//当前帧

        // 获取第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        // 关键帧 1,9,17,18
        var KEY_FRAMES = [FRAME_1, FRAME_9, FRAME_17, FRAME_18];
        // 变身前，变身后 1,17
        var BEFORE_FRAME = FRAME_1;
        var AFTER_FRAME = FRAME_17;

        KEY_FRAMES = linqUtil.addOffset(KEY_FRAMES, firstFrame);
        BEFORE_FRAME += firstFrame;
        AFTER_FRAME += firstFrame;


        // 中间的shape ,圆形
        var MIDDLE_SHAPE_FRAME = FRAME_9;

        function get_Before_After_Element(selection) {
            // 变身后：最右边的元素
            // 变身前：最左边的元素
            var AFTER_Element = ele.getMaxRight(selection);
            var AFTER_ELEMENT_POS = wrapPosition(AFTER_Element);
            print("AFTER_Element", AFTER_ELEMENT_POS);
            var BEFORE_Element = (function () {
                // 1-index
                if (selection.length === 2) {
                    var index = selection.indexOf(AFTER_Element);

                    // 如果找到了 index，说明 AFTER_Element 是 selection 中的一个元素
                    if (index !== -1) {
                        // 使用另一个索引找到 BEFORE_Element
                        return selection[1 - index];
                    }
                }

                throw new Error("Cannot find BEFORE_Element, must be two elements");
            })();
            var AFTER_ELEMENT_POS = wrapPosition(AFTER_Element);
            var BEFORE_ELEMENT_POS = wrapPosition(BEFORE_Element);
            // print("BEFORE_ELEMENT_POS",BEFORE_ELEMENT_POS);
            // print("AFTER_ELEMENT_POS",AFTER_ELEMENT_POS);
            return [BEFORE_Element, AFTER_Element];
        }

        function Main() {
            // 关键帧
            frUtil.convertToKeyframesSafety(timeline, firstLayer, KEY_FRAMES);

            // 变身前
            timeline.currentFrame = BEFORE_FRAME;
            var BEFORE_Elements=firstLayer.frames[BEFORE_FRAME].elements;
            print("BEFORE_Frame",BEFORE_FRAME);
            var [FRAME1_BEFORE_Element, FRAME1_AFTER_Element]=get_Before_After_Element(BEFORE_Elements);
            
            // // 删除变身后的元素
            // sel.DeleteSelection([FRAME1_AFTER_Element]);
            // // 变身
            // sel.OnlySelectCurrent(FRAME1_BEFORE_Element);
            // ele.breakApartCompletely(FRAME1_BEFORE_Element)
            
            // 变身后
            timeline.currentFrame = AFTER_FRAME;
            var AFTER_Elements=firstLayer.frames[AFTER_FRAME].elements;
            var [FRAME17_BEFORE_Element, FRAME17_AFTER_Element]=get_Before_After_Element(AFTER_Elements);
            
            // // 删除变身前的元素
            // sel.DeleteSelection([FRAME17_BEFORE_Element]);
            // // 变身
            // sel.OnlySelectCurrent(FRAME17_AFTER_Element);
            //
            // ele.breakApartCompletely(FRAME17_AFTER_Element)
        }

        Main();
    });