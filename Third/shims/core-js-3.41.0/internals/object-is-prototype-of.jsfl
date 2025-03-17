define(function (require, exports, module) {
    'use strict';
    var uncurryThis = require('../internals/function-uncurry-this');

    module.exports = uncurryThis({}.isPrototypeOf);
});
