/**
 * @file: SObject.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/11 20:36
 * @project: AnJsflScript
 * @description:
 */

define(function() {
    /**
     * SObject 构造函数
     * @constructor
     * @note  子类必须有 无参构造函数，否则clone方法会报错
     */
    function SObject() {
    }

    /**
     * 复制 SObject 对象的属性
     * @param {SObject} other 要复制的 SObject 对象
     * @returns {SObject} 返回当前对象
     */
    SObject.prototype.copy = function(other) {
        // if (!(other instanceof SObject)) {
        //     throw new TypeError("The argument must be an instance of SObject.");
        // }
        for (var prop in other) {
            if (other.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                this[prop] = other[prop];
            }
        }
        return this;
    };

    /**
     * 克隆 SObject 对象
     * @returns {SObject} 返回克隆后的对象
     */
    SObject.prototype.clone = function() {
        var SObjectConstructor = this.constructor;
        var sObject = new SObjectConstructor();
        sObject.copy(this);
        return sObject;
    };


    /**
     * 返回对象的字符串表示
     * @returns {string} 返回对象的字符串表示
     */
    SObject.prototype.toString = function() {
        var props = [];
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                props.push(prop + "=" + this[prop]);
            }
        }
        return this.constructor.name + "(" + props.join(", ") + ")";
    };

    /**
     * 返回对象的属性值的普通对象表示
     * @returns {Object} 返回对象的属性值的普通对象表示
     */
    SObject.prototype.toObj = function() {
        var obj = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                obj[prop] = this[prop];
            }
        }
        return obj;
    };

    /**
     * 静态方法，返回类的字符串表示
     * @returns {string} 返回类的字符串表示
     */
    SObject.toString = function() {
        return "[class " + this.name + "]";
    };


    return {
        SObject: SObject
    };

});