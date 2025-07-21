/**
 * @file: 08.音画同步.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/16 22:33
 * @project: AnJsflScript
 * @description: 效果比较唬人，实际测试后，只有如下的几点修正：
 * 1. 属性-帧-声音--同步：设置数据流，确保声音 正常播放。
 * 2. 音频文件 > xx 秒时,提示音画不同步
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import os = require("os");

import { getAudioDurations } from "SoundQuery";
import { hasSoundAll, ISoundInfo } from "SoundChecker";

// ===============Third Party======================
import log = require("loglevel");
// endregion import

// region doc
var doc = fl.getDocumentDOM(); //文档
if (!CheckDom(doc)) {
    //@ts-ignore
    return;
}

var selection = doc.selection; //选择
var library = doc.library; //库文件
var timeline = doc.getTimeline(); //时间轴

var layers = timeline.layers; //图层
var curLayerIndex = timeline.currentLayer; //当前图层索引
var curLayer = layers[curLayerIndex]; //当前图层

var _frames = curLayer.frames; //当前图层的帧列表
var curFrameIndex = timeline.currentFrame; //当前帧索引
var curFrame = _frames[curFrameIndex]; //当前帧

// // 获取第一帧
// var selectedFrames = CheckSelectedFrames(timeline);
// if (!selectedFrames) {// @ts-ignore
//     return;
// }
// const {firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame} = selectedFrames;

// 检查选择的元件
if (!CheckSelection(selection, "selectElement", "No limit")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

let HAS_FIXED = false;

function Main() {
    let soundInfos: ISoundInfo[] = hasSoundAll(timeline);
    if (soundInfos.length === 0) {
        log.info("当前没有声音");
        return;
    }

    // 创建  soundItem.sourceFilePath ： platformPath

    // for of
    for (let soundInfo of soundInfos) {
        // log.info(soundInfo);
        let { frame, frameIndex } = soundInfo.FRAME;
        let { layer, layerIndex, layerName } = soundInfo.LAYER;

        // 设置数据流
        if (frame.soundSync !== "stream") {
            frame.soundSync = "stream";
            let info = `【问题】  在本场景第 [${layerIndex + 1}] 个图层 : [${layerName}]  ，第 [${frameIndex + 1}] 帧处，音频同步不是"数据流" --- 已自动修复！`;
            fl.trace(info);
            HAS_FIXED = true;
        }

        let { item, itemName, path } = soundInfo.ITEM;

        // "file:///C|/Users/admin/Downloads/嗯_.mp3"
        if (path) {
            let [_, ext] = os.path.splitext(path);
            // log.info(`ext:${ext}`);
            if (ext === ".mp3" || ext === ".wav") {
                getAudioDurations(soundInfo);

                // 提醒 时长过长，按照格式 进行提示
                // log.info(soundInfo.THIRD.SECONDS)
                let secs = soundInfo.THIRD.SECONDS;
                if (secs > 60) {
                    fl.trace(
                        `【问题】  在本场景第 [${layerIndex + 1}] 个图层 : [${layerName}]  ，第 [${frameIndex + 1}] 帧处，音频文件“${frame.soundName}”时长超过60秒！建议导入AN前用剪辑软件拆分，否则音画不同步。`
                    );
                    HAS_FIXED = true;
                }
            }
        }
    }

    if (!HAS_FIXED) {
        let info = `【提示】  当前场景未发现音画不同步问题。若仍不同步，建议使用AN的 [文件-导出-导出影片] 来导出序列帧，结合使用插件的 [高阶面板-导出音轨] 导出音频`;
        fl.trace(info);
    } else {
        let info = `【提示】  音频同步完成！`;
        fl.trace(info);
    }
}

Main();
