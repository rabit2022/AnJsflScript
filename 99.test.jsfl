
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
    // fl.UtilHasExec=true;
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
        alert("加载Util.jsfl失败！");
        return false;
    }
}

var doc=fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library=doc.library;//库文件

var timeline=doc.getTimeline();//时间轴
var layers=timeline.layers;//图层

function Main() {
    if (!checkDom()||!runUtilFun()) {
        return;
    }

    /**
     * 
     * @type {Point}
     */
    var c=new Point(1,2);
    var f=getFunctions(c);
    for (var i = 0; i < f.length; i++){
        fl.trace(f[i]);
    }

}
Main();