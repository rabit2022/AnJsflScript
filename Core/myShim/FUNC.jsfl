/**
 * @file: Func.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/20 22:19
 * @project: AnJsflScript
 * @description:
 */

define(['sprintf'], function (sp) {
    const sprintf = sp.sprintf;

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
        var STRING_BLACK = / \n\r\t/g;
        if (
            typeof value === 'string' &&
            value.trim().replace(STRING_BLACK, '').length === 0
        )
            return true;

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
     * Subclasses an class from a parent class (note that $ arguments can be passed in any order)
     * 封装继承函数，用于实现子类继承父类。
     * @param    {Function}    child            The child class
     * @param    {Function}    $parent            The parent class
     * @param    {Object}    $properties        Properties to add to the chlid class
     * @see https://github.com/davestewart/xJSFL
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
     */
    function INHERIT_MACRO(child, $parent, $properties) {
        // variables
        var parent, properties;

        // grab correct arguments
        // for each(var arg in [$parent, $properties])
        [$parent, $properties].forEach(function (arg) {
            if (typeof arg === 'function') parent = arg;
            else if (typeof arg === 'object') properties = arg;
        });

        // extend child from a parent
        if (parent) {
            // set up the inheritance chain
            function Inheritance() {
                //this.superConstructor		= parent;
                //this.superClass				= parent.prototype;
            }

            Inheritance.prototype = parent.prototype;
            child.prototype = new Inheritance();
            child.prototype.constructor = child;

            // create references to parent
            child.superConstructor = parent;
            child.superClass = parent.prototype;

            // create super methods
            // can this be done?
        }

        // add properties to child
        if (properties) {
            for (var name in properties) {
                // check for accessors
                var getter = properties.__lookupGetter__(name);
                var setter = properties.__lookupSetter__(name);

                // assign accessors
                if (getter || setter) {
                    if (getter) {
                        child.prototype.__defineGetter__(name, getter);
                    }
                    if (setter) {
                        child.prototype.__defineSetter__(name, setter);
                    }
                }

                // assign vanilla properties
                else {
                    child.prototype[name] = properties[name];
                }
            }
        }
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
     * @param {Function} CLASS - 目标对象
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
                sprintf(
                    "PROPERTY: At least one of 'get' or'set' must be provided for property '%s'.\nExample: descriptor = { get: function() { return this._value; } };",
                    name
                )
            );
        }

        // 动态创建属性描述对象
        // 防止es5-shim报错
        var attr = {
            enumerable: true, // 属性可枚举
            configurable: true // 属性可配置
        };
        if (descriptor.get) attr.get = descriptor.get;
        if (descriptor.set) attr.set = descriptor.set;
        attr.writable = !!descriptor.set; // 如果有 setter，则允许写操作

        // 定义属性
        Object.defineProperty(CLASS.prototype, name, attr);
    }

    /**
     * 动态解析参数并分配到指定的变量中
     * 使得函数可以接收不同类型的参数，不用按照顺序指定参数类型，并自动分配到指定的变量中。
     * @param {Array} args - 传入的参数数组
     * @param {Object} options - 参数处理选项
     * @returns {Object} - 解析后的参数对象
     */
    function DYNAMIC_PARAMS(args, options) {
        const result = {};
        const { types, required } = options;

        // 遍历参数数组，根据类型分配到对应的变量
        for (var i = 0; i < args.length; i++) {
            const arg = args[i];
            const type = typeof arg;

            // 检查是否支持该类型
            if (!types[type]) {
                throw new TypeError('Unsupported argument type:' + type);
            }

            // 获取当前参数的分配目标
            const targets = types[type];
            if (!Array.isArray(targets)) {
                // throw new Error(`Invalid targets for type ${type}. Expected an array.`);
                throw new Error(
                    'Invalid targets for type ' + type + '. Expected an array.'
                );
            }

            // 分配参数到对应的属性
            const target = targets.shift(); // 从数组中取出第一个目标
            if (!target) {
                // throw new Error(`Too many arguments of type ${type}.`);
                throw new Error('Too many arguments of type ' + type + '.');
            }

            result[target] = arg;
        }

        // 检查是否缺少必需的参数
        // for (const key of required) {
        required.forEach(function (key) {
            if (result[key] === undefined) {
                // throw new Error(`Missing required argument: ${key}`);
                throw new Error('Missing required argument:' + key);
            }
        });

        return result;
    }

    return {
        IsNullOrEmpty: IsNullOrEmpty,
        IsEmpty: IsEmpty,
        INHERIT_MACRO: INHERIT_MACRO,
        OF_MACRO: OF_MACRO,
        PROPERTY: PROPERTY,
        DYNAMIC_PARAMS: DYNAMIC_PARAMS
    };
});
