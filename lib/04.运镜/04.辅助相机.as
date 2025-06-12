// I don't know why need it,but more plugins in supermarket use similar code as this,so I keep it here.
// If you can tell me why, I will be grateful for your help.

import flash.display.MovieClip;
import flash.geom.Matrix;
import flash.display.DisplayObject;
var cameraTrans:Transform = new Transform(this);
var stageTrans:Transform = new Transform(root);
var rt:MovieClip = root as MovieClip;
rt.camera = this;
visible = false;
function updateParallaxes() {
    if (rt.parallaxes != undefined) {
        var prlx:Array = rt.parallaxes as Array;
        var mc:MovieClip;
        for (var i = 0; i < prlx.length; i++) {
            mc = prlx[i] as MovieClip;
            mc.move(this);
        }
    }
}
stage.addEventListener(Event.ENTER_FRAME, updateStage);
function updateStage(...rest) {
    parent.filters = filters;
    stageTrans.colorTransform = cameraTrans.colorTransform;
    var stageMatrix:Matrix = getFinalMatrix();
    stageMatrix.invert();
    stageMatrix.translate(stage.stageWidth * 0.5, stage.stageHeight * 0.5);
    stageTrans.matrix = stageMatrix;
    updateParallaxes();
}
addEventListener(Event.REMOVED_FROM_STAGE, resetStage);
function resetStage(...rest) {
    stage.removeEventListener(Event.ENTER_FRAME, updateStage);
    stageTrans.matrix = new Matrix();
    stageTrans.colorTransform = new ColorTransform();
    parent.filters = new Array();
    if (rt.camera == this) {
        rt.camera = undefined;
    }
}
function getFinalMatrix():Matrix {
    var finalMX:Matrix = this.transform.matrix.clone();
    var p:DisplayObject = parent;
    while (p != root) {
        finalMX.concat(p.transform.matrix);
        p = p.parent;
    }
    return finalMX;
}
updateStage();