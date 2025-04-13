/**
 * @file: 00.查看当前帧的滤镜.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 19:31
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
require(['checkUtil', 'loglevel'], function (checkUtil, log) {
    const { CheckDom, CheckSelection } = checkUtil;

    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

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
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        // layer.getFiltersAtFrame(frameIndex)
        var filters = curLayer.getFiltersAtFrame(curFrameIndex);
        if (filters == null || filters.length === 0) {
            log.info('当前帧上没有滤镜');
            return;
        }
        log.info('当前帧上滤镜：', filters);
    }

    Main();
});
