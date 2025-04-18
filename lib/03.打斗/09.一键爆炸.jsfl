﻿/**
 * @file: 09.一键爆炸.jsfl
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
    'selectionUtil',
    'elementUtil',
    'loglevel'
], function (checkUtil, sat, random, satUtil, sel, ele, log) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

    var Vector = sat.Vector,
        wrapTransform = sat.GLOBALS.wrapTransform,
        wrapRectByCenter = sat.GLOBALS.wrapRectByCenter,
        wrapSize = sat.GLOBALS.wrapSize,
        getOrigin = sat.GLOBALS.getOrigin;
    var pointUtil = satUtil.PointUtil,
        rectUtil = satUtil.RectUtil;

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
        var biggerSize = size.max;
        var smallerSize = size.min;
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

        doc.enterEditMode('inPlace');

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
        timeline1.setFrameProperty('motionTweenRotate', 'clockwise');
        timeline1.setFrameProperty('motionTweenRotateTimes', '2');
        // timeline1.setSelectedFrames([]);

        // 更改位置
        timeline1.currentFrame = timeline1.frameCount - 1;
        sel.SelectAll();
        for (var i = 0; i < doc.selection.length; i++) {
            var element = doc.selection[i];

            // 移动到随机位置
            var randomPos = rectUtil.generateRandomPointInRect(explosionRect);

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
        if (!checkSelection(selection, 'selectElement', 'Only one')) return;

        // 碎片
        if (!ele.splinterSymbol(doc.selection[0], '一键爆炸_')) return;

        log.info('开始爆炸');

        // 爆炸效果
        KFrames(doc.selection[0]);

        // 播放一次
        ele.playOnce(doc.selection);
    }

    Main();
});
