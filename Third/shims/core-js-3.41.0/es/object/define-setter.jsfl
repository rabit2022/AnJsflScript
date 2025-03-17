define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.object.define-setter');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Object', '__defineSetter__');
});
