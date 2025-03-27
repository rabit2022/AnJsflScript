/**
 * @file: 12.批量错开层.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 14:30
 * @project: AnJsflScript
 * @description:
 */

require([
    'checkUtil',
    'loglevel',
    'xmlPanelUtil',
    'linqUtil',
    'JSFLConstants',
    'layerUtil'
], function (checkUtil, log, xmlPanelUtil, linqUtil, JSFLConstants, layerUtil) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { range, convertToProgrammeIndex } = linqUtil;
    const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

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

    function checkXMLPanel() {
        var xmlPanel = xmlPanelUtil.getXMLPanel();
        if (xmlPanel === null) return;

        var copyCount = xmlPanelUtil.parseNumber(
            xmlPanel.copyCount,
            '复制数量 必须为整数，例如 5,请重新输入。'
        );
        if (copyCount === null) return;

        var frameInterval = xmlPanelUtil.parseNumber(
            xmlPanel.frameInterval,
            '帧间隔 必须为整数，例如 1,请重新输入。'
        );
        if (frameInterval === null) return;

        // appearanceOrder 顺序
        var appearanceOrder = xmlPanelUtil.parseString(
            xmlPanel.appearanceOrder,
            '顺序 必须为 "从下往上" 或 "从上往下"，请重新输入。'
        );
        if (appearanceOrder === null) return;

        return {
            copyCount: copyCount,
            frameInterval: frameInterval,
            appearanceOrder: appearanceOrder
        };
    }

    // 粘贴到 0 的上方
    function pasteLayer(appearanceOrder) {
        switch (appearanceOrder) {
            case 'bottomToTop': // 从下往上
                log.debug('从下往上');
                timeline.pasteLayers(0);
                break;
            case 'topToBottom': // 从上往下
                log.debug('从上往下');
                var length = timeline.layers.length;
                // 粘贴到最后一个
                timeline.pasteLayers(length);
                log.debug('timeline.layers.length:', length);
                // 更新当前的length
                var length = timeline.layers.length - 1;
                // 最后两个图层  交换顺序
                layerUtil.swapLayers(timeline, length, length - 1);
                break;
            default:
                throw new Error('顺序错误');
        }
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        var config = checkXMLPanel();
        if (config === undefined) return;

        var copyCount = config.copyCount;
        var frameInterval = config.frameInterval;
        var appearanceOrder = config.appearanceOrder;

        // log.debug('config', config);
        // log.debug('copyCount', copyCount);
        // log.debug('frameInterval', frameInterval);
        // log.debug('appearanceOrder', appearanceOrder);

        // 复制当前图层
        timeline.copyLayers();

        // 生成需要添加的空帧的帧数
        var toAddFrameCount = range(0, frameInterval * copyCount, frameInterval).select(
            function (x) {
                return x + frameInterval;
            }
        );
        var toAddFrameCountArray = convertToProgrammeIndex(toAddFrameCount).toArray();

        log.debug('toAddFrameCount', toAddFrameCount.toArray());

        for (var i = 0; i < copyCount; i++) {
            // 粘贴到 0 的上方
            pasteLayer(appearanceOrder);

            // 在前面添加空帧
            timeline.insertKeyframe(FRAME_1);
            timeline.clearFrames(FRAME_1);
            // 扩展帧数
            var numFrames = toAddFrameCountArray[i];
            timeline.insertFrames(numFrames, false, FRAME_1);
        }
    }

    Main();
});
