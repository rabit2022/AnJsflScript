## xpath
DOM 3 XPath 1.0 implemention and helper for JavaScript, with node.js support.

Originally written by Cameron McCormack ([blog](http://mcc.id.au/xpathjs)).

Additional contributions from  
Yaron Naveh ([blog](http://webservices20.blogspot.com/))  
goto100  
Thomas Weinert  
Jimmy Rishe  
and [others](https://github.com/goto100/xpath/graphs/contributors)

## Install
Install with [npm](http://github.com/isaacs/npm):

    npm install xpath

xpath is XML engine agnostic but we recommend [xmldom](https://github.com/xmldom/xmldom):

    npm install @xmldom/xmldom

## API Documentation

Can be found [here](https://github.com/goto100/xpath/blob/master/docs/xpath%20methods.md). See below for example usage.

## Your first xpath:

`````javascript
var xpath = require('Third/XML/xpath-0.0');
var dom = require('@xmldom/xmldom').DOMParser;

var XML = "<book><title>Harry Potter</title></book>";
var doc = new dom().parseFromString(XML, 'text/XML');
var nodes = xpath.select("//title", doc);

console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
console.log("Node: " + nodes[0].toString());
`````
➡

    title: Harry Potter
    Node: <title>Harry Potter</title>

### Alternatively

Using the same interface you have on modern browsers ([MDN])

`````javascript
var node = null;
var XML = "<book author='J. K. Rowling'><title>Harry Potter</title></book>";
var doc = new dom().parseFromString(XML, 'text/XML');
var result = xpath.evaluate(
    "/book/title",            // xpathExpression
    doc,                        // contextNode
    null,                       // namespaceResolver
    xpath.XPathResult.ANY_TYPE, // resultType
    null                        // result
);

node = result.iterateNext();
while (node) {
    console.log(node.localName + ": " + node.firstChild.data);
    console.log("Node: " + node.toString());

    node = result.iterateNext();
}
`````
➡

    title: Harry Potter
    Node: <title>Harry Potter</title>

## Evaluate string values directly:
`````javascript
var XML = "<book><title>Harry Potter</title></book>";
var doc = new dom().parseFromString(XML, 'text/XML');
var title = xpath.select("string(//title)", doc);

console.log(title);
`````
➡

    Harry Potter

## Namespaces
`````javascript
var XML = "<book><title xmlns='myns'>Harry Potter</title></book>";
var doc = new dom().parseFromString(XML, 'text/XML');
var node = xpath.select("//*[local-name(.)='title' and namespace-uri(.)='myns']", doc)[0];

console.log(node.namespaceURI);
`````
➡

    myns

## Namespaces with easy mappings
`````javascript
var XML = "<book xmlns:bookml='http://example.com/book'><bookml:title>Harry Potter</bookml:title></book>"
var select = xpath.useNamespaces({"bookml": "http://example.com/book"});

console.log(select('//bookml:title/text()', doc)[0].nodeValue);
`````
➡

    Harry Potter

## Default namespace with mapping
`````javascript
var XML = "<book xmlns='http://example.com/book'><title>Harry Potter</title></book>"
var select = xpath.useNamespaces({"bookml": "http://example.com/book"});

console.log(select('//bookml:title/text()', doc)[0].nodeValue);
`````
➡

    Harry Potter

## Attributes
`````javascript
var XML = "<book author='J. K. Rowling'><title>Harry Potter</title></book>";
var doc = new dom().parseFromString(XML, 'text/XML');
var author = xpath.select1("/book/@author", doc).value;

console.log(author);
`````
➡

    J. K. Rowling

[MDN]: https://developer.mozilla.org/en/docs/Web/API/Document/evaluate

## License
MIT
