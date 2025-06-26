/**
 * @file: console.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/21 17:59
 * @project: AnJsflScript
 * @description:
 * @see: https://github.com/davestewart/xJSFL
 */

define(["JSFLInterface"], function(JSFLInterface) {
    const formatArgument = JSFLInterface.serializeToString;


    // --------------------------------------------------------------------------------
    // Log constants

    /**
     * @type {Object}    A selection of constants that can be used with xjsfl.output.log
     * @private
     */
    var Log = {
        // logged to main log, output panel, and an alert box
        TRACE: "TRACE",

        // debug
        DEBUG: "DEBUG",

        // log
        LOG: "LOG",

        // logged to main log
        INFO: "INFO",

        // logged to main log, output panel, and an alert box
        WARN: "WARN",

        // error
        ERROR: "ERROR",

        // logged to main log and file.log
        FILE: "FILE"
    };

    // --------------------------------------------------------------------------------
    // 常量
    const trace = fl.trace;
    const LOG_FOLDER = window.AnJsflScript.$ProjectFileDir$ + "/Logs/";
    const MAIN_LOG = LOG_FOLDER + "main.log";
    const FILE_LOG = LOG_FOLDER + "file.log";

    // region formatMessage
    /**
     * @description: 判断一个字符串是否符合 `printf` 或类似库的模板字符串格式
     * ### 正则表达式解释
     *     - `%`：占位符的开始。
     * - `(\d+\$)?`：可选的数字后跟 `$`，表示参数索引。   例如 `%1$s`
     * - `[+\-#0' ]*`：可选的符号、填充字符等修饰符。   例如 `%-5s`
     * - `([0-9]+|\*)?`：可选的宽度指定。   例如 `%5s`
     * - `(\.([0-9]+|\*))?`：可选的精度指定。   例如 `%5.2f`
     * - `([bBcCdisSuUfFeEgGoxXj])`：类型说明符，必须是 `printf` 支持的类型之一。   例如 `%s`
     * @param {string} str 要判断的字符串
     * @returns {boolean} 是否符合模板字符串格式
     */
    function IsTemplateString(str) {
        // 正则表达式匹配 printf 格式的占位符
        const printfPattern = /%(\d+\$)?[+\-#0' ]*([0-9]+|\*)?(\.([0-9]+|\*))?([bBcCdisSuUfFeEgGoxXj])/;

        return typeof str === "string" && printfPattern.test(str);
    }

    /**
     * 判断一个字符串是否符合 cookie 格式
     * @param {string} str 要判断的字符串
     * @returns {boolean} 是否符合 cookie 格式
     */
    function IsCookieString(str) {
        // 正则表达式匹配 cookie 格式
        const cookiePattern = /^([a-zA-Z0-9_]+)=([^;]*)/;

        return typeof str === "string" && cookiePattern.test(str);
    }

    /**
     * 处理参数
     * 1,,支持多个字符串参数
     * 2, 支持 sprintf 模板化字符串
     * 3, 支持复杂类型参数(对象、数组,字典)，会自动使用 JSON.stringify 格式化为字符串
     * 4，其他类型参数(null, undefined, boolean, number, function)，直接使用 String() 转换为字符串
     * @param    {...*}    args    The arguments to log
     * @returns {string}
     * @private
     */
    function formatMessage() {
        var args = Array.prototype.slice.call(arguments); // 将 arguments 转换为数组

        function useSerialized() {
            // 处理参数
            var formattedArgs = args.map(formatArgument);
            return formattedArgs.join("\n");
        }

        if (IsCookieString(args[0])) {
            return useSerialized();
        } else if (IsTemplateString(args[0])) {
            var formattedMessage = "";
            require(["sprintf-js"], function({ sprintf }) {
                // 使用 sprintf 格式化模板字符串
                formattedMessage = sprintf.apply(null, args);
            });
            return formattedMessage + "\t";
        } else {
            return useSerialized();
        }
    }

    // endregion formatMessage

    // region file
    /**
     * Creates the text that will be traced or logged
     * @param    {String}    prefix        The message prefix
     * @param    {String}    message        The message to trace or log
     * @param    {Number}    level        An optional Number to accentuate the message. 1 = capitals, 2 = horizontal rule & capitals
     * @param    {Boolean}    addNewline    An optional Boolean to add a new line to the traced output
     * @returns    {String}                The created message
     * @private
     */
    function formatLine(prefix, message, level, addNewline) {
        // new line
        var newLine = fl.version.substr(0, 3).toLowerCase() === "win" ? "\r\n" : "\n";
        var output = "";

        // level
        if (level > 0) {
            if (level === 1 || level === 2) {
                message = message.toUpperCase();
            }
            if (level >= 2) {
                output = "----------------------------------------------------------------------------------------------------" + newLine;
            }
            if (level === 3) {
                message += "----------------------------------------------------------------------------------------------------" + newLine;
            }
        }

        // trailing newline
        if (addNewline) {
            message += newLine;
        }

        // return
        return (level > 0 ? newLine : "") + output + prefix + "\t" + message;
    };

    /**
     * Logs a message to the xjsfl or file log, and optionally traces it
     * @param    {String}    message        The text of the log message
     * @param    {String}    $type        An optional Log.CONSTANT type for the log message. Defaults to Log.INFO
     * @param    {Boolean}    $level        An optional Boolean to accentuate the message with a new line and capitals
     * @param    {Number}    $level        An optional Number to accentuate the message with a new line and: 1 = capitals, 2 = horizontal rule & capitals
     * @note     如果LOG_FOLDER  文件夹不存在，不会创建日志文件，只会输出到控制台
     *           如果开发者需要创建日志文件，请在项目的主目录下创建 Logs 文件夹
     * @private
     */
    function writeToLog(message, $type, $level) {
        // parameters
        var params = [$type, $level], type, level;
        params.forEach(function(param) {
            if (typeof param === "string") type = param;
            if (typeof param === "number") level = param;
            if (typeof param === "boolean") level = param === true ? 1 : 0;
        });
        type = type || Log.INFO;

        // date
        var date = new Date();
        var time = date.toString().match(/\d{2}:\d{2}:\d{2}/) + ":" + (date.getMilliseconds() / 1000).toFixed(3).substr(2);

        // log to main
        // var uri = LOG_FOLDER + 'main.log';
        var output = formatLine(time, type + "\t" + message, level, true);
        FLfile.write(MAIN_LOG, output, "append");

        // extra logging for file
        if (type === Log.FILE) {
            // var uri = projectFolder + '/Logs/file.log';
            // var indent = new Array(xjsfl.file.stack.length + 1).join('	');
            // var output = this.create(time, indent + message, level, true);
            var output = formatLine(time, message, level, true);
            FLfile.write(FILE_LOG, output, "append");
        }
    };

    // endregion file

// 存储计时器的起始时间
    const timers = {};
// 存储计数器的计数
    const counters = {};
    var console = {

        /**
         * 打印调用栈信息,可以把报错地方替换为console.stack()，以显示报错的调用栈信息
         * @param message
         */
        stack: function(message) {
            require(["error-stack-parser"], function(ErrorStackParser) {
                try {
                    throw new Error(message || "Default stack trace");
                } catch (e) {
                    var stack = ErrorStackParser.parse(e);
                    console.info(stack);
                }
            });
        },

        // trace: function() {
        //     var message = formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments
        //
        //     trace("\n⚡admin  TRACE  ❯❯ " + message + "\n");
        //     writeToLog(message + "\n", Log.TRACE, 3);
        // },
        trace: trace,

        debug: function() {
            var message = formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace("\n⚡admin  DEBUG  ❯❯ " + message + "\n");
            writeToLog(message + "\n", Log.DEBUG, 3);
        },

        log: function() {
            var message = formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace("\n⚡admin  LOG  ❯❯ " + message + "\n");
            writeToLog(message + "\n", Log.LOG, 3);
        },

        info: function() {
            var message = formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace("\n⚡admin  INFO  ❯❯ " + message + "\n");
            writeToLog(message + "\n", Log.INFO, 3);
        },

        warn: function() {
            var message = formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace("\n⚡admin  WARNING  ❯❯ " + message + "\n");
            alert("WARNING  ❯❯ " + message + "\n");
            writeToLog(message + "\n", Log.WARN, 3);
        },

        error: function() {
            var message = formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace("\n⚡admin  ERROR  ❯❯ " + message + "\n");
            alert("⚡⚡⚡ ERROR ⚡⚡⚡ " + message + "\n");
            writeToLog(message + "\n", Log.ERROR, 3);
        },

        /**
         * Clears a log file
         * @param    {String}    type    The type of log file to reset
         */
        clear: function(type) {
            // 清空控制台
            fl.output.clear();

            // 清空日志文件
            var name = type === Log.FILE ? "file" : "main";
            FLfile.remove(LOG_FOLDER + name + ".log");
            trace(name + ".log reset");
        },

        table: function(data) {
            // 检查输入是否为数组或对象
            if (!Array.isArray(data) && typeof data !== "object") {
                throw new Error("table expects an array or an object");
            }

            // 如果是对象，将其转换为键值对数组
            if (typeof data === "object" && !Array.isArray(data)) {
                data = Object.entries(data).map(// ([key, value]) => ({ key, value }));
                    function([key, value]) {
                        return { key: key, value: value };
                    });
            }

            // 检查数据是否为空
            if (data.length === 0) {
                this.log("TABLE\nNo data to display.");
                return;
            }

            // 判断数据类型：普通数组或对象数组
            const isSimpleArray = Array.isArray(data) && typeof data[0] !== "object";

            // 获取所有列名（即对象的键）
            const columns = new Set();
            if (!isSimpleArray) {
                data.forEach(function(item) {
                    if (typeof item === "object") {
                        Object.keys(item).forEach(function(key) {
                            columns.add(key);
                        });
                    }
                });
            } else {
                columns.add("index");
                columns.add("value");
            }

            // 将列名转换为数组
            const columnNames = Array.from(columns);

            // 构建表格的表头
            const header = columnNames.join("\t");

            // 构建表格的每一行
            const rows = data.map(function(item, index) {
                if (isSimpleArray) {
                    // 处理普通数组
                    return [index, item].join("\t");
                } else {
                    // 处理对象数组
                    return columnNames
                        .map(function(column) {
                            return item[column] !== undefined ? String(item[column]) : "";
                        })
                        .join("\t");
                }
            });

            // 将表头和行内容拼接成最终的表格字符串
            const table = ["TABLE", header].concat(rows).join("\n");

            // 打印到控制台
            this.info(table);
        },

        time: function(label) {
            if (label === undefined) label = "default";
            if (timers[label]) {
                // console.warn(`Timer "${label}" already exists.`);
                this.warn("Timer \"%s\" already exists.", label);
                return;
            }
            timers[label] = Date.now();
            // console.log(`Timer "${label}" started.`);
            this.info("Timer \"%s\" started.", label);
        },
        timeEnd: function(label) {
            if (label === undefined) label = "default";
            if (!timers[label]) {
                // console.warn(`Timer "${label}" does not exist.`);
                this.warn("Timer \"%s\" does not exist.", label);
                return;
            }
            const endTime = Date.now();
            const duration = endTime - timers[label];
            delete timers[label];
            // console.log(`Timer "${label}": ${duration}ms`);
            this.info("Timer \"%s\": %sms", label, duration);
        },
        count: function(label) {
            if (label === undefined) label = "default";
            if (!counters[label]) {
                counters[label] = 0;
            }
            counters[label]++;
            // console.log(`"${label}" was called ${counters[label]} times.`);
            this.info("\"%s\" was called %s times.", label, counters[label]);
        },
        countReset: function(label) {
            if (label === undefined) label = "default";
            if (!counters[label]) {
                // console.warn(`Counter "${label}" does not exist.`);
                this.warn("Counter \"%s\" does not exist.", label);
                return;
            }
            delete counters[label];
            // console.log(`Counter "${label}" has been reset.`);
            this.info("Counter \"%s\" has been reset.", label);
        },
        assert: function(expression, message) {
            if (!expression) {
                throw new Error(message || "Assertion failed");
            }
        }
    };

    window.console = console;
    return console;
});
