/**
 * @file: #06.灵魂出窍.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 20:42
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
require(["checkUtil", "SAT", "SymbolNameGenerator"], function (checkUtil, sat, sng) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;
    const { Vector } = sat.GLOBALS;
    // const { wrapRect } = sat.GLOBALS;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // 渐变遮罩层
    var MASK_LAYER_INDEX = 0;
    // 宽高=位置+100
    var MASK_WIDTH = 100;
    var MASK_HEIGHT = 100;
    // offset=Point(-width,height/5)

    var SYMBOL_LAYER_INDEX = 1;

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // 1.创建新的图层---- 灵魂出窍，
        // 需要优化，如果有这个图层的时就不再创建，直接在那个图层上进行k帧

        // 2.复制选中的元件到新的图层

        // 3.包装为一个新的元件

        // 4. 编辑模式
        // 此时元件1  占用 第一个图层
        // 4.1  添加渐变遮罩层

        // 4.2 添加一个shape 长方形，铺满 元件的轮廓
        // 宽高=位置+100

        // 设置 混合模式为 alpha
        // an.getDocumentDOM().setBlendMode('alpha')

        // 补帧 5s----150帧,不清楚有没有必要

        // 5. 移动到左上角
    }

    Main();
});
