/**
 * @file: 09.导出到AE.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/10 17:17
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "os", "SAT", "SymbolNameGenerator"], function (
    checkUtil,
    log,
    os,
    sat,
    sng
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const getBaseName = os.path.$basenameWithoutExt;

    const { Size } = sat;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

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
    // const { firstSlLayerIndex, firstSlFrameIndex,firstSlLayer, firstSlFrame } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function getScaleFactor(element) {
        // 383,440 1,1    1984,2279    5.18,5.18
        // 440,383        1982,1727    4.5,4.5
        // 766,440 2,1    1980,1144    2.58,2.6
        // 383,880 1,2    1007,2300    2.63，2.61
        // 可以确定 x,y 缩放 相同，由 max决定，

        // 440    5.2
        // 766    2.6
        var size = Size.from(element);
        return 2500 / size.max_size;
    }

    function Main() {
        // log.info(doc.name)
        const docBaseName = getBaseName(doc.pathURI);
        log.info(docBaseName);

        var folderURL = fl.browseForFolderURL("请选择保存位置");
        if (!folderURL) return;

        doc.clipCopy();

        var new_doc = an.createDocument();
        new_doc.clipPaste(true);

        var scaleFactor = getScaleFactor(new_doc.selection[0]);
        new_doc.scaleSelection(scaleFactor, scaleFactor, "center");

        // 把选中的所有元件   分布到关键帧
        new_doc.distributeToKeyframes();

        var timeline = new_doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var layer0 = layers[0];
        var frames = layer0.frames; //当前图层的帧列表

        frames.forEach(function (frame, index) {
            timeline.setSelectedFrames(index, index + 1);

            var symbolName = docBaseName + "_" + index + "_";
            if (index === 0) {
                symbolName = generateNameUntilUnique(symbolName);
            } else {
                symbolName = generateNameUseLast(symbolName);
            }
            // @note 确保 每一个 元件导出 时，只有一个帧，导出只有一张图片，
            // 否则会导致 导出的图片 非常多
            new_doc.convertToSymbol("graphic", symbolName, "center");

            var selectedSymbol = new_doc.selection[0];

            // 导出png序列
            var pngName = os.path.join(folderURL, symbolName + ".png");
            selectedSymbol.libraryItem.exportToPNGSequence(pngName);
        });

        new_doc.close(false);
    }

    Main();
});
