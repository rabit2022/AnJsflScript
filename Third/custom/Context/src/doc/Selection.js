/**
 * @file: Selection.js
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/2 17:15
 * @project: Context
 * @description:
 */
const Context = require('../Context');

// selection
Object.defineProperty(Context.prototype, 'selection', {
    get: function () {
        const selection = this.dom.selection;
        return selection;
    },
});

Object.defineProperty(Context.prototype, 'firstSlFrameIndex', {
    get: function () {
        const frs = this.timeline.getSelectedFrames();
        if (!frs||frs.length === 0) return null;

        // [layerIndex,startFrame,endFrame]
        return frs[1];
    },
});

Object.defineProperty(Context.prototype, 'firstSlLayerIndex', {
    get: function () {
        const frs = this.timeline.getSelectedFrames();
        if (!frs||frs.length === 0) return null;

        // [layerIndex,startFrame,endFrame]
        return frs[0];
    },
});

Object.defineProperty(Context.prototype, 'firstSlLayer', {
    get: function () {
        const index = this.firstSlLayerIndex;
        if (!index) return null;

        const layers = this.timeline.layers;
        return layers[index];
    },
});

Object.defineProperty(Context.prototype, 'firstSlFrame', {
    get: function () {
        const index = this.firstSlFrameIndex;
        if (!index) return null;

        const layer = this.firstSlLayer;
        return layer.frames[index];
    },
});