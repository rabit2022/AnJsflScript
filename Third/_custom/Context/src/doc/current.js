const Context = require('../Context');

/**
 * 跳转到当前上下文
 * @returns {Context} 当前Context实例
 */
Context.prototype.goto = function () {
    if (!this.dom) return this;

    // 激活文档
    if (fl.getDocumentDOM() !== this.dom) {
        fl.setActiveWindow(this.dom);
    }

    // 处理时间轴
    if (this.timeline) {
        var currentTimeline = this.dom.getTimeline();
        if (currentTimeline !== this.timeline) {
            if (typeof this.item === 'number') {
                this.dom.editScene(this.item);
            } else if (this.item) {
                this.dom.library.editItem(this.item.name);
            } else {
                this.dom.editScene(0);
            }
        }

        // 处理图层和帧
        if (this.layer) {
            this.timeline.currentLayer = this.curLayerIndex;
            if (this.frame) {
                this.timeline.currentFrame = this.frame.startFrame;
            }
        }
    }

    return this;
};

/**
 * Updates all parameters of the Context Object with the current IDE state
 * @param    {Boolean}    dom            An optional flag to not update the dom context
 * @param    {Boolean}    timeline    An optional flag to not update the timeline context
 * @param    {Boolean}    layer        An optional flag to not update the layer context
 * @param    {Boolean}    frame        An optional flag to not update the frame context
 * @returns    {Context}                Itself
 */
Context.prototype.update = function (dom, timeline, layer, frame) {
    if (dom !== false) this.setDOM(true);
    if (timeline !== false) this.setTimeline(true);
    if (layer !== false) this.setLayer(true);
    if (frame !== false) this.setFrame(true);
    //if(element !== false)
    //	this.setElement(true);
    //Context.apply(this, [true, true, true, true, 0]);
};
