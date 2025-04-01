flash 环境下，许多第三方库的功能都与预期不符,可能会有额外的问题。

这是很普遍的现象,因此使用第三方库时,请仔细验证其功能是否符合预期。
或者使用依赖少的第三方库,或者自己实现功能。

例如：
- jquery: append方法在某些情况下会失效

```javascript
require(['jquery','xmldom'], function ($,{DOMParser, XMLSerializer}) {

const xml = '<root><radiogroup id="headDirection" orient="horizontal"><hbox></hbox></radiogroup></root>';

// 解析 XML 字符串
var xmlDoc = $.parseXML(xml); // 解析 XML 字符串
var $xml = $(xmlDoc); // 将解析后的 XML 文档转换为 jQuery 对象

// 获取所有 <radiogroup> 节点
var $radiogroups = $xml.find('radiogroup');
console.log($radiogroups.length); // 输出 <radiogroup> 节点的数量

// 获取 <hbox> 节点
var $hbox = $radiogroups.find('hbox');
console.log($hbox.length); // 输出 <hbox> 节点的数量

// 定义要添加的 <radio> 元素
var radios = [
    '<radio id="left" label="头部向左" value="-1" selected="true"/>',
    '<radio id="right" label="头部向右" value="1"/>',
    '<radio id="center" label="头部向中心" value="0"/>',
    '<radio id="random" label="随机" value="2"/>',
    '<radio id="none" label="无" value="-2"/>'
];

// 将所有 <radio> 元素添加到 <hbox> 中
radios.forEach(function(radio) {
    $hbox.append(radio);
});

// 将 <hbox> 添加到 <radiogroup> 中
$($radiogroups[0]).append($hbox);

// 将整个容器转换为 XML 字符串
var serializer = new XMLSerializer();
var xmlString = serializer.serializeToString($xml[0]);

// 输出最终的 XML 字符串
console.log(xmlString);
});
```

hbox 节点的 append 方法在某些情况下会失效.
暂时无法确定原因,polyfill 仅补充了 Function.prototype.bind 方法,但是 结果与 nodejs 差别很大。

- core-js: 一些 polyfill 功能不符合预期,string.includes() 只返回 true 
           object.entries() 返回的数组 永远为空


