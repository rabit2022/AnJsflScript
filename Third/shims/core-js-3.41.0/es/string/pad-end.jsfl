define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.string.pad-end');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('String', 'padEnd');
});
