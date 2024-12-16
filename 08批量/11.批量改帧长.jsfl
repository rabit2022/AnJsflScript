/**
 * @file: 11.批量改帧长.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:29
 * @project: WindowSWF-master
 * @description:
 */



function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }

    // if (selection.length < 1) {
    //     alert("请选择元件？");
    //     return false;
    // }
    // if (selection.length > 1) {
    //     alert("请选择单个元件");
    //     return false;
    // }
    // if (selection.length === 1) {
    //     alert("请选择至少两个元件");
    //     return false;
    // }
    return true;
}

/**
 * 帧范围类
 * @param {number} layerIndex 图层索引
 * @param {number} startFrame 开始帧
 * @param {number} endFrame 结束帧
 */
function FrameRange(layerIndex, startFrame, endFrame) {
    this.layerIndex = layerIndex;
    this.startFrame = startFrame;
    this.endFrame = endFrame;
    this.duration = endFrame - startFrame + 1;
}

FrameRange.prototype.toString = function () {
    return "LayerIndex: " + this.layerIndex + ", StartFrame: " + this.startFrame + ", EndFrame: " + this.endFrame;
}

// FrameRange 包含在 selectedFrameRanges 中，则返回 true
/**
 * 判断 FrameRange 是否包含在 selectedFrameRanges 中
 * @param {FrameRange} fr2 选中范围数组
 * @return {boolean} 是否包含
 */
FrameRange.prototype.Contain = function (fr2) {
    if (this.layerIndex !== fr2.layerIndex) {
        return false;
    }
    return this.startFrame >= fr2.startFrame && this.endFrame <= fr2.endFrame;
}

/**
 * 判断 FrameRange 是否包含在 selectedFrameRanges 中
 * @param {FrameRange[]} frs 选中范围数组
 */
FrameRange.prototype.Contains= function ( frs) {
    for (var i = 0; i < frs.length; i++) {
        if (this.Contain(frs[i])) {
            return frs[i];
        }
    }
    return null;
}


/**
 * 获取选中元件的帧范围
 * @param {number[]} selectedFrames 选中元件的帧范围
 * @return {FrameRange[]} 帧范围数组
 */
function wrapSelectedFrames(selectedFrames) {
    /**
     * 获取选中元件的帧范围
     * @type {FrameRange[]}
     */
    var frameRanges = [];
    for (var i = 0; i < selectedFrames.length; i++) {
        // fl.trace("选中元件：" + i);
        var layerIndex = selectedFrames[i];
        var startFrame = selectedFrames[i + 1];
        var endFrame = selectedFrames[i + 2];
        i = i + 2;
        var frameRange = new FrameRange(layerIndex, startFrame, endFrame);
        frameRanges.push(frameRange);
    }
    return frameRanges;
}


//快速抽取关键帧索引-注意是索引， 不是frame对象
/**
 * 获取关键帧索引
 * @param {number} layerIndex 图层
 * @return {number[]} 关键帧索引数组
 */
function getKeyFrames(layerIndex) {
    var layer = layers[layerIndex];
    var frames = layer.frames;

    /**
     * 关键帧数组
     * @type {number[]}
     */
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        //情景模拟， 95  80  20  1 是关键帧
        //获取关键帧数
        var frame = frames[i];//i=100
        var startFrame = frame.startFrame;//95
        i = startFrame;// 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
    }
    keyFrames.sort(function (a, b) {
        return a - b;
    })
    return keyFrames;
}

/**
 * 获取关键帧 范围
 * @param {number} layerIndex 图层
 * @param {number[]} keyFrames 关键帧索引数组
 * @return {FrameRange[]} 帧范围数组
 */
function wrapKeyFrames(layerIndex, keyFrames) {
    /**
     * 关键帧范围数组
     * @type {FrameRange[]}
     */
    var keyFrameRanges = [];
    for (var i = 0; i < keyFrames.length; i++) {
        if (i + 1 >= keyFrames.length) continue;

        var startFrame = keyFrames[i];
        var endFrame = keyFrames[i + 1];
        // var layerIndex = layerIndex;
        var frameRange = new FrameRange(layerIndex, startFrame, endFrame);
        keyFrameRanges.push(frameRange);
    }
    return keyFrameRanges;
}

function KeyframeDurationHandler(input){
    this.defaultDuration = 30;
    this.mode = "normal";
    // 确定增加、减少或统一持续帧数
    const sign = input[0];
    const number = parseInt(input, 10);
    if (isNaN(number)) {
        alert("请输入合法的数字");
        return;
    }

    // 绝对值
    this.defaultDuration = Math.abs(number);
    switch (sign) {
        case '+':
            this.mode = "increase";
            break;
        case '-':
            this.mode = "decrease";
            break;
        default:
            this.mode = "normal";
            break;
    }
}
    


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

var timeline = doc.getTimeline();//时间轴
var layers = timeline.layers;//图层


function processSelectedFrames() {
    
}
function Main() {
    if (!checkDom()) {
        return;
    }

    var   msg = prompt("请输入关键帧持续帧数（“+3”为增加，“-3”为减少，无符号“3”为统一）",30);
    if (msg == null||msg === "") {
        alert("请输入合法的关键帧持续帧数");
        return;
    }
    
    var kdh = new KeyframeDurationHandler(msg);

    // 选中的帧范围
    var selectedFrames = timeline.getSelectedFrames();
    if (selectedFrames.length < 1) {
        alert("请选择要调整长度的关键帧或图层！");
        return;
    }
    var selectedFrs = wrapSelectedFrames(selectedFrames);
    // fl.trace("==============================");
    
    for (var i = 0; i < selectedFrs.length; i++) {
        var selectedFr = selectedFrs[i];
        
        // 关键帧范围
        var keyFrames = getKeyFrames(selectedFr.layerIndex);
        var keyFrameRanges = wrapKeyFrames(selectedFr.layerIndex, keyFrames);
        if (keyFrameRanges.length < 1){
            continue;
        }
        
        // 选中范围 包含在 关键帧范围中
        var keyFr = selectedFr.Contains(keyFrameRanges);
        if (keyFr == null) {
            continue;
        }
        // fl.trace("选中范围：" + keyFr.toString());
        
        // 设置选中图层
        timeline.setSelectedLayers(keyFr.layerIndex,true);

        // 删减关键帧，增加关键帧
        if (kdh.mode === "increase") {
            // fl.trace("增加关键帧持续帧数：" + kdh.defaultDuration);
            var toAddFrames = kdh.defaultDuration;
            if (toAddFrames > 0) {
                // fl.trace("需要增加 " + toAddFrames + " 帧");
                timeline.insertFrames(toAddFrames, false, keyFr.endFrame);
            }
        }else if (kdh.mode === "decrease") {
            // fl.trace("减少关键帧持续帧数：" + kdh.defaultDuration);
            var toRemoveFrames = kdh.defaultDuration;
            if (toRemoveFrames > 0) {
                var startFrame = keyFr.startFrame;
                var endFrame = keyFr.startFrame + toRemoveFrames - 1;
                timeline.removeFrames(startFrame, endFrame);
            }
        }else {
            // fl.trace("统一关键帧持续帧数：" + kdh.defaultDuration);
            if (keyFr.duration > kdh.defaultDuration) {
                var toRemoveFrames = keyFr.duration - kdh.defaultDuration;
                var startFrame = keyFr.startFrame + toRemoveFrames;
                var endFrame = keyFr.endFrame;
                timeline.removeFrames(startFrame, endFrame);
            } else if (keyFr.duration < kdh.defaultDuration) {
                var toAddFrames = kdh.defaultDuration - keyFr.duration;
                timeline.insertFrames(toAddFrames, false, keyFr.startFrame);
            }
        }

    }

    // select None
    timeline.setSelectedFrames([0,0,0],true);
}

Main();


function LogNumbers(numbers) {
    var str = "";
    for (var i = 0; i < numbers.length; i++) {
        str += numbers[i] + " ";
    }
    fl.trace(str);
}