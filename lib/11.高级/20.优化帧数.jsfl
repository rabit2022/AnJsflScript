/**
 * @file: 20.优化帧数.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/28 22:16
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

/**
 * ## 优化帧数：减少文件体积，提高渲染效率
 *
 * 在处理动画文件时，我们常常会遇到这样的问题：
 *
 * - 某些动画片段（如人物跑步）被作者使用了过多的帧（比如几百帧）来展示。
 * - 这些动作其实可以用更少的帧（例如20帧）来完成。
 * - 这种过度使用帧数的情况不仅会导致文件体积过大，还会使处理素材变得复杂，降低渲染效率。
 *
 * 为了解决这个问题，我们需要对动画帧数进行优化。具体操作如下：
 *
 * 1. **逐个检查元件**：进入每一个元件，检查其内部的帧数。
 * 2. **筛选关键帧**：找出帧数大于30的关键帧。
 * 3. **同步帧数**：检查这些关键帧上的元件内部的帧数，并 同步到外面的帧
 *
 * 通过这种方式，我们可以减少不必要的帧数，从而 提高素材的制作效率。
 */
require([
    "checkUtil",
    "loglevel",
    "ElementChecker",
    "ElementSelect",
    "ElementQuery"
], function(checkUtil, log, ec, es, eq) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { IsSymbol, IsGroup, IsGraphic } = ec;
    const { OnlySelectCurrent, SelectAll, SelectNone } = es;
    const { getName, getFrameCount } = eq;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function cleanUp(element) {
        // if (!IsGroup(element) && IsSymbol(element)) {

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        layers.forEach(function(layer) {
            var frames = layer.frames;
            for (var frameIndex = 0; frameIndex < frames.length;) {
                var frame = frames[frameIndex];
                var duration = frame.duration;
                if (duration >= 30) {
                    // 优化帧数
                    fl.trace("优化帧数: ");
                    if (frame.elements.length > 1) return; // 跳过多元素的帧

                    var symbol = frame.elements[0]; // 取第一个元素作为 symbol
                    var frameCount = getFrameCount(symbol);
                    // log.info("symbol: " + getName(symbol) + " frameCount: " + frameCount);

                    if (duration < frameCount) return;

                    // 优化帧数:当前帧 帧数 仅依赖于 symbol 的帧数
                    // timeline.removeFrames(curFrameIndex, END_FRAME);
                    var remove0 = frameIndex + frameCount;
                    var remove1 = frameIndex + duration;
                    log.info("remove: " + remove0 + " - " + remove1);
                    timeline.removeFrames(remove0, remove1);

                    return;
                }

                // 继续深入
                var elements = frame.elements;
                var symbolElements = elements.map(function(element) {
                    if (!IsGroup(element) && IsSymbol(element)) {
                        return element;
                    }
                });
                symbolElements.forEach(function(symbolElement) {
                    if (!symbolElement) return; // undefined

                    // ai 文件夹下的文件不处理,会报错，似乎无法选中
                    if (getName(symbolElement).includes("ai")) return; // 跳过ai

                    OnlySelectCurrent(symbolElement);
                    cleanUp(symbolElement);
                });

                // 更新索引
                var duration = frame.duration;
                frameIndex += duration;
            }
        });

        doc.exitEditMode();
        // }
    }

    function Main() {
        // var element = selection[0]; //选择的元件
        selection.forEach(function(element) {

            SelectNone();
            OnlySelectCurrent(element);
            if (!IsGroup(element) && IsSymbol(element)) {
                cleanUp(element);
            }

        });

    }

    Main();
});
