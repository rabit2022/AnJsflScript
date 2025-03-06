define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.array.index-of');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Array', 'indexOf');
});
