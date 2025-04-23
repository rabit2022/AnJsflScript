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
    'ElementOperation',
    'ElementAnim',
    'SymbolNameGenerator',
    'selectionUtil',
    'SAT',
    'graphicsUtil',
    'JSFLConstants',
    'curveUtil',
    'KeyFrameOperation'
], function (
    checkUtil,
    log,
    ed,
    ea,
    sng,
    sel,
    SAT,
    graphicsUtil,
    JSFLConstants,
    curve,
    kfo
) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { SelectAll } = sel;
    const { wrapRectByCenter } = SAT.GLOBALS;
    const { Vector, Rectangle } = SAT;
    const { drawRectangleWithoutLine } = graphicsUtil;
    const { FRAME_1, FRAME_15 } = JSFLConstants.Numerics.frame.frameList;
    const { setClassicEaseCurve } = curve;
    const { playOnce } = ea;
    const { breakApartToDrawingObject } = ed;
    const { convertToKeyframesSafety } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    // region doc
    const doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

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

    // endregion doc

    function KFrames(worldElement) {
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
            breakApartToDrawingObject(curFrame.elements[0]);
            doc.setFillColor('#999999');

            var symbolName = generateNameUseLast('石化_');
            doc.convertToSymbol('graphic', symbolName, 'center');
        }

        function maskLayer(element) {
            // 遮罩层
            timeline.addNewLayer('遮罩层', 'mask', true);
            curLayer.layerType = 'masked';

            // shape
            // addScope=height*20%
            // width+=addScope
            // height+=addScope
            // pos = 0,height
            var rect = new Rectangle(element);

            // log.info('rect:', rect);

            var center = rect.getCenterVector();

            const elementSize = rect.getSize();
            var newSize = elementSize;

            const addScope = elementSize.height * 0.2;
            const addVector = new Vector(addScope, addScope);

            newSize = newSize.toVector().add(addVector).toSize();

            var newRect = wrapRectByCenter(center, newSize);
            // log.info('newRect:', newRect);

            const shapePos = new Vector(0, newSize.height);
            // log.info('shapePos:', shapePos);

            newRect = newRect.addOffset(shapePos);

            drawRectangleWithoutLine(newRect);

            return {
                rect: newRect,
                move: shapePos
            };
        }

        function KFrameInner(shapeRect, rectMove) {
            // 添加15帧
            timeline.insertFrames(FRAME_15, true);

            // 关键帧
            var KEY_FRAMES = [FRAME_1, FRAME_15];
            convertToKeyframesSafety(timeline, KEY_FRAMES, 0);

            // 移动第15帧的shape
            doc.setSelectionRect(shapeRect.toObj(), true, true);
            doc.moveSelectionBy(rectMove.reverse());

            // 选中所有帧
            // 获取allKeyFrames first,last
            var firstF = KEY_FRAMES[0];
            var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
            // 选中所有帧
            timeline.setSelectedFrames(firstF, lastF, true);

            // 传统补间动画
            setClassicEaseCurve(timeline);

            // // 重置选中帧
        }

        // 复制图层
        timeline.copyLayers(0);
        timeline.pasteLayers(0);

        // 更新当前选中的图层
        refreshTimeline();

        // 石化层
        stoneLayer();

        // 遮罩层
        const { rect, move } = maskLayer(worldElement);

        // K Frames
        KFrameInner(rect, move);
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        // // 复制元件，递归到绘制对象，并设置颜色
        // an.getDocumentDOM().setFillColor('#999999');

        // 图层2 ： 遮罩层
        // 图层1 复制 ： 被遮罩层
        // 图层1 ： 原始层
        var symbolName = generateNameUntilUnique('一键石化_');
        doc.convertToSymbol('graphic', symbolName, 'center');

        refreshTimeline();

        // 播放一次，刷新动画
        var newSymbol = selection[0];
        playOnce(newSymbol);

        doc.enterEditMode('inPlace');

        KFrames(newSymbol);
        doc.exitEditMode();

        alert('石化完成！\n点击播放查看效果！（可双击进入元件修改效果）');
    }

    Main();
});
