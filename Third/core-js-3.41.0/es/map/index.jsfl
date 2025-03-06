define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.array.iterator');
    require('../../modules/es.map');
    require('../../modules/es.map.group-by');
    require('../../modules/es.object.to-string');
    require('../../modules/es.string.iterator');
    var path = require('../../internals/path');

    module.exports = path.Map;
});
