/**
 * @file: xml-pollyfill.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/7 20:04
 * @project: AnJsflScript
 * @description:
 */

(function() {
    // fast-xml-parser   es2019
    // String.prototype.trimStart
    if (!String.prototype.trimStart) {
        String.prototype.trimStart = function() {
            return this.replace(/^\s+/, '');
        };
    }

    // XUL  need     es6
    // es6-collections   WeakMap
    require(['es6-collections']);
})();
