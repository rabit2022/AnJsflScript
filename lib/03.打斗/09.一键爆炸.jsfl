/**
 * @file: 09.一键爆炸.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 12:31
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require([
    "checkUtil",
    "SAT",
    "random",
    "satUtil",
    "loglevel",
    "ElementOperation",
    "ElementAnim",
    "ElementSelect"
], function (checkUtil, sat, random, satUtil, log, ed, ea, es) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { Vector } = sat;
    const { wrapTransform, wrapRectByCenter, wrapSize, getOrigin } = sat.GLOBALS;
    const { generateRandomPointInRect } = satUtil;

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
        // # 爆炸矩形  position
        // # 倍数x=w/h
        // # 倍数y=0.08*x^2-x+5  +-0.3
        // # m = max(w,h)
        // # rw=m*倍数y
        // # rh=y*(2+-0.8)
        //
        // # 1.5-3 scale
        // # -180,180  rotation
        var size = wrapSize(element);
        var biggerSize = size.max_size;
        var smallerSize = size.min_size;
        var ratioX = biggerSize / smallerSize;
        var ratioY = 0.08 * ratioX * ratioX - ratioX + 5 + random.uniform(-0.3, 0.3);

        var rectHeight = biggerSize * ratioY;
        var rectWidth = rectHeight * (2 + random.uniform(-0.5, 0.5));

        var originPos = getOrigin();
        var rect = wrapRectByCenter(originPos.x, originPos.y, rectWidth, rectHeight);
        return rect;
    }

    function KFrames(element) {
        var explosionRect = getExplosionRect(element);

        doc.enterEditMode("inPlace");

        var timeline1 = doc.getTimeline(); //时间轴
        // 增加15帧
        timeline1.insertFrames(15 - 1, true);
        // //分散到图层操作
        // doc.distributeToLayers();
        // // 删除多余的碎片
        // ele.splinterDeleter();

        // 选中最后一帧
        timeline1.currentFrame = timeline1.frameCount - 1;
        timeline1.insertKeyframe();

        // 补间动画
        doc.selectAll();
        timeline1.createMotionTween();
        timeline1.setFrameProperty("motionTweenRotate", "clockwise");
        timeline1.setFrameProperty("motionTweenRotateTimes", "2");
        // timeline1.setSelectedFrames([]);

        // 更改位置
        timeline1.currentFrame = timeline1.frameCount - 1;
        SelectAll();
        for (var i = 0; i < doc.selection.length; i++) {
            var element = doc.selection[i];

            // 移动到随机位置
            var randomPos = generateRandomPointInRect(explosionRect);

            // 随机缩放
            var scale = random.uniform(1.5, 3);
            // 随机旋转
            var rotation = random.uniform(-180, 180);

            var transform = wrapTransform(element);
            transform
                .setPosition(randomPos)
                .setScale(new Vector(scale, scale))
                .setRotation(rotation);
        }

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 碎片
        if (!splinterSymbol(doc.selection[0], "一键爆炸_")) return;

        log.info("开始爆炸");

        // 爆炸效果
        KFrames(doc.selection[0]);

        // 播放一次
        playOnce(doc.selection);
    }

    Main();
});
