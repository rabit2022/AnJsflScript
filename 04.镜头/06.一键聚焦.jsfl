/**
 * @file: 06.一键聚焦.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/11 14:31
 * @project: WindowSWF-master
 * @description:
 */


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


function getBgLayer() {
    /**
     * 背景的边界
     * @type {Layer}
     */
    var bgLayer;
    var BG_LAYER_NAME = "背景";
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (Includes(layer.name, BG_LAYER_NAME)) {
            bgLayer = layer;
            break;
        }
    }
    return bgLayer;
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
    var bgLayer = getBgLayer();
    if (!bgLayer) {
        fl.trace("找不到背景图层,必须包含'背景'关键字");
        return;
    }
    // 获取当前帧的背景的边界
    var currentFrame = bgLayer.frames[curFrameIndex];
    var curElements = currentFrame.elements;

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
    // fl.trace(cameraRect.toString());
    var cameraCenter = cameraRect.center();

    // 背景
    var bgRect = getBgRect();
    // if (!bgRect) {
    //     return;
    // }

    // 人物
    var peopleCenter = getPeopleCenter();

    // 计算摄像机的位置
    var cameraOffset = cameraCenter.sub(peopleCenter);

    if (bgRect) {
        // 最大移动向量
        cameraOffset = calculateSafeMoveVector(bgRect, cameraRect, cameraOffset);
        // fl.trace(cameraOffset.toString());
    }

    
    // fl.trace(cameraOffset.toString());

    var newCameraPos = cameraPos.add(cameraOffset);
    // 必须为非0的整数
    newCameraPos = newCameraPos.toIntPonit().noZero();
    
    // fl.trace(newCameraPos.toString());

    // 移动摄像机
    timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);
    
    SelectStart();
}

Main();


