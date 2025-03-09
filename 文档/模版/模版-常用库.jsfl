require([
    'core-js/stable/array/includes',
    'core-js/stable/string/includes'
], function () {
    /**
     * 刷新内部变量
     * @note: 1,如果在函数内  进行了更改数据的操作(enterEditMode后，timeline变化)，需要调用此函数刷新内部变量
     *        2,如果需要同时使用 全局变量 和 局部变量，需要 重新 定义
     */
    function refreshTimeline() {
        // 刷新内部变量
        selection = doc.selection; //选择
        library = doc.library; //库文件
        timeline = doc.getTimeline(); //时间轴

        layers = timeline.layers; //图层
        curLayerIndex = timeline.currentLayer; //当前图层索引
        curLayer = layers[curLayerIndex]; //当前图层

        curFrameIndex = timeline.currentFrame; //当前帧索引
        curFrame = curLayer.frames[curFrameIndex]; //当前帧
    }

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
    }

    Main();
});
