define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.object.define-getter');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Object', '__defineGetter__');
});
