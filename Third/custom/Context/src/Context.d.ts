
type DomType = Boolean | Document | Number | String | Context|undefined;

type TimelineType = Timeline|Boolean|SymbolItem|SymbolInstance|Context|String|Number|null|undefined;

type LayerType = Layer|Boolean|Number|String|Context|undefined;

type FrameType = Frame|Boolean|Number|String|RegExp|Context|undefined;

type ElementType=Element|Boolean|Number|String|Context|undefined;

declare class Context {
    dom: Document | null; // 当前文档对象
    item: Item | null; // 当前库项目
    timeline: Timeline | null; // 当前时间轴
    layer: Layer | null; // 当前图层
    frame: Frame | null; // 当前帧
    element: Element | null; // 当前元素
    context: string; // 当前上下文类型标识

    constructor(dom?: DomType, timeline?: TimelineType, layer?: LayerType, frame?: FrameType, element?: ElementType);

    static create(
        dom?: boolean,
        timeline?: boolean,
        layer?: boolean,
        frame?: boolean,
        element?: boolean,
    ): Context;

    toString(): string;

    clone(): Context;

    copy(context: Context): void;

    setDOM(value: DomType): Context;

    private clearDependentProperties(): void;

    setTimeline(value: TimelineType): Context;

    private clearLayerProperties(): void;

    setLayer(value: LayerType): Context;

    private clearFrameProperties(): void;

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

    // 属性访问器
    readonly doc: Document | null; // 兼容老版本的DOM属性
    readonly selection: Element[]; // 当前选择集
    readonly library: Library; // 文档库
    readonly items: Item[]; // 库项目列表
    readonly timelines: Timeline[]; // 时间轴列表
    readonly curLayerIndex: number; // 当前图层索引
    readonly curLayer: Layer | null; // 当前图层对象
    readonly AllLayers: Layer[]; // 所有图层对象
    readonly keyframes: Frame[]; // 当前图层所有关键帧
    readonly curFrameIndex: number | null; // 当前帧索引
    readonly curFrame: Frame | null; // 当前帧对象
}

export default Context;
