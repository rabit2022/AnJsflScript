/**
 * @file: SoundChecker.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/16 22:42
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// @ts-expect-error
import { FrameRange } from "SAT";
// @ts-expect-error
import { getKeyFrameRanges } from "KeyFrameQuery";
// @ts-expect-error
import os = require("os");
import { ISoundInfo } from "SoundChecker";


// ===============Third Party======================
import log = require("loglevel");

// endregion import

const getBasename = os.path.$basenameWithoutExt;

/**
 * @note:{@link FlashSoundItem.bitRate}
 * 此属性仅适用于 MP3 压缩类型。可接受的值为 "8 kbps"、 "16 kbps"、 "20 kbps"、"24 kbps"、"32 kbps"、"48 kbps"、"56 kbps"、"64 kbps"、"80 kbps"、"112 kbps"、"128 kbps" 和 "160 kbps"。
 * 以 8 Kbps 或 16 Kbps 导出的立体声声音将转换为单声道声音。
 * 对于其他压缩类型，该属性为 undefined。
 * @note: 对应大部分的音频输出为 undefined,因此暂时没有办法获取音频时长，尽管面板中有
 * @deprecated: 已经废弃，请使用{@link getAudioDurations}
 */
function getAudioDurationsNative(item: FlashSoundItem) {
    var path = item.sourceFilePath;
    let [_, ext] = os.path.splitext(path);


    var size = FLfile.getSize(path);

    if (ext === "mp3") {
        // bitRate 经常为undefined
        var kbps = item.bitRate ? parseInt(item.bitRate.slice(0, -5)) : null;
        if (!kbps) return null;

        var secs = (size * 8) / (1000 * kbps);
        return secs;
    }
    return null;
}

const CacheDir = window.AnJsflScript.FOLDERS.Cache;
const EXPORT_DIR = os.path.join(CacheDir, "Audio");

const ScriptsDir = window.AnJsflScript.FOLDERS.Scripts;
const SOUND_DURATION_PS1 = os.path.join(ScriptsDir, "Get-AudioDurations.ps1");

function getAudioDurations(soundInfo: ISoundInfo) {
    let { frame, frameIndex } = soundInfo.FRAME;
    let { layer, layerIndex, layerName } = soundInfo.LAYER;
    let { item, itemName, path } = soundInfo.ITEM;


    // 导出所有音频到Cache目录
    if (path) {
        let [_, ext] = os.path.splitext(path);
        // log.info(`ext:${ext}`);
        if (ext === ".mp3" || ext === ".wav") {
            let baseName: string = getBasename(path);
            let exportPathURI: string = os.path.join(EXPORT_DIR, `${baseName}${ext}`);
            let success = item.exportToFile(exportPathURI);
            if (success) {

                let exportPath = FLfile.uriToPlatformPath(exportPathURI);
                let powershellCommand = `& "${SOUND_DURATION_PS1}" -Path "${exportPath}"`;

                // 调用ps1脚本，查看文件元信息，获取时长信息
                let duration = os.system(powershellCommand);
                log.info(`duration:${duration}`);
            }
        }
    }




    // 把 时长 记录到 soundInfo中
}


// exports.hasSound = hasSound;
// exports.hasSoundAll = hasSoundAll;
exports.getAudioDurations = getAudioDurations;
