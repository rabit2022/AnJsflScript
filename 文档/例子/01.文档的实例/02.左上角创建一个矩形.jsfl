// The following example creates a rectangle in the upper left corner of the Stage and a text string underneath the rectangle. Then it selects both objects using [document.setSelectionRect()](../Document_object/docu9689.md) and adds them to the document.selection array. Finally, it displays the contents of document.selection in the Output panel.
// 下面的例子在舞台的左上角创建一个矩形，并在矩形下方创建一个文本字符串。
// 然后使用[document.setSelectionRect()](../Document_object/docu9689.md)选择这两个对象，
// 并将它们添加到document.selection数组中。最后，将document.selection的内容显示在输出面板中。
fl.getDocumentDOM().addNewRectangle(
    { left: 0, top: 0, right: 99, bottom: 99 },
    0
);
fl.getDocumentDOM().addNewText({
    left: -1,
    top: 117.3,
    right: 9.2,
    bottom: 134.6,
});
fl.getDocumentDOM().setTextString('Hello World');
fl.getDocumentDOM().setSelectionRect({
    left: -28,
    top: -22,
    right: 156.0,
    bottom: 163,
});
var theSelectionArray = fl.getDocumentDOM().selection;
for (var i = 0; i < theSelectionArray.length; i++) {
    fl.trace(
        'fl.getDocumentDOM().selection[' + i + '] = ' + theSelectionArray[i]
    );
}
