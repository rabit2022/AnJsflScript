define(function (require, exports, module) {
    'use strict';
    module.exports = function (exec) {
        try {
            return { error: false, value: exec() };
        } catch (error) {
            return { error: true, value: error };
        }
    };
});
