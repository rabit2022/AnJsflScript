﻿function checkDom() {
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

var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

var timeline = doc.getTimeline();//时间轴
var layers = timeline.layers;//图层



function Main() {
    if (!checkDom()) {
        return;
    }


    // fl.trace("hello world");


    // // /**
    // //  * 
    // //  * @type {Element[]}
    // //  */
    // var seles=[];
    // for(var i=0;i<selection.length;i++){
    //     sels.push(selection[i]);
    // }
    //
    // seles.forEach(function(sel){
    // })
    //
    // for(var i=0;i<seles.length;i++) {
    //     var sel = seles[i];
    //     sel.name
    // }

    
    // fl.trace(random.randrange(10));
    // fl.trace(ele.generateNameUntilUnique("test"));

}

Main();