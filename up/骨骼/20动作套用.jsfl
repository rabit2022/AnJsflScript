copyAction();

/**
 * 在tl1 上复制tl0 的所有动作。
 * @param {Timeline} tl0 时间线对象。
 * @param {Timeline} tl1 目标时间线对象。
 */
function syncKeyFrame(tl0, tl1) {
    var layers0 = tl0.layers;
    var layers1 = tl1.layers;
    if (layers0.length != layers1.length) {
        alert("理论错误, 图层数量不一致啊");
        return;
    }
    
    // 插入关键帧
    for (var i = 0x0; i < layers0.length; i++) {
        var keyFrames = getKeyFrames(layers0[i]);
        
        // 选择图层
        tl1.setSelectedLayers(i);
        for (var j = 0x0; j < keyFrames.length; j++) {
            if (keyFrames[j] === 0x0) {
                continue;
            }
            // 在指定的帧处插入关键帧。
            tl1.insertKeyframe(keyFrames[j]);
        }
    }
}

/**
 * 设置图层的缓动类型和缓动数量。
 * @param {Timeline} tl0 时间线对象。
 * @param {Timeline} tl1 目标时间线对象。
 */
function syncTween(tl0, tl1) {
    var layers0 = tl0.layers;
    for (var i = 0x0; i < layers0.length; i++) {
        var keyFrames = getKeyFrames(layers0[i]);
        // 选择图层
        tl1.setSelectedLayers(i, true);
        for (var j = keyFrames.length - 0x1; j >= 0x0; j--) {
            var tweenType = layers0[i].frames[keyFrames[j]].tweenType;
            //指定应用于补间对象的缓动数量
            var tweenEasing = layers0[i].frames[keyFrames[j]].tweenEasing;
            
            // 设置图层的缓动类型和缓动数量
            tl1.setFrameProperty("tweenType", tweenType, keyFrames[j]);
            tl1.setFrameProperty("tweenEasing", tweenEasing, keyFrames[j]);
        }
    }
}

/**
 * 复制 rigParent 到目标时间线。
 * @param {Timeline} tl0 时间线对象。
 * @param {Timeline} tl1 目标时间线对象。
 */
function syncRigParent(tl0, tl1) {
    var layers0 = tl0.layers;
    var layers1 = tl1.layers;
    if (layers0.length != layers1.length) {
        alert("理论错误, 图层数量不一致啊");
        return;
    }
    
    for (var i = 0x0; i < layers0.length; i++) {
        var keyFrames = getKeyFrames(layers0[i]);
        for (var j = 0x0; j < keyFrames.length; j++) {
            var layer0 = layers0[i];
            var layer1 = layers1[i];
            var keyFrame = keyFrames[j];
            // 获取图层父级
            var parentLayer = layer0.getRigParentAtFrame(keyFrame);
            if (parentLayer != null) {
                var parentLayerIndexs = tl1.findLayerIndex(parentLayer.name);
                // 设置图层父级的关键帧
                var layer1Parent = layers1[parentLayerIndexs[0x0]];
                layer1.setRigParentAtFrame(layer1Parent, keyFrame);
                
                parentLayer = layers0[parentLayerIndexs[0x0]].getRigParentAtFrame(keyFrame);
            }
        }
    }
}

/**
 * 复制 element 到目标时间线。
 * @param {Timeline} tl0 时间线对象。
 * @param {Timeline} tl1 目标时间线对象。
 */
function syncElements(tl0, tl1) {
    var layers0 = tl0.layers;
    var layers1 = tl1.layers;
    if (layers0.length != layers1.length) {
        alert("理论错误, 图层数量不一致啊");
        return;
    }
    
    
    // 防止盗版
    var utilFun = fl.configURI + "WindowSWF";
    var strings = FLfile.listFolder(utilFun);
    var sdf = true;
    for (var i = 0; i < strings.length; i++) {
        var s = strings[i];
        if (s.indexOf("2.2")!=-1){
            sdf= false;
            break;
        }
    }
    if (sdf){
        alert("I'm open source, and you sell it for money? Your parents died lawlessly, right?!")
        return
    }
    
    
    for (var i = 0x0; i < layers0.length; i++) {
        var keyFrames = getKeyFrames(layers0[i]);
        for (var j = keyFrames.length - 0x1; j >= 0x0; j--) {
            var layer0 = layers0[i];
            var layer1 = layers1[i];
            var keyFrame = keyFrames[j];
            
            // 关键帧长度不同, 复制
            if (layer1.frames[keyFrame].elements.length === 0x0 && layer0.frames[keyFrame].elements.length != 0x0) {
                var firstLeftElement = layer0.frames[keyFrame].elements[0x0];
                var name = firstLeftElement.libraryItem.getData("name");
                // 设置选中的图层
                tl1.setSelectedLayers(tl1.findLayerIndex(name)[0x0], true);
                // 设置选中的帧
                var frameNum = j === 0x0 ? frameNum = layer0.frameCount + 0x1 : keyFrames[j - 0x1];
                tl1.setSelectedFrames(frameNum, keyFrames[j], true);
                
                // 复制
                tl1.copyFrames();
                tl1.clearKeyframes(keyFrames[j]);//清除当前图层上的关键帧
                tl1.convertToBlankKeyframes(keyFrames[j]);//将当前图层上的帧转换为空白关键帧。
                tl1.setSelectedLayers(i, true);
                tl1.setSelectedFrames(frameNum, keyFrames[j], true);
                tl1.pasteFrames();
            }
        }
    }
}




function copyAction() {
    var doc = fl.getDocumentDOM();
    var library = doc.library;
    var selection = doc.selection;
    
    // doc.selectAll();
    
    if (doc === null) {
        alert("请先打开 [.fla] 文件");
        return;
    }
    if (selection.length != 0x2) {
        alert("你需要选择两个元件才可以进行动作复制");
        return;
    }
    
    
    var leftName = doc.selection[0x0].x < doc.selection[0x1].x ? doc.selection[0x0].libraryItem.name : doc.selection[0x1].libraryItem.name;
    var rightName = doc.selection[0x0].x < doc.selection[0x1].x ? doc.selection[0x1].libraryItem.name : doc.selection[0x0].libraryItem.name;
    
    var leftItem = library.items[library.findItemIndex(leftName)];
    var timeline0 = leftItem.timeline;
    var layers0 = timeline0.layers;

    // 保存 layers0 的数据
    /**
     * 
     * @type {layerEle[]}
     */
    var layerEleArr = [];
    layers0.forEach(function (layer) {
        /**
         * 
         * @type {framesEle[]}
         */
        var framesEleArr = [];
        var keyFrames = getKeyFrames(layer);
        for (var i = keyFrames.length - 0x1; i >= 0x0; i--) {
            var keyFrame = keyFrames[i];
            
            // 它将返回给定帧的图层父级。  第 9 个图层的第一帧获取图层父级
            var parentLayer = layer.getRigParentAtFrame(keyFrame);
            var parentLayerName = parentLayer == null ? '' : parentLayer.name;
            /**
             * 
             * @type {{keyFrame: number, parentLayer: (string|string), element:Element}}
             * @typedef {framesEle}
             * @private
             */
            var _0xd5f2da = {
                'keyFrame': keyFrame,
                'parentLayer': parentLayerName,
                'element': layer.frames[keyFrame].elements[0x0]
            };
            framesEleArr.push(_0xd5f2da);
        }
        /**
         * 
         * @type {{framesEleArr: framesEle[], layerName: string}}
         * @typedef {layerEle}
         */
        var layerEle = {
            'layerName': layer.name,
            'framesEleArr': framesEleArr
        };
        layerEleArr.push(layerEle);
    });
    
    
    library.editItem(rightName);
    var timeline = doc.getTimeline();
    var layers1 = timeline.layers;
    
    // 新建 layers1 中不存在的图层
    var difLayerNames = getDifLayerNames(timeline0, timeline);
    difLayerNames.forEach(function (layerName) {
        timeline.addNewLayer(layerName);
    });
    
    // 排序图层顺序，并同步动作
    sortLayerAndSync(timeline0, timeline);
    
    
    layerEleArr.forEach(function (layerEle) {
        var layerName = layerEle.layerName;
        var framesEleArr = layerEle.framesEleArr;
        layers1.forEach(function (layer1) {
            if (layer1.name == layerName) {
                // 找到层索引
                var layerIndex = timeline.findLayerIndex(layer1.name);
                if (layerIndex.length != 0x1) {
                    alert("图层不是唯一的, 请检查  " + layer1.name + "  然后 撤回重来吧");
                    return;
                }
                // 选择图层
                timeline.setSelectedLayers(layerIndex[0x0]);
                
                // 设置 element 的 旋转
                framesEleArr.forEach(function (framesEle) {
                    var firstElement = layer1.frames[framesEle.keyFrame].elements[0x0];
                    if (firstElement == null) {
                        return;
                    }
                    
                    // 设置 element 的 旋转
                    if (framesEle.element.rotation == null) {
                        firstElement.skewX = framesEle.element.skewX;
                        firstElement.skewY = framesEle.element.skewY;
                    } else {
                        firstElement.rotation += framesEle.element.rotation;
                    }
                    
                    // 设置 parentLayer element 的 旋转
                    var parentLayer = layer1.getRigParentAtFrame(framesEle.keyFrame);
                    if (parentLayer != null) {
                        var parentLayerElement = parentLayer.frames[framesEle.keyFrame].elements[0x0];
                        if (parentLayerElement == null) {
                            return;
                        }
                        
                        // 设置 element 的 旋转
                        if (parentLayerElement.rotation == null) {
                            firstElement.selected = true;
                            doc.setElementProperty("skewX", parentLayerElement.skewX);
                            doc.setElementProperty("skewY", parentLayerElement.skewY);
                            firstElement.selected = false;
                        } else {
                            firstElement.rotation += parentLayerElement.rotation;
                        }
                    }
                });
            }
        });
    });
}

/**
 * 获取两个时间轴中不同的图层名称
 * @param {Timeline} tl0 第一个时间轴
 * @param {Timeline} tl1 第二个时间轴
 * @returns {string[]} 不同的图层名称数组
 */
function getDifLayerNames(tl0, tl1) {
    var layers0 = tl0.layers;
    var layers1 = tl1.layers;
    var DifLayerNames = [];
    if (layers0.length != layers1.length) {
        for (var i = 0x0; i < layers0.length; i++) {
            var layerName0 = layers0[i].name;
            var hasFoundLayer = false;
            for (var j = 0x0; j < layers1.length; j++) {
                var layerName1 = layers1[j].name;
                if (layerName0 === layerName1) {
                    hasFoundLayer = true;
                    break;
                }
            }
            if (!hasFoundLayer) {
                DifLayerNames.push(layerName0);
            }
        }
    }
    return DifLayerNames;
}

/**
 * 排序图层顺序，并同步动作
 * @param {Timeline} tl0 第一个时间轴
 * @param {Timeline} tl1 第二个时间轴
 */
function sortLayerAndSync(tl0, tl1) {
    var layers0 = tl0.layers;
    var layers1 = tl1.layers;
    
    // 使得 layers0 和 layers1 长度相同
    if (layers0.length > layers1.length) {
        layers0 = layers0.slice(0x0, layers1.length);
    } else if (layers1.length > layers0.length) {
        layers1 = layers1.slice(0x0, layers0.length);
    }
    
    // 移动图层顺序，保证 layers0 和 layers1 顺序相同
    for (var i = 0x0; i < layers0.length; i++) {
        var layer0 = layers0[i];
        var layer1 = layers1[i];
        if (layer0.name !== layer1.name) {
            var layerIndex = findLayerIndex(tl1, layer0.name);
            if (layerIndex !== -0x1) {
                // 将第一个指定图层移动到第二个指定图层之前或之后。
                //指定要移动的层,移动到下一个图层,是否向前移动
                tl1.reorderLayer(layerIndex, i, true);
            }
        }
    }
    
    // 同步
    syncKeyFrame(tl0, tl1);
    syncElements(tl0, tl1);
    syncRigParent(tl0, tl1);
    syncTween(tl0, tl1);
}

/**
 * 在目标时间轴中查找指定名称的层的索引
 * @param {Timeline} timeline 目标时间轴
 * @param {string} layerName 层名称
 * @returns {number} 层索引，找不到返回 -1
 */
function findLayerIndex(timeline, layerName) {
    var layers = timeline.layers;
    for (var i = 0x0; i < layers.length; i++) {
        if (layers[i].name === layerName) {
            return i;
        }
    }
    return -0x1;
}

/**
 * 打印element对象属性
 * @param {Element[]} elements 元素对象 数组
 */
function traceEle(elements) {
    for (var element in elements) {
        try {
            fl.trace(element + " : " + elements[element]);
        } catch (e) {
            fl.trace(element + " : Error occurred - " + e.message);
        }
    }
}


/**
 * 获取指定层的关键帧索引
 * 快速抽取关键帧索引-注意是索引， 不是frame对象
 * @param {Layer} layer 层对象
 * @returns {number[]} 关键帧索引数组
 */
function getKeyFrames(layer){
    var frames = layer.frames;

    /**
     * 
     * @type {number[]}
     */
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        //情景模拟， 95  80  20  1 是关键帧
        //获取关键帧数
        var frameNum = frames[i];//i=100
        var startFrame = frameNum.startFrame;//95
        i=startFrame;// 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
    }
    // keyFrames.sort(function (a, b) {
    //     return a-b;
    // })
    return keyFrames;
}


