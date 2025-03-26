/// <reference path="./Constants.d.ts" />

/**
 * @file: Constants.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 20:29
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 定义帧索引值
     * @type {Object.<string, number>}
     */
    var frames = {};
    for (var i = 1; i <= 30; i++) {
        frames['FRAME_' + i] = i - 1;
    }

    /**
     * 时间常量
     * @type {number}
     */
    const SECOND_FRAME = 30;
    const MINUTE_FRAME = 60 * SECOND_FRAME;

    /**
     * 模糊度常量
     * @type {number}
     */
    const MAX_BLUR = 255;

    /**
     * 音量常量
     * @type {number}
     */
    const MAX_CHANNEL = 32768;

    /**
     * 音轨拆分长度
     * @type {number}
     * @description 音轨拆分长度，单位：帧
     *              var soundEnvelopeLimits = frame.getSoundEnvelopeLimits();
     */
    const ENVELOPE_FRAME = 1472;

    const MAX_ENVELOPE = 1073741823;

    /**
     * 模块导出对象
     * @type {Object}
     */
    var moduleExports = {
        SECOND_FRAME: SECOND_FRAME,
        MINUTE_FRAME: MINUTE_FRAME,
        MAX_BLUR: MAX_BLUR,
        MAX_CHANNEL: MAX_CHANNEL,
        ENVELOPE_FRAME: ENVELOPE_FRAME
    };

    // 将动态生成的帧索引添加到模块的公共接口中
    for (var key in frames) {
        if (Object.prototype.hasOwnProperty.call(frames, key)) {
            moduleExports[key] = frames[key];
        }
    }

    return moduleExports;
});
