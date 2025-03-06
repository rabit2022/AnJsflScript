define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.set');
    require('../../modules/es.set.is-disjoint-from.v2');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Set', 'isDisjointFrom');
});
