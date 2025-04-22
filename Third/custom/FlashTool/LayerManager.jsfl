define(['checkUtil', 'FUNC', 'loglevel'], function (checkUtil, FUNC, log) {
    const { CheckDom, CheckTimeline } = checkUtil;
    const { IsEmpty, SAFE_GET_MACRO } = FUNC;

    //设置根据曾名称要忽略的层
    var IGNORE_LAYER_BY_NAME = /^(actionscript|as|label|assist|soundtrack|sound)$/i;
    //扩展 folder 的定义范围
    var FOLDER_TYPE = /^(folder|mask|guide)$/; //--;
    //all layer type: "normal"、"guide"、"guided"、"mask"、"masked" 和 "folder"。
    function LayerManager() {}

    /**
     * 清除空白图层
     * @see https://github.com/hufang360/FlashTool
     */
    LayerManager.clearEmptyLayers = function () {
        const doc = CheckDom();
        if (!doc) return;
        const tl = CheckTimeline(doc);
        if (!tl) return;

        const emptyLayers = LayerManager.getEmptyLayers(tl);
        fl.outputPanel.clear();
        doc.save();

        emptyLayers.reverse();
        for (var i = 0; i < emptyLayers.length; i++) {
            tl.deleteLayer(emptyLayers[i]);
        }

        // alert(`已删除 ${emptyLayers.length} 个空白图层`);
        console.info('已删除 %d 个空白图层', emptyLayers.length);
    };



    /**
     * 检查文件夹是否为空
     * @see https://github.com/hufang360/FlashTool
     */
    LayerManager.isEmptyFolder = function (tl, folderID) {
        const folder = tl.layers[folderID];
        const endLayer = folderID + LayerManager.countChild(tl, folderID);

        for (var i = folderID + 1; i <= endLayer; i++) {
            const child = tl.layers[i];
            if (!child) return true;

            if (child.parentLayer === folder) {
                // 忽略特定名称的图层
                if (IGNORE_LAYER_BY_NAME.test(child.name)) {
                    return false;
                }

                if (FOLDER_TYPE.test(child.layerType)) {
                    // 检查子文件夹是否为空
                    if (!LayerManager.isEmptyFolder(tl, i)) {
                        return false;
                    }
                } else {
                    // 检查子图层是否为空
                    if (!LayerManager.isLayerBlank(child)) {
                        return false;
                    }
                }
            }
        }

        return true;
    };


    return LayerManager;
});
