/**
 * @file: Constants.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 20:29
 * @project: AnJsflScript
 * @description:
 */

(function (root, factory) {
    "use strict";
    root["$Constants"] = factory();
}(this, function () {
// 第n帧的索引值
    var FRAME_1 = 1 - 1;
    var FRAME_2 = 2 - 1;
    var FRAME_3 = 3 - 1;
    var FRAME_4 = 4 - 1;
    var FRAME_5 = 5 - 1;
    var FRAME_6 = 6 - 1;
    var FRAME_7 = 7 - 1;
    var FRAME_8 = 8 - 1;
    var FRAME_9 = 9 - 1;
    var FRAME_10 = 10 - 1;
    var FRAME_11 = 11 - 1;
    var FRAME_12 = 12 - 1;


// 时间--帧数
    var SECOND_FRAME = 30;
    var MINUTE_FRAME = 60 * SECOND_FRAME;

// 模糊度
    var MAX_BLUR = 255;

// 音量
// 最大通道值
    var MAX_CHANNEL = 32768;
    return {
        FRAME_1: FRAME_1,
        FRAME_2: FRAME_2,
        FRAME_3: FRAME_3,
        FRAME_4: FRAME_4,
        FRAME_5: FRAME_5,
        FRAME_6: FRAME_6,
        FRAME_7: FRAME_7,
        FRAME_8: FRAME_8,
        FRAME_9: FRAME_9,
        FRAME_10: FRAME_10,
        FRAME_11: FRAME_11,
        FRAME_12: FRAME_12,
        SECOND_FRAME: SECOND_FRAME,
        MINUTE_FRAME: MINUTE_FRAME,
        MAX_BLUR: MAX_BLUR,
        MAX_CHANNEL: MAX_CHANNEL
    };
}));
