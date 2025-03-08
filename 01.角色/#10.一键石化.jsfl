/**
 * @file: 10.一键石化.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/8 23:45
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'loglevel'], function (checkUtil, log) {
    const { CheckDom, CheckSelection } = checkUtil;

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

        // 复制元件，递归到绘制对象，并设置颜色
        an.getDocumentDOM().setFillColor('#999999');
    }

    Main();
});
