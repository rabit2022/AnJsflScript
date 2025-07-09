///<reference path="./jsfl.d.ts" />

var $document = fl.getDocumentDOM();
var $library = $document.library;
var $timeline = $document.getTimeline();

class Json {
	public static stringify(object: any, recursionLevel: number = 0): string {
		if (recursionLevel > 4) return '...';
		switch (typeof object) {
			case "object":
				var parts = [];
				for (var k in object) {
					parts.push(Json.stringify(k, recursionLevel + 1) + ':' + Json.stringify(object[k], recursionLevel + 1));
				}
				return '{' + parts.join(',') + '}';
			case "array":
				return '[' + (<any[]>object).map((item) => Json.stringify(item, recursionLevel + 1)).join(',') + ']';
			case "string":
				return '"' + object + '"';
			default:
				return '' + object;
		}
	
	}
}

class TimelineContext {
    frameNumber: number;

    constructor(public timeline: FlashTimeline)
    {
        this.frameNumber = 0;
    }

    public gotoLayer(expectedName: string): TimelineContext
    {
        //this.layer = this.timeline.layers.filter(layer => nameRegExp.test(layer.name))[0];
        //
        for (var n = 0; n < this.timeline.layers.length; n++) {
            if (expectedName == this.timeline.layers[n].name) {
                this.timeline.currentLayer = n;
                break;
            }
        }
        return this;
    }

    public gotoFrame(index0: number): TimelineContext
    {
        this.timeline.currentFrame = index0;
        return this;
    }

    public select(): TimelineContext
    {
        //$document.selection = this.timeline.layers[this.timeline.currentLayer].frames[this.frameNumber].elements;
        $document.selectAll();
        return this;
    }

    public code(callback: Function): TimelineContext
    {
        callback();
        return this;
    }

    public edit(callback: (timelineContext: TimelineContext) => void): TimelineContext
    {
        var element = $document.selection[0];
        $document.enterEditMode('inPlace');
        try {
            callback(new TimelineContext(element.libraryItem.timeline));
        } finally {
            $document.exitEditMode();
        }
        return this;
    }
}

function trace(item: any) {
	fl.trace(Json.stringify(item));
}

function dump(element: any) {
	fl.trace(element);
	for (var k in element) {
		fl.trace(k + ':' + element[k]);
	}
}

function unlockAllLayersTemporarily(timeline: FlashTimeline, callback: () => void ) {
	var lockeds = timeline.layers.map(layer => layer.locked);
	timeline.layers.forEach((layer, index) => layer.locked = false);
	try {
		callback();
	} finally {
		timeline.layers.forEach((layer, index) => layer.locked = lockeds[index]);
	}
}

function _inspect(item: any) {
    if (typeof item == "array") return "Array(...)";
    return '' + item;
}

function inspect(item: any, level: number = 0): void {
    if (level > 2) return;
    var tabs: string = '';
    for (var n: number = 0; n < level; n++) tabs += '  ';
    fl.trace(tabs + _inspect(item));
    for (var k in item) {
        fl.trace(tabs + '  ' + _inspect(k) + ': ' + _inspect(item));
        if (typeof item == 'object') {
            inspect(item[k], level + 1);
        }
    }
}
//$document.selection

function findElementsInLibrary(regexp: RegExp) {
    //library.items.forEach((item) => { fl.trace(item.name); });
    return $library.items.filter((item) => regexp.test(item.name));
}
function findElementInLibrary(name: string) {
    //library.items.forEach((item) => { fl.trace(item.name); });
    return $library.items.filter((item) => name == item.name)[0];
}