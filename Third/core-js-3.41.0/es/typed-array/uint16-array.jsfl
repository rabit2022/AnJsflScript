define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.array-buffer.constructor');
    require('../../modules/es.array-buffer.slice');
    require('../../modules/es.typed-array.uint16-array');
    require('./methods');
    var global = require('../../internals/global-this');

    module.exports = global.Uint16Array;
});
