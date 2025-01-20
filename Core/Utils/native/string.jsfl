/**
 * @file: string.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/18 14:35
 * @project: AnJsflScript
 * @description:
 */


// es2015
String.prototype.codePointAt = function (pos) {
    if (pos < 0 || pos >= this.length) {
        return undefined;
    }
    var first = this.charCodeAt(pos);
    if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < this.length) {
        var second = this.charCodeAt(pos + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
String.prototype.repeat = function (count) {
    count = count >> 0;
    if (count <= 0) return "";
    var str = String(this);
    var res = "";
    while (count > 0) {
        if (count & 1) res += str;
        if (count > 1) str += str;
        count >>= 1;
    }
    return res;
}
String.prototype.includes = function (search, start) {
    if (typeof start !== "number") {
        start = 0;
    }
    if (start + search.length > this.length) {
        return false;
    } else {
        return this.indexOf(search, start) !== -1;
    }
}
String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
}
String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}

// es2017
String.prototype.padStart = function (targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(padString || "");
    if (this.length > targetLength) return String(this);
    targetLength = targetLength - this.length;
    if (targetLength > padString.length)
        padString += padString.repeat(targetLength / padString.length);
    return padString.slice(0, targetLength) + String(this);
}
String.prototype.padEnd = function (targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(padString || "");
    if (this.length > targetLength) return String(this);
    targetLength = targetLength - this.length;
    if (targetLength > padString.length)
        padString += padString.repeat(targetLength / padString.length);
    return String(this) + padString.slice(0, targetLength);
}

// es2019
String.prototype.trimStart = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.trimEnd = function () {
    return this.replace(/\s+$/, "");
}
String.prototype.trimLeft = String.prototype.trimStart;
String.prototype.trimRight = String.prototype.trimEnd;

// es2020
String.prototype.matchAll = function (regexp) {
    var matches = [];
    var match;
    while ((match = regexp.exec(this)) !== null) {
        matches.push(match);
    }
    return matches;
}

// es2021
String.prototype.replaceAll = function (searchValue, replaceValue) {
    return this.split(searchValue).join(replaceValue);
}

// es2022
String.prototype.at = String.prototype.codePointAt;
