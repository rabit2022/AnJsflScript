// SAT.js - Version 0.9.0
// Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca>
// Released under the MIT License.

declare namespace SAT {
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
    type DirectionType = "all" | "left" | "top" | "right" | "bottom";

    interface SObjectLike {
    }

    export class SObject {
        constructor();

        copy(other: SObject): SObject;

        clone(): SObject;

        toVector(): Vector;

        toString(): string;

        toObj(): SObjectLike;

        static toString(): string;
    }

    interface VectorLike {
        x: number;
        y: number;
    }

    /**
     * This is a simple 2D vector/point class,Vector has two parameters {x},{y}.
     */
    export class Vector extends VectorLike, SObject {
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

        toScale(): Scale;

        toSkew(): Skew;

        static interpolate(pt1: Vector, pt2: Vector, f?: number): Vector;

        static polar(length: number, angle: number): Vector;

        static distance(pt1: Vector, pt2: Vector): number;

        static toString(): string;
    }

    interface RectangleLike {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }

    /**
     * This is a simple rectangle class,Rectangle has four parameters {left},{top},{right},{bottom}.
     */
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

        expand(size: number, whichDirection?: DirectionType): Rectangle;

        shrink(size: number, whichDirection?: DirectionType): Rectangle;

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

    /**
     * This is a simple size class,Size has two parameters {width},{height}.
     */
    export class Size extends SizeLike, SObject {
        width: number;
        height: number;

        readonly max_size: number;
        readonly min_size: number;
        readonly ratio: number;

        constructor(width: number, height: number);

        add(size: Size): Size;

        sub(size: Size): Size;

        getRatioWidth(nowHeight: number): number;

        getRatioHeight(nowWidth: number): number;

        copy(size: Size): Size;

        clone(): Size;

        toString(): string;

        toObj(): SizeLike;

        toVector(): Vector;

        static toString(): string;
    }


    interface ScaleLike {
        scaleX: number;
        scaleY: number;
    }

    /**
     * This is a simple scale class,Scale has two parameters {scaleX},{scaleY}.
     */
    export class Scale extends ScaleLike, SObject {
        scaleX: number;
        scaleY: number;

        constructor(scaleX: number, scaleY: number);

        copy(scale: Scale): Scale;

        clone(): Scale;

        toVector(): Vector;

        toString(): string;

        toObj(): ScaleLike;

        static toString(): string;
    }

    interface SkewLike {
        skewX: number;
        skewY: number;
    }

    /**
     * This is a simple skew class,Skew has two parameters {skewX},{skewY}.
     */
    export class Skew extends SkewLike, SObject {
        skewX: number;
        skewY: number;

        constructor(skewX: number, skewY: number);

        copy(skew: Skew): Skew;

        clone(): Skew;

        toVector(): Vector;

        toString(): string;

        toObj(): SkewLike;

        static toString(): string;
    }

    interface TransformLike {
        rotation: number;
        scale: ScaleLike;
        position: VectorLike;
        size: SizeLike;
        skew: SkewLike;
    }

    /**
     * This is a simple transform class,Transform has six parameters {rotation},{scale},{position},{size},{skew}.
     */
    export class Transform extends TransformLike {
        readonly element: Element;
        readonly rotation: number;
        readonly scale: Scale;
        readonly position: Vector;
        readonly size: Size;
        readonly skew: Skew;

        constructor(element: Element);

        setRotation(rotation: number): this;

        setScale(scale: Scale | ScaleLike): this;

        setPosition(position: Vector | VectorLike): this;

        setSize(size: Size | SizeLike): this;

        setSkew(skew: Skew | SkewLike): this;

        toString(): string;

        static toString(): string;
    }

    interface FrameRangeLike {
        layerIndex: number;
        startFrame: number;
        endFrame: number;
    }

    /**
     * This is a simple frame range class,FrameRange has three parameters {layerIndex},{startFrame},{endFrame}.
     */
    export class FrameRange extends FrameRangeLike {
        layerIndex: number;
        startFrame: number;
        endFrame: number;

        readonly duration: number;

        constructor(layerIndex: number, startFrame: number, endFrame?: number);

        intersects(other: FrameRange): boolean;

        clone(): FrameRange;

        copy(other: FrameRange): void;

        contain(fr2: FrameRange): boolean;

        toArray(): [number, number, number];

        toString(): string;

        static toString(): string;
    }

    /**
     * This is a FrameRangeList class,FrameRangeList is an array of FrameRange.
     */
    export class FrameRangeList extends Array<FrameRange>,SObject {
        readonly firstSlFrameIndex: number | null; // 第一个选中帧的索引
        readonly firstSlLayerIndex: number | null; // 第一个选中图层的索引
        readonly firstSlLayer: Layer | null; // 第一个选中图层对象
        readonly firstSlFrame: Frame | null; // 第一个选中帧对象

        constructor();

        getUniqueLayerIndexes(): number[];

        copy(frameRange: FrameRangeList | ArrayLike<FrameRange>): FrameRangeList;

        clone(): FrameRangeList;

        toString(): string;

        static toString(): string;

        static from(frArr: ArrayLike<FrameRange>): FrameRangeList;
    }


    interface ElementBoundsLike {
        left: number,
        top: number,
        width: number,
        height: number
    }

    /**
     * This is GLOLBALS namespace,it contains some global functions and variables.
     */
    export namespace GLOBALS {
        export function wrapPosition(element: VectorLike | Element | Vector): Vector;

        export function wrapScale(
            element: ScaleLike | Scale | Element
        ): Scale;

        export function wrapSkew(element: SkewLike | Skew | Element): Skew;

        export function getOrigin(): Vector;

        export function getTopLeft(element: ElementBoundsLike | Element): Vector;

        export function getSymbolCenter(element: ElementBoundsLike | Element): Vector;

        export function getStageCenter(): Vector;

        export function getStageBounds(): Rectangle;

        export function getStageRect: typeof getStageBounds;

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

    /**
     * This is a Check namespace,it contains some check functions.
     */
    export namespace CHECk {
        export function IsRectangleLike(obj: any): boolean;

        export function IsSizeLike(obj: any): boolean;

        export function IsVectorLike(obj: any): boolean;

        export function IsTransformLike(obj: any): boolean;

        export function IsFrameRangeLike(obj: any): boolean;

        export function IsElementBoundsLike(obj: any): boolean;

        export function IsScaleLike(obj: any): boolean;

        export function IsSkewLike(obj: any): boolean;
    }


// 别名
    export { Vector as V };
    export { Rectangle as R };
    export { Size as S };
    export { Transform as Tr }; // 与泛型冲突
    export { FrameRange as FR };
}

export = SAT;
// declare module "sat" {
//     export = SAT;
// }
