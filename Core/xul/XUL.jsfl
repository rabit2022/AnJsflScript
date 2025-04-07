(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(
            require('eventemitter3'),
            require('fast-xml-parser'),
            require('path-browserify'),
            require('xmldom'),
            require('xpath')
        );
    else if (typeof define === 'function' && define.amd)
        define('XUL', [
            'eventemitter3',
            'fast-xml-parser',
            'path-browserify',
            'xmldom',
            'xpath',
            'xml-pollyfill'
        ], factory);
    else if (typeof exports === 'object')
        exports['XUL'] = factory(
            require('eventemitter3'),
            require('fast-xml-parser'),
            require('path-browserify'),
            require('xmldom'),
            require('xpath')
        );
    else
        root['XUL'] = factory(
            root['eventemitter3'],
            root['fast-xml-parser'],
            root['path-browserify'],
            root['xmldom'],
            root['xpath']
        );
})(
    this,
    function (
        __WEBPACK_EXTERNAL_MODULE_eventemitter3__,
        __WEBPACK_EXTERNAL_MODULE_fast_xml_parser__,
        __WEBPACK_EXTERNAL_MODULE_path_browserify__,
        __WEBPACK_EXTERNAL_MODULE_xmldom__,
        __WEBPACK_EXTERNAL_MODULE_xpath__
    ) {
        return /******/ (function () {
            // webpackBootstrap
            /******/ var __webpack_modules__ = {
                /***/ './src/Config.js':
                    /*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        // var __dirname = "/";
                        var __dirname = $ProjectFileDir$;
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _defineProperty(e, r, t) {
                            return (
                                (r = _toPropertyKey(r)) in e
                                    ? Object.defineProperty(e, r, {
                                          value: t,
                                          enumerable: !0,
                                          configurable: !0,
                                          writable: !0
                                      })
                                    : (e[r] = t),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        var _require = __webpack_require__(
                                /*! fast-xml-parser */ 'fast-xml-parser'
                            ),
                            XMLParser = _require.XMLParser,
                            XMLBuilder = _require.XMLBuilder;
                        var _require2 = __webpack_require__(/*! xmldom */ 'xmldom'),
                            DOMParser = _require2.DOMParser,
                            XMLSerializer = _require2.XMLSerializer;
                        // const path = require("path");
                        var path = __webpack_require__(
                            /*! path-browserify */ 'path-browserify'
                        );
                        var fs = __webpack_require__(/*! fs */ '?569f');

                        // XML 解析器配置
                        var parserOptions = {
                            ignoreAttributes: false,
                            attributeNamePrefix: '@_',
                            alwaysCreateTextNode: true,
                            // 确保所有节点都被创建
                            isArray: function isArray(name, jpath, isAttribute) {
                                // 明确指定哪些节点应作为数组处理
                                // return ['row', 'column'].includes(name);
                                return false;
                            },
                            textNodeName: '#text',
                            // 文本节点名称
                            cdataTagName: '__cdata',
                            // CDATA 标签名称
                            commentTagName: '__comment' // 注释标签名称
                        };

                        // XML 构建器配置
                        var builderOptions = {
                            attributeNamePrefix: '@_',
                            // 属性前缀（与解析器匹配）
                            ignoreAttributes: false,
                            // 不忽略属性
                            format: true,
                            // 格式化输出
                            indentBy: '  ',
                            // 缩进字符
                            suppressEmptyNode: false // 不压缩空节点
                        };
                        var Config = /*#__PURE__*/ (function () {
                            function Config() {
                                _classCallCheck(this, Config);
                            }
                            return _createClass(Config, null, [
                                {
                                    key: 'loadTemplate',
                                    value:
                                        /**
                                         * 加载XML模板文件
                                         * @param {string} templateName - 模板文件名
                                         * @returns {string} XML字符串
                                         */
                                        function loadTemplate(templateName) {
                                            // var templatePath = path.join(__dirname, './templates/', templateName);
                                            // try {
                                            //   return fs.readFileSync(templatePath, 'utf-8');

                                            try {
                                                var template = '';
                                                requirejs(
                                                    ['os', 'open'],
                                                    function (os, open) {
                                                        var templatePath = os.path.join(
                                                            __dirname,
                                                            './Core/xul/templates/',
                                                            templateName
                                                        );
                                                        with (open(templatePath, 'r')) {
                                                            template = f.read();
                                                        }
                                                    }
                                                );

                                                return template;
                                            } catch (error) {
                                                console.error(
                                                    'Failed to load template: '.concat(
                                                        templateName
                                                    ),
                                                    error
                                                );
                                                return '<dialog></dialog>';
                                            }
                                        }
                                }
                            ]);
                        })();
                        _defineProperty(Config, 'parser', new XMLParser(parserOptions));
                        _defineProperty(
                            Config,
                            'builder',
                            new XMLBuilder(builderOptions)
                        );
                        _defineProperty(Config, 'domParser', new DOMParser());
                        _defineProperty(Config, 'serializer', new XMLSerializer());
                        module.exports = Config;

                        /***/
                    },

                /***/ './src/XUL.js':
                    /*!********************!*\
  !*** ./src/XUL.js ***!
  \********************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _classPrivateMethodInitSpec(e, a) {
                            _checkPrivateRedeclaration(e, a), a.add(e);
                        }
                        function _checkPrivateRedeclaration(e, t) {
                            if (t.has(e))
                                throw new TypeError(
                                    'Cannot initialize the same private elements twice on an object'
                                );
                        }
                        function _classPrivateGetter(s, r, a) {
                            return a(_assertClassBrand(s, r));
                        }
                        function _assertClassBrand(e, t, n) {
                            if ('function' == typeof e ? e === t : e.has(t))
                                return arguments.length < 3 ? t : n;
                            throw new TypeError(
                                'Private element is not present on this object'
                            );
                        }
                        var DialogBuilder = __webpack_require__(
                            /*! ./core/DialogBuilder */ './src/core/DialogBuilder.js'
                        );
                        var ControlManager = __webpack_require__(
                            /*! ./core/ControlManager */ './src/core/ControlManager.js'
                        );
                        var ControlFactory = __webpack_require__(
                            /*! ./core/ControlFactory */ './src/core/ControlFactory.js'
                        );
                        var EventManager = __webpack_require__(
                            /*! ./core/EventManager */ './src/core/EventManager.js'
                        );
                        var Config = __webpack_require__(
                            /*! ./Config */ './src/Config.js'
                        );

                        // const DialogManager = require("./core/DialogManager");
                        var _XUL_brand = /*#__PURE__*/ new WeakSet();
                        var XUL = /*#__PURE__*/ (function () {
                            function XUL() {
                                var title =
                                    arguments.length > 0 && arguments[0] !== undefined
                                        ? arguments[0]
                                        : 'xJSFL';
                                _classCallCheck(this, XUL);
                                // region 控件创建方法
                                _classPrivateMethodInitSpec(this, _XUL_brand);
                                // super();

                                this.parser = Config.parser;
                                this.builder = Config.builder;
                                this.domParser = Config.domParser;
                                this.serializer = Config.serializer;

                                // 核心组件
                                this.dialogBuilder = new DialogBuilder();
                                this.controlManager = new ControlManager();
                                this.eventManager = new EventManager(this);
                                // this.dialogManager = new DialogManager(this);

                                // 状态
                                // 存储控制值
                                this.settings = {};
                                this.columns = [100, 180];
                                this.title = title;

                                // 初始化
                                // 加载控件模板
                                this.templates = this.dialogBuilder.templates;
                            }
                            return _createClass(
                                XUL,
                                [
                                    {
                                        key: 'updateControl',
                                        value: function updateControl(
                                            id,
                                            label,
                                            attributes,
                                            items
                                        ) {
                                            var origionalControl =
                                                this.controlManager.getControl(id);
                                            if (!origionalControl) {
                                                throw new Error(
                                                    'Control with id '.concat(
                                                        id,
                                                        ' not found'
                                                    )
                                                );
                                            }
                                            var type = origionalControl.type;
                                            var xml = this.templates[type];
                                            var newControl = ControlFactory.create(
                                                type,
                                                id,
                                                label,
                                                this,
                                                xml,
                                                attributes,
                                                items
                                            );
                                            this.controlManager.updateControl(newControl);

                                            // 触发事件
                                            var eventType = EventManager.EventType.CHANGE;
                                            this.eventManager.trigger(eventType, id, {
                                                control: newControl
                                            });
                                            return this;
                                        }
                                    },
                                    {
                                        key: 'addLabel',
                                        value:
                                            // region simple controls

                                            function addLabel(label, id) {
                                                return _assertClassBrand(
                                                    _XUL_brand,
                                                    this,
                                                    _addControl
                                                ).call(this, 'label', id, label);
                                            }
                                    },
                                    {
                                        key: 'addTextbox',
                                        value: function addTextbox(
                                            label,
                                            id,
                                            attributes
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'textbox',
                                                id,
                                                label,
                                                attributes
                                            );
                                        }
                                    },
                                    {
                                        key: 'addColorchip',
                                        value: function addColorchip(
                                            label,
                                            id,
                                            attributes
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'colorchip',
                                                id,
                                                label,
                                                attributes
                                            );
                                        }
                                    },
                                    {
                                        key: 'addPopupSlider',
                                        value: function addPopupSlider(
                                            label,
                                            id,
                                            attributes
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'popupslider',
                                                id,
                                                label,
                                                attributes
                                            );
                                        }
                                    },
                                    {
                                        key: 'addCheckbox',
                                        value: function addCheckbox(
                                            label,
                                            id,
                                            attributes
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'checkbox',
                                                id,
                                                label,
                                                attributes
                                            );
                                        }
                                    },
                                    {
                                        key: 'addButton',
                                        value: function addButton(label, id, attributes) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(this, 'button', id, label, attributes);
                                        }
                                    },
                                    {
                                        key: 'addTargetList',
                                        value: function addTargetList(
                                            label,
                                            id,
                                            attributes
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'targetlist',
                                                id,
                                                label,
                                                attributes
                                            );
                                        }
                                    },
                                    {
                                        key: 'addChooseFile',
                                        value: function addChooseFile(
                                            label,
                                            id,
                                            attributes
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'choosefile',
                                                id,
                                                label,
                                                attributes
                                            );
                                        }

                                        // endregion simple controls

                                        // region compound controls
                                    },
                                    {
                                        key: 'addListbox',
                                        value: function addListbox(
                                            label,
                                            id,
                                            attributes,
                                            items
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'listbox',
                                                id,
                                                label,
                                                attributes,
                                                items
                                            );
                                        }
                                    },
                                    {
                                        key: 'addMenuList',
                                        value: function addMenuList(
                                            label,
                                            id,
                                            attributes,
                                            items
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'menulist',
                                                id,
                                                label,
                                                attributes,
                                                items
                                            );
                                        }
                                    },
                                    {
                                        key: 'addRadioGroup',
                                        value: function addRadioGroup(
                                            label,
                                            id,
                                            attributes,
                                            items
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'radiogroup',
                                                id,
                                                label,
                                                attributes,
                                                items
                                            );
                                        }
                                    },
                                    {
                                        key: 'addCheckboxGroup',
                                        value: function addCheckboxGroup(
                                            label,
                                            id,
                                            attributes,
                                            items
                                        ) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(
                                                this,
                                                'checkboxgroup',
                                                id,
                                                label,
                                                attributes,
                                                items
                                            );
                                        }

                                        // endregion compound controls

                                        // region NON-VISUAL CONTROLS
                                    },
                                    {
                                        key: 'addSeparator',
                                        value: function addSeparator(id) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(this, 'separator', id);
                                        }

                                        // spacer
                                    },
                                    {
                                        key: 'addSpacer',
                                        value: function addSpacer(id) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(this, 'spacer', id);
                                        }
                                    },
                                    {
                                        key: 'addProperty',
                                        value: function addProperty(id) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(this, 'property', id);
                                        }
                                    },
                                    {
                                        key: 'addScript',
                                        value: function addScript(id, content) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(this, 'script', id, '', {
                                                content: content
                                            });
                                        }

                                        // endregion NON-VISUAL CONTROLS
                                    },
                                    {
                                        key: 'addFlash',
                                        value: function addFlash(id, attributes) {
                                            return _assertClassBrand(
                                                _XUL_brand,
                                                this,
                                                _addControl
                                            ).call(this, 'flash', id, '', attributes);
                                        }

                                        // endregion 控件创建方法

                                        // region properties
                                    },
                                    {
                                        key: 'xml',
                                        get: function get() {
                                            return this.dialogBuilder.build(
                                                this.title,
                                                _classPrivateGetter(
                                                    _XUL_brand,
                                                    this,
                                                    _get_content
                                                ),
                                                this.columns
                                            );
                                        }
                                    },
                                    {
                                        key: 'addEvent',
                                        value:
                                            /**
                                             * 添加事件监听器
                                             * @param {string} eventType - 事件类型
                                             * @param {string} controlId - 控件 ID
                                             * @param {function(XULEvent, Object)} handler - 事件处理函数，接收一个 XULEvent 实例和一个 eventData 对象
                                             */
                                            function addEvent(
                                                eventType,
                                                controlId,
                                                handler
                                            ) {
                                                switch (eventType) {
                                                    case EventManager.EventType.CREATE:
                                                    case EventManager.EventType.CHANGE:
                                                        this.eventManager.add(
                                                            eventType,
                                                            controlId,
                                                            handler
                                                        );
                                                        break;
                                                    case EventManager.EventType.COMMAND:
                                                        // only for buttons clicked event
                                                        var origionalControl =
                                                            this.controlManager.getControl(
                                                                controlId
                                                            );
                                                        var newAttributes =
                                                            origionalControl.attributes;
                                                        newAttributes['oncommand'] =
                                                            handler
                                                                .toString()
                                                                .replace(/"/g, "'");
                                                        this.updateControl(
                                                            controlId,
                                                            origionalControl.label,
                                                            newAttributes
                                                        );
                                                        break;
                                                    default:
                                                        throw new Error(
                                                            'Invalid event type: '.concat(
                                                                eventType
                                                            )
                                                        );
                                                }
                                                return this;
                                            }
                                    }
                                ],
                                [
                                    {
                                        key: 'factory',
                                        value:
                                            // endregion properties

                                            /**
                                             * 工厂方法，创建XUL实例
                                             * @param {Object} props - 控件定义或函数
                                             * @returns {XUL} XUL实例
                                             */
                                            function factory(props) {
                                                var xul = new XUL();
                                                if (!xul.dialogBuilder.xml || !props)
                                                    throw new Error(
                                                        'DialogBuilder not initialized or props not provided'
                                                    );
                                                if (
                                                    _typeof(props) === 'object' &&
                                                    props.name &&
                                                    props.params
                                                ) {
                                                    props.params.forEach(
                                                        function (param) {
                                                            var id =
                                                                props.name + '_' + param;
                                                            xul.addTextbox(param, id);
                                                        }
                                                    );
                                                    xul.title = 'Dialog for "'.concat(
                                                        props.name,
                                                        '"'
                                                    );
                                                    return xul;
                                                } else {
                                                    throw new Error('Invalid props');
                                                }
                                            }
                                    }
                                ]
                            );
                        })();
                        function _addControl(type, id, label, attributes, items) {
                            var xml = this.templates[type];
                            var control = ControlFactory.create(
                                type,
                                id,
                                label,
                                this,
                                xml,
                                attributes,
                                items
                            );
                            if (!control.id) {
                                throw new Error('Invalid control id');
                            }
                            this.controlManager.addControl(control);
                            return this;
                        }
                        function _get_content(_this) {
                            var _content = '';
                            var controls = _this.controlManager.controls;
                            // 遍历controls对象的每个键值对
                            for (var key in controls) {
                                if (controls.hasOwnProperty(key)) {
                                    // 确保是对象自身的属性，而不是继承的属性
                                    var control = controls[key];
                                    _content += control.xml;

                                    // 处理事件
                                    var eventType = EventManager.EventType.CREATE;
                                    var controlId = control.id;
                                    _this.eventManager.trigger(eventType, controlId, {
                                        control: control
                                    });
                                }
                            }
                            return _content;
                        }
                        module.exports = XUL;

                        /***/
                    },

                /***/ './src/controls/Flash/FlashControl.js':
                    /*!********************************************!*\
  !*** ./src/controls/Flash/FlashControl.js ***!
  \********************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _slicedToArray(r, e) {
                            return (
                                _arrayWithHoles(r) ||
                                _iterableToArrayLimit(r, e) ||
                                _unsupportedIterableToArray(r, e) ||
                                _nonIterableRest()
                            );
                        }
                        function _nonIterableRest() {
                            throw new TypeError(
                                'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                            );
                        }
                        function _unsupportedIterableToArray(r, a) {
                            if (r) {
                                if ('string' == typeof r) return _arrayLikeToArray(r, a);
                                var t = {}.toString.call(r).slice(8, -1);
                                return (
                                    'Object' === t &&
                                        r.constructor &&
                                        (t = r.constructor.name),
                                    'Map' === t || 'Set' === t
                                        ? Array.from(r)
                                        : 'Arguments' === t ||
                                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                                t
                                            )
                                          ? _arrayLikeToArray(r, a)
                                          : void 0
                                );
                            }
                        }
                        function _arrayLikeToArray(r, a) {
                            (null == a || a > r.length) && (a = r.length);
                            for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
                            return n;
                        }
                        function _iterableToArrayLimit(r, l) {
                            var t =
                                null == r
                                    ? null
                                    : ('undefined' != typeof Symbol &&
                                          r[Symbol.iterator]) ||
                                      r['@@iterator'];
                            if (null != t) {
                                var e,
                                    n,
                                    i,
                                    u,
                                    a = [],
                                    f = !0,
                                    o = !1;
                                try {
                                    if (((i = (t = t.call(r)).next), 0 === l)) {
                                        if (Object(t) !== t) return;
                                        f = !1;
                                    } else
                                        for (
                                            ;
                                            !(f = (e = i.call(t)).done) &&
                                            (a.push(e.value), a.length !== l);
                                            f = !0
                                        );
                                } catch (r) {
                                    (o = !0), (n = r);
                                } finally {
                                    try {
                                        if (
                                            !f &&
                                            null != t['return'] &&
                                            ((u = t['return']()), Object(u) !== u)
                                        )
                                            return;
                                    } finally {
                                        if (o) throw n;
                                    }
                                }
                                return a;
                            }
                        }
                        function _arrayWithHoles(r) {
                            if (Array.isArray(r)) return r;
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );

                        // <element template="flash">
                        //     <flash className="control" id="flash" src="assets/flash.swf" width="250" height="100"/>
                        // </element>
                        var FlashControl = /*#__PURE__*/ (function (_XULControl) {
                            function FlashControl(id, xul, xml, attributes) {
                                _classCallCheck(this, FlashControl);
                                return _callSuper(this, FlashControl, [
                                    'flash',
                                    id,
                                    '',
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(FlashControl, _XULControl);
                            return _createClass(FlashControl, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._src = this.src;
                                        this._width = this.width;
                                        this._height = this.height;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'src',
                                    get: function get() {
                                        return this._src;
                                    },
                                    set: function set(val) {
                                        this._src = val;
                                        this._updateXmlAttribute('src', this._src);
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'height',
                                    get: function get() {
                                        return this._height;
                                    },
                                    set: function set(val) {
                                        this._height = val;
                                        this._updateXmlAttribute('height', this._height);
                                    }

                                    // endregion getter/setter
                                },
                                {
                                    key: '_updateXmlAttribute',
                                    value: function _updateXmlAttribute(attrName, value) {
                                        var customType =
                                            arguments.length > 2 &&
                                            arguments[2] !== undefined
                                                ? arguments[2]
                                                : this.type;
                                        // try {
                                        var xmlObj = this.parser.parse(this.xml);

                                        // xmlObj.row[customType][`@_${attrName}`] = String(value);
                                        var flashNode = xmlObj['element'][this.type];
                                        flashNode['@_'.concat(attrName)] = String(value);
                                        this.xml = this.builder.build(xmlObj);
                                        // } catch (error) {
                                        //   console.error(error);
                                        // }
                                    }
                                },
                                {
                                    key: '_setNewAttributes',
                                    value: function _setNewAttributes() {
                                        // try {
                                        var xmlObj = this.parser.parse(this.xml);
                                        var flashNode = xmlObj['element'][this.type];
                                        if (flashNode) {
                                            flashNode['@_id'] = this.id;
                                        }
                                        this.xml = this.builder.build(xmlObj);
                                        var attributes = this.attributes;
                                        if (!attributes) return;
                                        for (
                                            var _i = 0,
                                                _Object$entries =
                                                    Object.entries(attributes);
                                            _i < _Object$entries.length;
                                            _i++
                                        ) {
                                            var _Object$entries$_i = _slicedToArray(
                                                    _Object$entries[_i],
                                                    2
                                                ),
                                                name = _Object$entries$_i[0],
                                                value = _Object$entries$_i[1];
                                            // 跳过空值
                                            if (value === undefined || value === null)
                                                continue;

                                            // 调用setter方法设置属性值
                                            this[name] = value;
                                        }

                                        // 初始化设置
                                        this.xul.settings[this.id] = this.value;
                                        // } catch (error) {
                                        //   console.error(error);
                                        // }
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = FlashControl;

                        /***/
                    },

                /***/ './src/controls/compound/CheckboxGroup.js':
                    /*!************************************************!*\
  !*** ./src/controls/compound/CheckboxGroup.js ***!
  \************************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _superPropGet(t, o, e, r) {
                            var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e);
                            return 2 & r && 'function' == typeof p
                                ? function (t) {
                                      return p.apply(e, t);
                                  }
                                : p;
                        }
                        function _get() {
                            return (
                                (_get =
                                    'undefined' != typeof Reflect && Reflect.get
                                        ? Reflect.get.bind()
                                        : function (e, t, r) {
                                              var p = _superPropBase(e, t);
                                              if (p) {
                                                  var n = Object.getOwnPropertyDescriptor(
                                                      p,
                                                      t
                                                  );
                                                  return n.get
                                                      ? n.get.call(
                                                            arguments.length < 3 ? e : r
                                                        )
                                                      : n.value;
                                              }
                                          }),
                                _get.apply(null, arguments)
                            );
                        }
                        function _superPropBase(t, o) {
                            for (
                                ;
                                !{}.hasOwnProperty.call(t, o) &&
                                null !== (t = _getPrototypeOf(t));

                            );
                            return t;
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );

                        // <row template="checkboxgroup">
                        //     <label value="Checkbox Group:"/>
                        //     <vbox className="control" groupbox="true">
                        //         <checkbox className="control" id="checkbox[0]" label="Checkbox 1" checked="true" tabindex="" acceskey=""/>
                        //         <checkbox className="control" id="checkbox[1]" label="Checkbox 2" checked="true" tabindex="" acceskey=""/>
                        //         <checkbox className="control" id="checkbox[2]" label="Checkbox 3" checked="true" tabindex="" acceskey=""/>
                        //     </vbox>
                        // </row>
                        var CheckboxGroup = /*#__PURE__*/ (function (_XULControl) {
                            function CheckboxGroup(
                                id,
                                label,
                                xul,
                                xml,
                                attributes,
                                items
                            ) {
                                _classCallCheck(this, CheckboxGroup);
                                return _callSuper(this, CheckboxGroup, [
                                    'checkboxgroup',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes,
                                    items
                                ]);
                            }
                            _inherits(CheckboxGroup, _XULControl);
                            return _createClass(CheckboxGroup, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._groupbox = false;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'groupbox',
                                    get: function get() {
                                        return this._groupbox;
                                    },
                                    set: function set(val) {
                                        this._groupbox = val;
                                        this._updateXmlAttribute(
                                            'groupbox',
                                            this._groupbox ? 'true' : 'false'
                                        );
                                    }

                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'CheckboxGroup(id='
                                            .concat(this.id, ', label=')
                                            .concat(this._label, ', groupbox=')
                                            .concat(this._groupbox, ', items=')
                                            .concat(
                                                this.items.map(function (item) {
                                                    return item.label;
                                                }),
                                                ')'
                                            );
                                    }
                                },
                                {
                                    key: '_setNewItems',
                                    value: function _setNewItems(items) {
                                        var customType =
                                            arguments.length > 1 &&
                                            arguments[1] !== undefined
                                                ? arguments[1]
                                                : this.type;
                                        _superPropGet(
                                            CheckboxGroup,
                                            '_setNewItems',
                                            this,
                                            3
                                        )([items, 'vbox']);
                                    }
                                },
                                {
                                    key: '_updateXmlAttribute',
                                    value: function _updateXmlAttribute(attrName, value) {
                                        var customType =
                                            arguments.length > 2 &&
                                            arguments[2] !== undefined
                                                ? arguments[2]
                                                : this.type;
                                        _superPropGet(
                                            CheckboxGroup,
                                            '_updateXmlAttribute',
                                            this,
                                            3
                                        )([attrName, value, 'vbox']);
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = CheckboxGroup;

                        /***/
                    },

                /***/ './src/controls/compound/ListBox.js':
                    /*!******************************************!*\
  !*** ./src/controls/compound/ListBox.js ***!
  \******************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="listbox">
                        //     <label value="Listbox:" />
                        //     <listbox class="control" id="listbox" width="" flex="1" rows="6" tabindex="">
                        //         <listitem label="Item 1" value="1" selected="" />
                        //         <listitem label="Item 2" value="2" selected="" />
                        //         <listitem label="Item 3" value="3" selected="" />
                        //     </listbox>
                        // </row>

                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var ListBox = /*#__PURE__*/ (function (_XULControl) {
                            function ListBox(id, label, xul, xml, attributes, items) {
                                _classCallCheck(this, ListBox);
                                return _callSuper(this, ListBox, [
                                    'listbox',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes,
                                    items
                                ]);
                            }
                            _inherits(ListBox, _XULControl);
                            return _createClass(ListBox, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._width = null;
                                        this._flex = null;
                                        this._rows = 0;
                                        this._tabindex = null;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }
                                },
                                {
                                    key: 'rows',
                                    get: function get() {
                                        return this._rows;
                                    },
                                    set: function set(val) {
                                        this._rows = val;
                                        this._updateXmlAttribute('rows', this._rows);
                                    }
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }

                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'ListBox(id='
                                            .concat(this.id, ', label=')
                                            .concat(this._label, ', width=')
                                            .concat(this._width, ', flex=')
                                            .concat(this._flex, ', rows=')
                                            .concat(this._rows, ', tabindex=')
                                            .concat(this._tabindex, ', items=')
                                            .concat(
                                                this.items.map(function (item) {
                                                    return item.label;
                                                }),
                                                ')'
                                            );
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = ListBox;

                        /***/
                    },

                /***/ './src/controls/compound/MenuList.js':
                    /*!*******************************************!*\
  !*** ./src/controls/compound/MenuList.js ***!
  \*******************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );

                        // <row template="menulist">
                        //     <label value="Menu List:"/>
                        //     <menulist className="control" id="menulist" editable="" width="" flex="1" tabindex="" oncreate="" onsetfocus="">
                        //         <menupop className="control" id="menupop">
                        //             <menuitem label="Item 1" value="1" selected=""/>
                        //             <menuitem label="Item 2" value="2" selected=""/>
                        //             <menuitem label="Item 3" value="3" selected=""/>
                        //         </menupop>
                        //     </menulist>
                        // </row>
                        var MenuList = /*#__PURE__*/ (function (_XULControl) {
                            function MenuList(id, label, xul, xml, attributes, items) {
                                _classCallCheck(this, MenuList);
                                return _callSuper(this, MenuList, [
                                    'menulist',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes,
                                    items
                                ]);
                            }
                            _inherits(MenuList, _XULControl);
                            return _createClass(MenuList, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._editable = null;
                                        this._width = null;
                                        this._flex = null;
                                        this._tabindex = null;
                                        this._oncreate = null;
                                        this._onsetfocus = null;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'editable',
                                    get: function get() {
                                        return this._editable;
                                    },
                                    set: function set(val) {
                                        this._editable = val;
                                        this._updateXmlAttribute(
                                            'editable',
                                            this._editable
                                        );
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }
                                },
                                {
                                    key: 'oncreate',
                                    get: function get() {
                                        return this._oncreate;
                                    },
                                    set: function set(val) {
                                        this._oncreate = val;
                                        this._updateXmlAttribute(
                                            'oncreate',
                                            this._oncreate
                                        );
                                    }
                                },
                                {
                                    key: 'onsetfocus',
                                    get: function get() {
                                        return this._onsetfocus;
                                    },
                                    set: function set(val) {
                                        this._onsetfocus = val;
                                        this._updateXmlAttribute(
                                            'onsetfocus',
                                            this._onsetfocus
                                        );
                                    }

                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'MenuList(id='
                                            .concat(this.id, ', label=')
                                            .concat(this._label, ', width=')
                                            .concat(this._width, ', flex=')
                                            .concat(this._flex, ', tabindex=')
                                            .concat(this._tabindex, ', editable=')
                                            .concat(this._editable, ', oncreate=')
                                            .concat(this._oncreate, ', onsetfocus=')
                                            .concat(this._onsetfocus, ', items=')
                                            .concat(
                                                this.items.map(function (item) {
                                                    return item.label;
                                                }),
                                                ')'
                                            );
                                    }
                                },
                                {
                                    key: '_setNewItems',
                                    value: function _setNewItems(items) {
                                        var xmlObj = this.parser.parse(this.xml);
                                        // console.log(xmlObj);

                                        var listbox = this.getNode(xmlObj, this.type);
                                        var childrenType = this._getChildrenType(
                                            this.type
                                        );
                                        listbox.menupop[childrenType] = items;
                                        this.xml = this.builder.build(xmlObj);
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = MenuList;

                        /***/
                    },

                /***/ './src/controls/compound/RadioGroup.js':
                    /*!*********************************************!*\
  !*** ./src/controls/compound/RadioGroup.js ***!
  \*********************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );

                        // <row template="radiogroup">
                        //     <label value="Radio Group:"/>
                        //     <radiogroup className="control" id="radiogroup" tabindex="" groupbox="true">
                        //         <radio label="Radio 1" selected="" value="1" acceskey=""/>
                        //         <radio label="Radio 2" selected="" value="2" acceskey=""/>
                        //         <radio label="Radio 3" selected="" value="3" acceskey=""/>
                        //     </radiogroup>
                        // </row>
                        var RadioGroup = /*#__PURE__*/ (function (_XULControl) {
                            function RadioGroup(id, label, xul, xml, attributes, items) {
                                _classCallCheck(this, RadioGroup);
                                return _callSuper(this, RadioGroup, [
                                    'radiogroup',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes,
                                    items
                                ]);
                            }
                            _inherits(RadioGroup, _XULControl);
                            return _createClass(RadioGroup, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._tabindex = null;
                                        this._groupbox = false;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }
                                },
                                {
                                    key: 'groupbox',
                                    get: function get() {
                                        return this._groupbox;
                                    },
                                    set: function set(val) {
                                        this._groupbox = val;
                                        this._updateXmlAttribute(
                                            'groupbox',
                                            this._groupbox ? 'true' : 'false'
                                        );
                                    }

                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'RadioGroup(id='
                                            .concat(this.id, ', label=')
                                            .concat(this._label, ', tabindex=')
                                            .concat(this._tabindex, ', groupbox=')
                                            .concat(this._groupbox, ', items=')
                                            .concat(
                                                this.items.map(function (item) {
                                                    return item.label;
                                                }),
                                                ')'
                                            );
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = RadioGroup;

                        /***/
                    },

                /***/ './src/controls/nonvisual/Property.js':
                    /*!********************************************!*\
  !*** ./src/controls/nonvisual/Property.js ***!
  \********************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        // <property template="property" id="property" />
                        var Property = /*#__PURE__*/ (function (_XULControl) {
                            function Property(id, xul, xml) {
                                _classCallCheck(this, Property);
                                return _callSuper(this, Property, [
                                    'property',
                                    id,
                                    '',
                                    xul,
                                    xml
                                ]);
                            }
                            _inherits(Property, _XULControl);
                            return _createClass(Property, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {}
                                },
                                {
                                    key: '_setNewAttributes',
                                    value: function _setNewAttributes() {
                                        var xmlObj = this.parser.parse(this.xml);
                                        // console.log(xmlObj);

                                        var propertyNode = xmlObj[this.type];
                                        if (this.id) {
                                            propertyNode['@_id'] = this.id;
                                        }
                                        this.xml = this.builder.build(xmlObj);
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Property;

                        /***/
                    },

                /***/ './src/controls/nonvisual/Script.js':
                    /*!******************************************!*\
  !*** ./src/controls/nonvisual/Script.js ***!
  \******************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var xpath = __webpack_require__(/*! xpath */ 'xpath');
                        // <row template="script">
                        //     <script>
                        //         <![CDATA[
                        //         // JavaScript code here
                        //
                        // 		            ]]>
                        //                 </script>
                        // </row>
                        var Script = /*#__PURE__*/ (function (_XULControl) {
                            function Script(id, xul, xml, attributes) {
                                _classCallCheck(this, Script);
                                return _callSuper(this, Script, [
                                    'script',
                                    id,
                                    '',
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(Script, _XULControl);
                            return _createClass(Script, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {}
                                },
                                {
                                    key: '_setNewAttributes',
                                    value: function _setNewAttributes() {
                                        var content = this.attributes.content;
                                        // console.log("_setNewAttributes");
                                        var doc = this.domParser.parseFromString(
                                            this.xml,
                                            'text/xml'
                                        );

                                        // 获取 <script> 节点
                                        var scriptNode = xpath.select('//script', doc)[0];
                                        if (scriptNode) {
                                            // 获取现有的 CDATA 内容
                                            var existingContent = '';
                                            for (
                                                var i = 0;
                                                i < scriptNode.childNodes.length;
                                                i++
                                            ) {
                                                if (
                                                    scriptNode.childNodes[i].nodeType ===
                                                    4
                                                ) {
                                                    // CDATA_SECTION_NODE
                                                    existingContent +=
                                                        scriptNode.childNodes[i].data;
                                                } else if (
                                                    scriptNode.childNodes[i].nodeType ===
                                                    3
                                                ) {
                                                    // TEXT_NODE
                                                    existingContent +=
                                                        scriptNode.childNodes[i]
                                                            .nodeValue;
                                                }
                                            }

                                            // 添加新内容到 CDATA 区段
                                            var newContent = existingContent + content;

                                            // 清除现有的子节点
                                            while (scriptNode.firstChild) {
                                                scriptNode.removeChild(
                                                    scriptNode.firstChild
                                                );
                                            }

                                            // 创建新的 CDATA 节点并添加内容
                                            var cdataNode =
                                                doc.createCDATASection(newContent);
                                            scriptNode.appendChild(cdataNode);
                                        }
                                        var updatedXml =
                                            this.serializer.serializeToString(doc);
                                        // console.log(updatedXml);
                                        this.xml = updatedXml;
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Script;

                        /***/
                    },

                /***/ './src/controls/simple/Button.js':
                    /*!***************************************!*\
  !*** ./src/controls/simple/Button.js ***!
  \***************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="button">
                        //     <label value="Button:" align="" control="" />
                        //     <button class="control" id="button" label="Button" width="" flex="1" tabindex="" acceskey="" oncommand="" />
                        // </row>
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var Button = /*#__PURE__*/ (function (_XULControl) {
                            function Button(id, label, xul, xml, attributes) {
                                _classCallCheck(this, Button);
                                return _callSuper(this, Button, [
                                    'button',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(Button, _XULControl);
                            return _createClass(Button, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._label = 'Button';
                                        this._width = '';
                                        this._flex = '1';
                                        this._tabindex = '';
                                        this._acceskey = '';
                                        this._oncommand = '';
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'label',
                                    get: function get() {
                                        return this._label;
                                    },
                                    set: function set(val) {
                                        this._label = val;
                                        this._updateXmlAttribute('label', this._label);
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }
                                },
                                {
                                    key: 'acceskey',
                                    get: function get() {
                                        return this._acceskey;
                                    },
                                    set: function set(val) {
                                        this._acceskey = val;
                                        this._updateXmlAttribute(
                                            'acceskey',
                                            this._acceskey
                                        );
                                    }
                                },
                                {
                                    key: 'oncommand',
                                    get: function get() {
                                        return this._oncommand;
                                    },
                                    set: function set(val) {
                                        this._oncommand = val;
                                        this._updateXmlAttribute(
                                            'oncommand',
                                            this._oncommand
                                        );
                                    }

                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'Button(label='
                                            .concat(this._label, ', width=')
                                            .concat(this._width, ', flex=')
                                            .concat(this._flex, ', tabindex=')
                                            .concat(this._tabindex, ', acceskey=')
                                            .concat(this._acceskey, ', oncommand=')
                                            .concat(this._oncommand, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Button;

                        /***/
                    },

                /***/ './src/controls/simple/Checkbox.js':
                    /*!*****************************************!*\
  !*** ./src/controls/simple/Checkbox.js ***!
  \*****************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );

                        // <row template="checkbox">
                        //     <label value="Checkbox:"/>
                        //     <checkbox className="control" id="checkbox" label="Checkbox" checked="true" tabindex="" acceskey=""/>
                        // </row>
                        var Checkbox = /*#__PURE__*/ (function (_XULControl) {
                            function Checkbox(id, label, xul, xml, attributes) {
                                _classCallCheck(this, Checkbox);
                                return _callSuper(this, Checkbox, [
                                    'checkbox',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(Checkbox, _XULControl);
                            return _createClass(Checkbox, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        // checked特殊值，只需要有就行，true,false不重要
                                        // this._checked = false;
                                        this._tabindex = '';
                                        this._acceskey = '';
                                    }
                                    // region getter/setter
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }
                                },
                                {
                                    key: 'acceskey',
                                    get: function get() {
                                        return this._acceskey;
                                    },
                                    set: function set(val) {
                                        this._acceskey = val;
                                        this._updateXmlAttribute(
                                            'acceskey',
                                            this._acceskey
                                        );
                                    }
                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'Checkbox(checked='
                                            .concat(this._checked, ', tabindex=')
                                            .concat(this._tabindex, ', acceskey=')
                                            .concat(this._acceskey, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Checkbox;

                        /***/
                    },

                /***/ './src/controls/simple/ChooseFile.js':
                    /*!*******************************************!*\
  !*** ./src/controls/simple/ChooseFile.js ***!
  \*******************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="choosefile">
                        //     <label value="Choose File:" align="" control="" />
                        //     <choosefile id="choosefile" literal="false" pathtype="" required="" size="" type="" width="" flex="1" tabindex="" />
                        // </row>
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var ChooseFile = /*#__PURE__*/ (function (_XULControl) {
                            function ChooseFile(id, label, xul, xml, attributes) {
                                _classCallCheck(this, ChooseFile);
                                return _callSuper(this, ChooseFile, [
                                    'choosefile',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(ChooseFile, _XULControl);
                            return _createClass(ChooseFile, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._literal = false;
                                        this._pathtype = '';
                                        this._required = '';
                                        this._size = '';
                                        this._type = '';
                                        this._width = '';
                                        this._flex = '1';
                                        this._tabindex = '';
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'literal',
                                    get: function get() {
                                        return this._literal;
                                    },
                                    set: function set(val) {
                                        this._literal = val;
                                        this._updateXmlAttribute(
                                            'literal',
                                            this._literal ? 'true' : 'false'
                                        );
                                    }
                                },
                                {
                                    key: 'pathtype',
                                    get: function get() {
                                        return this._pathtype;
                                    },
                                    set: function set(val) {
                                        this._pathtype = val;
                                        this._updateXmlAttribute(
                                            'pathtype',
                                            this._pathtype
                                        );
                                    }
                                },
                                {
                                    key: 'required',
                                    get: function get() {
                                        return this._required;
                                    },
                                    set: function set(val) {
                                        this._required = val;
                                        this._updateXmlAttribute(
                                            'required',
                                            this._required
                                        );
                                    }
                                },
                                {
                                    key: 'size',
                                    get: function get() {
                                        return this._size;
                                    },
                                    set: function set(val) {
                                        this._size = val;
                                        this._updateXmlAttribute('size', this._size);
                                    }
                                },
                                {
                                    key: 'type',
                                    get: function get() {
                                        return this._type;
                                    },
                                    set: function set(val) {
                                        this._type = val;
                                        this._updateXmlAttribute('type', this._type);
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }
                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'ChooseFile(literal='
                                            .concat(this._literal, ', pathtype=')
                                            .concat(this._pathtype, ', required=')
                                            .concat(this._required, ', size=')
                                            .concat(this._size, ', type=')
                                            .concat(this._type, ', width=')
                                            .concat(this._width, ', flex=')
                                            .concat(this._flex, ', tabindex=')
                                            .concat(this._tabindex, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = ChooseFile;

                        /***/
                    },

                /***/ './src/controls/simple/Colorchip.js':
                    /*!******************************************!*\
  !*** ./src/controls/simple/Colorchip.js ***!
  \******************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="colorchip">
                        //     <label value="Colorchip:" />
                        //     <colorchip class="control" id="colorchip" color="" format="hex" width="100" />
                        // </row>

                        var Config = __webpack_require__(
                            /*! ../../Config */ './src/Config.js'
                        );
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var Colorchip = /*#__PURE__*/ (function (_XULControl) {
                            function Colorchip(id, label, xul, xml, attributes) {
                                _classCallCheck(this, Colorchip);
                                return _callSuper(this, Colorchip, [
                                    'colorchip',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(Colorchip, _XULControl);
                            return _createClass(Colorchip, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._color = '';
                                        this._format = 'hex';
                                        this._width = 100;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'color',
                                    get: function get() {
                                        return this._color;
                                    },
                                    set: function set(val) {
                                        this._color = val;
                                        this._updateXmlAttribute('color', this._color);
                                    }
                                },
                                {
                                    key: 'format',
                                    get: function get() {
                                        return this._format;
                                    },
                                    set: function set(val) {
                                        this._format = val;
                                        this._updateXmlAttribute('format', this._format);
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'Colorchip(color='
                                            .concat(this._color, ', format=')
                                            .concat(this._format, ', width=')
                                            .concat(this._width, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Colorchip;

                        /***/
                    },

                /***/ './src/controls/simple/Label.js':
                    /*!**************************************!*\
  !*** ./src/controls/simple/Label.js ***!
  \**************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="label">
                        //     <label value="Label" align=""/>
                        // </row>
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var Label = /*#__PURE__*/ (function (_XULControl) {
                            function Label(id, label, xul, xml, attributes) {
                                _classCallCheck(this, Label);
                                return _callSuper(this, Label, [
                                    'label',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(Label, _XULControl);
                            return _createClass(Label, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._value = null;
                                        this._align = null;
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'value',
                                    get: function get() {
                                        return this._value;
                                    },
                                    set: function set(value) {
                                        this._value = value;
                                        this._updateXmlAttribute('label', value);
                                    }
                                },
                                {
                                    key: 'align',
                                    get: function get() {
                                        return this._align;
                                    },
                                    set: function set(align) {
                                        this._align = align;
                                        this._updateXmlAttribute('align', align);
                                    }
                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'Button(label='
                                            .concat(this._label, ', width=')
                                            .concat(this._width, ', flex=')
                                            .concat(this._flex, ', tabindex=')
                                            .concat(this._tabindex, ', acceskey=')
                                            .concat(this._acceskey, ', oncommand=')
                                            .concat(this._oncommand, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Label;

                        /***/
                    },

                /***/ './src/controls/simple/PopupSlider.js':
                    /*!********************************************!*\
  !*** ./src/controls/simple/PopupSlider.js ***!
  \********************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="popupslider">
                        //     <label value="Popupslider:"/>
                        //     <popupslider className="control" id="popupslider" value="" minvalue="0" maxvalue="100" orientation="horz"
                        //                  tabindex="" width="60" flex=""/>
                        // </row>

                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var Config = __webpack_require__(
                            /*! ../../Config */ './src/Config.js'
                        );
                        var PopupSlider = /*#__PURE__*/ (function (_XULControl) {
                            function PopupSlider(id, label, xul, xml, attributes) {
                                _classCallCheck(this, PopupSlider);
                                return _callSuper(this, PopupSlider, [
                                    'popupslider',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(PopupSlider, _XULControl);
                            return _createClass(PopupSlider, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._value = '';
                                        this._minvalue = 0;
                                        this._maxvalue = 100;
                                        this._orientation = 'horz';
                                        this._tabindex = '';
                                        this._width = 60;
                                        this._flex = '';
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'value',
                                    get: function get() {
                                        return this._value;
                                    },
                                    set: function set(val) {
                                        this._value = val;
                                        this._updateXmlAttribute('value', this._value);
                                    }
                                },
                                {
                                    key: 'minvalue',
                                    get: function get() {
                                        return this._minvalue;
                                    },
                                    set: function set(val) {
                                        this._minvalue = val;
                                        this._updateXmlAttribute(
                                            'minvalue',
                                            this._minvalue
                                        );
                                    }
                                },
                                {
                                    key: 'maxvalue',
                                    get: function get() {
                                        return this._maxvalue;
                                    },
                                    set: function set(val) {
                                        this._maxvalue = val;
                                        this._updateXmlAttribute(
                                            'maxvalue',
                                            this._maxvalue
                                        );
                                    }
                                },
                                {
                                    key: 'orientation',
                                    get: function get() {
                                        return this._orientation;
                                    },
                                    set: function set(val) {
                                        this._orientation = val;
                                        this._updateXmlAttribute(
                                            'orientation',
                                            this._orientation
                                        );
                                    }
                                },
                                {
                                    key: 'tabindex',
                                    get: function get() {
                                        return this._tabindex;
                                    },
                                    set: function set(val) {
                                        this._tabindex = val;
                                        this._updateXmlAttribute(
                                            'tabindex',
                                            this._tabindex
                                        );
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }

                                    // endregion getter/setter

                                    // _updateXmlAttribute(attrName, value) {
                                    //     const attributes = this.attributes;
                                    //     if (!attributes) return;
                                    //     try {
                                    //         const xmlObj = this.parser.parse(this.xml);
                                    //
                                    //         xmlObj.row.popupslider[`@_${attrName}`] = value;
                                    //
                                    //         this.xml = this.builder.build(xmlObj);
                                    //     } catch (error) {
                                    //         console.error(error);
                                    //     }
                                    // }
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'PopupSlider(value='
                                            .concat(this._value, ', minvalue=')
                                            .concat(this._minvalue, ', maxvalue=')
                                            .concat(this._maxvalue, ', orientation=')
                                            .concat(this._orientation, ', tabindex=')
                                            .concat(this._tabindex, ', width=')
                                            .concat(this._width, ', flex=')
                                            .concat(this._flex, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = PopupSlider;

                        /***/
                    },

                /***/ './src/controls/simple/TargetList.js':
                    /*!*******************************************!*\
  !*** ./src/controls/simple/TargetList.js ***!
  \*******************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        // <row template="targetlist">
                        //     <label value="Targetlist:" />
                        //     <targetlist id="targetlist" class="" width="300" height="" flex="1" pathtype="absolute" />
                        //     <property id="targetlist" />
                        // </row>
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );
                        var TargetList = /*#__PURE__*/ (function (_XULControl) {
                            function TargetList(id, label, xul, xml, attributes) {
                                _classCallCheck(this, TargetList);
                                return _callSuper(this, TargetList, [
                                    'targetlist',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }
                            _inherits(TargetList, _XULControl);
                            return _createClass(TargetList, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._width = 300;
                                        this._height = '';
                                        this._flex = '1';
                                        this._pathtype = 'absolute';
                                    }

                                    // region getter/setter
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'height',
                                    get: function get() {
                                        return this._height;
                                    },
                                    set: function set(val) {
                                        this._height = val;
                                        this._updateXmlAttribute('height', this._height);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }
                                },
                                {
                                    key: 'pathtype',
                                    get: function get() {
                                        return this._pathtype;
                                    },
                                    set: function set(val) {
                                        this._pathtype = val;
                                        this._updateXmlAttribute(
                                            'pathtype',
                                            this._pathtype
                                        );
                                    }
                                    // endregion getter/setter
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'TargetList(width='
                                            .concat(this._width, ', height=')
                                            .concat(this._height, ', flex=')
                                            .concat(this._flex, ', pathtype=')
                                            .concat(this._pathtype, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = TargetList;

                        /***/
                    },

                /***/ './src/controls/simple/TextBox.js':
                    /*!****************************************!*\
  !*** ./src/controls/simple/TextBox.js ***!
  \****************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _callSuper(t, o, e) {
                            return (
                                (o = _getPrototypeOf(o)),
                                _possibleConstructorReturn(
                                    t,
                                    _isNativeReflectConstruct()
                                        ? Reflect.construct(
                                              o,
                                              e || [],
                                              _getPrototypeOf(t).constructor
                                          )
                                        : o.apply(t, e)
                                )
                            );
                        }
                        function _possibleConstructorReturn(t, e) {
                            if (e && ('object' == _typeof(e) || 'function' == typeof e))
                                return e;
                            if (void 0 !== e)
                                throw new TypeError(
                                    'Derived constructors may only return object or undefined'
                                );
                            return _assertThisInitialized(t);
                        }
                        function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return e;
                        }
                        function _isNativeReflectConstruct() {
                            try {
                                var t = !Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                );
                            } catch (t) {}
                            return (_isNativeReflectConstruct =
                                function _isNativeReflectConstruct() {
                                    return !!t;
                                })();
                        }
                        function _getPrototypeOf(t) {
                            return (
                                (_getPrototypeOf = Object.setPrototypeOf
                                    ? Object.getPrototypeOf.bind()
                                    : function (t) {
                                          return t.__proto__ || Object.getPrototypeOf(t);
                                      }),
                                _getPrototypeOf(t)
                            );
                        }
                        function _inherits(t, e) {
                            if ('function' != typeof e && null !== e)
                                throw new TypeError(
                                    'Super expression must either be null or a function'
                                );
                            (t.prototype = Object.create(e && e.prototype, {
                                constructor: { value: t, writable: !0, configurable: !0 }
                            })),
                                Object.defineProperty(t, 'prototype', { writable: !1 }),
                                e && _setPrototypeOf(t, e);
                        }
                        function _setPrototypeOf(t, e) {
                            return (
                                (_setPrototypeOf = Object.setPrototypeOf
                                    ? Object.setPrototypeOf.bind()
                                    : function (t, e) {
                                          return (t.__proto__ = e), t;
                                      }),
                                _setPrototypeOf(t, e)
                            );
                        }
                        var Config = __webpack_require__(
                            /*! ../../Config */ './src/Config.js'
                        );
                        var XULControl = __webpack_require__(
                            /*! ../../core/XULControl */ './src/core/XULControl.js'
                        );

                        // <row template="textbox">
                        //     <label value="Textbox:"/>
                        //     <textbox className="control" id="textbox" value="" maxlength="" prompt="" size="" multiline="false" width=""
                        //              flex="1"/>
                        // </row>
                        var Textbox = /*#__PURE__*/ (function (_XULControl) {
                            function Textbox(id, label, xul, xml, attributes) {
                                _classCallCheck(this, Textbox);
                                return _callSuper(this, Textbox, [
                                    'textbox',
                                    id,
                                    label,
                                    xul,
                                    xml,
                                    attributes
                                ]);
                            }

                            /**
                             * 初始化文本框属性
                             */
                            _inherits(Textbox, _XULControl);
                            return _createClass(Textbox, [
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        this._multiline = false;
                                        this._maxLength = null;
                                        this._prompt = '';
                                        this._required = false;
                                        this._pattern = null;
                                        this._size = null;
                                        this._value = '';
                                        this._width = null;
                                        this._flex = 1;
                                    }

                                    // region 属性访问器
                                },
                                {
                                    key: 'value',
                                    get: function get() {
                                        return this.xul.settings[this.id] || '';
                                    },
                                    set: function set(val) {
                                        var strVal = String(val);

                                        // 应用maxlength限制
                                        if (
                                            this._maxLength &&
                                            strVal.length > this._maxLength
                                        ) {
                                            strVal = strVal.substring(0, this._maxLength);
                                        }
                                        this.xul.settings[this.id] = strVal;
                                        this._updateXmlAttribute('value', strVal);
                                    }
                                },
                                {
                                    key: 'multiline',
                                    get: function get() {
                                        return this._multiline;
                                    },
                                    set: function set(state) {
                                        this._multiline = !!state;
                                        this._updateXmlAttribute(
                                            'multiline',
                                            this._multiline
                                        );
                                    }
                                },
                                {
                                    key: 'maxLength',
                                    get: function get() {
                                        return this._maxLength;
                                    },
                                    set: function set(length) {
                                        this._maxLength = Number.isInteger(length)
                                            ? length
                                            : null;
                                        this._updateXmlAttribute(
                                            'maxlength',
                                            this._maxLength
                                        );
                                    }
                                },
                                {
                                    key: 'prompt',
                                    get: function get() {
                                        return this._prompt;
                                    },
                                    set: function set(text) {
                                        this._prompt = String(text);
                                        this._updateXmlAttribute('prompt', this._prompt);
                                    }
                                },
                                {
                                    key: 'size',
                                    get: function get() {
                                        return this._size;
                                    },
                                    set: function set(val) {
                                        this._size = val ? parseInt(val) : null;
                                        this._updateXmlAttribute('size', this._size);
                                    }
                                },
                                {
                                    key: 'width',
                                    get: function get() {
                                        return this._width;
                                    },
                                    set: function set(val) {
                                        this._width = val ? parseInt(val) : null;
                                        this._updateXmlAttribute('width', this._width);
                                    }
                                },
                                {
                                    key: 'flex',
                                    get: function get() {
                                        return this._flex;
                                    },
                                    set: function set(val) {
                                        this._flex = val ? parseInt(val) : 1;
                                        this._updateXmlAttribute('flex', this._flex);
                                    }

                                    // endregion 属性访问器

                                    /**
                                     * 验证文本框值
                                     */
                                },
                                {
                                    key: 'validate',
                                    value: function validate() {
                                        var value = this.value;
                                        if (this._required && !value.trim()) {
                                            return 'Field "'.concat(
                                                this.id,
                                                '" is required'
                                            );
                                        }
                                        if (
                                            this._maxLength &&
                                            value.length > this._maxLength
                                        ) {
                                            return 'Text exceeds maximum length of '.concat(
                                                this._maxLength,
                                                ' characters'
                                            );
                                        }
                                        if (
                                            this._pattern &&
                                            !new RegExp(this._pattern).test(value)
                                        ) {
                                            return 'Invalid format for field "'.concat(
                                                this.id,
                                                '"'
                                            );
                                        }
                                        return null;
                                    }

                                    /**
                                     * 字符串表示
                                     */
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return 'Textbox (id="'
                                            .concat(this.id, '" value="')
                                            .concat(this.value, '" multiline=')
                                            .concat(this.multiline, ' maxLength=')
                                            .concat(this.maxLength, ' prompt="')
                                            .concat(this.prompt, '" size=')
                                            .concat(this.size, ' width=')
                                            .concat(this.width, ' flex=')
                                            .concat(this.flex, ')');
                                    }
                                }
                            ]);
                        })(XULControl);
                        module.exports = Textbox;

                        /***/
                    },

                /***/ './src/core/ControlFactory.js':
                    /*!************************************!*\
  !*** ./src/core/ControlFactory.js ***!
  \************************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        // import Textbox from "../controls/TextBox";

                        var Textbox = __webpack_require__(
                            /*! ../controls/simple/TextBox */ './src/controls/simple/TextBox.js'
                        );
                        var Colorchip = __webpack_require__(
                            /*! ../controls/simple/Colorchip */ './src/controls/simple/Colorchip.js'
                        );
                        var PopupSlider = __webpack_require__(
                            /*! ../controls/simple/PopupSlider */ './src/controls/simple/PopupSlider.js'
                        );
                        var Checkbox = __webpack_require__(
                            /*! ../controls/simple/Checkbox */ './src/controls/simple/Checkbox.js'
                        );
                        var Button = __webpack_require__(
                            /*! ../controls/simple/Button */ './src/controls/simple/Button.js'
                        );
                        var TargetList = __webpack_require__(
                            /*! ../controls/simple/TargetList */ './src/controls/simple/TargetList.js'
                        );
                        var ChooseFile = __webpack_require__(
                            /*! ../controls/simple/ChooseFile */ './src/controls/simple/ChooseFile.js'
                        );
                        var ListBox = __webpack_require__(
                            /*! ../controls/compound/ListBox */ './src/controls/compound/ListBox.js'
                        );
                        var MenuList = __webpack_require__(
                            /*! ../controls/compound/MenuList */ './src/controls/compound/MenuList.js'
                        );
                        var RadioGroup = __webpack_require__(
                            /*! ../controls/compound/RadioGroup */ './src/controls/compound/RadioGroup.js'
                        );
                        var CheckboxGroup = __webpack_require__(
                            /*! ../controls/compound/CheckboxGroup */ './src/controls/compound/CheckboxGroup.js'
                        );
                        var XULControl = __webpack_require__(
                            /*! ./XULControl */ './src/core/XULControl.js'
                        );
                        var Property = __webpack_require__(
                            /*! ../controls/nonvisual/Property */ './src/controls/nonvisual/Property.js'
                        );
                        var FlashControl = __webpack_require__(
                            /*! ../controls/Flash/FlashControl */ './src/controls/Flash/FlashControl.js'
                        );
                        var Label = __webpack_require__(
                            /*! ../controls/simple/Label */ './src/controls/simple/Label.js'
                        );
                        var Script = __webpack_require__(
                            /*! ../controls/nonvisual/Script */ './src/controls/nonvisual/Script.js'
                        );

                        /**
                         * 负责创建 XUL控件对象
                         */
                        var ControlFactory = /*#__PURE__*/ (function () {
                            function ControlFactory() {
                                _classCallCheck(this, ControlFactory);
                            }
                            return _createClass(ControlFactory, null, [
                                {
                                    key: 'create',
                                    value: function create(
                                        type,
                                        id,
                                        label,
                                        xul,
                                        xml,
                                        attributes,
                                        items
                                    ) {
                                        switch (type) {
                                            // simple controls
                                            case 'label':
                                                return new Label(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'textbox':
                                                return new Textbox(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'colorchip':
                                                return new Colorchip(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'popupslider':
                                                return new PopupSlider(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'checkbox':
                                                return new Checkbox(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'button':
                                                return new Button(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'targetlist':
                                                return new TargetList(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            case 'choosefile':
                                                return new ChooseFile(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );

                                            // complex controls
                                            case 'listbox':
                                                return new ListBox(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes,
                                                    items
                                                );
                                            case 'menulist':
                                                return new MenuList(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes,
                                                    items
                                                );
                                            case 'radiogroup':
                                                return new RadioGroup(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes,
                                                    items
                                                );
                                            case 'checkboxgroup':
                                                return new CheckboxGroup(
                                                    id,
                                                    label,
                                                    xul,
                                                    xml,
                                                    attributes,
                                                    items
                                                );

                                            // NON-VISUAL CONTROLS
                                            case 'separator':
                                                return new XULControl(
                                                    'separator',
                                                    id,
                                                    label,
                                                    xul,
                                                    xml
                                                );
                                            case 'spacer':
                                                return new XULControl(
                                                    'spacer',
                                                    id,
                                                    label,
                                                    xul,
                                                    xml
                                                );
                                            case 'property':
                                                return new Property(id, xul, xml);
                                            case 'script':
                                                return new Script(
                                                    id,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );

                                            // flash controls
                                            case 'flash':
                                                return new FlashControl(
                                                    id,
                                                    xul,
                                                    xml,
                                                    attributes
                                                );
                                            default:
                                                throw new Error(
                                                    'Unsupported control type: '.concat(
                                                        type
                                                    )
                                                );
                                        }
                                    }
                                }
                            ]);
                        })();
                        module.exports = ControlFactory;

                        /***/
                    },

                /***/ './src/core/ControlManager.js':
                    /*!************************************!*\
  !*** ./src/core/ControlManager.js ***!
  \************************************/
                    /***/ function (module) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        var ControlManager = /*#__PURE__*/ (function () {
                            function ControlManager() {
                                _classCallCheck(this, ControlManager);
                                this.controls = {};
                            }
                            return _createClass(ControlManager, [
                                {
                                    key: 'addControl',
                                    value: function addControl(control) {
                                        if (!control.id) {
                                            console.log('id为空，不能添加控件');
                                            return;
                                        }
                                        if (this.controls[control.id]) {
                                            throw new Error(
                                                'Control with id '.concat(
                                                    control.id,
                                                    ' already exists'
                                                )
                                            );
                                        }
                                        // this.controls[control.id] = control;
                                        this.updateControl(control);
                                    }
                                },
                                {
                                    key: 'getControl',
                                    value: function getControl(id) {
                                        return this.controls[id];
                                    }
                                },
                                {
                                    key: 'updateControl',
                                    value: function updateControl(newControl) {
                                        this.controls[newControl.id] = newControl;
                                    }
                                }
                            ]);
                        })();
                        module.exports = ControlManager;

                        /***/
                    },

                /***/ './src/core/DialogBuilder.js':
                    /*!***********************************!*\
  !*** ./src/core/DialogBuilder.js ***!
  \***********************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        var Config = __webpack_require__(
                            /*! ../Config */ './src/Config.js'
                        );
                        var xpath = __webpack_require__(/*! xpath */ 'xpath');

                        // 负责对话框构建
                        var DialogBuilder = /*#__PURE__*/ (function () {
                            function DialogBuilder() {
                                _classCallCheck(this, DialogBuilder);
                                this.parser = Config.parser;
                                this.builder = Config.builder;
                                this.domParser = Config.domParser;
                                this.serializer = Config.serializer;

                                /**
                                 * @type {string} dialog template parser
                                 */
                                this.xml = this._loadDialogTemplate();

                                // 加载控件模板
                                /**
                                 * @type {{[key: string]: string}} control template parser
                                 */
                                this.templates = this._loadControlTemplates();
                            }

                            /**
                             * 构建对话框
                             * @param {string} title - 对话框标题
                             * @param {string} content - 对话框内容
                             * @param {Array<number>} columns - 列宽数组
                             * @returns {string} XML字符串
                             */
                            return _createClass(DialogBuilder, [
                                {
                                    key: 'build',
                                    value: function build(title, content, columns) {
                                        // if (!content.startsWith('<row>')) {
                                        //     content = '<row>'.concat(content, '</row>');
                                        // }
                                        var xmlObj = this.parser.parse(this.xml);

                                        // 设置标题
                                        xmlObj.dialog['@_title'] = title;

                                        // 添加内容
                                        var contentObj = this.parser.parse(
                                            '<rows>'.concat(content, '</rows>')
                                        );
                                        xmlObj.dialog.content.grid.rows.row =
                                            contentObj.rows.row || [];

                                        // 设置列宽
                                        this.xml = this._setColumnWidths(xmlObj, columns);
                                        return this.xml;
                                    }
                                },
                                {
                                    key: '_setColumnWidths',
                                    value: function _setColumnWidths(xmlObj, columns) {
                                        var doc = this.domParser.parseFromString(
                                            this.builder.build(xmlObj),
                                            'text/xml'
                                        );
                                        var labels = xpath.select('//label', doc);
                                        labels.forEach(function (label) {
                                            return label.setAttribute(
                                                'width',
                                                columns[0]
                                            );
                                        });
                                        var controls = xpath.select(
                                            '//*[@class="control"]',
                                            doc
                                        );
                                        controls.forEach(function (control) {
                                            return control.setAttribute(
                                                'width',
                                                columns[1]
                                            );
                                        });

                                        // return this.parser.parse(this.serializer.serializeToString(doc));
                                        return this.serializer.serializeToString(doc);
                                    }

                                    // region loadTemplate
                                },
                                {
                                    key: '_loadDialogTemplate',
                                    value: function _loadDialogTemplate() {
                                        var xml = Config.loadTemplate('dialog.xul');
                                        // return this.parser.parse(xml);
                                        return xml;
                                    }

                                    /**
                                     * 加载控件模板
                                     * @private
                                     */
                                },
                                {
                                    key: '_loadControlTemplates',
                                    value: function _loadControlTemplates() {
                                        var xml = Config.loadTemplate('controls.xul');
                                        // console.log("control templates: ", xml);

                                        var doc = this.domParser.parseFromString(
                                            xml,
                                            'text/xml'
                                        );
                                        var rows = xpath.select('//rows/*', doc);
                                        var templates = {};
                                        rows.forEach(function (node) {
                                            var template = node.getAttribute('template');
                                            if (template) {
                                                templates[template] = node.toString();
                                            }
                                        });
                                        return templates;
                                    }

                                    // endregion loadTemplate
                                }
                            ]);
                        })();
                        module.exports = DialogBuilder;

                        /***/
                    },

                /***/ './src/core/EventManager.js':
                    /*!**********************************!*\
  !*** ./src/core/EventManager.js ***!
  \**********************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _defineProperty(e, r, t) {
                            return (
                                (r = _toPropertyKey(r)) in e
                                    ? Object.defineProperty(e, r, {
                                          value: t,
                                          enumerable: !0,
                                          configurable: !0,
                                          writable: !0
                                      })
                                    : (e[r] = t),
                                e
                            );
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        var EventEmitter = __webpack_require__(
                            /*! eventemitter3 */ 'eventemitter3'
                        );

                        // 枚举类型 create command change
                        var EventType = {
                            CREATE: 'create',
                            COMMAND: 'command',
                            CHANGE: 'change',
                            FOCUS: 'focus'
                        };
                        var XULEvent = /*#__PURE__*/ _createClass(
                            function XULEvent(type, control, xul) {
                                _classCallCheck(this, XULEvent);
                                // 事件类型
                                this.type = type;
                                // 关联的控件
                                this.control = control;
                                // XUL 实例
                                this.xul = xul;
                            }
                        );
                        var EventManager = /*#__PURE__*/ (function () {
                            function EventManager(xul) {
                                _classCallCheck(this, EventManager);
                                this.xul = xul;
                                this.emitter = new EventEmitter();
                            }
                            return _createClass(EventManager, [
                                {
                                    key: 'add',
                                    value:
                                        /**
                                         * 添加事件监听器
                                         * @param {string} eventType - 事件类型
                                         * @param {string} controlId - 控件 ID
                                         * @param {function(XULEvent, Object)} handler - 事件处理函数，接收一个 XULEvent 实例和一个 eventData 对象
                                         */
                                        function add(eventType, controlId, handler) {
                                            var eventName = this.getEventName(
                                                eventType,
                                                controlId
                                            );
                                            this.emitter.on(eventName, handler);
                                        }
                                },
                                {
                                    key: 'getEventName',
                                    value: function getEventName(eventType, controlId) {
                                        return ''
                                            .concat(eventType, ':')
                                            .concat(controlId);
                                    }

                                    /**
                                     * 触发事件
                                     * @param {string} eventType - 事件类型
                                     * @param {string} controlId - 控件 ID
                                     * @param {Object} eventData - 事件数据，传递给事件处理函数
                                     */
                                },
                                {
                                    key: 'trigger',
                                    value: function trigger(
                                        eventType,
                                        controlId,
                                        eventData
                                    ) {
                                        var eventName = this.getEventName(
                                            eventType,
                                            controlId
                                        );
                                        var control =
                                            this.xul.controlManager.getControl(controlId);
                                        var event = new XULEvent(
                                            eventType,
                                            control,
                                            this.xul
                                        );
                                        this.emitter.emit(eventName, event, eventData);
                                    }
                                }
                            ]);
                        })();
                        _defineProperty(EventManager, 'EventType', EventType);
                        module.exports = EventManager;

                        /***/
                    },

                /***/ './src/core/XULControl.js':
                    /*!********************************!*\
  !*** ./src/core/XULControl.js ***!
  \********************************/
                    /***/ function (
                        module,
                        __unused_webpack_exports,
                        __webpack_require__
                    ) {
                        function _slicedToArray(r, e) {
                            return (
                                _arrayWithHoles(r) ||
                                _iterableToArrayLimit(r, e) ||
                                _unsupportedIterableToArray(r, e) ||
                                _nonIterableRest()
                            );
                        }
                        function _nonIterableRest() {
                            throw new TypeError(
                                'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                            );
                        }
                        function _unsupportedIterableToArray(r, a) {
                            if (r) {
                                if ('string' == typeof r) return _arrayLikeToArray(r, a);
                                var t = {}.toString.call(r).slice(8, -1);
                                return (
                                    'Object' === t &&
                                        r.constructor &&
                                        (t = r.constructor.name),
                                    'Map' === t || 'Set' === t
                                        ? Array.from(r)
                                        : 'Arguments' === t ||
                                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                                t
                                            )
                                          ? _arrayLikeToArray(r, a)
                                          : void 0
                                );
                            }
                        }
                        function _arrayLikeToArray(r, a) {
                            (null == a || a > r.length) && (a = r.length);
                            for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
                            return n;
                        }
                        function _iterableToArrayLimit(r, l) {
                            var t =
                                null == r
                                    ? null
                                    : ('undefined' != typeof Symbol &&
                                          r[Symbol.iterator]) ||
                                      r['@@iterator'];
                            if (null != t) {
                                var e,
                                    n,
                                    i,
                                    u,
                                    a = [],
                                    f = !0,
                                    o = !1;
                                try {
                                    if (((i = (t = t.call(r)).next), 0 === l)) {
                                        if (Object(t) !== t) return;
                                        f = !1;
                                    } else
                                        for (
                                            ;
                                            !(f = (e = i.call(t)).done) &&
                                            (a.push(e.value), a.length !== l);
                                            f = !0
                                        );
                                } catch (r) {
                                    (o = !0), (n = r);
                                } finally {
                                    try {
                                        if (
                                            !f &&
                                            null != t['return'] &&
                                            ((u = t['return']()), Object(u) !== u)
                                        )
                                            return;
                                    } finally {
                                        if (o) throw n;
                                    }
                                }
                                return a;
                            }
                        }
                        function _arrayWithHoles(r) {
                            if (Array.isArray(r)) return r;
                        }
                        function _typeof(o) {
                            '@babel/helpers - typeof';
                            return (
                                (_typeof =
                                    'function' == typeof Symbol &&
                                    'symbol' == typeof Symbol.iterator
                                        ? function (o) {
                                              return typeof o;
                                          }
                                        : function (o) {
                                              return o &&
                                                  'function' == typeof Symbol &&
                                                  o.constructor === Symbol &&
                                                  o !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof o;
                                          }),
                                _typeof(o)
                            );
                        }
                        function _classCallCheck(a, n) {
                            if (!(a instanceof n))
                                throw new TypeError('Cannot call a class as a function');
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    'value' in o && (o.writable = !0),
                                    Object.defineProperty(e, _toPropertyKey(o.key), o);
                            }
                        }
                        function _createClass(e, r, t) {
                            return (
                                r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, 'prototype', { writable: !1 }),
                                e
                            );
                        }
                        function _toPropertyKey(t) {
                            var i = _toPrimitive(t, 'string');
                            return 'symbol' == _typeof(i) ? i : i + '';
                        }
                        function _toPrimitive(t, r) {
                            if ('object' != _typeof(t) || !t) return t;
                            var e = t[Symbol.toPrimitive];
                            if (void 0 !== e) {
                                var i = e.call(t, r || 'default');
                                if ('object' != _typeof(i)) return i;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === r ? String : Number)(t);
                        }
                        var Config = __webpack_require__(
                            /*! ../Config */ './src/Config.js'
                        );
                        var XULControl = /*#__PURE__*/ (function () {
                            function XULControl(
                                type,
                                id,
                                label,
                                xul,
                                xml,
                                attributes,
                                items
                            ) {
                                _classCallCheck(this, XULControl);
                                this.type = type;
                                this.id = id;
                                this.$label = label;
                                this.xul = xul;
                                this.xml = xml;
                                this.attributes = attributes;
                                this.enumerable = !/^button|flash$/.test(type);
                                this.compound =
                                    /^radiogroup|checkboxgroup|menulist|listbox$/.test(
                                        type
                                    );
                                this.parser = Config.parser;
                                this.builder = Config.builder;
                                this.domParser = Config.domParser;
                                this.serializer = Config.serializer;
                                if (this.id) {
                                    // 初始化属性
                                    this._initProperties();

                                    // 解析XML属性
                                    this._initDefaultAttributes();

                                    // 设置xml属性
                                    this._setNewAttributes();
                                }
                                if (this.compound) {
                                    this._clearTemplateItems();

                                    /**
                                     * { '@_label': 'Item 1', '@_value': '1', '@_selected': '' }
                                     * @type {Object[]}
                                     */
                                    this.items = this._initItems(items);
                                    // console.log(this.items);
                                    this._setNewItems(this.items);
                                }
                            }

                            // region Compound Controls
                            return _createClass(XULControl, [
                                {
                                    key: '_clearTemplateItems',
                                    value: function _clearTemplateItems() {
                                        var clearedItems = [];
                                        this._setNewItems(clearedItems);
                                    }
                                },
                                {
                                    key: '_getChildrenType',
                                    value: function _getChildrenType(parentType) {
                                        switch (parentType) {
                                            case 'radiogroup':
                                                return 'radio';
                                            case 'checkboxgroup':
                                                return 'checkbox';
                                            case 'menulist':
                                                return 'menuitem';
                                            case 'listbox':
                                                return 'listitem';
                                            default:
                                                throw new Error(
                                                    'Invalid parent type: '.concat(
                                                        parentType
                                                    )
                                                );
                                        }
                                    }

                                    /**
                                     * 初始化项目列表，将输入的 XML 格式的字符串数组或对象数组转换为统一的对象数组格式。
                                     * @param {Array} items - 输入的项目列表，可以是 XML 格式的字符串数组或对象数组。
                                     * @returns {Array} - 转换后的对象数组，每个对象的属性带有 '@_' 前缀。
                                     */
                                },
                                {
                                    key: '_initItems',
                                    value: function _initItems(items) {
                                        var _this = this;
                                        // 检查输入是否为数组
                                        if (!Array.isArray(items)) {
                                            throw new Error('输入必须是一个数组');
                                        }

                                        // 遍历输入数组，根据每个元素的类型进行处理
                                        return items.map(function (item) {
                                            if (typeof item === 'string') {
                                                var parsedItem = _this.parser.parse(item); // 解析 XML 字符串

                                                // 提取解析后的属性值，并转换为所需的格式
                                                var childrenType = _this._getChildrenType(
                                                    _this.type
                                                );
                                                var listitem = parsedItem[childrenType];
                                                return listitem;
                                            } else if (_typeof(item) === 'object') {
                                                // 如果是对象
                                                // 直接将对象的属性名添加 '@_' 前缀
                                                // 如果是对象，动态处理所有键并添加 '@_' 前缀
                                                var result = {};
                                                for (var key in item) {
                                                    if (item.hasOwnProperty(key)) {
                                                        result['@_'.concat(key)] =
                                                            item[key];
                                                    }
                                                }
                                                return result;
                                            } else {
                                                // 如果输入的元素类型既不是字符串也不是对象，抛出错误
                                                throw new Error(
                                                    '输入数组中的元素类型无效'
                                                );
                                            }
                                        });
                                    }
                                },
                                {
                                    key: '_setNewItems',
                                    value: function _setNewItems(items) {
                                        var customType =
                                            arguments.length > 1 &&
                                            arguments[1] !== undefined
                                                ? arguments[1]
                                                : this.type;
                                        var xmlObj = this.parser.parse(this.xml);
                                        // console.log(xmlObj);

                                        var listbox = this.getNode(xmlObj, customType);
                                        // console.log(listbox);
                                        var childrenType = this._getChildrenType(
                                            this.type
                                        );
                                        listbox[childrenType] = items;
                                        this.xml = this.builder.build(xmlObj);
                                    }

                                    // endregion Compound Controls
                                },
                                {
                                    key: 'toString',
                                    value: function toString() {
                                        return '[object XULControl id="'
                                            .concat(this.id, '" type="')
                                            .concat(this.type, '"]');
                                    }

                                    // region simple controls
                                },
                                {
                                    key: 'getNode',
                                    value: function getNode(xmlObj, tagName) {
                                        var node = xmlObj.row[tagName];
                                        return node;
                                    }
                                },
                                {
                                    key: '_updateXmlAttribute',
                                    value: function _updateXmlAttribute(attrName, value) {
                                        var customType =
                                            arguments.length > 2 &&
                                            arguments[2] !== undefined
                                                ? arguments[2]
                                                : this.type;
                                        // try {
                                        // console.log(attrName, value);
                                        var xmlObj = this.parser.parse(this.xml);
                                        xmlObj.row[customType]['@_'.concat(attrName)] =
                                            String(value);
                                        // console.log(xmlObj);
                                        this.xml = this.builder.build(xmlObj);
                                        // console.log(this.xml);
                                        // } catch (error) {
                                        //   console.error(error);
                                        // }
                                    }
                                },
                                {
                                    key: '_initProperties',
                                    value: function _initProperties() {
                                        throw new Error('Not implemented');
                                    }
                                },
                                {
                                    key: '_initDefaultAttributes',
                                    value: function _initDefaultAttributes() {
                                        // console.log("_initDefaultAttributes");

                                        var attributes = this.attributes;
                                        if (!attributes) return;
                                        // try {
                                        var xmlObj = this.parser.parse(this.xml);

                                        // 获取当前控件的节点
                                        var controlNode = this.getNode(xmlObj, this.type);
                                        if (!controlNode) return;

                                        // 遍历所有定义的属性，动态解析 XML 中的值
                                        for (
                                            var _i = 0,
                                                _Object$entries =
                                                    Object.entries(attributes);
                                            _i < _Object$entries.length;
                                            _i++
                                        ) {
                                            var _Object$entries$_i = _slicedToArray(
                                                    _Object$entries[_i],
                                                    2
                                                ),
                                                prop = _Object$entries$_i[0],
                                                defaultValue = _Object$entries$_i[1];
                                            var attrName = '@_'.concat(prop);
                                            var attrValue = controlNode[attrName];
                                            if (attrValue !== undefined) {
                                                // 根据属性类型进行解析
                                                if (
                                                    defaultValue === null ||
                                                    defaultValue === ''
                                                ) {
                                                    this[prop] =
                                                        attrValue || defaultValue;
                                                } else if (
                                                    typeof defaultValue === 'boolean'
                                                ) {
                                                    this[prop] = attrValue === 'true';
                                                } else if (
                                                    typeof defaultValue === 'number'
                                                ) {
                                                    this[prop] =
                                                        parseInt(attrValue, 10) ||
                                                        defaultValue;
                                                } else {
                                                    this[prop] =
                                                        attrValue || defaultValue;
                                                }
                                            } else {
                                                this[prop] = defaultValue;
                                            }
                                        }

                                        // console.log(xmlObj);
                                        // } catch (error) {
                                        //   console.error("Error parsing attributes for ".concat(this.type, ": ").concat(error));
                                        // }
                                    }
                                },
                                {
                                    key: '_setNewAttributes',
                                    value: function _setNewAttributes() {
                                        // try {
                                        var xmlObj = this.parser.parse(this.xml);
                                        var sliderNode = this.getNode(xmlObj, this.type);
                                        var labelNode = this.getNode(xmlObj, 'label');
                                        if (sliderNode) {
                                            sliderNode['@_id'] = this.id;
                                        }
                                        if (labelNode) {
                                            labelNode['@_value'] = this.$label;
                                        }

                                        // console.log(xmlObj);

                                        this.xml = this.builder.build(xmlObj);

                                        // console.log(this.xml);

                                        var attributes = this.attributes;
                                        if (!attributes) return;
                                        for (
                                            var _i2 = 0,
                                                _Object$entries2 =
                                                    Object.entries(attributes);
                                            _i2 < _Object$entries2.length;
                                            _i2++
                                        ) {
                                            var _Object$entries2$_i = _slicedToArray(
                                                    _Object$entries2[_i2],
                                                    2
                                                ),
                                                name = _Object$entries2$_i[0],
                                                value = _Object$entries2$_i[1];
                                            // 跳过空值
                                            if (value === undefined || value === null)
                                                continue;

                                            // 调用setter方法设置属性值
                                            this[name] = value;
                                        }

                                        // 初始化设置
                                        this.xul.settings[this.id] = this.value;
                                        // } catch (error) {
                                        //   console.error(error);
                                        // }
                                    }

                                    // endregion simple controls
                                }
                            ]);
                        })();
                        module.exports = XULControl;

                        /***/
                    },

                /***/ '?569f':
                    /*!********************!*\
  !*** fs (ignored) ***!
  \********************/
                    /***/ function () {
                        /* (ignored) */
                        /***/
                    },

                /***/ eventemitter3:
                    /*!********************************!*\
  !*** external "eventemitter3" ***!
  \********************************/
                    /***/ function (module) {
                        'use strict';
                        module.exports = __WEBPACK_EXTERNAL_MODULE_eventemitter3__;

                        /***/
                    },

                /***/ 'fast-xml-parser':
                    /*!**********************************!*\
  !*** external "fast-xml-parser" ***!
  \**********************************/
                    /***/ function (module) {
                        'use strict';
                        module.exports = __WEBPACK_EXTERNAL_MODULE_fast_xml_parser__;

                        /***/
                    },

                /***/ 'path-browserify':
                    /*!**********************************!*\
  !*** external "path-browserify" ***!
  \**********************************/
                    /***/ function (module) {
                        'use strict';
                        module.exports = __WEBPACK_EXTERNAL_MODULE_path_browserify__;

                        /***/
                    },

                /***/ xmldom:
                    /*!*************************!*\
  !*** external "xmldom" ***!
  \*************************/
                    /***/ function (module) {
                        'use strict';
                        module.exports = __WEBPACK_EXTERNAL_MODULE_xmldom__;

                        /***/
                    },

                /***/ xpath:
                    /*!************************!*\
  !*** external "xpath" ***!
  \************************/
                    /***/ function (module) {
                        'use strict';
                        module.exports = __WEBPACK_EXTERNAL_MODULE_xpath__;

                        /***/
                    }

                /******/
            };
            /************************************************************************/
            /******/ // The module cache
            /******/ var __webpack_module_cache__ = {};
            /******/
            /******/ // The require function
            /******/ function __webpack_require__(moduleId) {
                /******/ // Check if module is in cache
                /******/ var cachedModule = __webpack_module_cache__[moduleId];
                /******/ if (cachedModule !== undefined) {
                    /******/ return cachedModule.exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/ var module = (__webpack_module_cache__[moduleId] = {
                    /******/ // no module.id needed
                    /******/ // no module.loaded needed
                    /******/ exports: {}
                    /******/
                });
                /******/
                /******/ // Execute the module function
                /******/ __webpack_modules__[moduleId](
                    module,
                    module.exports,
                    __webpack_require__
                );
                /******/
                /******/ // Return the exports of the module
                /******/ return module.exports;
                /******/
            }
            /******/
            /************************************************************************/
            /******/
            /******/ // startup
            /******/ // Load entry module and return exports
            /******/ // This entry module is referenced by other modules so it can't be inlined
            /******/ var __webpack_exports__ = __webpack_require__('./src/XUL.js');
            /******/
            /******/ return __webpack_exports__;
            /******/
        })();
    }
);
