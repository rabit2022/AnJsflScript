define(function (require, exports, module) {
    'use strict';
    require('../modules/web.queue-microtask');
    var path = require('../internals/path');

    module.exports = path.queueMicrotask;
});
