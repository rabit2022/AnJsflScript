function SelectAllLayers(timeline, layers) {
    for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
        var soundLayerIndex = layers_1[_i];
        if (soundLayerIndex === layers[0]) {
            timeline.setSelectedLayers(soundLayerIndex, true);
            continue;
        }
        timeline.setSelectedLayers(soundLayerIndex, false);
    }
}
