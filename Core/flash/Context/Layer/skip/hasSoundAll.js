function hasSoundAll(timeline) {
    var layers = timeline.layers;
    var soundInfos = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var layerSoundInfos = hasSound(layers, layer);
        soundInfos.push.apply(soundInfos, layerSoundInfos);
    }
    return soundInfos;
}
