/**
 * @file: 03.震惊-元件.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 15:34
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes('AppData/Local/Temp')) {
    var msg = '【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require([
    'checkUtil',
    'ElementTransform',
    'frameRangeUtil',
    'libUtil',
    'JSFLConstants',
    'EaseCurveUtil'
], function (checkUtil, et, frUtil, libUtil, JSFLConstants, easeCurveUtil) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    const { FRAME_1, FRAME_3, FRAME_6 } = JSFLConstants.Numerics.frame.frameList;
    // console.log('libUtil', libUtil);
    const { setTransformationPointWithCorner } = et;
    const { setClassicEaseCurve } = easeCurveUtil;

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

    // 关键帧
    var KEY_FRAMES = [FRAME_1, FRAME_3, FRAME_6];
    var ALTER_HEIGHT_FRAME = FRAME_3;
    // height  364.6,437.15   0.834
    //         238.6,286.1    0.8339
    // 6/5
    var ALTER_RATIO = 6 / 5;

    function KFrames() {
        doc.enterEditMode('inPlace');

        var selection = doc.selection;
        var timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        setTransformationPointWithCorner(selection[0], 'bottom center');

        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 调整高度
        var frame_element = curLayer.frames[ALTER_HEIGHT_FRAME].elements[0];
        frame_element.height *= ALTER_RATIO;
        // print("调整高度" + frame_element.height);

        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        // 传统补间动画
        setClassicEaseCurve(timeline);

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Only one')) return;

        // 获取第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;

        var symbolName = libUtil.generateNameUntilUnique('一键震惊_静_');
        doc.convertToSymbol('graphic', symbolName, 'center');

        var symbolName = libUtil.generateNameUseLast('一键震惊_动_');
        doc.convertToSymbol('graphic', symbolName, 'center');

        // 播放一次
        var selection1 = doc.selection; //选择
        for (var i = 0; i < selection1.length; i++) {
            var element = selection1[i];
            element.loop = 'play once';
        }

        KFrames();

        // 重置选中帧
        frUtil.resetSelectedFrames(timeline, frs);
    }

    Main();
});
