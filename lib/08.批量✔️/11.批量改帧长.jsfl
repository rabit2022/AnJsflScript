/**
 * @file: 11.批量改帧长.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:29
 * @project: AnJsflScript
 * @description:
 */

if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require([
    'checkUtil',
    'selectionUtil',
    'promptUtil',
    'frameRangeUtil',
    'loglevel'
], function (checkUtil, sel, promptUtil, frUtil, log) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    // var frUtil = frameRange.FrameRangeUtil;

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

        var { num, mode } = promptUtil.parseNumberWithMode(30);
        log.info('关键帧持续帧数：' + num + '，模式：' + mode);

        // 选中的帧范围
        var selectedFrs = frUtil.getSelectedFrs(timeline);
        for (var i = 0; i < selectedFrs.length; i++) {
            // 某一个图层的 选中的帧范围
            var selectedFr = selectedFrs[i];
            // 某一个图层的 关键帧范围 列表
            var _layer = layers[selectedFr.layerIndex];
            var keyFrameRanges = frUtil.getKeyFrameRanges(layers, _layer);

            // 选中范围 包含的 关键帧范围
            var keyFr = frUtil.getKfrFromSlLittle(selectedFr, keyFrameRanges);
            if (keyFr === null) continue;
            // fl.trace("选中范围：" + keyFr.toString());

            // 设置选中图层
            timeline.setSelectedLayers(keyFr.layerIndex, true);

            // 删减关键帧，增加关键帧
            switch (mode) {
                case 'increase':
                    timeline.insertFrames(num, false, keyFr.endFrame);
                    break;
                case 'decrease':
                    var startFrame = keyFr.startFrame;
                    var endFrame = keyFr.startFrame + num - 1;
                    timeline.removeFrames(startFrame, endFrame);
                    break;
                case 'unify':
                    if (keyFr.duration === num) {
                        continue;
                    } else if (keyFr.duration > num) {
                        var toRemoveFrames = keyFr.duration - num;
                        var startFrame = keyFr.startFrame + toRemoveFrames;
                        var endFrame = keyFr.endFrame;
                        timeline.removeFrames(startFrame, endFrame);
                    } else if (keyFr.duration < num) {
                        var toAddFrames = num - keyFr.duration;
                        timeline.insertFrames(toAddFrames, false, keyFr.startFrame);
                    }
                    break;
                default:
                    throw new Error('未知模式：' + mode);
            }
        }

        // select None
        sel.SelectNoneTl(timeline);
    }

    Main();
});
