/**
 * @file: string.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/18 14:35
 * @project: WindowSWF-master
 * @description:
 */

/**
 * 字符串补齐函数
 * @param {string} sourceString 原字符串
 * @param {number} targetLength 目标长度
 * @param {string} padString 填充字符，默认为空格
 * @returns {string} 补齐后的字符串
 */
function padStart(sourceString, targetLength, padString) {
    if (sourceString == null) {
        sourceString = "";
    }

    if (padString === undefined) {
        padString = " ";
    }

    // 将sourceString和padString转换为字符串
    sourceString = "" + sourceString;
    padString = "" + padString;

    // 计算需要填充的字符数
    var len = sourceString.length;
    var padding = targetLength - len;

    // 如果padding小于等于0，则不需要填充
    if (padding <= 0) {
        return sourceString;
    }

    // 计算padString需要重复的次数
    var repeatTimes = Math.ceil(padding / padString.length);

    // 构建填充字符串
    var paddingStr = new Array(repeatTimes + 1).join(padString);

    // 截取填充字符串到所需的长度
    paddingStr = paddingStr.slice(0, padding);

    // 返回填充后的字符串
    return paddingStr + sourceString;
}

/**
 * 判断字符串是否包含另一个字符串
 * @param str1
 * @param str2
 * @returns {boolean}
 */
function Includes(str1, str2) {
    return str1.indexOf(str2) !== -1;
}







