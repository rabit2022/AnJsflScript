/**
 * 创建Context实例
 * @constructor
 * @param {*} [dom] - DOM参数
 * @param {*} [timeline] - 时间轴参数
 * @param {*} [layer] - 图层参数
 * @param {*} [frame] - 帧参数
 * @param {*} [element] - 元素参数
 */
function Context(dom, timeline, layer, frame, element) {
    this.dom = null;
    this.item = null;
    this.timeline = null;
    this.layer = null;
    this.frame = null;
    this.element = null;
    this.context = '';

    this.setDOM(dom);
    if (!this.dom) return;

    this.setTimeline(timeline);
    if (!this.timeline) return;

    this.setLayer(layer);
    if (!this.layer || this.layer.layerType === 'folder') return;

    this.setFrame(frame);
    if (!this.frame) return;

    this.setElement(element);
}

/**
 * 创建上下文实例的工厂方法
 * @param {boolean} [dom=true] - 是否设置DOM上下文
 * @param {boolean} [timeline=true] - 是否设置时间轴上下文
 * @param {boolean} [layer=true] - 是否设置图层上下文
 * @param {boolean} [frame=true] - 是否设置帧上下文
 * @param {boolean} [element=false] - 是否设置元素上下文
 * @returns {Context} 新的Context实例
 */
Context.create = function (dom, timeline, layer, frame, element) {
    return new Context(
        dom !== false,
        timeline !== false,
        layer !== false,
        frame !== false,
        element === true,
    );
};
/**
 * 返回上下文的字符串表示
 * @returns {string}
 */
Context.prototype.toString = function () {
    var parts = ['[object Context'];

    if (this.dom) {
        parts.push('dom="' + this.dom.name + '"');
    }

    if (this.timeline) {
        parts.push('timeline="' + (this.item ? this.item.name : this.timeline.name) + '"');
    }

    if (this.layer) {
        parts.push('layer[' + this.curLayerIndex + ']="' + this.layer.name + '"');
    }

    if (this.frame) {
        var index = this.keyframes.indexOf(this.frame);
        parts.push(
            'frame=' +
                (this.frame.name || this.frame.startFrame) +
                (index >= 0 ? '(keyframe[' + index + '])' : ''),
        );
    }

    if (this.element) {
        parts.push('element="' + (this.element.name || '<' + this.element.elementType + '>') + '"');
    }

    return parts.join(' ') + ']';
};

// clone,copy
Context.prototype.clone = function () {
    return new Context(this.dom, this.timeline, this.layer, this.frame, this.element);
};
Context.prototype.copy = function (context) {
    this.dom = context.dom;
    this.item = context.item;
    this.timeline = context.timeline;
    this.layer = context.layer;
    this.frame = context.frame;
    this.element = context.element;
    this.context = context.context;
};
Context.toString = function () {
    return '[class Context]';
};

module.exports = Context;
