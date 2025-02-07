/**
 * @file: Ele.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:27
 * @project: AnJsflScript
 * @description:
 */
define(["SAT","satUtil","libUtil","moreElement","layerUtil","os","selection"],
    function (sat,satUtil, libUtil, me, layerUtil, os, sel) {
    var Vector = sat.V;
    var wrapRect =sat.GLOBALS.wrapRect;
    var wrapPosition = sat.GLOBALS.wrapPosition;
    var wrapSize = sat.GLOBALS.wrapSize;
    var getOrigin = sat.GLOBALS.getOrigin;
    var getTopLeft = sat.GLOBALS.getTopLeft;

    var wrapMoreElement=me.GLOBALS.wrapMoreElement;
    var rectUtil=satUtil.RectUtil;
    
    /**
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
            var file_name = os.path.basename(targetName);
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
            var input_file_name = libUtil.generateNameUntilUnique(file_name + "_复制_");

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
        var maxTopRight = new Vector(0, 0);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            sel.OnlySelectCurrent(element);
            var rect = wrapRect(doc.getSelectionRect());
            var topRight = rect.getCorner("top right");

            if (topRight.IsInDirectionOf(maxTopRight, "top right")) {
                maxElement = element;
                maxTopRight = topRight;
            }
        }
        return maxElement;
    }

    /**
     * 重置注册点-editor
     * @param {Vector} transformationPoint 形变点
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
            sel.OnlySelectCurrent(element);

            doc.moveSelectionBy(transformationPoint.neg().toObj());
            // doc.selectNone();
            sel.SelectNone();
        }

        doc.exitEditMode();
    }

    /**
     * 重置注册点
     * 1，新的注册点 是 原来的 变形点 </br>
     * 2，经常配合 {@link Ele.setTransformationPoint} 使用 </br>
     * 3，如果没有设置变形点，一般来说，元件的默认的变形点就是  中心点 </br>
     * @param {Element} element 元素
     * @deprecated 请使用  doc.convertToSymbol("graphic", symbolName, "center"); 提前设置好元件的注册点</br>
     *             请使用  element.setTransformationPoint(getZeroPoint().toObj());  把元件的变形点设置为 注册点 </br>
     *             这个方法尽量不要使用，因为它会让 元件的注册点 发生变化，导致  设置位置时，出现偏差 </br>
     */
    Ele.prototype.resetRegisterPoint = function (element) {
        var trPoint = wrapPosition(element.getTransformationPoint());

        sel.OnlySelectCurrent(element);

        // 重置注册点
        this.resetRegisterPointWrap(trPoint);

        sel.OnlySelectCurrent(element);

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
    Ele.prototype.setTransformationPoint = function (element, whichCorner) {
        // 变形点 到右上角
        var registerPoint = wrapPosition(element);

        sel.OnlySelectCurrent(element);
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
     * @bug 可能出现 doc.setSelectionRect 出错的情况，原因可能是 选择框对矩形坐标要求太苛刻，由于小数有误差，导致出错。这是能想到的目前切片的最简单方法，只能暂时用这个方法。可以更换位置尝试，目前测试 有概率出现，不是绝对的。
     */
    Ele.prototype.splinterSymbol = function (element, SymbolName) {
        var doc = fl.getDocumentDOM();//文档

        doc.convertSelectionToBitmap()

        var symbolName = libUtil.generateNameUntilUnique(SymbolName);
        doc.convertToSymbol('graphic', symbolName, 'center');

        var worldTopLeft = getTopLeft(doc.selection[0]);
        // fl.trace("worldTopLeft:"+worldTopLeft);
        // var worldPos = wrapPosition(element);
        // fl.trace("worldPos:"+worldPos);

        doc.enterEditMode("inPlace");

        doc.breakApart();
        // 计算每个小块的尺寸    
        var elementSize = wrapSize(element);
        var [blockWidth, blockHeight, blockCountX, blockCountY] = rectUtil.splitRectangle(elementSize);
        // fl.trace("blockWidth:"+blockWidth+" blockHeight:"+blockHeight+" blockCountX:"+blockCountX+" blockCountY:"+blockCountY);

        var moreElement = wrapMoreElement(worldTopLeft.x, worldTopLeft.y, blockWidth, blockHeight);
        // print("moreElement:" + moreElement.toString());
        for (var i = 0; i < blockCountX; i++) {
            for (var j = 0; j < blockCountY; j++) {
                var rect = moreElement.NeatRect(i, j);

                fl.trace("rect:" + j + "_" + i + " " + rect);
                // 选择小块
                doc.setSelectionRect(rect.toObj());

                doc.group();

                var symbolName = libUtil.generateNameUseLast(SymbolName + "碎片-" + j + "-" + i + "_");
                doc.convertToSymbol('graphic', symbolName, 'center');
                sel.SelectNone();
            }
        }

        sel.SelectAll();
        //分散到图层操作
        doc.distributeToLayers();
        // 删除多余的碎片
        var timeline = doc.getTimeline();
        var layers = timeline.layers;//图层

        ele.splinterDeleter(timeline, layers);

        doc.exitEditMode();
    }

    /**
     * 删除多余的碎片
     * @param {Timeline} timeline - 时间轴。
     * @param {Array.<Layer>} layers 图层数组
     * @private
     */
    Ele.prototype.splinterDeleter = function (timeline, layers) {
        var DELETE_LAYER_NAME = "图层";

        // 查找 名字中包含 "图层" 的 layer
        var findLayers = layerUtil.getLayersIndexByName(layers, DELETE_LAYER_NAME);

        // 删除图层
        layerUtil.deleteLayers(timeline, findLayers);
    }


    var ele = new Ele();
    return ele;
});