/**
 * @file: 03.批量图层.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 13:29
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
require(['checkUtil', 'LayerChecker'], function (checkUtil, lc) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    const { IsLayerExists } = lc;

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

        var LAYER_NAME_ARRAY = [
            // "摄像机",
            '特效1',
            '特效2',
            '角色1',
            '角色2',
            '角色3',
            '角色4',
            '角色5',
            '角色6',
            '背景',
            '配音',
            '音效1',
            '音效2'
        ];

        for (var i = 0; i < LAYER_NAME_ARRAY.length; i++) {
            // var layer = layers[i];
            var toAddLayerName = LAYER_NAME_ARRAY[i];
            if (!IsLayerExists(layers, toAddLayerName)) {
                timeline.addNewLayer(toAddLayerName, 'normal', false);
            }
        }
    }

    Main();
});
