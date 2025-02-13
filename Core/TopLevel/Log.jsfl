/**
 * @file: Log.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:31
 * @project: AnJsflScript
 * @description:
 */

// /**
//  * 打印矩阵
//  * @param {Matrix} matrix 矩阵
//  */
// function LogMatrix(matrix) {
//     fl.trace("[" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + "] [" + matrix.tx + ", " + matrix.ty + "]");
// }

/**
 * 打印数组中的数字
 * @param {number[]}numbers 数组
 * @param {string} [tips] 打印提示
 */
function LogArray(numbers, tips) {
    if (tips === undefined) tips = "";

    var str = tips + "[ ";
    for (var i = 0; i < numbers.length; i++) {
        var num = numbers[i].toString();
        if (i === numbers.length - 1) {
            str += num + " ]";
            break;
        }

        str += num + ", ";
    }
    // fl.trace(str);
    print(str);
}

function LogElementPosition(elements) {
    var positions = [];

    elements.forEach(function (element) {
        require(["sat"], function (sat) {
            var wrapPosition = sat.GLOBALS.wrapPosition;
            var position = wrapPosition(element);
            // print(position.toString());
            positions.push(position.toString());

            // 当所有元素处理完成后，调用回调函数
            if (elements.indexOf(element) === elements.length - 1) {
                // callback(positions);
                LogArray(positions, "元素位置：");
            }
        });
    });
}


/**
 * 打印日志
 * @param {string} args 日志内容
 */
function print() {
    if (typeof DEBUG_MODE !== "undefined") {
        // 将 arguments 转换为真正的数组
        var args = Array.prototype.slice.call(arguments);

        // 将所有参数拼接成一个字符串
        var str = args.join("    ");

        // 调用 fl.trace 方法
        fl.trace(str);
    }
}

function LogError() {
    fl.trace("[Error] " + Array.prototype.slice.call(arguments).join("    "));
}


function LogDict(dict, tips) {
    if (tips === undefined) tips = "";
    var str = tips + "{";
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            str += key + ": " + dict[key] + ",\n";
        }
    }
    str += "}";
    print(str);
}