/**
 * @file: 06.一键震惊.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 14:08
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkDom() {
        if (doc == null) {
            // throw new Error("请打开 [.fla] 文件");
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
    
    function checkSelectedFrames() {
        var frs = frUtil.getSelectedFrs(timeline);
        if (frs.length < 1) {
            alert("请选择至少一个帧");
            return null;
        }
        return frs;
    }

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }


    var doc = fl.getDocumentDOM();//文档
    if (!checkDom()) return;
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkSelection()) return;
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;

        // 选中的所有帧 的第一帧
        var frs = checkSelectedFrames();
        if (frs === null) return;
        
        // 变形点
        ele.setTransformationPoint(selection[0],"bottom center");
        
        // 1,3,6
        var firstFrame = frs[0].startFrame;
        
        var frame_1 = firstFrame + FRAME_1;
        var frame_3 = firstFrame + FRAME_3;
        var frame_6 = firstFrame + FRAME_6;

        // 关键帧
        timeline.convertToKeyframes(frame_1);
        timeline.convertToKeyframes(frame_3);
        timeline.convertToKeyframes(frame_6);

        // 3
        var frame3_element=timeline.layers[0].frames[frame_3].elements[0];
        frame3_element.scaleY=1.6;

        // 选中1-5帧
        timeline.setSelectedFrames(frame_1, frame_6, true);
        // 传统补间动画
        curve.setClassicEaseCurve(timeline);
        
        // 重置选中帧
        frUtil.resetSelectedFrames(timeline,frs);
    }

    Main();
})();