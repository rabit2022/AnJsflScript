define(function (require, exports, module) {
    'use strict';
    var $String = String;

    module.exports = function (argument) {
        try {
            return $String(argument);
        } catch (error) {
            return 'Object';
        }
    };
});
