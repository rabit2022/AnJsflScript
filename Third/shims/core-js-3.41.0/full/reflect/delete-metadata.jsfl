define(function (require, exports, module) {
    'use strict';
    require('../../modules/esnext.reflect.delete-metadata');
    var path = require('../../internals/path');

    module.exports = path.Reflect.deleteMetadata;
});
