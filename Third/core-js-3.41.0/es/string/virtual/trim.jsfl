define(function (require, exports, module) {
    'use strict';
    require('../../../modules/es.string.trim');
    var getBuiltInPrototypeMethod = require('../../../internals/get-built-in-prototype-method');

    module.exports = getBuiltInPrototypeMethod('String', 'trim');
});
