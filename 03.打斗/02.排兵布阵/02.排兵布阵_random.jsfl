/**
 * @file: 02.排兵布阵_random.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 16:34
 * @project: AnJsflScript
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
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
        var success = true;
        // var XMLPANEL = osPath.join([folder_name, onlyName + "_random.xml"]);
        var XMLPANEL = osPath.getXMLPath();
        var panel = doc.xmlPanel(XMLPANEL);
        if (panel.dismiss === "cancel") {
            alert("取消修改");
            success = false;
        }
        // horizontalCount  horizontalSpacing
        var inputHorizontalCount = panel.horizontalCount;
        if (inputHorizontalCount === null || isNaN(Number(inputHorizontalCount))) {
            alert("横向排布数量只能输入数字，请重新输入。");
            success = false;
        }
        var inputHorizontalSpacing = panel.horizontalSpacing;
        if (inputHorizontalSpacing === null || isNaN(Number(inputHorizontalSpacing))) {
            alert("横向排布间距只能输入数字，请重新输入。");
            success = false;
        }

        var horizontalCount = Number(inputHorizontalCount);
        var horizontalSpacing = Number(inputHorizontalSpacing);
        return {horizontalCount: horizontalCount, horizontalSpacing: horizontalSpacing, success: success}
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkDom()) {
            return;
        }

        // 随机排布
        var {horizontalCount, horizontalSpacing, success} = checkXMLPanel();
        if (!success) {
            return;
        }
        
        // # 30仅数量
        // # y=高*(1+间隔倍数)
        // # x=(1.4~1.7)*y
        // #  0.6,1.4 缩放1

        var firstElement = selection[0];
        var elementHeight = firstElement.height;
        var initialPos=wrapPosition(firstElement);
        
        var rectHeight = elementHeight * (1 + horizontalSpacing);
        var rectWidth = random.uniform(1.4, 1.7) * rectHeight;
        var rectSize = new Size(rectWidth, rectHeight);
        // fl.trace("矩形:"+rectSize.toString());
        
        for (var i = 0; i < horizontalCount; i++) {
            if (i === 0) continue;
            
            OnlySelectCurrent(selection[0]);

            // 复制粘贴
            doc.clipCopy();
            doc.clipPaste();
            
            // 移动位置
            var element1 = doc.selection[0];

            // 缩放倍数
            var scale = random.uniform(0.6, 1.4);
            // fl.trace("缩放倍数"+scale);
            element1.scaleX*=scale;
            element1.scaleY*=scale;
            
            var randomPos=rectUtil.generateRandomPoint(rectSize, initialPos);
            element1.x=randomPos.x;
            element1.y=randomPos.y;

        }
    }

    Main();
})();

