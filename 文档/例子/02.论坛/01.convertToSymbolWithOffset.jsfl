// https://community.adobe.com/t5/animate-discussions/set-custom-registration-point-with-jsfl/m-p/14644174
function convertToSymbolWithOffset(atype, aname, xoffset, yoffset) {
    var doc = fl.getDocumentDOM();
    if (doc.selection.length === 0) return;

    // Calculate custom offset from the top left
    doc.convertToSymbol(atype, aname, 'top left');
    xoffset *= -1;
    yoffset *= -1;

    doc.enterEditMode();

    doc.selectAll();
    doc.moveSelectionBy({ x: xoffset, y: yoffset });
    doc.selectNone();

    doc.exitEditMode();

    xoffset *= -1;
    yoffset *= -1;
    doc.moveSelectionBy({ x: xoffset, y: yoffset });

    doc.setTransformationPoint({ x: 0, y: 0 });
}

convertToSymbolWithOffset('graphic', 'TEST 1', 32, 32);

