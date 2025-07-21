/**
 * @file: FUNC.define.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/21 14:12
 * @project: AnJsflScript
 * @description:
 */

/**
 * 检查值是否为 null、undefined 或 空值。
 * @param {*} value - 要检查的值。
 * @returns {boolean} - 如果值为 null、undefined 或空字符串，则返回 true；否则返回 false。
 */
export function IsNullOrEmpty(value) {
    return value === null || value === undefined || IsEmpty(value);
}

/**
 * 检查值是否为空（支持字符串、数组和对象）。
 * @param {*} value - 要检查的值。
 * @returns {boolean} - 如果值为空，则返回 true；否则返回 false。
 */
export function IsEmpty(value) {
    // 检查 null 或 undefined
    if (value === null) return true;

    // 检查空字符串
    var STRING_BLACK = / \n\r\t/g;
    if (typeof value === "string" && value.trim().replace(STRING_BLACK, "").length === 0)
        return true;

    // 检查空数组
    if (Array.isArray(value) && value.length === 0) return true;

    // 检查空对象
    if (
        typeof value === "object" &&
        value.constructor === Object &&
        Object.keys(value).length === 0
    )
        return true;

    return false; // 其他情况视为非空
}

// region INHERIT_MACRO

/**
 * 构造函数类型：既包含构造签名，也包含静态成员。
 * 允许添加 superConstructor 和 superClass
 * － T 为实例类型
 * － S 为静态部分（构造签名 + 静态成员）
 */
type Constructor<T = {}, S = {}> = S &
    (new (...args: any[]) => T) & {
    superConstructor?: Constructor;
    superClass?: object;
};

/**
 * Subclasses an class from a parent class (note that $ arguments can be passed in any order)
 * 封装继承函数，用于实现子类继承父类。
 * @param    {Function}    child            The child class
 * @param    {Function}    $parent            The parent class
 * @param    {Object}    $properties        Properties to add to the chlid class
 * @see https://github.com/davestewart/xJSFL
 * @note
 * 如何在子类中模拟 `super` 的行为：
 * 1. 在子类构造函数中调用父类构造函数：
 *    使用 `superCls_CLASS.call(this, ...args)` 调用父类构造函数。
 *    示例：`superCls_CLASS.call(this, name);`
 *
 * 2. 在子类方法中调用父类方法：
 *    使用 `this._super.methodName.call(this, ...args)` 调用父类方法。
 *    示例：`this._super.sayHello.call(this);`
 */
export function INHERIT_MACRO<
    TSub,
    TSuper,
    TSuperStatic,
    TSubStatic,
    TProps extends object = {}
>(
    SUB_CLASS: Constructor<TSub, TSubStatic>,
    SUPER_CLASS: Constructor<TSuper, TSuperStatic>,
    properties?: TProps & ThisType<TSub & TProps & TSuper>
): asserts SUB_CLASS is Constructor<TSub & TProps & TSuper, TSubStatic & TSuperStatic> & {
    superConstructor: Constructor<TSuper, TSuperStatic>;
    superClass: TSuper;
} {
    // @ts-ignore es6
    // Object.assign 是否存在
    if (typeof Object.assign === "function") {
        INHERIT_MACRO_ES6(SUB_CLASS, SUPER_CLASS, properties);
    } else {
        INHERIT_MACRO_OLD(SUB_CLASS, SUPER_CLASS, properties);
    }

}


function INHERIT_MACRO_ES6(SUB_CLASS, SUPER_CLASS, properties) {
    // 继承父类原型
    SUB_CLASS.prototype = Object.create(SUPER_CLASS.prototype);
    SUB_CLASS.prototype.constructor = SUB_CLASS;

    // 添加父类引用
    SUB_CLASS.superConstructor = SUPER_CLASS;
    SUB_CLASS.superClass = SUPER_CLASS.prototype;

    // @ts-ignore
    // 继承父类 静态方法
    Object.assign(SUB_CLASS, SUPER_CLASS);

    // 添加属性或方法
    if (properties) {
        // @ts-ignore
        Object.assign(SUB_CLASS.prototype, properties);
    }
}

function INHERIT_MACRO_OLD(child, $parent, $properties) {
    // variables
    var parent, properties;

    // grab correct arguments
    [$parent, $properties].forEach(function(arg) {
        if (typeof arg === "function") parent = arg;
        else if (typeof arg === "object") properties = arg;
    });

    // extend child from a parent
    if (parent) {
        // @ts-ignore block
        // set up the inheritance chain
        function Inheritance() {
            //this.superConstructor		= parent;
            //this.superClass				= parent.prototype;
        }

        Inheritance.prototype = parent.prototype;
        child.prototype = new Inheritance();
        child.prototype.constructor = child;

        // create references to parent
        child.superConstructor = parent;
        child.superClass = parent.prototype;

        // create super methods
        // can this be done?
    }

    // add properties to child
    if (properties) {
        for (var name in properties) {
            // check for accessors
            var getter = properties.__lookupGetter__(name);
            var setter = properties.__lookupSetter__(name);

            // assign accessors
            if (getter || setter) {
                if (getter) {
                    child.prototype.__defineGetter__(name, getter);
                }
                if (setter) {
                    child.prototype.__defineSetter__(name, setter);
                }
            }

            // assign vanilla properties
            else {
                child.prototype[name] = properties[name];
            }
        }
    }
}

/**
 function Person(name) {
 this.name = name;
 function sayHello() {
 console.log("Hello, " + this.name + "!");
 }
 this.sayHello = sayHello;
 }

 function Student(name, grade) {
 Person.call(this, name);
 this.grade = grade;

 }

 INHERIT_MACRO(Student, Person, {
 getGrade: function () {
 return this.grade;
 }
 });

 console.log(new Student("Alice", 10).getGrade()); // 10
 console.log(new Student("Alice", 10).name); // "Alice"

 new Student("Bob", 11).sayHello(); // "Hello, Bob!"
 */

/**
 class Person {
 name: string;
 constructor(name) {
 this.name = name;
 }
 sayHello() {
 console.log("Hello, " + this.name + "!");
 }
 }

 class Student extends Person {
 grade: number;
 constructor(name, grade) {
 super(name);
 this.grade = grade;
 }
 getGrade() {
 return this.grade;
 }
 }

 INHERIT_MACRO(Student, Person, {
 sayGoodbye() {
 console.log("Goodbye, " + this.name + "!");
 }
 });

 console.log(new Student("Alice", 10).getGrade()); // 10
 console.log(new Student("Alice", 10).name); // "Alice"

 new Student("Bob", 11).sayHello(); // "Hello, Bob!"
 */

// endregion INHERIT_MACRO

// region DYNAMIC_PARAMS
// 支持的原始类型 + 任意构造函数
type TypeToken =
    | "string"
    | "number"
    | "boolean"
    | "null"
    | "undefined"
    | "array"
    | "object"
    | (new (...a: any[]) => any); // 自定义类

// 一个关键字可以对应多个候选项（例如 age 可以是 number|string）
type KeywordRule = TypeToken | TypeToken[];

// schema：关键字 → 允许的 TypeToken
type Schema = Record<string, KeywordRule>;

// 根据 schema 推导结果类型
type Parsed<S extends Schema> = {
    [K in keyof S]: any;
};

/**
 * 动态解析参数并分配到指定的变量中
 * 使得函数可以接收不同类型的参数，不用按照顺序指定参数类型，并自动分配到指定的变量中。
 * @param {...*|Array} args - 传入的参数数组
 * @param {Options} options - 参数处理选项
 * @returns {Object} - 解析后的参数对象
 * @note undefined 类型参数将被忽略
 */
export function DYNAMIC_PARAMS<S extends Schema>(
    args: any[],
    schema: S,
    defaults: Partial<Parsed<S>> = {}
): Parsed<S> {
    const res = { ...defaults } as any;
    // @ts-ignore
    const used = new Set<number>();

    for (const key in schema) {
        const rules = ([] as TypeToken[]).concat(schema[key]); // 统一成数组
        for (let i = 0; i < args.length; i++) {
            if (used.has(i)) continue;
            const v = args[i];
            const ok = rules.some((r) => {
                if (r === "string") return typeof v === "string";
                if (r === "number") return typeof v === "number";
                if (r === "boolean") return typeof v === "boolean";
                if (r === "null") return v === null;
                if (r === "undefined") return v === undefined;
                if (r === "array") return Array.isArray(v);
                if (r === "object")
                    return v && typeof v === "object" && !Array.isArray(v);
                return v instanceof r; // 自定义类
            });
            if (ok) {
                res[key] = v;
                used.add(i);
                break;
            }
        }
    }
    return res as Parsed<S>;
}

/**
 class Person {
 name: string;
 age: number;

 constructor(name: string, age: number) {
 this.name = name;
 this.age = age;
 }
 }

 function test(...args: any[]) {

 const schema: Schema = {
 age: ['number', 'string'],
 isMale: ['boolean', 'number', 'string'],
 onhashchange: ['null', 'undefined', 'string'],
 arr: ['array'],
 obj: ['object'],
 person: [Person, 'object']
 };

 const defaults = {
 age: 18,
 isMale: false,
 onhashchange: undefined,
 arr: [],
 obj: {},
 person: new Person('Bob', 30)
 };
 const config = DYNAMIC_PARAMS(args, schema, defaults);
 console.log("test->", config);
 }

 test(1, 2);
 */

// endregion DYNAMIC_PARAMS
