/**
 * @file: 13.拆分到文件_objects.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/13 12:09
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
    "COMPATIBILITY",
    "ElementSelect",
    "ElementQuery",
    "ElementChecker",
    "SAT",
    "os",
    "store-js",
    "JSFLInterface",
    "progress"
], function (
    checkUtil,
    log,
    COMPATIBILITY,
    es,
    eq,
    ec,
    sat,
    os,
    store,
    JSFLInterface,
    ProgressBar
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const {
        __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__
    } = COMPATIBILITY;

    const { OnlySelectCurrent } = es;
    const { getFrameCount, getName } = eq;
    const { IsSymbol } = ec;
    const getBaseName = os.path.$basenameWithoutExt;

    const { Size } = sat;
    const getSymbolSize = sat.ENTITY.SYMBOL.getSize;

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

    function checkXMLPanel() {
        // var panel = getXMLPanel();
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__(
            "./12.拆分到文件_objects.xml"
        );
        if (panel === null) return null;

        var layout_mode = panel.layout_mode;
        if (!layout_mode) return null;

        return {
            layout_mode: layout_mode
        };
    }

    const NEW_DOC_SIZE = new Size(1920, 1080);

    const ns_store = store.namespace("13-拆分到文件");

    function getNewDocName(element) {
        var itemName = getName(element);
        var itemBaseName = getBaseName(itemName);

        // ns_store.set("BASE_NAME", docBaseName);
        const BASE_NAME = ns_store.get("BASE_NAME");
        const serialized = decodeUnicode(BASE_NAME).replace(/"/g, "");
        // log.info("serialized:", BASE_NAME,serialized);

        var fileName = serialized + "_" + itemBaseName + ".fla";
        return fileName;
    }

    /**
     * 获取缩放因子
     * @param layout_mode
     * @param {Element}element
     * @returns {number}
     */
    function getScaleFactor(layout_mode, element) {
        const elementSize = getSymbolSize(element);
        var factor = 1;
        switch (layout_mode) {
            case "fill":
                factor = 1;
                break;
            case "small":
                factor = 0.8;
                break;
            case "fit":
                factor = 0.9;
                break;
            default:
                throw new Error("Unknown layout_mode: " + layout_mode);
        }

        // scale= Min(NEW_DOC_SIZE/elementSize)
        const scale = elementSize
            .toVector()
            .invert()
            .scale(NEW_DOC_SIZE.width, NEW_DOC_SIZE.height)
            .scale(factor)
            .toSize().min_size;
        return scale;
    }

    function createNewDoc(element, layout_mode) {
        const frameCount = getFrameCount(element);
        const newDocName = getNewDocName(element);
        const scaleFactor = getScaleFactor(layout_mode, element);

        // log.info("frameCount:", frameCount);

        var newDoc = fl.createDocument();
        var timeline1 = newDoc.getTimeline(); //时间轴

        // log.info("newDoc:", newDoc,newDoc.width,newDoc.height);
        newDoc.width = NEW_DOC_SIZE.width;
        newDoc.height = NEW_DOC_SIZE.height;

        newDoc.clipPaste(true);

        newDoc.scaleSelection(scaleFactor, scaleFactor);

        // 放到屏幕中心   07.一键回中.jsfl
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./native/07.一键回中.jsfl");

        timeline1.insertFrames(frameCount - 1, true);

        // 保存文档
        fl.saveDocument(newDoc, newDocName);
        newDoc.close(false);

        return newDocName;
    }

    function Main() {
        const config = checkXMLPanel();
        if (!config) return;

        const { layout_mode } = config;
        // log.info("layout_mode:", layout_mode);

        // 创建进度条实例
        var bar = new ProgressBar(":bar :current/:total", { total: selection.length });

        selection.forEach(function (element, index) {
            OnlySelectCurrent(element);

            // @note: 目前选中机制有问题，这里暂时不解决
            // doc.selectNone()后，无法选中shape
            if (!IsSymbol(element)) return;

            doc.clipCopy();

            var newDocName = createNewDoc(element, layout_mode);

            // fl.trace('（' + (i + 1) + '/' + sel.length + '）正在拆分：' + fileName);
            // 进度条

            bar.tick();
            fl.trace("正在拆分：" + newDocName);
        });
    }

    Main();
});
