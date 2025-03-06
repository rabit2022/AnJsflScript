define(function (require, exports, module) {
    'use strict';
    require('../../../modules/esnext.array.group');
    var getBuiltInPrototypeMethod = require('../../../internals/get-built-in-prototype-method');

    module.exports = getBuiltInPrototypeMethod('Array', 'group');
});
