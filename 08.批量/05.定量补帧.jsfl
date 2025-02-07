/**
 * @file: 05.定量补帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 13:46
 * @project: AnJsflScript
 * @description:
 */


require(["checkUtil","selection"],function(checkUtil,sel) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom(doc)) return;

    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴

    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curLayer = layers[curLayerIndex];//当前图层

    var curFrameIndex = timeline.currentFrame;//当前帧索引
    var curFrame = curLayer.frames[curFrameIndex];//当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;


        var currentFrame = timeline.currentFrame;

        var toAddFrames = prompt("请输入需要增加的帧数：", 30);
        if (toAddFrames == null || toAddFrames === "" || toAddFrames < 1) {
            alert("请输入正确的帧数！");
            return;
        }

        // 给所有图层加帧
        timeline.insertFrames(30, true, currentFrame);

        // 回到最开始选择的帧
        timeline.currentFrame = currentFrame;

        sel.SelectNoneTl(timeline);
    }

    Main();
});