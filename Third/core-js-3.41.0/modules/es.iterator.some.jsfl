define(function (require, exports, module) {
    'use strict';
    var $ = require('../internals/export');
    var iterate = require('../internals/iterate');
    var aCallable = require('../internals/a-callable');
    var anObject = require('../internals/an-object');
    var getIteratorDirect = require('../internals/get-iterator-direct');

    // `Iterator.prototype.some` method
    // https://tc39.es/ecma262/#sec-iterator.prototype.some
    $(
        { target: 'Iterator', proto: true, real: true },
        {
            some: function some(predicate) {
                anObject(this);
                aCallable(predicate);
                var record = getIteratorDirect(this);
                var counter = 0;
                return iterate(
                    record,
                    function (value, stop) {
                        if (predicate(value, counter++)) return stop();
                    },
                    { IS_RECORD: true, INTERRUPTED: true }
                ).stopped;
            }
        }
    );
});
