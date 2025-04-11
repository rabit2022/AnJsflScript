/**
 * @file: 11.完全复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:07
 * @project: AnJsflScript
 * @description:
 */

if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require(['checkUtil', 'elementUtil'], function (checkUtil, ele) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    const { IsSymbol, CopySymbol } = ele;

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
        doc.enterEditMode('inPlace');
        doc.selectAll();
        var selection = doc.selection;
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            // symbol: 打散
            if (IsSymbol(item)) {
                CopySymbol(item, 'skip');
            } else {
                continue;
            }

            PackSymbol();
        }
        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Not Zero')) return;

        CopySymbol(selection[0], 'ask');

        PackSymbol();
    }

    Main();
});
