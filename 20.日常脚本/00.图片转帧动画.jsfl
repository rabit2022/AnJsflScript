/**
 * @file: 00.图片转动画.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/11 22:29
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

    function getPics() {
        var selectedPics = library.getSelectedItems();

        // 按照图片名称中的数字进行排序
        selectedPics.sort(function (a, b) {
            // 使用正则表达式提取数字
            var numA = parseInt(a.name.match(/\d+/)[0]);
            var numB = parseInt(b.name.match(/\d+/)[0]);

            // 比较数字并返回结果
            return numA - numB;
        });
        return selectedPics;
    }

    var selectedPics = getPics();

    // 去除数字的名字
    var NEW_SYMBOL_NAME=selectedPics[0].name.replace(/_\d+.*/,"");
    // fl.trace(NEW_SYMBOL_NAME);
    
    // 转为元件
    doc.convertToSymbol("graphic",NEW_SYMBOL_NAME,"center");

    function KFrames() {
        doc.enterEditMode("inPlace");

        // 把第一个作为参照
        doc.selectAll();
        var fr = doc.getSelectionRect()
        var pos = wrapRect(fr).center();

        // 转为关键帧
        var timeline1 = doc.getTimeline();
        timeline1.convertToKeyframes(0, selectedPics.length)

        for (var i = 0; i < selectedPics.length; i++) {
            timeline1.currentFrame = i;

            // 删除参照
            doc.selectAll();
            doc.deleteSelection();

            // 添加库里面的图片
            var pic = selectedPics[i];
            library.addItemToDocument(pos.toObj(), pic.name);
        }

        doc.exitEditMode();
    }

    KFrames();

    function cleanFolders() {
        // 整理库的文件
        library.selectNone();
        var FOLDER_NAME = NEW_SYMBOL_NAME + "_素材";
        library.newFolder(FOLDER_NAME);

        var ANIMATE_FOLDER = FOLDER_NAME + "/动画";
        library.newFolder(ANIMATE_FOLDER)

        for (var i = 0; i < selectedPics.length; i++) {
            library.selectItem(selectedPics[i]);
            // library.renameItem(ANIMATE_FOLDER + "/" + selectedPics[i].name);
            library.moveToFolder(ANIMATE_FOLDER, selectedPics[i].name);
        }
        library.selectNone();
        var index = library.findItemIndex(NEW_SYMBOL_NAME);
        var newSymbol = library.items[index];
        library.selectItem(newSymbol);
        library.moveToFolder(FOLDER_NAME, newSymbol.name);
    }

    cleanFolders();
}
Main();

function DebugNames(Pics) {
    for (var i = 0; i < Pics.length; i++) {
        fl.trace(Pics[i].name);
    }
}