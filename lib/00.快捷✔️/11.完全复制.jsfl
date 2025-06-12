/**
 * @file: 11.完全复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:07
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require(["checkUtil", "ElementChecker", "ElementOperation"], function (
    { CheckDom: checkDom, CheckSelection: checkSelection },
    { IsSymbol },
    { CopySymbol }
) {
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

    function PackSymbol() {
        // 元件编辑模式
        doc.enterEditMode("inPlace");
        doc.selectAll();
        var selection = doc.selection;
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            // symbol: 打散
            if (IsSymbol(item)) {
                CopySymbol(item, "skip");
            } else {
                continue;
            }

            PackSymbol();
        }
        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Not Zero")) return;

        CopySymbol(selection[0], "ask");

        PackSymbol();
    }

    Main();
});
