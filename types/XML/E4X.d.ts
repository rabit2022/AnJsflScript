// ECMAScript for XML (E4X) 类型声明文件

/**
 * 表示 XML 命名空间的类。
 * 命名空间是一个 URI 和可选的前缀的组合，用于区分 XML 元素和属性。
 */
declare class Namespace {
    /**
     * 创建一个新的命名空间对象。
     * @param uri 命名空间的 URI。
     * @param prefix 命名空间的前缀（可选）。
     * @example
     * const ns = new Namespace("http://example.com", "ex");
     */
    constructor(uri?: string, prefix?: string);

    /**
     * 命名空间的 URI。
     */
    uri: string;

    /**
     * 命名空间的前缀（如果存在）。
     */
    prefix?: string;
}

/**
 * 表示限定名（QName）的类。
 * QName 由命名空间 URI 和本地名组成，用于唯一标识 XML 元素和属性。
 */
declare class QName {
    /**
     * 创建一个新的 QName 对象。
     * @param namespace 命名空间对象或命名空间的 URI。
     * @param localName QName 的本地名。
     * @example
     * const qname = new QName("http://example.com", "localName");
     */
    constructor(namespace?: Namespace | string, localName?: string);

    /**
     * QName 的 URI。
     */
    uri: string;

    /**
     * QName 的本地名。
     */
    localName: string;
}

/**
 * 表示 XML 数据的类。
 * XML 类提供了对 XML 数据的操作，包括属性访问、子节点操作、命名空间管理等。
 */
declare class XML {
    /**
     * 创建一个新的 XML 对象。
     * @param value XML 数据的初始值，可以是字符串、XML 对象或 XMLList 对象。
     * @example
     * const xml = new XML("<root><child>text</child></root>");
     */
    constructor(value?: string | XML | XMLList);

    /**
     * 向此 XML 对象添加命名空间声明。
     * @param ns 要添加的命名空间对象。
     * @returns 返回此 XML 对象。
     * @example
     * const ns = new Namespace("http://example.com", "ex");
     * const xml = new XML("<root/>");
     * xml.addNamespace(ns);
     */
    addNamespace(ns: Namespace): XML;

    /**
     * 将子节点追加到此 XML 对象的末尾。
     * @param child 要追加的子节点。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root/>");
     * const child = new XML("<child/>");
     * xml.appendChild(child);
     */
    appendChild(child: XML): XML;

    /**
     * 返回此 XML 对象中具有给定属性名称的 XML 属性。
     * @param attributeName 属性名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含匹配的 XML 属性。
     * @example
     * const xml = new XML("<root attr='value'/>");
     * const attr = xml.attribute("attr");
     */
    attribute(attributeName: string | QName): XMLList;

    /**
     * 返回此 XML 对象的所有 XML 属性。
     * @returns 返回一个 XMLList，包含所有 XML 属性。
     * @example
     * const xml = new XML("<root attr1='value1' attr2='value2'/>");
     * const attrs = xml.attributes();
     */
    attributes(): XMLList;

    /**
     * 返回此 XML 对象中与给定名称匹配的子节点。
     * @param propertyName 子节点的名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含匹配的子节点。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const child = xml.child("child");
     */
    child(propertyName: string | QName): XMLList;

    /**
     * 返回此 XML 对象在其父对象中的序号位置。
     * @returns 返回此 XML 对象的序号位置。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const child = xml.child("child");
     * const index = child.childIndex();
     */
    childIndex(): number;

    /**
     * 返回此 XML 对象的所有子节点。
     * @returns 返回一个 XMLList，包含所有子节点。
     * @example
     * const xml = new XML("<root><child1/><child2/></root>");
     * const children = xml.children();
     */
    children(): XMLList;

    /**
     * 返回此 XML 对象中表示 XML 注释的所有子节点。
     * @returns 返回一个 XMLList，包含所有注释子节点。
     * @example
     * const xml = new XML("<root><!-- comment --></root>");
     * const comments = xml.comments();
     */
    comments(): XMLList;

    /**
     * 检查此 XML 对象是否包含与给定值相等的 XML 对象。
     * @param value 要比较的值。
     * @returns 返回一个布尔值，表示是否包含。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const child = new XML("<child/>");
     * const contains = xml.contains(child);
     */
    contains(value: XML | XMLList): boolean;

    /**
     * 返回此 XML 对象的深拷贝。
     * @returns 返回此 XML 对象的深拷贝。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const copy = xml.copy();
     */
    copy(): XML;

    /**
     * 返回此 XML 对象中具有给定名称的所有后代节点。
     * @param name 后代节点的名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含所有匹配的后代节点。
     * @example
     * const xml = new XML("<root><child><grandchild/></child></root>");
     * const descendants = xml.descendants("grandchild");
     */
    descendants(name?: string | QName): XMLList;

    /**
     * 返回此 XML 对象中具有给定名称的所有子元素。
     * @param name 子元素的名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含所有匹配的子元素。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const elements = xml.elements("child");
     */
    elements(name?: string | QName): XMLList;

    /**
     * 检查此对象是否具有由 P 指定的属性。
     * @param P 属性名称。
     * @returns 返回一个布尔值，表示是否具有该属性。
     * @example
     * const xml = new XML("<root attr='value'/>");
     * const hasAttr = xml.hasOwnProperty("attr");
     */
    hasOwnProperty(P: string): boolean;

    /**
     * 检查此 XML 对象是否包含复杂内容。
     * @returns 返回一个布尔值，表示是否包含复杂内容。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const hasComplexContent = xml.hasComplexContent();
     */
    hasComplexContent(): boolean;

    /**
     * 检查此 XML 对象是否包含简单内容。
     * @returns 返回一个布尔值，表示是否包含简单内容。
     * @example
     * const xml = new XML("<root>text</root>");
     * const hasSimpleContent = xml.hasSimpleContent();
     */
    hasSimpleContent(): boolean;

    /**
     * 返回此 XML 对象在其父对象上下文中处于作用域内的命名空间。
     * @returns 返回一个命名空间数组。
     * @example
     * const xml = new XML("<root xmlns:ex='http://example.com'/>");
     * const namespaces = xml.inScopeNamespaces();
     */
    inScopeNamespaces(): Namespace[];

    /**
     * 在此 XML 对象中插入子节点。
     * @param child1 参考子节点。
     * @param child2 要插入的子节点。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root><child1/></root>");
     * const child2 = new XML("<child2/>");
     * xml.insertChildAfter(xml.child("child1"), child2);
     */
    insertChildAfter(child1: XML, child2: XML): XML;

    /**
     * 在此 XML 对象中插入子节点。
     * @param child1 参考子节点。
     * @param child2 要插入的子节点。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root><child2/></root>");
     * const child1 = new XML("<child1/>");
     * xml.insertChildBefore(xml.child("child2"), child1);
     */
    insertChildBefore(child1: XML, child2: XML): XML;

    /**
     * 返回此 XML 对象的长度。
     * @returns 返回 1，因为 XML 对象始终表示单个节点。
     * @example
     * const xml = new XML("<root/>");
     * const length = xml.length();
     */
    length(): number;

    /**
     * 返回此 XML 对象的本地名。
     * @returns 返回 QName 的本地名部分。
     * @example
     * const xml = new XML("<root/>");
     * const localName = xml.localName();
     */
    localName(): string;

    /**
     * 返回此 XML 对象的 QName。
     * @returns 返回与此 XML 对象相关联的 QName。
     * @example
     * const xml = new XML("<root/>");
     * const qname = xml.name();
     */
    name(): QName;

    /**
     * 返回与此 XML 对象的限定名称相关联的命名空间。
     * @param prefix 命名空间的前缀（可选）。
     * @returns 返回命名空间对象或 undefined。
     * @example
     * const xml = new XML("<root xmlns:ex='http://example.com'/>");
     * const ns = xml.namespace("ex");
     */
    namespace(prefix?: string): Namespace | undefined;

    /**
     * 返回此 XML 对象在其父对象上下文中关联的命名空间声明。
     * @returns 返回一个命名空间数组。
     * @example
     * const xml = new XML("<root xmlns:ex='http://example.com'/>");
     * const namespaceDeclarations = xml.namespaceDeclarations();
     */
    namespaceDeclarations(): Namespace[];

    /**
     * 返回此 XML 对象的节点类型。
     * @returns 返回一个字符串，表示此 XML 对象的节点类型。
     * @example
     * const xml = new XML("<root/>");
     * const nodeKind = xml.nodeKind();
     */
    nodeKind(): string;

    /**
     * 将此 XML 对象及其所有后代节点规范化。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root>text1<!-- comment -->text2</root>");
     * const normalizedXml = xml.normalize();
     */
    normalize(): XML;

    /**
     * 返回此 XML 对象的父节点。
     * @returns 返回父节点或 undefined。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const parent = xml.child("child").parent();
     */
    parent(): XML | undefined;

    /**
     * 返回此 XML 对象中表示处理指令的所有子节点。
     * @param name 处理指令的名称（可选）。
     * @returns 返回一个 XMLList，包含所有处理指令子节点。
     * @example
     * const xml = new XML("<root><?pi target='data'/></root>");
     * const processingInstructions = xml.processingInstructions();
     */
    processingInstructions(name?: string | QName): XMLList;

    /**
     * 在此 XML 对象中插入子节点。
     * @param value 要插入的子节点。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root/>");
     * const child = new XML("<child/>");
     * xml.prependChild(child);
     */
    prependChild(value: XML): XML;

    /**
     * 检查属性 P 是否可枚举。
     * @param P 属性名称。
     * @returns 返回一个布尔值，表示属性是否可枚举。
     * @example
     * const xml = new XML("<root attr='value'/>");
     * const isEnumerable = xml.propertyIsEnumerable("attr");
     */
    propertyIsEnumerable(P: string): boolean;

    /**
     * 从此 XML 对象及其所有后代对象的作用域命名空间中移除命名空间。
     * @param ns 要移除的命名空间。
     * @returns 返回此 XML 对象的副本。
     * @example
     * const xml = new XML("<root xmlns:ex='http://example.com'/>");
     * const ns = new Namespace("http://example.com", "ex");
     * const xmlWithoutNs = xml.removeNamespace(ns);
     */
    removeNamespace(ns: Namespace): XML;

    /**
     * 用给定值替换此 XML 对象中的属性。
     * @param propertyName 属性名称，可以是字符串或 QName。
     * @param value 替换的值。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root attr='oldValue'/>");
     * xml.replace("attr", "newValue");
     */
    replace(propertyName: string | QName, value: XML | XMLList | string): XML;

    /**
     * 用给定值替换此 XML 对象的所有子节点。
     * @param value 替换的值。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const newChild = new XML("<newChild/>");
     * xml.setChildren(newChild);
     */
    setChildren(value: XML | XMLList): XML;

    /**
     * 设置此 XML 对象的本地名。
     * @param name 新的本地名。
     * @example
     * const xml = new XML("<root/>");
     * xml.setLocalName("newLocalName");
     */
    setLocalName(name: string): void;

    /**
     * 设置此 XML 对象的 QName。
     * @param name 新的 QName。
     * @example
     * const xml = new XML("<root/>");
     * const qname = new QName("http://example.com", "newLocalName");
     * xml.setName(qname);
     */
    setName(name: string | QName): void;

    /**
     * 设置与此 XML 对象名称相关联的命名空间。
     * @param ns 新的命名空间。
     * @example
     * const xml = new XML("<root/>");
     * const ns = new Namespace("http://example.com", "ex");
     * xml.setNamespace(ns);
     */
    setNamespace(ns: Namespace): void;

    /**
     * 返回此 XML 对象中表示文本的所有子节点。
     * @returns 返回一个 XMLList，包含所有文本子节点。
     * @example
     * const xml = new XML("<root>text</root>");
     * const textNodes = xml.text();
     */
    text(): XMLList;

    /**
     * 返回此 XML 对象的字符串表示形式。
     * @returns 返回字符串表示形式。
     * @example
     * const xml = new XML("<root>text</root>");
     * const str = xml.toString();
     */
    toString(): string;

    /**
     * 返回此 XML 对象的 XML 编码字符串表示形式。
     * @returns 返回 XML 编码字符串表示形式。
     * @example
     * const xml = new XML("<root>text</root>");
     * const xmlStr = xml.toXMLString();
     */
    toXMLString(): string;

    /**
     * 返回此 XML 对象。
     * @returns 返回此 XML 对象。
     * @example
     * const xml = new XML("<root/>");
     * const value = xml.valueOf();
     */
    valueOf(): XML;

    // 可选方法
    /**
     * 返回此 XML 对象的 W3C DOM 节点表示形式。
     * @returns 返回 DOM 节点或 undefined。
     * @example
     * const xml = new XML("<root/>");
     * const domNode = xml.domNode();
     */
    domNode?(): Node | undefined;

    /**
     * 返回此 XML 对象的 W3C DOM NodeList 表示形式。
     * @returns 返回 DOM NodeList。
     * @example
     * const xml = new XML("<root/>");
     * const domNodeList = xml.domNodeList();
     */
    domNodeList?(): NodeList | undefined;

    /**
     * 使用 XPath 表达式评估此 XML 对象。
     * @param XPathExpression XPath 表达式。
     * @returns 返回评估结果或抛出 TypeError。
     * @example
     * const xml = new XML("<root><child/></root>");
     * const result = xml.xpath("//child");
     */
    xpath?(XPathExpression: string): XMLList | TypeError;
}

/**
 * 表示 XML 数据列表的类。
 * XMLList 类提供了对 XML 数据列表的操作，包括属性访问、子节点操作等。
 */
declare class XMLList extends Array<XML> {
    /**
     * 创建一个新的 XMLList 对象。
     * @param value XML 数据列表的初始值，可以是字符串、XML 对象或 XMLList 对象。
     * @example
     * const xmlList = new XMLList("<root><child1/><child2/></root>");
     */
    constructor(value?: string | XML | XMLList);

    /**
     * 返回此 XMLList 对象中每个 XML 对象的指定属性。
     * @param attributeName 属性名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含所有匹配的属性。
     * @example
     * const xmlList = new XMLList("<root><child attr='value'/></root>");
     * const attrs = xmlList.attribute("attr");
     */
    attribute(attributeName: string | QName): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的所有属性。
     * @returns 返回一个 XMLList，包含所有属性。
     * @example
     * const xmlList = new XMLList("<root><child attr1='value1' attr2='value2'/></root>");
     * const attrs = xmlList.attributes();
     */
    attributes(): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的指定子节点。
     * @param propertyName 子节点的名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含所有匹配的子节点。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const children = xmlList.child("child");
     */
    child(propertyName: string | QName): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的所有子节点。
     * @returns 返回一个 XMLList，包含所有子节点。
     * @example
     * const xmlList = new XMLList("<root><child1/><child2/></root>");
     * const children = xmlList.children();
     */
    children(): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的注释子节点。
     * @returns 返回一个 XMLList，包含所有注释子节点。
     * @example
     * const xmlList = new XMLList("<root><!-- comment --></root>");
     * const comments = xmlList.comments();
     */
    comments(): XMLList;

    /**
     * 检查此 XMLList 对象是否包含与给定值相等的 XML 对象。
     * @param value 要比较的值。
     * @returns 返回一个布尔值，表示是否包含。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const child = new XML("<child/>");
     * const contains = xmlList.contains(child);
     */
    contains(value: XML | XMLList): boolean;

    /**
     * 返回此 XMLList 对象的深拷贝。
     * @returns 返回此 XMLList 对象的深拷贝。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const copy = xmlList.copy();
     */
    copy(): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的后代节点。
     * @param name 后代节点的名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含所有匹配的后代节点。
     * @example
     * const xmlList = new XMLList("<root><child><grandchild/></child></root>");
     * const descendants = xmlList.descendants("grandchild");
     */
    descendants(name?: string | QName): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的子元素。
     * @param name 子元素的名称，可以是字符串或 QName。
     * @returns 返回一个 XMLList，包含所有匹配的子元素。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const elements = xmlList.elements("child");
     */
    elements(name?: string | QName): XMLList;

    /**
     * 检查此对象是否具有由 P 指定的属性。
     * @param P 属性名称。
     * @returns 返回一个布尔值，表示是否具有该属性。
     * @example
     * const xmlList = new XMLList("<root attr='value'/>");
     * const hasAttr = xmlList.hasOwnProperty("attr");
     */
    hasOwnProperty(P: string): boolean;

    /**
     * 检查此 XMLList 对象是否包含复杂内容。
     * @returns 返回一个布尔值，表示是否包含复杂内容。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const hasComplexContent = xmlList.hasComplexContent();
     */
    hasComplexContent(): boolean;

    /**
     * 检查此 XMLList 对象是否包含简单内容。
     * @returns 返回一个布尔值，表示是否包含简单内容。
     * @example
     * const xmlList = new XMLList("<root>text</root>");
     * const hasSimpleContent = xmlList.hasSimpleContent();
     */
    hasSimpleContent(): boolean;

    /**
     * 返回此 XMLList 对象的长度。
     * @returns 返回此 XMLList 对象的长度。
     * @example
     * const xmlList = new XMLList("<root><child1/><child2/></root>");
     * const length = xmlList.length();
     */
    length(): number;

    /**
     * 将此 XMLList 对象及其所有后代节点规范化。
     * @returns 返回此 XMLList 对象。
     * @example
     * const xmlList = new XMLList("<root>text1<!-- comment -->text2</root>");
     * const normalizedXmlList = xmlList.normalize();
     */
    normalize(): XMLList;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的父节点。
     * @returns 返回父节点或 undefined。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const parent = xmlList.child("child").parent();
     */
    parent(): XML | undefined;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的处理指令子节点。
     * @param name 处理指令的名称（可选）。
     * @returns 返回一个 XMLList，包含所有处理指令子节点。
     * @example
     * const xmlList = new XMLList("<root><?pi target='data'/></root>");
     * const processingInstructions = xmlList.processingInstructions();
     */
    processingInstructions(name?: string | QName): XMLList;

    /**
     * 检查属性 P 是否可枚举。
     * @param P 属性名称。
     * @returns 返回一个布尔值，表示属性是否可枚举。
     * @example
     * const xmlList = new XMLList("<root attr='value'/>");
     * const isEnumerable = xmlList.propertyIsEnumerable("attr");
     */
    propertyIsEnumerable(P: string): boolean;

    /**
     * 返回此 XMLList 对象中每个 XML 对象的文本子节点。
     * @returns 返回一个 XMLList，包含所有文本子节点。
     * @example
     * const xmlList = new XMLList("<root>text</root>");
     * const textNodes = xmlList.text();
     */
    text(): XMLList;

    /**
     * 返回此 XMLList 对象的字符串表示形式。
     * @returns 返回字符串表示形式。
     * @example
     * const xmlList = new XMLList("<root>text</root>");
     * const str = xmlList.toString();
     */
    toString(): string;

    /**
     * 返回此 XMLList 对象的 XML 编码字符串表示形式。
     * @returns 返回 XML 编码字符串表示形式。
     * @example
     * const xmlList = new XMLList("<root>text</root>");
     * const xmlStr = xmlList.toXMLString();
     */
    toXMLString(): string;

    /**
     * 返回此 XMLList 对象。
     * @returns 返回此 XMLList 对象。
     * @example
     * const xmlList = new XMLList("<root/>");
     * const value = xmlList.valueOf();
     */
    valueOf(): XMLList;

    // 可选方法
    /**
     * 返回此 XMLList 对象的 W3C DOM 节点表示形式。
     * @returns 返回 DOM 节点或 undefined。
     * @example
     * const xmlList = new XMLList("<root/>");
     * const domNode = xmlList.domNode();
     */
    domNode?(): Node | undefined;

    /**
     * 返回此 XMLList 对象的 W3C DOM NodeList 表示形式。
     * @returns 返回 DOM NodeList。
     * @example
     * const xmlList = new XMLList("<root/>");
     * const domNodeList = xmlList.domNodeList();
     */
    domNodeList?(): NodeList | undefined;

    /**
     * 使用 XPath 表达式评估此 XMLList 对象。
     * @param XPathExpression XPath 表达式。
     * @returns 返回评估结果或抛出 TypeError。
     * @example
     * const xmlList = new XMLList("<root><child/></root>");
     * const result = xmlList.xpath("//child");
     */
    xpath?(XPathExpression: string): XMLList | TypeError;
}

// 全局对象扩展
declare global {
    /**
     * 创建一个新的 XML 对象。
     * @param value XML 数据的初始值，可以是字符串、XML 对象或 XMLList 对象。
     * @returns 返回一个新的 XML 对象。
     * @example
     * const xml = new XML("<root><child/></root>");
     */
    const XML: {
        new(value?: string | XML | XMLList): XML;
        (value?: string | XML | XMLList): XML;
        prototype: XML;
    };

    /**
     * 创建一个新的 XMLList 对象。
     * @param value XML 数据列表的初始值，可以是字符串、XML 对象或 XMLList 对象。
     * @returns 返回一个新的 XMLList 对象。
     * @example
     * const xmlList = new XMLList("<root><child1/><child2/></root>");
     */
    const XMLList: {
        new(value?: string | XML | XMLList): XMLList;
        (value?: string | XML | XMLList): XMLList;
        prototype: XMLList;
    };

    /**
     * 创建一个新的 Namespace 对象。
     * @param uri 命名空间的 URI。
     * @param prefix 命名空间的前缀（可选）。
     * @returns 返回一个新的 Namespace 对象。
     * @example
     * const ns = new Namespace("http://example.com", "ex");
     */
    const Namespace: {
        new(uri?: string, prefix?: string): Namespace;
        (uri?: string, prefix?: string): Namespace;
        prototype: Namespace;
    };

    /**
     * 创建一个新的 QName 对象。
     * @param namespace 命名空间对象或命名空间的 URI。
     * @param localName QName 的本地名。
     * @returns 返回一个新的 QName 对象。
     * @example
     * const qname = new QName("http://example.com", "localName");
     */
    const QName: {
        new(namespace?: Namespace | string, localName?: string): QName;
        (namespace?: Namespace | string, localName?: string): QName;
        prototype: QName;
    };
}