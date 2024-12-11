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

    // if (selection.length < 1) {
    //     alert("请选择元件？");
    //     return false;
    // }
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

function runUtilFun(){
    // if (fl.UtilHasExec===true) {
    //     fl.trace("Util.jsfl已加载");
    //     return true;
    // }
    // var utilFun = fl.configURI + "WindowSWF/myJsfl/Util.jsfl";
    var utilFun="file:///F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/mytest/例子/库.jsfl";
    try {
        fl.runScript(utilFun);
        return true;
    }catch (e) {
        alert("加载Util.jsfl失败！"+utilFun+"不存在！");
        return false;
    }
}

var doc=fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library=doc.library;//库文件

var timeline=doc.getTimeline();//时间轴
var layers=timeline.layers;//图层
var curFrameIndex = timeline.currentFrame;

/**
 * 判断字符串是否包含另一个字符串
 * @param str1
 * @param str2
 * @returns {boolean}
 */
function Includes(str1, str2) {
    return str1.indexOf(str2) !== -1;
}
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

function getCameraRect() {
    // 摄像机位置,左上角坐标
    var cameraPos = timeline.camera.getPosition(curFrameIndex);
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
        alert("找不到背景图层");
        return;
    }
    // 获取当前帧的背景的边界
    var currentFrame=bgLayer.frames[curFrameIndex];
    var curElements=currentFrame.elements;
    doc.selectNone();
    SelectAll(curElements);
    var bgRect = wrapRect(doc.getSelectionRect());
    return bgRect;
}

function getPeopleCenter() {
    // 人物的中心点
    doc.selectNone();
    SelectAll(selection);
    var rect = wrapRect(doc.getSelectionRect());
    var peopleCenter = rect.center();
    return peopleCenter;
}

function Main() {
    if (!checkDom()||!runUtilFun()) {
        return;
    }
    
    // 允许摄像机
    timeline.camera.cameraEnabled = true;

    // 摄像机
    var cameraRect = getCameraRect();
    var cameraCenter = cameraRect.center();
    
    // 背景
    var bgRect = getBgRect();
    
    // 人物
    var peopleCenter = getPeopleCenter();

    // 计算摄像机的位置
    var cameraOffset=cameraCenter.sub(peopleCenter);

    // 最大移动位置
    cameraOffset=calculateSafeMoveVector(bgRect,cameraRect,cameraOffset);
    
    // 必须为非0的整数
    cameraOffset=cameraOffset.toIntPonit();
    if (cameraOffset.x===0){
        cameraOffset.x=1;
    }
    if (cameraOffset.y===0){
        cameraOffset.y=1;
    }
    
    // 移动摄像机
    timeline.camera.setPosition(curFrameIndex, cameraOffset.x, cameraOffset.y);
    
    SelectStart();
}
Main();

