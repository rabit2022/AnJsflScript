define(function (require, exports, module) {
    'use strict';
    require('../modules/web.self');
    var path = require('../internals/path');

    module.exports = path.self;
});
