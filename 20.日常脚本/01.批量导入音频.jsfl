/**
 * @file: 01.批量导入音频.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/14 15:37
 * @project: AnJsflScript
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
        return true;
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

        // 让用户选择包含音效文件的文件夹
        var folderURL = fl.browseForFolderURL("请选择包含音效文件的文件夹");
        // var folderURL = "file:///F|/01_programme/python/files/files_pro/2024-12/1211/贺晓晓";
        // var folderURL = "file:///F:\\04_ps\\沙雕动画\\01-我的神国模拟器\\2024-12-14\\新建文件夹";
        // var folder = "F:\\04_ps\\沙雕动画\\01-我的神国模拟器\\2024-12-14\\新建文件夹";
        // var folderURL = FLfile.platformPathToURI(folder);
        if (!folderURL) {
            fl.trace("未选择文件夹。");
            return;
        }

        // fl.trace("选择的文件夹：" + folderURL);
        // 获取文件夹中的所有文件
        var files = FLfile.listFolder(folderURL);
        var count = 0;

        // 遍历文件并导入
        for (var i = 0; i < files.length; i++) {
            var fileURL = folderURL + "/" + files[i];
            if ((fileURL.match(/\.wav$/i) || fileURL.match(/\.mp3$/i))) { // 检查文件扩展名是否为WAV或MP3
                // fl.trace("正在导入文件：" + fileURL);
                var result = doc.importFile(fileURL, true); // 导入文件到库中
                if (result) {
                    count++;
                }
            }
        }
        // 输出导入结果
        fl.trace("成功导入 " + count + " 个音效文件到库中。");
    }
    Main();
})();
