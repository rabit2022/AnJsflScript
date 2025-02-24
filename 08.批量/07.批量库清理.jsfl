/**
 * @file: 07.批量库清理.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:10
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil'], function (checkUtil) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

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
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;

        var isClean = confirm(
            '该操作会清理库中所有未使用的文件，是否继续？\n' +
                '穹的兔兔  提醒您：请谨慎操作，避免误删重要文件！尽量有备份文件。'
        );
        if (!isClean) {
            return;
        }

        var unUsedItems = library.unusedItems;

        for (var i = 0; i < unUsedItems.length; i++) {
            var item = unUsedItems[i];
            // fl.trace(item.name);
            library.deleteItem(item.name);
        }
    }

    Main();
});
