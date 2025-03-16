// import { Class } from './通用';

export function IsNullOrEmpty(value: any): boolean;

export function IsEmpty(value: any): boolean;

// export function INHERIT_MACRO(subCls_CLASS: Function, superCls_CLASS: Function): void;

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
