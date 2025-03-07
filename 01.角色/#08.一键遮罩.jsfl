/**
 * @file: 08.一键遮罩.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/7 21:02
 * @project: AnJsflScript
 * @description:
 */


require(['checkUtil', 'loglevel', 'elementUtil', 'libUtil', 'selectionUtil','Constants'],
    function(checkUtil, log, elementUtil, libUtil, selectionUtil, Constants) {
        const { CheckDom, CheckSelection } = checkUtil;
        const { IsSymbol, IsShape, getName } = elementUtil;
        const { SelectAll } = selectionUtil;
        const { FRAME_30 } = Constants;

        const doc = fl.getDocumentDOM(); //文档
        if (!CheckDom(doc)) return;

        const selection = doc.selection; //选择
        const library = doc.library; //库文件
        const timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        var curFrameIndex = timeline.currentFrame; //当前帧索引
        var curFrame = curLayer.frames[curFrameIndex]; //当前帧

        const MASK_LAYER_INDEX = 0; //遮罩层索引
        const TARGET_LAYER_INDEX = 1; //被遮层索引
        function checkMaskTarget() {
            var mask, target;

            for (var i = 0; i < selection.length; i++) {
                if (IsSymbol(selection[i])) {
                    target = selection[i];
                } else if (IsShape(selection[i])) {
                    mask = selection[i];
                }
            }
            if (!mask || !target) {
                alert('检测到您没有选择形状，请选择"遮罩形状+被遮对象”！');
                return null;
            }
            return { mask: mask, target: target };
        }

        function Main() {
            // // 请同时选中两个对象！(遮罩形状+被遮对象)
            // if (!CheckSelection(selection, 'selectElement', 'Only two', '遮罩形状+被遮对象')) return;
            //
            // // const mt = checkMaskTarget();
            // // if (!mt) return;
            // //
            // // const { mask, target } = mt;
            // // log.info('遮罩对象：' + getName(mask) + '，被遮对象：' + getName(target));
            // //
            // // // 转为元件
            // // var symbolName = libUtil.generateNameUntilUnique('一键遮罩_');
            // // doc.convertToSymbol('graphic', symbolName, 'center');



            // 分层，确保被遮对象在最上层
            SelectAll();
            doc.distributeToLayers();

            // 增加30帧，增加关键帧(1,30,30)
            // 给所有图层加帧
            timeline.insertFrames(FRAME_30, true);

            // 设置遮罩层0
            // 传统补间，元件1

        }

        Main();
    });