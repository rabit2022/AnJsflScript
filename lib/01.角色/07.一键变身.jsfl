/**
 * @file: 07.一键变身.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/12 18:15
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require([
    "checkUtil",
    "ElementQuery",
    "ElementOperation",
    "linqUtil",
    "SAT",
    "Tween",
    "loglevel",
    "JSFLConstants",
    "EaseCurve",
    "ElementSelect",
    "FramesSelect",
    "KeyFrameOperation",
    "DrawCircle"
], function (
    checkUtil,
    eq,
    ed,
    linqUtil,
    sat,
    twn,
    log,
    JSFLConstants,
    curve,
    es,
    fms,
    kfo,
    dc
) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;

    const { Rectangle } = sat;
    const { wrapPosition } = sat.GLOBALS;

    const { FRAME_1, FRAME_9, FRAME_17, FRAME_18 } =
        JSFLConstants.Numerics.frame.frameList;

    const { getMaxRight } = eq;
    const { breakApartToShape } = ed;
    const { setEaseCurve } = curve;
    const { createTween } = twn;
    const { OnlySelectCurrent, DeleteSelection } = es;
    const { SelectStartFms } = fms;
    const { $addOffset } = linqUtil;
    const { convertToKeyframesSafety } = kfo;
    const { drawCircleWithoutLine } = dc;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    if (!checkSelection(selection, "selectElement", "Only two")) return;

    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // 获取第一帧
    var frs = checkSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;
    var _FRAME_0 = firstFrame;

    // 关键帧 1,9,17,18
    var KEY_FRAMES = [FRAME_1, FRAME_9, FRAME_17, FRAME_18];
    // 实际的关键帧
    KEY_FRAMES = $addOffset(KEY_FRAMES, firstFrame);

    // 变身前，变身后 1,17
    var BEFORE_FRAME = KEY_FRAMES[0];
    var AFTER_FRAME = KEY_FRAMES[2];

    // 中间的shape ,圆形
    var MIDDLE_SHAPE_FRAME = KEY_FRAMES[1];
    var MIDDLE_SHAPE_CENTER = (function () {
        // 最大的矩形的中心
        var selectedRect = new Rectangle(doc.getSelectionRect());
        log.info("Selected rectangle: " + selectedRect.toString());
        var selectedCenter = selectedRect.getCenterVector();
        log.info("Selected center: " + selectedCenter.toString());
        return selectedCenter;
    })();

    var MIDDLE_SHAPE_RADIUS = (function () {
        //  变身前             变身后       直径
        // 114.5，364.6    114.5，364.6    69.7
        // 2                              138.4  2
        // 2,1                            2
        // 1,2                            1
        // 只以变身前的宽度为准，计算出变身后直径  0.6087
        var RATIO = 0.6087;

        var [FRAME0_BEFORE_Element, FRAME0_AFTER_Element] =
            getBeforeAfterElement(_FRAME_0);
        return (FRAME0_BEFORE_Element.width * RATIO) / 2;
    })();

    // 变身完成的动画帧
    var FINISH_FRAME = KEY_FRAMES[3];

    /**
     * 获取变身前后的元素
     * @param {Number} frameIndex 帧索引
     * @return {[Element, Element]} 变身前后的元素
     */
    function getBeforeAfterElement(frameIndex) {
        timeline.currentFrame = frameIndex;
        var FRAME_0_Elements = firstLayer.frames[frameIndex].elements;
        if (!checkSelection(FRAME_0_Elements, "elementOnFrame", "Only two")) return;
        // 变身后：最右边的元素
        // 变身前：最左边的元素
        var AFTER_Element = getMaxRight(FRAME_0_Elements);

        var BEFORE_Element = (function (selection) {
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
        })(FRAME_0_Elements);
        var AFTER_ELEMENT_POS = wrapPosition(AFTER_Element);
        var BEFORE_ELEMENT_POS = wrapPosition(BEFORE_Element);
        log.info("BEFORE_ELEMENT_POS", BEFORE_ELEMENT_POS);
        log.info("AFTER_ELEMENT_POS", AFTER_ELEMENT_POS);
        return [BEFORE_Element, AFTER_Element];
    }

    /**
     * 变身
     * @param {Element} shifting_element 要变身的元素
     */
    function shapeShifting(shifting_element) {
        // 变身
        OnlySelectCurrent(shifting_element);
        breakApartToShape(shifting_element);
    }

    function Main() {
        // 关键帧
        // frUtil.convertToKeyframesSafety(timeline, firstLayer, KEY_FRAMES);
        timeline.currentLayer = frs[0].layerIndex;
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 变身前
        var [FRAME1_BEFORE_Element, FRAME1_AFTER_Element] =
            getBeforeAfterElement(BEFORE_FRAME);
        // print("FRAME1_BEFORE_Element", FRAME1_BEFORE_Element);
        // 删除变身后的元素
        DeleteSelection([FRAME1_AFTER_Element]);
        // 变身
        shapeShifting(FRAME1_BEFORE_Element);

        // 变身后
        var [FRAME17_BEFORE_Element, FRAME17_AFTER_Element] =
            getBeforeAfterElement(AFTER_FRAME);

        // 删除变身前的元素
        DeleteSelection([FRAME17_BEFORE_Element]);
        // 变身
        shapeShifting(FRAME17_AFTER_Element);

        // 变身完成
        var [FRAME18_BEFORE_Element, FRAME18_AFTER_Element] =
            getBeforeAfterElement(FINISH_FRAME);

        // 删除变身前的元素
        DeleteSelection([FRAME18_BEFORE_Element]);

        // 中间的shape
        var MIDDLE_SHAPE_Elements = getBeforeAfterElement(MIDDLE_SHAPE_FRAME);

        // 删除所有元素
        DeleteSelection(MIDDLE_SHAPE_Elements);
        // 画圆形
        drawCircleWithoutLine(MIDDLE_SHAPE_CENTER, MIDDLE_SHAPE_RADIUS);

        // 补间动画
        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);
        // 形状补间动画
        createTween(timeline, "shape tween");
        setEaseCurve(timeline, "Cubic Ease-Out");

        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
