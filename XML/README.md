https://ecma-international.org/publications-and-standards/standards/ecma-357/


以下是根据文档内容整理的`XML`对象和`XMLList`对象的接口文档，采用类似于Java的表格式：

### XML对象接口

| 方法名称 | 参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| addNamespace | Namespace ns | XML | 将命名空间声明添加到此 XML 对象的作用域命名空间中，并返回此 XML 对象。 |
| appendChild | XML child | XML | 将给定的子节点添加到此 XML 对象属性的末尾，并返回此 XML 对象。 |
| attribute | string/AttributeName attributeName | XMLList | 返回一个 XMLList，其中包含与此 XML 对象相关联且具有给定属性名称的零个或一个 XML 属性。 |
| attributes | 无 | XMLList | 返回一个包含此对象的 XML 属性的 XMLList。 |
| child | string/QName propertyName | XMLList | 返回此 XML 对象中与给定的 propertyName 匹配的子项列表。 |
| childIndex | 无 | number | 返回一个数字，表示此 XML 对象在其父对象中的序号位置。 |
| children | 无 | XMLList | 返回一个 XMLList，其中包含此 XML 对象的所有属性，按顺序排列。 |
| comments | 无 | XMLList | 返回一个 XMLList，其中包含此 XML 对象中表示 XML 注释的属性。 |
| contains | XML/XMLList value | boolean | 返回将此 XML 对象与给定值进行比较的结果。 |
| copy | 无 | XML | 返回此 XML 对象的深复制副本，并将内部的 [[Parent]] 属性设置为 null。 |
| descendants | string/QName name | XMLList | 返回此 XML 对象具有给定名称的所有 XML 值的后代（子代、孙代、曾孙代等）。 |
| elements | string/QName name | XMLList | 返回一个 XMLList，其中包含此 XML 对象中所有名称为给定名称的 XML 元素的子节点。 |
| hasOwnProperty | string P | boolean | 返回一个布尔值，该值指示此对象是否具有由 P 指定的属性。 |
| hasComplexContent | 无 | boolean | 返回一个布尔值，表示此 XML 对象是否包含复杂内容。 |
| hasSimpleContent | 无 | boolean | 返回一个布尔值，表示此 XML 对象是否包含简单内容。 |
| inScopeNamespaces | 无 | Namespace[] | 返回一个 Namespace 对象的数组，这些对象代表此 XML 对象在其父对象上下文中处于作用域内的命名空间。 |
| insertChildAfter | XML child1, XML child2 | XML | 将给定的 child2 插入到此 XML 对象中给定的 child1 之后，并返回此 XML 对象。 |
| insertChildBefore | XML child1, XML child2 | XML | 将给定的 child2 插入到此 XML 对象中给定的 child1 之前，并返回此 XML 对象。 |
| length | 无 | number | 始终返回整数 1。 |
| localName | 无 | string | 返回此 XML 对象的限定名中的本地名部分。 |
| name | 无 | QName | 返回与此 XML 对象相关联的限定名称。 |
| namespace | string/undefined prefix | Namespace/undefined | 如果未指定前缀，返回与此 XML 对象的限定名称相关联的命名空间；如果指定了前缀，在该 XML 对象的作用域内查找具有给定前缀的命名空间。 |
| namespaceDeclarations | 无 | Namespace[] | 返回一个 Namespace 对象数组，这些对象代表了此 XML 对象在其父对象上下文中关联的命名空间声明。 |
| nodeKind | 无 | string | 返回一个字符串，表示此 XML 对象的 [[Class]] 类型。 |
| normalize | 无 | XML | 将此 XML 对象及其所有后代 XML 对象中的所有文本节点合并相邻的文本节点并删除空文本节点，从而转换为规范形式。 |
| parent | 无 | XML/undefined | 返回此 XML 对象的父对象。 |
| processingInstructions | string/QName name | XMLList | 返回一个 XMLList，其中包含此 XML 对象中所有名称与给定名称相同的处理指令子节点。 |
| prependChild | XML value | XML | 将给定的子节点插入到此对象中，位于其现有的 XML 属性之前，并返回此 XML 对象。 |
| propertyIsEnumerable | string P | boolean | 返回一个布尔值，该值指示当此 XML 对象用于 for-in 语句时，属性 P 是否会被包含在迭代的属性集中。 |
| removeNamespace | Namespace ns | XML | 从当前对象及其所有后代对象的作用域命名空间中移除给定的命名空间，然后返回此 XML 对象的副本。 |
| replace | string/QName propertyName, XML/XMLList/string value | XML | 用 value 替换此 XML 对象中由 propertyName 指定的 XML 属性，并返回此 XML 对象。 |
| setChildren | XML/XMLList value | XML | 用来自 value 的一组新的 XML 属性替换此 XML 对象的 XML 属性。 |
| setLocalName | string name | void | 用由给定名称构造的字符串替换此 XML 对象的本地名称。 |
| setName | string/QName name | void | 用由给定名称构建的 QName 或 AttributeName 替换此 XML 对象的名称。 |
| setNamespace | Namespace ns | void | 将与此 XML 对象名称相关联的命名空间替换为给定的命名空间。 |
| text | 无 | XMLList | 返回一个 XMLList，其中包含此 XML 对象中表示 XML 文本节点的所有 XML 属性。 |
| toString | 无 | string | 返回此 XML 对象的字符串表示形式。 |
| toXMLString | 无 | string | 返回此 XML 对象的 XML 编码字符串表示形式。 |
| valueOf | 无 | XML | 返回此 XML 对象。 |

### XMLList对象接口

| 方法名称 | 参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| attribute | string/AttributeName attributeName | XMLList | 调用此 XMLList 对象中每个 XML 对象的 attribute 方法，并返回一个包含结果的 XMLList。 |
| attributes | 无 | XMLList | 调用此 XMLList 对象中每个 XML 对象的 attributes 方法，并返回一个包含结果的 XMLList。 |
| child | string/QName propertyName | XMLList | 调用此 XMLList 对象中每个 XML 对象的 child 方法，并返回一个包含结果的 XMLList。 |
| children | 无 | XMLList | 调用此 XMLList 对象中每个 XML 对象的 children 方法，并返回一个包含结果的 XMLList。 |
| comments | 无 | XMLList | 调用此 XMLList 对象中每个 XML 对象的 comments 方法，并返回一个包含结果的 XMLList。 |
| contains | XML/XMLList value | boolean | 返回一个布尔值，该值指示此 XMLList 对象是否包含与给定值相等的 XML 对象。 |
| copy | 无 | XMLList | 返回此 XMLList 对象的深复制。 |
| descendants | string/QName name | XMLList | 调用此 XMLList 对象中每个 XML 对象的 descendants 方法，并返回一个包含结果的 XMLList。 |
| elements | string/QName name | XMLList | 调用此 XMLList 对象中每个 XML 对象的 elements 方法，并返回一个包含结果的 XMLList。 |
| hasOwnProperty | string P | boolean | 返回一个布尔值，该值指示此对象是否具有由 P 指定的属性。 |
| hasComplexContent | 无 | boolean | 返回一个布尔值，该值指示此 XMLList 对象是否包含复杂内容。 |
| hasSimpleContent | 无 | boolean | 返回一个布尔值，该值指示此 XMLList 对象是否包含简单内容。 |
| length | 无 | number | 返回此 XMLList 对象中的属性数量。 |
| normalize | 无 | XMLList | 将此 XMLList 中的所有文本节点、它所包含的所有 XML 对象以及这些 XML 对象的所有后代节点合并相邻的文本节点并删除空文本节点，从而将它们转换为规范形式。 |
| parent | 无 | XML/undefined | 如果此 XMLList 对象中的所有项具有相同的父项，则返回该父项；否则返回 undefined。 |
| processingInstructions | string/QName name | XMLList | 调用此 XMLList 对象中每个 XML 对象的 processingInstructions 方法，并返回一个包含结果的 XMLList。 |
| propertyIsEnumerable | string P | boolean | 返回一个布尔值，该值指示当此 XMLList 对象在 for-in 语句中使用时，属性 P 是否会被包含在迭代的属性集中。 |
| text | 无 | XMLList | 调用此 XMLList 对象中每个 XML 对象的 text 方法，并返回一个包含结果的 XMLList。 |
| toString | 无 | string | 返回此 XMLList 对象的字符串表示形式。 |
| toXMLString | 无 | string | 返回此 XMLList 对象的 XML 编码字符串表示形式。 |
| valueOf | 无 | XMLList | 返回此 XMLList 对象。 |

### 可选方法（XML对象和XMLList对象）

| 方法名称 | 参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| domNode | 无 | DOMNode/undefined | 返回此 XML 对象或 XMLList 对象中单个 XML 值的 W3C DOM 节点表示形式。 |
| domNodeList | 无 | DOMNodeList | 返回此 XML 对象或 XMLList 对象的 W3C DOM NodeList 表示形式。 |
| xpath | string XPathExpression | XMLList/TypeError | 根据 W3C XPath 推荐标准使用此 XML 对象或 XMLList 对象作为上下文节点来评估 XPathExpression。 |

注意：可选方法的实现取决于具体实现，可能不被所有实现支持。

