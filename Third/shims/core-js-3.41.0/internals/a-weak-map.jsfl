define(function (require, exports, module) {
    'use strict';
    var has = require('../internals/weak-map-helpers').has;

    // Perform ? RequireInternalSlot(M, [[WeakMapData]])
    module.exports = function (it) {
        has(it);
        return it;
    };
});
