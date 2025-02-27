// https://community.adobe.com/t5/animate-discussions/intelligent-tween-jsfl/m-p/12875796
(function () {
    mainLoop();

    function mainLoop() {
        var doc = fl.getDocumentDOM();
        var myTimeline = doc.getTimeline();
        var i, j, myLayer, myFrame;
        var selectedFrames = myTimeline.getSelectedFrames();

        if (selectedFrames.length === 0) {
            fl.trace('Select timeline frames to work on.');
            return;
        }

        // Loop through our 'selected frames'
        for (i = 0; i < selectedFrames.length; i += 3) {
            myLayer = myTimeline.layers[selectedFrames[i]];

            // Skip timeline folders
            if (myLayer.layerType === 'folder') continue;

            for (j = selectedFrames[i + 1]; j < selectedFrames[i + 2]; j++) {
                myFrame = myLayer.frames[j];

                // Skip empty frames
                if (!myFrame) continue;

                // Call our function on keyframes only
                if (isKeyFrame(myLayer, j)) {
                    createTween(myFrame);
                }
            }
        }
    }

    function isKeyFrame(aLayer, frameNum) {
        if (!aLayer.frames[frameNum]) return false;
        return aLayer.frames[frameNum].startFrame === frameNum;
    }

    function createTween(fr) {
        if (fr.elements.length > 1) return;
        var el = fr.elements[0];

        if (el.elementType === 'shape') {
            fr.tweenType = 'shape';
        } else if (el.elementType === 'instance') {
            fr.tweenType = 'motion';
            fr.motionTweenScale = true;
            fr.motionTweenRotate = 'auto';
            fr.motionTweenOrientToPath = false;
            fr.motionTweenSync = false;
            fr.motionTweenSnap = false;
        }
    }
})();
