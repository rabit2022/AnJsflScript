/**
 * @file: 00.曲线运动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 21:18
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
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkDom()) {
            return;
        }


        an.getDocumentDOM().convertToSymbol('graphic', '', 'center');
        var lib = an.getDocumentDOM().library;
        if (lib.getItemProperty('linkageImportForRS') == true) {
            lib.setItemProperty('linkageImportForRS', false);
        }
        else {
            lib.setItemProperty('linkageExportForAS', false);
            lib.setItemProperty('linkageExportForRS', false);
        }
        lib.setItemProperty('scalingGrid',  false);

        
        an.getDocumentDOM().convertToSymbol('graphic', '', 'center');
        var lib = an.getDocumentDOM().library;
        if (lib.getItemProperty('linkageImportForRS') == true) {
            lib.setItemProperty('linkageImportForRS', false);
        }
        else {
            lib.setItemProperty('linkageExportForAS', false);
            lib.setItemProperty('linkageExportForRS', false);
        }
        lib.setItemProperty('scalingGrid',  false);

        
        
        an.getDocumentDOM().enterEditMode('inPlace');
        an.getDocumentDOM().getTimeline().addMotionGuide();

        an.getDocumentDOM().mouseClick({x:250, y:0}, false, true);
        an.getDocumentDOM().deleteSelection();
        an.getDocumentDOM().mouseClick({x:250, y:250}, false, true);
        an.getDocumentDOM().deleteSelection();
        an.getDocumentDOM().mouseClick({x:250, y:0}, false, true);
        an.getDocumentDOM().deleteSelection();

        an.getDocumentDOM().moveSelectionBy({x:811, y:361.7});

        an.getDocumentDOM().getTimeline().insertFrames();

        an.getDocumentDOM().getTimeline().insertKeyframe();

        an.getDocumentDOM().moveSelectionBy({x:500, y:0});

        an.getDocumentDOM().getTimeline().createMotionTween();
        an.getDocumentDOM().getTimeline().setFrameProperty('easeType', 'easeType');
        an.getDocumentDOM().exitEditMode();
        an.getDocumentDOM().enterEditMode('inPlace');


    }

    Main();
})();

