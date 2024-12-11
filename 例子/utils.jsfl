
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

function Main() {
    if (!checkDom()||!runUtilFun()) {
        return;
    }

    
    
}
Main();