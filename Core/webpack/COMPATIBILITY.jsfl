/**
 * @file: COMPATIBILITY.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/18 18:57
 * @project: AnJsflScript
 * @description:
 */
define(["os"], function(os) {
    /**
     * @description: 兼容requirejs的text插件
     * @param {string} textPluginPath: text插件的 相对路径
     * @return {string}: flash 的实际uri
     */
    function __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__(textPluginPath) {
        const scriptPath = os.path.join(os.getcwd(), textPluginPath);
        return "text!" + scriptPath;
    }

    /**
     * @description: 兼容requirejs的text插件
     * @param {string} textPluginPath: text插件的 绝对路径
     * @return {string}: flash 的实际uri
     */
    function __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__(textPluginPath) {
        const absolutePath = window.AnJsflScript.$ProjectFileDir$;

        const scriptPath = os.path.join(absolutePath, textPluginPath);
        return "text!" + scriptPath;
    }

    /**
     * @description: 兼容requirejs的text插件
     * @note: raw-loader: {"__esModule": true,"default": "..."}
     * @param {string} text: 读取的 text
     * @return {string}: 兼容的 text
     */
    function __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__(text) {
        return text.default || text;
    }

    return {
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__: __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__: __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__,
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__: __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__
    }

});