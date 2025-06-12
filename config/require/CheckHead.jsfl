/**
 * @file: CheckHead.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/12 14:15
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function getProjectPath() {
        const pattern = /AnJsflScript(?:-[a-zA-Z0-9]+)?/;
        const match = fl.scriptURI.match(pattern);

        if (match) {
            const projectName = match[0];
            const index = fl.scriptURI.lastIndexOf(projectName);

            const projectPath = fl.scriptURI.substring(0, index + projectName.length);
            return projectPath;
        }

        throw new Error("Can't find project path [" + fl.scriptURI + "]");
    }

    if (typeof require === "undefined") {
        fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
    }
})();

// (function () {
//     const match = fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);
//     if (!match) throw new Error("Can't find project path [" + fl.scriptURI + "]");
//     const index = fl.scriptURI.lastIndexOf(match[0]);
//     const projectPath = fl.scriptURI.substring(0, index + match[0].length);
//     if (typeof require === "undefined")
//         fl.runScript(projectPath + "/config/require/CheckEnvironment.jsfl");
// })();

// (function () {
//     const m = fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);
//     if (!m) throw new Error("Can't find project path [" + fl.scriptURI + "]");
//     const p = fl.scriptURI.substring(0, fl.scriptURI.lastIndexOf(m[0]) + m[0].length);
//     typeof require === "undefined" &&
//         fl.runScript(p + "/config/require/CheckEnvironment.jsfl");
// })();

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
