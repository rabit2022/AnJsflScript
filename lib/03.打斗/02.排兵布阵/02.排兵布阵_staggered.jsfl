/**
 * @file: 02.排兵布阵_staggered.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 16:30
 * @project: AnJsflScript
 * @description:
 */

(function () {
    const match = fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);
    if (!match) throw new Error("Can't find project path [" + fl.scriptURI + "]");
    const index = fl.scriptURI.lastIndexOf(match[0]);
    const projectPath = fl.scriptURI.substring(0, index + match[0].length);
    if (typeof require === "undefined")
        fl.runScript(projectPath + "/config/require/CheckEnvironment.jsfl");
})();
require(["checkUtil", "xmlPanelUtil", "MoreElement"], function (
    checkUtil,
    xmlPanelUtil,
    MoreElement
) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    // var MoreElement = me.MoreElement;

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

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var horizontalCount = xmlPanelUtil.parseNumber(
            panel.horizontalCount,
            "横向排布数量只能输入数字，请重新输入。"
        );
        if (horizontalCount === null) return null;
        var horizontalSpacing = xmlPanelUtil.parseNumber(
            panel.horizontalSpacing,
            "横向排布间距只能输入数字，请重新输入。"
        );
        if (horizontalSpacing === null) return null;
        var verticalCount = xmlPanelUtil.parseNumber(
            panel.verticalCount,
            "纵向排布数量只能输入数字，请重新输入。"
        );
        if (verticalCount === null) return null;
        var verticalSpacing = xmlPanelUtil.parseNumber(
            panel.verticalSpacing,
            "纵向排布间距只能输入数字，请重新输入。"
        );
        if (verticalSpacing === null) return null;

        return {
            horizontalCount: horizontalCount,
            horizontalSpacing: horizontalSpacing,
            verticalCount: verticalCount,
            verticalSpacing: verticalSpacing
        };
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 整齐排布
        var config = checkXMLPanel();
        if (config === null) return;
        var horizontalCount = config.horizontalCount;
        var horizontalSpacing = config.horizontalSpacing;
        var verticalCount = config.verticalCount;
        var verticalSpacing = config.verticalSpacing;

        var firstElement = selection[0];
        var me = new MoreElement(firstElement, horizontalSpacing, verticalSpacing);

        for (var i = 0; i < horizontalCount; i++) {
            for (var j = 0; j < verticalCount; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }

                var nextPoint = me.StaggeredOffset(i, j);

                // 复制粘贴
                doc.clipCopy();
                doc.clipPaste();

                // 移动元件
                var newElement = doc.selection[0];
                newElement.x = nextPoint.x;
                newElement.y = nextPoint.y;
            }
        }
    }

    Main();
});
