(function(){
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
      /* module decorator */module = __webpack_require__.nmd(module);
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

          // 动态模块，打包不允许使用
          // function TryLoad(moduleName) {
          //     var msg =
          //         alertMessageConfig[moduleName] || alertMessageConfig["default!"] + moduleName;
          //     var ok = confirm(msg);
          //     if (!ok) return;
          //
          //     // 加载模块
          //     var XUL;
          //     try {
          //         require([moduleName], function (module) {
          //             XUL = module;
          //         });
          //     } catch (e) {
          //         alert(alertMessageConfig["failed!"] + moduleName + "\n\n" + e.message);
          //     }
          //
          //     return XUL;
          // }

          /**
           * 检查变量是否被重新声明
           * @param {any} variable 被重复声明的变量
           * @param {string} name 变量名
           */
          function checkVariableRedeclaration(variable, name) {
            var assert;
            Promise.resolve(/*! AMD require */).then(function () {
              var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! assert */"./Third/nodejs/assert/assert.jsfl")];
              (function (module) {
                assert = module;
              }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);
            })['catch'](__webpack_require__.oe);
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
            // TryLoad: TryLoad,
            checkVariableRedeclaration: checkVariableRedeclaration,
            alertMessage: alertMessage
          };
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Core/flash/Context/KeyFrame/KeyFrameQuery.jsfl": (
    /*!********************************************************!*\
      !*** ./Core/flash/Context/KeyFrame/KeyFrameQuery.jsfl ***!
      \********************************************************/
    /***/
    function _Core_flash_Context_KeyFrame_KeyFrameQueryJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        /**
         * @file: KeyFrameQuery.jsfl
         * @author: 穹的兔兔
         * @email: 3101829204@qq.com
         * @date: 2025/4/22 18:36
         * @project: AnJsflScript
         * @description:
         */
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! SAT */"./Third/custom/sat-js-0.9.0/SAT.jsfl"), __webpack_require__(/*! Tips */"./Core/Utils/Tips.jsfl"), __webpack_require__(/*! LayerQuery */"./Core/flash/Context/Layer/LayerQuery.jsfl")], __WEBPACK_AMD_DEFINE_RESULT__ = function (SAT, Tips, lq) {
          var FrameRange = SAT.FrameRange;
          var checkVariableRedeclaration = Tips.checkVariableRedeclaration;
          var convertToLayerIndex = lq.convertToLayerIndex;

          /**
           * 获取选中元件的帧范围
           * @param {number[]} selectedFrames 选中帧数组 [layerIndex, startFrame, endFrame]
           * @return {FrameRange[]} 帧范围数组
           * @private
           */
          function wrapFrsFromSl(selectedFrames) {
            /**
             * 获取选中元件的帧范围
             * @type {FrameRange[]}
             */
            var frameRanges = [];
            for (var i = 0; i < selectedFrames.length; i += 3) {
              // fl.trace("选中元件：" + i);
              var layerIndex = selectedFrames[i];
              var startFrame = selectedFrames[i + 1];
              var endFrame = selectedFrames[i + 2];
              // i = i + 2;
              var fr = new FrameRange(layerIndex, startFrame, endFrame);
              frameRanges.push(fr);
            }
            return frameRanges;
          }

          /**
           * 获取选中元件的帧范围
           * var selectedFrames = timeline.getSelectedFrames();
           * @param {Timeline} timeline 时间线
           * @return {FrameRange[]} 帧范围数组
           */
          function getSelectedFrs(timeline) {
            checkVariableRedeclaration(timeline, "timeline");
            var selectedFrames = timeline.getSelectedFrames();
            return wrapFrsFromSl(selectedFrames);
          }

          /**
           * 快速抽取关键帧索引-注意是索引， 不是frame对象
           * @param {Layer} layer 图层
           * @return {number[]} 关键帧索引数组
           * @see https://gitee.com/ninge/WindowSWF/tree/master/
           * @private
           */
          function getKeyFrames(layer) {
            var frames = layer.frames;

            /**
             * 关键帧数组
             * @type {number[]}
             */
            var keyFrames = [];
            for (var i = frames.length - 1; i >= 0; i--) {
              //情景模拟， 95  80  20  1 是关键帧
              //获取关键帧数
              var frame = frames[i]; //i=100
              var startFrame = frame.startFrame; //95
              i = startFrame; // 跳过 100-95序列
              keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
            }
            keyFrames.sort(function (a, b) {
              return a - b;
            });
            return keyFrames;
          }

          /**
           * 获取关键帧 范围
           * @param {Array.<Layer>} layers 图层数组
           * @param {Layer|number} layer 图层
           * @param {number[]} keyFrames 关键帧索引数组
           * @return {FrameRange[]} 帧范围数组
           * @private
           */
          function wrapFrsFromKFs(layers, layer, keyFrames) {
            // 获取图层索引
            var layerIndex = convertToLayerIndex(layers, layer);

            /**
             * 关键帧范围数组
             * @type {FrameRange[]}
             */
            var keyFrameRanges = [];
            for (var i = 0; i < keyFrames.length; i++) {
              if (i + 1 >= keyFrames.length) continue;
              var startFrame = keyFrames[i];
              var endFrame = keyFrames[i + 1];
              // var layerIndex = layerIndex;
              var frameRange = new FrameRange(layerIndex, startFrame, endFrame);
              keyFrameRanges.push(frameRange);
            }
            return keyFrameRanges;
          }

          /**
           * 把 当前图层的关键帧  转为  FrameRange 对象。
           * @param {Array.<Layer>} layers 图层数组
           * @param {Layer} curLayer 当前图层
           * @return {FrameRange[]} 帧范围数组
           */
          function getKeyFrameRanges(layers, curLayer) {
            // 关键帧范围
            var keyFrames = getKeyFrames(curLayer);

            // 缺少最后一段，补上
            var lastKf = curLayer.frameCount; // 开区间
            keyFrames.push(lastKf);
            var keyFrameRanges = wrapFrsFromKFs(layers, curLayer, keyFrames);
            if (keyFrameRanges.length < 1) return null;
            return keyFrameRanges;
          }

          /**
           * 把  当前选中的帧范围  转为  关键帧中的  FrameRange 对象。
           * 要求  当前选中的范围  一定在某一个关键帧范围内，否则的话，只返回它最开始所在的FrameRange对象。
           * 相当于  只判断  选中范围的第一帧  在  关键帧范围内的  那个  FrameRange对象。
           * @param {FrameRange} selectedFrLittle 选中范围
           * @param {FrameRange[]} keyFrameRanges 关键帧范围数组
           * @return {FrameRange} 帧范围
           */
          function getKfrFromSlLittle(selectedFrLittle, keyFrameRanges) {
            var keyFr = null;
            for (var i = 0; i < keyFrameRanges.length; i++) {
              var keyFrameRange = keyFrameRanges[i];
              if (keyFrameRange.contain(selectedFrLittle)) {
                keyFr = keyFrameRange;
                break;
              }
            }
            return keyFr;
          }
          return {
            getSelectedFrs: getSelectedFrs,
            getKeyFrames: getKeyFrames,
            getKeyFrameRanges: getKeyFrameRanges,
            getKfrFromSlLittle: getKfrFromSlLittle
          };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Core/flash/Context/Layer/LayerQuery.jsfl": (
    /*!**************************************************!*\
      !*** ./Core/flash/Context/Layer/LayerQuery.jsfl ***!
      \**************************************************/
    /***/
    function _Core_flash_Context_Layer_LayerQueryJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        /**
         * @file: LayerQuery.jsfl
         * @author: 穹的兔兔
         * @email: 3101829204@qq.com
         * @date: 2025/4/21 22:31
         * @project: AnJsflScript
         * @description:
         */
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          /**
           * 获取包含指定名称的图层或其索引
           * @param {Array.<Layer>} layers 图层数组
           * @param {String} layerName 图层名称
           * @param {Boolean} [returnIndices=false] 是否返回图层索引而不是图层对象
           * @return {Array.<Layer>|Array.<Number>} 匹配的图层数组或索引数组
           */
          function _getLayersOrIndicesByName(layers, layerName, returnIndices) {
            returnIndices = returnIndices === undefined || returnIndices === null ? false : returnIndices;
            // log.debug(returnIndices);

            var result = [];
            for (var i = 0; i < layers.length; i++) {
              if (layers[i].name.includes(layerName)) {
                // log.debug(
                //     "layers[i].name: " + layers[i].name + "   layerName: " + layerName
                // );
                result.push(returnIndices ? i : layers[i]);
              }
            }
            return result;
          }

          /**
           * 获取包含指定名称的图层
           * @param {Array.<Layer>} layers 图层数组
           * @param {String} layerName 图层名称
           * @return {Array.<Layer>} 匹配的图层数组
           */
          function getLayersByName(layers, layerName) {
            return _getLayersOrIndicesByName(layers, layerName, false);
          }

          /**
           * 获取包含指定名称的图层的索引
           * @param {Array.<Layer>} layers 图层数组
           * @param {String} layerName 图层名称
           * @return {Array.<Number>} 匹配的图层索引数组
           */
          function getLayersIndexByName(layers, layerName) {
            return _getLayersOrIndicesByName(layers, layerName, true);
          }

          /**
           * 转换为图层索引
           * @param {Array.<Layer>} layers 图层数组
           * @param {Layer|Number} layer 图层或图层索引
           * @return {Number} 图层索引
           */
          function convertToLayerIndex(layers, layer) {
            // 获取图层索引
            var layerIndex = -1;
            if (typeof layer === "number") {
              layerIndex = layer;
            } else {
              layerIndex = layers.indexOf(layer);
            }
            return layerIndex;
          }

          /**
           * 转换为图层
           * @param {Array.<Layer>} layers 图层数组
           * @param {Layer|Number} layer 图层或图层索引
           * @return {Layer} 图层
           */
          function convertToLayer(layers, layer) {
            // var layers = timeline.layers;//图层

            if (typeof layer === "number") {
              var layerIndex = layer;
              return layers[layerIndex];
            } else {
              return layer;
            }
          }
          return {
            getLayersIndexByName: getLayersIndexByName,
            getLayersByName: getLayersByName,
            convertToLayerIndex: convertToLayerIndex,
            convertToLayer: convertToLayer
          };
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Core/flash/checkUtil.jsfl": (
    /*!***********************************!*\
      !*** ./Core/flash/checkUtil.jsfl ***!
      \***********************************/
    /***/
    function _Core_flash_checkUtilJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        22; /**
            * @file: checkUtil.jsfl
            * @author: 穹的兔兔
            * @email: 3101829204@qq.com
            * @date: 2025/1/30 14:24
            * @project: AnJsflScript
            * @description:
            */

        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! Tips */"./Core/Utils/Tips.jsfl"), __webpack_require__(/*! SAT */"./Third/custom/sat-js-0.9.0/SAT.jsfl"), __webpack_require__(/*! KeyFrameQuery */"./Core/flash/Context/KeyFrame/KeyFrameQuery.jsfl")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Tips, SAT, kfq) {
          var checkVariableRedeclaration = Tips.checkVariableRedeclaration;
          var FrameRange = SAT.FrameRange,
            FrameRangeList = SAT.FrameRangeList;
          var getSelectedFrs = kfq.getSelectedFrs;

          /**
           * 检查选择的元件或帧是否符合指定的模式和条件。
           *
           * @param {Array} selection - 选择的元件或帧数组。
           * @param {"selectElement"|"selectFrame"|"elementOnFrame"|"selectLibItem"|"selectLayer"|"selectedFrameDuration"|"selectedFrameFirstDuration"} [mode="selectElement"] - 检查模式，默认值为 "selectElement"。
           * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|"=0"|"=1"|"=2"|">=2"} [condition="No limit"] - 检查条件，默认值为 "No limit"。
           * @param {string} [exTips] - 额外提示信息。
           * @returns {boolean} - 如果选择符合指定条件，则返回 true，否则返回 false。
           *
           * @throws {Error} 如果 mode 或 condition 为 null，将抛出错误并提示用户。
           * @note
           * - 参数 `mode` 和 `condition` 不允许传入 `null`。如果需要使用默认值，请确保传入 `undefined` 或直接省略参数。
           * - 如果传入 `null`，函数将终止执行并提示用户。
           */
          function CheckSelection(selection, mode, condition, exTips) {
            checkVariableRedeclaration(selection, "selection");

            // 检查 mode 是否为 null
            if (mode === null) {
              // console.error("CheckSelection: 模式不能为 null，请指定一个有效的模式！");
              alert("模式不能为 null，请指定一个有效的模式！");
              return false;
            }

            // 设置 mode 的默认值（仅当 mode 是 undefined 时）
            mode = mode || "selectElement";

            // 检查 condition 是否为 null
            if (condition === null) {
              // console.error("CheckSelection: 条件不能为 null，请指定一个有效的条件！");
              alert("条件不能为 null，请指定一个有效的条件！");
              return false;
            }

            // 设置 condition 的默认值（仅当 condition 是 undefined 时）
            condition = condition || "No limit";

            // 定义模式
            // 定义模式
            var modes = ["selectElement", "selectFrame", "elementOnFrame", "selectLibItem", "selectLayer", "selectedFrameDuration", "selectedFrameFirstDuration"];

            // 定义条件列表（主条件列表和其他别名列表）
            var conditions = [["No limit", "Not Zero", "Zero", "Only one", "Only two", "More"],
            // 主条件列表
            [null, "=0", ">0", "=1", "=2", ">=2"] // 别名列表
            ];

            // 定义提示信息
            var messages = [[null, "请选择一个元件。", "请至少选择一个元件。", "请只选择一个元件。", "请同时选择两个元件。", "请选择多个元件。"], [null, "请选择一个帧。", "请至少选择一个帧。", "请只选择一个帧。", "请同时选择两个帧。", "请选择多个帧。"], [null, "当前帧上需要有元件。", "当前帧上至少需要一个元件。", "当前帧上只能有一个元件。", "当前帧上只能有两个元件。", "当前帧上需要多个元件。"], [null, "请选择库中的一个项目。", "请至少选择一个库项目。", "请只选择一个库项目。", "请同时选择两个库项目。", "请选择多个库项目。"], [null, "请选择一个图层。", "请至少选择一个图层。", "请只选择一个图层。", "请同时选择两个图层。", "请选择多个图层。"], [null, "所选帧总时长 不能为 0 帧。", "所选帧总时长 至少为 1 帧。", "所选帧总时长 只能为 1 帧。", "所选帧总时长 只能为 2 帧。", "所选帧总时长 不能小于 2 帧。"], [null, "所选帧的  第一段 时长 不能为 0 帧。", "所选帧的  第一段 时长 至少为 1 帧。", "所选帧的  第一段 时长 只能为 1 帧。", "所选帧的  第一段 时长 只能为 2 帧。", "所选帧的  第一段 时长 不能小于 2 帧。"]];

            // 获取模式索引
            var modeIndex = modes.indexOf(mode);
            if (modeIndex === -1) {
              alert("无效的模式：" + mode);
              return false;
            }

            // 内部函数：查找条件索引
            function findConditionIndex(condition) {
              for (var i = 0; i < conditions.length; i++) {
                var index = conditions[i].indexOf(condition);
                if (index !== -1) {
                  return index; // 返回找到的列索引
                }
              }
              return -1; // 未找到条件
            }

            // 查找条件索引
            var conditionIndex = findConditionIndex(condition);
            if (conditionIndex === -1) {
              alert("无效的条件：" + condition);
              return false;
            }

            // 内部函数：检查条件并返回结果
            function checkCondition(conditionIndex, length) {
              switch (conditionIndex) {
                case 0:
                  // No limit
                  return true;
                case 1:
                  // Not Zero
                  return length > 0;
                case 2:
                  // Zero
                  return length === 0;
                case 3:
                  // Only one
                  return length === 1;
                case 4:
                  // Only two
                  return length === 2;
                case 5:
                  // More
                  return length > 2;
                default:
                  throw new Error("未知条件：" + condition);
              }
            }

            // 检查条件并返回结果
            if (!checkCondition(conditionIndex, selection.length)) {
              var defaultMessage = messages[modeIndex][conditionIndex];
              var message = exTips ? defaultMessage + "(" + exTips + ")" : defaultMessage;
              alert(message);
              return false;
            }
            return true;
          }

          /**
           * 检查文档是否存在
           * @param {Document} [doc] - 文档对象。
           * @returns {Document}
           */
          function CheckDom(doc) {
            if (doc === undefined) doc = fl.getDocumentDOM();
            if (!doc) {
              alert("请打开 一个 [.fla] 文件 或者 创建一个新文档");
              return;
            }
            return doc;
          }

          /**
           * 检查选中的帧是否符合指定的条件
           * @param {Timeline} timeline - 时间轴对象。
           * @param {string} [exTips] - 额外提示信息。
           * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|
           * ">0"|"=0"|"=1"|"=2"|">1"} [condition="Not Zero"] - 检查条件
           * @param {{min: number, max: number,onlyFirst: boolean}} [range] - 帧范围
           * @returns {FrameRangeList}
           */
          function CheckSelectedFrames(timeline, exTips, condition, range) {
            if (condition === undefined) condition = "Not Zero";
            var frs = FrameRangeList.from(getSelectedFrs(timeline));
            if (!CheckSelection(frs, "selectFrame", "Not Zero")) return null;
            if (range) {
              var min = range.min,
                max = range.max,
                onlyFirst = range.onlyFirst;
              var totalDuration = 0;
              if (onlyFirst) {
                totalDuration = frs[0].duration;
              } else {
                totalDuration = frs.reduce(function (acc, fr) {
                  return acc + fr.duration;
                }, 0);
              }
              var mode = onlyFirst ? "selectedFrameFirstDuration" : "selectedFrameDuration";
              var exTips = exTips ? exTips : "";
              exTips += " 所选帧总时长 [" + totalDuration + "] 帧, ";
              if (min !== undefined && totalDuration < min) {
                exTips += " 要求不能小于 [" + min + "] 帧, 请重新选择";
              }
              if (max !== undefined && totalDuration > max) {
                exTips += " 要求不能大于 [" + max + "] 帧, 请重新选择";
              }
              if (!CheckSelection(frs, mode, condition, exTips)) return null;
            } else {
              // console.log(frs, frs.length);
              if (!CheckSelection(frs, "selectFrame", condition, exTips)) return null;
            }
            return frs;
          }

          // // 请勿选择多个图层！
          // var totalLayers = frs.getUniqueLayerIndexes();
          // if (totalLayers.length > 1) {
          //     alert("请勿选择多个图层！");
          //     return;
          // }
          /**
           * 检查选中的图层是否符合指定的条件
           * @param {Timeline} timeline - 时间轴对象。
           * @param {string} [exTips] - 额外提示信息。
           * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|
           * ">0"|"=0"|"=1"|"=2"|">1"} [condition="Not Zero"] - 检查条件
           * @returns {Array}
           */
          function CheckSelectedLayers(timeline, condition, exTips) {
            if (condition === undefined) condition = "Not Zero";
            var frs = FrameRangeList.from(getSelectedFrs(timeline));
            var totalLayers = frs.getUniqueLayerIndexes();
            if (!CheckSelection(totalLayers, "selectLayer", condition, exTips)) return null;
            return totalLayers;
          }
          return {
            CheckSelection: CheckSelection,
            CheckDom: CheckDom,
            CheckSelectedFrames: CheckSelectedFrames,
            CheckSelectedLayers: CheckSelectedLayers
          };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/custom/sat-js-0.9.0/SAT.jsfl": (
    /*!********************************************!*\
      !*** ./Third/custom/sat-js-0.9.0/SAT.jsfl ***!
      \********************************************/
    /***/
    function _Third_custom_satJs090_SATJsfl(module, exports, __webpack_require__) {
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
        // Version 0.9.0 - Copyright 2012 - 2021 -  Jim Riecken <jimr@jimr.ca>
        //
        // Released under the MIT License - https://github.com/jriecken/sat-js
        //
        // A simple library for determining intersections of circles and
        // polygons using the Separating Axis Theorem.
        /** @preserve SAT.js - Version 0.9.0 - Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

        /*global define: false, module: false*/
        /*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true,
          eqeqeq:true, bitwise:true, strict:true, undef:true,
          curly:true, browser:true */

        // Create a UMD wrapper for SAT. Works in:
        //
        //  - Plain browser via global SAT variable
        //  - AMD loader (like require.js)
        //  - Node.js
        //
        // The quoted properties all over the place are used so that the Closure Compiler
        // does not mangle the exposed API in advanced mode.

        /**
         * @param {*} root - The global scope
         * @param {Function} factory - Factory that creates SAT module
         */
        (function (root, factory) {
          "use strict";

          if (true) {
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {}
        })(this, function () {
          "use strict";

          var SAT = {};
          var SAT_GLOBALS = {};
          var SAT_CHECk = {};

          /**
           * 继承宏
           * @param {Function} SUB_CLASS 子类
           * @param {Function} SUPER_CLASS 父类
           * @param {Object} [properties] 子类属性
           */
          function INHERIT_MACRO(SUB_CLASS, SUPER_CLASS, properties) {
            // 继承父类原型
            SUB_CLASS.prototype = Object.create(SUPER_CLASS.prototype);
            SUB_CLASS.prototype.constructor = SUB_CLASS;

            // 添加父类引用
            SUB_CLASS.superConstructor = SUPER_CLASS;
            SUB_CLASS.superClass = SUPER_CLASS.prototype;

            // 继承父类 静态方法
            Object.assign(SUB_CLASS, SUPER_CLASS);

            // 添加属性或方法
            if (properties) {
              Object.assign(SUB_CLASS.prototype, properties);
            }
          }

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______     ______     ______       __     ______     ______     ______
          // /\  ___\   /\  __ \   /\  == \     /\ \   /\  ___\   /\  ___\   /\__  _\
          // \ \___  \  \ \ \/\ \  \ \  __<    _\_\ \  \ \  __\   \ \ \____  \/_/\ \/
          //  \/\_____\  \ \_____\  \ \_____\ /\_____\  \ \_____\  \ \_____\    \ \_\
          //   \/_____/   \/_____/   \/_____/ \/_____/   \/_____/   \/_____/     \/_/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // SObject
          /**
           * SObject 构造函数
           * @constructor
           * @note  子类必须有 无参构造函数，否则clone方法会报错
           */
          function SObject() {}

          /**
           * 复制 SObject 对象的属性
           * @param {SObject} other 要复制的 SObject 对象
           * @returns {SObject} 返回当前对象
           */
          SObject.prototype.copy = function (other) {
            // if (!(other instanceof SObject)) {
            //     throw new TypeError("The argument must be an instance of SObject.");
            // }
            for (var prop in other) {
              if (other.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                this[prop] = other[prop];
              }
            }
            return this;
          };

          /**
           * 克隆 SObject 对象
           * @returns {SObject} 返回克隆后的对象
           */
          SObject.prototype.clone = function () {
            var SObjectConstructor = this.constructor;
            var sObject = new SObjectConstructor();
            sObject.copy(this);
            return sObject;
          };

          /**
           * 将 SObject 对象转换为向量表示
           * @returns {Object} 返回一个表示向量的对象
           */
          SObject.prototype.toVector = function () {
            throw new Error("Not implemented");
          };

          /**
           * 返回对象的字符串表示
           * @returns {string} 返回对象的字符串表示
           */
          SObject.prototype.toString = function () {
            var props = [];
            for (var prop in this) {
              if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                props.push(prop + "=" + this[prop]);
              }
            }
            return this.constructor.name + "(" + props.join(", ") + ")";
          };

          /**
           * 返回对象的属性值的普通对象表示
           * @returns {Object} 返回对象的属性值的普通对象表示
           */
          SObject.prototype.toObj = function () {
            var obj = {};
            for (var prop in this) {
              if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                obj[prop] = this[prop];
              }
            }
            return obj;
          };

          /**
           * 静态方法，返回类的字符串表示
           * @returns {string} 返回类的字符串表示
           */
          SObject.toString = function () {
            return "[class " + this.name + "]";
          };

          // ------------------------------------------------------------------------------------------------------------------------
          //  __   __   ______     ______     ______   ______     ______
          // /\ \ / /  /\  ___\   /\  ___\   /\__  _\ /\  __ \   /\  == \
          // \ \ \'/   \ \  __\   \ \ \____  \/_/\ \/ \ \ \/\ \  \ \  __<
          //  \ \__|    \ \_____\  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
          //   \/_/      \/_____/   \/_____/     \/_/   \/_____/   \/_/ /_/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Vector
          //
          // Represents a vector in two dimensions with `x` and `y` properties.

          // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
          // a coordinate is not specified, it will be set to `0`
          /**
           * @param {?number=} x The x position.
           * @param {?number=} y The y position.
           * @constructor
           */
          function Vector(x, y) {
            SObject.apply(this, arguments);

            // if (x === undefined || y === undefined) {
            //     throw new Error("Both x and y must be defined");
            // }
            this["x"] = x || 0;
            this["y"] = y || 0;
          }
          INHERIT_MACRO(Vector, SObject);
          Vector.prototype.toVector = function () {
            return this;
          };
          SAT["Vector"] = Vector;
          // Alias `Vector` as `V`
          SAT["V"] = Vector;

          // Change this vector to be perpendicular to what it was before. (Effectively
          // rotates it 90 degrees in a clockwise direction)
          /**
           * @return {Vector} This for chaining.
           */
          Vector.prototype["perp"] = Vector.prototype.perp = function () {
            var x = this["x"];
            this["x"] = this["y"];
            this["y"] = -x;
            return this;
          };

          // Rotate this vector (counter-clockwise) by the specified angle (in radians).
          /**
           * @param {number} angle The angle to rotate (in radians)
           * @return {Vector} This for chaining.
           */
          Vector.prototype["rotate"] = Vector.prototype.rotate = function (angle) {
            var x = this["x"];
            var y = this["y"];
            this["x"] = x * Math.cos(angle) - y * Math.sin(angle);
            this["y"] = x * Math.sin(angle) + y * Math.cos(angle);
            return this;
          };

          // Reverse this vector.
          /**
           * @return {Vector} This for chaining.
           */
          Vector.prototype["reverse"] = Vector.prototype.reverse = function () {
            this["x"] = -this["x"];
            this["y"] = -this["y"];
            return this;
          };
          Vector.prototype["invert"] = Vector.prototype.invert = function () {
            if (this.x === 0 || this.y === 0) {
              throw new Error("x and y must not be zero");
            }
            return new Vector(1 / this.x, 1 / this.y);
          };

          // Normalize this vector.  (make it have length of `1`)
          /**
           * @return {Vector} This for chaining.
           */
          Vector.prototype["normalize"] = Vector.prototype.normalize = function () {
            var d = this.len();
            if (d > 0) {
              this["x"] = this["x"] / d;
              this["y"] = this["y"] / d;
            }
            return this;
          };

          // Add another vector to this one.
          /**
           * @param {Vector} other The other Vector.
           * @return {Vector} This for chaining.
           */
          Vector.prototype["add"] = Vector.prototype.add = function (other) {
            this["x"] += other["x"];
            this["y"] += other["y"];
            return this;
          };

          // Subtract another vector from this one.
          /**
           * @param {Vector} other The other Vector.
           * @return {Vector} This for chaiing.
           */
          Vector.prototype["sub"] = Vector.prototype.sub = function (other) {
            this["x"] -= other["x"];
            this["y"] -= other["y"];
            return this;
          };

          // Scale this vector. An independent scaling factor can be provided
          // for each axis, or a single scaling factor that will scale both `x` and `y`.
          /**
           * @param {number} x The scaling factor in the x direction.
           * @param {?number=} y The scaling factor in the y direction.  If this
           *   is not specified, the x scaling factor will be used.
           * @return {Vector} This for chaining.
           */
          Vector.prototype["scale"] = Vector.prototype.scale = function (x, y) {
            this["x"] *= x;
            this["y"] *= typeof y !== "undefined" ? y : x;
            return this;
          };

          // Project this vector on to another vector.
          /**
           * @param {Vector} other The vector to project onto.
           * @return {Vector} This for chaining.
           */
          Vector.prototype["project"] = Vector.prototype.project = function (other) {
            var amt = this.dot(other) / other.len2();
            this["x"] = amt * other["x"];
            this["y"] = amt * other["y"];
            return this;
          };

          // Project this vector onto a vector of unit length. This is slightly more efficient
          // than `project` when dealing with unit vectors.
          /**
           * @param {Vector} other The unit vector to project onto.
           * @return {Vector} This for chaining.
           */
          Vector.prototype["projectN"] = Vector.prototype.projectN = function (other) {
            var amt = this.dot(other);
            this["x"] = amt * other["x"];
            this["y"] = amt * other["y"];
            return this;
          };

          // Reflect this vector on an arbitrary axis.
          /**
           * @param {Vector} axis The vector representing the axis.
           * @return {Vector} This for chaining.
           */
          Vector.prototype["reflect"] = Vector.prototype.reflect = function (axis) {
            var x = this["x"];
            var y = this["y"];
            this.project(axis).scale(2);
            this["x"] -= x;
            this["y"] -= y;
            return this;
          };

          // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
          // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
          /**
           * @param {Vector} axis The unit vector representing the axis.
           * @return {Vector} This for chaining.
           */
          Vector.prototype["reflectN"] = Vector.prototype.reflectN = function (axis) {
            var x = this["x"];
            var y = this["y"];
            this.projectN(axis).scale(2);
            this["x"] -= x;
            this["y"] -= y;
            return this;
          };

          // Get the dot product of this vector and another.
          /**
           * @param {Vector}  other The vector to dot this one against.
           * @return {number} The dot product.
           */
          Vector.prototype["dot"] = Vector.prototype.dot = function (other) {
            return this["x"] * other["x"] + this["y"] * other["y"];
          };

          // Get the squared length of this vector.
          /**
           * @return {number} The length^2 of this vector.
           */
          Vector.prototype["len2"] = Vector.prototype.len2 = function () {
            return this.dot(this);
          };

          // Get the length of this vector.
          /**
           * @return {number} The length of this vector.
           */
          Vector.prototype["len"] = Vector.prototype.len = function () {
            return Math.sqrt(this.len2());
          };

          /**
           * 四舍五入
           * @returns {Vector}
           */
          Vector.prototype["round"] = Vector.prototype.round = function () {
            // return new Vector(Math.round(this.x), Math.round(this.y));
            this["x"] = Math.round(this["x"]);
            this["y"] = Math.round(this["y"]);
            return this;
          };

          /**
           * timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);
           * 要求x,y必须为非0的整数
           * @returns {Vector}
           */
          Vector.prototype["noZero"] = Vector.prototype.noZero = function () {
            this["x"] = this["x"] ? this["x"] : 1;
            this["y"] = this["y"] ? this["y"] : 1;
            return this;
          };

          // equals
          /**
           * 相等
           * @param {Vector} other - 另一个向量
           * @returns {boolean}
           */
          Vector.prototype["equals"] = Vector.prototype.equals = function (other) {
            return this.x === other.x && this.y === other.y;
          };

          /**
           * 让一个点围绕另一个点沿椭圆轨道旋转
           * @param {Vector} pt - 要围绕的中心点
           * @param {Number} arcWidth - 椭圆轨道的宽度（水平方向的半径）
           * @param {Number} arcHeight - 椭圆轨道的高度（垂直方向的半径）
           * @param {Number} degrees - 旋转的角度（0 - 360 度）
           * @returns {Vector} - 返回当前点对象，其坐标已更新为旋转后的新位置
           */
          Vector.prototype["orbit"] = Vector.prototype.orbit = function (pt, arcWidth, arcHeight, degrees) {
            // 将角度转换为弧度，因为 Math.cos 和 Math.sin 需要弧度作为输入
            var radians = degrees * (Math.PI / 180);

            // 根据椭圆参数方程计算新坐标
            // 水平方向（x）：以中心点 pt.x 为基准，加上椭圆宽度乘以角度的余弦值
            this.x = pt.x + arcWidth * Math.cos(radians);

            // 垂直方向（y）：以中心点 pt.y 为基准，加上椭圆高度乘以角度的正弦值
            this.y = pt.y + arcHeight * Math.sin(radians);

            // 返回当前点对象，其坐标已更新为旋转后的新位置
            return this;
          };

          // --------------------------------------------------------------------------------
          // # Calculation methods

          /**
           * 取中心点
           * @returns {Vector}
           */
          Vector.prototype["getCenter"] = Vector.prototype.getCenter = function () {
            return new Vector(this.x / 2, this.y / 2);
          };

          /**
           * 判断是否  在 另一个点 的 某个方向上
           * @param {Vector} point 另一个点
           * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner 方向
           * @returns {boolean}
           */
          Vector.prototype["IsInDirectionOf"] = Vector.prototype.IsInDirectionOf = function (point, whichCorner) {
            var deltaX = this.x - point.x;
            var deltaY = this.y - point.y;
            // y轴向下，x轴向右
            switch (whichCorner) {
              case "top right":
                return deltaX > 0 && deltaY < 0;
              case "top left":
                return deltaX < 0 && deltaY < 0;
              case "bottom right":
                return deltaX > 0 && deltaY > 0;
              case "bottom left":
                return deltaX < 0 && deltaY > 0;
              case "top center":
                return deltaY < 0;
              case "right center":
                return deltaX > 0;
              case "bottom center":
                return deltaY > 0;
              case "left center":
                return deltaX < 0;
              case "center":
                return deltaX === 0 && deltaY === 0;
              default:
                throw new Error("Invalid direction: " + whichCorner);
            }
          };

          /**
           * 计算两个向量之间的角度
           * @param {Vector} other - 另一个向量
           * @returns {number} 角度值，单位为弧度
           */
          Vector.prototype["angleTo"] = Vector.prototype.angleTo = function (other) {
            var dot = this.dot(other);
            var len1 = this.len();
            var len2 = other.len();
            var angle = Math.acos(dot / (len1 * len2));
            return angle;
          };

          /**
           * 计算两个向量之间的距离
           * @param {Vector} other - 另一个向量
           * @returns {number} 距离值，单位为像素
           */
          Vector.prototype["distanceTo"] = Vector.prototype.distanceTo = function (other) {
            var x = this.x - other.x;
            var y = this.y - other.y;
            return Math.sqrt(x * x + y * y);
          };

          //interpolate
          /**
           * 计算两个向量之间的插值
           * @param {Vector} other - 另一个向量
           * @param {number} f - 0-1之间的数值，表示插值比例
           * @returns {Vector} 两个向量的插值
           */
          Vector.prototype["interpolate"] = Vector.prototype.interpolate = function (other, f) {
            f = typeof f === "undefined" ? 1 : f;
            return new Vector((this.x + other.x) * f, (this.y + other.y) * f);
          };

          // --------------------------------------------------------------------------------
          // # Utility methods

          /**
           * 转换为Size对象
           * @returns {Size}
           */
          Vector.prototype["toSize"] = Vector.prototype.toSize = function () {
            return new Size(this.x, this.y);
          };

          /**
           * 转换为Rectangle对象
           * @returns {Rectangle}
           */
          Vector.prototype["toRectangle"] = Vector.prototype.toRectangle = function () {
            return new Rectangle(0, 0, this.x, this.y);
          };

          /**
           * 转换为Scale对象
           * @returns {Scale}
           */
          Vector.prototype["toScale"] = Vector.prototype.toScale = function () {
            return new Scale(this.x, this.y);
          };
          /**
           * 转换为Skew对象
           * @returns {Skew}
           */
          Vector.prototype["toSkew"] = Vector.prototype.toSkew = function () {
            return new Skew(this.x, this.y);
          };

          // ----------------------------------------------------------------------------------------------------
          // # Static methods

          /**
           * Gets the interpolated distance in pixels from a source Vector a target Vector
           * 获取从源点到目标点的插值距离（像素）
           * @param    {Vector}        pt1            The source Vector
           * @param    {Vector}        pt2            The target Vector
           * @param    {Number}    f            A number from 0 to 1
           * @returns    {Vector}                The distance in pixels
           */
          Vector.interpolate = function (pt1, pt2, f) {
            f = typeof f === "undefined" ? 1 : f;
            return new Vector((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);
          };

          /**
           * Returns a new Vector, based on an angle around and length from the Origin (0, 0)
           * @param    {Number}    length        The length from the Origin
           * @param    {Number}    angle        The angle in degrees to rotate around the origin
           * @returns    {Vector}                    A new Vector object
           */
          Vector.polar = function (length, angle) {
            return new Vector(length * Math.sin(angle), length * Math.cos(angle));
          };

          /**
           * Gets the distance in pixels from a source Vector a target Vector
           * @param    {Vector}        pt1            The source Vector
           * @param    {Vector}        pt2            The target Vector
           * @returns    {Number}                The distance in pixels
           */
          Vector.distance = function (pt1, pt2) {
            var x = pt1.x - pt2.x;
            var y = pt1.y - pt2.y;
            return Math.sqrt(x * x + y * y);
          };
          Vector.from = wrapPosition;

          // ----------------------------------------------------------------------------------------------------
          // # Wrappers for Vector

          /**
           * 转换为Point对象
           * @param {VectorLike|Element|Vector} element 点对象
           * @return {Vector}
           */
          function wrapPosition(element) {
            return new Vector(element.x, element.y);
          }

          /**
           * 取零点
           * @returns {Vector}
           */
          function getOrigin() {
            return new Vector(0, 0);
          }

          /**
           * 取元素的左上角坐标
           * @param {Element} element 元素
           * @returns {Vector}
           */
          function getTopLeft(element) {
            return new Vector(element.left, element.top);
          }
          SAT_GLOBALS["wrapPosition"] = wrapPosition;
          SAT_GLOBALS["getOrigin"] = getOrigin;
          SAT_GLOBALS["getTopLeft"] = getTopLeft;
          function IsVectorLike(obj) {
            return obj && typeof obj.x === "number" && typeof obj.y === "number";
          }
          SAT_CHECk["IsVectorLike"] = IsVectorLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______     ______     ______     ______   ______     __   __     ______
          // /\  == \   /\  ___\   /\  ___\   /\__  _\ /\  __ \   /\ "-.\ \   /\  ___\
          // \ \  __<   \ \  __\   \ \ \____  \/_/\ \/ \ \  __ \  \ \ \-.  \  \ \ \__ \
          //  \ \_\ \_\  \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\\"\_\  \ \_____\
          //   \/_/ /_/   \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/ \/_/   \/_____/
          //
          //  __         ______
          // /\ \       /\  ___\
          // \ \ \____  \ \  __\
          //  \ \_____\  \ \_____\
          //   \/_____/   \/_____/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Rectangle
          //
          // Represents a rectangle with `left`, `top`, `right`, and `bottom` properties.

          /**
           * Rectangle object.
           * Useful for quickly creating objects on the stage
           * @class Rectangle
           * @constructor
           */
          function Rectangle() {
            SObject.apply(this, arguments);

            // variables
            var args = arguments;
            var $dom = fl.getDocumentDOM();

            // switch
            switch (args.length) {
              // 0 arguments, use document size
              case 0:
                this.left = 0;
                this.top = 0;
                this.right = $dom.width;
                this.bottom = $dom.height;
                break;

              // 1 argument - should be a document, element, radius, or an Array of Elements (such as a selection)
              case 1:
                // Bounds,RectangleLike
                if (args[0] instanceof Rectangle || IsRectangleLike(args[0])) {
                  this.copy(args[0]);
                }

                // Document
                else if (args[0] instanceof Document) {
                  return new Rectangle();
                }

                // Element (element bounds)
                else if (args[0] instanceof Element || args[0] instanceof SymbolItem) {
                  this.left = args[0].left;
                  this.top = args[0].top;
                  this.right = args[0].left + args[0].width;
                  this.bottom = args[0].top + args[0].height;
                }

                // Number (radius)
                else if (typeof args[0] === "number") {
                  this.left = -args[0];
                  this.top = -args[0];
                  this.right = args[0];
                  this.bottom = args[0];
                }

                // Array - selection or list of elements
                // 找到所有元素的最小矩形
                else if (args[0] instanceof Array && args[0].length) {
                  var rect = findBoundingRectangle(args[0]);
                  this.copy(rect);
                }

                // undefined
                else if (args[0] === undefined) {
                  throw new Error("Rectangle: 请选中一个元件。 ");
                }

                // other
                else {
                  // console.stack('Rectangle: Invalid argument 1');
                  throw new Error("Invalid argument 1");
                }
                break;

              // (width, height),(centerPos, radius)
              case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                  this.left = 0;
                  this.top = 0;
                  this.right = args[0];
                  this.bottom = args[1];
                } else if (args[0] instanceof Vector && typeof args[1] === "number") {
                  var radiusRect = new Rectangle(args[1]);
                  var centerPos = args[0];
                  var addRect = radiusRect.addOffset(centerPos);
                  this.copy(addRect);
                } else {
                  throw new Error("Invalid argument 2");
                }
                break;

              // left, top, right, bottom
              case 4:
                this.left = args[0];
                this.top = args[1];
                this.right = args[2];
                this.bottom = args[3];
                break;
            }
          }
          INHERIT_MACRO(Rectangle, SObject);
          Object.defineProperty(Rectangle.prototype, "width", {
            get: function get() {
              return this.right - this.left;
            }
          });
          Object.defineProperty(Rectangle.prototype, "height", {
            get: function get() {
              return this.bottom - this.top;
            }
          });
          Object.defineProperty(Rectangle.prototype, "center", {
            get: function get() {
              return this.getCenterVector();
            }
          });
          Object.defineProperty(Rectangle.prototype, "size", {
            get: function get() {
              return this.getSize();
            }
          });
          SAT["Rectangle"] = Rectangle;
          SAT["R"] = Rectangle;

          /**
           * 矩形 偏移后的 矩形
           * 移动矩形的边界
           * @param {Number|Vector|Rectangle} offset 偏移量
           * @returns {Rectangle} 矩形
           */
          Rectangle.prototype.addOffset = function (offset) {
            if (typeof offset === "number") {
              offset = new Rectangle(offset, offset, offset, offset);
            } else if (offset instanceof Vector) {
              offset = new Rectangle(offset.x, offset.y, offset.x, offset.y);
            }
            return new Rectangle(this.left + offset.left, this.top + offset.top, this.right + offset.right, this.bottom + offset.bottom);
          };

          /**
           * 矩形 偏移前的 矩形
           * 移动矩形的边界
           * @param {Number|Vector|Rectangle} offset 偏移量
           * @returns {Rectangle} 矩形
           */
          Rectangle.prototype.subOffset = function (offset) {
            if (typeof offset === "number") {
              offset = new Rectangle(offset, offset, offset, offset);
            } else if (offset instanceof Vector) {
              offset = new Rectangle(offset.x, offset.y, offset.x, offset.y);
            }
            return new Rectangle(this.left - offset.left, this.top - offset.top, this.right - offset.right, this.bottom - offset.bottom);
          };

          /**
           * 扩大矩形的边界
           * @param {Number|Vector|Rectangle} size 扩大量
           * @param {DirectionType} [whichDirection="all"] 哪个角点
           * @returns {Rectangle} 矩形
           */
          Rectangle.prototype.expand = function (size, whichDirection) {
            // const offset = new Rectangle(-size, -size, size, size);
            // return this.addOffset(offset);
            if (whichDirection === undefined) whichDirection = "all";
            var offset = new Rectangle(0, 0, 0, 0);
            switch (whichDirection) {
              case "left":
                offset.left = -size;
                break;
              case "top":
                offset.top = -size;
                break;
              case "right":
                offset.right = size;
                break;
              case "bottom":
                offset.bottom = size;
                break;
              case "all":
                offset.left = -size;
                offset.top = -size;
                offset.right = size;
                offset.bottom = size;
                break;
              default:
                throw new Error("whichDirection 参数错误:" + whichDirection);
            }
            return this.addOffset(offset);
          };
          /**
           * 缩小矩形的边界
           * @param {Number|Vector|Rectangle} size 缩小量
           * @param {Direction} [whichDirection="all"] 哪个角点
           * @returns {Rectangle} 矩形
           */
          Rectangle.prototype.shrink = function (size, whichDirection) {
            // const offset = new Rectangle(-size, -size, size, size);
            // return this.subOffset(offset);
            if (whichDirection === undefined) whichDirection = "all";
            var offset = new Rectangle(0, 0, 0, 0);
            switch (whichDirection) {
              case "left":
                offset.left = -size;
                break;
              case "top":
                offset.top = -size;
                break;
              case "right":
                offset.right = size;
                break;
              case "bottom":
                offset.bottom = size;
                break;
              case "all":
                offset.left = -size;
                offset.top = -size;
                offset.right = size;
                offset.bottom = size;
                break;
              default:
                throw new Error("whichDirection 参数错误:" + whichDirection);
            }
            return this.subOffset(offset);
          };

          /**
           * 矩形中心点
           * @returns {Vector} 点
           */
          Rectangle.prototype.getCenterVector = function () {
            return new Vector((this.left + this.right) / 2, (this.top + this.bottom) / 2);
          };

          /**
           * 矩形大小
           * @returns {Size} 大小
           */
          Rectangle.prototype.getSize = function () {
            return new Size(this.width, this.height);
          };

          /**
           * 是否包含,当前矩形 是否 在 目标矩形 内部
           * @param {Rectangle} rect 矩形
           * @returns {boolean} 包含返回true，否则返回false
           */
          Rectangle.prototype.contains = function (rect) {
            return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
          };

          /**
           * 获取矩形的某个角点
           * @param {Corner} whichCorner 角点或中心点
           * @returns {Vector} 点
           */
          Rectangle.prototype.getCorner = function (whichCorner) {
            // 获取矩形的基本属性
            var left = this.left,
              right = this.right,
              top = this.top,
              bottom = this.bottom;

            // 获取中心点坐标
            var _this$getCenterVector = this.getCenterVector(),
              centerX = _this$getCenterVector.x,
              centerY = _this$getCenterVector.y;

            // 辅助函数：创建 Vector 对象
            function createVector(x, y) {
              return new Vector(x, y);
            }
            switch (whichCorner) {
              case "top right":
                return createVector(right, top);
              case "top left":
                return createVector(left, top);
              case "bottom right":
                return createVector(right, bottom);
              case "bottom left":
                return createVector(left, bottom);
              case "top center":
                return createVector(centerX, top);
              case "right center":
                return createVector(right, centerY);
              case "bottom center":
                return createVector(centerX, bottom);
              case "left center":
                return createVector(left, centerY);
              case "center":
                return createVector(centerX, centerY);
              default:
                throw new Error("参数错误：whichCorner " + whichCorner);
            }
          };

          /**
           * 获取矩形的某个部分
           *
           * 该方法根据指定的 `whichPart` 参数，从当前矩形中提取一个子矩形。子矩形的大小和位置由 `whichPart` 和比例参数（`widthRatio` 和 `heightRatio`）决定。
           *
           * @param {Part} whichPart 部分
           * @param {number} [widthRatio=0.5] - 宽度方向的比例（0-1），表示提取部分的宽度占原始矩形宽度的比例。
           * @param {number} [heightRatio=0.5] - 高度方向的比例（0-1），表示提取部分的高度占原始矩形高度的比例。
           * @returns {Rectangle} - 返回一个新矩形对象，表示提取的部分。
           * @throws {Error} - 如果 `whichPart` 参数无效，将抛出错误。
           */
          Rectangle.prototype.getPart = function (whichPart, widthRatio, heightRatio) {
            if (typeof widthRatio === "undefined") widthRatio = 0.5;
            if (typeof heightRatio === "undefined") heightRatio = widthRatio;
            // console.log("whichPart", whichPart, "widthRatio", widthRatio, "heightRatio", heightRatio);

            // 解构矩形的基本属性
            var left = this.left,
              right = this.right,
              top = this.top,
              bottom = this.bottom,
              width = this.width,
              height = this.height;
            // console.log("left", left, "top", top, "right", right, "bottom", bottom, "width", width, "height", height);

            // 获取中心点坐标
            var _this$getCenterVector2 = this.getCenterVector(),
              centerX = _this$getCenterVector2.x,
              centerY = _this$getCenterVector2.y;
            // console.log("centerX", centerX, "centerY", centerY);

            // 提前计算宽度和高度的占比
            var widthPart = width * widthRatio;
            var heightPart = height * heightRatio;
            // console.log("widthPart", widthPart, "heightPart", heightPart);

            // 提前计算宽度和高度的剩余部分
            var widthInversePart = width - widthPart;
            var heightInversePart = height - heightPart;
            // console.log("widthInversePart", widthInversePart, "heightInversePart", heightInversePart);

            // 提前计算宽度和高度的一半占比
            var halfWidthPart = widthPart / 2;
            var halfHeightPart = heightPart / 2;
            // console.log("halfWidthPart", halfWidthPart, "halfHeightPart", halfHeightPart);

            switch (whichPart) {
              case "top right":
                return new Rectangle(right - widthInversePart, top, right, top + heightPart);
              case "top left":
                return new Rectangle(left, top, left + widthPart, top + heightPart);
              case "bottom right":
                return new Rectangle(right - widthInversePart, bottom - heightInversePart, right, bottom);
              case "bottom left":
                return new Rectangle(left, bottom - heightInversePart, left + widthPart, bottom);
              case "top center":
                return new Rectangle(centerX - halfWidthPart, top, centerX + halfWidthPart, top + heightPart);
              case "right center":
                // console.log("right center",widthRatio,heightRatio);
                return new Rectangle(right - widthInversePart, centerY - halfHeightPart, right, centerY + halfHeightPart);
              case "bottom center":
                return new Rectangle(centerX - halfWidthPart, bottom - heightPart, centerX + halfWidthPart, bottom);
              case "left center":
                return new Rectangle(left, centerY - halfHeightPart, left + widthPart, centerY + halfHeightPart);
              case "center":
                return new Rectangle(centerX - halfWidthPart, centerY - halfHeightPart, centerX + halfWidthPart, centerY + halfHeightPart);
              case "top":
                return new Rectangle(left, top, right, top + heightPart);
              case "right":
                return new Rectangle(right - widthInversePart, top, right, bottom);
              case "bottom":
                return new Rectangle(left, bottom - heightPart, right, bottom);
              case "left":
                return new Rectangle(left, top, left + widthPart, bottom);
              default:
                throw new Error("whichPart 参数错误");
            }
          };

          // --------------------------------------------------------------------------------
          // # Utility methods

          /**
           * 合并两个矩形，返回一个能够包含两个矩形的最小矩形。
           * @param {Rectangle} other - 要合并的另一个矩形。
           * @return {Rectangle} 合并后的矩形。
           */
          Rectangle.prototype.union = function (other) {
            // 计算合并后的矩形的左上角和右下角坐标
            var minLeft = Math.min(this.left, other.left);
            var minTop = Math.min(this.top, other.top);
            var maxRight = Math.max(this.right, other.right);
            var maxBottom = Math.max(this.bottom, other.bottom);
            return new Rectangle(minLeft, minTop, maxRight, maxBottom);
          };
          Rectangle.findBoundingRectangle = findBoundingRectangle;

          /**
           * 由左上角坐标和宽高创建矩形
           * @returns {Rectangle} 矩形对象
           */
          function wrapRectByTopLeft() {
            // variables
            var args = arguments;
            switch (args.length) {
              // topLeft,size
              case 2:
                var topLeft = args[0];
                var size = args[1];
                return wrapRectByTopLeft(topLeft.x, topLeft.y, size.width, size.height);
                // eslint-disable-next-line no-unreachable
                // removed by dead control flow
                {}
              case 4:
                var left = args[0];
                var top = args[1];
                var width = args[2];
                var height = args[3];
                return new Rectangle(left, top, left + width, top + height);
                // eslint-disable-next-line no-unreachable
                // removed by dead control flow
                {}
              default:
                throw new Error("Invalid arguments");
            }
          }

          /**
           * 由中心点坐标和宽高创建矩形
           * @returns {Rectangle} 矩形对象
           */
          function wrapRectByCenter() {
            var args = arguments;
            switch (args.length) {
              // center,size
              case 2:
                var center = args[0];
                var size = args[1];
                return wrapRectByCenter(center.x, center.y, size.width, size.height);
                // eslint-disable-next-line no-unreachable
                // removed by dead control flow
                {}
              // centerX,centerY,width,height
              case 4:
                var centerX = args[0];
                var centerY = args[1];
                var width = args[2];
                var height = args[3];
                return new Rectangle(centerX - width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2);
                // eslint-disable-next-line no-unreachable
                // removed by dead control flow
                {}
              default:
                throw new Error("Invalid arguments");
            }
          }

          /**
           * Finds the smallest rectangle that contains all the given points.
           *
           * @param {Array<Element>} elements - An array of Elements.
           * @return {Rectangle} The smallest rectangle that contains all the points.
           */
          function findBoundingRectangle(elements) {
            if (!elements.length) {
              return null; // 如果数组为空，返回null
            }
            var top = elements[0].top;
            var left = elements[0].left;
            var right = elements[0].left + elements[0].width;
            var bottom = elements[0].top + elements[0].height;
            for (var i = 1; i < elements.length; i++) {
              var element = elements[i];
              var elementTop = element.top;
              var elementLeft = element.left;
              var elementRight = element.left + element.width;
              var elementBottom = element.top + element.height;
              if (elementTop < top) top = elementTop;
              if (elementLeft < left) left = elementLeft;
              if (elementRight > right) right = elementRight;
              if (elementBottom > bottom) bottom = elementBottom;
            }
            return new Rectangle(left, top, right, bottom);
          }

          /**
           * 获取元素的中心点坐标
           * @param {Element} element 元素
           * @return {Vector} 点
           */
          function getSymbolCenter(element) {
            var topLeft = getTopLeft(element);
            var size = wrapSize(element);
            var rect = wrapRectByTopLeft(topLeft, size);
            return rect.getCenterVector();
          }

          /**
           * 获取元素的 矩形
           * @param element
           * @returns {Rectangle}
           */
          function getSymbolRect(element) {
            var size = wrapSize(element);
            var center = getSymbolCenter(element);
            var finalRect = wrapRectByCenter(center, size);
            return finalRect;
          }
          ;
          var getSymbolBounds = getSymbolRect;

          /**
           * 获取舞台中心点坐标
           * @return {Vector} 点
           */
          function getStageCenter() {
            var doc = fl.getDocumentDOM();
            var rect = new Rectangle(doc);
            var stageCenter = rect.getCenterVector();
            return stageCenter;
          }

          /**
           * 获取舞台矩形
           * @return {Rectangle} 矩形对象
           */
          function getStageRect() {
            var doc = fl.getDocumentDOM();
            var rect = new Rectangle(doc);
            return rect;
          }
          var getStageBounds = getStageRect;

          /**
           * 获取舞台尺寸
           * @return {Size} 尺寸对象
           */
          function getStageSize() {
            var doc = fl.getDocumentDOM();
            return wrapSize(doc);
          }

          /**
           * 获取摄像机矩形
           * @param {Timeline} timeline 时间轴
           * @param {number} frameIndex 帧索引
           * @return {Rectangle} 矩形对象
           */
          function getCameraRect(timeline, frameIndex) {
            var _getStageSize = getStageSize(),
              stageWidth = _getStageSize.width,
              stageHeight = _getStageSize.height;
            var cameraPos = wrapPosition(timeline.camera.getPosition(frameIndex));
            var cameraZoomRatio = timeline.camera.getZoom(frameIndex) / 100;
            // var stageWidth = doc.width;
            // var stageHeight = doc.height;
            var cameraRect = new Rectangle(-cameraPos.x, -cameraPos.y, -cameraPos.x + stageWidth / cameraZoomRatio, -cameraPos.y + stageHeight / cameraZoomRatio);
            return cameraRect;
          }
          var getCameraBounds = getCameraRect;

          /**
           * 获取摄像机中心点坐标
           * @param {Timeline} timeline 时间轴
           * @param {number} frameIndex 帧索引
           * @return {Vector} 点
           */
          function getCameraCenter(timeline, frameIndex) {
            return getCameraRect(timeline, frameIndex).getCenterVector();
          }
          SAT_GLOBALS["wrapRectByTopLeft"] = wrapRectByTopLeft;
          SAT_GLOBALS["wrapRectByCenter"] = wrapRectByCenter;
          SAT_GLOBALS["findBoundingRectangle"] = findBoundingRectangle;
          SAT_GLOBALS["getSymbolCenter"] = getSymbolCenter;
          SAT_GLOBALS["getStageCenter"] = getStageCenter;
          SAT_GLOBALS["getSymbolRect"] = getSymbolRect;
          SAT_GLOBALS["getSymbolBounds"] = getSymbolBounds;
          SAT_GLOBALS["getStageBounds"] = getStageBounds;
          SAT_GLOBALS["getStageRect"] = getStageRect;
          SAT_GLOBALS["getStageSize"] = getStageSize;
          SAT_GLOBALS["getCameraRect"] = getCameraRect;
          SAT_GLOBALS["getCameraBounds"] = getCameraBounds;
          SAT_GLOBALS["getCameraCenter"] = getCameraCenter;

          /**
           * 当前对象是否与 RectangleLike 对象相等
           * @param {Rectangle|RectangleLike} obj 矩形对象
           * @returns {boolean} 相等返回true，否则返回false
           * @private
           */
          function IsRectangleLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.left === "number" && typeof obj.top === "number" && typeof obj.right === "number" && typeof obj.bottom === "number";
          }
          SAT_CHECk["IsRectangleLike"] = IsRectangleLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______     __     ______     ______
          // /\  ___\   /\ \   /\___  \   /\  ___\
          // \ \___  \  \ \ \  \/_/  /__  \ \  __\
          //  \/\_____\  \ \_\   /\_____\  \ \_____\
          //   \/_____/   \/_/   \/_____/   \/_____/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Size
          //
          // Represents a size with `width` and `height` properties.

          /**
           * 尺寸
           * @param {number} width 宽度
           * @param {number} height 高度
           * @constructor
           * @class {Size} Size
           */
          function Size(width, height) {
            SObject.apply(this, arguments);
            this.width = width;
            this.height = height;
          }
          SAT["Size"] = Size;
          SAT["S"] = Size;
          INHERIT_MACRO(Size, SObject);
          Object.defineProperty(Size.prototype, "ratio", {
            get: function get() {
              return this.width / this.height;
            }
          });
          Object.defineProperty(Size.prototype, "max_size", {
            get: function get() {
              return Math.max(this.width, this.height);
            }
          });
          Object.defineProperty(Size.prototype, "min_size", {
            get: function get() {
              return Math.min(this.width, this.height);
            }
          });

          /**
           * 相加两个尺寸
           * @param {Size} size 尺寸
           * @returns {Size} 尺寸
           */
          Size.prototype.add = function (size) {
            return new Size(this.width + size.width, this.height + size.height);
          };
          /**
           * 相减两个尺寸
           * @param {Size} size 尺寸
           * @returns {Size} 尺寸
           */
          Size.prototype.sub = function (size) {
            return new Size(this.width - size.width, this.height - size.height);
          };
          Size.prototype.getRatioWidth = function (nowHeight) {
            return this.ratio * nowHeight;
          };
          Size.prototype.getRatioHeight = function (nowWidth) {
            return nowWidth / this.ratio;
          };
          Size.prototype.toVector = function () {
            return new Vector(this.width, this.height);
          };
          Size.from = wrapSize;
          function wrapSize(element) {
            return new Size(element.width, element.height);
          }
          SAT_GLOBALS["wrapSize"] = wrapSize;
          function IsSizeLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.width === "number" && typeof obj.height === "number";
          }
          SAT_CHECk["IsSizeLike"] = IsSizeLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______     ______     ______     __         ______
          // /\  ___\   /\  ___\   /\  __ \   /\ \       /\  ___\
          // \ \___  \  \ \ \____  \ \  __ \  \ \ \____  \ \  __\
          //  \/\_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \_____\
          //   \/_____/   \/_____/   \/_/\/_/   \/_____/   \/_____/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Scale
          function Scale(scaleX, scaleY) {
            SObject.apply(this, arguments);
            this.scaleX = scaleX;
            this.scaleY = scaleY;
          }
          SAT["Scale"] = Scale;
          SAT["SC"] = Scale;
          INHERIT_MACRO(Scale, SObject);
          Scale.prototype.toVector = function () {
            return new Vector(this.scaleX, this.scaleY);
          };
          Scale.from = wrapScale;
          function IsScaleLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.scaleX === "number" && typeof obj.scaleY === "number";
          }
          SAT_CHECk["IsScaleLike"] = IsScaleLike;

          /**
           * 转换为Scale对象
           * @param {ScaleLike|Element|Scale} element 缩放对象
           * @return {Scale}
           */
          function wrapScale(element) {
            return new Scale(element.scaleX, element.scaleY);
          }

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______     __  __     ______     __     __
          // /\  ___\   /\ \/ /    /\  ___\   /\ \  _ \ \
          // \ \___  \  \ \  _"-.  \ \  __\   \ \ \/ ".\ \
          //  \/\_____\  \ \_\ \_\  \ \_____\  \ \__/".~\_\
          //   \/_____/   \/_/\/_/   \/_____/   \/_/   \/_/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Skew
          function Skew(skewX, skewY) {
            this.skewX = skewX;
            this.skewY = skewY;
          }
          SAT["Skew"] = Skew;
          SAT["SK"] = Skew;
          INHERIT_MACRO(Scale, SObject);
          Skew.prototype.toVector = function () {
            return new Vector(this.skewX, this.skewY);
          };
          function IsSkewLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.skewX === "number" && typeof obj.skewY === "number";
          }
          SAT_CHECk["IsSkewLike"] = IsSkewLike;

          /**
           * 转换为Skew对象
           * @param {Element|Skew|SkewLike} element 斜切对象
           * @return {Skew}
           */
          function wrapSkew(element) {
            return new Skew(element.skewX, element.skewY);
          }

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______   ______     ______     __   __     ______     ______   ______
          // /\__  _\ /\  == \   /\  __ \   /\ "-.\ \   /\  ___\   /\  ___\ /\  __ \
          // \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \  \ \___  \  \ \  __\ \ \ \/\ \
          //    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\  \/\_____\  \ \_\    \ \_____\
          //     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/   \/_____/   \/_/     \/_____/
          //
          //  ______     __    __
          // /\  == \   /\ "-./  \
          // \ \  __<   \ \ \-./\ \
          //  \ \_\ \_\  \ \_\ \ \_\
          //   \/_/ /_/   \/_/  \/_/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Transform
          //
          // Represents a transform with `rotation`, `scale`, `position`, `size`, and `skew` properties.

          /**
           * 转换对象
           * @param element 要转换的对象
           * @constructor
           * @class Transform
           */
          function Transform(element) {
            SObject.apply(this, arguments);
            this.element = element;
            // 旋转
            this.rotation = element.rotation;
            // 缩放
            this.scale = new Vector(element.scaleX, element.scaleY);
            // 位置
            this.position = new Vector(element.x, element.y);
            // 宽高
            this.size = new Size(element.width, element.height);
            // 倾斜
            this.skew = new Vector(element.skewX, element.skewY);
          }
          SAT["Transform"] = Transform;
          SAT["TR"] = Transform;
          INHERIT_MACRO(Scale, SObject);
          Transform.prototype.setRotation = function (rotation) {
            this.element.rotation = rotation;
            this.rotation = rotation;
            return this;
          };

          // moveSelectionBy
          Transform.prototype.moveSelectionBy = function (distanceToMove) {
            this.element.x += distanceToMove.x;
            this.element.y += distanceToMove.y;
            this.position = this.position.clone().add(distanceToMove);
            return this;
          };
          /**
           * 设置缩放
           * @param {Vector|Scale} scale 缩放比例
           * @return {Transform} Transform
           */
          Transform.prototype.setScale = function (scale) {
            // 兼容性处理
            if (IsVectorLike(scale)) scale = scale.toScale();
            this.element.scaleX = scale.scaleX;
            this.element.scaleY = scale.scaleY;
            this.scale = scale;
            return this;
          };
          Transform.prototype.setPosition = function (position) {
            this.element.x = position.x;
            this.element.y = position.y;
            this.position = position;
            return this;
          };
          Transform.prototype.setSize = function (size) {
            this.element.width = size.width;
            this.element.height = size.height;
            this.size = size;
            return this;
          };
          /**
           * 设置倾斜
           * @param {Vector|Skew} skew 倾斜角度
           * @return {Transform} Transform
           */
          Transform.prototype.setSkew = function (skew) {
            // 兼容性处理
            if (IsVectorLike(skew)) skew = skew.toSkew();
            this.element.skewX = skew.skewX;
            this.element.skewY = skew.skewY;
            this.skew = skew;
            return this;
          };
          Transform.from = wrapTransform;

          /**
           * 包装一个对象为Transform对象
           * @param {Element} element 要包装的对象
           * @return {Transform} Transform
           */
          function wrapTransform(element) {
            return new Transform(element);
          }
          SAT_GLOBALS["wrapTransform"] = wrapTransform;
          function IsTransformLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.rotation === "number" && IsVectorLike(obj.scale) && IsVectorLike(obj.position) && IsSizeLike(obj.size) && IsVectorLike(obj.skew);
          }
          SAT_CHECk["IsTransformLike"] = IsTransformLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______   ______     ______     __    __     ______     ______     ______
          // /\  ___\ /\  == \   /\  __ \   /\ "-./  \   /\  ___\   /\  == \   /\  __ \
          // \ \  __\ \ \  __<   \ \  __ \  \ \ \-./\ \  \ \  __\   \ \  __<   \ \  __ \
          //  \ \_\    \ \_\ \_\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\  \ \_\ \_\  \ \_\ \_\
          //   \/_/     \/_/ /_/   \/_/\/_/   \/_/  \/_/   \/_____/   \/_/ /_/   \/_/\/_/
          //
          //  __   __     ______     ______
          // /\ "-.\ \   /\  ___\   /\  ___\
          // \ \ \-.  \  \ \ \__ \  \ \  __\
          //  \ \_\\"\_\  \ \_____\  \ \_____\
          //   \/_/ \/_/   \/_____/   \/_____/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // FrameRange
          /**
           * 帧范围类
           * 左闭右开区间 [startFrame, endFrame)
           * @param {number} layerIndex 图层索引
           * @param {number} startFrame 开始帧
           * @param {number} [endFrame=startFrame+1] 结束帧
           */
          function FrameRange(layerIndex, startFrame, endFrame) {
            SObject.apply(this, arguments);
            this.layerIndex = layerIndex;
            this.startFrame = startFrame;
            this.endFrame = endFrame || startFrame + 1;
          }
          SAT["FrameRange"] = FrameRange;
          SAT["FR"] = FrameRange;
          INHERIT_MACRO(FrameRange, SObject);

          /**
           * 帧范围的持续时间
           * @property {number} duration
           * @type {number}
           */
          Object.defineProperty(FrameRange.prototype, "duration", {
            get: function get() {
              return this.endFrame - this.startFrame;
            }
          });

          /**
           * 判断两个帧范围是否有重叠
           * @param {FrameRange} other 另一个帧范围
           * @return {boolean} 是否有重叠
           */
          FrameRange.prototype.intersects = function (other) {
            return this.startFrame <= other.endFrame && other.startFrame <= this.endFrame;
          };

          /**
           * 判断 当前 FrameRange 是否包含   fr2 选中范围
           * @param {FrameRange} fr2 选中范围数组
           * @return {boolean} 是否包含
           */
          FrameRange.prototype.contain = function (fr2) {
            // print("this=" + this.toString() + ", fr2=" + fr2.toString())
            if (this.layerIndex !== fr2.layerIndex) {
              return false;
            }
            return this.startFrame <= fr2.startFrame && this.endFrame >= fr2.endFrame;
          };

          /**
           * 转换为数组
           * @return {[number, number, number]} 数组
           */
          FrameRange.prototype.toArray = function () {
            return [this.layerIndex, this.startFrame, this.endFrame];
          };

          /**
           * 获取当前帧范围的第一帧
           * @return {FrameRange} 第一帧范围
           */
          FrameRange.prototype.getFirstFrame = function () {
            var fr = this.clone();
            fr.endFrame = fr.startFrame + 1;
            return fr;
          };
          function IsFrameRangeLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.layerIndex === "number" && typeof obj.startFrame === "number" && typeof obj.endFrame === "number";
          }
          SAT_CHECk["IsFrameRangeLike"] = IsFrameRangeLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______   ______     ______     __    __     ______     ______     ______
          // /\  ___\ /\  == \   /\  __ \   /\ "-./  \   /\  ___\   /\  == \   /\  __ \
          // \ \  __\ \ \  __<   \ \  __ \  \ \ \-./\ \  \ \  __\   \ \  __<   \ \  __ \
          //  \ \_\    \ \_\ \_\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\  \ \_\ \_\  \ \_\ \_\
          //   \/_/     \/_/ /_/   \/_/\/_/   \/_/  \/_/   \/_____/   \/_/ /_/   \/_/\/_/
          //
          //  __   __     ______     ______     __         __     ______     ______
          // /\ "-.\ \   /\  ___\   /\  ___\   /\ \       /\ \   /\  ___\   /\__  _\
          // \ \ \-.  \  \ \ \__ \  \ \  __\   \ \ \____  \ \ \  \ \___  \  \/_/\ \/
          //  \ \_\\"\_\  \ \_____\  \ \_____\  \ \_____\  \ \_\  \/\_____\    \ \_\
          //   \/_/ \/_/   \/_____/   \/_____/   \/_____/   \/_/   \/_____/     \/_/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // FrameRangeList

          /**
           * 帧列表类，继承自 Array
           * @constructor
           */
          function FrameRangeList() {
            Array.apply(this, arguments); // 调用 Array 的构造函数
            SObject.apply(this, arguments);
          }
          SAT["FrameRangeList"] = FrameRangeList;
          SAT["FRL"] = FrameRangeList;
          INHERIT_MACRO(FrameRangeList, Array);
          // INHERIT_MACRO(FrameRangeList, SObject);
          Object.assign(FrameRangeList.prototype, SObject.prototype);
          Object.assign(FrameRangeList, SObject);
          Object.defineProperty(FrameRangeList.prototype, "firstSlFrameIndex", {
            get: function get() {
              if (this.length === 0) {
                return null;
              }
              return this[0].startFrame;
            }
          });
          Object.defineProperty(FrameRangeList.prototype, "firstSlLayerIndex", {
            get: function get() {
              if (this.length === 0) {
                return null;
              }
              return this[0].layerIndex;
            }
          });
          Object.defineProperty(FrameRangeList.prototype, "firstSlLayer", {
            get: function get() {
              if (this.length === 0) {
                return null;
              }
              var doc = fl.getDocumentDOM(); //文档对象
              var timeline = doc.getTimeline(); //时间轴
              var layers = timeline.layers; //图层

              var layerIndex = this.firstSlLayerIndex;
              return layers[layerIndex];
            }
          });
          Object.defineProperty(FrameRangeList.prototype, "firstSlFrame", {
            get: function get() {
              if (this.length === 0) {
                return null;
              }
              var doc = fl.getDocumentDOM(); //文档对象
              var timeline = doc.getTimeline(); //时间轴

              var layers = timeline.layers; //图层
              var curLayerIndex = timeline.currentLayer; //当前图层索引
              var curLayer = layers[curLayerIndex]; //当前图层

              var frames = curLayer.frames; //当前图层的帧列表
              var curFrameIndex = timeline.currentFrame; //当前帧索引
              var curFrame = frames[curFrameIndex]; //当前帧

              var frameIndex = this.firstSlFrameIndex;
              // console.log("firstSlFrameIndex=" + frameIndex);

              return frames[frameIndex];
            }
          });

          /**
           * 从列表中过滤出不重复的 layerIndex
           * @returns {Array<number>} 不重复的 layerIndex 列表
           */
          FrameRangeList.prototype.getUniqueLayerIndexes = function () {
            var uniqueLayerIndexes = [];
            for (var i = 0; i < this.length; i++) {
              var currentLayerIndex = this[i].layerIndex;
              if (!uniqueLayerIndexes.includes(currentLayerIndex)) {
                uniqueLayerIndexes.push(currentLayerIndex);
              }
            }
            return uniqueLayerIndexes;
          };
          function IsElementBoundsLike(obj) {
            return obj && _typeof(obj) === "object" && typeof obj.left === "number" && typeof obj.top === "number" && typeof obj.width === "number" && typeof obj.height === "number";
          }
          SAT_CHECk["IsElementBoundsLike"] = IsElementBoundsLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  __         __     __   __     ______     ______     ______     ______
          // /\ \       /\ \   /\ "-.\ \   /\  ___\   /\  ___\   /\  ___\   /\  ___\
          // \ \ \____  \ \ \  \ \ \-.  \  \ \  __\   \ \___  \  \ \  __\   \ \ \__ \
          //  \ \_____\  \ \_\  \ \_\\"\_\  \ \_____\  \/\_____\  \ \_____\  \ \_____\
          //   \/_____/   \/_/   \/_/ \/_/   \/_____/   \/_____/   \/_____/   \/_____/
          //
          //  __    __     ______     __   __     ______
          // /\ "-./  \   /\  ___\   /\ "-.\ \   /\__  _\
          // \ \ \-./\ \  \ \  __\   \ \ \-.  \  \/_/\ \/
          //  \ \_\ \ \_\  \ \_____\  \ \_\\"\_\    \ \_\
          //   \/_/  \/_/   \/_____/   \/_/ \/_/     \/_/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // LineSegment
          /**
           * 线段类
           * @param {Vector} startPoint 起点
           * @param {Vector} endPoint 终点
           * @constructor
           */
          function LineSegment(startPoint, endPoint) {
            SObject.apply(this, arguments);
            this.startPoint = startPoint;
            this.endPoint = endPoint;
          }
          SAT["LineSegment"] = LineSegment;
          SAT["LS"] = LineSegment;
          INHERIT_MACRO(LineSegment, SObject);
          LineSegment.prototype.toVector = function () {
            var dx = this.endPoint.x - this.startPoint.x;
            var dy = this.endPoint.y - this.startPoint.y;
            return new Vector(dx, dy);
          };
          LineSegment.prototype.getBounds = function () {
            var left = Math.min(this.startPoint.x, this.endPoint.x);
            var top = Math.min(this.startPoint.y, this.endPoint.y);
            var right = Math.max(this.startPoint.x, this.endPoint.x);
            var bottom = Math.max(this.startPoint.y, this.endPoint.y);
            return {
              left: left,
              top: top,
              width: right - left,
              height: bottom - top
            };
          };
          LineSegment.prototype.getCenter = function () {
            var x = (this.startPoint.x + this.endPoint.x) / 2;
            var y = (this.startPoint.y + this.endPoint.y) / 2;
            return new Vector(x, y);
          };
          LineSegment.prototype.getLength = function () {
            var dx = this.endPoint.x - this.startPoint.x;
            var dy = this.endPoint.y - this.startPoint.y;
            return Math.sqrt(dx * dx + dy * dy);
          };
          LineSegment.prototype.getAngle = function () {
            var dx = this.endPoint.x - this.startPoint.x;
            var dy = this.endPoint.y - this.startPoint.y;
            return Math.atan2(dy, dx);
          };
          LineSegment.prototype.getNormal = function () {
            var dx = this.endPoint.x - this.startPoint.x;
            var dy = this.endPoint.y - this.startPoint.y;
            var length = Math.sqrt(dx * dx + dy * dy);
            var normal = new Vector(-dy / length, dx / length);
            return normal;
          };
          LineSegment.prototype.getPointAt = function (t) {
            var x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * t;
            var y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * t;
            return new Vector(x, y);
          };
          LineSegment.prototype.getNearestPointTo = function (point) {
            var dx = this.endPoint.x - this.startPoint.x;
            var dy = this.endPoint.y - this.startPoint.y;
            var a = dx * dx + dy * dy;
            var b = 2 * (dx * (this.startPoint.x - point.x) + dy * (this.startPoint.y - point.y));
            var c = (this.startPoint.x - point.x) * (this.startPoint.x - point.x) + (this.startPoint.y - point.y) * (this.startPoint.y - point.y) - 1;
            var t = Math.max(0, Math.min(1, (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)));
            var x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * t;
            var y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * t;
            return new Vector(x, y);
          };
          LineSegment.prototype.getDistanceToPoint = function (point) {
            var nearestPoint = this.getNearestPointTo(point);
            var dx = nearestPoint.x - point.x;
            var dy = nearestPoint.y - point.y;
            return Math.sqrt(dx * dx + dy * dy);
          };

          // static from(startPoint: Vector, direction: DirectionType,distance: number): LineSegment;
          /**
           * 从起点出发，方向为 direction，距离为 distance 的线段
           * @param {Vector} startPoint 起点
           * @param {DirectionType} direction 方向
           * @param {number} distance 距离
           * @return {LineSegment} 线段
           */
          LineSegment.from = function (startPoint, direction, distance) {
            var endPoint = getOrigin();
            switch (direction) {
              case "left":
                endPoint = startPoint.clone().add(new Vector(-distance, 0));
                break;
              case "top":
                endPoint = startPoint.clone().add(new Vector(0, -distance));
                break;
              case "right":
                endPoint = startPoint.clone().add(new Vector(distance, 0));
                break;
              case "bottom":
                endPoint = startPoint.clone().add(new Vector(0, distance));
                break;
              default:
                throw new Error("Invalid direction: " + direction);
            }
            return new LineSegment(startPoint, endPoint);
          };
          function IsLineSegmentLike(obj) {
            return obj && _typeof(obj) === "object" && IsVectorLike(obj.startPoint) && IsVectorLike(obj.endPoint);
          }
          SAT_CHECk["IsLineSegmentLike"] = IsLineSegmentLike;

          // ------------------------------------------------------------------------------------------------------------------------
          //  ______     __     ______     ______     __         ______
          // /\  ___\   /\ \   /\  == \   /\  ___\   /\ \       /\  ___\
          // \ \ \____  \ \ \  \ \  __<   \ \ \____  \ \ \____  \ \  __\
          //  \ \_____\  \ \_\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_____\
          //   \/_____/   \/_/   \/_/ /_/   \/_____/   \/_____/   \/_____/
          //
          // ------------------------------------------------------------------------------------------------------------------------
          // Circle
          /**
           * 圆类
           * @param {Vector} pos 圆心
           * @param {number} r 半径
           * @constructor
           */
          function Circle(pos, r) {
            SObject.apply(this, arguments);
            this.pos = pos;
            this.r = r;
          }
          SAT["Circle"] = Circle;
          SAT["C"] = Circle;
          INHERIT_MACRO(Circle, SObject);
          Circle.prototype.toVector = function () {
            return this.pos.clone();
          };

          // d
          Object.defineProperty(Circle.prototype, "d", {
            get: function get() {
              return 2 * this.r;
            }
          });
          Circle.prototype.getBounds = function () {
            var left = this.pos.x - this.r;
            var top = this.pos.y - this.r;
            var right = this.pos.x + this.r;
            var bottom = this.pos.y + this.r;
            return new Rectangle(left, top, right, bottom);
          };
          Circle.prototype.getArea = function () {
            return Math.PI * this.r * this.r;
          };
          Circle.prototype.getCentroid = function () {
            return this.pos.clone();
          };
          Circle.prototype.getDistanceToPoint = function (point) {
            var dx = this.pos.x - point.x;
            var dy = this.pos.y - point.y;
            return Math.sqrt(dx * dx + dy * dy) - this.r;
          };
          Circle.prototype.getDistanceToSegment = function (segment) {
            var nearestPoint = segment.getNearestPointTo(this.pos);
            return this.getDistanceToPoint(nearestPoint);
          };
          Circle.prototype.containsPoint = function (point) {
            return this.getDistanceToPoint(point) <= 0;
          };
          function IsCircleLike(obj) {
            return obj && _typeof(obj) === "object" && IsVectorLike(obj.pos) && typeof obj.r === "number";
          }
          SAT_CHECk["IsCircleLike"] = IsCircleLike;
          var SAT_ENTITY = {
            ELEMENT: {
              getOrigin: getOrigin,
              getTopLeft: getTopLeft
            },
            SYMBOL: {
              getCenter: getSymbolCenter,
              getBounds: getSymbolBounds
            },
            STAGE: {
              getCenter: getStageCenter,
              getBounds: getStageBounds,
              getSize: getStageSize
            },
            CAMERA: {
              getBounds: getCameraBounds,
              getCenter: getCameraCenter
            }
          };
          SAT["GLOBALS"] = SAT_GLOBALS;
          SAT["CHECk"] = SAT_CHECk;
          SAT["ENTITY"] = SAT_ENTITY;
          return SAT;
        });
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

      /***/
    }),
    /***/"./Third/nodejs/assert/assert.jsfl": (
    /*!*****************************************!*\
      !*** ./Third/nodejs/assert/assert.jsfl ***!
      \*****************************************/
    /***/
    function _Third_nodejs_assert_assertJsfl(module, exports, __webpack_require__) {
      /* provided dependency */var Promise = __webpack_require__(/*! es6-promise */"./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl")["Promise"];
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
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
        //  browserify entry.js --standalone assert -o assert.js
        //  module.exports = require('assert');
        (function (f) {
          if ((false ? 0 : _typeof(exports)) === "object" && "object" !== "undefined") {
            module.exports = f();
          } else if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = f, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else
            // removed by dead control flow
            {
              var g;
            }
        })(function () {
          var define, module, exports;
          return function () {
            function r(e, n, t) {
              function o(i, f) {
                if (!n[i]) {
                  if (!e[i]) {
                    var c = undefined;
                    if (!f && c) return require(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a;
                  }
                  var p = n[i] = {
                    exports: {}
                  };
                  e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r);
                  }, p, p.exports, r, e, n, t);
                }
                return n[i].exports;
              }
              for (var u = undefined, i = 0; i < t.length; i++) o(t[i]);
              return o;
            }
            return r;
          }()({
            1: [function (require, module, exports) {
              (function (global) {
                (function () {
                  'use strict';

                  var objectAssign = require('object.assign/polyfill')();

                  // compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
                  // original notice:

                  /*!
                   * The buffer module from node.js, for the browser.
                   *
                   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
                   * @license  MIT
                   */
                  function compare(a, b) {
                    if (a === b) {
                      return 0;
                    }
                    var x = a.length;
                    var y = b.length;
                    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                      if (a[i] !== b[i]) {
                        x = a[i];
                        y = b[i];
                        break;
                      }
                    }
                    if (x < y) {
                      return -1;
                    }
                    if (y < x) {
                      return 1;
                    }
                    return 0;
                  }
                  function isBuffer(b) {
                    if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
                      return global.Buffer.isBuffer(b);
                    }
                    return !!(b != null && b._isBuffer);
                  }

                  // based on node assert, original notice:
                  // NB: The URL to the CommonJS spec is kept just for tradition.
                  //     node-assert has evolved a lot since then, both in API and behavior.

                  // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
                  //
                  // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
                  //
                  // Originally from narwhal.js (http://narwhaljs.org)
                  // Copyright (c) 2009 Thomas Robinson <280north.com>
                  //
                  // Permission is hereby granted, free of charge, to any person obtaining a copy
                  // of this software and associated documentation files (the 'Software'), to
                  // deal in the Software without restriction, including without limitation the
                  // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
                  // sell copies of the Software, and to permit persons to whom the Software is
                  // furnished to do so, subject to the following conditions:
                  //
                  // The above copyright notice and this permission notice shall be included in
                  // all copies or substantial portions of the Software.
                  //
                  // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                  // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
                  // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
                  // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

                  var util = require('util/');
                  var hasOwn = Object.prototype.hasOwnProperty;
                  var pSlice = Array.prototype.slice;
                  var functionsHaveNames = function () {
                    return function foo() {}.name === 'foo';
                  }();
                  function pToString(obj) {
                    return Object.prototype.toString.call(obj);
                  }
                  function isView(arrbuf) {
                    if (isBuffer(arrbuf)) {
                      return false;
                    }
                    if (typeof global.ArrayBuffer !== 'function') {
                      return false;
                    }
                    if (typeof ArrayBuffer.isView === 'function') {
                      return ArrayBuffer.isView(arrbuf);
                    }
                    if (!arrbuf) {
                      return false;
                    }
                    if (arrbuf instanceof DataView) {
                      return true;
                    }
                    if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
                      return true;
                    }
                    return false;
                  }
                  // 1. The assert module provides functions that throw
                  // AssertionError's when particular conditions are not met. The
                  // assert module must conform to the following interface.

                  var assert = module.exports = ok;

                  // 2. The AssertionError is defined in assert.
                  // new assert.AssertionError({ message: message,
                  //                             actual: actual,
                  //                             expected: expected })

                  var regex = /\s*function\s+([^\(\s]*)\s*/;
                  // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
                  function getName(func) {
                    if (!util.isFunction(func)) {
                      return;
                    }
                    if (functionsHaveNames) {
                      return func.name;
                    }
                    var str = func.toString();
                    var match = str.match(regex);
                    return match && match[1];
                  }
                  assert.AssertionError = function AssertionError(options) {
                    this.name = 'AssertionError';
                    this.actual = options.actual;
                    this.expected = options.expected;
                    this.operator = options.operator;
                    if (options.message) {
                      this.message = options.message;
                      this.generatedMessage = false;
                    } else {
                      this.message = getMessage(this);
                      this.generatedMessage = true;
                    }
                    var stackStartFunction = options.stackStartFunction || fail;
                    if (Error.captureStackTrace) {
                      Error.captureStackTrace(this, stackStartFunction);
                    } else {
                      // non v8 browsers so we can have a stacktrace
                      var err = new Error();
                      if (err.stack) {
                        var out = err.stack;

                        // try to strip useless frames
                        var fn_name = getName(stackStartFunction);
                        var idx = out.indexOf('\n' + fn_name);
                        if (idx >= 0) {
                          // once we have located the function frame
                          // we need to strip out everything before it (and its line)
                          var next_line = out.indexOf('\n', idx + 1);
                          out = out.substring(next_line + 1);
                        }
                        this.stack = out;
                      }
                    }
                  };

                  // assert.AssertionError instanceof Error
                  util.inherits(assert.AssertionError, Error);
                  function truncate(s, n) {
                    if (typeof s === 'string') {
                      return s.length < n ? s : s.slice(0, n);
                    } else {
                      return s;
                    }
                  }
                  function inspect(something) {
                    if (functionsHaveNames || !util.isFunction(something)) {
                      return util.inspect(something);
                    }
                    var rawname = getName(something);
                    var name = rawname ? ': ' + rawname : '';
                    return '[Function' + name + ']';
                  }
                  function getMessage(self) {
                    return truncate(inspect(self.actual), 128) + ' ' + self.operator + ' ' + truncate(inspect(self.expected), 128);
                  }

                  // At present only the three keys mentioned above are used and
                  // understood by the spec. Implementations or sub modules can pass
                  // other keys to the AssertionError's constructor - they will be
                  // ignored.

                  // 3. All of the following functions must throw an AssertionError
                  // when a corresponding condition is not met, with a message that
                  // may be undefined if not provided.  All assertion methods provide
                  // both the actual and expected values to the assertion error for
                  // display purposes.

                  function fail(actual, expected, message, operator, stackStartFunction) {
                    throw new assert.AssertionError({
                      message: message,
                      actual: actual,
                      expected: expected,
                      operator: operator,
                      stackStartFunction: stackStartFunction
                    });
                  }

                  // EXTENSION! allows for well behaved errors defined elsewhere.
                  assert.fail = fail;

                  // 4. Pure assertion tests whether a value is truthy, as determined
                  // by !!guard.
                  // assert.ok(guard, message_opt);
                  // This statement is equivalent to assert.equal(true, !!guard,
                  // message_opt);. To test strictly for the value true, use
                  // assert.strictEqual(true, guard, message_opt);.

                  function ok(value, message) {
                    if (!value) fail(value, true, message, '==', assert.ok);
                  }
                  assert.ok = ok;

                  // 5. The equality assertion tests shallow, coercive equality with
                  // ==.
                  // assert.equal(actual, expected, message_opt);

                  assert.equal = function equal(actual, expected, message) {
                    if (actual != expected) fail(actual, expected, message, '==', assert.equal);
                  };

                  // 6. The non-equality assertion tests for whether two objects are not equal
                  // with != assert.notEqual(actual, expected, message_opt);

                  assert.notEqual = function notEqual(actual, expected, message) {
                    if (actual == expected) {
                      fail(actual, expected, message, '!=', assert.notEqual);
                    }
                  };

                  // 7. The equivalence assertion tests a deep equality relation.
                  // assert.deepEqual(actual, expected, message_opt);

                  assert.deepEqual = function deepEqual(actual, expected, message) {
                    if (!_deepEqual(actual, expected, false)) {
                      fail(actual, expected, message, 'deepEqual', assert.deepEqual);
                    }
                  };
                  assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
                    if (!_deepEqual(actual, expected, true)) {
                      fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
                    }
                  };
                  function _deepEqual(actual, expected, strict, memos) {
                    // 7.1. All identical values are equivalent, as determined by ===.
                    if (actual === expected) {
                      return true;
                    } else if (isBuffer(actual) && isBuffer(expected)) {
                      return compare(actual, expected) === 0;

                      // 7.2. If the expected value is a Date object, the actual value is
                      // equivalent if it is also a Date object that refers to the same time.
                    } else if (util.isDate(actual) && util.isDate(expected)) {
                      return actual.getTime() === expected.getTime();

                      // 7.3 If the expected value is a RegExp object, the actual value is
                      // equivalent if it is also a RegExp object with the same source and
                      // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
                    } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
                      return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

                      // 7.4. Other pairs that do not both pass typeof value == 'object',
                      // equivalence is determined by ==.
                    } else if ((actual === null || _typeof(actual) !== 'object') && (expected === null || _typeof(expected) !== 'object')) {
                      return strict ? actual === expected : actual == expected;

                      // If both values are instances of typed arrays, wrap their underlying
                      // ArrayBuffers in a Buffer each to increase performance
                      // This optimization requires the arrays to have the same type as checked by
                      // Object.prototype.toString (aka pToString). Never perform binary
                      // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
                      // bit patterns are not identical.
                    } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
                      return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;

                      // 7.5 For all other Object pairs, including Array objects, equivalence is
                      // determined by having the same number of owned properties (as verified
                      // with Object.prototype.hasOwnProperty.call), the same set of keys
                      // (although not necessarily the same order), equivalent values for every
                      // corresponding key, and an identical 'prototype' property. Note: this
                      // accounts for both named and indexed properties on Arrays.
                    } else if (isBuffer(actual) !== isBuffer(expected)) {
                      return false;
                    } else {
                      memos = memos || {
                        actual: [],
                        expected: []
                      };
                      var actualIndex = memos.actual.indexOf(actual);
                      if (actualIndex !== -1) {
                        if (actualIndex === memos.expected.indexOf(expected)) {
                          return true;
                        }
                      }
                      memos.actual.push(actual);
                      memos.expected.push(expected);
                      return objEquiv(actual, expected, strict, memos);
                    }
                  }
                  function isArguments(object) {
                    return Object.prototype.toString.call(object) == '[object Arguments]';
                  }
                  function objEquiv(a, b, strict, actualVisitedObjects) {
                    if (a === null || a === undefined || b === null || b === undefined) return false;
                    // if one is a primitive, the other must be same
                    if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
                    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
                    var aIsArgs = isArguments(a);
                    var bIsArgs = isArguments(b);
                    if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
                    if (aIsArgs) {
                      a = pSlice.call(a);
                      b = pSlice.call(b);
                      return _deepEqual(a, b, strict);
                    }
                    var ka = objectKeys(a);
                    var kb = objectKeys(b);
                    var key, i;
                    // having the same number of owned properties (keys incorporates
                    // hasOwnProperty)
                    if (ka.length !== kb.length) return false;
                    //the same set of keys (although not necessarily the same order),
                    ka.sort();
                    kb.sort();
                    //~~~cheap key test
                    for (i = ka.length - 1; i >= 0; i--) {
                      if (ka[i] !== kb[i]) return false;
                    }
                    //equivalent values for every corresponding key, and
                    //~~~possibly expensive deep test
                    for (i = ka.length - 1; i >= 0; i--) {
                      key = ka[i];
                      if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
                    }
                    return true;
                  }

                  // 8. The non-equivalence assertion tests for any deep inequality.
                  // assert.notDeepEqual(actual, expected, message_opt);

                  assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
                    if (_deepEqual(actual, expected, false)) {
                      fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
                    }
                  };
                  assert.notDeepStrictEqual = notDeepStrictEqual;
                  function notDeepStrictEqual(actual, expected, message) {
                    if (_deepEqual(actual, expected, true)) {
                      fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
                    }
                  }

                  // 9. The strict equality assertion tests strict equality, as determined by ===.
                  // assert.strictEqual(actual, expected, message_opt);

                  assert.strictEqual = function strictEqual(actual, expected, message) {
                    if (actual !== expected) {
                      fail(actual, expected, message, '===', assert.strictEqual);
                    }
                  };

                  // 10. The strict non-equality assertion tests for strict inequality, as
                  // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

                  assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
                    if (actual === expected) {
                      fail(actual, expected, message, '!==', assert.notStrictEqual);
                    }
                  };
                  function expectedException(actual, expected) {
                    if (!actual || !expected) {
                      return false;
                    }
                    if (Object.prototype.toString.call(expected) == '[object RegExp]') {
                      return expected.test(actual);
                    }
                    try {
                      if (actual instanceof expected) {
                        return true;
                      }
                    } catch (e) {
                      // Ignore.  The instanceof check doesn't work for arrow functions.
                    }
                    if (Error.isPrototypeOf(expected)) {
                      return false;
                    }
                    return expected.call({}, actual) === true;
                  }
                  function _tryBlock(block) {
                    var error;
                    try {
                      block();
                    } catch (e) {
                      error = e;
                    }
                    return error;
                  }
                  function _throws(shouldThrow, block, expected, message) {
                    var actual;
                    if (typeof block !== 'function') {
                      throw new TypeError('"block" argument must be a function');
                    }
                    if (typeof expected === 'string') {
                      message = expected;
                      expected = null;
                    }
                    actual = _tryBlock(block);
                    message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
                    if (shouldThrow && !actual) {
                      fail(actual, expected, 'Missing expected exception' + message);
                    }
                    var userProvidedMessage = typeof message === 'string';
                    var isUnwantedException = !shouldThrow && util.isError(actual);
                    var isUnexpectedException = !shouldThrow && actual && !expected;
                    if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
                      fail(actual, expected, 'Got unwanted exception' + message);
                    }
                    if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
                      throw actual;
                    }
                  }

                  // 11. Expected to throw an error:
                  // assert.throws(block, Error_opt, message_opt);

                  assert["throws"] = function (block, /*optional*/error, /*optional*/message) {
                    _throws(true, block, error, message);
                  };

                  // EXTENSION! This is annoying to write outside this module.
                  assert.doesNotThrow = function (block, /*optional*/error, /*optional*/message) {
                    _throws(false, block, error, message);
                  };
                  assert.ifError = function (err) {
                    if (err) throw err;
                  };

                  // Expose a strict only variant of assert
                  function strict(value, message) {
                    if (!value) fail(value, true, message, '==', strict);
                  }
                  assert.strict = objectAssign(strict, assert, {
                    equal: assert.strictEqual,
                    deepEqual: assert.deepStrictEqual,
                    notEqual: assert.notStrictEqual,
                    notDeepEqual: assert.notDeepStrictEqual
                  });
                  assert.strict.strict = assert.strict;
                  var objectKeys = Object.keys || function (obj) {
                    var keys = [];
                    for (var key in obj) {
                      if (hasOwn.call(obj, key)) keys.push(key);
                    }
                    return keys;
                  };
                }).call(this);
              }).call(this, typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, {
              "object.assign/polyfill": 44,
              "util/": 4
            }],
            2: [function (require, module, exports) {
              if (typeof Object.create === 'function') {
                // implementation from standard node.js 'util' module
                module.exports = function inherits(ctor, superCtor) {
                  ctor.super_ = superCtor;
                  ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                      value: ctor,
                      enumerable: false,
                      writable: true,
                      configurable: true
                    }
                  });
                };
              } else {
                // old school shim for old browsers
                module.exports = function inherits(ctor, superCtor) {
                  ctor.super_ = superCtor;
                  var TempCtor = function TempCtor() {};
                  TempCtor.prototype = superCtor.prototype;
                  ctor.prototype = new TempCtor();
                  ctor.prototype.constructor = ctor;
                };
              }
            }, {}],
            3: [function (require, module, exports) {
              module.exports = function isBuffer(arg) {
                return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
              };
            }, {}],
            4: [function (require, module, exports) {
              (function (process, global) {
                (function () {
                  // Copyright Joyent, Inc. and other Node contributors.
                  //
                  // Permission is hereby granted, free of charge, to any person obtaining a
                  // copy of this software and associated documentation files (the
                  // "Software"), to deal in the Software without restriction, including
                  // without limitation the rights to use, copy, modify, merge, publish,
                  // distribute, sublicense, and/or sell copies of the Software, and to permit
                  // persons to whom the Software is furnished to do so, subject to the
                  // following conditions:
                  //
                  // The above copyright notice and this permission notice shall be included
                  // in all copies or substantial portions of the Software.
                  //
                  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                  // USE OR OTHER DEALINGS IN THE SOFTWARE.

                  var formatRegExp = /%[sdj%]/g;
                  exports.format = function (f) {
                    if (!isString(f)) {
                      var objects = [];
                      for (var i = 0; i < arguments.length; i++) {
                        objects.push(inspect(arguments[i]));
                      }
                      return objects.join(' ');
                    }
                    var i = 1;
                    var args = arguments;
                    var len = args.length;
                    var str = String(f).replace(formatRegExp, function (x) {
                      if (x === '%%') return '%';
                      if (i >= len) return x;
                      switch (x) {
                        case '%s':
                          return String(args[i++]);
                        case '%d':
                          return Number(args[i++]);
                        case '%j':
                          try {
                            return JSON.stringify(args[i++]);
                          } catch (_) {
                            return '[Circular]';
                          }
                        default:
                          return x;
                      }
                    });
                    for (var x = args[i]; i < len; x = args[++i]) {
                      if (isNull(x) || !isObject(x)) {
                        str += ' ' + x;
                      } else {
                        str += ' ' + inspect(x);
                      }
                    }
                    return str;
                  };

                  // Mark that a method should not be used.
                  // Returns a modified function which warns once by default.
                  // If --no-deprecation is set, then it is a no-op.
                  exports.deprecate = function (fn, msg) {
                    // Allow for deprecating things in the process of starting up.
                    if (isUndefined(global.process)) {
                      return function () {
                        return exports.deprecate(fn, msg).apply(this, arguments);
                      };
                    }
                    if (process.noDeprecation === true) {
                      return fn;
                    }
                    var warned = false;
                    function deprecated() {
                      if (!warned) {
                        if (process.throwDeprecation) {
                          throw new Error(msg);
                        } else if (process.traceDeprecation) {
                          console.trace(msg);
                        } else {
                          console.error(msg);
                        }
                        warned = true;
                      }
                      return fn.apply(this, arguments);
                    }
                    return deprecated;
                  };
                  var debugs = {};
                  var debugEnviron;
                  exports.debuglog = function (set) {
                    if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
                    set = set.toUpperCase();
                    if (!debugs[set]) {
                      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                        var pid = process.pid;
                        debugs[set] = function () {
                          var msg = exports.format.apply(exports, arguments);
                          console.error('%s %d: %s', set, pid, msg);
                        };
                      } else {
                        debugs[set] = function () {};
                      }
                    }
                    return debugs[set];
                  };

                  /**
                   * Echos the value of a value. Trys to print the value out
                   * in the best way possible given the different types.
                   *
                   * @param {Object} obj The object to print out.
                   * @param {Object} opts Optional options object that alters the output.
                   */
                  /* legacy: obj, showHidden, depth, colors*/
                  function inspect(obj, opts) {
                    // default options
                    var ctx = {
                      seen: [],
                      stylize: stylizeNoColor
                    };
                    // legacy...
                    if (arguments.length >= 3) ctx.depth = arguments[2];
                    if (arguments.length >= 4) ctx.colors = arguments[3];
                    if (isBoolean(opts)) {
                      // legacy...
                      ctx.showHidden = opts;
                    } else if (opts) {
                      // got an "options" object
                      exports._extend(ctx, opts);
                    }
                    // set default options
                    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
                    if (isUndefined(ctx.depth)) ctx.depth = 2;
                    if (isUndefined(ctx.colors)) ctx.colors = false;
                    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
                    if (ctx.colors) ctx.stylize = stylizeWithColor;
                    return formatValue(ctx, obj, ctx.depth);
                  }
                  exports.inspect = inspect;

                  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
                  inspect.colors = {
                    'bold': [1, 22],
                    'italic': [3, 23],
                    'underline': [4, 24],
                    'inverse': [7, 27],
                    'white': [37, 39],
                    'grey': [90, 39],
                    'black': [30, 39],
                    'blue': [34, 39],
                    'cyan': [36, 39],
                    'green': [32, 39],
                    'magenta': [35, 39],
                    'red': [31, 39],
                    'yellow': [33, 39]
                  };

                  // Don't use 'blue' not visible on cmd.exe
                  inspect.styles = {
                    'special': 'cyan',
                    'number': 'yellow',
                    'boolean': 'yellow',
                    'undefined': 'grey',
                    'null': 'bold',
                    'string': 'green',
                    'date': 'magenta',
                    // "name": intentionally not styling
                    'regexp': 'red'
                  };
                  function stylizeWithColor(str, styleType) {
                    var style = inspect.styles[styleType];
                    if (style) {
                      return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
                    } else {
                      return str;
                    }
                  }
                  function stylizeNoColor(str, styleType) {
                    return str;
                  }
                  function arrayToHash(array) {
                    var hash = {};
                    array.forEach(function (val, idx) {
                      hash[val] = true;
                    });
                    return hash;
                  }
                  function formatValue(ctx, value, recurseTimes) {
                    // Provide a hook for user-specified inspect functions.
                    // Check that value is an object with an inspect function on it
                    if (ctx.customInspect && value && isFunction(value.inspect) &&
                    // Filter out the util module, it's inspect function is special
                    value.inspect !== exports.inspect &&
                    // Also filter out any prototype objects using the circular check.
                    !(value.constructor && value.constructor.prototype === value)) {
                      var ret = value.inspect(recurseTimes, ctx);
                      if (!isString(ret)) {
                        ret = formatValue(ctx, ret, recurseTimes);
                      }
                      return ret;
                    }

                    // Primitive types cannot have properties
                    var primitive = formatPrimitive(ctx, value);
                    if (primitive) {
                      return primitive;
                    }

                    // Look up the keys of the object.
                    var keys = Object.keys(value);
                    var visibleKeys = arrayToHash(keys);
                    if (ctx.showHidden) {
                      keys = Object.getOwnPropertyNames(value);
                    }

                    // IE doesn't make error fields non-enumerable
                    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
                    if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
                      return formatError(value);
                    }

                    // Some type of object without properties can be shortcutted.
                    if (keys.length === 0) {
                      if (isFunction(value)) {
                        var name = value.name ? ': ' + value.name : '';
                        return ctx.stylize('[Function' + name + ']', 'special');
                      }
                      if (isRegExp(value)) {
                        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                      }
                      if (isDate(value)) {
                        return ctx.stylize(Date.prototype.toString.call(value), 'date');
                      }
                      if (isError(value)) {
                        return formatError(value);
                      }
                    }
                    var base = '',
                      array = false,
                      braces = ['{', '}'];

                    // Make Array say that they are Array
                    if (isArray(value)) {
                      array = true;
                      braces = ['[', ']'];
                    }

                    // Make functions say that they are functions
                    if (isFunction(value)) {
                      var n = value.name ? ': ' + value.name : '';
                      base = ' [Function' + n + ']';
                    }

                    // Make RegExps say that they are RegExps
                    if (isRegExp(value)) {
                      base = ' ' + RegExp.prototype.toString.call(value);
                    }

                    // Make dates with properties first say the date
                    if (isDate(value)) {
                      base = ' ' + Date.prototype.toUTCString.call(value);
                    }

                    // Make error with message first say the error
                    if (isError(value)) {
                      base = ' ' + formatError(value);
                    }
                    if (keys.length === 0 && (!array || value.length == 0)) {
                      return braces[0] + base + braces[1];
                    }
                    if (recurseTimes < 0) {
                      if (isRegExp(value)) {
                        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                      } else {
                        return ctx.stylize('[Object]', 'special');
                      }
                    }
                    ctx.seen.push(value);
                    var output;
                    if (array) {
                      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
                    } else {
                      output = keys.map(function (key) {
                        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                      });
                    }
                    ctx.seen.pop();
                    return reduceToSingleString(output, base, braces);
                  }
                  function formatPrimitive(ctx, value) {
                    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
                    if (isString(value)) {
                      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
                      return ctx.stylize(simple, 'string');
                    }
                    if (isNumber(value)) return ctx.stylize('' + value, 'number');
                    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
                    // For some reason typeof null is "object", so special case here.
                    if (isNull(value)) return ctx.stylize('null', 'null');
                  }
                  function formatError(value) {
                    return '[' + Error.prototype.toString.call(value) + ']';
                  }
                  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                    var output = [];
                    for (var i = 0, l = value.length; i < l; ++i) {
                      if (hasOwnProperty(value, String(i))) {
                        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
                      } else {
                        output.push('');
                      }
                    }
                    keys.forEach(function (key) {
                      if (!key.match(/^\d+$/)) {
                        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
                      }
                    });
                    return output;
                  }
                  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                    var name, str, desc;
                    desc = Object.getOwnPropertyDescriptor(value, key) || {
                      value: value[key]
                    };
                    if (desc.get) {
                      if (desc.set) {
                        str = ctx.stylize('[Getter/Setter]', 'special');
                      } else {
                        str = ctx.stylize('[Getter]', 'special');
                      }
                    } else {
                      if (desc.set) {
                        str = ctx.stylize('[Setter]', 'special');
                      }
                    }
                    if (!hasOwnProperty(visibleKeys, key)) {
                      name = '[' + key + ']';
                    }
                    if (!str) {
                      if (ctx.seen.indexOf(desc.value) < 0) {
                        if (isNull(recurseTimes)) {
                          str = formatValue(ctx, desc.value, null);
                        } else {
                          str = formatValue(ctx, desc.value, recurseTimes - 1);
                        }
                        if (str.indexOf('\n') > -1) {
                          if (array) {
                            str = str.split('\n').map(function (line) {
                              return '  ' + line;
                            }).join('\n').substr(2);
                          } else {
                            str = '\n' + str.split('\n').map(function (line) {
                              return '   ' + line;
                            }).join('\n');
                          }
                        }
                      } else {
                        str = ctx.stylize('[Circular]', 'special');
                      }
                    }
                    if (isUndefined(name)) {
                      if (array && key.match(/^\d+$/)) {
                        return str;
                      }
                      name = JSON.stringify('' + key);
                      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                        name = name.substr(1, name.length - 2);
                        name = ctx.stylize(name, 'name');
                      } else {
                        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                        name = ctx.stylize(name, 'string');
                      }
                    }
                    return name + ': ' + str;
                  }
                  function reduceToSingleString(output, base, braces) {
                    var numLinesEst = 0;
                    var length = output.reduce(function (prev, cur) {
                      numLinesEst++;
                      if (cur.indexOf('\n') >= 0) numLinesEst++;
                      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
                    }, 0);
                    if (length > 60) {
                      return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
                    }
                    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
                  }

                  // NOTE: These type checking functions intentionally don't use `instanceof`
                  // because it is fragile and can be easily faked with `Object.create()`.
                  function isArray(ar) {
                    return Array.isArray(ar);
                  }
                  exports.isArray = isArray;
                  function isBoolean(arg) {
                    return typeof arg === 'boolean';
                  }
                  exports.isBoolean = isBoolean;
                  function isNull(arg) {
                    return arg === null;
                  }
                  exports.isNull = isNull;
                  function isNullOrUndefined(arg) {
                    return arg == null;
                  }
                  exports.isNullOrUndefined = isNullOrUndefined;
                  function isNumber(arg) {
                    return typeof arg === 'number';
                  }
                  exports.isNumber = isNumber;
                  function isString(arg) {
                    return typeof arg === 'string';
                  }
                  exports.isString = isString;
                  function isSymbol(arg) {
                    return _typeof(arg) === 'symbol';
                  }
                  exports.isSymbol = isSymbol;
                  function isUndefined(arg) {
                    return arg === void 0;
                  }
                  exports.isUndefined = isUndefined;
                  function isRegExp(re) {
                    return isObject(re) && objectToString(re) === '[object RegExp]';
                  }
                  exports.isRegExp = isRegExp;
                  function isObject(arg) {
                    return _typeof(arg) === 'object' && arg !== null;
                  }
                  exports.isObject = isObject;
                  function isDate(d) {
                    return isObject(d) && objectToString(d) === '[object Date]';
                  }
                  exports.isDate = isDate;
                  function isError(e) {
                    return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
                  }
                  exports.isError = isError;
                  function isFunction(arg) {
                    return typeof arg === 'function';
                  }
                  exports.isFunction = isFunction;
                  function isPrimitive(arg) {
                    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' ||
                    // ES6 symbol
                    typeof arg === 'undefined';
                  }
                  exports.isPrimitive = isPrimitive;
                  exports.isBuffer = require('./support/isBuffer');
                  function objectToString(o) {
                    return Object.prototype.toString.call(o);
                  }
                  function pad(n) {
                    return n < 10 ? '0' + n.toString(10) : n.toString(10);
                  }
                  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                  // 26 Feb 16:19:34
                  function timestamp() {
                    var d = new Date();
                    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
                    return [d.getDate(), months[d.getMonth()], time].join(' ');
                  }

                  // log is just a thin wrapper to console.log that prepends a timestamp
                  exports.log = function () {
                    console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
                  };

                  /**
                   * Inherit the prototype methods from one constructor into another.
                   *
                   * The Function.prototype.inherits from lang.js rewritten as a standalone
                   * function (not on Function.prototype). NOTE: If this file is to be loaded
                   * during bootstrapping this function needs to be rewritten using some native
                   * functions as prototype setup using normal JavaScript does not work as
                   * expected during bootstrapping (see mirror.js in r114903).
                   *
                   * @param {function} ctor Constructor function which needs to inherit the
                   *     prototype.
                   * @param {function} superCtor Constructor function to inherit prototype from.
                   */
                  exports.inherits = require('inherits');
                  exports._extend = function (origin, add) {
                    // Don't do anything if add isn't an object
                    if (!add || !isObject(add)) return origin;
                    var keys = Object.keys(add);
                    var i = keys.length;
                    while (i--) {
                      origin[keys[i]] = add[keys[i]];
                    }
                    return origin;
                  };
                  function hasOwnProperty(obj, prop) {
                    return Object.prototype.hasOwnProperty.call(obj, prop);
                  }
                }).call(this);
              }).call(this, require('_process'), typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, {
              "./support/isBuffer": 3,
              "_process": 45,
              "inherits": 2
            }],
            5: [function (require, module, exports) {
              'use strict';

              var bind = require('function-bind');
              var $apply = require('./functionApply');
              var $call = require('./functionCall');
              var $reflectApply = require('./reflectApply');

              /** @type {import('./actualApply')} */
              module.exports = $reflectApply || bind.call($call, $apply);
            }, {
              "./functionApply": 6,
              "./functionCall": 7,
              "./reflectApply": 9,
              "function-bind": 22
            }],
            6: [function (require, module, exports) {
              'use strict';

              /** @type {import('./functionApply')} */
              module.exports = Function.prototype.apply;
            }, {}],
            7: [function (require, module, exports) {
              'use strict';

              /** @type {import('./functionCall')} */
              module.exports = Function.prototype.call;
            }, {}],
            8: [function (require, module, exports) {
              'use strict';

              var bind = require('function-bind');
              var $TypeError = require('es-errors/type');
              var $call = require('./functionCall');
              var $actualApply = require('./actualApply');

              /** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
              module.exports = function callBindBasic(args) {
                if (args.length < 1 || typeof args[0] !== 'function') {
                  throw new $TypeError('a function is required');
                }
                return $actualApply(bind, $call, args);
              };
            }, {
              "./actualApply": 5,
              "./functionCall": 7,
              "es-errors/type": 18,
              "function-bind": 22
            }],
            9: [function (require, module, exports) {
              'use strict';

              /** @type {import('./reflectApply')} */
              module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
            }, {}],
            10: [function (require, module, exports) {
              'use strict';

              var GetIntrinsic = require('get-intrinsic');
              var callBindBasic = require('call-bind-apply-helpers');

              /** @type {(thisArg: string, searchString: string, position?: number) => number} */
              var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

              /** @type {import('.')} */
              module.exports = function callBoundIntrinsic(name, allowMissing) {
                /* eslint no-extra-parens: 0 */

                var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */GetIntrinsic(name, !!allowMissing);
                if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
                  return callBindBasic(/** @type {const} */[intrinsic]);
                }
                return intrinsic;
              };
            }, {
              "call-bind-apply-helpers": 8,
              "get-intrinsic": 23
            }],
            11: [function (require, module, exports) {
              'use strict';

              var callBind = require('call-bind-apply-helpers');
              var gOPD = require('gopd');
              var hasProtoAccessor;
              try {
                // eslint-disable-next-line no-extra-parens, no-proto
                hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */[].__proto__ === Array.prototype;
              } catch (e) {
                if (!e || _typeof(e) !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
                  throw e;
                }
              }

              // eslint-disable-next-line no-extra-parens
              var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */'__proto__');
              var $Object = Object;
              var $getPrototypeOf = $Object.getPrototypeOf;

              /** @type {import('./get')} */
              module.exports = desc && typeof desc.get === 'function' ? callBind([desc.get]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */function getDunder(value) {
                // eslint-disable-next-line eqeqeq
                return $getPrototypeOf(value == null ? value : $Object(value));
              } : false;
            }, {
              "call-bind-apply-helpers": 8,
              "gopd": 28
            }],
            12: [function (require, module, exports) {
              'use strict';

              /** @type {import('.')} */
              var $defineProperty = Object.defineProperty || false;
              if ($defineProperty) {
                try {
                  $defineProperty({}, 'a', {
                    value: 1
                  });
                } catch (e) {
                  // IE 8 has a broken defineProperty
                  $defineProperty = false;
                }
              }
              module.exports = $defineProperty;
            }, {}],
            13: [function (require, module, exports) {
              'use strict';

              /** @type {import('./eval')} */
              module.exports = EvalError;
            }, {}],
            14: [function (require, module, exports) {
              'use strict';

              /** @type {import('.')} */
              module.exports = Error;
            }, {}],
            15: [function (require, module, exports) {
              'use strict';

              /** @type {import('./range')} */
              module.exports = RangeError;
            }, {}],
            16: [function (require, module, exports) {
              'use strict';

              /** @type {import('./ref')} */
              module.exports = ReferenceError;
            }, {}],
            17: [function (require, module, exports) {
              'use strict';

              /** @type {import('./syntax')} */
              module.exports = SyntaxError;
            }, {}],
            18: [function (require, module, exports) {
              'use strict';

              /** @type {import('./type')} */
              module.exports = TypeError;
            }, {}],
            19: [function (require, module, exports) {
              'use strict';

              /** @type {import('./uri')} */
              module.exports = URIError;
            }, {}],
            20: [function (require, module, exports) {
              'use strict';

              /** @type {import('.')} */
              module.exports = Object;
            }, {}],
            21: [function (require, module, exports) {
              'use strict';

              /* eslint no-invalid-this: 1 */
              var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
              var toStr = Object.prototype.toString;
              var max = Math.max;
              var funcType = '[object Function]';
              var concatty = function concatty(a, b) {
                var arr = [];
                for (var i = 0; i < a.length; i += 1) {
                  arr[i] = a[i];
                }
                for (var j = 0; j < b.length; j += 1) {
                  arr[j + a.length] = b[j];
                }
                return arr;
              };
              var slicy = function slicy(arrLike, offset) {
                var arr = [];
                for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
                  arr[j] = arrLike[i];
                }
                return arr;
              };
              var joiny = function joiny(arr, joiner) {
                var str = '';
                for (var i = 0; i < arr.length; i += 1) {
                  str += arr[i];
                  if (i + 1 < arr.length) {
                    str += joiner;
                  }
                }
                return str;
              };
              module.exports = function bind(that) {
                var target = this;
                if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
                  throw new TypeError(ERROR_MESSAGE + target);
                }
                var args = slicy(arguments, 1);
                var bound;
                var binder = function binder() {
                  if (this instanceof bound) {
                    var result = target.apply(this, concatty(args, arguments));
                    if (Object(result) === result) {
                      return result;
                    }
                    return this;
                  }
                  return target.apply(that, concatty(args, arguments));
                };
                var boundLength = max(0, target.length - args.length);
                var boundArgs = [];
                for (var i = 0; i < boundLength; i++) {
                  boundArgs[i] = '$' + i;
                }
                bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
                if (target.prototype) {
                  var Empty = function Empty() {};
                  Empty.prototype = target.prototype;
                  bound.prototype = new Empty();
                  Empty.prototype = null;
                }
                return bound;
              };
            }, {}],
            22: [function (require, module, exports) {
              'use strict';

              var implementation = require('./implementation');
              module.exports = Function.prototype.bind || implementation;
            }, {
              "./implementation": 21
            }],
            23: [function (require, module, exports) {
              'use strict';

              var undefined;
              var $Object = require('es-object-atoms');
              var $Error = require('es-errors');
              var $EvalError = require('es-errors/eval');
              var $RangeError = require('es-errors/range');
              var $ReferenceError = require('es-errors/ref');
              var $SyntaxError = require('es-errors/syntax');
              var $TypeError = require('es-errors/type');
              var $URIError = require('es-errors/uri');
              var abs = require('math-intrinsics/abs');
              var floor = require('math-intrinsics/floor');
              var max = require('math-intrinsics/max');
              var min = require('math-intrinsics/min');
              var pow = require('math-intrinsics/pow');
              var round = require('math-intrinsics/round');
              var sign = require('math-intrinsics/sign');
              var $Function = Function;

              // eslint-disable-next-line consistent-return
              var getEvalledConstructor = function getEvalledConstructor(expressionSyntax) {
                try {
                  return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
                } catch (e) {}
              };
              var $gOPD = require('gopd');
              var $defineProperty = require('es-define-property');
              var throwTypeError = function throwTypeError() {
                throw new $TypeError();
              };
              var ThrowTypeError = $gOPD ? function () {
                try {
                  // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
                  arguments.callee; // IE 8 does not throw here
                  return throwTypeError;
                } catch (calleeThrows) {
                  try {
                    // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
                    return $gOPD(arguments, 'callee').get;
                  } catch (gOPDthrows) {
                    return throwTypeError;
                  }
                }
              }() : throwTypeError;
              var hasSymbols = require('has-symbols')();
              var getProto = require('get-proto');
              var $ObjectGPO = require('get-proto/Object.getPrototypeOf');
              var $ReflectGPO = require('get-proto/Reflect.getPrototypeOf');
              var $apply = require('call-bind-apply-helpers/functionApply');
              var $call = require('call-bind-apply-helpers/functionCall');
              var needsEval = {};
              var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);
              var INTRINSICS = {
                __proto__: null,
                '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
                '%Array%': Array,
                '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
                '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
                '%AsyncFromSyncIteratorPrototype%': undefined,
                '%AsyncFunction%': needsEval,
                '%AsyncGenerator%': needsEval,
                '%AsyncGeneratorFunction%': needsEval,
                '%AsyncIteratorPrototype%': needsEval,
                '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
                '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
                '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
                '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
                '%Boolean%': Boolean,
                '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
                '%Date%': Date,
                '%decodeURI%': decodeURI,
                '%decodeURIComponent%': decodeURIComponent,
                '%encodeURI%': encodeURI,
                '%encodeURIComponent%': encodeURIComponent,
                '%Error%': $Error,
                '%eval%': eval,
                // eslint-disable-line no-eval
                '%EvalError%': $EvalError,
                '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
                '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
                '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
                '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
                '%Function%': $Function,
                '%GeneratorFunction%': needsEval,
                '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
                '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
                '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
                '%isFinite%': isFinite,
                '%isNaN%': isNaN,
                '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
                '%JSON%': (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === 'object' ? JSON : undefined,
                '%Map%': typeof Map === 'undefined' ? undefined : Map,
                '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
                '%Math%': Math,
                '%Number%': Number,
                '%Object%': $Object,
                '%Object.getOwnPropertyDescriptor%': $gOPD,
                '%parseFloat%': parseFloat,
                '%parseInt%': parseInt,
                '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
                '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
                '%RangeError%': $RangeError,
                '%ReferenceError%': $ReferenceError,
                '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
                '%RegExp%': RegExp,
                '%Set%': typeof Set === 'undefined' ? undefined : Set,
                '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
                '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
                '%String%': String,
                '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
                '%Symbol%': hasSymbols ? Symbol : undefined,
                '%SyntaxError%': $SyntaxError,
                '%ThrowTypeError%': ThrowTypeError,
                '%TypedArray%': TypedArray,
                '%TypeError%': $TypeError,
                '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
                '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
                '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
                '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
                '%URIError%': $URIError,
                '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
                '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
                '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
                '%Function.prototype.call%': $call,
                '%Function.prototype.apply%': $apply,
                '%Object.defineProperty%': $defineProperty,
                '%Object.getPrototypeOf%': $ObjectGPO,
                '%Math.abs%': abs,
                '%Math.floor%': floor,
                '%Math.max%': max,
                '%Math.min%': min,
                '%Math.pow%': pow,
                '%Math.round%': round,
                '%Math.sign%': sign,
                '%Reflect.getPrototypeOf%': $ReflectGPO
              };
              if (getProto) {
                try {
                  null.error; // eslint-disable-line no-unused-expressions
                } catch (e) {
                  // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
                  var errorProto = getProto(getProto(e));
                  INTRINSICS['%Error.prototype%'] = errorProto;
                }
              }
              var doEval = function doEval(name) {
                var value;
                if (name === '%AsyncFunction%') {
                  value = getEvalledConstructor('async function () {}');
                } else if (name === '%GeneratorFunction%') {
                  value = getEvalledConstructor('function* () {}');
                } else if (name === '%AsyncGeneratorFunction%') {
                  value = getEvalledConstructor('async function* () {}');
                } else if (name === '%AsyncGenerator%') {
                  var fn = doEval('%AsyncGeneratorFunction%');
                  if (fn) {
                    value = fn.prototype;
                  }
                } else if (name === '%AsyncIteratorPrototype%') {
                  var gen = doEval('%AsyncGenerator%');
                  if (gen && getProto) {
                    value = getProto(gen.prototype);
                  }
                }
                INTRINSICS[name] = value;
                return value;
              };
              var LEGACY_ALIASES = {
                __proto__: null,
                '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
                '%ArrayPrototype%': ['Array', 'prototype'],
                '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
                '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
                '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
                '%ArrayProto_values%': ['Array', 'prototype', 'values'],
                '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
                '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
                '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
                '%BooleanPrototype%': ['Boolean', 'prototype'],
                '%DataViewPrototype%': ['DataView', 'prototype'],
                '%DatePrototype%': ['Date', 'prototype'],
                '%ErrorPrototype%': ['Error', 'prototype'],
                '%EvalErrorPrototype%': ['EvalError', 'prototype'],
                '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
                '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
                '%FunctionPrototype%': ['Function', 'prototype'],
                '%Generator%': ['GeneratorFunction', 'prototype'],
                '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
                '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
                '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
                '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
                '%JSONParse%': ['JSON', 'parse'],
                '%JSONStringify%': ['JSON', 'stringify'],
                '%MapPrototype%': ['Map', 'prototype'],
                '%NumberPrototype%': ['Number', 'prototype'],
                '%ObjectPrototype%': ['Object', 'prototype'],
                '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
                '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
                '%PromisePrototype%': ['Promise', 'prototype'],
                '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
                '%Promise_all%': ['Promise', 'all'],
                '%Promise_reject%': ['Promise', 'reject'],
                '%Promise_resolve%': ['Promise', 'resolve'],
                '%RangeErrorPrototype%': ['RangeError', 'prototype'],
                '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
                '%RegExpPrototype%': ['RegExp', 'prototype'],
                '%SetPrototype%': ['Set', 'prototype'],
                '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
                '%StringPrototype%': ['String', 'prototype'],
                '%SymbolPrototype%': ['Symbol', 'prototype'],
                '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
                '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
                '%TypeErrorPrototype%': ['TypeError', 'prototype'],
                '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
                '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
                '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
                '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
                '%URIErrorPrototype%': ['URIError', 'prototype'],
                '%WeakMapPrototype%': ['WeakMap', 'prototype'],
                '%WeakSetPrototype%': ['WeakSet', 'prototype']
              };
              var bind = require('function-bind');
              var hasOwn = require('hasown');
              var $concat = bind.call($call, Array.prototype.concat);
              var $spliceApply = bind.call($apply, Array.prototype.splice);
              var $replace = bind.call($call, String.prototype.replace);
              var $strSlice = bind.call($call, String.prototype.slice);
              var $exec = bind.call($call, RegExp.prototype.exec);

              /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
              var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
              var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
              var stringToPath = function stringToPath(string) {
                var first = $strSlice(string, 0, 1);
                var last = $strSlice(string, -1);
                if (first === '%' && last !== '%') {
                  throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
                } else if (last === '%' && first !== '%') {
                  throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
                }
                var result = [];
                $replace(string, rePropName, function (match, number, quote, subString) {
                  result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
                });
                return result;
              };
              /* end adaptation */

              var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
                var intrinsicName = name;
                var alias;
                if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
                  alias = LEGACY_ALIASES[intrinsicName];
                  intrinsicName = '%' + alias[0] + '%';
                }
                if (hasOwn(INTRINSICS, intrinsicName)) {
                  var value = INTRINSICS[intrinsicName];
                  if (value === needsEval) {
                    value = doEval(intrinsicName);
                  }
                  if (typeof value === 'undefined' && !allowMissing) {
                    throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
                  }
                  return {
                    alias: alias,
                    name: intrinsicName,
                    value: value
                  };
                }
                throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
              };
              module.exports = function GetIntrinsic(name, allowMissing) {
                if (typeof name !== 'string' || name.length === 0) {
                  throw new $TypeError('intrinsic name must be a non-empty string');
                }
                if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
                  throw new $TypeError('"allowMissing" argument must be a boolean');
                }
                if ($exec(/^%?[^%]*%?$/, name) === null) {
                  throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
                }
                var parts = stringToPath(name);
                var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
                var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
                var intrinsicRealName = intrinsic.name;
                var value = intrinsic.value;
                var skipFurtherCaching = false;
                var alias = intrinsic.alias;
                if (alias) {
                  intrinsicBaseName = alias[0];
                  $spliceApply(parts, $concat([0, 1], alias));
                }
                for (var i = 1, isOwn = true; i < parts.length; i += 1) {
                  var part = parts[i];
                  var first = $strSlice(part, 0, 1);
                  var last = $strSlice(part, -1);
                  if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
                    throw new $SyntaxError('property names with quotes must have matching quotes');
                  }
                  if (part === 'constructor' || !isOwn) {
                    skipFurtherCaching = true;
                  }
                  intrinsicBaseName += '.' + part;
                  intrinsicRealName = '%' + intrinsicBaseName + '%';
                  if (hasOwn(INTRINSICS, intrinsicRealName)) {
                    value = INTRINSICS[intrinsicRealName];
                  } else if (value != null) {
                    if (!(part in value)) {
                      if (!allowMissing) {
                        throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                      }
                      return void undefined;
                    }
                    if ($gOPD && i + 1 >= parts.length) {
                      var desc = $gOPD(value, part);
                      isOwn = !!desc;

                      // By convention, when a data property is converted to an accessor
                      // property to emulate a data property that does not suffer from
                      // the override mistake, that accessor's getter is marked with
                      // an `originalValue` property. Here, when we detect this, we
                      // uphold the illusion by pretending to see that original data
                      // property, i.e., returning the value rather than the getter
                      // itself.
                      if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                        value = desc.get;
                      } else {
                        value = value[part];
                      }
                    } else {
                      isOwn = hasOwn(value, part);
                      value = value[part];
                    }
                    if (isOwn && !skipFurtherCaching) {
                      INTRINSICS[intrinsicRealName] = value;
                    }
                  }
                }
                return value;
              };
            }, {
              "call-bind-apply-helpers/functionApply": 6,
              "call-bind-apply-helpers/functionCall": 7,
              "es-define-property": 12,
              "es-errors": 14,
              "es-errors/eval": 13,
              "es-errors/range": 15,
              "es-errors/ref": 16,
              "es-errors/syntax": 17,
              "es-errors/type": 18,
              "es-errors/uri": 19,
              "es-object-atoms": 20,
              "function-bind": 22,
              "get-proto": 26,
              "get-proto/Object.getPrototypeOf": 24,
              "get-proto/Reflect.getPrototypeOf": 25,
              "gopd": 28,
              "has-symbols": 29,
              "hasown": 31,
              "math-intrinsics/abs": 32,
              "math-intrinsics/floor": 33,
              "math-intrinsics/max": 35,
              "math-intrinsics/min": 36,
              "math-intrinsics/pow": 37,
              "math-intrinsics/round": 38,
              "math-intrinsics/sign": 39
            }],
            24: [function (require, module, exports) {
              'use strict';

              var $Object = require('es-object-atoms');

              /** @type {import('./Object.getPrototypeOf')} */
              module.exports = $Object.getPrototypeOf || null;
            }, {
              "es-object-atoms": 20
            }],
            25: [function (require, module, exports) {
              'use strict';

              /** @type {import('./Reflect.getPrototypeOf')} */
              module.exports = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
            }, {}],
            26: [function (require, module, exports) {
              'use strict';

              var reflectGetProto = require('./Reflect.getPrototypeOf');
              var originalGetProto = require('./Object.getPrototypeOf');
              var getDunderProto = require('dunder-proto/get');

              /** @type {import('.')} */
              module.exports = reflectGetProto ? function getProto(O) {
                // @ts-expect-error TS can't narrow inside a closure, for some reason
                return reflectGetProto(O);
              } : originalGetProto ? function getProto(O) {
                if (!O || _typeof(O) !== 'object' && typeof O !== 'function') {
                  throw new TypeError('getProto: not an object');
                }
                // @ts-expect-error TS can't narrow inside a closure, for some reason
                return originalGetProto(O);
              } : getDunderProto ? function getProto(O) {
                // @ts-expect-error TS can't narrow inside a closure, for some reason
                return getDunderProto(O);
              } : null;
            }, {
              "./Object.getPrototypeOf": 24,
              "./Reflect.getPrototypeOf": 25,
              "dunder-proto/get": 11
            }],
            27: [function (require, module, exports) {
              'use strict';

              /** @type {import('./gOPD')} */
              module.exports = Object.getOwnPropertyDescriptor;
            }, {}],
            28: [function (require, module, exports) {
              'use strict';

              /** @type {import('.')} */
              var $gOPD = require('./gOPD');
              if ($gOPD) {
                try {
                  $gOPD([], 'length');
                } catch (e) {
                  // IE 8 has a broken gOPD
                  $gOPD = null;
                }
              }
              module.exports = $gOPD;
            }, {
              "./gOPD": 27
            }],
            29: [function (require, module, exports) {
              'use strict';

              var origSymbol = typeof Symbol !== 'undefined' && Symbol;
              var hasSymbolSham = require('./shams');

              /** @type {import('.')} */
              module.exports = function hasNativeSymbols() {
                if (typeof origSymbol !== 'function') {
                  return false;
                }
                if (typeof Symbol !== 'function') {
                  return false;
                }
                if (_typeof(origSymbol('foo')) !== 'symbol') {
                  return false;
                }
                if (_typeof(Symbol('bar')) !== 'symbol') {
                  return false;
                }
                return hasSymbolSham();
              };
            }, {
              "./shams": 30
            }],
            30: [function (require, module, exports) {
              'use strict';

              /** @type {import('./shams')} */
              /* eslint complexity: [2, 18], max-statements: [2, 33] */
              module.exports = function hasSymbols() {
                if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
                  return false;
                }
                if (_typeof(Symbol.iterator) === 'symbol') {
                  return true;
                }

                /** @type {{ [k in symbol]?: unknown }} */
                var obj = {};
                var sym = Symbol('test');
                var symObj = Object(sym);
                if (typeof sym === 'string') {
                  return false;
                }
                if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
                  return false;
                }
                if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
                  return false;
                }

                // temp disabled per https://github.com/ljharb/object.assign/issues/17
                // if (sym instanceof Symbol) { return false; }
                // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
                // if (!(symObj instanceof Symbol)) { return false; }

                // if (typeof Symbol.prototype.toString !== 'function') { return false; }
                // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

                var symVal = 42;
                obj[sym] = symVal;
                for (var _ in obj) {
                  return false;
                } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
                if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
                  return false;
                }
                if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
                  return false;
                }
                var syms = Object.getOwnPropertySymbols(obj);
                if (syms.length !== 1 || syms[0] !== sym) {
                  return false;
                }
                if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
                  return false;
                }
                if (typeof Object.getOwnPropertyDescriptor === 'function') {
                  // eslint-disable-next-line no-extra-parens
                  var descriptor = /** @type {PropertyDescriptor} */Object.getOwnPropertyDescriptor(obj, sym);
                  if (descriptor.value !== symVal || descriptor.enumerable !== true) {
                    return false;
                  }
                }
                return true;
              };
            }, {}],
            31: [function (require, module, exports) {
              'use strict';

              var call = Function.prototype.call;
              var $hasOwn = Object.prototype.hasOwnProperty;
              var bind = require('function-bind');

              /** @type {import('.')} */
              module.exports = bind.call(call, $hasOwn);
            }, {
              "function-bind": 22
            }],
            32: [function (require, module, exports) {
              'use strict';

              /** @type {import('./abs')} */
              module.exports = Math.abs;
            }, {}],
            33: [function (require, module, exports) {
              'use strict';

              /** @type {import('./floor')} */
              module.exports = Math.floor;
            }, {}],
            34: [function (require, module, exports) {
              'use strict';

              /** @type {import('./isNaN')} */
              module.exports = Number.isNaN || function isNaN(a) {
                return a !== a;
              };
            }, {}],
            35: [function (require, module, exports) {
              'use strict';

              /** @type {import('./max')} */
              module.exports = Math.max;
            }, {}],
            36: [function (require, module, exports) {
              'use strict';

              /** @type {import('./min')} */
              module.exports = Math.min;
            }, {}],
            37: [function (require, module, exports) {
              'use strict';

              /** @type {import('./pow')} */
              module.exports = Math.pow;
            }, {}],
            38: [function (require, module, exports) {
              'use strict';

              /** @type {import('./round')} */
              module.exports = Math.round;
            }, {}],
            39: [function (require, module, exports) {
              'use strict';

              var $isNaN = require('./isNaN');

              /** @type {import('./sign')} */
              module.exports = function sign(number) {
                if ($isNaN(number) || number === 0) {
                  return number;
                }
                return number < 0 ? -1 : +1;
              };
            }, {
              "./isNaN": 34
            }],
            40: [function (require, module, exports) {
              'use strict';

              var keysShim;
              if (!Object.keys) {
                // modified from https://github.com/es-shims/es5-shim
                var has = Object.prototype.hasOwnProperty;
                var toStr = Object.prototype.toString;
                var isArgs = require('./isArguments'); // eslint-disable-line global-require
                var isEnumerable = Object.prototype.propertyIsEnumerable;
                var hasDontEnumBug = !isEnumerable.call({
                  toString: null
                }, 'toString');
                var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
                var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
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
                  $window: true
                };
                var hasAutomationEqualityBug = function () {
                  /* global window */
                  if (typeof window === 'undefined') {
                    return false;
                  }
                  for (var k in window) {
                    try {
                      if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
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
                keysShim = function keys(object) {
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
              }
              module.exports = keysShim;
            }, {
              "./isArguments": 42
            }],
            41: [function (require, module, exports) {
              'use strict';

              var slice = Array.prototype.slice;
              var isArgs = require('./isArguments');
              var origKeys = Object.keys;
              var keysShim = origKeys ? function keys(o) {
                return origKeys(o);
              } : require('./implementation');
              var originalKeys = Object.keys;
              keysShim.shim = function shimObjectKeys() {
                if (Object.keys) {
                  var keysWorksWithArguments = function () {
                    // Safari 5.0 bug
                    var args = Object.keys(arguments);
                    return args && args.length === arguments.length;
                  }(1, 2);
                  if (!keysWorksWithArguments) {
                    Object.keys = function keys(object) {
                      // eslint-disable-line func-name-matching
                      if (isArgs(object)) {
                        return originalKeys(slice.call(object));
                      }
                      return originalKeys(object);
                    };
                  }
                } else {
                  Object.keys = keysShim;
                }
                return Object.keys || keysShim;
              };
              module.exports = keysShim;
            }, {
              "./implementation": 40,
              "./isArguments": 42
            }],
            42: [function (require, module, exports) {
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
            43: [function (require, module, exports) {
              'use strict';

              // modified from https://github.com/es-shims/es6-shim
              var objectKeys = require('object-keys');
              var hasSymbols = require('has-symbols/shams')();
              var callBound = require('call-bound');
              var $Object = require('es-object-atoms');
              var $push = callBound('Array.prototype.push');
              var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
              var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;

              // eslint-disable-next-line no-unused-vars
              module.exports = function assign(target, source1) {
                if (target == null) {
                  throw new TypeError('target must be an object');
                }
                var to = $Object(target); // step 1
                if (arguments.length === 1) {
                  return to; // step 2
                }
                for (var s = 1; s < arguments.length; ++s) {
                  var from = $Object(arguments[s]); // step 3.a.i

                  // step 3.a.ii:
                  var keys = objectKeys(from);
                  var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
                  if (getSymbols) {
                    var syms = getSymbols(from);
                    for (var j = 0; j < syms.length; ++j) {
                      var key = syms[j];
                      if ($propIsEnumerable(from, key)) {
                        $push(keys, key);
                      }
                    }
                  }

                  // step 3.a.iii:
                  for (var i = 0; i < keys.length; ++i) {
                    var nextKey = keys[i];
                    if ($propIsEnumerable(from, nextKey)) {
                      // step 3.a.iii.2
                      var propValue = from[nextKey]; // step 3.a.iii.2.a
                      to[nextKey] = propValue; // step 3.a.iii.2.b
                    }
                  }
                }
                return to; // step 4
              };
            }, {
              "call-bound": 10,
              "es-object-atoms": 20,
              "has-symbols/shams": 30,
              "object-keys": 41
            }],
            44: [function (require, module, exports) {
              'use strict';

              var implementation = require('./implementation');
              var lacksProperEnumerationOrder = function lacksProperEnumerationOrder() {
                if (!Object.assign) {
                  return false;
                }
                /*
                 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
                 * note: this does not detect the bug unless there's 20 characters
                 */
                var str = 'abcdefghijklmnopqrst';
                var letters = str.split('');
                var map = {};
                for (var i = 0; i < letters.length; ++i) {
                  map[letters[i]] = letters[i];
                }
                var obj = Object.assign({}, map);
                var actual = '';
                for (var k in obj) {
                  actual += k;
                }
                return str !== actual;
              };
              var assignHasPendingExceptions = function assignHasPendingExceptions() {
                if (!Object.assign || !Object.preventExtensions) {
                  return false;
                }
                /*
                 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
                 * which is 72% slower than our shim, and Firefox 40's native implementation.
                 */
                var thrower = Object.preventExtensions({
                  1: 2
                });
                try {
                  Object.assign(thrower, 'xy');
                } catch (e) {
                  return thrower[1] === 'y';
                }
                return false;
              };
              module.exports = function getPolyfill() {
                if (!Object.assign) {
                  return implementation;
                }
                if (lacksProperEnumerationOrder()) {
                  return implementation;
                }
                if (assignHasPendingExceptions()) {
                  return implementation;
                }
                return Object.assign;
              };
            }, {
              "./implementation": 43
            }],
            45: [function (require, module, exports) {
              // shim for using process in browser
              var process = module.exports = {};

              // cached from whatever global is present so that test runners that stub it
              // don't break things.  But we need to wrap it in a try catch in case it is
              // wrapped in strict mode code which doesn't define any globals.  It's inside a
              // function because try/catches deoptimize in certain engines.

              var cachedSetTimeout;
              var cachedClearTimeout;
              function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
              }
              function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
              }
              (function () {
                try {
                  if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                  } else {
                    cachedSetTimeout = defaultSetTimout;
                  }
                } catch (e) {
                  cachedSetTimeout = defaultSetTimout;
                }
                try {
                  if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                  } else {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                } catch (e) {
                  cachedClearTimeout = defaultClearTimeout;
                }
              })();
              function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                  //normal enviroments in sane situations
                  return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                  cachedSetTimeout = setTimeout;
                  return setTimeout(fun, 0);
                }
                try {
                  // when when somebody has screwed with setTimeout but no I.E. maddness
                  return cachedSetTimeout(fun, 0);
                } catch (e) {
                  try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                  } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                  }
                }
              }
              function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                  //normal enviroments in sane situations
                  return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                  cachedClearTimeout = clearTimeout;
                  return clearTimeout(marker);
                }
                try {
                  // when when somebody has screwed with setTimeout but no I.E. maddness
                  return cachedClearTimeout(marker);
                } catch (e) {
                  try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                  } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                  }
                }
              }
              var queue = [];
              var draining = false;
              var currentQueue;
              var queueIndex = -1;
              function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                  return;
                }
                draining = false;
                if (currentQueue.length) {
                  queue = currentQueue.concat(queue);
                } else {
                  queueIndex = -1;
                }
                if (queue.length) {
                  drainQueue();
                }
              }
              function drainQueue() {
                if (draining) {
                  return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;
                var len = queue.length;
                while (len) {
                  currentQueue = queue;
                  queue = [];
                  while (++queueIndex < len) {
                    if (currentQueue) {
                      currentQueue[queueIndex].run();
                    }
                  }
                  queueIndex = -1;
                  len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
              }
              process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                  for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                  }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                  runTimeout(drainQueue);
                }
              };

              // v8 likes predictible objects
              function Item(fun, array) {
                this.fun = fun;
                this.array = array;
              }
              Item.prototype.run = function () {
                this.fun.apply(null, this.array);
              };
              process.title = 'browser';
              process.browser = true;
              process.env = {};
              process.argv = [];
              process.version = ''; // empty string to avoid regexp issues
              process.versions = {};
              function noop() {}
              process.on = noop;
              process.addListener = noop;
              process.once = noop;
              process.off = noop;
              process.removeListener = noop;
              process.removeAllListeners = noop;
              process.emit = noop;
              process.prependListener = noop;
              process.prependOnceListener = noop;
              process.listeners = function (name) {
                return [];
              };
              process.binding = function (name) {
                throw new Error('process.binding is not supported');
              };
              process.cwd = function () {
                return '/';
              };
              process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
              };
              process.umask = function () {
                return 0;
              };
            }, {}],
            46: [function (require, module, exports) {
              module.exports = require('assert');
            }, {
              "assert": 1
            }]
          }, {}, [46])(46);
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
    /***/"./lib/00.快捷✔/00.跨域剪切.webpack.jsfl": (
    /*!*****************************************!*\
      !*** ./lib/00.快捷✔/00.跨域剪切.webpack.jsfl ***!
      \*****************************************/
    /***/
    function _lib_00快捷_00跨域剪切WebpackJsfl(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";

        /**
         * @file: 00.跨域剪切.jsfl
         * @author: 穹的兔兔
         * @email: 3101829204@qq.com
         * @date: 2024/12/8 11:15
         * @project: AnJsflScript
         * @description:
         */

        // @formatter:off
        // prettier-ignore
        // (function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
        // @formatter:on
        Promise.resolve(/*! AMD require */).then(function () {
          var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! checkUtil */"./Core/flash/checkUtil.jsfl")];
          (function (checkUtil) {
            var checkDom = checkUtil.CheckDom,
              checkSelection = checkUtil.CheckSelection;
            var doc = fl.getDocumentDOM(); //文档
            if (!checkDom(doc)) return;
            var selection = doc.selection; //选择
            var library = doc.library; //库文件
            var timeline = doc.getTimeline(); //时间轴

            var layers = timeline.layers; //图层
            var curLayerIndex = timeline.currentLayer; //当前图层索引
            var curLayer = layers[curLayerIndex]; //当前图层

            var curFrameIndex = timeline.currentFrame; //当前帧索引
            var curFrame = curLayer.frames[curFrameIndex]; //当前帧

            function Main() {
              // 检查选择的元件
              if (!checkSelection(selection, "selectElement", "No limit")) return;

              // 没有选择的元件时，不提示
              if (selection.length === 0) {
                return;
              }

              // 记录当前视图矩阵
              var tempWorldViewMatrixAnti = doc.viewMatrix;
              window.AnJsflScript.GLOBALS["00.跨域剪切.jsfl-tempWorldViewMatrixAnti"] = tempWorldViewMatrixAnti;

              // 复制元件
              doc.clipCut();
              // doc.clipCopy();
            }
            Main();
          }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);
        })['catch'](__webpack_require__.oe);
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
  var __webpack_exports__ = __webpack_require__("./lib/00.快捷✔/00.跨域剪切.webpack.jsfl");
  /******/
  __AnJsflScript = __webpack_exports__;
  /******/
  /******/
})();
})();