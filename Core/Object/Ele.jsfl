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
    this.lastCount = "000";
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
Ele.prototype.findDuplicateNameInLib = function (baseName) {
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
Ele.prototype.CopySymbol = function (mode) {
    // 1.清空选择
    library.selectNone();

    // 2.直接复制元件
    var origionName = selection[0].libraryItem.name;
    library.duplicateItem(origionName);

    // 3.获取新元件名称
    var targetName = library.getSelectedItems()[0].name;

    if (mode === "ask") {
        // 4.重新命名元件名称
        var {_, file_name} = pathSplit(targetName);
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
    } else if (mode === "skip") {
        // 5.交换元件
        doc.swapElement(targetName);
    } else if (mode === "auto") {
        var input_file_name = this.generateNameUntilUnique(file_name+"复制");

        // 5.交换元件
        doc.swapElement(targetName);

        // 6.更新元件名称
        selection[0].libraryItem.name = input_file_name;
    }
}

/**
 * 生成一个唯一的名称，基于传入的基础名称，并确保其在 library 中是唯一的。
 * 在 后面 加上 随机数，确保名称的唯一性。
 * @param {string} baseName - 用于生成唯一名称的基础字符串。
 * @returns {string} 返回一个唯一的名称。
 */
Ele.prototype.generateNameUntilUnique = function (baseName) {
    this.lastCount = getRandom3();
    var name = baseName + "_" + this.lastCount;

    var count = 0;
    while (this.findDuplicateNameInLib(name)) {
        this.lastCount = getRandom3();
        name = baseName + "_" + this.lastCount;

        count++;
        if (count > 10) {
            throw new Error("已经尝试了 10 次，仍然无法生成唯一的名称！");
        }
    }
    return name;
}

/**
 * 生成一个唯一的名称，基于传入的基础名称，并确保其在 library 中是唯一的。
 * 使用上一次生成的随机数，确保名称的唯一性。
 * @param {string} baseName - 用于生成唯一名称的基础字符串。
 * @returns {string} 返回一个唯一的名称。
 */
Ele.prototype.generateNameUseLast = function (baseName) {
    var name = baseName + "_" + this.lastCount;
    while (this.findDuplicateNameInLib(name)) {
        var info0 = "lastCount:" + this.lastCount + " 重复了！";
        this.lastCount = getRandom3()
        var info1 = "已经重新生成了新的名称！" + " lastCount:" + this.lastCount;
        name = baseName + "_" + this.lastCount;
        fl.trace(info0 + info1);
    }
    return name;
}


/**
 * 获取最右边的元素
 * @param {Element[]} elements 元素数组
 * @returns {Element}
 */
Ele.prototype.getMaxRight = function (elements) {
    // 获取最右边的元素
    var maxElement = elements[0];
    var maxTopRight = new Point(0, 0);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        onlySelectCurrent(element);
        var rect = wrapRect(doc.getSelectionRect());
        var topRight = rect.getCorner("top right");

        if (topRight.IsAtDirection(maxTopRight,"top right")) {
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
Ele.prototype.resetRegisterPointWrap = function (transformationPoint) {
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
 * 1，新的注册点 是 原来的 变形点 </br>
 * 2，经常配合 {@link Ele.alterTransformationPoint} 使用 </br>
 * 3，如果没有设置变形点，一般来说，元件的默认的变形点就是  中心点 </br>
 * @param {Element} element 元素
 */
Ele.prototype.resetRegisterPoint = function (element) {
    var trPoint = wrapPoint(element.getTransformationPoint());

    onlySelectCurrent(element);

    // 重置注册点
    this.resetRegisterPointWrap(trPoint);

    onlySelectCurrent(element);

    // 设置形变点为注册点
    element.setTransformationPoint(getZeroPoint().toObj());
    doc.moveSelectionBy(trPoint.toObj());

    // doc.selectNone();
}


/**
 * 更改元件的变形点
 * @param {Element} element
 * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"} whichCorner
 */
Ele.prototype.alterTransformationPoint = function (element, whichCorner) {
    // 变形点 到右上角
    var registerPoint = wrapPoint(element);

    onlySelectCurrent(element);
    var rect = wrapRect(doc.getSelectionRect());
    var topRight = rect.getCorner(whichCorner)

    // 相对位置
    var relativePoint = topRight.sub(registerPoint);
    element.setTransformationPoint(relativePoint.toObj());
}

/**
 *
 * @type {Ele}
 */
var ele = new Ele();
