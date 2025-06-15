/**
 * @file: 01.获取所有元件.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/9 22:47
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require(["checkUtil", "loglevel", "ElementChecker"], function (checkUtil, log, ec) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { IsSymbol } = ec;

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
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var allElements = library.items; // 所有元件

        var symbolElements = []; // 符号元件
        for (var i = 0; i < allElements.length; i++) {
            var element1 = allElements[i];
            // log.info(element1.name,element1.elementType,element1.instanceType,element1.symbolType);
            if (IsSymbol(element1)) {
                symbolElements.push(element1);
                // log.info("symbol: " + element1.name);
            }
        }

        // log.info('symbolElements: ', symbolElements.length);

        var symbolNames = symbolElements.map(function (element) {
            return element.name;
        });

        log.info("symbolNames: ", symbolNames);
    }

    Main();
});
