/**
 * @file: ElementAnim.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 21:38
 * @project: AnJsflScript
 * @description:
 */

define(["ElementChecker"], function (ec) {
    const { IsSymbol } = ec;

    /**
     * 播放一次
     * @param {Element[]|Element} [elements===undefined] 元素数组
     * @param {'loop'|'play once'|'single frame'|'loop reverse'|'play once reverse'} mode 播放模式
     */
    function SetLoopMode(elements, mode) {
        // 没有元素
        if (!elements) {
            // 直接设置元素属性
            doc.setElementProperty("loop", mode);
            return;
        }


        // 单个元素
        if (!Array.isArray(elements)) {
            element = elements;
            elements = [element];
        }
        // 指定了元素数组
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (IsSymbol(element)) {
                element.loop = mode;
            }
        }
    }

    /**
     * 循环播放
     * @param {Element[]|Element} [elements] 元素数组
     */
    function playLoop(elements) {
        SetLoopMode(elements, "loop");
    }

    /**
     * 播放一次
     * @param {Element[]|Element} [elements]元素数组
     */
    function playOnce(elements) {
        SetLoopMode(elements, "play once");
    }

    /**
     * 单帧播放
     * @param {Element[]|Element} [elements] 元素数组
     */
    function playSingleFrame(elements) {
        SetLoopMode(elements, "single frame");
    }

    /**
     * 循环播放倒序
     * @param {Element[]|Element} [elements] 元素数组
     */
    function playLoopReverse(elements) {
        SetLoopMode(elements, "loop reverse");
    }

    /**
     * 播放一次倒序
     * @param {Element[]|Element} [elements] 元素数组
     */
    function playOnceReverse(elements) {
        SetLoopMode(elements, "play once reverse");
    }

    return {
        SetLoopMode: SetLoopMode,
        playOnce: playOnce,
        playLoop: playLoop,
        playSingleFrame: playSingleFrame,
        playLoopReverse: playLoopReverse,
        playOnceReverse: playOnceReverse
    };
});
