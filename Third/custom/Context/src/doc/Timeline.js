const {StrategyManager} = require("../strategy/strategy");
const Context = require("../Context");

// enum
const TimelineType = {
    TIMELINE: "TIMELINE",
    BOOLEAN: "BOOLEAN",
    SYMBOL_ITEM: "SYMBOL_ITEM",
    SYMBOL_INSTANCE: "SYMBOL_INSTANCE",
    CONTEXT: "CONTEXT",
    LIBRARY_ITEM_PATH: "LIBRARY_ITEM_PATH",
    SCENE_INDEX: "SCENE_INDEX",
    DOCUMENT_ROOT: "DOCUMENT_ROOT"
};

const timelineStrategies = new StrategyManager();
timelineStrategies
    .add(TimelineType.TIMELINE, function (value, dom) {
        const timeline = value;
        const items = dom.library.items;
        const item = items.find(item => item instanceof SymbolItem && item.timeline === timeline);
        return [item, timeline];
    })
    .add(TimelineType.BOOLEAN, function (value, dom) {
        if (value === true || value === undefined) {
            const timeline = dom.getTimeline();
            const items = dom.library.items;
            const item = items.find(item => item instanceof SymbolItem && item.timeline === timeline);
            return [item, timeline];
        } else {
            return [undefined, undefined];
        }
    })
    .add(TimelineType.SYMBOL_ITEM, function (value) {
        const item = value;
        const timeline = item.timeline;
        return [item, timeline];
    })
    .add(TimelineType.SYMBOL_INSTANCE, function (value) {
        const instance = value;
        const item = instance.libraryItem;
        const timeline = item.timeline;
        return [item, timeline];
    })
    .add(TimelineType.CONTEXT, function (value) {
        const context = value;
        const item = context.item;
        const timeline = context.timeline;
        return [item, timeline];
    })
    .add(TimelineType.LIBRARY_ITEM_PATH, function (value) {
        const path = value;
        const index = parseInt(this.dom.library.findItemIndex(path));
        if (isNaN(index)) {
            throw new Error(`Invalid library item path: ${path}`);
        }
        const item = this.dom.library.items[index];
        const timeline = this.item.timeline;
        return [item, timeline];
    })
    .add(TimelineType.SCENE_INDEX, function (value) {
        const index = Number(value);
        const item = index >= 0 && index < this.dom.timelines.length ? index : undefined;
        if (item === undefined) {
            throw new Error(`Invalid scene index: ${index}`);
        }
        const timeline = this.dom.timelines[index];
        return [item, timeline];
    })
    .add(TimelineType.DOCUMENT_ROOT, function (value) {
        const item = null;
        const timeline = this.dom.getTimeline();
        return [item, timeline];
    });

function TimelineFactory(dom, value) {
    if (value instanceof Timeline) {
        return timelineStrategies.use(TimelineType.TIMELINE, value, dom);
    } else if (typeof value === "boolean") {
        return timelineStrategies.use(TimelineType.BOOLEAN, value, dom);
    } else if (value instanceof SymbolItem) {
        return timelineStrategies.use(TimelineType.SYMBOL_ITEM, value);
    } else if (value instanceof SymbolInstance) {
        return timelineStrategies.use(TimelineType.SYMBOL_INSTANCE, value);
    } else if (value instanceof Context) {
        return timelineStrategies.use(TimelineType.CONTEXT, value);
    } else if (typeof value === "string") {
        return timelineStrategies.use(TimelineType.LIBRARY_ITEM_PATH, value);
    } else if (typeof value === "number" || value === null) {
        return timelineStrategies.use(TimelineType.SCENE_INDEX, value);
    } else {
        throw new Error(`Invalid timeline value: ${value}`);
    }
}


/**
 * 设置时间轴对象
 * @param {*} value - 支持多种类型的时间轴参数
 * @returns {Context} 当前Context实例
 */
Context.prototype.setTimeline = function (value) {
    if (value == null) return this;
    if (!this.dom) {
        this.setDOM(true);
        if (!this.dom) return this;
    }
    const [item, timeline] = TimelineFactory(this.dom, value);
    if (timeline) {
        if (this.timeline !== timeline) {
            this.clearLayerProperties();
        }
        this.timeline = timeline;
        this.context = 'timeline';
        this.item = item;
    }
    return this;
};

/**
 * 清除依赖时间轴的属性
 */
Context.prototype.clearLayerProperties = function () {
    this.layer = null;
    this.frame = null;
    this.element = null;
};



