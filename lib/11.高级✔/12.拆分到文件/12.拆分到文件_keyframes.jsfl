/**
 * @file: 13.拆分到文件_keyframes.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/13 14:31
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "SAT",
    "store-js",
    "JSFLInterface",
    "progress"
], function (checkUtil, log, sat, store, JSFLInterface, ProgressBar) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { Size } = sat;
    // const getBaseName = os.path.$basenameWithoutExt;
    const { decodeUnicode } = JSFLInterface;

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

    // 获取第一帧
    var selectedFrames = CheckSelectedFrames(timeline);
    if (!selectedFrames) return;
    const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } =
        selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    const NEW_DOC_SIZE = new Size(1920, 1080);
    const ns_store = store.namespace("13-拆分到文件");

    function getNewDocName() {
        // ns_store.remove("COUNTER");
        var counter = ns_store.get("COUNTER") || 0;
        log.info("COUNTER:", counter);

        const BASE_NAME = ns_store.get("BASE_NAME");
        const serialized = decodeUnicode(BASE_NAME).replace(/"/g, "");

        var f_counter = counter.toString().padStart(2, "0");
        var fileName = serialized + "_未命名_" + f_counter + ".fla";

        counter++;
        ns_store.set("COUNTER", counter);

        return fileName;
    }

    function createNewDoc() {
        const newDocName = getNewDocName();

        var newDoc = fl.createDocument();
        var timeline1 = newDoc.getTimeline(); //时间轴
        newDoc.width = NEW_DOC_SIZE.width;
        newDoc.height = NEW_DOC_SIZE.height;

        timeline1.pasteFrames(0);

        // 保存文档
        fl.saveDocument(newDoc, newDocName);
        newDoc.close(false);

        return newDocName;
    }

    function Main() {
        // 创建进度条实例
        var bar = new ProgressBar(":bar :current/:total", {
            total: selectedFrames.length
        });

        selectedFrames.forEach(function (frameRange) {
            timeline.setSelectedFrames(frameRange.toArray());
            timeline.copyFrames();

            var newDocName = createNewDoc();

            bar.tick();
            fl.trace("正在拆分：" + newDocName);
        });
    }

    Main();
});
