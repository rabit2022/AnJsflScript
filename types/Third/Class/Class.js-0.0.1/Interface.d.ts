// import { Class } from './class';

class ImplementationMissingError extends Error {
    constructor(message?: string);
}

interface InterfaceDefinition {
    [methodName: string]: Function;
}

export class Interface {
    constructor(
        interfacePath: string,
        interfaceDefinition: InterfaceDefinition,
        local?: boolean
    ): Function;

    static ImplementationMissingError: ImplementationMissingError;
}

// // 如果在 Node.js 环境中，将 Interface 暴露为模块
// declare module 'Interface' {
//     export = Interface;
// }
