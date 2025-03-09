/**
 * 通用类类型，用于表示构造函数。
 */
export type Class = { new (...args: any[]): any };
// export type Class<T> = { new(): T };
