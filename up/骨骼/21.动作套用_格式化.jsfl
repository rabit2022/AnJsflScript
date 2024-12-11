initBodyData();
function initBodyData() {
    var doc = fl.getDocumentDOM();
    var selection = doc.selection;
    if (selection.length !== 0x1) {
        alert("初始必须选择身体元件");
        return;
    }
    
    var firstElement = selection[0x0];
    firstElement.libraryItem.addData("name", 'string', '身体');
    
    doc.selectAll();
    firstElement.selected = false;
    
    // 按照 firstElement 的 x 坐标分组
    // var selection1 = doc.selection;
    var leftElements = [];
    var rightElements = [];
    selection.forEach(function (ele) {
        if (ele.x < firstElement.x) {
            leftElements.push(ele);
        }
        if (ele.x >= firstElement.x) {
            rightElements.push(ele);
        }
    });
    doc.selectNone();
    
    // 按照 y 坐标排序
    rightElements.sort(function (e1, e2) {
        return e1.y - e2.y;
    });
    leftElements.sort(function (_0x2ddd02, _0x44c688) {
        return _0x2ddd02.y - _0x44c688.y;
    });
    
    // 添加 name 属性
    rightElements[0x0].libraryItem.addData("name", 'string', "左大臂");
    rightElements[0x1].libraryItem.addData("name", "string", "左小臂");
    rightElements[0x2].libraryItem.addData("name", 'string', '左手');
    rightElements[0x3].libraryItem.addData("name", "string", "左大腿");
    rightElements[0x4].libraryItem.addData('name', "string", "左小腿");
    rightElements[0x5].libraryItem.addData("name", "string", '左脚');
    
    leftElements[0x0].libraryItem.addData("name", 'string', "右大臂");
    leftElements[0x1].libraryItem.addData("name", "string", "右小臂");
    leftElements[0x2].libraryItem.addData('name', "string", '右手');
    leftElements[0x3].libraryItem.addData("name", "string", "右大腿");
    leftElements[0x4].libraryItem.addData("name", "string", "右小腿");
    leftElements[0x5].libraryItem.addData("name", "string", '右脚');
    
    // 包装 元件
    doc.selectAll();
    var symbolItem = doc.convertToSymbol('graphic', 'model', 'center');
    
    // 分散到图层
    doc.library.editItem(symbolItem.name);//opens the currently selected or specified item in Edit mode.
    doc.distributeToLayers();//对当前所选内容执行分散到图层操作
    
    // 重命名层
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    layers.forEach(function (layer) {
        var element = layer.frames[0x0].elements[0x0];
        layer.name = element.libraryItem.getData("name");
    });
}

