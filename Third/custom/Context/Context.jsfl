(function(){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["Context"] = factory();else root["Context"] = factory();
})(void 0, function () {
  return /******/function () {
    // webpackBootstrap
    /******/
    var __webpack_modules__ = {
      /***/"./src/Context.js": (
      /*!************************!*\
        !*** ./src/Context.js ***!
        \************************/
      /***/
      function _src_ContextJs(module) {
        /**
         * 创建Context实例
         * @constructor
         * @param {*} [dom] - DOM参数
         * @param {*} [timeline] - 时间轴参数
         * @param {*} [layer] - 图层参数
         * @param {*} [frame] - 帧参数
         * @param {*} [element] - 元素参数
         */
        function Context(dom, timeline, layer, frame, element) {
          this.dom = null;
          this.item = null;
          this.timeline = null;
          this.layer = null;
          this.frame = null;
          this.element = null;
          this.context = "";
          this.setDOM(dom);
          if (!this.dom) return;
          this.setTimeline(timeline);
          if (!this.timeline) return;
          this.setLayer(layer);
          if (!this.layer || this.layer.layerType === "folder") return;
          this.setFrame(frame);
          if (!this.frame) return;
          this.setElement(element);
        }

        /**
         * 创建上下文实例的工厂方法
         * @param {boolean} [dom=true] - 是否设置DOM上下文
         * @param {boolean} [timeline=true] - 是否设置时间轴上下文
         * @param {boolean} [layer=true] - 是否设置图层上下文
         * @param {boolean} [frame=true] - 是否设置帧上下文
         * @param {boolean} [element=false] - 是否设置元素上下文
         * @returns {Context} 新的Context实例
         */
        Context.create = function (dom, timeline, layer, frame, element) {
          return new Context(dom !== false, timeline !== false, layer !== false, frame !== false, element === true);
        };
        /**
         * 返回上下文的字符串表示
         * @returns {string}
         */
        Context.prototype.toString = function () {
          var parts = ["[object Context"];
          if (this.dom) {
            parts.push("dom=\"" + this.dom.name + "\"");
          }
          if (this.timeline) {
            parts.push("timeline=\"" + (this.item ? this.item.name : this.timeline.name) + "\"");
          }
          if (this.layer) {
            parts.push("layer[" + this.curLayerIndex + "]=\"" + this.layer.name + "\"");
          }
          if (this.frame) {
            var index = this.keyframes.indexOf(this.frame);
            parts.push("frame=" + (this.frame.name || this.frame.startFrame) + (index >= 0 ? "(keyframe[" + index + "])" : ""));
          }
          if (this.element) {
            parts.push("element=\"" + (this.element.name || "<" + this.element.elementType + ">") + "\"");
          }
          return parts.join(" ") + "]";
        };

        // clone,copy
        Context.prototype.clone = function () {
          return new Context(this.dom, this.timeline, this.layer, this.frame, this.element);
        };
        Context.prototype.copy = function (context) {
          this.dom = context.dom;
          this.item = context.item;
          this.timeline = context.timeline;
          this.layer = context.layer;
          this.frame = context.frame;
          this.element = context.element;
          this.context = context.context;
        };
        Context.toString = function () {
          return "[class Context]";
        };
        module.exports = Context;

        /***/
      }),
      /***/"./src/doc/Dom.js": (
      /*!************************!*\
        !*** ./src/doc/Dom.js ***!
        \************************/
      /***/
      function _src_doc_DomJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        var _webpack_require__ = __webpack_require__(/*! ../strategy/strategy */"./src/strategy/strategy.js"),
          StrategyManager = _webpack_require__.StrategyManager;
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        // enum
        var DomType = {
          BOOLEAN: "boolean",
          DOCUMENT: "document",
          NUMBER: "number",
          STRING: "string",
          // FILE: "file",
          CONTEXT: "context"
        };
        var domStrategies = new StrategyManager();
        domStrategies.add(DomType.BOOLEAN, function (value) {
          if (value === true || value === undefined) {
            var dom = fl.getDocumentDOM();
            return dom;
          } else {
            return null;
          }
        }).add(DomType.DOCUMENT, function (value) {
          var dom = value;
          return dom;
        }).add(DomType.NUMBER, function (value) {
          var dom = fl.documents[value];
          return dom;
        }).add(DomType.STRING, function (value) {
          var dom;
          if (/\.fla$/.test(value)) {
            dom = fl.openDocument(value);
          } else {
            dom = fl.documents.filter(function (e) {
              return e.name === value;
            })[0];
          }
          return dom;
        }).add(DomType.CONTEXT, function (value) {
          var dom = value.dom;
          return dom;
        });
        function DomFactory(value) {
          if (typeof value === "boolean" || value === undefined) {
            return domStrategies.use(DomType.BOOLEAN, value);
          } else if (value instanceof Document) {
            return domStrategies.use(DomType.DOCUMENT, value);
          } else if (typeof value === "number") {
            return domStrategies.use(DomType.NUMBER, value);
          } else if (typeof value === "string") {
            return domStrategies.use(DomType.STRING, value);
          } else if (value instanceof Context) {
            return domStrategies.use(DomType.CONTEXT, value);
          } else {
            throw new Error("Invalid dom type");
          }
        }

        /**
         * 设置DOM对象
         * @param {*} value - 支持多种类型的DOM参数
         * @returns {Context} 当前Context实例
         */
        Context.prototype.setDOM = function (value) {
          if (value == null) return this;
          var dom = DomFactory(value);

          // context
          if (dom) {
            // nullify related elements if timeline changes
            if (this.dom !== dom) {
              this.clearDependentProperties();
            }
            // properties
            this.context = 'dom';
            this.dom = dom;
          }
          // return
          return this;
        };

        /**
         * 清除依赖DOM的属性
         */
        Context.prototype.clearDependentProperties = function () {
          this.item = null;
          this.timeline = null;
          this.layer = null;
          this.frame = null;
          this.element = null;
        };

        /**
         * doc , 兼容老版本的属性
         */
        Object.defineProperty(Context.prototype, "doc", {
          get: function get() {
            return this.dom;
          }
        });

        // selection
        Object.defineProperty(Context.prototype, "selection", {
          get: function get() {
            var selection = this.dom.selection;
            return selection;
          }
        });

        /***/
      }),
      /***/"./src/doc/Element.js": (
      /*!****************************!*\
        !*** ./src/doc/Element.js ***!
        \****************************/
      /***/
      function _src_doc_ElementJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        // 定义枚举
        var ElementType = {
          ELEMENT: "element",
          BOOLEAN: "boolean",
          ELEMENT_INDEX: "element_index",
          ELEMENT_NAME: "element_name",
          CONTEXT: "context"
        };

        // 策略管理器
        var _webpack_require__2 = __webpack_require__(/*! ../strategy/strategy */"./src/strategy/strategy.js"),
          StrategyManager = _webpack_require__2.StrategyManager;
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");
        var elementStrategy = new StrategyManager();

        // 策略实现
        elementStrategy.add(ElementType.ELEMENT, function (value, frame) {
          if (frame.elements.includes(value)) {
            return value;
          }
          throw new ReferenceError("ReferenceError: Element not found in the current frame.");
        }).add(ElementType.BOOLEAN, function (value, frame) {
          if (value === true || value === undefined) {
            return frame.elements[0];
          }
        }).add(ElementType.ELEMENT_INDEX, function (value, frame) {
          if (value >= 0 && value < frame.elements.length) {
            return frame.elements[value];
          }
          throw new ReferenceError("ReferenceError: \"".concat(value, "\" is not a valid element index."));
        }).add(ElementType.ELEMENT_NAME, function (value, frame) {
          // for (const element of frame.elements) {
          //     if (element.name === value) {
          //         return element;
          //     }
          // }
          // throw new ReferenceError(`ReferenceError: "${value}" is not a valid element name.`);
          return frame.elements.find(function (element) {
            return element.name === value;
          }) || null;
        }).add(ElementType.CONTEXT, function (value) {
          return value.element;
        });

        // 工厂函数
        function ElementFactory(value, frame) {
          if (value instanceof Element) {
            return elementStrategy.use(ElementType.ELEMENT, value, frame);
          } else if (typeof value === "boolean" || value === undefined) {
            return elementStrategy.use(ElementType.BOOLEAN, value, frame);
          } else if (typeof value === "number") {
            return elementStrategy.use(ElementType.ELEMENT_INDEX, value, frame);
          } else if (typeof value === "string") {
            return elementStrategy.use(ElementType.ELEMENT_NAME, value, frame);
          } else if (value instanceof Context) {
            return elementStrategy.use(ElementType.CONTEXT, value);
          } else {
            throw new TypeError("Unsupported type for value: ".concat(_typeof(value)));
          }
        }

        /**
         * 设置元素对象
         * @param {*} value - 支持多种类型的元素参数
         * @returns {Context} 当前Context实例
         */
        Context.prototype.setElement = function (value) {
          if (value == null) return this;
          if (!this.frame) {
            this.setFrame(true);
            if (!this.frame) return this;
          }
          var element = ElementFactory(value, this.frame);
          if (element) {
            this.element = element;
            this.context = "element";
          }
          return this;
        };

        /***/
      }),
      /***/"./src/doc/Frame.js": (
      /*!**************************!*\
        !*** ./src/doc/Frame.js ***!
        \**************************/
      /***/
      function _src_doc_FrameJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        // 策略管理器
        var _webpack_require__3 = __webpack_require__(/*! ../strategy/strategy */"./src/strategy/strategy.js"),
          StrategyManager = _webpack_require__3.StrategyManager;
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        // 定义枚举
        var FrameType = {
          FRAME: "frame",
          BOOLEAN: "boolean",
          FRAME_INDEX: "frame_index",
          FRAME_NAME: "frame_name",
          REGEXP: "regexp",
          CONTEXT: "context"
        };
        var frameStrategy = new StrategyManager();

        // 策略实现
        frameStrategy.add(FrameType.FRAME, function (value) {
          return value;
        }).add(FrameType.BOOLEAN, function (value, layer, timeline) {
          if (value === true || value === undefined) {
            return layer.frames[timeline.currentFrame];
          } else {
            return null;
          }
        }).add(FrameType.FRAME_INDEX, function (value, layer) {
          if (value >= 0 && value < layer.frameCount) {
            return layer.frames[value];
          } else {
            throw new ReferenceError("ReferenceError: \"".concat(value, "\" is not a valid frame index."));
          }
        }).add(FrameType.FRAME_NAME, function (value, layer, timeline) {
          var allLayers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          if (allLayers) {
            var _iterator = _createForOfIteratorHelper(timeline.layers),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _layer = _step.value;
                var _iterator2 = _createForOfIteratorHelper(_layer.frames),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var _frame = _step2.value;
                    if (_frame.name === value) {
                      return _frame;
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          } else {
            var _iterator3 = _createForOfIteratorHelper(layer.frames),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _frame2 = _step3.value;
                if (_frame2.name === value) {
                  return _frame2;
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
          throw new ReferenceError("ReferenceError: \"".concat(value, "\" is not a valid frame name."));
        }).add(FrameType.REGEXP, function (value, layer) {
          var keyframeIndex = parseInt(value.toSource().substr(1));
          if (keyframeIndex >= 0 && keyframeIndex < layer.keyframes.length) {
            return layer.keyframes[keyframeIndex];
          } else {
            throw new ReferenceError("ReferenceError: \"".concat(value, "\" is not a valid keyframe index."));
          }
        }).add(FrameType.CONTEXT, function (value) {
          return value.frame;
        });

        // 工厂函数
        function FrameFactory(value, layer, timeline) {
          var allLayers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          if (value instanceof Frame) {
            return frameStrategy.use(FrameType.FRAME, value);
          } else if (typeof value === "boolean" || value === undefined) {
            return frameStrategy.use(FrameType.BOOLEAN, value, layer, timeline);
          } else if (typeof value === "number") {
            return frameStrategy.use(FrameType.FRAME_INDEX, value, layer);
          } else if (typeof value === "string") {
            return frameStrategy.use(FrameType.FRAME_NAME, value, layer, timeline, allLayers);
          } else if (value instanceof RegExp) {
            return frameStrategy.use(FrameType.REGEXP, value, layer);
          } else if (value instanceof Context) {
            return frameStrategy.use(FrameType.CONTEXT, value);
          } else {
            throw new TypeError("Unsupported type for value: ".concat(_typeof(value)));
          }
        }

        /**
         * 设置帧对象
         * @param {*} value - 支持多种类型的帧参数
         * @param {Boolean} [allLayers=false] - 是否在所有图层中搜索（仅当指定帧名称时有效）
         * @returns {Context} 当前 Context 实例
         */
        Context.prototype.setFrame = function (value) {
          var allLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (!this.layer || !this.timeline) return this;
          var frame = FrameFactory(value, this.layer, this.timeline, allLayers);
          if (frame) {
            this.frame = frame;
            this.context = "frame";
          }
          return this;
        };

        // curFrameIndex
        Object.defineProperty(Context.prototype, "curFrameIndex", {
          get: function get() {
            if (!this.layer || !this.timeline) return null;
            return this.timeline.currentFrame;
          }
        });

        // curFrame
        Object.defineProperty(Context.prototype, "curFrame", {
          get: function get() {
            if (!this.layer || !this.timeline) return null;
            var curFrameIndex = this.timeline.currentFrame;
            return this.layer.frames[curFrameIndex];
          }
        });

        /***/
      }),
      /***/"./src/doc/KeyFrames.js": (
      /*!******************************!*\
        !*** ./src/doc/KeyFrames.js ***!
        \******************************/
      /***/
      function _src_doc_KeyFramesJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");
        Context.prototype.setKeyframe = function (keyframeIndex, layer) {
          // update the layer, if supplied
          if (layer) {
            this.setLayer(layer);
          }

          // exit early if no timeline
          if (!this.timeline) {
            throw new ReferenceError('ReferenceError: Cannot set Keyframe as Context has no Timeline');
            return this;
          }

          // find the keyframe
          var keyframe = this.keyframes[keyframeIndex];
          if (keyframe) {
            this.setFrame(keyframe);
          }

          // return
          return this;
        };

        /**
         * 获取当前图层所有关键帧
         * @type {Array.<Frame>}
         */
        Object.defineProperty(Context.prototype, 'keyframes', {
          get: function get() {
            if (!this.layer) return [];
            var keyframes = [];
            var frameIndex = 0;
            var keyframeIndex = 0;
            while (frameIndex < this.layer.frameCount) {
              var frame = this.layer.frames[frameIndex];
              if (frame.startFrame === frameIndex) {
                // 是关键帧
                keyframes[keyframeIndex++] = frame;
                frameIndex += frame.duration;
              } else {
                frameIndex++;
              }
            }
            return keyframes;
          }
        });

        /***/
      }),
      /***/"./src/doc/Layer.js": (
      /*!**************************!*\
        !*** ./src/doc/Layer.js ***!
        \**************************/
      /***/
      function _src_doc_LayerJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        var _this2 = this;
        var _webpack_require__4 = __webpack_require__(/*! ../strategy/strategy */"./src/strategy/strategy.js"),
          StrategyManager = _webpack_require__4.StrategyManager;
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        // enum
        var LayerType = {
          LAYER: "layer",
          BOOLEAN: "boolean",
          LAYER_INDEX: "layer_index",
          LAYER_NAME: "layer_name",
          CONTEXT: "context"
        };
        var layerStrategy = new StrategyManager();
        layerStrategy.add(LayerType.LAYER, function (value) {
          var layer = value;
          return layer;
        }).add(LayerType.BOOLEAN, function (value, timeline) {
          if (value === true || value === undefined) {
            var layer = timeline.layers[timeline.currentLayer];
            return layer;
          } else {
            return null;
          }
        }).add(LayerType.LAYER_INDEX, function (value, timeline) {
          var index = value;
          var layer = timeline.layers[index];
          if (!layer) {
            throw new ReferenceError("ReferenceError: \"".concat(value, "\" is not a valid layer index in Context.setLayer()"));
          }
          return layer;
        }).add(LayerType.LAYER_NAME, function (value) {
          var name = value;
          var index = _this2.timeline.findLayerIndex(name);
          var layer = _this2.timeline.layers[index];
          return layer;
        }).add(LayerType.CONTEXT, function (value) {
          var context = value;
          var layer = context.layer;
          return layer;
        });
        function LayerFactory(value, timeline) {
          if (value instanceof Layer) {
            return layerStrategy.use(LayerType.LAYER, value);
          } else if (typeof value === "boolean" || value === undefined) {
            return layerStrategy.use(LayerType.BOOLEAN, value, timeline);
          } else if (typeof value === "number") {
            return layerStrategy.use(LayerType.LAYER_INDEX, value, timeline);
          } else if (typeof value === "string") {
            return layerStrategy.use(LayerType.LAYER_NAME, value, timeline);
          } else if (value instanceof Context) {
            return layerStrategy.use(LayerType.CONTEXT, value, timeline);
          }
        }

        /**
         * 设置图层对象
         * @param {*} value - 支持多种类型的图层参数
         * @returns {Context} 当前Context实例
         */
        Context.prototype.setLayer = function (value) {
          if (value == null) return this;
          if (!this.timeline) {
            this.setTimeline(true);
            if (!this.timeline) return this;
          }
          var layer = LayerFactory(value, this.timeline);
          if (layer) {
            if (this.layer !== layer) {
              this.clearFrameProperties();
            }
            this.layer = layer;
            this.context = 'layer';
          }
          return this;
        };

        /**
         * 清除依赖图层的属性
         */
        Context.prototype.clearFrameProperties = function () {
          this.frame = null;
          this.element = null;
        };

        /**
         * 获取当前图层的索引
         * @property {number} curLayerIndex - 当前图层索引
         */
        Object.defineProperty(Context.prototype, 'curLayerIndex', {
          get: function get() {
            if (!this.timeline || !this.layer) return -1;
            var layers = this.timeline.layers;
            var index = layers.indexOf(this.layer);
            return index;
          }
        });

        /**
         * 获取当前图层的名称
         * @property {Layer} curLayer - 当前图层对象
         */
        Object.defineProperty(Context.prototype, 'curLayer', {
          get: function get() {
            if (!this.timeline || !this.layer) return null;
            return this.layer;
          }
        });

        /**
         * 获取所有图层对象
         * @property {Layer[]} layers - 所有图层对象
         */
        Object.defineProperty(Context.prototype, 'AllLayers', {
          get: function get() {
            if (!this.timeline) return [];
            return this.timeline.layers;
          }
        });

        /***/
      }),
      /***/"./src/doc/Timeline.js": (
      /*!*****************************!*\
        !*** ./src/doc/Timeline.js ***!
        \*****************************/
      /***/
      function _src_doc_TimelineJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        var _webpack_require__5 = __webpack_require__(/*! ../strategy/strategy */"./src/strategy/strategy.js"),
          StrategyManager = _webpack_require__5.StrategyManager;
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        // enum
        var TimelineType = {
          TIMELINE: "TIMELINE",
          BOOLEAN: "BOOLEAN",
          SYMBOL_ITEM: "SYMBOL_ITEM",
          SYMBOL_INSTANCE: "SYMBOL_INSTANCE",
          CONTEXT: "CONTEXT",
          LIBRARY_ITEM_PATH: "LIBRARY_ITEM_PATH",
          SCENE_INDEX: "SCENE_INDEX",
          DOCUMENT_ROOT: "DOCUMENT_ROOT"
        };
        var timelineStrategies = new StrategyManager();
        timelineStrategies.add(TimelineType.TIMELINE, function (value, dom) {
          var timeline = value;
          var items = dom.library.items;
          var item = items.find(function (item) {
            return item instanceof SymbolItem && item.timeline === timeline;
          });
          return [item, timeline];
        }).add(TimelineType.BOOLEAN, function (value, dom) {
          if (value === true || value === undefined) {
            var timeline = dom.getTimeline();
            var items = dom.library.items;
            var item = items.find(function (item) {
              return item instanceof SymbolItem && item.timeline === timeline;
            });
            return [item, timeline];
          } else {
            return [undefined, undefined];
          }
        }).add(TimelineType.SYMBOL_ITEM, function (value) {
          var item = value;
          var timeline = item.timeline;
          return [item, timeline];
        }).add(TimelineType.SYMBOL_INSTANCE, function (value) {
          var instance = value;
          var item = instance.libraryItem;
          var timeline = item.timeline;
          return [item, timeline];
        }).add(TimelineType.CONTEXT, function (value) {
          var context = value;
          var item = context.item;
          var timeline = context.timeline;
          return [item, timeline];
        }).add(TimelineType.LIBRARY_ITEM_PATH, function (value) {
          var path = value;
          var index = parseInt(this.dom.library.findItemIndex(path));
          if (isNaN(index)) {
            throw new Error("Invalid library item path: ".concat(path));
          }
          var item = this.dom.library.items[index];
          var timeline = this.item.timeline;
          return [item, timeline];
        }).add(TimelineType.SCENE_INDEX, function (value) {
          var index = Number(value);
          var item = index >= 0 && index < this.dom.timelines.length ? index : undefined;
          if (item === undefined) {
            throw new Error("Invalid scene index: ".concat(index));
          }
          var timeline = this.dom.timelines[index];
          return [item, timeline];
        }).add(TimelineType.DOCUMENT_ROOT, function (value) {
          var item = null;
          var timeline = this.dom.getTimeline();
          return [item, timeline];
        });
        function TimelineFactory(dom, value) {
          if (value instanceof Timeline) {
            return timelineStrategies.use(TimelineType.TIMELINE, value, dom);
          } else if (typeof value === "boolean" || value === undefined) {
            return timelineStrategies.use(TimelineType.BOOLEAN, value, dom);
          } else if (value instanceof SymbolItem) {
            return timelineStrategies.use(TimelineType.SYMBOL_ITEM, value);
          } else if (value instanceof SymbolInstance) {
            return timelineStrategies.use(TimelineType.SYMBOL_INSTANCE, value);
          } else if (value instanceof Context) {
            return timelineStrategies.use(TimelineType.CONTEXT, value);
          } else if (typeof value === "string") {
            return timelineStrategies.use(TimelineType.LIBRARY_ITEM_PATH, value);
          } else if (typeof value === "number" || value === null) {
            return timelineStrategies.use(TimelineType.SCENE_INDEX, value);
          } else {
            throw new Error("Invalid timeline value: ".concat(value));
          }
        }

        /**
         * 设置时间轴对象
         * @param {*} value - 支持多种类型的时间轴参数
         * @returns {Context} 当前Context实例
         */
        Context.prototype.setTimeline = function (value) {
          if (value == null) return this;
          if (!this.dom) {
            this.setDOM(true);
            if (!this.dom) return this;
          }
          var _TimelineFactory = TimelineFactory(this.dom, value),
            _TimelineFactory2 = _slicedToArray(_TimelineFactory, 2),
            item = _TimelineFactory2[0],
            timeline = _TimelineFactory2[1];
          if (timeline) {
            if (this.timeline !== timeline) {
              this.clearLayerProperties();
            }
            this.timeline = timeline;
            this.context = 'timeline';
            this.item = item;
          }
          return this;
        };

        /**
         * 清除依赖时间轴的属性
         */
        Context.prototype.clearLayerProperties = function () {
          this.layer = null;
          this.frame = null;
          this.element = null;
        };

        // library
        Object.defineProperty(Context.prototype, "library", {
          get: function get() {
            return this.dom.library;
          }
        });

        // items
        Object.defineProperty(Context.prototype, "items", {
          get: function get() {
            return this.dom.library.items;
          }
        });

        // timelines
        Object.defineProperty(Context.prototype, "timelines", {
          get: function get() {
            return this.dom.timelines;
          }
        });

        /***/
      }),
      /***/"./src/doc/current.js": (
      /*!****************************!*\
        !*** ./src/doc/current.js ***!
        \****************************/
      /***/
      function _src_doc_currentJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        /**
         * 跳转到当前上下文
         * @returns {Context} 当前Context实例
         */
        Context.prototype["goto"] = function () {
          if (!this.dom) return this;

          // 激活文档
          if (fl.getDocumentDOM() !== this.dom) {
            fl.setActiveWindow(this.dom);
          }

          // 处理时间轴
          if (this.timeline) {
            var currentTimeline = this.dom.getTimeline();
            if (currentTimeline !== this.timeline) {
              if (typeof this.item === 'number') {
                this.dom.editScene(this.item);
              } else if (this.item) {
                this.dom.library.editItem(this.item.name);
              } else {
                this.dom.editScene(0);
              }
            }

            // 处理图层和帧
            if (this.layer) {
              this.timeline.currentLayer = this.curLayerIndex;
              if (this.frame) {
                this.timeline.currentFrame = this.frame.startFrame;
              }
            }
          }
          return this;
        };

        /**
         * Updates all parameters of the Context Object with the current IDE state
         * @param    {Boolean}    dom            An optional flag to not update the dom context
         * @param    {Boolean}    timeline    An optional flag to not update the timeline context
         * @param    {Boolean}    layer        An optional flag to not update the layer context
         * @param    {Boolean}    frame        An optional flag to not update the frame context
         * @returns    {Context}                Itself
         */
        Context.prototype.update = function (dom, timeline, layer, frame) {
          if (dom !== false) this.setDOM(true);
          if (timeline !== false) this.setTimeline(true);
          if (layer !== false) this.setLayer(true);
          if (frame !== false) this.setFrame(true);
          //if(element !== false)
          //	this.setElement(true);
          //Context.apply(this, [true, true, true, true, 0]);
        };

        /***/
      }),
      /***/"./src/index.js": (
      /*!**********************!*\
        !*** ./src/index.js ***!
        \**********************/
      /***/
      function _src_indexJs(module, __unused_webpack_exports, __webpack_require__) {
        var Context = __webpack_require__(/*! ./Context */"./src/Context.js");
        __webpack_require__(/*! ./doc/Dom */"./src/doc/Dom.js");
        __webpack_require__(/*! ./doc/Timeline */"./src/doc/Timeline.js");
        __webpack_require__(/*! ./doc/Layer */"./src/doc/Layer.js");
        __webpack_require__(/*! ./doc/Frame */"./src/doc/Frame.js");
        __webpack_require__(/*! ./doc/Element */"./src/doc/Element.js");
        __webpack_require__(/*! ./doc/KeyFrames */"./src/doc/KeyFrames.js");
        __webpack_require__(/*! ./doc/current */"./src/doc/current.js");
        __webpack_require__(/*! ./select/select */"./src/select/select.js");
        __webpack_require__(/*! ./short/short */"./src/short/short.js");
        module.exports = Context;

        /***/
      }),
      /***/"./src/select/select.js": (
      /*!******************************!*\
        !*** ./src/select/select.js ***!
        \******************************/
      /***/
      function _src_select_selectJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        /**
         * 选择当前上下文对象的图层
         * @param {Boolean} [addToSelection] - 可选布尔值，用于决定是添加到现有选择还是替换现有选择
         * @returns {Context} - 当前上下文对象本身
         */
        Context.prototype.selectLayer = function (addToSelection) {
          // 如果没有时间轴或图层，则直接返回
          if (!this.timeline || !this.layer) {
            return this;
          }

          // 获取当前帧
          var currentFrame = this.timeline.currentFrame;

          // 如果传入的参数为 null，则取消所有选择
          if (addToSelection === null) {
            // 保存当前图层索引
            var currentLayer = this.timeline.currentLayer;

            // 取消选择所有图层和帧
            this.timeline.currentLayer = 0;
            this.timeline.setSelectedFrames(0, 0); // 取消选择所有帧
            if (this.timeline.getSelectedFrames().length > 0) {
              // 如果仍有选中的帧，再次取消选择
              this.timeline.setSelectedFrames(0, 0, false);
            }

            // 恢复当前图层和帧
            this.timeline.currentLayer = currentLayer;
            this.timeline.currentFrame = currentFrame;
          } else {
            // 获取当前图层索引
            var layerIndex = this.curLayerIndex;

            // 如果图层索引有效，则执行选择操作
            if (layerIndex !== -1) {
              if (addToSelection) {
                // 如果是添加选择，而不是替换选择
                var selectedLayers = this.timeline.getSelectedLayers();

                // 如果当前图层尚未被选中，则选中它
                if (selectedLayers.indexOf(layerIndex) === -1) {
                  this.timeline.setSelectedLayers(layerIndex, false); // 添加到选择中
                } else {
                  // 如果当前图层已被选中，检查是否需要取消选择
                  var selectedFrames = this.timeline.getSelectedFrames();
                  if (selectedFrames[0] === 0 && selectedFrames[1] === 0) {
                    // 如果没有选中的帧，则取消选择当前图层
                    this.timeline.setSelectedLayers(layerIndex, true);
                  }
                }
              } else {
                // 如果不是添加选择，则直接选中当前图层
                this.timeline.setSelectedLayers(layerIndex, true);
              }
            }
          }

          // 恢复当前帧
          this.timeline.currentFrame = currentFrame;
          return this;
        };

        /**
         * 选择当前上下文对象的帧
         * @param {Boolean} [addToSelection] - 可选布尔值，用于决定是添加到现有选择还是替换现有选择
         * @returns {Context} - 当前上下文对象本身
         */
        Context.prototype.selectFrame = function (addToSelection) {
          // 如果没有时间轴、图层或帧，则直接返回
          if (!this.timeline || !this.layer || !this.frame) {
            return this;
          }

          // 如果传入的参数为 null，则取消所有选择
          if (addToSelection === null) {
            this.timeline.setSelectedFrames(0, 0);
          } else {
            // 获取当前图层的索引
            var layerIndex = this.timeline.findLayerIndex(this.layer.name);

            // 如果找到了图层索引
            if (layerIndex !== -1) {
              // 设置当前图层
              this.timeline.currentLayer = layerIndex;

              // 选择帧
              this.timeline.setSelectedFrames(this.frame.startFrame, this.frame.startFrame + this.frame.duration, !addToSelection);

              // 设置当前帧
              this.timeline.currentFrame = this.frame.startFrame;
            }
          }
          return this;
        };

        /**
         * 选择当前上下文对象的元素（如果有）
         * @param {Boolean} [addToSelection] - 可选布尔值，用于决定是添加到现有选择还是替换现有选择
         * @returns {Context} - 当前上下文对象本身
         */
        Context.prototype.selectElement = function (addToSelection) {
          // 如果没有元素，则直接返回
          if (!this.element) {
            return this;
          }

          // 如果不是添加到现有选择，则清除所有选择
          if (!addToSelection) {
            this.dom.selectNone();
          }

          // 设置当前元素为选中状态
          this.dom.selection = [this.element];
          return this;
        };

        /**
         * Select the current context of the Context object
         * @returns    {Context}            Itself
         */
        Context.prototype.select = function () {
          this["goto"]();
          switch (this.context) {
            case 'layer':
              this.selectLayer.apply(this, arguments);
              break;
            case 'frame':
              this.selectFrame.apply(this, arguments);
              break;
            case 'keyframe':
              this.selectFrame.apply(this, arguments);
              break;
            case 'element':
              this.selectElement.apply(this, arguments);
              break;
          }
          return this;
        };

        /***/
      }),
      /***/"./src/short/short.js": (
      /*!****************************!*\
        !*** ./src/short/short.js ***!
        \****************************/
      /***/
      function _src_short_shortJs(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        // /**
        //  * Creates a context from a supplied element
        //  * @param    value
        //  * @returns
        //  */
        // Context.from = function (value) {
        //
        //     //TODO Create context using shorthand string
        //     // doc>item~layer@frame:element
        //     Context.create('file:///c|path/to.fla>path/to/item~layer name@frame number or name:element name');
        //
        //     Context.create('file:///c|path/to.fla');
        //     Context.create('/path/to/item');
        //     Context.create('~layer name or index');
        //     Context.create('~[layer name,layer name,layer name,layer name]');
        //     Context.create('@frame number or name');
        //     Context.create('element name');
        //     Context.create(URI.toURI());
        //
        //     switch (Utils.getClass(value)) {
        //
        //     }
        // }
        var Context = __webpack_require__(/*! ../Context */"./src/Context.js");

        // 正则表达式
        // doc>item~layer@frame:element
        // file:///c|path/to.fla>path/to/item~layer index or layer name@frame number or name:element number or name
        var SHORT_REG = /([file:\/\/\/|\./|/]+[^>~@:]*)?>?([^~@:]+)?>?([^~@:]+)?~?([^@:]+)?@?([^:]+)?:?(.+)?/;
        var ABSOLUTE_PATH = /^file:\/\/\/[a-zA-Z]/; // 绝对路径
        var IS_NUMBER = /^\d+$/; // 数字
        /**
         * 获取当前工作目录。
         *
         * @return {string} - 当前工作目录的路径。
         */
        function getcwd() {
          // 获取当前脚本文件的完整路径
          var scriptURI = fl.scriptURI;
          // 获取路径中最后一个“/”的位置
          var lastSlashIndex = scriptURI.lastIndexOf('/');
          // 获取脚本文件所在的文件夹路径
          var folderPath = scriptURI.substring(0, lastSlashIndex);
          return folderPath;
        }
        ;

        /**
         * 创建一个上下文对象。
         *
         * @param {string} shortString - 短字符串。
         * @return {Context} - 上下文对象。
         */
        Context.prototype.from = function (shortString) {
          // 匹配
          var match = shortString.match(SHORT_REG);
          if (match) {
            var doc = match[1] || ""; // doc部分
            if (doc) {
              var isAbsolutePath = ABSOLUTE_PATH.test(doc); // 是否为绝对路径
              this.setDOM(isAbsolutePath ? doc : getcwd() + doc);
            }
            var item = match[2] || ""; // item部分
            if (item) {
              // this.setItem(item);
              // 进入item层
            }
            var layer = match[3] || ""; // layer部分
            if (layer) {
              // number
              if (layer.match(IS_NUMBER)) {
                layer = parseInt(layer);
              }
              this.setLayer(layer);
            }
            var frame = match[4] || ""; // frame部分
            if (frame) {
              // number
              if (frame.match(IS_NUMBER)) {
                frame = parseInt(frame);
              }
              this.setFrame(frame);
            }
            var element = match[5] || ""; // element部分
            if (element) {
              if (element.match(IS_NUMBER)) {
                element = parseInt(element);
              }
              this.setElement(element);
            }
          } else {
            throw new Error("Invalid short string, please check the format  doc>item~layer@frame:element\n" + "example:  file:///c|path/to.fla>path/to/item~layer index or layer name@frame number or name:element number or name");
          }
        };

        /***/
      }),
      /***/"./src/strategy/strategy.js": (
      /*!**********************************!*\
        !*** ./src/strategy/strategy.js ***!
        \**********************************/
      /***/
      function _src_strategy_strategyJs(__unused_webpack_module, exports) {
        "use strict";

        var __extends = this && this.__extends || function () {
          var _extendStatics = function extendStatics(d, b) {
            _extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function (d, b) {
              d.__proto__ = b;
            } || function (d, b) {
              for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return _extendStatics(d, b);
          };
          return function (d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            _extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();
        var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
          if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
          return to.concat(ar || Array.prototype.slice.call(from));
        };
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.CompositeStrategyManager = exports.PriorityStrategyManager = exports.PolicyManager = exports.StrategyManager = void 0;
        /**
         * 策略管理基类，提供策略的注册和执行功能
         */
        var StrategyManager = /** @class */function () {
          function StrategyManager() {
            this.strategies = {
              "default": function _default() {
                throw new Error('未知的策略类型');
              }
            };
          }
          /**
           * 添加策略
           * @param name 策略名称
           * @param strategy 策略函数
           * @returns 返回当前实例以支持链式调用
           */
          StrategyManager.prototype.add = function (name, strategy) {
            if (typeof strategy !== 'function') {
              throw new TypeError('策略必须是函数');
            }
            if (!name || typeof name !== 'string') {
              throw new TypeError('策略名称必须是非空字符串');
            }
            this.strategies[name] = strategy;
            return this;
          };
          /**
           * 使用指定策略
           * @param name 策略名称
           * @param args 传递给策略的参数
           * @returns 策略执行结果
           */
          StrategyManager.prototype.use = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
            }
            var strategy = this.strategies[name] || this.strategies["default"];
            return strategy.apply(void 0, args);
          };
          /**
           * 从配置加载策略
           * @param config 策略配置数组
           * @returns 返回当前实例以支持链式调用
           */
          StrategyManager.prototype.load = function (config) {
            var _this = this;
            config.forEach(function (_a) {
              var name = _a.name,
                fn = _a.fn;
              _this.add(name, fn);
            });
            return this;
          };
          /**
           * 设置默认策略
           * @param strategy 默认策略函数
           * @returns 返回当前实例以支持链式调用
           */
          StrategyManager.prototype.setDefaultStrategy = function (strategy) {
            this.strategies["default"] = strategy;
            return this;
          };
          return StrategyManager;
        }();
        exports.StrategyManager = StrategyManager;
        /**
         * 策略检查管理器，扩展基本策略管理功能
         */
        var PolicyManager = /** @class */function (_super) {
          __extends(PolicyManager, _super);
          function PolicyManager() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          /**
           * 检查单个策略
           * @param name 策略名称
           * @param args 传递给策略的参数
           * @returns 检查结果
           */
          PolicyManager.prototype.check = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
            }
            return this.use.apply(this, __spreadArray([name], args, false));
          };
          /**
           * 组合检查多个策略（所有策略都必须通过）
           * @param names 策略名称数组
           * @param args 传递给策略的参数
           * @returns 检查结果
           */
          PolicyManager.prototype.checkAll = function (names) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
            }
            return names.every(function (name) {
              return _this.check.apply(_this, __spreadArray([name], args, false));
            });
          };
          /**
           * 组合检查多个策略（任一策略通过即可）
           * @param names 策略名称数组
           * @param args 传递给策略的参数
           * @returns 检查结果
           */
          PolicyManager.prototype.checkAny = function (names) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
            }
            return names.some(function (name) {
              return _this.check.apply(_this, __spreadArray([name], args, false));
            });
          };
          return PolicyManager;
        }(StrategyManager);
        exports.PolicyManager = PolicyManager;
        /**
         * 优先级策略管理器，支持按优先级执行策略
         */
        var PriorityStrategyManager = /** @class */function (_super) {
          __extends(PriorityStrategyManager, _super);
          function PriorityStrategyManager() {
            var _this = _super.call(this) || this;
            _this.priorityStrategies = [];
            return _this;
          }
          /**
           * 添加带优先级的策略
           * @param name 策略名称
           * @param strategy 策略函数
           * @param priority 优先级（数值越大优先级越高）
           * @returns 返回当前实例以支持链式调用
           */
          PriorityStrategyManager.prototype.addPriority = function (name, strategy, priority) {
            this.priorityStrategies.push({
              name: name,
              fn: strategy,
              priority: priority
            });
            this.priorityStrategies.sort(function (a, b) {
              return b.priority - a.priority;
            });
            return this;
          };
          /**
           * 按优先级顺序检查策略
           * @param args 传递给策略的参数
           * @returns 检查结果
           */
          PriorityStrategyManager.prototype.checkByPriority = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            for (var _b = 0, _c = this.priorityStrategies; _b < _c.length; _b++) {
              var fn = _c[_b].fn;
              var result = fn.apply(void 0, args);
              if (result) {
                return result;
              }
            }
            return (_a = this.strategies)["default"].apply(_a, args);
          };
          return PriorityStrategyManager;
        }(StrategyManager);
        exports.PriorityStrategyManager = PriorityStrategyManager;
        /**
         * 组合策略管理器，支持策略的组合执行
         */
        var CompositeStrategyManager = /** @class */function (_super) {
          __extends(CompositeStrategyManager, _super);
          function CompositeStrategyManager() {
            var _this = _super.call(this) || this;
            _this.executionOrder = [];
            return _this;
          }
          /**
           * 设置策略执行顺序
           * @param order 策略名称数组
           * @returns 返回当前实例以支持链式调用
           */
          CompositeStrategyManager.prototype.setExecutionOrder = function (order) {
            this.executionOrder = order;
            return this;
          };
          /**
           * 使用指定策略
           * @param args 传递给策略的参数
           * @returns 策略执行结果
           */
          CompositeStrategyManager.prototype.useComposite = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var strategies = this.executionOrder.map(function (name) {
              return _this.strategies[name];
            });
            return strategies.reduce(function (result, strategy) {
              // strategy(result as T[0], ...args.slice(1))
              var nArgs = __spreadArray([result], args.slice(1), true);
              return strategy.apply(void 0, nArgs);
            }, args[0]);
          };
          return CompositeStrategyManager;
        }(StrategyManager);
        exports.CompositeStrategyManager = CompositeStrategyManager;

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
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/
    var __webpack_exports__ = __webpack_require__("./src/index.js");
    /******/
    /******/
    return __webpack_exports__;
    /******/
  }();
});
})();