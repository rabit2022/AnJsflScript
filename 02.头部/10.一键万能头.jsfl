/**
 * @file: 10.一键万能头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 17:33
 * @project: AnJsflScript
 * @description:
 */

(function () {
    var descriptions = {
        "file": "10.一键万能头.jsfl",
        "file description": "选中多个表情，合成万能头",
        "selection": "元件2个以上",
        "selection description": "选中多个表情",
        "XMLPanel": false,
        "input parameters": {
            "单个表情特续的帧数": 6
        },
        "detail": "包装元件",
        "detail description": "",
        "steps": [
            "包装元件",
            "k帧",
            "交换元素",
            "除了第一帧的元素，都删除",
            "移动到中心位置"
        ]
    };

    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        return true;
    }

    function checkSelection() {
        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
        // if (selection.length > 1) {
        //     alert("请选择单个元件");
        //     return false;
        // }
        if (selection.length === 1) {
            alert("请选择至少两个元件");
            return false;
        }
        return true;
    }

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom()) return;
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

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
        if (!checkSelection()) return;

        // 读取XML面板配置
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;


        var motionFramesCount = promptUtil.parseNumber("输入万能头中单个表情特续的帧数", 6, "请重新输入帧数,例如“30”");
        if (motionFramesCount === null) return;

        var toInsertFrameCount = motionFramesCount * SYMBOL_LENGTH - 1;

        // 中心位置
        var selectRect = wrapRect(doc.getSelectionRect());
        var selectCenter = selectRect.center();

        var Important_element = selection[0];
        var Important_element_position = wrapPosition(Important_element);

        // 移动到中心位置
        var Offset = selectCenter.sub(Important_element_position);
        // print("Offset:" + Offset.toString());

        OnlySelectCurrent(Important_element);

        var symbolName = libUtil.generateNameUntilUnique("一键万能头_");
        doc.convertToSymbol('graphic', symbolName, 'center');

        Important_element = doc.selection[0];

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();

        // 给所有图层加帧
        timeline.insertFrames(toInsertFrameCount, true);

        // 关键帧
        var Keyframes = new Range(0, toInsertFrameCount, motionFramesCount);

        for (var i = 0; i < Keyframes.length; i++) {
            if (i === 0) continue;

            var frameIndex = Keyframes.next();
            timeline.convertToKeyframes(frameIndex);

            var frame_element = timeline.layers[0].frames[frameIndex].elements[0];
            // 交换元素
            var name = SELECTION_NAMES[i];
            OnlySelectCurrent(frame_element);
            doc.swapElement(name);
        }

        doc.exitEditMode();

        // 除了第一帧的元素，都删除
        SelectAll(TO_DELETE_SELECTION);
        doc.deleteSelection();

        OnlySelectCurrent(Important_element);

        // 移动到中心位置
        doc.moveSelectionBy(Offset.toObj());

    }

    Main();
})();