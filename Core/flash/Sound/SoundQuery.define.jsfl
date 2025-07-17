// 这个文件由脚本 SoundQuery.define.ts 自动生成，任何手动修改都将会被覆盖.
define(["require", "exports", "os", "loglevel"], function (require, exports, os, log) {
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
    var SOUND_DURATION_PS1 = os.path.join(ScriptsDir, "Get-AudioDurations.ps1");
    function getAudioDurations(soundInfo) {
        var _a = soundInfo.FRAME, frame = _a.frame, frameIndex = _a.frameIndex;
        var _b = soundInfo.LAYER, layer = _b.layer, layerIndex = _b.layerIndex, layerName = _b.layerName;
        var _c = soundInfo.ITEM, item = _c.item, itemName = _c.itemName, path = _c.path;
        if (path) {
            var _d = os.path.splitext(path), _1 = _d[0], ext = _d[1];
            if (ext === ".mp3" || ext === ".wav") {
                var baseName = getBasename(path);
                var exportPathURI = os.path.join(EXPORT_DIR, "".concat(layerName, "_").concat(frameIndex, "_").concat(itemName).concat(ext));
                var success = item.exportToFile(exportPathURI);
                if (success) {
                    var exportPath = FLfile.uriToPlatformPath(exportPathURI);
                    var powershellCommand = "& \"".concat(SOUND_DURATION_PS1, "\" -Path \"").concat(exportPathURI, "\"");
                    var duration = os.system(powershellCommand);
                    log.info("duration:".concat(duration));
                }
            }
        }
    }
    exports.getAudioDurations = getAudioDurations;
});
