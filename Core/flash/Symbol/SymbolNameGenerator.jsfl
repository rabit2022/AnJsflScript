/**
 * @file: libUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/25 21:15
 * @project: AnJsflScript
 * @description:
 */

define(["random", "sprintf"], function (random, sp) {
    const sprintf = sp.sprintf;
    /**
     * 添加在 name 后面的随机数的位数，保证名称的唯一性。
     * @type {number}
     */
    var PAD_DIGITS = 3;
    /**
     * 记录上一次生成的随机数，用于生成唯一名称。
     * @type {string}
     */
    var lastCount = "000";

    var lastName = "";
    /**
     * 获取随机3位数字的字符串,不够的地方用0补齐
     * @param {number} [digits=3] 随机数的位数，默认为3
     * @return {string} 随机3位数字的字符串
     * @private
     */
    function getPaddingNum(digits) {
        if (digits === undefined) digits = PAD_DIGITS;

        var num = random.randint(1, 999);
        return num.toString().padStart(digits, "0");
    }

    function SymbolNameGenerator() {}

    Object.defineProperty(SymbolNameGenerator, "LastName", {
        get: function () {
            return lastName;
        }
    });

    /**
     * 查找是否有重复名称
     * @param {string} baseName 元件名称
     * @returns {boolean} 是否有重复名称
     * @private
     */
    SymbolNameGenerator.findDuplicateNameInLib = function (baseName) {
        var doc = fl.getDocumentDOM(); //文档
        var library = doc.library; //库文件
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
    SymbolNameGenerator.generateNameUntilUnique = function (baseName) {
        lastCount = getPaddingNum();
        var name = baseName + "" + lastCount;

        var count = 0;
        while (SymbolNameGenerator.findDuplicateNameInLib(name)) {
            lastCount = getPaddingNum();
            name = baseName + "" + lastCount;

            count++;
            if (count > 10) {
                throw new Error(
                    sprintf(
                        "已经尝试了[%d]次，仍然无法生成唯一的名称！当前名称为：[%s]",
                        count,
                        name
                    )
                );
            }
        }

        lastName = name;
        return name;
    };

    /**
     * 生成一个唯一的名称，基于传入的基础名称，并确保其在 library 中是唯一的。
     * 使用上一次生成的随机数，确保名称的唯一性。
     * @param {string} baseName - 用于生成唯一名称的基础字符串。
     * @returns {string} 返回一个唯一的名称。
     */
    SymbolNameGenerator.generateNameUseLast = function (baseName) {
        var name = baseName + "" + lastCount;
        while (SymbolNameGenerator.findDuplicateNameInLib(name)) {
            var info0 = sprintf("lastCount:%s 重复了！", lastCount);
            lastCount = getPaddingNum();
            var info1 = sprintf("已经重新生成了新的名称！ lastCount:%s", lastCount);
            name = baseName + "" + lastCount;
            fl.trace(info0 + info1);
        }

        lastName = name;
        return name;
    };

    return SymbolNameGenerator;
});
