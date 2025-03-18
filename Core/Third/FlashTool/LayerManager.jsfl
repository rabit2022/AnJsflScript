define(['checkUtil', 'FUNC'], function (checkUtil, FUNC) {
    const { CheckDom, CheckTimeline } = checkUtil;
    const { IsEmpty } = FUNC;

    //设置根据曾名称要忽略的层
    var IGNORE_LAYER_BY_NAME =
        /^(actionscript|as|label|assist|soundtrack|sound)$/i;
    //扩展 folder 的定义范围
    var FOLDER_TYPE = /^(folder|mask|guide)$/; //--;
    //all layer type: "normal"、"guide"、"guided"、"mask"、"masked" 和 "folder"。
    function LayerManager() {}

    // 静态方法：清除空白图层
    LayerManager.clearEmptyLayers = function () {
        const doc = CheckDom();
        if (!doc) return;
        const tl = CheckTimeline(doc);
        if (!tl) return;

        const emptyLayers = LayerManager.getEmptyLayers(tl);
        fl.outputPanel.clear();
        doc.save();

        emptyLayers.reverse();
        for (let i = 0; i < emptyLayers.length; i++) {
            tl.deleteLayer(emptyLayers[i]);
        }

        alert(`已删除 ${emptyLayers.length} 个空白图层`);
    };

    // 静态方法：获取空白图层的索引列表
    LayerManager.getEmptyLayers = function (tl) {
        const total = tl.layers.length;
        const emptyLayers = [];

        for (let i = 0; i < total; i++) {
            const layer = tl.layers[i];
            // 忽略特定名称的图层
            if (IGNORE_LAYER_BY_NAME.test(layer.name)) {
                continue;
            }

            if (FOLDER_TYPE.test(layer.layerType)) {
                // 检查文件夹是否为空
                if (LayerManager.isEmptyFolder(tl, i)) {
                    emptyLayers.push(i);
                    i += LayerManager.countChild(tl, i);
                }
            } else {
                // 检查普通图层是否为空
                if (LayerManager.isLayerBlank(layer)) {
                    emptyLayers.push(i);
                }
            }
        }

        return emptyLayers;
    };

    // 静态方法：检查图层是否为空
    LayerManager.isLayerBlank = function (layer) {
        const lastFrame = layer.frames[layer.frames.length - 1].startFrame;
        let frameId = lastFrame;

        while (frameId >= 0) {
            if (!LayerManager.isFrameBlank(layer.frames[frameId])) {
                return false;
            }
            frameId = layer.frames[frameId - 1]?.startFrame || -1;
        }

        return true;
    };

    // 静态方法：检查帧是否为空
    LayerManager.isFrameBlank = function (frame) {
        return frame.elements.length === 0 && IsEmpty(frame.actionScript);
    };

    // 检查图层是否包含声音
    LayerManager.hasSound = function (layer) {
        for (var f = 0; f < layer.frames.length; f++) {
            var frame = layer.frames[f];
            if (frame.soundLibraryItem) {
                return true; // 发现声音对象
            }
        }
        return false; // 无声音
    };

    // 静态方法：检查文件夹是否为空
    LayerManager.isEmptyFolder = function (tl, folderID) {
        const folder = tl.layers[folderID];
        const endLayer = folderID + LayerManager.countChild(tl, folderID);

        for (let i = folderID + 1; i <= endLayer; i++) {
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

    // 静态方法：计算子图层数量
    LayerManager.countChild = function (tl, fatherID, noDeep = false) {
        let lid = fatherID + 1;
        const len = tl.layers.length;

        while (lid < len) {
            const child = tl.layers[lid];
            if (!child || !child.parentLayer) break;

            if (noDeep) {
                if (child.parentLayer !== tl.layers[fatherID]) break;
            } else {
                if (!LayerManager.isMyChild(tl, fatherID, lid)) break;
            }

            lid++;
        }

        return lid - fatherID - 1;
    };

    // 静态方法：检查父子关系
    LayerManager.isMyChild = function (tl, father, child) {
        if (typeof father === 'number') father = tl.layers[father];
        if (typeof child === 'number') child = tl.layers[child];

        if (!child || !child.parentLayer) return false;
        if (child.parentLayer === father) return true;

        return LayerManager.isMyChild(tl, father, child.parentLayer);
    };
});
