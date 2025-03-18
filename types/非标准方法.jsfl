/**
 * @file: 非标准方法.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/16 21:49
 * @project: AnJsflScript
 * @description:
 * @source :https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features
 */

/**
 * 废弃的语法,虽然可以运行，但是编辑器会提示错误。
 * @deprecated for each(param in [$type, $level]) {} </br>
 * @note for (var param in [$type, $level]) {} </br>
 *       这里的结果是( 0,1,其他), 而不是($type,$level), 所以不建议这样使用。</br>
 *       不要使用 for each 语法，编辑器会提示错误，格式化后也会报错。</br>
 * @example
 * // 使用 for...of  es6
 * for (const param of [$type, $level]) {
 *     console.log(param);
 * }
 *
 * // 或者使用 forEach  es5
 * [$type, $level].forEach(param => {
 *     console.log(param);
 * });
 */
each = function (param) {};

/**
 *  with语句
 *  @deprecated 建议使用 let 或者 const 声明变量。</br>
 *  @example
 *  // 建议使用 let 或者 const 声明变量
 *  let obj = {
 *      name: "John",
 *      age: 30
 *  };
 *
 *  // 或者使用 Object.create() 方法创建新对象
 *  let obj = Object.create({
 *      name: "John",
 *      age: 30
 *  });
 */
with (obj) {
    /* empty */
}

/**
 * 定义对象的属性的 getter 方法。
 * @param {string} prop - 要定义的属性名。
 * @param {function} getterFunction - 要定义的 getter 方法，当访问属性时会被调用。
 * @deprecated 已经废弃，请使用 Object.defineProperty() 方法代替。
 * @example
 * const obj = {};
 * obj.__defineGetter__("name", function() {
 *   return "Getter Value";
 * });
 * console.log(obj.name); // 输出: Getter Value
 *
 * // 推荐的替代实现：
 * const obj = {};
 * Object.defineProperty(obj, "name", {
 *   get: function() {
 *     return "Getter Value";
 *   }
 * });
 * console.log(obj.name); // 输出: Getter Value
 */
Object.prototype.__defineGetter__ = function (prop, getterFunction) {};

/**
 * 定义对象的属性的 setter 方法。
 * @param {string} prop - 要定义的属性名。
 * @param {function} setterFunction - 要定义的 setter 方法，当设置属性值时会被调用。
 * @deprecated 已经废弃，请使用 Object.defineProperty() 方法代替。
 * @example
 * const obj = {};
 * obj.__defineSetter__("name", function(value) {
 *   console.log("Setter Value:", value);
 * });
 * obj.name = "New Value"; // 输出: Setter Value: New Value
 *
 * // 推荐的替代实现：
 * const obj = {};
 * Object.defineProperty(obj, "name", {
 *   set: function(value) {
 *     console.log("Setter Value:", value);
 *   }
 * });
 * obj.name = "New Value"; // 输出: Setter Value: New Value
 */
Object.prototype.__defineSetter__ = function (prop, setterFunction) {};

/**
 * 查找对象的属性的 getter 方法。
 * @param {string} prop - 要查找的属性名。
 * @returns {function} - 如果属性有 getter 方法，则返回该方法；否则返回 undefined。
 * @deprecated 已经废弃，请使用 Object.getOwnPropertyDescriptor() 方法代替。
 * @example
 * const obj = {
 *   get name() { return "Getter Value"; }
 * };
 * const getter = obj.__lookupGetter__("name");
 * console.log(getter); // 输出: [Function]
 * console.log(getter.call(obj)); // 输出: Getter Value
 *
 * // 推荐的替代实现：
 * const obj = {
 *   get name() { return "Getter Value"; }
 * };
 * const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
 * console.log(descriptor.get); // 输出: [Function]
 */
Object.prototype.__lookupGetter__ = function (prop) {};

/**
 * 查找对象的属性的 setter 方法。
 * @param {string} prop - 要查找的属性名。
 * @returns {function} - 如果属性有 setter 方法，则返回该方法；否则返回 undefined。
 * @deprecated 已经废弃，请使用 Object.getOwnPropertyDescriptor() 方法代替。
 * @example
 * const obj = {
 *   set name(value) { console.log("Setter Value:", value); }
 * };
 * const setter = obj.__lookupSetter__("name");
 * console.log(setter); // 输出: [Function]
 * setter.call(obj, "New Value"); // 输出: Setter Value: New Value
 *
 * // 推荐的替代实现：
 * const obj = {
 *   set name(value) { console.log("Setter Value:", value); }
 * };
 * const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
 * console.log(descriptor.set); // 输出: [Function]
 */
Object.prototype.__lookupSetter__ = function (prop) {};

// __count__	返回直接在用户定义的对象上的可枚举属性的数量。	Object.keys()
// __parent__	指向对象的上下文	没有直接的替换方法
// __iterator__	和遗留的生成器和迭代器一起使用。	Symbol.iterator 和新的迭代协议
// __noSuchMethod__	当一个不存在的属性被作为方法调用时，这个方法被调用。	Proxy
// 获取源文本  数组、数字、字符串等的 toSource() 方法和 uneval() 全局函数已经过时。使用 toString()，或者编写你自己的序列化方法来代替

/**
 * 返回直接在用户定义的对象上的可枚举属性的数量。
 * @returns {number} - 直接在用户定义的对象上的可枚举属性的数量。
 * @deprecated 已经废弃，请使用 Object.keys() 方法代替。
 * @example
 * const obj = {
 *   name: "John",
 *   age: 30
 * };
 * console.log(obj.__count__); // 输出: 2
 */
Object.prototype.__count__ = function () {};

/**
 * 返回对象的上下文。
 * @returns {Object} - 如果对象有上下文，则返回该上下文；否则返回 undefined。
 * @deprecated 已经废弃，没有直接的替换方法。
 * @example
 * const obj = {
 *   name: "John",
 *   age: 30
 * };
 * const context = obj.__parent__;
 * console.log(context); // 输出: undefined
 */
Object.prototype.__parent__ = function () {};

/**
 * 和遗留的生成器和迭代器一起使用。
 * @returns {Iterator} - 返回一个迭代器对象。
 * @deprecated 已经废弃，请使用 Symbol.iterator 和新的迭代协议代替。
 * @example
 * const obj = {
 *   name: "John",
 *   age: 30
 * };
 * const iterator = obj.__iterator__();
 * console.log(iterator.next()); // 输出: { value: "John", done: false }
 * console.log(iterator.next()); // 输出: { value: 30, done: false }
 * console.log(iterator.next()); // 输出: { value: undefined, done: true }
 */
Object.prototype.__iterator__ = function () {};

/**
 * 当一个不存在的属性被作为方法调用时，这个方法被调用。
 * @param {string} name - 调用的方法名。
 * @param {Array} args - 调用方法的参数。
 * @returns {any} - 方法的返回值。 如果方法不存在，则返回 undefined。
 * @deprecated 已经废弃，请使用 Proxy 代替。
 * @example
 * const obj = {
 *   name: "John",
 *   age: 30
 * };
 * const result = obj.__noSuchMethod__("toString", []);
 * console.log(result); // 输出: [object Object]
 */
Object.prototype.__noSuchMethod__ = function (name, args) {};

/**
 * 获取源文本。
 * @returns {string} - 返回对象的源文本。
 * @deprecated 已经废弃，请使用 toString() 方法代替。
 * @example
 * const obj = {
 *   name: "John",
 *   age: 30
 * };
 * console.log(obj.toSource()); // 输出: [object Object]
 */
Object.prototype.toSource = function () {};
/**
 * 获取对象的源文本。
 * @returns {string} - 返回对象的源文本。
 * @deprecated 已经废弃，请使用 toString() 方法代替。
 * @example
 * const obj = {
 *   name: "John",
 *   age: 30
 * };
 * console.log(uneval(obj)); // 输出: [object Object]
 */
uneval = function (obj) {};

/**
 * 数组推导式。
 * @param {Array} iterable - 要迭代的数组。
 * @param {function} callback - 回调函数，接收数组元素作为参数。
 * @returns {Array} - 返回一个数组。
 * @deprecated 已经废弃，请使用数组的 map() 方法代替。
 * @example
 * const iterable = [1, 2, 3];
 * const result = [for (x of iterable) x * 2];
 * console.log(result); // 输出: [2, 4, 6]
 */
// 遗留的数组推导式
// [for (x of iterable) x]
// [for (x of iterable) if (condition) x]
// [for (x of iterable) for (y of iterable) x + y]
//
// // 遗留的生成器推导式
// (for (x of iterable) x)
// (for (x of iterable) if (condition) x)
// (for (x of iterable) for (y of iterable) x + y)
var $for = function (iterable, callback) {};
