/**
 * @file: elementUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:27
 * @project: AnJsflScript
 * @description:
 */

define([
    'SAT',
    'satUtil',
    'libUtil',
    'layerUtil',
    'os',
    'selectionUtil',
    'loglevel',
    'moreElement'
], function(sat, satUtil, libUtil, layerUtil, os, sel, log, MoreElement) {
    var Vector = sat.V,
        Rectangle = sat.R,
        wrapPosition = sat.GLOBALS.wrapPosition,
        wrapSize = sat.GLOBALS.wrapSize,
        getOrigin = sat.GLOBALS.getOrigin,
        getTopLeft = sat.GLOBALS.getTopLeft;
    // console.log(sel);

    var rectUtil = satUtil.RectUtil;
    const { SelectAll, OnlySelectCurrent } = sel;

    /**
     * @class {ElementUtil}
     * @constructor
     */
    var ElementUtil = function() {
    };

    ElementUtil.IsGroup = function(element) {
        return element && element.isGroup;
    };

    /**
     * 判断是否是 元件
     * @param {Element} element 元素
     * @returns {boolean} 是否是 元件
     */
    ElementUtil.IsSymbol = function(element) {
        return (
            // 非空元素，非组
            !ElementUtil.IsGroup(element) &&
            // instance+symbol  或者  symbolType
            ((element.elementType === 'instance' && element.instanceType === 'symbol') ||
                element.symbolType !== undefined)
        );
    };

    /**
     * 判断是否是 位图
     * @param {Element} element 元素
     * @returns {boolean} 是否是 位图
     */
    ElementUtil.IsBitmap = function(element) {
        return (
            !ElementUtil.IsGroup(element) &&
            element.elementType === 'instance' &&
            element.instanceType === 'bitmap'
        );
    };
    /**
     * 判断是否是 形状
     * @param {Element} element 元素
     * @param {boolean} [strict=false] 是否严格判断，严格判断时，子类 绘制对象 等 都不算形状
     * @returns {boolean} 是否是 形状
     */
    ElementUtil.IsShape = function(element, strict) {
        if (strict === undefined) strict = false;

        var isShape = !ElementUtil.IsGroup(element) &&
            element.elementType === 'shape';
        var isChildren;
        if (strict) {
            isChildren = ElementUtil.IsDrawingObject(element);
        }
        return isShape && !isChildren;
    };
    ElementUtil.IsDrawingObject = function(element) {
        return (
            !ElementUtil.IsGroup(element) &&
            (element.elementType === 'shapeObj' || element.isDrawingObject));
    };

    /**
     * 获取element的名称
     * @param {Element} element 元素
     * @returns {string} 名称
     */
    ElementUtil.getName = function(element) {
        if (element.elementType === 'instance') {
            return element.libraryItem.name;
        } else {
            return element.name;
        }
    };

    /**
     *  复制元件
     *  @param {Element} element 元件
     * @param {'ask'|'skip'|'auto'} mode 复制模式，ask：弹出输入框，skip：直接复制，auto：自动生成名称
     * @param {string} [newName=origionName] 新元件名称，仅在 mode 为 auto 时有效
     * @constructor
     */
    ElementUtil.CopySymbol = function(element, mode, newName) {
        var doc = fl.getDocumentDOM();
        var library = doc.library; //库文件

        // 1.清空选择
        library.selectNone();

        // 2.直接复制元件
        var origionName = element.libraryItem.name;
        library.duplicateItem(origionName);

        if (newName === undefined) {
            newName = origionName;
        }

        // 3.获取新元件名称
        var targetName = library.getSelectedItems()[0].name;

        if (mode === 'ask') {
            // 4.重新命名元件名称
            // var {_, file_name} = pathSplit(targetName);
            var file_name = os.path.basename(targetName);
            var input_file_name = prompt('请输入新元件名称：', file_name);
            if (input_file_name == null || input_file_name === '') {
                alert('元件名称不能为空！');
                library.deleteItem(targetName);
                return;
            }

            // 5.交换元件
            doc.swapElement(targetName);

            // 6.更新元件名称
            element.libraryItem.name = input_file_name;
        } else if (mode === 'skip') {
            // 5.交换元件
            doc.swapElement(targetName);
        } else if (mode === 'auto') {
            var input_file_name = libUtil.generateNameUntilUnique(newName);

            // 5.交换元件
            doc.swapElement(targetName);

            // 6.更新元件名称
            element.libraryItem.name = input_file_name;
        }
    };

    /**
     * 获取最右边的元素
     * @param {Element[]} elements 元素数组
     * @returns {Element}
     */
    ElementUtil.getMaxRight = function(elements) {
        function getTopRight(element) {
            var rect = new Rectangle(element);
            return rect.getCorner('top right');
        }

        // 获取最右边的元素
        var maxElement = elements[0];
        var maxTopRight = getTopRight(maxElement);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var topRight = getTopRight(element);
            // print("topRight:" + topRight.toString())
            // print("maxTopRight:" + maxTopRight.toString())
            if (topRight.IsInDirectionOf(maxTopRight, 'top right')) {
                maxElement = element;
                maxTopRight = topRight;
            }
        }
        return maxElement;
    };

    /**
     * 重置注册点
     * 1，新的注册点 是 原来的 变形点 </br>
     * 2，经常配合 {@link ElementUtil.setTransformationPoint} 使用 </br>
     * 3，如果没有设置变形点，一般来说，元件的默认的变形点就是  中心点 </br>
     * @param {Element} element 元素
     * @deprecated 请使用  doc.convertToSymbol("graphic", symbolName, "center"); 提前设置好元件的注册点</br>
     *             请使用  element.setTransformationPoint(getZeroPoint().toObj());  把元件的变形点设置为 注册点 </br>
     *             这个方法尽量不要使用，因为它会让 元件的注册点 发生变化，导致  设置位置时，出现偏差 </br>
     */
    ElementUtil.resetRegisterPoint = function(element) {
        var trPoint = wrapPosition(element.getTransformationPoint());

        sel.OnlySelectCurrent(element);

        // 重置注册点
        resetRegisterPointWrap(trPoint);

        sel.OnlySelectCurrent(element);

        // 设置形变点为注册点
        element.setTransformationPoint(getOrigin().toObj());

        var doc = fl.getDocumentDOM();
        doc.moveSelectionBy(trPoint.reverse().toObj());

        /**
         * 重置注册点-editor
         * @param {Vector} transformationPoint 形变点
         */
        function resetRegisterPointWrap(transformationPoint) {
            var doc = fl.getDocumentDOM();
            doc.enterEditMode('inPlace');
            doc.selectAll();

            // 获取所有元件
            var selection = doc.selection;
            for (var i = 0; i < selection.length; i++) {
                var element = selection[i];
                // 选中当前元件
                sel.OnlySelectCurrent(element);

                doc.moveSelectionBy(transformationPoint.reverse().toObj());

                sel.SelectNone();
            }

            doc.exitEditMode();
        }
    };

    /**
     * 更改元件的变形点
     * @param {Element} element
     * @param {'top right'|'top left'|'bottom right'|'bottom left'|'top center'|'right center'|'bottom center'|'left center'} whichCorner
     */
    ElementUtil.setTransformationPoint = function(element, whichCorner) {
        // 变形点 到右上角
        var registerPoint = wrapPosition(element);

        sel.OnlySelectCurrent(element);
        var doc = fl.getDocumentDOM();
        var rect = new Rectangle(doc.getSelectionRect());
        var topRight = rect.getCorner(whichCorner);

        // 相对位置
        var relativePoint = topRight.clone().sub(registerPoint);
        element.setTransformationPoint(relativePoint.toObj());
    };

    /**
     * 把一个元件 分割成多个碎片。
     * @param {Element} element - 要分割的元件。
     * @param {string} SymbolName="碎片" - 元件的名称。
     * @bug 可能出现 doc.setSelectionRect 出错的情况，原因可能是 选择框对矩形坐标要求太苛刻，由于小数有误差，导致出错。这是能想到的目前切片的最简单方法，只能暂时用这个方法。可以更换位置尝试，目前测试 有概率出现，不是绝对的。
     */
    ElementUtil.splinterSymbol = function(element, SymbolName) {
        var doc = fl.getDocumentDOM(); //文档

        sel.OnlySelectCurrent(element);

        log.info('转换位图');

        if (this.IsSymbol(doc.selection[0])) {
            doc.convertSelectionToBitmap();
        }

        // if (!this.IsBitmap(doc.selection[0])) {
        //     console.error('转换位图失败！！！');
        //     // throw new Error("转换位图失败！！！");
        //     return false;
        // }

        var symbolName = libUtil.generateNameUntilUnique(SymbolName);
        doc.convertToSymbol('graphic', symbolName, 'center');

        var worldTopLeft = getTopLeft(doc.selection[0]);
        // fl.trace("worldTopLeft:"+worldTopLeft);
        // var worldPos = wrapPosition(element);
        // fl.trace("worldPos:"+worldPos);

        doc.enterEditMode('inPlace');

        doc.breakApart();
        // 计算每个小块的尺寸
        var elementSize = wrapSize(element);
        var [blockWidth, blockHeight, blockCountX, blockCountY] =
            rectUtil.splitRectangle(elementSize);
        log.info(
            'blockWidth:' +
            blockWidth +
            ' blockHeight:' +
            blockHeight +
            ' blockCountX:' +
            blockCountX +
            ' blockCountY:' +
            blockCountY
        );

        var moreElement = new MoreElement({
            x: worldTopLeft.x,
            y: worldTopLeft.y,
            width: blockWidth,
            height: blockHeight
        });
        // print("moreElement:" + moreElement.toString());
        for (var i = 0; i < blockCountX; i++) {
            for (var j = 0; j < blockCountY; j++) {
                var rect = moreElement.NeatRect(i, j);

                console.info('rect:' + j + '_' + i + ' ' + rect);
                // 选择小块
                doc.setSelectionRect(rect.toObj());

                doc.group();

                var baseName = SymbolName + '碎片-' + j + '-' + i + '_';
                var symbolName = libUtil.generateNameUseLast(baseName);
                doc.convertToSymbol('graphic', symbolName, 'center');
                // console.info('symbolName:' + symbolName);

                sel.SelectNone();
            }
        }

        sel.SelectAll();
        //分散到图层操作
        doc.distributeToLayers();
        // 删除多余的碎片
        var timeline = doc.getTimeline();
        var layers = timeline.layers; //图层

        splinterDeleter(timeline, layers);

        doc.exitEditMode();

        /**
         * 删除多余的碎片
         * @param {Timeline} timeline - 时间轴。
         * @param {Array.<Layer>} layers 图层数组
         * @private
         */
        function splinterDeleter(timeline, layers) {
            var DELETE_LAYER_NAME = '图层';

            // 查找 名字中包含 "图层" 的 layer
            var findLayers = layerUtil.getLayersIndexByName(layers, DELETE_LAYER_NAME);
            log.info('findLayers:' + findLayers);

            // 删除图层
            layerUtil.deleteLayers(timeline, findLayers);
        }

        return true;
    };

    /**
     * 播放一次
     * @param {Element[]} elements 元素数组
     */
    ElementUtil.playOnce = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (this.IsSymbol(element)) {
                element.loop = 'play once';
            }
        }
    };

    /**
     * 完全的打散，转为形状
     * @param {Element} element
     * @note 完全的打散，如果某些素材，打包，并且在打包的地方  调整颜色，则会导致颜色丢失。
     *       原本的思路：转为位图，再打散为形状。但是，形状补间动画 无法正常工作。
     */
    ElementUtil.breakApartToShape = function(element) {
        var doc = fl.getDocumentDOM(); //文档
        var library = doc.library; //库文件

        if (!this.IsSymbol(element)) {
            log.error('请选择元件');
            return;
        }
        // sel.OnlySelectCurrent(element);

        var MIDDLE_NAME = '完全分解-中转';

        this.CopySymbol(element, 'auto', MIDDLE_NAME);
        doc.enterEditMode('inPlace');

        function convertSel2ShapeInner(selection) {
            // sel.SelectAll();
            // try {
            //     doc.breakApart();
            // } catch (e) {
            //     return;
            // }
            //
            // var isAllShape = selection.every(function(item) {
            //     return ElementUtil.IsShape(item);
            // });
            // if (isAllShape) {
            //     return;
            // } else {
            //     convertSel2ShapeInner(doc.selection);
            // }
            SelectAll();
            while (doc.selection.length > 0) {
                try {
                    doc.breakApart();
                } catch (e) {
                    return;
                }
            }
        }

        convertSel2ShapeInner(doc.selection);

        doc.exitEditMode();

        doc.breakApart();

        library.deleteItem(libUtil.LastName);
    };

    return ElementUtil;
});
