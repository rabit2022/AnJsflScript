/**
 * @file: Error.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/18 18:14
 * @project: AnJsflScript
 * @description:
 */

define(['FUNC'], function (FUNC) {
    const { INHERIT_MACRO } = FUNC;

    // Not implemented'
    function NotImplementedError(message) {
        // 调用原生 Error 构造函数
        Error.call(this, message);
        this.message = message || 'Not implemented'; // 设置错误信息
        this.name = 'NotImplementedError'; // 设置错误名称
        this.stack = new Error().stack; // 捕获调用栈信息
    }

    // 继承 Error 的原型
    INHERIT_MACRO(NotImplementedError, Error);

    // throw new NotImplementedError('Not implemented,please implement it by yourself.');
    return {
        NotImplementedError: NotImplementedError
    };
});
