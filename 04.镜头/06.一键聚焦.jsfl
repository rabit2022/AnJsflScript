/**
 * @file: 06.一键聚焦.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/11 14:31
 * @project: AnJsflScript
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
        // if (selection.length > 1) {
        //     alert("请选择单个元件");
        //     return false;
        // }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;


    function getBgLayers() {
        /**
         * 背景的边界
         * @type {Layer[]}
         */
        var bgLayers = [];
        var BG_LAYER_NAME = "背景";
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            // if (Includes(layer.name, BG_LAYER_NAME)) {
            if (layer.name.includes(BG_LAYER_NAME)){
                // bgLayer = layer;
                // break;
                bgLayers.push(layer);
            }
        }
        return bgLayers;
    }

    function getCameraRect(cameraPos) {
        // 摄像机缩放
        var cameraZoom = timeline.camera.getZoom(curFrameIndex) / 100;
        var stageWidth = doc.width;
        var stageHeight = doc.height;
        var cameraRect = new Rect(-cameraPos.x, -cameraPos.y,
            -cameraPos.x + stageWidth / cameraZoom, -cameraPos.y + stageHeight / cameraZoom);
        return cameraRect;
    }

    function getBgRect() {
        // 背景的边界
        var bgLayers = getBgLayers();
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

        SelectAll(curElements);
        var bgRect = wrapRect(doc.getSelectionRect());
        return bgRect;
    }

    function getPeopleCenter() {
        // 人物的中心点
        SelectStart();

        var rect = wrapRect(doc.getSelectionRect());
        var peopleCenter = rect.center();
        return peopleCenter;
    }


    function Main() {
        if (!checkDom()) {
            return;
        }

        // 允许摄像机
        timeline.camera.cameraEnabled = true;

        // 摄像机
        // 摄像机位置,左上角坐标
        var cameraPos = wrapPoint(timeline.camera.getPosition(curFrameIndex));
        var cameraRect = getCameraRect(cameraPos);
        var cameraCenter = cameraRect.center();

        // 背景
        var bgRect = getBgRect();
        
        // 人物
        var peopleCenter = getPeopleCenter();

        // 计算摄像机的位置
        var cameraOffset = cameraCenter.sub(peopleCenter);

        if (bgRect) {
            // 最大移动向量
            cameraOffset = calculateSafeMoveVector(bgRect, cameraRect, cameraOffset);
        }

        var newCameraPos = cameraPos.add(cameraOffset);
        // 必须为非0的整数
        newCameraPos = newCameraPos.toIntPonit().noZero();

        // 移动摄像机
        timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);

        SelectStart();
    }

    Main();
})();


