define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.weak-map');
    require('../../modules/esnext.weak-map.delete-all');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('WeakMap', 'deleteAll');
});
