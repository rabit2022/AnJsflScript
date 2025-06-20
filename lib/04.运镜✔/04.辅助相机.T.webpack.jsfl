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
// "undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
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
    "JSFLConstants",
    "COMPATIBILITY"
], function (checkUtil, log, lo, sat, sd, fd, cp, os, eq, JSFLConstants, COMPATIBILITY) {
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
        lines.forEach(function (line) {
            doc.addNewLine(line.startPoint, line.endPoint);
        });
    }

    const SECONDARY_CAMERA_NAME = "辅助相机-AnJsflScript";

    function KFrames() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();

        renameLayer(timeline, 0, "图像");
        var scriptLayerIndex = timeline.addNewLayer("Script", "normal", true);
        // log.info("scriptLayerIndex:", scriptLayerIndex);

        // 添加as代码
        var toAddScriptFrame = timeline.layers[scriptLayerIndex].frames[0];
        // log.info("toAddScriptFrame:", toAddScriptFrame);

        // toAddScriptFrame.actionScript = getScriptText();
        toAddScriptFrame.actionScript = "// I don't know why need it,but more plugins in supermarket use similar code as this,so I keep it here.\r\n// If you can tell me why, I will be grateful for your help.\r\n\r\nimport flash.display.MovieClip;\r\nimport flash.geom.Matrix;\r\nimport flash.display.DisplayObject;\r\nvar cameraTrans:Transform = new Transform(this);\r\nvar stageTrans:Transform = new Transform(root);\r\nvar rt:MovieClip = root as MovieClip;\r\nrt.camera = this;\r\nvisible = false;\r\nfunction updateParallaxes() {\r\n    if (rt.parallaxes != undefined) {\r\n        var prlx:Array = rt.parallaxes as Array;\r\n        var mc:MovieClip;\r\n        for (var i = 0; i < prlx.length; i++) {\r\n            mc = prlx[i] as MovieClip;\r\n            mc.move(this);\r\n        }\r\n    }\r\n}\r\nstage.addEventListener(Event.ENTER_FRAME, updateStage);\r\nfunction updateStage(...rest) {\r\n    parent.filters = filters;\r\n    stageTrans.colorTransform = cameraTrans.colorTransform;\r\n    var stageMatrix:Matrix = getFinalMatrix();\r\n    stageMatrix.invert();\r\n    stageMatrix.translate(stage.stageWidth * 0.5, stage.stageHeight * 0.5);\r\n    stageTrans.matrix = stageMatrix;\r\n    updateParallaxes();\r\n}\r\naddEventListener(Event.REMOVED_FROM_STAGE, resetStage);\r\nfunction resetStage(...rest) {\r\n    stage.removeEventListener(Event.ENTER_FRAME, updateStage);\r\n    stageTrans.matrix = new Matrix();\r\n    stageTrans.colorTransform = new ColorTransform();\r\n    parent.filters = new Array();\r\n    if (rt.camera == this) {\r\n        rt.camera = undefined;\r\n    }\r\n}\r\nfunction getFinalMatrix():Matrix {\r\n    var finalMX:Matrix = this.transform.matrix.clone();\r\n    var p:DisplayObject = parent;\r\n    while (p != root) {\r\n        finalMX.concat(p.transform.matrix);\r\n        p = p.parent;\r\n    }\r\n    return finalMX;\r\n}\r\nupdateStage();";

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 禁用相机
        if (timeline.camera.cameraEnabled === true) {
            timeline.camera.cameraEnabled = false;
        }

        // 查找或创建“摄像机”图层
        var cameraLayerIndex = addNewLayerSafety(timeline, "摄像机");
        // log.info("cameraLayerIndex:", cameraLayerIndex);

        // 如果“辅助相机”图层 “辅助相机-AnJsflScript” 已经存在，则直接选中该图层
        if (
            doc.selection.length === 1 &&
            getName(doc.selection[0]) === SECONDARY_CAMERA_NAME
        ) {
            log.info("“辅助相机”图层 “辅助相机-AnJsflScript” 已经存在，直接选中该图层");
            // 选中“辅助相机”图层,跳过此次操作
            timeline.setSelectedLayers(cameraLayerIndex);
            alert("辅助相机已添加，动画制作更流畅！");
            return;
        }

        // 清空“摄像机”图层的元件
        // timeline.setSelectedLayers(cameraLayerIndex);
        if (doc.selection.length > 0) {
            doc.deleteSelection();
        }

        // 库中存在摄像机元件
        if (library.itemExists(SECONDARY_CAMERA_NAME)) {
            // throw new Error("Not implemented yet");
            var stageCenter = sat.ENTITY.STAGE.getCenter();
            log.info("stageCenter:", stageCenter);

            library.addItemToDocument(stageCenter, SECONDARY_CAMERA_NAME);
            return;
        }

        setColorPanel();

        drawLineAndRect();

        // 选中“摄像机”图层 的所有元件
        timeline.setSelectedFrames([cameraLayerIndex, FRAME_1, FRAME_1 + 1]);

        doc.convertToSymbol("movie clip", SECONDARY_CAMERA_NAME, "center");

        KFrames();

        resetCustomPanel();

        alert("辅助相机已添加，动画制作更流畅！");
    }

    Main();
});
