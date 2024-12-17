/**
 * @file: Ele.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:27
 * @project: WindowSWF-master
 * @description:
 */


/**
 * 判断是否是元素
 * @class {Ele}
 * @constructor
 */
var Ele = function () {
}

/**
 * 判断是否是 元件
 * @param {Element} element 元素
 * @returns {boolean} 是否是 元件
 */
Ele.prototype.IsSymbol = function (element) {
    return element.elementType === "instance" && element.instanceType === "symbol";
}


/**
 * 查找是否有重复名称
 * @param {string} baseName 元件名称
 * @returns {boolean} 是否有重复名称
 */
Ele.prototype.findDuplicateNameInLib=function(baseName) {
    var items = library.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === baseName) {
            return true;
        }
    }
    return false;
}


/**
 *  复制元件
 * @param {"ask"|"skip"|"auto"} mode 复制模式，ask：弹出输入框，skip：直接复制，auto：自动生成名称
 * @constructor
 */
Ele.prototype.CopySymbol=function (mode) {
    // 1.清空选择
    library.selectNone();

    // 2.直接复制元件
    var origionName = selection[0].libraryItem.name;
    library.duplicateItem(origionName);

    // 3.获取新元件名称
    var targetName = library.getSelectedItems()[0].name;
    var {_, file_name}=pathSplit(targetName);

    if (mode==="ask") {
        // 4.重新命名元件名称
        var input_file_name = prompt("请输入新元件名称：", file_name);
        if (input_file_name == null || input_file_name === "") {
            alert("元件名称不能为空！");
            library.deleteItem(targetName);
            return;
        }
        
        // 5.交换元件
        doc.swapElement(targetName);

        // 6.更新元件名称
        selection[0].libraryItem.name = input_file_name;
    }else if (mode==="skip"){
        // 5.交换元件
        doc.swapElement(targetName);
    }else if (mode==="auto"){
        var input_file_name = "复制" + count+" "+file_name;

        // 4.判断是否有重复名称
        while (this.findDuplicateNameInLib(input_file_name)) {
            count++;
            input_file_name = "复制" + count+" "+file_name;
        }

        // 5.交换元件
        doc.swapElement(targetName);

        // 6.更新元件名称
        selection[0].libraryItem.name = input_file_name;
    }
}


/**
 * 获取最右边的元素
 * @returns {Element}
 */
Ele.prototype.getMaxRight=function() {
    // 获取最右边的元素
    var maxElement = selection[0];
    var maxTopRight = new Point(0, 0);
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];

        onlySelectCurrent(element);
        var rect = wrapRect(doc.getSelectionRect());
        var topRight = new Point(rect.right, rect.top);

        if (topRight.greater(maxTopRight)) {
            maxElement = element;
            maxTopRight = topRight;
        }
    }
    return maxElement;
}

/**
 * 重置注册点-editor 
 * @param {Point} transformationPoint 形变点
 * @private
 */
Ele.prototype.resetRegisterPointWrap=function(transformationPoint){
    doc.enterEditMode('inPlace');
    doc.selectAll();

    // 获取所有元件
    var selection1 = doc.selection;
    for (var i = 0; i < selection1.length; i++) {
        var element = selection1[i];
        // 选中当前元件
        onlySelectCurrent(element);

        // doc.group();
        doc.moveSelectionBy(transformationPoint.neg().toObj());
        // doc.unGroup();
        doc.selectNone();
    }

    doc.exitEditMode();
}

/**
 * 重置注册点
 * @param {Element} element 元素
 */
Ele.prototype.resetRegisterPoint=function(element) {
    var trPoint = wrapPoint(element.getTransformationPoint());

    onlySelectCurrent(element);

    // 重置注册点
    this.resetRegisterPointWrap(trPoint);

    onlySelectCurrent(element);

    // 设置形变点为注册点
    element.setTransformationPoint(getZeroPoint().toObj());
    doc.moveSelectionBy(trPoint.toObj());

    doc.selectNone();
}


/**
 * 
 * @type {Ele}
 */
var ele = new Ele();
