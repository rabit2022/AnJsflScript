/**
 * @file: 00.图片转帧动画.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/11 22:29
 * @project: AnJsflScript
 * @description:
 */

if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require(['checkUtil', 'libUtil', 'SAT'], function (checkUtil, libUtil, sat) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

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
        doc.enterEditMode('inPlace');

        // 把第一个作为参照
        doc.selectAll();
        var pos = new Rectangle(doc.getSelectionRect()).getCenterVector();

        // 转为关键帧
        var timeline1 = doc.getTimeline();
        timeline1.convertToKeyframes(0, selectedPics.length);

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
        var FOLDER_NAME = NEW_SYMBOL_NAME + '_素材';
        library.newFolder(FOLDER_NAME);

        var ANIMATE_FOLDER = FOLDER_NAME + '/动画';
        library.newFolder(ANIMATE_FOLDER);

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

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectLibItem', 'Not Zero')) return;

        var selectedPics = getPics();

        // 去除数字的名字
        var NEW_SYMBOL_NAME = selectedPics[0].name.replace(/_\d+.*/, '');

        // 把第一个图片 添加到  舞台中心
        var stageCenter = new Vector(doc.width / 2, doc.height / 2);
        library.addItemToDocument(stageCenter.toObj(), selectedPics[0].name);

        // 转为元件
        var symbol_name = libUtil.generateNameUntilUnique(NEW_SYMBOL_NAME);
        doc.convertToSymbol('graphic', symbol_name, 'center');

        KFrames(selectedPics);

        // cleanFolders(NEW_SYMBOL_NAME, symbol_name, selectedPics);
    }

    Main();
});
