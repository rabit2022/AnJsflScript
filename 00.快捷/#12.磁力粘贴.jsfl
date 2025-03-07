/**
 * @file: #12.磁力粘贴.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/7 0:36
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'loglevel'], function (checkUtil, log) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

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
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;
    }

    Main();
});
