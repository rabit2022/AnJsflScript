define(function (require, exports, module) {
    'use strict';
    // TODO: Remove from `core-js@4`
    // https://github.com/tc39/proposal-async-explicit-resource-management
    require('../modules/esnext.suppressed-error.constructor');
    require('../modules/esnext.async-disposable-stack.constructor');
    require('../modules/esnext.async-iterator.async-dispose');
    require('../modules/esnext.symbol.async-dispose');
});
