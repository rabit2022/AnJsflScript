define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.function.bind');
    var entryUnbind = require('../../internals/entry-unbind');

    module.exports = entryUnbind('Function', 'bind');
});
