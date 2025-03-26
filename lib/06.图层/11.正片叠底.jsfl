/**
 * @file: 11.正片叠底.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/13 20:38
 * @project: AnJsflScript
 * @description:
 */

// import _ from 'lodash';

require([
    'checkUtil',
    'frameRangeUtil',
    'frameRange',
    'loglevel',
    'lodash',
    'KeyFrameMode',
    'JSFLConstants'
    // 'FUNC'
], function (
    checkUtil,
    frUtil,
    FrameRange,
    log,
    _,
    KeyFrameMode,
    JSFLConstants
) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    // const { OF_MACRO } = FUNC;

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

    const MULTIPLY = JSFLConstants.symbol.blendMode.multiply;

    // 正片叠底
    function setBlendMode(layer, frameIndex, blendMode) {
        layer.setBlendModeAtFrame(frameIndex, blendMode);
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;

        var mode = KeyFrameMode();
        if (!mode) return;
        mode.forEach(function (item) {
            var { layer, frameIndex } = item;
            // silentFrame(frame);
            setBlendMode(layer, frameIndex, MULTIPLY);
        });
    }

    Main();
});
