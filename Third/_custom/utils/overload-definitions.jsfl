/**
 * @file: override-definitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/21 18:41
 * @project: AnJsflScript
 * @description:
 */

define(["SAT", "overload-js"], function(sat, overload) {

    const { IsElementBoundsLike, IsVectorLike } = sat.CHECk;
    const o = overload.o;

    overload.defineType("Element", function(val) {
        return IsElementBoundsLike(val);
    });

    overload.defineType("Vector", function(val) {
        return IsVectorLike(val);
    });

    return {
        T_Element: o.Element,
        T_Vector: o.Vector
    };
});