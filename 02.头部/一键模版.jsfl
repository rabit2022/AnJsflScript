/**
 * @file: ${FILE_NAME}
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: ${DATE} ${TIME}
 * @project: ${PROJECT_NAME}
 * @description: ${END}
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

    function KFrames(timeline, frs){
        // // 设置变形点
        // var element = selection[0];
        // var trPoint = pointUtil.getShakeHeadTrPoint(element1);
        // element.setTransformationPoint(trPoint);
        //
        // // 1,11
        // var firstFrame = frs[0].startFrame; // 第一个帧的开始帧
        // var frame_1 = firstFrame + FRAME_1;
        // var frame_11 = firstFrame + FRAME_11;
        //
        // // 关键帧
        // timeline.convertToKeyframes(frame_1);
        // timeline.convertToKeyframes(frame_11);
        //
        // // 选中帧
        // timeline.setSelectedFrames(frame_1, frame_11, true);
        //

    }
    function Main() {
        // 检查选择的元件
        if (!checkSelection()) return;

        // 读取XML面板配置
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;

        // 选中的帧
        // var frs = checkSelectedFrames();
        // if (frs === null ) return;

        // k帧
        // KFrames(timeline, frs);

        // 重置选中
        // frUtil.resetSelectedFrames(timeline,frs);
    }

    Main();
})();