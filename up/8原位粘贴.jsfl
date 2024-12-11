PasteInPlace();
function PasteInPlace() {
    var documentDOM = fl.getDocumentDOM();
    var selection = documentDOM.selection;
    documentDOM.selectNone();
    var _0x398e21 = [];
    var firstEle;
    selection.forEach(function (ele) {
        ele.selected = true;
        
        var eleMatrix = ele.matrix;
        var transformationPoint = ele.getTransformationPoint();
        var parentLayer = ele.layer.getRigParentAtFrame(documentDOM.getTimeline().currentFrame);
        if (parentLayer != null) {
            ele.layer.setRigParentAtFrame(0x0, documentDOM.getTimeline().currentFrame);
            eleMatrix = ele.matrix;
            ele.layer.setRigParentAtFrame(parentLayer, documentDOM.getTimeline().currentFrame);
        };
        
        documentDOM.clipCopy();
        documentDOM.exitEditMode();
        
        
        firstEle = documentDOM.selection[0x0];
        var _0x4d7edd = fl.Math.concatMatrix(eleMatrix, firstEle.matrix);
        documentDOM.clipPaste();
        _0x398e21.push(documentDOM.selection[0x0]);
        documentDOM.selection[0x0].matrix = _0x4d7edd;
        documentDOM.selection[0x0].setTransformationPoint(transformationPoint);
        documentDOM.selectNone();
        firstEle.selected = true;
        documentDOM.enterEditMode("inPlace");
        ele.selected = false;
    });
    firstEle.selected = false;
    _0x398e21.forEach(function (_0x172fbc) {
        _0x172fbc.selected = true;
    });
}