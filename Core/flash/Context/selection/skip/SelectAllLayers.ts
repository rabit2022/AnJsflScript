function SelectAllLayers(timeline: FlashTimeline, layers: number[]) {
    // 选中包含音频的图层
    for (var soundLayerIndex of layers) {
        // 第一个图层
        if (soundLayerIndex === layers[0]) {
            timeline.setSelectedLayers(soundLayerIndex, true);
            continue;
        }
        timeline.setSelectedLayers(soundLayerIndex, false);
    }
}
