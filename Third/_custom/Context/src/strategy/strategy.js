"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeStrategyManager = exports.PriorityStrategyManager = exports.PolicyManager = exports.StrategyManager = void 0;
/**
 * 策略管理基类，提供策略的注册和执行功能
 */
var StrategyManager = /** @class */ (function () {
    function StrategyManager() {
        this.strategies = {
            default: function () {
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
        var strategy = this.strategies[name] || this.strategies.default;
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
            var name = _a.name, fn = _a.fn;
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
        this.strategies.default = strategy;
        return this;
    };
    return StrategyManager;
}());
exports.StrategyManager = StrategyManager;
/**
 * 策略检查管理器，扩展基本策略管理功能
 */
var PolicyManager = /** @class */ (function (_super) {
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
        return names.every(function (name) { return _this.check.apply(_this, __spreadArray([name], args, false)); });
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
        return names.some(function (name) { return _this.check.apply(_this, __spreadArray([name], args, false)); });
    };
    return PolicyManager;
}(StrategyManager));
exports.PolicyManager = PolicyManager;
/**
 * 优先级策略管理器，支持按优先级执行策略
 */
var PriorityStrategyManager = /** @class */ (function (_super) {
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
        this.priorityStrategies.push({ name: name, fn: strategy, priority: priority });
        this.priorityStrategies.sort(function (a, b) { return b.priority - a.priority; });
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
        return (_a = this.strategies).default.apply(_a, args);
    };
    return PriorityStrategyManager;
}(StrategyManager));
exports.PriorityStrategyManager = PriorityStrategyManager;
/**
 * 组合策略管理器，支持策略的组合执行
 */
var CompositeStrategyManager = /** @class */ (function (_super) {
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
        var strategies = this.executionOrder.map(function (name) { return _this.strategies[name]; });
        return strategies.reduce(function (result, strategy) {
            // strategy(result as T[0], ...args.slice(1))
            var nArgs = __spreadArray([result], args.slice(1), true);
            return strategy.apply(void 0, nArgs);
        }, args[0]);
    };
    return CompositeStrategyManager;
}(StrategyManager));
exports.CompositeStrategyManager = CompositeStrategyManager;
