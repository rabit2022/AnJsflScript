// 定义枚举
const ElementType = {
    ELEMENT: 'element',
    BOOLEAN: 'boolean',
    ELEMENT_INDEX: 'element_index',
    ELEMENT_NAME: 'element_name',
    CONTEXT: 'context',
};

// 策略管理器
const { StrategyManager } = require('../strategy/strategy');
const Context = require('../Context');
const elementStrategy = new StrategyManager();

// 策略实现
elementStrategy
    .add(ElementType.ELEMENT, (value, frame) => {
        if (frame.elements.includes(value)) {
            return value;
        }
        throw new ReferenceError(`ReferenceError: Element not found in the current frame.`);
    })
    .add(ElementType.BOOLEAN, (value, frame) => {
        if (value === true || value === undefined) {
            return frame.elements[0];
        }
    })
    .add(ElementType.ELEMENT_INDEX, (value, frame) => {
        if (value >= 0 && value < frame.elements.length) {
            return frame.elements[value];
        }
        throw new ReferenceError(`ReferenceError: "${value}" is not a valid element index.`);
    })
    .add(ElementType.ELEMENT_NAME, (value, frame) => {
        // for (const element of frame.elements) {
        //     if (element.name === value) {
        //         return element;
        //     }
        // }
        // throw new ReferenceError(`ReferenceError: "${value}" is not a valid element name.`);
        return frame.elements.find((element) => element.name === value) || null;
    })
    .add(ElementType.CONTEXT, (value) => {
        return value.element;
    });

// 工厂函数
function ElementFactory(value, frame) {
    if (value instanceof Element) {
        return elementStrategy.use(ElementType.ELEMENT, value, frame);
    } else if (typeof value === 'boolean' || value === undefined) {
        return elementStrategy.use(ElementType.BOOLEAN, value, frame);
    } else if (typeof value === 'number') {
        return elementStrategy.use(ElementType.ELEMENT_INDEX, value, frame);
    } else if (typeof value === 'string') {
        return elementStrategy.use(ElementType.ELEMENT_NAME, value, frame);
    } else if (value instanceof Context) {
        return elementStrategy.use(ElementType.CONTEXT, value);
    } else {
        throw new TypeError(`Unsupported type for value: ${typeof value}`);
    }
}

/**
 * 设置元素对象
 * @param {*} value - 支持多种类型的元素参数
 * @returns {Context} 当前Context实例
 */
Context.prototype.setElement = function (value) {
    if (value == null) return this;
    if (!this.frame) {
        this.setFrame(true);
        if (!this.frame) return this;
    }

    const element = ElementFactory(value, this.frame);
    if (element) {
        this.element = element;
        this.context = 'element';
    }
    return this;
};

// AllElements
Object.defineProperty(Context.prototype, 'AllElements', {
    get: function () {
        if (!this.layer || !this.timeline || !this.frame) return null;

        return this.frame.elements;
    },
});

// elements
// Context.prototype.elements = this.AllElements;
Object.defineProperty(Context.prototype, 'elements', {
    get: function () {
        return this.AllElements;
    },
});


// curElement
Object.defineProperty(Context.prototype, 'curElement', {
    get: function () {
        if (!this.element) return null;

        return this.element;
    },
});

// curElementIndex
Object.defineProperty(Context.prototype, 'curElementIndex', {
    get: function () {
        if (!this.element) return -1;

        return this.AllElements.indexOf(this.element);
    },
});
