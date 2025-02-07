/**
 * @file: shim.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/7 14:58
 * @project: AnJsflScript
 * @description:
 */
define(function() {
    // es2017-es8
    String.prototype.padStart = function (targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(padString || "");
        if (this.length > targetLength) return String(this);
        targetLength = targetLength - this.length;
        if (targetLength > padString.length)
            padString += padString.repeat(targetLength / padString.length);
        return padString.slice(0, targetLength) + String(this);
    }

    // es2016 - es7
    Array.prototype.includes = function (searchElement, fromIndex) {
        if (typeof fromIndex !== 'number') {
            fromIndex = 0;
        }
        var len = this.length;
        for (var i = fromIndex; i < len; i++) {
            if (this[i] === searchElement) {
                return true;
            }
        }
        return false;
    };
});