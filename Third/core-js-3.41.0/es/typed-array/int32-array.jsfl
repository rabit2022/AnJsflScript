define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.array-buffer.constructor');
    require('../../modules/es.array-buffer.slice');
    require('../../modules/es.typed-array.int32-array');
    require('./methods');
    var global = require('../../internals/global-this');

    module.exports = global.Int32Array;
});
