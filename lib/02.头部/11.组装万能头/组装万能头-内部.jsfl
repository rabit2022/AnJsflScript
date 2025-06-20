/**
 * @file: 组装万能头-内部.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/20 12:34
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require(["checkUtil", "loglevel", "Context", "LayerList", "ElementQuery", "SAT", "JSFLConstants"],
    function(checkUtil, log, Context, LayerList, eq, sat, JSFLConstants) {
        const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
            checkUtil;

        const { getFrameCount } = eq;
        const { Circle, Vector } = sat;

        const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

        // // region doc
        // var doc = fl.getDocumentDOM(); //文档
        // if (!CheckDom(doc)) return;
        //
        // var selection = doc.selection; //选择
        // var library = doc.library; //库文件
        // var timeline = doc.getTimeline(); //时间轴
        //
        // var layers = timeline.layers; //图层
        // var curLayerIndex = timeline.currentLayer; //当前图层索引
        // var curLayer = layers[curLayerIndex]; //当前图层
        //
        // var frames = curLayer.frames; //当前图层的帧列表
        // var curFrameIndex = timeline.currentFrame; //当前帧索引
        // var curFrame = frames[curFrameIndex]; //当前帧
        //
        // // // 获取第一帧
        // // var frs = CheckSelectedFrames(timeline);
        // // if (!frs) return;
        // // const { firstSlLayerIndex, firstSlFrameIndex } = frs;
        //
        // // 检查选择的元件
        // if (!CheckSelection(selection, "selectElement", "No limit")) return;
        //
        // // // 检查选择的图层
        // // if (!CheckSelectedLayers(timeline, "No limit")) return;
        // // endregion doc

        // region Context
        // 这个用于 变量 经常update的地方，例如：doc.enterEditMode("inPlace");
        // 否则，建议使用 doc 方案，减少 库 的依赖
        const context = new Context();
        context.update();
        const {
            doc,
            selection,
            library,
            timeline,
            layers,
            // AllLayers,
            curLayerIndex,
            curLayer,
            curFrameIndex,
            curFrame
        } = context;
        const { firstSlLayerIndex, firstSlFrameIndex } = context;

        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;
        // endregion Context

        const HEAD_LAYER_INDEX = 0;
        const EMOTION_LAYER_INDEX = 1;
        const SHAKE_LAYER_INDEX = 2;

        // 设置图层
        function setLayers() {
            // 分散到图层
            doc.distributeToLayers();

            // 排序
            var layerList = new LayerList(context);
            layerList.sort(function(a, b) {
                var aFc = getFrameCount(a.frames[0].elements[0]);
                var bFc = getFrameCount(b.frames[0].elements[0]);
                log.debug("aFc:", aFc, "bFc:", bFc);
                return bFc - aFc;
            });

            layerList.append("摇头动作", "normal");

        }

        // 添加摇头标记
        function drawShakeMark(elementPosition) {
            const SHACK_MARK_NAME = "摇头标记-AnJsflScript";

            // var center=new Vector();
            var center = elementPosition;
            var radius = 5;
            var circle = new Circle(center, radius);
            var circleBounds = circle.getBounds();
            log.info("circleBounds:", circleBounds);

            // 如果“摇头标记” 已经存在
            if (library.itemExists(SHACK_MARK_NAME)) {
                library.addItemToDocument(center, SHACK_MARK_NAME);
                return;
            }

            // 添加一个圆形作为摇头标记
            doc.addNewOval(circleBounds.toObj());

            timeline.setSelectedFrames(FRAME_1, FRAME_1 + 1);

            // 转换为 元件
            doc.convertToSymbol("graphic", SHACK_MARK_NAME, "center");

            // 设置 透明度 为 0
            doc.setInstanceAlpha(0);
        }

        // 设置父级视图
        function setParentView() {

            const HEAD_LAYER = timeline.layers[HEAD_LAYER_INDEX];
            const EMOTION_LAYER = timeline.layers[EMOTION_LAYER_INDEX];
            const SHAKE_LAYER = timeline.layers[SHAKE_LAYER_INDEX];

            HEAD_LAYER.setRigParentAtFrame(SHAKE_LAYER, FRAME_1);
            EMOTION_LAYER.setRigParentAtFrame(SHAKE_LAYER, FRAME_1);

        }

        // todo:摇头动作
        function shakeAction() {


        }

        function Main() {
            // var config = window.AnJsflScript.GLOBALS["11.组装万能头-config"];
            // if (!config) {
            //     fl.trace("[ERROR] Can't find config.");
            //     return;
            // }
            // log.info("config:", config);
            // var elementPosition =window.AnJsflScript.GLOBALS["11.组装万能头-ElementPosition"];
            // if (!elementPosition) {
            //     fl.trace("[ERROR] Can't find elementPosition.");
            //     return;
            // }
            // var headconfig = window.AnJsflScript.GLOBALS["11.组装万能头-headconfig"];
            // if (!headconfig) {
            //     fl.trace("[ERROR] Can't find headconfig.");
            //     return;
            // }
            // const {head, expression} = headconfig;

            var config = {
                "shakeIntensity": 3,
                "motionFrameCount": 6,
                "headDirection": -1,
                "shakeMode": "traditional",
                "frameSelector": "keyFrame"
            };
            var elementPosition = { "x": 458.75, "y": 312.05 };
            log.info("layers：", layers, layers.length);
            // log.info("layers：", AllLayers, AllLayers.length);
            var headconfig = {
                head: layers[1].frames[0].elements[0],
                expression: layers[0].frames[0].elements[0]
            };
            const { head, expression } = headconfig;


            // currentSelection: head,expression

            // setLayers();


            // context.update();
            // log.debug("currentLayer:", context.curLayerIndex);
            //
            // // currentLayer:2
            // drawShakeMark(elementPosition);
            //
            // setParentView();

            // // 按照表情的长度，插入帧数
            // const EXPRESSION_FRAME_COUNT = getFrameCount(expression);
            // log.debug("EXPRESSION_FRAME_COUNT:", EXPRESSION_FRAME_COUNT);
            // timeline.insertFrames(EXPRESSION_FRAME_COUNT - 1, true); // 在时间轴上插入帧
            //
            // // 选中 摇头标记 图层
            // timeline.setSelectedLayers(SHAKE_LAYER_INDEX);


        }

        Main();
    });
