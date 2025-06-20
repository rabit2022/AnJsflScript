/**
 * @file: CheckHead.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/12 14:15
 * @project: AnJsflScript
 * @description:
 */

(function() {
    function getProjectPath() {
        var pattern = fl.scriptURI.match(/(?:^|.*[\\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\\/]|$)/)[1];
        var match = fl.scriptURI.match(pattern);

        if (match) {
            var projectName = match[0];
            var index = fl.scriptURI.lastIndexOf(projectName);

            var projectPath = fl.scriptURI.substring(0, index + projectName.length);
            return projectPath;
        }

        throw new Error("Can't find project path [" + fl.scriptURI + "]");
    }

    if (typeof require === "undefined") {
        fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
        // fl.trace("project path: " + getProjectPath());
    }
})();

// @formatter:off
// prettier-ignore
// (function(){var m=fl.scriptURI.match(/(?:^|.*[\\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");var i=fl.scriptURI.lastIndexOf(m[0]);var p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
