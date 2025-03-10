define(function (require, exports, module) {
    'use strict';
    var wellKnownSymbol = require('../internals/well-known-symbol');

    var ITERATOR = wellKnownSymbol('iterator');
    var SAFE_CLOSING = false;

    try {
        var called = 0;
        var iteratorWithReturn = {
            next: function () {
                return { done: !!called++ };
            },
            return: function () {
                SAFE_CLOSING = true;
            }
        };
        iteratorWithReturn[ITERATOR] = function () {
            return this;
        };
        // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
        Array.from(iteratorWithReturn, function () {
            throw 2;
        });
    } catch (error) {
        /* empty */
    }

    module.exports = function (exec, SKIP_CLOSING) {
        try {
            if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
        } catch (error) {
            return false;
        } // workaround of old WebKit + `eval` bug
        var ITERATION_SUPPORT = false;
        try {
            var object = {};
            object[ITERATOR] = function () {
                return {
                    next: function () {
                        return { done: (ITERATION_SUPPORT = true) };
                    }
                };
            };
            exec(object);
        } catch (error) {
            /* empty */
        }
        return ITERATION_SUPPORT;
    };
});
