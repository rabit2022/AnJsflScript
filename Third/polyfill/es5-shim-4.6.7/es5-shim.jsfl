/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2020 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

// vim: ts=4 sts=4 sw=4 expandtab

// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
// eslint-disable-line no-extra-semi

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
    'use strict';

    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(); // eslint-disable-line no-param-reassign
    }
})(this, function () {
    /**
     * Brings an environment as close to ECMAScript 5 compliance
     * as is possible with the facilities of erstwhile engines.
     *
     * Annotated ES5: https://es5.github.io/ (specific links below)
     * ES5 Spec: https://www.ecma-international.org/wp-content/uploads/ECMA-262_5.1_edition_june_2011.pdf
     * Required reading: https://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
     */

    // Shortcut to an often accessed properties, in order to avoid multiple
    // dereference that costs universally. This also holds a reference to known-good
    // functions.
    var $Array = Array;
    var ArrayPrototype = $Array.prototype;
    var $Object = Object;
    var ObjectPrototype = $Object.prototype;
    var $Function = Function;
    var FunctionPrototype = $Function.prototype;
    var $String = String;
    var StringPrototype = $String.prototype;
    var $Number = Number;
    var NumberPrototype = $Number.prototype;
    var array_slice = ArrayPrototype.slice;
    var array_splice = ArrayPrototype.splice;
    var array_push = ArrayPrototype.push;
    var array_unshift = ArrayPrototype.unshift;
    var array_concat = ArrayPrototype.concat;
    var array_join = ArrayPrototype.join;
    var call = FunctionPrototype.call;
    var apply = FunctionPrototype.apply;
    var max = Math.max;
    var min = Math.min;
    var floor = Math.floor;
    var abs = Math.abs;
    var pow = Math.pow;
    var round = Math.round;
    var log = Math.log;
    var LOG10E = Math.LOG10E;
    var log10 =
        Math.log10 ||
        function log10(value) {
            return log(value) * LOG10E;
        };

    // Having a toString local variable name breaks in Opera so use to_string.
    var to_string = ObjectPrototype.toString;

    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
    var hasToStringTag =
        typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    var isCallable; /* inlined from https://npmjs.com/is-callable */
    var fnToStr = Function.prototype.toString,
        constructorRegex = /^\s*class /,
        isES6ClassFn = function isES6ClassFn(value) {
            try {
                var fnStr = fnToStr.call(value);
                var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
                var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
                var spaceStripped = multiStripped
                    .replace(/\n/gm, ' ')
                    .replace(/ {2}/g, ' ');
                return constructorRegex.test(spaceStripped);
            } catch (e) {
                return false; /* not a function */
            }
        },
        tryFunctionObject = function tryFunctionObject(value) {
            try {
                if (isES6ClassFn(value)) {
                    return false;
                }
                fnToStr.call(value);
                return true;
            } catch (e) {
                return false;
            }
        },
        fnClass = '[object Function]',
        genClass = '[object GeneratorFunction]',
        isCallable = function isCallable(value) {
            if (!value) {
                return false;
            }
            if (typeof value !== 'function' && typeof value !== 'object') {
                return false;
            }
            if (hasToStringTag) {
                return tryFunctionObject(value);
            }
            if (isES6ClassFn(value)) {
                return false;
            }
            var strClass = to_string.call(value);
            return strClass === fnClass || strClass === genClass;
        };

    var isRegex; /* inlined from https://npmjs.com/is-regex */
    var regexExec = RegExp.prototype.exec,
        tryRegexExec = function tryRegexExec(value) {
            try {
                regexExec.call(value);
                return true;
            } catch (e) {
                return false;
            }
        },
        regexClass = '[object RegExp]';
    isRegex = function isRegex(value) {
        if (typeof value !== 'object') {
            return false;
        }
        return hasToStringTag
            ? tryRegexExec(value)
            : to_string.call(value) === regexClass;
    };
    var isString; /* inlined from https://npmjs.com/is-string */
    var strValue = String.prototype.valueOf,
        tryStringObject = function tryStringObject(value) {
            try {
                strValue.call(value);
                return true;
            } catch (e) {
                return false;
            }
        },
        stringClass = '[object String]';
    isString = function isString(value) {
        if (typeof value === 'string') {
            return true;
        }
        if (typeof value !== 'object') {
            return false;
        }
        return hasToStringTag
            ? tryStringObject(value)
            : to_string.call(value) === stringClass;
    };
    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

    /* inlined from https://npmjs.com/define-properties */
    var supportsDescriptors =
        $Object.defineProperty &&
        (function () {
            try {
                var obj = {};
                $Object.defineProperty(obj, 'x', {
                    enumerable: false,
                    value: obj
                });
                // eslint-disable-next-line no-unreachable-loop, max-statements-per-line
                for (var _ in obj) {
                    return false;
                } // jscs:ignore disallowUnusedVariables
                return obj.x === obj;
            } catch (e) {
                /* this is ES3 */
                return false;
            }
        })();
    var defineProperties = (function (has) {
        // Define configurable, writable, and non-enumerable props
        // if they don't exist.
        var defineProperty;
        if (supportsDescriptors) {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && name in object) {
                    return;
                }
                $Object.defineProperty(object, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: method
                });
            };
        } else {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && name in object) {
                    return;
                }
                object[name] = method; // eslint-disable-line no-param-reassign
            };
        }
        return function defineProperties(object, map, forceAssign) {
            for (var name in map) {
                if (has.call(map, name)) {
                    defineProperty(object, name, map[name], forceAssign);
                }
            }
        };
    })(ObjectPrototype.hasOwnProperty);

    // this is needed in Chrome 15 (probably earlier) - 36
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    if ($Object.defineProperty && supportsDescriptors) {
        var F = function () {};
        var toStringSentinel = {};
        var sentinel = { toString: toStringSentinel };
        $Object.defineProperty(F, 'prototype', {
            value: sentinel,
            writable: false
        });
        if (new F().toString !== toStringSentinel) {
            var $dP = $Object.defineProperty;
            var $gOPD = $Object.getOwnPropertyDescriptor;
            defineProperties(
                $Object,
                {
                    defineProperty: function defineProperty(o, k, d) {
                        var key = $String(k);
                        if (typeof o === 'function' && key === 'prototype') {
                            var desc = $gOPD(o, key);
                            if (desc.writable && !d.writable && 'value' in d) {
                                try {
                                    o[key] = d.value; // eslint-disable-line no-param-reassign
                                } catch (e) {
                                    /**/
                                }
                            }
                            return $dP(o, key, {
                                configurable:
                                    'configurable' in d
                                        ? d.configurable
                                        : desc.configurable,
                                enumerable:
                                    'enumerable' in d ? d.enumerable : desc.enumerable,
                                writable: d.writable
                            });
                        }
                        return $dP(o, key, d);
                    }
                },
                true
            );
        }
    }

    //
    // Util
    // ======
    //

    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
    var isPrimitive = function isPrimitive(input) {
        var type = typeof input;
        return input === null || (type !== 'object' && type !== 'function');
    };

    var isActualNaN =
        $Number.isNaN ||
        function isActualNaN(x) {
            return x !== x;
        };

    var ES = {
        // ES5 9.4
        // https://es5.github.io/#x9.4
        // http://jsperf.com/to-integer
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
        ToInteger: function ToInteger(num) {
            var n = +num;
            if (isActualNaN(n)) {
                n = 0;
            } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
                n = (n > 0 || -1) * floor(abs(n));
            }
            return n;
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
        ToPrimitive: function ToPrimitive(input) {
            var val, valueOf, toStr;
            if (isPrimitive(input)) {
                return input;
            }
            valueOf = input.valueOf;
            if (isCallable(valueOf)) {
                val = valueOf.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            toStr = input.toString;
            if (isCallable(toStr)) {
                val = toStr.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            throw new TypeError();
        },

        // ES5 9.9
        // https://es5.github.io/#x9.9
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
        ToObject: function (o) {
            if (o == null) {
                // this matches both null and undefined
                throw new TypeError("can't convert " + o + ' to object');
            }
            return $Object(o);
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
        ToUint32: function ToUint32(x) {
            return x >>> 0;
        }
    };

    //
    // Function
    // ========
    //

    // ES-5 15.3.4.5
    // https://es5.github.io/#x15.3.4.5

    var Empty = function Empty() {};

    defineProperties(FunctionPrototype, {
        bind: function bind(that) {
            // .length is 1
            // 1. Let Target be the this value.
            var target = this;
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            if (!isCallable(target)) {
                throw new TypeError(
                    'Function.prototype.bind called on incompatible ' + target
                );
            }
            // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
            var bound;
            var binder = function () {
                if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = apply.call(
                        target,
                        this,
                        array_concat.call(args, array_slice.call(arguments))
                    );
                    if ($Object(result) === result) {
                        return result;
                    }
                    return this;
                }
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return apply.call(
                    target,
                    that,
                    array_concat.call(args, array_slice.call(arguments))
                );
            };

            // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.

            var boundLength = max(0, target.length - args.length);

            // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                array_push.call(boundArgs, '$' + i);
            }

            // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
            bound = $Function(
                'binder',
                'return function (' +
                    array_join.call(boundArgs, ',') +
                    '){ return binder.apply(this, arguments); }'
            )(binder);

            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                // Clean up dangling references.
                Empty.prototype = null;
            }

            // TODO
            // 18. Set the [[Extensible]] internal property of F to true.

            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.

            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.

            // 22. Return F.
            return bound;
        }
    });

    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
    // use it in defining shortcuts.
    var owns = call.bind(ObjectPrototype.hasOwnProperty);
    var toStr = call.bind(ObjectPrototype.toString);
    var arraySlice = call.bind(array_slice);
    var arraySliceApply = apply.bind(array_slice);
    /* globals document */
    if (typeof document === 'object' && document && document.documentElement) {
        try {
            arraySlice(document.documentElement.childNodes);
        } catch (e) {
            var origArraySlice = arraySlice;
            var origArraySliceApply = arraySliceApply;
            arraySlice = function arraySliceIE(arr) {
                var r = [];
                var i = arr.length;
                while (i-- > 0) {
                    r[i] = arr[i];
                }
                return origArraySliceApply(r, origArraySlice(arguments, 1));
            };
            arraySliceApply = function arraySliceApplyIE(arr, args) {
                return origArraySliceApply(arraySlice(arr), args);
            };
        }
    }
    var strSlice = call.bind(StringPrototype.slice);
    var strSplit = call.bind(StringPrototype.split);
    var strIndexOf = call.bind(StringPrototype.indexOf);
    var pushCall = call.bind(array_push);
    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
    var arraySort = call.bind(ArrayPrototype.sort);

    //
    // Array
    // =====
    //

    var isArray =
        $Array.isArray ||
        function isArray(obj) {
            return toStr(obj) === '[object Array]';
        };

    // ES5 15.4.4.12
    // https://es5.github.io/#x15.4.4.13
    // Return len+argCount.
    // [bugfix, ielt8]
    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
    defineProperties(
        ArrayPrototype,
        {
            unshift: function () {
                array_unshift.apply(this, arguments);
                return this.length;
            }
        },
        hasUnshiftReturnValueBug
    );

    // ES5 15.4.3.2
    // https://es5.github.io/#x15.4.3.2
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
    defineProperties($Array, { isArray: isArray });

    // The IsCallable() check in the Array functions
    // has been replaced with a strict check on the
    // internal class of the object to trap cases where
    // the provided function was actually a regular
    // expression literal, which in V8 and
    // JavaScriptCore is a typeof "function".  Only in
    // V8 are regular expression literals permitted as
    // reduce parameters, so it is desirable in the
    // general case for the shim to match the more
    // strict and common behavior of rejecting regular
    // expressions.

    // ES5 15.4.4.18
    // https://es5.github.io/#x15.4.4.18
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

    // Check failure of by-index access of string characters (IE < 9)
    // and failure of `0 in boxedString` (Rhino)
    var boxedString = $Object('a');
    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

    var properlyBoxesContext = function properlyBoxed(method) {
        // Check node 0.6.21 bug where third parameter is not boxed
        var properlyBoxesNonStrict = true;
        var properlyBoxesStrict = true;
        var threwException = false;
        if (method) {
            try {
                method.call('foo', function (_, __, context) {
                    if (typeof context !== 'object') {
                        properlyBoxesNonStrict = false;
                    }
                });

                method.call(
                    [1],
                    function () {
                        'use strict';

                        properlyBoxesStrict = typeof this === 'string';
                    },
                    'x'
                );
            } catch (e) {
                threwException = true;
            }
        }
        return (
            !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict
        );
    };

    defineProperties(
        ArrayPrototype,
        {
            forEach: function forEach(callbackfn /*, thisArg*/) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var i = -1;
                var length = ES.ToUint32(self.length);
                var T;
                if (arguments.length > 1) {
                    T = arguments[1];
                }

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.forEach callback must be a function'
                    );
                }

                while (++i < length) {
                    if (i in self) {
                        // Invoke the callback function with call, passing arguments:
                        // context, property value, property key, thisArg object
                        if (typeof T === 'undefined') {
                            callbackfn(self[i], i, object);
                        } else {
                            callbackfn.call(T, self[i], i, object);
                        }
                    }
                }
            }
        },
        !properlyBoxesContext(ArrayPrototype.forEach)
    );

    // ES5 15.4.4.19
    // https://es5.github.io/#x15.4.4.19
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
    defineProperties(
        ArrayPrototype,
        {
            map: function map(callbackfn /*, thisArg*/) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var length = ES.ToUint32(self.length);
                var result = $Array(length);
                var T;
                if (arguments.length > 1) {
                    T = arguments[1];
                }

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.map callback must be a function'
                    );
                }

                for (var i = 0; i < length; i++) {
                    if (i in self) {
                        if (typeof T === 'undefined') {
                            result[i] = callbackfn(self[i], i, object);
                        } else {
                            result[i] = callbackfn.call(T, self[i], i, object);
                        }
                    }
                }
                return result;
            }
        },
        !properlyBoxesContext(ArrayPrototype.map)
    );

    // ES5 15.4.4.20
    // https://es5.github.io/#x15.4.4.20
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
    defineProperties(
        ArrayPrototype,
        {
            filter: function filter(callbackfn /*, thisArg*/) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var length = ES.ToUint32(self.length);
                var result = [];
                var value;
                var T;
                if (arguments.length > 1) {
                    T = arguments[1];
                }

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.filter callback must be a function'
                    );
                }

                for (var i = 0; i < length; i++) {
                    if (i in self) {
                        value = self[i];
                        if (
                            typeof T === 'undefined'
                                ? callbackfn(value, i, object)
                                : callbackfn.call(T, value, i, object)
                        ) {
                            pushCall(result, value);
                        }
                    }
                }
                return result;
            }
        },
        !properlyBoxesContext(ArrayPrototype.filter)
    );

    // ES5 15.4.4.16
    // https://es5.github.io/#x15.4.4.16
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    defineProperties(
        ArrayPrototype,
        {
            every: function every(callbackfn /*, thisArg*/) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var length = ES.ToUint32(self.length);
                var T;
                if (arguments.length > 1) {
                    T = arguments[1];
                }

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.every callback must be a function'
                    );
                }

                for (var i = 0; i < length; i++) {
                    if (
                        i in self &&
                        !(typeof T === 'undefined'
                            ? callbackfn(self[i], i, object)
                            : callbackfn.call(T, self[i], i, object))
                    ) {
                        return false;
                    }
                }
                return true;
            }
        },
        !properlyBoxesContext(ArrayPrototype.every)
    );

    // ES5 15.4.4.17
    // https://es5.github.io/#x15.4.4.17
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
    defineProperties(
        ArrayPrototype,
        {
            some: function some(callbackfn /*, thisArg */) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var length = ES.ToUint32(self.length);
                var T;
                if (arguments.length > 1) {
                    T = arguments[1];
                }

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.some callback must be a function'
                    );
                }

                for (var i = 0; i < length; i++) {
                    if (
                        i in self &&
                        (typeof T === 'undefined'
                            ? callbackfn(self[i], i, object)
                            : callbackfn.call(T, self[i], i, object))
                    ) {
                        return true;
                    }
                }
                return false;
            }
        },
        !properlyBoxesContext(ArrayPrototype.some)
    );

    // ES5 15.4.4.21
    // https://es5.github.io/#x15.4.4.21
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
    var reduceCoercesToObject = false;
    if (ArrayPrototype.reduce) {
        reduceCoercesToObject =
            typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
                return list;
            }) === 'object';
    }
    defineProperties(
        ArrayPrototype,
        {
            reduce: function reduce(callbackfn /*, initialValue*/) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var length = ES.ToUint32(self.length);

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.reduce callback must be a function'
                    );
                }

                // no value to return if no initial value and an empty array
                if (length === 0 && arguments.length === 1) {
                    throw new TypeError('reduce of empty array with no initial value');
                }

                var i = 0;
                var result;
                if (arguments.length >= 2) {
                    result = arguments[1];
                } else {
                    do {
                        if (i in self) {
                            result = self[i++];
                            break;
                        }

                        // if array contains no values, no initial value to return
                        if (++i >= length) {
                            throw new TypeError(
                                'reduce of empty array with no initial value'
                            );
                        }
                    } while (true);
                }

                for (; i < length; i++) {
                    if (i in self) {
                        result = callbackfn(result, self[i], i, object);
                    }
                }

                return result;
            }
        },
        !reduceCoercesToObject
    );

    // ES5 15.4.4.22
    // https://es5.github.io/#x15.4.4.22
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
    var reduceRightCoercesToObject = false;
    if (ArrayPrototype.reduceRight) {
        reduceRightCoercesToObject =
            typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
                return list;
            }) === 'object';
    }
    defineProperties(
        ArrayPrototype,
        {
            reduceRight: function reduceRight(callbackfn /*, initial*/) {
                var object = ES.ToObject(this);
                var self = splitString && isString(this) ? strSplit(this, '') : object;
                var length = ES.ToUint32(self.length);

                // If no callback function or if callback is not a callable function
                if (!isCallable(callbackfn)) {
                    throw new TypeError(
                        'Array.prototype.reduceRight callback must be a function'
                    );
                }

                // no value to return if no initial value, empty array
                if (length === 0 && arguments.length === 1) {
                    throw new TypeError(
                        'reduceRight of empty array with no initial value'
                    );
                }

                var result;
                var i = length - 1;
                if (arguments.length >= 2) {
                    result = arguments[1];
                } else {
                    do {
                        if (i in self) {
                            result = self[i--];
                            break;
                        }

                        // if array contains no values, no initial value to return
                        if (--i < 0) {
                            throw new TypeError(
                                'reduceRight of empty array with no initial value'
                            );
                        }
                    } while (true);
                }

                if (i < 0) {
                    return result;
                }

                do {
                    if (i in self) {
                        result = callbackfn(result, self[i], i, object);
                    }
                } while (i--);

                return result;
            }
        },
        !reduceRightCoercesToObject
    );

    // ES5 15.4.4.14
    // https://es5.github.io/#x15.4.4.14
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
    defineProperties(
        ArrayPrototype,
        {
            indexOf: function indexOf(searchElement /*, fromIndex */) {
                var self =
                    splitString && isString(this)
                        ? strSplit(this, '')
                        : ES.ToObject(this);
                var length = ES.ToUint32(self.length);

                if (length === 0) {
                    return -1;
                }

                var i = 0;
                if (arguments.length > 1) {
                    i = ES.ToInteger(arguments[1]);
                }

                // handle negative indices
                i = i >= 0 ? i : max(0, length + i);
                for (; i < length; i++) {
                    if (i in self && self[i] === searchElement) {
                        return i;
                    }
                }
                return -1;
            }
        },
        hasFirefox2IndexOfBug
    );

    // ES5 15.4.4.15
    // https://es5.github.io/#x15.4.4.15
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
    var hasFirefox2LastIndexOfBug =
        ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
    defineProperties(
        ArrayPrototype,
        {
            lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
                var self =
                    splitString && isString(this)
                        ? strSplit(this, '')
                        : ES.ToObject(this);
                var length = ES.ToUint32(self.length);

                if (length === 0) {
                    return -1;
                }
                var i = length - 1;
                if (arguments.length > 1) {
                    i = min(i, ES.ToInteger(arguments[1]));
                }
                // handle negative indices
                i = i >= 0 ? i : length - abs(i);
                for (; i >= 0; i--) {
                    if (i in self && searchElement === self[i]) {
                        return i;
                    }
                }
                return -1;
            }
        },
        hasFirefox2LastIndexOfBug
    );

    // ES5 15.4.4.12
    // https://es5.github.io/#x15.4.4.12
    var spliceNoopReturnsEmptyArray = (function () {
        var a = [1, 2];
        var result = a.splice();
        return a.length === 2 && isArray(result) && result.length === 0;
    })();
    defineProperties(
        ArrayPrototype,
        {
            // Safari 5.0 bug where .splice() returns undefined
            splice: function splice(start, deleteCount) {
                if (arguments.length === 0) {
                    return [];
                }
                return array_splice.apply(this, arguments);
            }
        },
        !spliceNoopReturnsEmptyArray
    );

    var spliceWorksWithEmptyObject = (function () {
        var obj = {};
        ArrayPrototype.splice.call(obj, 0, 0, 1);
        return obj.length === 1;
    })();
    var hasES6Defaults = [0, 1, 2].splice(0).length === 3;
    defineProperties(
        ArrayPrototype,
        {
            splice: function splice(start, deleteCount) {
                if (arguments.length === 0) {
                    return [];
                }
                var args = arguments;
                this.length = max(ES.ToInteger(this.length), 0);
                if (arguments.length > 0 && typeof deleteCount !== 'number') {
                    args = arraySlice(arguments);
                    if (args.length < 2) {
                        pushCall(args, this.length - start);
                    } else {
                        args[1] = ES.ToInteger(deleteCount);
                    }
                }
                return array_splice.apply(this, args);
            }
        },
        !spliceWorksWithEmptyObject || !hasES6Defaults
    );
    var spliceWorksWithLargeSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
        var arr = new $Array(1e5);
        // note: the index MUST be 8 or larger or the test will false pass
        arr[8] = 'x';
        arr.splice(1, 1);
        // note: this test must be defined *after* the indexOf shim
        // per https://github.com/es-shims/es5-shim/issues/313
        return arr.indexOf('x') === 7;
    })();
    var spliceWorksWithSmallSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Opera 12.15 breaks on this, no idea why.
        var n = 256;
        var arr = [];
        arr[n] = 'a';
        arr.splice(n + 1, 0, 'b');
        return arr[n] === 'a';
    })();
    defineProperties(
        ArrayPrototype,
        {
            splice: function splice(start, deleteCount) {
                var O = ES.ToObject(this);
                var A = [];
                var len = ES.ToUint32(O.length);
                var relativeStart = ES.ToInteger(start);
                var actualStart =
                    relativeStart < 0
                        ? max(len + relativeStart, 0)
                        : min(relativeStart, len);
                var actualDeleteCount =
                    arguments.length === 0
                        ? 0
                        : arguments.length === 1
                          ? len - actualStart
                          : min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

                var k = 0;
                var from;
                while (k < actualDeleteCount) {
                    from = $String(actualStart + k);
                    if (owns(O, from)) {
                        A[k] = O[from];
                    }
                    k += 1;
                }

                var items = arraySlice(arguments, 2);
                var itemCount = items.length;
                var to;
                if (itemCount < actualDeleteCount) {
                    k = actualStart;
                    var maxK = len - actualDeleteCount;
                    while (k < maxK) {
                        from = $String(k + actualDeleteCount);
                        to = $String(k + itemCount);
                        if (owns(O, from)) {
                            O[to] = O[from];
                        } else {
                            delete O[to];
                        }
                        k += 1;
                    }
                    k = len;
                    var minK = len - actualDeleteCount + itemCount;
                    while (k > minK) {
                        delete O[k - 1];
                        k -= 1;
                    }
                } else if (itemCount > actualDeleteCount) {
                    k = len - actualDeleteCount;
                    while (k > actualStart) {
                        from = $String(k + actualDeleteCount - 1);
                        to = $String(k + itemCount - 1);
                        if (owns(O, from)) {
                            O[to] = O[from];
                        } else {
                            delete O[to];
                        }
                        k -= 1;
                    }
                }
                k = actualStart;
                for (var i = 0; i < items.length; ++i) {
                    O[k] = items[i];
                    k += 1;
                }
                O.length = len - actualDeleteCount + itemCount;

                return A;
            }
        },
        !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays
    );

    var originalJoin = ArrayPrototype.join;
    var hasStringJoinBug;
    try {
        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
    } catch (e) {
        hasStringJoinBug = true;
    }
    if (hasStringJoinBug) {
        defineProperties(
            ArrayPrototype,
            {
                join: function join(separator) {
                    var sep = typeof separator === 'undefined' ? ',' : separator;
                    return originalJoin.call(
                        isString(this) ? strSplit(this, '') : this,
                        sep
                    );
                }
            },
            hasStringJoinBug
        );
    }

    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
    if (hasJoinUndefinedBug) {
        defineProperties(
            ArrayPrototype,
            {
                join: function join(separator) {
                    var sep = typeof separator === 'undefined' ? ',' : separator;
                    return originalJoin.call(this, sep);
                }
            },
            hasJoinUndefinedBug
        );
    }

    var pushShim = function push(item) {
        var O = ES.ToObject(this);
        var n = ES.ToUint32(O.length);
        var i = 0;
        while (i < arguments.length) {
            O[n + i] = arguments[i];
            i += 1;
        }
        O.length = n + i;
        return n + i;
    };

    var pushIsNotGeneric = (function () {
        var obj = {};
        var result = Array.prototype.push.call(obj, undefined);
        return (
            result !== 1 ||
            obj.length !== 1 ||
            typeof obj[0] !== 'undefined' ||
            !owns(obj, 0)
        );
    })();
    defineProperties(
        ArrayPrototype,
        {
            push: function push(item) {
                if (isArray(this)) {
                    return array_push.apply(this, arguments);
                }
                return pushShim.apply(this, arguments);
            }
        },
        pushIsNotGeneric
    );

    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
    var pushUndefinedIsWeird = (function () {
        var arr = [];
        var result = arr.push(undefined);
        return (
            result !== 1 ||
            arr.length !== 1 ||
            typeof arr[0] !== 'undefined' ||
            !owns(arr, 0)
        );
    })();
    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

    // ES5 15.2.3.14
    // https://es5.github.io/#x15.4.4.10
    // Fix boxed string bug
    defineProperties(
        ArrayPrototype,
        {
            slice: function (start, end) {
                var arr = isString(this) ? strSplit(this, '') : this;
                return arraySliceApply(arr, arguments);
            }
        },
        splitString
    );

    var sortIgnoresNonFunctions = (function () {
        try {
            [1, 2].sort(null);
        } catch (e) {
            try {
                [1, 2].sort({});
            } catch (e2) {
                return false;
            }
        }
        return true;
    })();
    var sortThrowsOnRegex = (function () {
        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
        try {
            [1, 2].sort(/a/);
            return false;
        } catch (e) {}
        return true;
    })();
    var sortIgnoresUndefined = (function () {
        // applies in IE 8, for one.
        try {
            [1, 2].sort(undefined);
            return true;
        } catch (e) {}
        return false;
    })();
    defineProperties(
        ArrayPrototype,
        {
            sort: function sort(compareFn) {
                if (typeof compareFn === 'undefined') {
                    return arraySort(this);
                }
                if (!isCallable(compareFn)) {
                    throw new TypeError(
                        'Array.prototype.sort callback must be a function'
                    );
                }
                return arraySort(this, compareFn);
            }
        },
        sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex
    );

    //
    // Object
    // ======
    //

    // ES5 15.2.3.14
    // https://es5.github.io/#x15.2.3.14

    // https://web.archive.org/web/20140727042234/http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
    // eslint-disable-next-line quote-props
    var hasDontEnumBug = !isEnum({ toString: null }, 'toString'); // jscs:ignore disallowQuotedKeysInObjects
    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
    var hasStringEnumBug = !owns('x', '0');
    var equalsConstructorPrototype = function (o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true,

        $width: true,
        $height: true,
        $top: true,
        $localStorage: true
    };
    var hasAutomationEqualityBug = (function () {
        /* globals window */
        if (typeof window === 'undefined') {
            return false;
        }
        for (var k in window) {
            try {
                if (
                    !excludedKeys['$' + k] &&
                    owns(window, k) &&
                    window[k] !== null &&
                    typeof window[k] === 'object'
                ) {
                    equalsConstructorPrototype(window[k]);
                }
            } catch (e) {
                return true;
            }
        }
        return false;
    })();
    var equalsConstructorPrototypeIfNotBuggy = function (object) {
        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(object);
        }
        try {
            return equalsConstructorPrototype(object);
        } catch (e) {
            return false;
        }
    };
    var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
    // can be replaced with require('is-arguments') if we ever use a build process instead
    var isStandardArguments = function isArguments(value) {
        return toStr(value) === '[object Arguments]';
    };
    var isLegacyArguments = function isArguments(value) {
        return (
            value !== null &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            value.length >= 0 &&
            !isArray(value) &&
            isCallable(value.callee)
        );
    };
    var isArguments = isStandardArguments(arguments)
        ? isStandardArguments
        : isLegacyArguments;

    defineProperties($Object, {
        keys: function keys(object) {
            var isFn = isCallable(object);
            var isArgs = isArguments(object);
            var isObject = object !== null && typeof object === 'object';
            var isStr = isObject && isString(object);

            if (!isObject && !isFn && !isArgs) {
                throw new TypeError('Object.keys called on a non-object');
            }

            var theKeys = [];
            var skipProto = hasProtoEnumBug && isFn;
            if ((isStr && hasStringEnumBug) || isArgs) {
                for (var i = 0; i < object.length; ++i) {
                    pushCall(theKeys, $String(i));
                }
            }

            if (!isArgs) {
                for (var name in object) {
                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
                        pushCall(theKeys, $String(name));
                    }
                }
            }

            if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                for (var j = 0; j < dontEnumsLength; j++) {
                    var dontEnum = dontEnums[j];
                    if (
                        !(skipConstructor && dontEnum === 'constructor') &&
                        owns(object, dontEnum)
                    ) {
                        pushCall(theKeys, dontEnum);
                    }
                }
            }
            return theKeys;
        }
    });

    var keysWorksWithArguments =
        $Object.keys &&
        (function () {
            // Safari 5.0 bug
            return $Object.keys(arguments).length === 2;
        })(1, 2);
    var keysHasArgumentsLengthBug =
        $Object.keys &&
        (function () {
            var argKeys = $Object.keys(arguments);
            return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
        })(1);
    var originalKeys = $Object.keys;
    defineProperties(
        $Object,
        {
            keys: function keys(object) {
                if (isArguments(object)) {
                    return originalKeys(arraySlice(object));
                }
                return originalKeys(object);
            }
        },
        !keysWorksWithArguments || keysHasArgumentsLengthBug
    );

    //
    // Date
    // ====
    //

    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
    var aNegativeTestDate = new Date(-1509842289600292);
    var aPositiveTestDate = new Date(1449662400000);
    var hasToUTCStringFormatBug =
        aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
    var hasToDateStringFormatBug;
    var hasToStringFormatBug;
    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
    if (timeZoneOffset < -720) {
        hasToDateStringFormatBug =
            aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
        hasToStringFormatBug =
            !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(
                String(aPositiveTestDate)
            );
    } else {
        hasToDateStringFormatBug =
            aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
        hasToStringFormatBug =
            !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(
                String(aPositiveTestDate)
            );
    }

    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
    var originalGetMonth = call.bind(Date.prototype.getMonth);
    var originalGetDate = call.bind(Date.prototype.getDate);
    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthName = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    var daysInMonth = function daysInMonth(month, year) {
        return originalGetDate(new Date(year, month, 0));
    };

    defineProperties(
        Date.prototype,
        {
            getFullYear: function getFullYear() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var year = originalGetFullYear(this);
                if (year < 0 && originalGetMonth(this) > 11) {
                    return year + 1;
                }
                return year;
            },
            getMonth: function getMonth() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var year = originalGetFullYear(this);
                var month = originalGetMonth(this);
                if (year < 0 && month > 11) {
                    return 0;
                }
                return month;
            },
            getDate: function getDate() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var year = originalGetFullYear(this);
                var month = originalGetMonth(this);
                var date = originalGetDate(this);
                if (year < 0 && month > 11) {
                    if (month === 12) {
                        return date;
                    }
                    var days = daysInMonth(0, year + 1);
                    return days - date + 1;
                }
                return date;
            },
            getUTCFullYear: function getUTCFullYear() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var year = originalGetUTCFullYear(this);
                if (year < 0 && originalGetUTCMonth(this) > 11) {
                    return year + 1;
                }
                return year;
            },
            getUTCMonth: function getUTCMonth() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var year = originalGetUTCFullYear(this);
                var month = originalGetUTCMonth(this);
                if (year < 0 && month > 11) {
                    return 0;
                }
                return month;
            },
            getUTCDate: function getUTCDate() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var year = originalGetUTCFullYear(this);
                var month = originalGetUTCMonth(this);
                var date = originalGetUTCDate(this);
                if (year < 0 && month > 11) {
                    if (month === 12) {
                        return date;
                    }
                    var days = daysInMonth(0, year + 1);
                    return days - date + 1;
                }
                return date;
            }
        },
        hasNegativeMonthYearBug
    );

    defineProperties(
        Date.prototype,
        {
            toUTCString: function toUTCString() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var day = originalGetUTCDay(this);
                var date = originalGetUTCDate(this);
                var month = originalGetUTCMonth(this);
                var year = originalGetUTCFullYear(this);
                var hour = originalGetUTCHours(this);
                var minute = originalGetUTCMinutes(this);
                var second = originalGetUTCSeconds(this);
                return (
                    dayName[day] +
                    ', ' +
                    (date < 10 ? '0' + date : date) +
                    ' ' +
                    monthName[month] +
                    ' ' +
                    year +
                    ' ' +
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute) +
                    ':' +
                    (second < 10 ? '0' + second : second) +
                    ' GMT'
                );
            }
        },
        hasNegativeMonthYearBug || hasToUTCStringFormatBug
    );

    // Opera 12 has `,`
    defineProperties(
        Date.prototype,
        {
            toDateString: function toDateString() {
                if (!this || !(this instanceof Date)) {
                    throw new TypeError('this is not a Date object.');
                }
                var day = this.getDay();
                var date = this.getDate();
                var month = this.getMonth();
                var year = this.getFullYear();
                return (
                    dayName[day] +
                    ' ' +
                    monthName[month] +
                    ' ' +
                    (date < 10 ? '0' + date : date) +
                    ' ' +
                    year
                );
            }
        },
        hasNegativeMonthYearBug || hasToDateStringFormatBug
    );

    // can't use defineProperties here because of toString enumeration issue in IE <= 8
    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
        Date.prototype.toString = function toString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            var hour = this.getHours();
            var minute = this.getMinutes();
            var second = this.getSeconds();
            var timezoneOffset = this.getTimezoneOffset();
            var hoursOffset = floor(abs(timezoneOffset) / 60);
            var minutesOffset = floor(abs(timezoneOffset) % 60);
            return (
                dayName[day] +
                ' ' +
                monthName[month] +
                ' ' +
                (date < 10 ? '0' + date : date) +
                ' ' +
                year +
                ' ' +
                (hour < 10 ? '0' + hour : hour) +
                ':' +
                (minute < 10 ? '0' + minute : minute) +
                ':' +
                (second < 10 ? '0' + second : second) +
                ' GMT' +
                (timezoneOffset > 0 ? '-' : '+') +
                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset)
            );
        };
        if (supportsDescriptors) {
            $Object.defineProperty(Date.prototype, 'toString', {
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    }

    // ES5 15.9.5.43
    // https://es5.github.io/#x15.9.5.43
    // This function returns a String value represent the instance in time
    // represented by this Date object. The format of the String is the Date Time
    // string format defined in 15.9.1.15. All fields are present in the String.
    // The time zone is always UTC, denoted by the suffix Z. If the time value of
    // this object is not a finite Number a RangeError exception is thrown.
    var negativeDate = -62198755200000;
    var negativeYearString = '-000001';
    var hasNegativeDateBug =
        Date.prototype.toISOString &&
        new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1; // eslint-disable-line max-len
    var hasSafari51DateBug =
        Date.prototype.toISOString &&
        new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

    var getTime = call.bind(Date.prototype.getTime);

    defineProperties(
        Date.prototype,
        {
            toISOString: function toISOString() {
                if (!isFinite(this) || !isFinite(getTime(this))) {
                    // Adope Photoshop requires the second check.
                    throw new RangeError(
                        'Date.prototype.toISOString called on non-finite value.'
                    );
                }

                var year = originalGetUTCFullYear(this);

                var month = originalGetUTCMonth(this);
                // see https://github.com/es-shims/es5-shim/issues/111
                year += floor(month / 12);
                month = ((month % 12) + 12) % 12;

                // the date time string format is specified in 15.9.1.15.
                var result = [
                    month + 1,
                    originalGetUTCDate(this),
                    originalGetUTCHours(this),
                    originalGetUTCMinutes(this),
                    originalGetUTCSeconds(this)
                ];
                year =
                    (year < 0 ? '-' : year > 9999 ? '+' : '') +
                    strSlice('00000' + abs(year), 0 <= year && year <= 9999 ? -4 : -6);

                for (var i = 0; i < result.length; ++i) {
                    // pad months, days, hours, minutes, and seconds to have two digits.
                    result[i] = strSlice('00' + result[i], -2);
                }
                // pad milliseconds to have three digits.
                return (
                    year +
                    '-' +
                    arraySlice(result, 0, 2).join('-') +
                    'T' +
                    arraySlice(result, 2).join(':') +
                    '.' +
                    strSlice('000' + originalGetUTCMilliseconds(this), -3) +
                    'Z'
                );
            }
        },
        hasNegativeDateBug || hasSafari51DateBug
    );

    // ES5 15.9.5.44
    // https://es5.github.io/#x15.9.5.44
    // This function provides a String representation of a Date object for use by
    // JSON.stringify (15.12.3).
    var dateToJSONIsSupported = (function () {
        try {
            return (
                Date.prototype.toJSON &&
                new Date(NaN).toJSON() === null &&
                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
                Date.prototype.toJSON.call({
                    // generic
                    toISOString: function () {
                        return true;
                    }
                })
            );
        } catch (e) {
            return false;
        }
    })();
    if (!dateToJSONIsSupported) {
        Date.prototype.toJSON = function toJSON(key) {
            // When the toJSON method is called with argument key, the following
            // steps are taken:

            // 1.  Let O be the result of calling ToObject, giving it the this
            // value as its argument.
            // 2. Let tv be ES.ToPrimitive(O, hint Number).
            var O = $Object(this);
            var tv = ES.ToPrimitive(O);
            // 3. If tv is a Number and is not finite, return null.
            if (typeof tv === 'number' && !isFinite(tv)) {
                return null;
            }
            // 4. Let toISO be the result of calling the [[Get]] internal method of
            // O with argument "toISOString".
            var toISO = O.toISOString;
            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
            if (!isCallable(toISO)) {
                throw new TypeError('toISOString property is not callable');
            }
            // 6. Return the result of calling the [[Call]] internal method of
            //  toISO with O as the this value and an empty argument list.
            return toISO.call(O);

            // NOTE 1 The argument is ignored.

            // NOTE 2 The toJSON function is intentionally generic; it does not
            // require that its this value be a Date object. Therefore, it can be
            // transferred to other kinds of objects for use as a method. However,
            // it does require that any such object have a toISOString method. An
            // object is free to use the argument key to filter its
            // stringification.
        };
    }

    // ES5 15.9.4.2
    // https://es5.github.io/#x15.9.4.2
    // based on work shared by Daniel Friesen (dantman)
    // https://gist.github.com/303249
    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
    var acceptsInvalidDates =
        !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) ||
        !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) ||
        !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
        // XXX global assignment won't work in embeddings that use
        // an alternate object for the context.
        var maxSafeUnsigned32Bit = pow(2, 31) - 1;
        var hasSafariSignedIntBug = isActualNaN(
            new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime()
        );
        // eslint-disable-next-line no-implicit-globals, no-global-assign
        Date = (function (NativeDate) {
            // Date.length === 7
            var DateShim = function Date(Y, M, D, h, m, s, ms) {
                var length = arguments.length;
                var date;
                if (this instanceof NativeDate) {
                    var seconds = s;
                    var millis = ms;
                    if (
                        hasSafariSignedIntBug &&
                        length >= 7 &&
                        ms > maxSafeUnsigned32Bit
                    ) {
                        // work around a Safari 8/9 bug where it treats the seconds as signed
                        var msToShift =
                            floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                        var sToShift = floor(msToShift / 1e3);
                        seconds += sToShift;
                        millis -= sToShift * 1e3;
                    }
                    var parsed = DateShim.parse(Y);
                    var hasNegTimestampParseBug = isNaN(parsed);
                    date =
                        length === 1 && $String(Y) === Y && !hasNegTimestampParseBug // isString(Y)
                            ? // We explicitly pass it through parse:
                              new NativeDate(parsed)
                            : // We have to manually make calls depending on argument
                              // length here
                              length >= 7
                              ? new NativeDate(Y, M, D, h, m, seconds, millis)
                              : length >= 6
                                ? new NativeDate(Y, M, D, h, m, seconds)
                                : length >= 5
                                  ? new NativeDate(Y, M, D, h, m)
                                  : length >= 4
                                    ? new NativeDate(Y, M, D, h)
                                    : length >= 3
                                      ? new NativeDate(Y, M, D)
                                      : length >= 2
                                        ? new NativeDate(Y, M)
                                        : length >= 1
                                          ? new NativeDate(
                                                Y instanceof NativeDate ? +Y : Y
                                            )
                                          : new NativeDate();
                } else {
                    date = NativeDate.apply(this, arguments);
                }
                if (!isPrimitive(date)) {
                    // Prevent mixups with unfixed Date object
                    defineProperties(date, { constructor: DateShim }, true);
                }
                return date;
            };

            // 15.9.1.15 Date Time String Format.
            var isoDateExpression = new RegExp(
                '^' +
                    '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign + 6-digit extended year
                    '(?:-(\\d{2})' + // optional month capture
                    '(?:-(\\d{2})' + // optional day capture
                    '(?:' + // capture hours:minutes:seconds.milliseconds
                    'T(\\d{2})' + // hours capture
                    ':(\\d{2})' + // minutes capture
                    '(?:' + // optional :seconds.milliseconds
                    ':(\\d{2})' + // seconds capture
                    '(?:(\\.\\d{1,}))?' + // milliseconds capture
                    ')?' +
                    '(' + // capture UTC offset component
                    'Z|' + // UTC capture
                    '(?:' + // offset specifier +/-hours:minutes
                    '([-+])' + // sign capture
                    '(\\d{2})' + // hours offset capture
                    ':(\\d{2})' + // minutes offset capture
                    ')' +
                    ')?)?)?)?' +
                    '$'
            );

            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

            var dayFromMonth = function dayFromMonth(year, month) {
                var t = month > 1 ? 1 : 0;
                return (
                    months[month] +
                    floor((year - 1969 + t) / 4) -
                    floor((year - 1901 + t) / 100) +
                    floor((year - 1601 + t) / 400) +
                    365 * (year - 1970)
                );
            };

            var toUTC = function toUTC(t) {
                var s = 0;
                var ms = t;
                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
                    // work around a Safari 8/9 bug where it treats the seconds as signed
                    var msToShift =
                        floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                    var sToShift = floor(msToShift / 1e3);
                    s += sToShift;
                    ms -= sToShift * 1e3;
                }
                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
            };

            // Copy any custom methods a 3rd party library may have added
            for (var key in NativeDate) {
                if (owns(NativeDate, key)) {
                    DateShim[key] = NativeDate[key];
                }
            }

            // Copy "native" methods explicitly; they may be non-enumerable
            defineProperties(
                DateShim,
                {
                    now: NativeDate.now,
                    UTC: NativeDate.UTC
                },
                true
            );
            DateShim.prototype = NativeDate.prototype;
            defineProperties(DateShim.prototype, { constructor: DateShim }, true);

            // Upgrade Date.parse to handle simplified ISO 8601 strings
            var parseShim = function parse(string) {
                var match = isoDateExpression.exec(string);
                if (match) {
                    // parse months, days, hours, minutes, seconds, and milliseconds
                    // provide default values if necessary
                    // parse the UTC offset component
                    var year = $Number(match[1]),
                        month = $Number(match[2] || 1) - 1,
                        day = $Number(match[3] || 1) - 1,
                        hour = $Number(match[4] || 0),
                        minute = $Number(match[5] || 0),
                        second = $Number(match[6] || 0),
                        millisecond = floor($Number(match[7] || 0) * 1000),
                        // When time zone is missed, local offset should be used
                        // (ES 5.1 bug)
                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                        isLocalTime = Boolean(match[4] && !match[8]),
                        signOffset = match[9] === '-' ? 1 : -1,
                        hourOffset = $Number(match[10] || 0),
                        minuteOffset = $Number(match[11] || 0),
                        result;
                    var hasMinutesOrSecondsOrMilliseconds =
                        minute > 0 || second > 0 || millisecond > 0;
                    if (
                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
                        minute < 60 &&
                        second < 60 &&
                        millisecond < 1000 &&
                        month > -1 &&
                        month < 12 &&
                        hourOffset < 24 &&
                        minuteOffset < 60 && // detect invalid offsets
                        day > -1 &&
                        day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)
                    ) {
                        result =
                            ((dayFromMonth(year, month) + day) * 24 +
                                hour +
                                hourOffset * signOffset) *
                            60;
                        result =
                            ((result + minute + minuteOffset * signOffset) * 60 +
                                second) *
                                1000 +
                            millisecond;
                        if (isLocalTime) {
                            result = toUTC(result);
                        }
                        if (-8.64e15 <= result && result <= 8.64e15) {
                            return result;
                        }
                    }
                    return NaN;
                }
                return NativeDate.parse.apply(this, arguments);
            };
            defineProperties(DateShim, { parse: parseShim });

            return DateShim;
        })(Date);
    }

    // ES5 15.9.4.4
    // https://es5.github.io/#x15.9.4.4
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    //
    // Number
    // ======
    //

    // ES5.1 15.7.4.5
    // https://es5.github.io/#x15.7.4.5
    var hasToFixedBugs =
        NumberPrototype.toFixed &&
        ((0.00008).toFixed(3) !== '0.000' ||
            (0.9).toFixed(0) !== '1' ||
            (1.255).toFixed(2) !== '1.25' ||
            (1000000000000000128).toFixed(0) !== '1000000000000000128');

    var toFixedHelpers = {
        base: 1e7,
        size: 6,
        data: [0, 0, 0, 0, 0, 0],
        multiply: function multiply(n, c) {
            var i = -1;
            var c2 = c;
            while (++i < toFixedHelpers.size) {
                c2 += n * toFixedHelpers.data[i];
                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
                c2 = floor(c2 / toFixedHelpers.base);
            }
        },
        divide: function divide(n) {
            var i = toFixedHelpers.size;
            var c = 0;
            while (--i >= 0) {
                c += toFixedHelpers.data[i];
                toFixedHelpers.data[i] = floor(c / n);
                c = (c % n) * toFixedHelpers.base;
            }
        },
        numToString: function numToString() {
            var i = toFixedHelpers.size;
            var s = '';
            while (--i >= 0) {
                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
                    var t = $String(toFixedHelpers.data[i]);
                    if (s === '') {
                        s = t;
                    } else {
                        s += strSlice('0000000', 0, 7 - t.length) + t;
                    }
                }
            }
            return s;
        },
        pow: function pow(x, n, acc) {
            return n === 0
                ? acc
                : n % 2 === 1
                  ? pow(x, n - 1, acc * x)
                  : pow(x * x, n / 2, acc);
        },
        log: function log(x) {
            var n = 0;
            var x2 = x;
            while (x2 >= 4096) {
                n += 12;
                x2 /= 4096;
            }
            while (x2 >= 2) {
                n += 1;
                x2 /= 2;
            }
            return n;
        }
    };

    var toFixedShim = function toFixed(fractionDigits) {
        var f, x, s, m, e, z, j, k;

        // Test for NaN and round fractionDigits down
        f = $Number(fractionDigits);
        f = isActualNaN(f) ? 0 : floor(f);

        if (f < 0 || f > 20) {
            throw new RangeError('Number.toFixed called with invalid number of decimals');
        }

        x = $Number(this);

        if (isActualNaN(x)) {
            return 'NaN';
        }

        // If it is too big or small, return the string value of the number
        if (x <= -1e21 || x >= 1e21) {
            return $String(x);
        }

        s = '';

        if (x < 0) {
            s = '-';
            x = -x;
        }

        m = '0';

        if (x > 1e-21) {
            // 1e-21 < x < 1e21
            // -70 < log2(x) < 70
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
            z =
                e < 0
                    ? x * toFixedHelpers.pow(2, -e, 1)
                    : x / toFixedHelpers.pow(2, e, 1);
            z *= 0x10000000000000; // pow(2, 52);
            e = 52 - e;

            // -18 < e < 122
            // x = z / 2 ^ e
            if (e > 0) {
                toFixedHelpers.multiply(0, z);
                j = f;

                while (j >= 7) {
                    toFixedHelpers.multiply(1e7, 0);
                    j -= 7;
                }

                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
                j = e - 1;

                while (j >= 23) {
                    toFixedHelpers.divide(1 << 23);
                    j -= 23;
                }

                toFixedHelpers.divide(1 << j);
                toFixedHelpers.multiply(1, 1);
                toFixedHelpers.divide(2);
                m = toFixedHelpers.numToString();
            } else {
                toFixedHelpers.multiply(0, z);
                toFixedHelpers.multiply(1 << -e, 0);
                m =
                    toFixedHelpers.numToString() +
                    strSlice('0.00000000000000000000', 2, 2 + f);
            }
        }

        if (f > 0) {
            k = m.length;

            if (k <= f) {
                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
            } else {
                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
            }
        } else {
            m = s + m;
        }

        return m;
    };
    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

    var hasToExponentialRoundingBug = (function () {
        try {
            return (-6.9e-11).toExponential(4) !== '-6.9000e-11';
        } catch (e) {
            return false;
        }
    })();
    var toExponentialAllowsInfiniteDigits = (function () {
        try {
            (1).toExponential(Infinity);
            (1).toExponential(-Infinity);
            return true;
        } catch (e) {
            return false;
        }
    })();
    var originalToExponential = call.bind(NumberPrototype.toExponential);
    var numberToString = call.bind(NumberPrototype.toString);
    var numberValueOf = call.bind(NumberPrototype.valueOf);
    defineProperties(
        NumberPrototype,
        {
            toExponential: function toExponential(fractionDigits) {
                // 1: Let x be this Number value.
                var x = numberValueOf(this);

                if (typeof fractionDigits === 'undefined') {
                    return originalToExponential(x);
                }
                var f = ES.ToInteger(fractionDigits);
                if (isActualNaN(x)) {
                    return 'NaN';
                }

                if (f < 0 || f > 20) {
                    if (!isFinite(f)) {
                        // IE 6 doesn't throw in the native one
                        throw new RangeError(
                            'toExponential() argument must be between 0 and 20'
                        );
                    }
                    // this will probably have thrown already
                    return originalToExponential(x, f);
                }

                // only cases left are a finite receiver + in-range fractionDigits

                // implementation adapted from https://gist.github.com/SheetJSDev/1100ad56b9f856c95299ed0e068eea08

                // 4: Let s be the empty string
                var s = '';

                // 5: If x < 0
                if (x < 0) {
                    s = '-';
                    x = -x;
                }

                // 6: If x = +Infinity
                if (x === Infinity) {
                    return s + 'Infinity';
                }

                // 7: If fractionDigits is not undefined and (f < 0 or f > 20), throw a RangeError exception.
                if (typeof fractionDigits !== 'undefined' && (f < 0 || f > 20)) {
                    throw new RangeError(
                        'Fraction digits ' + fractionDigits + ' out of range'
                    );
                }

                var m = '';
                var e = 0;
                var c = '';
                var d = '';

                // 8: If x = 0 then
                if (x === 0) {
                    e = 0;
                    f = 0;
                    m = '0';
                } else {
                    // 9: Else, x != 0
                    var L = log10(x);
                    e = floor(L); // 10 ** e <= x and x < 10 ** (e+1)
                    var n = 0;
                    if (typeof fractionDigits !== 'undefined') {
                        // eslint-disable-line no-negated-condition
                        var w = pow(10, e - f); // x / 10 ** (f+1) < w and w <= x / 10 ** f
                        n = round(x / w); // 10 ** f <= n and n < 10 ** (f+1)
                        if (2 * x >= (2 * n + 1) * w) {
                            n += 1; // pick larger value
                        }
                        if (n >= pow(10, f + 1)) {
                            // 10e-1 = 1e0
                            n /= 10;
                            e += 1;
                        }
                    } else {
                        f = 16; // start from Math.ceil(Math.log10(Number.MAX_SAFE_INTEGER)) and loop down
                        var guess_n = round(pow(10, L - e + f));
                        var target_f = f;
                        while (f-- > 0) {
                            guess_n = round(pow(10, L - e + f));
                            if (
                                abs(guess_n * pow(10, e - f) - x) <=
                                abs(n * pow(10, e - target_f) - x)
                            ) {
                                target_f = f;
                                n = guess_n;
                            }
                        }
                    }
                    m = numberToString(n, 10);
                    if (typeof fractionDigits === 'undefined') {
                        while (strSlice(m, -1) === '0') {
                            m = strSlice(m, 0, -1);
                            d += 1;
                        }
                    }
                }

                // 10: If f != 0, then
                if (f !== 0) {
                    m = strSlice(m, 0, 1) + '.' + strSlice(m, 1);
                }

                // 11: If e = 0, then
                if (e === 0) {
                    c = '+';
                    d = '0';
                } else {
                    // 12: Else
                    c = e > 0 ? '+' : '-';
                    d = numberToString(abs(e), 10);
                }

                // 13: Let m be the concatenation of the four Strings m, "e", c, and d.
                m += 'e' + c + d;

                // 14: Return the concatenation of the Strings s and m.
                return s + m;
            }
        },
        hasToExponentialRoundingBug || toExponentialAllowsInfiniteDigits
    );

    var hasToPrecisionUndefinedBug = (function () {
        try {
            return (1.0).toPrecision(undefined) === '1';
        } catch (e) {
            return true;
        }
    })();
    var originalToPrecision = call.bind(NumberPrototype.toPrecision);
    defineProperties(
        NumberPrototype,
        {
            toPrecision: function toPrecision(precision) {
                return typeof precision === 'undefined'
                    ? originalToPrecision(this)
                    : originalToPrecision(this, precision);
            }
        },
        hasToPrecisionUndefinedBug
    );

    //
    // String
    // ======
    //

    // ES5 15.5.4.14
    // https://es5.github.io/#x15.5.4.14

    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
    // Many browsers do not split properly with regular expressions or they
    // do not perform the split correctly under obscure conditions.
    // See https://blog.stevenlevithan.com/archives/cross-browser-split
    // I've tested in many browsers and this seems to cover the deviant ones:
    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
    //       [undefined, "t", undefined, "e", ...]
    //    ''.split(/.?/) should be [], not [""]
    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

    if (
        'ab'.split(/(?:ab)*/).length !== 2 ||
        '.'.split(/(.?)(.?)/).length !== 4 ||
        'tesst'.split(/(s)*/)[1] === 't' ||
        'test'.split(/(?:)/, -1).length !== 4 ||
        ''.split(/.?/).length ||
        '.'.split(/()()/).length > 1
    ) {
        (function () {
            var compliantExecNpcg = typeof /()??/.exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
            var maxSafe32BitInt = pow(2, 32) - 1;

            StringPrototype.split = function split(separator, limit) {
                var string = String(this);
                if (typeof separator === 'undefined' && limit === 0) {
                    return [];
                }

                // If `separator` is not a regex, use native split
                if (!isRegex(separator)) {
                    return strSplit(this, separator, limit);
                }

                var output = [];
                var flags =
                        (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline ? 'm' : '') +
                        (separator.unicode ? 'u' : '') + // in ES6
                        (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2,
                    match,
                    lastIndex,
                    lastLength;
                var separatorCopy = new RegExp(separator.source, flags + 'g');
                if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp(
                        '^' + separatorCopy.source + '$(?!\\s)',
                        flags
                    );
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // maxSafe32BitInt
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - floor(abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                var splitLimit =
                    typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
                match = separatorCopy.exec(string);
                while (match) {
                    // `separatorCopy.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        pushCall(output, strSlice(string, lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            /* eslint-disable no-loop-func */
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (typeof arguments[i] === 'undefined') {
                                        match[i] = void 0;
                                    }
                                }
                            });
                            /* eslint-enable no-loop-func */
                        }
                        if (match.length > 1 && match.index < string.length) {
                            array_push.apply(output, arraySlice(match, 1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= splitLimit) {
                            break;
                        }
                    }
                    if (separatorCopy.lastIndex === match.index) {
                        separatorCopy.lastIndex++; // Avoid an infinite loop
                    }
                    match = separatorCopy.exec(string);
                }
                if (lastLastIndex === string.length) {
                    if (lastLength || !separatorCopy.test('')) {
                        pushCall(output, '');
                    }
                } else {
                    pushCall(output, strSlice(string, lastLastIndex));
                }
                return output.length > splitLimit
                    ? arraySlice(output, 0, splitLimit)
                    : output;
            };
        })();

        // [bugfix, chrome]
        // If separator is undefined, then the result array contains just one String,
        // which is the this value (converted to a String). If limit is not undefined,
        // then the output array is truncated so that it contains no more than limit
        // elements.
        // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
            if (typeof separator === 'undefined' && limit === 0) {
                return [];
            }
            return strSplit(this, separator, limit);
        };
    }

    var str_replace = StringPrototype.replace;
    var replaceReportsGroupsCorrectly = (function () {
        var groups = [];
        'x'.replace(/x(.)?/g, function (match, group) {
            pushCall(groups, group);
        });
        return groups.length === 1 && typeof groups[0] === 'undefined';
    })();

    if (!replaceReportsGroupsCorrectly) {
        StringPrototype.replace = function replace(searchValue, replaceValue) {
            var isFn = isCallable(replaceValue);
            var hasCapturingGroups =
                isRegex(searchValue) && /\)[*?]/.test(searchValue.source);
            if (!isFn || !hasCapturingGroups) {
                return str_replace.call(this, searchValue, replaceValue);
            }
            var wrappedReplaceValue = function (match) {
                var length = arguments.length;
                var originalLastIndex = searchValue.lastIndex;
                searchValue.lastIndex = 0; // eslint-disable-line no-param-reassign
                var args = searchValue.exec(match) || [];
                searchValue.lastIndex = originalLastIndex; // eslint-disable-line no-param-reassign
                pushCall(args, arguments[length - 2], arguments[length - 1]);
                return replaceValue.apply(this, args);
            };
            return str_replace.call(this, searchValue, wrappedReplaceValue);
        };
    }

    // ECMA-262, 3rd B.2.3
    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
    // non-normative section suggesting uniform semantics and it should be
    // normalized across all browsers
    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
    var string_substr = hasNegativeSubstrBug && call.bind(StringPrototype.substr);
    defineProperties(
        StringPrototype,
        {
            substr: function substr(start, length) {
                var normalizedStart = start;
                if (start < 0) {
                    normalizedStart = max(this.length + start, 0);
                }
                return string_substr(this, normalizedStart, length);
            }
        },
        hasNegativeSubstrBug
    );

    // ES5 15.5.4.20
    // whitespace from: https://es5.github.io/#x15.5.4.20
    var mvs = '\u180E';
    var mvsIsWS = /\s/.test(mvs);
    var ws =
        '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'.replace(
            /\S/g,
            ''
        ); // remove the mongolian vowel separator (\u180E) in modern engines
    var zeroWidth = '\u200b';
    var wsRegexChars = '[' + ws + ']';
    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
    var hasTrimWhitespaceBug =
        StringPrototype.trim &&
        (ws.trim() !== '' || // if ws is not considered whitespace
            zeroWidth.trim() === '' || // if zero-width IS considered whitespace
            mvs.trim() !== (mvsIsWS ? '' : mvs)); // if MVS is either wrongly considered whitespace, or, wrongly considered NOT whitespace
    defineProperties(
        StringPrototype,
        {
            // https://blog.stevenlevithan.com/archives/faster-trim-javascript
            // http://perfectionkills.com/whitespace-deviations/
            trim: function trim() {
                'use strict';

                if (typeof this === 'undefined' || this === null) {
                    throw new TypeError("can't convert " + this + ' to object');
                }
                return $String(this)
                    .replace(trimBeginRegexp, '')
                    .replace(trimEndRegexp, '');
            }
        },
        hasTrimWhitespaceBug
    );
    var trim = call.bind(String.prototype.trim);

    var hasLastIndexBug =
        StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
    defineProperties(
        StringPrototype,
        {
            lastIndexOf: function lastIndexOf(searchString) {
                if (typeof this === 'undefined' || this === null) {
                    throw new TypeError("can't convert " + this + ' to object');
                }
                var S = $String(this);
                var searchStr = $String(searchString);
                var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
                var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
                var start = min(max(pos, 0), S.length);
                var searchLen = searchStr.length;
                var k = start + searchLen;
                while (k > 0) {
                    k = max(0, k - searchLen);
                    var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
                    if (index !== -1) {
                        return k + index;
                    }
                }
                return -1;
            }
        },
        hasLastIndexBug
    );

    var originalLastIndexOf = StringPrototype.lastIndexOf;
    defineProperties(
        StringPrototype,
        {
            lastIndexOf: function lastIndexOf(searchString) {
                return originalLastIndexOf.apply(this, arguments);
            }
        },
        StringPrototype.lastIndexOf.length !== 1
    );

    var hexRegex = /^[-+]?0[xX]/;

    // ES-5 15.1.2.2
    if (
        parseInt(ws + '08') !== 8 || // eslint-disable-line radix
        parseInt(ws + '0x16') !== 22 || // eslint-disable-line radix
        (mvsIsWS ? parseInt(mvs + 1) !== 1 : !isNaN(parseInt(mvs + 1))) // eslint-disable-line radix
    ) {
        // eslint-disable-next-line no-global-assign, no-implicit-globals
        parseInt = (function (origParseInt) {
            return function parseInt(str, radix) {
                if (this instanceof parseInt) {
                    new origParseInt();
                } // eslint-disable-line new-cap, no-new, max-statements-per-line
                var string = trim(String(str));
                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
                return origParseInt(string, defaultedRadix);
            };
        })(parseInt);
    }
    // Edge 15-18
    var parseIntFailsToThrowOnBoxedSymbols = (function () {
        if (typeof Symbol !== 'function') {
            return false;
        }
        try {
            // eslint-disable-next-line radix
            parseInt(Object(Symbol.iterator));
            return true;
        } catch (e) {
            /**/
        }

        try {
            // eslint-disable-next-line radix
            parseInt(Symbol.iterator);
            return true;
        } catch (e) {
            /**/
        }

        return false;
    })();
    if (parseIntFailsToThrowOnBoxedSymbols) {
        var symbolValueOf = Symbol.prototype.valueOf;
        // eslint-disable-next-line no-global-assign, no-implicit-globals
        parseInt = (function (origParseInt) {
            return function parseInt(str, radix) {
                if (this instanceof parseInt) {
                    new origParseInt();
                } // eslint-disable-line new-cap, no-new, max-statements-per-line
                var isSym = typeof str === 'symbol';
                if (!isSym && str && typeof str === 'object') {
                    try {
                        symbolValueOf.call(str);
                        isSym = true;
                    } catch (e) {
                        /**/
                    }
                }
                if (isSym) {
                    // handle Symbols in node 8.3/8.4
                    // eslint-disable-next-line no-implicit-coercion, no-unused-expressions
                    '' + str; // jscs:ignore disallowImplicitTypeConversion
                }
                var string = trim(String(str));
                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
                return origParseInt(string, defaultedRadix);
            };
        })(parseInt);
    }

    // https://es5.github.io/#x15.1.2.3
    if (1 / parseFloat('-0') !== -Infinity) {
        // eslint-disable-next-line no-global-assign, no-implicit-globals, no-native-reassign
        parseFloat = (function (origParseFloat) {
            return function parseFloat(string) {
                var inputString = trim(String(string));
                var result = origParseFloat(inputString);
                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
            };
        })(parseFloat);
    }

    if (String(new RangeError('test')) !== 'RangeError: test') {
        var errorToStringShim = function toString() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var name = this.name;
            if (typeof name === 'undefined') {
                name = 'Error';
            } else if (typeof name !== 'string') {
                name = $String(name);
            }
            var msg = this.message;
            if (typeof msg === 'undefined') {
                msg = '';
            } else if (typeof msg !== 'string') {
                msg = $String(msg);
            }
            if (!name) {
                return msg;
            }
            if (!msg) {
                return name;
            }
            return name + ': ' + msg;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        Error.prototype.toString = errorToStringShim;
    }

    if (supportsDescriptors) {
        var ensureNonEnumerable = function (obj, prop) {
            if (isEnum(obj, prop)) {
                var desc = Object.getOwnPropertyDescriptor(obj, prop);
                if (desc.configurable) {
                    desc.enumerable = false;
                    Object.defineProperty(obj, prop, desc);
                }
            }
        };
        ensureNonEnumerable(Error.prototype, 'message');
        if (Error.prototype.message !== '') {
            Error.prototype.message = '';
        }
        ensureNonEnumerable(Error.prototype, 'name');
    }

    if (String(/a/gim) !== '/a/gim') {
        var regexToString = function toString() {
            var str = '/' + this.source + '/';
            if (this.global) {
                str += 'g';
            }
            if (this.ignoreCase) {
                str += 'i';
            }
            if (this.multiline) {
                str += 'm';
            }
            return str;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        RegExp.prototype.toString = regexToString;
    }
});
