/**
 * @file: Func.jsfl
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
        if (typeof value === 'string' && value.trim() === '') return true;

        // 检查空数组
        if (Array.isArray(value) && value.length === 0) return true;

        // 检查空对象
        if (
            typeof value === 'object' &&
            value.constructor === Object &&
            Object.keys(value).length === 0
        )
            return true;

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
        function TempConstructor() {}

        TempConstructor.prototype = superCls_CLASS.prototype;

        // 将子类的原型指向父类的原型
        subCls_CLASS.prototype = new TempConstructor();
        subCls_CLASS.prototype.constructor = subCls_CLASS; // 修复子类的 constructor 指针

        // 保留对父类原型的引用，方便调用父类方法
        subCls_CLASS.prototype._super = superCls_CLASS.prototype;
    }

    /**
     * 遍历可迭代对象（数组、类数组对象、普通对象、字典对象），并对每个元素执行回调函数。
     * @param {Array|Object|Dict} iterable - 可迭代对象。
     * @param {Function} callback - 回调函数。
     * @note
     * - 对于数组、类数组对象，回调函数将接收两个参数：索引和元素值。
     * - 对于普通对象、字典对象，回调函数将接收两个参数：键和元素值。
     * - 如果可迭代对象为空，则不会执行回调函数。
     * @example
     * // 遍历数组
     * var arr = [1, 2, 3];
     * OF_MACRO(arr, function (index, value) {
     *   console.writeToLog(index + ": " + value);
     * });
     * // 输出：0: 1
     * //       1: 2
     * //       2: 3
     *
     * // 遍历类数组对象
     * var obj = {0: "a", 1: "b", 2: "c"};
     * OF_MACRO(obj, function (index, value) {
     *   console.writeToLog(index + ": " + value);
     * });
     * // 输出：0: a
     * //       1: b
     * //       2: c
     *
     * // 遍历普通对象
     * var obj = {a: 1, b: 2, c: 3};
     * OF_MACRO(obj, function (key, value) {
     *   console.writeToLog(key + ": " + value);
     * });
     * // 输出：a: 1
     * //       b: 2
     * //       c: 3
     *
     * // 遍历字典对象
     * var obj = {a: 1, b: 2, c: 3};
     * OF_MACRO(obj, function (key, value) {
     *   console.writeToLog(key + ": " + value);
     * });
     * // 输出：a: 1
     * //       b: 2
     * //       c: 3
     */
    function OF_MACRO(iterable, callback) {
        // 检查是否是数组或类数组对象
        if (
            Array.isArray(iterable) ||
            (typeof iterable === 'object' &&
                iterable !== null &&
                typeof iterable.length === 'number')
        ) {
            for (var i = 0; i < iterable.length; i++) {
                callback(i, iterable[i]); // 传递值和索引
            }
        }
        // 检查是否是普通对象或字典对象
        else if (typeof iterable === 'object' && iterable !== null) {
            var keys = Object.keys(iterable); // 获取对象的键
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = iterable[key];
                callback(key, value); // 传递值和键
            }
        }
        // 其他情况抛出错误
        else {
            throw new TypeError('The provided value is not iterable');
        }
    }

    /**
     * 定义属性
     * @param {Class} CLASS - 目标对象
     * @param {string} name - 属性名
     * @param {{get:function,set:function}} descriptor - 属性描述符
     * @note
     * - 定义属性时，必须提供 get 或 set 方法，否则会抛出错误。
     * - 定义属性时，如果提供了 set 方法，则允许写操作。
     * - 定义属性时，如果提供了 get 方法，则允许读操作。
     * @example
     * // 定义属性
     * function MyClass() {
     *   this._name = "John";
     * }
     *
     * PROPERTY(MyClass, "name", {
     *   get: function () {
     *     return this._name;
     *   },
     *   set: function (value) {
     *     this._name = value;
     *   }
     * });
     *
     * // 测试
     * var instance = new MyClass();
     * console.writeToLog(instance.name); // 输出：John
     * instance.name = "Mary";
     * console.writeToLog(instance.name); // 输出：Mary
     */
    function PROPERTY(CLASS, name, descriptor) {
        // 确保至少提供了一个 get 或 set 方法
        if (!descriptor.get && !descriptor.set) {
            throw new Error(
                `PROPERTY: At least one of 'get' or 'set' must be provided for property '${name}'.`
            );
        }

        // 定义属性
        Object.defineProperty(CLASS.prototype, name, {
            get: descriptor.get || undefined, // 如果没有提供 get，则设置为 undefined
            set: descriptor.set || undefined, // 如果没有提供 set，则设置为 undefined
            enumerable: true, // 属性可枚举
            configurable: true, // 属性可配置
            writable: !!descriptor.set // 如果有 setter，则允许写操作
        });
    }

    return {
        IsNullOrEmpty: IsNullOrEmpty,
        IsEmpty: IsEmpty,
        INHERIT_MACRO: INHERIT_MACRO,
        OF_MACRO: OF_MACRO,
        PROPERTY: PROPERTY
    };
});
