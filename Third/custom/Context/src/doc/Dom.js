const {StrategyManager} = require("../strategy/strategy");
const Context = require("../Context");

// enum
const DomType = {
    BOOLEAN: "boolean",
    DOCUMENT: "document",
    NUMBER: "number",
    STRING: "string",
    // FILE: "file",
    CONTEXT: "context",
};

const domStrategies = new StrategyManager();
domStrategies
    .add(DomType.BOOLEAN, (value) => {
        if (value === true || value === undefined) {
            const dom = fl.getDocumentDOM();
            return dom;
        } else {
            return null;
        }
    })
    .add(DomType.DOCUMENT, (value) => {
        const dom = value;
        return dom;
    })
    .add(DomType.NUMBER, (value) => {
        const dom = fl.documents[value];
        return dom;
    })
    .add(DomType.STRING, (value) => {
        let dom;
        if (/\.fla$/.test(value)) {
            dom = fl.openDocument(value);
        } else {
            dom = fl.documents.filter(function (e) {
                return e.name === value;
            })[0];
        }
        return dom;
    })
    .add(DomType.CONTEXT, (value) => {
        const dom = value.dom;
        return dom;
    });

function DomFactory(value) {
    if (typeof value === "boolean" || value === undefined) {
        return domStrategies.use(DomType.BOOLEAN, value);
    } else if (value instanceof Document) {
        return domStrategies.use(DomType.DOCUMENT, value);
    } else if (typeof value === "number") {
        return domStrategies.use(DomType.NUMBER, value);
    } else if (typeof value === "string") {
        return domStrategies.use(DomType.STRING, value);
    } else if (value instanceof Context) {
        return domStrategies.use(DomType.CONTEXT, value);
    } else {
        throw new Error("Invalid dom type");
    }
}

/**
 * 设置DOM对象
 * @param {*} value - 支持多种类型的DOM参数
 * @returns {Context} 当前Context实例
 */
Context.prototype.setDOM = function (value) {
    if (value == null) return this;
    const dom = DomFactory(value);

    // context
    if (dom) {
        // nullify related elements if timeline changes
        if (this.dom !== dom) {
            this.clearDependentProperties();
        }
        // properties
        this.context = 'dom';
        this.dom = dom;
    }
    // return
    return this;
}

/**
 * 清除依赖DOM的属性
 */
Context.prototype.clearDependentProperties = function () {
    this.item = null;
    this.timeline = null;
    this.layer = null;
    this.frame = null;
    this.element = null;
};

/**
 * doc , 兼容老版本的属性
 */
Object.defineProperty(Context.prototype, "doc", {
    get: function () {
        return this.dom;
    }
});


