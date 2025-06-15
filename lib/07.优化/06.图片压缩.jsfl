/**
 * @file: 06.图片压缩.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 22:34
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "ElementChecker",
    "promptUtil",
    "ElementQuery",
    "ElementSelect"
], function (checkUtil, log, ec, promptUtil, eq, es) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { IsBitmap } = ec;
    const { parseNumber } = promptUtil;
    const { getName } = eq;
    const { OnlySelectCurrent, SelectAll } = es;

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

    // // 获取第一帧
    // var frs = CheckSelectedFrames(timeline);
    // if (frs === null) return;
    // var firstLayer = layers[frs[0].layerIndex];
    // var firstFrame = frs[0].startFrame;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        /**
         * @type {BitmapItem[]}
         */
        var bitmaps = selection.filter(IsBitmap);
        if (bitmaps.length === 0) {
            alert("你选中的所有对象中没有位图。 ");
            return;
        }
        var compressionRate = parseNumber(
            "输入压缩率（1~100）:",
            60,
            "请输入数字(1~100)",
            {
                start: 1,
                end: 100
            }
        );
        if (!compressionRate) return;
        log.info("压缩率：" + compressionRate);
        var COMPRESSION_RATE = compressionRate / 100;
        var ANTI_COMPRESSION_RATE = 1 / COMPRESSION_RATE;

        bitmaps.forEach(function (bitmap) {
            OnlySelectCurrent(bitmap);

            var originalBitmapName = getName(bitmap);
            log.info("压缩位图：" + originalBitmapName);

            // 类似  12.高清位图
            doc.scaleSelection(COMPRESSION_RATE, COMPRESSION_RATE);
            doc.convertSelectionToBitmap();

            var newBitmap = doc.selection[0];
            var newBitmapName = getName(newBitmap);

            // 删除辅助线
            doc.library.deleteItem(originalBitmapName);

            doc.library.selectItem(newBitmapName);
            doc.library.renameItem(originalBitmapName);

            doc.scaleSelection(ANTI_COMPRESSION_RATE, ANTI_COMPRESSION_RATE);
        });

        SelectAll(bitmaps);
    }

    Main();
});
