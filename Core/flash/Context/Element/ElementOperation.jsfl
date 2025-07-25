/**
 * @file: ElementOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 21:05
 * @project: AnJsflScript
 * @description:
 */

define([
    "ElementChecker",
    "LayerOperation",
    "LayerQuery",
    "ElementSelect",
    "satUtil",
    "SymbolNameGenerator",
    "Tips",
    "os",
    "loglevel",
    "SAT",
    "MoreElement",
    "DrawCircle"
], function (
    ec,
    lo,
    lq,
    es,
    satUtil,
    nameGenerator,
    Tips,
    os,
    log,
    SAT,
    MoreElement,
    dc
) {
    const { IsSymbol, IsGroup } = ec;
    const { deleteLayers } = lo;
    const { SelectAll, OnlySelectCurrent, SelectNone, InvertSelection } = es;
    const { splitRectangle } = satUtil;
    const { checkVariableRedeclaration } = Tips;

    const { generateNameUntilUnique, generateNameUseLast } = nameGenerator;
    const { getTopLeft, wrapSize, getOrigin } = SAT.GLOBALS;
    const { drawCircleWithoutLine } = dc;

    /**
     *  复制元件
     *  @param {Element} element 元件
     * @param {"ask"|"skip"|"auto"} mode 复制模式
     * ask：弹出输入框
     * skip：直接复制,系统自动生成名称    元件1 复制1
     * auto：自动生成名称，sng生成名称   newName_5555
     * @param {string} [newName=origionName] 新元件名称，仅在 mode 为 auto 时有效
     * @return {Item} 新元件名称
     */
    function CopySymbol(element, mode, newName) {
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

        if (mode === "ask") {
            // 4.重新命名元件名称
            // var {_, file_name} = pathSplit(targetName);
            var file_name = os.path.basename(targetName);
            var input_file_name = prompt("请输入新元件名称：", file_name);
            if (input_file_name === null || input_file_name === "") {
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
            var input_file_name = generateNameUntilUnique(newName);

            // 5.交换元件
            doc.swapElement(targetName);

            // 6.更新元件名称
            element.libraryItem.name = input_file_name;
        }

        return element.libraryItem;
    }

    /**
     * 完全的打散，转为形状
     * @param {Element} element
     * @note 完全的打散，如果某些素材，打包，并且在打包的地方  调整颜色，则会导致颜色丢失。
     *       原本的思路：转为位图，再打散为形状。但是，形状补间动画 无法正常工作。
     */
    function breakApartToShape(element) {
        var doc = fl.getDocumentDOM(); //文档
        var library = doc.library; //库文件

        if (!IsSymbol(element)) {
            log.error("请选择元件");
            return;
        }
        // OnlySelectCurrent(element);

        var MIDDLE_NAME = "完全分解-中转";

        CopySymbol(element, "auto", MIDDLE_NAME);
        doc.enterEditMode("inPlace");

        function convertSel2ShapeInner(selection) {
            SelectAll();
            // 不断的打散，直到全部转为形状
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

        library.deleteItem(nameGenerator.LastName);
    }

    /**
     * 完全的打散，转为  绘制对象
     * @param {Element} element
     * @note 完全的打散，如果某些素材，打包，并且在打包的地方  调整颜色，则会导致颜色丢失。
     */
    function breakApartToDrawingObject(element) {
        var doc = fl.getDocumentDOM(); //文档
        var library = doc.library; //库文件

        if (!IsSymbol(element)) {
            log.error("请选择元件");
            return;
        }
        // OnlySelectCurrent(element);

        var MIDDLE_NAME = "完全分解-中转";

        CopySymbol(element, "auto", MIDDLE_NAME);
        doc.enterEditMode("inPlace");

        function convertSel2ShapeInner(selection) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                SelectAll();

                var groups_and_symbols = doc.selection.filter(function (item) {
                    return (
                        (IsGroup(item) || IsSymbol(item)) && // effects:为了效果，必须排除影片剪辑，这样会有部分素材，有透明度的素材，不会石化，更加真实。
                        item.symbolType !== "movie clip"
                    );
                });
                // console.log('groups:', groups_and_symbols.length);

                SelectAll(groups_and_symbols);
                if (groups_and_symbols.length > 0) {
                    try {
                        doc.breakApart();
                    } catch (e) {
                        return;
                    }
                } else {
                    break;
                }
            }
        }

        convertSel2ShapeInner(doc.selection);

        doc.exitEditMode();

        doc.breakApart();

        library.deleteItem(nameGenerator.LastName);
    }

    /**
     * 把一个元件 分割成多个碎片。
     * @param {Element} element - 要分割的元件。
     * @param {string} SymbolName="碎片" - 元件的名称。
     * @bug 可能出现 doc.setSelectionRect 出错的情况，原因可能是 选择框对矩形坐标要求太苛刻，由于小数有误差，导致出错。这是能想到的目前切片的最简单方法，只能暂时用这个方法。可以更换位置尝试，目前测试 有概率出现，不是绝对的。
     */
    function splinterSymbol(element, SymbolName) {
        var doc = fl.getDocumentDOM(); //文档

        OnlySelectCurrent(element);

        log.info("转换位图");

        if (IsSymbol(doc.selection[0])) {
            doc.convertSelectionToBitmap();
        }

        // if (!this.IsBitmap(doc.selection[0])) {
        //     console.error('转换位图失败！！！');
        //     // throw new Error("转换位图失败！！！");
        //     return false;
        // }

        var symbolName = generateNameUntilUnique(SymbolName);
        doc.convertToSymbol("graphic", symbolName, "center");

        var worldTopLeft = getTopLeft(doc.selection[0]);
        // fl.trace("worldTopLeft:"+worldTopLeft);
        // var worldPos = wrapPosition(element);
        // fl.trace("worldPos:"+worldPos);

        doc.enterEditMode("inPlace");

        doc.breakApart();
        // 计算每个小块的尺寸
        var elementSize = wrapSize(element);
        var [blockWidth, blockHeight, blockCountX, blockCountY] =
            splitRectangle(elementSize);
        log.info(
            "blockWidth:" +
                blockWidth +
                " blockHeight:" +
                blockHeight +
                " blockCountX:" +
                blockCountX +
                " blockCountY:" +
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

                console.info("rect:" + j + "_" + i + " " + rect);
                // 选择小块
                doc.setSelectionRect(rect.toObj());

                doc.group();

                var baseName = SymbolName + "碎片-" + j + "-" + i + "_";
                var symbolName = generateNameUseLast(baseName);
                doc.convertToSymbol("graphic", symbolName, "center");
                // console.info('symbolName:' + symbolName);

                SelectNone();
            }
        }

        SelectAll();
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
            checkVariableRedeclaration(timeline, "timeline");
            var DELETE_LAYER_NAME = "图层";

            // 查找 名字中包含 "图层" 的 layer
            var findLayers = getLayersIndexByName(layers, DELETE_LAYER_NAME);
            log.info("findLayers:" + findLayers);

            // 删除图层
            deleteLayers(timeline, findLayers);
        }

        return true;
    }

    /**
     * 把一个空屏转为元件。
     * @param {string} symbolName - 元件的名称。
     */
    function convertToSymbolWithBlanks(symbolName) {
        var doc = fl.getDocumentDOM(); //文档

        // 技巧：在左上角 画 一个 20*20的圆形，然后可以将其转为元件，中心在舞台的左上角，相当于确定舞台位置。   相当于把一个空屏转为元件。
        // 编辑模式中,删除辅助的圆形
        drawCircleWithoutLine(getOrigin(), 20);

        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        SelectAll();

        doc.deleteSelection();

        doc.exitEditMode();
    }

    /**
     * 处理多个元素
     * @param {Element} element - 要处理的元素。
     * @param {function} processFunc - 处理函数。
     * @param {string} SymbolName="碎片" - 元件的名称。
     * @see:https://gitee.com/ninge/WindowSWF/tree/master/
     */
    function processElements(element, processFunc, SymbolName) {
        if (symbolName === undefined) symbolName = "碎片";

        var doc = fl.getDocumentDOM(); //文档
        var library = doc.library; //库文件

        if (!IsSymbol(element)) {
            log.error("请选择元件");
            return;
        }
        // OnlySelectCurrent(element);

        // var MIDDLE_NAME = "完全分解-中转";
        var symbolName = generateNameUntilUnique(SymbolName);
        CopySymbol(element, "auto", symbolName);

        doc.enterEditMode("inPlace");

        function convertSel2ShapeInner(selection) {
            SelectAll();

            var groups_and_symbols = selection.filter(function (item) {
                return (
                    (IsGroup(item) || IsSymbol(item)) && // effects:为了效果，必须排除影片剪辑，这样会有部分素材，有透明度的素材，不会石化，更加真实。
                    item.symbolType !== "movie clip"
                );
            });
            // console.log('groups:', groups_and_symbols.length);

            SelectAll(groups_and_symbols);
            if (groups_and_symbols.length > 0) {
                groups_and_symbols.forEach(function (item) {
                    // processFunc(item);
                    console.info("length:", groups_and_symbols.length);
                    OnlySelectCurrent(item);
                    doc.enterEditMode("inPlace");
                    SelectAll();
                    convertSel2ShapeInner(doc.selection);
                    doc.exitEditMode();
                });
            }

            // 选择非组元素
            SelectAll();
            InvertSelection(groups_and_symbols);

            // 处理非组元素
            var non_groups = doc.selection;
            processFunc(non_groups);
        }

        convertSel2ShapeInner(doc.selection);

        doc.exitEditMode();

        // doc.breakApart();

        // library.deleteItem(nameGenerator.LastName);
    }

    return {
        CopySymbol: CopySymbol,
        breakApartToShape: breakApartToShape,
        breakApartToDrawingObject: breakApartToDrawingObject,
        splinterSymbol: splinterSymbol,
        convertToSymbolWithBlanks: convertToSymbolWithBlanks,
        processElements: processElements
    };
});
