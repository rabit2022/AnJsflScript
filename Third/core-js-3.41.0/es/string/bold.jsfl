define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.string.bold');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('String', 'bold');
});
