// 这个文件由脚本 FUNC.define.ts 自动生成，任何手动修改都将会被覆盖.
var __assign = (this && this.__assign) || function () {
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsNullOrEmpty = IsNullOrEmpty;
    exports.IsEmpty = IsEmpty;
    exports.INHERIT_MACRO = INHERIT_MACRO;
    exports.DYNAMIC_PARAMS = DYNAMIC_PARAMS;
    function IsNullOrEmpty(value) {
        return value === null || value === undefined || IsEmpty(value);
    }
    function IsEmpty(value) {
        if (value === null)
            return true;
        var STRING_BLACK = / \n\r\t/g;
        if (typeof value === "string" && value.trim().replace(STRING_BLACK, "").length === 0)
            return true;
        if (Array.isArray(value) && value.length === 0)
            return true;
        if (typeof value === "object" &&
            value.constructor === Object &&
            Object.keys(value).length === 0)
            return true;
        return false;
    }
    function INHERIT_MACRO(SUB_CLASS, SUPER_CLASS, properties) {
        if (typeof Object.assign === "function") {
            INHERIT_MACRO_ES6(SUB_CLASS, SUPER_CLASS, properties);
        }
        else {
            INHERIT_MACRO_OLD(SUB_CLASS, SUPER_CLASS, properties);
        }
    }
    function INHERIT_MACRO_ES6(SUB_CLASS, SUPER_CLASS, properties) {
        SUB_CLASS.prototype = Object.create(SUPER_CLASS.prototype);
        SUB_CLASS.prototype.constructor = SUB_CLASS;
        SUB_CLASS.superConstructor = SUPER_CLASS;
        SUB_CLASS.superClass = SUPER_CLASS.prototype;
        Object.assign(SUB_CLASS, SUPER_CLASS);
        if (properties) {
            Object.assign(SUB_CLASS.prototype, properties);
        }
    }
    function INHERIT_MACRO_OLD(child, $parent, $properties) {
        var parent, properties;
        [$parent, $properties].forEach(function (arg) {
            if (typeof arg === "function")
                parent = arg;
            else if (typeof arg === "object")
                properties = arg;
        });
        if (parent) {
            function Inheritance() {
            }
            Inheritance.prototype = parent.prototype;
            child.prototype = new Inheritance();
            child.prototype.constructor = child;
            child.superConstructor = parent;
            child.superClass = parent.prototype;
        }
        if (properties) {
            for (var name in properties) {
                var getter = properties.__lookupGetter__(name);
                var setter = properties.__lookupSetter__(name);
                if (getter || setter) {
                    if (getter) {
                        child.prototype.__defineGetter__(name, getter);
                    }
                    if (setter) {
                        child.prototype.__defineSetter__(name, setter);
                    }
                }
                else {
                    child.prototype[name] = properties[name];
                }
            }
        }
    }
    function DYNAMIC_PARAMS(args, schema, defaults) {
        if (defaults === void 0) { defaults = {}; }
        var res = __assign({}, defaults);
        var used = new Set();
        for (var key in schema) {
            var rules = [].concat(schema[key]);
            var _loop_1 = function (i) {
                if (used.has(i))
                    return "continue";
                var v = args[i];
                var ok = rules.some(function (r) {
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
});
