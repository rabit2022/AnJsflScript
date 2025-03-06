define(function (require, exports, module) {
    'use strict';
    var parent = require('../../stable/iterator/from');
    require('../../modules/es.promise');
    require('../../modules/esnext.iterator.constructor');
    require('../../modules/esnext.iterator.dispose');
    require('../../modules/esnext.iterator.drop');
    require('../../modules/esnext.iterator.every');
    require('../../modules/esnext.iterator.filter');
    require('../../modules/esnext.iterator.find');
    require('../../modules/esnext.iterator.flat-map');
    require('../../modules/esnext.iterator.for-each');
    require('../../modules/esnext.iterator.from');
    require('../../modules/esnext.iterator.map');
    require('../../modules/esnext.iterator.reduce');
    require('../../modules/esnext.iterator.some');
    require('../../modules/esnext.iterator.take');
    require('../../modules/esnext.iterator.to-array');
    require('../../modules/esnext.iterator.to-async');

    module.exports = parent;
});
