/**
 * @file: 02.排兵布阵_perspective.TD.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/22 12:56
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "MoreElement", "COMPATIBILITY", "xmlPanelUtil", "ElementSelect"],
    function(checkUtil, log, MoreElement, COMPATIBILITY, xmlPanelUtil, es) {
        const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } = checkUtil;

        const { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__ } = COMPATIBILITY;

        const { parseNumber } = xmlPanelUtil;

        const { OnlySelectCurrent } = es;


        // region doc
        var doc = fl.getDocumentDOM(); //文档
        if (!CheckDom(doc)) return;

        var selection = doc.selection; //选择
        var library = doc.library; //库文件
        var timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        var frames = curLayer.frames; //当前图层的帧列表
        var curFrameIndex = timeline.currentFrame; //当前帧索引
        var curFrame = frames[curFrameIndex]; //当前帧

        // // 获取第一帧
        // var selectedFrames = CheckSelectedFrames(timeline);
        // if (!selectedFrames) return;
        // const { firstSlLayerIndex, firstSlFrameIndex,firstSlLayer, firstSlFrame } = selectedFrames;


        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // // 检查选择的图层
        // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
        // if (!selectedLayers) return;
        // endregion doc

        function checkXMLPanel() {
            // var panel = getXMLPanel();
            var panel =
                __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./02.排兵布阵_common.xml");
            if (panel === null) return null;

            var horizontalCount = parseNumber(
                panel.horizontalCount,
                "横向排布数量只能输入数字，请重新输入。"
            );
            if (horizontalCount === null) return null;
            var horizontalSpacing = parseNumber(
                panel.horizontalSpacing,
                "横向排布间距只能输入数字，请重新输入。"
            );
            if (horizontalSpacing === null) return null;
            var verticalCount = parseNumber(
                panel.verticalCount,
                "纵向排布数量只能输入数字，请重新输入。"
            );
            if (verticalCount === null) return null;
            var verticalSpacing = parseNumber(
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

            var config = checkXMLPanel();
            if (config === null) return;
            const { horizontalCount, horizontalSpacing, verticalCount, verticalSpacing } =
                config;


            var firstElement = selection[0];
            var me = new MoreElement(firstElement, horizontalSpacing, verticalSpacing);

            for (var i = 0; i < horizontalCount; i++) {
                for (var j = 0; j < verticalCount; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }

                    OnlySelectCurrent(firstElement);

                    // 复制粘贴
                    // doc.clipCopy();
                    // doc.clipPaste();
                    doc.duplicateSelection();

                    // 获取新粘贴的元件
                    var newElement = doc.selection[0];

                    // 移动元件
                    var nextPoint = me.PerspectiveOffset(i, j, horizontalCount);
                    newElement.x = nextPoint.x;
                    newElement.y = nextPoint.y;

                    // 缩放元件
                    var scale = me.PerspectiveScale(i, j, horizontalCount);
                    newElement.scaleX = scale.scaleX;
                    newElement.scaleY = scale.scaleY;
                }
            }
        }

        Main();
    });
