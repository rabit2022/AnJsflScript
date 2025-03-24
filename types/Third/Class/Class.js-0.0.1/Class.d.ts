import { Interface } from './Interface';


export function Class(classPath: string, classDefinition: ClassDefinition, local?: boolean): Function;

export function getClass(classPath: string): Function;

export function augment(
    target: any,
    extension: any,
    shouldOverride?: boolean
): void;

export function extend(
    TargetClass: Function,
    extension: any,
    shouldOverride?: boolean
): void;

export function inherit(SubClass: Function, SuperClass?: Function): void;

export function implement(TargetClass: Function, implementations?: Function | Function[]): void;

export function namespace(namespacePath: string, exposedObject: any): void;

interface ClassDefinition {
    /**
     * 继承的类
     */
    Extends?: Function| Class;
    /**
     * 实现的接口，Mixin对象
     */
    Implements?: Function | Function[] | Interface | Interface[];
    /**
     * 构造函数
     */
    initialize?: Function;

    /**
     * 静态方法
     */
    STATIC?: {};

    /**
     * 通用的访问器属性
     */
    [key: string]: any;
}


