define(function (require, exports, module) {
    'use strict';
    var $ = require('../internals/export');
    var $transfer = require('../internals/array-buffer-transfer');

    // `ArrayBuffer.prototype.transfer` method
    // https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
    if ($transfer)
        $(
            { target: 'ArrayBuffer', proto: true },
            {
                transfer: function transfer() {
                    return $transfer(
                        this,
                        arguments.length ? arguments[0] : undefined,
                        true
                    );
                }
            }
        );
});
