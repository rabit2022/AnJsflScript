function addNewLayerSafety(symbolTimeline: FlashTimeline, layerName: string) {
    const symbolLayerNames = symbolTimeline.layers.map((layer) => layer.name);
    let targetLayerIndex = symbolLayerNames.lastIndexOf(layerName);

    const isLayerBlank = (() => {
        var symbolLayers = symbolTimeline.layers;
        var targetLayer = symbolLayers[targetLayerIndex];

        // 是否是空层
        // @ts-ignore
        var isLayerBlank = IsLayerBlank(symbolLayers, targetLayer);
        return isLayerBlank;
    })();
    // 不是空层，新增图层
    if (targetLayerIndex === -1 || !isLayerBlank) {
        symbolTimeline.currentLayer = symbolLayerNames.length - 1;

        targetLayerIndex = symbolTimeline.addNewLayer(layerName, "normal", false);
    } else {
        symbolTimeline.currentLayer = targetLayerIndex;
    }
    return targetLayerIndex;
}
