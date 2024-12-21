/**
 * @file: 00.图片转动画.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/11 22:29
 * @project: WindowSWF-master
 * @description:
 */


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

        if (library.getSelectedItems().length < 1) {
            alert("请选择库里面的图片");
            return false;
        }
        return true;
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

    function KFrames(selectedPics) {
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


    function cleanFolders(NEW_SYMBOL_NAME, symbol_name, selectedPics) {
        // 整理库的文件
        library.selectNone();
        var FOLDER_NAME = NEW_SYMBOL_NAME + "_素材";
        library.newFolder(FOLDER_NAME);

        var ANIMATE_FOLDER = FOLDER_NAME + "/动画";
        library.newFolder(ANIMATE_FOLDER)

        // 移动图片到 动画文件夹
        for (var i = 0; i < selectedPics.length; i++) {
            library.selectItem(selectedPics[i]);
            // library.renameItem(ANIMATE_FOLDER + "/" + selectedPics[i].name);
            library.moveToFolder(ANIMATE_FOLDER, selectedPics[i].name);
        }

        // 移动元件到  素材文件夹
        library.selectNone();
        var index = library.findItemIndex(symbol_name);
        var newSymbol = library.items[index];
        library.selectItem(newSymbol.name);
        library.moveToFolder(FOLDER_NAME, newSymbol.name);
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;

    function Main() {
        if (!checkDom()) {
            return;
        }


        var selectedPics = getPics();

        // 去除数字的名字
        var NEW_SYMBOL_NAME = selectedPics[0].name.replace(/_\d+.*/, "");

        // 把第一个图片 添加到  舞台中心
        var stageCenter = new Point(doc.width / 2, doc.height / 2);
        library.addItemToDocument(stageCenter.toObj(), selectedPics[0].name);

        // 转为元件
        var symbol_name = ele.generateNameUntilUnique(NEW_SYMBOL_NAME);
        doc.convertToSymbol("graphic", symbol_name, "center");


        KFrames(selectedPics);

        cleanFolders(NEW_SYMBOL_NAME, symbol_name, selectedPics);
    }

    Main();
})();

