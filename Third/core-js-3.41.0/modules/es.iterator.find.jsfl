define(function (require, exports, module) {
    'use strict';
    var $ = require('../internals/export');
    var iterate = require('../internals/iterate');
    var aCallable = require('../internals/a-callable');
    var anObject = require('../internals/an-object');
    var getIteratorDirect = require('../internals/get-iterator-direct');

    // `Iterator.prototype.find` method
    // https://tc39.es/ecma262/#sec-iterator.prototype.find
    $(
        { target: 'Iterator', proto: true, real: true },
        {
            find: function find(predicate) {
                anObject(this);
                aCallable(predicate);
                var record = getIteratorDirect(this);
                var counter = 0;
                return iterate(
                    record,
                    function (value, stop) {
                        if (predicate(value, counter++)) return stop(value);
                    },
                    { IS_RECORD: true, INTERRUPTED: true }
                ).result;
            }
        }
    );
});
