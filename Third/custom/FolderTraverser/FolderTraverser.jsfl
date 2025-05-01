(function(){
"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory(require("os"));else if (typeof define === 'function' && define.amd) define(["os"], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["FolderTraverser"] = factory(require("os"));else root["FolderTraverser"] = factory(root["os"]);
})(void 0, function (__WEBPACK_EXTERNAL_MODULE_os__) {
  return /******/function () {
    // webpackBootstrap
    /******/
    var __webpack_modules__ = {
      /***/"./FolderTraverser.js": (
      /*!****************************!*\
        !*** ./FolderTraverser.js ***!
        \****************************/
      /***/
      function _FolderTraverserJs(module, __unused_webpack_exports, __webpack_require__) {
        var isNode = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && "function" === 'function' && "object" === 'object';
        var isFlash = !isNode && (typeof flash === "undefined" ? "undefined" : _typeof(flash)) === 'object';
        var os;
        if (isNode) {
          // 处理 Node.js 环境

          var fs = __webpack_require__(/*! fs */"?c221");
          var path = __webpack_require__(/*! path */"?2259");

          // 创建一个类似 Python os 模块的接口
          os = {
            listdir: fs.readdirSync,
            // 同步列出目录内容
            path: {
              join: function join() {
                return path.join.apply(path, arguments);
              },
              // 拼接路径
              exists: function exists(filePath) {
                return fs.existsSync(filePath);
              },
              // 检查路径是否存在
              isdir: function isdir(filePath) {
                return fs.lstatSync(filePath).isDirectory();
              },
              // 检查是否为目录
              isfile: function isfile(filePath) {
                return fs.lstatSync(filePath).isFile();
              },
              // 检查是否为文件
              basename: function basename(filePath) {
                return path.basename(filePath);
              },
              // 获取路径的文件名部分
              dirname: function dirname(filePath) {
                return path.dirname(filePath);
              } // 获取路径的目录部分
            }
          };
        } else if (isFlash) {
          // 处理 Adobe Flash 环境

          os = __webpack_require__(/*! os */"os");
        } else {
          throw new Error('Unsupported environment');
        }

        // 自定义函数
        function getExtname(filePath) {
          var basename = os.path.basename(filePath);
          var dotIndex = basename.lastIndexOf('.');
          if (dotIndex === -1 || dotIndex === 0) {
            return ''; // 没有扩展名或隐藏文件
          }
          return basename.substring(dotIndex).toLowerCase();
        }

        // FolderTraverser 类
        var FolderTraverser = /*#__PURE__*/function () {
          /**
           * 文件夹遍历器，只包含文件。
           * @param {string} folderPath - 要遍历的文件夹路径
           * @param {string[]} [extensions] - 允许的文件扩展名列表
           * @param {string[]} [excludeFolders] - 排除的文件夹名称列表
           * @param {string[]} [excludeExtensions] - 排除的文件扩展名列表
           * @param {number} [maxDepth] - 最大遍历深度，-1 表示无限制
           * @param {boolean} [includeFullPath] - 是否返回文件的完整路径
           * @param {Function} [callbacks] - 回调函数，用于处理每个文件路径
           */
          function FolderTraverser(folderPath) {
            var extensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var excludeFolders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var excludeExtensions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var maxDepth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
            var includeFullPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
            var callbacks = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
            _classCallCheck(this, FolderTraverser);
            this.folderPath = folderPath;
            this.extensions = extensions || [];
            this.excludeFolders = excludeFolders || [];
            this.excludeExtensions = excludeExtensions || [];
            this.maxDepth = maxDepth;
            this.includeFullPath = includeFullPath;
            this.callbacks = callbacks;
          }

          /**
           * 遍历文件夹。
           * @param {string} currentPath - 当前路径
           * @param {string[]} filePaths - 文件路径列表
           * @param {number} currentDepth - 当前深度
           */
          return _createClass(FolderTraverser, [{
            key: "traverseFolder",
            value: function traverseFolder(currentPath, filePaths) {
              // console.log("Traversing "+currentPath+"..."+filePaths.length);
              var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
              // 检查是否超过最大深度
              if (this.maxDepth !== -1 && currentDepth > this.maxDepth) {
                return;
              }
              try {
                // 获取当前目录下的所有文件和子目录
                var names = os.listdir(currentPath);
                var _iterator = _createForOfIteratorHelper(names),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var name = _step.value;
                    var filePath = os.path.join(currentPath, name);

                    // 检查是否是文件
                    if (os.path.isdir(filePath)) {
                      // 排除特定文件夹
                      if (this.excludeFolders.includes(name)) {
                        continue;
                      }

                      // 递归遍历子目录
                      this.traverseFolder(filePath, filePaths, currentDepth + 1);
                    } else if (os.path.isfile(filePath)) {
                      // 检查是否符合允许的扩展名且不在排除列表中
                      // const ext = os.path.extname(filePath);
                      var ext = getExtname(filePath);
                      if (this.excludeExtensions.includes(ext) || this.extensions.length > 0 && !this.extensions.includes(ext)) {
                        continue;
                      }

                      // 添加文件路径
                      var pathToAdd = this.includeFullPath ? filePath : name;
                      filePaths.push(pathToAdd);

                      // 调用回调函数
                      if (this.callbacks) {
                        this.callbacks(pathToAdd);
                      }
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              } catch (e) {
                console.warn("\u65E0\u6CD5\u8BBF\u95EE ".concat(currentPath, ": ").concat(e.message));
              }
            }

            /**
             * 开始遍历
             * @returns {string[]} - 文件路径列表
             */
          }, {
            key: "start",
            value: function start() {
              var filePaths = [];
              this.traverseFolder(this.folderPath, filePaths);
              return filePaths;
            }
          }]);
        }();
        module.exports = FolderTraverser;

        /***/
      }),
      /***/"?2259": (
      /*!**********************!*\
        !*** path (ignored) ***!
        \**********************/
      /***/
      function _() {

        /* (ignored) */

        /***/}),
      /***/"?c221": (
      /*!********************!*\
        !*** fs (ignored) ***!
        \********************/
      /***/
      function c221() {

        /* (ignored) */

        /***/}),
      /***/"os": (
      /*!*********************!*\
        !*** external "os" ***!
        \*********************/
      /***/
      function os(module) {
        "use strict";

        module.exports = __WEBPACK_EXTERNAL_MODULE_os__;

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
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/
    var __webpack_exports__ = __webpack_require__("./FolderTraverser.js");
    /******/
    /******/
    return __webpack_exports__;
    /******/
  }();
});
})();