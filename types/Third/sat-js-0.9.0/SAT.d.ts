// SAT.js - Version 0.9.0
// Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca>
// Released under the MIT License.

/* eslint-disable*/
type Corner =
    | "top right"
    | "top left"
    | "bottom right"
    | "bottom left"
    | "top center"
    | "right center"
    | "bottom center"
    | "left center"
    | "center";
type Part = Corner | "top" | "right" | "bottom" | "left";

interface VectorLike {
    x: number;
    y: number;
}

// declare module 'module.SAT' {
export class Vector extends VectorLike {
    x: number;
    y: number;

    constructor(x?: number, y?: number);

    perp(): Vector;

    rotate(angle: number): Vector;

    reverse(): Vector;

    invert(): Vector;

    normalize(): Vector;

    add(other: Vector): Vector;

    sub(other: Vector): Vector;

    scale(x: number, y?: number): Vector;

    scale(x: Vector): Vector;

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

    orbit(pt: Vector, arcWidth: number, arcHeight: number, degrees: number): Vector;

    getCenter(): Vector;

    IsInDirectionOf(point: Vector, whichCorner: Corner): boolean;

    angleTo(other: Vector): number;

    distanceTo(other: Vector): number;

    interpolate(other: Vector, f?: number): Vector;

    copy(other: Vector): Vector;

    clone(): Vector;

    toString(): string;

    toObj(): { x: number; y: number };

    toSize(): Size;

    toRectangle(): Rectangle;

    static interpolate(pt1: Vector, pt2: Vector, f?: number): Vector;

    static polar(length: number, angle: number): Vector;

    static distance(pt1: Vector, pt2: Vector): number;

    static toString(): string;
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

export class Rectangle extends RectangleLike {
    left: number;
    top: number;
    right: number;
    bottom: number;

    readonly width: number;
    readonly height: number;

    readonly center: Vector;
    readonly size: Size;

    constructor();
    constructor(rect: Rectangle | RectangleLike);
    constructor(doc: Document);
    constructor(element: Element);
    constructor(symbolItem: "SymbolItem");
    constructor(radius: number);
    constructor(elements: Element[]);
    constructor(width: number, height: number);
    constructor(centerPos: Vector, radius: number);
    constructor(left: number, top: number, right: number, bottom: number);

    addOffset(offset: number | Vector | Rectangle): Rectangle;

    subOffset(offset: number | Vector | Rectangle): Rectangle;

    getCenterVector(): Vector;

    getSize(): Size;

    contains(rect: Rectangle): boolean;

    getCorner(whichCorner: Corner): Vector;

    getPart(whichPart: Part, widthRatio?: number, heightRatio?: number): Rectangle;

    copy(rect: Rectangle): Rectangle;

    clone(): Rectangle;

    union(other: Rectangle): Rectangle;

    toString(): string;

    toObj(): RectangleLike;

    static toString(): string;
}

interface SizeLike {
    width: number;
    height: number;
}

export class Size extends SizeLike {
    width: number;
    height: number;

    readonly max_size: number;
    readonly min_size: number;
    readonly ratio: number;

    constructor(width: number, height: number);

    add(other: Size): Size;

    sub(other: Size): Size;

    getRatioWidth(nowHeight: number): number;

    getRatioHeight(nowWidth: number): number;

    toString(): string;

    toObj(): SizeLike;

    toVector(): Vector;

    static toString(): string;
}

interface TransformLike {
    rotation: number;
    scale: VectorLike;
    position: VectorLike;
    size: SizeLike;
    skew: VectorLike;
}

export class Transform extends TransformLike {
    element: Element;
    rotation: number;
    scale: Vector;
    position: Vector;
    size: Size;
    skew: Vector;

    constructor(element: any);

    setRotation(rotation: number): this;

    setScale(scale: Vector): this;

    setPosition(position: Vector): this;

    setSize(size: Size): this;

    setSkew(skew: Vector): this;

    toString(): string;

    static toString(): string;
}

interface FrameRangeLike {
    layerIndex: number;
    startFrame: number;
    endFrame: number;
}

/**
 * 帧范围类
 * 左闭右开区间 [startFrame, endFrame)
 */
export class FrameRange extends FrameRangeLike {
    layerIndex: number;
    startFrame: number;
    endFrame: number;

    readonly duration: number;

    constructor(layerIndex: number, startFrame: number, endFrame: number);

    intersects(other: FrameRange): boolean;

    clone(): FrameRange;

    copy(other: FrameRange): void;

    contain(fr2: FrameRange): boolean;

    toArray(): [number, number, number];

    toString(): string;

    static toString(): string;
}

interface ElementBoundsLike {
    left: number,
    top: number,
    width: number,
    height: number
}
export namespace GLOBALS {
    export function wrapPosition(element: VectorLike | Element | Vector): Vector;

    export function wrapScale(
        element: { scaleX: number; scaleY: number } | Element
    ): Vector;

    export function wrapSkew(element: { skewX: number; skewY: number } | Element): Vector;

    export function getOrigin(): Vector;

    export function getTopLeft(element: ElementBoundsLike | Element): Vector;

    export function getSymbolCenter(element:ElementBoundsLike | Element): Vector;
    export function getStageCenter(): Vector;


    export function getSymbolBounds(element: ElementBoundsLike | Element): Rectangle;
    export const getSymbolRect: typeof getSymbolBounds;

    export function wrapRectByTopLeft(
        left: number,
        top: number,
        width: number,
        height: number
    ): Rectangle;
    export function wrapRectByTopLeft(
        leftTop: Vector,
        size: Size
    ): Rectangle;

    export function wrapRectByCenter(
        centerX: number,
        centerY: number,
        width: number,
        height: number
    ): Rectangle;
    export function wrapRectByCenter(
        center: Vector,
        size: Size
    ): Rectangle;

    export function wrapSize(element: Element | Document): Size;

    export function wrapTransform(element: Element): Transform;

    export function findBoundingRectangle(elements: Array<Element>): Rectangle;
}

export namespace CHECk {
    export function IsRectangleLike(obj: any): boolean;
    export function IsSizeLike(obj: any): boolean;
    export function IsVectorLike(obj: any): boolean;
    export function IsTransformLike(obj: any): boolean;
    export function IsFrameRangeLike(obj: any): boolean;
    export function IsElementBoundsLike(obj: any): boolean;
}


// 别名
export { Vector as V };
export { Rectangle as R };
export { Size as S };
export { Transform as Tr }; // 与泛型冲突
export { FrameRange as FR };