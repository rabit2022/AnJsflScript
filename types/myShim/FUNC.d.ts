// import { Class } from './通用';

export function IsNullOrEmpty(value: any): boolean;

export function IsEmpty(value: any): boolean;

export function INHERIT_MACRO(
    child: Function,
    $parent: Function,
    $properties?: object
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

export function DYNAMIC_PARAMS(
    args: any[], // 不定长参数
    options: Options // 固定的选项对象
): { [key: string]: any };

export function DYNAMIC_PARAMS(
    ...args: any[], // 不定长参数
    options: Options // 固定的选项对象
): { [key: string]: any };

interface Options {
    types: {
        [type: string]: string | string[];
    };

    required: string[];
}

export function SAFE_GET_MACRO<T>(
    rootObj: any,
    ...safeGetProp: string,
    defaultValue: T
): T;
