/**
 * @file: moreElementUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 17:06
 * @project: AnJsflScript
 * @description:
 */

define(["moreElement"], function (MoreElement) {
    function MoreElementUtil() {}

    MoreElementUtil.wrapMoreElement = function (left, top, width, height) {
        var eleObj = { x: left, y: top, width: width, height: height };
        return new MoreElement(eleObj);
    };

    return MoreElementUtil;
});
