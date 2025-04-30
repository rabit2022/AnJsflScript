/**
 * StringP 类，用于扩展字符串功能。
 * @constructor
 * @param {string} str - 初始化字符串。
 */

define(function () {
    function StringP(str) {
        if (typeof str !== "string") {
            throw new TypeError("Expected a string");
        }
        this.str = str;
    }

    /**
     * 创建一个方法，将字符串包装为 StringP 实例。
     * @returns {StringP} - 包装后的 StringP 实例。
     */
    String.prototype.P = function () {
        return new StringP(this);
    };

    /**
     * 所有小写字母 'abcdefghijklmnopqrstuvwxyz'。
     * @static
     * @type {string}
     */
    StringP.ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";

    /**
     * 所有大写字母 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'。
     * @static
     * @type {string}
     */
    StringP.ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
     * 所有 ASCII 字母（小写 + 大写）。
     * @static
     * @type {string}
     */
    StringP.ascii_letters = StringP.ascii_lowercase + StringP.ascii_uppercase;

    /**
     * 所有数字字符 '0123456789'。
     * @static
     * @type {string}
     */
    StringP.digits = "0123456789";

    /**
     * 所有十六进制数字（小写 + 大写）'0123456789abcdefABCDEF'。
     * @static
     * @type {string}
     */
    StringP.hexdigits = StringP.digits + "abcdef" + "ABCDEF";

    /**
     * 所有八进制数字 '01234567'。
     * @static
     * @type {string}
     */
    StringP.octdigits = "01234567";

    /**
     * 所有标点符号。
     * @static
     * @type {string}
     */
    StringP.punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    /**
     * 所有空白字符（空格、制表符、换行符等）。
     * @static
     * @type {string}
     */
    StringP.whitespace = " \t\n\r\f\v";

    /**
     * 所有可打印字符（数字、字母、标点符号和空白字符）。
     * @static
     * @type {string}
     */
    StringP.printable =
        StringP.digits + StringP.ascii_letters + StringP.punctuation + StringP.whitespace;

    /**
     * 所有关键字。
     * @static
     * @type {string[]}
     */
    StringP.keywords = [
        // es5 关键字
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "export",
        "extends",
        "finally",
        "for",
        "function",
        "if",
        "import",
        "in",
        "instanceof",
        "new",
        "return",
        "super",
        "switch",
        "this",
        "throw",
        "try",
        "typeof",
        "var",
        "void",
        "while",
        "with",
        "yield", // 严格模式下的关键字
        "enum", // ES6 引入的关键字
        "let", // es2017 关键字
        "async",
        "await", // 未来保留关键字
        "implements",
        "interface",
        "package",
        "private",
        "protected",
        "public",
        "static"
    ];

    /**
     * 将字符串中的每个单词首字母大写，其余部分小写，并根据指定的分隔符进行分割和拼接。
     * 如果未提供分隔符或分隔符为 null/undefined，则默认使用空格分隔，并移除多余的空白字符。
     *
     * @param {string} s - 需要处理的字符串。
     * @param {string} [sep=null] - 分隔符。如果省略或为 null/undefined，则使用空格分隔。
     * @returns {string} - 处理后的字符串，每个单词首字母大写。
     *
     * @example
     * capwords("hello world"); // "Hello World"
     * capwords("  hello   world  "); // "Hello World"
     * capwords("hello-world", "-"); // "Hello-World"
     * capwords("hello,WORLD,how,are,you", ","); // "Hello,world,how,are,you"
     */
    StringP.capwords = function (s, sep) {
        // 如果 sep 未提供或为 null/undefined，则默认使用空格作为分隔符
        if (sep === null || sep === undefined) {
            sep = " ";
        }

        // 使用 sep 分割字符串
        var words;
        if (sep === " ") {
            // 如果 sep 是空格，则先 trim 去除首尾空白，然后使用正则表达式分割连续的空白字符
            words = s.trim().split(/\s+/);
        } else {
            // 如果 sep 是其他字符，则直接使用 sep 分割字符串
            words = s.split(sep);
        }

        // 将每个单词首字母大写，其余部分小写
        var capitalizedWords = words.map(function (word) {
            if (word.length === 0) return word; // 空字符串保持不变
            // 首字母大写，其余部分小写
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        // 使用 sep 拼接单词
        return capitalizedWords.join(sep);
    };

    StringP.prototype.toString = function () {
        return this.str;
    };

    /**
     * 返回原字符串的副本，其首个字符大写，其余为小写。
     *
     * @returns {string} - 处理后的字符串。
     * @example
     * "hello world".P().capitalize(); // 输出: "Hello world"
     * "HELLO WORLD".P().capitalize(); // 输出: "Hello world"
     * "hELLO wORLD".P().capitalize(); // 输出: "Hello world"
     * "".P().capitalize();            // 输出: ""
     * "123abc".P().capitalize();      // 输出: "123abc"
     */
    StringP.prototype.capitalize = function () {
        if (this.str.length === 0) {
            return this.str; // 空字符串直接返回
        }

        // 获取第一个字符并转换为大写
        var firstChar = this.str.charAt(0).toUpperCase();

        // 获取剩余部分并转换为小写
        var restOfString = this.str.slice(1).toLowerCase();

        // 返回拼接后的结果
        return firstChar + restOfString;
    };

    /**
     * 返回原字符串消除大小写的副本。
     * 类似于 toLowerCase()，但更彻底，可以处理一些特殊字符。
     * @returns {string} - 消除大小写后的字符串。
     * @example
     * console.writeToLog("ß".casefold()); // 输出: "ss"
     * console.writeToLog("HELLO WORLD".casefold()); // 输出: "hello world"
     * console.writeToLog("hELLO wORLD".casefold()); // 输出: "hello world"
     * console.writeToLog("".casefold()); // 输出: ""
     * console.writeToLog("123abc".casefold()); // 输出: "123abc"
     */
    StringP.prototype.casefold = function () {
        // 使用 toLowerCase() 作为基础实现
        return this.str.toLowerCase().replace(/[^a-z0-9]/gi, function (match) {
            // 对于一些特殊字符进行额外处理
            var specialCases = {
                ß: "ss",
                Æ: "ae",
                Œ: "oe",
                æ: "ae",
                œ: "oe"
            };
            return specialCases[match] || match.toLowerCase();
        });
    };

    /**
     * 返回长度为 width 的字符串，原字符串在其正中。
     * 使用指定的 fillchar 填充两边的空位（默认使用空格）。
     * 如果 width 小于等于字符串长度，则返回原字符串的副本。
     * @param {number} width - 目标字符串的宽度。
     * @param {string} [fillchar=' '] - 填充字符，默认为空格。
     * @returns {string} - 居中对齐后的字符串。
     * @example
     * console.writeToLog("hello".center(10)); // 输出: "   hello  "
     * console.writeToLog("world".center(10, '-')); // 输出: "---world---"
     * console.writeToLog("abc".center(5)); // 输出: "  abc  "
     * console.writeToLog("".center(5, '*')); // 输出: "*****"
     * console.writeToLog("12345".center(5)); // 输出: "12345"
     */
    StringP.prototype.center = function (width, fillchar) {
        if (typeof width !== "number" || width < 0) {
            throw new TypeError("Width must be a non-negative number");
        }
        if (typeof fillchar !== "string" || fillchar.length !== 1) {
            throw new TypeError("Fillchar must be a single character");
        }

        var str = this.str.toString();
        var len = str.length;

        if (len >= width) {
            return str;
        }

        var padding = width - len;
        var leftPadding = Math.floor(padding / 2);
        var rightPadding = padding - leftPadding;

        var fill = "";
        for (var i = 0; i < leftPadding; i++) {
            fill += fillchar;
        }

        var rightFill = "";
        for (var j = 0; j < rightPadding; j++) {
            rightFill += fillchar;
        }

        return fill + str + rightFill;
    };

    /**
     * 返回子字符串在指定范围内的非重叠出现次数。
     * 如果子字符串为空，则返回字符之间的空字符串数（字符串长度加一）。
     * @param {string} sub - 要查找的子字符串。
     * @param {number} [start=0] - 开始查找的起始索引。
     * @param {number} [end=this.str.length] - 结束查找的结束索引。
     * @returns {number} 子字符串的出现次数。
     * @example
     * const str = "hello world, hello JavaScript";
     * console.writeToLog(str.count("hello")); // 输出: 2
     * console.writeToLog(str.count("")); // 输出: 31
     * console.writeToLog(str.count("hello", 0, 10)); // 输出: 1
     */
    StringP.prototype.count = function (sub, start, end) {
        start = start || 0;
        end = end || this.str.length;

        const slicedStr = this.str.slice(start, end);

        if (sub === "") {
            return slicedStr.length + 1;
        }

        const regex = new RegExp(sub, "g");
        const matches = slicedStr.match(regex);

        return matches ? matches.length : 0;
    };

    /**
     * 将字符串编码为字节序列。
     * 默认支持 UTF-8 编码。
     * @param {string} [encoding='utf-8'] - 编码格式（目前仅支持 'utf-8'）。
     * @param {string} [errors='strict'] - 错误处理方式（目前未实现）。
     * @returns {Uint8Array} 编码后的字节序列。
     * @throws {Error} 如果指定的编码不支持。
     * @example
     * const str = "你好，世界！";
     * const encoded = str.encode(); // 默认使用 UTF-8 编码
     * console.writeToLog(encoded); // 输出: Uint8Array(18) [228, 189, 160, 227, 110, 185, 228, 184, 150, 228, 189, 160, 227, 111, 141, 228, 189, 145]
     */
    StringP.prototype.encode = function (encoding, errors) {
        encoding = encoding || "utf-8";

        if (encoding.toLowerCase() === "utf-8") {
            const encoder = new TextEncoder();
            return encoder.encode(this.str);
        } else {
            throw new Error("Unsupported encoding: " + encoding);
        }
    };

    /**
     * 检查字符串是否以指定的后缀结束。
     * @param {string|string[]} suffix - 要检查的后缀，也可以是一个后缀数组。
     * @param {number} [start=0] - 开始检查的位置。
     * @param {number} [end=this.str.length] - 结束检查的位置。
     * @returns {boolean} 如果字符串以指定的后缀结束，则返回 true，否则返回 false。
     * @example
     * 'hello world'.endswith('world'); // true
     * 'hello world'.endswith('world', 6); // true
     * 'hello world'.endswith(['world', 'earth']); // true
     */
    StringP.prototype.endswith = function (suffix, start, end) {
        start = start || 0;
        end = end || this.str.length;

        const slicedStr = this.str.slice(start, end);

        // 如果 suffix 是数组，检查是否以任意一个后缀结束
        if (Array.isArray(suffix)) {
            return suffix.some(function (suf) {
                slicedStr.endsWith(suf);
            });
        }

        // 如果 suffix 是字符串，直接使用 endsWith 方法
        return slicedStr.endsWith(suffix);
    };

    /**
     * 将字符串中的所有制表符替换为空格，替换的空格数量取决于制表符宽度。
     * @param {number} [tabsize=8] - 制表符宽度，默认为 8。
     * @returns {string} 替换制表符后的字符串。
     * @example
     * '01\t012\t0123\t01234'.expandtabs(); // '01      012     0123    01234'
     * '01\t012\t0123\t01234'.expandtabs(4); // '01  012 0123    01234'
     */
    StringP.prototype.expandtabs = function (tabsize) {
        tabsize = tabsize || 8;
        var result = "";
        var column = 0;

        for (var i = 0; i < this.str.length; i++) {
            const char = this.str[i];

            if (char === "\t") {
                const spacesToAdd = tabsize - (column % tabsize);
                result += " ".repeat(spacesToAdd);
                column += spacesToAdd;
            } else if (char === "\n" || char === "\r") {
                result += char;
                column = 0;
            } else {
                result += char;
                column++;
            }
        }

        return result;
    };

    /**
     * 返回子字符串在字符串中被找到的最小索引。
     * @param {string} sub - 要查找的子字符串。
     * @param {number} [start=0] - 开始查找的位置。
     * @param {number} [end=this.str.length] - 结束查找的位置。
     * @returns {number} 如果找到子字符串，返回其索引；否则返回 -1。
     * @example
     * 'hello world'.find('world'); // 6
     * 'hello world'.find('world', 6); // 6
     * 'hello world'.find('world', 7); // -1
     */
    StringP.prototype.find = function (sub, start, end) {
        start = start || 0;
        end = end || this.str.length;

        const slicedStr = this.str.slice(start, end);
        const index = slicedStr.indexOf(sub);

        return index === -1 ? -1 : index + start;
    };

    /**
     * 格式化字符串，支持位置参数和关键字参数。
     * @param {string} template - 包含替换域的字符串模板。
     * @param {any[]} args - 位置参数数组。
     * @param {Object} kwargs - 关键字参数对象。
     * @returns {string} 格式化后的字符串。
     * @example
     * const result = format("The sum of 1 + 2 is {0}", 3);
     * console.writeToLog(result); // "The sum of 1 + 2 is 3"
     * const result2 = format("{name} was born in {country}", { name: "Guido" });
     * console.writeToLog(result2); // "Guido was born in {country}"
     */
    // function format(template) {
    StringP.prototype.format = function () {
        // 获取所有参数
        var args = Array.prototype.slice.call(arguments, 1);
        var kwargs = args[args.length - 1];

        // 检查最后一个参数是否是对象（可能是关键字参数）
        if (typeof kwargs === "object" && !Array.isArray(kwargs)) {
            args.pop(); // 如果是对象，则从 args 中移除
        } else {
            kwargs = {}; // 如果没有关键字参数，则初始化为空对象
        }

        var template = this.str;
        // 替换模板中的 {key} 或 {index}
        return template.replace(/\{(\w+)\}/g, function (match, key) {
            if (!isNaN(parseInt(key))) {
                // 如果是数字索引
                return args[key] !== undefined ? args[key] : match;
            } else {
                // 如果是关键字参数
                return kwargs[key] !== undefined ? kwargs[key] : match;
            }
        });
    };

    /**
     * 格式化字符串，直接使用映射对象而不是复制到一个字典。
     * @param {string} template - 包含替换域的字符串模板。
     * @param {Object} mapping - 映射对象，用于替换替换域。
     * @returns {string} 格式化后的字符串。
     * @example
     * var result = formatMap("{name} was born in {country}", { name: "Guido" });
     * console.writeToLog(result); // "Guido was born in {country}"
     */
    StringP.prototype.formatMap = function (mapping) {
        var template = this.str;
        // 替换模板中的 {key}
        return template.replace(/\{(\w+)\}/g, function (match, key) {
            return mapping[key] !== undefined ? mapping[key] : match;
        });
    };

    StringP.prototype.isalpha = function () {
        return /^[a-zA-Z]+$/.test(this.str);
    };

    StringP.prototype.isdecimal = function () {
        return /^[0-9]+$/.test(this.str);
    };

    StringP.prototype.isdigit = function () {
        return /^[0-9]+$/.test(this.str);
    };

    StringP.prototype.isnumeric = function () {
        return /^[0-9]+$/.test(this.str);
    };

    StringP.prototype.isalnum = function () {
        return this.isalpha() || this.isdecimal() || this.isdigit() || this.isnumeric();
    };

    StringP.prototype.isascii = function () {
        return /^[\x00-\x7F]*$/.test(this.str);
    };

    StringP.prototype.islower = function () {
        return /^[a-z]+$/.test(this.str);
    };

    StringP.prototype.isprintable = function () {
        return /^[\x20-\x7E]*$/.test(this.str);
    };

    StringP.prototype.isspace = function () {
        return /^[\s\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/.test(
            this.str
        );
    };

    StringP.prototype.istitle = function () {
        return /^[A-Z][a-z]*$/.test(this.str);
    };

    StringP.prototype.isupper = function () {
        return /^[A-Z]+$/.test(this.str);
    };

    StringP.prototype.isidentifier = function () {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(this.str);
    };

    StringP.prototype.iskeyword = function () {
        return StringP.keywords.includes(this.str);
    };

    /**
     * 返回一个由 iterable 中的字符串拼接而成的字符串。
     * 如果 iterable 中存在任何非字符串值包括 bytes 对象则会引发 TypeError。 调用该方法的字符串将作为元素之间的分隔。
     * @param {string[]} iterable - 要拼接的字符串数组。
     * @returns {string} 拼接后的字符串。
     * @example
     * const result = join(["hello", "world", "javascript"]);
     * console.writeToLog(result); // "hello,world,javascript"
     */
    StringP.prototype.join = function (iterable) {
        return iterable.join(this.str);
    };

    /**
     * 返回长度为 width 的字符串，原字符串在其中靠左对齐。
     * 使用指定的 fillchar 填充空位 (默认使用 ASCII 空格符)。
     * 如果 width 小于等于 len(s) 则返回原字符串的副本。
     * @param {number} width - 字符串的长度。
     * @param {string} [fillchar=' '] - 填充字符。
     * @returns {string} 填充后的字符串。
     * @example
     * const result = "hello".ljust(10);
     * console.writeToLog(result); // "hello     "
     * const result = "hello".ljust(10, "*");
     * console.writeToLog(result); // "hello*****"
     */
    StringP.prototype.ljust = function (width, fillchar) {
        if (typeof width !== "number" || width < 0) {
            throw new TypeError("Width must be a non-negative number");
        }
        if (typeof fillchar !== "string" || fillchar.length !== 1) {
            throw new TypeError("Fillchar must be a single character");
        }

        var str = this.str.toString();
        var len = str.length;

        if (len >= width) {
            return str;
        }

        var padding = width - len;
        var leftPadding = Math.floor(padding / 2);
        var rightPadding = padding - leftPadding;

        var fill = "";
        for (var i = 0; i < leftPadding; i++) {
            fill += fillchar;
        }

        var rightFill = "";
        for (var j = 0; j < rightPadding; j++) {
            rightFill += fillchar;
        }

        return fill + str + rightFill;
    };

    /**
     * 返回原字符串的副本，其所有区分大小写的字符 [4] 均转换为小写。
     * @returns {string} 转换后的字符串。
     * @example
     * const result = "HELLO WORLD".lower();
     * console.writeToLog(result); // "hello world"
     */
    StringP.prototype.lower = function () {
        return this.str.toLowerCase();
    };

    /**
     * 返回原字符串的副本，移除其中的前导字符。
     * chars 参数为指定要移除字符的字符串。
     * 如果省略或为 None，则 chars 参数默认移除空白符。
     * 实际上 chars 参数并非指定单个前缀；而是会移除参数值的所有组合:
     * @param {string} [chars] - 要移除的字符。
     * @returns {string} 移除前导字符后的字符串。
     * @example
     * const result = "   spacious   ".lstrip();
     * console.writeToLog(result); // "spacious   "
     * const result = "www.example.com".lstrip("cmowz.");
     * console.writeToLog(result); // "example.com"
     */
    StringP.prototype.lstrip = function (chars) {
        if (chars === undefined) {
            return this.str.replace(/^\s+/, "");
        } else {
            return this.str.replace(new RegExp("^[" + chars + "]+"), "");
        }
    };

    /**
     * 返回一个可供 str.translate() 使用的转换对照表。
     *
     * 如果只有一个参数，则它必须是一个将 Unicode 码位序号（整数）或字符（长度为 1 的字符串）映射到 Unicode 码位序号、（任意长度的）字符串或 None 的字典。 字符键将会被转换为码位序号。
     * 如果有两个参数，则它们必须是两个长度相等的字符串，并且在结果字典中，x 中每个字符将被映射到 y 中相同位置的字符。 如果有第三个参数，它必须是一个字符串，其中的字符将在结果中被映射到 None。
     * @param {Object|string} x - 第一个参数。
     * @param {string} [y] - 第二个参数。
     * @param {string} [z] - 第三个参数。
     * @returns {Object} 转换对照表。
     * @example
     * const result = maketrans("abc", "xyz");
     * console.writeToLog(result); // {97: 120, 98: 121, 99: 122}
     */
    StringP.maketrans = function (x, y, z) {
        if (typeof x === "object") {
            var result = {};
            for (var key in x) {
                if (x.hasOwnProperty(key)) {
                    result[key] = x[key];
                }
            }
            return result;
        } else if (typeof x === "string" && typeof y === "string") {
            var result = {};
            for (var i = 0; i < x.length; i++) {
                result[x.charCodeAt(i)] = y.charCodeAt(i);
            }
            return result;
        } else {
            throw new TypeError(
                "maketrans() takes either two strings or a single dictionary"
            );
        }
    };

    /**
     * 在 sep 首次出现的位置拆分字符串，返回一个 3 元组，其中包含分隔符之前的部分、分隔符本身，以及分隔符之后的部分。 如果分隔符未找到，则返回的 3 元组中包含字符本身以及两个空字符串。
     * @param {string} sep - 分隔符。
     * @returns {string[]} 3 元组。
     * @example
     * const result = "hello,world,javascript".partition(",");
     * console.writeToLog(result); // ["hello", ",", "world,javascript"]
     */
    StringP.prototype.partition = function (sep) {
        var index = this.str.indexOf(sep);
        if (index === -1) {
            return [this.str, "", ""];
        } else {
            return [this.str.slice(0, index), sep, this.str.slice(index + sep.length)];
        }
    };

    /**
     * 如果字符串以 prefix 字符串开头，返回 string[len(prefix):]。 否则，返回原始字符串的副本：
     * @param {string} prefix - 前缀字符串。
     * @param {RegExp} [sep] - 用于分割字符串的正则表达式。
     * @returns {string} 移除前缀后的字符串。
     * @example
     * const result = "TestHook".removeprefix("Test");
     * console.writeToLog(result); // "Hook"
     * const result = "BaseTestCase".removeprefix("Test");
     * console.writeToLog(result); // "BaseTestCase"
     */
    StringP.prototype.removeprefix = function (prefix, sep) {
        if (sep === undefined) {
            return this.str.slice(prefix.length);
        } else {
            return this.str.slice(prefix.split(sep).join("").length);
        }
    };

    /**
     * 如果字符串以 suffix 字符串结尾，并且 suffix 非空，返回 string[:-len(suffix)]。 否则，返回原始字符串的副本:
     * @param {string} suffix - 后缀字符串。
     * @param {RegExp} [sep] - 用于分割字符串的正则表达式。
     * @returns {string} 移除后缀后的字符串。
     * @example
     * const result = "MiscTests".removesuffix("Tests");
     * console.writeToLog(result); // "Misc"
     * const result = "TmpDirMixin".removesuffix("Tests");
     * console.writeToLog(result); // "TmpDirMixin"
     */
    StringP.prototype.removesuffix = function (suffix, sep) {
        if (sep === undefined) {
            return this.str.slice(0, -suffix.length);
        } else {
            return this.str.slice(0, -suffix.split(sep).join("").length);
        }
    };

    /**
     * 返回字符串的副本，其中出现的所有子字符串 old 都将被替换为 new。 如果给出了 count，则只替换前 count 次出现。 如果 count 未指定或为 -1，则全部替换。
     * @param {string|RegExp} old - 要替换的子字符串或正则表达式。
     * @param {string} new_ - 要替换为的字符串。
     * @param {number} [count] - 要替换的次数。
     * @returns {string} 替换后的字符串。
     * @example
     * const result = "hello,world,javascript".replace(",", "-");
     * console.writeToLog(result); // "hello-world-javascript"
     */
    StringP.prototype.replace = function (old, new_, count) {
        if (typeof old === "string") {
            return this.str.replace(new RegExp(old, "g"), new_);
        } else {
            return this.str.replace(old, new_, count);
        }
    };

    /**
     * 返回子字符串 sub 在字符串内被找到的最大（最右）索引，这样 sub 将包含在 s[start:end] 当中。 可选参数 start 与 end 会被解读为切片表示法。 如果未找到则返回 -1。
     * @param {string} sub - 要查找的子字符串。
     * @param {number} [start] - 开始搜索的索引。
     * @param {number} [end] - 结束搜索的索引。
     * @returns {number} 子字符串的索引。
     * @example
     * const result = "hello,world,javascript".rfind(",");
     * console.writeToLog(result); // 10
     */
    StringP.prototype.rfind = function (sub, start, end) {
        return this.str.lastIndexOf(sub, start, end);
    };

    /**
     * 类似于 rfind()，但在子字符串 sub 未找到时会引发 ValueError。
     * @param {string} sub - 要查找的子字符串。
     * @param {number} [start] - 开始搜索的索引。
     * @param {number} [end] - 结束搜索的索引。
     * @returns {number} 子字符串的索引。
     * @example
     * const result = "hello,world,javascript".rindex(",");
     * console.writeToLog(result); // 10
     */
    StringP.prototype.rindex = function (sub, start, end) {
        var index = this.str.lastIndexOf(sub, start, end);
        if (index === -1) {
            throw new ValueError("substring not found");
        } else {
            return index;
        }
    };

    /**
     * 返回长度为 width 的字符串，原字符串在其中靠右对齐。 使用指定的 fillchar 填充空位 (默认使用 ASCII 空格符)。 如果 width 小于等于 len(s) 则返回原字符串的副本。
     * @param {number} width - 字符串的长度。
     * @param {string} [fillchar=' '] - 填充字符。
     * @returns {string} 填充后的字符串。
     * @example
     * const result = "hello".rjust(10);
     * console.writeToLog(result); // "     hello"
     * const result = "hello".rjust(10, "*");
     * console.writeToLog(result); // "*****hello"
     */
    StringP.prototype.rjust = function (width, fillchar) {
        if (typeof width !== "number" || width < 0) {
            throw new TypeError("Width must be a non-negative number");
        }
        if (typeof fillchar !== "string" || fillchar.length !== 1) {
            throw new TypeError("Fillchar must be a single character");
        }

        var str = this.str.toString();
        var len = str.length;

        if (len >= width) {
            return str;
        }

        var padding = width - len;
        var leftPadding = Math.floor(padding / 2);
        var rightPadding = padding - leftPadding;

        var fill = "";
        for (var i = 0; i < leftPadding; i++) {
            fill += fillchar;
        }

        var rightFill = "";
        for (var j = 0; j < rightPadding; j++) {
            rightFill += fillchar;
        }

        return rightFill + str + fill;
    };

    /**
     * 在 sep 最后一次出现的位置拆分字符串，返回一个 3 元组，其中包含分隔符之前的部分、分隔符本身，以及分隔符之后的部分。 如果分隔符未找到，则返回的 3 元组中包含两个空字符串以及字符串本身。
     * @param {string} sep - 分隔符。
     * @returns {string[]} 3 元组。
     * @example
     * const result = "hello,world,javascript".rpartition(",");
     * console.writeToLog(result); // ["hello,world", ",", "javascript"]
     */
    StringP.prototype.rpartition = function (sep) {
        var index = this.str.lastIndexOf(sep);
        if (index === -1) {
            return ["", "", this.str];
        } else {
            return [
                this.str.slice(0, index + sep.length),
                sep,
                this.str.slice(index + sep.length)
            ];
        }
    };

    /**
     * 返回一个由字符串内单词组成的列表，使用 sep 作为分隔字符串。 如果给出了 maxsplit，则最多进行 maxsplit 次拆分，从 最右边 开始。 如果 sep 未指定或为 None，任何空白字符串都会被作为分隔符。 除了从右边开始拆分，rsplit() 的其他行为都类似于下文所述的 split()。
     * @param {string|RegExp} [sep] - 分隔符。
     * @param {number} [maxsplit=-1] - 最大拆分次数。
     * @returns {string[]} 单词列表。
     * @example
     * const result = "hello,world,javascript".rsplit(",");
     * console.writeToLog(result); // ["hello", "world", "javascript"]
     */
    StringP.prototype.rsplit = function (sep, maxsplit) {
        if (sep === undefined) {
            return this.str.split(/\s+/, maxsplit);
        } else if (typeof sep === "string") {
            return this.str.split(sep, maxsplit);
        } else {
            return this.str.split(sep, maxsplit);
        }
    };

    /**
     * 返回原字符串的副本，移除其中的末尾字符。 chars 参数为指定要移除字符的字符串。 如果省略或为 None，则 chars 参数默认移除空白符。 实际上 chars 参数并非指定单个后缀；而是会移除参数值的所有组合:
     * @param {string} [chars] - 要移除的字符。
     * @returns {string} 移除末尾字符后的字符串。
     * @example
     * const result = "   spacious   ".rstrip();
     * console.writeToLog(result); // "   spacious"
     * const result = "www.example.com".rstrip("cmowz.");
     * console.writeToLog(result); // "www.example"
     */
    StringP.prototype.rstrip = function (chars) {
        if (chars === undefined) {
            return this.str.replace(/\s+$/, "");
        } else {
            return this.str.replace(new RegExp("[" + chars + "]+$"), "");
        }
    };

    /**
     * 返回一个由字符串内单词组成的列表，使用 sep 作为分隔字符串。 如果给出了 maxsplit，则最多进行 maxsplit 次拆分（因此，列表最多会有 maxsplit+1 个元素）。 如果 maxsplit 未指定或为 -1，则不限制拆分次数（进行所有可能的拆分）。
     *
     * 如果给出了 sep，则连续的分隔符不会被组合在一起而是会被视为分隔空字符串 (例如 '1,,2'.split(',') 将返回 ['1', '', '2'])。 sep 参数可能是由多个字符组成的单个分隔符 (要使用多个分隔符进行拆分，请使用 re.split())。 使用指定的分隔符拆分一个空字符串将返回 ['']。
     * @param {string|RegExp} [sep] - 分隔符。
     * @param {number} [maxsplit=-1] - 最大拆分次数。
     * @returns {string[]} 单词列表。
     * @example
     * const result = "hello,world,javascript".split(",");
     * console.writeToLog(result); // ["hello", "world", "javascript"]
     */
    StringP.prototype.split = function (sep, maxsplit) {
        if (sep === undefined) {
            return this.str.split(/\s+/, maxsplit);
        } else if (typeof sep === "string") {
            return this.str.split(sep, maxsplit);
        } else {
            return this.str.split(sep, maxsplit);
        }
    };

    /**
     * 返回原字符串的副本，移除其中的前导和末尾字符。 chars 参数为指定要移除字符的字符串。 如果省略或为 None，则 chars 参数默认移除空白符。 实际上 chars 参数并非指定单个前缀或后缀；而是会移除参数值的所有组合:
     * @param {string} [chars] - 要移除的字符。
     * @returns {string} 移除前导和末尾字符后的字符串。
     * @example
     * const result = "   spacious   ".strip();
     * console.writeToLog(result); // "spacious"
     * const result = "www.example.com".strip("cmowz.");
     * console.writeToLog(result); // "example"
     */
    StringP.prototype.strip = function (chars) {
        if (chars === undefined) {
            return this.str.trim();
        } else {
            return this.str.replace(
                new RegExp("^[" + chars + "]+|[" + chars + "]+$", "g"),
                ""
            );
        }
    };

    /**
     * 返回原字符串的标题版本，其中每个单词第一个字母为大写，其余字母为小写。
     * @returns {string} 标题版本的字符串。
     * @example
     * const result = "hello world".title();
     * console.writeToLog(result); // "Hello World"
     */
    StringP.prototype.title = function () {
        return this.str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    /**
     * 返回原字符串的副本，其中大写字符转换为小写，反之亦然。 请注意 s.swapcase().swapcase() == s 并不一定为真值。
     * @returns {string} 大小写互换后的字符串。
     * @example
     * const result = "HeLLo WorLD".swapcase();
     * console.writeToLog(result); // "hEllO wOrld"
     */
    StringP.prototype.swapcase = function () {
        return this.str.replace(/[a-z]/gi, function (c) {
            return c.toUpperCase() === c ? c.toLowerCase() : c.toUpperCase();
        });
    };

    /**
     * 返回原字符串的副本，其中每个字符按给定的转换表进行映射。 转换表必须是一个通过 __getitem__() 来实现索引操作的对象，通常为 mapping 或 sequence。 当以 Unicode 码位序号（整数）为索引时，转换表对象可以做以下任何一种操作：返回 Unicode 码位序号或字符串，将字符映射为一个或多个其他字符；返回 None，将字符从返回的字符串中删除；或引发 LookupError 异常，将字符映射为其自身。
     *
     * @param {object} table - 转换表。
     * @returns {string} 映射后的字符串。
     * @example
     * const result = "hello,world,javascript".translate({',': null});
     * console.writeToLog(result); // "helloworldjavascript"
     */
    StringP.prototype.translate = function (table) {
        var result = "";
        for (var i = 0; i < this.str.length; i++) {
            var code = this.str.charCodeAt(i);
            var mapped = table[code];
            if (mapped === undefined) {
                result += this.str[i];
            } else if (mapped === null) {
                // skip this character
            } else if (typeof mapped === "number") {
                result += String.fromCharCode(mapped);
            } else if (typeof mapped === "string") {
                result += mapped;
            } else {
                throw new TypeError("translation table must be an object");
            }
        }
        return result;
    };

    /**
     * 返回原字符串的副本，其中所有区分大小写的字符 [4] 均转换为大写。 请注意如果 s 包含不区分大小写的字符或者如果结果字符的 Unicode 类别不是 "Lu" (Letter, uppercase) 而是 "Lt" (Letter, titlecase) 则 s.upper().isupper() 有可能为 False。
     *
     * @returns {string} 大写字符串。
     * @example
     * const result = "hello,world,javascript".upper();
     * console.writeToLog(result); // "HELLO,WORLD,JAVASCRIPT"
     */
    StringP.prototype.upper = function () {
        return this.str.toUpperCase();
    };

    /**
     * 返回原字符串的副本，在左边填充 ASCII '0' 数码使其长度变为 width。 正负值前缀 ('+'/'-') 的处理方式是在正负符号 之后 填充而非在之前。 如果 width 小于等于 len(s) 则返回原字符串的副本。
     *
     * @param {number} width - 字符串的长度。
     * @returns {string} 填充后的字符串。
     * @example
     * const result = "42".zfill(5);
     * console.writeToLog(result); // "00042"
     * const result = "-42".zfill(5);
     * console.writeToLog(result); // "-0042"
     */
    StringP.prototype.zfill = function (width) {
        if (typeof width !== "number" || width < 0) {
            throw new TypeError("Width must be a non-negative number");
        }

        var str = this.str.toString();
        var len = str.length;

        if (len >= width) {
            return str;
        }

        var padding = width - len;
        var sign = "";
        if (str.charAt(0) === "+" || str.charAt(0) === "-") {
            sign = str.charAt(0);
            str = str.slice(1);
        }

        var result = "";
        for (var i = 0; i < padding; i++) {
            result += "0";
        }

        return sign + result + str;
    };

    return StringP;
});
