define(function (require, exports, module) {
    'use strict';
    var $ = require('../internals/export');
    var createHTML = require('../internals/create-html');
    var forcedStringHTMLMethod = require('../internals/string-html-forced');

    // `String.prototype.sub` method
    // https://tc39.es/ecma262/#sec-string.prototype.sub
    $(
        {
            target: 'String',
            proto: true,
            forced: forcedStringHTMLMethod('sub')
        },
        {
            sub: function sub() {
                return createHTML(this, 'sub', '', '');
            }
        }
    );
});
