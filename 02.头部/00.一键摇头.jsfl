/**
 * @file: 00.一键摇头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 19:59
 * @project: AnJsflScript
 * @description:
 */

(function () {
    var descriptions = {
        "file": "00.一键摇头.jsfl",
        "file description": "输出 摇头动作的元件,说话时的头部动作",
        "selection": "仅一个元件",
        "selection description": "选中头部",
        "XMLPanel": false,
        "input parameters": {
            "头部朝向": "右",
            "摇头力度": 3
        },
        "detail": "包装元件",
        "detail description": "k 6帧头",
        "steps": [
            "包装元件",
            "更改元件位置"
        ]
    };

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


    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkDom()) {
            return;
        }

        var direction = promptUtil.parseDirection("输入头部朝向(默认为右，空格为左)：",
            {"右": 1, " ": -1, "左": -1});
        if (direction === null) {
            return;
        }

        var force = promptUtil.parseNumber("输入摇头力度", 3, "摇头力度只能输入数字，请重新输入。");
        if (force === null) {
            return;
        }

        // fl.trace("direction: " + direction + ", force: " + force);

        var symbolName = libUtil.generateNameUntilUnique("一键摇头_");
        doc.convertToSymbol('graphic', symbolName, 'center');

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();
        var _6_frames = 6 - 1;
        // 给所有图层加帧
        timeline.insertFrames(_6_frames, true);

        var _4_frames = 4 - 1;
        timeline.convertToKeyframes(_4_frames);

        var frame4_element = timeline.layers[0].frames[_4_frames].elements[0];
        frame4_element.x += direction * force;
        frame4_element.y += direction * force;

        doc.exitEditMode();
    }

    Main();
})();