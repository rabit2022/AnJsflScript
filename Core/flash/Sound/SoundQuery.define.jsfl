// 这个文件由脚本 SoundQuery.define.ts 自动生成，任何手动修改都将会被覆盖.
define(["require", "exports", "os", "loglevel", "luxon"], function (require, exports, os, log, luxon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getBasename = os.path.$basenameWithoutExt;
    function getAudioDurationsNative(item) {
        var path = item.sourceFilePath;
        var _a = os.path.splitext(path), _ = _a[0], ext = _a[1];
        var size = FLfile.getSize(path);
        if (ext === "mp3") {
            var kbps = item.bitRate ? parseInt(item.bitRate.slice(0, -5)) : null;
            if (!kbps)
                return null;
            var secs = (size * 8) / (1000 * kbps);
            return secs;
        }
        return null;
    }
    var CacheDir = window.AnJsflScript.FOLDERS.Cache;
    var EXPORT_DIR = os.path.join(CacheDir, "Audio");
    var ScriptsDir = window.AnJsflScript.FOLDERS.Scripts;
    var SOUND_DURATION_PS1_URI = os.path.join(ScriptsDir, "Audio", "Get-AudioDurations.ps1");
    var SOUND_DURATION_PS1 = FLfile.uriToPlatformPath(SOUND_DURATION_PS1_URI);
    function getAudioDurations(soundInfo) {
        var _a = soundInfo.ITEM, item = _a.item, itemName = _a.itemName, path = _a.path;
        if (path) {
            var _b = os.path.splitext(path), _1 = _b[0], ext = _b[1];
            if (ext === ".mp3" || ext === ".wav") {
                var baseName = getBasename(path);
                var exportPathURI = os.path.join(EXPORT_DIR, "".concat(baseName).concat(ext));
                log.info("exportPathURI:".concat(exportPathURI));
                var success = item.exportToFile(exportPathURI);
                if (success) {
                    log.info("export success:".concat(success));
                    var exportPath = FLfile.uriToPlatformPath(exportPathURI);
                    log.info("exportPath:".concat(exportPath));
                    var powershellCommand = "& '".concat(SOUND_DURATION_PS1, "' -Path '").concat(exportPath, "'");
                    var duration = os.system(powershellCommand);
                    var sec = parseDuration(duration);
                    soundInfo.THIRD.SECONDS = sec;
                }
            }
        }
    }
    function parseDuration(duration) {
        var _a = duration.split(":").map(Number), h = _a[0], m = _a[1], s = _a[2];
        var dur = luxon_1.Duration.fromObject({ hours: h, minutes: m, seconds: s });
        var sec = dur.as("seconds");
        return sec;
    }
    exports.getAudioDurations = getAudioDurations;
});
