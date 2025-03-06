define(function (require, exports, module) {
    'use strict';
    require('../../modules/esnext.reflect.define-metadata');
    var path = require('../../internals/path');

    module.exports = path.Reflect.defineMetadata;
});
