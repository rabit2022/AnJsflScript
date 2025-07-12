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
