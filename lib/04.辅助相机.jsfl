/**
 * @file: 04.辅助相机.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/9 20:24
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "LayerOperation",
    "SAT",
    "StrokeDefinitions",
    "FillDefinitions",
    "ColorPanel",
    "os",
    "ElementQuery",
    "JSFLConstants", "COMPATIBILITY"
], function(checkUtil, log, lo, sat, sd, fd, cp, os, eq, JSFLConstants, COMPATIBILITY) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { addNewLayerSafety, renameLayer } = lo;

    const { Vector, LineSegment } = sat;

    const { SolidStrokeBuilder } = sd.BUILDERS;
    const { SolidFillBuilder } = fd.BUILDERS;
    const { setCustomPanel, resetCustomPanel } = cp;
    const { getName } = eq;
    const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

    const {
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__,
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__
    } = COMPATIBILITY;

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
    // var frs = CheckSelectedFrames(timeline);
    // if (!frs) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // endregion doc

    function setColorPanel() {
        var solidStroke = new SolidStrokeBuilder()
            .setColor("red")
            .setThickness(3)
            .build();
        var solidFill = new SolidFillBuilder().setColor("red").setAlpha(0).build();
        log.info("stroke:", solidStroke);
        log.info("fill:", solidFill);

        setCustomPanel(solidStroke, solidFill);
    }

    function drawLineAndRect() {
        const stageRect = sat.ENTITY.STAGE.getBounds();
        log.info("stageRect:", stageRect);

        // 8条线段
        // 点到矩形边缘的距离
        var margin = 20;
        // 线段长度
        var lineLength = 100;
        var conorPoints = [
            stageRect.getCorner("top left").add(new Vector(margin, margin)),
            stageRect.getCorner("top right").add(new Vector(-margin, margin)),
            stageRect.getCorner("bottom left").add(new Vector(margin, -margin)),
            stageRect.getCorner("bottom right").add(new Vector(-margin, -margin))
        ];
        log.info("conorPoints:", conorPoints);
        var lines = [
            LineSegment.from(conorPoints[0], "right", lineLength),
            LineSegment.from(conorPoints[0], "bottom", lineLength),
            LineSegment.from(conorPoints[1], "left", lineLength),
            LineSegment.from(conorPoints[1], "bottom", lineLength),
            LineSegment.from(conorPoints[2], "top", lineLength),
            LineSegment.from(conorPoints[2], "right", lineLength),
            LineSegment.from(conorPoints[3], "top", lineLength),
            LineSegment.from(conorPoints[3], "left", lineLength)
        ];
        log.info("lines:", lines);

        // 画矩形
        doc.addNewRectangle(stageRect, 0);

        // 画线
        lines.forEach(function(line) {
            doc.addNewLine(line.startPoint, line.endPoint);
        });
    }

    const SECONDARY_CAMERA_NAME = "辅助相机-AnJsflScript";

    // function getScripText() {
    //     const scriptPath = os.path.join(os.getcwd(), "04.辅助相机.as");
    //     // // log.info("scriptPath", scriptPath);
    //     //
    //     // var scriptText = "";
    //     // require(["text!" + scriptPath], function (text) {
    //     //     scriptText = text;
    //     // });
    //
    //     var scriptText = "";
    //     // require(["./04.辅助相机.as"], function (text) {
    //     //     scriptText = text;
    //     // });
    //     require([__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__("./04.辅助相机.as")], function (text) {
    //         scriptText = __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__(text);
    //     });
    //     if (scriptText == "")
    //         throw new Error("Can't find script file [" + scriptPath + "]");
    //     // log.info("scriptText", scriptText);
    //     return scriptText;
    // }

    function KFrames() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();

        renameLayer(timeline, 0, "图像");
        var scriptLayerIndex = timeline.addNewLayer("Script", "normal", true);
        // log.info("scriptLayerIndex:", scriptLayerIndex);

        // 添加as代码
        var toAddScriptFrame = timeline.layers[scriptLayerIndex].frames[0];
        // log.info("toAddScriptFrame:", toAddScriptFrame);
        toAddScriptFrame.actionScript = getScripText();

        doc.exitEditMode();
    }

    function getScriptText() {
        function getScriptTextInner(callback) {
            require([__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__("./config/ui/dialog.xul")], function(text) {
                const scriptText = __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__(text);
                if (!scriptText) {
                    callback(new Error("Can't find script file [./04.辅助相机.as]"));
                } else {
                    callback(null, scriptText);
                }
            });
        }

        var scriptText1 = "";
        getScriptTextInner(function(err, scriptText) {
            if (err) {
                fl.trace(err.message);
                return;
            }
            scriptText1 = scriptText;
        });
        return scriptText1;
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // fl.trace("获取script Text");
        // var scriptText = getScripText();
        // fl.trace(scriptText);

        // var scriptText1 = "";
        // getScriptText(function(err, scriptText) {
        //     if (err) {
        //         fl.trace(err.message);
        //         return;
        //     }
        //     scriptText1 = scriptText;
        // });
        // fl.trace(scriptText1);
        var scriptText = getScriptText();
        fl.trace(scriptText);
    }

    Main();
});
