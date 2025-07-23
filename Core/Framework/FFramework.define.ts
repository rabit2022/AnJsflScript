/**
 * @file: FFramework.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/23 13:18
 * @project: AnJsflScript
 * @description:
 * @see:  https://github.com/soywiz-archive/jsfl-typescript
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { SelectAll, SelectStart, SelectNone, OnlySelectCurrent } from "ElementSelect";
// @ts-expect-error
import { getLayersIndexByName } from "LayerQuery";

// ===============Third Party======================
import log = require("loglevel");

import { Observable, of } from "rxjs";
// endregion import

// region doc
var doc = fl.getDocumentDOM(); //文档
if (!CheckDom(doc)) {
    //@ts-ignore
    return;
}

var library = doc.library; //库文件

// endregion doc

export class FFramework {
    constructor(
        public timeline: FlashTimeline,
        public useRxjs: boolean = true
    ) {
        this.timeline = timeline;
        this.useRxjs = useRxjs;
    }

    public $(): Observable<FFramework> | FFramework {
        if (this.useRxjs) {
            return of(this);
        } else {
            return this;
        }
    }

    // region gotoLayer
    public gotoLayer(layerIndex: number): Observable<FFramework> | FFramework;
    public gotoLayer(expectedName: string): Observable<FFramework> | FFramework;
    public gotoLayer(arg: number | string): Observable<FFramework> | FFramework;

    public gotoLayer(arg: number | string) {
        if (typeof arg === "number") {
            let layerIndex = arg;
            if (layerIndex < 0 || layerIndex >= this.timeline.layers.length) {
                log.error(`Layer index ${layerIndex} out of range`);
            } else {
                this.timeline.currentLayer = layerIndex;
            }
        } else if (typeof arg === "string") {
            let expectedName = arg;

            let layerIndexs = getLayersIndexByName(this.timeline.layers, expectedName);
            if (layerIndexs.length > 0) {
                this.timeline.currentLayer = layerIndexs[0];
            } else {
                log.error(`Layer ${expectedName} not found`);
            }
        } else {
            log.error(`Invalid argument ${arg}`);
        }

        return this.$();
    }
    // endregion gotoLayer

    public gotoFrame(index0: number) {
        this.timeline.currentFrame = index0;
        return this.$();
    }

    // region ElementSelect
    public SelectAll() {
        SelectAll();
        return this.$();
    }

    public SelectNone() {
        SelectNone();
        return this.$();
    }

    public SelectStart(selection: any[]) {
        SelectStart(selection);
        return this.$();
    }

    public OnlySelectCurrent(element: any) {
        OnlySelectCurrent(element);
        return this.$();
    }

    // endregion ElementSelect

    public code(callback: Function) {
        callback();
        return this.$();
    }

    public edit(callback: (framework: Observable<FFramework> | FFramework) => void) {
        doc.enterEditMode("inPlace");
        try {
            let timeline = doc.getTimeline(); //时间轴
            callback(new FFramework(timeline, this.useRxjs));
        } finally {
            doc.exitEditMode();
        }
        return this.$();
    }
}
