/**
 * @file: LibUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/25 21:15
 * @project: AnJsflScript
 * @description:
 */

// import "core-js/stable/string/pad-start";
define(['random', 'sprintf', 'core-js/stable/string/pad-start'], function (
    random,
    sp
) {
    const sprintf = sp.sprintf;
    /**
     * 添加在 name 后面的随机数的位数，保证名称的唯一性。
     * @type {number}
     */
    var PAD_DIGITS = 3;

    function LibUtil() {}

    LibUtil.LastName = '';

    /**
     * 获取随机3位数字的字符串,不够的地方用0补齐
     * @param {number} [digits=3] 随机数的位数，默认为3
     * @return {string} 随机3位数字的字符串
     * @private
     */
    LibUtil.getPaddingNum = function (digits) {
        if (digits === undefined) digits = PAD_DIGITS;

        var num = random.randint(1, 999);
        return num.toString().padStart(digits, '0');
    };

    /**
     * 记录上一次生成的随机数，用于生成唯一名称。
     * @type {string}
     * @private
     */
    LibUtil.lastCount = '000';

    /**
     * 查找是否有重复名称
     * @param {string} baseName 元件名称
     * @returns {boolean} 是否有重复名称
     * @private
     */
    LibUtil.findDuplicateNameInLib = function (baseName) {
        var library = fl.getDocumentDOM().library;

        var items = library.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].name === baseName) {
                return true;
            }
        }
        return false;
    };

    /**
     * 生成一个唯一的名称，基于传入的基础名称，并确保其在 library 中是唯一的。
     * 在 后面 加上 随机数，确保名称的唯一性。
     * @param {string} baseName - 用于生成唯一名称的基础字符串。
     * @returns {string} 返回一个唯一的名称。
     */
    LibUtil.generateNameUntilUnique = function (baseName) {
        this.lastCount = this.getPaddingNum();
        var name = baseName + '' + this.lastCount;

        var count = 0;
        while (this.findDuplicateNameInLib(name)) {
            this.lastCount = this.getPaddingNum();
            name = baseName + '' + this.lastCount;

            count++;
            if (count > 10) {
                throw new Error(
                    sprintf(
                        '已经尝试了[%d]次，仍然无法生成唯一的名称！当前名称为：[%s]',
                        count,
                        name
                    )
                );
            }
        }

        this.LastName = name;
        return name;
    };

    /**
     * 生成一个唯一的名称，基于传入的基础名称，并确保其在 library 中是唯一的。
     * 使用上一次生成的随机数，确保名称的唯一性。
     * @param {string} baseName - 用于生成唯一名称的基础字符串。
     * @returns {string} 返回一个唯一的名称。
     */
    LibUtil.generateNameUseLast = function (baseName) {
        var name = baseName + '' + this.lastCount;
        while (this.findDuplicateNameInLib(name)) {
            var info0 = sprintf('lastCount:%s 重复了！', this.lastCount);
            this.lastCount = this.getPaddingNum();
            var info1 = sprintf(
                '已经重新生成了新的名称！ lastCount:%s',
                this.lastCount
            );
            name = baseName + '' + this.lastCount;
            fl.trace(info0 + info1);
        }

        this.LastName = name;
        return name;
    };

    return LibUtil;
});
