define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.string.italics');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('String', 'italics');
});
