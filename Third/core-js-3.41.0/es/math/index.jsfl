define(function (require, exports, module) {
    'use strict';
    require('../../modules/es.math.acosh');
    require('../../modules/es.math.asinh');
    require('../../modules/es.math.atanh');
    require('../../modules/es.math.cbrt');
    require('../../modules/es.math.clz32');
    require('../../modules/es.math.cosh');
    require('../../modules/es.math.expm1');
    require('../../modules/es.math.fround');
    require('../../modules/es.math.f16round');
    require('../../modules/es.math.hypot');
    require('../../modules/es.math.imul');
    require('../../modules/es.math.log10');
    require('../../modules/es.math.log1p');
    require('../../modules/es.math.log2');
    require('../../modules/es.math.sign');
    require('../../modules/es.math.sinh');
    require('../../modules/es.math.tanh');
    require('../../modules/es.math.to-string-tag');
    require('../../modules/es.math.trunc');
    var path = require('../../internals/path');

    module.exports = path.Math;
});
