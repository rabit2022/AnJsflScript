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

        var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        if (horizontalCount === null) return null;
        var horizontalSpacing = xmlPanelUtil.parseNumber(panel.horizontalSpacing, "横向排布间距只能输入数字，请重新输入。");
        if (horizontalSpacing === null) return null;

        return {horizontalCount: horizontalCount, horizontalSpacing: horizontalSpacing};
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function getExplosionRect(horizontalSpacing) {
        var firstElement = selection[0];
        var elementHeight = firstElement.height;
        var initialPos = wrapPosition(firstElement);

        var rectHeight = elementHeight * (1 + horizontalSpacing);
        var rectWidth = random.uniform(1.4, 1.7) * rectHeight;
        // var rectSize = new Size(rectWidth, rectHeight);
        // fl.trace("矩形:"+rectSize.toString());
        var rect = wrapRectByCenter(initialPos.x, initialPos.y, rectWidth, rectHeight);
        return rect;
    }

    function Main() {
        if (!checkDom()) {
            return;
        }

        // 随机排布
        var config = checkXMLPanel();
        if (config === null) {
            return;
        }
        var horizontalCount = config.horizontalCount;
        var horizontalSpacing = config.horizontalSpacing;

        // # 30仅数量
        // # y=高*(1+间隔倍数)
        // # x=(1.4~1.7)*y
        // #  0.6,1.4 缩放1

        var explosionRect = getExplosionRect(horizontalSpacing);

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

            // 随机位置
            // var randomPos=rectUtil.generateRandomPoint(rectSize, initialPos);
            var randomPos = rectUtil.generateRandomPointInRect(explosionRect);

            var transform = wrapTransform(element1);
            transform.setPosition(randomPos).setScale(new Point(scale, scale));

        }
    }

    Main();
})();

