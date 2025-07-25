(function(){
  // polyfills for older browsers
  // Uint8Array
  require(["typedarray"]);

"use strict";

function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory(require("lodash"), require("path-browserify"));else if (typeof define === 'function' && define.amd) define(["lodash", "path-browserify"], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["numjs"] = factory(require("lodash"), require("path-browserify"));else root["numjs"] = factory(root["lodash"], root["path-browserify"]);
})(void 0, function (__WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_path_browserify__) {
  return /******/function () {
    // webpackBootstrap
    /******/
    var __webpack_modules__ = {
      /***/"./entry.js": (
      /*!******************!*\
        !*** ./entry.js ***!
        \******************/
      /***/
      function _entryJs(module, __unused_webpack_exports, __webpack_require__) {
        module.exports = __webpack_require__(/*! numjs */"./node_modules/numjs/src/index.js");

        /***/
      }),
      /***/"./node_modules/base64-js/index.js": (
      /*!*****************************************!*\
        !*** ./node_modules/base64-js/index.js ***!
        \*****************************************/
      /***/
      function _node_modules_base64Js_indexJs(__unused_webpack_module, exports) {
        "use strict";

        exports.byteLength = byteLength;
        exports.toByteArray = toByteArray;
        exports.fromByteArray = fromByteArray;
        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
        var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }

        // Support decoding URL-safe base64 strings, as Node.js does.
        // See: https://en.wikipedia.org/wiki/Base64#URL_applications
        revLookup['-'.charCodeAt(0)] = 62;
        revLookup['_'.charCodeAt(0)] = 63;
        function getLens(b64) {
          var len = b64.length;
          if (len % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // Trim off extra bytes after placeholder bytes are found
          // See: https://github.com/beatgammit/base64-js/issues/42
          var validLen = b64.indexOf('=');
          if (validLen === -1) validLen = len;
          var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
          return [validLen, placeHoldersLen];
        }

        // base64 is 4/3 + up to two characters of the original data
        function byteLength(b64) {
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function _byteLength(b64, validLen, placeHoldersLen) {
          return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function toByteArray(b64) {
          var tmp;
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
          var curByte = 0;

          // if there are placeholders, only get up to the last complete 4 chars
          var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
          var i;
          for (i = 0; i < len; i += 4) {
            tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
            arr[curByte++] = tmp >> 16 & 0xFF;
            arr[curByte++] = tmp >> 8 & 0xFF;
            arr[curByte++] = tmp & 0xFF;
          }
          if (placeHoldersLen === 2) {
            tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
            arr[curByte++] = tmp & 0xFF;
          }
          if (placeHoldersLen === 1) {
            tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
            arr[curByte++] = tmp >> 8 & 0xFF;
            arr[curByte++] = tmp & 0xFF;
          }
          return arr;
        }
        function tripletToBase64(num) {
          return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
        }
        function encodeChunk(uint8, start, end) {
          var tmp;
          var output = [];
          for (var i = start; i < end; i += 3) {
            tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
            output.push(tripletToBase64(tmp));
          }
          return output.join('');
        }
        function fromByteArray(uint8) {
          var tmp;
          var len = uint8.length;
          var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
          var parts = [];
          var maxChunkLength = 16383; // must be multiple of 3

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
            parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = uint8[len - 1];
            parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
          } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1];
            parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
          }
          return parts.join('');
        }

        /***/
      }),
      /***/"./node_modules/bit-twiddle/twiddle.js": (
      /*!*********************************************!*\
        !*** ./node_modules/bit-twiddle/twiddle.js ***!
        \*********************************************/
      /***/
      function _node_modules_bitTwiddle_twiddleJs(__unused_webpack_module, exports) {
        "use strict";

        /**
         * Bit twiddling hacks for JavaScript.
         *
         * Author: Mikola Lysenko
         *
         * Ported from Stanford bit twiddling hack library:
         *    http://graphics.stanford.edu/~seander/bithacks.html
         */

        "use restrict";

        //Number of bits in an integer
        var INT_BITS = 32;

        //Constants
        exports.INT_BITS = INT_BITS;
        exports.INT_MAX = 0x7fffffff;
        exports.INT_MIN = -1 << INT_BITS - 1;

        //Returns -1, 0, +1 depending on sign of x
        exports.sign = function (v) {
          return (v > 0) - (v < 0);
        };

        //Computes absolute value of integer
        exports.abs = function (v) {
          var mask = v >> INT_BITS - 1;
          return (v ^ mask) - mask;
        };

        //Computes minimum of integers x and y
        exports.min = function (x, y) {
          return y ^ (x ^ y) & -(x < y);
        };

        //Computes maximum of integers x and y
        exports.max = function (x, y) {
          return x ^ (x ^ y) & -(x < y);
        };

        //Checks if a number is a power of two
        exports.isPow2 = function (v) {
          return !(v & v - 1) && !!v;
        };

        //Computes log base 2 of v
        exports.log2 = function (v) {
          var r, shift;
          r = (v > 0xFFFF) << 4;
          v >>>= r;
          shift = (v > 0xFF) << 3;
          v >>>= shift;
          r |= shift;
          shift = (v > 0xF) << 2;
          v >>>= shift;
          r |= shift;
          shift = (v > 0x3) << 1;
          v >>>= shift;
          r |= shift;
          return r | v >> 1;
        };

        //Computes log base 10 of v
        exports.log10 = function (v) {
          return v >= 1000000000 ? 9 : v >= 100000000 ? 8 : v >= 10000000 ? 7 : v >= 1000000 ? 6 : v >= 100000 ? 5 : v >= 10000 ? 4 : v >= 1000 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
        };

        //Counts number of bits
        exports.popCount = function (v) {
          v = v - (v >>> 1 & 0x55555555);
          v = (v & 0x33333333) + (v >>> 2 & 0x33333333);
          return (v + (v >>> 4) & 0xF0F0F0F) * 0x1010101 >>> 24;
        };

        //Counts number of trailing zeros
        function countTrailingZeros(v) {
          var c = 32;
          v &= -v;
          if (v) c--;
          if (v & 0x0000FFFF) c -= 16;
          if (v & 0x00FF00FF) c -= 8;
          if (v & 0x0F0F0F0F) c -= 4;
          if (v & 0x33333333) c -= 2;
          if (v & 0x55555555) c -= 1;
          return c;
        }
        exports.countTrailingZeros = countTrailingZeros;

        //Rounds to next power of 2
        exports.nextPow2 = function (v) {
          v += v === 0;
          --v;
          v |= v >>> 1;
          v |= v >>> 2;
          v |= v >>> 4;
          v |= v >>> 8;
          v |= v >>> 16;
          return v + 1;
        };

        //Rounds down to previous power of 2
        exports.prevPow2 = function (v) {
          v |= v >>> 1;
          v |= v >>> 2;
          v |= v >>> 4;
          v |= v >>> 8;
          v |= v >>> 16;
          return v - (v >>> 1);
        };

        //Computes parity of word
        exports.parity = function (v) {
          v ^= v >>> 16;
          v ^= v >>> 8;
          v ^= v >>> 4;
          v &= 0xf;
          return 0x6996 >>> v & 1;
        };
        var REVERSE_TABLE = new Array(256);
        (function (tab) {
          for (var i = 0; i < 256; ++i) {
            var v = i,
              r = i,
              s = 7;
            for (v >>>= 1; v; v >>>= 1) {
              r <<= 1;
              r |= v & 1;
              --s;
            }
            tab[i] = r << s & 0xff;
          }
        })(REVERSE_TABLE);

        //Reverse bits in a 32 bit word
        exports.reverse = function (v) {
          return REVERSE_TABLE[v & 0xff] << 24 | REVERSE_TABLE[v >>> 8 & 0xff] << 16 | REVERSE_TABLE[v >>> 16 & 0xff] << 8 | REVERSE_TABLE[v >>> 24 & 0xff];
        };

        //Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
        exports.interleave2 = function (x, y) {
          x &= 0xFFFF;
          x = (x | x << 8) & 0x00FF00FF;
          x = (x | x << 4) & 0x0F0F0F0F;
          x = (x | x << 2) & 0x33333333;
          x = (x | x << 1) & 0x55555555;
          y &= 0xFFFF;
          y = (y | y << 8) & 0x00FF00FF;
          y = (y | y << 4) & 0x0F0F0F0F;
          y = (y | y << 2) & 0x33333333;
          y = (y | y << 1) & 0x55555555;
          return x | y << 1;
        };

        //Extracts the nth interleaved component
        exports.deinterleave2 = function (v, n) {
          v = v >>> n & 0x55555555;
          v = (v | v >>> 1) & 0x33333333;
          v = (v | v >>> 2) & 0x0F0F0F0F;
          v = (v | v >>> 4) & 0x00FF00FF;
          v = (v | v >>> 16) & 0x000FFFF;
          return v << 16 >> 16;
        };

        //Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
        exports.interleave3 = function (x, y, z) {
          x &= 0x3FF;
          x = (x | x << 16) & 4278190335;
          x = (x | x << 8) & 251719695;
          x = (x | x << 4) & 3272356035;
          x = (x | x << 2) & 1227133513;
          y &= 0x3FF;
          y = (y | y << 16) & 4278190335;
          y = (y | y << 8) & 251719695;
          y = (y | y << 4) & 3272356035;
          y = (y | y << 2) & 1227133513;
          x |= y << 1;
          z &= 0x3FF;
          z = (z | z << 16) & 4278190335;
          z = (z | z << 8) & 251719695;
          z = (z | z << 4) & 3272356035;
          z = (z | z << 2) & 1227133513;
          return x | z << 2;
        };

        //Extracts nth interleaved component of a 3-tuple
        exports.deinterleave3 = function (v, n) {
          v = v >>> n & 1227133513;
          v = (v | v >>> 2) & 3272356035;
          v = (v | v >>> 4) & 251719695;
          v = (v | v >>> 8) & 4278190335;
          v = (v | v >>> 16) & 0x3FF;
          return v << 22 >> 22;
        };

        //Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
        exports.nextCombination = function (v) {
          var t = v | v - 1;
          return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
        };

        /***/
      }),
      /***/"./node_modules/buffer/index.js": (
      /*!**************************************!*\
        !*** ./node_modules/buffer/index.js ***!
        \**************************************/
      /***/
      function _node_modules_buffer_indexJs(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";

        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        /* eslint-disable no-proto */
        var base64 = __webpack_require__(/*! base64-js */"./node_modules/base64-js/index.js");
        var ieee754 = __webpack_require__(/*! ieee754 */"./node_modules/ieee754/index.js");
        var customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' // eslint-disable-line dot-notation
        ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
        : null;
        exports.Buffer = Buffer;
        exports.SlowBuffer = SlowBuffer;
        exports.INSPECT_MAX_BYTES = 50;
        var K_MAX_LENGTH = 0x7fffffff;
        exports.kMaxLength = K_MAX_LENGTH;

        /**
         * If `Buffer.TYPED_ARRAY_SUPPORT`:
         *   === true    Use Uint8Array implementation (fastest)
         *   === false   Print warning and recommend using `buffer` v4.x which has an Object
         *               implementation (most compatible, even IE6)
         *
         * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
         * Opera 11.6+, iOS 4.2+.
         *
         * We report that the browser does not support typed arrays if the are not subclassable
         * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
         * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
         * for __proto__ and has a buggy typed array implementation.
         */
        Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
        if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
          console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
        }
        function typedArraySupport() {
          // Can typed array instances can be augmented?
          try {
            var arr = new Uint8Array(1);
            var proto = {
              foo: function foo() {
                return 42;
              }
            };
            Object.setPrototypeOf(proto, Uint8Array.prototype);
            Object.setPrototypeOf(arr, proto);
            return arr.foo() === 42;
          } catch (e) {
            return false;
          }
        }
        Object.defineProperty(Buffer.prototype, 'parent', {
          enumerable: true,
          get: function get() {
            if (!Buffer.isBuffer(this)) return undefined;
            return this.buffer;
          }
        });
        Object.defineProperty(Buffer.prototype, 'offset', {
          enumerable: true,
          get: function get() {
            if (!Buffer.isBuffer(this)) return undefined;
            return this.byteOffset;
          }
        });
        function createBuffer(length) {
          if (length > K_MAX_LENGTH) {
            throw new RangeError('The value "' + length + '" is invalid for option "size"');
          }
          // Return an augmented `Uint8Array` instance
          var buf = new Uint8Array(length);
          Object.setPrototypeOf(buf, Buffer.prototype);
          return buf;
        }

        /**
         * The Buffer constructor returns instances of `Uint8Array` that have their
         * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
         * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
         * and the `Uint8Array` methods. Square bracket notation works as expected -- it
         * returns a single octet.
         *
         * The `Uint8Array` prototype remains unmodified.
         */

        function Buffer(arg, encodingOrOffset, length) {
          // Common case.
          if (typeof arg === 'number') {
            if (typeof encodingOrOffset === 'string') {
              throw new TypeError('The "string" argument must be of type string. Received type number');
            }
            return allocUnsafe(arg);
          }
          return from(arg, encodingOrOffset, length);
        }
        Buffer.poolSize = 8192; // not used by this implementation

        function from(value, encodingOrOffset, length) {
          if (typeof value === 'string') {
            return fromString(value, encodingOrOffset);
          }
          if (ArrayBuffer.isView(value)) {
            return fromArrayView(value);
          }
          if (value == null) {
            throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + _typeof(value));
          }
          if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
            return fromArrayBuffer(value, encodingOrOffset, length);
          }
          if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
            return fromArrayBuffer(value, encodingOrOffset, length);
          }
          if (typeof value === 'number') {
            throw new TypeError('The "value" argument must not be of type number. Received type number');
          }
          var valueOf = value.valueOf && value.valueOf();
          if (valueOf != null && valueOf !== value) {
            return Buffer.from(valueOf, encodingOrOffset, length);
          }
          var b = fromObject(value);
          if (b) return b;
          if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
            return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
          }
          throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + _typeof(value));
        }

        /**
         * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
         * if value is a number.
         * Buffer.from(str[, encoding])
         * Buffer.from(array)
         * Buffer.from(buffer)
         * Buffer.from(arrayBuffer[, byteOffset[, length]])
         **/
        Buffer.from = function (value, encodingOrOffset, length) {
          return from(value, encodingOrOffset, length);
        };

        // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
        // https://github.com/feross/buffer/pull/148
        Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(Buffer, Uint8Array);
        function assertSize(size) {
          if (typeof size !== 'number') {
            throw new TypeError('"size" argument must be of type number');
          } else if (size < 0) {
            throw new RangeError('The value "' + size + '" is invalid for option "size"');
          }
        }
        function alloc(size, fill, encoding) {
          assertSize(size);
          if (size <= 0) {
            return createBuffer(size);
          }
          if (fill !== undefined) {
            // Only pay attention to encoding if it's a string. This
            // prevents accidentally sending in a number that would
            // be interpreted as a start offset.
            return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
          }
          return createBuffer(size);
        }

        /**
         * Creates a new filled Buffer instance.
         * alloc(size[, fill[, encoding]])
         **/
        Buffer.alloc = function (size, fill, encoding) {
          return alloc(size, fill, encoding);
        };
        function allocUnsafe(size) {
          assertSize(size);
          return createBuffer(size < 0 ? 0 : checked(size) | 0);
        }

        /**
         * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
         * */
        Buffer.allocUnsafe = function (size) {
          return allocUnsafe(size);
        };
        /**
         * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
         */
        Buffer.allocUnsafeSlow = function (size) {
          return allocUnsafe(size);
        };
        function fromString(string, encoding) {
          if (typeof encoding !== 'string' || encoding === '') {
            encoding = 'utf8';
          }
          if (!Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding);
          }
          var length = byteLength(string, encoding) | 0;
          var buf = createBuffer(length);
          var actual = buf.write(string, encoding);
          if (actual !== length) {
            // Writing a hex string, for example, that contains invalid characters will
            // cause everything after the first invalid character to be ignored. (e.g.
            // 'abxxcd' will be treated as 'ab')
            buf = buf.slice(0, actual);
          }
          return buf;
        }
        function fromArrayLike(array) {
          var length = array.length < 0 ? 0 : checked(array.length) | 0;
          var buf = createBuffer(length);
          for (var i = 0; i < length; i += 1) {
            buf[i] = array[i] & 255;
          }
          return buf;
        }
        function fromArrayView(arrayView) {
          if (isInstance(arrayView, Uint8Array)) {
            var copy = new Uint8Array(arrayView);
            return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
          }
          return fromArrayLike(arrayView);
        }
        function fromArrayBuffer(array, byteOffset, length) {
          if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError('"offset" is outside of buffer bounds');
          }
          if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError('"length" is outside of buffer bounds');
          }
          var buf;
          if (byteOffset === undefined && length === undefined) {
            buf = new Uint8Array(array);
          } else if (length === undefined) {
            buf = new Uint8Array(array, byteOffset);
          } else {
            buf = new Uint8Array(array, byteOffset, length);
          }

          // Return an augmented `Uint8Array` instance
          Object.setPrototypeOf(buf, Buffer.prototype);
          return buf;
        }
        function fromObject(obj) {
          if (Buffer.isBuffer(obj)) {
            var len = checked(obj.length) | 0;
            var buf = createBuffer(len);
            if (buf.length === 0) {
              return buf;
            }
            obj.copy(buf, 0, 0, len);
            return buf;
          }
          if (obj.length !== undefined) {
            if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
              return createBuffer(0);
            }
            return fromArrayLike(obj);
          }
          if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
            return fromArrayLike(obj.data);
          }
        }
        function checked(length) {
          // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
          // length is NaN (which is otherwise coerced to zero.)
          if (length >= K_MAX_LENGTH) {
            throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
          }
          return length | 0;
        }
        function SlowBuffer(length) {
          if (+length != length) {
            // eslint-disable-line eqeqeq
            length = 0;
          }
          return Buffer.alloc(+length);
        }
        Buffer.isBuffer = function isBuffer(b) {
          return b != null && b._isBuffer === true && b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
        };
        Buffer.compare = function compare(a, b) {
          if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
          if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
          }
          if (a === b) return 0;
          var x = a.length;
          var y = b.length;
          for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }
          if (x < y) return -1;
          if (y < x) return 1;
          return 0;
        };
        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return true;
            default:
              return false;
          }
        };
        Buffer.concat = function concat(list, length) {
          if (!Array.isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          if (list.length === 0) {
            return Buffer.alloc(0);
          }
          var i;
          if (length === undefined) {
            length = 0;
            for (i = 0; i < list.length; ++i) {
              length += list[i].length;
            }
          }
          var buffer = Buffer.allocUnsafe(length);
          var pos = 0;
          for (i = 0; i < list.length; ++i) {
            var buf = list[i];
            if (isInstance(buf, Uint8Array)) {
              if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
              } else {
                Uint8Array.prototype.set.call(buffer, buf, pos);
              }
            } else if (!Buffer.isBuffer(buf)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            } else {
              buf.copy(buffer, pos);
            }
            pos += buf.length;
          }
          return buffer;
        };
        function byteLength(string, encoding) {
          if (Buffer.isBuffer(string)) {
            return string.length;
          }
          if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
            return string.byteLength;
          }
          if (typeof string !== 'string') {
            throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + _typeof(string));
          }
          var len = string.length;
          var mustMatch = arguments.length > 2 && arguments[2] === true;
          if (!mustMatch && len === 0) return 0;

          // Use a for loop to avoid recursion
          var loweredCase = false;
          for (;;) {
            switch (encoding) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return len;
              case 'utf8':
              case 'utf-8':
                return utf8ToBytes(string).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return len * 2;
              case 'hex':
                return len >>> 1;
              case 'base64':
                return base64ToBytes(string).length;
              default:
                if (loweredCase) {
                  return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
                }
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.byteLength = byteLength;
        function slowToString(encoding, start, end) {
          var loweredCase = false;

          // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
          // property of a typed array.

          // This behaves neither like String nor Uint8Array in that we set start/end
          // to their upper/lower bounds if the value passed is out of range.
          // undefined is handled specially as per ECMA-262 6th Edition,
          // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
          if (start === undefined || start < 0) {
            start = 0;
          }
          // Return early if start > this.length. Done here to prevent potential uint32
          // coercion fail below.
          if (start > this.length) {
            return '';
          }
          if (end === undefined || end > this.length) {
            end = this.length;
          }
          if (end <= 0) {
            return '';
          }

          // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
          end >>>= 0;
          start >>>= 0;
          if (end <= start) {
            return '';
          }
          if (!encoding) encoding = 'utf8';
          while (true) {
            switch (encoding) {
              case 'hex':
                return hexSlice(this, start, end);
              case 'utf8':
              case 'utf-8':
                return utf8Slice(this, start, end);
              case 'ascii':
                return asciiSlice(this, start, end);
              case 'latin1':
              case 'binary':
                return latin1Slice(this, start, end);
              case 'base64':
                return base64Slice(this, start, end);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return utf16leSlice(this, start, end);
              default:
                if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                encoding = (encoding + '').toLowerCase();
                loweredCase = true;
            }
          }
        }

        // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
        // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
        // reliably in a browserify context because there could be multiple different
        // copies of the 'buffer' package in use. This method works even for Buffer
        // instances that were created from another copy of the `buffer` package.
        // See: https://github.com/feross/buffer/issues/154
        Buffer.prototype._isBuffer = true;
        function swap(b, n, m) {
          var i = b[n];
          b[n] = b[m];
          b[m] = i;
        }
        Buffer.prototype.swap16 = function swap16() {
          var len = this.length;
          if (len % 2 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 16-bits');
          }
          for (var i = 0; i < len; i += 2) {
            swap(this, i, i + 1);
          }
          return this;
        };
        Buffer.prototype.swap32 = function swap32() {
          var len = this.length;
          if (len % 4 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 32-bits');
          }
          for (var i = 0; i < len; i += 4) {
            swap(this, i, i + 3);
            swap(this, i + 1, i + 2);
          }
          return this;
        };
        Buffer.prototype.swap64 = function swap64() {
          var len = this.length;
          if (len % 8 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 64-bits');
          }
          for (var i = 0; i < len; i += 8) {
            swap(this, i, i + 7);
            swap(this, i + 1, i + 6);
            swap(this, i + 2, i + 5);
            swap(this, i + 3, i + 4);
          }
          return this;
        };
        Buffer.prototype.toString = function toString() {
          var length = this.length;
          if (length === 0) return '';
          if (arguments.length === 0) return utf8Slice(this, 0, length);
          return slowToString.apply(this, arguments);
        };
        Buffer.prototype.toLocaleString = Buffer.prototype.toString;
        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
          if (this === b) return true;
          return Buffer.compare(this, b) === 0;
        };
        Buffer.prototype.inspect = function inspect() {
          var str = '';
          var max = exports.INSPECT_MAX_BYTES;
          str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
          if (this.length > max) str += ' ... ';
          return '<Buffer ' + str + '>';
        };
        if (customInspectSymbol) {
          Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
        }
        Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
          if (isInstance(target, Uint8Array)) {
            target = Buffer.from(target, target.offset, target.byteLength);
          }
          if (!Buffer.isBuffer(target)) {
            throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + _typeof(target));
          }
          if (start === undefined) {
            start = 0;
          }
          if (end === undefined) {
            end = target ? target.length : 0;
          }
          if (thisStart === undefined) {
            thisStart = 0;
          }
          if (thisEnd === undefined) {
            thisEnd = this.length;
          }
          if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
            throw new RangeError('out of range index');
          }
          if (thisStart >= thisEnd && start >= end) {
            return 0;
          }
          if (thisStart >= thisEnd) {
            return -1;
          }
          if (start >= end) {
            return 1;
          }
          start >>>= 0;
          end >>>= 0;
          thisStart >>>= 0;
          thisEnd >>>= 0;
          if (this === target) return 0;
          var x = thisEnd - thisStart;
          var y = end - start;
          var len = Math.min(x, y);
          var thisCopy = this.slice(thisStart, thisEnd);
          var targetCopy = target.slice(start, end);
          for (var i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
              x = thisCopy[i];
              y = targetCopy[i];
              break;
            }
          }
          if (x < y) return -1;
          if (y < x) return 1;
          return 0;
        };

        // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
        // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
        //
        // Arguments:
        // - buffer - a Buffer to search
        // - val - a string, Buffer, or number
        // - byteOffset - an index into `buffer`; will be clamped to an int32
        // - encoding - an optional encoding, relevant is val is a string
        // - dir - true for indexOf, false for lastIndexOf
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
          // Empty buffer means no match
          if (buffer.length === 0) return -1;

          // Normalize byteOffset
          if (typeof byteOffset === 'string') {
            encoding = byteOffset;
            byteOffset = 0;
          } else if (byteOffset > 0x7fffffff) {
            byteOffset = 0x7fffffff;
          } else if (byteOffset < -0x80000000) {
            byteOffset = -0x80000000;
          }
          byteOffset = +byteOffset; // Coerce to Number.
          if (numberIsNaN(byteOffset)) {
            // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
            byteOffset = dir ? 0 : buffer.length - 1;
          }

          // Normalize byteOffset: negative offsets start from the end of the buffer
          if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
          if (byteOffset >= buffer.length) {
            if (dir) return -1;else byteOffset = buffer.length - 1;
          } else if (byteOffset < 0) {
            if (dir) byteOffset = 0;else return -1;
          }

          // Normalize val
          if (typeof val === 'string') {
            val = Buffer.from(val, encoding);
          }

          // Finally, search either indexOf (if dir is true) or lastIndexOf
          if (Buffer.isBuffer(val)) {
            // Special case: looking for empty string/buffer always fails
            if (val.length === 0) {
              return -1;
            }
            return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
          } else if (typeof val === 'number') {
            val = val & 0xFF; // Search for a byte value [0-255]
            if (typeof Uint8Array.prototype.indexOf === 'function') {
              if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
              } else {
                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
              }
            }
            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
          }
          throw new TypeError('val must be string, number or Buffer');
        }
        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
          var indexSize = 1;
          var arrLength = arr.length;
          var valLength = val.length;
          if (encoding !== undefined) {
            encoding = String(encoding).toLowerCase();
            if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
              if (arr.length < 2 || val.length < 2) {
                return -1;
              }
              indexSize = 2;
              arrLength /= 2;
              valLength /= 2;
              byteOffset /= 2;
            }
          }
          function read(buf, i) {
            if (indexSize === 1) {
              return buf[i];
            } else {
              return buf.readUInt16BE(i * indexSize);
            }
          }
          var i;
          if (dir) {
            var foundIndex = -1;
            for (i = byteOffset; i < arrLength; i++) {
              if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1) foundIndex = i;
                if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
              } else {
                if (foundIndex !== -1) i -= i - foundIndex;
                foundIndex = -1;
              }
            }
          } else {
            if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
            for (i = byteOffset; i >= 0; i--) {
              var found = true;
              for (var j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                  found = false;
                  break;
                }
              }
              if (found) return i;
            }
          }
          return -1;
        }
        Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
          return this.indexOf(val, byteOffset, encoding) !== -1;
        };
        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };
        Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };
        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0;
          var remaining = buf.length - offset;
          if (!length) {
            length = remaining;
          } else {
            length = Number(length);
            if (length > remaining) {
              length = remaining;
            }
          }
          var strLen = string.length;
          if (length > strLen / 2) {
            length = strLen / 2;
          }
          var i;
          for (i = 0; i < length; ++i) {
            var parsed = parseInt(string.substr(i * 2, 2), 16);
            if (numberIsNaN(parsed)) return i;
            buf[offset + i] = parsed;
          }
          return i;
        }
        function utf8Write(buf, string, offset, length) {
          return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
        }
        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length);
        }
        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length);
        }
        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
        }
        Buffer.prototype.write = function write(string, offset, length, encoding) {
          // Buffer#write(string)
          if (offset === undefined) {
            encoding = 'utf8';
            length = this.length;
            offset = 0;
            // Buffer#write(string, encoding)
          } else if (length === undefined && typeof offset === 'string') {
            encoding = offset;
            length = this.length;
            offset = 0;
            // Buffer#write(string, offset[, length][, encoding])
          } else if (isFinite(offset)) {
            offset = offset >>> 0;
            if (isFinite(length)) {
              length = length >>> 0;
              if (encoding === undefined) encoding = 'utf8';
            } else {
              encoding = length;
              length = undefined;
            }
          } else {
            throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
          }
          var remaining = this.length - offset;
          if (length === undefined || length > remaining) length = remaining;
          if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
            throw new RangeError('Attempt to write outside buffer bounds');
          }
          if (!encoding) encoding = 'utf8';
          var loweredCase = false;
          for (;;) {
            switch (encoding) {
              case 'hex':
                return hexWrite(this, string, offset, length);
              case 'utf8':
              case 'utf-8':
                return utf8Write(this, string, offset, length);
              case 'ascii':
              case 'latin1':
              case 'binary':
                return asciiWrite(this, string, offset, length);
              case 'base64':
                // Warning: maxLength not taken into account in base64Write
                return base64Write(this, string, offset, length);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return ucs2Write(this, string, offset, length);
              default:
                if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        };
        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf);
          } else {
            return base64.fromByteArray(buf.slice(start, end));
          }
        }
        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end);
          var res = [];
          var i = start;
          while (i < end) {
            var firstByte = buf[i];
            var codePoint = null;
            var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
            if (i + bytesPerSequence <= end) {
              var secondByte = void 0,
                thirdByte = void 0,
                fourthByte = void 0,
                tempCodePoint = void 0;
              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 0x80) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                    if (tempCodePoint > 0x7F) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                    if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                    if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }
            if (codePoint === null) {
              // we did not generate a valid codePoint so insert a
              // replacement char (U+FFFD) and advance only 1 byte
              codePoint = 0xFFFD;
              bytesPerSequence = 1;
            } else if (codePoint > 0xFFFF) {
              // encode to utf16 (surrogate pair dance)
              codePoint -= 0x10000;
              res.push(codePoint >>> 10 & 0x3FF | 0xD800);
              codePoint = 0xDC00 | codePoint & 0x3FF;
            }
            res.push(codePoint);
            i += bytesPerSequence;
          }
          return decodeCodePointsArray(res);
        }

        // Based on http://stackoverflow.com/a/22747272/680742, the browser with
        // the lowest limit is Chrome, with 0x10000 args.
        // We go 1 magnitude less, for safety
        var MAX_ARGUMENTS_LENGTH = 0x1000;
        function decodeCodePointsArray(codePoints) {
          var len = codePoints.length;
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
          }

          // Decode in chunks to avoid "call stack size exceeded".
          var res = '';
          var i = 0;
          while (i < len) {
            res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
          }
          return res;
        }
        function asciiSlice(buf, start, end) {
          var ret = '';
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 0x7F);
          }
          return ret;
        }
        function latin1Slice(buf, start, end) {
          var ret = '';
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i]);
          }
          return ret;
        }
        function hexSlice(buf, start, end) {
          var len = buf.length;
          if (!start || start < 0) start = 0;
          if (!end || end < 0 || end > len) end = len;
          var out = '';
          for (var i = start; i < end; ++i) {
            out += hexSliceLookupTable[buf[i]];
          }
          return out;
        }
        function utf16leSlice(buf, start, end) {
          var bytes = buf.slice(start, end);
          var res = '';
          // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
          for (var i = 0; i < bytes.length - 1; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
          }
          return res;
        }
        Buffer.prototype.slice = function slice(start, end) {
          var len = this.length;
          start = ~~start;
          end = end === undefined ? len : ~~end;
          if (start < 0) {
            start += len;
            if (start < 0) start = 0;
          } else if (start > len) {
            start = len;
          }
          if (end < 0) {
            end += len;
            if (end < 0) end = 0;
          } else if (end > len) {
            end = len;
          }
          if (end < start) end = start;
          var newBuf = this.subarray(start, end);
          // Return an augmented `Uint8Array` instance
          Object.setPrototypeOf(newBuf, Buffer.prototype);
          return newBuf;
        };

        /*
         * Need to make sure that buffer isn't trying to write out of bounds.
         */
        function checkOffset(offset, ext, length) {
          if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
          if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
        }
        Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) checkOffset(offset, byteLength, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          return val;
        };
        Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) {
            checkOffset(offset, byteLength, this.length);
          }
          var val = this[offset + --byteLength];
          var mul = 1;
          while (byteLength > 0 && (mul *= 0x100)) {
            val += this[offset + --byteLength] * mul;
          }
          return val;
        };
        Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 1, this.length);
          return this[offset];
        };
        Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 2, this.length);
          return this[offset] | this[offset + 1] << 8;
        };
        Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 2, this.length);
          return this[offset] << 8 | this[offset + 1];
        };
        Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
        };
        Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
        };
        Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
          offset = offset >>> 0;
          validateNumber(offset, 'offset');
          var first = this[offset];
          var last = this[offset + 7];
          if (first === undefined || last === undefined) {
            boundsError(offset, this.length - 8);
          }
          var lo = first + this[++offset] * Math.pow(2, 8) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 24);
          var hi = this[++offset] + this[++offset] * Math.pow(2, 8) + this[++offset] * Math.pow(2, 16) + last * Math.pow(2, 24);
          return BigInt(lo) + (BigInt(hi) << BigInt(32));
        });
        Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
          offset = offset >>> 0;
          validateNumber(offset, 'offset');
          var first = this[offset];
          var last = this[offset + 7];
          if (first === undefined || last === undefined) {
            boundsError(offset, this.length - 8);
          }
          var hi = first * Math.pow(2, 24) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + this[++offset];
          var lo = this[++offset] * Math.pow(2, 24) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + last;
          return (BigInt(hi) << BigInt(32)) + BigInt(lo);
        });
        Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) checkOffset(offset, byteLength, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          mul *= 0x80;
          if (val >= mul) val -= Math.pow(2, 8 * byteLength);
          return val;
        };
        Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) checkOffset(offset, byteLength, this.length);
          var i = byteLength;
          var mul = 1;
          var val = this[offset + --i];
          while (i > 0 && (mul *= 0x100)) {
            val += this[offset + --i] * mul;
          }
          mul *= 0x80;
          if (val >= mul) val -= Math.pow(2, 8 * byteLength);
          return val;
        };
        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 1, this.length);
          if (!(this[offset] & 0x80)) return this[offset];
          return (0xff - this[offset] + 1) * -1;
        };
        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 2, this.length);
          var val = this[offset] | this[offset + 1] << 8;
          return val & 0x8000 ? val | 0xFFFF0000 : val;
        };
        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 2, this.length);
          var val = this[offset + 1] | this[offset] << 8;
          return val & 0x8000 ? val | 0xFFFF0000 : val;
        };
        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
        };
        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
        };
        Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
          offset = offset >>> 0;
          validateNumber(offset, 'offset');
          var first = this[offset];
          var last = this[offset + 7];
          if (first === undefined || last === undefined) {
            boundsError(offset, this.length - 8);
          }
          var val = this[offset + 4] + this[offset + 5] * Math.pow(2, 8) + this[offset + 6] * Math.pow(2, 16) + (last << 24); // Overflow

          return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * Math.pow(2, 8) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 24));
        });
        Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
          offset = offset >>> 0;
          validateNumber(offset, 'offset');
          var first = this[offset];
          var last = this[offset + 7];
          if (first === undefined || last === undefined) {
            boundsError(offset, this.length - 8);
          }
          var val = (first << 24) +
          // Overflow
          this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + this[++offset];
          return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * Math.pow(2, 24) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + last);
        });
        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
          if (offset + ext > buf.length) throw new RangeError('Index out of range');
        }
        Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
            checkInt(this, value, offset, byteLength, maxBytes, 0);
          }
          var mul = 1;
          var i = 0;
          this[offset] = value & 0xFF;
          while (++i < byteLength && (mul *= 0x100)) {
            this[offset + i] = value / mul & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
            checkInt(this, value, offset, byteLength, maxBytes, 0);
          }
          var i = byteLength - 1;
          var mul = 1;
          this[offset + i] = value & 0xFF;
          while (--i >= 0 && (mul *= 0x100)) {
            this[offset + i] = value / mul & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
          this[offset] = value & 0xff;
          return offset + 1;
        };
        Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
          return offset + 2;
        };
        Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
          this[offset] = value >>> 8;
          this[offset + 1] = value & 0xff;
          return offset + 2;
        };
        Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 0xff;
          return offset + 4;
        };
        Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 0xff;
          return offset + 4;
        };
        function wrtBigUInt64LE(buf, value, offset, min, max) {
          checkIntBI(value, min, max, buf, offset, 7);
          var lo = Number(value & BigInt(0xffffffff));
          buf[offset++] = lo;
          lo = lo >> 8;
          buf[offset++] = lo;
          lo = lo >> 8;
          buf[offset++] = lo;
          lo = lo >> 8;
          buf[offset++] = lo;
          var hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
          buf[offset++] = hi;
          hi = hi >> 8;
          buf[offset++] = hi;
          hi = hi >> 8;
          buf[offset++] = hi;
          hi = hi >> 8;
          buf[offset++] = hi;
          return offset;
        }
        function wrtBigUInt64BE(buf, value, offset, min, max) {
          checkIntBI(value, min, max, buf, offset, 7);
          var lo = Number(value & BigInt(0xffffffff));
          buf[offset + 7] = lo;
          lo = lo >> 8;
          buf[offset + 6] = lo;
          lo = lo >> 8;
          buf[offset + 5] = lo;
          lo = lo >> 8;
          buf[offset + 4] = lo;
          var hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
          buf[offset + 3] = hi;
          hi = hi >> 8;
          buf[offset + 2] = hi;
          hi = hi >> 8;
          buf[offset + 1] = hi;
          hi = hi >> 8;
          buf[offset] = hi;
          return offset + 8;
        }
        Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
        });
        Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
        });
        Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1);
            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }
          var i = 0;
          var mul = 1;
          var sub = 0;
          this[offset] = value & 0xFF;
          while (++i < byteLength && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (value / mul >> 0) - sub & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1);
            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }
          var i = byteLength - 1;
          var mul = 1;
          var sub = 0;
          this[offset + i] = value & 0xFF;
          while (--i >= 0 && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (value / mul >> 0) - sub & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
          if (value < 0) value = 0xff + value + 1;
          this[offset] = value & 0xff;
          return offset + 1;
        };
        Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
          return offset + 2;
        };
        Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          this[offset] = value >>> 8;
          this[offset + 1] = value & 0xff;
          return offset + 2;
        };
        Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
          return offset + 4;
        };
        Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          if (value < 0) value = 0xffffffff + value + 1;
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 0xff;
          return offset + 4;
        };
        Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
        });
        Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
        });
        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (offset + ext > buf.length) throw new RangeError('Index out of range');
          if (offset < 0) throw new RangeError('Index out of range');
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4);
          return offset + 4;
        }
        Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
          return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
          return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8);
          return offset + 8;
        }
        Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
          return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
          return writeDouble(this, value, offset, false, noAssert);
        };

        // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
          if (!start) start = 0;
          if (!end && end !== 0) end = this.length;
          if (targetStart >= target.length) targetStart = target.length;
          if (!targetStart) targetStart = 0;
          if (end > 0 && end < start) end = start;

          // Copy 0 bytes; we're done
          if (end === start) return 0;
          if (target.length === 0 || this.length === 0) return 0;

          // Fatal error conditions
          if (targetStart < 0) {
            throw new RangeError('targetStart out of bounds');
          }
          if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
          if (end < 0) throw new RangeError('sourceEnd out of bounds');

          // Are we oob?
          if (end > this.length) end = this.length;
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start;
          }
          var len = end - start;
          if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
            // Use built-in when available, missing from IE11
            this.copyWithin(targetStart, start, end);
          } else {
            Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
          }
          return len;
        };

        // Usage:
        //    buffer.fill(number[, offset[, end]])
        //    buffer.fill(buffer[, offset[, end]])
        //    buffer.fill(string[, offset[, end]][, encoding])
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
          // Handle string cases:
          if (typeof val === 'string') {
            if (typeof start === 'string') {
              encoding = start;
              start = 0;
              end = this.length;
            } else if (typeof end === 'string') {
              encoding = end;
              end = this.length;
            }
            if (encoding !== undefined && typeof encoding !== 'string') {
              throw new TypeError('encoding must be a string');
            }
            if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding);
            }
            if (val.length === 1) {
              var code = val.charCodeAt(0);
              if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
                // Fast path: If `val` fits into a single byte, use that numeric value.
                val = code;
              }
            }
          } else if (typeof val === 'number') {
            val = val & 255;
          } else if (typeof val === 'boolean') {
            val = Number(val);
          }

          // Invalid ranges are not set to a default, so can range check early.
          if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError('Out of range index');
          }
          if (end <= start) {
            return this;
          }
          start = start >>> 0;
          end = end === undefined ? this.length : end >>> 0;
          if (!val) val = 0;
          var i;
          if (typeof val === 'number') {
            for (i = start; i < end; ++i) {
              this[i] = val;
            }
          } else {
            var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
            var len = bytes.length;
            if (len === 0) {
              throw new TypeError('The value "' + val + '" is invalid for argument "value"');
            }
            for (i = 0; i < end - start; ++i) {
              this[i + start] = bytes[i % len];
            }
          }
          return this;
        };

        // CUSTOM ERRORS
        // =============

        // Simplified versions from Node, changed for Buffer-only usage
        var errors = {};
        function E(sym, getMessage, Base) {
          errors[sym] = /*#__PURE__*/function (_Base) {
            function NodeError() {
              var _this;
              _classCallCheck(this, NodeError);
              _this = _callSuper(this, NodeError);
              Object.defineProperty(_this, 'message', {
                value: getMessage.apply(_this, arguments),
                writable: true,
                configurable: true
              });

              // Add the error code to the name to include it in the stack trace.
              _this.name = "".concat(_this.name, " [").concat(sym, "]");
              // Access the stack to generate the error message including the error code
              // from the name.
              _this.stack; // eslint-disable-line no-unused-expressions
              // Reset the name to the actual name.
              delete _this.name;
              return _this;
            }
            _inherits(NodeError, _Base);
            return _createClass(NodeError, [{
              key: "code",
              get: function get() {
                return sym;
              },
              set: function set(value) {
                Object.defineProperty(this, 'code', {
                  configurable: true,
                  enumerable: true,
                  value: value,
                  writable: true
                });
              }
            }, {
              key: "toString",
              value: function toString() {
                return "".concat(this.name, " [").concat(sym, "]: ").concat(this.message);
              }
            }]);
          }(Base);
        }
        E('ERR_BUFFER_OUT_OF_BOUNDS', function (name) {
          if (name) {
            return "".concat(name, " is outside of buffer bounds");
          }
          return 'Attempt to access memory outside buffer bounds';
        }, RangeError);
        E('ERR_INVALID_ARG_TYPE', function (name, actual) {
          return "The \"".concat(name, "\" argument must be of type number. Received type ").concat(_typeof(actual));
        }, TypeError);
        E('ERR_OUT_OF_RANGE', function (str, range, input) {
          var msg = "The value of \"".concat(str, "\" is out of range.");
          var received = input;
          if (Number.isInteger(input) && Math.abs(input) > Math.pow(2, 32)) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === 'bigint') {
            received = String(input);
            if (input > Math.pow(BigInt(2), BigInt(32)) || input < -Math.pow(BigInt(2), BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += 'n';
          }
          msg += " It must be ".concat(range, ". Received ").concat(received);
          return msg;
        }, RangeError);
        function addNumericalSeparator(val) {
          var res = '';
          var i = val.length;
          var start = val[0] === '-' ? 1 : 0;
          for (; i >= start + 4; i -= 3) {
            res = "_".concat(val.slice(i - 3, i)).concat(res);
          }
          return "".concat(val.slice(0, i)).concat(res);
        }

        // CHECK FUNCTIONS
        // ===============

        function checkBounds(buf, offset, byteLength) {
          validateNumber(offset, 'offset');
          if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
            boundsError(offset, buf.length - (byteLength + 1));
          }
        }
        function checkIntBI(value, min, max, buf, offset, byteLength) {
          if (value > max || value < min) {
            var n = typeof min === 'bigint' ? 'n' : '';
            var range;
            if (byteLength > 3) {
              if (min === 0 || min === BigInt(0)) {
                range = ">= 0".concat(n, " and < 2").concat(n, " ** ").concat((byteLength + 1) * 8).concat(n);
              } else {
                range = ">= -(2".concat(n, " ** ").concat((byteLength + 1) * 8 - 1).concat(n, ") and < 2 ** ") + "".concat((byteLength + 1) * 8 - 1).concat(n);
              }
            } else {
              range = ">= ".concat(min).concat(n, " and <= ").concat(max).concat(n);
            }
            throw new errors.ERR_OUT_OF_RANGE('value', range, value);
          }
          checkBounds(buf, offset, byteLength);
        }
        function validateNumber(value, name) {
          if (typeof value !== 'number') {
            throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value);
          }
        }
        function boundsError(value, length, type) {
          if (Math.floor(value) !== value) {
            validateNumber(value, type);
            throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value);
          }
          if (length < 0) {
            throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
          }
          throw new errors.ERR_OUT_OF_RANGE(type || 'offset', ">= ".concat(type ? 1 : 0, " and <= ").concat(length), value);
        }

        // HELPER FUNCTIONS
        // ================

        var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
        function base64clean(str) {
          // Node takes equal signs as end of the Base64 encoding
          str = str.split('=')[0];
          // Node strips out invalid characters like \n and \t from the string, base64-js does not
          str = str.trim().replace(INVALID_BASE64_RE, '');
          // Node converts strings with length < 2 to ''
          if (str.length < 2) return '';
          // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
          while (str.length % 4 !== 0) {
            str = str + '=';
          }
          return str;
        }
        function utf8ToBytes(string, units) {
          units = units || Infinity;
          var codePoint;
          var length = string.length;
          var leadSurrogate = null;
          var bytes = [];
          for (var i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i);

            // is surrogate component
            if (codePoint > 0xD7FF && codePoint < 0xE000) {
              // last char was a lead
              if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                  // unexpected trail
                  if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                  continue;
                } else if (i + 1 === length) {
                  // unpaired lead
                  if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                  continue;
                }

                // valid lead
                leadSurrogate = codePoint;
                continue;
              }

              // 2 leads in a row
              if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
              }

              // valid surrogate pair
              codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
            } else if (leadSurrogate) {
              // valid bmp char, but last char was a lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            }
            leadSurrogate = null;

            // encode utf8
            if (codePoint < 0x80) {
              if ((units -= 1) < 0) break;
              bytes.push(codePoint);
            } else if (codePoint < 0x800) {
              if ((units -= 2) < 0) break;
              bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
            } else if (codePoint < 0x10000) {
              if ((units -= 3) < 0) break;
              bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
            } else if (codePoint < 0x110000) {
              if ((units -= 4) < 0) break;
              bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
            } else {
              throw new Error('Invalid code point');
            }
          }
          return bytes;
        }
        function asciiToBytes(str) {
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            // Node's code seems to be doing this and not & 0x7F..
            byteArray.push(str.charCodeAt(i) & 0xFF);
          }
          return byteArray;
        }
        function utf16leToBytes(str, units) {
          var c, hi, lo;
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0) break;
            c = str.charCodeAt(i);
            hi = c >> 8;
            lo = c % 256;
            byteArray.push(lo);
            byteArray.push(hi);
          }
          return byteArray;
        }
        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str));
        }
        function blitBuffer(src, dst, offset, length) {
          var i;
          for (i = 0; i < length; ++i) {
            if (i + offset >= dst.length || i >= src.length) break;
            dst[i + offset] = src[i];
          }
          return i;
        }

        // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
        // the `instanceof` check but they should be treated as of that type.
        // See: https://github.com/feross/buffer/issues/166
        function isInstance(obj, type) {
          return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
        }
        function numberIsNaN(obj) {
          // For IE11 support
          return obj !== obj; // eslint-disable-line no-self-compare
        }

        // Create lookup table for `toString('hex')`
        // See: https://github.com/feross/buffer/issues/219
        var hexSliceLookupTable = function () {
          var alphabet = '0123456789abcdef';
          var table = new Array(256);
          for (var i = 0; i < 16; ++i) {
            var i16 = i * 16;
            for (var j = 0; j < 16; ++j) {
              table[i16 + j] = alphabet[i] + alphabet[j];
            }
          }
          return table;
        }();

        // Return not function with Error if BigInt not supported
        function defineBigIntMethod(fn) {
          return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn;
        }
        function BufferBigIntNotDefined() {
          throw new Error('BigInt not supported');
        }

        /***/
      }),
      /***/"./node_modules/cwise-compiler/compiler.js": (
      /*!*************************************************!*\
        !*** ./node_modules/cwise-compiler/compiler.js ***!
        \*************************************************/
      /***/
      function _node_modules_cwiseCompiler_compilerJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var createThunk = __webpack_require__(/*! ./lib/thunk.js */"./node_modules/cwise-compiler/lib/thunk.js");
        function Procedure() {
          this.argTypes = [];
          this.shimArgs = [];
          this.arrayArgs = [];
          this.arrayBlockIndices = [];
          this.scalarArgs = [];
          this.offsetArgs = [];
          this.offsetArgIndex = [];
          this.indexArgs = [];
          this.shapeArgs = [];
          this.funcName = "";
          this.pre = null;
          this.body = null;
          this.post = null;
          this.debug = false;
        }
        function compileCwise(user_args) {
          //Create procedure
          var proc = new Procedure();

          //Parse blocks
          proc.pre = user_args.pre;
          proc.body = user_args.body;
          proc.post = user_args.post;

          //Parse arguments
          var proc_args = user_args.args.slice(0);
          proc.argTypes = proc_args;
          for (var i = 0; i < proc_args.length; ++i) {
            var arg_type = proc_args[i];
            if (arg_type === "array" || _typeof(arg_type) === "object" && arg_type.blockIndices) {
              proc.argTypes[i] = "array";
              proc.arrayArgs.push(i);
              proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0);
              proc.shimArgs.push("array" + i);
              if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
                throw new Error("cwise: pre() block may not reference array args");
              }
              if (i < proc.post.args.length && proc.post.args[i].count > 0) {
                throw new Error("cwise: post() block may not reference array args");
              }
            } else if (arg_type === "scalar") {
              proc.scalarArgs.push(i);
              proc.shimArgs.push("scalar" + i);
            } else if (arg_type === "index") {
              proc.indexArgs.push(i);
              if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
                throw new Error("cwise: pre() block may not reference array index");
              }
              if (i < proc.body.args.length && proc.body.args[i].lvalue) {
                throw new Error("cwise: body() block may not write to array index");
              }
              if (i < proc.post.args.length && proc.post.args[i].count > 0) {
                throw new Error("cwise: post() block may not reference array index");
              }
            } else if (arg_type === "shape") {
              proc.shapeArgs.push(i);
              if (i < proc.pre.args.length && proc.pre.args[i].lvalue) {
                throw new Error("cwise: pre() block may not write to array shape");
              }
              if (i < proc.body.args.length && proc.body.args[i].lvalue) {
                throw new Error("cwise: body() block may not write to array shape");
              }
              if (i < proc.post.args.length && proc.post.args[i].lvalue) {
                throw new Error("cwise: post() block may not write to array shape");
              }
            } else if (_typeof(arg_type) === "object" && arg_type.offset) {
              proc.argTypes[i] = "offset";
              proc.offsetArgs.push({
                array: arg_type.array,
                offset: arg_type.offset
              });
              proc.offsetArgIndex.push(i);
            } else {
              throw new Error("cwise: Unknown argument type " + proc_args[i]);
            }
          }

          //Make sure at least one array argument was specified
          if (proc.arrayArgs.length <= 0) {
            throw new Error("cwise: No array arguments specified");
          }

          //Make sure arguments are correct
          if (proc.pre.args.length > proc_args.length) {
            throw new Error("cwise: Too many arguments in pre() block");
          }
          if (proc.body.args.length > proc_args.length) {
            throw new Error("cwise: Too many arguments in body() block");
          }
          if (proc.post.args.length > proc_args.length) {
            throw new Error("cwise: Too many arguments in post() block");
          }

          //Check debug flag
          proc.debug = !!user_args.printCode || !!user_args.debug;

          //Retrieve name
          proc.funcName = user_args.funcName || "cwise";

          //Read in block size
          proc.blockSize = user_args.blockSize || 64;
          return createThunk(proc);
        }
        module.exports = compileCwise;

        /***/
      }),
      /***/"./node_modules/cwise-compiler/lib/compile.js": (
      /*!****************************************************!*\
        !*** ./node_modules/cwise-compiler/lib/compile.js ***!
        \****************************************************/
      /***/
      function _node_modules_cwiseCompiler_lib_compileJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var uniq = __webpack_require__(/*! uniq */"./node_modules/uniq/uniq.js");

        // This function generates very simple loops analogous to how you typically traverse arrays (the outermost loop corresponds to the slowest changing index, the innermost loop to the fastest changing index)
        // TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.
        function innerFill(order, proc, body) {
          var dimension = order.length,
            nargs = proc.arrayArgs.length,
            has_index = proc.indexArgs.length > 0,
            code = [],
            vars = [],
            idx = 0,
            pidx = 0,
            i,
            j;
          for (i = 0; i < dimension; ++i) {
            // Iteration variables
            vars.push(["i", i, "=0"].join(""));
          }
          //Compute scan deltas
          for (j = 0; j < nargs; ++j) {
            for (i = 0; i < dimension; ++i) {
              pidx = idx;
              idx = order[i];
              if (i === 0) {
                // The innermost/fastest dimension's delta is simply its stride
                vars.push(["d", j, "s", i, "=t", j, "p", idx].join(""));
              } else {
                // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
                vars.push(["d", j, "s", i, "=(t", j, "p", idx, "-s", pidx, "*t", j, "p", pidx, ")"].join(""));
              }
            }
          }
          if (vars.length > 0) {
            code.push("var " + vars.join(","));
          }
          //Scan loop
          for (i = dimension - 1; i >= 0; --i) {
            // Start at largest stride and work your way inwards
            idx = order[i];
            code.push(["for(i", i, "=0;i", i, "<s", idx, ";++i", i, "){"].join(""));
          }
          //Push body of inner loop
          code.push(body);
          //Advance scan pointers
          for (i = 0; i < dimension; ++i) {
            pidx = idx;
            idx = order[i];
            for (j = 0; j < nargs; ++j) {
              code.push(["p", j, "+=d", j, "s", i].join(""));
            }
            if (has_index) {
              if (i > 0) {
                code.push(["index[", pidx, "]-=s", pidx].join(""));
              }
              code.push(["++index[", idx, "]"].join(""));
            }
            code.push("}");
          }
          return code.join("\n");
        }

        // Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
        // TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
        //       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.
        function outerFill(matched, order, proc, body) {
          var dimension = order.length,
            nargs = proc.arrayArgs.length,
            blockSize = proc.blockSize,
            has_index = proc.indexArgs.length > 0,
            code = [];
          for (var i = 0; i < nargs; ++i) {
            code.push(["var offset", i, "=p", i].join(""));
          }
          //Generate loops for unmatched dimensions
          // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
          // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).
          for (var i = matched; i < dimension; ++i) {
            code.push(["for(var j" + i + "=SS[", order[i], "]|0;j", i, ">0;){"].join("")); // Iterate back to front
            code.push(["if(j", i, "<", blockSize, "){"].join("")); // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).
            code.push(["s", order[i], "=j", i].join(""));
            code.push(["j", i, "=0"].join(""));
            code.push(["}else{s", order[i], "=", blockSize].join(""));
            code.push(["j", i, "-=", blockSize, "}"].join(""));
            if (has_index) {
              code.push(["index[", order[i], "]=j", i].join(""));
            }
          }
          for (var i = 0; i < nargs; ++i) {
            var indexStr = ["offset" + i];
            for (var j = matched; j < dimension; ++j) {
              indexStr.push(["j", j, "*t", i, "p", order[j]].join(""));
            }
            code.push(["p", i, "=(", indexStr.join("+"), ")"].join(""));
          }
          code.push(innerFill(order, proc, body));
          for (var i = matched; i < dimension; ++i) {
            code.push("}");
          }
          return code.join("\n");
        }

        //Count the number of compatible inner orders
        // This is the length of the longest common prefix of the arrays in orders.
        // Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
        // This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.
        function countMatches(orders) {
          var matched = 0,
            dimension = orders[0].length;
          while (matched < dimension) {
            for (var j = 1; j < orders.length; ++j) {
              if (orders[j][matched] !== orders[0][matched]) {
                return matched;
              }
            }
            ++matched;
          }
          return matched;
        }

        //Processes a block according to the given data types
        // Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.
        function processBlock(block, proc, dtypes) {
          var code = block.body;
          var pre = [];
          var post = [];
          for (var i = 0; i < block.args.length; ++i) {
            var carg = block.args[i];
            if (carg.count <= 0) {
              continue;
            }
            var re = new RegExp(carg.name, "g");
            var ptrStr = "";
            var arrNum = proc.arrayArgs.indexOf(i);
            switch (proc.argTypes[i]) {
              case "offset":
                var offArgIndex = proc.offsetArgIndex.indexOf(i);
                var offArg = proc.offsetArgs[offArgIndex];
                arrNum = offArg.array;
                ptrStr = "+q" + offArgIndex;
              // Adds offset to the "pointer" in the array
              case "array":
                ptrStr = "p" + arrNum + ptrStr;
                var localStr = "l" + i;
                var arrStr = "a" + arrNum;
                if (proc.arrayBlockIndices[arrNum] === 0) {
                  // Argument to body is just a single value from this array
                  if (carg.count === 1) {
                    // Argument/array used only once(?)
                    if (dtypes[arrNum] === "generic") {
                      if (carg.lvalue) {
                        pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")); // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
                        code = code.replace(re, localStr);
                        post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
                      } else {
                        code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""));
                      }
                    } else {
                      code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
                    }
                  } else if (dtypes[arrNum] === "generic") {
                    pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")); // TODO: Could we optimize by checking for carg.rvalue?
                    code = code.replace(re, localStr);
                    if (carg.lvalue) {
                      post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
                    }
                  } else {
                    pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")); // TODO: Could we optimize by checking for carg.rvalue?
                    code = code.replace(re, localStr);
                    if (carg.lvalue) {
                      post.push([arrStr, "[", ptrStr, "]=", localStr].join(""));
                    }
                  }
                } else {
                  // Argument to body is a "block"
                  var reStrArr = [carg.name],
                    ptrStrArr = [ptrStr];
                  for (var j = 0; j < Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
                    reStrArr.push("\\s*\\[([^\\]]+)\\]");
                    ptrStrArr.push("$" + (j + 1) + "*t" + arrNum + "b" + j); // Matched index times stride
                  }
                  re = new RegExp(reStrArr.join(""), "g");
                  ptrStr = ptrStrArr.join("+");
                  if (dtypes[arrNum] === "generic") {
                    /*if(carg.lvalue) {
                      pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
                      code = code.replace(re, localStr)
                      post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
                    } else {
                      code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
                    }*/
                    throw new Error("cwise: Generic arrays not supported in combination with blocks!");
                  } else {
                    // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
                    code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
                  }
                }
                break;
              case "scalar":
                code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i));
                break;
              case "index":
                code = code.replace(re, "index");
                break;
              case "shape":
                code = code.replace(re, "shape");
                break;
            }
          }
          return [pre.join("\n"), code, post.join("\n")].join("\n").trim();
        }
        function typeSummary(dtypes) {
          var summary = new Array(dtypes.length);
          var allEqual = true;
          for (var i = 0; i < dtypes.length; ++i) {
            var t = dtypes[i];
            var digits = t.match(/\d+/);
            if (!digits) {
              digits = "";
            } else {
              digits = digits[0];
            }
            if (t.charAt(0) === 0) {
              summary[i] = "u" + t.charAt(1) + digits;
            } else {
              summary[i] = t.charAt(0) + digits;
            }
            if (i > 0) {
              allEqual = allEqual && summary[i] === summary[i - 1];
            }
          }
          if (allEqual) {
            return summary[0];
          }
          return summary.join("");
        }

        //Generates a cwise operator
        function generateCWiseOp(proc, typesig) {
          //Compute dimension
          // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
          var dimension = typesig[1].length - Math.abs(proc.arrayBlockIndices[0]) | 0;
          var orders = new Array(proc.arrayArgs.length);
          var dtypes = new Array(proc.arrayArgs.length);
          for (var i = 0; i < proc.arrayArgs.length; ++i) {
            dtypes[i] = typesig[2 * i];
            orders[i] = typesig[2 * i + 1];
          }

          //Determine where block and loop indices start and end
          var blockBegin = [],
            blockEnd = []; // These indices are exposed as blocks
          var loopBegin = [],
            loopEnd = []; // These indices are iterated over
          var loopOrders = []; // orders restricted to the loop indices
          for (var i = 0; i < proc.arrayArgs.length; ++i) {
            if (proc.arrayBlockIndices[i] < 0) {
              loopBegin.push(0);
              loopEnd.push(dimension);
              blockBegin.push(dimension);
              blockEnd.push(dimension + proc.arrayBlockIndices[i]);
            } else {
              loopBegin.push(proc.arrayBlockIndices[i]); // Non-negative
              loopEnd.push(proc.arrayBlockIndices[i] + dimension);
              blockBegin.push(0);
              blockEnd.push(proc.arrayBlockIndices[i]);
            }
            var newOrder = [];
            for (var j = 0; j < orders[i].length; j++) {
              if (loopBegin[i] <= orders[i][j] && orders[i][j] < loopEnd[i]) {
                newOrder.push(orders[i][j] - loopBegin[i]); // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
              }
            }
            loopOrders.push(newOrder);
          }

          //First create arguments for procedure
          var arglist = ["SS"]; // SS is the overall shape over which we iterate
          var code = ["'use strict'"];
          var vars = [];
          for (var j = 0; j < dimension; ++j) {
            vars.push(["s", j, "=SS[", j, "]"].join("")); // The limits for each dimension.
          }
          for (var i = 0; i < proc.arrayArgs.length; ++i) {
            arglist.push("a" + i); // Actual data array
            arglist.push("t" + i); // Strides
            arglist.push("p" + i); // Offset in the array at which the data starts (also used for iterating over the data)

            for (var j = 0; j < dimension; ++j) {
              // Unpack the strides into vars for looping
              vars.push(["t", i, "p", j, "=t", i, "[", loopBegin[i] + j, "]"].join(""));
            }
            for (var j = 0; j < Math.abs(proc.arrayBlockIndices[i]); ++j) {
              // Unpack the strides into vars for block iteration
              vars.push(["t", i, "b", j, "=t", i, "[", blockBegin[i] + j, "]"].join(""));
            }
          }
          for (var i = 0; i < proc.scalarArgs.length; ++i) {
            arglist.push("Y" + i);
          }
          if (proc.shapeArgs.length > 0) {
            vars.push("shape=SS.slice(0)"); // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
          }
          if (proc.indexArgs.length > 0) {
            // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
            var zeros = new Array(dimension);
            for (var i = 0; i < dimension; ++i) {
              zeros[i] = "0";
            }
            vars.push(["index=[", zeros.join(","), "]"].join(""));
          }
          for (var i = 0; i < proc.offsetArgs.length; ++i) {
            // Offset arguments used for stencil operations
            var off_arg = proc.offsetArgs[i];
            var init_string = [];
            for (var j = 0; j < off_arg.offset.length; ++j) {
              if (off_arg.offset[j] === 0) {
                continue;
              } else if (off_arg.offset[j] === 1) {
                init_string.push(["t", off_arg.array, "p", j].join(""));
              } else {
                init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""));
              }
            }
            if (init_string.length === 0) {
              vars.push("q" + i + "=0");
            } else {
              vars.push(["q", i, "=", init_string.join("+")].join(""));
            }
          }

          //Prepare this variables
          var thisVars = uniq([].concat(proc.pre.thisVars).concat(proc.body.thisVars).concat(proc.post.thisVars));
          vars = vars.concat(thisVars);
          if (vars.length > 0) {
            code.push("var " + vars.join(","));
          }
          for (var i = 0; i < proc.arrayArgs.length; ++i) {
            code.push("p" + i + "|=0");
          }

          //Inline prelude
          if (proc.pre.body.length > 3) {
            code.push(processBlock(proc.pre, proc, dtypes));
          }

          //Process body
          var body = processBlock(proc.body, proc, dtypes);
          var matched = countMatches(loopOrders);
          if (matched < dimension) {
            code.push(outerFill(matched, loopOrders[0], proc, body)); // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
          } else {
            code.push(innerFill(loopOrders[0], proc, body));
          }

          //Inline epilog
          if (proc.post.body.length > 3) {
            code.push(processBlock(proc.post, proc, dtypes));
          }
          if (proc.debug) {
            console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------");
          }
          var loopName = [proc.funcName || "unnamed", "_cwise_loop_", orders[0].join("s"), "m", matched, typeSummary(dtypes)].join("");
          var f = new Function(["function ", loopName, "(", arglist.join(","), "){", code.join("\n"), "} return ", loopName].join(""));
          return f();
        }
        module.exports = generateCWiseOp;

        /***/
      }),
      /***/"./node_modules/cwise-compiler/lib/thunk.js": (
      /*!**************************************************!*\
        !*** ./node_modules/cwise-compiler/lib/thunk.js ***!
        \**************************************************/
      /***/
      function _node_modules_cwiseCompiler_lib_thunkJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        // The function below is called when constructing a cwise function object, and does the following:
        // A function object is constructed which accepts as argument a compilation function and returns another function.
        // It is this other function that is eventually returned by createThunk, and this function is the one that actually
        // checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
        // The compilation passed to the first function object is used for compiling new functions.
        // Once this function object is created, it is called with compile as argument, where the first argument of compile
        // is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
        // So createThunk roughly works like this:
        // function createThunk(proc) {
        //   var thunk = function(compileBound) {
        //     var CACHED = {}
        //     return function(arrays and scalars) {
        //       if (dtype and order of arrays in CACHED) {
        //         var func = CACHED[dtype and order of arrays]
        //       } else {
        //         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
        //       }
        //       return func(arrays and scalars)
        //     }
        //   }
        //   return thunk(compile.bind1(proc))
        // }
        var compile = __webpack_require__(/*! ./compile.js */"./node_modules/cwise-compiler/lib/compile.js");
        function createThunk(proc) {
          var code = ["'use strict'", "var CACHED={}"];
          var vars = [];
          var thunkName = proc.funcName + "_cwise_thunk";

          //Build thunk
          code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""));
          var typesig = [];
          var string_typesig = [];
          var proc_args = [["array", proc.arrayArgs[0], ".shape.slice(",
          // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
          Math.max(0, proc.arrayBlockIndices[0]), proc.arrayBlockIndices[0] < 0 ? "," + proc.arrayBlockIndices[0] + ")" : ")"].join("")];
          var shapeLengthConditions = [],
            shapeConditions = [];
          // Process array arguments
          for (var i = 0; i < proc.arrayArgs.length; ++i) {
            var j = proc.arrayArgs[i];
            vars.push(["t", j, "=array", j, ".dtype,", "r", j, "=array", j, ".order"].join(""));
            typesig.push("t" + j);
            typesig.push("r" + j);
            string_typesig.push("t" + j);
            string_typesig.push("r" + j + ".join()");
            proc_args.push("array" + j + ".data");
            proc_args.push("array" + j + ".stride");
            proc_args.push("array" + j + ".offset|0");
            if (i > 0) {
              // Gather conditions to check for shape equality (ignoring block indices)
              shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0]) - Math.abs(proc.arrayBlockIndices[i])));
              shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0, proc.arrayBlockIndices[i]) + "]");
            }
          }
          // Check for shape equality
          if (proc.arrayArgs.length > 1) {
            code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')");
            code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {");
            code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')");
            code.push("}");
          }
          // Process scalar arguments
          for (var i = 0; i < proc.scalarArgs.length; ++i) {
            proc_args.push("scalar" + proc.scalarArgs[i]);
          }
          // Check for cached function (and if not present, generate it)
          vars.push(["type=[", string_typesig.join(","), "].join()"].join(""));
          vars.push("proc=CACHED[type]");
          code.push("var " + vars.join(","));
          code.push(["if(!proc){", "CACHED[type]=proc=compile([", typesig.join(","), "])}", "return proc(", proc_args.join(","), ")}"].join(""));
          if (proc.debug) {
            console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------");
          }

          //Compile thunk
          var thunk = new Function("compile", code.join("\n"));
          return thunk(compile.bind(undefined, proc));
        }
        module.exports = createThunk;

        /***/
      }),
      /***/"./node_modules/cwise-parser/index.js": (
      /*!********************************************!*\
        !*** ./node_modules/cwise-parser/index.js ***!
        \********************************************/
      /***/
      function _node_modules_cwiseParser_indexJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var esprima = __webpack_require__(/*! esprima */"./node_modules/esprima/esprima.js");
        var uniq = __webpack_require__(/*! uniq */"./node_modules/uniq/uniq.js");
        var PREFIX_COUNTER = 0;
        function CompiledArgument(name, lvalue, rvalue) {
          this.name = name;
          this.lvalue = lvalue;
          this.rvalue = rvalue;
          this.count = 0;
        }
        function CompiledRoutine(body, args, thisVars, localVars) {
          this.body = body;
          this.args = args;
          this.thisVars = thisVars;
          this.localVars = localVars;
        }
        function isGlobal(identifier) {
          if (identifier === "eval") {
            throw new Error("cwise-parser: eval() not allowed");
          }
          if (typeof window !== "undefined") {
            return identifier in window;
          } else if (typeof __webpack_require__.g !== "undefined") {
            return identifier in __webpack_require__.g;
          } else if (typeof self !== "undefined") {
            return identifier in self;
          } else {
            return false;
          }
        }
        function getArgNames(ast) {
          var params = ast.body[0].expression.callee.params;
          var names = new Array(params.length);
          for (var i = 0; i < params.length; ++i) {
            names[i] = params[i].name;
          }
          return names;
        }
        function preprocess(func) {
          var src = ["(", func, ")()"].join("");
          var ast = esprima.parse(src, {
            range: true
          });

          //Compute new prefix
          var prefix = "_inline_" + PREFIX_COUNTER++ + "_";

          //Parse out arguments
          var argNames = getArgNames(ast);
          var compiledArgs = new Array(argNames.length);
          for (var i = 0; i < argNames.length; ++i) {
            compiledArgs[i] = new CompiledArgument([prefix, "arg", i, "_"].join(""), false, false);
          }

          //Create temporary data structure for source rewriting
          var exploded = new Array(src.length);
          for (var i = 0, n = src.length; i < n; ++i) {
            exploded[i] = src.charAt(i);
          }

          //Local variables
          var localVars = [];
          var thisVars = [];
          var computedThis = false;

          //Retrieves a local variable
          function createLocal(id) {
            var nstr = prefix + id.replace(/\_/g, "__");
            localVars.push(nstr);
            return nstr;
          }

          //Creates a this variable
          function createThisVar(id) {
            var nstr = "this_" + id.replace(/\_/g, "__");
            thisVars.push(nstr);
            return nstr;
          }

          //Rewrites an ast node
          function rewrite(node, nstr) {
            var lo = node.range[0],
              hi = node.range[1];
            for (var i = lo + 1; i < hi; ++i) {
              exploded[i] = "";
            }
            exploded[lo] = nstr;
          }

          //Remove any underscores
          function escapeString(str) {
            return "'" + str.replace(/\_/g, "\\_").replace(/\'/g, "\'") + "'";
          }

          //Returns the source of an identifier
          function source(node) {
            return exploded.slice(node.range[0], node.range[1]).join("");
          }

          //Computes the usage of a node
          var LVALUE = 1;
          var RVALUE = 2;
          function getUsage(node) {
            if (node.parent.type === "AssignmentExpression") {
              if (node.parent.left === node) {
                if (node.parent.operator === "=") {
                  return LVALUE;
                }
                return LVALUE | RVALUE;
              }
            }
            if (node.parent.type === "UpdateExpression") {
              return LVALUE | RVALUE;
            }
            return RVALUE;
          }

          //Handle visiting a node
          (function visit(node, parent) {
            node.parent = parent;
            if (node.type === "MemberExpression") {
              //Handle member expression
              if (node.computed) {
                visit(node.object, node);
                visit(node.property, node);
              } else if (node.object.type === "ThisExpression") {
                rewrite(node, createThisVar(node.property.name));
              } else {
                visit(node.object, node);
              }
            } else if (node.type === "ThisExpression") {
              throw new Error("cwise-parser: Computed this is not allowed");
            } else if (node.type === "Identifier") {
              //Handle identifier
              var name = node.name;
              var argNo = argNames.indexOf(name);
              if (argNo >= 0) {
                var carg = compiledArgs[argNo];
                var usage = getUsage(node);
                if (usage & LVALUE) {
                  carg.lvalue = true;
                }
                if (usage & RVALUE) {
                  carg.rvalue = true;
                }
                ++carg.count;
                rewrite(node, carg.name);
              } else if (isGlobal(name)) {
                //Don't rewrite globals
              } else {
                rewrite(node, createLocal(name));
              }
            } else if (node.type === "Literal") {
              if (typeof node.value === "string") {
                rewrite(node, escapeString(node.value));
              }
            } else if (node.type === "WithStatement") {
              throw new Error("cwise-parser: with() statements not allowed");
            } else {
              //Visit all children
              var keys = Object.keys(node);
              for (var i = 0, n = keys.length; i < n; ++i) {
                if (keys[i] === "parent") {
                  continue;
                }
                var value = node[keys[i]];
                if (value) {
                  if (value instanceof Array) {
                    for (var j = 0; j < value.length; ++j) {
                      if (value[j] && typeof value[j].type === "string") {
                        visit(value[j], node);
                      }
                    }
                  } else if (typeof value.type === "string") {
                    visit(value, node);
                  }
                }
              }
            }
          })(ast.body[0].expression.callee.body, undefined);

          //Remove duplicate variables
          uniq(localVars);
          uniq(thisVars);

          //Return body
          var routine = new CompiledRoutine(source(ast.body[0].expression.callee.body), compiledArgs, thisVars, localVars);
          return routine;
        }
        module.exports = preprocess;

        /***/
      }),
      /***/"./node_modules/cwise/lib/cwise-esprima.js": (
      /*!*************************************************!*\
        !*** ./node_modules/cwise/lib/cwise-esprima.js ***!
        \*************************************************/
      /***/
      function _node_modules_cwise_lib_cwiseEsprimaJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var parse = __webpack_require__(/*! cwise-parser */"./node_modules/cwise-parser/index.js");
        var compile = __webpack_require__(/*! cwise-compiler */"./node_modules/cwise-compiler/compiler.js");
        var REQUIRED_FIELDS = ["args", "body"];
        var OPTIONAL_FIELDS = ["pre", "post", "printCode", "funcName", "blockSize"];
        function createCWise(user_args) {
          //Check parameters
          for (var id in user_args) {
            if (REQUIRED_FIELDS.indexOf(id) < 0 && OPTIONAL_FIELDS.indexOf(id) < 0) {
              console.warn("cwise: Unknown argument '" + id + "' passed to expression compiler");
            }
          }
          for (var i = 0; i < REQUIRED_FIELDS.length; ++i) {
            if (!user_args[REQUIRED_FIELDS[i]]) {
              throw new Error("cwise: Missing argument: " + REQUIRED_FIELDS[i]);
            }
          }

          //Parse blocks
          return compile({
            args: user_args.args,
            pre: parse(user_args.pre || function () {}),
            body: parse(user_args.body),
            post: parse(user_args.post || function () {}),
            debug: !!user_args.printCode,
            funcName: user_args.funcName || user_args.body.name || "cwise",
            blockSize: user_args.blockSize || 64
          });
        }
        module.exports = createCWise;

        /***/
      }),
      /***/"./node_modules/dup/dup.js": (
      /*!*********************************!*\
        !*** ./node_modules/dup/dup.js ***!
        \*********************************/
      /***/
      function _node_modules_dup_dupJs(module) {
        "use strict";

        function dupe_array(count, value, i) {
          var c = count[i] | 0;
          if (c <= 0) {
            return [];
          }
          var result = new Array(c),
            j;
          if (i === count.length - 1) {
            for (j = 0; j < c; ++j) {
              result[j] = value;
            }
          } else {
            for (j = 0; j < c; ++j) {
              result[j] = dupe_array(count, value, i + 1);
            }
          }
          return result;
        }
        function dupe_number(count, value) {
          var result, i;
          result = new Array(count);
          for (i = 0; i < count; ++i) {
            result[i] = value;
          }
          return result;
        }
        function dupe(count, value) {
          if (typeof value === "undefined") {
            value = 0;
          }
          switch (_typeof(count)) {
            case "number":
              if (count > 0) {
                return dupe_number(count | 0, value);
              }
              break;
            case "object":
              if (typeof count.length === "number") {
                return dupe_array(count, value, 0);
              }
              break;
          }
          return [];
        }
        module.exports = dupe;

        /***/
      }),
      /***/"./node_modules/esprima/esprima.js": (
      /*!*****************************************!*\
        !*** ./node_modules/esprima/esprima.js ***!
        \*****************************************/
      /***/
      function _node_modules_esprima_esprimaJs(module, exports) {
        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; /*
                                                                                                         Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
                                                                                                         Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
                                                                                                         Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
                                                                                                         Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
                                                                                                         Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
                                                                                                         Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
                                                                                                         Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
                                                                                                         Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
                                                                                                         Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
                                                                                                         Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
                                                                                                         Redistribution and use in source and binary forms, with or without
                                                                                                         modification, are permitted provided that the following conditions are met:
                                                                                                         * Redistributions of source code must retain the above copyright
                                                                                                         notice, this list of conditions and the following disclaimer.
                                                                                                         * Redistributions in binary form must reproduce the above copyright
                                                                                                         notice, this list of conditions and the following disclaimer in the
                                                                                                         documentation and/or other materials provided with the distribution.
                                                                                                         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
                                                                                                         AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
                                                                                                         IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
                                                                                                         ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
                                                                                                         DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
                                                                                                         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
                                                                                                         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
                                                                                                         ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
                                                                                                         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
                                                                                                         THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                         */

        /*jslint bitwise:true plusplus:true */
        /*global esprima:true, define:true, exports:true, window: true,
        throwErrorTolerant: true,
        throwError: true, generateStatement: true, peek: true,
        parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
        parseFunctionDeclaration: true, parseFunctionExpression: true,
        parseFunctionSourceElements: true, parseVariableIdentifier: true,
        parseLeftHandSideExpression: true,
        parseUnaryExpression: true,
        parseStatement: true, parseSourceElement: true */

        (function (root, factory) {
          'use strict';

          // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
          // Rhino, and plain browser loading.

          /* istanbul ignore next */
          if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {}
        })(this, function (exports) {
          'use strict';

          var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;
          Token = {
            BooleanLiteral: 1,
            EOF: 2,
            Identifier: 3,
            Keyword: 4,
            NullLiteral: 5,
            NumericLiteral: 6,
            Punctuator: 7,
            StringLiteral: 8,
            RegularExpression: 9
          };
          TokenName = {};
          TokenName[Token.BooleanLiteral] = 'Boolean';
          TokenName[Token.EOF] = '<end>';
          TokenName[Token.Identifier] = 'Identifier';
          TokenName[Token.Keyword] = 'Keyword';
          TokenName[Token.NullLiteral] = 'Null';
          TokenName[Token.NumericLiteral] = 'Numeric';
          TokenName[Token.Punctuator] = 'Punctuator';
          TokenName[Token.StringLiteral] = 'String';
          TokenName[Token.RegularExpression] = 'RegularExpression';

          // A function following one of those tokens is an expression.
          FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new', 'return', 'case', 'delete', 'throw', 'void',
          // assignment operators
          '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', ',',
          // binary/unary operators
          '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=', '<=', '<', '>', '!=', '!=='];
          Syntax = {
            AssignmentExpression: 'AssignmentExpression',
            ArrayExpression: 'ArrayExpression',
            BlockStatement: 'BlockStatement',
            BinaryExpression: 'BinaryExpression',
            BreakStatement: 'BreakStatement',
            CallExpression: 'CallExpression',
            CatchClause: 'CatchClause',
            ConditionalExpression: 'ConditionalExpression',
            ContinueStatement: 'ContinueStatement',
            DoWhileStatement: 'DoWhileStatement',
            DebuggerStatement: 'DebuggerStatement',
            EmptyStatement: 'EmptyStatement',
            ExpressionStatement: 'ExpressionStatement',
            ForStatement: 'ForStatement',
            ForInStatement: 'ForInStatement',
            FunctionDeclaration: 'FunctionDeclaration',
            FunctionExpression: 'FunctionExpression',
            Identifier: 'Identifier',
            IfStatement: 'IfStatement',
            Literal: 'Literal',
            LabeledStatement: 'LabeledStatement',
            LogicalExpression: 'LogicalExpression',
            MemberExpression: 'MemberExpression',
            NewExpression: 'NewExpression',
            ObjectExpression: 'ObjectExpression',
            Program: 'Program',
            Property: 'Property',
            ReturnStatement: 'ReturnStatement',
            SequenceExpression: 'SequenceExpression',
            SwitchStatement: 'SwitchStatement',
            SwitchCase: 'SwitchCase',
            ThisExpression: 'ThisExpression',
            ThrowStatement: 'ThrowStatement',
            TryStatement: 'TryStatement',
            UnaryExpression: 'UnaryExpression',
            UpdateExpression: 'UpdateExpression',
            VariableDeclaration: 'VariableDeclaration',
            VariableDeclarator: 'VariableDeclarator',
            WhileStatement: 'WhileStatement',
            WithStatement: 'WithStatement'
          };
          PropertyKind = {
            Data: 1,
            Get: 2,
            Set: 4
          };

          // Error messages should be identical to V8.
          Messages = {
            UnexpectedToken: 'Unexpected token %0',
            UnexpectedNumber: 'Unexpected number',
            UnexpectedString: 'Unexpected string',
            UnexpectedIdentifier: 'Unexpected identifier',
            UnexpectedReserved: 'Unexpected reserved word',
            UnexpectedEOS: 'Unexpected end of input',
            NewlineAfterThrow: 'Illegal newline after throw',
            InvalidRegExp: 'Invalid regular expression',
            UnterminatedRegExp: 'Invalid regular expression: missing /',
            InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
            InvalidLHSInForIn: 'Invalid left-hand side in for-in',
            MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
            NoCatchOrFinally: 'Missing catch or finally after try',
            UnknownLabel: 'Undefined label \'%0\'',
            Redeclaration: '%0 \'%1\' has already been declared',
            IllegalContinue: 'Illegal continue statement',
            IllegalBreak: 'Illegal break statement',
            IllegalReturn: 'Illegal return statement',
            StrictModeWith: 'Strict mode code may not include a with statement',
            StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
            StrictVarName: 'Variable name may not be eval or arguments in strict mode',
            StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
            StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
            StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
            StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
            StrictDelete: 'Delete of an unqualified identifier in strict mode.',
            StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
            AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
            AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
            StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
            StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
            StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
            StrictReservedWord: 'Use of future reserved word in strict mode'
          };

          // See also tools/generate-unicode-regex.py.
          Regex = {
            NonAsciiIdentifierStart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]"),
            NonAsciiIdentifierPart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]")
          };

          // Ensure the condition is true, otherwise throw an error.
          // This is only to have a better contract semantic, i.e. another safety net
          // to catch a logic error. The condition shall be fulfilled in normal case.
          // Do NOT use this to enforce a certain condition on any user input.

          function assert(condition, message) {
            /* istanbul ignore if */
            if (!condition) {
              throw new Error('ASSERT: ' + message);
            }
          }
          function isDecimalDigit(ch) {
            return ch >= 48 && ch <= 57; // 0..9
          }
          function isHexDigit(ch) {
            return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
          }
          function isOctalDigit(ch) {
            return '01234567'.indexOf(ch) >= 0;
          }

          // 7.2 White Space

          function isWhiteSpace(ch) {
            return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0;
          }

          // 7.3 Line Terminators

          function isLineTerminator(ch) {
            return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
          }

          // 7.6 Identifier Names and Identifiers

          function isIdentifierStart(ch) {
            return ch === 0x24 || ch === 0x5F ||
            // $ (dollar) and _ (underscore)
            ch >= 0x41 && ch <= 0x5A ||
            // A..Z
            ch >= 0x61 && ch <= 0x7A ||
            // a..z
            ch === 0x5C ||
            // \ (backslash)
            ch >= 0x80 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
          }
          function isIdentifierPart(ch) {
            return ch === 0x24 || ch === 0x5F ||
            // $ (dollar) and _ (underscore)
            ch >= 0x41 && ch <= 0x5A ||
            // A..Z
            ch >= 0x61 && ch <= 0x7A ||
            // a..z
            ch >= 0x30 && ch <= 0x39 ||
            // 0..9
            ch === 0x5C ||
            // \ (backslash)
            ch >= 0x80 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
          }

          // 7.6.1.2 Future Reserved Words

          function isFutureReservedWord(id) {
            switch (id) {
              case 'class':
              case 'enum':
              case 'export':
              case 'extends':
              case 'import':
              case 'super':
                return true;
              default:
                return false;
            }
          }
          function isStrictModeReservedWord(id) {
            switch (id) {
              case 'implements':
              case 'interface':
              case 'package':
              case 'private':
              case 'protected':
              case 'public':
              case 'static':
              case 'yield':
              case 'let':
                return true;
              default:
                return false;
            }
          }
          function isRestrictedWord(id) {
            return id === 'eval' || id === 'arguments';
          }

          // 7.6.1.1 Keywords

          function isKeyword(id) {
            if (strict && isStrictModeReservedWord(id)) {
              return true;
            }

            // 'const' is specialized as Keyword in V8.
            // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
            // Some others are from future reserved words.

            switch (id.length) {
              case 2:
                return id === 'if' || id === 'in' || id === 'do';
              case 3:
                return id === 'var' || id === 'for' || id === 'new' || id === 'try' || id === 'let';
              case 4:
                return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
              case 5:
                return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
              case 6:
                return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
              case 7:
                return id === 'default' || id === 'finally' || id === 'extends';
              case 8:
                return id === 'function' || id === 'continue' || id === 'debugger';
              case 10:
                return id === 'instanceof';
              default:
                return false;
            }
          }

          // 7.4 Comments

          function addComment(type, value, start, end, loc) {
            var comment, attacher;
            assert(typeof start === 'number', 'Comment must have valid position');

            // Because the way the actual token is scanned, often the comments
            // (if any) are skipped twice during the lexical analysis.
            // Thus, we need to skip adding a comment if the comment array already
            // handled it.
            if (state.lastCommentStart >= start) {
              return;
            }
            state.lastCommentStart = start;
            comment = {
              type: type,
              value: value
            };
            if (extra.range) {
              comment.range = [start, end];
            }
            if (extra.loc) {
              comment.loc = loc;
            }
            extra.comments.push(comment);
            if (extra.attachComment) {
              extra.leadingComments.push(comment);
              extra.trailingComments.push(comment);
            }
          }
          function skipSingleLineComment(offset) {
            var start, loc, ch, comment;
            start = index - offset;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart - offset
              }
            };
            while (index < length) {
              ch = source.charCodeAt(index);
              ++index;
              if (isLineTerminator(ch)) {
                if (extra.comments) {
                  comment = source.slice(start + offset, index - 1);
                  loc.end = {
                    line: lineNumber,
                    column: index - lineStart - 1
                  };
                  addComment('Line', comment, start, index - 1, loc);
                }
                if (ch === 13 && source.charCodeAt(index) === 10) {
                  ++index;
                }
                ++lineNumber;
                lineStart = index;
                return;
              }
            }
            if (extra.comments) {
              comment = source.slice(start + offset, index);
              loc.end = {
                line: lineNumber,
                column: index - lineStart
              };
              addComment('Line', comment, start, index, loc);
            }
          }
          function skipMultiLineComment() {
            var start, loc, ch, comment;
            if (extra.comments) {
              start = index - 2;
              loc = {
                start: {
                  line: lineNumber,
                  column: index - lineStart - 2
                }
              };
            }
            while (index < length) {
              ch = source.charCodeAt(index);
              if (isLineTerminator(ch)) {
                if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
                  ++index;
                }
                ++lineNumber;
                ++index;
                lineStart = index;
                if (index >= length) {
                  throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
              } else if (ch === 0x2A) {
                // Block comment ends with '*/'.
                if (source.charCodeAt(index + 1) === 0x2F) {
                  ++index;
                  ++index;
                  if (extra.comments) {
                    comment = source.slice(start + 2, index - 2);
                    loc.end = {
                      line: lineNumber,
                      column: index - lineStart
                    };
                    addComment('Block', comment, start, index, loc);
                  }
                  return;
                }
                ++index;
              } else {
                ++index;
              }
            }
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          function skipComment() {
            var ch, start;
            start = index === 0;
            while (index < length) {
              ch = source.charCodeAt(index);
              if (isWhiteSpace(ch)) {
                ++index;
              } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
                  ++index;
                }
                ++lineNumber;
                lineStart = index;
                start = true;
              } else if (ch === 0x2F) {
                // U+002F is '/'
                ch = source.charCodeAt(index + 1);
                if (ch === 0x2F) {
                  ++index;
                  ++index;
                  skipSingleLineComment(2);
                  start = true;
                } else if (ch === 0x2A) {
                  // U+002A is '*'
                  ++index;
                  ++index;
                  skipMultiLineComment();
                } else {
                  break;
                }
              } else if (start && ch === 0x2D) {
                // U+002D is '-'
                // U+003E is '>'
                if (source.charCodeAt(index + 1) === 0x2D && source.charCodeAt(index + 2) === 0x3E) {
                  // '-->' is a single-line comment
                  index += 3;
                  skipSingleLineComment(3);
                } else {
                  break;
                }
              } else if (ch === 0x3C) {
                // U+003C is '<'
                if (source.slice(index + 1, index + 4) === '!--') {
                  ++index; // `<`
                  ++index; // `!`
                  ++index; // `-`
                  ++index; // `-`
                  skipSingleLineComment(4);
                } else {
                  break;
                }
              } else {
                break;
              }
            }
          }
          function scanHexEscape(prefix) {
            var i,
              len,
              ch,
              code = 0;
            len = prefix === 'u' ? 4 : 2;
            for (i = 0; i < len; ++i) {
              if (index < length && isHexDigit(source[index])) {
                ch = source[index++];
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
              } else {
                return '';
              }
            }
            return String.fromCharCode(code);
          }
          function getEscapedIdentifier() {
            var ch, id;
            ch = source.charCodeAt(index++);
            id = String.fromCharCode(ch);

            // '\u' (U+005C, U+0075) denotes an escaped character.
            if (ch === 0x5C) {
              if (source.charCodeAt(index) !== 0x75) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
              ++index;
              ch = scanHexEscape('u');
              if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
              id = ch;
            }
            while (index < length) {
              ch = source.charCodeAt(index);
              if (!isIdentifierPart(ch)) {
                break;
              }
              ++index;
              id += String.fromCharCode(ch);

              // '\u' (U+005C, U+0075) denotes an escaped character.
              if (ch === 0x5C) {
                id = id.substr(0, id.length - 1);
                if (source.charCodeAt(index) !== 0x75) {
                  throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++index;
                ch = scanHexEscape('u');
                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                  throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                id += ch;
              }
            }
            return id;
          }
          function getIdentifier() {
            var start, ch;
            start = index++;
            while (index < length) {
              ch = source.charCodeAt(index);
              if (ch === 0x5C) {
                // Blackslash (U+005C) marks Unicode escape sequence.
                index = start;
                return getEscapedIdentifier();
              }
              if (isIdentifierPart(ch)) {
                ++index;
              } else {
                break;
              }
            }
            return source.slice(start, index);
          }
          function scanIdentifier() {
            var start, id, type;
            start = index;

            // Backslash (U+005C) starts an escaped character.
            id = source.charCodeAt(index) === 0x5C ? getEscapedIdentifier() : getIdentifier();

            // There is no keyword or literal with only one character.
            // Thus, it must be an identifier.
            if (id.length === 1) {
              type = Token.Identifier;
            } else if (isKeyword(id)) {
              type = Token.Keyword;
            } else if (id === 'null') {
              type = Token.NullLiteral;
            } else if (id === 'true' || id === 'false') {
              type = Token.BooleanLiteral;
            } else {
              type = Token.Identifier;
            }
            return {
              type: type,
              value: id,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }

          // 7.7 Punctuators

          function scanPunctuator() {
            var start = index,
              code = source.charCodeAt(index),
              code2,
              ch1 = source[index],
              ch2,
              ch3,
              ch4;
            switch (code) {
              // Check for most common single-character punctuators.
              case 0x2E: // . dot
              case 0x28: // ( open bracket
              case 0x29: // ) close bracket
              case 0x3B: // ; semicolon
              case 0x2C: // , comma
              case 0x7B: // { open curly brace
              case 0x7D: // } close curly brace
              case 0x5B: // [
              case 0x5D: // ]
              case 0x3A: // :
              case 0x3F: // ?
              case 0x7E:
                // ~
                ++index;
                if (extra.tokenize) {
                  if (code === 0x28) {
                    extra.openParenToken = extra.tokens.length;
                  } else if (code === 0x7B) {
                    extra.openCurlyToken = extra.tokens.length;
                  }
                }
                return {
                  type: Token.Punctuator,
                  value: String.fromCharCode(code),
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              default:
                code2 = source.charCodeAt(index + 1);

                // '=' (U+003D) marks an assignment or comparison operator.
                if (code2 === 0x3D) {
                  switch (code) {
                    case 0x2B: // +
                    case 0x2D: // -
                    case 0x2F: // /
                    case 0x3C: // <
                    case 0x3E: // >
                    case 0x5E: // ^
                    case 0x7C: // |
                    case 0x25: // %
                    case 0x26: // &
                    case 0x2A:
                      // *
                      index += 2;
                      return {
                        type: Token.Punctuator,
                        value: String.fromCharCode(code) + String.fromCharCode(code2),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        start: start,
                        end: index
                      };
                    case 0x21: // !
                    case 0x3D:
                      // =
                      index += 2;

                      // !== and ===
                      if (source.charCodeAt(index) === 0x3D) {
                        ++index;
                      }
                      return {
                        type: Token.Punctuator,
                        value: source.slice(start, index),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        start: start,
                        end: index
                      };
                  }
                }
            }

            // 4-character punctuator: >>>=

            ch4 = source.substr(index, 4);
            if (ch4 === '>>>=') {
              index += 4;
              return {
                type: Token.Punctuator,
                value: ch4,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            }

            // 3-character punctuators: === !== >>> <<= >>=

            ch3 = ch4.substr(0, 3);
            if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
              index += 3;
              return {
                type: Token.Punctuator,
                value: ch3,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            }

            // Other 2-character punctuators: ++ -- << >> && ||
            ch2 = ch3.substr(0, 2);
            if (ch1 === ch2[1] && '+-<>&|'.indexOf(ch1) >= 0 || ch2 === '=>') {
              index += 2;
              return {
                type: Token.Punctuator,
                value: ch2,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            }

            // 1-character punctuators: < > = ! + - * % & | ^ /
            if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
              ++index;
              return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            }
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }

          // 7.8.3 Numeric Literals

          function scanHexLiteral(start) {
            var number = '';
            while (index < length) {
              if (!isHexDigit(source[index])) {
                break;
              }
              number += source[index++];
            }
            if (number.length === 0) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            if (isIdentifierStart(source.charCodeAt(index))) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt('0x' + number, 16),
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }
          function scanOctalLiteral(start) {
            var number = '0' + source[index++];
            while (index < length) {
              if (!isOctalDigit(source[index])) {
                break;
              }
              number += source[index++];
            }
            if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt(number, 8),
              octal: true,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }
          function isImplicitOctalLiteral() {
            var i, ch;

            // Implicit octal, unless there is a non-octal digit.
            // (Annex B.1.1 on Numeric Literals)
            for (i = index + 1; i < length; ++i) {
              ch = source[i];
              if (ch === '8' || ch === '9') {
                return false;
              }
              if (!isOctalDigit(ch)) {
                return true;
              }
            }
            return true;
          }
          function scanNumericLiteral() {
            var number, start, ch;
            ch = source[index];
            assert(isDecimalDigit(ch.charCodeAt(0)) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');
            start = index;
            number = '';
            if (ch !== '.') {
              number = source[index++];
              ch = source[index];

              // Hex number starts with '0x'.
              // Octal number starts with '0'.
              if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                  ++index;
                  return scanHexLiteral(start);
                }
                if (isOctalDigit(ch)) {
                  if (isImplicitOctalLiteral()) {
                    return scanOctalLiteral(start);
                  }
                }
              }
              while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
              }
              ch = source[index];
            }
            if (ch === '.') {
              number += source[index++];
              while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
              }
              ch = source[index];
            }
            if (ch === 'e' || ch === 'E') {
              number += source[index++];
              ch = source[index];
              if (ch === '+' || ch === '-') {
                number += source[index++];
              }
              if (isDecimalDigit(source.charCodeAt(index))) {
                while (isDecimalDigit(source.charCodeAt(index))) {
                  number += source[index++];
                }
              } else {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            if (isIdentifierStart(source.charCodeAt(index))) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
              type: Token.NumericLiteral,
              value: parseFloat(number),
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }

          // 7.8.4 String Literals

          function scanStringLiteral() {
            var str = '',
              quote,
              start,
              ch,
              code,
              unescaped,
              restore,
              octal = false,
              startLineNumber,
              startLineStart;
            startLineNumber = lineNumber;
            startLineStart = lineStart;
            quote = source[index];
            assert(quote === '\'' || quote === '"', 'String literal must starts with a quote');
            start = index;
            ++index;
            while (index < length) {
              ch = source[index++];
              if (ch === quote) {
                quote = '';
                break;
              } else if (ch === '\\') {
                ch = source[index++];
                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                  switch (ch) {
                    case 'u':
                    case 'x':
                      restore = index;
                      unescaped = scanHexEscape(ch);
                      if (unescaped) {
                        str += unescaped;
                      } else {
                        index = restore;
                        str += ch;
                      }
                      break;
                    case 'n':
                      str += '\n';
                      break;
                    case 'r':
                      str += '\r';
                      break;
                    case 't':
                      str += '\t';
                      break;
                    case 'b':
                      str += '\b';
                      break;
                    case 'f':
                      str += '\f';
                      break;
                    case 'v':
                      str += '\x0B';
                      break;
                    default:
                      if (isOctalDigit(ch)) {
                        code = '01234567'.indexOf(ch);

                        // \0 is not octal escape sequence
                        if (code !== 0) {
                          octal = true;
                        }
                        if (index < length && isOctalDigit(source[index])) {
                          octal = true;
                          code = code * 8 + '01234567'.indexOf(source[index++]);

                          // 3 digits are only allowed when string starts
                          // with 0, 1, 2, 3
                          if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                            code = code * 8 + '01234567'.indexOf(source[index++]);
                          }
                        }
                        str += String.fromCharCode(code);
                      } else {
                        str += ch;
                      }
                      break;
                  }
                } else {
                  ++lineNumber;
                  if (ch === '\r' && source[index] === '\n') {
                    ++index;
                  }
                  lineStart = index;
                }
              } else if (isLineTerminator(ch.charCodeAt(0))) {
                break;
              } else {
                str += ch;
              }
            }
            if (quote !== '') {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
              type: Token.StringLiteral,
              value: str,
              octal: octal,
              startLineNumber: startLineNumber,
              startLineStart: startLineStart,
              lineNumber: lineNumber,
              lineStart: lineStart,
              start: start,
              end: index
            };
          }
          function testRegExp(pattern, flags) {
            var value;
            try {
              value = new RegExp(pattern, flags);
            } catch (e) {
              throwError({}, Messages.InvalidRegExp);
            }
            return value;
          }
          function scanRegExpBody() {
            var ch, str, classMarker, terminated, body;
            ch = source[index];
            assert(ch === '/', 'Regular expression literal must start with a slash');
            str = source[index++];
            classMarker = false;
            terminated = false;
            while (index < length) {
              ch = source[index++];
              str += ch;
              if (ch === '\\') {
                ch = source[index++];
                // ECMA-262 7.8.5
                if (isLineTerminator(ch.charCodeAt(0))) {
                  throwError({}, Messages.UnterminatedRegExp);
                }
                str += ch;
              } else if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
              } else if (classMarker) {
                if (ch === ']') {
                  classMarker = false;
                }
              } else {
                if (ch === '/') {
                  terminated = true;
                  break;
                } else if (ch === '[') {
                  classMarker = true;
                }
              }
            }
            if (!terminated) {
              throwError({}, Messages.UnterminatedRegExp);
            }

            // Exclude leading and trailing slash.
            body = str.substr(1, str.length - 2);
            return {
              value: body,
              literal: str
            };
          }
          function scanRegExpFlags() {
            var ch, str, flags, restore;
            str = '';
            flags = '';
            while (index < length) {
              ch = source[index];
              if (!isIdentifierPart(ch.charCodeAt(0))) {
                break;
              }
              ++index;
              if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                  ++index;
                  restore = index;
                  ch = scanHexEscape('u');
                  if (ch) {
                    flags += ch;
                    for (str += "\\u"; restore < index; ++restore) {
                      str += source[restore];
                    }
                  } else {
                    index = restore;
                    flags += 'u';
                    str += "\\u";
                  }
                  throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
                } else {
                  str += '\\';
                  throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
              } else {
                flags += ch;
                str += ch;
              }
            }
            return {
              value: flags,
              literal: str
            };
          }
          function scanRegExp() {
            var start, body, flags, pattern, value;
            lookahead = null;
            skipComment();
            start = index;
            body = scanRegExpBody();
            flags = scanRegExpFlags();
            value = testRegExp(body.value, flags.value);
            if (extra.tokenize) {
              return {
                type: Token.RegularExpression,
                value: value,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            }
            return {
              literal: body.literal + flags.literal,
              value: value,
              start: start,
              end: index
            };
          }
          function collectRegex() {
            var pos, loc, regex, token;
            skipComment();
            pos = index;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart
              }
            };
            regex = scanRegExp();
            loc.end = {
              line: lineNumber,
              column: index - lineStart
            };

            /* istanbul ignore next */
            if (!extra.tokenize) {
              // Pop the previous token, which is likely '/' or '/='
              if (extra.tokens.length > 0) {
                token = extra.tokens[extra.tokens.length - 1];
                if (token.range[0] === pos && token.type === 'Punctuator') {
                  if (token.value === '/' || token.value === '/=') {
                    extra.tokens.pop();
                  }
                }
              }
              extra.tokens.push({
                type: 'RegularExpression',
                value: regex.literal,
                range: [pos, index],
                loc: loc
              });
            }
            return regex;
          }
          function isIdentifierName(token) {
            return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
          }
          function advanceSlash() {
            var prevToken, checkToken;
            // Using the following algorithm:
            // https://github.com/mozilla/sweet.js/wiki/design
            prevToken = extra.tokens[extra.tokens.length - 1];
            if (!prevToken) {
              // Nothing before that: it cannot be a division.
              return collectRegex();
            }
            if (prevToken.type === 'Punctuator') {
              if (prevToken.value === ']') {
                return scanPunctuator();
              }
              if (prevToken.value === ')') {
                checkToken = extra.tokens[extra.openParenToken - 1];
                if (checkToken && checkToken.type === 'Keyword' && (checkToken.value === 'if' || checkToken.value === 'while' || checkToken.value === 'for' || checkToken.value === 'with')) {
                  return collectRegex();
                }
                return scanPunctuator();
              }
              if (prevToken.value === '}') {
                // Dividing a function by anything makes little sense,
                // but we have to check for that.
                if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
                  // Anonymous function.
                  checkToken = extra.tokens[extra.openCurlyToken - 4];
                  if (!checkToken) {
                    return scanPunctuator();
                  }
                } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
                  // Named function.
                  checkToken = extra.tokens[extra.openCurlyToken - 5];
                  if (!checkToken) {
                    return collectRegex();
                  }
                } else {
                  return scanPunctuator();
                }
                // checkToken determines whether the function is
                // a declaration or an expression.
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                  // It is an expression.
                  return scanPunctuator();
                }
                // It is a declaration.
                return collectRegex();
              }
              return collectRegex();
            }
            if (prevToken.type === 'Keyword' && prevToken.value !== 'this') {
              return collectRegex();
            }
            return scanPunctuator();
          }
          function advance() {
            var ch;
            skipComment();
            if (index >= length) {
              return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: index,
                end: index
              };
            }
            ch = source.charCodeAt(index);
            if (isIdentifierStart(ch)) {
              return scanIdentifier();
            }

            // Very common: ( and ) and ;
            if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
              return scanPunctuator();
            }

            // String literal starts with single quote (U+0027) or double quote (U+0022).
            if (ch === 0x27 || ch === 0x22) {
              return scanStringLiteral();
            }

            // Dot (.) U+002E can also start a floating-point number, hence the need
            // to check the next character.
            if (ch === 0x2E) {
              if (isDecimalDigit(source.charCodeAt(index + 1))) {
                return scanNumericLiteral();
              }
              return scanPunctuator();
            }
            if (isDecimalDigit(ch)) {
              return scanNumericLiteral();
            }

            // Slash (/) U+002F can also start a regex.
            if (extra.tokenize && ch === 0x2F) {
              return advanceSlash();
            }
            return scanPunctuator();
          }
          function collectToken() {
            var loc, token, range, value;
            skipComment();
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart
              }
            };
            token = advance();
            loc.end = {
              line: lineNumber,
              column: index - lineStart
            };
            if (token.type !== Token.EOF) {
              value = source.slice(token.start, token.end);
              extra.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: [token.start, token.end],
                loc: loc
              });
            }
            return token;
          }
          function lex() {
            var token;
            token = lookahead;
            index = token.end;
            lineNumber = token.lineNumber;
            lineStart = token.lineStart;
            lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
            index = token.end;
            lineNumber = token.lineNumber;
            lineStart = token.lineStart;
            return token;
          }
          function peek() {
            var pos, line, start;
            pos = index;
            line = lineNumber;
            start = lineStart;
            lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
            index = pos;
            lineNumber = line;
            lineStart = start;
          }
          function Position(line, column) {
            this.line = line;
            this.column = column;
          }
          function SourceLocation(startLine, startColumn, line, column) {
            this.start = new Position(startLine, startColumn);
            this.end = new Position(line, column);
          }
          SyntaxTreeDelegate = {
            name: 'SyntaxTree',
            processComment: function processComment(node) {
              var lastChild, trailingComments;
              if (node.type === Syntax.Program) {
                if (node.body.length > 0) {
                  return;
                }
              }
              if (extra.trailingComments.length > 0) {
                if (extra.trailingComments[0].range[0] >= node.range[1]) {
                  trailingComments = extra.trailingComments;
                  extra.trailingComments = [];
                } else {
                  extra.trailingComments.length = 0;
                }
              } else {
                if (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                  trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                  delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                }
              }

              // Eating the stack.
              while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
                lastChild = extra.bottomRightStack.pop();
              }
              if (lastChild) {
                if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                  node.leadingComments = lastChild.leadingComments;
                  delete lastChild.leadingComments;
                }
              } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = extra.leadingComments;
                extra.leadingComments = [];
              }
              if (trailingComments) {
                node.trailingComments = trailingComments;
              }
              extra.bottomRightStack.push(node);
            },
            markEnd: function markEnd(node, startToken) {
              if (extra.range) {
                node.range = [startToken.start, index];
              }
              if (extra.loc) {
                node.loc = new SourceLocation(startToken.startLineNumber === undefined ? startToken.lineNumber : startToken.startLineNumber, startToken.start - (startToken.startLineStart === undefined ? startToken.lineStart : startToken.startLineStart), lineNumber, index - lineStart);
                this.postProcess(node);
              }
              if (extra.attachComment) {
                this.processComment(node);
              }
              return node;
            },
            postProcess: function postProcess(node) {
              if (extra.source) {
                node.loc.source = extra.source;
              }
              return node;
            },
            createArrayExpression: function createArrayExpression(elements) {
              return {
                type: Syntax.ArrayExpression,
                elements: elements
              };
            },
            createAssignmentExpression: function createAssignmentExpression(operator, left, right) {
              return {
                type: Syntax.AssignmentExpression,
                operator: operator,
                left: left,
                right: right
              };
            },
            createBinaryExpression: function createBinaryExpression(operator, left, right) {
              var type = operator === '||' || operator === '&&' ? Syntax.LogicalExpression : Syntax.BinaryExpression;
              return {
                type: type,
                operator: operator,
                left: left,
                right: right
              };
            },
            createBlockStatement: function createBlockStatement(body) {
              return {
                type: Syntax.BlockStatement,
                body: body
              };
            },
            createBreakStatement: function createBreakStatement(label) {
              return {
                type: Syntax.BreakStatement,
                label: label
              };
            },
            createCallExpression: function createCallExpression(callee, args) {
              return {
                type: Syntax.CallExpression,
                callee: callee,
                'arguments': args
              };
            },
            createCatchClause: function createCatchClause(param, body) {
              return {
                type: Syntax.CatchClause,
                param: param,
                body: body
              };
            },
            createConditionalExpression: function createConditionalExpression(test, consequent, alternate) {
              return {
                type: Syntax.ConditionalExpression,
                test: test,
                consequent: consequent,
                alternate: alternate
              };
            },
            createContinueStatement: function createContinueStatement(label) {
              return {
                type: Syntax.ContinueStatement,
                label: label
              };
            },
            createDebuggerStatement: function createDebuggerStatement() {
              return {
                type: Syntax.DebuggerStatement
              };
            },
            createDoWhileStatement: function createDoWhileStatement(body, test) {
              return {
                type: Syntax.DoWhileStatement,
                body: body,
                test: test
              };
            },
            createEmptyStatement: function createEmptyStatement() {
              return {
                type: Syntax.EmptyStatement
              };
            },
            createExpressionStatement: function createExpressionStatement(expression) {
              return {
                type: Syntax.ExpressionStatement,
                expression: expression
              };
            },
            createForStatement: function createForStatement(init, test, update, body) {
              return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
              };
            },
            createForInStatement: function createForInStatement(left, right, body) {
              return {
                type: Syntax.ForInStatement,
                left: left,
                right: right,
                body: body,
                each: false
              };
            },
            createFunctionDeclaration: function createFunctionDeclaration(id, params, defaults, body) {
              return {
                type: Syntax.FunctionDeclaration,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
              };
            },
            createFunctionExpression: function createFunctionExpression(id, params, defaults, body) {
              return {
                type: Syntax.FunctionExpression,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
              };
            },
            createIdentifier: function createIdentifier(name) {
              return {
                type: Syntax.Identifier,
                name: name
              };
            },
            createIfStatement: function createIfStatement(test, consequent, alternate) {
              return {
                type: Syntax.IfStatement,
                test: test,
                consequent: consequent,
                alternate: alternate
              };
            },
            createLabeledStatement: function createLabeledStatement(label, body) {
              return {
                type: Syntax.LabeledStatement,
                label: label,
                body: body
              };
            },
            createLiteral: function createLiteral(token) {
              return {
                type: Syntax.Literal,
                value: token.value,
                raw: source.slice(token.start, token.end)
              };
            },
            createMemberExpression: function createMemberExpression(accessor, object, property) {
              return {
                type: Syntax.MemberExpression,
                computed: accessor === '[',
                object: object,
                property: property
              };
            },
            createNewExpression: function createNewExpression(callee, args) {
              return {
                type: Syntax.NewExpression,
                callee: callee,
                'arguments': args
              };
            },
            createObjectExpression: function createObjectExpression(properties) {
              return {
                type: Syntax.ObjectExpression,
                properties: properties
              };
            },
            createPostfixExpression: function createPostfixExpression(operator, argument) {
              return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: false
              };
            },
            createProgram: function createProgram(body) {
              return {
                type: Syntax.Program,
                body: body
              };
            },
            createProperty: function createProperty(kind, key, value) {
              return {
                type: Syntax.Property,
                key: key,
                value: value,
                kind: kind
              };
            },
            createReturnStatement: function createReturnStatement(argument) {
              return {
                type: Syntax.ReturnStatement,
                argument: argument
              };
            },
            createSequenceExpression: function createSequenceExpression(expressions) {
              return {
                type: Syntax.SequenceExpression,
                expressions: expressions
              };
            },
            createSwitchCase: function createSwitchCase(test, consequent) {
              return {
                type: Syntax.SwitchCase,
                test: test,
                consequent: consequent
              };
            },
            createSwitchStatement: function createSwitchStatement(discriminant, cases) {
              return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant,
                cases: cases
              };
            },
            createThisExpression: function createThisExpression() {
              return {
                type: Syntax.ThisExpression
              };
            },
            createThrowStatement: function createThrowStatement(argument) {
              return {
                type: Syntax.ThrowStatement,
                argument: argument
              };
            },
            createTryStatement: function createTryStatement(block, guardedHandlers, handlers, finalizer) {
              return {
                type: Syntax.TryStatement,
                block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer
              };
            },
            createUnaryExpression: function createUnaryExpression(operator, argument) {
              if (operator === '++' || operator === '--') {
                return {
                  type: Syntax.UpdateExpression,
                  operator: operator,
                  argument: argument,
                  prefix: true
                };
              }
              return {
                type: Syntax.UnaryExpression,
                operator: operator,
                argument: argument,
                prefix: true
              };
            },
            createVariableDeclaration: function createVariableDeclaration(declarations, kind) {
              return {
                type: Syntax.VariableDeclaration,
                declarations: declarations,
                kind: kind
              };
            },
            createVariableDeclarator: function createVariableDeclarator(id, init) {
              return {
                type: Syntax.VariableDeclarator,
                id: id,
                init: init
              };
            },
            createWhileStatement: function createWhileStatement(test, body) {
              return {
                type: Syntax.WhileStatement,
                test: test,
                body: body
              };
            },
            createWithStatement: function createWithStatement(object, body) {
              return {
                type: Syntax.WithStatement,
                object: object,
                body: body
              };
            }
          };

          // Return true if there is a line terminator before the next token.

          function peekLineTerminator() {
            var pos, line, start, found;
            pos = index;
            line = lineNumber;
            start = lineStart;
            skipComment();
            found = lineNumber !== line;
            index = pos;
            lineNumber = line;
            lineStart = start;
            return found;
          }

          // Throw an exception

          function throwError(token, messageFormat) {
            var error,
              args = Array.prototype.slice.call(arguments, 2),
              msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
                assert(index < args.length, 'Message reference must be in range');
                return args[index];
              });
            if (typeof token.lineNumber === 'number') {
              error = new Error('Line ' + token.lineNumber + ': ' + msg);
              error.index = token.start;
              error.lineNumber = token.lineNumber;
              error.column = token.start - lineStart + 1;
            } else {
              error = new Error('Line ' + lineNumber + ': ' + msg);
              error.index = index;
              error.lineNumber = lineNumber;
              error.column = index - lineStart + 1;
            }
            error.description = msg;
            throw error;
          }
          function throwErrorTolerant() {
            try {
              throwError.apply(null, arguments);
            } catch (e) {
              if (extra.errors) {
                extra.errors.push(e);
              } else {
                throw e;
              }
            }
          }

          // Throw an exception because of the token.

          function throwUnexpected(token) {
            if (token.type === Token.EOF) {
              throwError(token, Messages.UnexpectedEOS);
            }
            if (token.type === Token.NumericLiteral) {
              throwError(token, Messages.UnexpectedNumber);
            }
            if (token.type === Token.StringLiteral) {
              throwError(token, Messages.UnexpectedString);
            }
            if (token.type === Token.Identifier) {
              throwError(token, Messages.UnexpectedIdentifier);
            }
            if (token.type === Token.Keyword) {
              if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
              } else if (strict && isStrictModeReservedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
              }
              throwError(token, Messages.UnexpectedToken, token.value);
            }

            // BooleanLiteral, NullLiteral, or Punctuator.
            throwError(token, Messages.UnexpectedToken, token.value);
          }

          // Expect the next token to match the specified punctuator.
          // If not, an exception will be thrown.

          function expect(value) {
            var token = lex();
            if (token.type !== Token.Punctuator || token.value !== value) {
              throwUnexpected(token);
            }
          }

          // Expect the next token to match the specified keyword.
          // If not, an exception will be thrown.

          function expectKeyword(keyword) {
            var token = lex();
            if (token.type !== Token.Keyword || token.value !== keyword) {
              throwUnexpected(token);
            }
          }

          // Return true if the next token matches the specified punctuator.

          function match(value) {
            return lookahead.type === Token.Punctuator && lookahead.value === value;
          }

          // Return true if the next token matches the specified keyword

          function matchKeyword(keyword) {
            return lookahead.type === Token.Keyword && lookahead.value === keyword;
          }

          // Return true if the next token is an assignment operator

          function matchAssign() {
            var op;
            if (lookahead.type !== Token.Punctuator) {
              return false;
            }
            op = lookahead.value;
            return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
          }
          function consumeSemicolon() {
            var line,
              oldIndex = index,
              oldLineNumber = lineNumber,
              oldLineStart = lineStart,
              oldLookahead = lookahead;

            // Catch the very common case first: immediately a semicolon (U+003B).
            if (source.charCodeAt(index) === 0x3B || match(';')) {
              lex();
              return;
            }
            line = lineNumber;
            skipComment();
            if (lineNumber !== line) {
              index = oldIndex;
              lineNumber = oldLineNumber;
              lineStart = oldLineStart;
              lookahead = oldLookahead;
              return;
            }
            if (lookahead.type !== Token.EOF && !match('}')) {
              throwUnexpected(lookahead);
            }
          }

          // Return true if provided expression is LeftHandSideExpression

          function isLeftHandSide(expr) {
            return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
          }

          // 11.1.4 Array Initialiser

          function parseArrayInitialiser() {
            var elements = [],
              startToken;
            startToken = lookahead;
            expect('[');
            while (!match(']')) {
              if (match(',')) {
                lex();
                elements.push(null);
              } else {
                elements.push(parseAssignmentExpression());
                if (!match(']')) {
                  expect(',');
                }
              }
            }
            lex();
            return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
          }

          // 11.1.5 Object Initialiser

          function parsePropertyFunction(param, first) {
            var previousStrict, body, startToken;
            previousStrict = strict;
            startToken = lookahead;
            body = parseFunctionSourceElements();
            if (first && strict && isRestrictedWord(param[0].name)) {
              throwErrorTolerant(first, Messages.StrictParamName);
            }
            strict = previousStrict;
            return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
          }
          function parseObjectPropertyKey() {
            var token, startToken;
            startToken = lookahead;
            token = lex();

            // Note: This function is called only from parseObjectProperty(), where
            // EOF and Punctuator tokens are already filtered out.

            if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
              if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
              }
              return delegate.markEnd(delegate.createLiteral(token), startToken);
            }
            return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
          }
          function parseObjectProperty() {
            var token, key, id, value, param, startToken;
            token = lookahead;
            startToken = lookahead;
            if (token.type === Token.Identifier) {
              id = parseObjectPropertyKey();

              // Property Assignment: Getter and Setter.

              if (token.value === 'get' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                value = parsePropertyFunction([]);
                return delegate.markEnd(delegate.createProperty('get', key, value), startToken);
              }
              if (token.value === 'set' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead;
                if (token.type !== Token.Identifier) {
                  expect(')');
                  throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                  value = parsePropertyFunction([]);
                } else {
                  param = [parseVariableIdentifier()];
                  expect(')');
                  value = parsePropertyFunction(param, token);
                }
                return delegate.markEnd(delegate.createProperty('set', key, value), startToken);
              }
              expect(':');
              value = parseAssignmentExpression();
              return delegate.markEnd(delegate.createProperty('init', id, value), startToken);
            }
            if (token.type === Token.EOF || token.type === Token.Punctuator) {
              throwUnexpected(token);
            } else {
              key = parseObjectPropertyKey();
              expect(':');
              value = parseAssignmentExpression();
              return delegate.markEnd(delegate.createProperty('init', key, value), startToken);
            }
          }
          function parseObjectInitialiser() {
            var properties = [],
              property,
              name,
              key,
              kind,
              map = {},
              toString = String,
              startToken;
            startToken = lookahead;
            expect('{');
            while (!match('}')) {
              property = parseObjectProperty();
              if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
              } else {
                name = toString(property.key.value);
              }
              kind = property.kind === 'init' ? PropertyKind.Data : property.kind === 'get' ? PropertyKind.Get : PropertyKind.Set;
              key = '$' + name;
              if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (map[key] === PropertyKind.Data) {
                  if (strict && kind === PropertyKind.Data) {
                    throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                  } else if (kind !== PropertyKind.Data) {
                    throwErrorTolerant({}, Messages.AccessorDataProperty);
                  }
                } else {
                  if (kind === PropertyKind.Data) {
                    throwErrorTolerant({}, Messages.AccessorDataProperty);
                  } else if (map[key] & kind) {
                    throwErrorTolerant({}, Messages.AccessorGetSet);
                  }
                }
                map[key] |= kind;
              } else {
                map[key] = kind;
              }
              properties.push(property);
              if (!match('}')) {
                expect(',');
              }
            }
            expect('}');
            return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
          }

          // 11.1.6 The Grouping Operator

          function parseGroupExpression() {
            var expr;
            expect('(');
            expr = parseExpression();
            expect(')');
            return expr;
          }

          // 11.1 Primary Expressions

          function parsePrimaryExpression() {
            var type, token, expr, startToken;
            if (match('(')) {
              return parseGroupExpression();
            }
            if (match('[')) {
              return parseArrayInitialiser();
            }
            if (match('{')) {
              return parseObjectInitialiser();
            }
            type = lookahead.type;
            startToken = lookahead;
            if (type === Token.Identifier) {
              expr = delegate.createIdentifier(lex().value);
            } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
              if (strict && lookahead.octal) {
                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
              }
              expr = delegate.createLiteral(lex());
            } else if (type === Token.Keyword) {
              if (matchKeyword('function')) {
                return parseFunctionExpression();
              }
              if (matchKeyword('this')) {
                lex();
                expr = delegate.createThisExpression();
              } else {
                throwUnexpected(lex());
              }
            } else if (type === Token.BooleanLiteral) {
              token = lex();
              token.value = token.value === 'true';
              expr = delegate.createLiteral(token);
            } else if (type === Token.NullLiteral) {
              token = lex();
              token.value = null;
              expr = delegate.createLiteral(token);
            } else if (match('/') || match('/=')) {
              if (typeof extra.tokens !== 'undefined') {
                expr = delegate.createLiteral(collectRegex());
              } else {
                expr = delegate.createLiteral(scanRegExp());
              }
              peek();
            } else {
              throwUnexpected(lex());
            }
            return delegate.markEnd(expr, startToken);
          }

          // 11.2 Left-Hand-Side Expressions

          function parseArguments() {
            var args = [];
            expect('(');
            if (!match(')')) {
              while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                  break;
                }
                expect(',');
              }
            }
            expect(')');
            return args;
          }
          function parseNonComputedProperty() {
            var token, startToken;
            startToken = lookahead;
            token = lex();
            if (!isIdentifierName(token)) {
              throwUnexpected(token);
            }
            return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
          }
          function parseNonComputedMember() {
            expect('.');
            return parseNonComputedProperty();
          }
          function parseComputedMember() {
            var expr;
            expect('[');
            expr = parseExpression();
            expect(']');
            return expr;
          }
          function parseNewExpression() {
            var callee, args, startToken;
            startToken = lookahead;
            expectKeyword('new');
            callee = parseLeftHandSideExpression();
            args = match('(') ? parseArguments() : [];
            return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
          }
          function parseLeftHandSideExpressionAllowCall() {
            var expr,
              args,
              property,
              startToken,
              previousAllowIn = state.allowIn;
            startToken = lookahead;
            state.allowIn = true;
            expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
            for (;;) {
              if (match('.')) {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
              } else if (match('(')) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
              } else if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
              } else {
                break;
              }
              delegate.markEnd(expr, startToken);
            }
            state.allowIn = previousAllowIn;
            return expr;
          }
          function parseLeftHandSideExpression() {
            var expr, property, startToken;
            assert(state.allowIn, 'callee of new expression always allow in keyword.');
            startToken = lookahead;
            expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
            while (match('.') || match('[')) {
              if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
              } else {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
              }
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }

          // 11.3 Postfix Expressions

          function parsePostfixExpression() {
            var expr,
              token,
              startToken = lookahead;
            expr = parseLeftHandSideExpressionAllowCall();
            if (lookahead.type === Token.Punctuator) {
              if ((match('++') || match('--')) && !peekLineTerminator()) {
                // 11.3.1, 11.3.2
                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                  throwErrorTolerant({}, Messages.StrictLHSPostfix);
                }
                if (!isLeftHandSide(expr)) {
                  throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
                }
                token = lex();
                expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
              }
            }
            return expr;
          }

          // 11.4 Unary Operators

          function parseUnaryExpression() {
            var token, expr, startToken;
            if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
              expr = parsePostfixExpression();
            } else if (match('++') || match('--')) {
              startToken = lookahead;
              token = lex();
              expr = parseUnaryExpression();
              // 11.4.4, 11.4.5
              if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPrefix);
              }
              if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
              }
              expr = delegate.createUnaryExpression(token.value, expr);
              expr = delegate.markEnd(expr, startToken);
            } else if (match('+') || match('-') || match('~') || match('!')) {
              startToken = lookahead;
              token = lex();
              expr = parseUnaryExpression();
              expr = delegate.createUnaryExpression(token.value, expr);
              expr = delegate.markEnd(expr, startToken);
            } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
              startToken = lookahead;
              token = lex();
              expr = parseUnaryExpression();
              expr = delegate.createUnaryExpression(token.value, expr);
              expr = delegate.markEnd(expr, startToken);
              if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
              }
            } else {
              expr = parsePostfixExpression();
            }
            return expr;
          }
          function binaryPrecedence(token, allowIn) {
            var prec = 0;
            if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
              return 0;
            }
            switch (token.value) {
              case '||':
                prec = 1;
                break;
              case '&&':
                prec = 2;
                break;
              case '|':
                prec = 3;
                break;
              case '^':
                prec = 4;
                break;
              case '&':
                prec = 5;
                break;
              case '==':
              case '!=':
              case '===':
              case '!==':
                prec = 6;
                break;
              case '<':
              case '>':
              case '<=':
              case '>=':
              case 'instanceof':
                prec = 7;
                break;
              case 'in':
                prec = allowIn ? 7 : 0;
                break;
              case '<<':
              case '>>':
              case '>>>':
                prec = 8;
                break;
              case '+':
              case '-':
                prec = 9;
                break;
              case '*':
              case '/':
              case '%':
                prec = 11;
                break;
              default:
                break;
            }
            return prec;
          }

          // 11.5 Multiplicative Operators
          // 11.6 Additive Operators
          // 11.7 Bitwise Shift Operators
          // 11.8 Relational Operators
          // 11.9 Equality Operators
          // 11.10 Binary Bitwise Operators
          // 11.11 Binary Logical Operators

          function parseBinaryExpression() {
            var marker, markers, expr, token, prec, stack, right, operator, left, i;
            marker = lookahead;
            left = parseUnaryExpression();
            token = lookahead;
            prec = binaryPrecedence(token, state.allowIn);
            if (prec === 0) {
              return left;
            }
            token.prec = prec;
            lex();
            markers = [marker, lookahead];
            right = parseUnaryExpression();
            stack = [left, token, right];
            while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
              // Reduce: make a binary expression from the three topmost entries.
              while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
                right = stack.pop();
                operator = stack.pop().value;
                left = stack.pop();
                expr = delegate.createBinaryExpression(operator, left, right);
                markers.pop();
                marker = markers[markers.length - 1];
                delegate.markEnd(expr, marker);
                stack.push(expr);
              }

              // Shift.
              token = lex();
              token.prec = prec;
              stack.push(token);
              markers.push(lookahead);
              expr = parseUnaryExpression();
              stack.push(expr);
            }

            // Final reduce to clean-up the stack.
            i = stack.length - 1;
            expr = stack[i];
            markers.pop();
            while (i > 1) {
              expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
              i -= 2;
              marker = markers.pop();
              delegate.markEnd(expr, marker);
            }
            return expr;
          }

          // 11.12 Conditional Operator

          function parseConditionalExpression() {
            var expr, previousAllowIn, consequent, alternate, startToken;
            startToken = lookahead;
            expr = parseBinaryExpression();
            if (match('?')) {
              lex();
              previousAllowIn = state.allowIn;
              state.allowIn = true;
              consequent = parseAssignmentExpression();
              state.allowIn = previousAllowIn;
              expect(':');
              alternate = parseAssignmentExpression();
              expr = delegate.createConditionalExpression(expr, consequent, alternate);
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }

          // 11.13 Assignment Operators

          function parseAssignmentExpression() {
            var token, left, right, node, startToken;
            token = lookahead;
            startToken = lookahead;
            node = left = parseConditionalExpression();
            if (matchAssign()) {
              // LeftHandSideExpression
              if (!isLeftHandSide(left)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
              }

              // 11.13.1
              if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
                throwErrorTolerant(token, Messages.StrictLHSAssignment);
              }
              token = lex();
              right = parseAssignmentExpression();
              node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
            }
            return node;
          }

          // 11.14 Comma Operator

          function parseExpression() {
            var expr,
              startToken = lookahead;
            expr = parseAssignmentExpression();
            if (match(',')) {
              expr = delegate.createSequenceExpression([expr]);
              while (index < length) {
                if (!match(',')) {
                  break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
              }
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }

          // 12.1 Block

          function parseStatementList() {
            var list = [],
              statement;
            while (index < length) {
              if (match('}')) {
                break;
              }
              statement = parseSourceElement();
              if (typeof statement === 'undefined') {
                break;
              }
              list.push(statement);
            }
            return list;
          }
          function parseBlock() {
            var block, startToken;
            startToken = lookahead;
            expect('{');
            block = parseStatementList();
            expect('}');
            return delegate.markEnd(delegate.createBlockStatement(block), startToken);
          }

          // 12.2 Variable Statement

          function parseVariableIdentifier() {
            var token, startToken;
            startToken = lookahead;
            token = lex();
            if (token.type !== Token.Identifier) {
              throwUnexpected(token);
            }
            return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
          }
          function parseVariableDeclaration(kind) {
            var init = null,
              id,
              startToken;
            startToken = lookahead;
            id = parseVariableIdentifier();

            // 12.2.1
            if (strict && isRestrictedWord(id.name)) {
              throwErrorTolerant({}, Messages.StrictVarName);
            }
            if (kind === 'const') {
              expect('=');
              init = parseAssignmentExpression();
            } else if (match('=')) {
              lex();
              init = parseAssignmentExpression();
            }
            return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
          }
          function parseVariableDeclarationList(kind) {
            var list = [];
            do {
              list.push(parseVariableDeclaration(kind));
              if (!match(',')) {
                break;
              }
              lex();
            } while (index < length);
            return list;
          }
          function parseVariableStatement() {
            var declarations;
            expectKeyword('var');
            declarations = parseVariableDeclarationList();
            consumeSemicolon();
            return delegate.createVariableDeclaration(declarations, 'var');
          }

          // kind may be `const` or `let`
          // Both are experimental and not in the specification yet.
          // see http://wiki.ecmascript.org/doku.php?id=harmony:const
          // and http://wiki.ecmascript.org/doku.php?id=harmony:let
          function parseConstLetDeclaration(kind) {
            var declarations, startToken;
            startToken = lookahead;
            expectKeyword(kind);
            declarations = parseVariableDeclarationList(kind);
            consumeSemicolon();
            return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
          }

          // 12.3 Empty Statement

          function parseEmptyStatement() {
            expect(';');
            return delegate.createEmptyStatement();
          }

          // 12.4 Expression Statement

          function parseExpressionStatement() {
            var expr = parseExpression();
            consumeSemicolon();
            return delegate.createExpressionStatement(expr);
          }

          // 12.5 If statement

          function parseIfStatement() {
            var test, consequent, alternate;
            expectKeyword('if');
            expect('(');
            test = parseExpression();
            expect(')');
            consequent = parseStatement();
            if (matchKeyword('else')) {
              lex();
              alternate = parseStatement();
            } else {
              alternate = null;
            }
            return delegate.createIfStatement(test, consequent, alternate);
          }

          // 12.6 Iteration Statements

          function parseDoWhileStatement() {
            var body, test, oldInIteration;
            expectKeyword('do');
            oldInIteration = state.inIteration;
            state.inIteration = true;
            body = parseStatement();
            state.inIteration = oldInIteration;
            expectKeyword('while');
            expect('(');
            test = parseExpression();
            expect(')');
            if (match(';')) {
              lex();
            }
            return delegate.createDoWhileStatement(body, test);
          }
          function parseWhileStatement() {
            var test, body, oldInIteration;
            expectKeyword('while');
            expect('(');
            test = parseExpression();
            expect(')');
            oldInIteration = state.inIteration;
            state.inIteration = true;
            body = parseStatement();
            state.inIteration = oldInIteration;
            return delegate.createWhileStatement(test, body);
          }
          function parseForVariableDeclaration() {
            var token, declarations, startToken;
            startToken = lookahead;
            token = lex();
            declarations = parseVariableDeclarationList();
            return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
          }
          function parseForStatement() {
            var init,
              test,
              update,
              left,
              right,
              body,
              oldInIteration,
              previousAllowIn = state.allowIn;
            init = test = update = null;
            expectKeyword('for');
            expect('(');
            if (match(';')) {
              lex();
            } else {
              if (matchKeyword('var') || matchKeyword('let')) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = previousAllowIn;
                if (init.declarations.length === 1 && matchKeyword('in')) {
                  lex();
                  left = init;
                  right = parseExpression();
                  init = null;
                }
              } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = previousAllowIn;
                if (matchKeyword('in')) {
                  // LeftHandSideExpression
                  if (!isLeftHandSide(init)) {
                    throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                  }
                  lex();
                  left = init;
                  right = parseExpression();
                  init = null;
                }
              }
              if (typeof left === 'undefined') {
                expect(';');
              }
            }
            if (typeof left === 'undefined') {
              if (!match(';')) {
                test = parseExpression();
              }
              expect(';');
              if (!match(')')) {
                update = parseExpression();
              }
            }
            expect(')');
            oldInIteration = state.inIteration;
            state.inIteration = true;
            body = parseStatement();
            state.inIteration = oldInIteration;
            return typeof left === 'undefined' ? delegate.createForStatement(init, test, update, body) : delegate.createForInStatement(left, right, body);
          }

          // 12.7 The continue statement

          function parseContinueStatement() {
            var label = null,
              key;
            expectKeyword('continue');

            // Optimize the most common form: 'continue;'.
            if (source.charCodeAt(index) === 0x3B) {
              lex();
              if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
              }
              return delegate.createContinueStatement(null);
            }
            if (peekLineTerminator()) {
              if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
              }
              return delegate.createContinueStatement(null);
            }
            if (lookahead.type === Token.Identifier) {
              label = parseVariableIdentifier();
              key = '$' + label.name;
              if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
              }
            }
            consumeSemicolon();
            if (label === null && !state.inIteration) {
              throwError({}, Messages.IllegalContinue);
            }
            return delegate.createContinueStatement(label);
          }

          // 12.8 The break statement

          function parseBreakStatement() {
            var label = null,
              key;
            expectKeyword('break');

            // Catch the very common case first: immediately a semicolon (U+003B).
            if (source.charCodeAt(index) === 0x3B) {
              lex();
              if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
              }
              return delegate.createBreakStatement(null);
            }
            if (peekLineTerminator()) {
              if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
              }
              return delegate.createBreakStatement(null);
            }
            if (lookahead.type === Token.Identifier) {
              label = parseVariableIdentifier();
              key = '$' + label.name;
              if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
              }
            }
            consumeSemicolon();
            if (label === null && !(state.inIteration || state.inSwitch)) {
              throwError({}, Messages.IllegalBreak);
            }
            return delegate.createBreakStatement(label);
          }

          // 12.9 The return statement

          function parseReturnStatement() {
            var argument = null;
            expectKeyword('return');
            if (!state.inFunctionBody) {
              throwErrorTolerant({}, Messages.IllegalReturn);
            }

            // 'return' followed by a space and an identifier is very common.
            if (source.charCodeAt(index) === 0x20) {
              if (isIdentifierStart(source.charCodeAt(index + 1))) {
                argument = parseExpression();
                consumeSemicolon();
                return delegate.createReturnStatement(argument);
              }
            }
            if (peekLineTerminator()) {
              return delegate.createReturnStatement(null);
            }
            if (!match(';')) {
              if (!match('}') && lookahead.type !== Token.EOF) {
                argument = parseExpression();
              }
            }
            consumeSemicolon();
            return delegate.createReturnStatement(argument);
          }

          // 12.10 The with statement

          function parseWithStatement() {
            var object, body;
            if (strict) {
              // TODO(ikarienator): Should we update the test cases instead?
              skipComment();
              throwErrorTolerant({}, Messages.StrictModeWith);
            }
            expectKeyword('with');
            expect('(');
            object = parseExpression();
            expect(')');
            body = parseStatement();
            return delegate.createWithStatement(object, body);
          }

          // 12.10 The swith statement

          function parseSwitchCase() {
            var test,
              consequent = [],
              statement,
              startToken;
            startToken = lookahead;
            if (matchKeyword('default')) {
              lex();
              test = null;
            } else {
              expectKeyword('case');
              test = parseExpression();
            }
            expect(':');
            while (index < length) {
              if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
              }
              statement = parseStatement();
              consequent.push(statement);
            }
            return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
          }
          function parseSwitchStatement() {
            var discriminant, cases, clause, oldInSwitch, defaultFound;
            expectKeyword('switch');
            expect('(');
            discriminant = parseExpression();
            expect(')');
            expect('{');
            cases = [];
            if (match('}')) {
              lex();
              return delegate.createSwitchStatement(discriminant, cases);
            }
            oldInSwitch = state.inSwitch;
            state.inSwitch = true;
            defaultFound = false;
            while (index < length) {
              if (match('}')) {
                break;
              }
              clause = parseSwitchCase();
              if (clause.test === null) {
                if (defaultFound) {
                  throwError({}, Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
              }
              cases.push(clause);
            }
            state.inSwitch = oldInSwitch;
            expect('}');
            return delegate.createSwitchStatement(discriminant, cases);
          }

          // 12.13 The throw statement

          function parseThrowStatement() {
            var argument;
            expectKeyword('throw');
            if (peekLineTerminator()) {
              throwError({}, Messages.NewlineAfterThrow);
            }
            argument = parseExpression();
            consumeSemicolon();
            return delegate.createThrowStatement(argument);
          }

          // 12.14 The try statement

          function parseCatchClause() {
            var param, body, startToken;
            startToken = lookahead;
            expectKeyword('catch');
            expect('(');
            if (match(')')) {
              throwUnexpected(lookahead);
            }
            param = parseVariableIdentifier();
            // 12.14.1
            if (strict && isRestrictedWord(param.name)) {
              throwErrorTolerant({}, Messages.StrictCatchVariable);
            }
            expect(')');
            body = parseBlock();
            return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
          }
          function parseTryStatement() {
            var block,
              handlers = [],
              finalizer = null;
            expectKeyword('try');
            block = parseBlock();
            if (matchKeyword('catch')) {
              handlers.push(parseCatchClause());
            }
            if (matchKeyword('finally')) {
              lex();
              finalizer = parseBlock();
            }
            if (handlers.length === 0 && !finalizer) {
              throwError({}, Messages.NoCatchOrFinally);
            }
            return delegate.createTryStatement(block, [], handlers, finalizer);
          }

          // 12.15 The debugger statement

          function parseDebuggerStatement() {
            expectKeyword('debugger');
            consumeSemicolon();
            return delegate.createDebuggerStatement();
          }

          // 12 Statements

          function parseStatement() {
            var type = lookahead.type,
              expr,
              labeledBody,
              key,
              startToken;
            if (type === Token.EOF) {
              throwUnexpected(lookahead);
            }
            if (type === Token.Punctuator && lookahead.value === '{') {
              return parseBlock();
            }
            startToken = lookahead;
            if (type === Token.Punctuator) {
              switch (lookahead.value) {
                case ';':
                  return delegate.markEnd(parseEmptyStatement(), startToken);
                case '(':
                  return delegate.markEnd(parseExpressionStatement(), startToken);
                default:
                  break;
              }
            }
            if (type === Token.Keyword) {
              switch (lookahead.value) {
                case 'break':
                  return delegate.markEnd(parseBreakStatement(), startToken);
                case 'continue':
                  return delegate.markEnd(parseContinueStatement(), startToken);
                case 'debugger':
                  return delegate.markEnd(parseDebuggerStatement(), startToken);
                case 'do':
                  return delegate.markEnd(parseDoWhileStatement(), startToken);
                case 'for':
                  return delegate.markEnd(parseForStatement(), startToken);
                case 'function':
                  return delegate.markEnd(parseFunctionDeclaration(), startToken);
                case 'if':
                  return delegate.markEnd(parseIfStatement(), startToken);
                case 'return':
                  return delegate.markEnd(parseReturnStatement(), startToken);
                case 'switch':
                  return delegate.markEnd(parseSwitchStatement(), startToken);
                case 'throw':
                  return delegate.markEnd(parseThrowStatement(), startToken);
                case 'try':
                  return delegate.markEnd(parseTryStatement(), startToken);
                case 'var':
                  return delegate.markEnd(parseVariableStatement(), startToken);
                case 'while':
                  return delegate.markEnd(parseWhileStatement(), startToken);
                case 'with':
                  return delegate.markEnd(parseWithStatement(), startToken);
                default:
                  break;
              }
            }
            expr = parseExpression();

            // 12.12 Labelled Statements
            if (expr.type === Syntax.Identifier && match(':')) {
              lex();
              key = '$' + expr.name;
              if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.Redeclaration, 'Label', expr.name);
              }
              state.labelSet[key] = true;
              labeledBody = parseStatement();
              delete state.labelSet[key];
              return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
            }
            consumeSemicolon();
            return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
          }

          // 13 Function Definition

          function parseFunctionSourceElements() {
            var sourceElement,
              sourceElements = [],
              token,
              directive,
              firstRestricted,
              oldLabelSet,
              oldInIteration,
              oldInSwitch,
              oldInFunctionBody,
              startToken;
            startToken = lookahead;
            expect('{');
            while (index < length) {
              if (lookahead.type !== Token.StringLiteral) {
                break;
              }
              token = lookahead;
              sourceElement = parseSourceElement();
              sourceElements.push(sourceElement);
              if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
              }
              directive = source.slice(token.start + 1, token.end - 1);
              if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                  throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
              } else {
                if (!firstRestricted && token.octal) {
                  firstRestricted = token;
                }
              }
            }
            oldLabelSet = state.labelSet;
            oldInIteration = state.inIteration;
            oldInSwitch = state.inSwitch;
            oldInFunctionBody = state.inFunctionBody;
            state.labelSet = {};
            state.inIteration = false;
            state.inSwitch = false;
            state.inFunctionBody = true;
            while (index < length) {
              if (match('}')) {
                break;
              }
              sourceElement = parseSourceElement();
              if (typeof sourceElement === 'undefined') {
                break;
              }
              sourceElements.push(sourceElement);
            }
            expect('}');
            state.labelSet = oldLabelSet;
            state.inIteration = oldInIteration;
            state.inSwitch = oldInSwitch;
            state.inFunctionBody = oldInFunctionBody;
            return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
          }
          function parseParams(firstRestricted) {
            var param,
              params = [],
              token,
              stricted,
              paramSet,
              key,
              message;
            expect('(');
            if (!match(')')) {
              paramSet = {};
              while (index < length) {
                token = lookahead;
                param = parseVariableIdentifier();
                key = '$' + token.value;
                if (strict) {
                  if (isRestrictedWord(token.value)) {
                    stricted = token;
                    message = Messages.StrictParamName;
                  }
                  if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                    stricted = token;
                    message = Messages.StrictParamDupe;
                  }
                } else if (!firstRestricted) {
                  if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictParamName;
                  } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                  } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                    firstRestricted = token;
                    message = Messages.StrictParamDupe;
                  }
                }
                params.push(param);
                paramSet[key] = true;
                if (match(')')) {
                  break;
                }
                expect(',');
              }
            }
            expect(')');
            return {
              params: params,
              stricted: stricted,
              firstRestricted: firstRestricted,
              message: message
            };
          }
          function parseFunctionDeclaration() {
            var id,
              params = [],
              body,
              token,
              stricted,
              tmp,
              firstRestricted,
              message,
              previousStrict,
              startToken;
            startToken = lookahead;
            expectKeyword('function');
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
              if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
              }
            } else {
              if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
              } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
              }
            }
            tmp = parseParams(firstRestricted);
            params = tmp.params;
            stricted = tmp.stricted;
            firstRestricted = tmp.firstRestricted;
            if (tmp.message) {
              message = tmp.message;
            }
            previousStrict = strict;
            body = parseFunctionSourceElements();
            if (strict && firstRestricted) {
              throwError(firstRestricted, message);
            }
            if (strict && stricted) {
              throwErrorTolerant(stricted, message);
            }
            strict = previousStrict;
            return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
          }
          function parseFunctionExpression() {
            var token,
              id = null,
              stricted,
              firstRestricted,
              message,
              tmp,
              params = [],
              body,
              previousStrict,
              startToken;
            startToken = lookahead;
            expectKeyword('function');
            if (!match('(')) {
              token = lookahead;
              id = parseVariableIdentifier();
              if (strict) {
                if (isRestrictedWord(token.value)) {
                  throwErrorTolerant(token, Messages.StrictFunctionName);
                }
              } else {
                if (isRestrictedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictReservedWord;
                }
              }
            }
            tmp = parseParams(firstRestricted);
            params = tmp.params;
            stricted = tmp.stricted;
            firstRestricted = tmp.firstRestricted;
            if (tmp.message) {
              message = tmp.message;
            }
            previousStrict = strict;
            body = parseFunctionSourceElements();
            if (strict && firstRestricted) {
              throwError(firstRestricted, message);
            }
            if (strict && stricted) {
              throwErrorTolerant(stricted, message);
            }
            strict = previousStrict;
            return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
          }

          // 14 Program

          function parseSourceElement() {
            if (lookahead.type === Token.Keyword) {
              switch (lookahead.value) {
                case 'const':
                case 'let':
                  return parseConstLetDeclaration(lookahead.value);
                case 'function':
                  return parseFunctionDeclaration();
                default:
                  return parseStatement();
              }
            }
            if (lookahead.type !== Token.EOF) {
              return parseStatement();
            }
          }
          function parseSourceElements() {
            var sourceElement,
              sourceElements = [],
              token,
              directive,
              firstRestricted;
            while (index < length) {
              token = lookahead;
              if (token.type !== Token.StringLiteral) {
                break;
              }
              sourceElement = parseSourceElement();
              sourceElements.push(sourceElement);
              if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
              }
              directive = source.slice(token.start + 1, token.end - 1);
              if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                  throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
              } else {
                if (!firstRestricted && token.octal) {
                  firstRestricted = token;
                }
              }
            }
            while (index < length) {
              sourceElement = parseSourceElement();
              /* istanbul ignore if */
              if (typeof sourceElement === 'undefined') {
                break;
              }
              sourceElements.push(sourceElement);
            }
            return sourceElements;
          }
          function parseProgram() {
            var body, startToken;
            skipComment();
            peek();
            startToken = lookahead;
            strict = false;
            body = parseSourceElements();
            return delegate.markEnd(delegate.createProgram(body), startToken);
          }
          function filterTokenLocation() {
            var i,
              entry,
              token,
              tokens = [];
            for (i = 0; i < extra.tokens.length; ++i) {
              entry = extra.tokens[i];
              token = {
                type: entry.type,
                value: entry.value
              };
              if (extra.range) {
                token.range = entry.range;
              }
              if (extra.loc) {
                token.loc = entry.loc;
              }
              tokens.push(token);
            }
            extra.tokens = tokens;
          }
          function tokenize(code, options) {
            var toString, token, tokens;
            toString = String;
            if (typeof code !== 'string' && !(code instanceof String)) {
              code = toString(code);
            }
            delegate = SyntaxTreeDelegate;
            source = code;
            index = 0;
            lineNumber = source.length > 0 ? 1 : 0;
            lineStart = 0;
            length = source.length;
            lookahead = null;
            state = {
              allowIn: true,
              labelSet: {},
              inFunctionBody: false,
              inIteration: false,
              inSwitch: false,
              lastCommentStart: -1
            };
            extra = {};

            // Options matching.
            options = options || {};

            // Of course we collect tokens here.
            options.tokens = true;
            extra.tokens = [];
            extra.tokenize = true;
            // The following two fields are necessary to compute the Regex tokens.
            extra.openParenToken = -1;
            extra.openCurlyToken = -1;
            extra.range = typeof options.range === 'boolean' && options.range;
            extra.loc = typeof options.loc === 'boolean' && options.loc;
            if (typeof options.comment === 'boolean' && options.comment) {
              extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
              extra.errors = [];
            }
            try {
              peek();
              if (lookahead.type === Token.EOF) {
                return extra.tokens;
              }
              token = lex();
              while (lookahead.type !== Token.EOF) {
                try {
                  token = lex();
                } catch (lexError) {
                  token = lookahead;
                  if (extra.errors) {
                    extra.errors.push(lexError);
                    // We have to break on the first error
                    // to avoid infinite loops.
                    break;
                  } else {
                    throw lexError;
                  }
                }
              }
              filterTokenLocation();
              tokens = extra.tokens;
              if (typeof extra.comments !== 'undefined') {
                tokens.comments = extra.comments;
              }
              if (typeof extra.errors !== 'undefined') {
                tokens.errors = extra.errors;
              }
            } catch (e) {
              throw e;
            } finally {
              extra = {};
            }
            return tokens;
          }
          function parse(code, options) {
            var program, toString;
            toString = String;
            if (typeof code !== 'string' && !(code instanceof String)) {
              code = toString(code);
            }
            delegate = SyntaxTreeDelegate;
            source = code;
            index = 0;
            lineNumber = source.length > 0 ? 1 : 0;
            lineStart = 0;
            length = source.length;
            lookahead = null;
            state = {
              allowIn: true,
              labelSet: {},
              inFunctionBody: false,
              inIteration: false,
              inSwitch: false,
              lastCommentStart: -1
            };
            extra = {};
            if (typeof options !== 'undefined') {
              extra.range = typeof options.range === 'boolean' && options.range;
              extra.loc = typeof options.loc === 'boolean' && options.loc;
              extra.attachComment = typeof options.attachComment === 'boolean' && options.attachComment;
              if (extra.loc && options.source !== null && options.source !== undefined) {
                extra.source = toString(options.source);
              }
              if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
              }
              if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
              }
              if (typeof options.tolerant === 'boolean' && options.tolerant) {
                extra.errors = [];
              }
              if (extra.attachComment) {
                extra.range = true;
                extra.comments = [];
                extra.bottomRightStack = [];
                extra.trailingComments = [];
                extra.leadingComments = [];
              }
            }
            try {
              program = parseProgram();
              if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
              }
              if (typeof extra.tokens !== 'undefined') {
                filterTokenLocation();
                program.tokens = extra.tokens;
              }
              if (typeof extra.errors !== 'undefined') {
                program.errors = extra.errors;
              }
            } catch (e) {
              throw e;
            } finally {
              extra = {};
            }
            return program;
          }

          // Sync with *.json manifests.
          exports.version = '1.2.5';
          exports.tokenize = tokenize;
          exports.parse = parse;

          // Deep copy.
          /* istanbul ignore next */
          exports.Syntax = function () {
            var name,
              types = {};
            if (typeof Object.create === 'function') {
              types = Object.create(null);
            }
            for (name in Syntax) {
              if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
              }
            }
            if (typeof Object.freeze === 'function') {
              Object.freeze(types);
            }
            return types;
          }();
        });
        /* vim: set sw=4 ts=4 et tw=80 : */

        /***/
      }),
      /***/"./node_modules/ieee754/index.js": (
      /*!***************************************!*\
        !*** ./node_modules/ieee754/index.js ***!
        \***************************************/
      /***/
      function _node_modules_ieee754_indexJs(__unused_webpack_module, exports) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        exports.read = function (buffer, offset, isLE, mLen, nBytes) {
          var e, m;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var nBits = -7;
          var i = isLE ? nBytes - 1 : 0;
          var d = isLE ? -1 : 1;
          var s = buffer[offset + i];
          i += d;
          e = s & (1 << -nBits) - 1;
          s >>= -nBits;
          nBits += eLen;
          for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
          m = e & (1 << -nBits) - 1;
          e >>= -nBits;
          nBits += mLen;
          for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity;
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };
        exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
          var i = isLE ? 0 : nBytes - 1;
          var d = isLE ? 1 : -1;
          var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
          value = Math.abs(value);
          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }
            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
              e++;
              c /= 2;
            }
            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }
          for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
          e = e << mLen | m;
          eLen += mLen;
          for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
          buffer[offset + i - d] |= s * 128;
        };

        /***/
      }),
      /***/"./node_modules/iota-array/iota.js": (
      /*!*****************************************!*\
        !*** ./node_modules/iota-array/iota.js ***!
        \*****************************************/
      /***/
      function _node_modules_iotaArray_iotaJs(module) {
        "use strict";

        function iota(n) {
          var result = new Array(n);
          for (var i = 0; i < n; ++i) {
            result[i] = i;
          }
          return result;
        }
        module.exports = iota;

        /***/
      }),
      /***/"./node_modules/is-buffer/index.js": (
      /*!*****************************************!*\
        !*** ./node_modules/is-buffer/index.js ***!
        \*****************************************/
      /***/
      function _node_modules_isBuffer_indexJs(module) {
        /*!
         * Determine if an object is a Buffer
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */

        // The _isBuffer check is for Safari 5-7 support, because it's missing
        // Object.prototype.constructor. Remove this eventually
        module.exports = function (obj) {
          return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
        };
        function isBuffer(obj) {
          return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
        }

        // For Node v0.10 support. Remove this eventually.
        function isSlowBuffer(obj) {
          return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
        }

        /***/
      }),
      /***/"./node_modules/ndarray-fft/fft.js": (
      /*!*****************************************!*\
        !*** ./node_modules/ndarray-fft/fft.js ***!
        \*****************************************/
      /***/
      function _node_modules_ndarrayFft_fftJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var ops = __webpack_require__(/*! ndarray-ops */"./node_modules/ndarray-ops/ndarray-ops.js");
        var ndarray = __webpack_require__(/*! ndarray */"./node_modules/ndarray/ndarray.js");
        var pool = __webpack_require__(/*! typedarray-pool */"./node_modules/typedarray-pool/pool.js");
        var fftm = __webpack_require__(/*! ./lib/fft-matrix.js */"./node_modules/ndarray-fft/lib/fft-matrix.js");
        function ndfft(dir, x, y) {
          var shape = x.shape,
            d = shape.length,
            size = 1,
            stride = new Array(d),
            pad = 0,
            i,
            j;
          for (i = d - 1; i >= 0; --i) {
            stride[i] = size;
            size *= shape[i];
            pad = Math.max(pad, fftm.scratchMemory(shape[i]));
            if (x.shape[i] !== y.shape[i]) {
              throw new Error('Shape mismatch, real and imaginary arrays must have same size');
            }
          }
          var buf_size = 4 * size + pad;
          var buffer;
          if (x.dtype === 'array' || x.dtype === 'float64' || x.dtype === 'custom') {
            buffer = pool.mallocDouble(buf_size);
          } else {
            buffer = pool.mallocFloat(buf_size);
          }
          var x1 = ndarray(buffer, shape.slice(0), stride, 0),
            y1 = ndarray(buffer, shape.slice(0), stride.slice(0), size),
            x2 = ndarray(buffer, shape.slice(0), stride.slice(0), 2 * size),
            y2 = ndarray(buffer, shape.slice(0), stride.slice(0), 3 * size),
            tmp,
            n,
            s1,
            s2,
            scratch_ptr = 4 * size;

          //Copy into x1/y1
          ops.assign(x1, x);
          ops.assign(y1, y);
          for (i = d - 1; i >= 0; --i) {
            fftm(dir, size / shape[i], shape[i], buffer, x1.offset, y1.offset, scratch_ptr);
            if (i === 0) {
              break;
            }

            //Compute new stride for x2/y2
            n = 1;
            s1 = x2.stride;
            s2 = y2.stride;
            for (j = i - 1; j < d; ++j) {
              s2[j] = s1[j] = n;
              n *= shape[j];
            }
            for (j = i - 2; j >= 0; --j) {
              s2[j] = s1[j] = n;
              n *= shape[j];
            }

            //Transpose
            ops.assign(x2, x1);
            ops.assign(y2, y1);

            //Swap buffers
            tmp = x1;
            x1 = x2;
            x2 = tmp;
            tmp = y1;
            y1 = y2;
            y2 = tmp;
          }

          //Copy result back into x
          ops.assign(x, x1);
          ops.assign(y, y1);
          pool.free(buffer);
        }
        module.exports = ndfft;

        /***/
      }),
      /***/"./node_modules/ndarray-fft/lib/fft-matrix.js": (
      /*!****************************************************!*\
        !*** ./node_modules/ndarray-fft/lib/fft-matrix.js ***!
        \****************************************************/
      /***/
      function _node_modules_ndarrayFft_lib_fftMatrixJs(module, __unused_webpack_exports, __webpack_require__) {
        var bits = __webpack_require__(/*! bit-twiddle */"./node_modules/bit-twiddle/twiddle.js");
        function fft(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
          dir |= 0;
          nrows |= 0;
          ncols |= 0;
          x_ptr |= 0;
          y_ptr |= 0;
          if (bits.isPow2(ncols)) {
            fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr);
          } else {
            fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr);
          }
        }
        module.exports = fft;
        function scratchMemory(n) {
          if (bits.isPow2(n)) {
            return 0;
          }
          return 2 * n + 4 * bits.nextPow2(2 * n + 1);
        }
        module.exports.scratchMemory = scratchMemory;

        //Radix 2 FFT Adapted from Paul Bourke's C Implementation
        function fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr) {
          dir |= 0;
          nrows |= 0;
          ncols |= 0;
          x_ptr |= 0;
          y_ptr |= 0;
          var nn, m, i, i1, j, k, i2, l, l1, l2;
          var c1, c2, t, t1, t2, u1, u2, z, row, a, b, c, d, k1, k2, k3;

          // Calculate the number of points
          nn = ncols;
          m = bits.log2(nn);
          for (row = 0; row < nrows; ++row) {
            // Do the bit reversal
            i2 = nn >> 1;
            j = 0;
            for (i = 0; i < nn - 1; i++) {
              if (i < j) {
                t = buffer[x_ptr + i];
                buffer[x_ptr + i] = buffer[x_ptr + j];
                buffer[x_ptr + j] = t;
                t = buffer[y_ptr + i];
                buffer[y_ptr + i] = buffer[y_ptr + j];
                buffer[y_ptr + j] = t;
              }
              k = i2;
              while (k <= j) {
                j -= k;
                k >>= 1;
              }
              j += k;
            }

            // Compute the FFT
            c1 = -1.0;
            c2 = 0.0;
            l2 = 1;
            for (l = 0; l < m; l++) {
              l1 = l2;
              l2 <<= 1;
              u1 = 1.0;
              u2 = 0.0;
              for (j = 0; j < l1; j++) {
                for (i = j; i < nn; i += l2) {
                  i1 = i + l1;
                  a = buffer[x_ptr + i1];
                  b = buffer[y_ptr + i1];
                  c = buffer[x_ptr + i];
                  d = buffer[y_ptr + i];
                  k1 = u1 * (a + b);
                  k2 = a * (u2 - u1);
                  k3 = b * (u1 + u2);
                  t1 = k1 - k3;
                  t2 = k1 + k2;
                  buffer[x_ptr + i1] = c - t1;
                  buffer[y_ptr + i1] = d - t2;
                  buffer[x_ptr + i] += t1;
                  buffer[y_ptr + i] += t2;
                }
                k1 = c1 * (u1 + u2);
                k2 = u1 * (c2 - c1);
                k3 = u2 * (c1 + c2);
                u1 = k1 - k3;
                u2 = k1 + k2;
              }
              c2 = Math.sqrt((1.0 - c1) / 2.0);
              if (dir < 0) {
                c2 = -c2;
              }
              c1 = Math.sqrt((1.0 + c1) / 2.0);
            }

            // Scaling for inverse transform
            if (dir < 0) {
              var scale_f = 1.0 / nn;
              for (i = 0; i < nn; i++) {
                buffer[x_ptr + i] *= scale_f;
                buffer[y_ptr + i] *= scale_f;
              }
            }

            // Advance pointers
            x_ptr += ncols;
            y_ptr += ncols;
          }
        }

        // Use Bluestein algorithm for npot FFTs
        // Scratch memory required:  2 * ncols + 4 * bits.nextPow2(2*ncols + 1)
        function fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
          dir |= 0;
          nrows |= 0;
          ncols |= 0;
          x_ptr |= 0;
          y_ptr |= 0;
          scratch_ptr |= 0;

          // Initialize tables
          var m = bits.nextPow2(2 * ncols + 1),
            cos_ptr = scratch_ptr,
            sin_ptr = cos_ptr + ncols,
            xs_ptr = sin_ptr + ncols,
            ys_ptr = xs_ptr + m,
            cft_ptr = ys_ptr + m,
            sft_ptr = cft_ptr + m,
            w = -dir * Math.PI / ncols,
            row,
            a,
            b,
            c,
            d,
            k1,
            k2,
            k3,
            i;
          for (i = 0; i < ncols; ++i) {
            a = w * (i * i % (ncols * 2));
            c = Math.cos(a);
            d = Math.sin(a);
            buffer[cft_ptr + (m - i)] = buffer[cft_ptr + i] = buffer[cos_ptr + i] = c;
            buffer[sft_ptr + (m - i)] = buffer[sft_ptr + i] = buffer[sin_ptr + i] = d;
          }
          for (i = ncols; i <= m - ncols; ++i) {
            buffer[cft_ptr + i] = 0.0;
          }
          for (i = ncols; i <= m - ncols; ++i) {
            buffer[sft_ptr + i] = 0.0;
          }
          fftRadix2(1, 1, m, buffer, cft_ptr, sft_ptr);

          //Compute scale factor
          if (dir < 0) {
            w = 1.0 / ncols;
          } else {
            w = 1.0;
          }

          //Handle direction
          for (row = 0; row < nrows; ++row) {
            // Copy row into scratch memory, multiply weights
            for (i = 0; i < ncols; ++i) {
              a = buffer[x_ptr + i];
              b = buffer[y_ptr + i];
              c = buffer[cos_ptr + i];
              d = -buffer[sin_ptr + i];
              k1 = c * (a + b);
              k2 = a * (d - c);
              k3 = b * (c + d);
              buffer[xs_ptr + i] = k1 - k3;
              buffer[ys_ptr + i] = k1 + k2;
            }
            //Zero out the rest
            for (i = ncols; i < m; ++i) {
              buffer[xs_ptr + i] = 0.0;
            }
            for (i = ncols; i < m; ++i) {
              buffer[ys_ptr + i] = 0.0;
            }

            // FFT buffer
            fftRadix2(1, 1, m, buffer, xs_ptr, ys_ptr);

            // Apply multiplier
            for (i = 0; i < m; ++i) {
              a = buffer[xs_ptr + i];
              b = buffer[ys_ptr + i];
              c = buffer[cft_ptr + i];
              d = buffer[sft_ptr + i];
              k1 = c * (a + b);
              k2 = a * (d - c);
              k3 = b * (c + d);
              buffer[xs_ptr + i] = k1 - k3;
              buffer[ys_ptr + i] = k1 + k2;
            }

            // Inverse FFT buffer
            fftRadix2(-1, 1, m, buffer, xs_ptr, ys_ptr);

            // Copy result back into x/y
            for (i = 0; i < ncols; ++i) {
              a = buffer[xs_ptr + i];
              b = buffer[ys_ptr + i];
              c = buffer[cos_ptr + i];
              d = -buffer[sin_ptr + i];
              k1 = c * (a + b);
              k2 = a * (d - c);
              k3 = b * (c + d);
              buffer[x_ptr + i] = w * (k1 - k3);
              buffer[y_ptr + i] = w * (k1 + k2);
            }
            x_ptr += ncols;
            y_ptr += ncols;
          }
        }

        /***/
      }),
      /***/"./node_modules/ndarray-gemm/gemm.js": (
      /*!*******************************************!*\
        !*** ./node_modules/ndarray-gemm/gemm.js ***!
        \*******************************************/
      /***/
      function _node_modules_ndarrayGemm_gemmJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        module.exports = matrixProduct;
        var generatePlan = __webpack_require__(/*! ./lib/planner.js */"./node_modules/ndarray-gemm/lib/planner.js");
        function shape(arr) {
          if (Array.isArray(arr)) {
            return [arr.length, arr[0].length];
          } else {
            return arr.shape;
          }
        }
        function checkShapes(out, a, b) {
          var os = shape(out);
          var as = shape(a);
          var bs = shape(b);
          if (os[0] !== as[0] || os[1] !== bs[1] || as[1] !== bs[0]) {
            throw new Error("Mismatched array shapes for matrix product");
          }
        }
        function classifyType(m) {
          if (Array.isArray(m)) {
            if (Array.isArray(m)) {
              return ["r", "native"];
            }
          } else if (m.shape && m.shape.length === 2) {
            if (m.order[0]) {
              return ["r", m.dtype];
            } else {
              return ["c", m.dtype];
            }
          }
          throw new Error("Unrecognized data type");
        }
        var CACHE = {};
        function matrixProduct(out, a, b, alpha, beta) {
          if (alpha === undefined) {
            alpha = 1.0;
          }
          if (beta === undefined) {
            beta = 0.0;
          }
          var useAlpha = alpha !== 1.0;
          var useBeta = beta !== 0.0;
          var outType = classifyType(out);
          var aType = classifyType(a);
          var bType = classifyType(b);
          checkShapes(out, a, b);
          var typeSig = [outType, aType, bType, useAlpha, useBeta].join(":");
          var proc = CACHE[typeSig];
          if (!proc) {
            proc = CACHE[typeSig] = generatePlan(outType, aType, bType, useAlpha, useBeta);
          }
          return proc(out, a, b, alpha, beta);
        }

        /***/
      }),
      /***/"./node_modules/ndarray-gemm/lib/planner.js": (
      /*!**************************************************!*\
        !*** ./node_modules/ndarray-gemm/lib/planner.js ***!
        \**************************************************/
      /***/
      function _node_modules_ndarrayGemm_lib_plannerJs(module) {
        "use strict";

        module.exports = generateMatrixProduct;
        var BLOCK_SIZE = 32;
        function unpackOrder(order) {
          return order === "r" ? [1, 0] : [0, 1];
        }
        function unpackShape(name, type) {
          if (type[1] === "native") {
            return [name, "d0=", name, ".length,", name, "d1=", name, "[0].length,"].join("");
          } else {
            return [name, "d0=", name, ".shape[0],", name, "d1=", name, ".shape[1],", name, "s0=", name, ".stride[0],", name, "s1=", name, ".stride[1],", name, "o=", name, ".offset,", name, "d=", name, ".data,"].join("");
          }
        }
        function start(order, name, type, i, j, w) {
          var code = [];
          if (type[1] === "native") {
            if (order[0]) {
              if (i) {
                code.push("var ", name, "p=", name, "[", i, "];");
              } else {
                code.push("var ", name, "p=", name, "[0];");
              }
            }
          } else {
            if (i && j) {
              if (w) {
                code.push("var ", name, "t0=", name, "s", order[0], ",", name, "t1=", name, "s", order[1], "-", name, "s", order[0], "*", w, ",", name, "p=", name, "o+", i, "*", name, "s0+", j, "*", name, "s1;");
              } else {
                code.push("var ", name, "t0=", name, "s", order[0], ",", name, "p=", name, "o+", i, "*", name, "s0+", j, "*", name, "s1;");
              }
            } else if (i) {
              code.push("var ", name, "t0=", name, "s", order[0], ",", name, "p=", name, "o+", i, "*", name, "s0;");
            } else if (j) {
              code.push("var ", name, "t0=", name, "s", order[0], ",", name, "p=", name, "o+", j, "*", name, "s1;");
            } else {
              code.push("var ", name, "t0=", name, "s", order[0], ",", name, "t1=", name, "s", order[1], "-", name, "s", order[0], "*", name, "d", order[0], ",", name, "p=", name, "o;");
            }
          }
          return code;
        }
        function walk(order, name, type, d, i) {
          var code = [];
          if (type[1] === "native") {
            if (order[0] && d === 1) {
              code.push(name, "p=", name, "[", i, "+1]");
            }
          } else {
            code.push(name, "p+=", name, "t", d, ";");
          }
          return code;
        }
        function write(order, name, type, i, j, w) {
          var code = [];
          if (type[1] === "native") {
            if (order[0]) {
              code.push(name, "p[", j, "]=", w, ";");
            } else {
              code.push(name, "[", i, "][", j, "]=", w, ";");
            }
          } else if (type[1] === "generic") {
            code.push(name, "d.set(", name, "p,", w, ");");
          } else {
            code.push(name, "d[", name, "p]=", w, ";");
          }
          return code;
        }
        function read(order, name, type, i, j) {
          var code = [];
          if (type[1] === "native") {
            if (order[0]) {
              code.push(name, "p[", j, "]");
            } else {
              code.push(name, "[", i, "][", j, "]");
            }
          } else if (type[1] === "generic") {
            code.push(name, "d.get(", name, "p)");
          } else {
            code.push(name, "d[", name, "p]");
          }
          return code.join("");
        }
        function generateRowColumnLoop(oType, aType, bType, useAlpha, useBeta) {
          var code = [];
          var oOrd = oType[0] === "r" ? [1, 0] : [0, 1],
            aOrd = [1, 0],
            bOrd = [0, 1];
          var symbols = ["i", "j"];
          code.push.apply(code, start(oOrd, "o", oType));
          if (oOrd[1]) {
            code.push("for(j=0;j<od1;++j){");
            code.push("for(i=0;i<od0;++i){");
          } else {
            code.push("for(i=0;i<od0;++i){");
            code.push("for(j=0;j<od1;++j){");
          }
          code.push.apply(code, start(aOrd, "a", aType, "i"));
          code.push.apply(code, start(bOrd, "b", bType, undefined, "j"));
          code.push("var r=0.0;", "for(k=0;k<ad1;++k){", "r+=", read(aOrd, "a", aType, "i", "k"), "*", read(bOrd, "b", bType, "k", "j"), ";");

          //Terminate k loop
          code.push.apply(code, walk(aOrd, "a", aType, 0, "k"));
          code.push.apply(code, walk(bOrd, "b", bType, 0, "k"));
          code.push("}");

          //Write r to output
          if (useAlpha) {
            code.push("r*=A;");
          }
          if (useBeta) {
            code.push("r+=B*", read(oOrd, "o", oType, "i", "j"), ";");
          }
          code.push.apply(code, write(oOrd, "o", oType, "i", "j", "r"));

          //Terminate j loop loop
          code.push.apply(code, walk(oOrd, "o", oType, 0, symbols[1]));
          code.push("}");

          //Terminate i loop
          code.push.apply(code, walk(oOrd, "o", oType, 1, symbols[0]));
          code.push("}");
          return code;
        }
        function generateBetaPass(oType, useBeta) {
          var code = [];
          var oOrd = oType[0] === "r" ? [1, 0] : [0, 1],
            symbols;
          if (useBeta) {
            code.push("if(B!==1.0){");
          }
          code.push.apply(code, start(oOrd, "o", oType));
          if (oOrd[0]) {
            code.push("for(i=0;i<od0;++i){for(j=0;j<od1;++j){");
            symbols = ["i", "j"];
          } else {
            code.push("for(j=0;j<od1;++j){for(i=0;i<od0;++i){");
            symbols = ["j", "i"];
          }
          if (useBeta) {
            code.push.apply(code, write(oOrd, "o", oType, "i", "j", "B*" + read(oOrd, "o", oType, "i", "j")));
          } else {
            code.push.apply(code, write(oOrd, "o", oType, "i", "j", "0"));
          }
          code.push.apply(code, walk(oOrd, "o", oType, 0, symbols[1]));
          code.push("}");
          code.push.apply(code, walk(oOrd, "o", oType, 1, symbols[0]));
          code.push("}");
          if (useBeta) {
            code.push("}");
          }
          return code;
        }
        function generateBlockLoop(oType, aType, bType, useAlpha, useBeta) {
          var code = [];
          var shapes = ["od0", "od1", "ad1"];
          var oOrd = [1, 0];
          var aOrd = [1, 0];
          var bOrd = [0, 1];

          //Do pass over output to zero it out
          code.push.apply(code, generateBetaPass(oType, useBeta));
          for (var i = 0; i < 3; ++i) {
            code.push("for(var i", i, "=", shapes[i], ";i", i, ">0;){", "var w", i, "=", BLOCK_SIZE, ";", "if(i", i, "<", BLOCK_SIZE, "){", "w", i, "=i", i, ";", "i", i, "=0;", "}else{", "i", i, "-=", BLOCK_SIZE, ";", "}");
          }
          code.push.apply(code, start(oOrd, "o", oType, "i0", "i1", "w1"));
          code.push("for(i=0;i<w0;++i){\
for(j=0;j<w1;++j){\
var r=0.0;");
          code.push.apply(code, start(aOrd, "a", aType, "(i0+i)", "i2"));
          code.push.apply(code, start(bOrd, "b", bType, "i2", "(i1+j)"));
          code.push("for(k=0;k<w2;++k){");
          code.push("r+=", read(aOrd, "a", aType, "(i0+i)", "(i2+k)"), "*", read(bOrd, "b", bType, "(i2+k)", "(i1+j)"), ";");

          //Close off k-loop
          code.push.apply(code, walk(aOrd, "a", aType, 0, "(i2+k)"));
          code.push.apply(code, walk(bOrd, "b", bType, 0, "(i2+k)"));
          code.push("}");

          //Write r back to output array
          var sym = "r";
          if (useAlpha) {
            sym = "A*r";
          }
          code.push.apply(code, write(oOrd, "o", oType, "(i0+i)", "(i1+j)", sym + "+" + read(oOrd, "o", oType, "(i0+i)", "(i1+j)")));

          //Close off j-loop
          code.push.apply(code, walk(oOrd, "o", oType, 0, "(i1+j)"));
          code.push("}");

          //Close off i-loop
          code.push.apply(code, walk(oOrd, "o", oType, 1, "(i0+i)"));
          code.push("}}}}");
          return code;
        }
        function generateMatrixProduct(outType, aType, bType, useAlpha, useBeta) {
          var funcName = ["gemm", outType[0], outType[1], "a", aType[0], aType[1], "b", bType[0], bType[1], useAlpha ? "alpha" : "", useBeta ? "beta" : ""].join("");
          var code = ["function ", funcName, "(o,a,b,A,B){", "var ", unpackShape("o", outType), unpackShape("a", aType), unpackShape("b", bType), "i,j,k;"];
          if (aType[0] === "r" && bType[0] === "c") {
            code.push.apply(code, generateRowColumnLoop(outType, aType, bType, useAlpha, useBeta));
          } else {
            code.push.apply(code, generateBlockLoop(outType, aType, bType, useAlpha, useBeta));
          }
          code.push("}return ", funcName);

          //Compile function
          var proc = new Function(code.join(""));
          return proc();
        }

        /***/
      }),
      /***/"./node_modules/ndarray-ops/ndarray-ops.js": (
      /*!*************************************************!*\
        !*** ./node_modules/ndarray-ops/ndarray-ops.js ***!
        \*************************************************/
      /***/
      function _node_modules_ndarrayOps_ndarrayOpsJs(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";

        var compile = __webpack_require__(/*! cwise-compiler */"./node_modules/cwise-compiler/compiler.js");
        var EmptyProc = {
          body: "",
          args: [],
          thisVars: [],
          localVars: []
        };
        function fixup(x) {
          if (!x) {
            return EmptyProc;
          }
          for (var i = 0; i < x.args.length; ++i) {
            var a = x.args[i];
            if (i === 0) {
              x.args[i] = {
                name: a,
                lvalue: true,
                rvalue: !!x.rvalue,
                count: x.count || 1
              };
            } else {
              x.args[i] = {
                name: a,
                lvalue: false,
                rvalue: true,
                count: 1
              };
            }
          }
          if (!x.thisVars) {
            x.thisVars = [];
          }
          if (!x.localVars) {
            x.localVars = [];
          }
          return x;
        }
        function pcompile(user_args) {
          return compile({
            args: user_args.args,
            pre: fixup(user_args.pre),
            body: fixup(user_args.body),
            post: fixup(user_args.proc),
            funcName: user_args.funcName
          });
        }
        function makeOp(user_args) {
          var args = [];
          for (var i = 0; i < user_args.args.length; ++i) {
            args.push("a" + i);
          }
          var wrapper = new Function("P", ["return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"].join(""));
          return wrapper(pcompile(user_args));
        }
        var assign_ops = {
          add: "+",
          sub: "-",
          mul: "*",
          div: "/",
          mod: "%",
          band: "&",
          bor: "|",
          bxor: "^",
          lshift: "<<",
          rshift: ">>",
          rrshift: ">>>"
        };
        (function () {
          for (var id in assign_ops) {
            var op = assign_ops[id];
            exports[id] = makeOp({
              args: ["array", "array", "array"],
              body: {
                args: ["a", "b", "c"],
                body: "a=b" + op + "c"
              },
              funcName: id
            });
            exports[id + "eq"] = makeOp({
              args: ["array", "array"],
              body: {
                args: ["a", "b"],
                body: "a" + op + "=b"
              },
              rvalue: true,
              funcName: id + "eq"
            });
            exports[id + "s"] = makeOp({
              args: ["array", "array", "scalar"],
              body: {
                args: ["a", "b", "s"],
                body: "a=b" + op + "s"
              },
              funcName: id + "s"
            });
            exports[id + "seq"] = makeOp({
              args: ["array", "scalar"],
              body: {
                args: ["a", "s"],
                body: "a" + op + "=s"
              },
              rvalue: true,
              funcName: id + "seq"
            });
          }
        })();
        var unary_ops = {
          not: "!",
          bnot: "~",
          neg: "-",
          recip: "1.0/"
        };
        (function () {
          for (var id in unary_ops) {
            var op = unary_ops[id];
            exports[id] = makeOp({
              args: ["array", "array"],
              body: {
                args: ["a", "b"],
                body: "a=" + op + "b"
              },
              funcName: id
            });
            exports[id + "eq"] = makeOp({
              args: ["array"],
              body: {
                args: ["a"],
                body: "a=" + op + "a"
              },
              rvalue: true,
              count: 2,
              funcName: id + "eq"
            });
          }
        })();
        var binary_ops = {
          and: "&&",
          or: "||",
          eq: "===",
          neq: "!==",
          lt: "<",
          gt: ">",
          leq: "<=",
          geq: ">="
        };
        (function () {
          for (var id in binary_ops) {
            var op = binary_ops[id];
            exports[id] = makeOp({
              args: ["array", "array", "array"],
              body: {
                args: ["a", "b", "c"],
                body: "a=b" + op + "c"
              },
              funcName: id
            });
            exports[id + "s"] = makeOp({
              args: ["array", "array", "scalar"],
              body: {
                args: ["a", "b", "s"],
                body: "a=b" + op + "s"
              },
              funcName: id + "s"
            });
            exports[id + "eq"] = makeOp({
              args: ["array", "array"],
              body: {
                args: ["a", "b"],
                body: "a=a" + op + "b"
              },
              rvalue: true,
              count: 2,
              funcName: id + "eq"
            });
            exports[id + "seq"] = makeOp({
              args: ["array", "scalar"],
              body: {
                args: ["a", "s"],
                body: "a=a" + op + "s"
              },
              rvalue: true,
              count: 2,
              funcName: id + "seq"
            });
          }
        })();
        var math_unary = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
        (function () {
          for (var i = 0; i < math_unary.length; ++i) {
            var f = math_unary[i];
            exports[f] = makeOp({
              args: ["array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b"],
                body: "a=this_f(b)",
                thisVars: ["this_f"]
              },
              funcName: f
            });
            exports[f + "eq"] = makeOp({
              args: ["array"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a"],
                body: "a=this_f(a)",
                thisVars: ["this_f"]
              },
              rvalue: true,
              count: 2,
              funcName: f + "eq"
            });
          }
        })();
        var math_comm = ["max", "min", "atan2", "pow"];
        (function () {
          for (var i = 0; i < math_comm.length; ++i) {
            var f = math_comm[i];
            exports[f] = makeOp({
              args: ["array", "array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b", "c"],
                body: "a=this_f(b,c)",
                thisVars: ["this_f"]
              },
              funcName: f
            });
            exports[f + "s"] = makeOp({
              args: ["array", "array", "scalar"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b", "c"],
                body: "a=this_f(b,c)",
                thisVars: ["this_f"]
              },
              funcName: f + "s"
            });
            exports[f + "eq"] = makeOp({
              args: ["array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b"],
                body: "a=this_f(a,b)",
                thisVars: ["this_f"]
              },
              rvalue: true,
              count: 2,
              funcName: f + "eq"
            });
            exports[f + "seq"] = makeOp({
              args: ["array", "scalar"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b"],
                body: "a=this_f(a,b)",
                thisVars: ["this_f"]
              },
              rvalue: true,
              count: 2,
              funcName: f + "seq"
            });
          }
        })();
        var math_noncomm = ["atan2", "pow"];
        (function () {
          for (var i = 0; i < math_noncomm.length; ++i) {
            var f = math_noncomm[i];
            exports[f + "op"] = makeOp({
              args: ["array", "array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b", "c"],
                body: "a=this_f(c,b)",
                thisVars: ["this_f"]
              },
              funcName: f + "op"
            });
            exports[f + "ops"] = makeOp({
              args: ["array", "array", "scalar"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b", "c"],
                body: "a=this_f(c,b)",
                thisVars: ["this_f"]
              },
              funcName: f + "ops"
            });
            exports[f + "opeq"] = makeOp({
              args: ["array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b"],
                body: "a=this_f(b,a)",
                thisVars: ["this_f"]
              },
              rvalue: true,
              count: 2,
              funcName: f + "opeq"
            });
            exports[f + "opseq"] = makeOp({
              args: ["array", "scalar"],
              pre: {
                args: [],
                body: "this_f=Math." + f,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b"],
                body: "a=this_f(b,a)",
                thisVars: ["this_f"]
              },
              rvalue: true,
              count: 2,
              funcName: f + "opseq"
            });
          }
        })();
        exports.any = compile({
          args: ["array"],
          pre: EmptyProc,
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            body: "if(a){return true}",
            localVars: [],
            thisVars: []
          },
          post: {
            args: [],
            localVars: [],
            thisVars: [],
            body: "return false"
          },
          funcName: "any"
        });
        exports.all = compile({
          args: ["array"],
          pre: EmptyProc,
          body: {
            args: [{
              name: "x",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            body: "if(!x){return false}",
            localVars: [],
            thisVars: []
          },
          post: {
            args: [],
            localVars: [],
            thisVars: [],
            body: "return true"
          },
          funcName: "all"
        });
        exports.sum = compile({
          args: ["array"],
          pre: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "this_s=0"
          },
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            body: "this_s+=a",
            localVars: [],
            thisVars: ["this_s"]
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "return this_s"
          },
          funcName: "sum"
        });
        exports.prod = compile({
          args: ["array"],
          pre: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "this_s=1"
          },
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            body: "this_s*=a",
            localVars: [],
            thisVars: ["this_s"]
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "return this_s"
          },
          funcName: "prod"
        });
        exports.norm2squared = compile({
          args: ["array"],
          pre: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "this_s=0"
          },
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 2
            }],
            body: "this_s+=a*a",
            localVars: [],
            thisVars: ["this_s"]
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "return this_s"
          },
          funcName: "norm2squared"
        });
        exports.norm2 = compile({
          args: ["array"],
          pre: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "this_s=0"
          },
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 2
            }],
            body: "this_s+=a*a",
            localVars: [],
            thisVars: ["this_s"]
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "return Math.sqrt(this_s)"
          },
          funcName: "norm2"
        });
        exports.norminf = compile({
          args: ["array"],
          pre: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "this_s=0"
          },
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 4
            }],
            body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
            localVars: [],
            thisVars: ["this_s"]
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "return this_s"
          },
          funcName: "norminf"
        });
        exports.norm1 = compile({
          args: ["array"],
          pre: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "this_s=0"
          },
          body: {
            args: [{
              name: "a",
              lvalue: false,
              rvalue: true,
              count: 3
            }],
            body: "this_s+=a<0?-a:a",
            localVars: [],
            thisVars: ["this_s"]
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ["this_s"],
            body: "return this_s"
          },
          funcName: "norm1"
        });
        exports.sup = compile({
          args: ["array"],
          pre: {
            body: "this_h=-Infinity",
            args: [],
            thisVars: ["this_h"],
            localVars: []
          },
          body: {
            body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
            args: [{
              "name": "_inline_1_arg0_",
              "lvalue": false,
              "rvalue": true,
              "count": 2
            }],
            thisVars: ["this_h"],
            localVars: []
          },
          post: {
            body: "return this_h",
            args: [],
            thisVars: ["this_h"],
            localVars: []
          }
        });
        exports.inf = compile({
          args: ["array"],
          pre: {
            body: "this_h=Infinity",
            args: [],
            thisVars: ["this_h"],
            localVars: []
          },
          body: {
            body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
            args: [{
              "name": "_inline_1_arg0_",
              "lvalue": false,
              "rvalue": true,
              "count": 2
            }],
            thisVars: ["this_h"],
            localVars: []
          },
          post: {
            body: "return this_h",
            args: [],
            thisVars: ["this_h"],
            localVars: []
          }
        });
        exports.argmin = compile({
          args: ["index", "array", "shape"],
          pre: {
            body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
            args: [{
              name: "_inline_0_arg0_",
              lvalue: false,
              rvalue: false,
              count: 0
            }, {
              name: "_inline_0_arg1_",
              lvalue: false,
              rvalue: false,
              count: 0
            }, {
              name: "_inline_0_arg2_",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            thisVars: ["this_i", "this_v"],
            localVars: []
          },
          body: {
            body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
            args: [{
              name: "_inline_1_arg0_",
              lvalue: false,
              rvalue: true,
              count: 2
            }, {
              name: "_inline_1_arg1_",
              lvalue: false,
              rvalue: true,
              count: 2
            }],
            thisVars: ["this_i", "this_v"],
            localVars: ["_inline_1_k"]
          },
          post: {
            body: "{return this_i}",
            args: [],
            thisVars: ["this_i"],
            localVars: []
          }
        });
        exports.argmax = compile({
          args: ["index", "array", "shape"],
          pre: {
            body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
            args: [{
              name: "_inline_0_arg0_",
              lvalue: false,
              rvalue: false,
              count: 0
            }, {
              name: "_inline_0_arg1_",
              lvalue: false,
              rvalue: false,
              count: 0
            }, {
              name: "_inline_0_arg2_",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            thisVars: ["this_i", "this_v"],
            localVars: []
          },
          body: {
            body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
            args: [{
              name: "_inline_1_arg0_",
              lvalue: false,
              rvalue: true,
              count: 2
            }, {
              name: "_inline_1_arg1_",
              lvalue: false,
              rvalue: true,
              count: 2
            }],
            thisVars: ["this_i", "this_v"],
            localVars: ["_inline_1_k"]
          },
          post: {
            body: "{return this_i}",
            args: [],
            thisVars: ["this_i"],
            localVars: []
          }
        });
        exports.random = makeOp({
          args: ["array"],
          pre: {
            args: [],
            body: "this_f=Math.random",
            thisVars: ["this_f"]
          },
          body: {
            args: ["a"],
            body: "a=this_f()",
            thisVars: ["this_f"]
          },
          funcName: "random"
        });
        exports.assign = makeOp({
          args: ["array", "array"],
          body: {
            args: ["a", "b"],
            body: "a=b"
          },
          funcName: "assign"
        });
        exports.assigns = makeOp({
          args: ["array", "scalar"],
          body: {
            args: ["a", "b"],
            body: "a=b"
          },
          funcName: "assigns"
        });
        exports.equals = compile({
          args: ["array", "array"],
          pre: EmptyProc,
          body: {
            args: [{
              name: "x",
              lvalue: false,
              rvalue: true,
              count: 1
            }, {
              name: "y",
              lvalue: false,
              rvalue: true,
              count: 1
            }],
            body: "if(x!==y){return false}",
            localVars: [],
            thisVars: []
          },
          post: {
            args: [],
            localVars: [],
            thisVars: [],
            body: "return true"
          },
          funcName: "equals"
        });

        /***/
      }),
      /***/"./node_modules/ndarray/ndarray.js": (
      /*!*****************************************!*\
        !*** ./node_modules/ndarray/ndarray.js ***!
        \*****************************************/
      /***/
      function _node_modules_ndarray_ndarrayJs(module, __unused_webpack_exports, __webpack_require__) {
        var iota = __webpack_require__(/*! iota-array */"./node_modules/iota-array/iota.js");
        var isBuffer = __webpack_require__(/*! is-buffer */"./node_modules/is-buffer/index.js");
        var hasTypedArrays = typeof Float64Array !== "undefined";
        function compare1st(a, b) {
          return a[0] - b[0];
        }
        function order() {
          var stride = this.stride;
          var terms = new Array(stride.length);
          var i;
          for (i = 0; i < terms.length; ++i) {
            terms[i] = [Math.abs(stride[i]), i];
          }
          terms.sort(compare1st);
          var result = new Array(terms.length);
          for (i = 0; i < result.length; ++i) {
            result[i] = terms[i][1];
          }
          return result;
        }
        function compileConstructor(dtype, dimension) {
          var className = ["View", dimension, "d", dtype].join("");
          if (dimension < 0) {
            className = "View_Nil" + dtype;
          }
          var useGetters = dtype === "generic";
          if (dimension === -1) {
            //Special case for trivial arrays
            var code = "function " + className + "(a){this.data=a;};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new " + className + "(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_" + className + "(a){return new " + className + "(a);}";
            var procedure = new Function(code);
            return procedure();
          } else if (dimension === 0) {
            //Special case for 0d arrays
            var code = "function " + className + "(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function " + className + "_copy() {\
return new " + className + "(this.data,this.offset)\
};\
proto.pick=function " + className + "_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function " + className + "_get(){\
return " + (useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};\
proto.set=function " + className + "_set(v){\
return " + (useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "\
};\
return function construct_" + className + "(a,b,c,d){return new " + className + "(a,d)}";
            var procedure = new Function("TrivialArray", code);
            return procedure(CACHED_CONSTRUCTORS[dtype][0]);
          }
          var code = ["'use strict'"];

          //Create constructor for view
          var indices = iota(dimension);
          var args = indices.map(function (i) {
            return "i" + i;
          });
          var index_str = "this.offset+" + indices.map(function (i) {
            return "this.stride[" + i + "]*i" + i;
          }).join("+");
          var shapeArg = indices.map(function (i) {
            return "b" + i;
          }).join(",");
          var strideArg = indices.map(function (i) {
            return "c" + i;
          }).join(",");
          code.push("function " + className + "(a," + shapeArg + "," + strideArg + ",d){this.data=a", "this.shape=[" + shapeArg + "]", "this.stride=[" + strideArg + "]", "this.offset=d|0}", "var proto=" + className + ".prototype", "proto.dtype='" + dtype + "'", "proto.dimension=" + dimension);

          //view.size:
          code.push("Object.defineProperty(proto,'size',{get:function " + className + "_size(){\
return " + indices.map(function (i) {
            return "this.shape[" + i + "]";
          }).join("*"), "}})");

          //view.order:
          if (dimension === 1) {
            code.push("proto.order=[0]");
          } else {
            code.push("Object.defineProperty(proto,'order',{get:");
            if (dimension < 4) {
              code.push("function " + className + "_order(){");
              if (dimension === 2) {
                code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
              } else if (dimension === 3) {
                code.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})");
              }
            } else {
              code.push("ORDER})");
            }
          }

          //view.set(i0, ..., v):
          code.push("proto.set=function " + className + "_set(" + args.join(",") + ",v){");
          if (useGetters) {
            code.push("return this.data.set(" + index_str + ",v)}");
          } else {
            code.push("return this.data[" + index_str + "]=v}");
          }

          //view.get(i0, ...):
          code.push("proto.get=function " + className + "_get(" + args.join(",") + "){");
          if (useGetters) {
            code.push("return this.data.get(" + index_str + ")}");
          } else {
            code.push("return this.data[" + index_str + "]}");
          }

          //view.index:
          code.push("proto.index=function " + className + "_index(", args.join(), "){return " + index_str + "}");

          //view.hi():
          code.push("proto.hi=function " + className + "_hi(" + args.join(",") + "){return new " + className + "(this.data," + indices.map(function (i) {
            return ["(typeof i", i, "!=='number'||i", i, "<0)?this.shape[", i, "]:i", i, "|0"].join("");
          }).join(",") + "," + indices.map(function (i) {
            return "this.stride[" + i + "]";
          }).join(",") + ",this.offset)}");

          //view.lo():
          var a_vars = indices.map(function (i) {
            return "a" + i + "=this.shape[" + i + "]";
          });
          var c_vars = indices.map(function (i) {
            return "c" + i + "=this.stride[" + i + "]";
          });
          code.push("proto.lo=function " + className + "_lo(" + args.join(",") + "){var b=this.offset,d=0," + a_vars.join(",") + "," + c_vars.join(","));
          for (var i = 0; i < dimension; ++i) {
            code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){\
d=i" + i + "|0;\
b+=c" + i + "*d;\
a" + i + "-=d}");
          }
          code.push("return new " + className + "(this.data," + indices.map(function (i) {
            return "a" + i;
          }).join(",") + "," + indices.map(function (i) {
            return "c" + i;
          }).join(",") + ",b)}");

          //view.step():
          code.push("proto.step=function " + className + "_step(" + args.join(",") + "){var " + indices.map(function (i) {
            return "a" + i + "=this.shape[" + i + "]";
          }).join(",") + "," + indices.map(function (i) {
            return "b" + i + "=this.stride[" + i + "]";
          }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
          for (var i = 0; i < dimension; ++i) {
            code.push("if(typeof i" + i + "==='number'){\
d=i" + i + "|0;\
if(d<0){\
c+=b" + i + "*(a" + i + "-1);\
a" + i + "=ceil(-a" + i + "/d)\
}else{\
a" + i + "=ceil(a" + i + "/d)\
}\
b" + i + "*=d\
}");
          }
          code.push("return new " + className + "(this.data," + indices.map(function (i) {
            return "a" + i;
          }).join(",") + "," + indices.map(function (i) {
            return "b" + i;
          }).join(",") + ",c)}");

          //view.transpose():
          var tShape = new Array(dimension);
          var tStride = new Array(dimension);
          for (var i = 0; i < dimension; ++i) {
            tShape[i] = "a[i" + i + "]";
            tStride[i] = "b[i" + i + "]";
          }
          code.push("proto.transpose=function " + className + "_transpose(" + args + "){" + args.map(function (n, idx) {
            return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)";
          }).join(";"), "var a=this.shape,b=this.stride;return new " + className + "(this.data," + tShape.join(",") + "," + tStride.join(",") + ",this.offset)}");

          //view.pick():
          code.push("proto.pick=function " + className + "_pick(" + args + "){var a=[],b=[],c=this.offset");
          for (var i = 0; i < dimension; ++i) {
            code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){c=(c+this.stride[" + i + "]*i" + i + ")|0}else{a.push(this.shape[" + i + "]);b.push(this.stride[" + i + "])}");
          }
          code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}");

          //Add return statement
          code.push("return function construct_" + className + "(data,shape,stride,offset){return new " + className + "(data," + indices.map(function (i) {
            return "shape[" + i + "]";
          }).join(",") + "," + indices.map(function (i) {
            return "stride[" + i + "]";
          }).join(",") + ",offset)}");

          //Compile procedure
          var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"));
          return procedure(CACHED_CONSTRUCTORS[dtype], order);
        }
        function arrayDType(data) {
          if (isBuffer(data)) {
            return "buffer";
          }
          if (hasTypedArrays) {
            switch (Object.prototype.toString.call(data)) {
              case "[object Float64Array]":
                return "float64";
              case "[object Float32Array]":
                return "float32";
              case "[object Int8Array]":
                return "int8";
              case "[object Int16Array]":
                return "int16";
              case "[object Int32Array]":
                return "int32";
              case "[object Uint8Array]":
                return "uint8";
              case "[object Uint16Array]":
                return "uint16";
              case "[object Uint32Array]":
                return "uint32";
              case "[object Uint8ClampedArray]":
                return "uint8_clamped";
              case "[object BigInt64Array]":
                return "bigint64";
              case "[object BigUint64Array]":
                return "biguint64";
            }
          }
          if (Array.isArray(data)) {
            return "array";
          }
          return "generic";
        }
        var CACHED_CONSTRUCTORS = {
          "float32": [],
          "float64": [],
          "int8": [],
          "int16": [],
          "int32": [],
          "uint8": [],
          "uint16": [],
          "uint32": [],
          "array": [],
          "uint8_clamped": [],
          "bigint64": [],
          "biguint64": [],
          "buffer": [],
          "generic": []
        };
        (function () {
          for (var id in CACHED_CONSTRUCTORS) {
            CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1));
          }
        });
        function wrappedNDArrayCtor(data, shape, stride, offset) {
          if (data === undefined) {
            var ctor = CACHED_CONSTRUCTORS.array[0];
            return ctor([]);
          } else if (typeof data === "number") {
            data = [data];
          }
          if (shape === undefined) {
            shape = [data.length];
          }
          var d = shape.length;
          if (stride === undefined) {
            stride = new Array(d);
            for (var i = d - 1, sz = 1; i >= 0; --i) {
              stride[i] = sz;
              sz *= shape[i];
            }
          }
          if (offset === undefined) {
            offset = 0;
            for (var i = 0; i < d; ++i) {
              if (stride[i] < 0) {
                offset -= (shape[i] - 1) * stride[i];
              }
            }
          }
          var dtype = arrayDType(data);
          var ctor_list = CACHED_CONSTRUCTORS[dtype];
          while (ctor_list.length <= d + 1) {
            ctor_list.push(compileConstructor(dtype, ctor_list.length - 1));
          }
          var ctor = ctor_list[d + 1];
          return ctor(data, shape, stride, offset);
        }
        module.exports = wrappedNDArrayCtor;

        /***/
      }),
      /***/"./node_modules/numjs/src/config.js": (
      /*!******************************************!*\
        !*** ./node_modules/numjs/src/config.js ***!
        \******************************************/
      /***/
      function _node_modules_numjs_src_configJs(module) {
        "use strict";

        module.exports = {
          printThreshold: 7,
          nFloatingValues: 5
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/dtypes.js": (
      /*!******************************************!*\
        !*** ./node_modules/numjs/src/dtypes.js ***!
        \******************************************/
      /***/
      function _node_modules_numjs_src_dtypesJs(module) {
        "use strict";

        module.exports = {
          int8: Int8Array,
          int16: Int16Array,
          int32: Int32Array,
          uint8: Uint8Array,
          uint16: Uint16Array,
          uint32: Uint32Array,
          float32: Float32Array,
          float64: Float64Array,
          array: Array
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/errors.js": (
      /*!******************************************!*\
        !*** ./node_modules/numjs/src/errors.js ***!
        \******************************************/
      /***/
      function _node_modules_numjs_src_errorsJs(module) {
        "use strict";

        module.exports = {
          ValueError: function ValueError() {
            var err = Error.apply(this, arguments);
            err.name = this.constructor.name;
            return err;
          },
          ConfigError: function ConfigError() {
            var err = Error.apply(this, arguments);
            err.name = this.constructor.name;
            return err;
          },
          NotImplementedError: function NotImplementedError() {
            var err = Error.apply(this, arguments);
            err.name = this.constructor.name;
            return err;
          }
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/area-sum.js": (
      /*!***************************************************!*\
        !*** ./node_modules/numjs/src/images/area-sum.js ***!
        \***************************************************/
      /***/
      function _node_modules_numjs_src_images_areaSumJs(module) {
        "use strict";

        module.exports = function areaSum(h0, w0, H, W, SAT) {
          var x0 = w0 - 1;
          var x1 = w0 + W - 1;
          var y0 = h0 - 1;
          var y1 = h0 + H - 1;
          return w0 !== 0 && h0 !== 0 ? SAT.selection.get(y0, x0) - SAT.selection.get(y1, x0) - SAT.selection.get(y0, x1) + SAT.selection.get(y1, x1) : w0 === 0 && h0 === 0 ? SAT.selection.get(h0 + H - 1, w0 + W - 1) : w0 === 0 ? -SAT.selection.get(y0, w0 + W - 1) + SAT.selection.get(h0 + H - 1, w0 + W - 1) : -SAT.selection.get(y1, x0) + SAT.selection.get(y1, x1);
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/area-value.js": (
      /*!*****************************************************!*\
        !*** ./node_modules/numjs/src/images/area-value.js ***!
        \*****************************************************/
      /***/
      function _node_modules_numjs_src_images_areaValueJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var areaSum = __webpack_require__(/*! ./area-sum */"./node_modules/numjs/src/images/area-sum.js");
        module.exports = function areaValue(h0, w0, H, W, SAT) {
          return areaSum(h0, w0, H, W, SAT) / (H * W);
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/data.js": (
      /*!***********************************************!*\
        !*** ./node_modules/numjs/src/images/data.js ***!
        \***********************************************/
      /***/
      function _node_modules_numjs_src_images_dataJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var __dirname = "/";

        // var path = require('path');
        var path = __webpack_require__(/*! path-browserify */"path-browserify");
        var read = __webpack_require__(/*! ./read */"./node_modules/numjs/src/images/read-dom.js");
        var DATA_DIR = path.join(path.resolve(__dirname), '../../data');
        function getArray(fileName) {
          return read(path.join(DATA_DIR, fileName));
        }
        var exports = {};

        /**
        * @property {NdArray} digit - 28x28 grayscale image with an handwritten digit extracted from MNIST database
        */
        Object.defineProperty(exports, 'digit', {
          get: function get() {
            return getArray('five.png');
          }
        });

        /**
        * @property {NdArray} five - 28x28 grayscale image with an handwritten digit extracted from MNIST database
        */
        Object.defineProperty(exports, 'five', {
          get: function get() {
            return getArray('five.png');
          }
        });

        /**
        * @property {NdArray} node - 300x600 COLOR image representing Node.js's logo
        */
        Object.defineProperty(exports, 'node', {
          get: function get() {
            return getArray('nodejs.png');
          }
        });

        /**
        * @property {NdArray} lena - The standard, yet sometimes controversial Lena test image was scanned from the November 1972 edition of Playboy magazine. From an image processing perspective, this image is useful because it contains smooth, textured, shaded as well as detail areas.
        */
        Object.defineProperty(exports, 'lena', {
          get: function get() {
            return getArray('lenna.png');
          }
        });

        /**
        * @property {NdArray} lenna - The standard, yet sometimes controversial Lena test image was scanned from the November 1972 edition of Playboy magazine. From an image processing perspective, this image is useful because it contains smooth, textured, shaded as well as detail areas.
        */
        Object.defineProperty(exports, 'lenna', {
          get: function get() {
            return getArray('lenna.png');
          }
        });

        /**
        * @property {NdArray} moon - This low-contrast image of the surface of the moon is useful for illustrating histogram equalization and contrast stretching.
        */
        Object.defineProperty(exports, 'moon', {
          get: function get() {
            return getArray('moon.jpg');
          }
        });
        module.exports = exports;

        /***/
      }),
      /***/"./node_modules/numjs/src/images/flip.js": (
      /*!***********************************************!*\
        !*** ./node_modules/numjs/src/images/flip.js ***!
        \***********************************************/
      /***/
      function _node_modules_numjs_src_images_flipJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        module.exports = function flipImage(img) {
          return new NdArray(img.selection.step(null, -1));
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/index.js": (
      /*!************************************************!*\
        !*** ./node_modules/numjs/src/images/index.js ***!
        \************************************************/
      /***/
      function _node_modules_numjs_src_images_indexJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        /**
         * This callback type is called `imgCallback` and is displayed as a global symbol.
         *
         * @callback imgCallback
         * @param {err} error - if any, null otherwise
         * @param {NdArray} - image represented as a (H, W, [K,]) array, with K the number of color channels. if image is grayscale (or B&W) then image only have two dimensions H and W
         */
        module.exports = {
          data: __webpack_require__(/*! ./data */"./node_modules/numjs/src/images/data.js"),
          read: __webpack_require__(/*! ./read */"./node_modules/numjs/src/images/read-dom.js"),
          save: __webpack_require__(/*! ./save */"./node_modules/numjs/src/images/save-dom.js"),
          resize: __webpack_require__(/*! ./resize */"./node_modules/numjs/src/images/resize-dom.js"),
          sat: __webpack_require__(/*! ./sat */"./node_modules/numjs/src/images/sat.js"),
          ssat: __webpack_require__(/*! ./ssat */"./node_modules/numjs/src/images/ssat.js"),
          sobel: __webpack_require__(/*! ./sobel */"./node_modules/numjs/src/images/sobel.js"),
          scharr: __webpack_require__(/*! ./scharr */"./node_modules/numjs/src/images/scharr.js"),
          areaSum: __webpack_require__(/*! ./area-sum */"./node_modules/numjs/src/images/area-sum.js"),
          areaValue: __webpack_require__(/*! ./area-value */"./node_modules/numjs/src/images/area-value.js"),
          rgb2gray: __webpack_require__(/*! ./rgb2gray */"./node_modules/numjs/src/images/rgb2gray.js"),
          flip: __webpack_require__(/*! ./flip */"./node_modules/numjs/src/images/flip.js")
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/is-grayscale.js": (
      /*!*******************************************************!*\
        !*** ./node_modules/numjs/src/images/is-grayscale.js ***!
        \*******************************************************/
      /***/
      function _node_modules_numjs_src_images_isGrayscaleJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var doCheckIsGrayscale = cwise({
          args: ['array', 'array', 'array'],
          pre: function pre() {
            this.isgray = true;
          },
          body: function doCheckIsGrayscaleCwise(xR, xG, xB) {
            if (xR !== xG || xG !== xB) {
              this.isgray = false;
            }
          },
          post: function post() {
            return this.isgray;
          }
        });
        module.exports = function isGrayscaleImage(arr) {
          if (arr instanceof NdArray) {
            arr = arr.selection;
          }
          var aShape = arr.shape;
          if (aShape.length === 1) {
            return false;
          }
          if (aShape.length === 2 || aShape.length === 3 && aShape[2] === 1) {
            return true;
          } else if (aShape.length === 3 && (aShape[2] === 3 || aShape[2] === 4)) {
            return doCheckIsGrayscale(arr.pick(null, null, 0), arr.pick(null, null, 1), arr.pick(null, null, 2));
          }
          return false;
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/read-dom.js": (
      /*!***************************************************!*\
        !*** ./node_modules/numjs/src/images/read-dom.js ***!
        \***************************************************/
      /***/
      function _node_modules_numjs_src_images_readDomJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        /* global HTMLCanvasElement */
        var ndarray = __webpack_require__(/*! ndarray */"./node_modules/ndarray/ndarray.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var errors = __webpack_require__(/*! ../errors */"./node_modules/numjs/src/errors.js");
        var isGrayscale = __webpack_require__(/*! ./is-grayscale */"./node_modules/numjs/src/images/is-grayscale.js");
        module.exports = function readImageDom(input) {
          if (input instanceof HTMLCanvasElement) {
            return processCanvas(input);
          } else if (input instanceof HTMLImageElement) {
            return processImg(input);
          } else {
            throw new errors.ValueError('expect input to be either an HTML Canvas or a (loaded) Image');
          }
        };
        function processCanvas(canvas) {
          var context = canvas.getContext('2d');
          var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
          var shape = [canvas.width, canvas.height, 4];
          var stride = [4, 4 * canvas.width, 1];
          var wxh = ndarray(new Uint8Array(pixels.data), shape, stride, 0);
          var hxw = wxh.transpose(1, 0);
          if (isGrayscale(hxw)) {
            hxw = hxw.pick(null, null, 0);
          }
          return new NdArray(hxw);
        }
        function processImg(img) {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          var pixels = context.getImageData(0, 0, img.width, img.height);
          var shape = [img.width, img.height, 4];
          var stride = [4, 4 * img.width, 1];
          var wxh = ndarray(new Uint8Array(pixels.data), shape, stride, 0);
          var hxw = wxh.transpose(1, 0);
          if (isGrayscale(hxw)) {
            hxw = hxw.pick(null, null, 0);
          }
          return new NdArray(hxw);
        }

        /***/
      }),
      /***/"./node_modules/numjs/src/images/resize-dom.js": (
      /*!*****************************************************!*\
        !*** ./node_modules/numjs/src/images/resize-dom.js ***!
        \*****************************************************/
      /***/
      function _node_modules_numjs_src_images_resizeDomJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var _ = __webpack_require__(/*! ./utils */"./node_modules/numjs/src/images/utils.js");
        var ndarray = __webpack_require__(/*! ndarray */"./node_modules/ndarray/ndarray.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        module.exports = function resizeImageDom(img, height, width) {
          var iShape = img.shape;
          var H = iShape[0];
          var W = iShape[1];
          var K = iShape[2] || 1;
          var originalCanvas = document.createElement('canvas');
          originalCanvas.height = H;
          originalCanvas.width = W;
          var originalCtx = originalCanvas.getContext('2d');
          var originalImg = originalCtx.createImageData(W, H);
          var err = _.setRawData(img.selection, originalImg.data);
          if (err) {
            throw err;
          }

          // compute cropping
          var cfH = H / height;
          var cfW = W / width;
          var cf = Math.min(cfH, cfW);
          var cH = height * cf;
          var cW = width * cf;
          var cdH = (H - cf * height) / 2;
          var cdW = (W - cf * width) / 2;
          originalCtx.putImageData(originalImg, 0, 0);
          originalCtx.drawImage(originalCanvas, cdW, cdH, cW, cH, 0, 0, width, height);
          var resizedImg = originalCtx.getImageData(0, 0, width, height);
          var shape = [width | 0, height | 0, 4];
          var stride = [4, 4 * width | 0, 1];
          var wxh = ndarray(new Uint8Array(resizedImg.data), shape, stride, 0);
          var hxw = wxh.transpose(1, 0);
          if (iShape.length === 2) {
            hxw = hxw.pick(null, null, 0);
          } else if (iShape.length === 3 && K === 1) {
            hxw = hxw.pick(null, null, 0);
          }
          return new NdArray(hxw);
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/rgb2gray.js": (
      /*!***************************************************!*\
        !*** ./node_modules/numjs/src/images/rgb2gray.js ***!
        \***************************************************/
      /***/
      function _node_modules_numjs_src_images_rgb2grayJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var __ = __webpack_require__(/*! ../utils */"./node_modules/numjs/src/utils.js");

        // takes ~157ms on a 5000x5000 image
        var doRgb2gray = cwise({
          args: ['array', 'array', 'array', 'array'],
          body: function rgb2grayCwise(y, xR, xG, xB) {
            y = xR * 4899 + xG * 9617 + xB * 1868 + 8192 >> 14;
          }
        });

        /**
         * Compute Grayscale version of an RGB image.
         * @param {NdArray}  img The image in RGB format. In a 3-D array of shape (h, w, 3), or in RGBA format with shape (h, w, 4).
         * @returns {NdArray} The grayscale image, a 3-D array  of shape (h, w, 1).
         */
        module.exports = function rgb2gray(img) {
          if (!(img instanceof NdArray)) {
            img = new NdArray(img); // assume it is an ndarray
          }
          var iShape = img.shape;
          var h = iShape[0];
          var w = iShape[1];
          var k = iShape[2] || 1;
          if (k === 1) {
            return img; // already gray
          }
          var oShape = [h, w];
          var out = new NdArray(new Uint8Array(__.shapeSize(oShape)), oShape);
          var r = img.selection.pick(null, null, 0);
          var g = img.selection.pick(null, null, 1);
          var b = img.selection.pick(null, null, 2);
          doRgb2gray(out.selection, r, g, b);
          return out;
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/sat.js": (
      /*!**********************************************!*\
        !*** ./node_modules/numjs/src/images/sat.js ***!
        \**********************************************/
      /***/
      function _node_modules_numjs_src_images_satJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var rgb2gray = __webpack_require__(/*! ./rgb2gray */"./node_modules/numjs/src/images/rgb2gray.js");
        var doIntegrate = cwise({
          args: ['array', 'array', 'index', {
            offset: [-1, -1],
            array: 0
          }, {
            offset: [-1, 0],
            array: 0
          }, {
            offset: [0, -1],
            array: 0
          }],
          body: function doIntegrateBody(sat, x, index, satA, satB, satC) {
            sat = index[0] !== 0 && index[1] !== 0 ? x + satB + satC - satA : index[0] === 0 && index[1] === 0 ? x : index[0] === 0 ? x + satC : x + satB;
          }
        });

        /**
         * Compute Sum Area Table, also known as the integral of the image
         * @param {NdArray} img
         * @returns {NdArray}
         */
        module.exports = function computeSumAreaTable(img) {
          var gray = rgb2gray(img);
          var iShape = gray.shape;
          var iH = iShape[0];
          var iW = iShape[1];
          var out = new NdArray(new Uint32Array(iH * iW), [iH, iW]);
          doIntegrate(out.selection, gray.selection);
          return out;
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/save-dom.js": (
      /*!***************************************************!*\
        !*** ./node_modules/numjs/src/images/save-dom.js ***!
        \***************************************************/
      /***/
      function _node_modules_numjs_src_images_saveDomJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var _ = __webpack_require__(/*! ./utils */"./node_modules/numjs/src/images/utils.js");
        var errors = __webpack_require__(/*! ../errors */"./node_modules/numjs/src/errors.js");

        /**
         * Save image on the given destination
         *
         * @param {NdArray} img
         * @param {HTMLCanvasElement} dest
         */
        module.exports = function saveImageDom(img, dest) {
          var iShape = img.shape;
          var iH = iShape[0];
          var iW = iShape[1];
          if (dest instanceof HTMLCanvasElement) {
            var $tmp = document.createElement('canvas');
            $tmp.height = iH;
            $tmp.width = iW;
            var tmpCtx = $tmp.getContext('2d');
            var originalImg = tmpCtx.createImageData(iW, iH);
            var err = _.setRawData(img.selection, originalImg.data);
            if (err) {
              throw err;
            }
            tmpCtx.putImageData(originalImg, 0, 0);
            tmpCtx.drawImage($tmp, iW, iH);
            dest.getContext('2d').drawImage($tmp, 0, 0, iW, iH, 0, 0, dest.width, dest.height);
          } else {
            throw new errors.ValueError('expect input to be either an HTML Canvas or a (loaded) Image');
          }
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/scharr.js": (
      /*!*************************************************!*\
        !*** ./node_modules/numjs/src/images/scharr.js ***!
        \*************************************************/
      /***/
      function _node_modules_numjs_src_images_scharrJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var ops = __webpack_require__(/*! ndarray-ops */"./node_modules/ndarray-ops/ndarray-ops.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var __ = __webpack_require__(/*! ../utils */"./node_modules/numjs/src/utils.js");
        var rgb2gray = __webpack_require__(/*! ./rgb2gray */"./node_modules/numjs/src/images/rgb2gray.js");
        var doScharr = cwise({
          args: ['array',
          // schar
          'array',
          // img
          {
            offset: [-1, -1],
            array: 1
          },
          // a
          {
            offset: [-1, 0],
            array: 1
          },
          // b
          {
            offset: [-1, 1],
            array: 1
          },
          // c
          {
            offset: [0, -1],
            array: 1
          },
          // d
          // {offset:[ 9,  0], array:1}, // useless since available already and always multiplied by zero
          {
            offset: [0, 1],
            array: 1
          },
          // f
          {
            offset: [1, -1],
            array: 1
          },
          // g
          {
            offset: [1, 0],
            array: 1
          },
          // h
          {
            offset: [1, 1],
            array: 1
          } // i
          ],
          body: function doSobelBody(s, img, a, b, c, d, f, g, h, i) {
            var sV = 3 * a + 10 * b + 3 * c - 3 * g - 10 * h - 3 * i;
            var sH = 3 * a - 3 * c + 10 * d - 10 * f + 3 * g - 3 * i;
            s = Math.sqrt(sH * sH + sV * sV);
          }
        });

        /**
         * Find the edge magnitude using the Scharr transform.
         *
         * @note
         * Take the square root of the sum of the squares of the horizontal and vertical Scharrs to get a magnitude
         * that is somewhat insensitive to direction. The Scharr operator has a better rotation invariance than other
         * edge filters, such as the Sobel operators.
         *
         * @param {NdArray} img
         */
        module.exports = function computeScharr(img) {
          var gray = rgb2gray(img);
          var iShape = gray.shape;
          var iH = iShape[0];
          var iW = iShape[1];
          var out = new NdArray(new Float32Array(__.shapeSize(iShape)), iShape);
          doScharr(out.selection, gray.selection);

          // set borders to zero (invalid anyway)
          ops.assigns(out.selection.pick(0, null), 0); // first line
          ops.assigns(out.selection.pick(null, 0), 0); // first col
          ops.assigns(out.selection.pick(iH - 1, null), 0); // last line
          ops.assigns(out.selection.pick(null, iW - 1), 0); // last col

          return out.divide(16 * Math.sqrt(2), false);
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/sobel.js": (
      /*!************************************************!*\
        !*** ./node_modules/numjs/src/images/sobel.js ***!
        \************************************************/
      /***/
      function _node_modules_numjs_src_images_sobelJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var ops = __webpack_require__(/*! ndarray-ops */"./node_modules/ndarray-ops/ndarray-ops.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var __ = __webpack_require__(/*! ../utils */"./node_modules/numjs/src/utils.js");
        var rgb2gray = __webpack_require__(/*! ./rgb2gray */"./node_modules/numjs/src/images/rgb2gray.js");
        var doSobel = cwise({
          args: ['array',
          //  sobel
          'array',
          // img
          {
            offset: [-1, -1],
            array: 1
          },
          // a
          {
            offset: [-1, 0],
            array: 1
          },
          // b
          {
            offset: [-1, 1],
            array: 1
          },
          // c
          {
            offset: [0, -1],
            array: 1
          },
          // d
          // {offset:[ 9,  0], array:1}, // useless since available already and always multiplied by zero
          {
            offset: [0, 1],
            array: 1
          },
          // f
          {
            offset: [1, -1],
            array: 1
          },
          // g
          {
            offset: [1, 0],
            array: 1
          },
          // h
          {
            offset: [1, 1],
            array: 1
          } // i
          ],
          body: function doSobelBody(s, img, a, b, c, d, f, g, h, i) {
            var sV = a + 2 * b + c - g - 2 * h - i;
            var sH = a - c + 2 * d - 2 * f + g - i;
            s = Math.sqrt(sH * sH + sV * sV);
          }
        });

        /**
         * Find the edge magnitude using the Sobel transform.
         *
         * @note
         * Take the square root of the sum of the squares of the horizontal and vertical Sobels to get a magnitude that’s somewhat insensitive to direction.
         *
         * The 3x3 convolution kernel used in the horizontal and vertical Sobels is an approximation of the
         * gradient of the image (with some slight blurring since 9 pixels are used to compute the gradient at a given pixel).
         * As an approximation of the gradient, the Sobel operator is not completely rotation-invariant. The Scharr operator should be used for a better rotation invariance.
         * @param {NdArray} img
         */
        module.exports = function computeSobel(img) {
          var gray = rgb2gray(img);
          var iShape = gray.shape;
          var iH = iShape[0];
          var iW = iShape[1];
          var out = new NdArray(new Float32Array(__.shapeSize(iShape)), iShape);
          doSobel(out.selection, gray.selection);

          // set borders to zero (invalid anyway)
          ops.assigns(out.selection.pick(0, null), 0); // first line
          ops.assigns(out.selection.pick(null, 0), 0); // first col
          ops.assigns(out.selection.pick(iH - 1, null), 0); // last line
          ops.assigns(out.selection.pick(null, iW - 1), 0); // last col

          return out.divide(4 * Math.sqrt(2), false);
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/ssat.js": (
      /*!***********************************************!*\
        !*** ./node_modules/numjs/src/images/ssat.js ***!
        \***********************************************/
      /***/
      function _node_modules_numjs_src_images_ssatJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");
        var rgb2gray = __webpack_require__(/*! ./rgb2gray */"./node_modules/numjs/src/images/rgb2gray.js");
        var doIntegrate = cwise({
          args: ['array', 'array', 'index', {
            offset: [-1, -1],
            array: 0
          }, {
            offset: [-1, 0],
            array: 0
          }, {
            offset: [0, -1],
            array: 0
          }],
          body: function doIntegrateBody(ssat, x, index, ssatA, ssatB, ssatC) {
            ssat = index[0] !== 0 && index[1] !== 0 ? x * x + ssatB + ssatC - ssatA : index[0] === 0 && index[1] === 0 ? x * x : index[0] === 0 ? x * x + ssatC : x * x + ssatB;
          }
        });

        /**
         * Compute Squared Sum Area Table, also known as the integral of the squared image
         * @param {NdArray} img
         * @returns {NdArray}
         */
        module.exports = function computeSquaredSumAreaTable(img) {
          var gray = rgb2gray(img);
          var iShape = gray.shape;
          var iH = iShape[0];
          var iW = iShape[1];
          var out = new NdArray(new Uint32Array(iH * iW), [iH, iW]);
          doIntegrate(out.selection, gray.selection);
          return out;
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/images/utils.js": (
      /*!************************************************!*\
        !*** ./node_modules/numjs/src/images/utils.js ***!
        \************************************************/
      /***/
      function _node_modules_numjs_src_images_utilsJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var NdArray = __webpack_require__(/*! ../ndarray */"./node_modules/numjs/src/ndarray.js");

        /**
         *
         * @param {NdArray} array
         * @returns {*}
         */
        module.exports.getRawData = function getRawData(array) {
          if (array instanceof NdArray) {
            array = array.selection; // faster
          }
          var h;
          var w;
          var ptr = 0;
          var aShape = array.shape;
          var H = aShape[0];
          var W = aShape[1];
          var K = aShape[2] || 1;
          var data = new Uint8Array(H * W * K);
          if (array.shape.length === 3) {
            if (K === 3) {
              for (h = 0; h < H; ++h) {
                for (w = 0; w < W; ++w) {
                  data[ptr++] = array.get(h, w, 0);
                  data[ptr++] = array.get(h, w, 1);
                  data[ptr++] = array.get(h, w, 2);
                }
              }
            } else if (K === 4) {
              for (h = 0; h < H; ++h) {
                for (w = 0; w < W; ++w) {
                  data[ptr++] = array.get(h, w, 0);
                  data[ptr++] = array.get(h, w, 1);
                  data[ptr++] = array.get(h, w, 2);
                  data[ptr++] = array.get(h, w, 3);
                }
              }
            } else if (K === 1) {
              for (h = 0; h < H; ++h) {
                for (w = 0; w < W; ++w) {
                  data[ptr++] = array.get(h, w, 0);
                }
              }
            } else {
              return new Error('Incompatible array shape');
            }
          } else if (array.shape.length === 2) {
            for (h = 0; h < H; ++h) {
              for (w = 0; w < W; ++w) {
                data[ptr++] = array.get(h, w);
              }
            }
          } else {
            return new Error('Invalid image');
          }
          return data;
        };
        module.exports.setRawData = function setRawData(array, data) {
          var h;
          var w;
          var ptr = 0;
          var c;
          var H = array.shape[0];
          var W = array.shape[1];
          var K = array.shape[2] || 1;
          if (array.shape.length === 3) {
            if (K === 3) {
              for (h = 0; h < H; ++h) {
                for (w = 0; w < W; ++w) {
                  data[ptr++] = array.get(h, w, 0);
                  data[ptr++] = array.get(h, w, 1);
                  data[ptr++] = array.get(h, w, 2);
                  data[ptr++] = 255;
                }
              }
            } else if (K === 4) {
              for (h = 0; h < H; ++h) {
                for (w = 0; w < W; ++w) {
                  data[ptr++] = array.get(h, w, 0);
                  data[ptr++] = array.get(h, w, 1);
                  data[ptr++] = array.get(h, w, 2);
                  data[ptr++] = array.get(h, w, 3);
                }
              }
            } else if (K === 1) {
              for (h = 0; h < H; ++h) {
                for (w = 0; w < W; ++w) {
                  c = array.get(h, w, 0);
                  data[ptr++] = c;
                  data[ptr++] = c;
                  data[ptr++] = c;
                  data[ptr++] = 255;
                }
              }
            } else {
              return new Error('Incompatible array shape');
            }
          } else if (array.shape.length === 2) {
            for (h = 0; h < H; ++h) {
              for (w = 0; w < W; ++w) {
                c = array.get(h, w);
                data[ptr++] = c;
                data[ptr++] = c;
                data[ptr++] = c;
                data[ptr++] = 255;
              }
            }
          } else {
            return new Error('Invalid image');
          }
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/index.js": (
      /*!*****************************************!*\
        !*** ./node_modules/numjs/src/index.js ***!
        \*****************************************/
      /***/
      function _node_modules_numjs_src_indexJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var ndarray = __webpack_require__(/*! ndarray */"./node_modules/ndarray/ndarray.js");
        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var ops = __webpack_require__(/*! ndarray-ops */"./node_modules/ndarray-ops/ndarray-ops.js");
        var ndFFT = __webpack_require__(/*! ndarray-fft */"./node_modules/ndarray-fft/fft.js");
        var CONF = __webpack_require__(/*! ./config */"./node_modules/numjs/src/config.js");
        var DTYPES = __webpack_require__(/*! ./dtypes */"./node_modules/numjs/src/dtypes.js");
        var NdArray = __webpack_require__(/*! ./ndarray */"./node_modules/numjs/src/ndarray.js");
        var _ = __webpack_require__(/*! ./utils */"./node_modules/numjs/src/utils.js");
        var errors = __webpack_require__(/*! ./errors */"./node_modules/numjs/src/errors.js");
        function broadcast(shape1, shape2) {
          if (shape1.length === 0 || shape2.length === 0) {
            return;
          }
          var reversed1 = shape1.slice().reverse();
          var reversed2 = shape2.slice().reverse();
          var maxLength = Math.max(shape1.length, shape2.length);
          var outShape = new Array(maxLength);
          for (var i = 0; i < maxLength; i++) {
            if (!reversed1[i] || reversed1[i] === 1) {
              outShape[i] = reversed2[i];
            } else if (!reversed2[i] || reversed2[i] === 1) {
              outShape[i] = reversed1[i];
            } else if (reversed1[i] === reversed2[i]) {
              outShape[i] = reversed1[i];
            } else {
              return;
            }
          }
          return outShape.reverse();
        }

        /**
         * Add arguments, element-wise.
         *
         * @param {(NdArray|Array|number)} a
         * @param {(NdArray|Array|number)} b
         * @returns {NdArray}
         */
        function add(a, b) {
          return NdArray.new(a).add(b);
        }

        /**
         * Multiply arguments, element-wise.
         *
         * @param {(Array|NdArray)} a
         * @param {(Array|NdArray|number)} b
         * @returns {NdArray}
         */
        function multiply(a, b) {
          return NdArray.new(a).multiply(b);
        }

        /**
         * Divide `a` by `b`, element-wise.
         *
         * @param {(Array|NdArray)} a
         * @param {(Array|NdArray|number)} b
         * @returns {NdArray}
         */
        function divide(a, b) {
          return NdArray.new(a).divide(b);
        }

        /**
         * Subtract second argument from the first, element-wise.
         *
         * @param {(NdArray|Array|number)} a
         * @param {(NdArray|Array|number)} b
         * @returns {NdArray}
         */
        function subtract(a, b) {
          return NdArray.new(a).subtract(b);
        }

        /**
         * Return true if two arrays have the same shape and elements, false otherwise.
         * @param {(Array|NdArray)} array1
         * @param {(Array|NdArray)} array2
         * @returns {boolean}
         */
        function equal(array1, array2) {
          return NdArray.new(array1).equal(array2);
        }

        /**
         * Return a copy of the array collapsed into one dimension using row-major order (C-style)
        
         * @param {(Array|NdArray)} array
         * @returns {NdArray}
         */
        function flatten(array) {
          return NdArray.new(array).flatten();
        }

        /**
         * Gives a new shape to an array without changing its data.
         * @param {(Array|NdArray)} array
         * @param {Array} shape - The new shape should be compatible with the original shape. If an integer, then the result will be a 1-D array of that length
         * @returns {NdArray}
         */
        function reshape(array, shape) {
          return NdArray.new(array).reshape(shape);
        }

        /**
         * Calculate the exponential of all elements in the input array, element-wise.
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function exp(x) {
          return NdArray.new(x).exp();
        }

        /**
         * Calculate the natural logarithm of all elements in the input array, element-wise.
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function log(x) {
          return NdArray.new(x).log();
        }

        /**
         * Calculate the positive square-root of all elements in the input array, element-wise.
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function sqrt(x) {
          return NdArray.new(x).sqrt();
        }

        /**
         * Raise first array elements to powers from second array, element-wise.
         *
         * @param {(Array|NdArray|number)} x1
         * @param {(Array|NdArray|number)} x2
         * @returns {NdArray}
         */
        function power(x1, x2) {
          return NdArray.new(x1).pow(x2);
        }

        /**
         * Return the sum of input array elements.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {number}
         */
        function sum(x) {
          return NdArray.new(x).sum();
        }

        /**
         * Return the arithmetic mean of input array elements.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {number}
         */
        function mean(x) {
          return NdArray.new(x).mean();
        }

        /**
         * Returns the standard deviation, a measure of the spread of a distribution, of the input array elements.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {number}
         */
        function std(x, options) {
          return NdArray.new(x).std(options);
        }

        /**
         * Return the minimum value of the array
         *
         * @param {(Array|NdArray|number)} x
         * @returns {Number}
         */
        function min(x) {
          return NdArray.new(x).min();
        }

        /**
         * Return the maximum value of the array
         *
         * @param {(Array|NdArray|number)} x
         * @returns {Number}
         */
        function max(x) {
          return NdArray.new(x).max();
        }

        /**
         * Return element-wise remainder of division.
         * Computes the remainder complementary to the `floor` function. It is equivalent to the Javascript modulus operator``x1 % x2`` and has the same sign as the divisor x2.
         *
         * @param {(NdArray|Array|number)} x1
         * @param {(NdArray|Array|number)} x2
         * @returns {NdArray}
         */
        function mod(x1, x2) {
          return NdArray.new(x1).mod(x2);
        }

        /**
         * Permute the dimensions of the input array according to the given axes.
         *
         * @param {(Array|NdArray|number)} x
         * @param {(number|...number)} [axes]
         * @returns {NdArray}
         * @example
         *
         arr = nj.arange(6).reshape(1,2,3)
         // array([[[ 0, 1, 2],
         //         [ 3, 4, 5]]])
         arr.T
         // array([[[ 0],
         //         [ 3]],
         //        [[ 1],
         //         [ 4]],
         //        [[ 2],
         //         [ 5]]])
        
         arr.transpose(1,0,2)
         // array([[[ 0, 1, 2]],
         //        [[ 3, 4, 5]]])
        
         */

        function transpose(x, axes) {
          return NdArray.new(x).transpose(axes);
        }

        /**
         * Return the inverse of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function negative(x) {
          return NdArray.new(x).negative();
        }

        /**
         * Return evenly spaced values within a given interval.
         *
         * @param {int} [start=0] - Start of interval. The interval includes this value.
         * @param {int} stop - End of interval. The interval does not include this value.
         * @param {int} [step=1] - Spacing between values. The default step size is 1. If step is specified, start must also be given.
         * @param {(String|Object)} [dtype=Array] The type of the output array.
         *
         * @return {NdArray} Array of evenly spaced values.
         */
        function arange(start, stop, step, dtype) {
          if (arguments.length === 1) {
            return arange(0, start, 1, undefined);
          } else if (arguments.length === 2 && _.isNumber(stop)) {
            return arange(start, stop, 1, undefined);
          } else if (arguments.length === 2) {
            return arange(0, start, 1, stop);
          } else if (arguments.length === 3 && !_.isNumber(step)) {
            return arange(start, stop, 1, step);
          }
          var result = [];
          var i = 0;
          while (start < stop) {
            result[i++] = start;
            start += step;
          }
          return NdArray.new(result, dtype);
        }

        /**
         * Return a new array of given shape and type, filled with zeros.
         *
         * @param {(Array|int)} shape - Shape of the new array, e.g., [2, 3] or 2.
         * @param {(String|Object)}  [dtype=Array]  The type of the output array.
         *
         * @return {NdArray} Array of zeros with the given shape and dtype
         */
        function zeros(shape, dtype) {
          if (_.isNumber(shape) && shape >= 0) {
            shape = [shape];
          }
          var s = _.shapeSize(shape);
          var T = _.getType(dtype);
          var arr = new NdArray(new T(s), shape);
          if (arr.dtype === 'array') {
            ops.assigns(arr.selection, 0);
          }
          return arr;
        }

        /**
         * Return a new array of given shape and type, filled with ones.
         *
         * @param {(Array|int)} shape - Shape of the new array, e.g., [2, 3] or 2.
         * @param {(String|Object)}  [dtype=Array] - The type of the output array.
         *
         * @return {NdArray} Array of ones with the given shape and dtype
         */
        function ones(shape, dtype) {
          if (_.isNumber(shape) && shape >= 0) {
            shape = [shape];
          }
          var s = _.shapeSize(shape);
          var T = _.getType(dtype);
          var arr = new NdArray(new T(s), shape);
          ops.assigns(arr.selection, 1);
          return arr;
        }

        /**
         * Return a new array of given shape and type, filled with `undefined` values.
         *
         * @param {(Array|int)} shape - Shape of the new array, e.g., [2, 3] or 2.
         * @param {(String|Object)}  [dtype=Array] - The type of the output array.
         *
         * @return {NdArray} Array of `undefined` values with the given shape and dtype
         */
        function empty(shape, dtype) {
          if (_.isNumber(shape) && shape >= 0) {
            shape = [shape];
          }
          var s = _.shapeSize(shape);
          var T = _.getType(dtype);
          return new NdArray(new T(s), shape);
        }

        /**
         * Create an array of the given shape and propagate it with random samples from a uniform distribution over [0, 1].
         * @param {number|Array|...number} shape - The dimensions of the returned array, should all be positive integers
         * @returns {NdArray}
         */
        function random(shape) {
          if (arguments.length === 0) {
            return NdArray.new(Math.random());
          } else if (arguments.length === 1) {
            shape = _.isNumber(shape) ? [shape | 0] : shape;
          } else {
            shape = [].slice.call(arguments);
          }
          var s = _.shapeSize(shape);
          var arr = new NdArray(new Float64Array(s), shape);
          ops.random(arr.selection);
          return arr;
        }

        /**
         * Return the softmax, or normalized exponential, of the input array, element-wise.
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function softmax(x) {
          var e = NdArray.new(x).exp();
          var se = e.sum(); // scalar
          ops.divseq(e.selection, se);
          return e;
        }
        var doSigmoid = cwise({
          args: ['array', 'scalar'],
          body: function sigmoidCwise(a, t) {
            a = a < -30 ? 0 : a > 30 ? 1 : 1 / (1 + Math.exp(-1 * t * a));
          }
        });

        /**
         * Return the sigmoid of the input array, element-wise.
         * @param {(Array|NdArray|number)} x
         * @param {number} [t=1] - stifness parameter
         * @returns {NdArray}
         */
        function sigmoid(x, t) {
          x = NdArray.new(x).clone();
          t = t || 1;
          doSigmoid(x.selection, t);
          return x;
        }
        var doClip = cwise({
          args: ['array', 'scalar', 'scalar'],
          body: function clipCwise(a, min, max) {
            a = Math.min(Math.max(min, a), max);
          }
        });

        /**
         * Clip (limit) the values in an array between min and max, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @param {number} [min=0]
         * @param {number} [max=1]
         * @returns {NdArray}
         */
        function clip(x, min, max) {
          if (arguments.length === 1) {
            min = 0;
            max = 1;
          } else if (arguments.length === 2) {
            max = 1;
          }
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          doClip(s.selection, min, max);
          return s;
        }
        var doLeakyRelu = cwise({
          args: ['array', 'scalar'],
          body: function leakyReluCwise(xi, alpha) {
            xi = Math.max(alpha * xi, xi);
          }
        });
        function leakyRelu(x, alpha) {
          alpha = alpha || 1e-3;
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          doLeakyRelu(s.selection, alpha);
          return s;
        }
        var doTanh = cwise({
          args: ['array'],
          body: function tanhCwise(xi) {
            xi = (Math.exp(2 * xi) - 1) / (Math.exp(2 * xi) + 1);
          }
        });

        /**
         * Return hyperbolic tangent of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function tanh(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          doTanh(s.selection);
          return s;
        }

        /**
         * Return absolute value of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function abs(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.abseq(s.selection);
          return s;
        }

        /**
         * Return trigonometric cosine of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function cos(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.coseq(s.selection);
          return s;
        }

        /**
         * Return trigonometric inverse cosine of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function arccos(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.acoseq(s.selection);
          return s;
        }

        /**
         * Return trigonometric sine of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function sin(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.sineq(s.selection);
          return s;
        }

        /**
         * Return trigonometric inverse sine of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function arcsin(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.asineq(s.selection);
          return s;
        }

        /**
         * Return trigonometric tangent of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function tan(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.taneq(s.selection);
          return s;
        }

        /**
         * Return trigonometric inverse tangent of the input array, element-wise.
         *
         * @param {(Array|NdArray|number)} x
         * @returns {NdArray}
         */
        function arctan(x) {
          var s = x instanceof NdArray ? x.clone() : NdArray.new(x);
          ops.ataneq(s.selection);
          return s;
        }

        /**
         * Dot product of two arrays.
         *
         * WARNING: supported products are:
         *  - matrix dot matrix
         *  - vector dot vector
         *  - matrix dot vector
         *  - vector dot matrix
         * @param {(Array|NdArray)} a
         * @param {(Array|NdArray)} b
         * @returns {NdArray}
         */
        function dot(a, b) {
          return NdArray.new(a).dot(b);
        }

        /**
         * Join given arrays along the last axis.
         *
         * @param {...(Array|NdArray)} arrays
         * @returns {NdArray}
         */
        function concatenate(arrays) {
          if (arguments.length > 1) {
            arrays = [].slice.call(arguments);
          }
          var i, a;
          for (i = 0; i < arrays.length; i++) {
            a = arrays[i];
            arrays[i] = a instanceof NdArray ? a.tolist() : _.isNumber(a) ? [a] : a;
          }
          var m = arrays[0];
          for (i = 1; i < arrays.length; i++) {
            a = arrays[i];
            var mShape = _.getShape(m);
            var aShape = _.getShape(a);
            if (mShape.length !== aShape.length) {
              throw new errors.ValueError('all the input arrays must have same number of dimensions');
            } else if (mShape.length === 1 && aShape.length === 1) {
              m = m.concat(a);
            } else if (mShape.length === 2 && aShape.length === 2 && mShape[0] === aShape[0] || mShape.length === 1 && aShape.length === 2 && mShape[0] === aShape[0] || mShape.length === 2 && aShape.length === 1 && mShape[0] === aShape[0]) {
              for (var row = 0; row < mShape[0]; row++) {
                m[row] = m[row].concat(a[row]);
              }
            } else if (mShape.length === 3 && aShape.length === 3 && mShape[0] === aShape[0] && mShape[1] === aShape[1] || mShape.length === 2 && aShape.length === 3 && mShape[0] === aShape[0] && mShape[1] === aShape[1] || mShape.length === 3 && aShape.length === 2 && mShape[0] === aShape[0] && mShape[1] === aShape[1]) {
              for (var rowI = 0; rowI < mShape[0]; rowI++) {
                var rowV = new Array(mShape[1]);
                for (var colI = 0; colI < mShape[1]; colI++) {
                  rowV[colI] = m[rowI][colI].concat(a[rowI][colI]);
                }
                m[rowI] = rowV;
              }
            } else {
              throw new errors.ValueError('cannot concatenate  "' + mShape + '" with "' + aShape + '"');
            }
          }
          return NdArray.new(m, arrays[0].dtype);
        }

        /**
         * Round an array to the to the nearest integer.
         *
         * @param {(Array|NdArray)} x
         * @returns {NdArray}
         */
        function round(x) {
          return NdArray.new(x).round();
        }

        /**
         * Convolve 2 N-dimensionnal arrays
         *
         * @note: Arrays must have the same dimensions and a must be greater than b.
         * @note: The convolution product is only given for points where the signals overlap completely. Values outside the signal boundary have no effect. This behaviour is known as the 'valid' mode.
         *
         * @param {Array|NdArray} a
         * @param {Array|NdArray} b
         */
        function convolve(a, b) {
          return NdArray.new(a).convolve(b);
        }

        /**
         * Convolve 2 N-dimensionnal arrays using Fast Fourier Transform (FFT)
         *
         * @note: Arrays must have the same dimensions and a must be greater than b.
         * @note: The convolution product is only given for points where the signals overlap completely. Values outside the signal boundary have no effect. This behaviour is known as the 'valid' mode.
         *
         * @param {Array|NdArray} a
         * @param {Array|NdArray} b
         */
        function fftconvolve(a, b) {
          return NdArray.new(a).fftconvolve(b);
        }
        function fft(x) {
          x = x instanceof NdArray ? x.clone() : NdArray.new(x);
          var xShape = x.shape;
          var d = xShape.length;
          if (xShape[d - 1] !== 2) {
            throw new errors.ValueError('expect last dimension of the array to have 2 values (for both real and imaginary part)');
          }
          var rPicker = new Array(d);
          var iPicker = new Array(d);
          rPicker[d - 1] = 0;
          iPicker[d - 1] = 1;
          ndFFT(1, x.selection.pick.apply(x.selection, rPicker), x.selection.pick.apply(x.selection, iPicker));
          return x;
        }
        function ifft(x) {
          x = x instanceof NdArray ? x.clone() : NdArray.new(x);
          var xShape = x.shape;
          var d = xShape.length;
          if (xShape[d - 1] !== 2) {
            throw new errors.ValueError('expect last dimension of the array to have 2 values (for both real and imaginary part)');
          }
          var rPicker = new Array(d);
          var iPicker = new Array(d);
          rPicker[d - 1] = 0;
          iPicker[d - 1] = 1;
          ndFFT(-1, x.selection.pick.apply(x.selection, rPicker), x.selection.pick.apply(x.selection, iPicker));
          return x;
        }

        /**
         * Extract a diagonal or construct a diagonal array.
         *
         * @param {Array|NdArray} x
         * @returns {NdArray} a view a of the original array when possible, a new array otherwise
         */
        function diag(x) {
          return NdArray.new(x).diag();
        }

        /**
         * The identity array is a square array with ones on the main diagonal.
         * @param {number} Number of rows (and columns) in n x n output.
         * @param {(String|Object)}  [dtype=Array]  The type of the output array.
         * @return {Array} n x n array with its main diagonal set to one, and all other elements 0
         */
        function identity(n, dtype) {
          var arr = zeros([n, n], dtype);
          for (var i = 0; i < n; i++) arr.set(i, i, 1);
          return arr;
        }

        /**
         * Join a sequence of arrays along a new axis.
         * The axis parameter specifies the index of the new axis in the dimensions of the result.
         * For example, if axis=0 it will be the first dimension and if axis=-1 it will be the last dimension.
         * @param {Array} sequence of array_like
         * @param {number} [axis=0] The axis in the result array along which the input arrays are stacked.
         * @return {Array} The stacked array has one more dimension than the input arrays.
         */
        function stack(arrays, axis) {
          axis = axis || 0;
          if (!arrays || arrays.length === 0) {
            throw new errors.ValueError('need at least one array to stack');
          }
          arrays = arrays.map(function (a) {
            return _.isNumber(a) ? a : NdArray.new(a);
          });
          var expectedShape = arrays[0].shape || []; // for numbers

          for (var i = 1; i < arrays.length; i++) {
            var shape = arrays[i].shape || []; // for numbers
            var len = Math.max(expectedShape.length, shape.length);
            for (var j = 0; j < len; j++) {
              if (expectedShape[j] !== shape[j]) throw new errors.ValueError('all input arrays must have the same shape');
            }
          }
          var stacked;
          if (expectedShape.length === 0) {
            // stacking numbers
            stacked = concatenate(arrays);
          } else {
            stacked = zeros([arrays.length].concat(expectedShape));
            for (var i = 0; i < arrays.length; i++) {
              stacked.pick(i).assign(arrays[i], false);
            }
          }
          if (axis) {
            // recompute neg axis
            if (axis < 0) axis = stacked.ndim + axis;
            var d = stacked.ndim;
            var axes = new Array(d);
            for (var i = 0; i < d; i++) {
              axes[i] = i < axis ? i + 1 : i === axis ? 0 : i;
            }
            return stacked.transpose(axes);
          }
          return stacked;
        }

        /**
         * Reverse the order of elements in an array along the given axis.
         * The shape of the array is preserved, but the elements are reordered.
         * New in version 0.15.0.
         * @param {Array|NdArray} m Input array.
         * @param {number} axis Axis in array, which entries are reversed.
         * @return {NdArray} A view of `m` with the entries of axis reversed.  Since a view is returned, this operation is done in constant time.
         */
        function flip(m, axis) {
          m = NdArray.new(m);
          var indexer = ones(m.ndim).tolist();
          var cleanaxis = axis;
          while (cleanaxis < 0) {
            cleanaxis += m.ndim;
          }
          if (indexer[cleanaxis] === undefined) {
            throw new errors.ValueError('axis=' + axis + 'invalid for the ' + m.ndim + '-dimensional input array');
          }
          indexer[cleanaxis] = -1;
          return m.step.apply(m, indexer);
        }

        /**
         * Rotate an array by 90 degrees in the plane specified by axes.
         * Rotation direction is from the first towards the second axis.
         * New in version 0.15.0.
         * @param {Array|NdArray} m array_like
         * @param {number} [k=1] Number of times the array is rotated by 90 degrees.
         * @param {Array|NdArray} [axes=(0,1)] The array is rotated in the plane defined by the axes. Axes must be different.
         * @return {NdArray} A rotated view of m.
         */
        function rot90(m, k, axes) {
          k = k || 1;
          while (k < 0) {
            k += 4;
          }
          k = k % 4;
          m = NdArray.new(m);
          axes = NdArray.new(axes || [0, 1]);
          if (axes.shape.length !== 1 || axes.shape[0] !== 2) {
            throw new errors.ValueError('len(axes) must be 2');
          }
          axes = axes.tolist();
          if (axes[0] === axes[1] || abs(axes[0] - axes[1]) === m.ndim) {
            throw new errors.ValueError("Axes must be different.");
          }
          if (k === 0) {
            return m;
          }
          if (k === 2) {
            return flip(flip(m, axes[0]), axes[1]);
          }
          var axesList = arange(m.ndim).tolist();
          var keep = axesList[axes[0]];
          axesList[axes[0]] = axesList[axes[1]];
          axesList[axes[1]] = keep;
          if (k === 1) {
            return transpose(flip(m, axes[1]), axesList);
          } else {
            return flip(transpose(m, axesList), axes[1]);
          }
        }
        module.exports = {
          config: CONF,
          dtypes: DTYPES,
          NdArray: NdArray,
          ndarray: ndarray,
          array: NdArray.new,
          arange: arange,
          reshape: reshape,
          zeros: zeros,
          ones: ones,
          empty: empty,
          flatten: flatten,
          flip: flip,
          random: random,
          softmax: softmax,
          sigmoid: sigmoid,
          leakyRelu: leakyRelu,
          abs: abs,
          arccos: arccos,
          arcsin: arcsin,
          arctan: arctan,
          cos: cos,
          sin: sin,
          tan: tan,
          tanh: tanh,
          clip: clip,
          exp: exp,
          log: log,
          sqrt: sqrt,
          power: power,
          sum: sum,
          mean: mean,
          std: std,
          dot: dot,
          add: add,
          subtract: subtract,
          multiply: multiply,
          divide: divide,
          negative: negative,
          equal: equal,
          max: max,
          min: min,
          mod: mod,
          remainder: mod,
          concatenate: concatenate,
          transpose: transpose,
          errors: errors,
          broadcast: broadcast,
          round: round,
          convolve: convolve,
          fftconvolve: fftconvolve,
          fft: fft,
          ifft: ifft,
          diag: diag,
          identity: identity,
          stack: stack,
          rot90: rot90,
          int8: function int8(array) {
            return NdArray.new(array, 'int8');
          },
          uint8: function uint8(array) {
            return NdArray.new(array, 'uint8');
          },
          int16: function int16(array) {
            return NdArray.new(array, 'int16');
          },
          uint16: function uint16(array) {
            return NdArray.new(array, 'uint16');
          },
          int32: function int32(array) {
            return NdArray.new(array, 'int32');
          },
          uint32: function uint32(array) {
            return NdArray.new(array, 'uint32');
          },
          float32: function float32(array) {
            return NdArray.new(array, 'float32');
          },
          float64: function float64(array) {
            return NdArray.new(array, 'float64');
          },
          images: __webpack_require__(/*! ./images */"./node_modules/numjs/src/images/index.js")
        };

        /***/
      }),
      /***/"./node_modules/numjs/src/ndarray.js": (
      /*!*******************************************!*\
        !*** ./node_modules/numjs/src/ndarray.js ***!
        \*******************************************/
      /***/
      function _node_modules_numjs_src_ndarrayJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var ndarray = __webpack_require__(/*! ndarray */"./node_modules/ndarray/ndarray.js");
        var cwise = __webpack_require__(/*! cwise */"./node_modules/cwise/lib/cwise-esprima.js");
        var ops = __webpack_require__(/*! ndarray-ops */"./node_modules/ndarray-ops/ndarray-ops.js");
        var gemm = __webpack_require__(/*! ndarray-gemm */"./node_modules/ndarray-gemm/gemm.js");
        var ndFFT = __webpack_require__(/*! ndarray-fft */"./node_modules/ndarray-fft/fft.js");
        var ndPool = __webpack_require__(/*! typedarray-pool */"./node_modules/typedarray-pool/pool.js");
        var CONF = __webpack_require__(/*! ./config */"./node_modules/numjs/src/config.js");
        var errors = __webpack_require__(/*! ./errors */"./node_modules/numjs/src/errors.js");
        var _ = __webpack_require__(/*! ./utils */"./node_modules/numjs/src/utils.js");

        /**
        * Multidimensional, homogeneous array of fixed-size items
        *
        * The number of dimensions and items in an array is defined by its shape, which is a tuple of N positive
        * integers that specify the sizes of each dimension. The type of items in the array is specified by a separate
        * data-type object (dtype), one of which is associated with each NdArray.
        * @constructor
        */
        var NdArray = function NdArray() {
          if (arguments.length === 1) {
            this.selection = arguments[0];
          } else if (arguments.length === 0) {
            throw new errors.ValueError("Required argument 'data' not found");
          } else {
            this.selection = ndarray.apply(null, arguments);
          }
          /**
          * @property {Number} NdArray#size - Number of elements in the array.
          */
          Object.defineProperty(this, 'size', {
            get: function () {
              return this.selection.size;
            }.bind(this)
          });
          /**
          * The shape of the array
          *
          * @property {Array}
          * @name NdArray#shape
          * @readonly
          */
          Object.defineProperty(this, 'shape', {
            get: function () {
              return this.selection.shape;
            }.bind(this)
          });
          /**
          * Number of array dimensions.
          *
          * @property {Number}
          * @name NdArray#ndim
          * @readonly
          */
          Object.defineProperty(this, 'ndim', {
            get: function () {
              return this.selection.shape.length;
            }.bind(this)
          });
          /**
          * Data-type of the array’s elements.
          *
          * @property {String}
          * @name NdArray#dtype
          * @see {dtypes} for more information
          */
          Object.defineProperty(this, 'dtype', {
            get: function () {
              return this.selection.dtype;
            }.bind(this),
            set: function (dtype) {
              var T = _.getType(dtype);
              if (T !== _.getType(this.dtype)) {
                this.selection = ndarray(new T(this.selection.data), this.selection.shape, this.selection.stride, this.selection.offset);
              }
            }.bind(this)
          });
          /**
          * Permute the dimensions of the array.
          *
          * @property {String}
          * @name NdArray#T
          * @readonly
          */
          Object.defineProperty(this, 'T', {
            get: function () {
              return this.transpose();
            }.bind(this)
          });
        };
        NdArray.prototype.get = function () {
          var n = arguments.length;
          for (var i = 0; i < n; i++) {
            if (arguments[i] < 0) {
              arguments[i] += this.shape[i];
            }
          }
          return this.selection.get.apply(this.selection, arguments);
        };
        NdArray.prototype.set = function () {
          return this.selection.set.apply(this.selection, arguments);
        };
        NdArray.prototype.slice = function () {
          var d = this.ndim;
          var hi = new Array(d);
          var lo = new Array(d);
          var step = new Array(d);
          var tShape = this.shape;
          for (var i = 0; i < d; i++) {
            var arg = arguments[i];
            if (typeof arg === 'undefined') {
              break;
            }
            if (arg === null) {
              continue;
            }
            if (_.isNumber(arg)) {
              lo[i] = arg < 0 ? arg + tShape[i] : arg;
              hi[i] = null;
              step[i] = 1;
            } else if (arg.length === 4 && arg[1] === null && arg[2] === null) {
              // pattern: a[start::step]
              var s = arg[0] < 0 ? arg[0] + tShape[i] : arg[0];
              lo[i] = s;
              hi[i] = null;
              step[i] = arg[3] || 1;
            } else {
              // pattern start:end:step
              var start = arg[0] < 0 ? arg[0] + tShape[i] : arg[0];
              var end = arg[1] < 0 ? arg[1] + tShape[i] : arg[1];
              lo[i] = end ? start : 0;
              hi[i] = end ? end - start : start;
              step[i] = arg[2] || 1;
            }
          }
          var slo = this.selection.lo.apply(this.selection, lo);
          var shi = slo.hi.apply(slo, hi);
          var sstep = shi.step.apply(shi, step);
          return new NdArray(sstep);
        };

        /**
        * Return a subarray by fixing a particular axis
        *
        * @param {...(number|null)} axis
        * @returns {NdArray}
        *
        * @example
        arr = nj.arange(4*4).reshape(4,4)
        // array([[  0,  1,  2,  3],
        //        [  4,  5,  6,  7],
        //        [  8,  9, 10, 11],
        //        [ 12, 13, 14, 15]])
        
        arr.pick(1)
        // array([ 4, 5, 6, 7])
        
        arr.pick(null, 1)
        // array([  1,  5,  9, 13])
        */
        NdArray.prototype.pick = function (axis) {
          return new NdArray(this.selection.pick.apply(this.selection, arguments));
        };

        /**
        * Return a shifted view of the array. Think of it as taking the upper left corner of the image and dragging it inward
        *
        * @returns {NdArray}
        *
        * @example
        arr = nj.arange(4*4).reshape(4,4)
        // array([[  0,  1,  2,  3],
        //        [  4,  5,  6,  7],
        //        [  8,  9, 10, 11],
        //        [ 12, 13, 14, 15]])
        arr.lo(1,1)
        // array([[  5,  6,  7],
        //        [  9, 10, 11],
        //        [ 13, 14, 15]])
        */
        NdArray.prototype.lo = function () {
          return new NdArray(this.selection.lo.apply(this.selection, arguments));
        };

        /**
        * Return a sliced view of the array.
        *
        * @returns {NdArray}
        *
        * @example
        
        arr = nj.arange(4*4).reshape(4,4)
        // array([[  0,  1,  2,  3],
        //        [  4,  5,  6,  7],
        //        [  8,  9, 10, 11],
        //        [ 12, 13, 14, 15]])
        
        arr.hi(3,3)
        // array([[  0,  1,  2],
        //        [  4,  5,  6],
        //        [  8,  9, 10]])
        
        arr.lo(1,1).hi(2,2)
        // array([[ 5,  6],
        //        [ 9, 10]])
        
        */
        NdArray.prototype.hi = function () {
          return new NdArray(this.selection.hi.apply(this.selection, arguments));
        };
        NdArray.prototype.step = function () {
          return new NdArray(this.selection.step.apply(this.selection, arguments));
        };

        /**
        * Return a copy of the array collapsed into one dimension using row-major order (C-style)
        *
        * @returns {NdArray}
        */
        NdArray.prototype.flatten = function () {
          if (this.ndim === 1) {
            // already flattened
            return new NdArray(this.selection);
          }
          var T = _.getType(this.dtype);
          var arr = _.flatten(this.tolist(), true);
          if (!(arr instanceof T)) {
            arr = new T(arr);
          }
          return new NdArray(arr, [this.size]);
        };

        /**
        * Gives a new shape to the array without changing its data.
        * @param {Array|number} The new shape should be compatible with the original shape. If an integer, then the result will be a 1-D array of that length. One shape dimension can be -1. In this case, the value is inferred from the length of the array and remaining dimensions.
        * @returns {NdArray} a new view object if possible, a copy otherwise,
        */
        NdArray.prototype.reshape = function (shape) {
          if (arguments.length === 0) {
            throw new errors.ValueError('function takes at least one argument (0 given)');
          }
          if (arguments.length === 1 && _.isNumber(shape) && shape === -1) {
            shape = [_.shapeSize(this.shape)];
          }
          if (arguments.length === 1 && _.isNumber(shape)) {
            shape = [shape];
          }
          if (arguments.length > 1) {
            shape = [].slice.call(arguments);
          }
          if (shape.filter(function (s) {
            return s === -1;
          }).length > 1) {
            throw new errors.ValueError('can only specify one unknown dimension');
          }
          var currentShapeSize = _.shapeSize(shape);
          shape = shape.map(function (s) {
            return s === -1 ? -1 * this.size / currentShapeSize : s;
          }.bind(this));
          if (this.size !== _.shapeSize(shape)) {
            throw new errors.ValueError('total size of new array must be unchanged');
          }
          var selfShape = this.selection.shape;
          var selfOffset = this.selection.offset;
          var selfStride = this.selection.stride;
          var selfDim = selfShape.length;
          var d = shape.length;
          var stride;
          var offset;
          var i;
          var sz;
          if (selfDim === d) {
            var sameShapes = true;
            for (i = 0; i < d; ++i) {
              if (selfShape[i] !== shape[i]) {
                sameShapes = false;
                break;
              }
            }
            if (sameShapes) {
              return new NdArray(this.selection.data, selfShape, selfStride, selfOffset);
            }
          } else if (selfDim === 1) {
            // 1d view
            stride = new Array(d);
            for (i = d - 1, sz = 1; i >= 0; --i) {
              stride[i] = sz;
              sz *= shape[i];
            }
            offset = selfOffset;
            for (i = 0; i < d; ++i) {
              if (stride[i] < 0) {
                offset -= (shape[i] - 1) * stride[i];
              }
            }
            return new NdArray(this.selection.data, shape, stride, offset);
          }
          var minDim = Math.min(selfDim, d);
          var areCompatible = true;
          for (i = 0; i < minDim; i++) {
            if (selfShape[i] !== shape[i]) {
              areCompatible = false;
              break;
            }
          }
          if (areCompatible) {
            stride = new Array(d);
            for (i = 0; i < d; i++) {
              stride[i] = selfStride[i] || 1;
            }
            offset = selfOffset;
            return new NdArray(this.selection.data, shape, stride, offset);
          }
          return this.flatten().reshape(shape);
        };

        /**
        * Permute the dimensions of the array.
        *
        * @param {...number} [axes]
        * @returns {NfdArray}
        */
        NdArray.prototype.transpose = function (axes) {
          if (arguments.length === 0) {
            var d = this.ndim;
            axes = new Array(d);
            for (var i = 0; i < d; i++) {
              axes[i] = d - i - 1;
            }
          } else if (arguments.length > 1) {
            axes = arguments;
          }
          return new NdArray(this.selection.transpose.apply(this.selection, axes));
        };

        /**
        * Dot product of two arrays.
        *
        * @param {(Array|NdArray)} x
        * @returns {NdArray}
        */
        NdArray.prototype.dot = function (x) {
          x = x instanceof NdArray ? x : createArray(x, this.dtype);
          var tShape = this.shape;
          var xShape = x.shape;
          if (tShape.length === 2 && xShape.length === 2 && tShape[1] === xShape[0]) {
            // matrix/matrix
            var T = _.getType(this.dtype);
            var c = new NdArray(new T(tShape[0] * xShape[1]), [tShape[0], xShape[1]]);
            gemm(c.selection, this.selection, x.selection);
            return c;
          } else if (tShape.length === 1 && xShape.length === 2 && tShape[0] === xShape[0]) {
            // vector/matrix
            return this.reshape([tShape[0], 1]).T.dot(x).reshape(xShape[1]);
          } else if (tShape.length === 2 && xShape.length === 1 && tShape[1] === xShape[0]) {
            // matrix/vector
            return this.dot(x.reshape([xShape[0], 1])).reshape(tShape[0]);
          } else if (tShape.length === 1 && xShape.length === 1 && tShape[0] === xShape[0]) {
            // vector/vector
            return this.reshape([tShape[0], 1]).T.dot(x.reshape([xShape[0], 1])).reshape([1]);
          } else {
            throw new errors.ValueError('cannot compute the matrix product of given arrays');
          }
        };

        /**
        * Assign `x` to the array, element-wise.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.assign = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.assigns(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.assign(arr.selection, x.selection);
          return arr;
        };

        /**
        * Add `x` to the array, element-wise.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.add = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.addseq(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.addeq(arr.selection, x.selection);
          return arr;
        };

        /**
        * Subtract `x` to the array, element-wise.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.subtract = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.subseq(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.subeq(arr.selection, x.selection);
          return arr;
        };

        /**
        * Multiply array by `x`, element-wise.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.multiply = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.mulseq(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.muleq(arr.selection, x.selection);
          return arr;
        };

        /**
        * Divide array by `x`, element-wise.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.divide = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.divseq(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.diveq(arr.selection, x.selection);
          return arr;
        };

        /**
        * Raise array elements to powers from given array, element-wise.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true] - set to false to modify the array rather than create a new one
        * @returns {NdArray}
        */
        NdArray.prototype.pow = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.powseq(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.poweq(arr.selection, x.selection);
          return arr;
        };

        /**
        * Calculate the exponential of all elements in the array, element-wise.
        *
        * @param {boolean} [copy=true] - set to false to modify the array rather than create a new one
        * @returns {NdArray}
        */
        NdArray.prototype.exp = function (copy) {
          if (arguments.length === 0) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          ops.expeq(arr.selection);
          return arr;
        };

        /**
        * Calculate the natural logarithm of all elements in the array, element-wise.
        *
        * @param {boolean} [copy=true] - set to false to modify the array rather than create a new one
        * @returns {NdArray}
        */
        NdArray.prototype.log = function (copy) {
          if (arguments.length === 0) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          ops.logeq(arr.selection);
          return arr;
        };

        /**
        * Calculate the positive square-root of all elements in the array, element-wise.
        *
        * @param {boolean} [copy=true] - set to false to modify the array rather than create a new one
        * @returns {NdArray}
        */
        NdArray.prototype.sqrt = function (copy) {
          if (arguments.length === 0) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          ops.sqrteq(arr.selection);
          return arr;
        };

        /**
        * Return the maximum value of the array
        *
        * @returns {Number}
        */
        NdArray.prototype.max = function () {
          if (this.selection.size === 0) {
            return null;
          }
          return ops.sup(this.selection);
        };

        /**
        * Return the minimum value of the array
        *
        * @returns {Number}
        */
        NdArray.prototype.min = function () {
          if (this.selection.size === 0) {
            return null;
          }
          return ops.inf(this.selection);
        };

        /**
        * Sum of array elements.
        *
        * @returns {number}
        */
        NdArray.prototype.sum = function () {
          return ops.sum(this.selection);
        };

        /**
        * Returns the standard deviation, a measure of the spread of a distribution, of the array elements.
        *
        * @param {object} {ddof:0}
        * @returns {number}
        */
        NdArray.prototype.std = function (options) {
          options = _.defaults(options, {
            'ddof': 0
          });
          var squares = this.clone();
          ops.powseq(squares.selection, 2);
          var mean = this.mean();
          var shapeSize = _.shapeSize(this.shape);
          var variance = ops.sum(squares.selection) / (shapeSize - options.ddof) - mean * mean * shapeSize / (shapeSize - options.ddof);
          return variance > 0 ? Math.sqrt(Math.abs(variance)) : 0;
        };

        /**
        * Return the arithmetic mean of array elements.
        *
        * @returns {number}
        */
        NdArray.prototype.mean = function () {
          return ops.sum(this.selection) / _.shapeSize(this.shape);
        };

        /**
        * Return element-wise remainder of division.
        *
        * @param {(NdArray|Array|number)} x
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.mod = function (x, copy) {
          if (arguments.length === 1) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          if (_.isNumber(x)) {
            ops.modseq(arr.selection, x);
            return arr;
          }
          x = createArray(x, this.dtype);
          ops.modeq(arr.selection, x.selection);
          return arr;
        };

        /**
        * Converts {NdArray} to a native JavaScript {Array}
        *
        * @returns {Array}
        */
        NdArray.prototype.tolist = function () {
          return unpackArray(this.selection);
        };
        NdArray.prototype.valueOf = function () {
          return this.tolist();
        };
        /**
        * Stringify the array to make it readable by a human.
        *
        * @returns {string}
        */
        NdArray.prototype.toString = function () {
          var nChars = formatNumber(this.max()).length;
          var reg1 = /\]\,(\s*)\[/g;
          var spacer1 = '],\n$1      [';
          var reg3 = /\]\,(\s+)...\,(\s+)\[/g;
          var spacer3 = '],\n$2       ...\n$2      [';
          var reg2 = /\[\s+\[/g;
          var spacer2 = '[[';
          function formatArray(k, v) {
            if (_.isString(v)) {
              return v;
            }
            if (_.isNumber(v)) {
              var s = formatNumber(v);
              return new Array(Math.max(0, nChars - s.length + 2)).join(' ') + s;
            }
            k = k || 0;
            var arr;
            var th = CONF.printThreshold;
            var hth = th / 2 | 0;
            if (v.length > th) {
              arr = [].concat(v.slice(0, hth), [' ...'], v.slice(v.length - hth));
            } else {
              arr = v;
            }
            return new Array(k + 1).join(' ') + '[' + arr.map(function (i, ii) {
              return formatArray(ii === 0 && k === 0 ? 1 : k + 1, i);
            }).join(',') + ']';
          }
          var base = JSON.stringify(this.tolist(), formatArray).replace(reg1, spacer1).replace(reg2, spacer2).replace(reg2, spacer2).replace(reg3, spacer3).slice(2, -1);
          switch (this.dtype) {
            case 'array':
              return 'array([' + base + ')';
            default:
              return 'array([' + base + ', dtype=' + this.dtype + ')';
          }
        };

        /**
        * Stringify the array to make it readable in the console, by a human.
        *
        * @returns {string}
        */
        NdArray.prototype.inspect = NdArray.prototype.toString;

        /**
        * Stringify object to JSON
        * @returns {*}
        */
        NdArray.prototype.toJSON = function () {
          return JSON.stringify(this.tolist());
        };

        /**
        * Create a full copy of the array
        *
        * @returns {NdArray}
        */
        NdArray.prototype.clone = function () {
          var s = this.selection;
          if (typeof s.data.slice === 'undefined') {
            return new NdArray(ndarray([].slice.apply(s.data), s.shape, s.stride, s.offset)); // for legacy browsers
          }
          return new NdArray(ndarray(s.data.slice(), s.shape, s.stride, s.offset));
        };

        /**
        * Return true if two arrays have the same shape and elements, false otherwise.
        * @param {(Array|NdArray)} array
        * @returns {boolean}
        */
        NdArray.prototype.equal = function (array) {
          array = createArray(array);
          if (this.size !== array.size || this.ndim !== array.ndim) {
            return false;
          }
          var d = this.ndim;
          for (var i = 0; i < d; i++) {
            if (this.shape[i] !== array.shape[i]) {
              return false;
            }
          }
          return ops.equals(this.selection, array.selection);
        };

        /**
        * Round array to the to the nearest integer.
        *
        * @param {boolean} [copy=true]
        * @returns {NdArray}
        */
        NdArray.prototype.round = function (copy) {
          if (arguments.length === 0) {
            copy = true;
          }
          var arr = copy ? this.clone() : this;
          ops.roundeq(arr.selection);
          return arr;
        };

        /**
        * Return the inverse of the array, element-wise.
        *
        * @returns {NdArray}
        */
        NdArray.prototype.negative = function () {
          var c = this.clone();
          ops.neg(c.selection, this.selection);
          return c;
        };
        NdArray.prototype.diag = function () {
          var d = this.ndim;
          if (d === 1) {
            // input is a vector => return a diagonal matrix
            var T = _.getType(this.dtype);
            var shape = [this.shape[0], this.shape[0]];
            var arr = new NdArray(new T(_.shapeSize(shape)), shape);
            if (arr.dtype === 'array') {
              ops.assigns(arr.selection, 0);
            }
            for (var i = 0; i < this.shape[0]; i++) arr.set(i, i, this.get(i));
            return arr;
          }
          var mshape = this.shape;
          var mstride = this.selection.stride;
          var nshape = 1 << 30;
          var nstride = 0;
          for (var i = 0; i < d; ++i) {
            nshape = Math.min(nshape, mshape[i]) | 0;
            nstride += mstride[i];
          }
          return new NdArray(this.selection.data, [nshape], [nstride], this.selection.offset);
        };
        NdArray.prototype.iteraxis = function (axis, cb) {
          var shape = this.shape;
          if (axis === -1) {
            axis = shape.length - 1;
          }
          if (axis < 0 || axis > shape.length - 1) {
            throw new errors.ValueError('invalid axis');
          }
          for (var i = 0; i < shape[axis]; i++) {
            var loc = new Array(axis + 1);
            for (var ii = 0; ii < axis + 1; ii++) {
              loc[ii] = ii === axis ? i : null;
            }
            var subArr = this.selection.pick.apply(this.selection, loc);
            var xi = createArray(unpackArray(subArr), this.dtype);
            cb(xi, i);
          }
        };
        var doConjMuleq = cwise({
          args: ['array', 'array', 'array', 'array'],
          body: function body(xi, yi, ui, vi) {
            var a = ui;
            var b = vi;
            var c = xi;
            var d = yi;
            var k1 = c * (a + b);
            xi = k1 - b * (c + d);
            yi = k1 + a * (d - c);
          }
        });
        var doConvolve3x3 = cwise({
          args: ['array',
          // c
          'array',
          // xe
          'scalar',
          // fa
          'scalar',
          // fb
          'scalar',
          // fc
          'scalar',
          // fd
          'scalar',
          // fe
          'scalar',
          // ff
          'scalar',
          // fg
          'scalar',
          // fh
          'scalar',
          // fi
          {
            offset: [-1, -1],
            array: 1
          },
          // xa
          {
            offset: [-1, 0],
            array: 1
          },
          // xb
          {
            offset: [-1, 1],
            array: 1
          },
          // xc
          {
            offset: [0, -1],
            array: 1
          },
          // xd
          // {offset:[ 9,  0], array:1}, // useless since available already
          {
            offset: [0, 1],
            array: 1
          },
          // xf
          {
            offset: [1, -1],
            array: 1
          },
          // xg
          {
            offset: [1, 0],
            array: 1
          },
          // xh
          {
            offset: [1, 1],
            array: 1
          } // xi
          ],
          body: function body(c, xe, fa, fb, fc, fd, fe, ff, fg, fh, fi, xa, xb, xc, xd, xf, xg, xh, xi) {
            c = xa * fi + xb * fh + xc * fg + xd * ff + xe * fe + xf * fd + xg * fc + xh * fb + xi * fa;
          }
        });
        var doConvolve5x5 = cwise({
          args: ['index', 'array',
          // c
          'array',
          // xm
          'scalar',
          // fa
          'scalar',
          // fb
          'scalar',
          // fc
          'scalar',
          // fd
          'scalar',
          // fe
          'scalar',
          // ff
          'scalar',
          // fg
          'scalar',
          // fh
          'scalar',
          // fi
          'scalar',
          // fj
          'scalar',
          // fk
          'scalar',
          // fl
          'scalar',
          // fm
          'scalar',
          // fn
          'scalar',
          // fo
          'scalar',
          // fp
          'scalar',
          // fq
          'scalar',
          // fr
          'scalar',
          // fs
          'scalar',
          // ft
          'scalar',
          // fu
          'scalar',
          // fv
          'scalar',
          // fw
          'scalar',
          // fx
          'scalar',
          // fy
          {
            offset: [-2, -2],
            array: 1
          },
          // xa
          {
            offset: [-2, -1],
            array: 1
          },
          // xb
          {
            offset: [-2, 0],
            array: 1
          },
          // xc
          {
            offset: [-2, 1],
            array: 1
          },
          // xd
          {
            offset: [-2, 2],
            array: 1
          },
          // xe
          {
            offset: [-1, -2],
            array: 1
          },
          // xf
          {
            offset: [-1, -1],
            array: 1
          },
          // xg
          {
            offset: [-1, 0],
            array: 1
          },
          // xh
          {
            offset: [-1, 1],
            array: 1
          },
          // xi
          {
            offset: [-1, 2],
            array: 1
          },
          // xj
          {
            offset: [0, -2],
            array: 1
          },
          // xk
          {
            offset: [0, -1],
            array: 1
          },
          // xl
          // {offset:[ 0,  0], array:1},
          {
            offset: [0, 1],
            array: 1
          },
          // xn
          {
            offset: [0, 2],
            array: 1
          },
          // xo
          {
            offset: [1, -2],
            array: 1
          },
          // xp
          {
            offset: [1, -1],
            array: 1
          },
          // xq
          {
            offset: [1, 0],
            array: 1
          },
          // xr
          {
            offset: [1, 1],
            array: 1
          },
          // xs
          {
            offset: [1, 2],
            array: 1
          },
          // xt
          {
            offset: [2, -2],
            array: 1
          },
          // xu
          {
            offset: [2, -1],
            array: 1
          },
          // xv
          {
            offset: [2, 0],
            array: 1
          },
          // xw
          {
            offset: [2, 1],
            array: 1
          },
          // xx
          {
            offset: [2, 2],
            array: 1
          } // xy
          ],
          body: function body(index, c, xm, fa, fb, fc, fd, fe, ff, fg, fh, fi, fj, fk, fl, fm, fn, fo, fp, fq, fr, fs, ft, fu, fv, fw, fx, fy, xa, xb, xc, xd, xe, xf, xg, xh, xi, xj, xk, xl, xn, xo, xp, xq, xr, xs, xt, xu, xv, xw, xx, xy) {
            c = index[0] < 2 || index[1] < 2 ? 0 : xa * fy + xb * fx + xc * fw + xd * fv + xe * fu + xf * ft + xg * fs + xh * fr + xi * fq + xj * fp + xk * fo + xl * fn + xm * fm + xn * fl + xo * fk + xp * fj + xq * fi + xr * fh + xs * fg + xt * ff + xu * fe + xv * fd + xw * fc + xx * fb + xy * fa;
          }
        });

        /**
        * Returns the discrete, linear convolution of the array using the given filter.
        *
        * @note: Arrays must have the same dimensions and `filter` must be smaller than the array.
        * @note: The convolution product is only given for points where the signals overlap completely. Values outside the signal boundary have no effect. This behaviour is known as the 'valid' mode.
        * @note: Use optimized code for 3x3, 3x3x1, 5x5, 5x5x1 filters, FFT otherwise.
        *
        * @param {Array|NdArray} filter
        */
        NdArray.prototype.convolve = function (filter) {
          filter = NdArray.new(filter);
          var ndim = this.ndim;
          if (ndim !== filter.ndim) {
            throw new errors.ValueError('arrays must have the same dimensions');
          }
          var outShape = new Array(ndim);
          var step = new Array(ndim);
          var ts = this.selection;
          var tShape = this.shape;
          var fs = filter.selection;
          var fShape = filter.shape;
          for (var i = 0; i < ndim; i++) {
            var l = tShape[i] - fShape[i] + 1;
            if (l < 0) {
              throw new errors.ValueError('filter cannot be greater than the array');
            }
            outShape[i] = l;
            step[i] = -1;
          }
          if (ndim === 2 && fShape[0] === 3 && fShape[1] === 3) {
            var out3x3 = new NdArray(new Float32Array(_.shapeSize(tShape)), tShape);
            doConvolve3x3(out3x3.selection,
            // c
            ts,
            // x
            fs.get(0, 0),
            // fa
            fs.get(0, 1),
            // fb
            fs.get(0, 2),
            // fc
            fs.get(1, 0),
            // fd
            fs.get(1, 1),
            // fe
            fs.get(1, 2),
            // ff
            fs.get(2, 0),
            // fg
            fs.get(2, 1),
            // fh
            fs.get(2, 2) // fi
            );
            return out3x3.lo(1, 1).hi(outShape[0], outShape[1]);
          } else if (ndim === 3 && fShape[2] === 1 && tShape[2] === 1 && fShape[0] === 3 && fShape[1] === 3) {
            var out3x3x1 = new NdArray(new Float32Array(_.shapeSize(tShape)), tShape);
            doConvolve3x3(out3x3x1.selection.pick(null, null, 0),
            // c
            ts.pick(null, null, 0),
            // x
            fs.get(0, 0, 0),
            // fa
            fs.get(0, 1, 0),
            // fb
            fs.get(0, 2, 0),
            // fc
            fs.get(1, 0, 0),
            // fd
            fs.get(1, 1, 0),
            // fe
            fs.get(1, 2, 0),
            // ff
            fs.get(2, 0, 0),
            // fg
            fs.get(2, 1, 0),
            // fh
            fs.get(2, 2, 0) // fi
            );
            return out3x3x1.lo(1, 1).hi(outShape[0], outShape[1]);
          } else if (ndim === 2 && fShape[0] === 5 && fShape[1] === 5) {
            var out5x5 = new NdArray(new Float32Array(_.shapeSize(tShape)), tShape);
            doConvolve5x5(out5x5.selection,
            // c
            ts,
            // x
            fs.get(0, 0),
            // fa
            fs.get(0, 1),
            // fb
            fs.get(0, 2),
            // fc
            fs.get(0, 3),
            // fd
            fs.get(0, 4),
            // fe
            fs.get(1, 0),
            // ff
            fs.get(1, 1),
            // fg
            fs.get(1, 2),
            // fh
            fs.get(1, 3),
            // fi
            fs.get(1, 4),
            // fj
            fs.get(2, 0),
            // fk
            fs.get(2, 1),
            // fl
            fs.get(2, 2),
            // fm
            fs.get(2, 3),
            // fn
            fs.get(2, 4),
            // fo
            fs.get(3, 0),
            // fp
            fs.get(3, 1),
            // fq
            fs.get(3, 2),
            // fr
            fs.get(3, 3),
            // fs
            fs.get(3, 4),
            // ft
            fs.get(4, 0),
            // fu
            fs.get(4, 1),
            // fv
            fs.get(4, 2),
            // fw
            fs.get(4, 3),
            // fx
            fs.get(4, 4) // fy
            );
            return out5x5.lo(2, 2).hi(outShape[0], outShape[1]);
          } else if (ndim === 3 && fShape[2] === 1 && tShape[2] === 1 && fShape[0] === 5 && fShape[1] === 5) {
            var out5x5x1 = new NdArray(new Float32Array(_.shapeSize(tShape)), tShape);
            doConvolve5x5(out5x5x1.selection,
            // c
            ts,
            // x
            fs.get(0, 0, 0),
            // fa
            fs.get(0, 1, 0),
            // fb
            fs.get(0, 2, 0),
            // fc
            fs.get(0, 3, 0),
            // fd
            fs.get(0, 4, 0),
            // fe
            fs.get(1, 0, 0),
            // ff
            fs.get(1, 1, 0),
            // fg
            fs.get(1, 2, 0),
            // fh
            fs.get(1, 3, 0),
            // fi
            fs.get(1, 4, 0),
            // fj
            fs.get(2, 0, 0),
            // fk
            fs.get(2, 1, 0),
            // fl
            fs.get(2, 2, 0),
            // fm
            fs.get(2, 3, 0),
            // fn
            fs.get(2, 4, 0),
            // fo
            fs.get(3, 0, 0),
            // fp
            fs.get(3, 1, 0),
            // fq
            fs.get(3, 2, 0),
            // fr
            fs.get(3, 3, 0),
            // fs
            fs.get(3, 4, 0),
            // ft
            fs.get(4, 0, 0),
            // fu
            fs.get(4, 1, 0),
            // fv
            fs.get(4, 2, 0),
            // fw
            fs.get(4, 3, 0),
            // fx
            fs.get(4, 4, 0) // fy
            );
            return out5x5x1.lo(2, 2).hi(outShape[0], outShape[1]);
          } else {
            return this.fftconvolve(filter);
          }
        };
        NdArray.prototype.fftconvolve = function (filter) {
          filter = NdArray.new(filter);
          if (this.ndim !== filter.ndim) {
            throw new errors.ValueError('arrays must have the same dimensions');
          }
          var as = this.selection;
          var bs = filter.selection;
          var d = this.ndim;
          var nsize = 1;
          var nstride = new Array(d);
          var nshape = new Array(d);
          var oshape = new Array(d);
          var i;
          for (i = d - 1; i >= 0; --i) {
            nshape[i] = as.shape[i];
            nstride[i] = nsize;
            nsize *= nshape[i];
            oshape[i] = as.shape[i] - bs.shape[i] + 1;
          }
          var T = _.getType(as.dtype);
          var out = new NdArray(new T(_.shapeSize(oshape)), oshape);
          var outs = out.selection;
          var xT = ndPool.mallocDouble(nsize);
          var x = ndarray(xT, nshape, nstride, 0);
          ops.assigns(x, 0);
          ops.assign(x.hi.apply(x, as.shape), as);
          var yT = ndPool.mallocDouble(nsize);
          var y = ndarray(yT, nshape, nstride, 0);
          ops.assigns(y, 0);

          // FFT x/y
          ndFFT(1, x, y);
          var uT = ndPool.mallocDouble(nsize);
          var u = ndarray(uT, nshape, nstride, 0);
          ops.assigns(u, 0);
          ops.assign(u.hi.apply(u, bs.shape), bs);
          var vT = ndPool.mallocDouble(nsize);
          var v = ndarray(vT, nshape, nstride, 0);
          ops.assigns(v, 0);
          ndFFT(1, u, v);
          doConjMuleq(x, y, u, v);
          ndFFT(-1, x, y);
          var outShape = new Array(d);
          var outOffset = new Array(d);
          var needZeroFill = false;
          for (i = 0; i < d; ++i) {
            if (outs.shape[i] > nshape[i]) {
              needZeroFill = true;
            }
            outOffset[i] = bs.shape[i] - 1;
            outShape[i] = Math.min(outs.shape[i], nshape[i] - outOffset[i]);
          }
          var croppedX;
          if (needZeroFill) {
            ops.assign(outs, 0.0);
          }
          croppedX = x.lo.apply(x, outOffset);
          croppedX = croppedX.hi.apply(croppedX, outShape);
          ops.assign(outs.hi.apply(outs, outShape), croppedX);
          ndPool.freeDouble(xT);
          ndPool.freeDouble(yT);
          ndPool.freeDouble(uT);
          ndPool.freeDouble(vT);
          return out;
        };
        function createArray(arr, dtype) {
          if (arr instanceof NdArray) {
            return arr;
          }
          var T = _.getType(dtype);
          if (_.isNumber(arr)) {
            if (T !== Array) {
              return new NdArray(new T([arr]), [1]);
            } else {
              return new NdArray([arr], [1]);
            }
          }
          var shape = _.getShape(arr);
          if (shape.length > 1) {
            arr = _.flatten(arr, true);
          }
          if (!(arr instanceof T)) {
            arr = new T(arr);
          }
          return new NdArray(arr, shape);
        }
        NdArray.new = createArray;
        module.exports = NdArray;

        /*     utils    */
        function initNativeArray(shape, i) {
          i = i || 0;
          var c = shape[i] | 0;
          if (c <= 0) {
            return [];
          }
          var result = new Array(c);
          var j;
          if (i === shape.length - 1) {
            for (j = 0; j < c; ++j) {
              result[j] = 0;
            }
          } else {
            for (j = 0; j < c; ++j) {
              result[j] = initNativeArray(shape, i + 1);
            }
          }
          return result;
        }
        var doUnpack = cwise({
          args: ['array', 'scalar', 'index'],
          body: function unpackCwise(arr, a, idx) {
            var v = a;
            var i;
            for (i = 0; i < idx.length - 1; ++i) {
              v = v[idx[i]];
            }
            v[idx[idx.length - 1]] = arr;
          }
        });
        function unpackArray(arr) {
          var result = initNativeArray(arr.shape, 0);
          doUnpack(arr, result);
          return result;
        }
        function formatNumber(v) {
          return String(Number((v || 0).toFixed(CONF.nFloatingValues)));
        }

        /***/
      }),
      /***/"./node_modules/numjs/src/utils.js": (
      /*!*****************************************!*\
        !*** ./node_modules/numjs/src/utils.js ***!
        \*****************************************/
      /***/
      function _node_modules_numjs_src_utilsJs(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";

        var DTYPES = __webpack_require__(/*! ./dtypes */"./node_modules/numjs/src/dtypes.js");
        var _ = __webpack_require__(/*! lodash */"lodash");
        function isNumber(value) {
          return typeof value === 'number';
        }
        function isString(value) {
          return typeof value === 'string';
        }
        function isFunction(value) {
          return typeof value === 'function';
        }
        function baseFlatten(array, isDeep, result) {
          result = result || [];
          var index = -1;
          var length = array.length;
          while (++index < length) {
            var value = array[index];
            if (isNumber(value)) {
              result[result.length] = value;
            } else if (isDeep) {
              // Recursively flatten arrays (susceptible to call stack limits).
              baseFlatten(value, isDeep, result);
            } else {
              result.push(value);
            }
          }
          return result;
        }
        function shapeSize(shape) {
          var s = 1;
          for (var i = 0; i < shape.length; i++) {
            s *= shape[i];
          }
          return s;
        }
        function getType(dtype) {
          return isFunction(dtype) ? dtype : DTYPES[dtype] || Array;
        }
        function _dim(x) {
          var ret = [];
          while (_typeof(x) === 'object') {
            ret.push(x.length);
            x = x[0];
          }
          return ret;
        }
        function getShape(array) {
          var y, z;
          if (_typeof(array) === 'object') {
            y = array[0];
            if (_typeof(y) === 'object') {
              z = y[0];
              if (_typeof(z) === 'object') {
                return _dim(array);
              }
              return [array.length, y.length];
            }
            return [array.length];
          }
          return [];
        }

        // function haveSameShape (shape1, shape2) {
        //   if (shapeSize(shape1) !== shapeSize(shape2) || shape1.length !== shape2.length) {
        //     return false;
        //   }
        //   var d = shape1.length;
        //   for (var i = 0; i < d; i++) {
        //     if (shape1[i] !== shape2[i]) {
        //       return false;
        //     }
        //   }
        //   return true;
        // }

        module.exports = {
          isNumber: isNumber,
          isString: isString,
          isFunction: isFunction,
          flatten: baseFlatten,
          shapeSize: shapeSize,
          getType: getType,
          getShape: getShape,
          defaults: _.defaults
        };

        /***/
      }),
      /***/"./node_modules/typedarray-pool/pool.js": (
      /*!**********************************************!*\
        !*** ./node_modules/typedarray-pool/pool.js ***!
        \**********************************************/
      /***/
      function _node_modules_typedarrayPool_poolJs(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";

        var bits = __webpack_require__(/*! bit-twiddle */"./node_modules/bit-twiddle/twiddle.js");
        var dup = __webpack_require__(/*! dup */"./node_modules/dup/dup.js");
        var Buffer = __webpack_require__(/*! buffer */"./node_modules/buffer/index.js").Buffer;

        //Legacy pool support
        if (!__webpack_require__.g.__TYPEDARRAY_POOL) {
          __webpack_require__.g.__TYPEDARRAY_POOL = {
            UINT8: dup([32, 0]),
            UINT16: dup([32, 0]),
            UINT32: dup([32, 0]),
            BIGUINT64: dup([32, 0]),
            INT8: dup([32, 0]),
            INT16: dup([32, 0]),
            INT32: dup([32, 0]),
            BIGINT64: dup([32, 0]),
            FLOAT: dup([32, 0]),
            DOUBLE: dup([32, 0]),
            DATA: dup([32, 0]),
            UINT8C: dup([32, 0]),
            BUFFER: dup([32, 0])
          };
        }
        var hasUint8C = typeof Uint8ClampedArray !== 'undefined';
        var hasBigUint64 = typeof BigUint64Array !== 'undefined';
        var hasBigInt64 = typeof BigInt64Array !== 'undefined';
        var POOL = __webpack_require__.g.__TYPEDARRAY_POOL;

        //Upgrade pool
        if (!POOL.UINT8C) {
          POOL.UINT8C = dup([32, 0]);
        }
        if (!POOL.BIGUINT64) {
          POOL.BIGUINT64 = dup([32, 0]);
        }
        if (!POOL.BIGINT64) {
          POOL.BIGINT64 = dup([32, 0]);
        }
        if (!POOL.BUFFER) {
          POOL.BUFFER = dup([32, 0]);
        }

        //New technique: Only allocate from ArrayBufferView and Buffer
        var DATA = POOL.DATA,
          BUFFER = POOL.BUFFER;
        exports.free = function free(array) {
          if (Buffer.isBuffer(array)) {
            BUFFER[bits.log2(array.length)].push(array);
          } else {
            if (Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
              array = array.buffer;
            }
            if (!array) {
              return;
            }
            var n = array.length || array.byteLength;
            var log_n = bits.log2(n) | 0;
            DATA[log_n].push(array);
          }
        };
        function freeArrayBuffer(buffer) {
          if (!buffer) {
            return;
          }
          var n = buffer.length || buffer.byteLength;
          var log_n = bits.log2(n);
          DATA[log_n].push(buffer);
        }
        function freeTypedArray(array) {
          freeArrayBuffer(array.buffer);
        }
        exports.freeUint8 = exports.freeUint16 = exports.freeUint32 = exports.freeBigUint64 = exports.freeInt8 = exports.freeInt16 = exports.freeInt32 = exports.freeBigInt64 = exports.freeFloat32 = exports.freeFloat = exports.freeFloat64 = exports.freeDouble = exports.freeUint8Clamped = exports.freeDataView = freeTypedArray;
        exports.freeArrayBuffer = freeArrayBuffer;
        exports.freeBuffer = function freeBuffer(array) {
          BUFFER[bits.log2(array.length)].push(array);
        };
        exports.malloc = function malloc(n, dtype) {
          if (dtype === undefined || dtype === 'arraybuffer') {
            return mallocArrayBuffer(n);
          } else {
            switch (dtype) {
              case 'uint8':
                return mallocUint8(n);
              case 'uint16':
                return mallocUint16(n);
              case 'uint32':
                return mallocUint32(n);
              case 'int8':
                return mallocInt8(n);
              case 'int16':
                return mallocInt16(n);
              case 'int32':
                return mallocInt32(n);
              case 'float':
              case 'float32':
                return mallocFloat(n);
              case 'double':
              case 'float64':
                return mallocDouble(n);
              case 'uint8_clamped':
                return mallocUint8Clamped(n);
              case 'bigint64':
                return mallocBigInt64(n);
              case 'biguint64':
                return mallocBigUint64(n);
              case 'buffer':
                return mallocBuffer(n);
              case 'data':
              case 'dataview':
                return mallocDataView(n);
              default:
                return null;
            }
          }
          return null;
        };
        function mallocArrayBuffer(n) {
          var n = bits.nextPow2(n);
          var log_n = bits.log2(n);
          var d = DATA[log_n];
          if (d.length > 0) {
            return d.pop();
          }
          return new ArrayBuffer(n);
        }
        exports.mallocArrayBuffer = mallocArrayBuffer;
        function mallocUint8(n) {
          return new Uint8Array(mallocArrayBuffer(n), 0, n);
        }
        exports.mallocUint8 = mallocUint8;
        function mallocUint16(n) {
          return new Uint16Array(mallocArrayBuffer(2 * n), 0, n);
        }
        exports.mallocUint16 = mallocUint16;
        function mallocUint32(n) {
          return new Uint32Array(mallocArrayBuffer(4 * n), 0, n);
        }
        exports.mallocUint32 = mallocUint32;
        function mallocInt8(n) {
          return new Int8Array(mallocArrayBuffer(n), 0, n);
        }
        exports.mallocInt8 = mallocInt8;
        function mallocInt16(n) {
          return new Int16Array(mallocArrayBuffer(2 * n), 0, n);
        }
        exports.mallocInt16 = mallocInt16;
        function mallocInt32(n) {
          return new Int32Array(mallocArrayBuffer(4 * n), 0, n);
        }
        exports.mallocInt32 = mallocInt32;
        function mallocFloat(n) {
          return new Float32Array(mallocArrayBuffer(4 * n), 0, n);
        }
        exports.mallocFloat32 = exports.mallocFloat = mallocFloat;
        function mallocDouble(n) {
          return new Float64Array(mallocArrayBuffer(8 * n), 0, n);
        }
        exports.mallocFloat64 = exports.mallocDouble = mallocDouble;
        function mallocUint8Clamped(n) {
          if (hasUint8C) {
            return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n);
          } else {
            return mallocUint8(n);
          }
        }
        exports.mallocUint8Clamped = mallocUint8Clamped;
        function mallocBigUint64(n) {
          if (hasBigUint64) {
            return new BigUint64Array(mallocArrayBuffer(8 * n), 0, n);
          } else {
            return null;
          }
        }
        exports.mallocBigUint64 = mallocBigUint64;
        function mallocBigInt64(n) {
          if (hasBigInt64) {
            return new BigInt64Array(mallocArrayBuffer(8 * n), 0, n);
          } else {
            return null;
          }
        }
        exports.mallocBigInt64 = mallocBigInt64;
        function mallocDataView(n) {
          return new DataView(mallocArrayBuffer(n), 0, n);
        }
        exports.mallocDataView = mallocDataView;
        function mallocBuffer(n) {
          n = bits.nextPow2(n);
          var log_n = bits.log2(n);
          var cache = BUFFER[log_n];
          if (cache.length > 0) {
            return cache.pop();
          }
          return new Buffer(n);
        }
        exports.mallocBuffer = mallocBuffer;
        exports.clearCache = function clearCache() {
          for (var i = 0; i < 32; ++i) {
            POOL.UINT8[i].length = 0;
            POOL.UINT16[i].length = 0;
            POOL.UINT32[i].length = 0;
            POOL.INT8[i].length = 0;
            POOL.INT16[i].length = 0;
            POOL.INT32[i].length = 0;
            POOL.FLOAT[i].length = 0;
            POOL.DOUBLE[i].length = 0;
            POOL.BIGUINT64[i].length = 0;
            POOL.BIGINT64[i].length = 0;
            POOL.UINT8C[i].length = 0;
            DATA[i].length = 0;
            BUFFER[i].length = 0;
          }
        };

        /***/
      }),
      /***/"./node_modules/uniq/uniq.js": (
      /*!***********************************!*\
        !*** ./node_modules/uniq/uniq.js ***!
        \***********************************/
      /***/
      function _node_modules_uniq_uniqJs(module) {
        "use strict";

        function unique_pred(list, compare) {
          var ptr = 1,
            len = list.length,
            a = list[0],
            b = list[0];
          for (var i = 1; i < len; ++i) {
            b = a;
            a = list[i];
            if (compare(a, b)) {
              if (i === ptr) {
                ptr++;
                continue;
              }
              list[ptr++] = a;
            }
          }
          list.length = ptr;
          return list;
        }
        function unique_eq(list) {
          var ptr = 1,
            len = list.length,
            a = list[0],
            b = list[0];
          for (var i = 1; i < len; ++i, b = a) {
            b = a;
            a = list[i];
            if (a !== b) {
              if (i === ptr) {
                ptr++;
                continue;
              }
              list[ptr++] = a;
            }
          }
          list.length = ptr;
          return list;
        }
        function unique(list, compare, sorted) {
          if (list.length === 0) {
            return list;
          }
          if (compare) {
            if (!sorted) {
              list.sort(compare);
            }
            return unique_pred(list, compare);
          }
          if (!sorted) {
            list.sort();
          }
          return unique_eq(list);
        }
        module.exports = unique;

        /***/
      }),
      /***/"lodash": (
      /*!*************************!*\
        !*** external "lodash" ***!
        \*************************/
      /***/
      function lodash(module) {
        "use strict";

        module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

        /***/
      }),
      /***/"path-browserify": (
      /*!**********************************!*\
        !*** external "path-browserify" ***!
        \**********************************/
      /***/
      function pathBrowserify(module) {
        "use strict";

        module.exports = __WEBPACK_EXTERNAL_MODULE_path_browserify__;

        /***/
      })

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
      /******/var cachedModule = __webpack_module_cache__[moduleId];
      /******/
      if (cachedModule !== undefined) {
        /******/return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/
      var module = __webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/exports: {}
        /******/
      };
      /******/
      /******/ // Execute the module function
      /******/
      __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Return the exports of the module
      /******/
      return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/global */
    /******/
    (function () {
      /******/__webpack_require__.g = function () {
        /******/if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') return globalThis;
        /******/
        try {
          /******/return this || new Function('return this')();
          /******/
        } catch (e) {
          /******/if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') return window;
          /******/
        }
        /******/
      }();
      /******/
    })();
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
  }();
});
})();