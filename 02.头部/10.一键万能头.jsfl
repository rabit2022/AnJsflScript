/**
 * @file: 10.一键万能头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 17:33
 * @project: AnJsflScript
 * @description:
 */

require([
    'checkUtil',
    'promptUtil',
    'libUtil',
    'SAT',
    'selection',
    'linqUtil',
], function (checkUtil, promptUtil, libUtil, sat, sel, linqUtil) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

    var Range = linqUtil.range;

    var descriptions = {
        file: '10.一键万能头.jsfl',
        'file description': '选中多个表情，合成万能头',
        selection: '元件2个以上',
        'selection description': '选中多个表情',
        XMLPanel: false,
        'input parameters': {
            单个表情特续的帧数: 6,
        },
        detail: '包装元件',
        'detail description': '',
        steps: [
            '包装元件',
            'k帧',
            '交换元素',
            '除了第一帧的元素，都删除',
            '移动到中心位置',
        ],
    };

    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        wrapPosition = sat.GLOBALS.wrapPosition,
        wrapRect = sat.GLOBALS.wrapRect;

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

    // 过滤掉非库文件中的元件
    selection = selection.filter(function (value) {
        return value.libraryItem !== undefined;
    });

    var SYMBOL_LENGTH = selection.length;
    var SELECTION_NAMES = selection.map(function (value) {
        return value.libraryItem.name;
    });
    var TO_DELETE_SELECTION = selection.slice(1);

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'More')) return;

        var motionFramesCount = promptUtil.parseNumber(
            '输入万能头中单个表情特续的帧数',
            6,
            '请重新输入帧数,例如“30”'
        );
        if (motionFramesCount === null) return;

        var toInsertFrameCount = motionFramesCount * SYMBOL_LENGTH - 1;

        // 中心位置
        var selectRect = new Rectangle(doc.getSelectionRect());
        var selectCenter = selectRect.getCenterVector();

        var Important_element = selection[0];
        var Important_element_position = wrapPosition(Important_element);

        // 移动到中心位置
        var Offset = selectCenter.clone().sub(Important_element_position);
        // print("Offset:" + Offset.toString());

        sel.OnlySelectCurrent(Important_element);

        var symbolName = libUtil.generateNameUntilUnique('一键万能头_');
        doc.convertToSymbol('graphic', symbolName, 'center');

        Important_element = doc.selection[0];

        doc.enterEditMode('inPlace');

        var timeline = doc.getTimeline();

        // 给所有图层加帧
        timeline.insertFrames(toInsertFrameCount, true);

        // 关键帧
        var Keyframes = Range(0, toInsertFrameCount, motionFramesCount);

        for (var i = 0; i < Keyframes.length; i++) {
            if (i === 0) continue;

            var frameIndex = Keyframes.next();
            timeline.convertToKeyframes(frameIndex);

            var frame_element =
                timeline.layers[0].frames[frameIndex].elements[0];
            // 交换元素
            var name = SELECTION_NAMES[i];
            sel.OnlySelectCurrent(frame_element);
            doc.swapElement(name);
        }

        doc.exitEditMode();

        // 除了第一帧的元素，都删除
        // sel.SelectAll(TO_DELETE_SELECTION);
        // doc.deleteSelection();
        sel.DeleteSelection(TO_DELETE_SELECTION);

        sel.OnlySelectCurrent(Important_element);

        // 移动到中心位置
        doc.moveSelectionBy(Offset.toObj());
    }

    Main();
});
