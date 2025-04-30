"use strict";

function _typeof(o) {
    "@babel/helpers - typeof";
    return (
        (_typeof =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                      return typeof o;
                  }
                : function (o) {
                      return o &&
                          "function" == typeof Symbol &&
                          o.constructor === Symbol &&
                          o !== Symbol.prototype
                          ? "symbol"
                          : typeof o;
                  }),
        _typeof(o)
    );
}
(function webpackUniversalModuleDefinition(root, factory) {
    if (
        (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" &&
        (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object"
    )
        module.exports = factory();
    else if (typeof define === "function" && define.amd) define([], factory);
    else if (
        (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object"
    )
        exports["es6-symbol"] = factory();
    else root["es6-symbol"] = factory();
})(void 0, function () {
    return /******/ (function () {
        // webpackBootstrap
        /******/
        var __webpack_modules__ = {
            /***/ "./entry.js":
                /*!******************!*\
        !*** ./entry.js ***!
        \******************/
                /***/
                function _entryJs(module, __unused_webpack_exports, __webpack_require__) {
                    module.exports = __webpack_require__(
                        /*! es6-symbol */ "./node_modules/es6-symbol/index.js"
                    );

                    /***/
                },
            /***/ "./node_modules/d/index.js":
                /*!*********************************!*\
        !*** ./node_modules/d/index.js ***!
        \*********************************/
                /***/
                function _node_modules_d_indexJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isValue = __webpack_require__(
                            /*! type/value/is */ "./node_modules/type/value/is.js"
                        ),
                        isPlainFunction = __webpack_require__(
                            /*! type/plain-function/is */ "./node_modules/type/plain-function/is.js"
                        ),
                        assign = __webpack_require__(
                            /*! es5-ext/object/assign */ "./node_modules/es5-ext/object/assign/index.js"
                        ),
                        normalizeOpts = __webpack_require__(
                            /*! es5-ext/object/normalize-options */ "./node_modules/es5-ext/object/normalize-options.js"
                        ),
                        contains = __webpack_require__(
                            /*! es5-ext/string/#/contains */ "./node_modules/es5-ext/string/\0#/contains/index.js"
                        );
                    var d = (module.exports = function (dscr, value /*, options*/) {
                        var c, e, w, options, desc;
                        if (arguments.length < 2 || typeof dscr !== "string") {
                            options = value;
                            value = dscr;
                            dscr = null;
                        } else {
                            options = arguments[2];
                        }
                        if (isValue(dscr)) {
                            c = contains.call(dscr, "c");
                            e = contains.call(dscr, "e");
                            w = contains.call(dscr, "w");
                        } else {
                            c = w = true;
                            e = false;
                        }
                        desc = {
                            value: value,
                            configurable: c,
                            enumerable: e,
                            writable: w
                        };
                        return !options ? desc : assign(normalizeOpts(options), desc);
                    });
                    d.gs = function (dscr, get, set /*, options*/) {
                        var c, e, options, desc;
                        if (typeof dscr !== "string") {
                            options = set;
                            set = get;
                            get = dscr;
                            dscr = null;
                        } else {
                            options = arguments[3];
                        }
                        if (!isValue(get)) {
                            get = undefined;
                        } else if (!isPlainFunction(get)) {
                            options = get;
                            get = set = undefined;
                        } else if (!isValue(set)) {
                            set = undefined;
                        } else if (!isPlainFunction(set)) {
                            options = set;
                            set = undefined;
                        }
                        if (isValue(dscr)) {
                            c = contains.call(dscr, "c");
                            e = contains.call(dscr, "e");
                        } else {
                            c = true;
                            e = false;
                        }
                        desc = {
                            get: get,
                            set: set,
                            configurable: c,
                            enumerable: e
                        };
                        return !options ? desc : assign(normalizeOpts(options), desc);
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/function/noop.js":
                /*!***********************************************!*\
        !*** ./node_modules/es5-ext/function/noop.js ***!
        \***********************************************/
                /***/
                function _node_modules_es5Ext_function_noopJs(module) {
                    "use strict";

                    // eslint-disable-next-line no-empty-function
                    module.exports = function () {};

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/assign/index.js":
                /*!*****************************************************!*\
        !*** ./node_modules/es5-ext/object/assign/index.js ***!
        \*****************************************************/
                /***/
                function _node_modules_es5Ext_object_assign_indexJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    module.exports = __webpack_require__(
                        /*! ./is-implemented */ "./node_modules/es5-ext/object/assign/is-implemented.js"
                    )()
                        ? Object.assign
                        : __webpack_require__(
                              /*! ./shim */ "./node_modules/es5-ext/object/assign/shim.js"
                          );

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/assign/is-implemented.js":
                /*!**************************************************************!*\
        !*** ./node_modules/es5-ext/object/assign/is-implemented.js ***!
        \**************************************************************/
                /***/
                function _node_modules_es5Ext_object_assign_isImplementedJs(module) {
                    "use strict";

                    module.exports = function () {
                        var assign = Object.assign,
                            obj;
                        if (typeof assign !== "function") return false;
                        obj = {
                            foo: "raz"
                        };
                        assign(
                            obj,
                            {
                                bar: "dwa"
                            },
                            {
                                trzy: "trzy"
                            }
                        );
                        return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/assign/shim.js":
                /*!****************************************************!*\
        !*** ./node_modules/es5-ext/object/assign/shim.js ***!
        \****************************************************/
                /***/
                function _node_modules_es5Ext_object_assign_shimJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var keys = __webpack_require__(
                            /*! ../keys */ "./node_modules/es5-ext/object/keys/index.js"
                        ),
                        value = __webpack_require__(
                            /*! ../valid-value */ "./node_modules/es5-ext/object/valid-value.js"
                        ),
                        max = Math.max;
                    module.exports = function (dest, src /*, …srcn*/) {
                        var error,
                            i,
                            length = max(arguments.length, 2),
                            assign;
                        dest = Object(value(dest));
                        assign = function assign(key) {
                            try {
                                dest[key] = src[key];
                            } catch (e) {
                                if (!error) error = e;
                            }
                        };
                        for (i = 1; i < length; ++i) {
                            src = arguments[i];
                            keys(src).forEach(assign);
                        }
                        if (error !== undefined) throw error;
                        return dest;
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/is-value.js":
                /*!*************************************************!*\
        !*** ./node_modules/es5-ext/object/is-value.js ***!
        \*************************************************/
                /***/
                function _node_modules_es5Ext_object_isValueJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var _undefined = __webpack_require__(
                        /*! ../function/noop */ "./node_modules/es5-ext/function/noop.js"
                    )(); // Support ES3 engines

                    module.exports = function (val) {
                        return val !== _undefined && val !== null;
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/keys/index.js":
                /*!***************************************************!*\
        !*** ./node_modules/es5-ext/object/keys/index.js ***!
        \***************************************************/
                /***/
                function _node_modules_es5Ext_object_keys_indexJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    module.exports = __webpack_require__(
                        /*! ./is-implemented */ "./node_modules/es5-ext/object/keys/is-implemented.js"
                    )()
                        ? Object.keys
                        : __webpack_require__(
                              /*! ./shim */ "./node_modules/es5-ext/object/keys/shim.js"
                          );

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/keys/is-implemented.js":
                /*!************************************************************!*\
        !*** ./node_modules/es5-ext/object/keys/is-implemented.js ***!
        \************************************************************/
                /***/
                function _node_modules_es5Ext_object_keys_isImplementedJs(module) {
                    "use strict";

                    module.exports = function () {
                        try {
                            Object.keys("primitive");
                            return true;
                        } catch (e) {
                            return false;
                        }
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/keys/shim.js":
                /*!**************************************************!*\
        !*** ./node_modules/es5-ext/object/keys/shim.js ***!
        \**************************************************/
                /***/
                function _node_modules_es5Ext_object_keys_shimJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isValue = __webpack_require__(
                        /*! ../is-value */ "./node_modules/es5-ext/object/is-value.js"
                    );
                    var keys = Object.keys;
                    module.exports = function (object) {
                        return keys(isValue(object) ? Object(object) : object);
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/normalize-options.js":
                /*!**********************************************************!*\
        !*** ./node_modules/es5-ext/object/normalize-options.js ***!
        \**********************************************************/
                /***/
                function _node_modules_es5Ext_object_normalizeOptionsJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isValue = __webpack_require__(
                        /*! ./is-value */ "./node_modules/es5-ext/object/is-value.js"
                    );
                    var forEach = Array.prototype.forEach,
                        create = Object.create;
                    var process = function process(src, obj) {
                        var key;
                        for (key in src) obj[key] = src[key];
                    };

                    // eslint-disable-next-line no-unused-vars
                    module.exports = function (opts1 /*, …options*/) {
                        var result = create(null);
                        forEach.call(arguments, function (options) {
                            if (!isValue(options)) return;
                            process(Object(options), result);
                        });
                        return result;
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/object/valid-value.js":
                /*!****************************************************!*\
        !*** ./node_modules/es5-ext/object/valid-value.js ***!
        \****************************************************/
                /***/
                function _node_modules_es5Ext_object_validValueJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isValue = __webpack_require__(
                        /*! ./is-value */ "./node_modules/es5-ext/object/is-value.js"
                    );
                    module.exports = function (value) {
                        if (!isValue(value))
                            throw new TypeError("Cannot use null or undefined");
                        return value;
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/string/\0#/contains/index.js":
                /*!**********************************************************!*\
        !*** ./node_modules/es5-ext/string/#/contains/index.js ***!
        \**********************************************************/
                /***/
                function _node_modules_es5Ext_string__contains_indexJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    module.exports = __webpack_require__(
                        /*! ./is-implemented */ "./node_modules/es5-ext/string/\0#/contains/is-implemented.js"
                    )()
                        ? String.prototype.contains
                        : __webpack_require__(
                              /*! ./shim */ "./node_modules/es5-ext/string/\0#/contains/shim.js"
                          );

                    /***/
                },
            /***/ "./node_modules/es5-ext/string/\0#/contains/is-implemented.js":
                /*!*******************************************************************!*\
        !*** ./node_modules/es5-ext/string/#/contains/is-implemented.js ***!
        \*******************************************************************/
                /***/
                function _node_modules_es5Ext_string__contains_isImplementedJs(module) {
                    "use strict";

                    var str = "razdwatrzy";
                    module.exports = function () {
                        if (typeof str.contains !== "function") return false;
                        return (
                            str.contains("dwa") === true && str.contains("foo") === false
                        );
                    };

                    /***/
                },
            /***/ "./node_modules/es5-ext/string/\0#/contains/shim.js":
                /*!*********************************************************!*\
        !*** ./node_modules/es5-ext/string/#/contains/shim.js ***!
        \*********************************************************/
                /***/
                function _node_modules_es5Ext_string__contains_shimJs(module) {
                    "use strict";

                    var indexOf = String.prototype.indexOf;
                    module.exports = function (searchString /*, position*/) {
                        return indexOf.call(this, searchString, arguments[1]) > -1;
                    };

                    /***/
                },
            /***/ "./node_modules/es6-symbol/index.js":
                /*!******************************************!*\
        !*** ./node_modules/es6-symbol/index.js ***!
        \******************************************/
                /***/
                function _node_modules_es6Symbol_indexJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    module.exports = __webpack_require__(
                        /*! ./is-implemented */ "./node_modules/es6-symbol/is-implemented.js"
                    )()
                        ? __webpack_require__(
                              /*! ext/global-this */ "./node_modules/ext/global-this/index.js"
                          ).Symbol
                        : __webpack_require__(
                              /*! ./polyfill */ "./node_modules/es6-symbol/polyfill.js"
                          );

                    /***/
                },
            /***/ "./node_modules/es6-symbol/is-implemented.js":
                /*!***************************************************!*\
        !*** ./node_modules/es6-symbol/is-implemented.js ***!
        \***************************************************/
                /***/
                function _node_modules_es6Symbol_isImplementedJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var global = __webpack_require__(
                            /*! ext/global-this */ "./node_modules/ext/global-this/index.js"
                        ),
                        validTypes = {
                            object: true,
                            symbol: true
                        };
                    module.exports = function () {
                        var _Symbol = global.Symbol;
                        var symbol;
                        if (typeof _Symbol !== "function") return false;
                        symbol = _Symbol("test symbol");
                        try {
                            String(symbol);
                        } catch (e) {
                            return false;
                        }

                        // Return 'true' also for polyfills
                        if (!validTypes[_typeof(_Symbol.iterator)]) return false;
                        if (!validTypes[_typeof(_Symbol.toPrimitive)]) return false;
                        if (!validTypes[_typeof(_Symbol.toStringTag)]) return false;
                        return true;
                    };

                    /***/
                },
            /***/ "./node_modules/es6-symbol/is-symbol.js":
                /*!**********************************************!*\
        !*** ./node_modules/es6-symbol/is-symbol.js ***!
        \**********************************************/
                /***/
                function _node_modules_es6Symbol_isSymbolJs(module) {
                    "use strict";

                    module.exports = function (value) {
                        if (!value) return false;
                        if (_typeof(value) === "symbol") return true;
                        if (!value.constructor) return false;
                        if (value.constructor.name !== "Symbol") return false;
                        return value[value.constructor.toStringTag] === "Symbol";
                    };

                    /***/
                },
            /***/ "./node_modules/es6-symbol/lib/private/generate-name.js":
                /*!**************************************************************!*\
        !*** ./node_modules/es6-symbol/lib/private/generate-name.js ***!
        \**************************************************************/
                /***/
                function _node_modules_es6Symbol_lib_private_generateNameJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var d = __webpack_require__(/*! d */ "./node_modules/d/index.js");
                    var create = Object.create,
                        defineProperty = Object.defineProperty,
                        objPrototype = Object.prototype;
                    var created = create(null);
                    module.exports = function (desc) {
                        var postfix = 0,
                            name,
                            ie11BugWorkaround;
                        while (created[desc + (postfix || "")]) ++postfix;
                        desc += postfix || "";
                        created[desc] = true;
                        name = "@@" + desc;
                        defineProperty(
                            objPrototype,
                            name,
                            d.gs(null, function (value) {
                                // For IE11 issue see:
                                // https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
                                //    ie11-broken-getters-on-dom-objects
                                // https://github.com/medikoo/es6-symbol/issues/12
                                if (ie11BugWorkaround) return;
                                ie11BugWorkaround = true;
                                defineProperty(this, name, d(value));
                                ie11BugWorkaround = false;
                            })
                        );
                        return name;
                    };

                    /***/
                },
            /***/ "./node_modules/es6-symbol/lib/private/setup/standard-symbols.js":
                /*!***********************************************************************!*\
        !*** ./node_modules/es6-symbol/lib/private/setup/standard-symbols.js ***!
        \***********************************************************************/
                /***/
                function _node_modules_es6Symbol_lib_private_setup_standardSymbolsJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var d = __webpack_require__(/*! d */ "./node_modules/d/index.js"),
                        NativeSymbol = __webpack_require__(
                            /*! ext/global-this */ "./node_modules/ext/global-this/index.js"
                        ).Symbol;
                    module.exports = function (SymbolPolyfill) {
                        return Object.defineProperties(SymbolPolyfill, {
                            // To ensure proper interoperability with other native functions (e.g. Array.from)
                            // fallback to eventual native implementation of given symbol
                            hasInstance: d(
                                "",
                                (NativeSymbol && NativeSymbol.hasInstance) ||
                                    SymbolPolyfill("hasInstance")
                            ),
                            isConcatSpreadable: d(
                                "",
                                (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
                                    SymbolPolyfill("isConcatSpreadable")
                            ),
                            iterator: d(
                                "",
                                (NativeSymbol && NativeSymbol.iterator) ||
                                    SymbolPolyfill("iterator")
                            ),
                            match: d(
                                "",
                                (NativeSymbol && NativeSymbol.match) ||
                                    SymbolPolyfill("match")
                            ),
                            replace: d(
                                "",
                                (NativeSymbol && NativeSymbol.replace) ||
                                    SymbolPolyfill("replace")
                            ),
                            search: d(
                                "",
                                (NativeSymbol && NativeSymbol.search) ||
                                    SymbolPolyfill("search")
                            ),
                            species: d(
                                "",
                                (NativeSymbol && NativeSymbol.species) ||
                                    SymbolPolyfill("species")
                            ),
                            split: d(
                                "",
                                (NativeSymbol && NativeSymbol.split) ||
                                    SymbolPolyfill("split")
                            ),
                            toPrimitive: d(
                                "",
                                (NativeSymbol && NativeSymbol.toPrimitive) ||
                                    SymbolPolyfill("toPrimitive")
                            ),
                            toStringTag: d(
                                "",
                                (NativeSymbol && NativeSymbol.toStringTag) ||
                                    SymbolPolyfill("toStringTag")
                            ),
                            unscopables: d(
                                "",
                                (NativeSymbol && NativeSymbol.unscopables) ||
                                    SymbolPolyfill("unscopables")
                            )
                        });
                    };

                    /***/
                },
            /***/ "./node_modules/es6-symbol/lib/private/setup/symbol-registry.js":
                /*!**********************************************************************!*\
        !*** ./node_modules/es6-symbol/lib/private/setup/symbol-registry.js ***!
        \**********************************************************************/
                /***/
                function _node_modules_es6Symbol_lib_private_setup_symbolRegistryJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var d = __webpack_require__(/*! d */ "./node_modules/d/index.js"),
                        validateSymbol = __webpack_require__(
                            /*! ../../../validate-symbol */ "./node_modules/es6-symbol/validate-symbol.js"
                        );
                    var registry = Object.create(null);
                    module.exports = function (SymbolPolyfill) {
                        return Object.defineProperties(SymbolPolyfill, {
                            for: d(function (key) {
                                if (registry[key]) return registry[key];
                                return (registry[key] = SymbolPolyfill(String(key)));
                            }),
                            keyFor: d(function (symbol) {
                                var key;
                                validateSymbol(symbol);
                                for (key in registry) {
                                    if (registry[key] === symbol) return key;
                                }
                                return undefined;
                            })
                        });
                    };

                    /***/
                },
            /***/ "./node_modules/es6-symbol/polyfill.js":
                /*!*********************************************!*\
        !*** ./node_modules/es6-symbol/polyfill.js ***!
        \*********************************************/
                /***/
                function _node_modules_es6Symbol_polyfillJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    // ES2015 Symbol polyfill for environments that do not (or partially) support it
                    var d = __webpack_require__(/*! d */ "./node_modules/d/index.js"),
                        validateSymbol = __webpack_require__(
                            /*! ./validate-symbol */ "./node_modules/es6-symbol/validate-symbol.js"
                        ),
                        NativeSymbol = __webpack_require__(
                            /*! ext/global-this */ "./node_modules/ext/global-this/index.js"
                        ).Symbol,
                        generateName = __webpack_require__(
                            /*! ./lib/private/generate-name */ "./node_modules/es6-symbol/lib/private/generate-name.js"
                        ),
                        setupStandardSymbols = __webpack_require__(
                            /*! ./lib/private/setup/standard-symbols */ "./node_modules/es6-symbol/lib/private/setup/standard-symbols.js"
                        ),
                        setupSymbolRegistry = __webpack_require__(
                            /*! ./lib/private/setup/symbol-registry */ "./node_modules/es6-symbol/lib/private/setup/symbol-registry.js"
                        );
                    var create = Object.create,
                        defineProperties = Object.defineProperties,
                        defineProperty = Object.defineProperty;
                    var SymbolPolyfill, HiddenSymbol, isNativeSafe;
                    if (typeof NativeSymbol === "function") {
                        try {
                            String(NativeSymbol());
                            isNativeSafe = true;
                        } catch (ignore) {}
                    } else {
                        NativeSymbol = null;
                    }

                    // Internal constructor (not one exposed) for creating Symbol instances.
                    // This one is used to ensure that `someSymbol instanceof Symbol` always return false
                    HiddenSymbol = function _Symbol2(description) {
                        if (this instanceof HiddenSymbol)
                            throw new TypeError("Symbol is not a constructor");
                        return SymbolPolyfill(description);
                    };

                    // Exposed `Symbol` constructor
                    // (returns instances of HiddenSymbol)
                    module.exports = SymbolPolyfill = function _Symbol3(description) {
                        var symbol;
                        if (this instanceof _Symbol3)
                            throw new TypeError("Symbol is not a constructor");
                        if (isNativeSafe) return NativeSymbol(description);
                        symbol = create(HiddenSymbol.prototype);
                        description =
                            description === undefined ? "" : String(description);
                        return defineProperties(symbol, {
                            __description__: d("", description),
                            __name__: d("", generateName(description))
                        });
                    };
                    setupStandardSymbols(SymbolPolyfill);
                    setupSymbolRegistry(SymbolPolyfill);

                    // Internal tweaks for real symbol producer
                    defineProperties(HiddenSymbol.prototype, {
                        constructor: d(SymbolPolyfill),
                        toString: d("", function () {
                            return this.__name__;
                        })
                    });

                    // Proper implementation of methods exposed on Symbol.prototype
                    // They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
                    defineProperties(SymbolPolyfill.prototype, {
                        toString: d(function () {
                            return (
                                "Symbol (" + validateSymbol(this).__description__ + ")"
                            );
                        }),
                        valueOf: d(function () {
                            return validateSymbol(this);
                        })
                    });
                    defineProperty(
                        SymbolPolyfill.prototype,
                        SymbolPolyfill.toPrimitive,
                        d("", function () {
                            var symbol = validateSymbol(this);
                            if (_typeof(symbol) === "symbol") return symbol;
                            return symbol.toString();
                        })
                    );
                    defineProperty(
                        SymbolPolyfill.prototype,
                        SymbolPolyfill.toStringTag,
                        d("c", "Symbol")
                    );

                    // Proper implementaton of toPrimitive and toStringTag for returned symbol instances
                    defineProperty(
                        HiddenSymbol.prototype,
                        SymbolPolyfill.toStringTag,
                        d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
                    );

                    // Note: It's important to define `toPrimitive` as last one, as some implementations
                    // implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
                    // And that may invoke error in definition flow:
                    // See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
                    defineProperty(
                        HiddenSymbol.prototype,
                        SymbolPolyfill.toPrimitive,
                        d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
                    );

                    /***/
                },
            /***/ "./node_modules/es6-symbol/validate-symbol.js":
                /*!****************************************************!*\
        !*** ./node_modules/es6-symbol/validate-symbol.js ***!
        \****************************************************/
                /***/
                function _node_modules_es6Symbol_validateSymbolJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isSymbol = __webpack_require__(
                        /*! ./is-symbol */ "./node_modules/es6-symbol/is-symbol.js"
                    );
                    module.exports = function (value) {
                        if (!isSymbol(value))
                            throw new TypeError(value + " is not a symbol");
                        return value;
                    };

                    /***/
                },
            /***/ "./node_modules/ext/global-this/implementation.js":
                /*!********************************************************!*\
        !*** ./node_modules/ext/global-this/implementation.js ***!
        \********************************************************/
                /***/
                function _node_modules_ext_globalThis_implementationJs(module) {
                    var naiveFallback = function naiveFallback() {
                        if (
                            (typeof self === "undefined"
                                ? "undefined"
                                : _typeof(self)) === "object" &&
                            self
                        )
                            return self;
                        if (
                            (typeof window === "undefined"
                                ? "undefined"
                                : _typeof(window)) === "object" &&
                            window
                        )
                            return window;
                        throw new Error("Unable to resolve global `this`");
                    };
                    module.exports = (function () {
                        if (this) return this;

                        // Unexpected strict mode (may happen if e.g. bundled into ESM module)

                        // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
                        // In all ES5+ engines global object inherits from Object.prototype
                        // (if you approached one that doesn't please report)
                        try {
                            Object.defineProperty(Object.prototype, "__global__", {
                                get: function get() {
                                    return this;
                                },
                                configurable: true
                            });
                        } catch (error) {
                            // Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
                            return naiveFallback();
                        }
                        try {
                            // Safari case (window.__global__ is resolved with global context, but __global__ does not)
                            if (!__global__) return naiveFallback();
                            return __global__;
                        } finally {
                            delete Object.prototype.__global__;
                        }
                    })();

                    /***/
                },
            /***/ "./node_modules/ext/global-this/index.js":
                /*!***********************************************!*\
        !*** ./node_modules/ext/global-this/index.js ***!
        \***********************************************/
                /***/
                function _node_modules_ext_globalThis_indexJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    module.exports = __webpack_require__(
                        /*! ./is-implemented */ "./node_modules/ext/global-this/is-implemented.js"
                    )()
                        ? globalThis
                        : __webpack_require__(
                              /*! ./implementation */ "./node_modules/ext/global-this/implementation.js"
                          );

                    /***/
                },
            /***/ "./node_modules/ext/global-this/is-implemented.js":
                /*!********************************************************!*\
        !*** ./node_modules/ext/global-this/is-implemented.js ***!
        \********************************************************/
                /***/
                function _node_modules_ext_globalThis_isImplementedJs(module) {
                    "use strict";

                    module.exports = function () {
                        if (
                            (typeof globalThis === "undefined"
                                ? "undefined"
                                : _typeof(globalThis)) !== "object"
                        )
                            return false;
                        if (!globalThis) return false;
                        return globalThis.Array === Array;
                    };

                    /***/
                },
            /***/ "./node_modules/type/function/is.js":
                /*!******************************************!*\
        !*** ./node_modules/type/function/is.js ***!
        \******************************************/
                /***/
                function _node_modules_type_function_isJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isPrototype = __webpack_require__(
                        /*! ../prototype/is */ "./node_modules/type/prototype/is.js"
                    );
                    module.exports = function (value) {
                        if (typeof value !== "function") return false;
                        if (!hasOwnProperty.call(value, "length")) return false;
                        try {
                            if (typeof value.length !== "number") return false;
                            if (typeof value.call !== "function") return false;
                            if (typeof value.apply !== "function") return false;
                        } catch (error) {
                            return false;
                        }
                        return !isPrototype(value);
                    };

                    /***/
                },
            /***/ "./node_modules/type/object/is.js":
                /*!****************************************!*\
        !*** ./node_modules/type/object/is.js ***!
        \****************************************/
                /***/
                function _node_modules_type_object_isJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isValue = __webpack_require__(
                        /*! ../value/is */ "./node_modules/type/value/is.js"
                    );

                    // prettier-ignore
                    var possibleTypes = {
          "object": true,
          "function": true,
          "undefined": true /* document.all */
        };
                    module.exports = function (value) {
                        if (!isValue(value)) return false;
                        return hasOwnProperty.call(possibleTypes, _typeof(value));
                    };

                    /***/
                },
            /***/ "./node_modules/type/plain-function/is.js":
                /*!************************************************!*\
        !*** ./node_modules/type/plain-function/is.js ***!
        \************************************************/
                /***/
                function _node_modules_type_plainFunction_isJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isFunction = __webpack_require__(
                        /*! ../function/is */ "./node_modules/type/function/is.js"
                    );
                    var classRe = /^\s*class[\s{/}]/,
                        functionToString = Function.prototype.toString;
                    module.exports = function (value) {
                        if (!isFunction(value)) return false;
                        if (classRe.test(functionToString.call(value))) return false;
                        return true;
                    };

                    /***/
                },
            /***/ "./node_modules/type/prototype/is.js":
                /*!*******************************************!*\
        !*** ./node_modules/type/prototype/is.js ***!
        \*******************************************/
                /***/
                function _node_modules_type_prototype_isJs(
                    module,
                    __unused_webpack_exports,
                    __webpack_require__
                ) {
                    "use strict";

                    var isObject = __webpack_require__(
                        /*! ../object/is */ "./node_modules/type/object/is.js"
                    );
                    module.exports = function (value) {
                        if (!isObject(value)) return false;
                        try {
                            if (!value.constructor) return false;
                            return value.constructor.prototype === value;
                        } catch (error) {
                            return false;
                        }
                    };

                    /***/
                },
            /***/ "./node_modules/type/value/is.js":
                /*!***************************************!*\
        !*** ./node_modules/type/value/is.js ***!
        \***************************************/
                /***/
                function _node_modules_type_value_isJs(module) {
                    "use strict";

                    // ES3 safe
                    var _undefined = void 0;
                    module.exports = function (value) {
                        return value !== _undefined && value !== null;
                    };

                    /***/
                }

            /******/
        };
        /************************************************************************/
        /******/ // The module cache
        /******/
        var __webpack_module_cache__ = {};
        /******/
        /******/ // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/ // Check if module is in cache
            /******/ var cachedModule = __webpack_module_cache__[moduleId];
            /******/
            if (cachedModule !== undefined) {
                /******/ return cachedModule.exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/
            var module = (__webpack_module_cache__[moduleId] = {
                /******/ // no module.id needed
                /******/ // no module.loaded needed
                /******/ exports: {}
                /******/
            });
            /******/
            /******/ // Execute the module function
            /******/
            __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
            /******/
            /******/ // Return the exports of the module
            /******/
            return module.exports;
            /******/
        }
        /******/
        /************************************************************************/
        /******/
        /******/ // startup
        /******/ // Load entry module and return exports
        /******/ // This entry module used 'module' so it can't be inlined
        /******/
        var __webpack_exports__ = __webpack_require__("./entry.js");
        /******/
        /******/
        return __webpack_exports__;
        /******/
    })();
});
