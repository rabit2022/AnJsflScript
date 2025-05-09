// ECMAScript for XML (E4X) 类型声明文件

// 命名空间类型
declare class Namespace {
    constructor(uri?: string, prefix?: string);
    uri: string;
    prefix?: string;
}

// QName 类型
declare class QName {
    constructor(namespace?: Namespace | string, localName?: string);
    uri: string;
    localName: string;
}

// XML 类型
declare class XML {
    constructor(value?: string | XML | XMLList);

    // 方法
    addNamespace(ns: Namespace): XML;
    appendChild(child: XML): XML;
    attribute(attributeName: string | QName): XMLList;
    attributes(): XMLList;
    child(propertyName: string | QName): XMLList;
    childIndex(): number;
    children(): XMLList;
    comments(): XMLList;
    contains(value: XML | XMLList): boolean;
    copy(): XML;
    descendants(name?: string | QName): XMLList;
    elements(name?: string | QName): XMLList;
    hasOwnProperty(P: string): boolean;
    hasComplexContent(): boolean;
    hasSimpleContent(): boolean;
    inScopeNamespaces(): Namespace[];
    insertChildAfter(child1: XML, child2: XML): XML;
    insertChildBefore(child1: XML, child2: XML): XML;
    length(): number;
    localName(): string;
    name(): QName;
    namespace(prefix?: string): Namespace | undefined;
    namespaceDeclarations(): Namespace[];
    nodeKind(): string;
    normalize(): XML;
    parent(): XML | undefined;
    processingInstructions(name?: string | QName): XMLList;
    prependChild(value: XML): XML;
    propertyIsEnumerable(P: string): boolean;
    removeNamespace(ns: Namespace): XML;
    replace(propertyName: string | QName, value: XML | XMLList | string): XML;
    setChildren(value: XML | XMLList): XML;
    setLocalName(name: string): void;
    setName(name: string | QName): void;
    setNamespace(ns: Namespace): void;
    text(): XMLList;
    toString(): string;
    toXMLString(): string;
    valueOf(): XML;

    // 可选方法
    domNode?(): Node | undefined;
    domNodeList?(): NodeList | undefined;
    xpath?(XPathExpression: string): XMLList | TypeError;
}

// XMLList 类型
declare class XMLList {
    constructor(value?: string | XML | XMLList);

    // 方法
    attribute(attributeName: string | QName): XMLList;
    attributes(): XMLList;
    child(propertyName: string | QName): XMLList;
    children(): XMLList;
    comments(): XMLList;
    contains(value: XML | XMLList): boolean;
    copy(): XMLList;
    descendants(name?: string | QName): XMLList;
    elements(name?: string | QName): XMLList;
    hasOwnProperty(P: string): boolean;
    hasComplexContent(): boolean;
    hasSimpleContent(): boolean;
    length(): number;
    normalize(): XMLList;
    parent(): XML | undefined;
    processingInstructions(name?: string | QName): XMLList;
    propertyIsEnumerable(P: string): boolean;
    text(): XMLList;
    toString(): string;
    toXMLString(): string;
    valueOf(): XMLList;

    // 可选方法
    domNode?(): Node | undefined;
    domNodeList?(): NodeList | undefined;
    xpath?(XPathExpression: string): XMLList | TypeError;
}

// 全局对象扩展
declare global {
    const XML: {
        new(value?: string | XML | XMLList): XML;
        (value?: string | XML | XMLList): XML;
        prototype: XML;
    };
    const XMLList: {
        new(value?: string | XML | XMLList): XMLList;
        (value?: string | XML | XMLList): XMLList;
        prototype: XMLList;
    };
    const Namespace: {
        new(uri?: string, prefix?: string): Namespace;
        (uri?: string, prefix?: string): Namespace;
        prototype: Namespace;
    };
    const QName: {
        new(namespace?: Namespace | string, localName?: string): QName;
        (namespace?: Namespace | string, localName?: string): QName;
        prototype: QName;
    };
}