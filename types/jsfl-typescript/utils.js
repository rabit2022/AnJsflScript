var $document = fl.getDocumentDOM();
var $library = $document.library;
var $timeline = $document.getTimeline();

var Json = (function () {
    function Json() {
    }
    Json.stringify = function (object, recursionLevel) {
        if (typeof recursionLevel === "undefined") { recursionLevel = 0; }
        if (recursionLevel > 4)
            return '...';
        switch (typeof object) {
            case "object":
                var parts = [];
                for (var k in object) {
                    parts.push(Json.stringify(k, recursionLevel + 1) + ':' + Json.stringify(object[k], recursionLevel + 1));
                }
                return '{' + parts.join(',') + '}';
            case "array":
                return '[' + (object).map(function (item) {
                    return Json.stringify(item, recursionLevel + 1);
                }).join(',') + ']';
            case "string":
                return '"' + object + '"';
            default:
                return '' + object;
        }
    };
    return Json;
})();

var TimelineContext = (function () {
    function TimelineContext(timeline) {
        this.timeline = timeline;
        this.frameNumber = 0;
    }
    TimelineContext.prototype.gotoLayer = function (expectedName) {
        for (var n = 0; n < this.timeline.layers.length; n++) {
            if (expectedName == this.timeline.layers[n].name) {
                this.timeline.currentLayer = n;
                break;
            }
        }
        return this;
    };

    TimelineContext.prototype.gotoFrame = function (index0) {
        this.timeline.currentFrame = index0;
        return this;
    };

    TimelineContext.prototype.select = function () {
        $document.selectAll();
        return this;
    };

    TimelineContext.prototype.code = function (callback) {
        callback();
        return this;
    };

    TimelineContext.prototype.edit = function (callback) {
        var element = $document.selection[0];
        $document.enterEditMode('inPlace');
        try  {
            callback(new TimelineContext(element.libraryItem.timeline));
        } finally {
            $document.exitEditMode();
        }
        return this;
    };
    return TimelineContext;
})();

function trace(item) {
    fl.trace(Json.stringify(item));
}

function dump(element) {
    fl.trace(element);
    for (var k in element) {
        fl.trace(k + ':' + element[k]);
    }
}

function unlockAllLayersTemporarily(timeline, callback) {
    var lockeds = timeline.layers.map(function (layer) {
        return layer.locked;
    });
    timeline.layers.forEach(function (layer, index) {
        return layer.locked = false;
    });
    try  {
        callback();
    } finally {
        timeline.layers.forEach(function (layer, index) {
            return layer.locked = lockeds[index];
        });
    }
}

function _inspect(item) {
    if (typeof item == "array")
        return "Array(...)";
    return '' + item;
}

function inspect(item, level) {
    if (typeof level === "undefined") { level = 0; }
    if (level > 2)
        return;
    var tabs = '';
    for (var n = 0; n < level; n++)
        tabs += '  ';
    fl.trace(tabs + _inspect(item));
    for (var k in item) {
        fl.trace(tabs + '  ' + _inspect(k) + ': ' + _inspect(item));
        if (typeof item == 'object') {
            inspect(item[k], level + 1);
        }
    }
}

function findElementsInLibrary(regexp) {
    return $library.items.filter(function (item) {
        return regexp.test(item.name);
    });
}
function findElementInLibrary(name) {
    return $library.items.filter(function (item) {
        return name == item.name;
    })[0];
}
