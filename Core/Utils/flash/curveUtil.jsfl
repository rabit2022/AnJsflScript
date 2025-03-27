/**
 * @file: Curve.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:25
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 缓动曲线工具类
     * @constructor
     * @class Curve
     * @note 必须先选中帧，才能设置缓动曲线
     */
    function Curve() {}

    /**
     * 缓动曲线类型
     * @private
     * @readonly
     */
    Curve.EASE_TYPES = {
        'No Ease': [5, -2, 0],
        'Classic Ease': [5, -1, 0],

        'Quad Ease-In': [5, 0, 0],
        'Cubic Ease-In': [5, 3, 0],
        'Quart Ease-In': [5, 6, 0],
        'Quint Ease-In': [5, 9, 0],
        'Sine Ease-In': [5, 12, 0],
        'Back Ease-In': [5, 15, 0],
        'Circ Ease-In': [5, 18, 0],
        'Bounce Ease-In': [5, 21, 0],
        'Elastic Ease-In': [5, 24, 0],

        'Quad Ease-Out': [5, 1, 0],
        'Cubic Ease-Out': [5, 4, 0],
        'Quart Ease-Out': [5, 7, 0],
        'Quint Ease-Out': [5, 10, 0],
        'Sine Ease-Out': [5, 13, 0],
        'Back Ease-Out': [5, 16, 0],
        'Circ Ease-Out': [5, 19, 0],
        'Bounce Ease-Out': [5, 22, 0],
        'Elastic Ease-Out': [5, 25, 0],

        'Quad Ease-In-Out': [5, 2, 0],
        'Cubic Ease-In-Out': [5, 5, 0],
        'Quart Ease-In-Out': [5, 8, 0],
        'Quint Ease-In-Out': [5, 11, 0],
        'Sine Ease-In-Out': [5, 14, 0],
        'Back Ease-In-Out': [5, 17, 0],
        'Circ Ease-In-Out': [5, 20, 0],
        'Bounce Ease-In-Out': [5, 23, 0],
        'Elastic Ease-In-Out': [5, 26, 0]
    };

    /**
     * 设置缓动曲线
     * @param {Timeline} timeline
     * @param {"No Ease"|"Classic Ease"|"Quad Ease-In"|"Cubic Ease-In"|"Quart Ease-In"|"Quint Ease-In"|"Sine Ease-In"|"Back Ease-In"|"Circ Ease-In"|"Bounce Ease-In"|"Elastic Ease-In"|"Quad Ease-Out"|"Cubic Ease-Out"|"Quart Ease-Out"|"Quint Ease-Out"|"Sine Ease-Out"|"Back Ease-Out"|"Circ Ease-Out"|"Bounce Ease-Out"|"Elastic Ease-Out"|"Quad Ease-In-Out"|"Cubic Ease-In-Out"|"Quart Ease-In-Out"|"Quint Ease-In-Out"|"Sine Ease-In-Out"|"Back Ease-In-Out"|"Circ Ease-In-Out"|"Bounce Ease-In-Out"|"Elastic Ease-In-Out"} easeCurve 缓动类型
     */
    Curve.setEaseCurve = function (timeline, easeCurve) {
        var easeData = this.EASE_TYPES[easeCurve];
        if (!easeData) {
            throw Error('缓动类型不存在！');
        }
        // timeline.createMotionTween();
        timeline.setFrameProperty('easeType', easeData[0], easeData[1], easeData[2]);
    };

    /**
     * 设置经典缓动曲线
     * @param {Timeline} timeline
     * @param {"Ease-In"|"Ease-Out"|"No Ease"} [easeInOut="No Ease"] 缓动方向
     * @param {number} [intensity=0] 缓动强度，-100~100
     */
    Curve.setClassicEaseCurve = function (timeline, easeInOut, intensity) {
        if (easeInOut === undefined) {
            easeInOut = 'No Ease';
        }
        if (intensity === undefined) {
            intensity = 0;
        }
        // Ease-In  -1  Ease-Out 1  No Ease 0
        var native = 0;
        switch (easeInOut) {
            case 'Ease-In':
                native = -1;
                break;
            case 'Ease-Out':
                native = 1;
                break;
            case 'No Ease':
                native = 0;
                break;
            default:
                throw Error('缓动方向不存在！');
        }

        // print("classic ease curve:"+native*intensity)
        timeline.createMotionTween();
        var finalIntensity = native * intensity;
        if (finalIntensity !== 0) {
            timeline.setFrameProperty('easeType', 5, -1, finalIntensity);
        }
    };

    /**
     * 设置旋转缓动
     * @param {Timeline} timeline
     * @param {"none"|"auto"|"clockwise"|"counter-clockwise"} motionTweenRotate 旋转方向
     * @param {number} motionTweenRotateTimes 旋转次数
     */
    Curve.setTweenRotation = function (
        timeline,
        motionTweenRotate,
        motionTweenRotateTimes
    ) {
        if (motionTweenRotate === undefined) {
            motionTweenRotate = 'none';
        }
        if (motionTweenRotateTimes === undefined) {
            motionTweenRotateTimes = 0;
        }

        // timeline.createMotionTween();
        timeline.setFrameProperty('motionTweenRotate', motionTweenRotate);
        timeline.setFrameProperty('motionTweenRotateTimes', motionTweenRotateTimes);
    };

    /**
     * 删除缓动
     * @param {Timeline} timeline
     * @param {number} startFrame 开始帧
     * @param {number} [endFrame] 结束帧，默认开始帧
     */
    Curve.deleteMotionTween = function (timeline, startFrame, endFrame) {
        if (endFrame === undefined) endFrame = startFrame;

        timeline.setSelectedFrames(startFrame, endFrame, true);
        timeline.setFrameProperty('tweenType', 'none');
    };

    /**
     * 创建缓动
     * @param {Timeline} timeline
     * @param {"motion tween"|"shape tween"} tweenType 缓动类型
     */
    Curve.createTween = function (timeline, tweenType) {
        if (tweenType === undefined) tweenType = 'motion tween';

        // print('create tween:' + tweenType);
        switch (tweenType) {
            case 'motion tween':
                timeline.createMotionTween();
                break;
            case 'shape tween':
                // print("create shape tween");
                // timeline.setFrameProperty('tweenType', 'shape');
                this.createShapeTween(timeline);
                break;
            default:
                throw Error('缓动类型不存在！');
        }
    };
    /**
     * 创建形状补间
     * @param {Timeline} timeline
     */
    Curve.createShapeTween = function (timeline) {
        timeline.setFrameProperty('tweenType', 'shape');
    };

    /**
     * 创建智能补间
     * @param {Frame} frame 帧对象
     * @see https://community.adobe.com/t5/animate-discussions/intelligent-tween-jsfl/m-p/12875796
     */
    Curve.createTweenIntelligent = function (frame) {
        if (frame.elements.length > 1) return;
        var element = frame.elements[0];

        if (element.elementType === 'shape') {
            frame.tweenType = 'shape';
        } else if (element.elementType === 'instance') {
            frame.tweenType = 'motion';
            frame.motionTweenScale = true;
            frame.motionTweenRotate = 'auto';
            frame.motionTweenOrientToPath = false;
            frame.motionTweenSync = false;
            frame.motionTweenSnap = false;
        }
    };

    return Curve;
});
