(function(){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["vm-browserify"] = factory();else root["vm-browserify"] = factory();
})(void 0, function () {
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
        module.exports = __webpack_require__(/*! vm-browserify */"./node_modules/vm-browserify/index.js");

        /***/
      }),
      /***/"./node_modules/vm-browserify/index.js": (
      /*!*********************************************!*\
        !*** ./node_modules/vm-browserify/index.js ***!
        \*********************************************/
      /***/
      function _node_modules_vmBrowserify_indexJs(__unused_webpack_module, exports) {
        var indexOf = function indexOf(xs, item) {
          if (xs.indexOf) return xs.indexOf(item);else for (var i = 0; i < xs.length; i++) {
            if (xs[i] === item) return i;
          }
          return -1;
        };
        var Object_keys = function Object_keys(obj) {
          if (Object.keys) return Object.keys(obj);else {
            var res = [];
            for (var key in obj) res.push(key);
            return res;
          }
        };
        var forEach = function forEach(xs, fn) {
          if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
            fn(xs[i], i, xs);
          }
        };
        var defineProp = function () {
          try {
            Object.defineProperty({}, '_', {});
            return function (obj, name, value) {
              Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
              });
            };
          } catch (e) {
            return function (obj, name, value) {
              obj[name] = value;
            };
          }
        }();
        var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];
        function Context() {}
        Context.prototype = {};
        var Script = exports.Script = function NodeScript(code) {
          if (!(this instanceof Script)) return new Script(code);
          this.code = code;
        };
        // Script.prototype.runInContext = function (context) {
        //   if (!(context instanceof Context)) {
        //     throw new TypeError("needs a 'context' argument.");
        //   }
        //   var iframe = document.createElement('iframe');
        //   if (!iframe.style) iframe.style = {};
        //   iframe.style.display = 'none';
        //   document.body.appendChild(iframe);
        //   var win = iframe.contentWindow;
        //   var wEval = win.eval,
        //     wExecScript = win.execScript;
        //   if (!wEval && wExecScript) {
        //     // win.eval() magically appears when this is called in IE:
        //     wExecScript.call(win, 'null');
        //     wEval = win.eval;
        //   }
        //   forEach(Object_keys(context), function (key) {
        //     win[key] = context[key];
        //   });
        //   forEach(globals, function (key) {
        //     if (context[key]) {
        //       win[key] = context[key];
        //     }
        //   });
        //   var winKeys = Object_keys(win);
        //   var res = wEval.call(win, this.code);
        //   forEach(Object_keys(win), function (key) {
        //     // Avoid copying circular objects like `top` and `window` by only
        //     // updating existing context properties or new properties in the `win`
        //     // that was only introduced after the eval.
        //     if (key in context || indexOf(winKeys, key) === -1) {
        //       context[key] = win[key];
        //     }
        //   });
        //   forEach(globals, function (key) {
        //     if (!(key in context)) {
        //       defineProp(context, key, win[key]);
        //     }
        //   });
        //   document.body.removeChild(iframe);
        //   return res;
        // };
        // 定义 runInContext 方法
        Script.prototype.runInContext = function(context) {
          // 检查上下文是否为对象
          if (typeof context !== 'object' || context === null) {
            throw new TypeError("needs a 'context' argument.");
          }

          // 创建一个自定义的上下文环境
          // const sandbox = Object.create(null);
          const sandbox ={};

          // 将上下文中的属性复制到沙箱中
          for (var key in context) {
            if (context.hasOwnProperty(key)) {
              sandbox[key] = context[key];
            }
          }

          // 定义一个函数来执行代码
          const runCode = new Function('context',"try {\n      return eval(this.code);\n    } catch (e) {\n      throw e;\n    }");

          // 在沙箱环境中执行代码
          const result = runCode.call(this, sandbox);

          // 将沙箱中的属性更新回上下文
          for (var key in sandbox) {
            if (sandbox.hasOwnProperty(key)) {
              context[key] = sandbox[key];
            }
          }

          return result;
        };
        Script.prototype.runInThisContext = function () {
          return eval(this.code); // maybe...
        };
        Script.prototype.runInNewContext = function (context) {
          var ctx = Script.createContext(context);
          var res = this.runInContext(ctx);
          if (context) {
            forEach(Object_keys(ctx), function (key) {
              context[key] = ctx[key];
            });
          }
          return res;
        };
        forEach(Object_keys(Script.prototype), function (name) {
          exports[name] = Script[name] = function (code) {
            var s = Script(code);
            return s[name].apply(s, [].slice.call(arguments, 1));
          };
        });
        exports.isContext = function (context) {
          return context instanceof Context;
        };
        exports.createScript = function (code) {
          return exports.Script(code);
        };
        exports.createContext = Script.createContext = function (context) {
          var copy = new Context();
          if (_typeof(context) === 'object') {
            forEach(Object_keys(context), function (key) {
              copy[key] = context[key];
            });
          }
          return copy;
        };

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
  }();
});
})();