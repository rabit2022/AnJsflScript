/**
 * @file: FUNC.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/20 22:19
 * @project: AnJsflScript
 * @description:
 */

define(function() {

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
        if (value === null) return true;

        // 检查空字符串
        var STRING_BLACK = / \n\r\t/g;
        if (
            typeof value === "string" &&
            value.trim().replace(STRING_BLACK, "").length === 0
        )
            return true;

        // 检查空数组
        if (Array.isArray(value) && value.length === 0) return true;

        // 检查空对象
        if (
            typeof value === "object" &&
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
     */
    function INHERIT_MACRO(SUB_CLASS, SUPER_CLASS, properties) {
        // 继承父类原型
        SUB_CLASS.prototype = Object.create(SUPER_CLASS.prototype);
        SUB_CLASS.prototype.constructor = SUB_CLASS;

        // 添加父类引用
        SUB_CLASS.superConstructor = SUPER_CLASS;
        SUB_CLASS.superClass = SUPER_CLASS.prototype;

        // 继承父类 静态方法
        Object.assign(SUB_CLASS, SUPER_CLASS);

        // 添加属性或方法
        if (properties) {
            Object.assign(SUB_CLASS.prototype, properties);
        }
    }


    var __assign = (this && this.__assign) || function() {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * 动态解析参数并分配到指定的变量中
     * 使得函数可以接收不同类型的参数，不用按照顺序指定参数类型，并自动分配到指定的变量中。
     * @param {...*|Array} args - 传入的参数数组
     * @param {Options} options - 参数处理选项
     * @returns {Object} - 解析后的参数对象
     * @note undefined 类型参数将被忽略
     * @example:
     * class Person {
     *  name: string;
     *  age: number;
     *
     *  constructor(name: string, age: number) {
     *  this.name = name;
     *  this.age = age;
     *  }
     *  }
     *
     *  function test(...args: any[]) {
     *
     *  const schema: Schema = {
     *  age: ['number', 'string'],
     *  isMale: ['boolean', 'number', 'string'],
     *  onhashchange: ['null', 'undefined', 'string'],
     *  arr: ['array'],
     *  obj: ['object'],
     *  person: [Person, 'object']
     *  };
     *
     *  const defaults = {
     *  age: 18,
     *  isMale: false,
     *  onhashchange: undefined,
     *  arr: [],
     *  obj: {},
     *  person: new Person('Bob', 30)
     *  };
     *  const config = DYNAMIC_PARAMS(args, schema, defaults);
     *  console.log("test->", config);
     *  }
     *
     *  test(1, 2);
     */
    function DYNAMIC_PARAMS(args, schema, defaults) {
        if (defaults === void 0) {
            defaults = {};
        }
        var res = __assign({}, defaults);
        var used = new Set();
        for (var key in schema) {
            var rules = [].concat(schema[key]);
            var _loop_1 = function(i) {
                if (used.has(i))
                    return "continue";
                var v = args[i];
                var ok = rules.some(function(r) {
                    if (r === "string")
                        return typeof v === "string";
                    if (r === "number")
                        return typeof v === "number";
                    if (r === "boolean")
                        return typeof v === "boolean";
                    if (r === "null")
                        return v === null;
                    if (r === "undefined")
                        return v === undefined;
                    if (r === "array")
                        return Array.isArray(v);
                    if (r === "object")
                        return v && typeof v === "object" && !Array.isArray(v);
                    return v instanceof r;
                });
                if (ok) {
                    res[key] = v;
                    used.add(i);
                    return "break";
                }
            };
            for (var i = 0; i < args.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        }
        return res;
    }


    /**
     * A better typeof function
     * @param    {Object}    value    Any object or value
     * @returns    {String}            The type of the object
     * @see                            http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
     * @see                            https://github.com/davestewart/xJSFL
     */
    var getType = function(value) {
        // slight alteration here, otherwise null and undefined return 'window'
        if (value === null) return null;
        if (typeof value === "undefined") return "undefined";
        return Object.prototype.toString
            .call(value)
            .match(/\s([a-zA-Z]+)/)[1]
            .toLowerCase();
    };

    /**
     * Get the class of an object as a string
     *
     * @param    {value}        value        Any value
     * @returns    {String}                The class name of the value i.e. 'String', 'Date', 'CustomClass'
     * @see https://github.com/davestewart/xJSFL
     */
    var getClass = function(value) {
        // return null if the value is not an object
        if (value === null || typeof value === "undefined") return null;

        // return the object's class if it's a native type
        if (typeof value !== "object") {
            var $class = Object.prototype.toString.call(value).match(/\s([a-zA-Z]+)/)[1];
            if ($class !== "Object") {
                return $class;
            }
        }

        // if the value has a proper toString() method, i.e. "[object ClassName]" and is not a native Object, parse that
        var matches = value.toString().match(/^\[\w+\s*(\w+)/);
        if (matches && matches[1] && matches[1] !== "Object") {
            return matches[1];
        }

        // otherwise, attempt to parse the constructor source
        var matches = value.constructor.toSource().match(/^function\s*(\w+)/);
        if (matches && matches.length == 2) {
            // fail if the return value is an anonymous / wrapped Function
            if (matches[1] != "Function") {
                return matches[1];
            }

            // attempt to grab value.toSource() result
            else {
                matches = value.toSource().match(/^function\s*(\w+)/);
                if (matches && matches[1]) {
                    return matches[1];
                }
            }
        }

        // if we still can't get it, return 'Object'
        return "Object";
    };

    /**
     * Gets the prototype chain of an object
     * @param    {Object}    obj                An instantiated object
     * @param    {Boolean}    includeSource    An optional Boolean to include the original object
     * @returns    {Array}                        An Array of the original instantation object
     * @see https://github.com/davestewart/xJSFL
     */
    var getPrototypeChain = function(obj, includeSource) {
        var chain = includeSource ? [obj] : [];
        while (obj.__proto__) {
            obj = obj.__proto__;
            chain.push(obj);
        }
        return chain;
    };

    // /**
    //  * Returns the named SWF panel if it exists
    //  * @param    {String}    name        The panel name
    //  * @returns    {SWFPanel}                An SWFPanel object
    //  */
    // getPanel: function (name) {
    //     if (name) {
    //         name = String(name).toLowerCase();
    //         for (var i = 0; i < fl.swfPanels.length; i++) {
    //             if (fl.swfPanels[i].name.toLowerCase() === name) {
    //                 return fl.swfPanels[i];
    //             }
    //         }
    //     }
    //     return null;
    // },

    return {
        IsNullOrEmpty: IsNullOrEmpty,
        IsEmpty: IsEmpty,
        INHERIT_MACRO: INHERIT_MACRO,
        // PROPERTY: PROPERTY,
        DYNAMIC_PARAMS: DYNAMIC_PARAMS,
        // SAFE_GET_MACRO: SAFE_GET_MACRO,
        getType: getType,
        getClass: getClass,
        getPrototypeChain: getPrototypeChain
    };
});
