define(function (require, exports, module) {
    'use strict';
    var parent = require('../../stable/iterator/take');
    require('../../modules/esnext.iterator.constructor');
    require('../../modules/esnext.iterator.take');

    module.exports = parent;
});
