/**
 * @file: document-cookie.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/26 18:32
 * @project: AnJsflScript
 * @description:
 */

/**
 *
 * ### `document.cookie`
 *     `document.cookie` 是 `document` 对象的一个属性，用于访问和操作浏览器的 cookie。Cookie 是存储在用户浏览器中的小段文本数据，通常用于跟踪用户会话、保存用户偏好设置或实现其他需要持久化存储的功能。
 *
 * #### 主要用途
 * 1. **存储用户会话信息**：例如，登录状态、用户 ID 等。
 * 2. **保存用户偏好设置**：如主题模式、语言偏好等。
 * 3. **跟踪用户行为**：用于分析用户行为或实现广告跟踪。
 *
 * #### 属性特点
 * - **读取时**：`document.cookie` 返回一个字符串，包含当前网站的所有 cookie，格式为 `key1=value1; key2=value2`。
 * - **写入时**：通过设置 `document.cookie`，可以添加或更新 cookie。写入时需要指定键值对，还可以设置额外的属性，如 `expires`（过期时间）、`path`（路径）、`domain`（域名）等。
 *
 * ### 示例代码
 * 以下是一些常见的 `document.cookie` 操作示例：
 *
 * #### 1. **设置 Cookie**
 * ```javascript
 * document.cookie = "name=John; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
 * document.cookie = "age=25; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
 * ```
 *
 * #### 2. **读取 Cookie**
 * ```javascript
 * console.log(document.cookie); // 输出: name=John; age=25
 * ```
 *
 * #### 3. **更新 Cookie**
 * ```javascript
 * document.cookie = "name=Jane; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
 * console.log(document.cookie); // 输出: name=Jane; age=25
 * ```
 *
 * #### 4. **删除 Cookie**
 * 通过设置一个过去的过期时间来删除 cookie：
 * ```javascript
 * document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
 * console.log(document.cookie); // 输出: age=25
 * ```
 *
 * ### 重要注意事项
 * 1. **编码问题**：
 *    - 在设置和读取 cookie 时，需要对键和值进行编码和解码。可以使用 `escape` 和 `unescape` 函数（虽然它们在现代 JavaScript 中不推荐使用），或者使用 `encodeURIComponent` 和 `decodeURIComponent`。
 *
 * 2. **存储限制**：
 *    - 浏览器对 cookie 的存储有大小限制，通常为 4KB 左右。如果存储的数据过多，可能会导致某些 cookie 无法正确保存。
 *
 * 3. **安全性**：
 *    - Cookie 可以被用户浏览器访问，因此不适合存储敏感信息（如密码）。如果需要存储敏感信息，建议使用 `localStorage` 或 `sessionStorage`，并结合 HTTPS 以确保数据传输的安全性。
 *
 * 4. **跨域问题**：
 *    - Cookie 默认只在设置它们的域名下可用。如果需要跨域访问，需要在设置 cookie 时指定 `domain` 属性。
 */
define(["universal-cookie"], function(Cookie) {
// document.cookie
    /**
     * 由于 `document.cookie` 的 特殊性，我们需要自定义一个属性来访问和操作 cookie。
     * 并且某些第三方库 (如 `loglevel` 用于记录日志等级,`store.js`用于存储数据等) 也使用了 `document.cookie`，因此我们需要修改它们的实现。
     * 如果不修改，则会导致 `document.cookie` ，每一次的设置 是 覆盖 之前的设置，这会导致一些问题。
     */
    var _cookie = new Cookie();

    function getCookie() {
        return _cookie.toString();
    }

    function setCookie(cookieString) {
        var newCookie = new Cookie(cookieString);
        var oldCookie = _cookie;

        // cookies 存有 cookie 解析后的对象，这里需要合并
        var properties = Object.assign(Object.assign({}, oldCookie.cookies), newCookie.cookies);

        oldCookie.cookies = properties;
        _cookie = oldCookie;
    }

    Object.defineProperty(document, "cookie", {
        get: getCookie, set: setCookie, enumerable: true, configurable: true
    });

    // fl.trace("[IMPORT] document-cookie loaded")

    /**
     // document.cookie = "name=John; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
     // fl.trace(document.cookie); // 输出: name=John

     console.log("=======================");
     document.cookie= "age=; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
     fl.trace(document.cookie); // 输出: name=John; age=25
     console.log("=======================");
     */

});

