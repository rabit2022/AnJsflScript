define(function (require, exports, module) {
    'use strict';
    require('../../../modules/es.array.slice');
    var getBuiltInPrototypeMethod = require('../../../internals/get-built-in-prototype-method');

    module.exports = getBuiltInPrototypeMethod('Array', 'slice');
});
