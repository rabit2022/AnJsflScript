function changeHead() {
    var doc = an.getDocumentDOM();
    // var doc = doc;

    // 观察矩阵:viewMatrix用于将世界坐标系下的坐标转换到相机坐标系下。它代表了相机的位置和方向。
    // 具体来说，viewMatrix可以看作是相机在世界坐标系下的位姿矩阵的逆矩阵，
    // 也可以理解为世界坐标系在相机坐标系下的位姿矩阵
    // 这意味着，如果你有一个在世界坐标系下的点，通过乘以viewMatrix，你可以得到这个点在相机坐标系下的位置。
    // 相机在世界坐标系下的位姿矩阵的逆矩阵
    var worldViewMatrixAnti = doc.viewMatrix;
    LogMatrix(worldViewMatrixAnti);

    var firstElement = doc.selection[0x0];
    if (!firstElement) {
        fl.trace("未选择目标元素。");
        return;
        
    }
    
    // 将剪贴板的内容粘贴到文档中。
    doc.clipPaste(true);
    doc.deleteSelection();
    firstElement.selected = true;
    
    
    doc.enterEditMode("inPlace");
    // var doc = doc;
    doc.clipPaste(true);
    var firstElement1 = doc.selection[0x0];
    if (!firstElement1) {
        fl.trace("未选择有效的源元素。");
        return;
    }

    // 本地摄像机的逆矩阵
    var localViewMatrixAnti = doc.viewMatrix;
    LogMatrix(localViewMatrixAnti);
    
    // 一个矩阵的逆可以用来撤销该矩阵所代表的变换。
    // 例如，如果有一个变换矩阵（可能包含旋转、缩放、平移等），它的逆矩阵将包含相反的变换，可以用来恢复原始状态。
    // 本地摄像机的矩阵
    var localViewMatrix = fl.Math.invertMatrix(localViewMatrixAnti);//逆矩阵
    
    // 从一种坐标系到另一种坐标系的转换，然后立即撤销这个转换。
    // 计算一个点在不同坐标系之间的相对位置。
    // 例如，如果你有一个在世界坐标系下的点，通过乘以观察矩阵，你可以得到这个点在相机坐标系下的位置。
    // 然后，通过乘以逆观察矩阵，你可以将这个点转换回世界坐标系
    var worldMatrix = fl.Math.concatMatrix(worldViewMatrixAnti, localViewMatrix);//矩阵相乘
    var finalMatrix = fl.Math.concatMatrix(firstElement1.matrix, worldMatrix);
    LogMatrix(finalMatrix);
    
    firstElement1.matrix = finalMatrix;
    
    
    doc.exitEditMode();
}
changeHead();





