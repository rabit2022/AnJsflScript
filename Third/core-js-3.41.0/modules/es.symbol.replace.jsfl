define(function (require, exports, module) {
    'use strict';
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

    // `Symbol.replace` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.replace
    defineWellKnownSymbol('replace');
});
