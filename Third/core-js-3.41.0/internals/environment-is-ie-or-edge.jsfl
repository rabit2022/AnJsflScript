define(function (require, exports, module) {
    'use strict';
    var UA = require('../internals/environment-user-agent');

    module.exports = /MSIE|Trident/.test(UA);
});
