define(function (require, exports, module) {
    'use strict';
    var wellKnownSymbol = require('../internals/well-known-symbol');
    var create = require('../internals/object-create');
    var defineProperty = require('../internals/object-define-property').f;

    var UNSCOPABLES = wellKnownSymbol('unscopables');
    var ArrayPrototype = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] === undefined) {
        fl.trace('add a key to Array.prototype[@@unscopables]');

        defineProperty(ArrayPrototype, UNSCOPABLES, {
            configurable: true,
            value: create(null)
        });

        fl.trace('add a key to Array.prototype[@@unscopables] done');
    }

    // add a key to Array.prototype[@@unscopables]
    module.exports = function (key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
    };
});
