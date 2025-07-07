const Context = require('../Context');

/**
 * 选择当前上下文对象的图层
 * @param {Boolean} [addToSelection] - 可选布尔值，用于决定是添加到现有选择还是替换现有选择
 * @returns {Context} - 当前上下文对象本身
 */
Context.prototype.selectLayer = function (addToSelection) {
    // 如果没有时间轴或图层，则直接返回
    if (!this.timeline || !this.layer) {
        return this;
    }

    // 获取当前帧
    const currentFrame = this.timeline.currentFrame;

    // 如果传入的参数为 null，则取消所有选择
    if (addToSelection === null) {
        // 保存当前图层索引
        const currentLayer = this.timeline.currentLayer;

        // 取消选择所有图层和帧
        this.timeline.currentLayer = 0;
        this.timeline.setSelectedFrames(0, 0); // 取消选择所有帧
        if (this.timeline.getSelectedFrames().length > 0) {
            // 如果仍有选中的帧，再次取消选择
            this.timeline.setSelectedFrames(0, 0, false);
        }

        // 恢复当前图层和帧
        this.timeline.currentLayer = currentLayer;
        this.timeline.currentFrame = currentFrame;
    } else {
        // 获取当前图层索引
        const layerIndex = this.curLayerIndex;

        // 如果图层索引有效，则执行选择操作
        if (layerIndex !== -1) {
            if (addToSelection) {
                // 如果是添加选择，而不是替换选择
                const selectedLayers = this.timeline.getSelectedLayers();

                // 如果当前图层尚未被选中，则选中它
                if (selectedLayers.indexOf(layerIndex) === -1) {
                    this.timeline.setSelectedLayers(layerIndex, false); // 添加到选择中
                } else {
                    // 如果当前图层已被选中，检查是否需要取消选择
                    const selectedFrames = this.timeline.getSelectedFrames();
                    if (selectedFrames[0] === 0 && selectedFrames[1] === 0) {
                        // 如果没有选中的帧，则取消选择当前图层
                        this.timeline.setSelectedLayers(layerIndex, true);
                    }
                }
            } else {
                // 如果不是添加选择，则直接选中当前图层
                this.timeline.setSelectedLayers(layerIndex, true);
            }
        }
    }

    // 恢复当前帧
    this.timeline.currentFrame = currentFrame;

    return this;
};

/**
 * 选择当前上下文对象的帧
 * @param {Boolean} [addToSelection] - 可选布尔值，用于决定是添加到现有选择还是替换现有选择
 * @returns {Context} - 当前上下文对象本身
 */
Context.prototype.selectFrame = function (addToSelection) {
    // 如果没有时间轴、图层或帧，则直接返回
    if (!this.timeline || !this.layer || !this.frame) {
        return this;
    }

    // 如果传入的参数为 null，则取消所有选择
    if (addToSelection === null) {
        this.timeline.setSelectedFrames(0, 0);
    } else {
        // 获取当前图层的索引
        const layerIndex = this.timeline.findLayerIndex(this.layer.name);

        // 如果找到了图层索引
        if (layerIndex !== -1) {
            // 设置当前图层
            this.timeline.currentLayer = layerIndex;

            // 选择帧
            this.timeline.setSelectedFrames(
                this.frame.startFrame,
                this.frame.startFrame + this.frame.duration,
                !addToSelection,
            );

            // 设置当前帧
            this.timeline.currentFrame = this.frame.startFrame;
        }
    }

    return this;
};

/**
 * 选择当前上下文对象的元素（如果有）
 * @param {Boolean} [addToSelection] - 可选布尔值，用于决定是添加到现有选择还是替换现有选择
 * @returns {Context} - 当前上下文对象本身
 */
Context.prototype.selectElement = function (addToSelection) {
    // 如果没有元素，则直接返回
    if (!this.element) {
        return this;
    }

    // 如果不是添加到现有选择，则清除所有选择
    if (!addToSelection) {
        this.dom.selectNone();
    }

    // 设置当前元素为选中状态
    this.dom.selection = [this.element];

    return this;
};

/**
 * Select the current context of the Context object
 * @returns    {Context}            Itself
 */
Context.prototype.select = function () {
    this.goto();

    switch (this.context) {
        case 'layer':
            this.selectLayer.apply(this, arguments);
            break;
        case 'frame':
            this.selectFrame.apply(this, arguments);
            break;
        case 'keyframe':
            this.selectFrame.apply(this, arguments);
            break;
        case 'element':
            this.selectElement.apply(this, arguments);
            break;
    }

    return this;
};
