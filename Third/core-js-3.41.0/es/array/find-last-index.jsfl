define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.array.find-last-index');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Array', 'findLastIndex');
});
