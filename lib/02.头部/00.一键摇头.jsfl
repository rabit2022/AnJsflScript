/**
 * @file: 00.一键摇头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 19:59
 * @project: AnJsflScript
 * @description:
 */

require([
    'checkUtil',
    'promptUtil',
    'libUtil',
    'frameRangeUtil',
    'JSFLConstants'
], function (checkUtil, promptUtil, libUtil, frameRangeUtil, JSFLConstants) {
    var descriptions = {
        file: '00.一键摇头.jsfl',
        'file description': '输出 摇头动作的元件,说话时的头部动作',
        selection: '仅一个元件',
        'selection description': '选中头部',
        XMLPanel: false,
        'input parameters': {
            头部朝向: '右',
            摇头力度: 3
        },
        detail: '包装元件',
        'detail description': 'k 6帧头',
        steps: ['包装元件', '更改元件位置']
    };

    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    // const {convertToKeyframesSafety}=frameRangeUtil;
    const { FRAME_4, FRAME_6 } = JSFLConstants.Numerics.frame.frameList;

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

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Only one')) return;

        var direction = promptUtil.parseDirection(
            '输入头部朝向(默认为右，空格为左)：',
            { 右: 1, ' ': -1, 左: -1 }
        );
        if (direction === null) {
            return;
        }

        var force = promptUtil.parseNumber(
            '输入摇头力度',
            3,
            '摇头力度只能输入数字，请重新输入。'
        );
        if (force === null) {
            return;
        }

        // fl.trace("direction: " + direction + ", force: " + force);

        var symbolName = libUtil.generateNameUntilUnique('一键摇头_');
        doc.convertToSymbol('graphic', symbolName, 'center');

        doc.enterEditMode('inPlace');

        var timeline = doc.getTimeline();
        // var _6_frames = 6 - 1;
        // 给所有图层加帧
        timeline.insertFrames(FRAME_6, true);

        // var _4_frames = 4 - 1;
        // timeline.convertToKeyframes(_4_frames);
        frameRangeUtil.convertToKeyframesSafety(timeline, [FRAME_4]);

        var frame4_element = timeline.layers[0].frames[FRAME_4].elements[0];
        frame4_element.x += direction * force;
        frame4_element.y += direction * force;

        doc.exitEditMode();
    }

    Main();
});
