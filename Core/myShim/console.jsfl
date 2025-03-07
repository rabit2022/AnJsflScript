/**
 * @file: console.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/21 17:59
 * @project: AnJsflScript
 * @description:
 * @see: https://github.com/davestewart/xJSFL
 */

define(function () {
    // --------------------------------------------------------------------------------
    // Log constants

    /**
     * @type {Object}    A selection of constants that can be used with xjsfl.output.log
     * @private
     */
    var Log = {
        // logged to main log, output panel, and an alert box
        TRACE: 'TRACE',

        // // debug
        // DEBUG: 'DEBUG',

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
    // output (this functinality is permanent)
    var trace = fl.trace;
    var projectFolder = window.$ProjectFileDir$;
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
        __formatLine: function (prefix, message, level, addNewline) {
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
        __writeToLog: function (message, $type, $level) {
            // parameters
            // var param, type, level;
            // for each(param in [$type, $level]) {
            // for (param in [$type, $level]) {
            var params = [$type, $level],
                type,
                level;
            params.forEach(function (param) {
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
         * 处理参数，支持多个字符串参数
         * @returns {string}
         * @private
         */
        __formatMessage: function () {
            var args = Array.prototype.slice.call(arguments); // 将 arguments 转换为数组
            return args.join('\t');
        },

        /**
         * Traces an "> xjsfl:" message to the Output panel
         * @param    {String}    message        The message to log
         * @param    {Number}    level        An optional Number to accentuate the message. 1 = capitals, 2 = horizontal rule & capitals
         */
        trace: function (message, level) {
            if (level === undefined) level = 0;
            // var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            var output = this.__formatLine('> xjsfl: ', message, level);
            fl.trace(output.replace(/[ \t]+/g, ' ').replace(/\r/g, ''));
            this.__writeToLog(message, Log.TRACE, level);
        },

        // debug: function (message) {
        //     trace('\n> xjsfl: DEBUG -' + message + '\n');
        //     this.writeToLog(message + '\n', Log.DEBUG, 3);
        // },

        log: function () {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  LOG  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.LOG, 3);
        },
        info: function () {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  INFO  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.INFO, 3);
        },
        warn: function () {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  WARNING  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.WARN, 3);
        },
        error: function () {
            var message = this.__formatMessage.apply(null, arguments); // 使用 formatMessage 处理 arguments

            trace('\n⚡admin  ERROR  ❯❯ ' + message + '\n');
            this.__writeToLog(message + '\n', Log.ERROR, 3);
        },

        /**
         * Clears a log file
         * @param    {String}    type    The type of log file to reset
         */
        clear: function (type) {
            var name = type === Log.FILE ? 'file' : 'main';
            FLfile.remove(projectFolder + '/Logs/' + name + '.log');
            trace(name + '.log reset');
        }
    };

    window.console = console;

    // return console;
});
