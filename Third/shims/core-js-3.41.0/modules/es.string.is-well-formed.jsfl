define(function (require, exports, module) {
    'use strict';
    var $ = require('../internals/export');
    var uncurryThis = require('../internals/function-uncurry-this');
    var requireObjectCoercible = require('../internals/require-object-coercible');
    var toString = require('../internals/to-string');

    var charCodeAt = uncurryThis(''.charCodeAt);

    // `String.prototype.isWellFormed` method
    // https://tc39.es/ecma262/#sec-string.prototype.iswellformed
    $(
        { target: 'String', proto: true },
        {
            isWellFormed: function isWellFormed() {
                var S = toString(requireObjectCoercible(this));
                var length = S.length;
                for (var i = 0; i < length; i++) {
                    var charCode = charCodeAt(S, i);
                    // single UTF-16 code unit
                    if ((charCode & 0xf800) !== 0xd800) continue;
                    // unpaired surrogate
                    if (
                        charCode >= 0xdc00 ||
                        ++i >= length ||
                        (charCodeAt(S, i) & 0xfc00) !== 0xdc00
                    )
                        return false;
                }
                return true;
            }
        }
    );
});
