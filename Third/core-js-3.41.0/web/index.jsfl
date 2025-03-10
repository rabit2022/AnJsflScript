define(function (require, exports, module) {
    'use strict';
    require('../modules/web.atob');
    require('../modules/web.btoa');
    require('../modules/web.dom-collections.for-each');
    require('../modules/web.dom-collections.iterator');
    require('../modules/web.dom-exception.constructor');
    require('../modules/web.dom-exception.stack');
    require('../modules/web.dom-exception.to-string-tag');
    require('../modules/web.immediate');
    require('../modules/web.queue-microtask');
    require('../modules/web.self');
    require('../modules/web.structured-clone');
    require('../modules/web.timers');
    require('../modules/web.url');
    require('../modules/web.url.can-parse');
    require('../modules/web.url.parse');
    require('../modules/web.url.to-json');
    require('../modules/web.url-search-params');
    require('../modules/web.url-search-params.delete');
    require('../modules/web.url-search-params.has');
    require('../modules/web.url-search-params.size');
    var path = require('../internals/path');

    module.exports = path;
});
