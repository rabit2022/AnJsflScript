var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositeStrategyManager = exports.PriorityStrategyManager = exports.PolicyManager = exports.StrategyManager = void 0;
    var StrategyManager = (function () {
        function StrategyManager() {
            this.strategies = {
                default: function () {
                    throw new Error('未知的策略类型');
                },
            };
        }
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
        StrategyManager.prototype.use = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var strategy = this.strategies[name] || this.strategies.default;
            return strategy.apply(void 0, args);
        };
        StrategyManager.prototype.load = function (config) {
            var _this = this;
            config.forEach(function (_a) {
                var name = _a.name, fn = _a.fn;
                _this.add(name, fn);
            });
            return this;
        };
        StrategyManager.prototype.setDefaultStrategy = function (strategy) {
            this.strategies.default = strategy;
            return this;
        };
        return StrategyManager;
    }());
    exports.StrategyManager = StrategyManager;
    var PolicyManager = (function (_super) {
        __extends(PolicyManager, _super);
        function PolicyManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PolicyManager.prototype.check = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this.use.apply(this, __spreadArray([name], args, false));
        };
        PolicyManager.prototype.checkAll = function (names) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return names.every(function (name) { return _this.check.apply(_this, __spreadArray([name], args, false)); });
        };
        PolicyManager.prototype.checkAny = function (names) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return names.some(function (name) { return _this.check.apply(_this, __spreadArray([name], args, false)); });
        };
        return PolicyManager;
    }(StrategyManager));
    exports.PolicyManager = PolicyManager;
    var PriorityStrategyManager = (function (_super) {
        __extends(PriorityStrategyManager, _super);
        function PriorityStrategyManager() {
            var _this = _super.call(this) || this;
            _this.priorityStrategies = [];
            return _this;
        }
        PriorityStrategyManager.prototype.addPriority = function (name, strategy, priority) {
            this.priorityStrategies.push({ name: name, fn: strategy, priority: priority });
            this.priorityStrategies.sort(function (a, b) { return b.priority - a.priority; });
            return this;
        };
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
            return (_a = this.strategies).default.apply(_a, args);
        };
        return PriorityStrategyManager;
    }(StrategyManager));
    exports.PriorityStrategyManager = PriorityStrategyManager;
    var CompositeStrategyManager = (function (_super) {
        __extends(CompositeStrategyManager, _super);
        function CompositeStrategyManager() {
            var _this = _super.call(this) || this;
            _this.executionOrder = [];
            return _this;
        }
        CompositeStrategyManager.prototype.setExecutionOrder = function (order) {
            this.executionOrder = order;
            return this;
        };
        CompositeStrategyManager.prototype.useComposite = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var strategies = this.executionOrder.map(function (name) { return _this.strategies[name]; });
            return strategies.reduce(function (result, strategy) {
                var nArgs = __spreadArray([result], args.slice(1), true);
                return strategy.apply(void 0, nArgs);
            }, args[0]);
        };
        return CompositeStrategyManager;
    }(StrategyManager));
    exports.CompositeStrategyManager = CompositeStrategyManager;
});
