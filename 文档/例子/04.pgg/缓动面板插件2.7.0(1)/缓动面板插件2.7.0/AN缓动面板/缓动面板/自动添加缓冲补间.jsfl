/**
 * 运行此脚本可自动添加缓冲补间动画
 *
 *
 * 更多插件、脚本和动画教程可关注b站up主@胖果果K
 *
 **/

var dom = fl.getDocumentDOM();
var timeline = dom.getTimeline();
var library = dom.library;
var thisLayer = 0;

var selectedFrames = timeline.getSelectedFrames();
var currentTimeline = document.currentTimeline;
var frameList = new Array(0);
if (selectedFrames.length >= 3) {
    for (var i = 0; i < selectedFrames.length; i += 3) {
        var layerNum = selectedFrames[i];
        timeline.setSelectedLayers(layerNum);
        thisLayer = timeline.layers[layerNum];
        var s = selectedFrames[i + 2] - selectedFrames[i + 1];
        var sf = -6;
        frameList = new Array(0);
        for (var j = selectedFrames[i + 1]; j < selectedFrames[i + 2]; j++) {
            if (thisLayer.frames[j].startFrame != sf && sf >= 0)
                frameList.push(j);
            sf = thisLayer.frames[j].startFrame;
        }
        for (var j = 0; j < frameList.length; j++) {
            var k = frameList[j];
            if (thisLayer.frames[k].elements.length == 1) {
                if (thisLayer.frames[k - 4].startFrame != k - 4) {
                    timeline.insertKeyframe(k - 4);
                }
                timeline.insertKeyframe(k - 1);
                if (thisLayer.frames[k + 3].startFrame != k + 3) {
                    timeline.insertKeyframe(k + 3);
                }
                doTween(k - 4, -100);
                doTween(k, 100);
                doMove(k - 1, k - 4, k, 0.73, true);
                doMove(k, k - 4, k + 3, 1.13, false);
            }
        }
    }
}

function doTween(i, ease) {
    timeline.setFrameProperty('tweenType', 'motion', i);
    thisLayer.frames[i].hasCustomEase = false;
    thisLayer.frames[i].tweenEasing = ease;
}
function doMove(i, prev, next, inter, half) {
    timeline.currentFrame = i;
    dom.selectNone();
    dom.selection = thisLayer.frames[i].elements;
    var prevTP = dom.getTransformationPoint();

    var prevCoor = thisLayer.frames[prev].elements[0].matrix;
    var nextCoor = thisLayer.frames[next].elements[0].matrix;

    var e = thisLayer.frames[i].elements[0];

    var mat = e.matrix;
    mat.a = twe(prevCoor.a, nextCoor.a, inter);
    mat.b = twe(prevCoor.b, nextCoor.b, inter);
    mat.c = twe(prevCoor.c, nextCoor.c, inter);
    mat.d = twe(prevCoor.d, nextCoor.d, inter);
    mat.tx = twe(prevCoor.tx, nextCoor.tx, inter);
    mat.ty = twe(prevCoor.ty, nextCoor.ty, inter);
    var ds = twe(scale(prevCoor), scale(nextCoor), inter) / scale(mat);
    mat.a *= ds;
    mat.b *= ds;
    mat.c *= ds;
    mat.d *= ds;
    e.matrix = mat;

    dom.setTransformationPoint({ x: prevTP.x, y: prevTP.y });
}
function find_in_library(find_string) {
    var items = fl.getDocumentDOM().library.items;

    for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].name === find_string) {
            return items[i];
        }
    }

    for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].name.replace(/.*\//, '') === find_string) {
            return items[i];
        }
    }
}
function twe(a, b, x) {
    return a + (b - a) * x;
}
function rot(m, ang) {
    var sin = Math.sin(ang);
    var cos = Math.cos(ang);
    var a = m.a;
    var b = m.b;
    var c = m.c;
    var d = m.d;
    m.a = a * cos - b * sin;
    m.b = a * sin + b * cos;
    m.c = c * cos - d * sin;
    m.d = c * sin + d * cos;
    return m;
}
function scale(m) {
    var x = m.a + m.c;
    var y = m.b + m.d;
    return Math.sqrt(x * x + y * y);
}
