/**
 * @file: #07.独白黑幕.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/1 21:13
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行

if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

require([
    "checkUtil",
    "loglevel",
    "Context",
    "KeyFrameOperation",
    "DrawCircle",
    "SAT",
    "ElementSelect",
    "SymbolNameGenerator",
    "DrawRectangle"
], function (checkUtil, log, Context, kfo, dc, SAT, es, sng, dr) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { convertToKeyframesSafety } = kfo;
    const { drawCircleWithoutLine } = dc;
    const { drawRectangleWithoutLine } = dr;

    const { Vector, Rectangle, Size, FrameRange } = SAT;
    const {
        getOrigin,
        getSymbolCenter,
        getStageCenter,
        wrapSize,
        wrapRectByCenter,
        wrapPosition
    } = SAT.GLOBALS;

    const { SelectAll, SelectNone } = es;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    // region doc
    // var doc = fl.getDocumentDOM(); //文档
    // if (!CheckDom(doc)) return;
    //
    // var selection = doc.selection; //选择
    // var library = doc.library; //库文件
    // var timeline = doc.getTimeline(); //时间轴
    //
    // var layers = timeline.layers; //图层
    // var curLayerIndex = timeline.currentLayer; //当前图层索引
    // var curLayer = layers[curLayerIndex]; //当前图层
    //
    // var curFrameIndex = timeline.currentFrame; //当前帧索引
    // var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    const context = new Context();
    context.update();
    const {
        doc,
        selection,
        library,
        timeline,
        layers,
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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var firstElement = selection[0];

        var elementPos = getSymbolCenter(firstElement);
        log.info("elementPos", elementPos);

        //
        // // 1. 新建图层, 并插入关键帧
        // timeline.addNewLayer("独白黑幕", "normal", true);
        //
        // log.info("firstSlFrameIndex", firstSlFrameIndex);
        //
        // convertToKeyframesSafety(timeline, firstSlFrameIndex);
        //
        // // 2. 转为元件
        // // 技巧：在左上角 画 一个 20*20的圆形，然后可以将其转为元件，中心在舞台的左上角，相当于确定舞台位置。   相当于把一个空屏转为元件。
        // // 编辑模式中,删除辅助的圆形
        // drawCircleWithoutLine(getOrigin(), 20);
        //
        // var symbolName = generateNameUntilUnique("独白黑幕_");
        // doc.convertToSymbol("graphic", symbolName, "center");
        //
        //
        // doc.enterEditMode("inPlace");
        //
        // SelectAll();
        //
        // doc.deleteSelection();
        //
        // doc.exitEditMode();
        //
        // // 3. 编辑模式
        // doc.enterEditMode("inPlace");

        // SelectNone();
        // // 画黑色的矩形
        // var blackRect = getBlackRect();
        // log.info("blackRect", blackRect);
        // drawRectangleWithoutLine(blackRect, "#000000");

        // SelectNone();
        // // 中间的部分，删除一个椭圆，代表人物的轮廓。
        var peopleBounds = getPeopleBounds(firstElement);
        log.info("peopleBounds", peopleBounds);
        drawCircleWithoutLine(peopleBounds, "#CCCCCC");

        // 移动到人物的位置

        // 色彩效果-Alpha  = 0.7

        // 4. 转为位图

        // 5. 删除所有辅助线
    }

    Main();
});
