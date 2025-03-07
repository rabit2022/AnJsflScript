/**
 * @file: ${FILE_NAME}
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: ${DATE} ${TIME}
 * @project: ${PROJECT_NAME}
 * @description: ${END}
 */

require(['checkUtil', 'loglevel'], function (checkUtil, log) {
    const { CheckDom, CheckSelection} = checkUtil;

    const doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    const selection = doc.selection; //选择
    const library = doc.library; //库文件
    const timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;


    }

    Main();
});
