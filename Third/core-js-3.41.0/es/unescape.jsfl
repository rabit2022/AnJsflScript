define(function (require, exports, module) {
    'use strict';
    require('../modules/es.unescape');
    var path = require('../internals/path');

    module.exports = path.unescape;
});
