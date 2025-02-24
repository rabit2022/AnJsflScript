/**
 * 运行此脚本缓动为波浪
 *
 *
 * 更多插件、脚本和动画教程可关注b站up主@胖果果K
 *
 **/

var easeCurve = [
    { x: 0, y: 0 },
    { x: 16, y: 0 },
    { x: 16, y: 100 },
    { x: 33, y: 100 },
    { x: 50, y: 100 },
    { x: 50, y: 0 },
    { x: 67, y: 0 },
    { x: 83, y: 0 },
    { x: 83, y: 100 },
    { x: 100, y: 100 },
];

var dom = fl.getDocumentDOM();
var timeline = dom.getTimeline();
var library = dom.library;

var sel = timeline.getSelectedFrames();
var currentTimeline = document.currentTimeline;
if (sel.length >= 3) {
    for (var i = 0; i < sel.length; i += 3) {
        var layerIndex = sel[i];
        timeline.setSelectedLayers(layerIndex);
        var thisLayer = timeline.layers[layerIndex];
        var s = sel[i + 2] - sel[i + 1];
        for (var j = sel[i + 1]; j < sel[i + 2]; j++) {
            timeline.setFrameProperty('tweenType', 'motion', j, j + 1);
            thisLayer.frames[j].hasCustomEase = true;
            thisLayer.frames[j].setCustomEase('all', easeCurve);
        }
    }
}
