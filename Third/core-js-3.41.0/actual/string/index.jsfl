define(function (require, exports, module) {
    'use strict';
    var parent = require('../../stable/string');

    // TODO: Remove from `core-js@4`
    require('../../modules/esnext.string.is-well-formed');
    require('../../modules/esnext.string.to-well-formed');

    module.exports = parent;
});
