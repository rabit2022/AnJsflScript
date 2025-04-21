/**
 * @file: 13.循环单帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 22:22
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
require(['checkUtil', 'frameRangeUtil', 'ElementAnim', 'ElementChecker'], function (
    checkUtil,
    frUtil,
    ea,
    ec
) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    const { SetLoopMode } = ea;
    const { IsSymbol } = ec;

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

    // 获取第一帧
    var frs = checkSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // 关键帧
    var KEY_FRAMES = [firstFrame];

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;

        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 如果全部都是 "loop", targetLoop = "loop"
        // 否则 统一设置为 "single frame"
        var targetLoop = 'single frame';

        var tempLoop = 0;
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            // 跳过  非元件
            if (!IsSymbol(element)) {
                continue;
            }

            // 计数loop的元素数量
            if (element.loop === 'loop') {
                tempLoop++;
            } else {
                // 一旦发现有一个元素的loop属性不等于"loop"，即可确定targetLoop应为"single frame"
                // targetLoop = "single frame";
                break;
            }
        }

        // 如果所有检查过的元素loop属性都等于"loop"，则设置targetLoop为"loop"
        if (tempLoop > 0 && tempLoop === selection.length) {
            targetLoop = 'loop';
        }

        // 设置所有选中元素的loop属性
        SetLoopMode(selection, targetLoop);

        // // 原始版本
        // var firstElement = selection[0];
        // if (!ele.IsSymbol(firstElement)) {
        //     return;
        // }
        //
        // if (firstElement.loop === "single frame") {
        //     firstElement.loop = "loop";
        // } else {
        //     firstElement.loop = "single frame";
        // }
    }

    Main();
});
