fl.runScript(fl.scriptURI.replace(/\/[^\/]+$/, '') + '/../utils.js');

fl.outputPanel.clear();

function codeInsideType(timelineContext) {
    if ($document.selection.length == 0) {
        fl.trace('---');
        return;
    }

    var element1 = $document.selection[0];
    fl.trace('||' + element1 + ' :: ' + $document.selection.length + ' :: ' + element1.name + ' :: ' + element1.elementType);
    if (element1.elementType != "instance") {
        fl.trace("Invalid instance at: " + timelineContext.timeline.layers[timelineContext.timeline.currentLayer].name + ':' + (timelineContext.timeline.currentFrame + 1));

        return;
    }

    var element1Pos = { x: element1.x, y: element1.y };
    var element1LibraryItem = element1.libraryItem;
    var element1TimeLine = element1LibraryItem.timeline;

    $document.moveSelectionBy({ x: -element1Pos.x, y: -element1Pos.y });

    for (var n = 0; n < element1TimeLine.frameCount; n++) {
        $library.editItem(element1.libraryItem.name);

        element1TimeLine.currentFrame = n;
        $document.selectAll();

        if ($document.selection.length > 0) {
            $document.moveSelectionBy({ x: element1Pos.x, y: element1Pos.y });

            var element2 = $document.selection[0];

            if (element2.elementType != "instance") {
                alert("Invalid instance at '" + element1.name + "'@" + (n + 1) + ".");
            }
            var element2Pos = { x: element2.x, y: element2.y };
            var element2TimeLine = element2.libraryItem.timeline;

            $document.moveSelectionBy({ x: -element2Pos.x, y: -element2Pos.y });

            $library.editItem(element2.libraryItem.name);
            unlockAllLayersTemporarily(element2TimeLine, function () {
                $document.selectAll();
                if ($document.selection.length > 0) {
                    $document.moveSelectionBy({ x: element2Pos.x, y: element2Pos.y });
                }
            });
        }
    }
}

function code() {
    $document.editScene(0);
    var timelineContext = new TimelineContext($timeline);

    for (var layerIndex = 0; layerIndex < timelineContext.timeline.layerCount; layerIndex++) {
        if (!timelineContext.timeline.layers[layerIndex].locked) {
            for (var frameIndex = 0; frameIndex <= 1; frameIndex++) {
                $document.editScene(0);
                $document.selectNone();
                timelineContext.timeline.currentLayer = layerIndex;
                timelineContext.timeline.setSelectedLayers(layerIndex);
                timelineContext.timeline.currentFrame = frameIndex;
                timelineContext.timeline.setSelectedFrames(frameIndex, frameIndex, true);
                trace($document.selection.length);
                codeInsideType(timelineContext);
            }
        }
    }

    $document.editScene(0);
}

code();
