/**
 * @file: Navigation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/17 23:18
 * @project: AnJsflScript
 * @description:
 */

define([
    'Class',
    'Interface',
    'checkUtil',
    'JSFLConstants'
], function(Class, Interface, checkUtil, JSFLConstants) {
    const { CheckTimeline } = checkUtil;
    const ENVELOPE_PER_FRAME = JSFLConstants.Numerics.sound.envelope.ENVELOPE_PER_FRAME;

    var NavigationAbs = Interface('NavigationAbs', {
        STATIC: {
            /**
             * 移动到当前上下文的开头（例如文档、时间轴的起始位置）。
             * 通常相当于按下 Home 键。
             */
            home: Function,

            /**
             * 移动到当前上下文的末尾（例如文档、时间轴的结束位置）。
             * 通常相当于按下 End 键。
             */
            end: Function,

            /**
             * 在当前上下文中向上翻一页（例如文档、时间轴）。
             * 通常相当于按下 PageUp 键。
             */
            pageUp: Function,

            /**
             * 在当前上下文中向下翻一页（例如文档、时间轴）。
             * 通常相当于按下 PageDown 键。
             */
            pageDown: Function,

            /**
             * 在当前上下文中向上翻一页，并选择从当前位置到新位置之间的内容。
             * 通常相当于按下 Shift + PageUp 组合键。
             */
            shiftPageUp: Function,

            /**
             * 在当前上下文中向下翻一页，并选择从当前位置到新位置之间的内容。
             * 通常相当于按下 Shift + PageDown 组合键。
             */
            shiftPageDown: Function,

            /**
             * 移动到当前上下文的开头，并选择从当前位置到开头的所有内容。
             * 通常相当于按下 Shift + Home 组合键。
             */
            shiftHome: Function,

            /**
             * 移动到当前上下文的末尾，并选择从当前位置到末尾的所有内容。
             * 通常相当于按下 Shift + End 组合键。
             */
            shiftEnd: Function
        }
    });

    /**
     * 时间轴导航类
     * @class TimelineNavigation
     * @constructor
     * @extends NavigationAbs
     * @see https://github.com/hufang360/FlashTool
     * @note 适合做一个单独的面板使用，不建议在脚本中使用
     */
    var TimelineNavigation = Class('TimelineNavigation', {
        Implements: NavigationAbs,

        STATIC: {
            // 静态方法：移动到时间轴开头 (Home)
            home: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                timeline.currentFrame = 0;
            },

            // 静态方法：移动到时间轴末尾 (End)
            end: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                timeline.currentFrame = timeline.frameCount - 1;
            },

            // 静态方法：移动到前一个关键帧（所有图层） (Page Up)
            pageUpGlobal: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                var key = 0;
                var klayers = [];

                if (timeline.currentFrame > key) {
                    for (var j = 0; j < timeline.layers.length; j++) {
                        var sf = 0;
                        const layer = timeline.layers[j];
                        if (
                            timeline.currentFrame <= layer.frames.length &&
                            layer.layerType != 'folder'
                        ) {
                            sf = layer.frames[timeline.currentFrame].startFrame;
                            if (sf == timeline.currentFrame) {
                                sf = layer.frames[timeline.currentFrame - 1].startFrame;
                            }
                        } else if (layer.layerType != 'folder') {
                            sf = layer.frames[layer.frames.length - 1].startFrame;
                        }
                        if (sf > key) {
                            klayers = [j];
                            key = sf;
                        } else if (sf == key) {
                            klayers.push(j);
                        }
                    }
                    if (key > 0) {
                        timeline.setSelectedLayers(klayers[0], true);
                        for (var j = 1; j < klayers.length; j++) {
                            timeline.setSelectedLayers(klayers[j], false);
                        }
                    }
                    timeline.currentFrame = key;
                    timeline.setSelectedFrames(
                        timeline.currentFrame,
                        timeline.currentFrame + 1
                    );
                }
            },

            // 静态方法：移动到下一个关键帧（所有图层） (Page Down)
            pageDownGlobal: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                var key = timeline.frameCount - 1;
                var klayers = [];

                if (timeline.currentFrame < key) {
                    for (var j = 0; j < timeline.layers.length; j++) {
                        if (
                            timeline.currentFrame <= timeline.layers[j].frames.length &&
                            timeline.layers[j].layerType != 'folder'
                        ) {
                            var dura =
                                timeline.layers[j].frames[timeline.currentFrame].duration;
                            if (dura == 0) {
                                dura =
                                    timeline.layers[j].frames[timeline.currentFrame + 1]
                                        .duration + 1;
                            }
                            var sf =
                                timeline.layers[j].frames[timeline.currentFrame]
                                    .startFrame + dura;
                            if (sf < timeline.layers[j].frames.length) {
                                if (sf < key) {
                                    klayers = [j];
                                    key = sf;
                                } else if (sf == key) {
                                    klayers.push(j);
                                }
                            }
                        }
                    }
                    if (klayers.length > 0) {
                        if (timeline.layers[klayers[0]].frames[key].startFrame == key) {
                            timeline.setSelectedLayers(klayers[0], true);
                            for (var j = 1; j < klayers.length; j++) {
                                timeline.setSelectedLayers(klayers[j], false);
                            }
                            timeline.currentFrame = key;
                            timeline.setSelectedFrames(key, key + 1);
                        }
                    }
                }
            },

            // 静态方法：移动到当前图层的前一个关键帧 (Shift + Page Up)
            pageUp: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                var layers = timeline.layers; //图层
                var curLayerIndex = timeline.currentLayer; //当前图层索引
                var curLayer = layers[curLayerIndex]; //当前图层

                var curFrameIndex = timeline.currentFrame; //当前帧索引
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧


                var startframe = curFrame.startFrame;
                if (startframe === curFrameIndex && curFrameIndex > 0) {
                    startframe = curLayer.frames[curFrameIndex - 1].startFrame;
                }

                timeline.currentFrame = startframe >= 0 ? startframe : 0;
                timeline.setSelectedFrames(
                    timeline.currentFrame,
                    timeline.currentFrame + 1
                );
            },

            // 静态方法：移动到当前图层的下一个关键帧 (Shift + Page Down)
            pageDown: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                var layers = timeline.layers; //图层
                var curLayerIndex = timeline.currentLayer; //当前图层索引
                var curLayer = layers[curLayerIndex]; //当前图层

                var curFrameIndex = timeline.currentFrame; //当前帧索引
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧


                var curEnd = curFrame.startFrame + curFrame.duration;
                if (curEnd >= curLayer.frames.length) {
                    curEnd = curLayer.frames.length - 1;
                }

                timeline.currentFrame = curEnd;
                timeline.setSelectedFrames(curEnd, curEnd + 1);
            },

            // 静态方法：选择 当前帧 到 开头的所有帧 (Shift + Home)
            shiftHome: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                timeline.setSelectedFrames(0, timeline.currentFrame + 1);
            },

            // 静态方法：选择 当前帧 到 末尾的所有帧 (Shift + End)
            shiftEnd: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                timeline.setSelectedFrames(timeline.currentFrame, timeline.frameCount);
            },

            // 静态方法：选择 当前帧 到 当前图层的前一个关键帧 的所有帧 (Shift + Page Up)
            shiftPageUp: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                var layers = timeline.layers; //图层
                var curLayerIndex = timeline.currentLayer; //当前图层索引
                var curLayer = layers[curLayerIndex]; //当前图层

                var curFrameIndex = timeline.currentFrame; //当前帧索引
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧

                var startframe = curFrame.startFrame;
                if (startframe === curFrameIndex && curFrameIndex > 0) {
                    startframe = curLayer.frames[curFrameIndex - 1].startFrame;
                }

                // timeline.currentFrame = startframe >= 0 ? startframe : 0;
                startframe = startframe >= 0 ? startframe : 0;

                timeline.setSelectedFrames(startframe, timeline.currentFrame + 1);
            },

            // 静态方法：选择 当前帧 到 当前图层的下一个关键帧 的所有帧 (Shift + Page Down)
            shiftPageDown: function() {
                var doc = fl.getDocumentDOM(); //文档
                var timeline = doc.getTimeline(); //时间轴

                var layers = timeline.layers; //图层
                var curLayerIndex = timeline.currentLayer; //当前图层索引
                var curLayer = layers[curLayerIndex]; //当前图层

                var curFrameIndex = timeline.currentFrame; //当前帧索引
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧

                var curEnd = curFrame.startFrame + curFrame.duration;
                if (curEnd >= curLayer.frames.length) {
                    curEnd = curLayer.frames.length - 1;
                }

                timeline.setSelectedFrames(curFrameIndex, curEnd + 1);
            }
        }
    });

    /**
     * 声音导航类
     * @class SoundNavigation
     * @constructor
     * @extends NavigationAbs
     * @see https://github.com/hufang360/FlashTool
     * @note 适合做一个单独的面板使用，不建议在脚本中使用
     */
    var SoundNavigation = Class('SoundNavigation', {
        Implements: NavigationAbs,

        STATIC: {
            // 静态方法：移动到声音开头 (Home)
            home: function() {
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧
                var soundEnvelopeLimits = curFrame.getSoundEnvelopeLimits();
                soundEnvelopeLimits.start = 0;

                curFrame.setSoundEnvelopeLimits(soundEnvelopeLimits);
            },
            // 静态方法：移动到声音末尾 (End)
            end: function() {
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧
                var soundEnvelopeLimits = curFrame.getSoundEnvelopeLimits();
                soundEnvelopeLimits.start = soundEnvelopeLimits.end;

                curFrame.setSoundEnvelopeLimits(soundEnvelopeLimits);
            },
            // 静态方法：声音的进度 +10帧 (Page Up)
            pageUp: function() {
                // +10帧
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧
                var soundEnvelopeLimits = curFrame.getSoundEnvelopeLimits();
                soundEnvelopeLimits.start += 10 * ENVELOPE_PER_FRAME;

                curFrame.setSoundEnvelopeLimits(soundEnvelopeLimits);
            },
            // 静态方法：声音的进度 -10帧 (Page Down)
            pageDown: function() {
                // -10帧
                var curFrame = curLayer.frames[curFrameIndex]; //当前帧
                var soundEnvelopeLimits = curFrame.getSoundEnvelopeLimits();
                soundEnvelopeLimits.start -= 10 * ENVELOPE_PER_FRAME;

                curFrame.setSoundEnvelopeLimits(soundEnvelopeLimits);
            },
            // 其他方法：暂时没有
            shiftPageUp: function() {
                throw new Error('Not implemented');
            },
            shiftPageDown: function() {
                throw new Error('Not implemented');
            },
            shiftHome: function() {
                throw new Error('Not implemented');
            },
            shiftEnd: function() {
                throw new Error('Not implemented');
            }
        }
    });

    return {
        TimelineNavigation: TimelineNavigation,
        SoundNavigation: SoundNavigation
    };
});
