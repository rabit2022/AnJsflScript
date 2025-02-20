/**
 * @file: Constants.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 20:29
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    // 第n帧的索引值
    var frames = {};
    for (var i = 1; i <= 30; i++) {
        frames["FRAME_" + i] = i - 1;
    }

    // 时间--帧数
    var SECOND_FRAME = 30;
    var MINUTE_FRAME = 60 * SECOND_FRAME;

    // 模糊度
    var MAX_BLUR = 255;

    // 音量
    // 最大通道值
    var MAX_CHANNEL = 32768;

    /**
     * 模块公共接口
     // * @typedef {Object} Constants
     * @property {number} FRAME_1 - 第1帧的索引
     * @property {number} FRAME_2 - 第2帧的索引
     * @property {number} FRAME_3 - 第3帧的索引
     * @property {number} FRAME_4 - 第4帧的索引
     * @property {number} FRAME_5 - 第5帧的索引
     * @property {number} FRAME_6 - 第6帧的索引
     * @property {number} FRAME_7 - 第7帧的索引
     * @property {number} FRAME_8 - 第8帧的索引
     * @property {number} FRAME_9 - 第9帧的索引
     * @property {number} FRAME_10 - 第10帧的索引
     * @property {number} FRAME_11 - 第11帧的索引
     * @property {number} FRAME_12 - 第12帧的索引
     * @property {number} FRAME_13 - 第13帧的索引
     * @property {number} FRAME_14 - 第14帧的索引
     * @property {number} FRAME_15 - 第15帧的索引
     * @property {number} FRAME_16 - 第16帧的索引
     * @property {number} FRAME_17 - 第17帧的索引
     * @property {number} FRAME_18 - 第18帧的索引
     * @property {number} FRAME_19 - 第19帧的索引
     * @property {number} FRAME_20 - 第20帧的索引
     * @property {number} FRAME_21 - 第21帧的索引
     * @property {number} FRAME_22 - 第22帧的索引
     * @property {number} FRAME_23 - 第23帧的索引
     * @property {number} FRAME_24 - 第24帧的索引
     * @property {number} FRAME_25 - 第25帧的索引
     * @property {number} FRAME_26 - 第26帧的索引
     * @property {number} FRAME_27 - 第27帧的索引
     * @property {number} FRAME_28 - 第28帧的索引
     * @property {number} FRAME_29 - 第29帧的索引
     * @property {number} FRAME_30 - 第30帧的索引
     * @property {number} SECOND_FRAME - 每秒的帧数
     * @property {number} MINUTE_FRAME - 每分钟的帧数
     * @property {number} MAX_BLUR - 最大模糊度
     * @property {number} MAX_CHANNEL - 最大通道值
     */
    var moduleExports = {
        SECOND_FRAME: SECOND_FRAME,
        MINUTE_FRAME: MINUTE_FRAME,
        MAX_BLUR: MAX_BLUR,
        MAX_CHANNEL: MAX_CHANNEL
        // DEBUG_MODE: DEBUG_MODE
    };

    // 将动态生成的帧索引添加到模块的公共接口中
    for (var key in frames) {
        if (frames.hasOwnProperty(key)) {
            moduleExports[key] = frames[key];
        }
    }

    return moduleExports;
});