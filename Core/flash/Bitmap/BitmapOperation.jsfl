/**
 * @file: BitmapOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 19:03
 * @project: AnJsflScript
 * @description:
 */

define(["ElementChecker"], function (ec) {
    const { IsBitmap } = ec;

    /**
     * 设置选中的位图元件为无损压缩
     * @param {Array.<Item>} libSelection 选中的位图元件数组
     * @see https://github.com/hufang360/FlashTool
     */
    function BitmapLossless(libSelection) {
        var count = 0;
        libSelection.forEach(function (item) {
            if (IsBitmap(item)) {
                item.allowSmoothing = false;
                item.compressionType = "lossless";
                count++;
            }
        });

        if (count === 0) {
            alert("库元件都不是位图元件！");
        } else {
            alert("已设置" + count + "个位图元件为无损压缩");
        }
    }

    /**
     * 设置选中的位图元件 更加平滑（抗锯齿）
     * @param {Array.<Item>} libSelection 选中的位图元件数组
     */
    function BitmapSmoothing(libSelection) {
        var count = 0;
        libSelection.forEach(function (item) {
            if (IsBitmap(item)) {
                item.allowSmoothing = true;
                item.compressionType = "lossless";
                count++;
            }
        });

        if (count === 0) {
            alert("选中的库元件都不是位图元件！");
        } else {
            alert("已设置" + count + "个位图元件为无损压缩");
        }
    }

    return {
        BitmapLossless: BitmapLossless,
        BitmapSmoothing: BitmapSmoothing
    };
});
