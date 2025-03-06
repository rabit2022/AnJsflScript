define(function (require, exports, module) {
    'use strict';
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

    // `Symbol.metadata` well-known symbol
    // https://github.com/tc39/proposal-decorators
    defineWellKnownSymbol('metadata');
});
