/**
 * @file: 03.自动说话.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 0:31
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
require([
    'checkUtil',
    'loglevel',
    'LayerChecker',
    'KeyFrameQuery',
    'KeyFrameOperation',
    'FramesSelect'
], function (checkUtil, log, lc, kfq, kfo, fms) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { getKeyFrames } = kfq;
    const { convertToKeyframesSafety } = kfo;
    const { SelectStartFms } = fms;

    const { hasSound } = lc;

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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // 定义 LayerInfo 类
    /**
     * 图层信息类
     * @param {Layer} layer 图层对象
     * @param {number} index 图层索引
     */
    function LayerInfo(layer, index) {
        this.layer = layer; // 图层对象
        this.index = index; // 图层索引
    }

    // 实现 identifySoundLayers 函数
    function identifySoundLayers(selectedLayers, layers) {
        // 检查图层数量是否为两个
        if (selectedLayers.length !== 2) {
            alert('选中的图层数量必须为两个');
            return null; // 返回 null 表示操作失败
        }

        // 检查图层索引是否相同
        if (selectedLayers[0] === selectedLayers[1]) {
            alert('图层索引不能相同');
            return null; // 返回 null 表示操作失败
        }

        // 检查图层索引是否超出范围
        if (
            selectedLayers.some(function (index) {
                return index < 0 || index >= layers.length;
            })
        ) {
            alert('图层索引超出范围');
            return null; // 返回 null 表示操作失败
        }

        var soundLayer = null; // 用于存储有声音的图层信息
        var noSoundLayer = null; // 用于存储没有声音的图层信息

        // 检查第一个图层
        var layer0 = layers[selectedLayers[0]];
        var hasSound0 = hasSound(layer0);
        if (hasSound0) {
            soundLayer = new LayerInfo(layer0, selectedLayers[0]); // 第一个图层有声音
        } else {
            noSoundLayer = new LayerInfo(layer0, selectedLayers[0]); // 第一个图层没有声音
        }

        // 检查第二个图层
        var layer1 = layers[selectedLayers[1]];
        var hasSound1 = hasSound(layer1);
        if (hasSound1) {
            soundLayer = new LayerInfo(layer1, selectedLayers[1]); // 第二个图层有声音
        } else {
            noSoundLayer = new LayerInfo(layer1, selectedLayers[1]); // 第二个图层没有声音
        }

        // 检查是否有声音的图层和没有声音的图层
        if (soundLayer === null) {
            alert('两个图层都没有声音');
            return null; // 返回 null 表示操作失败
        }
        if (noSoundLayer === null) {
            alert('两个图层都有声音');
            return null; // 返回 null 表示操作失败
        }

        // 将有声音的图层和没有声音的图层组成一个字典返回
        return {
            soundLayer: soundLayer,
            noSoundLayer: noSoundLayer
        };
    }

    function Main() {
        var selectedLayers = timeline.getSelectedLayers(); // 选中的图层
        // 检查选择的元件
        if (!CheckSelection(selectedLayers, 'selectLayer', 'Only two')) return;

        log.info('selectedLayers:', selectedLayers);
        // 1,区分嘴的图层 ,声音的图层]
        var result = identifySoundLayers(selectedLayers, layers);
        if (result === null) return;

        log.info('result:', result);

        // 2,获取声音图层的关键帧
        var soundLayer = result.soundLayer.layer;
        var soundLayerKeyFrames = getKeyFrames(soundLayer);
        log.info('soundLayerKeyFrames:', soundLayerKeyFrames);

        // 3,复制声音图层的关键帧到嘴的图层
        var noSoundLayerIndex = result.noSoundLayer.index;
        // timeline.currentLayer = noSoundLayerIndex;
        convertToKeyframesSafety(timeline, soundLayerKeyFrames, noSoundLayerIndex);

        // 4,结尾
        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
