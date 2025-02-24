// 其基本功能是：
// 1，Flash 中选定某个图片后向右复制 n 个
// 2，间隔翻转
fl.outputPanel.clear();

var ans1 = prompt('How many times do you wish to repeat?');
var ans2 = prompt('Flip? (1 for YES, 0 for NO)', 0);

var doc = fl.getDocumentDOM();
var originItem, flipArg, repeatTimes;

/**
 * 复制图片
 * @param d 文档对象
 * @param deltaX 复制图片的 x 轴偏移量
 * @param idx 复制图片的序号
 * @param flip 是否翻转
 */
function CopyItem(d, deltaX, idx, flip) {
    d.clipPaste();
    var e = d.selection[0];
    if (flip) {
        d.scaleSelection(-1, 1);
        e.x = originItem.x + deltaX * (idx + 1);
    } else {
        e.x = originItem.x + deltaX * idx;
    }
    e.y = originItem.y;
}

if (ans1 == null) {
    alert('arguement error!');
} else if (doc.selection.length < 0) {
    alert('Please Select A Picture');
} else {
    repeatTimes = parseInt(ans1);
    if (ans2 != null && ans2 != '0') {
        flipArg = parseInt(ans2);
    }
    originItem = doc.selection[0];
    var deltaX = originItem.width;
    doc.clipCopy();
    var bFlip = false;
    for (var i = 1; i <= repeatTimes; i++) {
        if (flipArg) {
            bFlip = !bFlip;
        }
        CopyItem(doc, deltaX, i, bFlip);
    }
}
