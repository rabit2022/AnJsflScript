define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.object.to-string');
    require('../../modules/es.promise');
    require('../../modules/esnext.async-iterator.constructor');
    require('../../modules/esnext.async-iterator.as-indexed-pairs');

    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('AsyncIterator', 'asIndexedPairs');
});
