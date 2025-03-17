/**
 * 运行此脚本可为选定的帧添加补间，它会提前检查每个图层的内容以确定是否应该使用形状补间或传统补间。
 *
 *
 * 更多插件、脚本和动画教程可关注b站up主@胖果果K
 *
 **/

var tl = fl.getDocumentDOM().getTimeline();
var sf = tl.getSelectedFrames();
var cf = tl.currentFrame;
var cl;
for (i = 0; i < sf.length; i += 3) {
    cl = sf[i];
    tl.currentLayer = cl;
    tl.setSelectedFrames(cf, cf + 1, true);
    if (tl.layers[cl].frames[cf].elements[0].elementType == 'shape') {
        tl.setFrameProperty('tweenType', 'shape');
    } else if (tl.layers[cl].frames[cf].elements[0].elementType == 'instance') {
        tl.setFrameProperty('tweenType', 'motion');
        tl.setFrameProperty('motionTweenScale', true);
        tl.setFrameProperty('motionTweenRotate', 'auto');
        tl.setFrameProperty('motionTweenOrientToPath', false);
        tl.setFrameProperty('motionTweenSync', false);
        tl.setFrameProperty('motionTweenSnap', false);
    }
}
