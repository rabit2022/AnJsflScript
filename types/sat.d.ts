// SAT.js - Version 0.9.0
// Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca>
// Released under the MIT License.

declare module "sat" {
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

        orbit(pt: Vector, arcWidth: number, arcHeight: number, degrees: number): Vector;

        getCenter(): Vector;

        isInDirectionOf(point: Vector, whichCorner: string): boolean;

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

    export class Rectangle {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;

        constructor();
        constructor(rect: Rectangle);
        constructor(doc: Document);
        constructor(element: Element);
        // TODO: constructor 补全参数类型
        constructor(symbolItem: SymbolItem);
        

        constructor(left?: number, top?: number, right?: number, bottom?: number);

        addOffset(offset: number | Vector | Rectangle): Rectangle;

        subOffset(offset: number | Vector | Rectangle): Rectangle;

        getCenterVector(): Vector;

        contains(rect: Rectangle): boolean;

        getCorner(whichCorner: string): Vector;

        getPart(whichPart: string, widthRatio?: number, heightRatio?: number): Rectangle;

        copy(rect: Rectangle): Rectangle;

        clone(): Rectangle;

        union(other: Rectangle): Rectangle;

        toString(): string;

        toObj(): { left: number; top: number; right: number; bottom: number };
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

        toObj(): { width: number; height: number };

        toPoint(): Vector;
    }

    export class Transform {
        element: any;
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
        export function wrapPosition(element: { x: number; y: number } | Element): Vector;

        export function wrapScale(element: { scaleX: number; scaleY: number }): Vector;

        export function wrapSkew(element: { skewX: number; skewY: number }): Vector;

        export function getOrigin(): Vector;

        export function getTopLeft(element: { left: number; top: number }): Vector;

        export function findBoundingRectangle(elements: Array<{
            left: number;
            top: number;
            width: number;
            height: number
        }>): Rectangle;

        export function wrapRectByTopLeft(left: number, top: number, width: number, height: number): Rectangle;

        export function wrapRectByCenter(centerX: number, centerY: number, width: number, height: number): Rectangle;

        export function wrapSize(element: { width: number; height: number }): Size;

        export function wrapTransform(element: any): Transform;
    }
}