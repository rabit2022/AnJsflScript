/**
 * @file: 07.独白黑幕.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/1 21:13
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "Context",
    "KeyFrameOperation",
    "DrawCircle",
    "SAT",
    "ElementSelect",
    "SymbolNameGenerator",
    "DrawRectangle",
    "ElementChecker",
    "ElementQuery",
    "FilterOperation",
    "LayerQuery",
    "FramesSelect",
    "ElementOperation"
], function (checkUtil, log, Context, kfo, dc, SAT, es, sng, dr, ec, eq, fo, lq, fs, eo) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { convertToKeyframesSafety } = kfo;
    const { drawCircleWithoutLine } = dc;
    const { drawRectangleWithoutLine } = dr;
    const { convertToSymbolWithBlanks } = eo;

    const { Vector, Rectangle, Size, FrameRange } = SAT;
    const {
        getOrigin,
        getSymbolCenter,
        getStageCenter,
        wrapSize,
        wrapRectByCenter,
        wrapPosition
    } = SAT.GLOBALS;

    const { SelectAll, SelectNone, InvertSelection } = es;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { IsShape } = ec;
    const { getName } = eq;
    const { addBlurFilterToFrame } = fo;
    const { getLayersIndexByName } = lq;
    const { SelectStartFms } = fs;

    const context = new Context();
    context.update();

    const {
        doc,
        selection,
        library,
        timeline,
        AllLayers,
        curLayerIndex,
        curLayer,
        curFrameIndex,
        curFrame
    } = context;
    const { firstSlLayerIndex, firstSlFrameIndex } = context;

    // log.info(doc);

    function getBlackRect() {
        // 114.5,364.6 与元件尺寸无关，只与画布尺寸有关。
        // 2689,1569  ---- 1280,720
        // 5249,3009 ---- 2560,1080
        // x:1000----2129,2000----4130,500----1129==== x=2*x+130
        // y:1000----1129,1000----2129,2000,4129   ====   y=2*y+130
        /**
         * 计算 y 值
         * @param {number} y 原始 y 值
         * @returns {number} 新的 y 值
         */
        function calculateY(y) {
            // 根据公式 y = 2 * y + 130 计算新的 y 值
            return 2 * y + 130;
        }

        /**
         * 计算 Vector 值
         * @param {Vector} vector 原始 Vector 值
         * @returns {Vector} 新的 Vector 值
         */
        function calculateVector(vector) {
            // 根据公式 x = 2 * x + 130 计算新的 Vector 值
            return new Vector(calculateY(vector.x), calculateY(vector.y));
        }

        /**
         * 计算 Size 值
         * @param {Size} size 原始 Size 值
         * @returns {Size} 新的 Size 值
         */
        function calculateSize(size) {
            // 根据公式 w = 2 * w + 130 计算新的 Size 值
            return new Size(calculateY(size.width), calculateY(size.height));
        }

        const stageSize = wrapSize(doc);
        const blackSize = calculateSize(stageSize);
        // log.info("stageSize", stageSize);

        const stageCenter = getStageCenter();
        const finalRect = wrapRectByCenter(stageCenter, blackSize);

        return finalRect;
    }

    function getPeopleBounds(element) {
        // 243.1,364.6----114.5,364.6
        // 243.1,364.6----229,364.6 ==== 与元件width无关
        // 486.2,729.2----114.5,729.2 ==== height=height
        // 0.666 ---- 2/3    ==== width=height*2/3
        var elementSize = wrapSize(element);
        var peopleSize = new Size((elementSize.height * 2) / 3, elementSize.height);

        const stageCenter = getStageCenter();

        const peopleBounds = wrapRectByCenter(stageCenter, peopleSize);

        return peopleBounds;
    }

    function subtractArrays(A, B) {
        // 使用 filter 方法过滤掉 A 中存在于 B 的元素
        return A.filter(function (item) {
            return !B.includes(item);
        });
    }

    function KFrames(firstElement) {
        doc.enterEditMode("inPlace");

        SelectNone();
        // 画黑色的矩形
        var blackRect = getBlackRect();
        log.info("blackRect", blackRect);
        blackRect = drawRectangleWithoutLine(blackRect, "#000000");

        // 中间的部分，删除一个椭圆，代表人物的轮廓。
        var peopleBounds = getPeopleBounds(firstElement);
        log.info("peopleBounds", peopleBounds);
        drawCircleWithoutLine(peopleBounds, "#CCCCCC");

        doc.deleteSelection();

        // 移动到人物的位置
        var elementPos = getSymbolCenter(firstElement);
        log.info("elementPos", elementPos);

        const stageCenter = getStageCenter();
        var offset = elementPos.sub(stageCenter);
        log.info("stageCenter", stageCenter);

        // doc.setSelectionRect(blackRect.toObj(), true, true);
        // 选中不是形状的元素。
        SelectAll();
        var allElements = doc.selection;
        var nonShapeElements = allElements.filter(function (element) {
            return IsShape(element) === false;
        });

        // shape selection
        InvertSelection(nonShapeElements);

        log.info("selection", selection, selection.length);

        doc.moveSelectionBy(offset.toObj());

        // 模糊滤镜 60,60,中
        context.update();
        addBlurFilterToFrame(context.curLayer, 0, 60, 60, "medium");

        doc.exitEditMode();

        // 色彩效果-Alpha  = 0.7
        // 注意：必须在 元件 ，使用 才会生效。
        doc.setInstanceAlpha(70);
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 获取第一帧
        var frs = CheckSelectedFrames(timeline);
        if (frs === null) return;

        var firstElement = selection[0];

        // 1. 新建图层, 并插入关键帧
        var layerIndex = getLayersIndexByName(AllLayers, "独白黑幕");
        if (layerIndex.length > 0) {
            // 已存在独白黑幕图层，直接选中
            timeline.currentLayer = layerIndex[0];
        } else {
            timeline.addNewLayer("独白黑幕", "normal", true);
        }

        log.info("firstSlFrameIndex", firstSlFrameIndex);

        convertToKeyframesSafety(timeline, firstSlFrameIndex);

        // 2. 转为元件
        var symbolName = generateNameUntilUnique("独白黑幕_");
        convertToSymbolWithBlanks(symbolName);

        // 3. 编辑模式
        KFrames(firstElement);

        // 4. 转为位图
        doc.convertSelectionToBitmap();

        // 5. 删除所有辅助线
        log.info("Last Name", sng.LastName);
        library.deleteItem(sng.LastName);

        // 6. 选择开始选中的帧
        // 有bug,添加了独白黑幕图层，选择开始帧时，会选中独白黑幕图层，但是影响不大。
        SelectStartFms(timeline, frs);
    }

    Main();
});
