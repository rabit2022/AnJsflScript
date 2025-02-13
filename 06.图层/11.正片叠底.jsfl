/**
 * @file: 11.正片叠底.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/13 20:38
 * @project: AnJsflScript
 * @description:
 */

require(["checkUtil", "frUtil"], function (checkUtil, frUtil) {
    var checkDom = checkUtil.CheckDom, checkSelection = checkUtil.CheckSelection,
        checkSelectedFrames = checkUtil.CheckSelectedFrames;

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom(doc)) return;

    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴

    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curLayer = layers[curLayerIndex];//当前图层

    var curFrameIndex = timeline.currentFrame;//当前帧索引
    var curFrame = curLayer.frames[curFrameIndex];//当前帧

    // 获取第一帧
    var frs = checkSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    function convertArrayToObject(arr) {
        const result = {};
        for (var i = 0; i < arr.length; i++) {
            const [layerIndex, start, end] = arr[i];
            if (!result[layerIndex]) {
                result[layerIndex] = [];
            }
            result[layerIndex].push(start);
        }
        return result;
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // doc.setBlendMode('multiply');

        // var blendMode = curLayer.getBlendModeAtFrame(frameIndex);
        // print(blendMode);
        // curLayer.setBlendModeAtFrame(curFrameIndex, "multiply");
        
        //============分裂 选中范围 ，按照关键帧范围分裂 ===================
        var splitFrs = [];
        for (var i = 0; i < frs.length; i++) {
            // 某一个图层的 选中的帧范围
            var selectedFr = frs[i];
            // 某一个图层的 关键帧范围 列表
            var keyFrameRanges = frUtil.getKeyFrameRanges(layers, selectedFr);

            // 选中范围 包含的 关键帧范围
            var keyFr = frUtil.getSplitFrs(selectedFr, keyFrameRanges);
            splitFrs = splitFrs.concat(keyFr);
        }
        LogArray(splitFrs);

        var frArr = splitFrs.map(function (fr) {
            return fr.toArray();
        });
        // LogArray(frArr);
        
        
        /**
         * layerIndex: startFrame[]
         * @type {{number: number[]}} 
         */
        var frDict = convertArrayToObject(frArr);
        for (var item in frDict) {
            var key = parseInt(item);
            /**
             * @type {number[]}
             */
            var value = frDict[key];
            // print(key, value);

            // timeline.currentLayer = key;
            var curLayer = layers[key];//当前图层
            value.forEach(function (frameIndex) {
                curLayer.setBlendModeAtFrame(frameIndex, "multiply");
            });
        }
    }

    Main();
});