///<reference path="../jsfl.d.ts" />
///<reference path="../utils.ts" />

fl.runScript(fl.scriptURI.replace(/\/[^\/]+$/, '') + '/../utils.js');

fl.outputPanel.clear();

//var alreadyMovedClips = {};

function codeInsideType(timelineContext: TimelineContext) {
    if ($document.selection.length == 0) {
        fl.trace('---');
        return;
    }

    var element1 = $document.selection[0];
    fl.trace('||' + element1 + ' :: ' + $document.selection.length + ' :: ' + element1.name + ' :: ' + element1.elementType);
    if (element1.elementType != "instance") {
        fl.trace("Invalid instance at: " + timelineContext.timeline.layers[timelineContext.timeline.currentLayer].name + ':' + (timelineContext.timeline.currentFrame + 1));
        //alert("Invalid instance at '" + element1.name + "'");
        return;
    }

    var element1Pos = { x: element1.x, y: element1.y };
    var element1LibraryItem = element1.libraryItem;
    var element1TimeLine = element1LibraryItem.timeline;

    //trace(element1Pos);

    $document.moveSelectionBy({ x: -element1Pos.x, y: -element1Pos.y });

    //if (justMoveSuperior) return;

    //if (alreadyMovedClips[element1LibraryItem.name] === undefined) {
    //    alreadyMovedClips[element1LibraryItem.name] = true;

        for (var n = 0; n < element1TimeLine.frameCount; n++) {
            $library.editItem(element1.libraryItem.name);

            element1TimeLine.currentFrame = n;
            $document.selectAll();
            //element1TimeLine.setSelectedLayers(
            //element1TimeLine.setSelectedFrames([n], true);

            if ($document.selection.length > 0) {
                $document.moveSelectionBy({ x: element1Pos.x, y: element1Pos.y });
                
                var element2 = $document.selection[0];
                //fl.trace('::' + element2);
                if (element2.elementType != "instance") {
                    alert("Invalid instance at '" + element1.name + "'@" + (n + 1) + ".");
                }
                var element2Pos = { x: element2.x, y: element2.y };
                var element2TimeLine = element2.libraryItem.timeline;
                
                $document.moveSelectionBy({ x: -element2Pos.x, y: -element2Pos.y });

                $library.editItem(element2.libraryItem.name);
                unlockAllLayersTemporarily(element2TimeLine, () => {
                    $document.selectAll();
                    if ($document.selection.length > 0) {
                        $document.moveSelectionBy({ x: element2Pos.x, y: element2Pos.y });
                    }
                });
            }
        }
    //}
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
                //break;
            }
            //return;
        }
    }

    $document.editScene(0);
}

code();
