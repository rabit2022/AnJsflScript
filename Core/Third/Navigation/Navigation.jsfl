/**
 * @file: Navigation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/17 23:18
 * @project: AnJsflScript
 * @description:
 */

define(['Class'], function(Class) {
    // function Navigation() {
    // }
    //
    // /**
    //  * 移动到开头 (Home)
    //  */
    // Navigation.home = function() {
    //     throw new Error('Not implemented');
    // };
    //
    // /**
    //  * 移动到结尾 (End)
    //  */
    // Navigation.end = function() {
    //     throw new Error('Not implemented');
    //
    // };
    //
    // /**
    //  * 移动到上一个关键帧 (Page Up)
    //  */
    // Navigation.pageUp = function() {
    //     throw new Error('Not implemented');
    // };
    //
    // /**
    //  * 移动到下一个关键帧 (Page Down)
    //  */
    // Navigation.pageDown = function() {
    //     throw new Error('Not implemented');
    // };
    //
    // /**
    //  * 移动到当前图层的上一个关键帧 (Shift + Page Up)
    //  */
    // Navigation.shiftPageUp = function() {
    //     throw new Error('Not implemented');
    // };
    //
    // /**
    //  * 移动到当前图层的下一个关键帧 (Shift + Page Down)
    //  */
    // Navigation.shiftPageDown = function() {
    //     throw new Error('Not implemented');
    // };
    Navigation = {
        home: function() {
            throw new Error('Not implemented');
        },
        end: function() {
            throw new Error('Not implemented');
        },
        pageUp: function() {
            throw new Error('Not implemented');
        },
        pageDown: function() {
            throw new Error('Not implemented');
        },
        shiftPageUp: function() {
            throw new Error('Not implemented');
        },
        shiftPageDown: function() {
            throw new Error('Not implemented');
        }
    };

    Navigation = Class.extend(Navigation);

    function TimelineNavigation() {
    }

    // 静态方法：检查文档和时间轴是否可用
    TimelineNavigation.checkDocumentAndTimeline = function() {
        const doc = fl.getDocumentDOM();
        if (!doc) {
            alert('请打开fla文档');
            return null;
        }

        const timeline = doc.getTimeline();
        if (!timeline) {
            alert('没有时间轴');
            return null;
        }

        return { doc: doc, timeline: timeline };
    };

    // 静态方法：移动到时间轴开头 (Home)
    TimelineNavigation.home = function() {
        const { timeline } = TimelineNavigation.checkDocumentAndTimeline();
        if (!timeline) return;

        timeline.currentFrame = 0;
    };

    // 静态方法：移动到时间轴末尾 (End)
    TimelineNavigation.end = function() {
        const { timeline } = TimelineNavigation.checkDocumentAndTimeline();
        if (!timeline) return;

        timeline.currentFrame = timeline.frameCount - 1;
    };

    // 静态方法：移动到前一个关键帧（所有图层） (Page Up)
    TimelineNavigation.pageUp = function() {
        const { timeline } = TimelineNavigation.checkDocumentAndTimeline();
        if (!timeline) return;

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
    };

    // 静态方法：移动到下一个关键帧（所有图层） (Page Down)
    TimelineNavigation.pageDown = function() {
        const { timeline } = TimelineNavigation.checkDocumentAndTimeline();
        if (!timeline) return;

        var key = timeline.frameCount - 1;
        var klayers = [];

        if (timeline.currentFrame < key) {
            for (var j = 0; j < timeline.layers.length; j++) {
                if (
                    timeline.currentFrame <= timeline.layers[j].frames.length &&
                    timeline.layers[j].layerType != 'folder'
                ) {
                    var dura =
                        timeline.layers[j].frames[timeline.currentFrame]
                            .duration;
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
    };

    // 静态方法：移动到当前图层的前一个关键帧 (Shift + Page Up)
    TimelineNavigation.shiftPageUp = function() {
        const { timeline } = TimelineNavigation.checkDocumentAndTimeline();
        if (!timeline) return;

        const layer = timeline.layers[timeline.currentLayer];
        var startframe = layer.frames[timeline.currentFrame].startFrame;

        if (startframe == timeline.currentFrame && timeline.currentFrame > 0) {
            startframe = layer.frames[timeline.currentFrame - 1].startFrame;
        }
        timeline.currentFrame = startframe >= 0 ? startframe : 0;
        timeline.setSelectedFrames(
            timeline.currentFrame,
            timeline.currentFrame + 1
        );
    };

    // 静态方法：移动到当前图层的下一个关键帧 (Shift + Page Down)
    TimelineNavigation.shiftPageDown = function() {
        const { timeline } = TimelineNavigation.checkDocumentAndTimeline();
        if (!timeline) return;

        const layer = timeline.layers[timeline.currentLayer];
        var key =
            layer.frames[timeline.currentFrame].startFrame +
            layer.frames[timeline.currentFrame].duration;

        if (key < layer.frames.length) {
            timeline.currentFrame = key;
            timeline.setSelectedFrames(key, key + 1);
        } else {
            timeline.currentFrame = layer.frames.length - 1;
            timeline.setSelectedFrames(
                timeline.currentFrame,
                timeline.currentFrame + 1
            );
        }
    };

    // TimelineNavigation = Navigation.extend(TimelineNavigation);

    return {
        Navigation: Navigation,
        TimelineNavigation: TimelineNavigation
    };
});
