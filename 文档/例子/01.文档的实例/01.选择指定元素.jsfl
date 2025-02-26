// document.selection


// The following example assigns all elements on Frame 11 to the current selection (remember that index values are different from frame number values):
// 下面的例子将所有Frame 11上的元素分配给当前选择（请记住，索引值与帧号值不同）：
fl.getDocumentDOM().getTimeline().currentFrame = 10;
fl.getDocumentDOM().selection = fl
    .getDocumentDOM()
    .getTimeline().layers[0].frames[10].elements;