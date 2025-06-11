/**
 * @file: FUNC.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/20 22:19
 * @project: AnJsflScript
 * @description:
 */

define(["sprintf-js"], function (sp) {
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
    // function INHERIT_MACRO(child, $parent, $properties) {
    //     // variables
    //     var parent, properties;
    //
    //     // grab correct arguments
    //     [$parent, $properties].forEach(function (arg) {
    //         if (typeof arg === "function") parent = arg;
    //         else if (typeof arg === "object") properties = arg;
    //     });
    //
    //     // extend child from a parent
    //     if (parent) {
    //         // set up the inheritance chain
    //         function Inheritance() {
    //             //this.superConstructor		= parent;
    //             //this.superClass				= parent.prototype;
    //         }
    //
    //         Inheritance.prototype = parent.prototype;
    //         child.prototype = new Inheritance();
    //         child.prototype.constructor = child;
    //
    //         // create references to parent
    //         child.superConstructor = parent;
    //         child.superClass = parent.prototype;
    //
    //         // create super methods
    //         // can this be done?
    //     }
    //
    //     // add properties to child
    //     if (properties) {
    //         for (var name in properties) {
    //             // check for accessors
    //             var getter = properties.__lookupGetter__(name);
    //             var setter = properties.__lookupSetter__(name);
    //
    //             // assign accessors
    //             if (getter || setter) {
    //                 if (getter) {
    //                     child.prototype.__defineGetter__(name, getter);
    //                 }
    //                 if (setter) {
    //                     child.prototype.__defineSetter__(name, setter);
    //                 }
    //             }
    //
    //             // assign vanilla properties
    //             else {
    //                 child.prototype[name] = properties[name];
    //             }
    //         }
    //     }
    // }

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
        // 定义属性
        Object.defineProperty(CLASS.prototype, name, {
            enumerable: true, // 属性可枚举
            configurable: true, // 属性可配置
            get: descriptor.get || undefined,
            set: descriptor.set || undefined,
            writable: !!descriptor.set // 如果有 setter，则允许写操作
        });
    }

    /**
     * 动态解析参数并分配到指定的变量中
     * 使得函数可以接收不同类型的参数，不用按照顺序指定参数类型，并自动分配到指定的变量中。
     * @param {...*|Array} args - 传入的参数数组
     * @param {Options} options - 参数处理选项
     * @returns {Object} - 解析后的参数对象
     * @note undefined 类型参数将被忽略
     * @example:
     * function test() {
     *     // 定义配置对象
     *     var config = {
     *         types: {
     *             'number': ['num1', 'num2'],
     *             'boolean': ['bool1', 'bool2'],
     *             'string': ['str1', 'str2'],
     *             'object': ['obj1', 'obj2'],
     *             'Array': ['arr1', 'arr2'],
     *             'function': ['func1', 'func2'],
     *             'undefined': ['undef1', 'undef2'],
     *             'null': ['null1', 'null2'],
     *             'any': ['any1', 'any2']
     *         },
     *         required: ['num1']
     *     };
     *
     *     // 将 arguments 转换为数组，并将 config 作为最后一个参数传入
     *     var argsArray = Array.prototype.slice.call(arguments);
     *     argsArray.push(config);
     *     var options = DYNAMIC_PARAMS.apply(null, argsArray);
     *     console.log(options);
     * }
     *
     * // 测试调用
     * test(1, true, 'hello', null, undefined, [1, 2, 3],{key: 'value'});
     */
    function DYNAMIC_PARAMS() {
        // 获取所有传入的参数
        var thisArgs = Array.prototype.slice.call(arguments);
        if (!thisArgs || thisArgs.length === 0) {
            throw new Error("No arguments provided.");
        }
        var args, config;
        // args:Array, config
        if (thisArgs.length === 2) {
            args = thisArgs[0];
            config = thisArgs[1];
        } else if (thisArgs.length > 2) {
            // 获取最后一个参数作为配置对象
            config = thisArgs.pop();
            args = thisArgs;
        } else {
            throw new Error("Invalid arguments provided.");
        }

        // 验证配置对象是否有效
        function validateConfig(config) {
            if (
                !config ||
                typeof config !== "object" ||
                !config.types ||
                !config.required
            ) {
                throw new Error(
                    "Invalid config object. It must contain `types` and `required` properties."
                );
            }
        }

        // 检查类型映射表中的目标是否有效
        function validateTargets(context, targets, paramType) {
            // 如果 targets 是字符串，先将其转换为数组
            if (typeof targets === "string") {
                context.typeMap[paramType] = [targets];
                targets = context.typeMap[paramType];
            }

            if (!Array.isArray(targets)) {
                throw new Error(
                    "Invalid targets for type " +
                        paramType +
                        ". Expected a string or an array."
                );
            }
        }

        // 获取目标变量名
        function getTargetVariable(targets) {
            if (!Array.isArray(targets) || targets.length === 0) {
                throw new Error("No available target variables for this type.");
            }
            return targets.shift();
        }

        // 根据类型分配参数到目标变量
        function assignParam(context, param) {
            var paramType = typeof param;
            if (param === null) {
                paramType = "null"; // 特殊处理 null
            } else if (paramType === "undefined") {
                paramType = "undefined"; // 特殊处理 undefined
            }

            var targets = context.typeMap[paramType];
            if (!targets) {
                throw new TypeError("Unsupported argument type: " + paramType);
            }

            // 检差 types 映射表中的 paramType 对应的 value 是否有效
            validateTargets(context, targets, paramType);

            var target = getTargetVariable(targets);
            context.parsedParams[target] = param;
        }

        // 检查是否缺少必需的参数
        function checkRequiredParams(context) {
            context.requiredParams.forEach(function (paramName) {
                if (context.parsedParams[paramName] === undefined) {
                    throw new Error("Missing required argument: " + paramName);
                }
            });
        }

        // 主逻辑
        validateConfig(config);

        var context = {
            parsedParams: {}, // 解析后的参数对象
            typeMap: config.types, // 类型映射表
            requiredParams: config.required // 必需的参数变量名
        };

        // 遍历参数数组，根据类型分配到对应的变量
        args.forEach(function (param) {
            console.log(param);
            assignParam(context, param);
        });

        // 检查是否缺少必需的参数
        checkRequiredParams(context);

        return context.parsedParams;
    }

    /**
     * 安全获取对象属性值，如果属性不存在则返回默认值。
     * 模仿  es2020 的?. 运算符。
     * @template T 泛型
     * @param {Object} rootObj - 根对象
     * @param {...string} safeGetProp - 安全获取属性路径
     * @param {T} defaultValue - 默认值
     * @returns {T} - 属性值或默认值
     */
    function SAFE_GET_MACRO() {
        // 获取所有参数
        var args = Array.prototype.slice.call(arguments);
        var props = args.slice(1); // 去掉第一个参数，剩下的都是属性路径或默认值

        // 最后一个参数作为默认值
        var defaultValue = args[args.length - 1];
        // 去除最后一个参数
        props.pop();

        // 如果根对象为空，直接返回默认值
        if (!rootObj) return defaultValue;

        // 遍历属性路径
        var current = rootObj;
        for (var i = 0; i < props.length; i++) {
            if (current[props[i]] === undefined) {
                return defaultValue;
            }
            current = current[props[i]];
        }

        return current;
    }

    /**
     * A better typeof function
     * @param    {Object}    value    Any object or value
     * @returns    {String}            The type of the object
     * @see                            http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
     * @see                            https://github.com/davestewart/xJSFL
     */
    var getType = function (value) {
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
    var getClass = function (value) {
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
    var getPrototypeChain = function (obj, includeSource) {
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
        PROPERTY: PROPERTY,
        DYNAMIC_PARAMS: DYNAMIC_PARAMS,
        SAFE_GET_MACRO: SAFE_GET_MACRO,
        getType: getType,
        getClass: getClass,
        getPrototypeChain: getPrototypeChain
    };
});
