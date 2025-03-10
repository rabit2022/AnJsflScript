define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.object.to-string');
    require('../../modules/es.array.iterator');
    require('../../modules/es.map');
    require('../../modules/es.string.iterator');
    require('../../modules/esnext.map.from');
    require('../../modules/esnext.map.delete-all');
    require('../../modules/esnext.map.emplace');
    require('../../modules/esnext.map.every');
    require('../../modules/esnext.map.filter');
    require('../../modules/esnext.map.find');
    require('../../modules/esnext.map.find-key');
    require('../../modules/esnext.map.get-or-insert');
    require('../../modules/esnext.map.get-or-insert-computed');
    require('../../modules/esnext.map.includes');
    require('../../modules/esnext.map.key-of');
    require('../../modules/esnext.map.map-keys');
    require('../../modules/esnext.map.map-values');
    require('../../modules/esnext.map.merge');
    require('../../modules/esnext.map.reduce');
    require('../../modules/esnext.map.some');
    require('../../modules/esnext.map.update');
    require('../../modules/web.dom-collections.iterator');
    var path = require('../../internals/path');

    module.exports = path.Map.from;
});
