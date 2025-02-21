/**
 * @file: 06.一键聚焦.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/11 14:31
 * @project: AnJsflScript
 * @description:
 */


require(["checkUtil","selection","layerUtil","satUtil","SAT"],
    function(checkUtil,sel,layerUtil,satUtil,sat) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        wrapPosition = sat.GLOBALS.wrapPosition;
    var pointUtil = satUtil.PointUtil,
        rectUtil = satUtil.RectUtil;


    var doc = fl.getDocumentDOM();//文档
    if (!checkDom(doc)) return;

    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴

    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curLayer = layers[curLayerIndex];//当前图层

    var curFrameIndex = timeline.currentFrame;//当前帧索引
    var curFrame = curLayer.frames[curFrameIndex];//当前帧

    function getCameraRect(cameraPos) {
        // 摄像机缩放
        var cameraZoom = timeline.camera.getZoom(curFrameIndex) / 100;
        var stageWidth = doc.width;
        var stageHeight = doc.height;
        var cameraRect = new Rectangle(-cameraPos.x, -cameraPos.y,
            -cameraPos.x + stageWidth / cameraZoom, -cameraPos.y + stageHeight / cameraZoom);
        return cameraRect;
    }

    function getBgRect() {
        // 背景的边界
        var bgLayers = layerUtil.getLayersByName(layers, "背景");
        if (bgLayers.length < 1) {
            fl.trace("找不到背景图层,必须包含'背景'关键字");
            return;
        }

        /**
         * 当前帧的背景的 所有元素
         * @type {Element[]}
         */
        var curElements = [];
        for (var i = 0; i < bgLayers.length; i++) {
            var layer = bgLayers[i];
            var currentFrame = layer.frames[curFrameIndex];
            var elements = currentFrame.elements;
            curElements = curElements.concat(elements);
        }

        sel.SelectAll(curElements);
        var bgRect = new Rectangle(doc.getSelectionRect());
        return bgRect;
    }

    function getPeopleCenter() {
        // 人物的中心点
        sel.SelectStart(selection);

        var rect = new Rectangle(doc.getSelectionRect());
        var peopleCenter = rect.getCenterVector();
        return peopleCenter;
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Not Zero")) return;


        // 允许摄像机
        timeline.camera.cameraEnabled = true;

        // 摄像机
        // 摄像机位置,左上角坐标
        var cameraPos = wrapPosition(timeline.camera.getPosition(curFrameIndex));
        var cameraRect = getCameraRect(cameraPos);
        var cameraCenter = cameraRect.getCenterVector();

        // 背景
        var bgRect = getBgRect();

        // 人物
        var peopleCenter = getPeopleCenter();

        // 计算摄像机的位置
        var cameraOffset = cameraCenter.clone().sub(peopleCenter);

        if (bgRect) {
            // 最大移动向量
            cameraOffset = rectUtil.moveRectSafety(bgRect, cameraRect, cameraOffset);
        }

        var newCameraPos = cameraPos.clone().add(cameraOffset);
        // 必须为非0的整数
        newCameraPos = newCameraPos.round().noZero();

        // 移动摄像机
        timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);

        sel.SelectStart(selection);
    }

    Main();
});