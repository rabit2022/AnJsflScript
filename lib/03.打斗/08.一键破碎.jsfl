/**
 * @file: 08.一键破碎.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 12:31
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
    'SAT',
    'random',
    'satUtil',
    'ElementOperation',
    'ElementAnim','ElementSelect'
], function (checkUtil, sat, random, satUtil,  ed, ea,es) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { Vector, Rectangle } = sat;
    const { wrapPosition, wrapTransform, wrapRectByCenter } = sat.GLOBALS;
    const { RectUtil: rectUtil } = satUtil;

    const { splinterSymbol } = ed;
    const { playOnce } = ea;
    const { SelectAll } = es;

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

    function getExplosionRect(element) {
        // 爆炸矩形  position
        // block  center   height      width
        // 1*5  1-1.2     0.9height     width=(0.5-1)*height
        // 2*5  1.2-1.5    0.8-1.1height   width=(1.2-2)*height
        // 3*5  0.8-1      0.9height    width=(1.2-1.4)*height
        // 4*5  0.9-1      1-1.2height    width=2*height
        // 5*5   1         1.2-1.5height       width=2*height
        var elementHeight = element.height;

        var rectHeight = elementHeight * random.uniform(0.9, 1.2);
        var rectWidth = random.uniform(1.2, 2) * rectHeight;

        // var initialPos = wrapPosition(element);
        var offsetY = elementHeight * random.uniform(0.8, 1);
        // var rectCenter = initialPos.add(new Vector(0, offsetY));
        var rectCenter = new Vector(0, offsetY);

        // setPosition 函数直接设置元素的位置， 参照物为元素的注册点
        var rect = wrapRectByCenter(rectCenter.x, rectCenter.y, rectWidth, rectHeight);

        fl.trace('rect:' + rect);
        return rect;
    }

    function KFrames(element) {
        var explosionRect = getExplosionRect(element);

        doc.enterEditMode('inPlace');

        var timeline1 = doc.getTimeline(); //时间轴
        // 增加10帧
        timeline1.insertFrames(10 - 1, true);

        // 选中最后一帧
        timeline1.currentFrame = timeline1.frameCount - 1;
        timeline1.insertKeyframe();

        // 补间动画
        doc.selectAll();
        timeline1.createMotionTween();
        timeline1.setFrameProperty('motionTweenRotate', 'clockwise');
        timeline1.setFrameProperty('motionTweenRotateTimes', '1');
        // timeline1.setSelectedFrames([]);

        // 更改位置
        timeline1.currentFrame = timeline1.frameCount - 1;
        SelectAll();
        for (var i = 0; i < doc.selection.length; i++) {
            var element = doc.selection[i];

            // var randomPos = rectUtil.generateRandomPoint(explosionRectSize, rectCenter);
            var randomPos = rectUtil.generateRandomPointInRect(explosionRect);

            // scale:0.5-1.5   ======0-0.6
            // skew:-180-180   ======-36 ~ 36
            // 随机缩放
            var scaleX = random.uniform(0.5, 1.5);
            var scaleY = scaleX + random.uniform(0, 0.6);
            // 随机倾斜
            var skewX = random.uniform(-180, 180);
            var skewY = skewX + random.uniform(-36, 36);

            var transform = wrapTransform(element);
            transform
                .setPosition(randomPos)
                .setScale(new Vector(scaleX, scaleY))
                .setSkew(new Vector(skewX, skewY));
        }

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Only one')) return;

        // 碎片
        if (!splinterSymbol(doc.selection[0], '一键爆炸_')) return;

        // 爆炸效果
        KFrames(doc.selection[0]);

        // 播放一次
        playOnce(doc.selection);
    }

    Main();
});
