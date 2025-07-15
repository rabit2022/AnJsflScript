/**
 * @file: 09.一键生气.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 16:55
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "EaseCurve", "FramesSelect", "KeyFrameOperation"], function (
    checkUtil,
    curve,
    fms,
    kfo
) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    const { setClassicEaseCurve } = curve;
    const { SelectStartFms } = fms;
    const { convertToKeyframesSafety } = kfo;

    var descriptions = {
        file: "09.一键生气.jsfl",
        "file description": "生气的动作",
        selection: "仅一个元件",
        "selection description": "选中头部",
        XMLPanel: true,
        "input parameters": {},
        detail: "直接k帧",
        "detail description": "选中至少一帧，这一帧上元件数量，只能是一个",
        steps: ["获取第一帧", "k帧", "设置缩放", "创建补间动画"]
    };

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    const MAX_KEYFRAME = 30; // 最大关键帧数量
    /**
     * 生成数列
     * 先+2，再+1，直到超过上限
     * @param {number}limit 数列上限
     * @param {number}[initial=0] 初始数
     */
    function generateKfs(limit, initial) {
        if (initial === undefined) initial = 0; // 如果没有指定初始数，默认为0
        var max_value = limit + initial; // 最大值

        var allKeyFrames = []; // 用于存储生成的数列
        var alteredKeyFrames = []; // 用于存储需要修改的数列

        var current = initial; // 当前数从0开始
        while (current <= max_value) {
            // 当前数不超过上限
            allKeyFrames.push(current); // 添加当前数
            current += 2; // 先加2
            alteredKeyFrames.push(current); // 添加加2后的数
            if (current <= max_value) {
                // 如果加2后的数不超过上限
                allKeyFrames.push(current); // 添加加2后的数
                current += 1; // 再加1
            }
        }

        return {
            allKeyFrames: allKeyFrames,
            alteredKeyFrames: alteredKeyFrames
        };
    }

    function Main() {
        // 检查选择的元件
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 选中的所有帧 的第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;
        var firstFrame = frs[0].startFrame;
        var firstLayer = layers[frs[0].layerIndex];

        // 0,2,3,5,6,8,9,11,12,14,15,17,18,20,21,23,24,26,27,29,30
        // 0,2
        // 2    104.7,104.9
        var { allKeyFrames, alteredKeyFrames } = generateKfs(MAX_KEYFRAME, firstFrame);

        // 关键帧
        convertToKeyframesSafety(timeline, allKeyFrames);

        for (var i = 0; i < alteredKeyFrames.length; i++) {
            var frame = alteredKeyFrames[i];

            // 3
            var frame_element = firstLayer.frames[frame].elements[0];
            frame_element.scaleX = 1.047;
            frame_element.scaleY = 1.049;
        }

        // 获取allKeyFrames first,last
        var firstF = allKeyFrames[0];
        var lastF = allKeyFrames[allKeyFrames.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        // 传统补间动画
        setClassicEaseCurve(timeline);

        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
