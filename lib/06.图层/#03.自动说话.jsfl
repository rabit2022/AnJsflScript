/**
 * @file: 03.自动说话.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 0:31
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'loglevel'], function(checkUtil, log) {
    const { CheckDom, CheckSelection } = checkUtil;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;


        // 1,区分嘴的图层 ,声音的图层

        // 2,获取声音图层的关键帧

        // 3,复制声音图层的关键帧到嘴的图层
    }

    Main();
});
