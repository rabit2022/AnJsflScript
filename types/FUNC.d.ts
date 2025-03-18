// import { Class } from './通用';

export function IsNullOrEmpty(value: any): boolean;

export function IsEmpty(value: any): boolean;

export function INHERIT_MACRO(
    child: Function,
    $parent: Function,
    $properties?: object
): void;

export function OF_MACRO<T>(
    iterable: T[],
    callback: (index: number, value: T) => void
): void;

export function OF_MACRO<T>(
    iterable: { [key: string]: T },
    callback: (key: string, value: T) => void
): void;

interface PropertyDescriptor {
    get?: () => any;
    set?: (value: any) => void;
}

export function PROPERTY(
    CLASS: Function,
    name: string,
    descriptor: PropertyDescriptor
): void;

// /**
//  * 安全获取对象属性值，如果属性不存在则返回默认值。
//  * 模仿  es2020 的?. 运算符。
//  * @param {Object} rootObj - 根对象
//  * @param {string} safeGetProp - 安全获取属性路径
//  * @param {T} defaultValue - 默认值
//  * @returns {T} - 属性值或默认值
//  */
// function SAFE_GET_MACRO(rootObj, safeGetProp, defaultValue) {

export function SAFE_GET_MACRO<T>(
    rootObj: any,
    ...safeGetProp: string,
    defaultValue: T
): T;
