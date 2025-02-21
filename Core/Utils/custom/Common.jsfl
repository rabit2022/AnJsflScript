/**
 * @file: Common.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/20 22:19
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 检查值是否为 null、undefined 或 空值。
     * @param {*} value - 要检查的值。
     * @returns {boolean} - 如果值为 null、undefined 或空字符串，则返回 true；否则返回 false。
     */
    function IsNullOrEmpty(value) {
        return value === null || value === undefined || IsEmpty(value);
    }

    /**
     * 检查值是否为空（支持字符串、数组和对象）。
     * @param {*} value - 要检查的值。
     * @returns {boolean} - 如果值为空，则返回 true；否则返回 false。
     */
    function IsEmpty(value) {
        // 检查 null 或 undefined
        if (value == null) return true;

        // 检查空字符串
        if (typeof value === "string" && value.trim() === "") return true;

        // 检查空数组
        if (Array.isArray(value) && value.length === 0) return true;

        // 检查空对象
        if (typeof value === "object" && value.constructor === Object && Object.keys(value).length === 0) return true;

        return false; // 其他情况视为非空
    }

    /**
     * 封装继承函数，用于实现子类继承父类。
     * @param {Function} subCls_CLASS - 子类的构造函数（类名称）
     * @param {Function} superCls_CLASS - 父类的构造函数（类名称）
     * @note
     * 如何在子类中模拟 `super` 的行为：
     * 1. 在子类构造函数中调用父类构造函数：
     *    使用 `superCls_CLASS.call(this, ...args)` 调用父类构造函数。
     *    示例：`superCls_CLASS.call(this, name);`
     *
     * 2. 在子类方法中调用父类方法：
     *    使用 `this._super.methodName.call(this, ...args)` 调用父类方法。
     *    示例：`this._super.sayHello.call(this);`
     *
     * 命名约定：
     * - `_MACRO` 或 `_M`：类似宏的函数，表示这是一个工具函数。
     * - `_CLASS` 或 `_Cls`：表示参数类型是类（构造函数）。
     * - `_Proto` 或 `_Prototype`：强调这个构造函数是基于原型链实现的。
     * @example
     * // 定义父类
     * function SuperClass(name) {
     *   this.name = name;
     * }
     *
     * SuperClass.prototype.sayHello = function () {
     *   return "Hello, my name is " + this.name + ".";
     * };
     *
     * // 定义子类
     * function SubClass(name, age) {
     *   SuperClass.call(this, name); // 调用父类构造函数
     *   this.age = age;
     * }
     *
     * // 使用 INHERIT_MACRO 实现继承
     * INHERIT_MACRO(SubClass, SuperClass);
     *
     * // 重写父类方法
     * SubClass.prototype.sayHello = function () {
     *   var parentMessage = this._super.sayHello.call(this); // 调用父类方法
     *   return parentMessage + " I am " + this.age + " years old.";
     * };
     *
     * // 测试
     * var instance = new SubClass("John", 25);
     * console.writeToLog(instance.sayHello()); // 输出：Hello, my name is John. I am 25 years old.
     */
    function INHERIT_MACRO(subCls_CLASS, superCls_CLASS) {
        // 创建一个临时构造函数用于继承父类的原型
        function TempConstructor() {
        }

        TempConstructor.prototype = superCls_CLASS.prototype;

        // 将子类的原型指向父类的原型
        subCls_CLASS.prototype = new TempConstructor();
        subCls_CLASS.prototype.constructor = subCls_CLASS; // 修复子类的 constructor 指针

        // 保留对父类原型的引用，方便调用父类方法
        subCls_CLASS.prototype._super = superCls_CLASS.prototype;
    }
    
    return {
        IsNullOrEmpty: IsNullOrEmpty,
        IsEmpty: IsEmpty,
        INHERIT_MACRO: INHERIT_MACRO
    };
});
