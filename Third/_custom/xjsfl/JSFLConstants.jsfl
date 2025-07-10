// ------------------------------------------------------------------------------------------------------------------------
//
//     ██ ██████ ██████ ██     ██████                    ██                ██
//     ██ ██     ██     ██     ██                        ██                ██
//     ██ ██     ██     ██     ██     █████ █████ █████ █████ █████ █████ █████ █████
//     ██ ██████ █████  ██     ██     ██ ██ ██ ██ ██     ██      ██ ██ ██  ██   ██
//     ██     ██ ██     ██     ██     ██ ██ ██ ██ █████  ██   █████ ██ ██  ██   █████
//     ██     ██ ██     ██     ██     ██ ██ ██ ██    ██  ██   ██ ██ ██ ██  ██      ██
//  █████ ██████ ██     ██████ ██████ █████ ██ ██ █████  ████ █████ ██ ██  ████ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// JSFLConstants
// @see: https://github.com/davestewart/xJSFL

define(function () {
    /**
     * JSFL Constants
     * @overview    Static object for referencing the more common JSFL constants
     * @see            https://www.google.co.uk/search?source=ig&hl=en&rlz=&q=%22Acceptable+values+are+%22+site%3Ahttp%3A%2F%2Fhelp.adobe.com%2Fen_US%2Fflash%2Fcs%2Fextend%2F
     */
    const JSFLConstants = {
        // --------------------------------------------------------------------------------
        // # bitmap

        bitmap: {
            /**
             * bitmap.compressionType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WSA4775F51-754E-4c47-8AAA-A3AB025E32E5.html
             */
            compressionType: {
                PHOTO: 'photo',
                LOSSLESS: 'lossless'
            }
        },

        // --------------------------------------------------------------------------------
        // # element

        element: {
            /**
             * element.elementType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7cbc.html
             */
            elementType: {
                SHAPE: 'shape',
                TEXT: 'text',
                TLF_TEXT: 'tlfText',
                INSTANCE: 'instance',
                SHAPE_OBJ: 'shapeObj'
            }
        },

        // --------------------------------------------------------------------------------
        // # filter

        filter: {
            /**
             * filter.type
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7bc0.html
             */
            type: {
                INNER: 'inner',
                OUTER: 'outer',
                FULL: 'full'
            },
            /**
             * filter.name
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7be8.html
             */
            name: {
                ADJUST_COLOR_FILTER: 'adjustColorFilter',
                BEVEL_FILTER: 'bevelFilter',
                BLUR_FILTER: 'blurFilter',
                DROP_SHADOW_FILTER: 'dropShadowFilter',
                GLOW_FILTER: 'glowFilter',
                GRADIENT_BEVEL_FILTER: 'gradientBevelFilter',
                GRADIENT_GLOW_FILTER: 'gradientGlowFilter'
            },
            /**
             * filter.property
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7dd4.html
             */
            property: {
                BLUR_X: 'blurX',
                BLUR_Y: 'blurY',
                QUALITY: 'quality',
                DISTANCE: 'distance',
                STRENGTH: 'strength',
                KNOCKOUT: 'knockout',
                INNER: 'inner',
                BEVEL_TYPE: 'bevelType',
                COLOR: 'color',
                SHADOW_COLOR: 'shadowColor',
                HIGHLIGHT_COLOR: 'highlightColor'
            }
        },

        // --------------------------------------------------------------------------------
        // # fill

        fill: {
            /**
             * fill.fillStyle
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7abd.html
             */
            fillStyle: {
                BITMAP: 'bitmap',
                SOLID: 'solid',
                LINEAR_GRADIENT: 'linearGradient',
                RADIAL_GRADIENT: 'radialGradient',
                NO_FILL: 'noFill'
            }
        },

        // --------------------------------------------------------------------------------
        // # frame

        frame: {
            /**
             * frame.labelType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7abd.html
             */
            labelType: {
                NONE: 'none',
                NAME: 'name',
                COMMENT: 'comment',
                ANCHOR: 'anchor'
            },
            /**
             * frame.tweenType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7aab.html
             */
            tweenType: {
                MOTION: 'motion',
                SHAPE: 'shape',
                NONE: 'none'
            },
            /**
             * frame.easeCurve
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7a93.html
             */
            easeCurve: {
                ALL: 'all',
                POSITION: 'position',
                ROTATION: 'rotation',
                SCALE: 'scale',
                COLOR: 'color',
                FILTERS: 'filters'
            }
        },

        // --------------------------------------------------------------------------------
        // # instance

        instance: {
            /**
             * instance.instanceType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7a71.html
             */
            instanceType: {
                SYMBOL: 'symbol',
                BITMAP: 'bitmap',
                EMBEDDED_VIDEO: 'embedded video',
                LINKED_VIDEO: 'linked video',
                VIDEO: 'video',
                COMPILED_CLIP: 'compiled clip'
            }
        },

        // --------------------------------------------------------------------------------
        // # item

        item: {
            /**
             * item.itemType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7a6f.html
             */
            itemType: {
                UNDEFINED: 'undefined',
                COMPONENT: 'component',
                MOVIE_CLIP: 'movie clip',
                GRAPHIC: 'graphic',
                BUTTON: 'button',
                FOLDER: 'folder',
                FONT: 'font',
                SOUND: 'sound',
                BITMAP: 'bitmap',
                COMPILED_CLIP: 'compiled clip',
                SCREEN: 'screen',
                VIDEO: 'video'
            }
        },

        // --------------------------------------------------------------------------------
        // # layer

        layer: {
            /**
             * layer.animationType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7854.html
             */
            animationType: {
                NONE: 'none',
                MOTION_OBJECT: 'motion object',
                IK_POSE: 'IK pose'
            },
            /**
             * layer.layerType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7a3d.html
             */
            layerType: {
                NORMAL: 'normal',
                GUIDE: 'guide',
                GUIDED: 'guided',
                MASK: 'mask',
                MASKED: 'masked',
                FOLDER: 'folder'
            }
        },

        // --------------------------------------------------------------------------------
        // # parameter

        parameter: {
            /**
             * parameter.valueType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-79e2.html
             */
            valueType: {
                DEFAULT: 'Default',
                ARRAY: 'Array',
                OBJECT: 'Object',
                LIST: 'List',
                STRING: 'String',
                NUMBER: 'Number',
                BOOLEAN: 'Boolean',
                FONT_NAME: 'Font Name',
                COLOR: 'Color',
                COLLECTION: 'Collection',
                WEB_SERVICE_URL: 'Web Service URL',
                WEB_SERVICE_OPERATION: 'Web Service Operation'
            }
        },

        // --------------------------------------------------------------------------------
        // # symbol

        symbol: {
            /**
             * symbol.symbolType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-788f.html
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-78a0.html
             */
            symbolType: {
                BUTTON: 'button',
                MOVIE_CLIP: 'movie clip',
                GRAPHIC: 'graphic'
            },
            /**
             * symbol.blendMode
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7cf4.html
             */
            blendMode: {
                NORMAL: 'normal',
                LAYER: 'layer',
                MULTIPLY: 'multiply',
                SCREEN: 'screen',
                OVERLAY: 'overlay',
                HARDLIGHT: 'hardlight',
                LIGHTEN: 'lighten',
                DARKEN: 'darken',
                DIFFERENCE: 'difference',
                ADD: 'add',
                SUBTRACT: 'subtract',
                INVERT: 'invert',
                ALPHA: 'alpha',
                ERASE: 'erase'
            }
        },

        // --------------------------------------------------------------------------------
        // # sound

        sound: {
            /**
             * sound.compressionType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WSA4775F51-754E-4c47-8AAA-A3AB025E32E5.html
             */
            compressionType: {
                DEFAULT: 'Default',
                ADPCM: 'ADPCM',
                MP3: 'MP3',
                RAW: 'Raw',
                SPEECH: 'Speech'
            }
        },

        // --------------------------------------------------------------------------------
        // # stroke

        stroke: {
            /**
             * stroke.capType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-78d3.html
             */
            capType: {
                NONE: 'none',
                ROUND: 'round',
                SQUARE: 'square'
            },
            /**
             * stroke.joinType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-78d3.html
             */
            joinType: {
                MITER: 'miter',
                ROUND: 'round',
                BEVEL: 'bevel'
            },
            /**
             * stroke.scaleType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-78c1.html
             */
            scaleType: {
                NORMAL: 'normal',
                HORIZONTAL: 'horizontal',
                VERTICAL: 'vertical',
                NONE: 'none'
            },
            /**
             * stroke.style
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-78d1.html
             */
            style: {
                NO_STROKE: 'noStroke',
                SOLID: 'solid',
                DASHED: 'dashed',
                DOTTED: 'dotted',
                RAGGED: 'ragged',
                STIPPLE: 'stipple',
                HATCHED: 'hatched'
            }
        },

        // --------------------------------------------------------------------------------
        // # text

        text: {
            /**
             * text.textType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7854.html
             */
            textType: {
                STATIC: 'static',
                DYNAMIC: 'dynamic',
                INPUT: 'input'
            },
            /**
             * text.lineType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-786a.html
             */
            lineType: {
                SINGLE_LINE: 'single line',
                MULTILINE: 'multiline',
                MULTILINE_NO_WRAP: 'multiline no wrap',
                PASSWORD: 'password'
            },
            /**
             * text.alignment
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-784e.html
             */
            alignment: {
                LEFT: 'left',
                CENTER: 'center',
                RIGHT: 'right',
                JUSTIFY: 'justify'
            }
        },

        // --------------------------------------------------------------------------------
        // # transform

        transform: {
            /**
             * transform.align
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7e3c.html
             */
            align: {
                LEFT: 'left',
                RIGHT: 'right',
                TOP: 'top',
                BOTTOM: 'bottom',
                VERTICAL_CENTER: 'vertical center',
                HORIZONTAL_CENTER: 'horizontal center'
            },
            /**
             * transform.corner
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7de2.html
             */
            corner: {
                BOTTOM_LEFT: 'bottom left',
                BOTTOM_RIGHT: 'bottom right',
                TOP_RIGHT: 'top right',
                TOP_LEFT: 'top left',
                TOP_CENTER: 'top center',
                RIGHT_CENTER: 'right center',
                BOTTOM_CENTER: 'bottom center',
                LEFT_CENTER: 'left center'
            },
            /**
             * transform.distribute
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7e1e.html
             */
            distribute: {
                LEFT_EDGE: 'left edge',
                HORIZONTAL_CENTER: 'horizontal center',
                RIGHT_EDGE: 'right edge',
                TOP_EDGE: 'top edge',
                VERTICAL_CENTER: 'vertical center',
                BOTTOM_EDGE: 'bottom edge'
            }
        },

        // --------------------------------------------------------------------------------
        // # video

        video: {
            /**
             * video.videoType
             * @see http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7a60.html
             */
            videoType: {
                EMBEDDED_VIDEO: 'embedded video',
                LINKED_VIDEO: 'linked video',
                VIDEO: 'video'
            }
        }
    };


    var doc = fl.getDocumentDOM(); //文档

    const JSFLNumerics = {
        // --------------------------------------------------------------------------------
        // # bitmap
        bitmap: {},

        // --------------------------------------------------------------------------------
        // # element
        element: {},

        // --------------------------------------------------------------------------------
        // # filter
        filter: {
            blur: {
                MIN_BLUR: 0,
                MAX_BLUR: 255
            }
        },

        // --------------------------------------------------------------------------------
        // # fill
        fill: {},

        // --------------------------------------------------------------------------------
        // # frame
        frame: {
            /**
             * frame.frameRate
             * 不同时间维度的帧率
             */
            frameRate: {
                FPS: doc.frameRate, // 每秒帧数（Frames Per Second）
                FPM: doc.frameRate * 60, // 每分钟帧数（Frames Per Minute）
                FPH: doc.frameRate * 60 * 60, // 每小时帧数（Frames Per Hour）
                FPD: doc.frameRate * 60 * 60 * 24, // 每天帧数（Frames Per Day）
                FPW: doc.frameRate * 60 * 60 * 24 * 7, // 每周帧数（Frames Per Week）
                FPMonth: doc.frameRate * 60 * 60 * 24 * 30, // 每月帧数（Frames Per Month，假设每月30天）
                FPY: doc.frameRate * 60 * 60 * 24 * 365 // 每年帧数（Frames Per Year）
            },
            /**
             * 为了方便使用，定义了一些常用的帧列表
             * 更多的是为了兼容以前的代码
             */
            frameList: {
                FRAME_1: 1 - 1,
                FRAME_2: 2 - 1,
                FRAME_3: 3 - 1,
                FRAME_4: 4 - 1,
                FRAME_5: 5 - 1,
                FRAME_6: 6 - 1,
                FRAME_7: 7 - 1,
                FRAME_8: 8 - 1,
                FRAME_9: 9 - 1,
                FRAME_10: 10 - 1,
                FRAME_11: 11 - 1,
                FRAME_12: 12 - 1,
                FRAME_13: 13 - 1,
                FRAME_14: 14 - 1,
                FRAME_15: 15 - 1,
                FRAME_16: 16 - 1,
                FRAME_17: 17 - 1,
                FRAME_18: 18 - 1,
                FRAME_19: 19 - 1,
                FRAME_20: 20 - 1,
                // FRAME_21: 21 - 1,
                // FRAME_22: 22 - 1,
                // FRAME_23: 23 - 1,
                // FRAME_24: 24 - 1,
                // FRAME_25: 25 - 1,
                // FRAME_26: 26 - 1,
                // FRAME_27: 27 - 1,
                // FRAME_28: 28 - 1,
                // FRAME_29: 29 - 1,
                FRAME_30: 30 - 1,
                FRAME_31: 31 - 1,
                FRAME_40: 40 - 1,
                FRAME_41: 40 - 1
            }
        },

        // --------------------------------------------------------------------------------
        // # instance
        instance: {},

        // --------------------------------------------------------------------------------
        // # item
        item: {},

        // --------------------------------------------------------------------------------
        // # layer
        layer: {},

        // --------------------------------------------------------------------------------
        // # parameter
        parameter: {},

        // --------------------------------------------------------------------------------
        // # symbol
        symbol: {},

        // --------------------------------------------------------------------------------
        // # sound
        sound: {
            channel: {
                MIN_CHANNEL: 0,
                /**
                 * 最大声道数,最大音量  100%
                 * @type {number}
                 * @note 16 位有符号整数的最大值（32767）
                 */
                MAX_CHANNEL: 32768
            },
            envelope: {
                /**
                 * 音轨拆分长度
                 * @type {number}
                 * @description 音轨拆分长度，单位：帧
                 *              var soundEnvelopeLimits = frame.getSoundEnvelopeLimits();
                 * @note 不清楚为什么 每一秒的envelope长度是 1472 值，怎么得到的，更是不知道，完全的来自 参考项目 WindowSWF
                 * @see https://gitee.com/ninge/WindowSWF/tree/master/
                 */
                ENVELOPE_PER_FRAME: 1472,

                MIN_ENVELOPE: 0,
                /**
                 * 最大音轨拆分长度,相当于 无穷大
                 * @type {number}
                 * @note 存储容量的上限为 1073741823，即 2^30 - 1 kB，即 1024 MB, 1GB
                 */
                MAX_ENVELOPE: 1073741823
            }
        },

        // --------------------------------------------------------------------------------
        // # stroke
        stroke: {},

        // --------------------------------------------------------------------------------
        // # text
        text: {},

        // --------------------------------------------------------------------------------
        // # transform
        transform: {},

        // --------------------------------------------------------------------------------
        // # video
        video: {}
    };
    // return JSFLConstants;
    return { Constants: JSFLConstants, Numerics: JSFLNumerics };
});
