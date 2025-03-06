define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.reflect.prevent-extensions');
    var path = require('../../internals/path');

    module.exports = path.Reflect.preventExtensions;
});
