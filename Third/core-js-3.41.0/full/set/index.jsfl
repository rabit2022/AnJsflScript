define(function (require, exports, module) {
    'use strict';
    var parent = require('../../actual/set');
    require('../../modules/esnext.set.from');
    require('../../modules/esnext.set.of');
    require('../../modules/esnext.set.add-all');
    require('../../modules/esnext.set.delete-all');
    require('../../modules/esnext.set.every');
    require('../../modules/esnext.set.difference');
    require('../../modules/esnext.set.filter');
    require('../../modules/esnext.set.find');
    require('../../modules/esnext.set.intersection');
    require('../../modules/esnext.set.is-disjoint-from');
    require('../../modules/esnext.set.is-subset-of');
    require('../../modules/esnext.set.is-superset-of');
    require('../../modules/esnext.set.join');
    require('../../modules/esnext.set.map');
    require('../../modules/esnext.set.reduce');
    require('../../modules/esnext.set.some');
    require('../../modules/esnext.set.symmetric-difference');
    require('../../modules/esnext.set.union');

    module.exports = parent;
});
