(function () {
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

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = timeline;//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引


    function Main() {
        if (!checkDom()) {
            return;
        }

        // 2次
        doc.convertToSymbol('graphic', '', 'center');
        if (library.getItemProperty('linkageImportForRS') == true) {
            library.setItemProperty('linkageImportForRS', false);
        }
        else {
            library.setItemProperty('linkageExportForAS', false);
            library.setItemProperty('linkageExportForRS', false);
        }
        library.setItemProperty('scalingGrid',  false);


        doc.enterEditMode('inPlace');
        doc.getTimeline().addMotionGuide();

        doc.mouseClick({x:250, y:0}, false, true);
        doc.deleteSelection();
        doc.mouseClick({x:250, y:250}, false, true);
        doc.deleteSelection();
        doc.mouseClick({x:250, y:0}, false, true);
        doc.deleteSelection();

        doc.moveSelectionBy({x:811, y:361.7});

        // 添加帧，关键帧
        doc.getTimeline().insertFrames();
        doc.getTimeline().insertKeyframe();

        doc.moveSelectionBy({x:500, y:0});

        // 补间动画
        doc.getTimeline().createMotionTween();
        doc.getTimeline().setFrameProperty('easeType', 'easeType');
        doc.exitEditMode();
        doc.enterEditMode('inPlace');
        
    }
    Main();
})();
