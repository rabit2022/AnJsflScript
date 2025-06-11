/**
 * @file: 02.批量文件夹.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 0:14
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function getProjectPath() {
        const index = fl.scriptURI.lastIndexOf("AnJsflScript");
        if (index !== -1) return fl.scriptURI.substring(0, index + "AnJsflScript".length);
        throw new Error("Can't find project path.");
    }
    fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
})();
require(["checkUtil", "SymbolNameGenerator"], function (checkUtil, sng) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;
    const { findDuplicateNameInLib } = sng;

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

        var folderNames = [
            "一 常用",
            "一 常用/1.配音",
            "一 常用/2.音效",
            "一 常用/3.角色",
            "一 常用/4.特效",
            "一 常用/5.表情",
            "一 常用/6.道具",
            "一 常用/7.背景",
            "一 常用/8.本集专用",
            "一 常用/3.角色/1.人物一",
            "一 常用/3.角色/2.人物二",
            "一 常用/3.角色/3.人物三",
            "一 常用/3.角色/4.人物四",
            "一 常用/3.角色/5.人物五",
            "一 常用/3.角色/6.人物六"
        ];

        for (var i = 0; i < folderNames.length; i++) {
            var folderName = folderNames[i];
            if (!findDuplicateNameInLib(folderName)) {
                library.newFolder(folderName);
            }
        }
    }

    Main();
});
