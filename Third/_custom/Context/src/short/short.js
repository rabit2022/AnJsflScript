// /**
//  * Creates a context from a supplied element
//  * @param    value
//  * @returns
//  */
// Context.from = function (value) {
//
//     //TODO Create context using shorthand string
//     // doc>item~layer@frame:element
//     Context.create('file:///c|path/to.fla>path/to/item~layer name@frame number or name:element name');
//
//     Context.create('file:///c|path/to.fla');
//     Context.create('/path/to/item');
//     Context.create('~layer name or index');
//     Context.create('~[layer name,layer name,layer name,layer name]');
//     Context.create('@frame number or name');
//     Context.create('element name');
//     Context.create(URI.toURI());
//
//     switch (Utils.getClass(value)) {
//
//     }
// }
const Context = require('../Context');

// 正则表达式
// doc>item~layer@frame:element
// file:///c|path/to.fla>path/to/item~layer index or layer name@frame number or name:element number or name
const SHORT_REG =
    /([file:\/\/\/|\./|/]+[^>~@:]*)?>?([^~@:]+)?>?([^~@:]+)?~?([^@:]+)?@?([^:]+)?:?(.+)?/;
const ABSOLUTE_PATH = /^file:\/\/\/[a-zA-Z]/; // 绝对路径
const IS_NUMBER = /^\d+$/; // 数字
/**
 * 获取当前工作目录。
 *
 * @return {string} - 当前工作目录的路径。
 */
function getcwd() {
    // 获取当前脚本文件的完整路径
    var scriptURI = fl.scriptURI;
    // 获取路径中最后一个“/”的位置
    var lastSlashIndex = scriptURI.lastIndexOf('/');
    // 获取脚本文件所在的文件夹路径
    var folderPath = scriptURI.substring(0, lastSlashIndex);
    return folderPath;
}

/**
 * 创建一个上下文对象。
 *
 * @param {string} shortString - 短字符串。
 * @return {Context} - 上下文对象。
 */
Context.prototype.from = function (shortString) {
    // 匹配
    const match = shortString.match(SHORT_REG);

    if (match) {
        const doc = match[1] || ''; // doc部分
        if (doc) {
            const isAbsolutePath = ABSOLUTE_PATH.test(doc); // 是否为绝对路径
            this.setDOM(isAbsolutePath ? doc : getcwd() + doc);
        }

        let item = match[2] || ''; // item部分
        if (item) {
            // this.setItem(item);
            // 进入item层
        }
        let layer = match[3] || ''; // layer部分
        if (layer) {
            // number
            if (layer.match(IS_NUMBER)) {
                layer = parseInt(layer);
            }
            this.setLayer(layer);
        }
        let frame = match[4] || ''; // frame部分
        if (frame) {
            // number
            if (frame.match(IS_NUMBER)) {
                frame = parseInt(frame);
            }
            this.setFrame(frame);
        }
        let element = match[5] || ''; // element部分
        if (element) {
            if (element.match(IS_NUMBER)) {
                element = parseInt(element);
            }
            this.setElement(element);
        }
    } else {
        throw new Error(
            'Invalid short string, please check the format  doc>item~layer@frame:element\n' +
                'example:  file:///c|path/to.fla>path/to/item~layer index or layer name@frame number or name:element number or name',
        );
    }
};
