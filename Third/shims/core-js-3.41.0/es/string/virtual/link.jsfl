define(function (require, exports, module) {
    'use strict';
    require('../../../modules/es.string.link');
    var getBuiltInPrototypeMethod = require('../../../internals/get-built-in-prototype-method');

    module.exports = getBuiltInPrototypeMethod('String', 'link');
});
