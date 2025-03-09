// SAT.js - Version 0.9.0
// Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca>
// Released under the MIT License.

/* eslint-disable*/

// declare module 'module.SAT' {
//     let mod: {
//         Vector: typeof Vector;
//         Rectangle: typeof Rectangle;
//         Size: typeof Size;
//         Transform: typeof Transform;
//         GLOBALS: typeof GLOBALS;
//         V: typeof Vector;
//         R: typeof Rectangle;
//         S: typeof Size;
//         T: typeof Transform;
//     };
//     export = mod;
// }

type Corner =
    | 'top right'
    | 'top left'
    | 'bottom right'
    | 'bottom left'
    | 'top center'
    | 'right center'
    | 'bottom center'
    | 'left center'
    | 'center';
type Part = Corner | 'top' | 'right' | 'bottom' | 'left';

interface VectorLike {
    x: number;
    y: number;
}

// declare module 'module.SAT' {
export class Vector {
    x: number;

    y: number;

    constructor(x?: number, y?: number);

    perp(): Vector;

    rotate(angle: number): Vector;

    reverse(): Vector;

    normalize(): Vector;

    add(other: Vector): Vector;

    sub(other: Vector): Vector;

    scale(x: number, y?: number): Vector;

    project(other: Vector): Vector;

    projectN(other: Vector): Vector;

    reflect(axis: Vector): Vector;

    reflectN(axis: Vector): Vector;

    dot(other: Vector): number;

    len2(): number;

    len(): number;

    round(): Vector;

    noZero(): Vector;

    equals(other: Vector): boolean;

    orbit(
        pt: Vector,
        arcWidth: number,
        arcHeight: number,
        degrees: number
    ): Vector;

    getCenter(): Vector;

    IsInDirectionOf(point: Vector, whichCorner: Corner): boolean;

    angleTo(other: Vector): number;

    distanceTo(other: Vector): number;

    interpolate(other: Vector, f?: number): Vector;

    copy(other: Vector): Vector;

    clone(): Vector;

    toString(): string;

    toObj(): { x: number; y: number };

    static interpolate(pt1: Vector, pt2: Vector, f?: number): Vector;

    static polar(length: number, angle: number): Vector;

    static distance(pt1: Vector, pt2: Vector): number;
}

/**
 * RectangleLike 类型描述
 * @property {number} left - 矩形的左边界
 * @property {number} top - 矩形的上边界
 * @property {number} right - 矩形的右边界
 * @property {number} bottom - 矩形的下边界
 * @interface RectangleLike
 */
interface RectangleLike {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export class Rectangle {
    left: number;
    top: number;
    right: number;
    bottom: number;

    readonly width: number;
    readonly height: number;

    constructor();
    constructor(rect: Rectangle | RectangleLike);
    constructor(doc: Document);
    constructor(element: Element);
    constructor(symbolItem: 'SymbolItem');
    constructor(radius: number);
    constructor(elements: Element[]);
    constructor(width: number, height: number);
    constructor(centerPos: Vector, radius: number);
    constructor(left: number, top: number, right: number, bottom: number);

    addOffset(offset: number | Vector | Rectangle): Rectangle;

    subOffset(offset: number | Vector | Rectangle): Rectangle;

    getCenterVector(): Vector;

    contains(rect: Rectangle): boolean;

    getCorner(whichCorner: Corner): Vector;

    getPart(
        whichPart: Part,
        widthRatio?: number,
        heightRatio?: number
    ): Rectangle;

    copy(rect: Rectangle): Rectangle;

    clone(): Rectangle;

    union(other: Rectangle): Rectangle;

    toString(): string;

    toObj(): RectangleLike;
}

interface SizeLike {
    width: number;
    height: number;
}

export class Size {
    width: number;
    height: number;
    max_size: number;
    min_size: number;
    ratio: number;

    constructor(width: number, height: number);

    getRatioWidth(): number;

    getRatioHeight(): number;

    toString(): string;

    toObj(): SizeLike;

    toPoint(): Vector;
}

export class Transform {
    element: Element;
    rotation: number;
    scale: Vector;
    position: Vector;
    size: Size;
    skew: Vector;

    constructor(element: any);

    setRotation(rotation: number): Transform;

    setScale(scale: Vector): Transform;

    setPosition(position: Vector): Transform;

    setSize(size: Size): Transform;

    setSkew(skew: Vector): Transform;

    toString(): string;
}

export namespace GLOBALS {
    export function wrapPosition(
        element: VectorLike | Element | Vector
    ): Vector;

    export function wrapScale(element: {
        scaleX: number;
        scaleY: number;
    }): Vector;

    export function wrapSkew(element: { skewX: number; skewY: number }): Vector;

    export function getOrigin(): Vector;

    export function getTopLeft(
        element: { left: number; top: number } | Element
    ): Vector;

    export function wrapRectByTopLeft(
        left: number,
        top: number,
        width: number,
        height: number
    ): Rectangle;

    export function wrapRectByCenter(
        centerX: number,
        centerY: number,
        width: number,
        height: number
    ): Rectangle;

    export function wrapSize(element: Element): Size;

    export function wrapTransform(element: Element): Transform;

    export function findBoundingRectangle(elements: Array<Element>): Rectangle;
}

// 别名
export { Vector as V };
export { Rectangle as R };
export { Size as S };
// export { Transform as T };
