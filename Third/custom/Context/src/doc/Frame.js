// 策略管理器
const { StrategyManager } = require('../strategy/strategy');
const Context = require('../Context');

// 定义枚举
const FrameType = {
    FRAME: 'frame',
    BOOLEAN: 'boolean',
    FRAME_INDEX: 'frame_index',
    FRAME_NAME: 'frame_name',
    REGEXP: 'regexp',
    CONTEXT: 'context',
};

const frameStrategy = new StrategyManager();

// 策略实现
frameStrategy
    .add(FrameType.FRAME, (value) => {
        return value;
    })
    .add(FrameType.BOOLEAN, (value, layer, timeline) => {
        if (value === true || value === undefined) {
            return layer.frames[timeline.currentFrame];
        } else {
            return null;
        }
    })
    .add(FrameType.FRAME_INDEX, (value, layer) => {
        if (value >= 0 && value < layer.frameCount) {
            return layer.frames[value];
        } else {
            throw new ReferenceError(`ReferenceError: "${value}" is not a valid frame index.`);
        }
    })
    .add(FrameType.FRAME_NAME, (value, layer, timeline, allLayers = false) => {
        if (allLayers) {
            for (const _layer of timeline.layers) {
                for (const _frame of _layer.frames) {
                    if (_frame.name === value) {
                        return _frame;
                    }
                }
            }
        } else {
            for (const _frame of layer.frames) {
                if (_frame.name === value) {
                    return _frame;
                }
            }
        }
        throw new ReferenceError(`ReferenceError: "${value}" is not a valid frame name.`);
    })
    .add(FrameType.REGEXP, (value, layer) => {
        const keyframeIndex = parseInt(value.toSource().substr(1));
        if (keyframeIndex >= 0 && keyframeIndex < layer.keyframes.length) {
            return layer.keyframes[keyframeIndex];
        } else {
            throw new ReferenceError(`ReferenceError: "${value}" is not a valid keyframe index.`);
        }
    })
    .add(FrameType.CONTEXT, (value) => {
        return value.frame;
    });

// 工厂函数
function FrameFactory(value, layer, timeline, allLayers = false) {
    if (value instanceof Frame) {
        return frameStrategy.use(FrameType.FRAME, value);
    } else if (typeof value === 'boolean' || value === undefined) {
        return frameStrategy.use(FrameType.BOOLEAN, value, layer, timeline);
    } else if (typeof value === 'number') {
        return frameStrategy.use(FrameType.FRAME_INDEX, value, layer);
    } else if (typeof value === 'string') {
        return frameStrategy.use(FrameType.FRAME_NAME, value, layer, timeline, allLayers);
    } else if (value instanceof RegExp) {
        return frameStrategy.use(FrameType.REGEXP, value, layer);
    } else if (value instanceof Context) {
        return frameStrategy.use(FrameType.CONTEXT, value);
    } else {
        throw new TypeError(`Unsupported type for value: ${typeof value}`);
    }
}

/**
 * 设置帧对象
 * @param {*} value - 支持多种类型的帧参数
 * @param {Boolean} [allLayers=false] - 是否在所有图层中搜索（仅当指定帧名称时有效）
 * @returns {Context} 当前 Context 实例
 */
Context.prototype.setFrame = function (value, allLayers = false) {
    if (!this.layer || !this.timeline) return this;

    const frame = FrameFactory(value, this.layer, this.timeline, allLayers);
    if (frame) {
        this.frame = frame;
        this.context = 'frame';
    }

    return this;
};

// curFrameIndex
Object.defineProperty(Context.prototype, 'curFrameIndex', {
    get: function () {
        if (!this.layer || !this.timeline) return null;

        return this.timeline.currentFrame;
    },
});

// curFrame
Object.defineProperty(Context.prototype, 'curFrame', {
    get: function () {
        if (!this.layer || !this.timeline) return null;

        const curFrameIndex = this.timeline.currentFrame;
        return this.AllFrames[curFrameIndex];
    },
});

// AllFrames
Object.defineProperty(Context.prototype, 'AllFrames', {
    get: function () {
        if (!this.layer || !this.timeline) return null;

        return this.layer.frames;
    },
});

// frames
// Context.prototype.frames = this.AllFrames;
Object.defineProperty(Context.prototype, 'frames', {
    get: function () {
        return this.AllFrames;
    },
});