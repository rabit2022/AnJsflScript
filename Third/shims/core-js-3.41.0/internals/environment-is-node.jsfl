define(function (require, exports, module) {
    'use strict';
    var ENVIRONMENT = require('../internals/environment');

    module.exports = ENVIRONMENT === 'NODE';
});
