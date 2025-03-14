define((require, exports, module) => {
    log('math module loaded');
    ('use strict');

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    // 导出模块接口
    exports.add = add;
    exports.subtract = subtract;
});
