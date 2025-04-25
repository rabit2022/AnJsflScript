/**
 * @file: Tween.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:56
 * @project: AnJsflScript
 * @description:
 */

define(['Tips'], function(Tips) {
    const { checkVariableRedeclaration } = Tips;

    /**
     * 设置旋转缓动
     * @param {Timeline} timeline
     * @param {'none'|'auto'|'clockwise'|'counter-clockwise'} motionTweenRotate 旋转方向
     * @param {number} motionTweenRotateTimes 旋转次数
     */
    function setTweenRotation(timeline, motionTweenRotate, motionTweenRotateTimes) {
        checkVariableRedeclaration(timeline, 'timeline');
        if (motionTweenRotate === undefined) {
            motionTweenRotate = 'none';
        }
        if (motionTweenRotateTimes === undefined) {
            motionTweenRotateTimes = 0;
        }

        // timeline.createMotionTween();
        timeline.setFrameProperty('motionTweenRotate', motionTweenRotate);
        timeline.setFrameProperty('motionTweenRotateTimes', motionTweenRotateTimes);
    }

    /**
     * 删除缓动
     * @param {Timeline} timeline
     * @param {number} startFrame 开始帧
     * @param {number} [endFrame] 结束帧，默认开始帧
     */
    function deleteMotionTween(timeline, startFrame, endFrame) {
        checkVariableRedeclaration(timeline, 'timeline');
        if (endFrame === undefined) endFrame = startFrame;

        timeline.setSelectedFrames(startFrame, endFrame, true);
        timeline.setFrameProperty('tweenType', 'none');
    }

    /**
     * 创建缓动
     * @param {Timeline} timeline
     * @param {'motion tween'|'shape tween'} tweenType 缓动类型
     */
    function createTween(timeline, tweenType) {
        checkVariableRedeclaration(timeline, 'timeline');
        if (tweenType === undefined) tweenType = 'motion tween';

        // print('create tween:' + tweenType);
        switch (tweenType) {
            case 'motion tween':
                timeline.createMotionTween();
                break;
            case 'shape tween':
                // print("create shape tween");
                // timeline.setFrameProperty('tweenType', 'shape');
                createShapeTween(timeline);
                break;
            default:
                throw Error('缓动类型不存在！');
        }
    }

    /**
     * 创建形状补间
     * @param {Timeline} timeline
     */
    function createShapeTween(timeline) {
        checkVariableRedeclaration(timeline, 'timeline');

        timeline.setFrameProperty('tweenType', 'shape');
    }

    /**
     * 创建智能补间
     * @param {Frame} frame 帧对象
     * @see https://community.adobe.com/t5/animate-discussions/intelligent-tween-jsfl/m-p/12875796
     */
    function createTweenIntelligent(frame) {
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
    }

    return {
        setTweenRotation: setTweenRotation,
        deleteMotionTween: deleteMotionTween,
        createTween: createTween,
        createShapeTween: createShapeTween,
        createTweenIntelligent: createTweenIntelligent
    };
});
