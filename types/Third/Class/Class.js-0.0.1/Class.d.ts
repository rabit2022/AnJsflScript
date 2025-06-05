import { Interface } from "./Interface";


class Class {
    constructor(classPath: string,
                classDefinition: ClassDefinition,
                local?: boolean);

    static getClass(classPath: string): Function;

    static augment(target: any, extension: any, shouldOverride?: boolean): void;

    static extend(TargetClass: Function, extension: any, shouldOverride?: boolean): void;

    static inherit(SubClass: Function, SuperClass?: Function): void;

    static implement(TargetClass: Function, implementations?: Function | Function[]): void;

    static namespace(namespacePath: string, exposedObject: any): void;

}

interface ClassDefinition {
    /**
     * 继承的类
     */
    Extends?: Function | Class;
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


declare module "Class" {
    export = Class;
}