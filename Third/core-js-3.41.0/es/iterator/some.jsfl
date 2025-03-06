define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.object.to-string');
    require('../../modules/es.iterator.constructor');
    require('../../modules/es.iterator.some');

    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Iterator', 'some');
});
