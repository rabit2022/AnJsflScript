/**
 * @file: open.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/27 22:41
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 打开一个文件并返回一个文件对象。
     * @param {string} file 要打开的文件名。
     * @param {'r'|'w'|'a'|'x'} [mode='r'] 打开文件的模式。} [mode='r'] 打开文件的模式。
     * @param {string} [encoding='utf-8'] 打开文件的编码。
     * @throws {Error} 如果文件编码不是utf-8，则抛出错误。
     * @return {{f: fileObject}} 是否成功打开文件。读取模式下返回文件内容，写入模式下返回是否成功写入。
     * @note 将指定的字符串写入到指定的文件中 （作为 UTF-8）。
     * @example
     * with (open(asciiFilePath, 'r')) {
     *     log.info('文件内容：', f.read());
     *     var lines = f.readLines();
     *     log.info('文件行数：', lines.length);
     * }
     */
    function open(file, mode, encoding) {
        if (mode === undefined) {
            mode = 'r';
        }
        if (encoding === undefined) {
            encoding = 'utf-8';
        }
        if (encoding !== 'utf-8') {
            throw new Error('暂不支持非utf-8编码的文件');
        }

        var file_content,
            file_lines,
            readLineCount = 0;

        /**
         * @type fileObject
         * @typedef {{ name: string, mode: ("r"|"w"|"a"|"x"), read: Function, writeLines: Function, readLines:Function, readLine:Function, write: Function, close: Function }}
         */
        const fileObject = {
            name: file,
            mode: mode,
            read: function (size) {
                if (file_content === undefined) {
                    file_content = FLfile.read(file);
                }

                if (size === undefined) {
                    size = -1;
                }
                if (size === -1) {
                    return file_content;
                } else {
                    return file_content.substr(0, size);
                }
            },
            readLine: function () {
                // 每一次调用readLine都会返回文件的一行内容，并且指针指向下一行的开头。
                var file_content = this.read();
                if (file_lines === undefined) {
                    file_lines = file_content.split('\n');
                }
                if (file_lines.length === 0) {
                    return null;
                }
                var line = file_lines[readLineCount];
                readLineCount++;
                return line;
            },
            readLines: function () {
                this.readLine();
                return file_lines;
            },
            write: function (text) {
                switch (mode) {
                    case 'w':
                        return FLfile.write(file, text, 'w');
                        break;
                    case 'a':
                        return FLfile.write(file, text, 'a');
                        break;
                    case 'x':
                        return FLfile.write(file, text, 'w');
                        break;
                    default:
                        throw new Error('Invalid mode: ' + mode);
                }
            },
            writeLines: function (lines) {
                var text = lines.join('\n');
                return this.write(text);
            },
            close: function () {
                file_content = undefined;
                file_lines = undefined;
                readLineCount = 0;
            }
        };
        return {
            f: fileObject
        };
    }

    return open;
});
