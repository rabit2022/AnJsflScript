/**
 * @file: BuiltInP.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 17:25
 * @project: AnJsflScript
 * @description:
 */

/**
 * @description: 返回一个数字的绝对值。 参数可以是整数、浮点数.如果参数是一个复数，则返回它的模。
 * @param {number} x 要计算绝对值的数字。
 * @return {number} 绝对值。
 */
function abs(x) {
    return Math.abs(x);
}

/**
 * 如果 iterable 的所有元素均为真值（或可迭代对象为空）则返回 True
 * @param {*} iterable
 * @param {function}[predicate=Boolean]
 * @returns {boolean}
 */
function all(iterable, predicate) {
    // 如果没有提供 predicate 函数，默认使用 Boolean 转换
    if (typeof predicate !== 'function') {
        predicate = Boolean;
    }

    // 如果 iterable 是类数组对象（如 arguments 或 NodeList），先将其转换为数组
    if (!Array.isArray(iterable)) {
        iterable = Array.from(iterable);
    }

    // 遍历 iterable，检查每个元素是否满足 predicate 函数
    for (var item in iterable) {
        if (!predicate(item)) {
            return false; // 如果有一个不满足条件，直接返回 false
        }
    }
    return true; // 如果所有元素都满足条件，返回 true
}

/**
 * 如果 iterable 的任一元素为真值（或可迭代对象为空）则返回 True
 * @param {*} iterable
 * @param {function}[predicate=Boolean]
 * @returns {boolean}
 */
function any(iterable, predicate) {
    // 如果没有提供 predicate 函数，默认使用 Boolean 转换
    if (typeof predicate !== 'function') {
        predicate = Boolean;
    }

    // 如果 iterable 是类数组对象（如 arguments 或 NodeList），先将其转换为数组
    if (!Array.isArray(iterable)) {
        iterable = Array.from(iterable);
    }

    // 遍历 iterable，检查每个元素是否满足 predicate 函数
    for (var item in iterable) {
        if (predicate(item)) {
            return true; // 如果有一个满足条件，直接返回 true
        }
    }
    return false; // 如果所有元素都不满足条件，返回 false
}

/**
 * 返回一个对象的 ASCII 字符串表示。
 * @param {Object} object 要转换为 ASCII 字符串的对象。
 * @return {string} ASCII 字符串表示。
 */
function ascii(object) {
    return JSON.stringify(object);
}

/**
 * 将一个整数转换为带前缀 "0b" 的二进制数字符串。
 * @param {number} x 要转换为二进制字符串的整数。
 * @return {string} 二进制字符串。
 */
function bin(x) {
    // 检查是否为负数
    const isNegative = x < 0;
    // 转换为绝对值并获取二进制表示
    const binaryString = Math.abs(x).toString(2);

    // 添加前缀 "0b" 或 "-0b"（如果是负数）
    // return isNegative ? `-0b${binaryString}` : `0b${binaryString}`;
    return isNegative ? "-0b" + binaryString : "0b" + binaryString;
}

/**
 * 返回一个布尔值，指示对象是否可调用。
 * @param {Object} object 要检查是否可调用的对象。
 * @return {boolean} 对象是否可调用。
 */
function callable(object) {
    // 检查对象是否是函数类型
    return typeof object === 'function';
}

/**
 * 返回 Unicode 码位为整数 i 的字符的字符串格式。
 * @param {number} i Unicode 码位。
 * @return {string} 字符的字符串格式。
 */
function chr(i) {
    // 检查参数是否为整数
    if (!Number.isInteger(i)) {
        throw new TypeError('chr() argument must be an integer');
    }

    // 检查参数是否在合法范围内
    if (i < 0 || i > 0x10FFFF) {
        throw new RangeError('chr() arg not in range(0x110000)');
    }

    // 返回 Unicode 码位为 i 的字符
    return String.fromCharCode(i);
}

/**
 * 删除对象的属性。
 * @param {Object} object 要删除属性的对象。
 * @param {string} name 要删除的属性名。
 */
function delattr(object, name) {
    if (object === null || object === undefined) {
        throw new TypeError("object cannot be null or undefined");
    }

    if (typeof name !== "string") {
        throw new TypeError("name must be a string");
    }

    if (!(name in object)) {
        throw new Error("object has no attribute '" + name + "'");
    }

    delete object[name];
}


function dir(object) {
    // 如果没有提供参数，返回全局对象的属性
    if (object === undefined) {
        object = this; // 在浏览器中是 window，在 Node.js 中是 global
    }

    // 获取对象的自有属性和原型链上的属性
    var properties = [];
    var currentObject = object;

    while (currentObject !== null) {
        // 遍历当前对象的所有属性
        for (var key in currentObject) {
            if (currentObject.hasOwnProperty(key)) { // 确保是自有属性
                if (properties.indexOf(key) === -1) { // 避免重复
                    // properties.push(key);
                    var dict = {};
                    dict.name = key;
                    dict.value = currentObject[key];

                    var str = "{" + dict.name + ": " + dict.value + "}";
                    properties.push(str);
                }
            }
        }

        // 获取原型对象
        currentObject = currentObject.__proto__;
    }

    // 返回排序后的属性列表
    return properties.sort();
}

/**
 * 接受两个（非复数）数字作为参数并返回由当对其使用整数除法时的商和余数组成的数字对。
 * @param {number} a 被除数。
 * @param {number} b 除数。
 * @return {Array} 商和余数组成的数字对。
 */
function divmod(a, b) {
    // 检查除数是否为零
    if (b === 0) {
        throw new Error("divisor cannot be zero");
    }

    // 计算商
    var q = Math.floor(a / b);

    // 计算余数
    var r = a % b;

    // 调整商和余数，确保 0 <= abs(r) < abs(b)
    if (r < 0) {
        if (b > 0) {
            r += b;
            q -= 1;
        } else {
            r -= b;
            q += 1;
        }
    }

    return [q, r];
}



/**
 * 过滤可迭代对象 iterable，返回一个包含所有满足 predicate 函数的元素的新数组。
 * @param {function} func 过滤函数。
 * @param {Array|Object|string|Iterator} iterable 要过滤的可迭代对象。
 * @return {Array} 包含所有满足 predicate 函数的元素的新数组。
 */
function filter(func, iterable) {
    // 如果 iterable 是一个类数组对象（如 arguments 或 NodeList），先将其转换为数组
    if (!Array.isArray(iterable)) {
        iterable = Array.prototype.slice.call(iterable);
    }

    // 如果 function 为 null 或 undefined，使用标识函数（即过滤假值）
    if (func === null || func === undefined) {
        return iterable.filter(Boolean);
    }

    // 否则，使用提供的函数进行过滤
    return iterable.filter(func);
}

/**
 * 获取对象的属性。
 * @param {Object} object 要获取属性的对象。
 * @param {string} name 要获取的属性名。
 * @param {any} [default] 如果属性不存在，返回的默认值。
 * @return {any} 属性值。
 */
function getattr(object, name, default_) {
    if (object === null || object === undefined) {
        throw new TypeError("object cannot be null or undefined");
    }

    if (typeof name !== "string") {
        throw new TypeError("name must be a string");
    }

    if (default_ === undefined) {
        return object[name];
    } else {
        return object[name] !== undefined ? object[name] : default_;
    }
}

/**
 * 检查对象是否具有指定的属性。
 * @param {Object} object 要检查属性的对象。
 * @param {string} name 要检查的属性名。
 * @return {boolean} 对象是否具有指定的属性。
 */
function hasattr(object, name) {
    if (object === null || object === undefined) {
        throw new TypeError("object cannot be null or undefined");
    }

    if (typeof name !== "string") {
        throw new TypeError("name must be a string");
    }

    return name in object;
}

/**
 * 返回对象的哈希值。
 * 哈希值是整数。它们在字典查找元素时用来快速比较字典的键。相同大小的数字变量有相同的哈希值（即使它们类型不同，如 1 和 1.0）。
 * @param {Object} object 要获取哈希值的对象。
 * @return {number} 对象的哈希值。
 */
function hash(object) {
    if (object === null || object === undefined) {
        throw new TypeError("object cannot be null or undefined");
    }

    if (typeof object === "boolean") {
        return object ? 1 : 0;
    } else if (typeof object === "number") {
        return object;
    } else if (typeof object === "string") {
        var hash = 0;
        for (var i = 0; i < object.length; i++) {
            var char = object.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    } else if (typeof object === "object") {
        if (object.hasOwnProperty("__hash__")) {
            return object.__hash__();
        } else {
            throw new TypeError("unhashable type: " + typeof object);
        }
    } else {
        throw new TypeError("unsupported type: " + typeof object);
    }
}

/**
 * 将整数转换为带前缀 "0x" 前缀的小写十六进制数字符串。
 * @param {number} x 要转换为十六进制字符串的整数。
 * @return {string} 十六进制字符串。
 */
function hex(x) {
    // 检查是否为负数
    const isNegative = x < 0;
    // 转换为绝对值并获取十六进制表示
    const hexString = Math.abs(x).toString(16);

    // 添加前缀 "0x" 或 "-0x"（如果是负数）
    // return isNegative ? `-0x${hexString}` : `0x${hexString}`;
    return isNegative ? "-0x" + hexString : "0x" + hexString;
}


/**
 * 检查类是否是另一个类的子类。
 * @param {class} class_ 要检查的类。
 * @param {class|tuple|union} classinfo 要检查的类或元组。
 * @return {boolean} 类是否是另一个类的子类。
 */
function issubclass(class_, classinfo) {
    if (typeof class_ !== "function") {
        throw new TypeError("arg 1 must be a class");
    }

    if (typeof classinfo === "function") {
        return classinfo.prototype instanceof class_;
    } else if (Array.isArray(classinfo)) {
        for (var i = 0; i < classinfo.length; i++) {
            if (issubclass(class_, classinfo[i])) {
                return true;
            }
        }
        return false;
    } else {
        throw new TypeError("arg 2 must be a class, tuple, or union");
    }
}



function len(object) {
    if (object === null || object === undefined) {
        throw new TypeError("object cannot be null or undefined");
    }

    if (typeof object === "string" || Array.isArray(object)) {
        return object.length;
    } else {
        throw new TypeError("unsupported type: " + typeof object);
    }
}

/**
 * 应用 function 到 iterable 的每一项，并产生其结果的迭代器。
 * @param {function} func 要应用到 iterable 的每一项的函数。
 * @param {Array|Object|string|Iterator} iterable 要应用到函数的可迭代对象。
 * @param {Array|Object|string|Iterator} [iterables] 要并行获取的可迭代对象。
 * @return {Iterator} 产生结果的迭代器。
 */
function map(func, iterable, iterables) {
    // 如果 iterable 是一个类数组对象（如 arguments 或 NodeList），先将其转换为数组
    if (!Array.isArray(iterable)) {
        iterable = Array.prototype.slice.call(iterable);
    }

    // 如果没有提供 iterables，则使用单参数函数
    if (iterables === undefined) {
        return iterable.map(func);
    }

    // 如果 iterables 是类数组对象（如 arguments 或 NodeList），先将其转换为数组
    if (!Array.isArray(iterables)) {
        iterables = Array.prototype.slice.call(iterables);
    }

    // 确保函数接受相同数量的参数
    if (iterables.length !== func.length) {
        throw new Error("function takes " + func.length + " arguments, but " + iterables.length + " iterables were passed");
    }

    // 遍历可迭代对象，并将函数应用到每个元素上
    var result = [];
    for (var i = 0; i < iterable.length; i++) {
        var args = [iterable[i]];
        for (var j = 0; j < iterables.length; j++) {
            args.push(iterables[j][i]);
        }
        result.push(func.apply(null, args));
    }

    return result;
}

/**
 * 返回可迭代对象中最大的元素，或者返回两个及以上实参中最大的。
 * @param {Array|Object|string|Iterator} iterable 要查找最大元素的可迭代对象。
 * @param {any} [default] 当可迭代对象为空时返回的值。
 * @param {function} [key] 排序函数用的参数。
 * @return {any} 最大元素。
 */
function max(iterable, default_, key) {
    if (default_ === undefined) {
        if (key === undefined) {
            return Math.max.apply(null, iterable);
        } else {
            return Math.max.apply(null, iterable.map(key));
        }
    } else {
        if (key === undefined) {
            return iterable.length > 0 ? Math.max.apply(null, iterable) : default_;
        } else {
            return iterable.length > 0 ? Math.max.apply(null, iterable.map(key)) : default_;
        }
    }
}

/**
 * 返回可迭代对象中最小的元素，或者返回两个及以上实参中最小的。
 * @param {Array|Object|string|Iterator} iterable 要查找最小元素的可迭代对象。
 * @param {any} [default] 当可迭代对象为空时返回的值。
 * @param {function} [key] 排序函数用的参数。
 * @return {any} 最小元素。
 */
function min(iterable, default_, key) {
    if (default_ === undefined) {
        if (key === undefined) {
            return Math.min.apply(null, iterable);
        } else {
            return Math.min.apply(null, iterable.map(key));
        }
    } else {
        if (key === undefined) {
            return iterable.length > 0 ? Math.min.apply(null, iterable) : default_;
        } else {
            return iterable.length > 0 ? Math.min.apply(null, iterable.map(key)) : default_;
        }
    }
}

/**
 * 将整数转换为带前缀 "0o" 的八进制数字符串。
 * @param {number} x 要转换为八进制字符串的整数。
 * @return {string} 八进制字符串。
 */
function oct(x) {
    // 检查是否为负数
    const isNegative = x < 0;
    // 转换为绝对值并获取八进制表示
    const octString = Math.abs(x).toString(8);

    // 添加前缀 "0o" 或 "-0o"（如果是负数）
    return isNegative ? "-0o" + octString : "0o" + octString;
}


// open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)¶
/**
 * 打开一个文件并返回一个文件对象。
 * @param {string} file 要打开的文件名。
 * @param {"r"|"w"|"a"|"x"} [mode='r'] 打开文件的模式。} [mode='r'] 打开文件的模式。
 * @param {string} [textToWrite] 写入文件的文本。
 * @return {string|Boolean} 是否成功打开文件。读取模式下返回文件内容，写入模式下返回是否成功写入。
 */
function open(file, mode, textToWrite) {
    if (mode === undefined) {
        mode = 'r';
    }
    if (textToWrite === undefined) {
        textToWrite = "";
    }

    switch (mode) {
        case 'r':
            return FLfile.read(file);
            break;
        case 'w':
            return FLfile.write(file, textToWrite);
            break;
        case 'a':
            return FLfile.write(file, textToWrite, "append");
            break;
        case 'x':
            return FLfile.write(file, "");
            break;
        default:
            throw new Error("Invalid mode: " + mode);
    }
}

/**
 * 计算 base 的 exp 次方，并返回结果。
 * @param {number} base 底数。
 * @param {number} exp 指数。
 * @param {number} [mod] 模数。
 * @return {number} 计算结果。
 */
function pow(base, exp, mod) {
    if (mod === undefined) {
        return Math.pow(base, exp);
    } else {
        return Math.pow(base, exp) % mod;
    }
}

// function print(str) {
//     fl.trace(str);
// }
function print() {
    // 将 arguments 转换为真正的数组
    var args = Array.prototype.slice.call(arguments);

    // 将所有参数拼接成一个字符串
    var str = args.join(" ");

    // 调用 fl.trace 方法
    fl.trace(str);
}

/**
 * 返回一个反向的迭代器。
 * @param {Array|Object|string|Iterator} seq 要反转的可迭代对象。
 * @return {T[]|string} 反向迭代器。
 */
function reversed(seq) {
    if (Array.isArray(seq)) {
        return seq.slice().reverse();
    } else if (typeof seq === "string") {
        return seq.split("").reverse().join("");
    } else if (typeof seq[Symbol.iterator] === "function") {
        var array = Array.from(seq);
        return array.reverse();
    } else {
        throw new TypeError("Object is not iterable");
    }
}

/**
 * 舍入 number 到小数点后 ndigits 位精度的值。
 * @param {number} number 要舍入的数字。
 * @param {number} [ndigits=0] 要保留的小数位数。
 * @return {number} 舍入后的数字。
 */
function round(number, ndigits) {
    if (ndigits === undefined) {
        ndigits = 0;
    }

    var factor = Math.pow(10, ndigits);
    return Math.round(number * factor) / factor;
}

/**
 * 设置对象的属性。
 * @param {Object} object 要设置属性的对象。
 * @param {string} name 要设置的属性名。
 * @param {any} value 要设置的属性值。
 */
function setattr(object, name, value) {
    if (object === null || object === undefined) {
        throw new TypeError("object cannot be null or undefined");
    }

    if (typeof name !== "string") {
        throw new TypeError("name must be a string");
    }

    object[name] = value;
}

/**
 * 返回一个表示由 range(start, stop, step) 指定的索引集的 slice 对象。
 * @param {number} start 切片起始索引。
 * @param {number} [stop] 切片结束索引。
 * @param {number} [step] 切片步长。
 * @return {slice} 切片对象。
 */
function slice(start, stop, step) {
    if (stop === undefined) {
        stop = start;
        start = 0;
        step = 1;
    } else if (step === undefined) {
        step = 1;
    }

    if (step === 0) {
        throw new Error("slice step argument must not be zero");
    }

    var result = [];
    for (var i = start; i < stop; i += step) {
        result.push(i);
    }

    return result;
}


/**
 * 根据 iterable 中的项返回一个新的已排序列表。
 * @param {Array|Object|string|Iterator} iterable 要排序的可迭代对象。
 * @param {function} [key] 排序函数用的参数。
 * @param {boolean} [reverse=false] 是否反转排序结果。
 * @return {Array|string} 排序后的数组。
 */
function sorted(iterable, key, reverse) {
    if (key === undefined) {
        key = null;
    }
    if (reverse === undefined) {
        reverse = false;
    }

    if (Array.isArray(iterable)) {
        return iterable.slice().sort(function (a, b) {
            if (key === null) {
                return a < b ? -1 : a > b ? 1 : 0;
            } else {
                return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
            }
        });
    } else if (typeof iterable === "string") {
        var array = iterable.split("");
        array.sort(function (a, b) {
            if (key === null) {
                return a < b ? -1 : a > b ? 1 : 0;
            } else {
                return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
            }
        });
        return array.join("");
    } else if (typeof iterable[Symbol.iterator] === "function") {
        var array = Array.from(iterable);
        array.sort(function (a, b) {
            if (key === null) {
                return a < b ? -1 : a > b ? 1 : 0;
            } else {
                return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
            }
        });
        if (reverse) {
            array.reverse();
        }
        return array;
    } else {
        throw new TypeError("Object is not iterable");
    }
}


/**
 * 返回一个数组中所有元素的和。
 * @param {Array} arr 要计算和的数组。
 * @return {number} 数组元素的和。
 */
function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b;
    }, 0);
}

/**
 * 打包可迭代对象中的元素，返回一个元组序列。
 * @param {Array|Object|string|Iterator} iterable 要打包的可迭代对象。
 * @param {boolean} [strict=false] 是否严格检查参数长度。
 * @return {Array} 元组序列。
 */
function zip() {
    var args = Array.prototype.slice.call(arguments);
    var strict = false;

    // 检查是否有 strict 参数
    if (typeof args[args.length - 1] === 'object') {
        var options = args.pop();
        strict = !!options.strict;
    }

    // 获取所有可迭代对象的长度
    var lengths = args.map(function (iterable) {
        return iterable.length;
    });

    // 找到最短的可迭代对象的长度
    var minLength = Math.min.apply(null, lengths);

    // 如果 strict 为 true，检查所有可迭代对象的长度是否一致
    if (strict) {
        for (var i = 0; i < lengths.length; i++) {
            if (lengths[i] !== minLength) {
                throw new Error("zip() argument " + (i + 1) + " is longer than argument " + (lengths.indexOf(minLength) + 1));
            }
        }
    }

    // 生成结果数组
    var result = [];
    for (var i = 0; i < minLength; i++) {
        var tuple = [];
        for (var j = 0; j < args.length; j++) {
            tuple.push(args[j][i]);
        }
        result.push(tuple);
    }

    return result;
}