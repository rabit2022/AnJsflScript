/**
 * @file: DrawCircle.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/2 18:26
 * @project: AnJsflScript
 * @description:
 */

define(["SAT"], function(SAT) {
    const { Rectangle, Vector } = SAT;
    //
    // /**
    //  * 画圆，不要填充
    //  * @param {Vector}centerPos 圆心位置
    //  * @param {number}radius 半径
    //  * @deprecated 建议使用 {@link GraphicsUtil.drawCircleLineWithoutFill} ,效果更好
    //  */
    // GraphicsUtil.drawCircleLineWithoutFill_deprecated = function (centerPos, radius) {
    //     var doc = fl.getDocumentDOM(); //文档
    //
    //     var circleRect = new Rectangle(centerPos, radius);
    //     doc.addNewPrimitiveOval(circleRect.toObj(), true);
    //
    //     // 选中圆形
    //     doc.setSelectionRect(circleRect.toObj());
    //     // 分离到Shape
    //     doc.breakApart();
    //
    //     return circleRect;
    // };

    /**
     * 画圆，删除填充部分，效果更好
     * 比{@link GraphicsUtil.drawCircle} 的圆弧 粗一些
     * @param {Vector}centerPos 圆心位置
     * @param {number}radius 半径
     * @return {Rectangle} 圆弧所在矩形
     */
    function drawCircleLineWithoutFill(centerPos, radius) {
        var doc = fl.getDocumentDOM(); //文档

        var circleRect = new Rectangle(centerPos, radius);
        doc.addNewPrimitiveOval(circleRect.toObj());

        // 选中圆形
        doc.setSelectionRect(circleRect.toObj());
        // 分离到Shape
        doc.breakApart();

        var circleCenter = circleRect.getCenterVector();

        doc.mouseClick(circleCenter.getCenter().toObj(), true, true); //选中所有
        doc.mouseClick(circleCenter.getCenter().toObj(), false, true); //选中中间的圆形部分

        // 删除中间的圆形部分，只保留曲线部分
        doc.deleteSelection();
        return circleRect;
    }

    /**
     * 画圆，删除边线
     * @param {Vector} centerPos 圆心位置
     * @param {number} radius 半径
     * @param {Rectangle} circleRect 圆弧所在矩形
     * @param {string} color 填充颜色
     * @return {Rectangle} 圆弧所在矩形
     */
    function drawCircleWithoutLine() {
        var doc = fl.getDocumentDOM(); //文档
        var args = arguments;

        var circleRect = new Rectangle(),
            color = "";

        switch (args.length) {
            case 1:
                // circleRect
                circleRect = args[0];
                break;
            case 2:
                // centerPos, radius
                if (args[0] instanceof Vector && typeof args[1] === "number") {
                    var centerPos = args[0];
                    var radius = args[1];
                    circleRect = new Rectangle(centerPos, radius);
                }
                // circleRect, color
                else if (args[0] instanceof Rectangle && typeof args[1] === "string") {
                    circleRect = args[0];
                    color = args[1];
                } else {
                    throw new Error("drawCircleWithoutLine() requires 1 or 2 arguments");
                }
                break;
            case 3:
                // centerPos, radius, color
                if (
                    args[0] instanceof Vector &&
                    typeof args[1] === "number" &&
                    args[2] instanceof String
                ) {
                    var centerPos = args[0];
                    var radius = args[1];

                    circleRect = new Rectangle(centerPos, radius);
                    color = args[2];
                } else {
                    throw new Error("drawCircleWithoutLine() requires 1 or 2 arguments");
                }
            // eslint-disable-next-line no-fallthrough
            default:
                throw new Error("drawCircleWithoutLine() requires 1 or 2 arguments");
        }

        if (color === "") color = "#000000";

        doc.addNewPrimitiveOval(circleRect.toObj(), false, true);
        // 选中圆形
        // bug: bContactSensitiveSelection接触感应选择模式。必须设置为true，否则可能无法选中圆形，导致后面的代码出错。
        // doc.setSelectionRect(circleRect.toObj(), true, true);

        doc.mouseClick(circleRect.getCenterVector().toObj(), false, false);


        // 分离到Shape
        doc.breakApart();

        doc.setFillColor(color);

        return circleRect;
    }

    return {
        drawCircleLineWithoutFill: drawCircleLineWithoutFill,
        drawCircleWithoutLine: drawCircleWithoutLine
    };
});
