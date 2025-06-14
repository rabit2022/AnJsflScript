"use strict";

function _typeof2(o) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof2(o); }
var __AnJsflScript;
/******/
(function () {
  // webpackBootstrap
  /******/
  var __webpack_modules__ = {
    /***/"./Core/Utils/Tips.jsfl": (
    /*!******************************!*\
      !*** ./Core/Utils/Tips.jsfl ***!
      \******************************/
    /***/
    function _Core_Utils_TipsJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        /**
         * @file: Tips.jsfl
         * @author: 穹的兔兔
         * @email: 3101829204@qq.com
         * @date: 2025/4/11 20:42
         * @project: AnJsflScript
         * @description:
         */
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          var author = "作者：@穹的兔兔\n QQ：3101829204";
          var alertMessageConfig = {
            XUL: "【温馨提示】\n1.这个脚本 由于导入了XUL库，属于重型库，可能会导致卡顿异常，闪退，不兼容等情况\n2.这个脚本 会生成多个元件，用于组成字符画，以保证效果的完美，可能造成画面过于复杂，导出时可能出现问题。\n请确认是否继续!!!\n\n作者: " + author,
            // 特殊模块的提示信息
            "default!": "是否加载模块？\n\n " + author + "\n 模块名：",
            "failed!": "加载模块失败，请联系作者！！！\n\n " + author + "\n 模块名：",
            // FirstRun提示信息
            "loading success!": "【温馨提示】导入成功！！！\n 如果有bug,或者建议，请@我。\n\n【注意】这个文件只是导入所需的模块，并没有安装功能。 \n" + author,
            // 防盗链提示信息
            "loading might be not allowed!": "【温馨提示】你可能使用的是盗版软件，这个是开源的项目，如果花费了金钱购买，请退款。\n\n " + author + "\n 地址：https://github.com/rabit2022/AnJsflScript"
          };
          function TryLoad(moduleName) {
            var msg = alertMessageConfig[moduleName] || alertMessageConfig["default!"] + moduleName;
            var ok = confirm(msg);
            if (!ok) return;

            // 加载模块
            var XUL;
            try {
              requirejs([moduleName], function (module) {
                XUL = module;
              });
            } catch (e) {
              alert(alertMessageConfig["failed!"] + moduleName + "\n\n" + e.message);
            }
            return XUL;
          }

          /**
           * 检查变量是否被重新声明
           * @param {any} variable 被重复声明的变量
           * @param {string} name 变量名
           */
          function checkVariableRedeclaration(variable, name) {
            var assert;
            requirejs(["assert"], function (module) {
              assert = module;
            });
            if (typeof variable === "undefined") {
              var msg = "参数 " + name + "在函数内被重新声明，可能覆盖了外部变量。";
              console.info(msg);
              assert.fail(variable, undefined, msg, "==", checkVariableRedeclaration);
            }
          }
          function alertMessage(mode) {
            var msg = alertMessageConfig[mode];
            if (msg) {
              alert(msg);
            }
          }
          return {
            TryLoad: TryLoad,
            checkVariableRedeclaration: checkVariableRedeclaration,
            alertMessage: alertMessage
          };
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./FirstRun.webpack.jsfl": (
    /*!*******************************!*\
      !*** ./FirstRun.webpack.jsfl ***!
      \*******************************/
    /***/
    function _FirstRunWebpackJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        /**
         * @file: FirstRun.webpack.jsfl
         * @author: 穹的兔兔
         * @email: 3101829204@qq.com
         * @date: 2024/12/16 16:45
         * @project: AnJsflScript
         * @description:无法运行，只用于生成 webpack 打包文件
         */
        (function () {
          /**
           * 获取当前 文件夹 路径
           */
          function getcwd() {
            var scriptURI = fl.scriptURI;
            // 斜杠符号的位置
            var lastSlashIndex = scriptURI.lastIndexOf("/");
            // 获取脚本文件所在的文件夹路径
            var folderPath = scriptURI.substring(0, lastSlashIndex);
            return folderPath;
          }

          /**
           * Flash script 导入指定脚本文件
           * @param {...string} scriptPaths 相对于当前脚本文件的相对路径，或绝对路径（允许多个路径，可以混搭）
           */
          function importFlashScripts() {
            // region polyfills

            // String.prototype.startswith
            function startsWith(str, prefix) {
              return str.indexOf(prefix) === 0;
            }

            // String.prototype.endsWith
            function endsWith(str, suffix) {
              return str.lastIndexOf(suffix) === str.length - suffix.length;
            }

            // 获取当前脚本文件的所在文件夹路径
            function getcwd() {
              var scriptURI = fl.scriptURI;
              // 斜杠符号的位置
              var lastSlashIndex = scriptURI.lastIndexOf("/");
              // 获取脚本文件所在的文件夹路径
              var folderPath = scriptURI.substring(0, lastSlashIndex);
              return folderPath;
            }

            // 检查文件是否存在
            var fileExists = FLfile.exists;
            function assertPath(path) {
              if (typeof path !== "string") {
                throw new TypeError("Path must be a string. Received " + path + "."); // 'Path must be a string. Received ' + JSON.stringify(path)
              }
            }
            function isAbsolute(path) {
              assertPath(path);
              // return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
              var ABSOLUTE_FLAG = "file:///";
              return path.length > 0 && startsWith(path, ABSOLUTE_FLAG);
            }

            // endregion polyfills

            // 将 arguments 转换为数组
            var paths = Array.prototype.slice.call(arguments);
            var curWorkingDirectory = getcwd();
            paths.forEach(function (path) {
              // 转换为绝对路径
              var scriptURI = isAbsolute(path) ? path : curWorkingDirectory + "/" + path;

              // 结尾是.js后缀名时，替换为.jsfl后缀名
              if (endsWith(scriptURI, ".js")) {
                scriptURI = scriptURI.replace(/(\.[^.]*)?$/, ".jsfl");
              }
              // 结尾没有.jsfl后缀名时，添加.jsfl后缀名
              if (!/\.jsfl$/.test(scriptURI)) {
                scriptURI += ".jsfl";
              }

              // var message = '[importFlashScripts] Run script file [' + scriptURI + ']';
              // fl.trace(message);
              // 执行脚本
              var exists = fileExists(scriptURI);
              if (exists) {
                fl.runScript(scriptURI);
              } else {
                var message = "[importFlashScripts] Error: Cannot find script file [" + scriptURI + "]";
                fl.trace(message);
                // console.stack(message);
                throw new Error(message);
              }
            });
          }

          // region setTimeout polyfill
          /**
           * 用于存储所有定时器的数组。
           * @type {Array.<{eventID: number, startTime: number, delay: number}>}
           */
          var timers = [];

          /**
           * 模拟 JavaScript 的 Timeout 对象。
           * @constructor
           * @param {function} callbackFunction - 延迟后要执行的回调函数。
           * @param {number} delay - 延迟时间（单位：毫秒）。
           */
          function Timeout(callbackFunction, delay) {
            /**
             * 延迟时间（单位：毫秒）。
             * @type {number}
             */
            this._idleTimeout = delay;

            /**
             * 回调函数。
             * @type {function}
             */
            this._onTimeout = callbackFunction;

            /**
             * 定时器的唯一标识符。
             * @type {number|null}
             */
            this._timerID = null;

            /**
             * 是否已被销毁（取消）。
             * @type {boolean}
             */
            this._destroyed = false;

            // 初始化定时器
            this._startTimer();
          }

          /**
           * 启动定时器。
           * @private
           */
          Timeout.prototype._startTimer = function () {
            var self = this;

            // 获取当前时间戳
            var startTime = new Date().getTime();

            /**
             * 检查延迟是否已达到的回调函数。
             * @private
             */
            function checkDelay() {
              var currentTime = new Date().getTime();
              if (currentTime - startTime >= self._idleTimeout && !self._destroyed) {
                self._onTimeout(); // 执行目标回调函数
                self._clearTimer(); // 清除定时器
              }
            }

            // 注册 mouseMove 事件侦听器
            var eventID = fl.addEventListener("mouseMove", checkDelay);

            // 生成一个唯一的定时器 ID
            var timerID = timers.length;

            // 将定时器信息存储到 timers 数组中
            timers.push({
              eventID: eventID,
              startTime: startTime,
              delay: self._idleTimeout
            });

            // 保存定时器 ID
            self._timerID = timerID;
          };

          /**
           * 清除定时器。
           * @private
           */
          Timeout.prototype._clearTimer = function () {
            if (this._timerID !== null) {
              // 获取对应的事件 ID
              var eventID = timers[this._timerID].eventID;

              // 移除事件侦听器
              fl.removeEventListener("mouseMove", eventID);

              // 从 timers 数组中移除该定时器
              timers.splice(this._timerID, 1);

              // 标记为销毁
              this._destroyed = true;
            }
          };

          /**
           * 取消定时器。
           */
          Timeout.prototype.clear = function () {
            this._clearTimer();
          };

          /**
           * 创建一个 Timeout 实例。
           * @param {function} callbackFunction - 延迟后要执行的回调函数。
           * @param {number} delay - 延迟时间（单位：毫秒）。
           * @returns {Timeout} 返回一个 Timeout 实例。
           */
          function setTimeout(callbackFunction, delay) {
            return new Timeout(callbackFunction, delay);
          }

          // endregion setTimeout polyfill

          function Main() {
            window.AnJsflScript = {};
            // window.AnJsflScript.importFlashScripts = importFlashScripts;
            /**
             * 项目文件夹路径
             * @type {string}
             */
            window.AnJsflScript.$ProjectFileDir$ = getcwd();
            /**
             * 其他脚本的  存储变量
             * @type {{}}
             */
            window.AnJsflScript.GLOBALS = {};

            // var config = {
            //     "require-js": "Third/modules/requirejs-2.3.7/require-js"
            // };
            // // 导入模块,相对路径导入
            // window.AnJsflScript.importFlashScripts(config["require-js"]);

            // 由于setTimeout的polyfill，与原生有差别，导致require.js加载失败，所以必须先加载require.js
            // 想要使用Promise(es6-shim或es6-sham),需要在 setTimeout
            window.setTimeout = setTimeout;

            // 导入Promise模块
            // require会被babel翻译为Promise,导致报错
            /* provided dependency */
            var Promise = __webpack_require__(/*! es6-promise */"./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl")["Promise"];
            Promise.resolve(/*! AMD require */).then(function () {
              [
              // 导入配置文件
              // "./require-config",

              __webpack_require__(/*! es6-promise */"./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl"),
              // 导入shims, 避免其他模块依赖时报错
              __webpack_require__(/*! es5-shim */"./Third/polyfill/es5-shim-4.6.7/es5-shim.jsfl"),
              // es5,es2009
              __webpack_require__(/*! es5-sham */"./Third/polyfill/es5-shim-4.6.7/es5-sham.jsfl"), __webpack_require__(/*! es6-shim */"./Third/polyfill/es6-shim-0.35.4/es6-shim.jsfl"),
              // es6,es2015
              __webpack_require__(/*! es6-sham */"./Third/polyfill/es6-shim-0.35.4/es6-sham.jsfl"), __webpack_require__(/*! es7-shim */"./Third/polyfill/es7-shim-6.0.0/es7-shim.jsfl"),
              // es7,es2016
              __webpack_require__(/*! es2017 */"./Third/polyfill/polyfill-0.1.43/es2017.jsfl"),
              // es8,es2017

              __webpack_require__(/*! json3 */"./Third/json/json3-3.3.3/json3.jsfl")
              // "console"
              ];
            })['catch'](__webpack_require__.oe);
            Promise.resolve(/*! AMD require */).then(function () {
              var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! loglevel */"./Third/log/loglevel-1.9.2/loglevel.jsfl"), __webpack_require__(/*! Tips */"./Core/Utils/Tips.jsfl")];
              (function (log, Tips) {
                // 禁用log
                log.setDefaultLevel(log.levels.SILENT);

                // 显示提示信息
                var alertMessage = Tips.alertMessage;
                alertMessage("loading success!");
                if (!window.AnJsflScript.$ProjectFileDir$.includes("AnJsflScript")) {
                  alertMessage("loading might be not allowed!");
                }
              }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);
            })['catch'](__webpack_require__.oe);
          }
          Main();
        })();
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/json/json3-3.3.3/json3.jsfl": (
    /*!*******************************************!*\
      !*** ./Third/json/json3-3.3.3/json3.jsfl ***!
      \*******************************************/
    /***/
    function _Third_json_json3333_json3Jsfl(module, exports, __webpack_require__) {
      /* module decorator */module = __webpack_require__.nmd(module);
      var __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        /*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
        (function () {
          // Detect the `define` function exposed by asynchronous module loaders. The
          // strict `define` check is necessary for compatibility with `r.js`.
          var isLoader = true && __webpack_require__.amdO;

          // A set of types used to distinguish objects from primitives.
          var objectTypes = {
            "function": true,
            object: true
          };

          // Detect the `exports` object exposed by CommonJS implementations.
          var freeExports = objectTypes[false ? 0 : _typeof(exports)] && exports && !exports.nodeType && exports;

          // Use the `global` object exposed by Node (including Browserify via
          // `insert-module-globals`), Narwhal, and Ringo as the default context,
          // and the `window` object in browsers. Rhino exports a `global` function
          // instead.
          var root = objectTypes[typeof window === "undefined" ? "undefined" : _typeof(window)] && window || this,
            freeGlobal = freeExports && objectTypes[false ? 0 : _typeof(module)] && module && !module.nodeType && (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g;
          if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
            root = freeGlobal;
          }

          // Public: Initializes JSON 3 using the given `context` object, attaching the
          // `stringify` and `parse` functions to the specified `exports` object.
          function runInContext(context, exports) {
            context || (context = root.Object());
            exports || (exports = root.Object());

            // Native constructor aliases.
            var Number = context.Number || root.Number,
              String = context.String || root.String,
              Object = context.Object || root.Object,
              Date = context.Date || root.Date,
              SyntaxError = context.SyntaxError || root.SyntaxError,
              TypeError = context.TypeError || root.TypeError,
              Math = context.Math || root.Math,
              nativeJSON = context.JSON || root.JSON;

            // Delegate to the native `stringify` and `parse` implementations.
            if (_typeof(nativeJSON) == 'object' && nativeJSON) {
              exports.stringify = nativeJSON.stringify;
              exports.parse = nativeJSON.parse;
            }

            // Convenience aliases.
            var objectProto = Object.prototype,
              getClass = objectProto.toString,
              isProperty = objectProto.hasOwnProperty,
              undefined;

            // Internal: Contains `try...catch` logic used by other functions.
            // This prevents other functions from being deoptimized.
            function attempt(func, errorFunc) {
              try {
                func();
              } catch (exception) {
                if (errorFunc) {
                  errorFunc();
                }
              }
            }

            // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
            var isExtended = new Date(-3509827334573292);
            attempt(function () {
              // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
              // results for certain dates in Opera >= 10.53.
              isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
            });

            // Internal: Determines whether the native `JSON.stringify` and `parse`
            // implementations are spec-compliant. Based on work by Ken Snyder.
            function has(name) {
              if (has[name] != null) {
                // Return cached feature test result.
                return has[name];
              }
              var isSupported;
              if (name == 'bug-string-char-index') {
                // IE <= 7 doesn't support accessing string characters using square
                // bracket notation. IE 8 only supports this for primitives.
                isSupported = 'a'[0] != 'a';
              } else if (name == 'json') {
                // Indicates whether both `JSON.stringify` and `JSON.parse` are
                // supported.
                isSupported = has('json-stringify') && has('date-serialization') && has('json-parse');
              } else if (name == 'date-serialization') {
                // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
                isSupported = has('json-stringify') && isExtended;
                if (isSupported) {
                  var stringify = exports.stringify;
                  attempt(function () {
                    isSupported =
                    // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                    // serialize extended years.
                    stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                    // The milliseconds are optional in ES 5, but required in 5.1.
                    stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                    // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                    // four-digit years instead of six-digit years. Credits: @Yaffle.
                    stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                    // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                    // values less than 1000. Credits: @Yaffle.
                    stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                  });
                }
              } else {
                var value,
                  serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
                // Test `JSON.stringify`.
                if (name == 'json-stringify') {
                  var stringify = exports.stringify,
                    stringifySupported = typeof stringify == 'function';
                  if (stringifySupported) {
                    // A test function object with a custom `toJSON` method.
                    (value = function value() {
                      return 1;
                    }).toJSON = value;
                    attempt(function () {
                      stringifySupported =
                      // Firefox 3.1b1 and b2 serialize string, number, and boolean
                      // primitives as object literals.
                      stringify(0) === '0' &&
                      // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                      // literals.
                      stringify(new Number()) === '0' && stringify(new String()) == '""' &&
                      // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                      // does not define a canonical JSON representation (this applies to
                      // objects with `toJSON` properties as well, *unless* they are nested
                      // within an object or array).
                      stringify(getClass) === undefined &&
                      // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                      // FF 3.1b3 pass this test.
                      stringify(undefined) === undefined &&
                      // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                      // respectively, if the value is omitted entirely.
                      stringify() === undefined &&
                      // FF 3.1b1, 2 throw an error if the given value is not a number,
                      // string, array, object, Boolean, or `null` literal. This applies to
                      // objects with custom `toJSON` methods as well, unless they are nested
                      // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                      // methods entirely.
                      stringify(value) === '1' && stringify([value]) == '[1]' &&
                      // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                      // `"[null]"`.
                      stringify([undefined]) == '[null]' &&
                      // YUI 3.0.0b1 fails to serialize `null` literals.
                      stringify(null) == 'null' &&
                      // FF 3.1b1, 2 halts serialization if an array contains a function:
                      // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                      // elides non-JSON values from objects and arrays, unless they
                      // define custom `toJSON` methods.
                      stringify([undefined, getClass, null]) == '[null,null,null]' &&
                      // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                      // where character escape codes are expected (e.g., `\b` => `\u0008`).
                      stringify({
                        a: [value, true, false, null, '\x00\b\n\f\r\t']
                      }) == serialized &&
                      // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                      stringify(null, value) === '1' && stringify([1, 2], null, 1) == '[\n 1,\n 2\n]';
                    }, function () {
                      stringifySupported = false;
                    });
                  }
                  isSupported = stringifySupported;
                }
                // Test `JSON.parse`.
                if (name == 'json-parse') {
                  var parse = exports.parse,
                    parseSupported;
                  if (typeof parse == 'function') {
                    attempt(function () {
                      // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                      // Conforming implementations should also coerce the initial argument to
                      // a string prior to parsing.
                      if (parse('0') === 0 && !parse(false)) {
                        // Simple parsing test.
                        value = parse(serialized);
                        parseSupported = value['a'].length == 5 && value['a'][0] === 1;
                        if (parseSupported) {
                          attempt(function () {
                            // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                            parseSupported = !parse('"\t"');
                          });
                          if (parseSupported) {
                            attempt(function () {
                              // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                              // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                              // certain octal literals.
                              parseSupported = parse('01') !== 1;
                            });
                          }
                          if (parseSupported) {
                            attempt(function () {
                              // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                              // points. These environments, along with FF 3.1b1 and 2,
                              // also allow trailing commas in JSON objects and arrays.
                              parseSupported = parse('1.') !== 1;
                            });
                          }
                        }
                      }
                    }, function () {
                      parseSupported = false;
                    });
                  }
                  isSupported = parseSupported;
                }
              }
              return has[name] = !!isSupported;
            }
            has['bug-string-char-index'] = has['date-serialization'] = has['json'] = has['json-stringify'] = has['json-parse'] = null;
            if (!has('json')) {
              // Common `[[Class]]` name aliases.
              var functionClass = '[object Function]',
                dateClass = '[object Date]',
                numberClass = '[object Number]',
                stringClass = '[object String]',
                arrayClass = '[object Array]',
                booleanClass = '[object Boolean]';

              // Detect incomplete support for accessing string characters by index.
              var charIndexBuggy = has('bug-string-char-index');

              // Internal: Normalizes the `for...in` iteration algorithm across
              // environments. Each enumerated key is yielded to a `callback` function.
              var _forOwn = function forOwn(object, callback) {
                var size = 0,
                  Properties,
                  dontEnums,
                  property;

                // Tests for bugs in the current environment's `for...in` algorithm. The
                // `valueOf` property inherits the non-enumerable flag from
                // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
                (Properties = function Properties() {
                  this.valueOf = 0;
                }).prototype.valueOf = 0;

                // Iterate over a new instance of the `Properties` class.
                dontEnums = new Properties();
                for (property in dontEnums) {
                  // Ignore all properties inherited from `Object.prototype`.
                  if (isProperty.call(dontEnums, property)) {
                    size++;
                  }
                }
                Properties = dontEnums = null;

                // Normalize the iteration algorithm.
                if (!size) {
                  // A list of non-enumerable properties inherited from `Object.prototype`.
                  dontEnums = ['valueOf', 'toString', 'toLocaleString', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'constructor'];
                  // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                  // properties.
                  _forOwn = function forOwn(object, callback) {
                    var isFunction = getClass.call(object) == functionClass,
                      property,
                      length;
                    var hasProperty = !isFunction && typeof object.constructor != 'function' && objectTypes[_typeof(object.hasOwnProperty)] && object.hasOwnProperty || isProperty;
                    for (property in object) {
                      // Gecko <= 1.0 enumerates the `prototype` property of functions under
                      // certain conditions; IE does not.
                      if (!(isFunction && property == 'prototype') && hasProperty.call(object, property)) {
                        callback(property);
                      }
                    }
                    // Manually invoke the callback for each non-enumerable property.
                    for (length = dontEnums.length; property = dontEnums[--length];) {
                      if (hasProperty.call(object, property)) {
                        callback(property);
                      }
                    }
                  };
                } else {
                  // No bugs detected; use the standard `for...in` algorithm.
                  _forOwn = function forOwn(object, callback) {
                    var isFunction = getClass.call(object) == functionClass,
                      property,
                      isConstructor;
                    for (property in object) {
                      if (!(isFunction && property == 'prototype') && isProperty.call(object, property) && !(isConstructor = property === 'constructor')) {
                        callback(property);
                      }
                    }
                    // Manually invoke the callback for the `constructor` property due to
                    // cross-environment inconsistencies.
                    if (isConstructor || isProperty.call(object, property = 'constructor')) {
                      callback(property);
                    }
                  };
                }
                return _forOwn(object, callback);
              };

              // Public: Serializes a JavaScript `value` as a JSON string. The optional
              // `filter` argument may specify either a function that alters how object and
              // array members are serialized, or an array of strings and numbers that
              // indicates which properties should be serialized. The optional `width`
              // argument may be either a string or number that specifies the indentation
              // level of the output.
              if (!has('json-stringify') && !has('date-serialization')) {
                // Internal: A map of control characters and their escaped equivalents.
                var Escapes = {
                  92: '\\\\',
                  34: '\\"',
                  8: '\\b',
                  12: '\\f',
                  10: '\\n',
                  13: '\\r',
                  9: '\\t'
                };

                // Internal: Converts `value` into a zero-padded string such that its
                // length is at least equal to `width`. The `width` must be <= 6.
                var leadingZeroes = '000000';
                var toPaddedString = function toPaddedString(width, value) {
                  // The `|| 0` expression is necessary to work around a bug in
                  // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                  return (leadingZeroes + (value || 0)).slice(-width);
                };

                // Internal: Serializes a date object.
                var _serializeDate = function serializeDate(value) {
                  var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
                  // Define additional utility methods if the `Date` methods are buggy.
                  if (!isExtended) {
                    var floor = Math.floor;
                    // A mapping between the months of the year and the number of days between
                    // January 1st and the first of the respective month.
                    var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                    // Internal: Calculates the number of days between the Unix epoch and the
                    // first day of the given month.
                    var getDay = function getDay(year, month) {
                      return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                    };
                    getData = function getData(value) {
                      // Manually compute the year, month, date, hours, minutes,
                      // seconds, and milliseconds if the `getUTC*` methods are
                      // buggy. Adapted from @Yaffle's `date-shim` project.
                      date = floor(value / 864e5);
                      for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                      for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                      date = 1 + date - getDay(year, month);
                      // The `time` value specifies the time within the day (see ES
                      // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                      // to compute `A modulo B`, as the `%` operator does not
                      // correspond to the `modulo` operation for negative numbers.
                      time = (value % 864e5 + 864e5) % 864e5;
                      // The hours, minutes, seconds, and milliseconds are obtained by
                      // decomposing the time within the day. See section 15.9.1.10.
                      hours = floor(time / 36e5) % 24;
                      minutes = floor(time / 6e4) % 60;
                      seconds = floor(time / 1e3) % 60;
                      milliseconds = time % 1e3;
                    };
                  } else {
                    getData = function getData(value) {
                      year = value.getUTCFullYear();
                      month = value.getUTCMonth();
                      date = value.getUTCDate();
                      hours = value.getUTCHours();
                      minutes = value.getUTCMinutes();
                      seconds = value.getUTCSeconds();
                      milliseconds = value.getUTCMilliseconds();
                    };
                  }
                  _serializeDate = function serializeDate(value) {
                    if (value > -1 / 0 && value < 1 / 0) {
                      // Dates are serialized according to the `Date#toJSON` method
                      // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                      // for the ISO 8601 date time string format.
                      getData(value);
                      // Serialize extended years correctly.
                      value = (year <= 0 || year >= 1e4 ? (year < 0 ? '-' : '+') + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + '-' + toPaddedString(2, month + 1) + '-' + toPaddedString(2, date) +
                      // Months, dates, hours, minutes, and seconds should have two
                      // digits; milliseconds should have three.
                      'T' + toPaddedString(2, hours) + ':' + toPaddedString(2, minutes) + ':' + toPaddedString(2, seconds) +
                      // Milliseconds are optional in ES 5.0, but required in 5.1.
                      '.' + toPaddedString(3, milliseconds) + 'Z';
                      year = month = date = hours = minutes = seconds = milliseconds = null;
                    } else {
                      value = null;
                    }
                    return value;
                  };
                  return _serializeDate(value);
                };

                // For environments with `JSON.stringify` but buggy date serialization,
                // we override the native `Date#toJSON` implementation with a
                // spec-compliant one.
                if (has('json-stringify') && !has('date-serialization')) {
                  // Internal: the `Date#toJSON` implementation used to override the native one.
                  var dateToJSON = function dateToJSON(key) {
                    return _serializeDate(this);
                  }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
                  var nativeStringify = exports.stringify;
                  exports.stringify = function (source, filter, width) {
                    var nativeToJSON = Date.prototype.toJSON;
                    Date.prototype.toJSON = dateToJSON;
                    var result = nativeStringify(source, filter, width);
                    Date.prototype.toJSON = nativeToJSON;
                    return result;
                  };
                } else {
                  // Internal: Double-quotes a string `value`, replacing all ASCII control
                  // characters (characters with code unit values between 0 and 31) with
                  // their escaped equivalents. This is an implementation of the
                  // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                  var unicodePrefix = "\\u00";
                  var escapeChar = function escapeChar(character) {
                    var charCode = character.charCodeAt(0),
                      escaped = Escapes[charCode];
                    if (escaped) {
                      return escaped;
                    }
                    return unicodePrefix + toPaddedString(2, charCode.toString(16));
                  };
                  var reEscape = /[\x00-\x1f\x22\x5c]/g;
                  var quote = function quote(value) {
                    reEscape.lastIndex = 0;
                    return '"' + (reEscape.test(value) ? value.replace(reEscape, escapeChar) : value) + '"';
                  };

                  // Internal: Recursively serializes an object. Implements the
                  // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
                  var _serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
                    var value, type, className, results, element, index, length, prefix, result;
                    attempt(function () {
                      // Necessary for host object support.
                      value = object[property];
                    });
                    if (_typeof(value) == 'object' && value) {
                      if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                        value = _serializeDate(value);
                      } else if (typeof value.toJSON == 'function') {
                        value = value.toJSON(property);
                      }
                    }
                    if (callback) {
                      // If a replacement function was provided, call it to obtain the value
                      // for serialization.
                      value = callback.call(object, property, value);
                    }
                    // Exit early if value is `undefined` or `null`.
                    if (value == undefined) {
                      return value === undefined ? value : 'null';
                    }
                    type = _typeof(value);
                    // Only call `getClass` if the value is an object.
                    if (type == 'object') {
                      className = getClass.call(value);
                    }
                    switch (className || type) {
                      case 'boolean':
                      case booleanClass:
                        // Booleans are represented literally.
                        return '' + value;
                      case 'number':
                      case numberClass:
                        // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                        // `"null"`.
                        return value > -1 / 0 && value < 1 / 0 ? '' + value : 'null';
                      case 'string':
                      case stringClass:
                        // Strings are double-quoted and escaped.
                        return quote('' + value);
                    }
                    // Recursively serialize objects and arrays.
                    if (_typeof(value) == 'object') {
                      // Check for cyclic structures. This is a linear search; performance
                      // is inversely proportional to the number of unique nested objects.
                      for (length = stack.length; length--;) {
                        if (stack[length] === value) {
                          // Cyclic structures cannot be serialized by `JSON.stringify`.
                          throw TypeError();
                        }
                      }
                      // Add the object to the stack of traversed objects.
                      stack.push(value);
                      results = [];
                      // Save the current indentation level and indent one additional level.
                      prefix = indentation;
                      indentation += whitespace;
                      if (className == arrayClass) {
                        // Recursively serialize array elements.
                        for (index = 0, length = value.length; index < length; index++) {
                          element = _serialize(index, value, callback, properties, whitespace, indentation, stack);
                          results.push(element === undefined ? 'null' : element);
                        }
                        result = results.length ? whitespace ? '[\n' + indentation + results.join(',\n' + indentation) + '\n' + prefix + ']' : '[' + results.join(',') + ']' : '[]';
                      } else {
                        // Recursively serialize object members. Members are selected from
                        // either a user-specified list of property names, or the object
                        // itself.
                        _forOwn(properties || value, function (property) {
                          var element = _serialize(property, value, callback, properties, whitespace, indentation, stack);
                          if (element !== undefined) {
                            // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                            // is not the empty string, let `member` {quote(property) + ":"}
                            // be the concatenation of `member` and the `space` character."
                            // The "`space` character" refers to the literal space
                            // character, not the `space` {width} argument provided to
                            // `JSON.stringify`.
                            results.push(quote(property) + ':' + (whitespace ? ' ' : '') + element);
                          }
                        });
                        result = results.length ? whitespace ? '{\n' + indentation + results.join(',\n' + indentation) + '\n' + prefix + '}' : '{' + results.join(',') + '}' : '{}';
                      }
                      // Remove the object from the traversed object stack.
                      stack.pop();
                      return result;
                    }
                  };

                  // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
                  exports.stringify = function (source, filter, width) {
                    var whitespace, callback, properties, className;
                    if (objectTypes[_typeof(filter)] && filter) {
                      className = getClass.call(filter);
                      if (className == functionClass) {
                        callback = filter;
                      } else if (className == arrayClass) {
                        // Convert the property names array into a makeshift set.
                        properties = {};
                        for (var index = 0, length = filter.length, value; index < length;) {
                          value = filter[index++];
                          className = getClass.call(value);
                          if (className == '[object String]' || className == '[object Number]') {
                            properties[value] = 1;
                          }
                        }
                      }
                    }
                    if (width) {
                      className = getClass.call(width);
                      if (className == numberClass) {
                        // Convert the `width` to an integer and create a string containing
                        // `width` number of space characters.
                        if ((width -= width % 1) > 0) {
                          if (width > 10) {
                            width = 10;
                          }
                          for (whitespace = ''; whitespace.length < width;) {
                            whitespace += ' ';
                          }
                        }
                      } else if (className == stringClass) {
                        whitespace = width.length <= 10 ? width : width.slice(0, 10);
                      }
                    }
                    // Opera <= 7.54u2 discards the values associated with empty string keys
                    // (`""`) only if they are used directly within an object member list
                    // (e.g., `!("" in { "": 1})`).
                    return _serialize('', (value = {}, value[''] = source, value), callback, properties, whitespace, '', []);
                  };
                }
              }

              // Public: Parses a JSON source string.
              if (!has('json-parse')) {
                var fromCharCode = String.fromCharCode;

                // Internal: A map of escaped control characters and their unescaped
                // equivalents.
                var Unescapes = {
                  92: '\\',
                  34: '"',
                  47: '/',
                  98: '\b',
                  116: '\t',
                  110: '\n',
                  102: '\f',
                  114: '\r'
                };

                // Internal: Stores the parser state.
                var Index, Source;

                // Internal: Resets the parser state and throws a `SyntaxError`.
                var abort = function abort() {
                  Index = Source = null;
                  throw SyntaxError();
                };

                // Internal: Returns the next token, or `"$"` if the parser has reached
                // the end of the source string. A token may be a string, number, `null`
                // literal, or Boolean literal.
                var lex = function lex() {
                  var source = Source,
                    length = source.length,
                    value,
                    begin,
                    position,
                    isSigned,
                    charCode;
                  while (Index < length) {
                    charCode = source.charCodeAt(Index);
                    switch (charCode) {
                      case 9:
                      case 10:
                      case 13:
                      case 32:
                        // Skip whitespace tokens, including tabs, carriage returns, line
                        // feeds, and space characters.
                        Index++;
                        break;
                      case 123:
                      case 125:
                      case 91:
                      case 93:
                      case 58:
                      case 44:
                        // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                        // the current position.
                        value = charIndexBuggy ? source.charAt(Index) : source[Index];
                        Index++;
                        return value;
                      case 34:
                        // `"` delimits a JSON string; advance to the next character and
                        // begin parsing the string. String tokens are prefixed with the
                        // sentinel `@` character to distinguish them from punctuators and
                        // end-of-string tokens.
                        for (value = '@', Index++; Index < length;) {
                          charCode = source.charCodeAt(Index);
                          if (charCode < 32) {
                            // Unescaped ASCII control characters (those with a code unit
                            // less than the space character) are not permitted.
                            abort();
                          } else if (charCode == 92) {
                            // A reverse solidus (`\`) marks the beginning of an escaped
                            // control character (including `"`, `\`, and `/`) or Unicode
                            // escape sequence.
                            charCode = source.charCodeAt(++Index);
                            switch (charCode) {
                              case 92:
                              case 34:
                              case 47:
                              case 98:
                              case 116:
                              case 110:
                              case 102:
                              case 114:
                                // Revive escaped control characters.
                                value += Unescapes[charCode];
                                Index++;
                                break;
                              case 117:
                                // `\u` marks the beginning of a Unicode escape sequence.
                                // Advance to the first character and validate the
                                // four-digit code point.
                                begin = ++Index;
                                for (position = Index + 4; Index < position; Index++) {
                                  charCode = source.charCodeAt(Index);
                                  // A valid sequence comprises four hexdigits (case-
                                  // insensitive) that form a single hexadecimal value.
                                  if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                    // Invalid Unicode escape sequence.
                                    abort();
                                  }
                                }
                                // Revive the escaped character.
                                value += fromCharCode('0x' + source.slice(begin, Index));
                                break;
                              default:
                                // Invalid escape sequence.
                                abort();
                            }
                          } else {
                            if (charCode == 34) {
                              // An unescaped double-quote character marks the end of the
                              // string.
                              break;
                            }
                            charCode = source.charCodeAt(Index);
                            begin = Index;
                            // Optimize for the common case where a string is valid.
                            while (charCode >= 32 && charCode != 92 && charCode != 34) {
                              charCode = source.charCodeAt(++Index);
                            }
                            // Append the string as-is.
                            value += source.slice(begin, Index);
                          }
                        }
                        if (source.charCodeAt(Index) == 34) {
                          // Advance to the next character and return the revived string.
                          Index++;
                          return value;
                        }
                        // Unterminated string.
                        abort();
                      default:
                        // Parse numbers and literals.
                        begin = Index;
                        // Advance past the negative sign, if one is specified.
                        if (charCode == 45) {
                          isSigned = true;
                          charCode = source.charCodeAt(++Index);
                        }
                        // Parse an integer or floating-point value.
                        if (charCode >= 48 && charCode <= 57) {
                          // Leading zeroes are interpreted as octal literals.
                          if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                            // Illegal octal literal.
                            abort();
                          }
                          isSigned = false;
                          // Parse the integer component.
                          for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++);
                          // Floats cannot contain a leading decimal point; however, this
                          // case is already accounted for by the parser.
                          if (source.charCodeAt(Index) == 46) {
                            position = ++Index;
                            // Parse the decimal component.
                            for (; position < length; position++) {
                              charCode = source.charCodeAt(position);
                              if (charCode < 48 || charCode > 57) {
                                break;
                              }
                            }
                            if (position == Index) {
                              // Illegal trailing decimal.
                              abort();
                            }
                            Index = position;
                          }
                          // Parse exponents. The `e` denoting the exponent is
                          // case-insensitive.
                          charCode = source.charCodeAt(Index);
                          if (charCode == 101 || charCode == 69) {
                            charCode = source.charCodeAt(++Index);
                            // Skip past the sign following the exponent, if one is
                            // specified.
                            if (charCode == 43 || charCode == 45) {
                              Index++;
                            }
                            // Parse the exponential component.
                            for (position = Index; position < length; position++) {
                              charCode = source.charCodeAt(position);
                              if (charCode < 48 || charCode > 57) {
                                break;
                              }
                            }
                            if (position == Index) {
                              // Illegal empty exponent.
                              abort();
                            }
                            Index = position;
                          }
                          // Coerce the parsed value to a JavaScript number.
                          return +source.slice(begin, Index);
                        }
                        // A negative sign may only precede numbers.
                        if (isSigned) {
                          abort();
                        }
                        // `true`, `false`, and `null` literals.
                        var temp = source.slice(Index, Index + 4);
                        if (temp == 'true') {
                          Index += 4;
                          return true;
                        } else if (temp == 'fals' && source.charCodeAt(Index + 4) == 101) {
                          Index += 5;
                          return false;
                        } else if (temp == 'null') {
                          Index += 4;
                          return null;
                        }
                        // Unrecognized token.
                        abort();
                    }
                  }
                  // Return the sentinel `$` character if the parser has reached the end
                  // of the source string.
                  return '$';
                };

                // Internal: Parses a JSON `value` token.
                var _get = function get(value) {
                  var results, hasMembers;
                  if (value == '$') {
                    // Unexpected end of input.
                    abort();
                  }
                  if (typeof value == 'string') {
                    if ((charIndexBuggy ? value.charAt(0) : value[0]) == '@') {
                      // Remove the sentinel `@` character.
                      return value.slice(1);
                    }
                    // Parse object and array literals.
                    if (value == '[') {
                      // Parses a JSON array, returning a new JavaScript array.
                      results = [];
                      for (;;) {
                        value = lex();
                        // A closing square bracket marks the end of the array literal.
                        if (value == ']') {
                          break;
                        }
                        // If the array literal contains elements, the current token
                        // should be a comma separating the previous element from the
                        // next.
                        if (hasMembers) {
                          if (value == ',') {
                            value = lex();
                            if (value == ']') {
                              // Unexpected trailing `,` in array literal.
                              abort();
                            }
                          } else {
                            // A `,` must separate each array element.
                            abort();
                          }
                        } else {
                          hasMembers = true;
                        }
                        // Elisions and leading commas are not permitted.
                        if (value == ',') {
                          abort();
                        }
                        results.push(_get(value));
                      }
                      return results;
                    } else if (value == '{') {
                      // Parses a JSON object, returning a new JavaScript object.
                      results = {};
                      for (;;) {
                        value = lex();
                        // A closing curly brace marks the end of the object literal.
                        if (value == '}') {
                          break;
                        }
                        // If the object literal contains members, the current token
                        // should be a comma separator.
                        if (hasMembers) {
                          if (value == ',') {
                            value = lex();
                            if (value == '}') {
                              // Unexpected trailing `,` in object literal.
                              abort();
                            }
                          } else {
                            // A `,` must separate each object member.
                            abort();
                          }
                        } else {
                          hasMembers = true;
                        }
                        // Leading commas are not permitted, object property names must be
                        // double-quoted strings, and a `:` must separate each property
                        // name and value.
                        if (value == ',' || typeof value != 'string' || (charIndexBuggy ? value.charAt(0) : value[0]) != '@' || lex() != ':') {
                          abort();
                        }
                        results[value.slice(1)] = _get(lex());
                      }
                      return results;
                    }
                    // Unexpected token encountered.
                    abort();
                  }
                  return value;
                };

                // Internal: Updates a traversed object member.
                var update = function update(source, property, callback) {
                  var element = walk(source, property, callback);
                  if (element === undefined) {
                    delete source[property];
                  } else {
                    source[property] = element;
                  }
                };

                // Internal: Recursively traverses a parsed JSON object, invoking the
                // `callback` function for each value. This is an implementation of the
                // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
                var walk = function walk(source, property, callback) {
                  var value = source[property],
                    length;
                  if (_typeof(value) == 'object' && value) {
                    // `forOwn` can't be used to traverse an array in Opera <= 8.54
                    // because its `Object#hasOwnProperty` implementation returns `false`
                    // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                    if (getClass.call(value) == arrayClass) {
                      for (length = value.length; length--;) {
                        update(getClass, _forOwn, value, length, callback);
                      }
                    } else {
                      _forOwn(value, function (property) {
                        update(value, property, callback);
                      });
                    }
                  }
                  return callback.call(source, property, value);
                };

                // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
                exports.parse = function (source, callback) {
                  var result, value;
                  Index = 0;
                  Source = '' + source;
                  result = _get(lex());
                  // If a JSON string contains multiple tokens, it is invalid.
                  if (lex() != '$') {
                    abort();
                  }
                  // Reset the parser state.
                  Index = Source = null;
                  return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[''] = result, value), '', callback) : result;
                };
              }
            }
            exports.runInContext = runInContext;
            return exports;
          }
          if (freeExports && !isLoader) {
            // Export for CommonJS environments.
            runInContext(root, freeExports);
          } else {
            // Export for web browsers and JavaScript engines.
            var nativeJSON = root.JSON,
              previousJSON = root.JSON3,
              isRestored = false;
            var JSON3 = runInContext(root, root.JSON3 = {
              // Public: Restores the original value of the global `JSON` object and
              // returns a reference to the `JSON3` object.
              noConflict: function noConflict() {
                if (!isRestored) {
                  isRestored = true;
                  root.JSON = nativeJSON;
                  root.JSON3 = previousJSON;
                  nativeJSON = previousJSON = null;
                }
                return JSON3;
              }
            });
            root.JSON = {
              parse: JSON3.parse,
              stringify: JSON3.stringify
            };
          }

          // Export for asynchronous module loaders.
          if (isLoader) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
              return JSON3;
            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          }
        }).call(this);
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/log/loglevel-1.9.2/loglevel.jsfl": (
    /*!************************************************!*\
      !*** ./Third/log/loglevel-1.9.2/loglevel.jsfl ***!
      \************************************************/
    /***/
    function _Third_log_loglevel192_loglevelJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        /*! loglevel - v1.9.2 - https://github.com/pimterry/loglevel - (c) 2024 Tim Perry - licensed MIT */
        (function (root, definition) {
          'use strict';

          if (true) {
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = definition, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {}
        })(this, function () {
          'use strict';

          // Slightly dubious tricks to cut down minimized file size
          var noop = function noop() {};
          var undefinedType = 'undefined';
          var isIE = (typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefinedType && _typeof(window.navigator) !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
          var logMethods = ['trace', 'debug', 'info', 'warn', 'error'];
          var _loggersByName = {};
          var defaultLogger = null;

          // Cross-browser bind equivalent that works at least back to IE6
          function bindMethod(obj, methodName) {
            var method = obj[methodName];
            if (typeof method.bind === 'function') {
              return method.bind(obj);
            } else {
              try {
                return Function.prototype.bind.call(method, obj);
              } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function () {
                  return Function.prototype.apply.apply(method, [obj, arguments]);
                };
              }
            }
          }

          // Trace() doesn't print the message in IE, so for that case we need to wrap it
          function traceForIE() {
            if (console.log) {
              if (console.log.apply) {
                console.log.apply(console, arguments);
              } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
              }
            }
            if (console.trace) console.trace();
          }

          // Build the best logging method possible for this env
          // Wherever possible we want to bind, not wrap, to preserve stack traces
          function realMethod(methodName) {
            if (methodName === 'debug') {
              methodName = 'log';
            }
            if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === undefinedType) {
              return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
            } else if (methodName === 'trace' && isIE) {
              return traceForIE;
            } else if (console[methodName] !== undefined) {
              return bindMethod(console, methodName);
            } else if (console.log !== undefined) {
              return bindMethod(console, 'log');
            } else {
              return noop;
            }
          }

          // These private functions always need `this` to be set properly

          function replaceLoggingMethods() {
            /*jshint validthis:true */
            var level = this.getLevel();

            // Replace the actual methods.
            for (var i = 0; i < logMethods.length; i++) {
              var methodName = logMethods[i];
              this[methodName] = i < level ? noop : this.methodFactory(methodName, level, this.name);
            }

            // Define log.log as an alias for log.debug
            this.log = this.debug;

            // Return any important warnings.
            if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === undefinedType && level < this.levels.SILENT) {
              return 'No console available for logging';
            }
          }

          // In old IE versions, the console isn't present until you first open it.
          // We build realMethod() replacements here that regenerate logging methods
          function enableLoggingWhenConsoleArrives(methodName) {
            return function () {
              if ((typeof console === "undefined" ? "undefined" : _typeof(console)) !== undefinedType) {
                replaceLoggingMethods.call(this);
                this[methodName].apply(this, arguments);
              }
            };
          }

          // By default, we use closely bound real methods wherever possible, and
          // otherwise we wait for a console to appear, and then try again.
          function defaultMethodFactory(methodName, _level, _loggerName) {
            /*jshint validthis:true */
            return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
          }
          function Logger(name, factory) {
            // Private instance variables.
            var self = this;
            /**
             * The level inherited from a parent logger (or a global default). We
             * cache this here rather than delegating to the parent so that it stays
             * in sync with the actual logging methods that we have installed (the
             * parent could change levels but we might not have rebuilt the loggers
             * in this child yet).
             * @type {number}
             */
            var inheritedLevel;
            /**
             * The default level for this logger, if any. If set, this overrides
             * `inheritedLevel`.
             * @type {number|null}
             */
            var defaultLevel;
            /**
             * A user-specific level for this logger. If set, this overrides
             * `defaultLevel`.
             * @type {number|null}
             */
            var userLevel;
            var storageKey = 'loglevel';
            if (typeof name === 'string') {
              storageKey += ':' + name;
            } else if (_typeof(name) === 'symbol') {
              storageKey = undefined;
            }
            function persistLevelIfPossible(levelNum) {
              var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
              if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === undefinedType || !storageKey) return;

              // Use localStorage if available
              try {
                window.localStorage[storageKey] = levelName;
                return;
              } catch (ignore) {}

              // Use session cookie as fallback
              try {
                window.document.cookie = encodeURIComponent(storageKey) + '=' + levelName + ';';
              } catch (ignore) {}
            }
            function getPersistedLevel() {
              var storedLevel;
              if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === undefinedType || !storageKey) return;
              try {
                storedLevel = window.localStorage[storageKey];
              } catch (ignore) {}

              // Fallback to cookies if local storage gives us nothing
              if (_typeof(storedLevel) === undefinedType) {
                try {
                  var cookie = window.document.cookie;
                  var cookieName = encodeURIComponent(storageKey);
                  var location = cookie.indexOf(cookieName + '=');
                  if (location !== -1) {
                    storedLevel = /^([^;]+)/.exec(cookie.slice(location + cookieName.length + 1))[1];
                  }
                } catch (ignore) {}
              }

              // If the stored level is not valid, treat it as if nothing was stored.
              if (self.levels[storedLevel] === undefined) {
                storedLevel = undefined;
              }
              return storedLevel;
            }
            function clearPersistedLevel() {
              if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === undefinedType || !storageKey) return;

              // Use localStorage if available
              try {
                window.localStorage.removeItem(storageKey);
              } catch (ignore) {}

              // Use session cookie as fallback
              try {
                window.document.cookie = encodeURIComponent(storageKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
              } catch (ignore) {}
            }
            function normalizeLevel(input) {
              var level = input;
              if (typeof level === 'string' && self.levels[level.toUpperCase()] !== undefined) {
                level = self.levels[level.toUpperCase()];
              }
              if (typeof level === 'number' && level >= 0 && level <= self.levels.SILENT) {
                return level;
              } else {
                throw new TypeError('log.setLevel() called with invalid level: ' + input);
              }
            }

            /*
             *
             * Public logger API - see https://github.com/pimterry/loglevel for details
             *
             */

            self.name = name;
            self.levels = {
              TRACE: 0,
              DEBUG: 1,
              INFO: 2,
              WARN: 3,
              ERROR: 4,
              SILENT: 5
            };
            self.methodFactory = factory || defaultMethodFactory;
            self.getLevel = function () {
              if (userLevel != null) {
                return userLevel;
              } else if (defaultLevel != null) {
                return defaultLevel;
              } else {
                return inheritedLevel;
              }
            };
            self.setLevel = function (level, persist) {
              userLevel = normalizeLevel(level);
              if (persist !== false) {
                // defaults to true
                persistLevelIfPossible(userLevel);
              }

              // NOTE: in v2, this should call rebuild(), which updates children.
              return replaceLoggingMethods.call(self);
            };
            self.setDefaultLevel = function (level) {
              defaultLevel = normalizeLevel(level);
              if (!getPersistedLevel()) {
                self.setLevel(level, false);
              }
            };
            self.resetLevel = function () {
              userLevel = null;
              clearPersistedLevel();
              replaceLoggingMethods.call(self);
            };
            self.enableAll = function (persist) {
              self.setLevel(self.levels.TRACE, persist);
            };
            self.disableAll = function (persist) {
              self.setLevel(self.levels.SILENT, persist);
            };
            self.rebuild = function () {
              if (defaultLogger !== self) {
                inheritedLevel = normalizeLevel(defaultLogger.getLevel());
              }
              replaceLoggingMethods.call(self);
              if (defaultLogger === self) {
                for (var childName in _loggersByName) {
                  _loggersByName[childName].rebuild();
                }
              }
            };

            // Initialize all the internal levels.
            inheritedLevel = normalizeLevel(defaultLogger ? defaultLogger.getLevel() : 'WARN');
            var initialLevel = getPersistedLevel();
            if (initialLevel != null) {
              userLevel = normalizeLevel(initialLevel);
            }
            replaceLoggingMethods.call(self);
          }

          /*
           *
           * Top-level API
           *
           */

          defaultLogger = new Logger();
          defaultLogger.getLogger = function getLogger(name) {
            if (_typeof(name) !== 'symbol' && typeof name !== 'string' || name === '') {
              throw new TypeError('You must supply a name when creating a logger.');
            }
            var logger = _loggersByName[name];
            if (!logger) {
              logger = _loggersByName[name] = new Logger(name, defaultLogger.methodFactory);
            }
            return logger;
          };

          // Grab the current global log variable in case of overwrite
          var _log = (typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefinedType ? window.log : undefined;
          defaultLogger.noConflict = function () {
            if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefinedType && window.log === defaultLogger) {
              window.log = _log;
            }
            return defaultLogger;
          };
          defaultLogger.getLoggers = function getLoggers() {
            return _loggersByName;
          };

          // ES6 default export, for compatibility
          defaultLogger['default'] = defaultLogger;
          return defaultLogger;
        });
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/es5-shim-4.6.7/es5-sham.jsfl": (
    /*!*****************************************************!*\
      !*** ./Third/polyfill/es5-shim-4.6.7/es5-sham.jsfl ***!
      \*****************************************************/
    /***/
    function _Third_polyfill_es5Shim467_es5ShamJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
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
          if (true) {
            // AMD. Register as an anonymous module.
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {}
        })(this, function () {
          var call = Function.call;
          var prototypeOfObject = Object.prototype;
          var owns = call.bind(prototypeOfObject.hasOwnProperty);
          var isEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
          var toStr = call.bind(prototypeOfObject.toString);

          // If JS engine supports accessors creating shortcuts.
          var defineGetter;
          var defineSetter;
          var lookupGetter;
          var lookupSetter;
          var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
          if (supportsAccessors) {
            /* eslint-disable no-underscore-dangle, no-restricted-properties */
            defineGetter = call.bind(prototypeOfObject.__defineGetter__);
            defineSetter = call.bind(prototypeOfObject.__defineSetter__);
            lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
            lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
            /* eslint-enable no-underscore-dangle, no-restricted-properties */
          }
          var isPrimitive = function isPrimitive(o) {
            return o == null || _typeof(o) !== 'object' && typeof o !== 'function';
          };

          // ES5 15.2.3.2
          // https://es5.github.io/#x15.2.3.2
          if (!Object.getPrototypeOf) {
            // https://github.com/es-shims/es5-shim/issues#issue/2
            // https://johnresig.com/blog/objectgetprototypeof/
            // recommended by fschaefer on github
            //
            // sure, and webreflection says ^_^
            // ... this will nerever possibly return null
            // ... Opera Mini breaks here with infinite loops
            Object.getPrototypeOf = function getPrototypeOf(object) {
              // eslint-disable-next-line no-proto
              var proto = object.__proto__;
              if (proto || proto == null) {
                // `undefined` is for pre-proto browsers
                return proto;
              } else if (toStr(object.constructor) === '[object Function]') {
                return object.constructor.prototype;
              } else if (object instanceof Object) {
                return prototypeOfObject;
              }
              // Correctly return null for Objects created with `Object.create(null)`
              // (shammed or native) or `{ __proto__: null}`.  Also returns null for
              // cross-realm objects on browsers that lack `__proto__` support (like
              // IE <11), but that's the best we can do.
              return null;
            };
          }

          // ES5 15.2.3.3
          // https://es5.github.io/#x15.2.3.3

          // check whether getOwnPropertyDescriptor works if it's given. Otherwise, shim partially.
          if (Object.defineProperty) {
            var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
              try {
                object.sentinel = 0; // eslint-disable-line no-param-reassign
                return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
              } catch (exception) {
                return false;
              }
            };
            var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
            // var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined'
            //     || doesGetOwnPropertyDescriptorWork(document.createElement('div'));
            var getOwnPropertyDescriptorWorksOnDom = false;
            if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
              getOwnPropertyDescriptorWorksOnDom = doesGetOwnPropertyDescriptorWork(document.createElement('div'));
            }
            if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
              var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
            }
          }
          if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
            var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';

            /* eslint-disable no-proto */
            Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
              if (isPrimitive(object)) {
                throw new TypeError(ERR_NON_OBJECT + object);
              }

              // make a valiant attempt to use the real getOwnPropertyDescriptor
              // for I8's DOM elements.
              if (getOwnPropertyDescriptorFallback) {
                try {
                  return getOwnPropertyDescriptorFallback.call(Object, object, property);
                } catch (exception) {
                  // try the shim if the real one doesn't work
                }
              }
              var descriptor;

              // If object does not owns property return undefined immediately.
              if (!owns(object, property)) {
                return descriptor;
              }

              // If object has a property then it's for sure `configurable`, and
              // probably `enumerable`. Detect enumerability though.
              descriptor = {
                enumerable: isEnumerable(object, property),
                configurable: true
              };

              // If JS engine supports accessor properties then property may be a
              // getter or setter.
              if (supportsAccessors) {
                // Unfortunately `__lookupGetter__` will return a getter even
                // if object has own non getter property along with a same named
                // inherited getter. To avoid misbehavior we temporary remove
                // `__proto__` so that `__lookupGetter__` will return getter only
                // if it's owned by an object.
                var prototype = object.__proto__;
                var notPrototypeOfObject = object !== prototypeOfObject;
                // avoid recursion problem, breaking in Opera Mini when
                // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
                // or any other Object.prototype accessor
                if (notPrototypeOfObject) {
                  object.__proto__ = prototypeOfObject; // eslint-disable-line no-param-reassign
                }
                var getter = lookupGetter(object, property);
                var setter = lookupSetter(object, property);
                if (notPrototypeOfObject) {
                  // Once we have getter and setter we can put values back.
                  object.__proto__ = prototype; // eslint-disable-line no-param-reassign
                }
                if (getter || setter) {
                  if (getter) {
                    descriptor.get = getter;
                  }
                  if (setter) {
                    descriptor.set = setter;
                  }
                  // If it was accessor property we're done and return here
                  // in order to avoid adding `value` to the descriptor.
                  return descriptor;
                }
              }

              // If we got this far we know that object has an own property that is
              // not an accessor so we set it as a value and return descriptor.
              descriptor.value = object[property];
              descriptor.writable = true;
              return descriptor;
            };
            /* eslint-enable no-proto */
          }

          // ES5 15.2.3.4
          // https://es5.github.io/#x15.2.3.4
          if (!Object.getOwnPropertyNames) {
            Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
              return Object.keys(object);
            };
          }

          // ES5 15.2.3.5
          // https://es5.github.io/#x15.2.3.5
          if (!Object.create) {
            // Contributed by Brandon Benvie, October, 2012
            var _createEmpty;
            var supportsProto = !({
              __proto__: null
            } instanceof Object);
            // the following produces false positives
            // in Opera Mini => not a reliable check
            // Object.prototype.__proto__ === null

            // Check for document.domain and active x support
            // No need to use active x approach when document.domain is not set
            // see https://github.com/es-shims/es5-shim/issues/150
            // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
            /* global ActiveXObject */
            var shouldUseActiveX = function shouldUseActiveX() {
              // return early if document.domain not set
              if (!document.domain) {
                return false;
              }
              try {
                return !!new ActiveXObject('htmlfile');
              } catch (exception) {
                return false;
              }
            };

            // This supports IE8 when document.domain is used
            // see https://github.com/es-shims/es5-shim/issues/150
            // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
            var getEmptyViaActiveX = function getEmptyViaActiveX() {
              var empty;
              var xDoc;
              xDoc = new ActiveXObject('htmlfile');
              var script = 'script';
              xDoc.write('<' + script + '></' + script + '>');
              xDoc.close();
              empty = xDoc.parentWindow.Object.prototype;
              xDoc = null;
              return empty;
            };

            // The original implementation using an iframe
            // before the activex approach was added
            // see https://github.com/es-shims/es5-shim/issues/150
            var getEmptyViaIFrame = function getEmptyViaIFrame() {
              var iframe = document.createElement('iframe');
              var parent = document.body || document.documentElement;
              var empty;
              iframe.style.display = 'none';
              parent.appendChild(iframe);
              // eslint-disable-next-line no-script-url
              iframe.src = 'javascript:';
              empty = iframe.contentWindow.Object.prototype;
              parent.removeChild(iframe);
              iframe = null;
              return empty;
            };

            /* global document */
            if (supportsProto || typeof document === 'undefined') {
              _createEmpty = function createEmpty() {
                return {
                  __proto__: null
                };
              };
            } else {
              // In old IE __proto__ can't be used to manually set `null`, nor does
              // any other method exist to make an object that inherits from nothing,
              // aside from Object.prototype itself. Instead, create a new global
              // object and *steal* its Object.prototype and strip it bare. This is
              // used as the prototype to create nullary objects.
              _createEmpty = function createEmpty() {
                // Determine which approach to use
                // see https://github.com/es-shims/es5-shim/issues/150
                var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();
                delete empty.constructor;
                delete empty.hasOwnProperty;
                delete empty.propertyIsEnumerable;
                delete empty.isPrototypeOf;
                delete empty.toLocaleString;
                delete empty.toString;
                delete empty.valueOf;
                var Empty = function Empty() {};
                Empty.prototype = empty;
                // short-circuit future calls
                _createEmpty = function createEmpty() {
                  return new Empty();
                };
                return new Empty();
              };
            }
            Object.create = function create(prototype, properties) {
              var object;
              var Type = function Type() {}; // An empty constructor.

              if (prototype === null) {
                object = _createEmpty();
              } else if (isPrimitive(prototype)) {
                // In the native implementation `parent` can be `null`
                // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
                // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
                // like they are in modern browsers. Using `Object.create` on DOM elements
                // is...err...probably inappropriate, but the native version allows for it.
                throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
              } else {
                Type.prototype = prototype;
                object = new Type();
                // IE has no built-in implementation of `Object.getPrototypeOf`
                // neither `__proto__`, but this manually setting `__proto__` will
                // guarantee that `Object.getPrototypeOf` will work as expected with
                // objects created using `Object.create`
                // eslint-disable-next-line no-proto
                object.__proto__ = prototype;
              }
              if (properties !== void 0) {
                Object.defineProperties(object, properties);
              }
              return object;
            };
          }

          // ES5 15.2.3.6
          // https://es5.github.io/#x15.2.3.6

          // Patch for WebKit and IE8 standard mode
          // Designed by hax <hax.github.com>
          // related issue: https://github.com/es-shims/es5-shim/issues#issue/5
          // IE8 Reference:
          //     https://msdn.microsoft.com/en-us/library/dd282900.aspx
          //     https://msdn.microsoft.com/en-us/library/dd229916.aspx
          // WebKit Bugs:
          //     https://bugs.webkit.org/show_bug.cgi?id=36423

          var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
            try {
              Object.defineProperty(object, 'sentinel', {});
              return 'sentinel' in object;
            } catch (exception) {
              return false;
            }
          };

          // check whether defineProperty works if it's given. Otherwise,
          // shim partially.
          if (Object.defineProperty) {
            var definePropertyWorksOnObject = doesDefinePropertyWork({});
            // var definePropertyWorksOnDom = typeof document === 'undefined'
            //     || doesDefinePropertyWork(document.createElement('div'));
            var definePropertyWorksOnDom = false;
            if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
              definePropertyWorksOnDom = doesDefinePropertyWork(document.createElement('div'));
            }
            if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
              var definePropertyFallback = Object.defineProperty,
                definePropertiesFallback = Object.defineProperties;
            }
          }
          if (!Object.defineProperty || definePropertyFallback) {
            var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
            var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
            var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine';
            var ERR_VALUE_NOT_ALLOWED = "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.";
            Object.defineProperty = function defineProperty(object, property, descriptor) {
              // 检查是否同时包含值属性和访问器属性
              // if (('value' in descriptor || 'writable' in descriptor) && ('get' in descriptor || 'set' in descriptor)) {
              //     throw new TypeError(ERR_VALUE_NOT_ALLOWED);
              // }
              if (isPrimitive(object)) {
                throw new TypeError(ERR_NON_OBJECT_TARGET + object);
              }
              if (isPrimitive(descriptor)) {
                throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
              }

              // 如果 get 或 set 为 undefined，则移除它们
              if ('get' in descriptor && typeof descriptor.get !== 'function') {
                delete descriptor.get;
              }
              if ('set' in descriptor && typeof descriptor.set !== 'function') {
                delete descriptor.set;
              }

              // make a valiant attempt to use the real defineProperty
              // for I8's DOM elements.
              if (definePropertyFallback) {
                try {
                  return definePropertyFallback.call(Object, object, property, descriptor);
                } catch (exception) {
                  // try the shim if the real one doesn't work
                }
              }

              // If it's a data property.
              if ('value' in descriptor) {
                // fail silently if 'writable', 'enumerable', or 'configurable'
                // are requested but not supported
                /*
                // alternate approach:
                if ( // can't implement these features; allow false but not true
                    ('writable' in descriptor && !descriptor.writable) ||
                    ('enumerable' in descriptor && !descriptor.enumerable) ||
                    ('configurable' in descriptor && !descriptor.configurable)
                ))
                    throw new RangeError(
                        'This implementation of Object.defineProperty does not support configurable, enumerable, or writable.'
                    );
                */

                if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
                  // As accessors are supported only on engines implementing
                  // `__proto__` we can safely override `__proto__` while defining
                  // a property to make sure that we don't hit an inherited
                  // accessor.
                  /* eslint-disable no-proto, no-param-reassign */
                  var prototype = object.__proto__;
                  object.__proto__ = prototypeOfObject;
                  // Deleting a property anyway since getter / setter may be
                  // defined on object itself.
                  delete object[property];
                  object[property] = descriptor.value;
                  // Setting original `__proto__` back now.
                  object.__proto__ = prototype;
                  /* eslint-enable no-proto, no-param-reassign */
                } else {
                  object[property] = descriptor.value; // eslint-disable-line no-param-reassign
                }
              } else {
                var hasGetter = 'get' in descriptor;
                var hasSetter = 'set' in descriptor;
                if (!supportsAccessors && (hasGetter || hasSetter)) {
                  throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                }
                // If we got that far then getters and setters can be defined !!
                if (hasGetter) {
                  defineGetter(object, property, descriptor.get);
                }
                if (hasSetter) {
                  defineSetter(object, property, descriptor.set);
                }
              }
              return object;
            };
          }

          // ES5 15.2.3.7
          // https://es5.github.io/#x15.2.3.7
          if (!Object.defineProperties || definePropertiesFallback) {
            Object.defineProperties = function defineProperties(object, properties) {
              // make a valiant attempt to use the real defineProperties
              if (definePropertiesFallback) {
                try {
                  return definePropertiesFallback.call(Object, object, properties);
                } catch (exception) {
                  // try the shim if the real one doesn't work
                }
              }
              Object.keys(properties).forEach(function (property) {
                if (property !== '__proto__') {
                  Object.defineProperty(object, property, properties[property]);
                }
              });
              return object;
            };
          }

          // ES5 15.2.3.8
          // https://es5.github.io/#x15.2.3.8
          if (!Object.seal) {
            Object.seal = function seal(object) {
              if (Object(object) !== object) {
                throw new TypeError('Object.seal can only be called on Objects.');
              }
              // this is misleading and breaks feature-detection, but
              // allows "securable" code to "gracefully" degrade to working
              // but insecure code.
              return object;
            };
          }

          // ES5 15.2.3.9
          // https://es5.github.io/#x15.2.3.9
          if (!Object.freeze) {
            Object.freeze = function freeze(object) {
              if (Object(object) !== object) {
                throw new TypeError('Object.freeze can only be called on Objects.');
              }
              // this is misleading and breaks feature-detection, but
              // allows "securable" code to "gracefully" degrade to working
              // but insecure code.
              return object;
            };
          }

          // detect a Rhino bug and patch it
          try {
            Object.freeze(function () {});
          } catch (exception) {
            Object.freeze = function (freezeObject) {
              return function freeze(object) {
                if (typeof object === 'function') {
                  return object;
                }
                return freezeObject(object);
              };
            }(Object.freeze);
          }

          // ES5 15.2.3.10
          // https://es5.github.io/#x15.2.3.10
          if (!Object.preventExtensions) {
            Object.preventExtensions = function preventExtensions(object) {
              if (Object(object) !== object) {
                throw new TypeError('Object.preventExtensions can only be called on Objects.');
              }
              // this is misleading and breaks feature-detection, but
              // allows "securable" code to "gracefully" degrade to working
              // but insecure code.
              return object;
            };
          }

          // ES5 15.2.3.11
          // https://es5.github.io/#x15.2.3.11
          if (!Object.isSealed) {
            Object.isSealed = function isSealed(object) {
              if (Object(object) !== object) {
                throw new TypeError('Object.isSealed can only be called on Objects.');
              }
              return false;
            };
          }

          // ES5 15.2.3.12
          // https://es5.github.io/#x15.2.3.12
          if (!Object.isFrozen) {
            Object.isFrozen = function isFrozen(object) {
              if (Object(object) !== object) {
                throw new TypeError('Object.isFrozen can only be called on Objects.');
              }
              return false;
            };
          }

          // ES5 15.2.3.13
          // https://es5.github.io/#x15.2.3.13
          if (!Object.isExtensible) {
            Object.isExtensible = function isExtensible(object) {
              // 1. If Type(O) is not Object throw a TypeError exception.
              if (Object(object) !== object) {
                throw new TypeError('Object.isExtensible can only be called on Objects.');
              }
              // 2. Return the Boolean value of the [[Extensible]] internal property of O.
              var name = '';
              while (owns(object, name)) {
                name += '?';
              }
              object[name] = true; // eslint-disable-line no-param-reassign
              var returnValue = owns(object, name);
              delete object[name]; // eslint-disable-line no-param-reassign
              return returnValue;
            };
          }
        });
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/es5-shim-4.6.7/es5-shim.jsfl": (
    /*!*****************************************************!*\
      !*** ./Third/polyfill/es5-shim-4.6.7/es5-shim.jsfl ***!
      \*****************************************************/
    /***/
    function _Third_polyfill_es5Shim467_es5ShimJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
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
          if (true) {
            // AMD. Register as an anonymous module.
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {}
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
          var log10 = Math.log10 || function log10(value) {
            return log(value) * LOG10E;
          };

          // Having a toString local variable name breaks in Opera so use to_string.
          var to_string = ObjectPrototype.toString;

          /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
          var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
          var isCallable; /* inlined from https://npmjs.com/is-callable */
          var fnToStr = Function.prototype.toString,
            constructorRegex = /^\s*class /,
            isES6ClassFn = function isES6ClassFn(value) {
              try {
                var fnStr = fnToStr.call(value);
                var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
                var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
                var spaceStripped = multiStripped.replace(/\n/gm, ' ').replace(/ {2}/g, ' ');
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
              if (typeof value !== 'function' && _typeof(value) !== 'object') {
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
            if (_typeof(value) !== 'object') {
              return false;
            }
            return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass;
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
            if (_typeof(value) !== 'object') {
              return false;
            }
            return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass;
          };
          /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

          /* inlined from https://npmjs.com/define-properties */
          var supportsDescriptors = $Object.defineProperty && function () {
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
          }();
          var defineProperties = function (has) {
            // Define configurable, writable, and non-enumerable props
            // if they don't exist.
            var defineProperty;
            if (supportsDescriptors) {
              defineProperty = function defineProperty(object, name, method, forceAssign) {
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
              defineProperty = function defineProperty(object, name, method, forceAssign) {
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
          }(ObjectPrototype.hasOwnProperty);

          // this is needed in Chrome 15 (probably earlier) - 36
          // https://bugs.chromium.org/p/v8/issues/detail?id=3334
          if ($Object.defineProperty && supportsDescriptors) {
            var F = function F() {};
            var toStringSentinel = {};
            var sentinel = {
              toString: toStringSentinel
            };
            $Object.defineProperty(F, 'prototype', {
              value: sentinel,
              writable: false
            });
            if (new F().toString !== toStringSentinel) {
              var $dP = $Object.defineProperty;
              var $gOPD = $Object.getOwnPropertyDescriptor;
              defineProperties($Object, {
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
                      configurable: 'configurable' in d ? d.configurable : desc.configurable,
                      enumerable: 'enumerable' in d ? d.enumerable : desc.enumerable,
                      writable: d.writable
                    });
                  }
                  return $dP(o, key, d);
                }
              }, true);
            }
          }

          //
          // Util
          // ======
          //

          /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
          var isPrimitive = function isPrimitive(input) {
            var type = _typeof(input);
            return input === null || type !== 'object' && type !== 'function';
          };
          var isActualNaN = $Number.isNaN || function isActualNaN(x) {
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
            ToObject: function ToObject(o) {
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
                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
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
              var binder = function binder() {
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

                  var result = apply.call(target, this, array_concat.call(args, array_slice.call(arguments)));
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
                return apply.call(target, that, array_concat.call(args, array_slice.call(arguments)));
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
              bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);
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
          if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document && document.documentElement) {
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

          var isArray = $Array.isArray || function isArray(obj) {
            return toStr(obj) === '[object Array]';
          };

          // ES5 15.4.4.12
          // https://es5.github.io/#x15.4.4.13
          // Return len+argCount.
          // [bugfix, ielt8]
          // IE < 8 bug: [].unshift(0) === undefined but should be "1"
          var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
          defineProperties(ArrayPrototype, {
            unshift: function unshift() {
              array_unshift.apply(this, arguments);
              return this.length;
            }
          }, hasUnshiftReturnValueBug);

          // ES5 15.4.3.2
          // https://es5.github.io/#x15.4.3.2
          // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
          defineProperties($Array, {
            isArray: isArray
          });

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
                  if (_typeof(context) !== 'object') {
                    properlyBoxesNonStrict = false;
                  }
                });
                method.call([1], function () {
                  'use strict';

                  properlyBoxesStrict = typeof this === 'string';
                }, 'x');
              } catch (e) {
                threwException = true;
              }
            }
            return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
          };
          defineProperties(ArrayPrototype, {
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
                throw new TypeError('Array.prototype.forEach callback must be a function');
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
          }, !properlyBoxesContext(ArrayPrototype.forEach));

          // ES5 15.4.4.19
          // https://es5.github.io/#x15.4.4.19
          // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
          defineProperties(ArrayPrototype, {
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
                throw new TypeError('Array.prototype.map callback must be a function');
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
          }, !properlyBoxesContext(ArrayPrototype.map));

          // ES5 15.4.4.20
          // https://es5.github.io/#x15.4.4.20
          // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
          defineProperties(ArrayPrototype, {
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
                throw new TypeError('Array.prototype.filter callback must be a function');
              }
              for (var i = 0; i < length; i++) {
                if (i in self) {
                  value = self[i];
                  if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
                    pushCall(result, value);
                  }
                }
              }
              return result;
            }
          }, !properlyBoxesContext(ArrayPrototype.filter));

          // ES5 15.4.4.16
          // https://es5.github.io/#x15.4.4.16
          // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
          defineProperties(ArrayPrototype, {
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
                throw new TypeError('Array.prototype.every callback must be a function');
              }
              for (var i = 0; i < length; i++) {
                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                  return false;
                }
              }
              return true;
            }
          }, !properlyBoxesContext(ArrayPrototype.every));

          // ES5 15.4.4.17
          // https://es5.github.io/#x15.4.4.17
          // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
          defineProperties(ArrayPrototype, {
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
                throw new TypeError('Array.prototype.some callback must be a function');
              }
              for (var i = 0; i < length; i++) {
                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                  return true;
                }
              }
              return false;
            }
          }, !properlyBoxesContext(ArrayPrototype.some));

          // ES5 15.4.4.21
          // https://es5.github.io/#x15.4.4.21
          // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
          var reduceCoercesToObject = false;
          if (ArrayPrototype.reduce) {
            reduceCoercesToObject = _typeof(ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
              return list;
            })) === 'object';
          }
          defineProperties(ArrayPrototype, {
            reduce: function reduce(callbackfn /*, initialValue*/) {
              var object = ES.ToObject(this);
              var self = splitString && isString(this) ? strSplit(this, '') : object;
              var length = ES.ToUint32(self.length);

              // If no callback function or if callback is not a callable function
              if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduce callback must be a function');
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
                    throw new TypeError('reduce of empty array with no initial value');
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
          }, !reduceCoercesToObject);

          // ES5 15.4.4.22
          // https://es5.github.io/#x15.4.4.22
          // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
          var reduceRightCoercesToObject = false;
          if (ArrayPrototype.reduceRight) {
            reduceRightCoercesToObject = _typeof(ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
              return list;
            })) === 'object';
          }
          defineProperties(ArrayPrototype, {
            reduceRight: function reduceRight(callbackfn /*, initial*/) {
              var object = ES.ToObject(this);
              var self = splitString && isString(this) ? strSplit(this, '') : object;
              var length = ES.ToUint32(self.length);

              // If no callback function or if callback is not a callable function
              if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduceRight callback must be a function');
              }

              // no value to return if no initial value, empty array
              if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduceRight of empty array with no initial value');
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
                    throw new TypeError('reduceRight of empty array with no initial value');
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
          }, !reduceRightCoercesToObject);

          // ES5 15.4.4.14
          // https://es5.github.io/#x15.4.4.14
          // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
          var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
          defineProperties(ArrayPrototype, {
            indexOf: function indexOf(searchElement /*, fromIndex */) {
              var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
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
          }, hasFirefox2IndexOfBug);

          // ES5 15.4.4.15
          // https://es5.github.io/#x15.4.4.15
          // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
          var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
          defineProperties(ArrayPrototype, {
            lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
              var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
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
          }, hasFirefox2LastIndexOfBug);

          // ES5 15.4.4.12
          // https://es5.github.io/#x15.4.4.12
          var spliceNoopReturnsEmptyArray = function () {
            var a = [1, 2];
            var result = a.splice();
            return a.length === 2 && isArray(result) && result.length === 0;
          }();
          defineProperties(ArrayPrototype, {
            // Safari 5.0 bug where .splice() returns undefined
            splice: function splice(start, deleteCount) {
              if (arguments.length === 0) {
                return [];
              }
              return array_splice.apply(this, arguments);
            }
          }, !spliceNoopReturnsEmptyArray);
          var spliceWorksWithEmptyObject = function () {
            var obj = {};
            ArrayPrototype.splice.call(obj, 0, 0, 1);
            return obj.length === 1;
          }();
          var hasES6Defaults = [0, 1, 2].splice(0).length === 3;
          defineProperties(ArrayPrototype, {
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
          }, !spliceWorksWithEmptyObject || !hasES6Defaults);
          var spliceWorksWithLargeSparseArrays = function () {
            // Per https://github.com/es-shims/es5-shim/issues/295
            // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
            var arr = new $Array(1e5);
            // note: the index MUST be 8 or larger or the test will false pass
            arr[8] = 'x';
            arr.splice(1, 1);
            // note: this test must be defined *after* the indexOf shim
            // per https://github.com/es-shims/es5-shim/issues/313
            return arr.indexOf('x') === 7;
          }();
          var spliceWorksWithSmallSparseArrays = function () {
            // Per https://github.com/es-shims/es5-shim/issues/295
            // Opera 12.15 breaks on this, no idea why.
            var n = 256;
            var arr = [];
            arr[n] = 'a';
            arr.splice(n + 1, 0, 'b');
            return arr[n] === 'a';
          }();
          defineProperties(ArrayPrototype, {
            splice: function splice(start, deleteCount) {
              var O = ES.ToObject(this);
              var A = [];
              var len = ES.ToUint32(O.length);
              var relativeStart = ES.ToInteger(start);
              var actualStart = relativeStart < 0 ? max(len + relativeStart, 0) : min(relativeStart, len);
              var actualDeleteCount = arguments.length === 0 ? 0 : arguments.length === 1 ? len - actualStart : min(max(ES.ToInteger(deleteCount), 0), len - actualStart);
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
          }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);
          var originalJoin = ArrayPrototype.join;
          var hasStringJoinBug;
          try {
            hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
          } catch (e) {
            hasStringJoinBug = true;
          }
          if (hasStringJoinBug) {
            defineProperties(ArrayPrototype, {
              join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
              }
            }, hasStringJoinBug);
          }
          var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
          if (hasJoinUndefinedBug) {
            defineProperties(ArrayPrototype, {
              join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(this, sep);
              }
            }, hasJoinUndefinedBug);
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
          var pushIsNotGeneric = function () {
            var obj = {};
            var result = Array.prototype.push.call(obj, undefined);
            return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
          }();
          defineProperties(ArrayPrototype, {
            push: function push(item) {
              if (isArray(this)) {
                return array_push.apply(this, arguments);
              }
              return pushShim.apply(this, arguments);
            }
          }, pushIsNotGeneric);

          // This fixes a very weird bug in Opera 10.6 when pushing `undefined
          var pushUndefinedIsWeird = function () {
            var arr = [];
            var result = arr.push(undefined);
            return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
          }();
          defineProperties(ArrayPrototype, {
            push: pushShim
          }, pushUndefinedIsWeird);

          // ES5 15.2.3.14
          // https://es5.github.io/#x15.4.4.10
          // Fix boxed string bug
          defineProperties(ArrayPrototype, {
            slice: function slice(start, end) {
              var arr = isString(this) ? strSplit(this, '') : this;
              return arraySliceApply(arr, arguments);
            }
          }, splitString);
          var sortIgnoresNonFunctions = function () {
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
          }();
          var sortThrowsOnRegex = function () {
            // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
            try {
              [1, 2].sort(/a/);
              return false;
            } catch (e) {}
            return true;
          }();
          var sortIgnoresUndefined = function () {
            // applies in IE 8, for one.
            try {
              [1, 2].sort(undefined);
              return true;
            } catch (e) {}
            return false;
          }();
          defineProperties(ArrayPrototype, {
            sort: function sort(compareFn) {
              if (typeof compareFn === 'undefined') {
                return arraySort(this);
              }
              if (!isCallable(compareFn)) {
                throw new TypeError('Array.prototype.sort callback must be a function');
              }
              return arraySort(this, compareFn);
            }
          }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

          //
          // Object
          // ======
          //

          // ES5 15.2.3.14
          // https://es5.github.io/#x15.2.3.14

          // https://web.archive.org/web/20140727042234/http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
          // eslint-disable-next-line quote-props
          var hasDontEnumBug = !isEnum({
            toString: null
          }, 'toString'); // jscs:ignore disallowQuotedKeysInObjects
          var hasProtoEnumBug = isEnum(function () {}, 'prototype');
          var hasStringEnumBug = !owns('x', '0');
          var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
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
          var hasAutomationEqualityBug = function () {
            /* globals window */
            if (typeof window === 'undefined') {
              return false;
            }
            for (var k in window) {
              try {
                if (!excludedKeys['$' + k] && owns(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
                  equalsConstructorPrototype(window[k]);
                }
              } catch (e) {
                return true;
              }
            }
            return false;
          }();
          var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(object) {
            if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
              return equalsConstructorPrototype(object);
            }
            try {
              return equalsConstructorPrototype(object);
            } catch (e) {
              return false;
            }
          };
          var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
          var dontEnumsLength = dontEnums.length;

          // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
          // can be replaced with require('is-arguments') if we ever use a build process instead
          var isStandardArguments = function isArguments(value) {
            return toStr(value) === '[object Arguments]';
          };
          var isLegacyArguments = function isArguments(value) {
            return value !== null && _typeof(value) === 'object' && typeof value.length === 'number' && value.length >= 0 && !isArray(value) && isCallable(value.callee);
          };
          var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;
          defineProperties($Object, {
            keys: function keys(object) {
              var isFn = isCallable(object);
              var isArgs = isArguments(object);
              var isObject = object !== null && _typeof(object) === 'object';
              var isStr = isObject && isString(object);
              if (!isObject && !isFn && !isArgs) {
                throw new TypeError('Object.keys called on a non-object');
              }
              var theKeys = [];
              var skipProto = hasProtoEnumBug && isFn;
              if (isStr && hasStringEnumBug || isArgs) {
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
                  if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
                    pushCall(theKeys, dontEnum);
                  }
                }
              }
              return theKeys;
            }
          });
          var keysWorksWithArguments = $Object.keys && function () {
            // Safari 5.0 bug
            return $Object.keys(arguments).length === 2;
          }(1, 2);
          var keysHasArgumentsLengthBug = $Object.keys && function () {
            var argKeys = $Object.keys(arguments);
            return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
          }(1);
          var originalKeys = $Object.keys;
          defineProperties($Object, {
            keys: function keys(object) {
              if (isArguments(object)) {
                return originalKeys(arraySlice(object));
              }
              return originalKeys(object);
            }
          }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

          //
          // Date
          // ====
          //

          var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
          var aNegativeTestDate = new Date(-1509842289600292);
          var aPositiveTestDate = new Date(1449662400000);
          var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
          var hasToDateStringFormatBug;
          var hasToStringFormatBug;
          var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
          if (timeZoneOffset < -720) {
            hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
            hasToStringFormatBug = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(String(aPositiveTestDate));
          } else {
            hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
            hasToStringFormatBug = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(String(aPositiveTestDate));
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
          var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var daysInMonth = function daysInMonth(month, year) {
            return originalGetDate(new Date(year, month, 0));
          };
          defineProperties(Date.prototype, {
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
          }, hasNegativeMonthYearBug);
          defineProperties(Date.prototype, {
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
              return dayName[day] + ', ' + (date < 10 ? '0' + date : date) + ' ' + monthName[month] + ' ' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second) + ' GMT';
            }
          }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

          // Opera 12 has `,`
          defineProperties(Date.prototype, {
            toDateString: function toDateString() {
              if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
              }
              var day = this.getDay();
              var date = this.getDate();
              var month = this.getMonth();
              var year = this.getFullYear();
              return dayName[day] + ' ' + monthName[month] + ' ' + (date < 10 ? '0' + date : date) + ' ' + year;
            }
          }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

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
              return dayName[day] + ' ' + monthName[month] + ' ' + (date < 10 ? '0' + date : date) + ' ' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second) + ' GMT' + (timezoneOffset > 0 ? '-' : '+') + (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) + (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
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
          var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1; // eslint-disable-line max-len
          var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';
          var getTime = call.bind(Date.prototype.getTime);
          defineProperties(Date.prototype, {
            toISOString: function toISOString() {
              if (!isFinite(this) || !isFinite(getTime(this))) {
                // Adope Photoshop requires the second check.
                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
              }
              var year = originalGetUTCFullYear(this);
              var month = originalGetUTCMonth(this);
              // see https://github.com/es-shims/es5-shim/issues/111
              year += floor(month / 12);
              month = (month % 12 + 12) % 12;

              // the date time string format is specified in 15.9.1.15.
              var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
              year = (year < 0 ? '-' : year > 9999 ? '+' : '') + strSlice('00000' + abs(year), 0 <= year && year <= 9999 ? -4 : -6);
              for (var i = 0; i < result.length; ++i) {
                // pad months, days, hours, minutes, and seconds to have two digits.
                result[i] = strSlice('00' + result[i], -2);
              }
              // pad milliseconds to have three digits.
              return year + '-' + arraySlice(result, 0, 2).join('-') + 'T' + arraySlice(result, 2).join(':') + '.' + strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z';
            }
          }, hasNegativeDateBug || hasSafari51DateBug);

          // ES5 15.9.5.44
          // https://es5.github.io/#x15.9.5.44
          // This function provides a String representation of a Date object for use by
          // JSON.stringify (15.12.3).
          var dateToJSONIsSupported = function () {
            try {
              return Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 && Date.prototype.toJSON.call({
                // generic
                toISOString: function toISOString() {
                  return true;
                }
              });
            } catch (e) {
              return false;
            }
          }();
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
          var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
          var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
          if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
            // XXX global assignment won't work in embeddings that use
            // an alternate object for the context.
            var maxSafeUnsigned32Bit = pow(2, 31) - 1;
            var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
            // eslint-disable-next-line no-implicit-globals, no-global-assign
            Date = function (NativeDate) {
              // Date.length === 7
              var DateShim = function Date(Y, M, D, h, m, s, ms) {
                var length = arguments.length;
                var date;
                if (this instanceof NativeDate) {
                  var seconds = s;
                  var millis = ms;
                  if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
                    // work around a Safari 8/9 bug where it treats the seconds as signed
                    var msToShift = floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                    var sToShift = floor(msToShift / 1e3);
                    seconds += sToShift;
                    millis -= sToShift * 1e3;
                  }
                  var parsed = DateShim.parse(Y);
                  var hasNegTimestampParseBug = isNaN(parsed);
                  date = length === 1 && $String(Y) === Y && !hasNegTimestampParseBug // isString(Y)
                  ?
                  // We explicitly pass it through parse:
                  new NativeDate(parsed) :
                  // We have to manually make calls depending on argument
                  // length here
                  length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) : length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) : new NativeDate();
                } else {
                  date = NativeDate.apply(this, arguments);
                }
                if (!isPrimitive(date)) {
                  // Prevent mixups with unfixed Date object
                  defineProperties(date, {
                    constructor: DateShim
                  }, true);
                }
                return date;
              };

              // 15.9.1.15 Date Time String Format.
              var isoDateExpression = new RegExp('^' + '(\\d{4}|[+-]\\d{6})' +
              // four-digit year capture or sign + 6-digit extended year
              '(?:-(\\d{2})' +
              // optional month capture
              '(?:-(\\d{2})' +
              // optional day capture
              '(?:' +
              // capture hours:minutes:seconds.milliseconds
              'T(\\d{2})' +
              // hours capture
              ':(\\d{2})' +
              // minutes capture
              '(?:' +
              // optional :seconds.milliseconds
              ':(\\d{2})' +
              // seconds capture
              '(?:(\\.\\d{1,}))?' +
              // milliseconds capture
              ')?' + '(' +
              // capture UTC offset component
              'Z|' +
              // UTC capture
              '(?:' +
              // offset specifier +/-hours:minutes
              '([-+])' +
              // sign capture
              '(\\d{2})' +
              // hours offset capture
              ':(\\d{2})' +
              // minutes offset capture
              ')' + ')?)?)?)?' + '$');
              var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
              var dayFromMonth = function dayFromMonth(year, month) {
                var t = month > 1 ? 1 : 0;
                return months[month] + floor((year - 1969 + t) / 4) - floor((year - 1901 + t) / 100) + floor((year - 1601 + t) / 400) + 365 * (year - 1970);
              };
              var toUTC = function toUTC(t) {
                var s = 0;
                var ms = t;
                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
                  // work around a Safari 8/9 bug where it treats the seconds as signed
                  var msToShift = floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
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
              defineProperties(DateShim, {
                now: NativeDate.now,
                UTC: NativeDate.UTC
              }, true);
              DateShim.prototype = NativeDate.prototype;
              defineProperties(DateShim.prototype, {
                constructor: DateShim
              }, true);

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
                  var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
                  if (hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) && minute < 60 && second < 60 && millisecond < 1000 && month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 &&
                  // detect invalid offsets
                  day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)) {
                    result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
                    result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1000 + millisecond;
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
              defineProperties(DateShim, {
                parse: parseShim
              });
              return DateShim;
            }(Date);
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
          var hasToFixedBugs = NumberPrototype.toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128 .toFixed(0) !== '1000000000000000128');
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
                c = c % n * toFixedHelpers.base;
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
              return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
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
              z = e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1);
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
                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
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
          defineProperties(NumberPrototype, {
            toFixed: toFixedShim
          }, hasToFixedBugs);
          var hasToExponentialRoundingBug = function () {
            try {
              return (-6.9e-11).toExponential(4) !== '-6.9000e-11';
            } catch (e) {
              return false;
            }
          }();
          var toExponentialAllowsInfiniteDigits = function () {
            try {
              1 .toExponential(Infinity);
              1 .toExponential(-Infinity);
              return true;
            } catch (e) {
              return false;
            }
          }();
          var originalToExponential = call.bind(NumberPrototype.toExponential);
          var numberToString = call.bind(NumberPrototype.toString);
          var numberValueOf = call.bind(NumberPrototype.valueOf);
          defineProperties(NumberPrototype, {
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
                  throw new RangeError('toExponential() argument must be between 0 and 20');
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
                throw new RangeError('Fraction digits ' + fractionDigits + ' out of range');
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
                    if (abs(guess_n * pow(10, e - f) - x) <= abs(n * pow(10, e - target_f) - x)) {
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
          }, hasToExponentialRoundingBug || toExponentialAllowsInfiniteDigits);
          var hasToPrecisionUndefinedBug = function () {
            try {
              return 1.0.toPrecision(undefined) === '1';
            } catch (e) {
              return true;
            }
          }();
          var originalToPrecision = call.bind(NumberPrototype.toPrecision);
          defineProperties(NumberPrototype, {
            toPrecision: function toPrecision(precision) {
              return typeof precision === 'undefined' ? originalToPrecision(this) : originalToPrecision(this, precision);
            }
          }, hasToPrecisionUndefinedBug);

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

          if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {
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
                var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (
                  // in ES6
                  separator.sticky ? 'y' : ''),
                  // Firefox 3+ and ES6
                  lastLastIndex = 0,
                  // Make `global` and avoid `lastIndex` issues by working with a copy
                  separator2,
                  match,
                  lastIndex,
                  lastLength;
                var separatorCopy = new RegExp(separator.source, flags + 'g');
                if (!compliantExecNpcg) {
                  // Doesn't need flags gy, but they don't hurt
                  separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // maxSafe32BitInt
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - floor(abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
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
                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
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
          var replaceReportsGroupsCorrectly = function () {
            var groups = [];
            'x'.replace(/x(.)?/g, function (match, group) {
              pushCall(groups, group);
            });
            return groups.length === 1 && typeof groups[0] === 'undefined';
          }();
          if (!replaceReportsGroupsCorrectly) {
            StringPrototype.replace = function replace(searchValue, replaceValue) {
              var isFn = isCallable(replaceValue);
              var hasCapturingGroups = isRegex(searchValue) && /\)[*?]/.test(searchValue.source);
              if (!isFn || !hasCapturingGroups) {
                return str_replace.call(this, searchValue, replaceValue);
              }
              var wrappedReplaceValue = function wrappedReplaceValue(match) {
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
          defineProperties(StringPrototype, {
            substr: function substr(start, length) {
              var normalizedStart = start;
              if (start < 0) {
                normalizedStart = max(this.length + start, 0);
              }
              return string_substr(this, normalizedStart, length);
            }
          }, hasNegativeSubstrBug);

          // ES5 15.5.4.20
          // whitespace from: https://es5.github.io/#x15.5.4.20
          var mvs = "\u180E";
          var mvsIsWS = /\s/.test(mvs);
          var ws = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF".replace(/\S/g, ''); // remove the mongolian vowel separator (\u180E) in modern engines
          var zeroWidth = "\u200B";
          var wsRegexChars = '[' + ws + ']';
          var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
          var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
          var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() !== '' ||
          // if ws is not considered whitespace
          zeroWidth.trim() === '' ||
          // if zero-width IS considered whitespace
          mvs.trim() !== (mvsIsWS ? '' : mvs)); // if MVS is either wrongly considered whitespace, or, wrongly considered NOT whitespace
          defineProperties(StringPrototype, {
            // https://blog.stevenlevithan.com/archives/faster-trim-javascript
            // http://perfectionkills.com/whitespace-deviations/
            trim: function trim() {
              'use strict';

              if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
              }
              return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
            }
          }, hasTrimWhitespaceBug);
          var trim = call.bind(String.prototype.trim);
          var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
          defineProperties(StringPrototype, {
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
          }, hasLastIndexBug);
          var originalLastIndexOf = StringPrototype.lastIndexOf;
          defineProperties(StringPrototype, {
            lastIndexOf: function lastIndexOf(searchString) {
              return originalLastIndexOf.apply(this, arguments);
            }
          }, StringPrototype.lastIndexOf.length !== 1);
          var hexRegex = /^[-+]?0[xX]/;

          // ES-5 15.1.2.2
          if (parseInt(ws + '08') !== 8 ||
          // eslint-disable-line radix
          parseInt(ws + '0x16') !== 22 || (
          // eslint-disable-line radix
          mvsIsWS ? parseInt(mvs + 1) !== 1 : !isNaN(parseInt(mvs + 1))) // eslint-disable-line radix
          ) {
            // eslint-disable-next-line no-global-assign, no-implicit-globals
            parseInt = function (origParseInt) {
              return function parseInt(str, radix) {
                if (this instanceof parseInt) {
                  new origParseInt();
                } // eslint-disable-line new-cap, no-new, max-statements-per-line
                var string = trim(String(str));
                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
                return origParseInt(string, defaultedRadix);
              };
            }(parseInt);
          }
          // Edge 15-18
          var parseIntFailsToThrowOnBoxedSymbols = function () {
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
          }();
          if (parseIntFailsToThrowOnBoxedSymbols) {
            var symbolValueOf = Symbol.prototype.valueOf;
            // eslint-disable-next-line no-global-assign, no-implicit-globals
            parseInt = function (origParseInt) {
              return function parseInt(str, radix) {
                if (this instanceof parseInt) {
                  new origParseInt();
                } // eslint-disable-line new-cap, no-new, max-statements-per-line
                var isSym = _typeof(str) === 'symbol';
                if (!isSym && str && _typeof(str) === 'object') {
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
            }(parseInt);
          }

          // https://es5.github.io/#x15.1.2.3
          if (1 / parseFloat('-0') !== -Infinity) {
            // eslint-disable-next-line no-global-assign, no-implicit-globals, no-native-reassign
            parseFloat = function (origParseFloat) {
              return function parseFloat(string) {
                var inputString = trim(String(string));
                var result = origParseFloat(inputString);
                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
              };
            }(parseFloat);
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
            var ensureNonEnumerable = function ensureNonEnumerable(obj, prop) {
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
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl": (
    /*!****************************************************************!*\
      !*** ./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl ***!
      \****************************************************************/
    /***/
    function _Third_polyfill_es6Promise468_es6PromiseAutoJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
         * @version   v4.2.8+1e68dce6
         */

        (function (global, factory) {
          (false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() : true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
        })(this, function () {
          'use strict';

          function objectOrFunction(x) {
            var type = _typeof(x);
            return x !== null && (type === 'object' || type === 'function');
          }
          function isFunction(x) {
            return typeof x === 'function';
          }
          var _isArray = void 0;
          if (Array.isArray) {
            _isArray = Array.isArray;
          } else {
            _isArray = function _isArray(x) {
              return Object.prototype.toString.call(x) === '[object Array]';
            };
          }
          var isArray = _isArray;
          var len = 0;
          var vertxNext = void 0;
          var customSchedulerFn = void 0;
          var asap = function asap(callback, arg) {
            queue[len] = callback;
            queue[len + 1] = arg;
            len += 2;
            if (len === 2) {
              // If len is 2, that means that we need to schedule an async flush.
              // If additional callbacks are queued before the queue is flushed, they
              // will be processed by this flush that we are scheduling.
              if (customSchedulerFn) {
                customSchedulerFn(flush);
              } else {
                scheduleFlush();
              }
            }
          };
          function setScheduler(scheduleFn) {
            customSchedulerFn = scheduleFn;
          }
          function setAsap(asapFn) {
            asap = asapFn;
          }
          var browserWindow = typeof window !== 'undefined' ? window : undefined;
          var browserGlobal = browserWindow || {};
          var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
          var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

          // test for web worker but not in IE10
          var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

          // node
          function useNextTick() {
            // node version 0.10.x displays a deprecation warning when nextTick is used recursively
            // see https://github.com/cujojs/when/issues/410 for details
            return function () {
              return process.nextTick(flush);
            };
          }

          // vertx
          function useVertxTimer() {
            if (typeof vertxNext !== 'undefined') {
              return function () {
                vertxNext(flush);
              };
            }
            return useSetTimeout();
          }
          function useMutationObserver() {
            var iterations = 0;
            var observer = new BrowserMutationObserver(flush);
            var node = document.createTextNode('');
            observer.observe(node, {
              characterData: true
            });
            return function () {
              node.data = iterations = ++iterations % 2;
            };
          }

          // web worker
          function useMessageChannel() {
            var channel = new MessageChannel();
            channel.port1.onmessage = flush;
            return function () {
              return channel.port2.postMessage(0);
            };
          }
          function useSetTimeout() {
            // Store setTimeout reference so es6-promise will be unaffected by
            // other code modifying setTimeout (like sinon.useFakeTimers())
            var globalSetTimeout = setTimeout;
            return function () {
              return globalSetTimeout(flush, 1);
            };
          }
          var queue = new Array(1000);
          function flush() {
            for (var i = 0; i < len; i += 2) {
              var callback = queue[i];
              var arg = queue[i + 1];
              callback(arg);
              queue[i] = undefined;
              queue[i + 1] = undefined;
            }
            len = 0;
          }
          function attemptVertx() {
            try {
              var vertx = Function('return this')().require('vertx');
              vertxNext = vertx.runOnLoop || vertx.runOnContext;
              return useVertxTimer();
            } catch (e) {
              return useSetTimeout();
            }
          }
          var scheduleFlush = void 0;
          // Decide what async method to use to triggering processing of queued callbacks:
          if (isNode) {
            scheduleFlush = useNextTick();
          } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
          } else if (isWorker) {
            scheduleFlush = useMessageChannel();
          } else if (browserWindow === undefined && "function" === 'function') {
            scheduleFlush = attemptVertx();
          } else {
            scheduleFlush = useSetTimeout();
          }
          function then(onFulfillment, onRejection) {
            var parent = this;
            var child = new this.constructor(noop);
            if (child[PROMISE_ID] === undefined) {
              makePromise(child);
            }
            var _state = parent._state;
            if (_state) {
              var callback = arguments[_state - 1];
              asap(function () {
                return invokeCallback(_state, child, callback, parent._result);
              });
            } else {
              subscribe(parent, child, onFulfillment, onRejection);
            }
            return child;
          }

          /**
            `Promise.resolve` returns a promise that will become resolved with the
            passed `value`. It is shorthand for the following:
          
            ```javascript
            let promise = new Promise(function(resolve, reject){
              resolve(1);
            });
          
            promise.then(function(value){
              // value === 1
            });
            ```
          
            Instead of writing the above, your code now simply becomes the following:
          
            ```javascript
            let promise = Promise.resolve(1);
          
            promise.then(function(value){
              // value === 1
            });
            ```
          
            @method resolve
            @static
            @param {Any} value value that the returned promise will be resolved with
            Useful for tooling.
            @return {Promise} a promise that will become fulfilled with the given
            `value`
          */
          function resolve$1(object) {
            /*jshint validthis:true */
            var Constructor = this;
            if (object && _typeof(object) === 'object' && object.constructor === Constructor) {
              return object;
            }
            var promise = new Constructor(noop);
            resolve(promise, object);
            return promise;
          }
          var PROMISE_ID = Math.random().toString(36).substring(2);
          function noop() {}
          var PENDING = void 0;
          var FULFILLED = 1;
          var REJECTED = 2;
          function selfFulfillment() {
            return new TypeError("You cannot resolve a promise with itself");
          }
          function cannotReturnOwn() {
            return new TypeError('A promises callback cannot return that same promise.');
          }
          function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
            try {
              then$$1.call(value, fulfillmentHandler, rejectionHandler);
            } catch (e) {
              return e;
            }
          }
          function handleForeignThenable(promise, thenable, then$$1) {
            asap(function (promise) {
              var sealed = false;
              var error = tryThen(then$$1, thenable, function (value) {
                if (sealed) {
                  return;
                }
                sealed = true;
                if (thenable !== value) {
                  resolve(promise, value);
                } else {
                  fulfill(promise, value);
                }
              }, function (reason) {
                if (sealed) {
                  return;
                }
                sealed = true;
                reject(promise, reason);
              }, 'Settle: ' + (promise._label || ' unknown promise'));
              if (!sealed && error) {
                sealed = true;
                reject(promise, error);
              }
            }, promise);
          }
          function handleOwnThenable(promise, thenable) {
            if (thenable._state === FULFILLED) {
              fulfill(promise, thenable._result);
            } else if (thenable._state === REJECTED) {
              reject(promise, thenable._result);
            } else {
              subscribe(thenable, undefined, function (value) {
                return resolve(promise, value);
              }, function (reason) {
                return reject(promise, reason);
              });
            }
          }
          function handleMaybeThenable(promise, maybeThenable, then$$1) {
            if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
              handleOwnThenable(promise, maybeThenable);
            } else {
              if (then$$1 === undefined) {
                fulfill(promise, maybeThenable);
              } else if (isFunction(then$$1)) {
                handleForeignThenable(promise, maybeThenable, then$$1);
              } else {
                fulfill(promise, maybeThenable);
              }
            }
          }
          function resolve(promise, value) {
            if (promise === value) {
              reject(promise, selfFulfillment());
            } else if (objectOrFunction(value)) {
              var then$$1 = void 0;
              try {
                then$$1 = value.then;
              } catch (error) {
                reject(promise, error);
                return;
              }
              handleMaybeThenable(promise, value, then$$1);
            } else {
              fulfill(promise, value);
            }
          }
          function publishRejection(promise) {
            if (promise._onerror) {
              promise._onerror(promise._result);
            }
            publish(promise);
          }
          function fulfill(promise, value) {
            if (promise._state !== PENDING) {
              return;
            }
            promise._result = value;
            promise._state = FULFILLED;
            if (promise._subscribers.length !== 0) {
              asap(publish, promise);
            }
          }
          function reject(promise, reason) {
            if (promise._state !== PENDING) {
              return;
            }
            promise._state = REJECTED;
            promise._result = reason;
            asap(publishRejection, promise);
          }
          function subscribe(parent, child, onFulfillment, onRejection) {
            var _subscribers = parent._subscribers;
            var length = _subscribers.length;
            parent._onerror = null;
            _subscribers[length] = child;
            _subscribers[length + FULFILLED] = onFulfillment;
            _subscribers[length + REJECTED] = onRejection;
            if (length === 0 && parent._state) {
              asap(publish, parent);
            }
          }
          function publish(promise) {
            var subscribers = promise._subscribers;
            var settled = promise._state;
            if (subscribers.length === 0) {
              return;
            }
            var child = void 0,
              callback = void 0,
              detail = promise._result;
            for (var i = 0; i < subscribers.length; i += 3) {
              child = subscribers[i];
              callback = subscribers[i + settled];
              if (child) {
                invokeCallback(settled, child, callback, detail);
              } else {
                callback(detail);
              }
            }
            promise._subscribers.length = 0;
          }
          function invokeCallback(settled, promise, callback, detail) {
            var hasCallback = isFunction(callback),
              value = void 0,
              error = void 0,
              succeeded = true;
            if (hasCallback) {
              try {
                value = callback(detail);
              } catch (e) {
                succeeded = false;
                error = e;
              }
              if (promise === value) {
                reject(promise, cannotReturnOwn());
                return;
              }
            } else {
              value = detail;
            }
            if (promise._state !== PENDING) {
              // noop
            } else if (hasCallback && succeeded) {
              resolve(promise, value);
            } else if (succeeded === false) {
              reject(promise, error);
            } else if (settled === FULFILLED) {
              fulfill(promise, value);
            } else if (settled === REJECTED) {
              reject(promise, value);
            }
          }
          function initializePromise(promise, resolver) {
            try {
              resolver(function resolvePromise(value) {
                resolve(promise, value);
              }, function rejectPromise(reason) {
                reject(promise, reason);
              });
            } catch (e) {
              reject(promise, e);
            }
          }
          var id = 0;
          function nextId() {
            return id++;
          }
          function makePromise(promise) {
            promise[PROMISE_ID] = id++;
            promise._state = undefined;
            promise._result = undefined;
            promise._subscribers = [];
          }
          function validationError() {
            return new Error('Array Methods must be provided an Array');
          }
          var Enumerator = function () {
            function Enumerator(Constructor, input) {
              this._instanceConstructor = Constructor;
              this.promise = new Constructor(noop);
              if (!this.promise[PROMISE_ID]) {
                makePromise(this.promise);
              }
              if (isArray(input)) {
                this.length = input.length;
                this._remaining = input.length;
                this._result = new Array(this.length);
                if (this.length === 0) {
                  fulfill(this.promise, this._result);
                } else {
                  this.length = this.length || 0;
                  this._enumerate(input);
                  if (this._remaining === 0) {
                    fulfill(this.promise, this._result);
                  }
                }
              } else {
                reject(this.promise, validationError());
              }
            }
            Enumerator.prototype._enumerate = function _enumerate(input) {
              for (var i = 0; this._state === PENDING && i < input.length; i++) {
                this._eachEntry(input[i], i);
              }
            };
            Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
              var c = this._instanceConstructor;
              var resolve$$1 = c.resolve;
              if (resolve$$1 === resolve$1) {
                var _then = void 0;
                var error = void 0;
                var didError = false;
                try {
                  _then = entry.then;
                } catch (e) {
                  didError = true;
                  error = e;
                }
                if (_then === then && entry._state !== PENDING) {
                  this._settledAt(entry._state, i, entry._result);
                } else if (typeof _then !== 'function') {
                  this._remaining--;
                  this._result[i] = entry;
                } else if (c === Promise$2) {
                  var promise = new c(noop);
                  if (didError) {
                    reject(promise, error);
                  } else {
                    handleMaybeThenable(promise, entry, _then);
                  }
                  this._willSettleAt(promise, i);
                } else {
                  this._willSettleAt(new c(function (resolve$$1) {
                    return resolve$$1(entry);
                  }), i);
                }
              } else {
                this._willSettleAt(resolve$$1(entry), i);
              }
            };
            Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
              var promise = this.promise;
              if (promise._state === PENDING) {
                this._remaining--;
                if (state === REJECTED) {
                  reject(promise, value);
                } else {
                  this._result[i] = value;
                }
              }
              if (this._remaining === 0) {
                fulfill(promise, this._result);
              }
            };
            Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
              var enumerator = this;
              subscribe(promise, undefined, function (value) {
                return enumerator._settledAt(FULFILLED, i, value);
              }, function (reason) {
                return enumerator._settledAt(REJECTED, i, reason);
              });
            };
            return Enumerator;
          }();

          /**
            `Promise.all` accepts an array of promises, and returns a new promise which
            is fulfilled with an array of fulfillment values for the passed promises, or
            rejected with the reason of the first passed promise to be rejected. It casts all
            elements of the passed iterable to promises as it runs this algorithm.
          
            Example:
          
            ```javascript
            let promise1 = resolve(1);
            let promise2 = resolve(2);
            let promise3 = resolve(3);
            let promises = [ promise1, promise2, promise3 ];
          
            Promise.all(promises).then(function(array){
              // The array here would be [ 1, 2, 3 ];
            });
            ```
          
            If any of the `promises` given to `all` are rejected, the first promise
            that is rejected will be given as an argument to the returned promises's
            rejection handler. For example:
          
            Example:
          
            ```javascript
            let promise1 = resolve(1);
            let promise2 = reject(new Error("2"));
            let promise3 = reject(new Error("3"));
            let promises = [ promise1, promise2, promise3 ];
          
            Promise.all(promises).then(function(array){
              // Code here never runs because there are rejected promises!
            }, function(error) {
              // error.message === "2"
            });
            ```
          
            @method all
            @static
            @param {Array} entries array of promises
            @param {String} label optional string for labeling the promise.
            Useful for tooling.
            @return {Promise} promise that is fulfilled when all `promises` have been
            fulfilled, or rejected if any of them become rejected.
            @static
          */
          function all(entries) {
            return new Enumerator(this, entries).promise;
          }

          /**
            `Promise.race` returns a new promise which is settled in the same way as the
            first passed promise to settle.
          
            Example:
          
            ```javascript
            let promise1 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 1');
              }, 200);
            });
          
            let promise2 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 2');
              }, 100);
            });
          
            Promise.race([promise1, promise2]).then(function(result){
              // result === 'promise 2' because it was resolved before promise1
              // was resolved.
            });
            ```
          
            `Promise.race` is deterministic in that only the state of the first
            settled promise matters. For example, even if other promises given to the
            `promises` array argument are resolved, but the first settled promise has
            become rejected before the other promises became fulfilled, the returned
            promise will become rejected:
          
            ```javascript
            let promise1 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 1');
              }, 200);
            });
          
            let promise2 = new Promise(function(resolve, reject){
              setTimeout(function(){
                reject(new Error('promise 2'));
              }, 100);
            });
          
            Promise.race([promise1, promise2]).then(function(result){
              // Code here never runs
            }, function(reason){
              // reason.message === 'promise 2' because promise 2 became rejected before
              // promise 1 became fulfilled
            });
            ```
          
            An example real-world use case is implementing timeouts:
          
            ```javascript
            Promise.race([ajax('foo.json'), timeout(5000)])
            ```
          
            @method race
            @static
            @param {Array} promises array of promises to observe
            Useful for tooling.
            @return {Promise} a promise which settles in the same way as the first passed
            promise to settle.
          */
          function race(entries) {
            /*jshint validthis:true */
            var Constructor = this;
            if (!isArray(entries)) {
              return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
              });
            } else {
              return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                  Constructor.resolve(entries[i]).then(resolve, reject);
                }
              });
            }
          }

          /**
            `Promise.reject` returns a promise rejected with the passed `reason`.
            It is shorthand for the following:
          
            ```javascript
            let promise = new Promise(function(resolve, reject){
              reject(new Error('WHOOPS'));
            });
          
            promise.then(function(value){
              // Code here doesn't run because the promise is rejected!
            }, function(reason){
              // reason.message === 'WHOOPS'
            });
            ```
          
            Instead of writing the above, your code now simply becomes the following:
          
            ```javascript
            let promise = Promise.reject(new Error('WHOOPS'));
          
            promise.then(function(value){
              // Code here doesn't run because the promise is rejected!
            }, function(reason){
              // reason.message === 'WHOOPS'
            });
            ```
          
            @method reject
            @static
            @param {Any} reason value that the returned promise will be rejected with.
            Useful for tooling.
            @return {Promise} a promise rejected with the given `reason`.
          */
          function reject$1(reason) {
            /*jshint validthis:true */
            var Constructor = this;
            var promise = new Constructor(noop);
            reject(promise, reason);
            return promise;
          }
          function needsResolver() {
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
          }
          function needsNew() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          }

          /**
            Promise objects represent the eventual result of an asynchronous operation. The
            primary way of interacting with a promise is through its `then` method, which
            registers callbacks to receive either a promise's eventual value or the reason
            why the promise cannot be fulfilled.
          
            Terminology
            -----------
          
            - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
            - `thenable` is an object or function that defines a `then` method.
            - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
            - `exception` is a value that is thrown using the throw statement.
            - `reason` is a value that indicates why a promise was rejected.
            - `settled` the final resting state of a promise, fulfilled or rejected.
          
            A promise can be in one of three states: pending, fulfilled, or rejected.
          
            Promises that are fulfilled have a fulfillment value and are in the fulfilled
            state.  Promises that are rejected have a rejection reason and are in the
            rejected state.  A fulfillment value is never a thenable.
          
            Promises can also be said to *resolve* a value.  If this value is also a
            promise, then the original promise's settled state will match the value's
            settled state.  So a promise that *resolves* a promise that rejects will
            itself reject, and a promise that *resolves* a promise that fulfills will
            itself fulfill.
          
          
            Basic Usage:
            ------------
          
            ```js
            let promise = new Promise(function(resolve, reject) {
              // on success
              resolve(value);
          
              // on failure
              reject(reason);
            });
          
            promise.then(function(value) {
              // on fulfillment
            }, function(reason) {
              // on rejection
            });
            ```
          
            Advanced Usage:
            ---------------
          
            Promises shine when abstracting away asynchronous interactions such as
            `XMLHttpRequest`s.
          
            ```js
            function getJSON(url) {
              return new Promise(function(resolve, reject){
                let xhr = new XMLHttpRequest();
          
                xhr.open('GET', url);
                xhr.onreadystatechange = handler;
                xhr.responseType = 'json';
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send();
          
                function handler() {
                  if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                      resolve(this.response);
                    } else {
                      reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
                    }
                  }
                };
              });
            }
          
            getJSON('/posts.json').then(function(json) {
              // on fulfillment
            }, function(reason) {
              // on rejection
            });
            ```
          
            Unlike callbacks, promises are great composable primitives.
          
            ```js
            Promise.all([
              getJSON('/posts'),
              getJSON('/comments')
            ]).then(function(values){
              values[0] // => postsJSON
              values[1] // => commentsJSON
          
              return values;
            });
            ```
          
            @class Promise
            @param {Function} resolver
            Useful for tooling.
            @constructor
          */

          var Promise$2 = function () {
            function Promise(resolver) {
              this[PROMISE_ID] = nextId();
              this._result = this._state = undefined;
              this._subscribers = [];
              if (noop !== resolver) {
                typeof resolver !== 'function' && needsResolver();
                this instanceof Promise ? initializePromise(this, resolver) : needsNew();
              }
            }

            /**
            The primary way of interacting with a promise is through its `then` method,
            which registers callbacks to receive either a promise's eventual value or the
            reason why the promise cannot be fulfilled.
             ```js
            findUser().then(function(user){
              // user is available
            }, function(reason){
              // user is unavailable, and you are given the reason why
            });
            ```
             Chaining
            --------
             The return value of `then` is itself a promise.  This second, 'downstream'
            promise is resolved with the return value of the first promise's fulfillment
            or rejection handler, or rejected if the handler throws an exception.
             ```js
            findUser().then(function (user) {
              return user.name;
            }, function (reason) {
              return 'default name';
            }).then(function (userName) {
              // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
              // will be `'default name'`
            });
             findUser().then(function (user) {
              throw new Error('Found user, but still unhappy');
            }, function (reason) {
              throw new Error('`findUser` rejected and we're unhappy');
            }).then(function (value) {
              // never reached
            }, function (reason) {
              // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
              // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
            });
            ```
            If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
             ```js
            findUser().then(function (user) {
              throw new PedagogicalException('Upstream error');
            }).then(function (value) {
              // never reached
            }).then(function (value) {
              // never reached
            }, function (reason) {
              // The `PedgagocialException` is propagated all the way down to here
            });
            ```
             Assimilation
            ------------
             Sometimes the value you want to propagate to a downstream promise can only be
            retrieved asynchronously. This can be achieved by returning a promise in the
            fulfillment or rejection handler. The downstream promise will then be pending
            until the returned promise is settled. This is called *assimilation*.
             ```js
            findUser().then(function (user) {
              return findCommentsByAuthor(user);
            }).then(function (comments) {
              // The user's comments are now available
            });
            ```
             If the assimliated promise rejects, then the downstream promise will also reject.
             ```js
            findUser().then(function (user) {
              return findCommentsByAuthor(user);
            }).then(function (comments) {
              // If `findCommentsByAuthor` fulfills, we'll have the value here
            }, function (reason) {
              // If `findCommentsByAuthor` rejects, we'll have the reason here
            });
            ```
             Simple Example
            --------------
             Synchronous Example
             ```javascript
            let result;
             try {
              result = findResult();
              // success
            } catch(reason) {
              // failure
            }
            ```
             Errback Example
             ```js
            findResult(function(result, err){
              if (err) {
                // failure
              } else {
                // success
              }
            });
            ```
             Promise Example;
             ```javascript
            findResult().then(function(result){
              // success
            }, function(reason){
              // failure
            });
            ```
             Advanced Example
            --------------
             Synchronous Example
             ```javascript
            let author, books;
             try {
              author = findAuthor();
              books  = findBooksByAuthor(author);
              // success
            } catch(reason) {
              // failure
            }
            ```
             Errback Example
             ```js
             function foundBooks(books) {
             }
             function failure(reason) {
             }
             findAuthor(function(author, err){
              if (err) {
                failure(err);
                // failure
              } else {
                try {
                  findBoooksByAuthor(author, function(books, err) {
                    if (err) {
                      failure(err);
                    } else {
                      try {
                        foundBooks(books);
                      } catch(reason) {
                        failure(reason);
                      }
                    }
                  });
                } catch(error) {
                  failure(err);
                }
                // success
              }
            });
            ```
             Promise Example;
             ```javascript
            findAuthor().
              then(findBooksByAuthor).
              then(function(books){
                // found books
            }).catch(function(reason){
              // something went wrong
            });
            ```
             @method then
            @param {Function} onFulfilled
            @param {Function} onRejected
            Useful for tooling.
            @return {Promise}
            */

            /**
            `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
            as the catch block of a try/catch statement.
            ```js
            function findAuthor(){
            throw new Error('couldn't find that author');
            }
            // synchronous
            try {
            findAuthor();
            } catch(reason) {
            // something went wrong
            }
            // async with promises
            findAuthor().catch(function(reason){
            // something went wrong
            });
            ```
            @method catch
            @param {Function} onRejection
            Useful for tooling.
            @return {Promise}
            */

            Promise.prototype["catch"] = function _catch(onRejection) {
              return this.then(null, onRejection);
            };

            /**
              `finally` will be invoked regardless of the promise's fate just as native
              try/catch/finally behaves
            
              Synchronous example:
            
              ```js
              findAuthor() {
                if (Math.random() > 0.5) {
                  throw new Error();
                }
                return new Author();
              }
            
              try {
                return findAuthor(); // succeed or fail
              } catch(error) {
                return findOtherAuther();
              } finally {
                // always runs
                // doesn't affect the return value
              }
              ```
            
              Asynchronous example:
            
              ```js
              findAuthor().catch(function(reason){
                return findOtherAuther();
              }).finally(function(){
                // author was either found, or not
              });
              ```
            
              @method finally
              @param {Function} callback
              @return {Promise}
            */

            Promise.prototype["finally"] = function _finally(callback) {
              var promise = this;
              var constructor = promise.constructor;
              if (isFunction(callback)) {
                return promise.then(function (value) {
                  return constructor.resolve(callback()).then(function () {
                    return value;
                  });
                }, function (reason) {
                  return constructor.resolve(callback()).then(function () {
                    throw reason;
                  });
                });
              }
              return promise.then(callback, callback);
            };
            return Promise;
          }();
          Promise$2.prototype.then = then;
          Promise$2.all = all;
          Promise$2.race = race;
          Promise$2.resolve = resolve$1;
          Promise$2.reject = reject$1;
          Promise$2._setScheduler = setScheduler;
          Promise$2._setAsap = setAsap;
          Promise$2._asap = asap;

          /*global self*/
          function polyfill() {
            var local = void 0;
            if (typeof __webpack_require__.g !== 'undefined') {
              local = __webpack_require__.g;
            } else if (typeof self !== 'undefined') {
              local = self;
            } else {
              try {
                local = Function('return this')();
              } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
              }
            }
            var P = local.Promise;
            if (P) {
              var promiseToString = null;
              try {
                promiseToString = Object.prototype.toString.call(P.resolve());
              } catch (e) {
                // silently ignored
              }
              if (promiseToString === '[object Promise]' && !P.cast) {
                return;
              }
            }
            local.Promise = Promise$2;
          }

          // Strange compat..
          Promise$2.polyfill = polyfill;
          Promise$2.Promise = Promise$2;
          Promise$2.polyfill();
          return Promise$2;
        });
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/es6-shim-0.35.4/es6-sham.jsfl": (
    /*!******************************************************!*\
      !*** ./Third/polyfill/es6-shim-0.35.4/es6-sham.jsfl ***!
      \******************************************************/
    /***/
    function _Third_polyfill_es6Shim0354_es6ShamJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        /*!
         * https://github.com/paulmillr/es6-shim
         * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
         *   and contributors,  MIT License
         * es6-sham: v0.35.4
         * see https://github.com/paulmillr/es6-shim/blob/0.35.3/LICENSE
         * Details and documentation:
         * https://github.com/paulmillr/es6-shim/
         */

        // UMD (Universal Module Definition)
        // see https://github.com/umdjs/umd/blob/master/returnExports.js
        (function (root, factory) {
          /*global define */
          if (true) {
            // AMD. Register as an anonymous module.
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {}
        })(this, function () {
          'use strict';

          /* eslint-disable no-new-func */
          var getGlobal = new Function('return this;');
          /* eslint-enable no-new-func */

          var globals = getGlobal();
          var Object = globals.Object;
          var _call = Function.call.bind(Function.call);
          var functionToString = Function.toString;
          var _strMatch = String.prototype.match;
          var throwsError = function throwsError(func) {
            try {
              func();
              return false;
            } catch (e) {
              return true;
            }
          };
          var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
            // if Object.defineProperty exists but throws, it's IE 8
            return !throwsError(function () {
              Object.defineProperty({}, 'x', {
                get: function get() {}
              }); // eslint-disable-line getter-return
            });
          };
          var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();

          // NOTE:  This versions needs object ownership
          //        because every promoted object needs to be reassigned
          //        otherwise uncompatible browsers cannot work as expected
          //
          // NOTE:  This might need es5-shim or polyfills upfront
          //        because it's based on ES5 API.
          //        (probably just an IE <= 8 problem)
          //
          // NOTE:  nodejs is fine in version 0.8, 0.10, and future versions.
          (function () {
            if (Object.setPrototypeOf) {
              return;
            }

            // @author    Andrea Giammarchi - @WebReflection

            var getOwnPropertyNames = Object.getOwnPropertyNames;
            var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            var create = Object.create;
            var defineProperty = Object.defineProperty;
            var getPrototypeOf = Object.getPrototypeOf;
            var objProto = Object.prototype;
            var copyDescriptors = function copyDescriptors(target, source) {
              // define into target descriptors from source
              getOwnPropertyNames(source).forEach(function (key) {
                defineProperty(target, key, getOwnPropertyDescriptor(source, key));
              });
              return target;
            };
            // used as fallback when no promotion is possible
            var createAndCopy = function createAndCopy(origin, proto) {
              return copyDescriptors(create(proto), origin);
            };
            var set, setPrototypeOf;
            try {
              // this might fail for various reasons
              // ignore if Chrome cought it at runtime
              set = getOwnPropertyDescriptor(objProto, '__proto__').set;
              set.call({}, null);
              // setter not poisoned, it can promote
              // Firefox, Chrome
              setPrototypeOf = function setPrototypeOf(origin, proto) {
                set.call(origin, proto);
                return origin;
              };
            } catch (e) {
              // do one or more feature detections
              set = {
                __proto__: null
              };
              // if proto does not work, needs to fallback
              // some Opera, Rhino, ducktape
              if (set instanceof Object) {
                setPrototypeOf = createAndCopy;
              } else {
                // verify if null objects are buggy
                /* eslint-disable no-proto */
                set.__proto__ = objProto;
                /* eslint-enable no-proto */
                // if null objects are buggy
                // nodejs 0.8 to 0.10
                if (set instanceof Object) {
                  setPrototypeOf = function setPrototypeOf(origin, proto) {
                    // use such bug to promote
                    /* eslint-disable no-proto */
                    origin.__proto__ = proto;
                    /* eslint-enable no-proto */
                    return origin;
                  };
                } else {
                  // try to use proto or fallback
                  // Safari, old Firefox, many others
                  setPrototypeOf = function setPrototypeOf(origin, proto) {
                    // if proto is not null
                    if (getPrototypeOf(origin)) {
                      // use __proto__ to promote
                      /* eslint-disable no-proto */
                      origin.__proto__ = proto;
                      /* eslint-enable no-proto */
                      return origin;
                    }
                    // otherwise unable to promote: fallback
                    return createAndCopy(origin, proto);
                  };
                }
              }
            }
            Object.setPrototypeOf = setPrototypeOf;
          })();
          if (supportsDescriptors && function foo() {}.name !== 'foo') {
            /* eslint no-extend-native: 1 */
            Object.defineProperty(Function.prototype, 'name', {
              configurable: true,
              enumerable: false,
              get: function get() {
                if (this === Function.prototype) {
                  return '';
                }
                var str = _call(functionToString, this);
                var match = _call(_strMatch, str, /\s*function\s+([^(\s]*)\s*/);
                var name = match && match[1];
                Object.defineProperty(this, 'name', {
                  configurable: true,
                  enumerable: false,
                  writable: false,
                  value: name
                });
                return name;
              }
            });
          }
        });
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/es6-shim-0.35.4/es6-shim.jsfl": (
    /*!******************************************************!*\
      !*** ./Third/polyfill/es6-shim-0.35.4/es6-shim.jsfl ***!
      \******************************************************/
    /***/
    function _Third_polyfill_es6Shim0354_es6ShimJsfl(module, exports, __webpack_require__) {
      /* provided dependency */var Promise = __webpack_require__(/*! es6-promise */"./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl")["Promise"];
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        /*!
         * https://github.com/paulmillr/es6-shim
         * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
         *   and contributors,  MIT License
         * es6-shim: v0.35.4
         * see https://github.com/paulmillr/es6-shim/blob/0.35.3/LICENSE
         * Details and documentation:
         * https://github.com/paulmillr/es6-shim/
         */

        // UMD (Universal Module Definition)
        // see https://github.com/umdjs/umd/blob/master/returnExports.js
        (function (root, factory) {
          /*global define */
          if (true) {
            // AMD. Register as an anonymous module.
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {}
        })(this, function () {
          'use strict';

          var _apply = Function.call.bind(Function.apply);
          var _call = Function.call.bind(Function.call);
          var isArray = Array.isArray;
          var keys = Object.keys;
          var not = function notThunker(func) {
            return function notThunk() {
              return !_apply(func, this, arguments);
            };
          };
          var throwsError = function throwsError(func) {
            try {
              func();
              return false;
            } catch (e) {
              return true;
            }
          };
          var valueOrFalseIfThrows = function valueOrFalseIfThrows(func) {
            try {
              return func();
            } catch (e) {
              return false;
            }
          };
          var isCallableWithoutNew = not(throwsError);
          var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
            // if Object.defineProperty exists but throws, it's IE 8
            return !throwsError(function () {
              return Object.defineProperty({}, 'x', {
                get: function get() {}
              }); // eslint-disable-line getter-return
            });
          };
          var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();
          var functionsHaveNames = function foo() {}.name === 'foo';
          var _forEach = Function.call.bind(Array.prototype.forEach);
          var _reduce = Function.call.bind(Array.prototype.reduce);
          var _filter = Function.call.bind(Array.prototype.filter);
          var _some = Function.call.bind(Array.prototype.some);
          var defineProperty = function defineProperty(object, name, value, force) {
            if (!force && name in object) {
              return;
            }
            if (supportsDescriptors) {
              Object.defineProperty(object, name, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: value
              });
            } else {
              object[name] = value;
            }
          };

          // Define configurable, writable and non-enumerable props
          // if they don’t exist.
          var defineProperties = function defineProperties(object, map, forceOverride) {
            _forEach(keys(map), function (name) {
              var method = map[name];
              defineProperty(object, name, method, !!forceOverride);
            });
          };
          var _toString = Function.call.bind(Object.prototype.toString);
          var isCallable = false ? 0 : function IsCallableFast(x) {
            return typeof x === 'function';
          };
          var Value = {
            getter: function getter(object, name, _getter) {
              if (!supportsDescriptors) {
                throw new TypeError('getters require true ES5 support');
              }
              Object.defineProperty(object, name, {
                configurable: true,
                enumerable: false,
                get: _getter
              });
            },
            proxy: function proxy(originalObject, key, targetObject) {
              if (!supportsDescriptors) {
                throw new TypeError('getters require true ES5 support');
              }
              var originalDescriptor = Object.getOwnPropertyDescriptor(originalObject, key);
              Object.defineProperty(targetObject, key, {
                configurable: originalDescriptor.configurable,
                enumerable: originalDescriptor.enumerable,
                get: function getKey() {
                  return originalObject[key];
                },
                set: function setKey(value) {
                  originalObject[key] = value;
                }
              });
            },
            redefine: function redefine(object, property, newValue) {
              if (supportsDescriptors) {
                var descriptor = Object.getOwnPropertyDescriptor(object, property);
                descriptor.value = newValue;
                Object.defineProperty(object, property, descriptor);
              } else {
                object[property] = newValue;
              }
            },
            defineByDescriptor: function defineByDescriptor(object, property, descriptor) {
              if (supportsDescriptors) {
                Object.defineProperty(object, property, descriptor);
              } else if ('value' in descriptor) {
                object[property] = descriptor.value;
              }
            },
            preserveToString: function preserveToString(target, source) {
              if (source && isCallable(source.toString)) {
                defineProperty(target, 'toString', source.toString.bind(source), true);
              }
            }
          };

          // Simple shim for Object.create on ES3 browsers
          // (unlike real shim, no attempt to support `prototype === null`)
          var create = Object.create || function (prototype, properties) {
            var Prototype = function Prototype() {};
            Prototype.prototype = prototype;
            var object = new Prototype();
            if (typeof properties !== 'undefined') {
              keys(properties).forEach(function (key) {
                Value.defineByDescriptor(object, key, properties[key]);
              });
            }
            return object;
          };
          var supportsSubclassing = function supportsSubclassing(C, f) {
            if (!Object.setPrototypeOf) {
              return false; /* skip test on IE < 11 */
            }
            return valueOrFalseIfThrows(function () {
              var Sub = function Subclass(arg) {
                var o = new C(arg);
                Object.setPrototypeOf(o, Subclass.prototype);
                return o;
              };
              Object.setPrototypeOf(Sub, C);
              Sub.prototype = create(C.prototype, {
                constructor: {
                  value: Sub
                }
              });
              return f(Sub);
            });
          };
          var getGlobal = function getGlobal() {
            /* global self, window */
            // the only reliable means to get the global object is
            // `Function('return this')()`
            // However, this causes CSP violations in Chrome apps.
            if (typeof self !== 'undefined') {
              return self;
            }
            if (typeof window !== 'undefined') {
              return window;
            }
            if (typeof __webpack_require__.g !== 'undefined') {
              return __webpack_require__.g;
            }
            throw new Error('unable to locate global object');
          };
          var globals = getGlobal();
          var globalIsFinite = globals.isFinite;
          var _indexOf = Function.call.bind(String.prototype.indexOf);
          var _arrayIndexOfApply = Function.apply.bind(Array.prototype.indexOf);
          var _concat = Function.call.bind(Array.prototype.concat);
          // var _sort = Function.call.bind(Array.prototype.sort);
          var _strSlice = Function.call.bind(String.prototype.slice);
          var _push = Function.call.bind(Array.prototype.push);
          var _pushApply = Function.apply.bind(Array.prototype.push);
          var _join = Function.call.bind(Array.prototype.join);
          var _shift = Function.call.bind(Array.prototype.shift);
          var _max = Math.max;
          var _min = Math.min;
          var _floor = Math.floor;
          var _abs = Math.abs;
          var _exp = Math.exp;
          var _log = Math.log;
          var _sqrt = Math.sqrt;
          var _hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          var ArrayIterator; // make our implementation private
          var noop = function noop() {};
          var OrigMap = globals.Map;
          var origMapDelete = OrigMap && OrigMap.prototype['delete'];
          var origMapGet = OrigMap && OrigMap.prototype.get;
          var origMapHas = OrigMap && OrigMap.prototype.has;
          var origMapSet = OrigMap && OrigMap.prototype.set;
          var _Symbol = globals.Symbol || {};
          var symbolSpecies = _Symbol.species || '@@species';
          var numberIsNaN = Number.isNaN || function isNaN(value) {
            // NaN !== NaN, but they are identical.
            // NaNs are the only non-reflexive value, i.e., if x !== x,
            // then x is NaN.
            // isNaN is broken: it converts its argument to number, so
            // isNaN('foo') => true
            return value !== value;
          };
          var numberIsFinite = Number.isFinite || function isFinite(value) {
            return typeof value === 'number' && globalIsFinite(value);
          };
          var _sign = isCallable(Math.sign) ? Math.sign : function sign(value) {
            var number = Number(value);
            if (number === 0) {
              return number;
            }
            if (numberIsNaN(number)) {
              return number;
            }
            return number < 0 ? -1 : 1;
          };
          var _log1p = function log1p(value) {
            var x = Number(value);
            if (x < -1 || numberIsNaN(x)) {
              return NaN;
            }
            if (x === 0 || x === Infinity) {
              return x;
            }
            if (x === -1) {
              return -Infinity;
            }
            return 1 + x - 1 === 0 ? x : x * (_log(1 + x) / (1 + x - 1));
          };

          // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
          // can be replaced with require('is-arguments') if we ever use a build process instead
          var isStandardArguments = function isArguments(value) {
            return _toString(value) === '[object Arguments]';
          };
          var isLegacyArguments = function isArguments(value) {
            return value !== null && _typeof(value) === 'object' && typeof value.length === 'number' && value.length >= 0 && _toString(value) !== '[object Array]' && _toString(value.callee) === '[object Function]';
          };
          var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;
          var Type = {
            primitive: function primitive(x) {
              return x === null || typeof x !== 'function' && _typeof(x) !== 'object';
            },
            string: function string(x) {
              return _toString(x) === '[object String]';
            },
            regex: function regex(x) {
              return _toString(x) === '[object RegExp]';
            },
            symbol: function symbol(x) {
              return typeof globals.Symbol === 'function' && _typeof(x) === 'symbol';
            }
          };
          var overrideNative = function overrideNative(object, property, replacement) {
            var original = object[property];
            defineProperty(object, property, replacement, true);
            Value.preserveToString(object[property], original);
          };

          // eslint-disable-next-line no-restricted-properties
          var hasSymbols = typeof _Symbol === 'function' && typeof _Symbol['for'] === 'function' && Type.symbol(_Symbol());

          // This is a private name in the es6 spec, equal to '[Symbol.iterator]'
          // we're going to use an arbitrary _-prefixed name to make our shims
          // work properly with each other, even though we don't have full Iterator
          // support.  That is, `Array.from(map.keys())` will work, but we don't
          // pretend to export a "real" Iterator interface.
          var $iterator$ = Type.symbol(_Symbol.iterator) ? _Symbol.iterator : '_es6-shim iterator_';
          // Firefox ships a partial implementation using the name @@iterator.
          // https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
          // So use that name if we detect it.
          if (globals.Set && typeof new globals.Set()['@@iterator'] === 'function') {
            $iterator$ = '@@iterator';
          }

          // Reflect
          if (!globals.Reflect) {
            defineProperty(globals, 'Reflect', {}, true);
          }
          var Reflect = globals.Reflect;
          var $String = String;

          /* global document */
          var domAll = typeof document === 'undefined' || !document ? null : document.all;
          var isNullOrUndefined = domAll == null ? function isNullOrUndefined(x) {
            return x == null;
          } : function isNullOrUndefinedAndNotDocumentAll(x) {
            return x == null && x !== domAll;
          };
          var ES = {
            // http://www.ecma-international.org/ecma-262/6.0/#sec-call
            Call: function Call(F, V) {
              var args = arguments.length > 2 ? arguments[2] : [];
              if (!ES.IsCallable(F)) {
                throw new TypeError(F + ' is not a function');
              }
              return _apply(F, V, args);
            },
            RequireObjectCoercible: function RequireObjectCoercible(x, optMessage) {
              if (isNullOrUndefined(x)) {
                throw new TypeError(optMessage || 'Cannot call method on ' + x);
              }
              return x;
            },
            // This might miss the "(non-standard exotic and does not implement
            // [[Call]])" case from
            // http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator-runtime-semantics-evaluation
            // but we can't find any evidence these objects exist in practice.
            // If we find some in the future, you could test `Object(x) === x`,
            // which is reliable according to
            // http://www.ecma-international.org/ecma-262/6.0/#sec-toobject
            // but is not well optimized by runtimes and creates an object
            // whenever it returns false, and thus is very slow.
            TypeIsObject: function TypeIsObject(x) {
              if (x === void 0 || x === null || x === true || x === false) {
                return false;
              }
              return typeof x === 'function' || _typeof(x) === 'object' || x === domAll;
            },
            ToObject: function ToObject(o, optMessage) {
              // return Object(ES.RequireObjectCoercible(o, optMessage));
              ES.RequireObjectCoercible(o, optMessage);
              return Object(o);
            },
            IsCallable: isCallable,
            IsConstructor: function IsConstructor(x) {
              // We can't tell callables from constructors in ES5
              return ES.IsCallable(x);
            },
            ToInt32: function ToInt32(x) {
              return ES.ToNumber(x) >> 0;
            },
            ToUint32: function ToUint32(x) {
              return ES.ToNumber(x) >>> 0;
            },
            ToNumber: function ToNumber(value) {
              if (hasSymbols && _toString(value) === '[object Symbol]') {
                throw new TypeError('Cannot convert a Symbol value to a number');
              }
              return +value;
            },
            ToInteger: function ToInteger(value) {
              var number = ES.ToNumber(value);
              if (numberIsNaN(number)) {
                return 0;
              }
              if (number === 0 || !numberIsFinite(number)) {
                return number;
              }
              return (number > 0 ? 1 : -1) * _floor(_abs(number));
            },
            ToLength: function ToLength(value) {
              var len = ES.ToInteger(value);
              if (len <= 0) {
                return 0;
              } // includes converting -0 to +0
              if (len > Number.MAX_SAFE_INTEGER) {
                return Number.MAX_SAFE_INTEGER;
              }
              return len;
            },
            SameValue: function SameValue(a, b) {
              if (a === b) {
                // 0 === -0, but they are not identical.
                if (a === 0) {
                  return 1 / a === 1 / b;
                }
                return true;
              }
              return numberIsNaN(a) && numberIsNaN(b);
            },
            SameValueZero: function SameValueZero(a, b) {
              // same as SameValue except for SameValueZero(+0, -0) == true
              return a === b || numberIsNaN(a) && numberIsNaN(b);
            },
            GetIterator: function GetIterator(o) {
              if (isArguments(o)) {
                // special case support for `arguments`
                return new ArrayIterator(o, 'value');
              }
              var itFn = ES.GetMethod(o, $iterator$);
              if (!ES.IsCallable(itFn)) {
                // Better diagnostics if itFn is null or undefined
                throw new TypeError('value is not an iterable');
              }
              var it = ES.Call(itFn, o);
              if (!ES.TypeIsObject(it)) {
                throw new TypeError('bad iterator');
              }
              return it;
            },
            GetMethod: function GetMethod(o, p) {
              var func = ES.ToObject(o)[p];
              if (isNullOrUndefined(func)) {
                return void 0;
              }
              if (!ES.IsCallable(func)) {
                throw new TypeError('Method not callable: ' + p);
              }
              return func;
            },
            IteratorComplete: function IteratorComplete(iterResult) {
              return !!iterResult.done;
            },
            IteratorClose: function IteratorClose(iterator, completionIsThrow) {
              var returnMethod = ES.GetMethod(iterator, 'return');
              if (returnMethod === void 0) {
                return;
              }
              var innerResult, innerException;
              try {
                innerResult = ES.Call(returnMethod, iterator);
              } catch (e) {
                innerException = e;
              }
              if (completionIsThrow) {
                return;
              }
              if (innerException) {
                throw innerException;
              }
              if (!ES.TypeIsObject(innerResult)) {
                throw new TypeError("Iterator's return method returned a non-object.");
              }
            },
            IteratorNext: function IteratorNext(it) {
              var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
              if (!ES.TypeIsObject(result)) {
                throw new TypeError('bad iterator');
              }
              return result;
            },
            IteratorStep: function IteratorStep(it) {
              var result = ES.IteratorNext(it);
              var done = ES.IteratorComplete(result);
              return done ? false : result;
            },
            Construct: function Construct(C, args, newTarget, isES6internal) {
              var target = typeof newTarget === 'undefined' ? C : newTarget;
              if (!isES6internal && Reflect.construct) {
                // Try to use Reflect.construct if available
                return Reflect.construct(C, args, target);
              }
              // OK, we have to fake it.  This will only work if the
              // C.[[ConstructorKind]] == "base" -- but that's the only
              // kind we can make in ES5 code anyway.

              // OrdinaryCreateFromConstructor(target, "%ObjectPrototype%")
              var proto = target.prototype;
              if (!ES.TypeIsObject(proto)) {
                proto = Object.prototype;
              }
              var obj = create(proto);
              // Call the constructor.
              var result = ES.Call(C, obj, args);
              return ES.TypeIsObject(result) ? result : obj;
            },
            SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
              var C = O.constructor;
              if (C === void 0) {
                return defaultConstructor;
              }
              if (!ES.TypeIsObject(C)) {
                throw new TypeError('Bad constructor');
              }
              var S = C[symbolSpecies];
              if (isNullOrUndefined(S)) {
                return defaultConstructor;
              }
              if (!ES.IsConstructor(S)) {
                throw new TypeError('Bad @@species');
              }
              return S;
            },
            CreateHTML: function CreateHTML(string, tag, attribute, value) {
              var S = ES.ToString(string);
              var p1 = '<' + tag;
              if (attribute !== '') {
                var V = ES.ToString(value);
                var escapedV = V.replace(/"/g, '&quot;');
                p1 += ' ' + attribute + '="' + escapedV + '"';
              }
              var p2 = p1 + '>';
              var p3 = p2 + S;
              return p3 + '</' + tag + '>';
            },
            IsRegExp: function IsRegExp(argument) {
              if (!ES.TypeIsObject(argument)) {
                return false;
              }
              var isRegExp = argument[_Symbol.match];
              if (typeof isRegExp !== 'undefined') {
                return !!isRegExp;
              }
              return Type.regex(argument);
            },
            ToString: function ToString(string) {
              if (hasSymbols && _toString(string) === '[object Symbol]') {
                throw new TypeError('Cannot convert a Symbol value to a number');
              }
              return $String(string);
            }
          };

          // Well-known Symbol shims
          if (supportsDescriptors && hasSymbols) {
            var defineWellKnownSymbol = function defineWellKnownSymbol(name) {
              if (Type.symbol(_Symbol[name])) {
                return _Symbol[name];
              }
              // eslint-disable-next-line no-restricted-properties
              var sym = _Symbol['for']('Symbol.' + name);
              Object.defineProperty(_Symbol, name, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: sym
              });
              return sym;
            };
            if (!Type.symbol(_Symbol.search)) {
              var symbolSearch = defineWellKnownSymbol('search');
              var originalSearch = String.prototype.search;
              defineProperty(RegExp.prototype, symbolSearch, function search(string) {
                return ES.Call(originalSearch, string, [this]);
              });
              var searchShim = function search(regexp) {
                var O = ES.RequireObjectCoercible(this);
                if (!isNullOrUndefined(regexp)) {
                  var searcher = ES.GetMethod(regexp, symbolSearch);
                  if (typeof searcher !== 'undefined') {
                    return ES.Call(searcher, regexp, [O]);
                  }
                }
                return ES.Call(originalSearch, O, [ES.ToString(regexp)]);
              };
              overrideNative(String.prototype, 'search', searchShim);
            }
            if (!Type.symbol(_Symbol.replace)) {
              var symbolReplace = defineWellKnownSymbol('replace');
              var originalReplace = String.prototype.replace;
              defineProperty(RegExp.prototype, symbolReplace, function replace(string, replaceValue) {
                return ES.Call(originalReplace, string, [this, replaceValue]);
              });
              var replaceShim = function replace(searchValue, replaceValue) {
                var O = ES.RequireObjectCoercible(this);
                if (!isNullOrUndefined(searchValue)) {
                  var replacer = ES.GetMethod(searchValue, symbolReplace);
                  if (typeof replacer !== 'undefined') {
                    return ES.Call(replacer, searchValue, [O, replaceValue]);
                  }
                }
                return ES.Call(originalReplace, O, [ES.ToString(searchValue), replaceValue]);
              };
              overrideNative(String.prototype, 'replace', replaceShim);
            }
            if (!Type.symbol(_Symbol.split)) {
              var symbolSplit = defineWellKnownSymbol('split');
              var originalSplit = String.prototype.split;
              defineProperty(RegExp.prototype, symbolSplit, function split(string, limit) {
                return ES.Call(originalSplit, string, [this, limit]);
              });
              var splitShim = function split(separator, limit) {
                var O = ES.RequireObjectCoercible(this);
                if (!isNullOrUndefined(separator)) {
                  var splitter = ES.GetMethod(separator, symbolSplit);
                  if (typeof splitter !== 'undefined') {
                    return ES.Call(splitter, separator, [O, limit]);
                  }
                }
                return ES.Call(originalSplit, O, [ES.ToString(separator), limit]);
              };
              overrideNative(String.prototype, 'split', splitShim);
            }
            var symbolMatchExists = Type.symbol(_Symbol.match);
            var stringMatchIgnoresSymbolMatch = symbolMatchExists && function () {
              // Firefox 41, through Nightly 45 has Symbol.match, but String#match ignores it.
              // Firefox 40 and below have Symbol.match but String#match works fine.
              var o = {};
              o[_Symbol.match] = function () {
                return 42;
              };
              return 'a'.match(o) !== 42;
            }();
            if (!symbolMatchExists || stringMatchIgnoresSymbolMatch) {
              var symbolMatch = defineWellKnownSymbol('match');
              var originalMatch = String.prototype.match;
              defineProperty(RegExp.prototype, symbolMatch, function match(string) {
                return ES.Call(originalMatch, string, [this]);
              });
              var matchShim = function match(regexp) {
                var O = ES.RequireObjectCoercible(this);
                if (!isNullOrUndefined(regexp)) {
                  var matcher = ES.GetMethod(regexp, symbolMatch);
                  if (typeof matcher !== 'undefined') {
                    return ES.Call(matcher, regexp, [O]);
                  }
                }
                return ES.Call(originalMatch, O, [ES.ToString(regexp)]);
              };
              overrideNative(String.prototype, 'match', matchShim);
            }
          }
          var wrapConstructor = function wrapConstructor(original, replacement, keysToSkip) {
            Value.preserveToString(replacement, original);
            if (Object.setPrototypeOf) {
              // sets up proper prototype chain where possible
              Object.setPrototypeOf(original, replacement);
            }
            if (supportsDescriptors) {
              _forEach(Object.getOwnPropertyNames(original), function (key) {
                if (key in noop || keysToSkip[key]) {
                  return;
                }
                Value.proxy(original, key, replacement);
              });
            } else {
              _forEach(Object.keys(original), function (key) {
                if (key in noop || keysToSkip[key]) {
                  return;
                }
                replacement[key] = original[key];
              });
            }
            replacement.prototype = original.prototype;
            Value.redefine(original.prototype, 'constructor', replacement);
          };
          var defaultSpeciesGetter = function defaultSpeciesGetter() {
            return this;
          };
          var addDefaultSpecies = function addDefaultSpecies(C) {
            if (supportsDescriptors && !_hasOwnProperty(C, symbolSpecies)) {
              Value.getter(C, symbolSpecies, defaultSpeciesGetter);
            }
          };
          var addIterator = function addIterator(prototype, impl) {
            var implementation = impl || function iterator() {
              return this;
            };
            defineProperty(prototype, $iterator$, implementation);
            if (!prototype[$iterator$] && Type.symbol($iterator$)) {
              // implementations are buggy when $iterator$ is a Symbol
              prototype[$iterator$] = implementation;
            }
          };
          var createDataProperty = function createDataProperty(object, name, value) {
            if (supportsDescriptors) {
              Object.defineProperty(object, name, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: value
              });
            } else {
              object[name] = value;
            }
          };
          var createDataPropertyOrThrow = function createDataPropertyOrThrow(object, name, value) {
            createDataProperty(object, name, value);
            if (!ES.SameValue(object[name], value)) {
              throw new TypeError('property is nonconfigurable');
            }
          };
          var emulateES6construct = function emulateES6construct(o, defaultNewTarget, defaultProto, slots) {
            // This is an es5 approximation to es6 construct semantics.  in es6,
            // 'new Foo' invokes Foo.[[Construct]] which (for almost all objects)
            // just sets the internal variable NewTarget (in es6 syntax `new.target`)
            // to Foo and then returns Foo().

            // Many ES6 object then have constructors of the form:
            // 1. If NewTarget is undefined, throw a TypeError exception
            // 2. Let xxx by OrdinaryCreateFromConstructor(NewTarget, yyy, zzz)

            // So we're going to emulate those first two steps.
            if (!ES.TypeIsObject(o)) {
              throw new TypeError('Constructor requires `new`: ' + defaultNewTarget.name);
            }
            var proto = defaultNewTarget.prototype;
            if (!ES.TypeIsObject(proto)) {
              proto = defaultProto;
            }
            var obj = create(proto);
            for (var name in slots) {
              if (_hasOwnProperty(slots, name)) {
                var value = slots[name];
                defineProperty(obj, name, value, true);
              }
            }
            return obj;
          };

          // Firefox 31 reports this function's length as 0
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1062484
          if (String.fromCodePoint && String.fromCodePoint.length !== 1) {
            var originalFromCodePoint = String.fromCodePoint;
            overrideNative(String, 'fromCodePoint', function fromCodePoint(codePoints) {
              return ES.Call(originalFromCodePoint, this, arguments);
            });
          }
          var StringShims = {
            fromCodePoint: function fromCodePoint(codePoints) {
              var result = [];
              var next;
              for (var i = 0, length = arguments.length; i < length; i++) {
                next = Number(arguments[i]);
                if (!ES.SameValue(next, ES.ToInteger(next)) || next < 0 || next > 0x10ffff) {
                  throw new RangeError('Invalid code point ' + next);
                }
                if (next < 0x10000) {
                  _push(result, String.fromCharCode(next));
                } else {
                  next -= 0x10000;
                  _push(result, String.fromCharCode((next >> 10) + 0xd800));
                  _push(result, String.fromCharCode(next % 0x400 + 0xdc00));
                }
              }
              return _join(result, '');
            },
            raw: function raw(template) {
              var numberOfSubstitutions = arguments.length - 1;
              var cooked = ES.ToObject(template, 'bad template');
              var raw = ES.ToObject(cooked.raw, 'bad raw value');
              var len = raw.length;
              var literalSegments = ES.ToLength(len);
              if (literalSegments <= 0) {
                return '';
              }
              var stringElements = [];
              var nextIndex = 0;
              var nextKey, next, nextSeg, nextSub;
              while (nextIndex < literalSegments) {
                nextKey = ES.ToString(nextIndex);
                nextSeg = ES.ToString(raw[nextKey]);
                _push(stringElements, nextSeg);
                if (nextIndex + 1 >= literalSegments) {
                  break;
                }
                next = nextIndex + 1 < arguments.length ? arguments[nextIndex + 1] : '';
                nextSub = ES.ToString(next);
                _push(stringElements, nextSub);
                nextIndex += 1;
              }
              return _join(stringElements, '');
            }
          };
          if (String.raw && String.raw({
            raw: {
              0: 'x',
              1: 'y',
              length: 2
            }
          }) !== 'xy') {
            // IE 11 TP has a broken String.raw implementation
            overrideNative(String, 'raw', StringShims.raw);
          }
          defineProperties(String, StringShims);

          // Fast repeat, uses the `Exponentiation by squaring` algorithm.
          // Perf: http://jsperf.com/string-repeat2/2
          var stringRepeat = function repeat(s, times) {
            if (times < 1) {
              return '';
            }
            if (times % 2) {
              return repeat(s, times - 1) + s;
            }
            var half = repeat(s, times / 2);
            return half + half;
          };
          var stringMaxLength = Infinity;
          var StringPrototypeShims = {
            repeat: function repeat(times) {
              var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
              var numTimes = ES.ToInteger(times);
              if (numTimes < 0 || numTimes >= stringMaxLength) {
                throw new RangeError('repeat count must be less than infinity and not overflow maximum string size');
              }
              return stringRepeat(thisStr, numTimes);
            },
            startsWith: function startsWith(searchString) {
              var S = ES.ToString(ES.RequireObjectCoercible(this));
              if (ES.IsRegExp(searchString)) {
                throw new TypeError('Cannot call method "startsWith" with a regex');
              }
              var searchStr = ES.ToString(searchString);
              var position;
              if (arguments.length > 1) {
                position = arguments[1];
              }
              var start = _max(ES.ToInteger(position), 0);
              return _strSlice(S, start, start + searchStr.length) === searchStr;
            },
            endsWith: function endsWith(searchString) {
              var S = ES.ToString(ES.RequireObjectCoercible(this));
              if (ES.IsRegExp(searchString)) {
                throw new TypeError('Cannot call method "endsWith" with a regex');
              }
              var searchStr = ES.ToString(searchString);
              var len = S.length;
              var endPosition;
              if (arguments.length > 1) {
                endPosition = arguments[1];
              }
              var pos = typeof endPosition === 'undefined' ? len : ES.ToInteger(endPosition);
              var end = _min(_max(pos, 0), len);
              return _strSlice(S, end - searchStr.length, end) === searchStr;
            },
            includes: function includes(searchString) {
              if (ES.IsRegExp(searchString)) {
                throw new TypeError('"includes" does not accept a RegExp');
              }
              var searchStr = ES.ToString(searchString);
              var position;
              if (arguments.length > 1) {
                position = arguments[1];
              }
              // Somehow this trick makes method 100% compat with the spec.
              return _indexOf(this, searchStr, position) !== -1;
            },
            codePointAt: function codePointAt(pos) {
              var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
              var position = ES.ToInteger(pos);
              var length = thisStr.length;
              if (position >= 0 && position < length) {
                var first = thisStr.charCodeAt(position);
                var isEnd = position + 1 === length;
                if (first < 0xd800 || first > 0xdbff || isEnd) {
                  return first;
                }
                var second = thisStr.charCodeAt(position + 1);
                if (second < 0xdc00 || second > 0xdfff) {
                  return first;
                }
                return (first - 0xd800) * 1024 + (second - 0xdc00) + 0x10000;
              }
            }
          };
          if (String.prototype.includes && 'a'.includes('a', Infinity) !== false) {
            overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
          }
          if (String.prototype.startsWith && String.prototype.endsWith) {
            var startsWithRejectsRegex = throwsError(function () {
              /* throws if spec-compliant */
              return '/a/'.startsWith(/a/);
            });
            var startsWithHandlesInfinity = valueOrFalseIfThrows(function () {
              return 'abc'.startsWith('a', Infinity) === false;
            });
            if (!startsWithRejectsRegex || !startsWithHandlesInfinity) {
              // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
              overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
              overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
            }
          }
          if (hasSymbols) {
            var startsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
              var re = /a/;
              re[_Symbol.match] = false;
              return '/a/'.startsWith(re);
            });
            if (!startsWithSupportsSymbolMatch) {
              overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
            }
            var endsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
              var re = /a/;
              re[_Symbol.match] = false;
              return '/a/'.endsWith(re);
            });
            if (!endsWithSupportsSymbolMatch) {
              overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
            }
            var includesSupportsSymbolMatch = valueOrFalseIfThrows(function () {
              var re = /a/;
              re[_Symbol.match] = false;
              return '/a/'.includes(re);
            });
            if (!includesSupportsSymbolMatch) {
              overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
            }
          }
          defineProperties(String.prototype, StringPrototypeShims);

          // whitespace from: http://es5.github.io/#x15.5.4.20
          // implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
          var ws = ["\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003", "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028", "\u2029\uFEFF"].join('');
          var trimRegexp = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
          var trimShim = function trim() {
            return ES.ToString(ES.RequireObjectCoercible(this)).replace(trimRegexp, '');
          };
          var nonWS = ["\x85", "\u200B", "\uFFFE"].join('');
          var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
          var isBadHexRegex = /^[-+]0x[0-9a-f]+$/i;
          var hasStringTrimBug = nonWS.trim().length !== nonWS.length;
          defineProperty(String.prototype, 'trim', trimShim, hasStringTrimBug);

          // Given an argument x, it will return an IteratorResult object,
          // with value set to x and done to false.
          // Given no arguments, it will return an iterator completion object.
          var iteratorResult = function iteratorResult(x) {
            return {
              value: x,
              done: arguments.length === 0
            };
          };

          // see http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype-@@iterator
          var StringIterator = function StringIterator(s) {
            ES.RequireObjectCoercible(s);
            defineProperty(this, '_s', ES.ToString(s));
            defineProperty(this, '_i', 0);
          };
          StringIterator.prototype.next = function () {
            var s = this._s;
            var i = this._i;
            if (typeof s === 'undefined' || i >= s.length) {
              this._s = void 0;
              return iteratorResult();
            }
            var first = s.charCodeAt(i);
            var second, len;
            if (first < 0xd800 || first > 0xdbff || i + 1 === s.length) {
              len = 1;
            } else {
              second = s.charCodeAt(i + 1);
              len = second < 0xdc00 || second > 0xdfff ? 1 : 2;
            }
            this._i = i + len;
            return iteratorResult(s.substr(i, len));
          };
          addIterator(StringIterator.prototype);
          addIterator(String.prototype, function () {
            return new StringIterator(this);
          });
          var ArrayShims = {
            from: function from(items) {
              var C = this;
              var mapFn;
              if (arguments.length > 1) {
                mapFn = arguments[1];
              }
              var mapping, T;
              if (typeof mapFn === 'undefined') {
                mapping = false;
              } else {
                if (!ES.IsCallable(mapFn)) {
                  throw new TypeError('Array.from: when provided, the second argument must be a function');
                }
                if (arguments.length > 2) {
                  T = arguments[2];
                }
                mapping = true;
              }

              // Note that that Arrays will use ArrayIterator:
              // https://bugs.ecmascript.org/show_bug.cgi?id=2416
              var usingIterator = typeof (isArguments(items) || ES.GetMethod(items, $iterator$)) !== 'undefined';
              var length, result, i;
              if (usingIterator) {
                result = ES.IsConstructor(C) ? Object(new C()) : [];
                var iterator = ES.GetIterator(items);
                var next, nextValue;
                i = 0;
                while (true) {
                  next = ES.IteratorStep(iterator);
                  if (next === false) {
                    break;
                  }
                  nextValue = next.value;
                  try {
                    if (mapping) {
                      nextValue = typeof T === 'undefined' ? mapFn(nextValue, i) : _call(mapFn, T, nextValue, i);
                    }
                    result[i] = nextValue;
                  } catch (e) {
                    ES.IteratorClose(iterator, true);
                    throw e;
                  }
                  i += 1;
                }
                length = i;
              } else {
                var arrayLike = ES.ToObject(items);
                length = ES.ToLength(arrayLike.length);
                result = ES.IsConstructor(C) ? Object(new C(length)) : new Array(length);
                var value;
                for (i = 0; i < length; ++i) {
                  value = arrayLike[i];
                  if (mapping) {
                    value = typeof T === 'undefined' ? mapFn(value, i) : _call(mapFn, T, value, i);
                  }
                  createDataPropertyOrThrow(result, i, value);
                }
              }
              result.length = length;
              return result;
            },
            of: function of() {
              var len = arguments.length;
              var C = this;
              var A = isArray(C) || !ES.IsCallable(C) ? new Array(len) : ES.Construct(C, [len]);
              for (var k = 0; k < len; ++k) {
                createDataPropertyOrThrow(A, k, arguments[k]);
              }
              A.length = len;
              return A;
            }
          };
          defineProperties(Array, ArrayShims);
          addDefaultSpecies(Array);

          // Our ArrayIterator is private; see
          // https://github.com/paulmillr/es6-shim/issues/252
          ArrayIterator = function ArrayIterator(array, kind) {
            defineProperty(this, 'i', 0);
            defineProperty(this, 'array', array);
            defineProperty(this, 'kind', kind);
          };
          defineProperties(ArrayIterator.prototype, {
            next: function next() {
              var i = this.i;
              var array = this.array;
              if (!(this instanceof ArrayIterator)) {
                throw new TypeError('Not an ArrayIterator');
              }
              if (typeof array !== 'undefined') {
                var len = ES.ToLength(array.length);
                if (i < len) {
                  //for (; i < len; i++) {
                  var kind = this.kind;
                  var retval;
                  if (kind === 'key') {
                    retval = i;
                  } else if (kind === 'value') {
                    retval = array[i];
                  } else if (kind === 'entry') {
                    retval = [i, array[i]];
                  }
                  this.i = i + 1;
                  return iteratorResult(retval);
                }
              }
              this.array = void 0;
              return iteratorResult();
            }
          });
          addIterator(ArrayIterator.prototype);

          /*
          var orderKeys = function orderKeys(a, b) {
          var aNumeric = String(ES.ToInteger(a)) === a;
          var bNumeric = String(ES.ToInteger(b)) === b;
          if (aNumeric && bNumeric) {
            return b - a;
          } else if (aNumeric && !bNumeric) {
            return -1;
          } else if (!aNumeric && bNumeric) {
            return 1;
          } else {
            return a.localeCompare(b);
          }
          };
          var getAllKeys = function getAllKeys(object) {
          var ownKeys = [];
          var keys = [];
            for (var key in object) {
            _push(_hasOwnProperty(object, key) ? ownKeys : keys, key);
          }
          _sort(ownKeys, orderKeys);
          _sort(keys, orderKeys);
            return _concat(ownKeys, keys);
          };
          */

          // note: this is positioned here because it depends on ArrayIterator
          var arrayOfSupportsSubclassing = Array.of === ArrayShims.of || function () {
            // Detects a bug in Webkit nightly r181886
            var Foo = function Foo(len) {
              this.length = len;
            };
            Foo.prototype = [];
            var fooArr = Array.of.apply(Foo, [1, 2]);
            return fooArr instanceof Foo && fooArr.length === 2;
          }();
          if (!arrayOfSupportsSubclassing) {
            overrideNative(Array, 'of', ArrayShims.of);
          }
          var ArrayPrototypeShims = {
            copyWithin: function copyWithin(target, start) {
              var o = ES.ToObject(this);
              var len = ES.ToLength(o.length);
              var relativeTarget = ES.ToInteger(target);
              var relativeStart = ES.ToInteger(start);
              var to = relativeTarget < 0 ? _max(len + relativeTarget, 0) : _min(relativeTarget, len);
              var from = relativeStart < 0 ? _max(len + relativeStart, 0) : _min(relativeStart, len);
              var end;
              if (arguments.length > 2) {
                end = arguments[2];
              }
              var relativeEnd = typeof end === 'undefined' ? len : ES.ToInteger(end);
              var finalItem = relativeEnd < 0 ? _max(len + relativeEnd, 0) : _min(relativeEnd, len);
              var count = _min(finalItem - from, len - to);
              var direction = 1;
              if (from < to && to < from + count) {
                direction = -1;
                from += count - 1;
                to += count - 1;
              }
              while (count > 0) {
                if (from in o) {
                  o[to] = o[from];
                } else {
                  delete o[to];
                }
                from += direction;
                to += direction;
                count -= 1;
              }
              return o;
            },
            fill: function fill(value) {
              var start;
              if (arguments.length > 1) {
                start = arguments[1];
              }
              var end;
              if (arguments.length > 2) {
                end = arguments[2];
              }
              var O = ES.ToObject(this);
              var len = ES.ToLength(O.length);
              start = ES.ToInteger(typeof start === 'undefined' ? 0 : start);
              end = ES.ToInteger(typeof end === 'undefined' ? len : end);
              var relativeStart = start < 0 ? _max(len + start, 0) : _min(start, len);
              var relativeEnd = end < 0 ? len + end : end;
              for (var i = relativeStart; i < len && i < relativeEnd; ++i) {
                O[i] = value;
              }
              return O;
            },
            find: function find(predicate) {
              var list = ES.ToObject(this);
              var length = ES.ToLength(list.length);
              if (!ES.IsCallable(predicate)) {
                throw new TypeError('Array#find: predicate must be a function');
              }
              var thisArg = arguments.length > 1 ? arguments[1] : null;
              for (var i = 0, value; i < length; i++) {
                value = list[i];
                if (thisArg) {
                  if (_call(predicate, thisArg, value, i, list)) {
                    return value;
                  }
                } else if (predicate(value, i, list)) {
                  return value;
                }
              }
            },
            findIndex: function findIndex(predicate) {
              var list = ES.ToObject(this);
              var length = ES.ToLength(list.length);
              if (!ES.IsCallable(predicate)) {
                throw new TypeError('Array#findIndex: predicate must be a function');
              }
              var thisArg = arguments.length > 1 ? arguments[1] : null;
              for (var i = 0; i < length; i++) {
                if (thisArg) {
                  if (_call(predicate, thisArg, list[i], i, list)) {
                    return i;
                  }
                } else if (predicate(list[i], i, list)) {
                  return i;
                }
              }
              return -1;
            },
            keys: function keys() {
              return new ArrayIterator(this, 'key');
            },
            values: function values() {
              return new ArrayIterator(this, 'value');
            },
            entries: function entries() {
              return new ArrayIterator(this, 'entry');
            }
          };
          // Safari 7.1 defines Array#keys and Array#entries natively,
          // but the resulting ArrayIterator objects don't have a "next" method.
          if (Array.prototype.keys && !ES.IsCallable([1].keys().next)) {
            delete Array.prototype.keys;
          }
          if (Array.prototype.entries && !ES.IsCallable([1].entries().next)) {
            delete Array.prototype.entries;
          }

          // Chrome 38 defines Array#keys and Array#entries, and Array#@@iterator, but not Array#values
          if (Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[$iterator$]) {
            defineProperties(Array.prototype, {
              values: Array.prototype[$iterator$]
            });
            if (Type.symbol(_Symbol.unscopables)) {
              Array.prototype[_Symbol.unscopables].values = true;
            }
          }
          // Chrome 40 defines Array#values with the incorrect name, although Array#{keys,entries} have the correct name
          if (functionsHaveNames && Array.prototype.values && Array.prototype.values.name !== 'values') {
            var originalArrayPrototypeValues = Array.prototype.values;
            overrideNative(Array.prototype, 'values', function values() {
              return ES.Call(originalArrayPrototypeValues, this, arguments);
            });
            defineProperty(Array.prototype, $iterator$, Array.prototype.values, true);
          }
          defineProperties(Array.prototype, ArrayPrototypeShims);
          if (1 / [true].indexOf(true, -0) < 0) {
            // indexOf when given a position arg of -0 should return +0.
            // https://github.com/tc39/ecma262/pull/316
            defineProperty(Array.prototype, 'indexOf', function indexOf(searchElement) {
              var value = _arrayIndexOfApply(this, arguments);
              if (value === 0 && 1 / value < 0) {
                return 0;
              }
              return value;
            }, true);
          }
          addIterator(Array.prototype, function () {
            return this.values();
          });
          // Chrome defines keys/values/entries on Array, but doesn't give us
          // any way to identify its iterator.  So add our own shimmed field.
          if (Object.getPrototypeOf) {
            var ChromeArrayIterator = Object.getPrototypeOf([].values());
            if (ChromeArrayIterator) {
              // in WSH, this is `undefined`
              addIterator(ChromeArrayIterator);
            }
          }

          // note: this is positioned here because it relies on Array#entries
          var arrayFromSwallowsNegativeLengths = function () {
            // Detects a Firefox bug in v32
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1063993
            return valueOrFalseIfThrows(function () {
              return Array.from({
                length: -1
              }).length === 0;
            });
          }();
          var arrayFromHandlesIterables = function () {
            // Detects a bug in Webkit nightly r181886
            var arr = Array.from([0].entries());
            return arr.length === 1 && isArray(arr[0]) && arr[0][0] === 0 && arr[0][1] === 0;
          }();
          if (!arrayFromSwallowsNegativeLengths || !arrayFromHandlesIterables) {
            overrideNative(Array, 'from', ArrayShims.from);
          }
          var arrayFromHandlesUndefinedMapFunction = function () {
            // Microsoft Edge v0.11 throws if the mapFn argument is *provided* but undefined,
            // but the spec doesn't care if it's provided or not - undefined doesn't throw.
            return valueOrFalseIfThrows(function () {
              return Array.from([0], void 0);
            });
          }();
          if (!arrayFromHandlesUndefinedMapFunction) {
            var origArrayFrom = Array.from;
            overrideNative(Array, 'from', function from(items) {
              if (arguments.length > 1 && typeof arguments[1] !== 'undefined') {
                return ES.Call(origArrayFrom, this, arguments);
              }
              return _call(origArrayFrom, this, items);
            });
          }
          var int32sAsOne = -(Math.pow(2, 32) - 1);
          var toLengthsCorrectly = function toLengthsCorrectly(method, reversed) {
            var obj = {
              length: int32sAsOne
            };
            obj[reversed ? (obj.length >>> 0) - 1 : 0] = true;
            return valueOrFalseIfThrows(function () {
              _call(method, obj, function () {
                // note: in nonconforming browsers, this will be called
                // -1 >>> 0 times, which is 4294967295, so the throw matters.
                throw new RangeError('should not reach here');
              }, []);
              return true;
            });
          };
          if (!toLengthsCorrectly(Array.prototype.forEach)) {
            var originalForEach = Array.prototype.forEach;
            overrideNative(Array.prototype, 'forEach', function forEach(callbackFn) {
              return ES.Call(originalForEach, this.length >= 0 ? this : [], arguments);
            });
          }
          if (!toLengthsCorrectly(Array.prototype.map)) {
            var originalMap = Array.prototype.map;
            overrideNative(Array.prototype, 'map', function map(callbackFn) {
              return ES.Call(originalMap, this.length >= 0 ? this : [], arguments);
            });
          }
          if (!toLengthsCorrectly(Array.prototype.filter)) {
            var originalFilter = Array.prototype.filter;
            overrideNative(Array.prototype, 'filter', function filter(callbackFn) {
              return ES.Call(originalFilter, this.length >= 0 ? this : [], arguments);
            });
          }
          if (!toLengthsCorrectly(Array.prototype.some)) {
            var originalSome = Array.prototype.some;
            overrideNative(Array.prototype, 'some', function some(callbackFn) {
              return ES.Call(originalSome, this.length >= 0 ? this : [], arguments);
            });
          }
          if (!toLengthsCorrectly(Array.prototype.every)) {
            var originalEvery = Array.prototype.every;
            overrideNative(Array.prototype, 'every', function every(callbackFn) {
              return ES.Call(originalEvery, this.length >= 0 ? this : [], arguments);
            });
          }
          if (!toLengthsCorrectly(Array.prototype.reduce)) {
            var originalReduce = Array.prototype.reduce;
            overrideNative(Array.prototype, 'reduce', function reduce(callbackFn) {
              return ES.Call(originalReduce, this.length >= 0 ? this : [], arguments);
            });
          }
          if (!toLengthsCorrectly(Array.prototype.reduceRight, true)) {
            var originalReduceRight = Array.prototype.reduceRight;
            overrideNative(Array.prototype, 'reduceRight', function reduceRight(callbackFn) {
              return ES.Call(originalReduceRight, this.length >= 0 ? this : [], arguments);
            });
          }
          var lacksOctalSupport = Number('0o10') !== 8;
          var lacksBinarySupport = Number('0b10') !== 2;
          var trimsNonWhitespace = _some(nonWS, function (c) {
            return Number(c + 0 + c) === 0;
          });
          if (lacksOctalSupport || lacksBinarySupport || trimsNonWhitespace) {
            var OrigNumber = Number;
            var binaryRegex = /^0b[01]+$/i;
            var octalRegex = /^0o[0-7]+$/i;
            // Note that in IE 8, RegExp.prototype.test doesn't seem to exist: ie, "test" is an own property of regexes. wtf.
            var isBinary = binaryRegex.test.bind(binaryRegex);
            var isOctal = octalRegex.test.bind(octalRegex);
            var toPrimitive = function toPrimitive(O, hint) {
              // need to replace this with `es-to-primitive/es6`
              var result;
              if (typeof O.valueOf === 'function') {
                result = O.valueOf();
                if (Type.primitive(result)) {
                  return result;
                }
              }
              if (typeof O.toString === 'function') {
                result = O.toString();
                if (Type.primitive(result)) {
                  return result;
                }
              }
              throw new TypeError('No default value');
            };
            var hasNonWS = nonWSregex.test.bind(nonWSregex);
            var isBadHex = isBadHexRegex.test.bind(isBadHexRegex);
            var NumberShim = function () {
              // this is wrapped in an IIFE because of IE 6-8's wacky scoping issues with named function expressions.
              var NumberShim = function Number(value) {
                var primValue;
                if (arguments.length > 0) {
                  primValue = Type.primitive(value) ? value : toPrimitive(value, 'number');
                } else {
                  primValue = 0;
                }
                if (typeof primValue === 'string') {
                  primValue = ES.Call(trimShim, primValue);
                  if (isBinary(primValue)) {
                    primValue = parseInt(_strSlice(primValue, 2), 2);
                  } else if (isOctal(primValue)) {
                    primValue = parseInt(_strSlice(primValue, 2), 8);
                  } else if (hasNonWS(primValue) || isBadHex(primValue)) {
                    primValue = NaN;
                  }
                }
                var receiver = this;
                var valueOfSucceeds = valueOrFalseIfThrows(function () {
                  OrigNumber.prototype.valueOf.call(receiver);
                  return true;
                });
                if (receiver instanceof NumberShim && !valueOfSucceeds) {
                  return new OrigNumber(primValue);
                }
                return OrigNumber(primValue);
              };
              return NumberShim;
            }();
            wrapConstructor(OrigNumber, NumberShim, {});
            // this is necessary for ES3 browsers, where these properties are non-enumerable.
            defineProperties(NumberShim, {
              NaN: OrigNumber.NaN,
              MAX_VALUE: OrigNumber.MAX_VALUE,
              MIN_VALUE: OrigNumber.MIN_VALUE,
              NEGATIVE_INFINITY: OrigNumber.NEGATIVE_INFINITY,
              POSITIVE_INFINITY: OrigNumber.POSITIVE_INFINITY
            });
            Number = NumberShim; // eslint-disable-line no-global-assign
            Value.redefine(globals, 'Number', NumberShim);
          }
          var maxSafeInteger = Math.pow(2, 53) - 1;
          defineProperties(Number, {
            MAX_SAFE_INTEGER: maxSafeInteger,
            MIN_SAFE_INTEGER: -maxSafeInteger,
            EPSILON: 2.220446049250313e-16,
            parseInt: globals.parseInt,
            parseFloat: globals.parseFloat,
            isFinite: numberIsFinite,
            isInteger: function isInteger(value) {
              return numberIsFinite(value) && ES.ToInteger(value) === value;
            },
            isSafeInteger: function isSafeInteger(value) {
              return Number.isInteger(value) && _abs(value) <= Number.MAX_SAFE_INTEGER;
            },
            isNaN: numberIsNaN
          });
          // Firefox 37 has a conforming Number.parseInt, but it's not === to the global parseInt (fixed in v40)
          defineProperty(Number, 'parseInt', globals.parseInt, Number.parseInt !== globals.parseInt);

          // Work around bugs in Array#find and Array#findIndex -- early
          // implementations skipped holes in sparse arrays. (Note that the
          // implementations of find/findIndex indirectly use shimmed
          // methods of Number, so this test has to happen down here.)
          /* eslint-disable no-sparse-arrays */
          if ([, 1].find(function () {
            return true;
          }) === 1) {
            overrideNative(Array.prototype, 'find', ArrayPrototypeShims.find);
          }
          if ([, 1].findIndex(function () {
            return true;
          }) !== 0) {
            overrideNative(Array.prototype, 'findIndex', ArrayPrototypeShims.findIndex);
          }
          /* eslint-enable no-sparse-arrays */

          var isEnumerableOn = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable);
          var ensureEnumerable = function ensureEnumerable(obj, prop) {
            if (supportsDescriptors && isEnumerableOn(obj, prop)) {
              Object.defineProperty(obj, prop, {
                enumerable: false
              });
            }
          };
          var sliceArgs = function sliceArgs() {
            // per https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
            // and https://gist.github.com/WebReflection/4327762cb87a8c634a29
            var initial = Number(this);
            var len = arguments.length;
            var desiredArgCount = len - initial;
            var args = new Array(desiredArgCount < 0 ? 0 : desiredArgCount);
            for (var i = initial; i < len; ++i) {
              args[i - initial] = arguments[i];
            }
            return args;
          };
          var assignTo = function assignTo(source) {
            return function assignToSource(target, key) {
              target[key] = source[key];
              return target;
            };
          };
          var assignReducer = function assignReducer(target, source) {
            var sourceKeys = keys(Object(source));
            var symbols;
            if (ES.IsCallable(Object.getOwnPropertySymbols)) {
              symbols = _filter(Object.getOwnPropertySymbols(Object(source)), isEnumerableOn(source));
            }
            return _reduce(_concat(sourceKeys, symbols || []), assignTo(source), target);
          };
          var ObjectShims = {
            // 19.1.3.1
            assign: function assign(target, source) {
              var to = ES.ToObject(target, 'Cannot convert undefined or null to object');
              return _reduce(ES.Call(sliceArgs, 1, arguments), assignReducer, to);
            },
            // Added in WebKit in https://bugs.webkit.org/show_bug.cgi?id=143865
            is: function is(a, b) {
              return ES.SameValue(a, b);
            }
          };
          var assignHasPendingExceptions = Object.assign && Object.preventExtensions && function () {
            // Firefox 37 still has "pending exception" logic in its Object.assign implementation,
            // which is 72% slower than our shim, and Firefox 40's native implementation.
            var thrower = Object.preventExtensions({
              1: 2
            });
            try {
              Object.assign(thrower, 'xy');
            } catch (e) {
              return thrower[1] === 'y';
            }
          }();
          if (assignHasPendingExceptions) {
            overrideNative(Object, 'assign', ObjectShims.assign);
          }
          defineProperties(Object, ObjectShims);
          if (supportsDescriptors) {
            var ES5ObjectShims = {
              // 19.1.3.9
              // shim from https://gist.github.com/WebReflection/5593554
              setPrototypeOf: function (Object) {
                var set;
                var checkArgs = function checkArgs(O, proto) {
                  if (!ES.TypeIsObject(O)) {
                    throw new TypeError('cannot set prototype on a non-object');
                  }
                  if (!(proto === null || ES.TypeIsObject(proto))) {
                    throw new TypeError('can only set prototype to an object or null' + proto);
                  }
                };
                var setPrototypeOf = function setPrototypeOf(O, proto) {
                  checkArgs(O, proto);
                  _call(set, O, proto);
                  return O;
                };
                try {
                  // this works already in Firefox and Safari
                  set = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
                  _call(set, {}, null);
                } catch (e) {
                  if (Object.prototype !== {}.__proto__) {
                    // eslint-disable-line no-proto
                    // IE < 11 cannot be shimmed
                    return;
                  }
                  // probably Chrome or some old Mobile stock browser
                  set = function set(proto) {
                    this.__proto__ = proto; // eslint-disable-line no-proto
                  };
                  // please note that this will **not** work
                  // in those browsers that do not inherit
                  // __proto__ by mistake from Object.prototype
                  // in these cases we should probably throw an error
                  // or at least be informed about the issue
                  setPrototypeOf.polyfill = setPrototypeOf(setPrototypeOf({}, null), Object.prototype) instanceof Object;
                  // setPrototypeOf.polyfill === true means it works as meant
                  // setPrototypeOf.polyfill === false means it's not 100% reliable
                  // setPrototypeOf.polyfill === undefined
                  // or
                  // setPrototypeOf.polyfill ==  null means it's not a polyfill
                  // which means it works as expected
                  // we can even delete Object.prototype.__proto__;
                }
                return setPrototypeOf;
              }(Object)
            };
            defineProperties(Object, ES5ObjectShims);
          }

          // Workaround bug in Opera 12 where setPrototypeOf(x, null) doesn't work,
          // but Object.create(null) does.
          if (Object.setPrototypeOf && Object.getPrototypeOf && Object.getPrototypeOf(Object.setPrototypeOf({}, null)) !== null && Object.getPrototypeOf(Object.create(null)) === null) {
            (function () {
              var FAKENULL = Object.create(null);
              var gpo = Object.getPrototypeOf;
              var spo = Object.setPrototypeOf;
              Object.getPrototypeOf = function (o) {
                var result = gpo(o);
                return result === FAKENULL ? null : result;
              };
              Object.setPrototypeOf = function (o, p) {
                var proto = p === null ? FAKENULL : p;
                return spo(o, proto);
              };
              Object.setPrototypeOf.polyfill = false;
            })();
          }
          var objectKeysAcceptsPrimitives = !throwsError(function () {
            return Object.keys('foo');
          });
          if (!objectKeysAcceptsPrimitives) {
            var originalObjectKeys = Object.keys;
            overrideNative(Object, 'keys', function keys(value) {
              return originalObjectKeys(ES.ToObject(value));
            });
            keys = Object.keys;
          }
          var objectKeysRejectsRegex = throwsError(function () {
            return Object.keys(/a/g);
          });
          if (objectKeysRejectsRegex) {
            var regexRejectingObjectKeys = Object.keys;
            overrideNative(Object, 'keys', function keys(value) {
              if (Type.regex(value)) {
                var regexKeys = [];
                for (var k in value) {
                  if (_hasOwnProperty(value, k)) {
                    _push(regexKeys, k);
                  }
                }
                return regexKeys;
              }
              return regexRejectingObjectKeys(value);
            });
            keys = Object.keys;
          }
          if (Object.getOwnPropertyNames) {
            var objectGOPNAcceptsPrimitives = !throwsError(function () {
              return Object.getOwnPropertyNames('foo');
            });
            if (!objectGOPNAcceptsPrimitives) {
              var cachedWindowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? Object.getOwnPropertyNames(window) : [];
              var originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
              overrideNative(Object, 'getOwnPropertyNames', function getOwnPropertyNames(value) {
                var val = ES.ToObject(value);
                if (_toString(val) === '[object Window]') {
                  try {
                    return originalObjectGetOwnPropertyNames(val);
                  } catch (e) {
                    // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
                    return _concat([], cachedWindowNames);
                  }
                }
                return originalObjectGetOwnPropertyNames(val);
              });
            }
          }
          if (Object.getOwnPropertyDescriptor) {
            var objectGOPDAcceptsPrimitives = !throwsError(function () {
              return Object.getOwnPropertyDescriptor('foo', 'bar');
            });
            if (!objectGOPDAcceptsPrimitives) {
              var originalObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              overrideNative(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(value, property) {
                return originalObjectGetOwnPropertyDescriptor(ES.ToObject(value), property);
              });
            }
          }
          if (Object.seal) {
            var objectSealAcceptsPrimitives = !throwsError(function () {
              return Object.seal('foo');
            });
            if (!objectSealAcceptsPrimitives) {
              var originalObjectSeal = Object.seal;
              overrideNative(Object, 'seal', function seal(value) {
                if (!ES.TypeIsObject(value)) {
                  return value;
                }
                return originalObjectSeal(value);
              });
            }
          }
          if (Object.isSealed) {
            var objectIsSealedAcceptsPrimitives = !throwsError(function () {
              return Object.isSealed('foo');
            });
            if (!objectIsSealedAcceptsPrimitives) {
              var originalObjectIsSealed = Object.isSealed;
              overrideNative(Object, 'isSealed', function isSealed(value) {
                if (!ES.TypeIsObject(value)) {
                  return true;
                }
                return originalObjectIsSealed(value);
              });
            }
          }
          if (Object.freeze) {
            var objectFreezeAcceptsPrimitives = !throwsError(function () {
              return Object.freeze('foo');
            });
            if (!objectFreezeAcceptsPrimitives) {
              var originalObjectFreeze = Object.freeze;
              overrideNative(Object, 'freeze', function freeze(value) {
                if (!ES.TypeIsObject(value)) {
                  return value;
                }
                return originalObjectFreeze(value);
              });
            }
          }
          if (Object.isFrozen) {
            var objectIsFrozenAcceptsPrimitives = !throwsError(function () {
              return Object.isFrozen('foo');
            });
            if (!objectIsFrozenAcceptsPrimitives) {
              var originalObjectIsFrozen = Object.isFrozen;
              overrideNative(Object, 'isFrozen', function isFrozen(value) {
                if (!ES.TypeIsObject(value)) {
                  return true;
                }
                return originalObjectIsFrozen(value);
              });
            }
          }
          if (Object.preventExtensions) {
            var objectPreventExtensionsAcceptsPrimitives = !throwsError(function () {
              return Object.preventExtensions('foo');
            });
            if (!objectPreventExtensionsAcceptsPrimitives) {
              var originalObjectPreventExtensions = Object.preventExtensions;
              overrideNative(Object, 'preventExtensions', function preventExtensions(value) {
                if (!ES.TypeIsObject(value)) {
                  return value;
                }
                return originalObjectPreventExtensions(value);
              });
            }
          }
          if (Object.isExtensible) {
            var objectIsExtensibleAcceptsPrimitives = !throwsError(function () {
              return Object.isExtensible('foo');
            });
            if (!objectIsExtensibleAcceptsPrimitives) {
              var originalObjectIsExtensible = Object.isExtensible;
              overrideNative(Object, 'isExtensible', function isExtensible(value) {
                if (!ES.TypeIsObject(value)) {
                  return false;
                }
                return originalObjectIsExtensible(value);
              });
            }
          }
          if (Object.getPrototypeOf) {
            var objectGetProtoAcceptsPrimitives = !throwsError(function () {
              return Object.getPrototypeOf('foo');
            });
            if (!objectGetProtoAcceptsPrimitives) {
              var originalGetProto = Object.getPrototypeOf;
              overrideNative(Object, 'getPrototypeOf', function getPrototypeOf(value) {
                return originalGetProto(ES.ToObject(value));
              });
            }
          }
          var hasFlags = supportsDescriptors && function () {
            var desc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');
            return desc && ES.IsCallable(desc.get);
          }();
          if (supportsDescriptors && !hasFlags) {
            var regExpFlagsGetter = function flags() {
              if (!ES.TypeIsObject(this)) {
                throw new TypeError('Method called on incompatible type: must be an object.');
              }
              var result = '';
              if (this.global) {
                result += 'g';
              }
              if (this.ignoreCase) {
                result += 'i';
              }
              if (this.multiline) {
                result += 'm';
              }
              if (this.unicode) {
                result += 'u';
              }
              if (this.sticky) {
                result += 'y';
              }
              return result;
            };
            Value.getter(RegExp.prototype, 'flags', regExpFlagsGetter);
          }
          var regExpSupportsFlagsWithRegex = supportsDescriptors && valueOrFalseIfThrows(function () {
            return String(new RegExp(/a/g, 'i')) === '/a/i';
          });
          var regExpNeedsToSupportSymbolMatch = hasSymbols && supportsDescriptors && function () {
            // Edge 0.12 supports flags fully, but does not support Symbol.match
            var regex = /./;
            regex[_Symbol.match] = false;
            return RegExp(regex) === regex;
          }();
          var regexToStringIsGeneric = valueOrFalseIfThrows(function () {
            return RegExp.prototype.toString.call({
              source: 'abc'
            }) === '/abc/';
          });
          var regexToStringSupportsGenericFlags = regexToStringIsGeneric && valueOrFalseIfThrows(function () {
            return RegExp.prototype.toString.call({
              source: 'a',
              flags: 'b'
            }) === '/a/b';
          });
          if (!regexToStringIsGeneric || !regexToStringSupportsGenericFlags) {
            var origRegExpToString = RegExp.prototype.toString;
            defineProperty(RegExp.prototype, 'toString', function toString() {
              var R = ES.RequireObjectCoercible(this);
              if (Type.regex(R)) {
                return _call(origRegExpToString, R);
              }
              var pattern = $String(R.source);
              var flags = $String(R.flags);
              return '/' + pattern + '/' + flags;
            }, true);
            Value.preserveToString(RegExp.prototype.toString, origRegExpToString);
            RegExp.prototype.toString.prototype = void 0;
          }
          if (supportsDescriptors && (!regExpSupportsFlagsWithRegex || regExpNeedsToSupportSymbolMatch)) {
            var flagsGetter = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get;
            var sourceDesc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'source') || {};
            var legacySourceGetter = function legacySourceGetter() {
              // prior to it being a getter, it's own + nonconfigurable
              return this.source;
            };
            var sourceGetter = ES.IsCallable(sourceDesc.get) ? sourceDesc.get : legacySourceGetter;
            var OrigRegExp = RegExp;
            var RegExpShim = function () {
              return function RegExp(pattern, flags) {
                var patternIsRegExp = ES.IsRegExp(pattern);
                var calledWithNew = this instanceof RegExp;
                if (!calledWithNew && patternIsRegExp && typeof flags === 'undefined' && pattern.constructor === RegExp) {
                  return pattern;
                }
                var P = pattern;
                var F = flags;
                if (Type.regex(pattern)) {
                  P = ES.Call(sourceGetter, pattern);
                  F = typeof flags === 'undefined' ? ES.Call(flagsGetter, pattern) : flags;
                  return new RegExp(P, F);
                } else if (patternIsRegExp) {
                  P = pattern.source;
                  F = typeof flags === 'undefined' ? pattern.flags : flags;
                }
                return new OrigRegExp(pattern, flags);
              };
            }();
            wrapConstructor(OrigRegExp, RegExpShim, {
              $input: true // Chrome < v39 & Opera < 26 have a nonstandard "$input" property
            });
            RegExp = RegExpShim; // eslint-disable-line no-global-assign
            Value.redefine(globals, 'RegExp', RegExpShim);
          }
          if (supportsDescriptors) {
            var regexGlobals = {
              input: '$_',
              lastMatch: '$&',
              lastParen: '$+',
              leftContext: '$`',
              rightContext: "$'"
            };
            _forEach(keys(regexGlobals), function (prop) {
              if (prop in RegExp && !(regexGlobals[prop] in RegExp)) {
                Value.getter(RegExp, regexGlobals[prop], function get() {
                  return RegExp[prop];
                });
              }
            });
          }
          addDefaultSpecies(RegExp);
          var inverseEpsilon = 1 / Number.EPSILON;
          var roundTiesToEven = function roundTiesToEven(n) {
            // Even though this reduces down to `return n`, it takes advantage of built-in rounding.
            return n + inverseEpsilon - inverseEpsilon;
          };
          var BINARY_32_EPSILON = Math.pow(2, -23);
          var BINARY_32_MAX_VALUE = Math.pow(2, 127) * (2 - BINARY_32_EPSILON);
          var BINARY_32_MIN_VALUE = Math.pow(2, -126);
          var E = Math.E;
          var LOG2E = Math.LOG2E;
          var LOG10E = Math.LOG10E;
          var numberCLZ = Number.prototype.clz;
          delete Number.prototype.clz; // Safari 8 has Number#clz

          var MathShims = {
            acosh: function acosh(value) {
              var x = Number(value);
              if (numberIsNaN(x) || value < 1) {
                return NaN;
              }
              if (x === 1) {
                return 0;
              }
              if (x === Infinity) {
                return x;
              }
              var xInvSquared = 1 / (x * x);
              if (x < 2) {
                return _log1p(x - 1 + _sqrt(1 - xInvSquared) * x);
              }
              var halfX = x / 2;
              return _log1p(halfX + _sqrt(1 - xInvSquared) * halfX - 1) + 1 / LOG2E;
            },
            asinh: function asinh(value) {
              var x = Number(value);
              if (x === 0 || !globalIsFinite(x)) {
                return x;
              }
              var a = _abs(x);
              var aSquared = a * a;
              var s = _sign(x);
              if (a < 1) {
                return s * _log1p(a + aSquared / (_sqrt(aSquared + 1) + 1));
              }
              return s * (_log1p(a / 2 + _sqrt(1 + 1 / aSquared) * a / 2 - 1) + 1 / LOG2E);
            },
            atanh: function atanh(value) {
              var x = Number(value);
              if (x === 0) {
                return x;
              }
              if (x === -1) {
                return -Infinity;
              }
              if (x === 1) {
                return Infinity;
              }
              if (numberIsNaN(x) || x < -1 || x > 1) {
                return NaN;
              }
              var a = _abs(x);
              return _sign(x) * _log1p(2 * a / (1 - a)) / 2;
            },
            cbrt: function cbrt(value) {
              var x = Number(value);
              if (x === 0) {
                return x;
              }
              var negate = x < 0;
              var result;
              if (negate) {
                x = -x;
              }
              if (x === Infinity) {
                result = Infinity;
              } else {
                result = _exp(_log(x) / 3);
                // from http://en.wikipedia.org/wiki/Cube_root#Numerical_methods
                result = (x / (result * result) + 2 * result) / 3;
              }
              return negate ? -result : result;
            },
            clz32: function clz32(value) {
              // See https://bugs.ecmascript.org/show_bug.cgi?id=2465
              var x = Number(value);
              var number = ES.ToUint32(x);
              if (number === 0) {
                return 32;
              }
              return numberCLZ ? ES.Call(numberCLZ, number) : 31 - _floor(_log(number + 0.5) * LOG2E);
            },
            cosh: function cosh(value) {
              var x = Number(value);
              if (x === 0) {
                return 1;
              } // +0 or -0
              if (numberIsNaN(x)) {
                return NaN;
              }
              if (!globalIsFinite(x)) {
                return Infinity;
              }
              var t = _exp(_abs(x) - 1);
              return (t + 1 / (t * E * E)) * (E / 2);
            },
            expm1: function expm1(value) {
              var x = Number(value);
              if (x === -Infinity) {
                return -1;
              }
              if (!globalIsFinite(x) || x === 0) {
                return x;
              }
              if (_abs(x) > 0.5) {
                return _exp(x) - 1;
              }
              // A more precise approximation using Taylor series expansion
              // from https://github.com/paulmillr/es6-shim/issues/314#issuecomment-70293986
              var t = x;
              var sum = 0;
              var n = 1;
              while (sum + t !== sum) {
                sum += t;
                n += 1;
                t *= x / n;
              }
              return sum;
            },
            hypot: function hypot(x, y) {
              var result = 0;
              var largest = 0;
              for (var i = 0; i < arguments.length; ++i) {
                var value = _abs(Number(arguments[i]));
                if (largest < value) {
                  result *= largest / value * (largest / value);
                  result += 1;
                  largest = value;
                } else {
                  result += value > 0 ? value / largest * (value / largest) : value;
                }
              }
              return largest === Infinity ? Infinity : largest * _sqrt(result);
            },
            log2: function log2(value) {
              return _log(value) * LOG2E;
            },
            log10: function log10(value) {
              return _log(value) * LOG10E;
            },
            log1p: _log1p,
            sign: _sign,
            sinh: function sinh(value) {
              var x = Number(value);
              if (!globalIsFinite(x) || x === 0) {
                return x;
              }
              var a = _abs(x);
              if (a < 1) {
                var u = Math.expm1(a);
                return _sign(x) * u * (1 + 1 / (u + 1)) / 2;
              }
              var t = _exp(a - 1);
              return _sign(x) * (t - 1 / (t * E * E)) * (E / 2);
            },
            tanh: function tanh(value) {
              var x = Number(value);
              if (numberIsNaN(x) || x === 0) {
                return x;
              }
              // can exit early at +-20 as JS loses precision for true value at this integer
              if (x >= 20) {
                return 1;
              }
              if (x <= -20) {
                return -1;
              }
              return (Math.expm1(x) - Math.expm1(-x)) / (_exp(x) + _exp(-x));
            },
            trunc: function trunc(value) {
              var x = Number(value);
              return x < 0 ? -_floor(-x) : _floor(x);
            },
            imul: function imul(x, y) {
              // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
              var a = ES.ToUint32(x);
              var b = ES.ToUint32(y);
              var ah = a >>> 16 & 0xffff;
              var al = a & 0xffff;
              var bh = b >>> 16 & 0xffff;
              var bl = b & 0xffff;
              // the shift by 0 fixes the sign on the high part
              // the final |0 converts the unsigned value into a signed value
              return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
            },
            fround: function fround(x) {
              var v = Number(x);
              if (v === 0 || v === Infinity || v === -Infinity || numberIsNaN(v)) {
                return v;
              }
              var sign = _sign(v);
              var abs = _abs(v);
              if (abs < BINARY_32_MIN_VALUE) {
                return sign * roundTiesToEven(abs / BINARY_32_MIN_VALUE / BINARY_32_EPSILON) * BINARY_32_MIN_VALUE * BINARY_32_EPSILON;
              }
              // Veltkamp's splitting (?)
              var a = (1 + BINARY_32_EPSILON / Number.EPSILON) * abs;
              var result = a - (a - abs);
              if (result > BINARY_32_MAX_VALUE || numberIsNaN(result)) {
                return sign * Infinity;
              }
              return sign * result;
            }
          };
          var withinULPDistance = function withinULPDistance(result, expected, distance) {
            return _abs(1 - result / expected) / Number.EPSILON < (distance || 8);
          };
          defineProperties(Math, MathShims);
          // Chrome < 40 sinh returns ∞ for large numbers
          defineProperty(Math, 'sinh', MathShims.sinh, Math.sinh(710) === Infinity);
          // Chrome < 40 cosh returns ∞ for large numbers
          defineProperty(Math, 'cosh', MathShims.cosh, Math.cosh(710) === Infinity);
          // IE 11 TP has an imprecise log1p: reports Math.log1p(-1e-17) as 0
          defineProperty(Math, 'log1p', MathShims.log1p, Math.log1p(-1e-17) !== -1e-17);
          // IE 11 TP has an imprecise asinh: reports Math.asinh(-1e7) as not exactly equal to -Math.asinh(1e7)
          defineProperty(Math, 'asinh', MathShims.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
          // Chrome < 54 asinh returns ∞ for large numbers and should not
          defineProperty(Math, 'asinh', MathShims.asinh, Math.asinh(1e300) === Infinity);
          // Chrome < 54 atanh incorrectly returns 0 for large numbers
          defineProperty(Math, 'atanh', MathShims.atanh, Math.atanh(1e-300) === 0);
          // Chrome 40 has an imprecise Math.tanh with very small numbers
          defineProperty(Math, 'tanh', MathShims.tanh, Math.tanh(-2e-17) !== -2e-17);
          // Chrome 40 loses Math.acosh precision with high numbers
          defineProperty(Math, 'acosh', MathShims.acosh, Math.acosh(Number.MAX_VALUE) === Infinity);
          // Chrome < 54 has an inaccurate acosh for EPSILON deltas
          defineProperty(Math, 'acosh', MathShims.acosh, !withinULPDistance(Math.acosh(1 + Number.EPSILON), Math.sqrt(2 * Number.EPSILON)));
          // Firefox 38 on Windows
          defineProperty(Math, 'cbrt', MathShims.cbrt, !withinULPDistance(Math.cbrt(1e-300), 1e-100));
          // node 0.11 has an imprecise Math.sinh with very small numbers
          defineProperty(Math, 'sinh', MathShims.sinh, Math.sinh(-2e-17) !== -2e-17);
          // FF 35 on Linux reports 22025.465794806725 for Math.expm1(10)
          var expm1OfTen = Math.expm1(10);
          defineProperty(Math, 'expm1', MathShims.expm1, expm1OfTen > 22025.465794806719 || expm1OfTen < 22025.4657948067165168);
          // node v12.11 - v12.15 report NaN
          defineProperty(Math, 'hypot', MathShims.hypot, Math.hypot(Infinity, NaN) !== Infinity);
          var origMathRound = Math.round;
          // breaks in e.g. Safari 8, Internet Explorer 11, Opera 12
          var roundHandlesBoundaryConditions = Math.round(0.5 - Number.EPSILON / 4) === 0 && Math.round(-0.5 + Number.EPSILON / 3.99) === 1;

          // When engines use Math.floor(x + 0.5) internally, Math.round can be buggy for large integers.
          // This behavior should be governed by "round to nearest, ties to even mode"
          // see http://www.ecma-international.org/ecma-262/6.0/#sec-terms-and-definitions-number-type
          // These are the boundary cases where it breaks.
          var smallestPositiveNumberWhereRoundBreaks = inverseEpsilon + 1;
          var largestPositiveNumberWhereRoundBreaks = 2 * inverseEpsilon - 1;
          var roundDoesNotIncreaseIntegers = [smallestPositiveNumberWhereRoundBreaks, largestPositiveNumberWhereRoundBreaks].every(function (num) {
            return Math.round(num) === num;
          });
          defineProperty(Math, 'round', function round(x) {
            var floor = _floor(x);
            var ceil = floor === -1 ? -0 : floor + 1;
            return x - floor < 0.5 ? floor : ceil;
          }, !roundHandlesBoundaryConditions || !roundDoesNotIncreaseIntegers);
          Value.preserveToString(Math.round, origMathRound);
          var origImul = Math.imul;
          if (Math.imul(0xffffffff, 5) !== -5) {
            // Safari 6.1, at least, reports "0" for this value
            Math.imul = MathShims.imul;
            Value.preserveToString(Math.imul, origImul);
          }
          if (Math.imul.length !== 2) {
            // Safari 8.0.4 has a length of 1
            // fixed in https://bugs.webkit.org/show_bug.cgi?id=143658
            overrideNative(Math, 'imul', function imul(x, y) {
              return ES.Call(origImul, Math, arguments);
            });
          }

          // Promises
          // Simplest possible implementation; use a 3rd-party library if you
          // want the best possible speed and/or long stack traces.
          var PromiseShim = function () {
            var setTimeout = globals.setTimeout;
            // some environments don't have setTimeout - no way to shim here.
            if (typeof setTimeout !== 'function' && _typeof(setTimeout) !== 'object') {
              return;
            }
            ES.IsPromise = function (promise) {
              if (!ES.TypeIsObject(promise)) {
                return false;
              }
              if (typeof promise._promise === 'undefined') {
                return false; // uninitialized, or missing our hidden field.
              }
              return true;
            };

            // "PromiseCapability" in the spec is what most promise implementations
            // call a "deferred".
            var PromiseCapability = function PromiseCapability(C) {
              if (!ES.IsConstructor(C)) {
                throw new TypeError('Bad promise constructor');
              }
              var capability = this;
              var resolver = function resolver(resolve, reject) {
                if (capability.resolve !== void 0 || capability.reject !== void 0) {
                  throw new TypeError('Bad Promise implementation!');
                }
                capability.resolve = resolve;
                capability.reject = reject;
              };
              // Initialize fields to inform optimizers about the object shape.
              capability.resolve = void 0;
              capability.reject = void 0;
              capability.promise = new C(resolver);
              if (!(ES.IsCallable(capability.resolve) && ES.IsCallable(capability.reject))) {
                throw new TypeError('Bad promise constructor');
              }
            };

            // find an appropriate setImmediate-alike
            var makeZeroTimeout;
            if (typeof window !== 'undefined' && ES.IsCallable(window.postMessage)) {
              makeZeroTimeout = function makeZeroTimeout() {
                // from http://dbaron.org/log/20100309-faster-timeouts
                var timeouts = [];
                var messageName = 'zero-timeout-message';
                var setZeroTimeout = function setZeroTimeout(fn) {
                  _push(timeouts, fn);
                  window.postMessage(messageName, '*');
                };
                var handleMessage = function handleMessage(event) {
                  if (event.source === window && event.data === messageName) {
                    event.stopPropagation();
                    if (timeouts.length === 0) {
                      return;
                    }
                    var fn = _shift(timeouts);
                    fn();
                  }
                };
                window.addEventListener('message', handleMessage, true);
                return setZeroTimeout;
              };
            }
            var makePromiseAsap = function makePromiseAsap() {
              // An efficient task-scheduler based on a pre-existing Promise
              // implementation, which we can use even if we override the
              // global Promise below (in order to workaround bugs)
              // https://github.com/Raynos/observ-hash/issues/2#issuecomment-35857671
              var P = globals.Promise;
              var pr = P && P.resolve && P.resolve();
              return pr && function (task) {
                return pr.then(task);
              };
            };
            var enqueue = ES.IsCallable(globals.setImmediate) ? globals.setImmediate : (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.nextTick ? process.nextTick : makePromiseAsap() || (ES.IsCallable(makeZeroTimeout) ? makeZeroTimeout() : function (task) {
              setTimeout(task, 0);
            }); // fallback

            // Constants for Promise implementation
            var PROMISE_IDENTITY = function PROMISE_IDENTITY(x) {
              return x;
            };
            var PROMISE_THROWER = function PROMISE_THROWER(e) {
              throw e;
            };
            var PROMISE_PENDING = 0;
            var PROMISE_FULFILLED = 1;
            var PROMISE_REJECTED = 2;
            // We store fulfill/reject handlers and capabilities in a single array.
            var PROMISE_FULFILL_OFFSET = 0;
            var PROMISE_REJECT_OFFSET = 1;
            var PROMISE_CAPABILITY_OFFSET = 2;
            // This is used in an optimization for chaining promises via then.
            var PROMISE_FAKE_CAPABILITY = {};
            var enqueuePromiseReactionJob = function enqueuePromiseReactionJob(handler, capability, argument) {
              enqueue(function () {
                promiseReactionJob(handler, capability, argument);
              });
            };
            var promiseReactionJob = function promiseReactionJob(handler, promiseCapability, argument) {
              var handlerResult, f;
              if (promiseCapability === PROMISE_FAKE_CAPABILITY) {
                // Fast case, when we don't actually need to chain through to a
                // (real) promiseCapability.
                return handler(argument);
              }
              try {
                handlerResult = handler(argument);
                f = promiseCapability.resolve;
              } catch (e) {
                handlerResult = e;
                f = promiseCapability.reject;
              }
              f(handlerResult);
            };
            var fulfillPromise = function fulfillPromise(promise, value) {
              var _promise = promise._promise;
              var length = _promise.reactionLength;
              if (length > 0) {
                enqueuePromiseReactionJob(_promise.fulfillReactionHandler0, _promise.reactionCapability0, value);
                _promise.fulfillReactionHandler0 = void 0;
                _promise.rejectReactions0 = void 0;
                _promise.reactionCapability0 = void 0;
                if (length > 1) {
                  for (var i = 1, idx = 0; i < length; i++, idx += 3) {
                    enqueuePromiseReactionJob(_promise[idx + PROMISE_FULFILL_OFFSET], _promise[idx + PROMISE_CAPABILITY_OFFSET], value);
                    promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
                    promise[idx + PROMISE_REJECT_OFFSET] = void 0;
                    promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
                  }
                }
              }
              _promise.result = value;
              _promise.state = PROMISE_FULFILLED;
              _promise.reactionLength = 0;
            };
            var rejectPromise = function rejectPromise(promise, reason) {
              var _promise = promise._promise;
              var length = _promise.reactionLength;
              if (length > 0) {
                enqueuePromiseReactionJob(_promise.rejectReactionHandler0, _promise.reactionCapability0, reason);
                _promise.fulfillReactionHandler0 = void 0;
                _promise.rejectReactions0 = void 0;
                _promise.reactionCapability0 = void 0;
                if (length > 1) {
                  for (var i = 1, idx = 0; i < length; i++, idx += 3) {
                    enqueuePromiseReactionJob(_promise[idx + PROMISE_REJECT_OFFSET], _promise[idx + PROMISE_CAPABILITY_OFFSET], reason);
                    promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
                    promise[idx + PROMISE_REJECT_OFFSET] = void 0;
                    promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
                  }
                }
              }
              _promise.result = reason;
              _promise.state = PROMISE_REJECTED;
              _promise.reactionLength = 0;
            };
            var createResolvingFunctions = function createResolvingFunctions(promise) {
              var alreadyResolved = false;
              var resolve = function resolve(resolution) {
                var then;
                if (alreadyResolved) {
                  return;
                }
                alreadyResolved = true;
                if (resolution === promise) {
                  return rejectPromise(promise, new TypeError('Self resolution'));
                }
                if (!ES.TypeIsObject(resolution)) {
                  return fulfillPromise(promise, resolution);
                }
                try {
                  then = resolution.then;
                } catch (e) {
                  return rejectPromise(promise, e);
                }
                if (!ES.IsCallable(then)) {
                  return fulfillPromise(promise, resolution);
                }
                enqueue(function () {
                  promiseResolveThenableJob(promise, resolution, then);
                });
              };
              var reject = function reject(reason) {
                if (alreadyResolved) {
                  return;
                }
                alreadyResolved = true;
                return rejectPromise(promise, reason);
              };
              return {
                resolve: resolve,
                reject: reject
              };
            };
            var optimizedThen = function optimizedThen(then, thenable, resolve, reject) {
              // Optimization: since we discard the result, we can pass our
              // own then implementation a special hint to let it know it
              // doesn't have to create it.  (The PROMISE_FAKE_CAPABILITY
              // object is local to this implementation and unforgeable outside.)
              if (then === Promise$prototype$then) {
                _call(then, thenable, resolve, reject, PROMISE_FAKE_CAPABILITY);
              } else {
                _call(then, thenable, resolve, reject);
              }
            };
            var promiseResolveThenableJob = function promiseResolveThenableJob(promise, thenable, then) {
              var resolvingFunctions = createResolvingFunctions(promise);
              var resolve = resolvingFunctions.resolve;
              var reject = resolvingFunctions.reject;
              try {
                optimizedThen(then, thenable, resolve, reject);
              } catch (e) {
                reject(e);
              }
            };
            var Promise$prototype, Promise$prototype$then;
            var Promise = function () {
              var PromiseShim = function Promise(resolver) {
                if (!(this instanceof PromiseShim)) {
                  throw new TypeError('Constructor Promise requires "new"');
                }
                if (this && this._promise) {
                  throw new TypeError('Bad construction');
                }
                // see https://bugs.ecmascript.org/show_bug.cgi?id=2482
                if (!ES.IsCallable(resolver)) {
                  throw new TypeError('not a valid resolver');
                }
                var promise = emulateES6construct(this, PromiseShim, Promise$prototype, {
                  _promise: {
                    result: void 0,
                    state: PROMISE_PENDING,
                    // The first member of the "reactions" array is inlined here,
                    // since most promises only have one reaction.
                    // We've also exploded the 'reaction' object to inline the
                    // "handler" and "capability" fields, since both fulfill and
                    // reject reactions share the same capability.
                    reactionLength: 0,
                    fulfillReactionHandler0: void 0,
                    rejectReactionHandler0: void 0,
                    reactionCapability0: void 0
                  }
                });
                var resolvingFunctions = createResolvingFunctions(promise);
                var reject = resolvingFunctions.reject;
                try {
                  resolver(resolvingFunctions.resolve, reject);
                } catch (e) {
                  reject(e);
                }
                return promise;
              };
              return PromiseShim;
            }();
            Promise$prototype = Promise.prototype;
            var _promiseAllResolver = function _promiseAllResolver(index, values, capability, remaining) {
              var alreadyCalled = false;
              return function (x) {
                if (alreadyCalled) {
                  return;
                }
                alreadyCalled = true;
                values[index] = x;
                if (--remaining.count === 0) {
                  var resolve = capability.resolve;
                  resolve(values); // call w/ this===undefined
                }
              };
            };
            var performPromiseAll = function performPromiseAll(iteratorRecord, C, resultCapability) {
              var it = iteratorRecord.iterator;
              var values = [];
              var remaining = {
                count: 1
              };
              var next, nextValue;
              var index = 0;
              while (true) {
                try {
                  next = ES.IteratorStep(it);
                  if (next === false) {
                    iteratorRecord.done = true;
                    break;
                  }
                  nextValue = next.value;
                } catch (e) {
                  iteratorRecord.done = true;
                  throw e;
                }
                values[index] = void 0;
                var nextPromise = C.resolve(nextValue);
                var resolveElement = _promiseAllResolver(index, values, resultCapability, remaining);
                remaining.count += 1;
                optimizedThen(nextPromise.then, nextPromise, resolveElement, resultCapability.reject);
                index += 1;
              }
              if (--remaining.count === 0) {
                var resolve = resultCapability.resolve;
                resolve(values); // call w/ this===undefined
              }
              return resultCapability.promise;
            };
            var performPromiseRace = function performPromiseRace(iteratorRecord, C, resultCapability) {
              var it = iteratorRecord.iterator;
              var next, nextValue, nextPromise;
              while (true) {
                try {
                  next = ES.IteratorStep(it);
                  if (next === false) {
                    // NOTE: If iterable has no items, resulting promise will never
                    // resolve; see:
                    // https://github.com/domenic/promises-unwrapping/issues/75
                    // https://bugs.ecmascript.org/show_bug.cgi?id=2515
                    iteratorRecord.done = true;
                    break;
                  }
                  nextValue = next.value;
                } catch (e) {
                  iteratorRecord.done = true;
                  throw e;
                }
                nextPromise = C.resolve(nextValue);
                optimizedThen(nextPromise.then, nextPromise, resultCapability.resolve, resultCapability.reject);
              }
              return resultCapability.promise;
            };
            defineProperties(Promise, {
              all: function all(iterable) {
                var C = this;
                if (!ES.TypeIsObject(C)) {
                  throw new TypeError('Promise is not object');
                }
                var capability = new PromiseCapability(C);
                var iterator, iteratorRecord;
                try {
                  iterator = ES.GetIterator(iterable);
                  iteratorRecord = {
                    iterator: iterator,
                    done: false
                  };
                  return performPromiseAll(iteratorRecord, C, capability);
                } catch (e) {
                  var exception = e;
                  if (iteratorRecord && !iteratorRecord.done) {
                    try {
                      ES.IteratorClose(iterator, true);
                    } catch (ee) {
                      exception = ee;
                    }
                  }
                  var reject = capability.reject;
                  reject(exception);
                  return capability.promise;
                }
              },
              race: function race(iterable) {
                var C = this;
                if (!ES.TypeIsObject(C)) {
                  throw new TypeError('Promise is not object');
                }
                var capability = new PromiseCapability(C);
                var iterator, iteratorRecord;
                try {
                  iterator = ES.GetIterator(iterable);
                  iteratorRecord = {
                    iterator: iterator,
                    done: false
                  };
                  return performPromiseRace(iteratorRecord, C, capability);
                } catch (e) {
                  var exception = e;
                  if (iteratorRecord && !iteratorRecord.done) {
                    try {
                      ES.IteratorClose(iterator, true);
                    } catch (ee) {
                      exception = ee;
                    }
                  }
                  var reject = capability.reject;
                  reject(exception);
                  return capability.promise;
                }
              },
              reject: function reject(reason) {
                var C = this;
                if (!ES.TypeIsObject(C)) {
                  throw new TypeError('Bad promise constructor');
                }
                var capability = new PromiseCapability(C);
                var rejectFunc = capability.reject;
                rejectFunc(reason); // call with this===undefined
                return capability.promise;
              },
              resolve: function resolve(v) {
                // See https://esdiscuss.org/topic/fixing-promise-resolve for spec
                var C = this;
                if (!ES.TypeIsObject(C)) {
                  throw new TypeError('Bad promise constructor');
                }
                if (ES.IsPromise(v)) {
                  var constructor = v.constructor;
                  if (constructor === C) {
                    return v;
                  }
                }
                var capability = new PromiseCapability(C);
                var resolveFunc = capability.resolve;
                resolveFunc(v); // call with this===undefined
                return capability.promise;
              }
            });
            defineProperties(Promise$prototype, {
              "catch": function _catch(onRejected) {
                return this.then(null, onRejected);
              },
              then: function then(onFulfilled, onRejected) {
                var promise = this;
                if (!ES.IsPromise(promise)) {
                  throw new TypeError('not a promise');
                }
                var C = ES.SpeciesConstructor(promise, Promise);
                var resultCapability;
                var returnValueIsIgnored = arguments.length > 2 && arguments[2] === PROMISE_FAKE_CAPABILITY;
                if (returnValueIsIgnored && C === Promise) {
                  resultCapability = PROMISE_FAKE_CAPABILITY;
                } else {
                  resultCapability = new PromiseCapability(C);
                }
                // PerformPromiseThen(promise, onFulfilled, onRejected, resultCapability)
                // Note that we've split the 'reaction' object into its two
                // components, "capabilities" and "handler"
                // "capabilities" is always equal to `resultCapability`
                var fulfillReactionHandler = ES.IsCallable(onFulfilled) ? onFulfilled : PROMISE_IDENTITY;
                var rejectReactionHandler = ES.IsCallable(onRejected) ? onRejected : PROMISE_THROWER;
                var _promise = promise._promise;
                var value;
                if (_promise.state === PROMISE_PENDING) {
                  if (_promise.reactionLength === 0) {
                    _promise.fulfillReactionHandler0 = fulfillReactionHandler;
                    _promise.rejectReactionHandler0 = rejectReactionHandler;
                    _promise.reactionCapability0 = resultCapability;
                  } else {
                    var idx = 3 * (_promise.reactionLength - 1);
                    _promise[idx + PROMISE_FULFILL_OFFSET] = fulfillReactionHandler;
                    _promise[idx + PROMISE_REJECT_OFFSET] = rejectReactionHandler;
                    _promise[idx + PROMISE_CAPABILITY_OFFSET] = resultCapability;
                  }
                  _promise.reactionLength += 1;
                } else if (_promise.state === PROMISE_FULFILLED) {
                  value = _promise.result;
                  enqueuePromiseReactionJob(fulfillReactionHandler, resultCapability, value);
                } else if (_promise.state === PROMISE_REJECTED) {
                  value = _promise.result;
                  enqueuePromiseReactionJob(rejectReactionHandler, resultCapability, value);
                } else {
                  throw new TypeError('unexpected Promise state');
                }
                return resultCapability.promise;
              }
            });
            // This helps the optimizer by ensuring that methods which take
            // capabilities aren't polymorphic.
            PROMISE_FAKE_CAPABILITY = new PromiseCapability(Promise);
            Promise$prototype$then = Promise$prototype.then;
            return Promise;
          }();

          // Chrome's native Promise has extra methods that it shouldn't have. Let's remove them.
          if (globals.Promise) {
            delete globals.Promise.accept;
            delete globals.Promise.defer;
            delete globals.Promise.prototype.chain;
          }
          if (typeof PromiseShim === 'function') {
            // export the Promise constructor.
            defineProperties(globals, {
              Promise: PromiseShim
            });
            // In Chrome 33 (and thereabouts) Promise is defined, but the
            // implementation is buggy in a number of ways.  Let's check subclassing
            // support to see if we have a buggy implementation.
            var promiseSupportsSubclassing = supportsSubclassing(globals.Promise, function (S) {
              return S.resolve(42).then(function () {}) instanceof S;
            });
            var promiseIgnoresNonFunctionThenCallbacks = !throwsError(function () {
              return globals.Promise.reject(42).then(null, 5).then(null, noop);
            });
            var promiseRequiresObjectContext = throwsError(function () {
              return globals.Promise.call(3, noop);
            });
            // Promise.resolve() was errata'ed late in the ES6 process.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1170742
            //      https://code.google.com/p/v8/issues/detail?id=4161
            // It serves as a proxy for a number of other bugs in early Promise
            // implementations.
            var promiseResolveBroken = function (Promise) {
              var p = Promise.resolve(5);
              p.constructor = {};
              var p2 = Promise.resolve(p);
              try {
                p2.then(null, noop).then(null, noop); // avoid "uncaught rejection" warnings in console
              } catch (e) {
                return true; // v8 native Promises break here https://code.google.com/p/chromium/issues/detail?id=575314
              }
              return p === p2; // This *should* be false!
            }(globals.Promise);

            // Chrome 46 (probably older too) does not retrieve a thenable's .then synchronously
            var getsThenSynchronously = supportsDescriptors && function () {
              var count = 0;
              // eslint-disable-next-line getter-return
              var thenable = Object.defineProperty({}, 'then', {
                get: function get() {
                  count += 1;
                }
              });
              Promise.resolve(thenable);
              return count === 1;
            }();
            var BadResolverPromise = function BadResolverPromise(executor) {
              var p = new Promise(executor);
              executor(3, function () {});
              this.then = p.then;
              this.constructor = BadResolverPromise;
            };
            BadResolverPromise.prototype = Promise.prototype;
            BadResolverPromise.all = Promise.all;
            // Chrome Canary 49 (probably older too) has some implementation bugs
            var hasBadResolverPromise = valueOrFalseIfThrows(function () {
              return !!BadResolverPromise.all([1, 2]);
            });
            if (!promiseSupportsSubclassing || !promiseIgnoresNonFunctionThenCallbacks || !promiseRequiresObjectContext || promiseResolveBroken || !getsThenSynchronously || hasBadResolverPromise) {
              Promise = PromiseShim; // eslint-disable-line no-global-assign
              overrideNative(globals, 'Promise', PromiseShim);
            }
            if (Promise.all.length !== 1) {
              var origAll = Promise.all;
              overrideNative(Promise, 'all', function all(iterable) {
                return ES.Call(origAll, this, arguments);
              });
            }
            if (Promise.race.length !== 1) {
              var origRace = Promise.race;
              overrideNative(Promise, 'race', function race(iterable) {
                return ES.Call(origRace, this, arguments);
              });
            }
            if (Promise.resolve.length !== 1) {
              var origResolve = Promise.resolve;
              overrideNative(Promise, 'resolve', function resolve(x) {
                return ES.Call(origResolve, this, arguments);
              });
            }
            if (Promise.reject.length !== 1) {
              var origReject = Promise.reject;
              overrideNative(Promise, 'reject', function reject(r) {
                return ES.Call(origReject, this, arguments);
              });
            }
            ensureEnumerable(Promise, 'all');
            ensureEnumerable(Promise, 'race');
            ensureEnumerable(Promise, 'resolve');
            ensureEnumerable(Promise, 'reject');
            addDefaultSpecies(Promise);
          }

          // Map and Set require a true ES5 environment
          // Their fast path also requires that the environment preserve
          // property insertion order, which is not guaranteed by the spec.
          var testOrder = function testOrder(a) {
            var b = keys(_reduce(a, function (o, k) {
              o[k] = true;
              return o;
            }, {}));
            return a.join(':') === b.join(':');
          };
          var preservesInsertionOrder = testOrder(['z', 'a', 'bb']);
          // some engines (eg, Chrome) only preserve insertion order for string keys
          var preservesNumericInsertionOrder = testOrder(['z', 1, 'a', '3', 2]);
          if (supportsDescriptors) {
            var fastkey = function fastkey(key, skipInsertionOrderCheck) {
              if (!skipInsertionOrderCheck && !preservesInsertionOrder) {
                return null;
              }
              if (isNullOrUndefined(key)) {
                return '^' + ES.ToString(key);
              } else if (typeof key === 'string') {
                return '$' + key;
              } else if (typeof key === 'number') {
                // note that -0 will get coerced to "0" when used as a property key
                if (!preservesNumericInsertionOrder) {
                  return 'n' + key;
                }
                return key;
              } else if (typeof key === 'boolean') {
                return 'b' + key;
              }
              return null;
            };
            var emptyObject = function emptyObject() {
              // accomodate some older not-quite-ES5 browsers
              return Object.create ? Object.create(null) : {};
            };
            var addIterableToMap = function addIterableToMap(MapConstructor, map, iterable) {
              if (isArray(iterable) || Type.string(iterable)) {
                _forEach(iterable, function (entry) {
                  if (!ES.TypeIsObject(entry)) {
                    throw new TypeError('Iterator value ' + entry + ' is not an entry object');
                  }
                  map.set(entry[0], entry[1]);
                });
              } else if (iterable instanceof MapConstructor) {
                _call(MapConstructor.prototype.forEach, iterable, function (value, key) {
                  map.set(key, value);
                });
              } else {
                var iter, adder;
                if (!isNullOrUndefined(iterable)) {
                  adder = map.set;
                  if (!ES.IsCallable(adder)) {
                    throw new TypeError('bad map');
                  }
                  iter = ES.GetIterator(iterable);
                }
                if (typeof iter !== 'undefined') {
                  while (true) {
                    var next = ES.IteratorStep(iter);
                    if (next === false) {
                      break;
                    }
                    var nextItem = next.value;
                    try {
                      if (!ES.TypeIsObject(nextItem)) {
                        throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
                      }
                      _call(adder, map, nextItem[0], nextItem[1]);
                    } catch (e) {
                      ES.IteratorClose(iter, true);
                      throw e;
                    }
                  }
                }
              }
            };
            var addIterableToSet = function addIterableToSet(SetConstructor, set, iterable) {
              if (isArray(iterable) || Type.string(iterable)) {
                _forEach(iterable, function (value) {
                  set.add(value);
                });
              } else if (iterable instanceof SetConstructor) {
                _call(SetConstructor.prototype.forEach, iterable, function (value) {
                  set.add(value);
                });
              } else {
                var iter, adder;
                if (!isNullOrUndefined(iterable)) {
                  adder = set.add;
                  if (!ES.IsCallable(adder)) {
                    throw new TypeError('bad set');
                  }
                  iter = ES.GetIterator(iterable);
                }
                if (typeof iter !== 'undefined') {
                  while (true) {
                    var next = ES.IteratorStep(iter);
                    if (next === false) {
                      break;
                    }
                    var nextValue = next.value;
                    try {
                      _call(adder, set, nextValue);
                    } catch (e) {
                      ES.IteratorClose(iter, true);
                      throw e;
                    }
                  }
                }
              }
            };
            var collectionShims = {
              Map: function () {
                var empty = {};
                var MapEntry = function MapEntry(key, value) {
                  this.key = key;
                  this.value = value;
                  this.next = null;
                  this.prev = null;
                };
                MapEntry.prototype.isRemoved = function isRemoved() {
                  return this.key === empty;
                };
                var isMap = function isMap(map) {
                  return !!map._es6map;
                };
                var requireMapSlot = function requireMapSlot(map, method) {
                  if (!ES.TypeIsObject(map) || !isMap(map)) {
                    throw new TypeError('Method Map.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(map));
                  }
                };
                var MapIterator = function MapIterator(map, kind) {
                  requireMapSlot(map, '[[MapIterator]]');
                  defineProperty(this, 'head', map._head);
                  defineProperty(this, 'i', this.head);
                  defineProperty(this, 'kind', kind);
                };
                MapIterator.prototype = {
                  isMapIterator: true,
                  next: function next() {
                    if (!this.isMapIterator) {
                      throw new TypeError('Not a MapIterator');
                    }
                    var i = this.i;
                    var kind = this.kind;
                    var head = this.head;
                    if (typeof this.i === 'undefined') {
                      return iteratorResult();
                    }
                    while (i.isRemoved() && i !== head) {
                      // back up off of removed entries
                      i = i.prev;
                    }
                    // advance to next unreturned element.
                    var result;
                    while (i.next !== head) {
                      i = i.next;
                      if (!i.isRemoved()) {
                        if (kind === 'key') {
                          result = i.key;
                        } else if (kind === 'value') {
                          result = i.value;
                        } else {
                          result = [i.key, i.value];
                        }
                        this.i = i;
                        return iteratorResult(result);
                      }
                    }
                    // once the iterator is done, it is done forever.
                    this.i = void 0;
                    return iteratorResult();
                  }
                };
                addIterator(MapIterator.prototype);
                var Map$prototype;
                var MapShim = function Map() {
                  if (!(this instanceof Map)) {
                    throw new TypeError('Constructor Map requires "new"');
                  }
                  if (this && this._es6map) {
                    throw new TypeError('Bad construction');
                  }
                  var map = emulateES6construct(this, Map, Map$prototype, {
                    _es6map: true,
                    _head: null,
                    _map: OrigMap ? new OrigMap() : null,
                    _size: 0,
                    _storage: emptyObject()
                  });
                  var head = new MapEntry(null, null);
                  // circular doubly-linked list.
                  /* eslint no-multi-assign: 1 */
                  head.next = head.prev = head;
                  map._head = head;

                  // Optionally initialize map from iterable
                  if (arguments.length > 0) {
                    addIterableToMap(Map, map, arguments[0]);
                  }
                  return map;
                };
                Map$prototype = MapShim.prototype;
                Value.getter(Map$prototype, 'size', function () {
                  if (typeof this._size === 'undefined') {
                    throw new TypeError('size method called on incompatible Map');
                  }
                  return this._size;
                });
                defineProperties(Map$prototype, {
                  get: function get(key) {
                    requireMapSlot(this, 'get');
                    var entry;
                    var fkey = fastkey(key, true);
                    if (fkey !== null) {
                      // fast O(1) path
                      entry = this._storage[fkey];
                      if (entry) {
                        return entry.value;
                      }
                      return;
                    }
                    if (this._map) {
                      // fast object key path
                      entry = origMapGet.call(this._map, key);
                      if (entry) {
                        return entry.value;
                      }
                      return;
                    }
                    var head = this._head;
                    var i = head;
                    while ((i = i.next) !== head) {
                      if (ES.SameValueZero(i.key, key)) {
                        return i.value;
                      }
                    }
                  },
                  has: function has(key) {
                    requireMapSlot(this, 'has');
                    var fkey = fastkey(key, true);
                    if (fkey !== null) {
                      // fast O(1) path
                      return typeof this._storage[fkey] !== 'undefined';
                    }
                    if (this._map) {
                      // fast object key path
                      return origMapHas.call(this._map, key);
                    }
                    var head = this._head;
                    var i = head;
                    while ((i = i.next) !== head) {
                      if (ES.SameValueZero(i.key, key)) {
                        return true;
                      }
                    }
                    return false;
                  },
                  set: function set(key, value) {
                    requireMapSlot(this, 'set');
                    var head = this._head;
                    var i = head;
                    var entry;
                    var fkey = fastkey(key, true);
                    if (fkey !== null) {
                      // fast O(1) path
                      if (typeof this._storage[fkey] !== 'undefined') {
                        this._storage[fkey].value = value;
                        return this;
                      }
                      entry = this._storage[fkey] = new MapEntry(key, value); /* eslint no-multi-assign: 1 */
                      i = head.prev;
                      // fall through
                    } else if (this._map) {
                      // fast object key path
                      if (origMapHas.call(this._map, key)) {
                        origMapGet.call(this._map, key).value = value;
                      } else {
                        entry = new MapEntry(key, value);
                        origMapSet.call(this._map, key, entry);
                        i = head.prev;
                        // fall through
                      }
                    }
                    while ((i = i.next) !== head) {
                      if (ES.SameValueZero(i.key, key)) {
                        i.value = value;
                        return this;
                      }
                    }
                    entry = entry || new MapEntry(key, value);
                    if (ES.SameValue(-0, key)) {
                      entry.key = +0; // coerce -0 to +0 in entry
                    }
                    entry.next = this._head;
                    entry.prev = this._head.prev;
                    entry.prev.next = entry;
                    entry.next.prev = entry;
                    this._size += 1;
                    return this;
                  },
                  "delete": function _delete(key) {
                    requireMapSlot(this, 'delete');
                    var head = this._head;
                    var i = head;
                    var fkey = fastkey(key, true);
                    if (fkey !== null) {
                      // fast O(1) path
                      if (typeof this._storage[fkey] === 'undefined') {
                        return false;
                      }
                      i = this._storage[fkey].prev;
                      delete this._storage[fkey];
                      // fall through
                    } else if (this._map) {
                      // fast object key path
                      if (!origMapHas.call(this._map, key)) {
                        return false;
                      }
                      i = origMapGet.call(this._map, key).prev;
                      origMapDelete.call(this._map, key);
                      // fall through
                    }
                    while ((i = i.next) !== head) {
                      if (ES.SameValueZero(i.key, key)) {
                        i.key = empty;
                        i.value = empty;
                        i.prev.next = i.next;
                        i.next.prev = i.prev;
                        this._size -= 1;
                        return true;
                      }
                    }
                    return false;
                  },
                  clear: function clear() {
                    /* eslint no-multi-assign: 1 */
                    requireMapSlot(this, 'clear');
                    this._map = OrigMap ? new OrigMap() : null;
                    this._size = 0;
                    this._storage = emptyObject();
                    var head = this._head;
                    var i = head;
                    var p = i.next;
                    while ((i = p) !== head) {
                      i.key = empty;
                      i.value = empty;
                      p = i.next;
                      i.next = i.prev = head;
                    }
                    head.next = head.prev = head;
                  },
                  keys: function keys() {
                    requireMapSlot(this, 'keys');
                    return new MapIterator(this, 'key');
                  },
                  values: function values() {
                    requireMapSlot(this, 'values');
                    return new MapIterator(this, 'value');
                  },
                  entries: function entries() {
                    requireMapSlot(this, 'entries');
                    return new MapIterator(this, 'key+value');
                  },
                  forEach: function forEach(callback) {
                    requireMapSlot(this, 'forEach');
                    var context = arguments.length > 1 ? arguments[1] : null;
                    var it = this.entries();
                    for (var entry = it.next(); !entry.done; entry = it.next()) {
                      if (context) {
                        _call(callback, context, entry.value[1], entry.value[0], this);
                      } else {
                        callback(entry.value[1], entry.value[0], this);
                      }
                    }
                  }
                });
                addIterator(Map$prototype, Map$prototype.entries);
                return MapShim;
              }(),
              Set: function () {
                var isSet = function isSet(set) {
                  return set._es6set && typeof set._storage !== 'undefined';
                };
                var requireSetSlot = function requireSetSlot(set, method) {
                  if (!ES.TypeIsObject(set) || !isSet(set)) {
                    // https://github.com/paulmillr/es6-shim/issues/176
                    throw new TypeError('Set.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(set));
                  }
                };

                // Creating a Map is expensive.  To speed up the common case of
                // Sets containing only string or numeric keys, we use an object
                // as backing storage and lazily create a full Map only when
                // required.
                var Set$prototype;
                var SetShim = function Set() {
                  if (!(this instanceof Set)) {
                    throw new TypeError('Constructor Set requires "new"');
                  }
                  if (this && this._es6set) {
                    throw new TypeError('Bad construction');
                  }
                  var set = emulateES6construct(this, Set, Set$prototype, {
                    _es6set: true,
                    '[[SetData]]': null,
                    _storage: emptyObject()
                  });
                  if (!set._es6set) {
                    throw new TypeError('bad set');
                  }

                  // Optionally initialize Set from iterable
                  if (arguments.length > 0) {
                    addIterableToSet(Set, set, arguments[0]);
                  }
                  return set;
                };
                Set$prototype = SetShim.prototype;
                var decodeKey = function decodeKey(key) {
                  var k = key;
                  if (k === '^null') {
                    return null;
                  } else if (k === '^undefined') {
                    return void 0;
                  }
                  var first = k.charAt(0);
                  if (first === '$') {
                    return _strSlice(k, 1);
                  } else if (first === 'n') {
                    return +_strSlice(k, 1);
                  } else if (first === 'b') {
                    return k === 'btrue';
                  }
                  return +k;
                };
                // Switch from the object backing storage to a full Map.
                var ensureMap = function ensureMap(set) {
                  if (!set['[[SetData]]']) {
                    var m = new collectionShims.Map();
                    set['[[SetData]]'] = m;
                    _forEach(keys(set._storage), function (key) {
                      var k = decodeKey(key);
                      m.set(k, k);
                    });
                    set['[[SetData]]'] = m;
                  }
                  set._storage = null; // free old backing storage
                };
                Value.getter(SetShim.prototype, 'size', function () {
                  requireSetSlot(this, 'size');
                  if (this._storage) {
                    return keys(this._storage).length;
                  }
                  ensureMap(this);
                  return this['[[SetData]]'].size;
                });
                defineProperties(SetShim.prototype, {
                  has: function has(key) {
                    requireSetSlot(this, 'has');
                    var fkey;
                    if (this._storage && (fkey = fastkey(key)) !== null) {
                      return !!this._storage[fkey];
                    }
                    ensureMap(this);
                    return this['[[SetData]]'].has(key);
                  },
                  add: function add(key) {
                    requireSetSlot(this, 'add');
                    var fkey;
                    if (this._storage && (fkey = fastkey(key)) !== null) {
                      this._storage[fkey] = true;
                      return this;
                    }
                    ensureMap(this);
                    this['[[SetData]]'].set(key, key);
                    return this;
                  },
                  "delete": function _delete(key) {
                    requireSetSlot(this, 'delete');
                    var fkey;
                    if (this._storage && (fkey = fastkey(key)) !== null) {
                      var hasFKey = _hasOwnProperty(this._storage, fkey);
                      return delete this._storage[fkey] && hasFKey;
                    }
                    ensureMap(this);
                    return this['[[SetData]]']['delete'](key);
                  },
                  clear: function clear() {
                    requireSetSlot(this, 'clear');
                    if (this._storage) {
                      this._storage = emptyObject();
                    }
                    if (this['[[SetData]]']) {
                      this['[[SetData]]'].clear();
                    }
                  },
                  values: function values() {
                    requireSetSlot(this, 'values');
                    ensureMap(this);
                    return new SetIterator(this['[[SetData]]'].values());
                  },
                  entries: function entries() {
                    requireSetSlot(this, 'entries');
                    ensureMap(this);
                    return new SetIterator(this['[[SetData]]'].entries());
                  },
                  forEach: function forEach(callback) {
                    requireSetSlot(this, 'forEach');
                    var context = arguments.length > 1 ? arguments[1] : null;
                    var entireSet = this;
                    ensureMap(entireSet);
                    this['[[SetData]]'].forEach(function (value, key) {
                      if (context) {
                        _call(callback, context, key, key, entireSet);
                      } else {
                        callback(key, key, entireSet);
                      }
                    });
                  }
                });
                defineProperty(SetShim.prototype, 'keys', SetShim.prototype.values, true);
                addIterator(SetShim.prototype, SetShim.prototype.values);
                var SetIterator = function SetIterator(it) {
                  defineProperty(this, 'it', it);
                };
                SetIterator.prototype = {
                  isSetIterator: true,
                  next: function next() {
                    if (!this.isSetIterator) {
                      throw new TypeError('Not a SetIterator');
                    }
                    return this.it.next();
                  }
                };
                addIterator(SetIterator.prototype);
                return SetShim;
              }()
            };
            var isGoogleTranslate = globals.Set && !Set.prototype['delete'] && Set.prototype.remove && Set.prototype.items && Set.prototype.map && Array.isArray(new Set().keys);
            if (isGoogleTranslate) {
              // special-case force removal of wildly invalid Set implementation in Google Translate iframes
              // see https://github.com/paulmillr/es6-shim/issues/438 / https://twitter.com/ljharb/status/849335573114363904
              globals.Set = collectionShims.Set;
            }
            if (globals.Map || globals.Set) {
              // Safari 8, for example, doesn't accept an iterable.
              var mapAcceptsArguments = valueOrFalseIfThrows(function () {
                return new Map([[1, 2]]).get(1) === 2;
              });
              if (!mapAcceptsArguments) {
                globals.Map = function Map() {
                  if (!(this instanceof Map)) {
                    throw new TypeError('Constructor Map requires "new"');
                  }
                  var m = new OrigMap();
                  if (arguments.length > 0) {
                    addIterableToMap(Map, m, arguments[0]);
                  }
                  delete m.constructor;
                  Object.setPrototypeOf(m, globals.Map.prototype);
                  return m;
                };
                globals.Map.prototype = create(OrigMap.prototype);
                defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
                Value.preserveToString(globals.Map, OrigMap);
              }
              var testMap = new Map();
              var mapUsesSameValueZero = function () {
                // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
                var m = new Map([[1, 0], [2, 0], [3, 0], [4, 0]]);
                m.set(-0, m);
                return m.get(0) === m && m.get(-0) === m && m.has(0) && m.has(-0);
              }();
              var mapSupportsChaining = testMap.set(1, 2) === testMap;
              if (!mapUsesSameValueZero || !mapSupportsChaining) {
                overrideNative(Map.prototype, 'set', function set(k, v) {
                  _call(origMapSet, this, k === 0 ? 0 : k, v);
                  return this;
                });
              }
              if (!mapUsesSameValueZero) {
                defineProperties(Map.prototype, {
                  get: function get(k) {
                    return _call(origMapGet, this, k === 0 ? 0 : k);
                  },
                  has: function has(k) {
                    return _call(origMapHas, this, k === 0 ? 0 : k);
                  }
                }, true);
                Value.preserveToString(Map.prototype.get, origMapGet);
                Value.preserveToString(Map.prototype.has, origMapHas);
              }
              var testSet = new Set();
              var setUsesSameValueZero = Set.prototype['delete'] && Set.prototype.add && Set.prototype.has && function (s) {
                s['delete'](0);
                s.add(-0);
                return !s.has(0);
              }(testSet);
              var setSupportsChaining = testSet.add(1) === testSet;
              if (!setUsesSameValueZero || !setSupportsChaining) {
                var origSetAdd = Set.prototype.add;
                Set.prototype.add = function add(v) {
                  _call(origSetAdd, this, v === 0 ? 0 : v);
                  return this;
                };
                Value.preserveToString(Set.prototype.add, origSetAdd);
              }
              if (!setUsesSameValueZero) {
                var origSetHas = Set.prototype.has;
                Set.prototype.has = function has(v) {
                  return _call(origSetHas, this, v === 0 ? 0 : v);
                };
                Value.preserveToString(Set.prototype.has, origSetHas);
                var origSetDel = Set.prototype['delete'];
                Set.prototype['delete'] = function SetDelete(v) {
                  return _call(origSetDel, this, v === 0 ? 0 : v);
                };
                Value.preserveToString(Set.prototype['delete'], origSetDel);
              }
              var mapSupportsSubclassing = supportsSubclassing(globals.Map, function (M) {
                var m = new M([]);
                // Firefox 32 is ok with the instantiating the subclass but will
                // throw when the map is used.
                m.set(42, 42);
                return m instanceof M;
              });
              // without Object.setPrototypeOf, subclassing is not possible
              var mapFailsToSupportSubclassing = Object.setPrototypeOf && !mapSupportsSubclassing;
              var mapRequiresNew = function () {
                try {
                  return !(globals.Map() instanceof globals.Map);
                } catch (e) {
                  return e instanceof TypeError;
                }
              }();
              if (globals.Map.length !== 0 || mapFailsToSupportSubclassing || !mapRequiresNew) {
                globals.Map = function Map() {
                  if (!(this instanceof Map)) {
                    throw new TypeError('Constructor Map requires "new"');
                  }
                  var m = new OrigMap();
                  if (arguments.length > 0) {
                    addIterableToMap(Map, m, arguments[0]);
                  }
                  delete m.constructor;
                  Object.setPrototypeOf(m, Map.prototype);
                  return m;
                };
                globals.Map.prototype = OrigMap.prototype;
                defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
                Value.preserveToString(globals.Map, OrigMap);
              }
              var setSupportsSubclassing = supportsSubclassing(globals.Set, function (S) {
                var s = new S([]);
                s.add(42, 42);
                return s instanceof S;
              });
              // without Object.setPrototypeOf, subclassing is not possible
              var setFailsToSupportSubclassing = Object.setPrototypeOf && !setSupportsSubclassing;
              var setRequiresNew = function () {
                try {
                  return !(globals.Set() instanceof globals.Set);
                } catch (e) {
                  return e instanceof TypeError;
                }
              }();
              if (globals.Set.length !== 0 || setFailsToSupportSubclassing || !setRequiresNew) {
                var OrigSet = globals.Set;
                globals.Set = function Set() {
                  if (!(this instanceof Set)) {
                    throw new TypeError('Constructor Set requires "new"');
                  }
                  var s = new OrigSet();
                  if (arguments.length > 0) {
                    addIterableToSet(Set, s, arguments[0]);
                  }
                  delete s.constructor;
                  Object.setPrototypeOf(s, Set.prototype);
                  return s;
                };
                globals.Set.prototype = OrigSet.prototype;
                defineProperty(globals.Set.prototype, 'constructor', globals.Set, true);
                Value.preserveToString(globals.Set, OrigSet);
              }
              var newMap = new globals.Map();
              var mapIterationThrowsStopIterator = !valueOrFalseIfThrows(function () {
                return newMap.keys().next().done;
              });
              /*
              - In Firefox < 23, Map#size is a function.
              - In all current Firefox, Set#entries/keys/values & Map#clear do not exist
              - https://bugzilla.mozilla.org/show_bug.cgi?id=869996
              - In Firefox 24, Map and Set do not implement forEach
              - In Firefox 25 at least, Map and Set are callable without "new"
              */
              if (typeof globals.Map.prototype.clear !== 'function' || new globals.Set().size !== 0 || newMap.size !== 0 || typeof globals.Map.prototype.keys !== 'function' || typeof globals.Set.prototype.keys !== 'function' || typeof globals.Map.prototype.forEach !== 'function' || typeof globals.Set.prototype.forEach !== 'function' || isCallableWithoutNew(globals.Map) || isCallableWithoutNew(globals.Set) || typeof newMap.keys().next !== 'function' ||
              // Safari 8
              mapIterationThrowsStopIterator ||
              // Firefox 25
              !mapSupportsSubclassing) {
                defineProperties(globals, {
                  Map: collectionShims.Map,
                  Set: collectionShims.Set
                }, true);
              }
              if (globals.Set.prototype.keys !== globals.Set.prototype.values) {
                // Fixed in WebKit with https://bugs.webkit.org/show_bug.cgi?id=144190
                defineProperty(globals.Set.prototype, 'keys', globals.Set.prototype.values, true);
              }

              // Shim incomplete iterator implementations.
              addIterator(Object.getPrototypeOf(new globals.Map().keys()));
              addIterator(Object.getPrototypeOf(new globals.Set().keys()));
              if (functionsHaveNames && globals.Set.prototype.has.name !== 'has') {
                // Microsoft Edge v0.11.10074.0 is missing a name on Set#has
                var anonymousSetHas = globals.Set.prototype.has;
                overrideNative(globals.Set.prototype, 'has', function has(key) {
                  return _call(anonymousSetHas, this, key);
                });
              }
            }
            defineProperties(globals, collectionShims);
            addDefaultSpecies(globals.Map);
            addDefaultSpecies(globals.Set);
          }
          var throwUnlessTargetIsObject = function throwUnlessTargetIsObject(target) {
            if (!ES.TypeIsObject(target)) {
              throw new TypeError('target must be an object');
            }
          };

          // Some Reflect methods are basically the same as
          // those on the Object global, except that a TypeError is thrown if
          // target isn't an object. As well as returning a boolean indicating
          // the success of the operation.
          var ReflectShims = {
            // Apply method in a functional form.
            apply: function apply() {
              return ES.Call(ES.Call, null, arguments);
            },
            // New operator in a functional form.
            construct: function construct(constructor, args) {
              if (!ES.IsConstructor(constructor)) {
                throw new TypeError('First argument must be a constructor.');
              }
              var newTarget = arguments.length > 2 ? arguments[2] : constructor;
              if (!ES.IsConstructor(newTarget)) {
                throw new TypeError('new.target must be a constructor.');
              }
              return ES.Construct(constructor, args, newTarget, 'internal');
            },
            // When deleting a non-existent or configurable property,
            // true is returned.
            // When attempting to delete a non-configurable property,
            // it will return false.
            deleteProperty: function deleteProperty(target, key) {
              throwUnlessTargetIsObject(target);
              if (supportsDescriptors) {
                var desc = Object.getOwnPropertyDescriptor(target, key);
                if (desc && !desc.configurable) {
                  return false;
                }
              }

              // Will return true.
              return delete target[key];
            },
            has: function has(target, key) {
              throwUnlessTargetIsObject(target);
              return key in target;
            }
          };
          if (Object.getOwnPropertyNames) {
            Object.assign(ReflectShims, {
              // Basically the result of calling the internal [[OwnPropertyKeys]].
              // Concatenating propertyNames and propertySymbols should do the trick.
              // This should continue to work together with a Symbol shim
              // which overrides Object.getOwnPropertyNames and implements
              // Object.getOwnPropertySymbols.
              ownKeys: function ownKeys(target) {
                throwUnlessTargetIsObject(target);
                var keys = Object.getOwnPropertyNames(target);
                if (ES.IsCallable(Object.getOwnPropertySymbols)) {
                  _pushApply(keys, Object.getOwnPropertySymbols(target));
                }
                return keys;
              }
            });
          }
          var callAndCatchException = function ConvertExceptionToBoolean(func) {
            return !throwsError(func);
          };
          if (Object.preventExtensions) {
            Object.assign(ReflectShims, {
              isExtensible: function isExtensible(target) {
                throwUnlessTargetIsObject(target);
                return Object.isExtensible(target);
              },
              preventExtensions: function preventExtensions(target) {
                throwUnlessTargetIsObject(target);
                return callAndCatchException(function () {
                  return Object.preventExtensions(target);
                });
              }
            });
          }
          if (supportsDescriptors) {
            var internalGet = function get(target, key, receiver) {
              var desc = Object.getOwnPropertyDescriptor(target, key);
              if (!desc) {
                var parent = Object.getPrototypeOf(target);
                if (parent === null) {
                  return void 0;
                }
                return internalGet(parent, key, receiver);
              }
              if ('value' in desc) {
                return desc.value;
              }
              if (desc.get) {
                return ES.Call(desc.get, receiver);
              }
              return void 0;
            };
            var internalSet = function set(target, key, value, receiver) {
              var desc = Object.getOwnPropertyDescriptor(target, key);
              if (!desc) {
                var parent = Object.getPrototypeOf(target);
                if (parent !== null) {
                  return internalSet(parent, key, value, receiver);
                }
                desc = {
                  value: void 0,
                  writable: true,
                  enumerable: true,
                  configurable: true
                };
              }
              if ('value' in desc) {
                if (!desc.writable) {
                  return false;
                }
                if (!ES.TypeIsObject(receiver)) {
                  return false;
                }
                var existingDesc = Object.getOwnPropertyDescriptor(receiver, key);
                if (existingDesc) {
                  return Reflect.defineProperty(receiver, key, {
                    value: value
                  });
                }
                return Reflect.defineProperty(receiver, key, {
                  value: value,
                  writable: true,
                  enumerable: true,
                  configurable: true
                });
              }
              if (desc.set) {
                _call(desc.set, receiver, value);
                return true;
              }
              return false;
            };
            Object.assign(ReflectShims, {
              defineProperty: function defineProperty(target, propertyKey, attributes) {
                throwUnlessTargetIsObject(target);
                return callAndCatchException(function () {
                  return Object.defineProperty(target, propertyKey, attributes);
                });
              },
              getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
                throwUnlessTargetIsObject(target);
                return Object.getOwnPropertyDescriptor(target, propertyKey);
              },
              // Syntax in a functional form.
              get: function get(target, key) {
                throwUnlessTargetIsObject(target);
                var receiver = arguments.length > 2 ? arguments[2] : target;
                return internalGet(target, key, receiver);
              },
              set: function set(target, key, value) {
                throwUnlessTargetIsObject(target);
                var receiver = arguments.length > 3 ? arguments[3] : target;
                return internalSet(target, key, value, receiver);
              }
            });
          }
          if (Object.getPrototypeOf) {
            var objectDotGetPrototypeOf = Object.getPrototypeOf;
            ReflectShims.getPrototypeOf = function getPrototypeOf(target) {
              throwUnlessTargetIsObject(target);
              return objectDotGetPrototypeOf(target);
            };
          }
          if (Object.setPrototypeOf && ReflectShims.getPrototypeOf) {
            var willCreateCircularPrototype = function willCreateCircularPrototype(object, lastProto) {
              var proto = lastProto;
              while (proto) {
                if (object === proto) {
                  return true;
                }
                proto = ReflectShims.getPrototypeOf(proto);
              }
              return false;
            };
            Object.assign(ReflectShims, {
              // Sets the prototype of the given object.
              // Returns true on success, otherwise false.
              setPrototypeOf: function setPrototypeOf(object, proto) {
                throwUnlessTargetIsObject(object);
                if (proto !== null && !ES.TypeIsObject(proto)) {
                  throw new TypeError('proto must be an object or null');
                }

                // If they already are the same, we're done.
                if (proto === Reflect.getPrototypeOf(object)) {
                  return true;
                }

                // Cannot alter prototype if object not extensible.
                if (Reflect.isExtensible && !Reflect.isExtensible(object)) {
                  return false;
                }

                // Ensure that we do not create a circular prototype chain.
                if (willCreateCircularPrototype(object, proto)) {
                  return false;
                }
                Object.setPrototypeOf(object, proto);
                return true;
              }
            });
          }
          var defineOrOverrideReflectProperty = function defineOrOverrideReflectProperty(key, shim) {
            if (!ES.IsCallable(globals.Reflect[key])) {
              defineProperty(globals.Reflect, key, shim);
            } else {
              var acceptsPrimitives = valueOrFalseIfThrows(function () {
                globals.Reflect[key](1);
                globals.Reflect[key](NaN);
                globals.Reflect[key](true);
                return true;
              });
              if (acceptsPrimitives) {
                overrideNative(globals.Reflect, key, shim);
              }
            }
          };
          Object.keys(ReflectShims).forEach(function (key) {
            defineOrOverrideReflectProperty(key, ReflectShims[key]);
          });
          var originalReflectGetProto = globals.Reflect.getPrototypeOf;
          if (functionsHaveNames && originalReflectGetProto && originalReflectGetProto.name !== 'getPrototypeOf') {
            overrideNative(globals.Reflect, 'getPrototypeOf', function getPrototypeOf(target) {
              return _call(originalReflectGetProto, globals.Reflect, target);
            });
          }
          if (globals.Reflect.setPrototypeOf) {
            if (valueOrFalseIfThrows(function () {
              globals.Reflect.setPrototypeOf(1, {});
              return true;
            })) {
              overrideNative(globals.Reflect, 'setPrototypeOf', ReflectShims.setPrototypeOf);
            }
          }
          if (globals.Reflect.defineProperty) {
            if (!valueOrFalseIfThrows(function () {
              var basic = !globals.Reflect.defineProperty(1, 'test', {
                value: 1
              });
              // "extensible" fails on Edge 0.12
              var extensible = typeof Object.preventExtensions !== 'function' || !globals.Reflect.defineProperty(Object.preventExtensions({}), 'test', {});
              return basic && extensible;
            })) {
              overrideNative(globals.Reflect, 'defineProperty', ReflectShims.defineProperty);
            }
          }
          if (globals.Reflect.construct) {
            if (!valueOrFalseIfThrows(function () {
              var F = function F() {};
              return globals.Reflect.construct(function () {}, [], F) instanceof F;
            })) {
              overrideNative(globals.Reflect, 'construct', ReflectShims.construct);
            }
          }
          if (String(new Date(NaN)) !== 'Invalid Date') {
            var dateToString = Date.prototype.toString;
            var shimmedDateToString = function toString() {
              var valueOf = +this;
              if (valueOf !== valueOf) {
                return 'Invalid Date';
              }
              return ES.Call(dateToString, this);
            };
            overrideNative(Date.prototype, 'toString', shimmedDateToString);
          }

          // Annex B HTML methods
          // http://www.ecma-international.org/ecma-262/6.0/#sec-additional-properties-of-the-string.prototype-object
          var stringHTMLshims = {
            anchor: function anchor(name) {
              return ES.CreateHTML(this, 'a', 'name', name);
            },
            big: function big() {
              return ES.CreateHTML(this, 'big', '', '');
            },
            blink: function blink() {
              return ES.CreateHTML(this, 'blink', '', '');
            },
            bold: function bold() {
              return ES.CreateHTML(this, 'b', '', '');
            },
            fixed: function fixed() {
              return ES.CreateHTML(this, 'tt', '', '');
            },
            fontcolor: function fontcolor(color) {
              return ES.CreateHTML(this, 'font', 'color', color);
            },
            fontsize: function fontsize(size) {
              return ES.CreateHTML(this, 'font', 'size', size);
            },
            italics: function italics() {
              return ES.CreateHTML(this, 'i', '', '');
            },
            link: function link(url) {
              return ES.CreateHTML(this, 'a', 'href', url);
            },
            small: function small() {
              return ES.CreateHTML(this, 'small', '', '');
            },
            strike: function strike() {
              return ES.CreateHTML(this, 'strike', '', '');
            },
            sub: function sub() {
              return ES.CreateHTML(this, 'sub', '', '');
            },
            sup: function sub() {
              return ES.CreateHTML(this, 'sup', '', '');
            }
          };
          _forEach(Object.keys(stringHTMLshims), function (key) {
            var method = String.prototype[key];
            var shouldOverwrite = false;
            if (ES.IsCallable(method)) {
              var output = _call(method, '', ' " ');
              var quotesCount = _concat([], output.match(/"/g)).length;
              shouldOverwrite = output !== output.toLowerCase() || quotesCount > 2;
            } else {
              shouldOverwrite = true;
            }
            if (shouldOverwrite) {
              overrideNative(String.prototype, key, stringHTMLshims[key]);
            }
          });
          var JSONstringifiesSymbols = function () {
            // Microsoft Edge v0.12 stringifies Symbols incorrectly
            if (!hasSymbols) {
              return false;
            } // Symbols are not supported
            var stringify = (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === 'object' && typeof JSON.stringify === 'function' ? JSON.stringify : null;
            if (!stringify) {
              return false;
            } // JSON.stringify is not supported
            if (typeof stringify(_Symbol()) !== 'undefined') {
              return true;
            } // Symbols should become `undefined`
            if (stringify([_Symbol()]) !== '[null]') {
              return true;
            } // Symbols in arrays should become `null`
            var obj = {
              a: _Symbol()
            };
            obj[_Symbol()] = true;
            if (stringify(obj) !== '{}') {
              return true;
            } // Symbol-valued keys *and* Symbol-valued properties should be omitted
            return false;
          }();
          var JSONstringifyAcceptsObjectSymbol = valueOrFalseIfThrows(function () {
            // Chrome 45 throws on stringifying object symbols
            if (!hasSymbols) {
              return true;
            } // Symbols are not supported
            return JSON.stringify(Object(_Symbol())) === '{}' && JSON.stringify([Object(_Symbol())]) === '[{}]';
          });
          if (JSONstringifiesSymbols || !JSONstringifyAcceptsObjectSymbol) {
            var origStringify = JSON.stringify;
            overrideNative(JSON, 'stringify', function stringify(value) {
              if (_typeof(value) === 'symbol') {
                return;
              }
              var replacer;
              if (arguments.length > 1) {
                replacer = arguments[1];
              }
              var args = [value];
              if (!isArray(replacer)) {
                var replaceFn = ES.IsCallable(replacer) ? replacer : null;
                var wrappedReplacer = function wrappedReplacer(key, val) {
                  var parsedValue = replaceFn ? _call(replaceFn, this, key, val) : val;
                  if (_typeof(parsedValue) !== 'symbol') {
                    if (Type.symbol(parsedValue)) {
                      return assignTo({})(parsedValue);
                    }
                    return parsedValue;
                  }
                };
                args.push(wrappedReplacer);
              } else {
                // create wrapped replacer that handles an array replacer?
                args.push(replacer);
              }
              if (arguments.length > 2) {
                args.push(arguments[2]);
              }
              return origStringify.apply(this, args);
            });
          }
          return globals;
        });
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/es7-shim-6.0.0/es7-shim.jsfl": (
    /*!*****************************************************!*\
      !*** ./Third/polyfill/es7-shim-6.0.0/es7-shim.jsfl ***!
      \*****************************************************/
    /***/
    function _Third_polyfill_es7Shim600_es7ShimJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        (function e(t, n, r) {
          function s(o, u) {
            if (!n[o]) {
              if (!t[o]) {
                var a = undefined;
                if (!u && a) return require(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = 'MODULE_NOT_FOUND', f;
              }
              var l = n[o] = {
                exports: {}
              };
              t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e);
              }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
          }
          var i = undefined;
          for (var o = 0; o < r.length; o++) s(r[o]);
          return s;
        })({
          1: [function (require, module, exports) {
            'use strict';

            var proto = require('./Array.prototype');
            module.exports = {
              prototype: proto,
              shim: function shimArray() {
                proto.shim();
              }
            };
          }, {
            './Array.prototype': 3
          }],
          2: [function (require, module, exports) {
            'use strict';

            module.exports = require('array-includes');
          }, {
            'array-includes': 14
          }],
          3: [function (require, module, exports) {
            'use strict';

            var includes = require('./Array.prototype.includes');
            module.exports = {
              includes: includes,
              shim: function shimArrayPrototype() {
                includes.shim();
              }
            };
          }, {
            './Array.prototype.includes': 2
          }],
          4: [function (require, module, exports) {
            'use strict';

            var getDescriptors = require('object.getownpropertydescriptors');
            var entries = require('object.entries');
            var values = require('object.values');
            module.exports = {
              entries: entries,
              getOwnPropertyDescriptors: getDescriptors,
              shim: function shimObject() {
                getDescriptors.shim();
                entries.shim();
                values.shim();
              },
              values: values
            };
          }, {
            'object.entries': 38,
            'object.getownpropertydescriptors': 64,
            'object.values': 89
          }],
          5: [function (require, module, exports) {
            'use strict';

            var stringPrototype = require('./String.prototype');
            module.exports = {
              prototype: stringPrototype,
              shim: function shimString() {
                stringPrototype.shim();
              }
            };
          }, {
            './String.prototype': 7
          }],
          6: [function (require, module, exports) {
            'use strict';

            module.exports = require('string-at');
          }, {
            'string-at': 114
          }],
          7: [function (require, module, exports) {
            'use strict';

            var at = require('./String.prototype.at');
            var padStart = require('./String.prototype.padStart');
            var padEnd = require('./String.prototype.padEnd');
            var trimLeft = require('./String.prototype.trimLeft');
            var trimRight = require('./String.prototype.trimRight');
            module.exports = {
              at: at,
              padStart: padStart,
              padEnd: padEnd,
              trimLeft: trimLeft,
              trimRight: trimRight,
              shim: function shimStringPrototype() {
                at.shim();
                padStart.shim();
                padEnd.shim();
                trimLeft.shim();
                trimRight.shim();
              }
            };
          }, {
            './String.prototype.at': 6,
            './String.prototype.padEnd': 8,
            './String.prototype.padStart': 9,
            './String.prototype.trimLeft': 10,
            './String.prototype.trimRight': 11
          }],
          8: [function (require, module, exports) {
            'use strict';

            module.exports = require('string.prototype.padend');
          }, {
            'string.prototype.padend': 137
          }],
          9: [function (require, module, exports) {
            'use strict';

            module.exports = require('string.prototype.padstart');
          }, {
            'string.prototype.padstart': 162
          }],
          10: [function (require, module, exports) {
            'use strict';

            module.exports = require('string.prototype.trimleft');
          }, {
            'string.prototype.trimleft': 187
          }],
          11: [function (require, module, exports) {
            'use strict';

            module.exports = require('string.prototype.trimright');
          }, {
            'string.prototype.trimright': 197
          }],
          12: [function (require, module, exports) {
            /*!
             * https://github.com/es-shims/es7-shim
             * @license es7-shim Copyright 2014 by contributors, MIT License
             * see https://github.com/es-shims/es7-shim/blob/master/LICENSE
             */

            'use strict';

            var $Array = require('./Array');
            var $Object = require('./Object');
            var $String = require('./String');
            module.exports = {
              Array: $Array,
              Object: $Object,
              String: $String,
              shim: function shimES7() {
                $Array.shim();
                $Object.shim();
                $String.shim();
              }
            };
          }, {
            './Array': 1,
            './Object': 4,
            './String': 5
          }],
          13: [function (require, module, exports) {
            (function (global) {
              'use strict';

              var ES = require('es-abstract/es6');
              var $isNaN = Number.isNaN || function (a) {
                return a !== a;
              };
              var $isFinite = Number.isFinite || function (n) {
                return typeof n === 'number' && global.isFinite(n);
              };
              var indexOf = Array.prototype.indexOf;
              module.exports = function includes(searchElement) {
                var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
                if (indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
                  return indexOf.apply(this, arguments) > -1;
                }
                var O = ES.ToObject(this);
                var length = ES.ToLength(O.length);
                if (length === 0) {
                  return false;
                }
                var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
                while (k < length) {
                  if (ES.SameValueZero(searchElement, O[k])) {
                    return true;
                  }
                  k += 1;
                }
                return false;
              };
            }).call(this, typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
          }, {
            'es-abstract/es6': 17
          }],
          14: [function (require, module, exports) {
            'use strict';

            var define = require('define-properties');
            var ES = require('es-abstract/es6');
            var implementation = require('./implementation');
            var getPolyfill = require('./polyfill');
            var polyfill = getPolyfill();
            var shim = require('./shim');
            var slice = Array.prototype.slice;

            /* eslint-disable no-unused-vars */
            var boundIncludesShim = function includes(array, searchElement) {
              /* eslint-enable no-unused-vars */
              ES.RequireObjectCoercible(array);
              return polyfill.apply(array, slice.call(arguments, 1));
            };
            define(boundIncludesShim, {
              implementation: implementation,
              getPolyfill: getPolyfill,
              shim: shim
            });
            module.exports = boundIncludesShim;
          }, {
            './implementation': 13,
            './polyfill': 35,
            './shim': 36,
            'define-properties': 15,
            'es-abstract/es6': 17
          }],
          15: [function (require, module, exports) {
            'use strict';

            var keys = require('object-keys');
            var foreach = require('foreach');
            var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';
            var toStr = Object.prototype.toString;
            var isFunction = function isFunction(fn) {
              return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
            };
            var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
              var obj = {};
              try {
                Object.defineProperty(obj, 'x', {
                  enumerable: false,
                  value: obj
                });
                /* eslint-disable no-unused-vars, no-restricted-syntax */
                for (var _ in obj) {
                  return false;
                }
                /* eslint-enable no-unused-vars, no-restricted-syntax */
                return obj.x === obj;
              } catch (e) {
                /* this is IE 8. */
                return false;
              }
            };
            var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();
            var defineProperty = function defineProperty(object, name, value, predicate) {
              if (name in object && (!isFunction(predicate) || !predicate())) {
                return;
              }
              if (supportsDescriptors) {
                Object.defineProperty(object, name, {
                  configurable: true,
                  enumerable: false,
                  value: value,
                  writable: true
                });
              } else {
                object[name] = value;
              }
            };
            var defineProperties = function defineProperties(object, map) {
              var predicates = arguments.length > 2 ? arguments[2] : {};
              var props = keys(map);
              if (hasSymbols) {
                props = props.concat(Object.getOwnPropertySymbols(map));
              }
              foreach(props, function (name) {
                defineProperty(object, name, map[name], predicates[name]);
              });
            };
            defineProperties.supportsDescriptors = !!supportsDescriptors;
            module.exports = defineProperties;
          }, {
            foreach: 26,
            'object-keys': 33
          }],
          16: [function (require, module, exports) {
            'use strict';

            var $isNaN = Number.isNaN || function (a) {
              return a !== a;
            };
            var $isFinite = require('./helpers/isFinite');
            var sign = require('./helpers/sign');
            var mod = require('./helpers/mod');
            var IsCallable = require('is-callable');
            var toPrimitive = require('es-to-primitive/es5');

            // https://es5.github.io/#x9
            var ES5 = {
              ToPrimitive: toPrimitive,
              ToBoolean: function ToBoolean(value) {
                return Boolean(value);
              },
              ToNumber: function ToNumber(value) {
                return Number(value);
              },
              ToInteger: function ToInteger(value) {
                var number = this.ToNumber(value);
                if ($isNaN(number)) {
                  return 0;
                }
                if (number === 0 || !$isFinite(number)) {
                  return number;
                }
                return sign(number) * Math.floor(Math.abs(number));
              },
              ToInt32: function ToInt32(x) {
                return this.ToNumber(x) >> 0;
              },
              ToUint32: function ToUint32(x) {
                return this.ToNumber(x) >>> 0;
              },
              ToUint16: function ToUint16(value) {
                var number = this.ToNumber(value);
                if ($isNaN(number) || number === 0 || !$isFinite(number)) {
                  return 0;
                }
                var posInt = sign(number) * Math.floor(Math.abs(number));
                return mod(posInt, 0x10000);
              },
              ToString: function ToString(value) {
                return String(value);
              },
              ToObject: function ToObject(value) {
                this.CheckObjectCoercible(value);
                return Object(value);
              },
              CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
                /* jshint eqnull:true */
                if (value == null) {
                  throw new TypeError(optMessage || 'Cannot call method on ' + value);
                }
                return value;
              },
              IsCallable: IsCallable,
              SameValue: function SameValue(x, y) {
                if (x === y) {
                  // 0 === -0, but they are not identical.
                  if (x === 0) {
                    return 1 / x === 1 / y;
                  }
                  return true;
                }
                return $isNaN(x) && $isNaN(y);
              }
            };
            module.exports = ES5;
          }, {
            './helpers/isFinite': 19,
            './helpers/mod': 21,
            './helpers/sign': 22,
            'es-to-primitive/es5': 23,
            'is-callable': 29
          }],
          17: [function (require, module, exports) {
            'use strict';

            var toStr = Object.prototype.toString;
            var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';
            var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;
            var $isNaN = Number.isNaN || function (a) {
              return a !== a;
            };
            var $isFinite = require('./helpers/isFinite');
            var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
            var assign = require('./helpers/assign');
            var sign = require('./helpers/sign');
            var mod = require('./helpers/mod');
            var isPrimitive = require('./helpers/isPrimitive');
            var toPrimitive = require('es-to-primitive/es6');
            var parseInteger = parseInt;
            var bind = require('function-bind');
            var strSlice = bind.call(Function.call, String.prototype.slice);
            var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
            var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
            var nonWS = ["\x85", "\u200B", "\uFFFE"].join('');
            var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
            var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
            var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
            var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

            // whitespace from: http://es5.github.io/#x15.5.4.20
            // implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
            var ws = ["\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003", "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028", "\u2029\uFEFF"].join('');
            var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
            var replace = bind.call(Function.call, String.prototype.replace);
            var trim = function trim(value) {
              return replace(value, trimRegex, '');
            };
            var ES5 = require('./es5');
            var hasRegExpMatcher = require('is-regex');

            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
            var ES6 = assign(assign({}, ES5), {
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
              Call: function Call(F, V) {
                var args = arguments.length > 2 ? arguments[2] : [];
                if (!this.IsCallable(F)) {
                  throw new TypeError(F + ' is not a function');
                }
                return F.apply(V, args);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
              ToPrimitive: toPrimitive,
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
              // ToBoolean: ES5.ToBoolean,

              // http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
              ToNumber: function ToNumber(argument) {
                var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
                if (_typeof(value) === 'symbol') {
                  throw new TypeError('Cannot convert a Symbol value to a number');
                }
                if (typeof value === 'string') {
                  if (isBinary(value)) {
                    return this.ToNumber(parseInteger(strSlice(value, 2), 2));
                  } else if (isOctal(value)) {
                    return this.ToNumber(parseInteger(strSlice(value, 2), 8));
                  } else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
                    return NaN;
                  } else {
                    var trimmed = trim(value);
                    if (trimmed !== value) {
                      return this.ToNumber(trimmed);
                    }
                  }
                }
                return Number(value);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
              // ToInteger: ES5.ToNumber,

              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
              // ToInt32: ES5.ToInt32,

              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
              // ToUint32: ES5.ToUint32,

              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
              ToInt16: function ToInt16(argument) {
                var int16bit = this.ToUint16(argument);
                return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
              // ToUint16: ES5.ToUint16,

              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
              ToInt8: function ToInt8(argument) {
                var int8bit = this.ToUint8(argument);
                return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
              ToUint8: function ToUint8(argument) {
                var number = this.ToNumber(argument);
                if ($isNaN(number) || number === 0 || !$isFinite(number)) {
                  return 0;
                }
                var posInt = sign(number) * Math.floor(Math.abs(number));
                return mod(posInt, 0x100);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
              ToUint8Clamp: function ToUint8Clamp(argument) {
                var number = this.ToNumber(argument);
                if ($isNaN(number) || number <= 0) {
                  return 0;
                }
                if (number >= 0xff) {
                  return 0xff;
                }
                var f = Math.floor(argument);
                if (f + 0.5 < number) {
                  return f + 1;
                }
                if (number < f + 0.5) {
                  return f;
                }
                if (f % 2 !== 0) {
                  return f + 1;
                }
                return f;
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
              ToString: function ToString(argument) {
                if (_typeof(argument) === 'symbol') {
                  throw new TypeError('Cannot convert a Symbol value to a string');
                }
                return String(argument);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
              ToObject: function ToObject(value) {
                this.RequireObjectCoercible(value);
                return Object(value);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
              ToPropertyKey: function ToPropertyKey(argument) {
                var key = this.ToPrimitive(argument, String);
                return _typeof(key) === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
              ToLength: function ToLength(argument) {
                var len = this.ToInteger(argument);
                if (len <= 0) {
                  return 0;
                } // includes converting -0 to +0
                if (len > MAX_SAFE_INTEGER) {
                  return MAX_SAFE_INTEGER;
                }
                return len;
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-canonicalnumericindexstring
              CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
                if (toStr.call(argument) !== '[object String]') {
                  throw new TypeError('must be a string');
                }
                if (argument === '-0') {
                  return -0;
                }
                var n = this.ToNumber(argument);
                if (this.SameValue(this.ToString(n), argument)) {
                  return n;
                }
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
              RequireObjectCoercible: ES5.CheckObjectCoercible,
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
              IsArray: Array.isArray || function IsArray(argument) {
                return toStr.call(argument) === '[object Array]';
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
              // IsCallable: ES5.IsCallable,

              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
              IsConstructor: function IsConstructor(argument) {
                return this.IsCallable(argument); // unfortunately there's no way to truly check this without try/catch `new argument`
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
              IsExtensible: function IsExtensible(obj) {
                if (!Object.preventExtensions) {
                  return true;
                }
                if (isPrimitive(obj)) {
                  return false;
                }
                return Object.isExtensible(obj);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
              IsInteger: function IsInteger(argument) {
                if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
                  return false;
                }
                var abs = Math.abs(argument);
                return Math.floor(abs) === abs;
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
              IsPropertyKey: function IsPropertyKey(argument) {
                return typeof argument === 'string' || _typeof(argument) === 'symbol';
              },
              // http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
              IsRegExp: function IsRegExp(argument) {
                if (!argument || _typeof(argument) !== 'object') {
                  return false;
                }
                if (hasSymbols) {
                  var isRegExp = RegExp[Symbol.match];
                  if (typeof isRegExp !== 'undefined') {
                    return ES5.ToBoolean(isRegExp);
                  }
                }
                return hasRegExpMatcher(argument);
              },
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
              // SameValue: ES5.SameValue,

              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
              SameValueZero: function SameValueZero(x, y) {
                return x === y || $isNaN(x) && $isNaN(y);
              }
            });
            delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

            module.exports = ES6;
          }, {
            './es5': 16,
            './helpers/assign': 18,
            './helpers/isFinite': 19,
            './helpers/isPrimitive': 20,
            './helpers/mod': 21,
            './helpers/sign': 22,
            'es-to-primitive/es6': 24,
            'function-bind': 28,
            'is-regex': 31
          }],
          18: [function (require, module, exports) {
            var has = Object.prototype.hasOwnProperty;
            module.exports = Object.assign || function assign(target, source) {
              for (var key in source) {
                if (has.call(source, key)) {
                  target[key] = source[key];
                }
              }
              return target;
            };
          }, {}],
          19: [function (require, module, exports) {
            var $isNaN = Number.isNaN || function (a) {
              return a !== a;
            };
            module.exports = Number.isFinite || function (x) {
              return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
            };
          }, {}],
          20: [function (require, module, exports) {
            module.exports = function isPrimitive(value) {
              return value === null || typeof value !== 'function' && _typeof(value) !== 'object';
            };
          }, {}],
          21: [function (require, module, exports) {
            module.exports = function mod(number, modulo) {
              var remain = number % modulo;
              return Math.floor(remain >= 0 ? remain : remain + modulo);
            };
          }, {}],
          22: [function (require, module, exports) {
            module.exports = function sign(number) {
              return number >= 0 ? 1 : -1;
            };
          }, {}],
          23: [function (require, module, exports) {
            'use strict';

            var toStr = Object.prototype.toString;
            var isPrimitive = require('./helpers/isPrimitive');
            var isCallable = require('is-callable');

            // https://es5.github.io/#x8.12
            var ES5internalSlots = {
              '[[DefaultValue]]': function DefaultValue(O, hint) {
                var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);
                if (actualHint === String || actualHint === Number) {
                  var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
                  var value, i;
                  for (i = 0; i < methods.length; ++i) {
                    if (isCallable(O[methods[i]])) {
                      value = O[methods[i]]();
                      if (isPrimitive(value)) {
                        return value;
                      }
                    }
                  }
                  throw new TypeError('No default value');
                }
                throw new TypeError('invalid [[DefaultValue]] hint supplied');
              }
            };

            // https://es5.github.io/#x9
            module.exports = function ToPrimitive(input, PreferredType) {
              if (isPrimitive(input)) {
                return input;
              }
              return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
            };
          }, {
            './helpers/isPrimitive': 25,
            'is-callable': 29
          }],
          24: [function (require, module, exports) {
            'use strict';

            var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';
            var isPrimitive = require('./helpers/isPrimitive');
            var isCallable = require('is-callable');
            var isDate = require('is-date-object');
            var isSymbol = require('is-symbol');
            var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
              if (typeof O === 'undefined' || O === null) {
                throw new TypeError('Cannot call method on ' + O);
              }
              if (typeof hint !== 'string' || hint !== 'number' && hint !== 'string') {
                throw new TypeError('hint must be "string" or "number"');
              }
              var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
              var method, result, i;
              for (i = 0; i < methodNames.length; ++i) {
                method = O[methodNames[i]];
                if (isCallable(method)) {
                  result = method.call(O);
                  if (isPrimitive(result)) {
                    return result;
                  }
                }
              }
              throw new TypeError('No default value');
            };
            var GetMethod = function GetMethod(O, P) {
              var func = O[P];
              if (func !== null && typeof func !== 'undefined') {
                if (!isCallable(func)) {
                  throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
                }
                return func;
              }
            };

            // http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
            module.exports = function ToPrimitive(input, PreferredType) {
              if (isPrimitive(input)) {
                return input;
              }
              var hint = 'default';
              if (arguments.length > 1) {
                if (PreferredType === String) {
                  hint = 'string';
                } else if (PreferredType === Number) {
                  hint = 'number';
                }
              }
              var exoticToPrim;
              if (hasSymbols) {
                if (Symbol.toPrimitive) {
                  exoticToPrim = GetMethod(input, Symbol.toPrimitive);
                } else if (isSymbol(input)) {
                  exoticToPrim = Symbol.prototype.valueOf;
                }
              }
              if (typeof exoticToPrim !== 'undefined') {
                var result = exoticToPrim.call(input, hint);
                if (isPrimitive(result)) {
                  return result;
                }
                throw new TypeError('unable to convert exotic object to primitive');
              }
              if (hint === 'default' && (isDate(input) || isSymbol(input))) {
                hint = 'string';
              }
              return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
            };
          }, {
            './helpers/isPrimitive': 25,
            'is-callable': 29,
            'is-date-object': 30,
            'is-symbol': 32
          }],
          25: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          26: [function (require, module, exports) {
            var hasOwn = Object.prototype.hasOwnProperty;
            var toString = Object.prototype.toString;
            module.exports = function forEach(obj, fn, ctx) {
              if (toString.call(fn) !== '[object Function]') {
                throw new TypeError('iterator must be a function');
              }
              var l = obj.length;
              if (l === +l) {
                for (var i = 0; i < l; i++) {
                  fn.call(ctx, obj[i], i, obj);
                }
              } else {
                for (var k in obj) {
                  if (hasOwn.call(obj, k)) {
                    fn.call(ctx, obj[k], k, obj);
                  }
                }
              }
            };
          }, {}],
          27: [function (require, module, exports) {
            var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
            var slice = Array.prototype.slice;
            var toStr = Object.prototype.toString;
            var funcType = '[object Function]';
            module.exports = function bind(that) {
              var target = this;
              if (typeof target !== 'function' || toStr.call(target) !== funcType) {
                throw new TypeError(ERROR_MESSAGE + target);
              }
              var args = slice.call(arguments, 1);
              var bound;
              var binder = function binder() {
                if (this instanceof bound) {
                  var result = target.apply(this, args.concat(slice.call(arguments)));
                  if (Object(result) === result) {
                    return result;
                  }
                  return this;
                } else {
                  return target.apply(that, args.concat(slice.call(arguments)));
                }
              };
              var boundLength = Math.max(0, target.length - args.length);
              var boundArgs = [];
              for (var i = 0; i < boundLength; i++) {
                boundArgs.push('$' + i);
              }
              bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
              if (target.prototype) {
                var Empty = function Empty() {};
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                Empty.prototype = null;
              }
              return bound;
            };
          }, {}],
          28: [function (require, module, exports) {
            var implementation = require('./implementation');
            module.exports = Function.prototype.bind || implementation;
          }, {
            './implementation': 27
          }],
          29: [function (require, module, exports) {
            'use strict';

            var fnToStr = Function.prototype.toString;
            var constructorRegex = /^\s*class /;
            var isES6ClassFn = function isES6ClassFn(value) {
              try {
                var fnStr = fnToStr.call(value);
                var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
                var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
                var spaceStripped = multiStripped.replace(/\n/gm, ' ').replace(/ {2}/g, ' ');
                return constructorRegex.test(spaceStripped);
              } catch (e) {
                return false; // not a function
              }
            };
            var tryFunctionObject = function tryFunctionObject(value) {
              try {
                if (isES6ClassFn(value)) {
                  return false;
                }
                fnToStr.call(value);
                return true;
              } catch (e) {
                return false;
              }
            };
            var toStr = Object.prototype.toString;
            var fnClass = '[object Function]';
            var genClass = '[object GeneratorFunction]';
            var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
            module.exports = function isCallable(value) {
              if (!value) {
                return false;
              }
              if (typeof value !== 'function' && _typeof(value) !== 'object') {
                return false;
              }
              if (hasToStringTag) {
                return tryFunctionObject(value);
              }
              if (isES6ClassFn(value)) {
                return false;
              }
              var strClass = toStr.call(value);
              return strClass === fnClass || strClass === genClass;
            };
          }, {}],
          30: [function (require, module, exports) {
            'use strict';

            var getDay = Date.prototype.getDay;
            var tryDateObject = function tryDateObject(value) {
              try {
                getDay.call(value);
                return true;
              } catch (e) {
                return false;
              }
            };
            var toStr = Object.prototype.toString;
            var dateClass = '[object Date]';
            var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
            module.exports = function isDateObject(value) {
              if (_typeof(value) !== 'object' || value === null) {
                return false;
              }
              return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
            };
          }, {}],
          31: [function (require, module, exports) {
            'use strict';

            var regexExec = RegExp.prototype.exec;
            var tryRegexExec = function tryRegexExec(value) {
              try {
                regexExec.call(value);
                return true;
              } catch (e) {
                return false;
              }
            };
            var toStr = Object.prototype.toString;
            var regexClass = '[object RegExp]';
            var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
            module.exports = function isRegex(value) {
              if (_typeof(value) !== 'object') {
                return false;
              }
              return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
            };
          }, {}],
          32: [function (require, module, exports) {
            'use strict';

            var toStr = Object.prototype.toString;
            var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';
            if (hasSymbols) {
              var symToStr = Symbol.prototype.toString;
              var symStringRegex = /^Symbol\(.*\)$/;
              var isSymbolObject = function isSymbolObject(value) {
                if (_typeof(value.valueOf()) !== 'symbol') {
                  return false;
                }
                return symStringRegex.test(symToStr.call(value));
              };
              module.exports = function isSymbol(value) {
                if (_typeof(value) === 'symbol') {
                  return true;
                }
                if (toStr.call(value) !== '[object Symbol]') {
                  return false;
                }
                try {
                  return isSymbolObject(value);
                } catch (e) {
                  return false;
                }
              };
            } else {
              module.exports = function isSymbol(value) {
                // this environment does not support Symbols.
                return false;
              };
            }
          }, {}],
          33: [function (require, module, exports) {
            'use strict';

            // modified from https://github.com/es-shims/es5-shim
            var has = Object.prototype.hasOwnProperty;
            var toStr = Object.prototype.toString;
            var slice = Array.prototype.slice;
            var isArgs = require('./isArguments');
            var hasDontEnumBug = !{
              toString: null
            }.propertyIsEnumerable('toString');
            var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
            var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
            var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
              var ctor = o.constructor;
              return ctor && ctor.prototype === o;
            };
            var blacklistedKeys = {
              $console: true,
              $frame: true,
              $frameElement: true,
              $frames: true,
              $parent: true,
              $self: true,
              $webkitIndexedDB: true,
              $webkitStorageInfo: true,
              $window: true
            };
            var hasAutomationEqualityBug = function () {
              /* global window */
              if (typeof window === 'undefined') {
                return false;
              }
              for (var k in window) {
                try {
                  if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
                    try {
                      equalsConstructorPrototype(window[k]);
                    } catch (e) {
                      return true;
                    }
                  }
                } catch (e) {
                  return true;
                }
              }
              return false;
            }();
            var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
              /* global window */
              if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
                return equalsConstructorPrototype(o);
              }
              try {
                return equalsConstructorPrototype(o);
              } catch (e) {
                return false;
              }
            };
            var keysShim = function keys(object) {
              var isObject = object !== null && _typeof(object) === 'object';
              var isFunction = toStr.call(object) === '[object Function]';
              var isArguments = isArgs(object);
              var isString = isObject && toStr.call(object) === '[object String]';
              var theKeys = [];
              if (!isObject && !isFunction && !isArguments) {
                throw new TypeError('Object.keys called on a non-object');
              }
              var skipProto = hasProtoEnumBug && isFunction;
              if (isString && object.length > 0 && !has.call(object, 0)) {
                for (var i = 0; i < object.length; ++i) {
                  theKeys.push(String(i));
                }
              }
              if (isArguments && object.length > 0) {
                for (var j = 0; j < object.length; ++j) {
                  theKeys.push(String(j));
                }
              } else {
                for (var name in object) {
                  if (!(skipProto && name === 'prototype') && has.call(object, name)) {
                    theKeys.push(String(name));
                  }
                }
              }
              if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                for (var k = 0; k < dontEnums.length; ++k) {
                  if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                    theKeys.push(dontEnums[k]);
                  }
                }
              }
              return theKeys;
            };
            keysShim.shim = function shimObjectKeys() {
              if (Object.keys) {
                var keysWorksWithArguments = function () {
                  // Safari 5.0 bug
                  return (Object.keys(arguments) || '').length === 2;
                }(1, 2);
                if (!keysWorksWithArguments) {
                  var originalKeys = Object.keys;
                  Object.keys = function keys(object) {
                    if (isArgs(object)) {
                      return originalKeys(slice.call(object));
                    } else {
                      return originalKeys(object);
                    }
                  };
                }
              } else {
                Object.keys = keysShim;
              }
              return Object.keys || keysShim;
            };
            module.exports = keysShim;
          }, {
            './isArguments': 34
          }],
          34: [function (require, module, exports) {
            'use strict';

            var toStr = Object.prototype.toString;
            module.exports = function isArguments(value) {
              var str = toStr.call(value);
              var isArgs = str === '[object Arguments]';
              if (!isArgs) {
                isArgs = str !== '[object Array]' && value !== null && _typeof(value) === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
              }
              return isArgs;
            };
          }, {}],
          35: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              return Array.prototype.includes || implementation;
            };
          }, {
            './implementation': 13
          }],
          36: [function (require, module, exports) {
            'use strict';

            var define = require('define-properties');
            var getPolyfill = require('./polyfill');
            module.exports = function shimArrayPrototypeIncludes() {
              var polyfill = getPolyfill();
              if (Array.prototype.includes !== polyfill) {
                define(Array.prototype, {
                  includes: polyfill
                });
              }
              return polyfill;
            };
          }, {
            './polyfill': 35,
            'define-properties': 15
          }],
          37: [function (require, module, exports) {
            'use strict';

            var ES = require('es-abstract/es7');
            var has = require('has');
            var bind = require('function-bind');
            var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
            module.exports = function entries(O) {
              var obj = ES.RequireObjectCoercible(O);
              var entrys = [];
              for (var key in obj) {
                if (has(obj, key) && isEnumerable(obj, key)) {
                  entrys.push([key, obj[key]]);
                }
              }
              return entrys;
            };
          }, {
            'es-abstract/es7': 42,
            'function-bind': 53,
            has: 54
          }],
          38: [function (require, module, exports) {
            'use strict';

            var define = require('define-properties');
            var implementation = require('./implementation');
            var getPolyfill = require('./polyfill');
            var shim = require('./shim');
            define(implementation, {
              getPolyfill: getPolyfill,
              implementation: implementation,
              shim: shim
            });
            module.exports = implementation;
          }, {
            './implementation': 37,
            './polyfill': 61,
            './shim': 62,
            'define-properties': 39
          }],
          39: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 51,
            'object-keys': 59
          }],
          40: [function (require, module, exports) {
            arguments[4][16][0].apply(exports, arguments);
          }, {
            './helpers/isFinite': 44,
            './helpers/mod': 46,
            './helpers/sign': 47,
            dup: 16,
            'es-to-primitive/es5': 48,
            'is-callable': 55
          }],
          41: [function (require, module, exports) {
            arguments[4][17][0].apply(exports, arguments);
          }, {
            './es5': 40,
            './helpers/assign': 43,
            './helpers/isFinite': 44,
            './helpers/isPrimitive': 45,
            './helpers/mod': 46,
            './helpers/sign': 47,
            dup: 17,
            'es-to-primitive/es6': 49,
            'function-bind': 53,
            'is-regex': 57
          }],
          42: [function (require, module, exports) {
            'use strict';

            var ES6 = require('./es6');
            var assign = require('./helpers/assign');
            var ES7 = assign(ES6, {
              // https://github.com/tc39/ecma262/pull/60
              SameValueNonNumber: function SameValueNonNumber(x, y) {
                if (typeof x === 'number' || _typeof(x) !== _typeof(y)) {
                  throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
                }
                return this.SameValue(x, y);
              }
            });
            module.exports = ES7;
          }, {
            './es6': 41,
            './helpers/assign': 43
          }],
          43: [function (require, module, exports) {
            arguments[4][18][0].apply(exports, arguments);
          }, {
            dup: 18
          }],
          44: [function (require, module, exports) {
            arguments[4][19][0].apply(exports, arguments);
          }, {
            dup: 19
          }],
          45: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          46: [function (require, module, exports) {
            arguments[4][21][0].apply(exports, arguments);
          }, {
            dup: 21
          }],
          47: [function (require, module, exports) {
            arguments[4][22][0].apply(exports, arguments);
          }, {
            dup: 22
          }],
          48: [function (require, module, exports) {
            arguments[4][23][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 50,
            dup: 23,
            'is-callable': 55
          }],
          49: [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 50,
            dup: 24,
            'is-callable': 55,
            'is-date-object': 56,
            'is-symbol': 58
          }],
          50: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          51: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          52: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          53: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 52,
            dup: 28
          }],
          54: [function (require, module, exports) {
            var bind = require('function-bind');
            module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
          }, {
            'function-bind': 53
          }],
          55: [function (require, module, exports) {
            arguments[4][29][0].apply(exports, arguments);
          }, {
            dup: 29
          }],
          56: [function (require, module, exports) {
            arguments[4][30][0].apply(exports, arguments);
          }, {
            dup: 30
          }],
          57: [function (require, module, exports) {
            arguments[4][31][0].apply(exports, arguments);
          }, {
            dup: 31
          }],
          58: [function (require, module, exports) {
            arguments[4][32][0].apply(exports, arguments);
          }, {
            dup: 32
          }],
          59: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 60,
            dup: 33
          }],
          60: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          61: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              return typeof Object.entries === 'function' ? Object.entries : implementation;
            };
          }, {
            './implementation': 37
          }],
          62: [function (require, module, exports) {
            'use strict';

            var getPolyfill = require('./polyfill');
            var define = require('define-properties');
            module.exports = function shimEntries() {
              var polyfill = getPolyfill();
              define(Object, {
                entries: polyfill
              }, {
                entries: function entries() {
                  return Object.entries !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 61,
            'define-properties': 39
          }],
          63: [function (require, module, exports) {
            'use strict';

            var ES = require('es-abstract/es7');
            var defineProperty = Object.defineProperty;
            var getDescriptor = Object.getOwnPropertyDescriptor;
            var getOwnNames = Object.getOwnPropertyNames;
            var getSymbols = Object.getOwnPropertySymbols;
            var concat = Function.call.bind(Array.prototype.concat);
            var reduce = Function.call.bind(Array.prototype.reduce);
            var getAll = getSymbols ? function (obj) {
              return concat(getOwnNames(obj), getSymbols(obj));
            } : getOwnNames;
            var isES5 = ES.IsCallable(getDescriptor) && ES.IsCallable(getOwnNames);
            var safePut = function put(obj, prop, val) {
              if (defineProperty && prop in obj) {
                defineProperty(obj, prop, {
                  configurable: true,
                  enumerable: true,
                  value: val,
                  writable: true
                });
              } else {
                obj[prop] = val;
              }
            };
            module.exports = function getOwnPropertyDescriptors(value) {
              ES.RequireObjectCoercible(value);
              if (!isES5) {
                throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor');
              }
              var O = ES.ToObject(value);
              return reduce(getAll(O), function (acc, key) {
                safePut(acc, key, getDescriptor(O, key));
                return acc;
              }, {});
            };
          }, {
            'es-abstract/es7': 68
          }],
          64: [function (require, module, exports) {
            arguments[4][38][0].apply(exports, arguments);
          }, {
            './implementation': 63,
            './polyfill': 86,
            './shim': 87,
            'define-properties': 65,
            dup: 38
          }],
          65: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 77,
            'object-keys': 84
          }],
          66: [function (require, module, exports) {
            arguments[4][16][0].apply(exports, arguments);
          }, {
            './helpers/isFinite': 70,
            './helpers/mod': 72,
            './helpers/sign': 73,
            dup: 16,
            'es-to-primitive/es5': 74,
            'is-callable': 80
          }],
          67: [function (require, module, exports) {
            arguments[4][17][0].apply(exports, arguments);
          }, {
            './es5': 66,
            './helpers/assign': 69,
            './helpers/isFinite': 70,
            './helpers/isPrimitive': 71,
            './helpers/mod': 72,
            './helpers/sign': 73,
            dup: 17,
            'es-to-primitive/es6': 75,
            'function-bind': 79,
            'is-regex': 82
          }],
          68: [function (require, module, exports) {
            arguments[4][42][0].apply(exports, arguments);
          }, {
            './es6': 67,
            './helpers/assign': 69,
            dup: 42
          }],
          69: [function (require, module, exports) {
            arguments[4][18][0].apply(exports, arguments);
          }, {
            dup: 18
          }],
          70: [function (require, module, exports) {
            arguments[4][19][0].apply(exports, arguments);
          }, {
            dup: 19
          }],
          71: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          72: [function (require, module, exports) {
            arguments[4][21][0].apply(exports, arguments);
          }, {
            dup: 21
          }],
          73: [function (require, module, exports) {
            arguments[4][22][0].apply(exports, arguments);
          }, {
            dup: 22
          }],
          74: [function (require, module, exports) {
            arguments[4][23][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 76,
            dup: 23,
            'is-callable': 80
          }],
          75: [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 76,
            dup: 24,
            'is-callable': 80,
            'is-date-object': 81,
            'is-symbol': 83
          }],
          76: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          77: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          78: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          79: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 78,
            dup: 28
          }],
          80: [function (require, module, exports) {
            arguments[4][29][0].apply(exports, arguments);
          }, {
            dup: 29
          }],
          81: [function (require, module, exports) {
            arguments[4][30][0].apply(exports, arguments);
          }, {
            dup: 30
          }],
          82: [function (require, module, exports) {
            arguments[4][31][0].apply(exports, arguments);
          }, {
            dup: 31
          }],
          83: [function (require, module, exports) {
            arguments[4][32][0].apply(exports, arguments);
          }, {
            dup: 32
          }],
          84: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 85,
            dup: 33
          }],
          85: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          86: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              return typeof Object.getOwnPropertyDescriptors === 'function' ? Object.getOwnPropertyDescriptors : implementation;
            };
          }, {
            './implementation': 63
          }],
          87: [function (require, module, exports) {
            'use strict';

            var getPolyfill = require('./polyfill');
            var define = require('define-properties');
            module.exports = function shimGetOwnPropertyDescriptors() {
              var polyfill = getPolyfill();
              define(Object, {
                getOwnPropertyDescriptors: polyfill
              }, {
                getOwnPropertyDescriptors: function getOwnPropertyDescriptors() {
                  return Object.getOwnPropertyDescriptors !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 86,
            'define-properties': 65
          }],
          88: [function (require, module, exports) {
            'use strict';

            var ES = require('es-abstract/es7');
            var has = require('has');
            var bind = require('function-bind');
            var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
            module.exports = function values(O) {
              var obj = ES.RequireObjectCoercible(O);
              var vals = [];
              for (var key in obj) {
                if (has(obj, key) && isEnumerable(obj, key)) {
                  vals.push(obj[key]);
                }
              }
              return vals;
            };
          }, {
            'es-abstract/es7': 93,
            'function-bind': 104,
            has: 105
          }],
          89: [function (require, module, exports) {
            arguments[4][38][0].apply(exports, arguments);
          }, {
            './implementation': 88,
            './polyfill': 112,
            './shim': 113,
            'define-properties': 90,
            dup: 38
          }],
          90: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 102,
            'object-keys': 110
          }],
          91: [function (require, module, exports) {
            arguments[4][16][0].apply(exports, arguments);
          }, {
            './helpers/isFinite': 95,
            './helpers/mod': 97,
            './helpers/sign': 98,
            dup: 16,
            'es-to-primitive/es5': 99,
            'is-callable': 106
          }],
          92: [function (require, module, exports) {
            arguments[4][17][0].apply(exports, arguments);
          }, {
            './es5': 91,
            './helpers/assign': 94,
            './helpers/isFinite': 95,
            './helpers/isPrimitive': 96,
            './helpers/mod': 97,
            './helpers/sign': 98,
            dup: 17,
            'es-to-primitive/es6': 100,
            'function-bind': 104,
            'is-regex': 108
          }],
          93: [function (require, module, exports) {
            arguments[4][42][0].apply(exports, arguments);
          }, {
            './es6': 92,
            './helpers/assign': 94,
            dup: 42
          }],
          94: [function (require, module, exports) {
            arguments[4][18][0].apply(exports, arguments);
          }, {
            dup: 18
          }],
          95: [function (require, module, exports) {
            arguments[4][19][0].apply(exports, arguments);
          }, {
            dup: 19
          }],
          96: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          97: [function (require, module, exports) {
            arguments[4][21][0].apply(exports, arguments);
          }, {
            dup: 21
          }],
          98: [function (require, module, exports) {
            arguments[4][22][0].apply(exports, arguments);
          }, {
            dup: 22
          }],
          99: [function (require, module, exports) {
            arguments[4][23][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 101,
            dup: 23,
            'is-callable': 106
          }],
          100: [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 101,
            dup: 24,
            'is-callable': 106,
            'is-date-object': 107,
            'is-symbol': 109
          }],
          101: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          102: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          103: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          104: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 103,
            dup: 28
          }],
          105: [function (require, module, exports) {
            arguments[4][54][0].apply(exports, arguments);
          }, {
            dup: 54,
            'function-bind': 104
          }],
          106: [function (require, module, exports) {
            arguments[4][29][0].apply(exports, arguments);
          }, {
            dup: 29
          }],
          107: [function (require, module, exports) {
            arguments[4][30][0].apply(exports, arguments);
          }, {
            dup: 30
          }],
          108: [function (require, module, exports) {
            arguments[4][31][0].apply(exports, arguments);
          }, {
            dup: 31
          }],
          109: [function (require, module, exports) {
            arguments[4][32][0].apply(exports, arguments);
          }, {
            dup: 32
          }],
          110: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 111,
            dup: 33
          }],
          111: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          112: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              return typeof Object.values === 'function' ? Object.values : implementation;
            };
          }, {
            './implementation': 88
          }],
          113: [function (require, module, exports) {
            'use strict';

            var getPolyfill = require('./polyfill');
            var define = require('define-properties');
            module.exports = function shimValues() {
              var polyfill = getPolyfill();
              define(Object, {
                values: polyfill
              }, {
                values: function values() {
                  return Object.values !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 112,
            'define-properties': 90
          }],
          114: [function (require, module, exports) {
            'use strict';

            var define = require('define-properties');
            var ES = require('es-abstract/es7');
            var bind = require('function-bind');
            var atShim = function at(pos) {
              ES.RequireObjectCoercible(this);
              var O = ES.ToObject(this);
              var S = ES.ToString(O);
              var position = ES.ToInteger(pos);
              var size = S.length;
              if (position < 0 || position >= size) {
                return '';
              }
              // Get the first code unit and code unit value
              var cuFirst = S.charCodeAt(position);
              var cuSecond;
              var nextIndex = position + 1;
              var len = 1;
              // Check if it’s the start of a surrogate pair.
              var isHighSurrogate = cuFirst >= 0xd800 && cuFirst <= 0xdbff;
              if (isHighSurrogate && size > nextIndex /* there is a next code unit */) {
                cuSecond = S.charCodeAt(nextIndex);
                if (cuSecond >= 0xdc00 && cuSecond <= 0xdfff) {
                  // low surrogate
                  len = 2;
                }
              }
              return S.slice(position, position + len);
            };
            var at = bind.call(Function.call, atShim);
            define(at, {
              method: atShim,
              shim: function shimStringPrototypeAt() {
                define(String.prototype, {
                  at: atShim
                });
                return String.prototype.at;
              }
            });
            module.exports = at;
          }, {
            'define-properties': 115,
            'es-abstract/es7': 118,
            'function-bind': 129
          }],
          115: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 127,
            'object-keys': 134
          }],
          116: [function (require, module, exports) {
            arguments[4][16][0].apply(exports, arguments);
          }, {
            './helpers/isFinite': 120,
            './helpers/mod': 122,
            './helpers/sign': 123,
            dup: 16,
            'es-to-primitive/es5': 124,
            'is-callable': 130
          }],
          117: [function (require, module, exports) {
            arguments[4][17][0].apply(exports, arguments);
          }, {
            './es5': 116,
            './helpers/assign': 119,
            './helpers/isFinite': 120,
            './helpers/isPrimitive': 121,
            './helpers/mod': 122,
            './helpers/sign': 123,
            dup: 17,
            'es-to-primitive/es6': 125,
            'function-bind': 129,
            'is-regex': 132
          }],
          118: [function (require, module, exports) {
            arguments[4][42][0].apply(exports, arguments);
          }, {
            './es6': 117,
            './helpers/assign': 119,
            dup: 42
          }],
          119: [function (require, module, exports) {
            arguments[4][18][0].apply(exports, arguments);
          }, {
            dup: 18
          }],
          120: [function (require, module, exports) {
            arguments[4][19][0].apply(exports, arguments);
          }, {
            dup: 19
          }],
          121: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          122: [function (require, module, exports) {
            arguments[4][21][0].apply(exports, arguments);
          }, {
            dup: 21
          }],
          123: [function (require, module, exports) {
            arguments[4][22][0].apply(exports, arguments);
          }, {
            dup: 22
          }],
          124: [function (require, module, exports) {
            arguments[4][23][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 126,
            dup: 23,
            'is-callable': 130
          }],
          125: [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 126,
            dup: 24,
            'is-callable': 130,
            'is-date-object': 131,
            'is-symbol': 133
          }],
          126: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          127: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          128: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          129: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 128,
            dup: 28
          }],
          130: [function (require, module, exports) {
            arguments[4][29][0].apply(exports, arguments);
          }, {
            dup: 29
          }],
          131: [function (require, module, exports) {
            arguments[4][30][0].apply(exports, arguments);
          }, {
            dup: 30
          }],
          132: [function (require, module, exports) {
            arguments[4][31][0].apply(exports, arguments);
          }, {
            dup: 31
          }],
          133: [function (require, module, exports) {
            arguments[4][32][0].apply(exports, arguments);
          }, {
            dup: 32
          }],
          134: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 135,
            dup: 33
          }],
          135: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          136: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var ES = require('es-abstract/es7');
            var slice = bind.call(Function.call, String.prototype.slice);
            module.exports = function padEnd(maxLength) {
              var O = ES.RequireObjectCoercible(this);
              var S = ES.ToString(O);
              var stringLength = ES.ToLength(S.length);
              var fillString;
              if (arguments.length > 1) {
                fillString = arguments[1];
              }
              var filler = typeof fillString === 'undefined' ? '' : ES.ToString(fillString);
              if (filler === '') {
                filler = ' ';
              }
              var intMaxLength = ES.ToLength(maxLength);
              if (intMaxLength <= stringLength) {
                return S;
              }
              var fillLen = intMaxLength - stringLength;
              while (filler.length < fillLen) {
                var fLen = filler.length;
                var remainingCodeUnits = fillLen - fLen;
                filler += fLen > remainingCodeUnits ? slice(filler, 0, remainingCodeUnits) : filler;
              }
              var truncatedStringFiller = filler.length > fillLen ? slice(filler, 0, fillLen) : filler;
              return S + truncatedStringFiller;
            };
          }, {
            'es-abstract/es7': 141,
            'function-bind': 152
          }],
          137: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var define = require('define-properties');
            var ES = require('es-abstract/es7');
            var implementation = require('./implementation');
            var getPolyfill = require('./polyfill');
            var shim = require('./shim');
            var bound = bind.call(Function.apply, implementation);
            var boundPadEnd = function padEnd(str, maxLength) {
              ES.RequireObjectCoercible(str);
              var args = [maxLength];
              if (arguments.length > 2) {
                args.push(arguments[2]);
              }
              return bound(str, args);
            };
            define(boundPadEnd, {
              getPolyfill: getPolyfill,
              implementation: implementation,
              shim: shim
            });
            module.exports = boundPadEnd;
          }, {
            './implementation': 136,
            './polyfill': 159,
            './shim': 160,
            'define-properties': 138,
            'es-abstract/es7': 141,
            'function-bind': 152
          }],
          138: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 150,
            'object-keys': 157
          }],
          139: [function (require, module, exports) {
            arguments[4][16][0].apply(exports, arguments);
          }, {
            './helpers/isFinite': 143,
            './helpers/mod': 145,
            './helpers/sign': 146,
            dup: 16,
            'es-to-primitive/es5': 147,
            'is-callable': 153
          }],
          140: [function (require, module, exports) {
            arguments[4][17][0].apply(exports, arguments);
          }, {
            './es5': 139,
            './helpers/assign': 142,
            './helpers/isFinite': 143,
            './helpers/isPrimitive': 144,
            './helpers/mod': 145,
            './helpers/sign': 146,
            dup: 17,
            'es-to-primitive/es6': 148,
            'function-bind': 152,
            'is-regex': 155
          }],
          141: [function (require, module, exports) {
            arguments[4][42][0].apply(exports, arguments);
          }, {
            './es6': 140,
            './helpers/assign': 142,
            dup: 42
          }],
          142: [function (require, module, exports) {
            arguments[4][18][0].apply(exports, arguments);
          }, {
            dup: 18
          }],
          143: [function (require, module, exports) {
            arguments[4][19][0].apply(exports, arguments);
          }, {
            dup: 19
          }],
          144: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          145: [function (require, module, exports) {
            arguments[4][21][0].apply(exports, arguments);
          }, {
            dup: 21
          }],
          146: [function (require, module, exports) {
            arguments[4][22][0].apply(exports, arguments);
          }, {
            dup: 22
          }],
          147: [function (require, module, exports) {
            arguments[4][23][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 149,
            dup: 23,
            'is-callable': 153
          }],
          148: [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 149,
            dup: 24,
            'is-callable': 153,
            'is-date-object': 154,
            'is-symbol': 156
          }],
          149: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          150: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          151: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          152: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 151,
            dup: 28
          }],
          153: [function (require, module, exports) {
            arguments[4][29][0].apply(exports, arguments);
          }, {
            dup: 29
          }],
          154: [function (require, module, exports) {
            arguments[4][30][0].apply(exports, arguments);
          }, {
            dup: 30
          }],
          155: [function (require, module, exports) {
            arguments[4][31][0].apply(exports, arguments);
          }, {
            dup: 31
          }],
          156: [function (require, module, exports) {
            arguments[4][32][0].apply(exports, arguments);
          }, {
            dup: 32
          }],
          157: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 158,
            dup: 33
          }],
          158: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          159: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              return typeof String.prototype.padEnd === 'function' ? String.prototype.padEnd : implementation;
            };
          }, {
            './implementation': 136
          }],
          160: [function (require, module, exports) {
            'use strict';

            var getPolyfill = require('./polyfill');
            var define = require('define-properties');
            module.exports = function shimPadEnd() {
              var polyfill = getPolyfill();
              define(String.prototype, {
                padEnd: polyfill
              }, {
                padEnd: function padEnd() {
                  return String.prototype.padEnd !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 159,
            'define-properties': 138
          }],
          161: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var ES = require('es-abstract/es7');
            var slice = bind.call(Function.call, String.prototype.slice);
            module.exports = function padStart(maxLength) {
              var O = ES.RequireObjectCoercible(this);
              var S = ES.ToString(O);
              var stringLength = ES.ToLength(S.length);
              var fillString;
              if (arguments.length > 1) {
                fillString = arguments[1];
              }
              var filler = typeof fillString === 'undefined' ? '' : ES.ToString(fillString);
              if (filler === '') {
                filler = ' ';
              }
              var intMaxLength = ES.ToLength(maxLength);
              if (intMaxLength <= stringLength) {
                return S;
              }
              var fillLen = intMaxLength - stringLength;
              while (filler.length < fillLen) {
                var fLen = filler.length;
                var remainingCodeUnits = fillLen - fLen;
                filler += fLen > remainingCodeUnits ? slice(filler, 0, remainingCodeUnits) : filler;
              }
              var truncatedStringFiller = filler.length > fillLen ? slice(filler, 0, fillLen) : filler;
              return truncatedStringFiller + S;
            };
          }, {
            'es-abstract/es7': 166,
            'function-bind': 177
          }],
          162: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var define = require('define-properties');
            var ES = require('es-abstract/es7');
            var implementation = require('./implementation');
            var getPolyfill = require('./polyfill');
            var shim = require('./shim');
            var bound = bind.call(Function.apply, implementation);
            var boundPadStart = function padStart(str, maxLength) {
              ES.RequireObjectCoercible(str);
              var args = [maxLength];
              if (arguments.length > 2) {
                args.push(arguments[2]);
              }
              return bound(str, args);
            };
            define(boundPadStart, {
              getPolyfill: getPolyfill,
              implementation: implementation,
              shim: shim
            });
            module.exports = boundPadStart;
          }, {
            './implementation': 161,
            './polyfill': 184,
            './shim': 185,
            'define-properties': 163,
            'es-abstract/es7': 166,
            'function-bind': 177
          }],
          163: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 175,
            'object-keys': 182
          }],
          164: [function (require, module, exports) {
            arguments[4][16][0].apply(exports, arguments);
          }, {
            './helpers/isFinite': 168,
            './helpers/mod': 170,
            './helpers/sign': 171,
            dup: 16,
            'es-to-primitive/es5': 172,
            'is-callable': 178
          }],
          165: [function (require, module, exports) {
            arguments[4][17][0].apply(exports, arguments);
          }, {
            './es5': 164,
            './helpers/assign': 167,
            './helpers/isFinite': 168,
            './helpers/isPrimitive': 169,
            './helpers/mod': 170,
            './helpers/sign': 171,
            dup: 17,
            'es-to-primitive/es6': 173,
            'function-bind': 177,
            'is-regex': 180
          }],
          166: [function (require, module, exports) {
            arguments[4][42][0].apply(exports, arguments);
          }, {
            './es6': 165,
            './helpers/assign': 167,
            dup: 42
          }],
          167: [function (require, module, exports) {
            arguments[4][18][0].apply(exports, arguments);
          }, {
            dup: 18
          }],
          168: [function (require, module, exports) {
            arguments[4][19][0].apply(exports, arguments);
          }, {
            dup: 19
          }],
          169: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          170: [function (require, module, exports) {
            arguments[4][21][0].apply(exports, arguments);
          }, {
            dup: 21
          }],
          171: [function (require, module, exports) {
            arguments[4][22][0].apply(exports, arguments);
          }, {
            dup: 22
          }],
          172: [function (require, module, exports) {
            arguments[4][23][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 174,
            dup: 23,
            'is-callable': 178
          }],
          173: [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
          }, {
            './helpers/isPrimitive': 174,
            dup: 24,
            'is-callable': 178,
            'is-date-object': 179,
            'is-symbol': 181
          }],
          174: [function (require, module, exports) {
            arguments[4][20][0].apply(exports, arguments);
          }, {
            dup: 20
          }],
          175: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          176: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          177: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 176,
            dup: 28
          }],
          178: [function (require, module, exports) {
            arguments[4][29][0].apply(exports, arguments);
          }, {
            dup: 29
          }],
          179: [function (require, module, exports) {
            arguments[4][30][0].apply(exports, arguments);
          }, {
            dup: 30
          }],
          180: [function (require, module, exports) {
            arguments[4][31][0].apply(exports, arguments);
          }, {
            dup: 31
          }],
          181: [function (require, module, exports) {
            arguments[4][32][0].apply(exports, arguments);
          }, {
            dup: 32
          }],
          182: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 183,
            dup: 33
          }],
          183: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          184: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              return typeof String.prototype.padStart === 'function' ? String.prototype.padStart : implementation;
            };
          }, {
            './implementation': 161
          }],
          185: [function (require, module, exports) {
            'use strict';

            var getPolyfill = require('./polyfill');
            var define = require('define-properties');
            module.exports = function shimPadStart() {
              var polyfill = getPolyfill();
              define(String.prototype, {
                padStart: polyfill
              }, {
                padStart: function padStart() {
                  return String.prototype.padStart !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 184,
            'define-properties': 163
          }],
          186: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var replace = bind.call(Function.call, String.prototype.replace);
            var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;
            module.exports = function trimLeft() {
              return replace(this, leftWhitespace, '');
            };
          }, {
            'function-bind': 191
          }],
          187: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var define = require('define-properties');
            var implementation = require('./implementation');
            var getPolyfill = require('./polyfill');
            var shim = require('./shim');
            var bound = bind.call(Function.call, getPolyfill());
            define(bound, {
              getPolyfill: getPolyfill,
              implementation: implementation,
              shim: shim
            });
            module.exports = bound;
          }, {
            './implementation': 186,
            './polyfill': 194,
            './shim': 195,
            'define-properties': 188,
            'function-bind': 191
          }],
          188: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 189,
            'object-keys': 192
          }],
          189: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          190: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          191: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 190,
            dup: 28
          }],
          192: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 193,
            dup: 33
          }],
          193: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          194: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              if (!String.prototype.trimLeft) {
                return implementation;
              }
              var zeroWidthSpace = "\u200B";
              if (zeroWidthSpace.trimLeft() !== zeroWidthSpace) {
                return implementation;
              }
              return String.prototype.trimLeft;
            };
          }, {
            './implementation': 186
          }],
          195: [function (require, module, exports) {
            'use strict';

            var define = require('define-properties');
            var getPolyfill = require('./polyfill');
            module.exports = function shimTrimLeft() {
              var polyfill = getPolyfill();
              define(String.prototype, {
                trimLeft: polyfill
              }, {
                trimLeft: function trimLeft() {
                  return String.prototype.trimLeft !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 194,
            'define-properties': 188
          }],
          196: [function (require, module, exports) {
            'use strict';

            var bind = require('function-bind');
            var replace = bind.call(Function.call, String.prototype.replace);
            var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;
            module.exports = function trimRight() {
              return replace(this, rightWhitespace, '');
            };
          }, {
            'function-bind': 201
          }],
          197: [function (require, module, exports) {
            arguments[4][187][0].apply(exports, arguments);
          }, {
            './implementation': 196,
            './polyfill': 204,
            './shim': 205,
            'define-properties': 198,
            dup: 187,
            'function-bind': 201
          }],
          198: [function (require, module, exports) {
            arguments[4][15][0].apply(exports, arguments);
          }, {
            dup: 15,
            foreach: 199,
            'object-keys': 202
          }],
          199: [function (require, module, exports) {
            arguments[4][26][0].apply(exports, arguments);
          }, {
            dup: 26
          }],
          200: [function (require, module, exports) {
            arguments[4][27][0].apply(exports, arguments);
          }, {
            dup: 27
          }],
          201: [function (require, module, exports) {
            arguments[4][28][0].apply(exports, arguments);
          }, {
            './implementation': 200,
            dup: 28
          }],
          202: [function (require, module, exports) {
            arguments[4][33][0].apply(exports, arguments);
          }, {
            './isArguments': 203,
            dup: 33
          }],
          203: [function (require, module, exports) {
            arguments[4][34][0].apply(exports, arguments);
          }, {
            dup: 34
          }],
          204: [function (require, module, exports) {
            'use strict';

            var implementation = require('./implementation');
            module.exports = function getPolyfill() {
              if (!String.prototype.trimRight) {
                return implementation;
              }
              var zeroWidthSpace = "\u200B";
              if (zeroWidthSpace.trimRight() !== zeroWidthSpace) {
                return implementation;
              }
              return String.prototype.trimRight;
            };
          }, {
            './implementation': 196
          }],
          205: [function (require, module, exports) {
            'use strict';

            var define = require('define-properties');
            var getPolyfill = require('./polyfill');
            module.exports = function shimTrimRight() {
              var polyfill = getPolyfill();
              define(String.prototype, {
                trimRight: polyfill
              }, {
                trimRight: function trimRight() {
                  return String.prototype.trimRight !== polyfill;
                }
              });
              return polyfill;
            };
          }, {
            './polyfill': 204,
            'define-properties': 198
          }],
          206: [function (require, module, exports) {
            'use strict';

            module.exports = require('./es7-shim').shim();
          }, {
            './es7-shim': 12
          }]
        }, {}, [206]);
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/polyfill/polyfill-0.1.43/es2017.jsfl": (
    /*!****************************************************!*\
      !*** ./Third/polyfill/polyfill-0.1.43/es2017.jsfl ***!
      \****************************************************/
    /***/
    function _Third_polyfill_polyfill0143_es2017Jsfl(module, exports) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        function _typeof(o) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o;
          } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }
        //----------------------------------------------------------------------
        //
        // ECMAScript 2017 Polyfills
        //
        //----------------------------------------------------------------------

        (function (global) {
          'use strict';

          var undefined = void 0; // Paranoia

          // Helpers

          function isSymbol(s) {
            return _typeof(s) === 'symbol' || 'Symbol' in global && s instanceof global.Symbol;
          }
          function define(o, p, v, override) {
            if (p in o && !override) return;
            if (typeof v === 'function') {
              // Sanity check that functions are appropriately named (where possible)
              console.assert(isSymbol(p) || !('name' in v) || v.name === p || v.name === p + '_', 'Expected function name "' + p.toString() + '", was "' + v.name + '"');
              Object.defineProperty(o, p, {
                value: v,
                configurable: true,
                enumerable: false,
                writable: true
              });
            } else {
              Object.defineProperty(o, p, {
                value: v,
                configurable: false,
                enumerable: false,
                writable: false
              });
            }
          }

          // Snapshot intrinsic functions
          var $isNaN = global.isNaN;
          var abs = Math.abs,
            floor = Math.floor,
            min = Math.min;

          //----------------------------------------
          // 7 Abstract Operations
          //----------------------------------------

          // 7.1.4
          function ToInteger(n) {
            n = Number(n);
            if ($isNaN(n)) return 0;
            if (n === 0 || n === Infinity || n === -Infinity) return n;
            return (n < 0 ? -1 : 1) * floor(abs(n));
          }

          // 7.1.13 ToObject
          function ToObject(v) {
            if (v === null || v === undefined) throw TypeError();
            return Object(v);
          }

          // 7.1.15 ToLength ( argument )
          function ToLength(v) {
            var len = ToInteger(v);
            if (len <= 0) {
              return 0;
            }
            return min(len, 0x20000000000000 - 1); // 2^53-1
          }

          //----------------------------------------
          // 7.3 Operations on Objects
          //----------------------------------------

          // 7.3.4
          function CreateDataProperty(O, P, V) {
            Object.defineProperty(O, P, {
              value: V,
              writable: true,
              enumerable: true,
              configurable: true
            });
          }

          // 7.3.21
          function EnumerableOwnProperties(o, kind) {
            var ownKeys = Object.keys(o);
            var properties = [];
            ownKeys.forEach(function (key) {
              var desc = Object.getOwnPropertyDescriptor(o, key);
              if (desc && desc.enumerable) {
                if (kind === 'key') properties.push(key);else {
                  var value = o[key];
                  if (kind === 'value') properties.push(value);else properties.push([key, value]);
                }
              }
            });
            return properties;
          }

          //----------------------------------------------------------------------
          // 19 Fundamental Objects
          //----------------------------------------------------------------------

          // 19.1 Object Objects
          // 19.1.2 Properties of the Object Constructor

          // 19.1.2.5 Object.entries
          define(Object, 'entries', function entries(o) {
            var obj = ToObject(o);
            return EnumerableOwnProperties(obj, 'key+value');
          });

          // 19.1.2.8 Object.getOwnPropertyDescriptors ( O )
          define(Object, 'getOwnPropertyDescriptors', function getOwnPropertyDescriptors(o) {
            var obj = ToObject(o);
            // ReturnIfAbrupt(obj)
            var keys = Object.getOwnPropertyNames(obj);
            // ReturnIfAbrupt(keys)
            var descriptors = {};
            for (var i = 0; i < keys.length; ++i) {
              var nextKey = keys[i];
              var descriptor = Object.getOwnPropertyDescriptor(obj, nextKey);
              // ReturnIfAbrupt(desc)
              // ReturnIfAbrupt(descriptor)
              CreateDataProperty(descriptors, nextKey, descriptor);
            }
            return descriptors;
          });

          // 19.1.2.21 Object.values
          define(Object, 'values', function values(o) {
            var obj = ToObject(o);
            return EnumerableOwnProperties(obj, 'value');
          });

          //----------------------------------------------------------------------
          // 21 Text Processing
          //----------------------------------------------------------------------

          // 21.1 String Objects
          // 21.1.3 Properties of the String Prototype Object

          // 21.1.3.13 String.prototype.padEnd( maxLength [ , fillString ] )
          define(String.prototype, 'padEnd', function padEnd(maxLength) {
            var fillString = arguments[1];
            var o = this;
            // ReturnIfAbrupt(o)
            var s = String(this);
            // ReturnIfAbrupt(s)
            var stringLength = s.length;
            if (fillString === undefined) var fillStr = '';else fillStr = String(fillString);
            // ReturnIfAbrupt(fillStr)
            if (fillStr === '') fillStr = ' ';
            var intMaxLength = ToLength(maxLength);
            // ReturnIfAbrupt(intMaxLength)
            if (intMaxLength <= stringLength) return s;
            var fillLen = intMaxLength - stringLength;
            var stringFiller = '';
            while (stringFiller.length < fillLen) stringFiller = stringFiller + fillStr;
            return s + stringFiller.substring(0, fillLen);
          });

          // 21.1.3.14 String.prototype.padStart( maxLength [ , fillString ] )
          define(String.prototype, 'padStart', function padStart(maxLength) {
            var fillString = arguments[1];
            var o = this;
            // ReturnIfAbrupt(o)
            var s = String(this);
            // ReturnIfAbrupt(s)
            var stringLength = s.length;
            if (fillString === undefined) var fillStr = '';else fillStr = String(fillString);
            // ReturnIfAbrupt(fillStr)
            if (fillStr === '') fillStr = ' ';
            var intMaxLength = ToLength(maxLength);
            // ReturnIfAbrupt(intMaxLength)
            if (intMaxLength <= stringLength) return s;
            var fillLen = intMaxLength - stringLength;
            var stringFiller = '';
            while (stringFiller.length < fillLen) stringFiller = stringFiller + fillStr;
            return stringFiller.substring(0, fillLen) + s;
          });
        })(this);
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

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
      /******/id: moduleId,
      /******/loaded: false,
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/
    module.loaded = true;
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/amd options */
  /******/
  (function () {
    /******/__webpack_require__.amdO = {};
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/
  (function () {
    /******/__webpack_require__.g = function () {
      /******/if ((typeof globalThis === "undefined" ? "undefined" : _typeof2(globalThis)) === 'object') return globalThis;
      /******/
      try {
        /******/return this || new Function('return this')();
        /******/
      } catch (e) {
        /******/if ((typeof window === "undefined" ? "undefined" : _typeof2(window)) === 'object') return window;
        /******/
      }
      /******/
    }();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/node module decorator */
  /******/
  (function () {
    /******/__webpack_require__.nmd = function (module) {
      /******/module.paths = [];
      /******/
      if (!module.children) module.children = [];
      /******/
      return module;
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module used 'module' so it can't be inlined
  /******/
  var __webpack_exports__ = __webpack_require__("./FirstRun.webpack.jsfl");
  /******/
  __AnJsflScript = __webpack_exports__;
  /******/
  /******/
})();