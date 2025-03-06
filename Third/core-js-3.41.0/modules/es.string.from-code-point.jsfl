define(function (require, exports, module) {
    'use strict';
    var $ = require('../internals/export');
    var uncurryThis = require('../internals/function-uncurry-this');
    var toAbsoluteIndex = require('../internals/to-absolute-index');

    var $RangeError = RangeError;
    var fromCharCode = String.fromCharCode;
    // eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
    var $fromCodePoint = String.fromCodePoint;
    var join = uncurryThis([].join);

    // length should be 1, old FF problem
    var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

    // `String.fromCodePoint` method
    // https://tc39.es/ecma262/#sec-string.fromcodepoint
    $(
        { target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH },
        {
            // eslint-disable-next-line no-unused-vars -- required for `.length`
            fromCodePoint: function fromCodePoint(x) {
                var elements = [];
                var length = arguments.length;
                var i = 0;
                var code;
                while (length > i) {
                    code = +arguments[i++];
                    if (toAbsoluteIndex(code, 0x10ffff) !== code)
                        throw new $RangeError(
                            code + ' is not a valid code point'
                        );
                    elements[i] =
                        code < 0x10000
                            ? fromCharCode(code)
                            : fromCharCode(
                                  ((code -= 0x10000) >> 10) + 0xd800,
                                  (code % 0x400) + 0xdc00
                              );
                }
                return join(elements, '');
            }
        }
    );
});
