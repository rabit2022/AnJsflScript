define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.date.to-iso-string');
    require('../../modules/es.date.to-json');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Date', 'toISOString');
});
