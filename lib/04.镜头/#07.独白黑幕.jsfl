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
    "SAT"
], function (checkUtil, log, Context, kfo, dc, SAT) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { convertToKeyframesSafety } = kfo;
    const { drawCircleWithoutLine } = dc;

    const { Vector, Rectangle, Size, FrameRange } = SAT;
    const { getOrigin } = SAT.GLOBALS;

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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 1. 新建图层, 并插入关键帧
        timeline.addNewLayer("独白黑幕", "normal", true);

        log.info("firstSlFrameIndex", firstSlFrameIndex);

        convertToKeyframesSafety(timeline, firstSlFrameIndex);

        // 2. 转为元件
        // 技巧：在左上角 画 一个 20*20的圆形，然后可以将其转为元件，中心在舞台的左上角，相当于确定舞台位置。   相当于把一个空屏转为元件。
        // 编辑模式中,删除辅助的圆形
        drawCircleWithoutLine(getOrigin(), 20);

        // 3. 编辑模式

        // 画黑色的矩形

        // 中间的部分，删除一个椭圆，代表人物的轮廓。

        // 移动到人物的位置

        // 色彩效果-Alpha  = 0.7

        // 4. 转为位图
    }

    Main();
});
