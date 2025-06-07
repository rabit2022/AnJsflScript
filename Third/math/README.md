请注意,这两个库都是重型库, 因此使用它们可能需要很长的时间.

```javascript
// numjs 计算
// var a = numjs.array([1, 2, 3]);
// var b = numjs.array([4, 5, 6]);
// var c = a.dot(b);
// fl.trace(c.toString());

// mathjs 计算
var a = mathjs.matrix([1, 2, 3]);
var b = mathjs.matrix([4, 5, 6]);
var c = mathjs.multiply(a, b);
fl.trace(c.toString());
```

这两个简单的计算可以用两种不同的库来实现, 但是numjs更快一些.
