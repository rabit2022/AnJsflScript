/**
 * @file: logUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/27 14:45
 * @project: AnJsflScript
 * @description:
 */

define(['loglevel'], function (log) {
    /**
     * 打印数组中的数字
     * @param {number[]} numbers 数组
     * @param {string} [tips] 打印提示
     */
    function LogArray(numbers, tips) {
        if (tips === undefined) tips = '';
        var str = tips + '[ ';
        for (var i = 0; i < numbers.length; i++) {
            var num = numbers[i].toString();
            if (i === numbers.length - 1) {
                str += num;
            } else {
                str += num + ', ';
            }
        }
        str += ']';
        // print(str);
        log.info(str);
    }

    /**
     * 打印元素位置
     * @param {Element[]} elements 元素数组
     */
    function LogElementPosition(elements) {
        var positions = [];
        elements.forEach(function (element, index) {
            require(['sat'], function (sat) {
                try {
                    var wrapPosition = sat.GLOBALS.wrapPosition;
                    var position = wrapPosition(element).toString();
                    positions.push(position);

                    // 当所有元素处理完成后，打印位置信息
                    if (index === elements.length - 1) {
                        LogArray(positions, '元素位置：');
                    }
                } catch (error) {
                    throw new Error('获取元素位置时出错：' + error.message);
                }
            });
        });
    }

    /**
     * 打印字典
     * @param {Object} dict 字典对象
     * @param {string} [tips] 打印提示
     */
    function LogDict(dict, tips) {
        if (tips === undefined) tips = '';
        var str = tips + '{ ';
        var entries = Object.entries(dict); // 确保 Object.entries 已补全
        // for each (var {key, value} in entries) {
        for (var { key, value } in entries) {
            str += key + ': ' + value;
            var index = entries.indexOf(key);
            if (index < entries.length - 1) {
                str += ', ';
            }
        }
        str += ' }';
        // print(str);
        log.info(str);
    }

    /**
     * 打印日志
     * @param {string} args 日志内容
     */
    function print() {
        // 将 arguments 转换为真正的数组
        var args = Array.prototype.slice.call(arguments);
        // 将所有参数拼接成一个字符串
        var str = args.join('    ');
        // 调用 fl.trace 方法
        fl.trace(str);
        // log.info(str);
    }

    return {
        LogArray: LogArray,
        LogElementPosition: LogElementPosition,
        LogDict: LogDict,
        print: print
    };
});
