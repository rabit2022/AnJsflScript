define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.string.fontcolor');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('String', 'fontcolor');
});
