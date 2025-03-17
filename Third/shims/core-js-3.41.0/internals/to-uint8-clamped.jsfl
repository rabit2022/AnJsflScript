define(function (require, exports, module) {
    'use strict';
    var round = Math.round;

    module.exports = function (it) {
        var value = round(it);
        return value < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
    };
});
