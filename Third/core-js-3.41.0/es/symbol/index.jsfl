define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.array.concat');
    require('../../modules/es.object.to-string');
    require('../../modules/es.symbol');
    require('../../modules/es.symbol.async-iterator');
    require('../../modules/es.symbol.description');
    require('../../modules/es.symbol.has-instance');
    require('../../modules/es.symbol.is-concat-spreadable');
    require('../../modules/es.symbol.iterator');
    require('../../modules/es.symbol.match');
    require('../../modules/es.symbol.match-all');
    require('../../modules/es.symbol.replace');
    require('../../modules/es.symbol.search');
    require('../../modules/es.symbol.species');
    require('../../modules/es.symbol.split');
    require('../../modules/es.symbol.to-primitive');
    require('../../modules/es.symbol.to-string-tag');
    require('../../modules/es.symbol.unscopables');
    require('../../modules/es.json.to-string-tag');
    require('../../modules/es.math.to-string-tag');
    require('../../modules/es.reflect.to-string-tag');
    var path = require('../../internals/path');

    module.exports = path.Symbol;
});
