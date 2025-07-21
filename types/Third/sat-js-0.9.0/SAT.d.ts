// SAT.js - Version 0.9.0
// Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca>
// Released under the MIT License.

// declare const SAT:sat;
// export = SAT;

declare namespace sat {
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

    export class SObject<T extends SObject<T>> {
        constructor();

        copy(other: T): T;

        clone(): T;

        toVector(): Vector;

        toString(): string;

        toObj(): SObjectLike;

        static toString(): string;
    }

    interface VectorLike extends SObjectLike {
        x: number;
        y: number;
    }

    /**
     * This is a simple 2D vector/point class,Vector has two parameters {x},{y}.
     */
    export class Vector extends VectorLike, SObject<Vector> {
        constructor(x?: number, y?: number);

        perp(): Vector;

        rotate(angle: number): Vector;

        reverse(): Vector;

        invert(): Vector;

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

        orbit(pt: Vector, arcWidth: number, arcHeight: number, degrees: number): Vector;

        getCenter(): Vector;

        IsInDirectionOf(point: Vector, whichCorner: Corner): boolean;

        angleTo(other: Vector): number;

        distanceTo(other: Vector): number;

        interpolate(other: Vector, f?: number): Vector;

        toSize(): Size;

        toRectangle(): Rectangle;

        toScale(): Scale;

        toSkew(): Skew;

        toSignVector(): Vector;

        signPow(): Vector;

        static interpolate(pt1: Vector, pt2: Vector, f?: number): Vector;

        static polar(length: number, angle: number): Vector;

        static distance(pt1: Vector, pt2: Vector): number;

        static from(element: Element | VectorLike | Vector): Vector;
    }

    interface RectangleLike extends SObjectLike {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }

    interface RectangleConstructor {
        new(): Rectangle;

        new(rect: Rectangle | RectangleLike): Rectangle;

        new(doc: Document): Rectangle;

        new(element: Element): Rectangle;

        new(symbolItem: SymbolItem): Rectangle;

        new(radius: number): Rectangle;

        new(elements: Element[]): Rectangle;

        new(width: number, height: number): Rectangle;

        new(centerPos: Vector, radius: number): Rectangle;

        new(left: number, top: number, right: number, bottom: number): Rectangle;

        fromTopLeft(left: number, top: number, width: number, height: number): Rectangle;

        fromTopLeft(leftTop: Vector | VectorLike, size: Size | SizeLike): Rectangle;

        fromCenter(centerX: number, centerY: number, width: number, height: number): Rectangle;

        fromCenter(center: Vector | VectorLike, size: Size | SizeLike): Rectangle;

        fromVectors(vectors: Vector[]): Rectangle;

        fromElements(elements: Array<Element>): Rectangle;

        fromRects(rects: Rectangle[]): Rectangle;
    }

    /**
     * This is a simple rectangle class,Rectangle has four parameters {left},{top},{right},{bottom}.
     */
    export interface Rectangle extends RectangleLike, SObject<Rectangle> {
        readonly width: number;
        readonly height: number;

        readonly center: Vector;
        readonly size: Size;

        addOffset(offset: number | Vector | Rectangle): Rectangle;

        subOffset(offset: number | Vector | Rectangle): Rectangle;

        expand(size: number, whichDirection?: DirectionType): Rectangle;

        shrink(size: number, whichDirection?: DirectionType): Rectangle;

        getCenterVector(): Vector;

        getSize(): Size;

        contains(rect: Rectangle): boolean;

        getCorner(whichCorner: Corner): Vector;

        getPart(whichPart: Part, widthRatio?: number, heightRatio?: number): Rectangle;

        union(other: Rectangle): Rectangle;


        rotate(angle: number, whichCorner?: Corner): Rectangle;

    }

    // 将 Rectangle 的构造函数类型指定为 RectangleConstructor
    export const Rectangle: RectangleConstructor;

    interface SizeLike extends SObjectLike {
        width: number;
        height: number;
    }

    /**
     * This is a simple size class,Size has two parameters {width},{height}.
     */
    export class Size extends SizeLike, SObject<Size> {
        readonly max_size: number;
        readonly min_size: number;
        readonly ratio: number;

        constructor(width: number, height: number);

        add(size: Size): Size;

        sub(size: Size): Size;

        getRatioWidth(nowHeight: number): number;

        getRatioHeight(nowWidth: number): number;

        toVector(): Vector;

        static from(element: Element | Document | Size | SizeLike): Size;
    }


    interface ScaleLike extends SObjectLike {
        scaleX: number;
        scaleY: number;
    }

    /**
     * This is a simple scale class,Scale has two parameters {scaleX},{scaleY}.
     */
    export class Scale extends ScaleLike, SObject<Scale> {
        constructor(scaleX: number, scaleY: number);

        toVector(): Vector;

        static from(element: Element | ScaleLike | Scale): Scale;
    }

    interface SkewLike extends SObjectLike {
        skewX: number;
        skewY: number;
    }

    /**
     * This is a simple skew class,Skew has two parameters {skewX},{skewY}.
     */
    export class Skew extends SkewLike, SObject<Skew> {
        constructor(skewX: number, skewY: number);

        toVector(): Vector;

        static from(element: Element | SkewLike | Skew): Skew;
    }

    interface TransformLike extends SObjectLike {
        rotation: number;
        scale: ScaleLike;
        position: VectorLike;
        size: SizeLike;
        skew: SkewLike;
    }

    /**
     * This is a simple transform class,Transform has six parameters {rotation},{scale},{position},{size},{skew}.
     */
    export class Transform extends TransformLike, SObject<Transform> {
        element: Element;

        constructor(element: Element);

        setRotation(rotation: number): this;

        setScale(scale: Scale | ScaleLike): this;

        setPosition(position: Vector | VectorLike): this;

        setSize(size: Size | SizeLike): this;

        setSkew(skew: Skew | SkewLike): this;

        moveSelectionBy(distanceToMove: VectorLike | Vector): this;

        static from(element: Element): Transform;
    }

    interface FrameRangeLike extends SObjectLike {
        layerIndex: number;
        startFrame: number;
        endFrame: number;
    }

    /**
     * This is a simple frame range class,FrameRange has three parameters {layerIndex},{startFrame},{endFrame}.
     */
    export class FrameRange extends FrameRangeLike, SObject<FrameRange> {
        readonly duration: number;

        constructor(layerIndex: number, startFrame: number, endFrame?: number);

        intersects(other: FrameRange): boolean;

        contain(fr2: FrameRange): boolean;

        contain(frameIndex: number): boolean;

        toArray(): [number, number, number];

        getFirstFrame(): FrameRange;
    }

    /**
     * This is a FrameRangeList class,FrameRangeList is an array of FrameRange.
     */
    export class FrameRangeList extends Array<FrameRange>, SObject<FrameRangeList> {
        readonly firstSlFrameIndex: number | null; // 第一个选中帧的索引
        readonly firstSlLayerIndex: number | null; // 第一个选中图层的索引
        readonly firstSlLayer: Layer | null; // 第一个选中图层对象
        readonly firstSlFrame: Frame | null; // 第一个选中帧对象

        constructor();

        /**
         * @deprecated use {@link Timeline.prototype.getSelectedLayers} instead.
         */
        getUniqueLayerIndexes(): number[];
    }

    interface LineSegmentLike extends SObjectLike {
        startPoint: VectorLike;
        endPoint: VectorLike;
    }

    /**
     * This is a simple line segment class,LineSegment has two parameters {startPoint},{endPoint}.
     */
    export class LineSegment extends LineSegmentLike, SObject<LineSegment> {
        constructor(startPoint: Vector, endPoint: Vector);

        getBounds(): Rectangle;

        getCenter(): Vector;

        getLength(): number;

        getAngle(): number;

        getNormal(): Vector;

        getPointAt(t: number): Vector;

        getNearestPointTo(point: Vector): Vector;

        getDistanceToPoint(point: Vector): number;

        toVector(): Vector;

        static from(startPoint: Vector, direction: DirectionType, distance: number): LineSegment;
    }


    interface ElementBoundsLike extends SObjectLike {
        left: number,
        top: number,
        width: number,
        height: number
    }

    interface CircleLike extends SObjectLike {
        pos: VectorLike;
        r: number;
    }

    export class Circle extends CircleLike, SObject<Circle> {
        readonly d: number;

        constructor(pos?: Vector, r?: number);

        getBounds(): Rectangle;

        getArea(): number;

        getCentroid(): Vector;

        getDistanceToPoint(point: Vector): number;

        getDistanceToSegment(segment: LineSegment): number;

        containsPoint(point: Vector): boolean;

        toVector(): Vector;
    }

    export namespace ENTITY {
        export class ELEMENT {
            static getOrigin(): Vector;

            static getTopLeft(element: ElementBoundsLike | Element): Vector;
        }

        export class SYMBOL {
            static getCenter(element: ElementBoundsLike | Element): Vector;

            static getBounds(element: ElementBoundsLike | Element): Rectangle;

            static getSize(element: ElementBoundsLike | Element): Size;
        }

        export class STAGE {
            static getCenter(): Vector;

            static getBounds(): Rectangle;

            static getSize(): Size;
        }

        export class CAMERA {
            static getBounds(timeline: Timeline, frameIndex: number): Rectangle;

            static getCenter(timeline: Timeline, frameIndex: number): Vector;
        }
    }

    /**
     * @deprecated use {@link ENTITY} instead.
     */
    export namespace GLOBALS {
        /**
         * @deprecated use {@link Vector.from} instead.
         */
        export function wrapPosition(element: VectorLike | Element | Vector): Vector;

        /**
         * @deprecated use {@link ENTITY.ELEMENT.getOrigin} instead.
         */
        export function getOrigin(): Vector;

        /**
         * @deprecated use {@link ENTITY.ELEMENT.getTopLeft} instead.
         */
        export function getTopLeft(element: ElementBoundsLike | Element): Vector;

        /**
         * @deprecated use {@link ENTITY.SYMBOL.getCenter} instead.
         */
        export function getSymbolCenter(element: ElementBoundsLike | Element): Vector;

        /**
         * @deprecated use {@link ENTITY.STAGE.getCenter} instead.
         */
        export function getStageCenter(): Vector;

        /**
         * @deprecated use {@link ENTITY.STAGE.getBounds} instead.
         */
        export function getStageBounds(): Rectangle;

        /**
         * @deprecated use {@link ENTITY.STAGE.getBounds} instead.
         */
        export const getStageRect: typeof getStageBounds;

        /**
         * @deprecated use {@link ENTITY.SYMBOL.getBounds} instead.
         */
        export function getSymbolBounds(element: ElementBoundsLike | Element): Rectangle;

        /**
         * @deprecated use {@link ENTITY.SYMBOL.getBounds} instead.
         */
        export const getSymbolRect: typeof getSymbolBounds;

        /**
         * @deprecated use {@link ENTITY.STAGE.getSize} instead.
         */
        export function getStageSize(): Size;

        /**
         * @deprecated use {@link ENTITY.CAMERA.getBounds} instead.
         */
        export function getCameraRect(timeline: Timeline, frameIndex: number): Rectangle;

        /**
         * @deprecated use {@link ENTITY.CAMERA.getBounds} instead.
         */
        export const getCameraBounds: typeof getCameraRect;

        /**
         * @deprecated use {@link ENTITY.CAMERA.getCenter} instead.
         */
        export function getCameraCenter(timeline: Timeline, frameIndex: number): Vector;


        /**
         * @deprecated use {@link Rectangle.fromTopLeft} instead.
         */
        export function wrapRectByTopLeft(
            left: number,
            top: number,
            width: number,
            height: number
        ): Rectangle;
        /**
         * @deprecated use {@link Rectangle.fromTopLeft} instead.
         */
        export function wrapRectByTopLeft(
            leftTop: Vector | VectorLike,
            size: Size | SizeLike
        ): Rectangle;

        /**
         * @deprecated use {@link Rectangle.fromCenter} instead.
         */
        export function wrapRectByCenter(
            centerX: number,
            centerY: number,
            width: number,
            height: number
        ): Rectangle;
        /**
         * @deprecated use {@link Rectangle.fromCenter} instead.
         */
        export function wrapRectByCenter(
            center: Vector | VectorLike,
            size: Size | SizeLike
        ): Rectangle;

        /**
         * @deprecated use {@link Size.from} instead.
         */
        export function wrapSize(element: Element | Document | Size | SizeLike): Size;

        /**
         * @deprecated use {@link Transform.from} instead.
         */
        export function wrapTransform(element: Element): Transform;
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

        export function IsLineSegmentLike(obj: any): boolean;

        export function IsCircleLike(obj: any): boolean;
    }

    export namespace TYPES {
        export type T_Element = Element;
        export type T_Vector = Vector;
        export type T_Rectangle = Rectangle;
        export type T_Size = Size;
        export type T_Transform = Transform;
        export type T_FrameRange = FrameRange;
        export type T_Scale = Scale;
        export type T_Skew = Skew;
        export type T_LineSegment = LineSegment;
        export type T_Circle = Circle;
    }


    // 别名
    export { Vector as V };
    export { Rectangle as R };
    export { Size as S };
    export { Transform as TR }; // T与泛型冲突
    export { FrameRange as FR };
    export { FrameRangeList as FRL };
    export { Scale as SC };
    export { Skew as SK };
    export { LineSegment as LS };
    export { Circle as C };
}

// export = SAT;
declare module "SAT" {
    export = sat;
}


