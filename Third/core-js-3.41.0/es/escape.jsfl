define(function (require, exports, module) {
    'use strict';
    require('../modules/es.escape');
    var path = require('../internals/path');

    module.exports = path.escape;
});
