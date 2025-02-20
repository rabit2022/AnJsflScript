//YDMH
//@胖果果K
//https://space.bilibili.com/876519/video
//v1.0.1


var MOTION_CLIPBOARD = fl.configURI + "Javascript/MotionClipboard.xml";
var XMLPANEL = fl.scriptURI.split(".jsfl").join(".xml");

var dom = fl.getDocumentDOM();
var tl = dom.getTimeline();
var sel = dom.selection;

if(sel.length < 1) {
	alert('您必须先选择补间动画.');
} else if (sel.length > 1) {
	alert('选择了多个对象.');
} else {
	run();
}

function run(){
	
	var intensity = 2; //1=低, 2=med, 3=高, 5=非常高
	var frameVelocity = dom.frameRate/32;
	var quality = 2; //1 = 低, 2=med, 3=高
	var horizSpreadFactor = 20; //draws a wider path to prevent errors
	
	var targ = sel[0];
	var targLayer = targ.layer;
	var cFrameNum = tl.currentFrame;
	var cFrame = targLayer.frames[cFrameNum];
	if(cFrame.tweenType != "motion object") {
		alert('此命令只能在补间动画上运行.');
		return;
	}
	if(targ.symbolType == "graphic") {
		var convert = confirm("运动模糊不能应用于图形元件.\r是否要将所选图形元件转换为影片剪辑?");
		if(convert){
			targ.symbolType = "movie clip"
		} else {
			return;
		}
	}
	var start = cFrame.startFrame;
	var duration = cFrame.duration;
	
	var panel = dom.xmlPanel(XMLPANEL);
	if(panel.dismiss == "cancel") {
		return;
	}
	intensity = parseInt(panel.intensity);
	quality = panel.quality;
	intensity *= frameVelocity;
	
	var xArr = new Array();
	var yArr = new Array();
	
	var prevX;
	var prevY;
	var useBlurX = false;
	var useBlurY = false;
	var minDist = 1;
	for(var i = 0; i < duration; i++) {
		//using top & left instead of x & y for 3D compatibility,
		//also tracks some rotation
		var iFrameNum = i + start;
		tl.setSelectedFrames(iFrameNum, iFrameNum + 1 , true);
		var iFrame = targLayer.frames[iFrameNum];
		var iTarg = iFrame.elements[0];
		var xDist = (i==0 || i==duration-1) ? 0 : Math.round(Math.abs(iTarg.left - prevX)*intensity*100)/100;
		var yDist = (i==0|| i==duration-1) ? 0 : Math.round(Math.abs(iTarg.top - prevY)*intensity*100)/100;
		if(xDist > minDist) useBlurX = true;
		if(yDist > minDist) useBlurY = true;
		xArr.push(xDist);
		yArr.push(yDist);
		prevX = iTarg.left;
		prevY = iTarg.top;
	}
	
	if(!useBlurX) xArr = [];
	if(!useBlurY) yArr = [];
	
	var tempLayerNum = tl.addNewLayer("YDMH [temp]");
	var targLayerNum = tempLayerNum + 1;
		
	//-------------
	//to account for missing stroke, 
	//and bug that does not allow noStroke to be set
	//swap, record fill, set stroke, swap, set fill
	var stroke_start = dom.getCustomStroke("toolbar");
	var fill_start = dom.getCustomFill("toolbar");
	if(fill_start.style == "noFill") {
		var fill = dom.getCustomFill("toolbar");
		fill.style = "solid";	fill.color = "#00FF00FF";
		dom.setCustomFill(fill);
	}
	dom.swapStrokeAndFill();
	var stroke = dom.getCustomStroke("toolbar");
	stroke.style = "solid"; stroke.thickness = 1;
	dom.setCustomStroke(stroke);
		
	//-------------
	var xPathData = new Array();
	var yPathData = new Array();
	
	if(useBlurX){
		makeTimePlot(xArr);
		tl.setSelectedFrames([tempLayerNum, tl.currentFrame, tl.currentFrame + 1], true);
		optimizePlotCurve();
		xPathData = getSelectedPathData(dom.selection[0]);
		dom.deleteSelection();
	}
	
	if(useBlurY) {
		makeTimePlot(yArr);
		tl.setSelectedFrames([tempLayerNum, tl.currentFrame, tl.currentFrame + 1], true);
		optimizePlotCurve();
		yPathData = getSelectedPathData(dom.selection[0]);
	}
	
	//get curve data, make xml nodes
	var blurXML = new XML(<PropertyContainer id="Blur_Filter"/>);
	blurXML.appendChild(createNode(xPathData, "Blur_BlurX"));
	blurXML.appendChild(createNode(yPathData, "Blur_BlurY"));
	blurXML.appendChild(<Property enabled="1" id="Blur_Quality" readonly="0" value={quality} visible="1"/>); //make this adjustable
	
	//clear temp layer
	tl.deleteLayer(tempLayerNum);
	
	//-------------
	//reset stroke and fill
	dom.swapStrokeAndFill();
	dom.setCustomFill(fill_start);
	//-------------
	
	var storedMotion = FLfile.read(MOTION_CLIPBOARD);
	tl.setSelectedFrames(start, start+1, true); // copy motion wants the first frame selected
	tl.copyMotion();
	var xmlstr = FLfile.read(MOTION_CLIPBOARD);
	var motionXML = new XML(xmlstr)
	if(motionXML.descendants("PropertyContainer").(@id == "Blur_Filter").length() > 0){
		motionXML.descendants("PropertyContainer").(@id == "Blur_Filter")[0].setChildren(blurXML.children());									 
	} else if(motionXML.descendants("PropertyContainer").(@id == "Filters").length() > 0)  {
		motionXML.descendants("PropertyContainer").(@id == "Filters")[0].appendChild(blurXML);
	} else {
		var filterXML = new XML(<PropertyContainer id="Filters"/>);
		filterXML.appendChild(blurXML);
		motionXML.PropertyContainer.(@id=="headContainer").appendChild(filterXML);
	}
	//write altered xml to clipboard
	FLfile.write(MOTION_CLIPBOARD, motionXML.toXMLString());
	
	tl.pasteMotion();
	
	//restore clipboard
	FLfile.write(MOTION_CLIPBOARD, storedMotion);

	//FUNCTIONS
	
	function drawLine(dPath){
		dPath.makeShape(true, false);
	}
	
	function makeTimePlot(distArr) {
		fl.drawingLayer.beginDraw();
		fl.drawingLayer.beginFrame();
		var plot = fl.drawingLayer.newPath();
		for(var i=0; i < distArr.length; i++) {
			plot.addPoint(i*horizSpreadFactor, distArr[i]);
		}
		plot.makeShape(true, false);
		fl.drawingLayer.endFrame();
		fl.drawingLayer.endDraw();
	}
	
	function swapFile(newFile, oldFile) {
		//must delete existing before copying
		var removed = FLfile.remove(oldFile);
		var copied  = FLfile.copy(newFile, oldFile);
	}
	
	function optimizePlotCurve(){
		dom.smoothSelection();
		dom.optimizeCurves(100, true);
	}
	
	/*function getSelectedPathData(selPath){
		var pathData = new Array();
		var edgeArr = selPath.edges.sort(sortEdges);
		fl.trace('...' + edgeArr[edgeArr.length-1].cubicSegmentIndex);
		for(var j=0; j < selPath.numCubicSegments; j++) {
			var index = j;
			var cubicPoints = selPath.getCubicSegmentPoints(index); 
			pathData[j] = new Array();
			for (i=0; i<cubicPoints.length; i++) { 
				pathData[j][i] = {x: cubicPoints[i].x, y: cubicPoints[i].y};
				fl.trace("edge " + j + ", index " + i +" x: " + cubicPoints[i].x  + " y: " + cubicPoints[i].y); 
			}
		}
		return pathData;
	}*/
	
	function getSelectedPathData(selPath){
		var pathData = new Array();
		var edgeArr = selPath.edges.sort(sortEdges);
		//fl.trace('...' + edgeArr[0].cubicSegmentIndex);
		for(var j=0; j < selPath.numCubicSegments; j++) {
			var index = edgeArr[j].cubicSegmentIndex;
			var cubicPoints = selPath.getCubicSegmentPoints(index); 
			pathData[j] = new Array();
			for (i=0; i<cubicPoints.length; i++) { 
				pathData[j][i] = {x: cubicPoints[i].x, y: cubicPoints[i].y};
				//fl.trace("edge " + index + ", index " + i +" x: " + cubicPoints[i].x  + " y: " + cubicPoints[i].y); 
			}
		}
		return pathData;
	}
	
	function sortEdges(a, b){
		var sortProp = "x";
		return (a.getControl(0)[sortProp] - b.getControl(0)[sortProp]);
	}
	
	function createNode(pathData, idName) {
		var node = new XML(<Property enabled="1" id={idName} ignoreTimeMap="0" readonly="0" visible="1" />);
		if(!(pathData.length > 1)) {
			node.appendChild(<Keyframe anchor="0,0" next="0,0" previous="0,0" roving="0" timevalue="0"/>);
			return node;
		}
		for(var i=0; i <= pathData.length; i++){
			//x values are time offsets
			var maxTimeVal = (duration-1) * 1000;
			var anchX = 0;
			var timeVal = (i == pathData.length)   ? maxTimeVal : Math.round(pathData[i][0].x * (1000/horizSpreadFactor)); //time offset
			var anchY = (i == pathData.length) 	   ? 0 : pathData[i][0].y;
			var nextX = (i >= pathData.length - 1) ? 0 : Math.round(pathData[i][1].x * (1000/horizSpreadFactor)) - timeVal; //time offset
			var nextY = (i >= pathData.length - 1) ? 0 : pathData[i][1].y;
			var prevX;
			var prevY;
			if(i == 0) { timeVal = anchY = prevX = prevY = 0; }
			else {	
				prevX = Math.round(pathData[i-1][2].x * (1000/horizSpreadFactor)) - timeVal; //time offset
				prevY = pathData[i-1][2].y;
			}
			var anchStr = anchX + "," + anchY;
			var nextStr = nextX + "," + nextY;
			var prevStr = prevX + "," + prevY;
			node.appendChild(<Keyframe  previous={prevStr} anchor={anchStr} next={nextStr} roving="0" timevalue={timeVal} />);
		}
		return node;
	}
	//END FUNCTIONS

}//END run()