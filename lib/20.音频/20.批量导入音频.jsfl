/**
 * @file: 20.批量导入音频.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/14 15:37
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil"], function (checkUtil) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

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

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // 让用户选择包含音效文件的文件夹
        var folderURL = fl.browseForFolderURL("请选择包含音效文件的文件夹");
        if (!folderURL) {
            fl.trace("未选择文件夹。");
            return;
        }

        // 获取文件夹中的所有文件
        var files = FLfile.listFolder(folderURL);
        var count = 0;

        // 遍历文件并导入
        for (var i = 0; i < files.length; i++) {
            var fileURL = folderURL + "/" + files[i];
            if (fileURL.match(/\.wav$/i) || fileURL.match(/\.mp3$/i)) {
                // 检查文件扩展名是否为WAV或MP3
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
});
