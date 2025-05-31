/**
 * @file: EaseCurve.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:53
 * @project: AnJsflScript
 * @description:
 */

define(["lodash"], function (_) {
    /**
     * 缓动曲线类型
     * @private
     * @readonly
     */
    var EASE_TYPES = {
        "No Ease": [5, -2, 0],
        "Classic Ease": [5, -1, 0],

        "Quad Ease-In": [5, 0, 0],
        "Cubic Ease-In": [5, 3, 0],
        "Quart Ease-In": [5, 6, 0],
        "Quint Ease-In": [5, 9, 0],
        "Sine Ease-In": [5, 12, 0],
        "Back Ease-In": [5, 15, 0],
        "Circ Ease-In": [5, 18, 0],
        "Bounce Ease-In": [5, 21, 0],
        "Elastic Ease-In": [5, 24, 0],

        "Quad Ease-Out": [5, 1, 0],
        "Cubic Ease-Out": [5, 4, 0],
        "Quart Ease-Out": [5, 7, 0],
        "Quint Ease-Out": [5, 10, 0],
        "Sine Ease-Out": [5, 13, 0],
        "Back Ease-Out": [5, 16, 0],
        "Circ Ease-Out": [5, 19, 0],
        "Bounce Ease-Out": [5, 22, 0],
        "Elastic Ease-Out": [5, 25, 0],

        "Quad Ease-In-Out": [5, 2, 0],
        "Cubic Ease-In-Out": [5, 5, 0],
        "Quart Ease-In-Out": [5, 8, 0],
        "Quint Ease-In-Out": [5, 11, 0],
        "Sine Ease-In-Out": [5, 14, 0],
        "Back Ease-In-Out": [5, 17, 0],
        "Circ Ease-In-Out": [5, 20, 0],
        "Bounce Ease-In-Out": [5, 23, 0],
        "Elastic Ease-In-Out": [5, 26, 0]
    };

    /**
     * 设置缓动曲线
     * @param {Timeline} timeline
     * @param {'No Ease'|'Classic Ease'|'Quad Ease-In'|'Cubic Ease-In'|'Quart Ease-In'|'Quint Ease-In'|'Sine Ease-In'|'Back Ease-In'|'Circ Ease-In'|'Bounce Ease-In'|'Elastic Ease-In'|'Quad Ease-Out'|'Cubic Ease-Out'|'Quart Ease-Out'|'Quint Ease-Out'|'Sine Ease-Out'|'Back Ease-Out'|'Circ Ease-Out'|'Bounce Ease-Out'|'Elastic Ease-Out'|'Quad Ease-In-Out'|'Cubic Ease-In-Out'|'Quart Ease-In-Out'|'Quint Ease-In-Out'|'Sine Ease-In-Out'|'Back Ease-In-Out'|'Circ Ease-In-Out'|'Bounce Ease-In-Out'|'Elastic Ease-In-Out'} easeCurve 缓动类型
     * @throws {Error} 缓动类型不存在
     */
    function setEaseCurve(timeline, easeCurve) {
        var easeData = EASE_TYPES[easeCurve];
        if (!easeData) {
            throw Error("缓动类型不存在！");
        }
        // timeline.createMotionTween();
        timeline.setFrameProperty("easeType", easeData[0], easeData[1], easeData[2]);
    }

    /**
     * 设置经典缓动曲线
     * @param {Timeline} timeline
     * @param {'Ease-In'|'Ease-Out'|'No Ease'} [easeInOut="No Ease"] 缓动方向
     * @param {number} [intensity=0] 缓动强度，-100~100
     */
    function setClassicEaseCurve(timeline, easeInOut, intensity) {
        if (easeInOut === undefined) {
            easeInOut = "No Ease";
        }
        if (intensity === undefined) {
            intensity = 0;
        }
        // Ease-In  -1  Ease-Out 1  No Ease 0
        var native = 0;
        switch (easeInOut) {
            case "Ease-In":
                native = -1;
                break;
            case "Ease-Out":
                native = 1;
                break;
            case "No Ease":
                native = 0;
                break;
            default:
                throw Error("缓动方向不存在！");
        }

        // print("classic ease curve:"+native*intensity)
        timeline.createMotionTween();
        var finalIntensity = native * intensity;
        if (finalIntensity !== 0) {
            timeline.setFrameProperty("easeType", 5, -1, finalIntensity);
        }
    }

    /**
     * 设置缓动曲线,并且创建补间动画
     * @param {Timeline} timeline
     * @param {number[]} KEY_FRAMES 关键帧数组
     * @param {'No Ease'|'Classic Ease'|'Quad Ease-In'|'Cubic Ease-In'|'Quart Ease-In'|'Quint Ease-In'|'Sine Ease-In'|'Back Ease-In'|'Circ Ease-In'|'Bounce Ease-In'|'Elastic Ease-In'|'Quad Ease-Out'|'Cubic Ease-Out'|'Quart Ease-Out'|'Quint Ease-Out'|'Sine Ease-Out'|'Back Ease-Out'|'Circ Ease-Out'|'Bounce Ease-Out'|'Elastic Ease-Out'|'Quad Ease-In-Out'|'Cubic Ease-In-Out'|'Quart Ease-In-Out'|'Quint Ease-In-Out'|'Sine Ease-In-Out'|'Back Ease-In-Out'|'Circ Ease-In-Out'|'Bounce Ease-In-Out'|'Elastic Ease-In-Out'} easeType 缓动类型
     */
    function setEaseCurveEx(timeline, KEY_FRAMES, easeType) {
        // 补间动画
        // 获取allKeyFrames first,last
        var firstF = _.first(KEY_FRAMES);
        var lastF = _.last(KEY_FRAMES);
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        timeline.createMotionTween();
        setEaseCurve(timeline, easeType);
    }

    return {
        /**
         * @deprecated 请使用{@link setEaseCurveEx}
         */
        setEaseCurve: setEaseCurve,
        setClassicEaseCurve: setClassicEaseCurve,
        setEaseCurveEx: setEaseCurveEx
    };
});
