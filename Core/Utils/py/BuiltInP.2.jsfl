function createObject(proto) {
    function F() {
    }

    F.prototype = proto;
    return new F();
}

function isArray(obj) {
    return obj instanceof Array;
}

// 父类 Iter
function Iter(object) {
    if (isArray(object)) {
        this.array = object;
        this.length = this.array.length;
        this.index = -1; // 当前索引
        this.iterable = this.array; // 要枚举的对象

        this.done = false;
    } else {
        throw new TypeError("Object is not iterable");
    }
}

Iter.prototype.next = function () {
    if (this.index + 1 < this.length) {
        this.index++;
        return this.array[this.index];
    } else {
        this.done = true;
        return undefined;
    }
};

Iter.prototype.reset = function () {
    this.index = -1;
    this.done = false;
};

/**
 * 返回一个枚举迭代器。iterable 必须是一个序列，或 iterator，或其他支持迭代的对象。
 * @param {Array|Object|string|Iterator} iterable 要枚举的可迭代对象。
 * @param {number}[start=0] 起始索引。
 */
function Enumerate(iterable, start) {
    if (start === undefined) {
        start = 0; // 默认从 0 开始
    }

    // 调用父类的构造函数
    iter.call(this, iterable);

    // 设置起始索引
    this.index = start - 1;
    this.length = this.array.length;
    this.iterable = this.array;

    this.done = false;
}

// 继承自 iter
// Enumerate.prototype = Object.create(Iter.prototype);
Enumerate.prototype = createObject(Iter.prototype);
Enumerate.prototype.constructor = Enumerate;

Enumerate.prototype.next = function () {
    if (this.index < this.length - 1) {
        this.index++;
        return {index: this.index, value: this.array[this.index]};
    } else {
        this.done = true;
        return undefined;
    }
};

Enumerate.prototype.reset = function () {
    this.index = -1;
    this.done = false;
};

/**
 * 由 start 到 stop 之间，以 step 为步长生成一个序列。
 * @param {number} start 序列起始值。
 * @param {number} [stop=start] 序列结束值。
 * @param {number} [step=1] 序列步长。
 */
function Range(start, stop, step) {
    // 参数处理
    if (arguments.length === 1) {
        stop = start;
        start = 0;
        step = 1;
    } else if (arguments.length === 2) {
        step = 1;
    } else if (arguments.length === 0) {
        throw new Error("Range requires at least one argument");
    }

    if (step === 0) {
        throw new Error("Range step argument must not be zero");
    }

    var length = Math.max(0, Math.ceil((stop - start) / step));

    // 生成数组
    var iterable = [];
    for (var i = 0; i < length; i++) {
        iterable.push(start + i * step);
    }

    // 调用父类的构造函数
    Iter.call(this, iterable);

    // 显式地将父类的属性复制到子类实例上
    this.length = this.array.length;
    this.index = -1;
    this.iterable = this.array;

    this.start = start;
    this.stop = stop;
    this.step = step;

    this.originalStart = this.start;
    this.done = false;
}

// 继承自 Iter
// Range.prototype = Object.create(Iter.prototype);
Range.prototype = createObject(Iter.prototype);
Range.prototype.constructor = Range;

Range.prototype.next = function () {
    if ((this.step > 0 && this.start < this.stop) ||
        (this.step < 0 && this.start > this.stop)) {
        var value = this.start;
        this.start += this.step;
        this.index++;
        return value;
    } else {
        this.done = true;
        return undefined;
    }
};

Range.prototype.reset = function () {
    this.start = this.originalStart;
    this.index = -1;
    this.done = false;
};

