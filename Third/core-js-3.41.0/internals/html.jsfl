define(function (require, exports, module) {
    'use strict';
    var getBuiltIn = require('../internals/get-built-in');

    module.exports = getBuiltIn('document', 'documentElement');
});
