define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.regexp.flags');
    var getRegExpFlags = require('../../internals/regexp-get-flags');

    module.exports = getRegExpFlags;
});
