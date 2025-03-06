define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.date.to-string');
    var uncurryThis = require('../../internals/function-uncurry-this');

    module.exports = uncurryThis(Date.prototype.toString);
});
