// 这个文件由脚本 FFramework.define.ts 自动生成，任何手动修改都将会被覆盖.
define(["require", "exports", "checkUtil", "ElementSelect", "LayerQuery", "loglevel", "rxjs"], function (require, exports, checkUtil_1, ElementSelect_1, LayerQuery_1, log, rxjs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FFramework = void 0;
    var doc = fl.getDocumentDOM();
    if (!(0, checkUtil_1.CheckDom)(doc)) {
        return;
    }
    var library = doc.library;
    var FFramework = (function () {
        function FFramework(timeline, useRxjs) {
            if (useRxjs === void 0) { useRxjs = true; }
            this.timeline = timeline;
            this.useRxjs = useRxjs;
            this.timeline = timeline;
            this.useRxjs = useRxjs;
        }
        FFramework.prototype.$ = function () {
            if (this.useRxjs) {
                return (0, rxjs_1.of)(this);
            }
            else {
                return this;
            }
        };
        FFramework.prototype.gotoLayer = function (arg) {
            if (typeof arg === "number") {
                var layerIndex = arg;
                if (layerIndex < 0 || layerIndex >= this.timeline.layers.length) {
                    log.error("Layer index ".concat(layerIndex, " out of range"));
                }
                else {
                    this.timeline.currentLayer = layerIndex;
                }
            }
            else if (typeof arg === "string") {
                var expectedName = arg;
                var layerIndexs = (0, LayerQuery_1.getLayersIndexByName)(this.timeline.layers, expectedName);
                if (layerIndexs.length > 0) {
                    this.timeline.currentLayer = layerIndexs[0];
                }
                else {
                    log.error("Layer ".concat(expectedName, " not found"));
                }
            }
            else {
                log.error("Invalid argument ".concat(arg));
            }
            return this.$();
        };
        FFramework.prototype.gotoFrame = function (index0) {
            this.timeline.currentFrame = index0;
            return this.$();
        };
        FFramework.prototype.SelectAll = function () {
            (0, ElementSelect_1.SelectAll)();
            return this.$();
        };
        FFramework.prototype.SelectNone = function () {
            (0, ElementSelect_1.SelectNone)();
            return this.$();
        };
        FFramework.prototype.SelectStart = function (selection) {
            (0, ElementSelect_1.SelectStart)(selection);
            return this.$();
        };
        FFramework.prototype.OnlySelectCurrent = function (element) {
            (0, ElementSelect_1.OnlySelectCurrent)(element);
            return this.$();
        };
        FFramework.prototype.code = function (callback) {
            callback();
            return this.$();
        };
        FFramework.prototype.edit = function (callback) {
            doc.enterEditMode("inPlace");
            try {
                var timeline = doc.getTimeline();
                callback(new FFramework(timeline, this.useRxjs));
            }
            finally {
                doc.exitEditMode();
            }
            return this.$();
        };
        return FFramework;
    }());
    exports.FFramework = FFramework;
});
