
class ImplementationMissingError extends Error {
    constructor(message?: string);
}

interface InterfaceDefinition {
    [methodName: string]: Function;
}

class Interface {
    constructor(
        interfacePath: string,
        interfaceDefinition: InterfaceDefinition,
        local?: boolean
    ): Function;

    static ImplementationMissingError: ImplementationMissingError;
}

// 如果在 Node.js 环境中，将 Interface 暴露为模块
declare module 'Interface' {
    export = Interface;
}
