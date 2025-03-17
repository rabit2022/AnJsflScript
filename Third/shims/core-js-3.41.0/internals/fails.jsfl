define(function (require, exports, module) {
    'use strict';
    module.exports = function (exec) {
        try {
            return !!exec();
        } catch (error) {
            return true;
        }
    };
});
