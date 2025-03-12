/**
 * @file: console.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/21 17:59
 * @project: AnJsflScript
 * @description:
 * @see: https://github.com/davestewart/xJSFL
 */
// import 'core-js/stable/object/entries';
define(['sprintf', 'core-js/stable/object/entries'], function(sp) {
    const sprintf = sp.sprintf;
    // --------------------------------------------------------------------------------
    // Log constants

    /**
     * @type {Object}    A selection of constants that can be used with xjsfl.output.log
     * @private
     */
    var Log = {
        // logged to main log, output panel, and an alert box
        TRACE: 'TRACE',

        // debug
        DEBUG: 'DEBUG',

        // log
        LOG: 'LOG',

        // logged to main log
        INFO: 'INFO',

        // logged to main log, output panel, and an alert box
        WARN: 'WARN',

        // error
        ERROR: 'ERROR',

        // logged to main log and file.log
        FILE: 'FILE'
    };

    // --------------------------------------------------------------------------------
    // 常量
    const trace = fl.trace;
    const projectFolder = window.$ProjectFileDir$;

    // 存储计时器的起始时间
    const timers = {};
    // 存储计数器的计数
    const counters = {};
    var console = {
        /**
         * Creates the text that will be traced or logged
         * @param    {String}    prefix        The message prefix
         * @param    {String}    message        The message to trace or log
         * @param    {Number}    level        An optional Number to accentuate the message. 1 = capitals, 2 = horizontal rule & capitals
         * @param    {Boolean}    addNewline    An optional Boolean to add a new line to the traced output
         * @returns    {String}                The created message
         * @private
         */
        __formatLine: function(prefix, message, level, addNewline) {
            // new line
            var newLine =
                fl.version.substr(0, 3).toLowerCase() === 'win' ? '\r\n' : '\n';
            var output = '';

            // level
            if (level > 0) {
                if (level === 1 || level === 2) {
                    message = message.toUpperCase();
                }
                if (level >= 2) {
                    output =
                        '----------------------------------------------------------------------------------------------------' +
                        newLine;
                }
                if (level === 3) {
                    message +=
                        '----------------------------------------------------------------------------------------------------' +
                        newLine;
                }
            }

            // trailing newline
            if (addNewline) {
                message += newLine;
            }

            // return
            return (
                (level > 0 ? newLine : '') + output + prefix + '\t' + message
            );
        },

        /**
         * Logs a message to the xjsfl or file log, and optionally traces it
         * @param    {String}    message        The text of the log message
         * @param    {String}    $type        An optional Log.CONSTANT type for the log message. Defaults to Log.INFO
         * @param    {Boolean}    $level        An optional Boolean to accentuate the message with a new line and capitals
         * @param    {Number}    $level        An optional Number to accentuate the message with a new line and: 1 = capitals, 2 = horizontal rule & capitals
         * @private
         */
        __writeToLog: function(message, $type, $level) {
            // parameters
            // var param, type, level;
            // for each(param in [$type, $level]) {
            // for (param in [$type, $level]) {
            var params = [$type, $level],
                type,
                level;
            params.forEach(function(param) {
                // fl.trace(param);
                if (typeof param === 'string') type = param;
                if (typeof param === 'number') level = param;
                if (typeof param === 'boolean') level = param === true ? 1 : 0;
            });
            type = type || Log.INFO;

            // date
            var date = new Date();
            var time =
                date.toString().match(/\d{2}:\d{2}:\d{2}/) +
                ':' +
                (date.getMilliseconds() / 1000).toFixed(3).substr(2);

            // log to main
            var uri = projectFolder + '/Logs/main.log';
            // fl.trace("time: "+time+" type: "+type+" message: "+message+"level: "+level);
            var output = this.__formatLine(
                time,
                type + '\t' + message,
                level,
                true
            );
            // fl.trace(output);
            FLfile.write(uri, output, 'append');
            //trace(message);

            // extra logging for file
            if (type === Log.FILE) {
                var uri = projectFolder + '/Logs/file.log';
                // var indent = new Array(xjsfl.file.stack.length + 1).join('	');
                // var output = this.create(time, indent + message, level, true);
                var output = this.__formatLine(time, message, level, true);
                FLfile.write(uri, output, 'append');
            }
        },

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
        __formatMessage: function() {
            var args = Array.prototype.slice.call(arguments); // 将 arguments 转换为数组

            // 检查是否使用了 sprintf 的模板化字符串
            if (typeof args[0] === 'string' && args[0].includes('%')) {
                // 使用 sprintf 格式化模板字符串
                var formattedMessage = sprintf.apply(null, args);
                return formattedMessage + '\t';
            } else {
                // 如果不是模板字符串，处理复杂类型
                var formattedArgs = args.map(function(arg) {
                    if (typeof arg === 'object' && arg !== null) {
                        // 如果是对象或数组，使用 JSON.stringify 格式化为字符串
                        var json = JSON.stringify(arg, null, 2);
                        return '\n' + json + '\n';
                    } else {
                        // 其他类型直接返回字符串形式
                        return String(arg) + '\t';
                    }
                });

                // 使用制表符连接所有参数
                // return formattedArgs.join('\t');
                return formattedArgs.join('') + '\t';
            }
        },

        // /**
        //  * Traces an "> xjsfl:" message to the Output panel
        //  * @param    {String}    message        The message to log
        //  * @param    {Number}    [level]        An optional Number to accentuate the message. 1 = capitals, 2 = horizontal rule & capitals
        //  */
        // trace: function(message, level) {
        //     if (level === undefined) level = 0;
        //     // var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments
        //
        //     var output = this.__formatLine('> xjsfl: ', message, level);
        //     fl.trace(output.replace(/[ \t]+/g, ' ').replace(/\r/g, ''));
        //     this.__writeToLog(message, Log.TRACE, level);
        // },

        trace: function() {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  TRACE  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.TRACE, 3);
        },

        debug: function() {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  DEBUG  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.DEBUG, 3);
        },

        log: function() {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  LOG  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.LOG, 3);
        },
        info: function() {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  INFO  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.INFO, 3);
        },
        warn: function() {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  WARNING  ❯❯ ' + message + '\n');
            alert('WARNING  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.WARN, 3);
        },
        error: function() {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  ERROR  ❯❯ ' + message + '\n');
            alert('⚡⚡⚡ ERROR ⚡⚡⚡ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.ERROR, 3);
        },

        /**
         * Clears a log file
         * @param    {String}    type    The type of log file to reset
         */
        clear: function(type) {
            var name = type === Log.FILE ? 'file' : 'main';
            FLfile.remove(projectFolder + '/Logs/' + name + '.log');
            trace(name + '.log reset');
        },

        table: function(data) {
            // 检查输入是否为数组或对象
            if (!Array.isArray(data) && typeof data !== 'object') {
                throw new Error('table expects an array or an object');
            }

            // 如果是对象，将其转换为键值对数组
            if (typeof data === 'object' && !Array.isArray(data)) {
                data = Object.entries(data).map(
                    // ([key, value]) => ({ key, value }));
                    function([key, value]) {
                        return { key: key, value: value };
                    }
                );
            }

            // 检查数据是否为空
            if (data.length === 0) {
                this.log('TABLE\nNo data to display.');
                return;
            }

            // 判断数据类型：普通数组或对象数组
            const isSimpleArray =
                Array.isArray(data) && typeof data[0] !== 'object';

            // 获取所有列名（即对象的键）
            const columns = new Set();
            if (!isSimpleArray) {
                data.forEach(function(item) {
                    if (typeof item === 'object') {
                        Object.keys(item).forEach(function(key) {
                            columns.add(key);
                        });
                    }
                });
            } else {
                columns.add('index');
                columns.add('value');
            }

            // 将列名转换为数组
            const columnNames = Array.from(columns);

            // 构建表格的表头
            const header = columnNames.join('\t');

            // 构建表格的每一行
            const rows = data.map(function(item, index) {
                if (isSimpleArray) {
                    // 处理普通数组
                    return [index, item].join('\t');
                } else {
                    // 处理对象数组
                    return columnNames
                        .map(function(column) {
                            return item[column] !== undefined
                                ? String(item[column])
                                : '';
                        })
                        .join('\t');
                }
            });

            // 将表头和行内容拼接成最终的表格字符串
            const table = ['TABLE', header].concat(rows).join('\n');

            // 打印到控制台
            this.info(table);
        },

        time: function(label) {
            if (label === undefined) label = 'default';
            if (timers[label]) {
                // console.warn(`Timer "${label}" already exists.`);
                this.warn(sprintf('Timer "%s" already exists.', label));
                return;
            }
            timers[label] = Date.now();
            // console.log(`Timer "${label}" started.`);
            this.info(sprintf('Timer "%s" started.', label));
        },
        timeEnd: function(label) {
            if (label === undefined) label = 'default';
            if (!timers[label]) {
                // console.warn(`Timer "${label}" does not exist.`);
                this.warn(sprintf('Timer "%s" does not exist.', label));
                return;
            }
            const endTime = Date.now();
            const duration = endTime - timers[label];
            delete timers[label];
            // console.log(`Timer "${label}": ${duration}ms`);
            this.info(sprintf('Timer "%s": %sms', label, duration));
        },
        count: function(label) {
            if (label === undefined) label = 'default';
            if (!counters[label]) {
                counters[label] = 0;
            }
            counters[label]++;
            // console.log(`"${label}" was called ${counters[label]} times.`);
            this.info(
                sprintf('"%s" was called %s times.', label, counters[label])
            );
        },
        countReset: function(label) {
            if (label === undefined) label = 'default';
            if (!counters[label]) {
                // console.warn(`Counter "${label}" does not exist.`);
                this.warn(sprintf('Counter "%s" does not exist.', label));
                return;
            }
            delete counters[label];
            // console.log(`Counter "${label}" has been reset.`);
            this.info(sprintf('Counter "%s" has been reset.', label));
        },
        assert: function(expression, message) {
            if (!expression) {
                throw new Error(message || 'Assertion failed');
            }
        }
    };

    window.console = console;

    // return console;
});
