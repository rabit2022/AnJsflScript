const {StrategyManager} = require("../strategy/strategy");
const Context = require("../Context");

// enum
const LayerType = {
    LAYER: "layer",
    BOOLEAN: "boolean",
    LAYER_INDEX: "layer_index",
    LAYER_NAME: "layer_name",
    CONTEXT: "context"
};

const layerStrategy = new StrategyManager();
layerStrategy
    .add(LayerType.LAYER, (value) => {
        const layer = value;
        return layer;
    })
    .add(LayerType.BOOLEAN, (value, timeline) => {
        if (value === true || value === undefined) {
            const layer = timeline.layers[timeline.currentLayer];
            return layer;
        } else {
            return null;
        }
    })
    .add(LayerType.LAYER_INDEX, (value, timeline) => {
        const index = value;
        const layer = timeline.layers[index];
        if (!layer) {
            throw new ReferenceError(`ReferenceError: "${value}" is not a valid layer index in Context.setLayer()`);
        }
        return layer;
    })
    .add(LayerType.LAYER_NAME, (value) => {
        const name = value;
        const index = this.timeline.findLayerIndex(name);
        const layer = this.timeline.layers[index];
        return layer;
    })
    .add(LayerType.CONTEXT, (value) => {
        const context = value;
        const layer = context.layer;
        return layer;
    });

function LayerFactory(value, timeline) {
    if (value instanceof Layer) {
        return layerStrategy.use(LayerType.LAYER, value);
    } else if (typeof value === "boolean") {
        return layerStrategy.use(LayerType.BOOLEAN, timeline);
    } else if (typeof value === "number") {
        return layerStrategy.use(LayerType.LAYER_INDEX, value, timeline);
    } else if (typeof value === "string") {
        return layerStrategy.use(LayerType.LAYER_NAME, value, timeline);
    } else if (value instanceof Context) {
        return layerStrategy.use(LayerType.CONTEXT, value, timeline);
    }
}

/**
 * 设置图层对象
 * @param {*} value - 支持多种类型的图层参数
 * @returns {Context} 当前Context实例
 */
Context.prototype.setLayer = function (value) {
    if (value == null) return this;
    if (!this.timeline) {
        this.setTimeline(true);
        if (!this.timeline) return this;
    }

    const layer = LayerFactory(value, this.timeline);
    if (layer) {
        if (this.layer !== layer) {
            this.clearFrameProperties();
        }
        this.layer = layer;
        this.context = 'layer';
    }
    return this;
}


/**
 * 清除依赖图层的属性
 */
Context.prototype.clearFrameProperties = function () {
    this.frame = null;
    this.element = null;
};