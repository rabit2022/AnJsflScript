define(function (require, exports, module) {
    'use strict';
    var has = require('../internals/map-helpers').has;

    // Perform ? RequireInternalSlot(M, [[MapData]])
    module.exports = function (it) {
        has(it);
        return it;
    };
});
