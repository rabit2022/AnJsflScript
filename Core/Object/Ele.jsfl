/**
 * @file: Ele.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:27
 * @project: AnJsflScript
 * @description:
 */


/**
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
 * @private
 */
Ele.prototype.findDuplicateNameInLib = function (baseName) {
    var library = fl.getDocumentDOM().library;

    var items = library.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === baseName) {
            return true;
        }
    }
    return false;
}

/**
 * 生成一个唯一的名称，基于传入的基础名称，并确保其在 library 中是唯一的。
 * 在 后面 加上 随机数，确保名称的唯一性。
 * @param {string} baseName - 用于生成唯一名称的基础字符串。
 * @returns {string} 返回一个唯一的名称。
 */
Ele.prototype.generateNameUntilUnique = function (baseName) {
    this.lastCount = random.getPaddingNum(3);
    var name = baseName + "" + this.lastCount;

    var count = 0;
    while (this.findDuplicateNameInLib(name)) {
        this.lastCount = random.getPaddingNum(3);
        name = baseName + "" + this.lastCount;

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
    var name = baseName + "" + this.lastCount;
    while (this.findDuplicateNameInLib(name)) {
        var info0 = "lastCount:" + this.lastCount + " 重复了！";
        this.lastCount = random.getPaddingNum(3);
        var info1 = "已经重新生成了新的名称！" + " lastCount:" + this.lastCount;
        name = baseName + "" + this.lastCount;
        fl.trace(info0 + info1);
    }
    return name;
}

/**
 *  复制元件
 *  @param {Element} element 元件
 * @param {"ask"|"skip"|"auto"} mode 复制模式，ask：弹出输入框，skip：直接复制，auto：自动生成名称
 * @constructor
 */
Ele.prototype.CopySymbol = function (element, mode) {
    var doc = fl.getDocumentDOM();
    var library = doc.library;//库文件

    // 1.清空选择
    library.selectNone();

    // 2.直接复制元件
    var origionName = element.libraryItem.name;
    library.duplicateItem(origionName);

    // 3.获取新元件名称
    var targetName = library.getSelectedItems()[0].name;

    if (mode === "ask") {
        // 4.重新命名元件名称
        // var {_, file_name} = pathSplit(targetName);
        var file_name = osPath.basename(targetName);
        var input_file_name = prompt("请输入新元件名称：", file_name);
        if (input_file_name == null || input_file_name === "") {
            alert("元件名称不能为空！");
            library.deleteItem(targetName);
            return;
        }

        // 5.交换元件
        doc.swapElement(targetName);

        // 6.更新元件名称
        element.libraryItem.name = input_file_name;
    } else if (mode === "skip") {
        // 5.交换元件
        doc.swapElement(targetName);
    } else if (mode === "auto") {
        var input_file_name = this.generateNameUntilUnique(file_name + "_复制_");

        // 5.交换元件
        doc.swapElement(targetName);

        // 6.更新元件名称
        element.libraryItem.name = input_file_name;
    }
}

/**
 * 获取最右边的元素
 * @param {Element[]} elements 元素数组
 * @returns {Element}
 */
Ele.prototype.getMaxRight = function (elements) {
    var doc = fl.getDocumentDOM();

    // 获取最右边的元素
    var maxElement = elements[0];
    var maxTopRight = new Point(0, 0);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        OnlySelectCurrent(element);
        var rect = wrapRect(doc.getSelectionRect());
        var topRight = rect.getCorner("top right");

        if (topRight.IsAtDirection(maxTopRight, "top right")) {
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
    var doc = fl.getDocumentDOM();
    doc.enterEditMode('inPlace');
    doc.selectAll();

    // 获取所有元件
    var selection1 = doc.selection;
    for (var i = 0; i < selection1.length; i++) {
        var element = selection1[i];
        // 选中当前元件
        OnlySelectCurrent(element);

        doc.moveSelectionBy(transformationPoint.neg().toObj());
        // doc.selectNone();
        SelectNone();
    }

    doc.exitEditMode();
}

/**
 * 重置注册点
 * 1，新的注册点 是 原来的 变形点 </br>
 * 2，经常配合 {@link Ele.alterTransformationPoint} 使用 </br>
 * 3，如果没有设置变形点，一般来说，元件的默认的变形点就是  中心点 </br>
 * @param {Element} element 元素
 * @deprecated 请使用  doc.convertToSymbol("graphic", symbolName, "center"); 提前设置好元件的注册点</br>
 *             请使用  element.setTransformationPoint(getZeroPoint().toObj());  把元件的变形点设置为 注册点 </br>
 *             这个方法尽量不要使用，因为它会让 元件的注册点 发生变化，导致  设置位置时，出现偏差 </br>
 */
Ele.prototype.resetRegisterPoint = function (element) {
    var trPoint = wrapPosition(element.getTransformationPoint());

    OnlySelectCurrent(element);

    // 重置注册点
    this.resetRegisterPointWrap(trPoint);

    OnlySelectCurrent(element);

    // 设置形变点为注册点
    element.setTransformationPoint(getOrigin().toObj());
    var doc = fl.getDocumentDOM();
    doc.moveSelectionBy(trPoint.toObj());
}

/**
 * 更改元件的变形点
 * @param {Element} element
 * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"} whichCorner
 */
Ele.prototype.alterTransformationPoint = function (element, whichCorner) {
    // 变形点 到右上角
    var registerPoint = wrapPosition(element);

    OnlySelectCurrent(element);
    var doc = fl.getDocumentDOM();
    var rect = wrapRect(doc.getSelectionRect());
    var topRight = rect.getCorner(whichCorner)

    // 相对位置
    var relativePoint = topRight.sub(registerPoint);
    element.setTransformationPoint(relativePoint.toObj());
}

/**
 * 把一个元件 分割成多个碎片。
 * @param {Element} element - 要分割的元件。
 * @param {string} SymbolName="碎片" - 元件的名称。
 */
Ele.prototype.splinterSymbol=function(element,SymbolName) {
    var doc = fl.getDocumentDOM();//文档

    doc.convertSelectionToBitmap()

    var symbolName = ele.generateNameUntilUnique(SymbolName);
    doc.convertToSymbol('graphic', symbolName, 'center');

    var worldTopLeft = getTopLeft(doc.selection[0]);

    doc.enterEditMode("inPlace");

    doc.breakApart();
    // 计算每个小块的尺寸    
    var [blockWidth, blockHeight, blockCountX, blockCountY] = rectUtil.splitRectangle(element.width, element.height);
    // fl.trace("blockWidth:"+blockWidth+" blockHeight:"+blockHeight+" blockCountX:"+blockCountX+" blockCountY:"+blockCountY);

    for (var i = 0; i < blockCountX; i++) {
        for (var j = 0; j < blockCountY; j++) {
            var rect = wrapRectByTopLeft(i * blockWidth, j * blockHeight, blockWidth, blockHeight);

            // 转换为世界坐标
            rect = rect.addOffset(worldTopLeft)
            // fl.trace("rect:" + j + "_" + i + " " + rect);
            // fl.trace("rect:" + j + "_" + i + " " + rect);
            doc.setSelectionRect(rect.toObj());

            doc.group();

            // fl.trace("group:" + j + "_" + i);
            var symbolName = ele.generateNameUseLast(SymbolName + "碎片-" + j + "-" + i + "_");
            doc.convertToSymbol('graphic', symbolName, 'center');
            SelectNone();
        }
    }

    SelectAll();
    //分散到图层操作
    doc.distributeToLayers();
    // 删除多余的碎片
    ele.splinterDeleter();
    doc.exitEditMode();
}

/**
 * 删除多余的碎片
 * @private
 */
Ele.prototype.splinterDeleter=function() {
    // 查找 名字中包含 "图层" 的 layer
    var doc = fl.getDocumentDOM();
    
    var findLayers=layerUtil.getLayersIndexByName("图层");
    // LogArray(findLayers);
    
    // 删除图层
    layerUtil.deleteLayers(findLayers);
}



var ele = new Ele();
