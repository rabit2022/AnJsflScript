/**
 * @file: 09.一键生气.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 16:55
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        return true;
    }

    function checkSelection() {
        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
        if (selection.length > 1) {
            alert("请选择单个元件");
            return false;
        }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }


    function checkSelectedFrames() {
        var frs = frUtil.getSelectedFrs(timeline);
        if (frs.length < 1) {
            alert("请选择至少一个帧");
            return null;
        }
        return frs;
    }
    
    

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom()) return;
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    const MAX_KEYFRAME = 30;  // 最大关键帧数量
    /**
     * 生成数列
     * 先+2，再+1，直到超过上限
     * @param {number}limit 数列上限
     * @param {number}[initial=0] 初始数
     */
    function generateKfs(limit, initial) {
        if (initial === undefined) initial = 0;  // 如果没有指定初始数，默认为0
        var max_value = limit + initial;  // 最大值

        var allKeyFrames = [];  // 用于存储生成的数列
        var alteredKeyFrames = [];  // 用于存储需要修改的数列

        var current = initial;    // 当前数从0开始
        while (current <= max_value) {  // 当前数不超过上限
            allKeyFrames.push(current);  // 添加当前数
            current += 2;            // 先加2
            alteredKeyFrames.push(current);  // 添加加2后的数
            if (current <= max_value) {  // 如果加2后的数不超过上限
                allKeyFrames.push(current);  // 添加加2后的数
                current += 1;            // 再加1
            }
        }

        return {allKeyFrames: allKeyFrames, alteredKeyFrames: alteredKeyFrames};
    }


    function Main() {
        // 检查选择的元件
        if (!checkSelection()) return;

        // 读取XML面板配置
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;

        // 选中的所有帧 的第一帧
        var frs = checkSelectedFrames();
        if (frs === null) return;
        var firstFrame = frs[0].startFrame;
        // print(firstFrame);

        // 0,2,3,5,6,8,9,11,12,14,15,17,18,20,21,23,24,26,27,29,30
        // 0,2
        // 2    104.7,104.9
        var {allKeyFrames, alteredKeyFrames} = generateKfs(MAX_KEYFRAME, firstFrame);
        // print(allKeyFrames);
        // print(alteredKeyFrames);

        for (var i = 0; i < allKeyFrames.length; i++) {
            var frame = allKeyFrames[i];

            // 关键帧
            timeline.convertToKeyframes(frame);
        }

        for (var i = 0; i < alteredKeyFrames.length; i++) {
            var frame = alteredKeyFrames[i];

            // 3
            var frame_element=timeline.layers[0].frames[frame].elements[0];
            frame_element.scaleX=1.047;
            frame_element.scaleY=1.049;
        }

        // 获取allKeyFrames first,last
        var firstF = allKeyFrames[0];
        var lastF = allKeyFrames[allKeyFrames.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        // 传统补间动画
        curve.setClassicEaseCurve(timeline);

        // 重置选中帧
        frUtil.resetSelectedFrames(timeline,frs);
    }

    Main();
})();