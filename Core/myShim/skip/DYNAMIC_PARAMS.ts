// tsc aa.ts --target es5 --lib 'es2015' --outDir dist

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

function DYNAMIC_PARAMS<S extends Schema>(
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
