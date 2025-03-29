/*!
 * jQuery JavaScript Library v4.0.0-beta.2+8fcad90.dirty -core/ready-no-deferred,-ajax,-ajax/jsonp,-ajax/xhr,-ajax/script,-css,-css/showHide,-deprecated,-dimensions,-effects,-offset,-wrap,-event,-event/trigger,-core/ready,-deferred,-ajax/binary,-ajax/load,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-css/adjustCSS,-css/cssCamelCase,-css/curCSS,-css/finalPropName,-css/hiddenVisibleSelectors,-css/isAutoPx,-css/support,-css/var/cssExpand,-css/var/getStyles,-css/var/isHiddenWithinTree,-css/var/rcustomProp,-css/var/rnumnonpx,-css/var/swap,-effects/animatedSelector,-effects/Tween,-deprecated/event,-deferred/exceptionHook,-queue,-queue/delay +core/ready-no-deferred
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-10-11T17:05Z
 */

// custom : only core,selector
// npm run build -- -e core/ready-no-deferred -e ajax -e ajax/jsonp -e ajax/xhr -e ajax/script  -e ajax/xhr   -e css -e css/showHide -e deprecated -e dimensions -e effects -e offset -e wrap -e event -e event/trigger -e core/ready -e deferred -e exports/global --amd --filename="custom.js"
// other changes, dependent on  xmldom, not support dependent on window.document function
// 3.8版本,无法打包指定模块
(function (global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        module.exports = factory(global, true);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['xmldom'], factory);
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    'use strict';

    if (!window.document) {
        throw new Error('jQuery requires a window with a document');
    }

    var arr = [];

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    // Support: IE 11+
    // IE doesn't have Array#flat; provide a fallback.
    var flat = arr.flat
        ? function (array) {
              return arr.flat.call(array);
          }
        : function (array) {
              return arr.concat.apply([], array);
          };

    var push = arr.push;

    var indexOf = arr.indexOf;

    // [[Class]] -> type pairs
    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    // All support tests are defined in their respective modules.
    var support = {};

    function toType(obj) {
        if (obj == null) {
            return obj + '';
        }

        return typeof obj === 'object'
            ? class2type[toString.call(obj)] || 'object'
            : typeof obj;
    }

    function isWindow(obj) {
        return obj != null && obj === obj.window;
    }

    function isArrayLike(obj) {
        var length = !!obj && obj.length,
            type = toType(obj);

        if (typeof obj === 'function' || isWindow(obj)) {
            return false;
        }

        return (
            type === 'array' ||
            length === 0 ||
            (typeof length === 'number' && length > 0 && length - 1 in obj)
        );
    }

    var document$1 = window.document;

    var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
    };

    function DOMEval(code, node, doc) {
        doc = doc || document$1;

        var i,
            script = doc.createElement('script');

        script.text = code;
        for (i in preservedScriptAttributes) {
            if (node && node[i]) {
                script[i] = node[i];
            }
        }

        if (doc.head.appendChild(script).parentNode) {
            script.parentNode.removeChild(script);
        }
    }

    var version =
            '4.0.0-beta.2+8fcad90.dirty -core/ready-no-deferred,-ajax,-ajax/jsonp,-ajax/xhr,-ajax/script,-css,-css/showHide,-deprecated,-dimensions,-effects,-offset,-wrap,-event,-event/trigger,-core/ready,-deferred,-ajax/binary,-ajax/load,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-css/adjustCSS,-css/cssCamelCase,-css/curCSS,-css/finalPropName,-css/hiddenVisibleSelectors,-css/isAutoPx,-css/support,-css/var/cssExpand,-css/var/getStyles,-css/var/isHiddenWithinTree,-css/var/rcustomProp,-css/var/rnumnonpx,-css/var/swap,-effects/animatedSelector,-effects/Tween,-deprecated/event,-deferred/exceptionHook,-queue,-queue/delay +core/ready-no-deferred',
        rhtmlSuffix = /HTML$/i,
        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {
            // Return all the elements in a clean array
            if (num == null) {
                return slice.call(this);
            }

            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {
            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function (callback) {
            return jQuery.each(this, callback);
        },

        map: function (callback) {
            return this.pushStack(
                jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                })
            );
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        even: function () {
            return this.pushStack(
                jQuery.grep(this, function (_elem, i) {
                    return (i + 1) % 2;
                })
            );
        },

        odd: function () {
            return this.pushStack(
                jQuery.grep(this, function (_elem, i) {
                    return i % 2;
                })
            );
        },

        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor();
        }
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === 'boolean') {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    copy = options[name];

                    // Prevent Object.prototype pollution
                    // Prevent never-ending loop
                    if (name === '__proto__' || target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (
                        deep &&
                        copy &&
                        (jQuery.isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))
                    ) {
                        src = target[name];

                        // Ensure proper type for the source value
                        if (copyIsArray && !Array.isArray(src)) {
                            clone = [];
                        } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                            clone = {};
                        } else {
                            clone = src;
                        }
                        copyIsArray = false;

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () {},

        isPlainObject: function (obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || toString.call(obj) !== '[object Object]') {
                return false;
            }

            proto = getProto(obj);

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
            return (
                typeof Ctor === 'function' &&
                fnToString.call(Ctor) === ObjectFunctionString
            );
        },

        isEmptyObject: function (obj) {
            var name;

            for (name in obj) {
                return false;
            }
            return true;
        },

        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function (code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
        },

        each: function (obj, callback) {
            var length,
                i = 0;

            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        // Retrieve the text value of an array of DOM nodes
        text: function (elem) {
            var node,
                ret = '',
                i = 0,
                nodeType = elem.nodeType;

            if (!nodeType) {
                // If no nodeType, this is expected to be an array
                while ((node = elem[i++])) {
                    // Do not traverse comment nodes
                    ret += jQuery.text(node);
                }
            }
            if (nodeType === 1 || nodeType === 11) {
                return elem.textContent;
            }
            if (nodeType === 9) {
                return elem.documentElement.textContent;
            }
            if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }

            // Do not include comment or processing instruction nodes

            return ret;
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },

        isXMLDoc: function (elem) {
            var namespace = elem && elem.namespaceURI,
                docElem = elem && (elem.ownerDocument || elem).documentElement;

            // Assume HTML when documentElement doesn't yet exist, such as inside
            // document fragments.
            return !rhtmlSuffix.test(
                namespace || (docElem && docElem.nodeName) || 'HTML'
            );
        },

        // Note: an element does not contain itself
        contains: function (a, b) {
            var bup = b && b.parentNode;

            return (
                a === bup ||
                !!(
                    bup &&
                    bup.nodeType === 1 &&
                    // Support: IE 9 - 11+
                    // IE doesn't have `contains` on SVG.
                    (a.contains
                        ? a.contains(bup)
                        : a.compareDocumentPosition &&
                          a.compareDocumentPosition(bup) & 16)
                )
            );
        },

        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var length,
                value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return flat(ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    if (typeof Symbol === 'function') {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }

    // Populate the class2type map
    jQuery.each(
        'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
        function (_i, name) {
            class2type['[object ' + name + ']'] = name.toLowerCase();
        }
    );

    function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }

    var pop = arr.pop;

    // https://www.w3.org/TR/css3-selectors/#whitespace
    var whitespace = '[\\x20\\t\\r\\n\\f]';

    var isIE = document$1.documentMode;

    // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
    // Make sure the `:has()` argument is parsed unforgivingly.
    // We include `*` in the test to detect buggy implementations that are
    // _selectively_ forgiving (specifically when the list includes at least
    // one valid selector).
    // Note that we treat complete lack of support for `:has()` as if it were
    // spec-compliant support, which is fine because use of `:has()` in such
    // environments will fail in the qSA path and fall back to jQuery traversal
    // anyway.
    try {
        document$1.querySelector(':has(*,:jqfake)');
        support.cssHas = false;
    } catch (e) {
        support.cssHas = true;
    }

    // Build QSA regex.
    // Regex strategy adopted from Diego Perini.
    var rbuggyQSA = [];

    if (isIE) {
        rbuggyQSA.push(
            // Support: IE 9 - 11+
            // IE's :disabled selector does not pick up the children of disabled fieldsets
            ':enabled',
            ':disabled',

            // Support: IE 11+
            // IE 11 doesn't find elements on a `[name='']` query in some cases.
            // Adding a temporary attribute to the document before the selection works
            // around the issue.
            '\\[' + whitespace + '*name' + whitespace + '*=' + whitespace + '*(?:\'\'|"")'
        );
    }

    if (!support.cssHas) {
        // Our regular `try-catch` mechanism fails to detect natively-unsupported
        // pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
        // in browsers that parse the `:has()` argument as a forgiving selector list.
        // https://drafts.csswg.org/selectors/#relational now requires the argument
        // to be parsed unforgivingly, but browsers have not yet fully adjusted.
        rbuggyQSA.push(':has');
    }

    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));

    var rtrimCSS = new RegExp(
        '^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$',
        'g'
    );

    // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
    var identifier =
        '(?:\\\\[\\da-fA-F]{1,6}' +
        whitespace +
        '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+';

    var rleadingCombinator = new RegExp(
        '^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'
    );

    var rdescend = new RegExp(whitespace + '|>');

    var rsibling = /[+~]/;

    var documentElement$1 = document$1.documentElement;

    if (documentElement$1 !== undefined) {
        {
            // Support: IE 9 - 11+
            // IE requires a prefix.
            var matches =
                documentElement$1.matches || documentElement$1.msMatchesSelector;
        }
    }

    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *    property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *    deleting the oldest entry
     */
    function createCache() {
        var keys = [];

        function cache(key, value) {
            // Use (key + " ") to avoid collision with native prototype properties
            // (see https://github.com/jquery/sizzle/issues/157)
            if (keys.push(key + ' ') > jQuery.expr.cacheLength) {
                // Only keep the most recent entries
                delete cache[keys.shift()];
            }
            return (cache[key + ' '] = value);
        }

        return cache;
    }

    /**
     * Checks a node for validity as a jQuery selector context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext(context) {
        return context && typeof context.getElementsByTagName !== 'undefined' && context;
    }

    // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
    var attributes =
        '\\[' +
        whitespace +
        '*(' +
        identifier +
        ')(?:' +
        whitespace +
        // Operator (capture 2)
        '*([*^$|!~]?=)' +
        whitespace +
        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        identifier +
        '))|)' +
        whitespace +
        '*\\]';

    var pseudos =
        ':(' +
        identifier +
        ')(?:\\((' +
        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' +
        // 2. simple (capture 6)
        '((?:\\\\.|[^\\\\()[\\]]|' +
        attributes +
        ')*)|' +
        // 3. anything else (capture 2)
        '.*' +
        ')\\)|)';

    var filterMatchExpr = {
        ID: new RegExp('^#(' + identifier + ')'),
        CLASS: new RegExp('^\\.(' + identifier + ')'),
        TAG: new RegExp('^(' + identifier + '|[*])'),
        ATTR: new RegExp('^' + attributes),
        PSEUDO: new RegExp('^' + pseudos),
        CHILD: new RegExp(
            '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                whitespace +
                '*(even|odd|(([+-]|)(\\d*)n|)' +
                whitespace +
                '*(?:([+-]|)' +
                whitespace +
                '*(\\d+)|))' +
                whitespace +
                '*\\)|)',
            'i'
        )
    };

    var rpseudo = new RegExp(pseudos);

    // CSS escapes
    // https://www.w3.org/TR/CSS21/syndata.html#escaped-characters

    var runescape = new RegExp(
            '\\\\[\\da-fA-F]{1,6}' + whitespace + '?|\\\\([^\\r\\n\\f])',
            'g'
        ),
        funescape = function (escape, nonHex) {
            var high = '0x' + escape.slice(1) - 0x10000;

            if (nonHex) {
                // Strip the backslash prefix from a non-hex escape sequence
                return nonHex;
            }

            // Replace a hexadecimal escape sequence with the encoded Unicode code point
            // Support: IE <=11+
            // For values outside the Basic Multilingual Plane (BMP), manually construct a
            // surrogate pair
            return high < 0
                ? String.fromCharCode(high + 0x10000)
                : String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
        };

    function unescapeSelector(sel) {
        return sel.replace(runescape, funescape);
    }

    function selectorError(msg) {
        jQuery.error('Syntax error, unrecognized expression: ' + msg);
    }

    var rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*');

    var tokenCache = createCache();

    function tokenize(selector, parseOnly) {
        var matched,
            match,
            tokens,
            type,
            soFar,
            groups,
            preFilters,
            cached = tokenCache[selector + ' '];

        if (cached) {
            return parseOnly ? 0 : cached.slice(0);
        }

        soFar = selector;
        groups = [];
        preFilters = jQuery.expr.preFilter;

        while (soFar) {
            // Comma and first run
            if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                    // Don't consume trailing commas as valid
                    soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push((tokens = []));
            }

            matched = false;

            // Combinators
            if ((match = rleadingCombinator.exec(soFar))) {
                matched = match.shift();
                tokens.push({
                    value: matched,

                    // Cast descendant combinators to space
                    type: match[0].replace(rtrimCSS, ' ')
                });
                soFar = soFar.slice(matched.length);
            }

            // Filters
            for (type in filterMatchExpr) {
                if (
                    (match = jQuery.expr.match[type].exec(soFar)) &&
                    (!preFilters[type] || (match = preFilters[type](match)))
                ) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    });
                    soFar = soFar.slice(matched.length);
                }
            }

            if (!matched) {
                break;
            }
        }

        // Return the length of the invalid excess
        // if we're just parsing
        // Otherwise, throw an error or return tokens
        if (parseOnly) {
            return soFar.length;
        }

        return soFar
            ? selectorError(selector)
            : // Cache the tokens
              tokenCache(selector, groups).slice(0);
    }

    var preFilter = {
        ATTR: function (match) {
            match[1] = unescapeSelector(match[1]);

            // Move the given value to match[3] whether quoted or unquoted
            match[3] = unescapeSelector(match[3] || match[4] || match[5] || '');

            if (match[2] === '~=') {
                match[3] = ' ' + match[3] + ' ';
            }

            return match.slice(0, 4);
        },

        CHILD: function (match) {
            /* matches from filterMatchExpr["CHILD"]
			1 type (only|nth|...)
			2 what (child|of-type)
			3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
			4 xn-component of xn+y argument ([+-]?\d*n|)
			5 sign of xn-component
			6 x of xn-component
			7 sign of y-component
			8 y of y-component
		*/
            match[1] = match[1].toLowerCase();

            if (match[1].slice(0, 3) === 'nth') {
                // nth-* requires argument
                if (!match[3]) {
                    selectorError(match[0]);
                }

                // numeric x and y parameters for jQuery.expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                match[4] = +(match[4]
                    ? match[5] + (match[6] || 1)
                    : 2 * (match[3] === 'even' || match[3] === 'odd'));
                match[5] = +(match[7] + match[8] || match[3] === 'odd');

                // other types prohibit arguments
            } else if (match[3]) {
                selectorError(match[0]);
            }

            return match;
        },

        PSEUDO: function (match) {
            var excess,
                unquoted = !match[6] && match[2];

            if (filterMatchExpr.CHILD.test(match[0])) {
                return null;
            }

            // Accept quoted arguments as-is
            if (match[3]) {
                match[2] = match[4] || match[5] || '';

                // Strip excess characters from unquoted arguments
            } else if (
                unquoted &&
                rpseudo.test(unquoted) &&
                // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) &&
                // advance to the next closing parenthesis
                (excess =
                    unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)
            ) {
                // excess is a negative index
                match[0] = match[0].slice(0, excess);
                match[2] = unquoted.slice(0, excess);
            }

            // Return only captures needed by the pseudo filter method (type and argument)
            return match.slice(0, 3);
        }
    };

    function toSelector(tokens) {
        var i = 0,
            len = tokens.length,
            selector = '';
        for (; i < len; i++) {
            selector += tokens[i].value;
        }
        return selector;
    }

    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    function access(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if (toType(key) === 'object') {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (typeof value !== 'function') {
                raw = true;
            }

            if (bulk) {
                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function (elem, _key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < len; i++) {
                    fn(
                        elems[i],
                        key,
                        raw ? value : value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }

        if (chainable) {
            return elems;
        }

        // Gets
        if (bulk) {
            return fn.call(elems);
        }

        return len ? fn(elems[0], key) : emptyGet;
    }

    // Only count HTML whitespace
    // Other whitespace should count in values
    // https://infra.spec.whatwg.org/#ascii-whitespace
    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function (elem, name, value) {
            var ret,
                hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === 'undefined') {
                return jQuery.prop(elem, name, value);
            }

            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks = jQuery.attrHooks[name.toLowerCase()];
            }

            if (value !== undefined) {
                if (
                    value === null ||
                    // For compat with previous handling of boolean attributes,
                    // remove when `false` passed. For ARIA attributes -
                    // many of which recognize a `"false"` value - continue to
                    // set the `"false"` value as jQuery <4 did.
                    (value === false && name.toLowerCase().indexOf('aria-') !== 0)
                ) {
                    jQuery.removeAttr(elem, name);
                    return;
                }

                if (
                    hooks &&
                    'set' in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                    return ret;
                }

                elem.setAttribute(name, value);
                return value;
            }

            if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            ret = elem.getAttribute(name);

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {},

        removeAttr: function (elem, value) {
            var name,
                i = 0,
                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);

            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    elem.removeAttribute(name);
                }
            }
        }
    });

    // Support: IE <=11+
    // An input loses its value after becoming a radio
    if (isIE) {
        jQuery.attrHooks.type = {
            set: function (elem, value) {
                if (value === 'radio' && nodeName(elem, 'input')) {
                    var val = elem.value;
                    elem.setAttribute('type', value);
                    if (val) {
                        elem.value = val;
                    }
                    return value;
                }
            }
        };
    }

    // CSS string/identifier serialization
    // https://drafts.csswg.org/cssom/#common-serializing-idioms
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

    function fcssescape(ch, asCodePoint) {
        if (asCodePoint) {
            // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
            if (ch === '\0') {
                return '\uFFFD';
            }

            // Control characters and (dependent upon position) numbers get escaped as code points
            return (
                ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' '
            );
        }

        // Other potentially-special ASCII characters get backslash-escaped
        return '\\' + ch;
    }

    jQuery.escapeSelector = function (sel) {
        return (sel + '').replace(rcssescape, fcssescape);
    };

    var sort = arr.sort;

    var splice = arr.splice;

    var hasDuplicate;

    // Document order sorting
    function sortOrder(a, b) {
        // Flag for duplicate removal
        if (a === b) {
            hasDuplicate = true;
            return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
            return compare;
        }

        // Calculate position if both inputs belong to the same document
        // Support: IE 11+
        // IE sometimes throws a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        compare =
            (a.ownerDocument || a) == (b.ownerDocument || b)
                ? a.compareDocumentPosition(b)
                : // Otherwise we know they are disconnected
                  1;

        // Disconnected nodes
        if (compare & 1) {
            // Choose the first element that is related to the document
            // Support: IE 11+
            // IE sometimes throws a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if (
                a == document$1 ||
                (a.ownerDocument == document$1 && jQuery.contains(document$1, a))
            ) {
                return -1;
            }

            // Support: IE 11+
            // IE sometimes throws a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if (
                b == document$1 ||
                (b.ownerDocument == document$1 && jQuery.contains(document$1, b))
            ) {
                return 1;
            }

            // Maintain original order
            return 0;
        }

        return compare & 4 ? -1 : 1;
    }

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    jQuery.uniqueSort = function (results) {
        var elem,
            duplicates = [],
            j = 0,
            i = 0;

        hasDuplicate = false;

        sort.call(results, sortOrder);

        if (hasDuplicate) {
            while ((elem = results[i++])) {
                if (elem === results[i]) {
                    j = duplicates.push(i);
                }
            }
            while (j--) {
                splice.call(results, duplicates[j], 1);
            }
        }

        return results;
    };

    jQuery.fn.uniqueSort = function () {
        return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
    };

    var i,
        outermostContext,
        // Local document vars
        document,
        documentElement,
        documentIsHTML,
        // Instance-specific data
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        compilerCache = createCache(),
        nonnativeSelectorCache = createCache(),
        // Regular expressions

        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rwhitespace = new RegExp(whitespace + '+', 'g'),
        ridentifier = new RegExp('^' + identifier + '$'),
        matchExpr = jQuery.extend(
            {
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                needsContext: new RegExp(
                    '^' +
                        whitespace +
                        '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                        whitespace +
                        '*((?:-\\d)?\\d*)' +
                        whitespace +
                        '*\\)|)(?=[^-]|$)',
                    'i'
                )
            },
            filterMatchExpr
        ),
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr$1 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        // Used for iframes; see `setDocument`.
        // Support: IE 9 - 11+
        // Removing the function wrapper causes a "Permission Denied"
        // error in IE.
        unloadHandler = function () {
            setDocument();
        },
        inDisabledFieldset = addCombinator(
            function (elem) {
                return elem.disabled === true && nodeName(elem, 'fieldset');
            },
            { dir: 'parentNode', next: 'legend' }
        );

    function find(selector, context, results, seed) {
        var m,
            i,
            elem,
            nid,
            match,
            groups,
            newSelector,
            newContext = context && context.ownerDocument,
            // nodeType defaults to 9, since context defaults to document
            nodeType = context ? context.nodeType : 9;

        results = results || [];

        // Return early from calls with invalid selector or context
        if (
            typeof selector !== 'string' ||
            !selector ||
            (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
        ) {
            return results;
        }

        // Try to shortcut find operations (as opposed to filters) in HTML documents
        if (!seed) {
            setDocument(context);
            context = context || document;

            if (documentIsHTML) {
                // If the selector is sufficiently simple, try using a "get*By*" DOM method
                // (excepting DocumentFragment context, where the methods don't exist)
                if (nodeType !== 11 && (match = rquickExpr$1.exec(selector))) {
                    // ID selector
                    if ((m = match[1])) {
                        // Document context
                        if (nodeType === 9) {
                            if ((elem = context.getElementById(m))) {
                                push.call(results, elem);
                            }
                            return results;

                            // Element context
                        } else {
                            if (
                                newContext &&
                                (elem = newContext.getElementById(m)) &&
                                jQuery.contains(context, elem)
                            ) {
                                push.call(results, elem);
                                return results;
                            }
                        }

                        // Type selector
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;

                        // Class selector
                    } else if ((m = match[3]) && context.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }

                // Take advantage of querySelectorAll
                if (
                    !nonnativeSelectorCache[selector + ' '] &&
                    (!rbuggyQSA || !rbuggyQSA.test(selector))
                ) {
                    newSelector = selector;
                    newContext = context;

                    // qSA considers elements outside a scoping root when evaluating child or
                    // descendant combinators, which is not what we want.
                    // In such cases, we work around the behavior by prefixing every selector in the
                    // list with an ID selector referencing the scope context.
                    // The technique has to be used as well when a leading combinator is used
                    // as such selectors are not recognized by querySelectorAll.
                    // Thanks to Andrew Dupont for this technique.
                    if (
                        nodeType === 1 &&
                        (rdescend.test(selector) || rleadingCombinator.test(selector))
                    ) {
                        // Expand context for sibling selectors
                        newContext =
                            (rsibling.test(selector) &&
                                testContext(context.parentNode)) ||
                            context;

                        // Outside of IE, if we're not changing the context we can
                        // use :scope instead of an ID.
                        // Support: IE 11+
                        // IE sometimes throws a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        if (newContext != context || isIE) {
                            // Capture the context ID, setting it first if necessary
                            if ((nid = context.getAttribute('id'))) {
                                nid = jQuery.escapeSelector(nid);
                            } else {
                                context.setAttribute('id', (nid = jQuery.expando));
                            }
                        }

                        // Prefix every selector in the list
                        groups = tokenize(selector);
                        i = groups.length;
                        while (i--) {
                            groups[i] =
                                (nid ? '#' + nid : ':scope') +
                                ' ' +
                                toSelector(groups[i]);
                        }
                        newSelector = groups.join(',');
                    }

                    try {
                        push.apply(results, newContext.querySelectorAll(newSelector));
                        return results;
                    } catch (qsaError) {
                        nonnativeSelectorCache(selector, true);
                    } finally {
                        if (nid === jQuery.expando) {
                            context.removeAttribute('id');
                        }
                    }
                }
            }
        }

        // All others
        return select(selector.replace(rtrimCSS, '$1'), context, results, seed);
    }

    /**
     * Mark a function for special use by jQuery selector module
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
        fn[jQuery.expando] = true;
        return fn;
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo(type) {
        return function (elem) {
            return nodeName(elem, 'input') && elem.type === type;
        };
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo(type) {
        return function (elem) {
            return (
                (nodeName(elem, 'input') || nodeName(elem, 'button')) &&
                elem.type === type
            );
        };
    }

    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */
    function createDisabledPseudo(disabled) {
        // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
        return function (elem) {
            // Only certain elements can match :enabled or :disabled
            // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
            // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
            if ('form' in elem) {
                // Check for inherited disabledness on relevant non-disabled elements:
                // * listed form-associated elements in a disabled fieldset
                //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                // * option elements in a disabled optgroup
                //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                // All such elements have a "form" property.
                if (elem.parentNode && elem.disabled === false) {
                    // Option elements defer to a parent optgroup if present
                    if ('label' in elem) {
                        if ('label' in elem.parentNode) {
                            return elem.parentNode.disabled === disabled;
                        } else {
                            return elem.disabled === disabled;
                        }
                    }

                    // Support: IE 6 - 11+
                    // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                    return (
                        elem.isDisabled === disabled ||
                        // Where there is no isDisabled, check manually
                        (elem.isDisabled !== !disabled &&
                            inDisabledFieldset(elem) === disabled)
                    );
                }

                return elem.disabled === disabled;

                // Try to winnow out elements that can't be disabled before trusting the disabled property.
                // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                // even exist on them, let alone have a boolean value.
            } else if ('label' in elem) {
                return elem.disabled === disabled;
            }

            // Remaining elements are neither :enabled nor :disabled
            return false;
        };
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo(fn) {
        return markFunction(function (argument) {
            argument = +argument;
            return markFunction(function (seed, matches) {
                var j,
                    matchIndexes = fn([], seed.length, argument),
                    i = matchIndexes.length;

                // Match elements found at the specified indexes
                while (i--) {
                    if (seed[(j = matchIndexes[i])]) {
                        seed[j] = !(matches[j] = seed[j]);
                    }
                }
            });
        });
    }

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [node] An element or document object to use to set the document
     */
    function setDocument(node) {
        var subWindow,
            doc = node ? node.ownerDocument || node : document$1;

        // Return early if doc is invalid or already selected
        // Support: IE 11+
        // IE sometimes throws a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if (doc == document || doc.nodeType !== 9) {
            return;
        }

        // Update global variables
        document = doc;
        documentElement = document.documentElement;
        documentIsHTML = !jQuery.isXMLDoc(document);

        // Support: IE 9 - 11+
        // Accessing iframe documents after unload throws "permission denied" errors (see trac-13936)
        // Support: IE 11+
        // IE sometimes throws a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if (
            isIE &&
            document$1 != document &&
            (subWindow = document.defaultView) &&
            subWindow.top !== subWindow
        ) {
            subWindow.addEventListener('unload', unloadHandler);
        }
    }

    find.matches = function (expr, elements) {
        return find(expr, null, null, elements);
    };

    find.matchesSelector = function (elem, expr) {
        setDocument(elem);

        if (
            documentIsHTML &&
            !nonnativeSelectorCache[expr + ' '] &&
            (!rbuggyQSA || !rbuggyQSA.test(expr))
        ) {
            try {
                return matches.call(elem, expr);
            } catch (e) {
                nonnativeSelectorCache(expr, true);
            }
        }

        return find(expr, document, null, [elem]).length > 0;
    };

    jQuery.expr = {
        // Can be adjusted by the user
        cacheLength: 50,

        createPseudo: markFunction,

        match: matchExpr,

        find: {
            ID: function (id, context) {
                if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
                    var elem = context.getElementById(id);
                    return elem ? [elem] : [];
                }
            },

            TAG: function (tag, context) {
                if (typeof context.getElementsByTagName !== 'undefined') {
                    return context.getElementsByTagName(tag);

                    // DocumentFragment nodes don't have gEBTN
                } else {
                    return context.querySelectorAll(tag);
                }
            },

            CLASS: function (className, context) {
                if (
                    typeof context.getElementsByClassName !== 'undefined' &&
                    documentIsHTML
                ) {
                    return context.getElementsByClassName(className);
                }
            }
        },

        relative: {
            '>': { dir: 'parentNode', first: true },
            ' ': { dir: 'parentNode' },
            '+': { dir: 'previousSibling', first: true },
            '~': { dir: 'previousSibling' }
        },

        preFilter: preFilter,

        filter: {
            ID: function (id) {
                var attrId = unescapeSelector(id);
                return function (elem) {
                    return elem.getAttribute('id') === attrId;
                };
            },

            TAG: function (nodeNameSelector) {
                var expectedNodeName = unescapeSelector(nodeNameSelector).toLowerCase();
                return nodeNameSelector === '*'
                    ? function () {
                          return true;
                      }
                    : function (elem) {
                          return nodeName(elem, expectedNodeName);
                      };
            },

            CLASS: function (className) {
                var pattern = classCache[className + ' '];

                return (
                    pattern ||
                    ((pattern = new RegExp(
                        '(^|' + whitespace + ')' + className + '(' + whitespace + '|$)'
                    )) &&
                        classCache(className, function (elem) {
                            return pattern.test(
                                (typeof elem.className === 'string' && elem.className) ||
                                    (typeof elem.getAttribute !== 'undefined' &&
                                        elem.getAttribute('class')) ||
                                    ''
                            );
                        }))
                );
            },

            ATTR: function (name, operator, check) {
                return function (elem) {
                    var result = jQuery.attr(elem, name);

                    if (result == null) {
                        return operator === '!=';
                    }
                    if (!operator) {
                        return true;
                    }

                    result += '';

                    if (operator === '=') {
                        return result === check;
                    }
                    if (operator === '!=') {
                        return result !== check;
                    }
                    if (operator === '^=') {
                        return check && result.indexOf(check) === 0;
                    }
                    if (operator === '*=') {
                        return check && result.indexOf(check) > -1;
                    }
                    if (operator === '$=') {
                        return check && result.slice(-check.length) === check;
                    }
                    if (operator === '~=') {
                        return (
                            (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(
                                check
                            ) > -1
                        );
                    }
                    if (operator === '|=') {
                        return (
                            result === check ||
                            result.slice(0, check.length + 1) === check + '-'
                        );
                    }

                    return false;
                };
            },

            CHILD: function (type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== 'nth',
                    forward = type.slice(-4) !== 'last',
                    ofType = what === 'of-type';

                return first === 1 && last === 0
                    ? // Shortcut for :nth-*(n)
                      function (elem) {
                          return !!elem.parentNode;
                      }
                    : function (elem, _context, xml) {
                          var cache,
                              outerCache,
                              node,
                              nodeIndex,
                              start,
                              dir =
                                  simple !== forward ? 'nextSibling' : 'previousSibling',
                              parent = elem.parentNode,
                              name = ofType && elem.nodeName.toLowerCase(),
                              useCache = !xml && !ofType,
                              diff = false;

                          if (parent) {
                              // :(first|last|only)-(child|of-type)
                              if (simple) {
                                  while (dir) {
                                      node = elem;
                                      while ((node = node[dir])) {
                                          if (
                                              ofType
                                                  ? nodeName(node, name)
                                                  : node.nodeType === 1
                                          ) {
                                              return false;
                                          }
                                      }

                                      // Reverse direction for :only-* (if we haven't yet done so)
                                      start = dir =
                                          type === 'only' && !start && 'nextSibling';
                                  }
                                  return true;
                              }

                              start = [forward ? parent.firstChild : parent.lastChild];

                              // non-xml :nth-child(...) stores cache data on `parent`
                              if (forward && useCache) {
                                  // Seek `elem` from a previously-cached index
                                  outerCache =
                                      parent[jQuery.expando] ||
                                      (parent[jQuery.expando] = {});
                                  cache = outerCache[type] || [];
                                  nodeIndex = cache[0] === dirruns && cache[1];
                                  diff = nodeIndex && cache[2];
                                  node = nodeIndex && parent.childNodes[nodeIndex];

                                  while (
                                      (node =
                                          (++nodeIndex && node && node[dir]) ||
                                          // Fallback to seeking `elem` from the start
                                          (diff = nodeIndex = 0) ||
                                          start.pop())
                                  ) {
                                      // When found, cache indexes on `parent` and break
                                      if (
                                          node.nodeType === 1 &&
                                          ++diff &&
                                          node === elem
                                      ) {
                                          outerCache[type] = [dirruns, nodeIndex, diff];
                                          break;
                                      }
                                  }
                              } else {
                                  // Use previously-cached element index if available
                                  if (useCache) {
                                      outerCache =
                                          elem[jQuery.expando] ||
                                          (elem[jQuery.expando] = {});
                                      cache = outerCache[type] || [];
                                      nodeIndex = cache[0] === dirruns && cache[1];
                                      diff = nodeIndex;
                                  }

                                  // xml :nth-child(...)
                                  // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                  if (diff === false) {
                                      // Use the same loop as above to seek `elem` from the start
                                      while (
                                          (node =
                                              (++nodeIndex && node && node[dir]) ||
                                              (diff = nodeIndex = 0) ||
                                              start.pop())
                                      ) {
                                          if (
                                              (ofType
                                                  ? nodeName(node, name)
                                                  : node.nodeType === 1) &&
                                              ++diff
                                          ) {
                                              // Cache the index of each encountered element
                                              if (useCache) {
                                                  outerCache =
                                                      node[jQuery.expando] ||
                                                      (node[jQuery.expando] = {});
                                                  outerCache[type] = [dirruns, diff];
                                              }

                                              if (node === elem) {
                                                  break;
                                              }
                                          }
                                      }
                                  }
                              }

                              // Incorporate the offset, then check against cycle size
                              diff -= last;
                              return (
                                  diff === first ||
                                  (diff % first === 0 && diff / first >= 0)
                              );
                          }
                      };
            },

            PSEUDO: function (pseudo, argument) {
                // pseudo-class names are case-insensitive
                // https://www.w3.org/TR/selectors/#pseudo-classes
                // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                // Remember that setFilters inherits from pseudos
                var fn =
                    jQuery.expr.pseudos[pseudo] ||
                    jQuery.expr.setFilters[pseudo.toLowerCase()] ||
                    selectorError('unsupported pseudo: ' + pseudo);

                // The user may use createPseudo to indicate that
                // arguments are needed to create the filter function
                // just as jQuery does
                if (fn[jQuery.expando]) {
                    return fn(argument);
                }

                return fn;
            }
        },

        pseudos: {
            // Potentially complex pseudos
            not: markFunction(function (selector) {
                // Trim the selector passed to compile
                // to avoid treating leading and trailing
                // spaces as combinators
                var input = [],
                    results = [],
                    matcher = compile(selector.replace(rtrimCSS, '$1'));

                return matcher[jQuery.expando]
                    ? markFunction(function (seed, matches, _context, xml) {
                          var elem,
                              unmatched = matcher(seed, null, xml, []),
                              i = seed.length;

                          // Match elements unmatched by `matcher`
                          while (i--) {
                              if ((elem = unmatched[i])) {
                                  seed[i] = !(matches[i] = elem);
                              }
                          }
                      })
                    : function (elem, _context, xml) {
                          input[0] = elem;
                          matcher(input, null, xml, results);

                          // Don't keep the element
                          // (see https://github.com/jquery/sizzle/issues/299)
                          input[0] = null;
                          return !results.pop();
                      };
            }),

            has: markFunction(function (selector) {
                return function (elem) {
                    return find(selector, elem).length > 0;
                };
            }),

            contains: markFunction(function (text) {
                text = unescapeSelector(text);
                return function (elem) {
                    return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
                };
            }),

            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // https://www.w3.org/TR/selectors/#lang-pseudo
            lang: markFunction(function (lang) {
                // lang value must be a valid identifier
                if (!ridentifier.test(lang || '')) {
                    selectorError('unsupported lang: ' + lang);
                }
                lang = unescapeSelector(lang).toLowerCase();
                return function (elem) {
                    var elemLang;
                    do {
                        if (
                            (elemLang = documentIsHTML
                                ? elem.lang
                                : elem.getAttribute('xml:lang') ||
                                  elem.getAttribute('lang'))
                        ) {
                            elemLang = elemLang.toLowerCase();
                            return (
                                elemLang === lang || elemLang.indexOf(lang + '-') === 0
                            );
                        }
                    } while ((elem = elem.parentNode) && elem.nodeType === 1);
                    return false;
                };
            }),

            // Miscellaneous
            target: function (elem) {
                var hash = window.location && window.location.hash;
                return hash && hash.slice(1) === elem.id;
            },

            root: function (elem) {
                return elem === documentElement;
            },

            focus: function (elem) {
                return (
                    elem === document.activeElement &&
                    document.hasFocus() &&
                    !!(elem.type || elem.href || ~elem.tabIndex)
                );
            },

            // Boolean properties
            enabled: createDisabledPseudo(false),
            disabled: createDisabledPseudo(true),

            checked: function (elem) {
                // In CSS3, :checked should return both checked and selected elements
                // https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                return (
                    (nodeName(elem, 'input') && !!elem.checked) ||
                    (nodeName(elem, 'option') && !!elem.selected)
                );
            },

            selected: function (elem) {
                // Support: IE <=11+
                // Accessing the selectedIndex property
                // forces the browser to treat the default option as
                // selected when in an optgroup.
                if (isIE && elem.parentNode) {
                    // eslint-disable-next-line no-unused-expressions
                    elem.parentNode.selectedIndex;
                }

                return elem.selected === true;
            },

            // Contents
            empty: function (elem) {
                // https://www.w3.org/TR/selectors/#empty-pseudo
                // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                //   but not by others (comment: 8; processing instruction: 7; etc.)
                // nodeType < 6 works because attributes (2) do not appear as children
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                    if (elem.nodeType < 6) {
                        return false;
                    }
                }
                return true;
            },

            parent: function (elem) {
                return !jQuery.expr.pseudos.empty(elem);
            },

            // Element/input types
            header: function (elem) {
                return rheader.test(elem.nodeName);
            },

            input: function (elem) {
                return rinputs.test(elem.nodeName);
            },

            button: function (elem) {
                return (
                    (nodeName(elem, 'input') && elem.type === 'button') ||
                    nodeName(elem, 'button')
                );
            },

            text: function (elem) {
                return nodeName(elem, 'input') && elem.type === 'text';
            },

            // Position-in-collection
            first: createPositionalPseudo(function () {
                return [0];
            }),

            last: createPositionalPseudo(function (_matchIndexes, length) {
                return [length - 1];
            }),

            eq: createPositionalPseudo(function (_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
            }),

            even: createPositionalPseudo(function (matchIndexes, length) {
                var i = 0;
                for (; i < length; i += 2) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            }),

            odd: createPositionalPseudo(function (matchIndexes, length) {
                var i = 1;
                for (; i < length; i += 2) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            }),

            lt: createPositionalPseudo(function (matchIndexes, length, argument) {
                var i;

                if (argument < 0) {
                    i = argument + length;
                } else if (argument > length) {
                    i = length;
                } else {
                    i = argument;
                }

                for (; --i >= 0; ) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            }),

            gt: createPositionalPseudo(function (matchIndexes, length, argument) {
                var i = argument < 0 ? argument + length : argument;
                for (; ++i < length; ) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            })
        }
    };

    jQuery.expr.pseudos.nth = jQuery.expr.pseudos.eq;

    // Add button/input type pseudos
    for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
        jQuery.expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in { submit: true, reset: true }) {
        jQuery.expr.pseudos[i] = createButtonPseudo(i);
    }

    // Easy API for creating new setFilters
    function setFilters() {}

    setFilters.prototype = jQuery.expr.pseudos;
    jQuery.expr.setFilters = new setFilters();

    function addCombinator(matcher, combinator, base) {
        var dir = combinator.dir,
            skip = combinator.next,
            key = skip || dir,
            checkNonElements = base && key === 'parentNode',
            doneName = done++;

        return combinator.first
            ? // Check against closest ancestor/preceding element
              function (elem, context, xml) {
                  while ((elem = elem[dir])) {
                      if (elem.nodeType === 1 || checkNonElements) {
                          return matcher(elem, context, xml);
                      }
                  }
                  return false;
              }
            : // Check against all ancestor/preceding elements
              function (elem, context, xml) {
                  var oldCache,
                      outerCache,
                      newCache = [dirruns, doneName];

                  // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                  if (xml) {
                      while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                              if (matcher(elem, context, xml)) {
                                  return true;
                              }
                          }
                      }
                  } else {
                      while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                              outerCache =
                                  elem[jQuery.expando] || (elem[jQuery.expando] = {});

                              if (skip && nodeName(elem, skip)) {
                                  elem = elem[dir] || elem;
                              } else if (
                                  (oldCache = outerCache[key]) &&
                                  oldCache[0] === dirruns &&
                                  oldCache[1] === doneName
                              ) {
                                  // Assign to newCache so results back-propagate to previous elements
                                  return (newCache[2] = oldCache[2]);
                              } else {
                                  // Reuse newcache so results back-propagate to previous elements
                                  outerCache[key] = newCache;

                                  // A match means we're done; a fail means we have to keep checking
                                  if ((newCache[2] = matcher(elem, context, xml))) {
                                      return true;
                                  }
                              }
                          }
                      }
                  }
                  return false;
              };
    }

    function elementMatcher(matchers) {
        return matchers.length > 1
            ? function (elem, context, xml) {
                  var i = matchers.length;
                  while (i--) {
                      if (!matchers[i](elem, context, xml)) {
                          return false;
                      }
                  }
                  return true;
              }
            : matchers[0];
    }

    function multipleContexts(selector, contexts, results) {
        var i = 0,
            len = contexts.length;
        for (; i < len; i++) {
            find(selector, contexts[i], results);
        }
        return results;
    }

    function condense(unmatched, map, filter, context, xml) {
        var elem,
            newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;

        for (; i < len; i++) {
            if ((elem = unmatched[i])) {
                if (!filter || filter(elem, context, xml)) {
                    newUnmatched.push(elem);
                    if (mapped) {
                        map.push(i);
                    }
                }
            }
        }

        return newUnmatched;
    }

    function setMatcher(
        preFilter,
        selector,
        matcher,
        postFilter,
        postFinder,
        postSelector
    ) {
        if (postFilter && !postFilter[jQuery.expando]) {
            postFilter = setMatcher(postFilter);
        }
        if (postFinder && !postFinder[jQuery.expando]) {
            postFinder = setMatcher(postFinder, postSelector);
        }
        return markFunction(function (seed, results, context, xml) {
            var temp,
                i,
                elem,
                matcherOut,
                preMap = [],
                postMap = [],
                preexisting = results.length,
                // Get initial elements from seed or context
                elems =
                    seed ||
                    multipleContexts(
                        selector || '*',
                        context.nodeType ? [context] : context,
                        []
                    ),
                // Prefilter to get matcher input, preserving a map for seed-results synchronization
                matcherIn =
                    preFilter && (seed || !selector)
                        ? condense(elems, preMap, preFilter, context, xml)
                        : elems;

            if (matcher) {
                // If we have a postFinder, or filtered seed, or non-seed postFilter
                // or preexisting results,
                matcherOut =
                    postFinder || (seed ? preFilter : preexisting || postFilter)
                        ? // ...intermediate processing is necessary
                          []
                        : // ...otherwise use results directly
                          results;

                // Find primary matches
                matcher(matcherIn, matcherOut, context, xml);
            } else {
                matcherOut = matcherIn;
            }

            // Apply postFilter
            if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);

                // Un-match failing elements by moving them back to matcherIn
                i = temp.length;
                while (i--) {
                    if ((elem = temp[i])) {
                        matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                    }
                }
            }

            if (seed) {
                if (postFinder || preFilter) {
                    if (postFinder) {
                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                        temp = [];
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i])) {
                                // Restore matcherIn since elem is not yet a final match
                                temp.push((matcherIn[i] = elem));
                            }
                        }
                        postFinder(null, (matcherOut = []), temp, xml);
                    }

                    // Move matched elements from seed to results to keep them synchronized
                    i = matcherOut.length;
                    while (i--) {
                        if (
                            (elem = matcherOut[i]) &&
                            (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) >
                                -1
                        ) {
                            seed[temp] = !(results[temp] = elem);
                        }
                    }
                }

                // Add elements to results, through postFinder if defined
            } else {
                matcherOut = condense(
                    matcherOut === results
                        ? matcherOut.splice(preexisting, matcherOut.length)
                        : matcherOut
                );
                if (postFinder) {
                    postFinder(null, results, matcherOut, xml);
                } else {
                    push.apply(results, matcherOut);
                }
            }
        });
    }

    function matcherFromTokens(tokens) {
        var checkContext,
            matcher,
            j,
            len = tokens.length,
            leadingRelative = jQuery.expr.relative[tokens[0].type],
            implicitRelative = leadingRelative || jQuery.expr.relative[' '],
            i = leadingRelative ? 1 : 0,
            // The foundational matcher ensures that elements are reachable from top-level context(s)
            matchContext = addCombinator(
                function (elem) {
                    return elem === checkContext;
                },
                implicitRelative,
                true
            ),
            matchAnyContext = addCombinator(
                function (elem) {
                    return indexOf.call(checkContext, elem) > -1;
                },
                implicitRelative,
                true
            ),
            matchers = [
                function (elem, context, xml) {
                    // Support: IE 11+
                    // IE sometimes throws a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    var ret =
                        (!leadingRelative && (xml || context != outermostContext)) ||
                        ((checkContext = context).nodeType
                            ? matchContext(elem, context, xml)
                            : matchAnyContext(elem, context, xml));

                    // Avoid hanging onto element
                    // (see https://github.com/jquery/sizzle/issues/299)
                    checkContext = null;
                    return ret;
                }
            ];

        for (; i < len; i++) {
            if ((matcher = jQuery.expr.relative[tokens[i].type])) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
                matcher = jQuery.expr.filter[tokens[i].type].apply(
                    null,
                    tokens[i].matches
                );

                // Return special upon seeing a positional matcher
                if (matcher[jQuery.expando]) {
                    // Find the next relative operator (if any) for proper handling
                    j = ++i;
                    for (; j < len; j++) {
                        if (jQuery.expr.relative[tokens[j].type]) {
                            break;
                        }
                    }
                    return setMatcher(
                        i > 1 && elementMatcher(matchers),
                        i > 1 &&
                            toSelector(
                                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                tokens.slice(0, i - 1).concat({
                                    value: tokens[i - 2].type === ' ' ? '*' : ''
                                })
                            ).replace(rtrimCSS, '$1'),
                        matcher,
                        i < j && matcherFromTokens(tokens.slice(i, j)),
                        j < len && matcherFromTokens((tokens = tokens.slice(j))),
                        j < len && toSelector(tokens)
                    );
                }
                matchers.push(matcher);
            }
        }

        return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function (seed, context, xml, results, outermost) {
                var elem,
                    j,
                    matcher,
                    matchedCount = 0,
                    i = '0',
                    unmatched = seed && [],
                    setMatched = [],
                    contextBackup = outermostContext,
                    // We must always have either seed elements or outermost context
                    elems = seed || (byElement && jQuery.expr.find.TAG('*', outermost)),
                    // Use integer dirruns iff this is the outermost matcher
                    dirrunsUnique = (dirruns +=
                        contextBackup == null ? 1 : Math.random() || 0.1);

                if (outermost) {
                    // Support: IE 11+
                    // IE sometimes throws a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    outermostContext = context == document || context || outermost;
                }

                // Add elements passing elementMatchers directly to results
                for (; (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;

                        // Support: IE 11+
                        // IE sometimes throws a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        if (!context && elem.ownerDocument != document) {
                            setDocument(elem);
                            xml = !documentIsHTML;
                        }
                        while ((matcher = elementMatchers[j++])) {
                            if (matcher(elem, context || document, xml)) {
                                push.call(results, elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }

                    // Track unmatched elements for set filters
                    if (bySet) {
                        // They will have gone through all possible matchers
                        if ((elem = !matcher && elem)) {
                            matchedCount--;
                        }

                        // Lengthen the array for every element, matched or not
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }

                // `i` is now the count of elements visited above, and adding it to `matchedCount`
                // makes the latter nonnegative.
                matchedCount += i;

                // Apply set filters to unmatched elements
                // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                // no element matchers and no seed.
                // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                // numerically zero.
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while ((matcher = setMatchers[j++])) {
                        matcher(unmatched, setMatched, context, xml);
                    }

                    if (seed) {
                        // Reintegrate element matches to eliminate the need for sorting
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }

                        // Discard index placeholder values to get only actual matches
                        setMatched = condense(setMatched);
                    }

                    // Add matches to results
                    push.apply(results, setMatched);

                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
                    if (
                        outermost &&
                        !seed &&
                        setMatched.length > 0 &&
                        matchedCount + setMatchers.length > 1
                    ) {
                        jQuery.uniqueSort(results);
                    }
                }

                // Override manipulation of globals by nested matchers
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }

                return unmatched;
            };

        return bySet ? markFunction(superMatcher) : superMatcher;
    }

    function compile(selector, match /* Internal Use Only */) {
        var i,
            setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[selector + ' '];

        if (!cached) {
            // Generate a function of recursive functions that can be used to check each element
            if (!match) {
                match = tokenize(selector);
            }
            i = match.length;
            while (i--) {
                cached = matcherFromTokens(match[i]);
                if (cached[jQuery.expando]) {
                    setMatchers.push(cached);
                } else {
                    elementMatchers.push(cached);
                }
            }

            // Cache the compiled function
            cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
            );

            // Save selector and tokenization
            cached.selector = selector;
        }
        return cached;
    }

    /**
     * A low-level selection function that works with jQuery's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with jQuery selector compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    function select(selector, context, results, seed) {
        var i,
            tokens,
            token,
            type,
            find,
            compiled = typeof selector === 'function' && selector,
            match = !seed && tokenize((selector = compiled.selector || selector));

        results = results || [];

        // Try to minimize operations if there is only one selector in the list and no seed
        // (the latter of which guarantees us context)
        if (match.length === 1) {
            // Reduce context if the leading compound selector is an ID
            tokens = match[0] = match[0].slice(0);
            if (
                tokens.length > 2 &&
                (token = tokens[0]).type === 'ID' &&
                context.nodeType === 9 &&
                documentIsHTML &&
                jQuery.expr.relative[tokens[1].type]
            ) {
                context = (jQuery.expr.find.ID(
                    unescapeSelector(token.matches[0]),
                    context
                ) || [])[0];
                if (!context) {
                    return results;

                    // Precompiled matchers will still verify ancestry, so step up a level
                } else if (compiled) {
                    context = context.parentNode;
                }

                selector = selector.slice(tokens.shift().value.length);
            }

            // Fetch a seed set for right-to-left matching
            i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
            while (i--) {
                token = tokens[i];

                // Abort if we hit a combinator
                if (jQuery.expr.relative[(type = token.type)]) {
                    break;
                }
                if ((find = jQuery.expr.find[type])) {
                    // Search, expanding context for leading sibling combinators
                    if (
                        (seed = find(
                            unescapeSelector(token.matches[0]),
                            (rsibling.test(tokens[0].type) &&
                                testContext(context.parentNode)) ||
                                context
                        ))
                    ) {
                        // If seed is empty or no tokens remain, we can return early
                        tokens.splice(i, 1);
                        selector = seed.length && toSelector(tokens);
                        if (!selector) {
                            push.apply(results, seed);
                            return results;
                        }

                        break;
                    }
                }
            }
        }

        // Compile and execute a filtering function if one is not provided
        // Provide `match` to avoid retokenization if we modified the selector above
        (compiled || compile(selector, match))(
            seed,
            context,
            !documentIsHTML,
            results,
            !context ||
                (rsibling.test(selector) && testContext(context.parentNode)) ||
                context
        );
        return results;
    }

    // Initialize against the default document
    setDocument();

    jQuery.find = find;

    // These have always been private, but they used to be documented as part of
    // Sizzle so let's maintain them for now for backwards compatibility purposes.
    find.compile = compile;
    find.select = select;
    find.setDocument = setDocument;
    find.tokenize = tokenize;

    function dir(elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    }

    function siblings(n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    }

    var rneedsContext = jQuery.expr.match.needsContext;

    // rsingleTag matches a string consisting of a single HTML element with no attributes
    // and captures the element's name
    var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function isObviousHtml(input) {
        return input[0] === '<' && input[input.length - 1] === '>' && input.length >= 3;
    }

    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (typeof qualifier === 'function') {
            return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }

        // Single element
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) !== not;
            });
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if (typeof qualifier !== 'string') {
            return jQuery.grep(elements, function (elem) {
                return indexOf.call(qualifier, elem) > -1 !== not;
            });
        }

        // Filtered directly for both simple and complex selectors
        return jQuery.filter(qualifier, elements, not);
    }

    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ':not(' + expr + ')';
        }

        if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }

        return jQuery.find.matches(
            expr,
            jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            })
        );
    };

    jQuery.fn.extend({
        find: function (selector) {
            var i,
                ret,
                len = this.length,
                self = this;

            if (typeof selector !== 'string') {
                return this.pushStack(
                    jQuery(selector).filter(function () {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return true;
                            }
                        }
                    })
                );
            }

            ret = this.pushStack([]);

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === 'string' && rneedsContext.test(selector)
                    ? jQuery(selector)
                    : selector || [],
                false
            ).length;
        }
    });

    // Initialize a jQuery object

    // A central reference to the root jQuery(document)
    var rootjQuery,
        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
        // Strict HTML recognition (trac-11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        init = (jQuery.fn.init = function (selector, context) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // HANDLE: $(DOMElement)
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (typeof selector === 'function') {
                return rootjQuery.ready !== undefined
                    ? rootjQuery.ready(selector)
                    : // Execute immediately if ready is not present
                      selector(jQuery);
            } else {
                // Handle obvious HTML strings
                match = selector + '';
                if (isObviousHtml(match)) {
                    // Assume that strings that start and end with <> are HTML and skip
                    // the regex check. This also handles browser-supported HTML wrappers
                    // like TrustedHTML.
                    match = [null, selector, null];

                    // Handle HTML strings or selectors
                } else if (typeof selector === 'string') {
                    match = rquickExpr.exec(selector);
                } else {
                    return jQuery.makeArray(selector, this);
                }

                // Match html or make sure no context is specified for #id
                // Note: match[1] may be a string or a TrustedHTML wrapper
                if (match && (match[1] || !context)) {
                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(
                            this,
                            jQuery.parseHTML(
                                match[1],
                                context && context.nodeType
                                    ? context.ownerDocument || context
                                    : document$1,
                                true
                            )
                        );

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (typeof this[match] === 'function') {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document$1.getElementById(match[2]);

                        if (elem) {
                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr) & $(expr, $(...))
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }
            }
        });

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document$1);

    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend({
        has: function (target) {
            var targets = jQuery(target, this),
                l = targets.length;

            return this.filter(function () {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== 'string' && jQuery(selectors);

            // Positional selectors never match, since there's no _selection_ context
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                        // Always skip document fragments
                        if (
                            cur.nodeType < 11 &&
                            (targets
                                ? targets.index(cur) > -1
                                : // Don't pass non-elements to jQuery#find
                                  cur.nodeType === 1 &&
                                  jQuery.find.matchesSelector(cur, selectors))
                        ) {
                            matched.push(cur);
                            break;
                        }
                    }
                }
            }

            return this.pushStack(
                matched.length > 1 ? jQuery.uniqueSort(matched) : matched
            );
        },

        // Determine the position of an element within the set
        index: function (elem) {
            // No argument, return index in parent
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if (typeof elem === 'string') {
                return indexOf.call(jQuery(elem), this[0]);
            }

            // Locate the position of the desired element
            return indexOf.call(
                this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
            );
        },

        add: function (selector, context) {
            return this.pushStack(
                jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context)))
            );
        },

        addBack: function (selector) {
            return this.add(
                selector == null ? this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur;
    }

    jQuery.each(
        {
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return dir(elem, 'parentNode');
            },
            parentsUntil: function (elem, _i, until) {
                return dir(elem, 'parentNode', until);
            },
            next: function (elem) {
                return sibling(elem, 'nextSibling');
            },
            prev: function (elem) {
                return sibling(elem, 'previousSibling');
            },
            nextAll: function (elem) {
                return dir(elem, 'nextSibling');
            },
            prevAll: function (elem) {
                return dir(elem, 'previousSibling');
            },
            nextUntil: function (elem, _i, until) {
                return dir(elem, 'nextSibling', until);
            },
            prevUntil: function (elem, _i, until) {
                return dir(elem, 'previousSibling', until);
            },
            siblings: function (elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
            },
            children: function (elem) {
                return siblings(elem.firstChild);
            },
            contents: function (elem) {
                if (
                    elem.contentDocument != null &&
                    // Support: IE 11+
                    // <object> elements with no `data` attribute has an object
                    // `contentDocument` with a `null` prototype.
                    getProto(elem.contentDocument)
                ) {
                    return elem.contentDocument;
                }

                // Support: IE 9 - 11+
                // Treat the template element as a regular one in browsers that
                // don't support it.
                if (nodeName(elem, 'template')) {
                    elem = elem.content || elem;
                }

                return jQuery.merge([], elem.childNodes);
            }
        },
        function (name, fn) {
            jQuery.fn[name] = function (until, selector) {
                var matched = jQuery.map(this, fn, until);

                if (name.slice(-5) !== 'Until') {
                    selector = until;
                }

                if (selector && typeof selector === 'string') {
                    matched = jQuery.filter(selector, matched);
                }

                if (this.length > 1) {
                    // Remove duplicates
                    if (!guaranteedUnique[name]) {
                        jQuery.uniqueSort(matched);
                    }

                    // Reverse order for parents* and prev-derivatives
                    if (rparentsprev.test(name)) {
                        matched.reverse();
                    }
                }

                return this.pushStack(matched);
            };
        }
    );

    // Convert String-formatted options into Object-formatted ones
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {
        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options =
            typeof options === 'string'
                ? createOptions(options)
                : jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,
            // Last fire value for non-forgettable lists
            memory,
            // Flag to know if list was already fired
            fired,
            // Flag to prevent firing
            locked,
            // Actual callback list
            list = [],
            // Queue of execution data for repeatable lists
            queue = [],
            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,
            // Fire callbacks
            fire = function () {
                // Enforce single-firing
                locked = locked || options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        // Run callback and check for early termination
                        if (
                            list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse
                        ) {
                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if (locked) {
                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = '';
                    }
                }
            },
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }

                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (typeof arg === 'function') {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (
                                    arg &&
                                    arg.length &&
                                    toType(arg) !== 'string'
                                ) {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);

                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);

                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = '';
                    return this;
                },
                disabled: function () {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = '';
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };

    // Matches dashed string for camelizing
    var rdashAlpha = /-([a-z])/g;

    // Used by camelCase as callback to replace()
    function fcamelCase(_all, letter) {
        return letter.toUpperCase();
    }

    // Convert dashed to camelCase
    function camelCase(string) {
        return string.replace(rdashAlpha, fcamelCase);
    }

    /**
     * Determines whether an object can have data
     */
    function acceptData(owner) {
        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    }

    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {
        cache: function (owner) {
            // Check if the owner object already has a cache
            var value = owner[this.expando];

            // If not, create one
            if (!value) {
                value = Object.create(null);

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see trac-8335.
                // Always return an empty object.
                if (acceptData(owner)) {
                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if (owner.nodeType) {
                        owner[this.expando] = value;

                        // Otherwise secure it in a non-enumerable property
                        // configurable must be true to allow the property to be
                        // deleted when data is removed
                    } else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        });
                    }
                }
            }

            return value;
        },
        set: function (owner, data, value) {
            var prop,
                cache = this.cache(owner);

            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if (typeof data === 'string') {
                cache[camelCase(data)] = value;

                // Handle: [ owner, { properties } ] args
            } else {
                // Copy the properties one-by-one to the cache object
                for (prop in data) {
                    cache[camelCase(prop)] = data[prop];
                }
            }
            return value;
        },
        get: function (owner, key) {
            return key === undefined
                ? this.cache(owner)
                : // Always use camelCase key (gh-2257)
                  owner[this.expando] && owner[this.expando][camelCase(key)];
        },
        access: function (owner, key, value) {
            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if (
                key === undefined ||
                (key && typeof key === 'string' && value === undefined)
            ) {
                return this.get(owner, key);
            }

            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set(owner, key, value);

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function (owner, key) {
            var i,
                cache = owner[this.expando];

            if (cache === undefined) {
                return;
            }

            if (key !== undefined) {
                // Support array or space separated string of keys
                if (Array.isArray(key)) {
                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map(camelCase);
                } else {
                    key = camelCase(key);

                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
                }

                i = key.length;

                while (i--) {
                    delete cache[key[i]];
                }
            }

            // Remove the expando if there's no more data
            if (key === undefined || jQuery.isEmptyObject(cache)) {
                // Support: Chrome <=35 - 45+
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if (owner.nodeType) {
                    owner[this.expando] = undefined;
                } else {
                    delete owner[this.expando];
                }
            }
        },
        hasData: function (owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
    };

    var dataPriv = new Data();

    var dataUser = new Data();

    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support "private" and "user" data.
    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function getData(data) {
        if (data === 'true') {
            return true;
        }

        if (data === 'false') {
            return false;
        }

        if (data === 'null') {
            return null;
        }

        // Only convert to a number if it doesn't change the string
        if (data === +data + '') {
            return +data;
        }

        if (rbrace.test(data)) {
            return JSON.parse(data);
        }

        return data;
    }

    function dataAttr(elem, key, data) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {
            name = 'data-' + key.replace(rmultiDash, '-$&').toLowerCase();
            data = elem.getAttribute(name);

            if (typeof data === 'string') {
                try {
                    data = getData(data);
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                dataUser.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend({
        hasData: function (elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },

        data: function (elem, name, data) {
            return dataUser.access(elem, name, data);
        },

        removeData: function (elem, name) {
            dataUser.remove(elem, name);
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function (elem, name, data) {
            return dataPriv.access(elem, name, data);
        },

        _removeData: function (elem, name) {
            dataPriv.remove(elem, name);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i,
                name,
                data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);

                    if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
                        i = attrs.length;
                        while (i--) {
                            // Support: IE 11+
                            // The attrs elements can be null (trac-14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf('data-') === 0) {
                                    name = camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        dataPriv.set(elem, 'hasDataAttrs', true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === 'object') {
                return this.each(function () {
                    dataUser.set(this, key);
                });
            }

            return access(
                this,
                function (value) {
                    var data;

                    // The calling jQuery object (element matches) is not empty
                    // (and therefore has an element appears at this[ 0 ]) and the
                    // `value` parameter was not undefined. An empty jQuery object
                    // will result in `undefined` for elem = this[ 0 ] which will
                    // throw an exception if an attempt to read a data cache is made.
                    if (elem && value === undefined) {
                        // Attempt to get data from the cache
                        // The key will always be camelCased in Data
                        data = dataUser.get(elem, key);
                        if (data !== undefined) {
                            return data;
                        }

                        // Attempt to "discover" the data in
                        // HTML5 custom data-* attrs
                        data = dataAttr(elem, key);
                        if (data !== undefined) {
                            return data;
                        }

                        // We tried really hard, but the data doesn't exist.
                        return;
                    }

                    // Set the data...
                    this.each(function () {
                        // We always store the camelCased key
                        dataUser.set(this, key, value);
                    });
                },
                null,
                value,
                arguments.length > 1,
                null,
                true
            );
        },

        removeData: function (key) {
            return this.each(function () {
                dataUser.remove(this, key);
            });
        }
    });

    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function (name) {
            return this.each(function () {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });

    jQuery.extend({
        prop: function (elem, name, value) {
            var ret,
                hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                if (
                    hooks &&
                    'set' in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                    return ret;
                }

                return (elem[name] = value);
            }

            if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            return elem[name];
        },

        propHooks: {
            tabIndex: {
                get: function (elem) {
                    // Support: IE <=9 - 11+
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // Use proper attribute retrieval (trac-12072)
                    var tabindex = elem.getAttribute('tabindex');

                    if (tabindex) {
                        return parseInt(tabindex, 10);
                    }

                    if (
                        rfocusable.test(elem.nodeName) ||
                        // href-less anchor's `tabIndex` property value is `0` and
                        // the `tabindex` attribute value: `null`. We want `-1`.
                        (rclickable.test(elem.nodeName) && elem.href)
                    ) {
                        return 0;
                    }

                    return -1;
                }
            }
        },

        propFix: {
            for: 'htmlFor',
            class: 'className'
        }
    });

    // Support: IE <=11+
    // Accessing the selectedIndex property forces the browser to respect
    // setting selected on the option. The getter ensures a default option
    // is selected when in an optgroup. ESLint rule "no-unused-expressions"
    // is disabled for this code since it considers such accessions noop.
    if (isIE) {
        jQuery.propHooks.selected = {
            get: function (elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    // eslint-disable-next-line no-unused-expressions
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    // eslint-disable-next-line no-unused-expressions
                    parent.selectedIndex;

                    if (parent.parentNode) {
                        // eslint-disable-next-line no-unused-expressions
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each(
        [
            'tabIndex',
            'readOnly',
            'maxLength',
            'cellSpacing',
            'cellPadding',
            'rowSpan',
            'colSpan',
            'useMap',
            'frameBorder',
            'contentEditable'
        ],
        function () {
            jQuery.propFix[this.toLowerCase()] = this;
        }
    );

    // Strip and collapse whitespace according to HTML spec
    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(' ');
    }

    function getClass(elem) {
        return (elem.getAttribute && elem.getAttribute('class')) || '';
    }

    function classesToArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string') {
            return value.match(rnothtmlwhite) || [];
        }
        return [];
    }

    jQuery.fn.extend({
        addClass: function (value) {
            var classNames, cur, curValue, className, i, finalValue;

            if (typeof value === 'function') {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }

            classNames = classesToArray(value);

            if (classNames.length) {
                return this.each(function () {
                    curValue = getClass(this);
                    cur = this.nodeType === 1 && ' ' + stripAndCollapse(curValue) + ' ';

                    if (cur) {
                        for (i = 0; i < classNames.length; i++) {
                            className = classNames[i];
                            if (cur.indexOf(' ' + className + ' ') < 0) {
                                cur += className + ' ';
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            this.setAttribute('class', finalValue);
                        }
                    }
                });
            }

            return this;
        },

        removeClass: function (value) {
            var classNames, cur, curValue, className, i, finalValue;

            if (typeof value === 'function') {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }

            if (!arguments.length) {
                return this.attr('class', '');
            }

            classNames = classesToArray(value);

            if (classNames.length) {
                return this.each(function () {
                    curValue = getClass(this);

                    // This expression is here for better compressibility (see addClass)
                    cur = this.nodeType === 1 && ' ' + stripAndCollapse(curValue) + ' ';

                    if (cur) {
                        for (i = 0; i < classNames.length; i++) {
                            className = classNames[i];

                            // Remove *all* instances
                            while (cur.indexOf(' ' + className + ' ') > -1) {
                                cur = cur.replace(' ' + className + ' ', ' ');
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            this.setAttribute('class', finalValue);
                        }
                    }
                });
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var classNames, className, i, self;

            if (typeof value === 'function') {
                return this.each(function (i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    );
                });
            }

            if (typeof stateVal === 'boolean') {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            classNames = classesToArray(value);

            if (classNames.length) {
                return this.each(function () {
                    // Toggle individual class names
                    self = jQuery(this);

                    for (i = 0; i < classNames.length; i++) {
                        className = classNames[i];

                        // Check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                });
            }

            return this;
        },

        hasClass: function (selector) {
            var className,
                elem,
                i = 0;

            className = ' ' + selector + ' ';
            while ((elem = this[i++])) {
                if (
                    elem.nodeType === 1 &&
                    (' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1
                ) {
                    return true;
                }
            }

            return false;
        }
    });

    jQuery.fn.extend({
        val: function (value) {
            var hooks,
                ret,
                valueIsFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks =
                        jQuery.valHooks[elem.type] ||
                        jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (
                        hooks &&
                        'get' in hooks &&
                        (ret = hooks.get(elem, 'value')) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    // Handle cases where value is null/undef or number
                    return ret == null ? '' : ret;
                }

                return;
            }

            valueIsFunction = typeof value === 'function';

            return this.each(function (i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (valueIsFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = '';
                } else if (typeof val === 'number') {
                    val += '';
                } else if (Array.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? '' : value + '';
                    });
                }

                hooks =
                    jQuery.valHooks[this.type] ||
                    jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (
                    !hooks ||
                    !('set' in hooks) ||
                    hooks.set(this, val, 'value') === undefined
                ) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            select: {
                get: function (elem) {
                    var value,
                        option,
                        i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === 'select-one',
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;

                    if (index < 0) {
                        i = max;
                    } else {
                        i = one ? index : 0;
                    }

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        if (
                            option.selected &&
                            // Don't return options that are disabled or in a disabled optgroup
                            !option.disabled &&
                            (!option.parentNode.disabled ||
                                !nodeName(option.parentNode, 'optgroup'))
                        ) {
                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function (elem, value) {
                    var optionSet,
                        option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        if (
                            (option.selected =
                                jQuery.inArray(jQuery(option).val(), values) > -1)
                        ) {
                            optionSet = true;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });

    if (isIE) {
        jQuery.valHooks.option = {
            get: function (elem) {
                var val = elem.getAttribute('value');
                return val != null
                    ? val
                    : // Support: IE <=10 - 11+
                      // option.text throws exceptions (trac-14686, trac-14858)
                      // Strip and collapse whitespace
                      // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                      stripAndCollapse(jQuery.text(elem));
            }
        };
    }

    // Radios and checkboxes getter/setter
    jQuery.each(['radio', 'checkbox'], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (Array.isArray(value)) {
                    return (elem.checked =
                        jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
            }
        };
    });

    var isAttached = function (elem) {
            return (
                jQuery.contains(elem.ownerDocument, elem) ||
                elem.getRootNode(composed) === elem.ownerDocument
            );
        },
        composed = { composed: true };

    // Support: IE 9 - 11+
    // Check attachment across shadow DOM boundaries when possible (gh-3504).
    // Provide a fallback for browsers without Shadow DOM v1 support.
    if (documentElement$1 !== undefined && !documentElement$1.getRootNode) {
        isAttached = function (elem) {
            return jQuery.contains(elem.ownerDocument, elem);
        };
    }

    // rtagName captures the name from the first start tag in a string of HTML
    // https://html.spec.whatwg.org/multipage/syntax.html#tag-open-state
    // https://html.spec.whatwg.org/multipage/syntax.html#tag-name-state
    var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;

    var wrapMap = {
        // Table parts need to be wrapped with `<table>` or they're
        // stripped to their contents when put in a div.
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do, so we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: ['table'],
        col: ['colgroup', 'table'],
        tr: ['tbody', 'table'],
        td: ['tr', 'tbody', 'table']
    };

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll(context, tag) {
        // Support: IE <=9 - 11+
        // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
        var ret;

        if (typeof context.getElementsByTagName !== 'undefined') {
            // Use slice to snapshot the live collection from gEBTN
            ret = arr.slice.call(context.getElementsByTagName(tag || '*'));
        } else if (typeof context.querySelectorAll !== 'undefined') {
            ret = context.querySelectorAll(tag || '*');
        } else {
            ret = [];
        }

        if (tag === undefined || (tag && nodeName(context, tag))) {
            return jQuery.merge([context], ret);
        }

        return ret;
    }

    var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;

    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var i = 0,
            l = elems.length;

        for (; i < l; i++) {
            dataPriv.set(
                elems[i],
                'globalEval',
                !refElements || dataPriv.get(refElements[i], 'globalEval')
            );
        }
    }

    var rhtml = /<|&#?\w+;/;

    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem,
            tmp,
            tag,
            wrap,
            attached,
            j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for (; i < l; i++) {
            elem = elems[i];

            if (elem || elem === 0) {
                // Add nodes directly
                if (toType(elem) === 'object' && (elem.nodeType || isArrayLike(elem))) {
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                    // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild(context.createElement('div'));

                    // Deserialize a standard representation
                    tag = (rtagName.exec(elem) || ['', ''])[1].toLowerCase();
                    wrap = wrapMap[tag] || arr;

                    // Create wrappers & descend into them.
                    j = wrap.length;
                    while (--j > -1) {
                        tmp = tmp.appendChild(context.createElement(wrap[j]));
                    }

                    tmp.innerHTML = jQuery.htmlPrefilter(elem);

                    jQuery.merge(nodes, tmp.childNodes);

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Ensure the created nodes are orphaned (trac-12392)
                    tmp.textContent = '';
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = '';

        i = 0;
        while ((elem = nodes[i++])) {
            // Skip elements already in the context collection (trac-4087)
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }

            attached = isAttached(elem);

            // Append to fragment
            tmp = getAll(fragment.appendChild(elem), 'script');

            // Preserve script evaluation history
            if (attached) {
                setGlobalEval(tmp);
            }

            // Capture executables
            if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                    if (rscriptType.test(elem.type || '')) {
                        scripts.push(elem);
                    }
                }
            }
        }

        return fragment;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        if ((elem.type || '').slice(0, 5) === 'true/') {
            elem.type = elem.type.slice(5);
        } else {
            elem.removeAttribute('type');
        }

        return elem;
    }

    function domManip(collection, args, callback, ignored) {
        // Flatten any nested arrays
        args = flat(args);

        var fragment,
            first,
            scripts,
            hasScripts,
            node,
            doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[0],
            valueIsFunction = typeof value === 'function';

        if (valueIsFunction) {
            return collection.each(function (index) {
                var self = collection.eq(index);
                args[0] = value.call(this, index, self.html());
                domManip(self, args, callback, ignored);
            });
        }

        if (l) {
            fragment = buildFragment(
                args,
                collection[0].ownerDocument,
                false,
                collection,
                ignored
            );
            first = fragment.firstChild;

            if (fragment.childNodes.length === 1) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (trac-8070).
                for (; i < l; i++) {
                    node = fragment;

                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);

                        // Keep references to cloned scripts for later restoration
                        if (hasScripts) {
                            jQuery.merge(scripts, getAll(node, 'script'));
                        }
                    }

                    callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;

                    // Re-enable scripts
                    jQuery.map(scripts, restoreScript);

                    // Evaluate executable scripts on first document insertion
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (
                            rscriptType.test(node.type || '') &&
                            !dataPriv.get(node, 'globalEval') &&
                            jQuery.contains(doc, node)
                        ) {
                            if (
                                node.src &&
                                (node.type || '').toLowerCase() !== 'module'
                            ) {
                                // Optional AJAX dependency, but won't run scripts if not present
                                if (jQuery._evalUrl && !node.noModule) {
                                    jQuery._evalUrl(
                                        node.src,
                                        {
                                            nonce: node.nonce,
                                            crossOrigin: node.crossOrigin
                                        },
                                        doc
                                    );
                                }
                            } else {
                                DOMEval(node.textContent, node, doc);
                            }
                        }
                    }
                }
            }
        }

        return collection;
    }

    var // Support: IE <=10 - 11+
        // In IE using regex groups here causes severe slowdowns.
        rnoInnerhtml = /<script|<style|<link/i;

    // Prefer a tbody over its parent table for containing new rows
    function manipulationTarget(elem, content) {
        if (
            nodeName(elem, 'table') &&
            nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')
        ) {
            return jQuery(elem).children('tbody')[0] || elem;
        }

        return elem;
    }

    function cloneCopyEvent(src, dest) {
        var type,
            i,
            l,
            events = dataPriv.get(src, 'events');

        if (dest.nodeType !== 1) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if (events) {
            dataPriv.remove(dest, 'handle events');
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }

        // 2. Copy user data
        if (dataUser.hasData(src)) {
            dataUser.set(dest, jQuery.extend({}, dataUser.get(src)));
        }
    }

    function remove(elem, selector, keepData) {
        var node,
            nodes = selector ? jQuery.filter(selector, elem) : elem,
            i = 0;

        for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }

            if (node.parentNode) {
                if (keepData && isAttached(node)) {
                    setGlobalEval(getAll(node, 'script'));
                }
                node.parentNode.removeChild(node);
            }
        }

        return elem;
    }

    jQuery.extend({
        htmlPrefilter: function (html) {
            return html;
        },

        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var i,
                l,
                srcElements,
                destElements,
                clone = elem.cloneNode(true),
                inPage = isAttached(elem);

            // Fix IE cloning issues
            if (
                isIE &&
                (elem.nodeType === 1 || elem.nodeType === 11) &&
                !jQuery.isXMLDoc(elem)
            ) {
                // We eschew jQuery#find here for performance reasons:
                // https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                    // Support: IE <=11+
                    // IE fails to set the defaultValue to the correct value when
                    // cloning textareas.
                    if (nodeName(destElements[i], 'textarea')) {
                        destElements[i].defaultValue = srcElements[i].defaultValue;
                    }
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, 'script');
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
            }

            // Return the cloned set
            return clone;
        },

        cleanData: function (elems) {
            var data,
                elem,
                type,
                special = jQuery.event.special,
                i = 0;

            for (; (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                    if ((data = elem[dataPriv.expando])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataPriv.expando] = undefined;
                    }
                    if (elem[dataUser.expando]) {
                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataUser.expando] = undefined;
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        detach: function (selector) {
            return remove(this, selector, true);
        },

        remove: function (selector) {
            return remove(this, selector);
        },

        text: function (value) {
            return access(
                this,
                function (value) {
                    return value === undefined
                        ? jQuery.text(this)
                        : this.empty().each(function () {
                              if (
                                  this.nodeType === 1 ||
                                  this.nodeType === 11 ||
                                  this.nodeType === 9
                              ) {
                                  this.textContent = value;
                              }
                          });
                },
                null,
                value,
                arguments.length
            );
        },

        append: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        empty: function () {
            var elem,
                i = 0;

            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    // Prevent memory leaks
                    jQuery.cleanData(getAll(elem, false));

                    // Remove any remaining nodes
                    elem.textContent = '';
                }
            }

            return this;
        },

        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents =
                deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function (value) {
            return access(
                this,
                function (value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;

                    if (value === undefined && elem.nodeType === 1) {
                        return elem.innerHTML;
                    }

                    // See if we can take a shortcut and just use innerHTML
                    if (
                        typeof value === 'string' &&
                        !rnoInnerhtml.test(value) &&
                        !wrapMap[(rtagName.exec(value) || ['', ''])[1].toLowerCase()]
                    ) {
                        value = jQuery.htmlPrefilter(value);

                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};

                                // Remove element nodes and prevent memory leaks
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }

                            elem = 0;

                            // If using innerHTML throws an exception, use the fallback method
                        } catch (e) {}
                    }

                    if (elem) {
                        this.empty().append(value);
                    }
                },
                null,
                value,
                arguments.length
            );
        },

        replaceWith: function () {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip(
                this,
                arguments,
                function (elem) {
                    var parent = this.parentNode;

                    if (jQuery.inArray(this, ignored) < 0) {
                        jQuery.cleanData(getAll(this));
                        if (parent) {
                            parent.replaceChild(elem, this);
                        }
                    }

                    // Force callback invocation
                },
                ignored
            );
        }
    });

    jQuery.each(
        {
            appendTo: 'append',
            prependTo: 'prepend',
            insertBefore: 'before',
            insertAfter: 'after',
            replaceAll: 'replaceWith'
        },
        function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems,
                    ret = [],
                    insert = jQuery(selector),
                    last = insert.length - 1,
                    i = 0;

                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    jQuery(insert[i])[original](elems);
                    push.apply(ret, elems);
                }

                return this.pushStack(ret);
            };
        }
    );

    var rcheckableType = /^(?:checkbox|radio)$/i;

    var rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (Array.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix +
                            '[' +
                            (typeof v === 'object' && v != null ? i : '') +
                            ']',
                        v,
                        traditional,
                        add
                    );
                }
            });
        } else if (!traditional && toType(obj) === 'object') {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, valueOrFunction) {
                // If value is a function, invoke it and use its return value
                var value =
                    typeof valueOrFunction === 'function'
                        ? valueOrFunction()
                        : valueOrFunction;

                s[s.length] =
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(value == null ? '' : value);
            };

        if (a == null) {
            return '';
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join('&');
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, 'elements');
                return elements ? jQuery.makeArray(elements) : this;
            })
                .filter(function () {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return (
                        this.name &&
                        !jQuery(this).is(':disabled') &&
                        rsubmittable.test(this.nodeName) &&
                        !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type))
                    );
                })
                .map(function (_i, elem) {
                    var val = jQuery(this).val();

                    if (val == null) {
                        return null;
                    }

                    if (Array.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return { name: elem.name, value: val.replace(rCRLF, '\r\n') };
                        });
                    }

                    return { name: elem.name, value: val.replace(rCRLF, '\r\n') };
                })
                .get();
        }
    });

    // Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml, parserErrorElem;
        if (!data || typeof data !== 'string') {
            return null;
        }

        // Support: IE 9 - 11+
        // IE throws on parseFromString with invalid input.
        try {
            xml = new window.DOMParser().parseFromString(data, 'text/xml');
        } catch (e) {}

        parserErrorElem = xml && xml.getElementsByTagName('parsererror')[0];
        if (!xml || parserErrorElem) {
            jQuery.error(
                'Invalid XML: ' +
                    (parserErrorElem
                        ? jQuery
                              .map(parserErrorElem.childNodes, function (el) {
                                  return el.textContent;
                              })
                              .join('\n')
                        : data)
            );
        }
        return xml;
    };

    // Argument "data" should be string of html or a TrustedHTML wrapper of obvious HTML
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (typeof data !== 'string' && !isObviousHtml(data + '')) {
            return [];
        }
        if (typeof context === 'boolean') {
            keepScripts = context;
            context = false;
        }

        var parsed, scripts;

        if (!context) {
            // Stop scripts or inline event handlers from being executed immediately
            // by using DOMParser
            context = new window.DOMParser().parseFromString('', 'text/html');
        }

        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };

    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return jQuery;
        });
    }

    jQuery.noConflict = function () {};

    return jQuery;
});
