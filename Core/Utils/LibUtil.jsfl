/**
 * @file: LibUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/25 21:15
 * @project: AnJsflScript
 * @description:
 */


function LibUtil() {
    this.lastCount = "000";
}


/**
 * 查找是否有重复名称
 * @param {string} baseName 元件名称
 * @returns {boolean} 是否有重复名称
 * @private
 */
LibUtil.prototype.findDuplicateNameInLib = function (baseName) {
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
LibUtil.prototype.generateNameUntilUnique = function (baseName) {
    this.lastCount = random.getPaddingNum(3);
    var name = baseName + "" + this.lastCount;

    var count = 0;
    while (libUtil.findDuplicateNameInLib(name)) {
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
LibUtil.prototype.generateNameUseLast = function (baseName) {
    var name = baseName + "" + this.lastCount;
    while (libUtil.findDuplicateNameInLib(name)) {
        var info0 = "lastCount:" + this.lastCount + " 重复了！";
        this.lastCount = random.getPaddingNum(3);
        var info1 = "已经重新生成了新的名称！" + " lastCount:" + this.lastCount;
        name = baseName + "" + this.lastCount;
        fl.trace(info0 + info1);
    }
    return name;
}


var libUtil = new LibUtil();
