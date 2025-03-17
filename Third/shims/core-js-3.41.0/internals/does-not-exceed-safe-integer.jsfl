define(function (require, exports, module) {
    'use strict';
    var $TypeError = TypeError;
    var MAX_SAFE_INTEGER = 0x1fffffffffffff; // 2 ** 53 - 1 == 9007199254740991

    module.exports = function (it) {
        if (it > MAX_SAFE_INTEGER)
            throw $TypeError('Maximum allowed index exceeded');
        return it;
    };
});
