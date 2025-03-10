define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.object.to-string');
    require('../../modules/es.array.iterator');
    require('../../modules/es.set');
    require('../../modules/es.string.iterator');
    require('../../modules/esnext.set.from');
    require('../../modules/esnext.set.add-all');
    require('../../modules/esnext.set.delete-all');
    require('../../modules/esnext.set.difference.v2');
    require('../../modules/esnext.set.every');
    require('../../modules/esnext.set.filter');
    require('../../modules/esnext.set.find');
    require('../../modules/esnext.set.join');
    require('../../modules/esnext.set.intersection.v2');
    require('../../modules/esnext.set.is-disjoint-from.v2');
    require('../../modules/esnext.set.is-subset-of.v2');
    require('../../modules/esnext.set.is-superset-of.v2');
    require('../../modules/esnext.set.map');
    require('../../modules/esnext.set.reduce');
    require('../../modules/esnext.set.some');
    require('../../modules/esnext.set.symmetric-difference.v2');
    require('../../modules/esnext.set.union.v2');
    require('../../modules/web.dom-collections.iterator');
    var path = require('../../internals/path');

    module.exports = path.Set.from;
});
