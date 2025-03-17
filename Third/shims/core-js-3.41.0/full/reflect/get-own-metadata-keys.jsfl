define(function (require, exports, module) {
    'use strict';
    require('../../modules/esnext.reflect.get-own-metadata-keys');
    var path = require('../../internals/path');

    module.exports = path.Reflect.getOwnMetadataKeys;
});
