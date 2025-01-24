/**
 * @file: PointUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 16:43
 * @project: AnJsflScript
 * @description:
 */

function PointUtil() {

}

/**
 * 获取 摇头 的 变形点
 * @param {Element} element 元件
 * @param {Number} [ratio=5/6] 缩放比例
 * @returns {*}
 */
PointUtil.prototype.getShakeHeadTrPoint = function (element,ratio) {
    if (ratio === undefined){
        ratio = 5/6;
    }
    // x:中间位置, y: height*5/6
    // element
    var elePos = wrapPosition(element);
    var eleRect = wrapRectByElement(element);

    // trPoint
    var botttomPart = eleRect.getPart("bottom", 1-ratio);
    var trPointWorld = botttomPart.getCorner("top center");

    var trPointLocal = trPointWorld.sub(elePos);

    return trPointLocal;
}

var pointUtil = new PointUtil();