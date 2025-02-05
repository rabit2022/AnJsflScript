/**
 * @file: array.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 17:56
 * @project: AnJsflScript
 * @description:
 */

(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define['amd']) {
        define(factory);
    } else if (typeof exports === 'object') {
        module['exports'] = factory();
    } else {
        root['SAT'] = factory();
    }
}(this, function () {
// es2015
    Array.prototype.find = function (predicate, thisArg) {
        for (var i = 0; i < this.length; i++) {
            if (predicate.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
    Array.prototype.findIndex = function (predicate, thisArg) {
        for (var i = 0; i < this.length; i++) {
            if (predicate.call(thisArg, this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
    Array.prototype.fill = function (value, start, end) {
        if (typeof start === 'undefined') {
            start = 0;
        }
        if (typeof end === 'undefined') {
            end = this.length;
        }
        for (var i = start; i < end; i++) {
            this[i] = value;
        }
        return this;
    };
    Array.prototype.copyWithin = function (target, start, end) {
        if (typeof start === 'undefined') {
            start = 0;
        }
        if (typeof end === 'undefined') {
            end = this.length;
        }
        var len = this.length;
        var to = target;
        var from = start;
        var end = end < 0 ? len + end : end;
        var count = Math.min(end - from, len - to);
        var direction = 1;
        if (from < to && to < from + count) {
            direction = -1;
            from += count - 1;
            to += count - 1;
        }
        while (count > 0) {
            this[to] = this[from];
            from += direction;
            to += direction;
            count--;
        }
        return this;
    };

// es2016
    Array.prototype.includes = function (searchElement, fromIndex) {
        if (typeof fromIndex !== 'number') {
            fromIndex = 0;
        }
        var len = this.length;
        for (var i = fromIndex; i < len; i++) {
            if (this[i] === searchElement) {
                return true;
            }
        }
        return false;
    };
// es2017
    Array.prototype.entries = function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push([i, this[i]]);
        }
        return arr;
    };
    Array.prototype.keys = function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push(i);
        }
        return arr;
    };
    Array.prototype.values = function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push(this[i]);
        }
        return arr;
    };

// es2019
    Array.prototype.flatMap = function (callback, thisArg) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            var result = callback.call(thisArg, this[i], i, this);
            if (Array.isArray(result)) {
                arr.push.apply(arr, result);
            } else {
                arr.push(result);
            }
        }
        return arr;
    };
    Array.prototype.flat = function (depth) {
        if (typeof depth === 'undefined') {
            depth = 1;
        }
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (Array.isArray(this[i]) && depth > 0) {
                arr.push.apply(arr, this[i].flat(depth - 1));
            } else {
                arr.push(this[i]);
            }
        }
        return arr;
    };

// es2022
    Array.prototype.at = function (index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        return this[index];
    };

// es2023
    Array.prototype.findLast = function (predicate, thisArg) {
        for (var i = this.length - 1; i >= 0; i--) {
            if (predicate.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
    Array.prototype.findLastIndex = function (predicate, thisArg) {
        for (var i = this.length - 1; i >= 0; i--) {
            if (predicate.call(thisArg, this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };

}));

