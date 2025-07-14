
/**
 * 获取所有图层的音频信息
 * @param timeline 时间线
 */
function hasSoundAll(timeline: FlashTimeline): SoundInfo[] {
    var layers = timeline.layers; //图层

    var soundInfos: SoundInfo[] = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        // @ts-ignore
        var layerSoundInfos = hasSound(layers, layer);
        soundInfos.push(...layerSoundInfos);
    }
    return soundInfos;
}
