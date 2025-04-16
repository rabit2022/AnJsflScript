/**
 * @file: #10.一键石化.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/8 23:45
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes('AppData/Local/Temp')) {
    var msg = '【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require([
    'checkUtil',
    'loglevel',
    'elementUtil',
    'libUtil',
    'selectionUtil',
    'SAT'
], function (checkUtil, log, elementUtil, libUtil, sel, SAT) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { SelectAll } = sel;
    const { wrapSize } = SAT.GLOBALS;
    const { Vector } = SAT;

    // region doc
    const doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    const selection = doc.selection; //选择
    const library = doc.library; //库文件
    const timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    function KFrames() {
        // region inner doc
        var selection = doc.selection; //选择
        var library = doc.library; //库文件
        var timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        var curFrameIndex = timeline.currentFrame; //当前帧索引
        var curFrame = curLayer.frames[curFrameIndex]; //当前帧

        /**
         * 刷新内部变量
         * @note: 1,如果在函数内  进行了更改数据的操作(enterEditMode后，timeline变化)，需要调用此函数刷新内部变量
         *        2,如果需要同时使用 全局变量 和 局部变量，需要 重新 定义
         */
        function refreshTimeline() {
            // 刷新内部变量
            selection = doc.selection; //选择
            library = doc.library; //库文件
            timeline = doc.getTimeline(); //时间轴

            layers = timeline.layers; //图层
            curLayerIndex = timeline.currentLayer; //当前图层索引
            curLayer = layers[curLayerIndex]; //当前图层

            curFrameIndex = timeline.currentFrame; //当前帧索引
            curFrame = curLayer.frames[curFrameIndex]; //当前帧
        }

        // endregion inner doc

        function stoneLayer() {
            curLayer.name = '石化层';
            // curLayer.layerType = 'masked';

            SelectAll(curFrame.elements);

            // 石化层
            elementUtil.breakApartToDrawingObject(curFrame.elements[0]);
            doc.setFillColor('#999999');

            var symbolName = libUtil.generateNameUseLast('石化_');
            doc.convertToSymbol('graphic', symbolName, 'center');
        }

        function maskLayer(elementSize) {
            // 遮罩层
            timeline.addNewLayer('遮罩层', 'mask', true);
            curLayer.layerType = 'masked';

            // shape
            // addScope=height*20%
            // width+=addScope
            // height+=addScope
            // pos = 0,height
            log.info('elementSize:', elementSize);
            const shape = elementSize.toVector().clone();
            const addScope = elementSize.height * 0.2;
            shape.add(new Vector(addScope, addScope));

            log.info('shape:', shape);

            const shapePos = new Vector(0, shape.y);
            log.info('shapePos:', shapePos);

            // doc.addNewRectangle(selectionRect,0);
        }

        const elementSize = wrapSize(selection[0]);

        // 复制图层
        timeline.copyLayers(0);
        timeline.pasteLayers(0);

        // 更新当前选中的图层
        refreshTimeline();

        // 石化层
        stoneLayer();

        // 遮罩层
        maskLayer(elementSize);
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        // // 复制元件，递归到绘制对象，并设置颜色
        // an.getDocumentDOM().setFillColor('#999999');

        // 图层2 ： 遮罩层
        // 图层1 复制 ： 被遮罩层
        // 图层1 ： 原始层

        var symbolName = libUtil.generateNameUntilUnique('一键石化_');
        doc.convertToSymbol('graphic', symbolName, 'center');

        doc.enterEditMode('inPlace');

        KFrames();
        // doc.exitEditMode();
    }

    Main();
});
