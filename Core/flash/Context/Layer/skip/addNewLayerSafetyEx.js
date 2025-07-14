function addNewLayerSafety(symbolTimeline, layerName) {
    var symbolLayerNames = symbolTimeline.layers.map(function (layer) { return layer.name; });
    var targetLayerIndex = symbolLayerNames.lastIndexOf(layerName);
    var isLayerBlank = (function () {
        var symbolLayers = symbolTimeline.layers;
        var targetLayer = symbolLayers[targetLayerIndex];
        var isLayerBlank = IsLayerBlank(symbolLayers, targetLayer);
        return isLayerBlank;
    })();
    if (targetLayerIndex === -1 || !isLayerBlank) {
        symbolTimeline.currentLayer = symbolLayerNames.length - 1;
        targetLayerIndex = symbolTimeline.addNewLayer(layerName, "normal", false);
    }
    else {
        symbolTimeline.currentLayer = targetLayerIndex;
    }
    return targetLayerIndex;
}
