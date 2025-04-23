/**
 * @file: BitmapOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 19:03
 * @project: AnJsflScript
 * @description:
 */

define(function() {
    /**
     * 设置选中的位图元件为无损压缩
     * @param {Array.<Item>} libSelection 选中的位图元件数组
     * @see https://github.com/hufang360/FlashTool
     */
    function BitmapLossless(libSelection) {
        // var doc = fl.getDocumentDOM(); //文档
        // const library = doc.library; //库
        // const libSelection = doc.library.getSelectedItems();
        //
        // if (!libSelection || libSelection.length === 0) {
        //     alert('请在库中选择一个或多个位图元件');
        //     return;
        // }

        var count = 0;
        libSelection.forEach(function(item) {
            if (item.itemType === 'bitmap') {
                item.allowSmoothing = false;
                item.compressionType = 'lossless';
                count++;
            }
        });

        if (count === 0) {
            alert('选中的库元件都不是位图元件！');
        } else {
            alert('已设置' + count + '个位图元件为无损压缩');
        }
    };

    return {
        BitmapLossless: BitmapLossless
    };
});