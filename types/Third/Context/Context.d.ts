declare module "Context" {
    type DomType = Boolean | Document | Number | String | Context | undefined;

    type TimelineType = Timeline | Boolean | SymbolItem | SymbolInstance | Context | String | Number | null | undefined;

    type LayerType = Layer | Boolean | Number | String | Context | undefined;

    type FrameType = Frame | Boolean | Number | String | RegExp | Context | undefined;

    type ElementType = Element | Boolean | Number | String | Context | undefined;

    class Context {
        // dom: Document | null; // 当前文档对象
        // item: Item | null; // 当前库项目
        // timeline: Timeline | null; // 当前时间轴
        // layer: Layer | null; // 当前图层
        // frame: Frame | null; // 当前帧
        // element: Element | null; // 当前元素
        // private context: string; // 当前上下文类型标识

        constructor(dom?: DomType, timeline?: TimelineType, layer?: LayerType, frame?: FrameType, element?: ElementType);

        static create(
            dom?: boolean,
            timeline?: boolean,
            layer?: boolean,
            frame?: boolean,
            element?: boolean
        ): Context;

        toString(): string;

        clone(): Context;

        copy(context: Context): void;

        setDOM(value: DomType): Context;

        // private clearDependentProperties(): void;

        setTimeline(value: TimelineType): Context;

        // private clearLayerProperties(): void;

        setLayer(value: LayerType): Context;

        // private clearFrameProperties(): void;

        setFrame(value: FrameType, allLayers?: boolean): Context;

        setElement(value: ElementType): Context;

        goto(): Context;

        update(dom?: boolean, timeline?: boolean, layer?: boolean, frame?: boolean): Context;

        setKeyframe(keyframeIndex: number, layer?: LayerType): Context;

        select(): Context;

        selectLayer(addToSelection?: boolean): Context;

        selectFrame(addToSelection?: boolean): Context;

        selectElement(addToSelection?: boolean): Context;

        /**
         * 从短字符串创建上下文
         * @param {string} shortString - 短字符串格式：doc>item~layer@frame:element
         */
        from(shortString: string): void;

        /**
         * 当前文档对象
         * @type {Document|null}
         * @deprecated 请使用{@link Context.doc}替代
         */
        readonly dom: Document | null;

        /**
         * 当前文档对象
         * @type {Document|null}
         */
        readonly doc: Document | null;

        /**
         * 当前选择集
         * @type {Element[]}
         */
        readonly selection: Element[];

        /**
         * 文档库
         * @type {Library}
         */
        readonly library: Library;

        /**
         * 库项目列表
         * @type {Item[]}
         * @deprecated 请使用{@link Context.items}替代
         */
        readonly AllItems: Item[];

        /**
         * 库项目列表
         * @type {Item[]}
         */
        readonly items: Item[];

        /**
         * 当前库项目
         * @type {Item|null}
         */
        readonly item: Item | null;

        /**
         * 时间轴列表
         * @type {Timeline[]}
         */
        readonly timelines: Timeline[];

        /**
         * 当前时间轴
         * @type {Timeline|null}
         */
        readonly timeline: Timeline | null;

        /**
         * 所有图层对象
         * @type {Layer[]}
         * @deprecated 请使用{@link Context.layers}替代
         */
        readonly AllLayers: Layer[];

        /**
         * 所有图层对象
         * @type {Layer[]}
         */
        readonly layers: Layer[];

        /**
         * 当前图层索引
         * @type {number}
         */
        readonly curLayerIndex: number;

        /**
         * 当前图层对象
         * @type {Layer|null}
         */
        readonly curLayer: Layer | null;

        /**
         * 当前图层对象
         * @type {Layer|null}
         * @deprecated 请使用{@link Context.curLayer}替代
         */
        readonly layer: Layer | null;

        /**
         * 当前图层所有关键帧
         * @type {Frame[]}
         */
        readonly keyframes: Frame[];

        /**
         * 所有帧对象
         * @type {Frame[]}
         * @deprecated 请使用{@link Context.frames}替代
         */
        readonly AllFrames: Frame[];

        /**
         * 所有帧对象
         * @type {Frame[]}
         */
        readonly frames: Frame[];

        /**
         * 当前帧索引
         * @type {number|null}
         */
        readonly curFrameIndex: number | null;

        /**
         * 当前帧对象
         * @type {Frame|null}
         */
        readonly curFrame: Frame | null;

        /**
         * 当前帧对象
         * @type {Frame|null}
         * @deprecated 请使用{@link Context.curFrame}替代
         */
        readonly frame: Frame | null;

        /**
         * 所有元素对象
         * @type {Element[]}
         * @deprecated 请使用{@link Context.elements}替代
         */
        readonly AllElements: Element[];

        /**
         * 当前帧所有元素
         * @type {Element[]}
         */
        readonly elements: Element[];

        /**
         * 当前选中元素索引
         * @type {number|null}
         */
        readonly curElementIndex: number | null;

        /**
         * 当前元素
         * @type {Element|null}
         */
        readonly element: Element | null;

        /**
         * 当前选中元素
         * @type {Element|null}
         * @deprecated 请使用{@link Context.element}替代
         */
        readonly curElement: Element | null;

        /**
         * 第一个选中帧的索引
         * @type {number|null}
         * @deprecated 请使用{@link Context.firstFrameIndex}替代
         */
        readonly firstSlFrameIndex: number | null;

        /**
         * 第一个选中图层的索引
         * @type {number|null}
         * @deprecated 请使用{@link Context.firstLayerIndex}替代
         */
        readonly firstSlLayerIndex: number | null;

        /**
         * 第一个选中图层对象
         * @type {Layer|null}
         * @deprecated 请使用{@link Context.firstLayer}替代
         */
        readonly firstSlLayer: Layer | null;

        /**
         * 第一个选中帧对象
         * @type {Frame|null}
         * @deprecated 请使用{@link Context.firstFrame}替代
         */
        readonly firstSlFrame: Frame | null;

        /**
         * 第一个图层对象
         * @type {Layer|null}
         */
        readonly firstLayer: Layer | null;

        /**
         * 第一个帧对象
         * @type {Frame|null}
         */
        readonly firstFrame: Frame | null;

        /**
         * 第一个图层索引
         * @type {number|null}
         */
        readonly firstLayerIndex: number | null;

        /**
         * 第一个帧索引
         * @type {number|null}
         */
        readonly firstFrameIndex: number | null;
    }

    export = Context;
}