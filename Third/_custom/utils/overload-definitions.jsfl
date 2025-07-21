/**
 * @file: override-definitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/21 18:41
 * @project: AnJsflScript
 * @description:
 */

define(["SAT", "overload-js"], function(sat, overload) {

    const { IsRectangleLike,IsSizeLike,IsVectorLike,IsTransformLike,IsFrameRangeLike,IsElementBoundsLike,IsScaleLike,IsSkewLike,IsLineSegmentLike,IsCircleLike } = sat.CHECk;
    const o = overload.o;

    // region sat.CHECk
    overload.defineType("Element", function(val) {
        return IsElementBoundsLike(val);
    });

    overload.defineType("Vector", function(val) {
        return IsVectorLike(val);
    });

    overload.defineType("Rectangle", function(val) {
        return IsRectangleLike(val);
    });

    overload.defineType("Size", function(val) {
        return IsSizeLike(val);
    });

    overload.defineType("Transform", function(val) {
        return IsTransformLike(val);
    });

    overload.defineType("FrameRange", function(val) {
        return IsFrameRangeLike(val);
    });

    overload.defineType("Scale", function(val) {
        return IsScaleLike(val);
    });

    overload.defineType("Skew", function(val) {
        return IsSkewLike(val);
    });

    overload.defineType("LineSegment", function(val) {
        return IsLineSegmentLike(val);
    });

    overload.defineType("Circle", function(val) {
        return IsCircleLike(val);
    });
    // endregion sat.CHECk

    return {
        T_Element: o.Element,
        T_Vector: o.Vector,
        T_Rectangle: o.Rectangle,
        T_Size: o.Size,
        T_Transform: o.Transform,
        T_FrameRange: o.FrameRange,
        T_Scale: o.Scale,
        T_Skew: o.Skew,
        T_LineSegment: o.LineSegment,
        T_Circle: o.Circle
    };
});