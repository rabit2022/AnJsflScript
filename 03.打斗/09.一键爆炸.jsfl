/**
 * @file: 09.一键爆炸.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 12:31
 * @project: AnJsflScript
 * @description:
 */


(function () {
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

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引


    function getExplosionRect(element) {
        // # 爆炸矩形  position
        // # 倍数x=w/h
        // # 倍数y=0.08*x^2-x+5  +-0.3
        // # m = max(w,h)
        // # rw=m*倍数y
        // # rh=y*(2+-0.8)
        //
        // # 1.5-3 scale
        // # -180,180  rotation
        var size = wrapSize(element);
        var biggerSize = size.max;
        var smallerSize = size.min;
        var ratioX = biggerSize / smallerSize;
        var ratioY = 0.08 * ratioX * ratioX - ratioX + 5 + random.uniform(-0.3, 0.3);

        var rectHeight = biggerSize * ratioY;
        var rectWidth = rectHeight * (2 + random.uniform(-0.5, 0.5));
        // fl.trace("rectWidth:" + rectWidth + " rectHeight:" + rectHeight);

        // var center = wrapPosition(element);
        // var rect = wrapRectByCenter(center.x, center.y, rectWidth, rectHeight);
        // return rect;
        var rectSize = new Size(rectWidth, rectHeight);
        return rectSize;
    }

    function KFrames(element) {
        var explosionRectSize = getExplosionRect(element);

        doc.enterEditMode("inPlace");

        var timeline1 = doc.getTimeline();//时间轴
        // 增加15帧
        timeline1.insertFrames(15 - 1, true);
        // //分散到图层操作
        // doc.distributeToLayers();
        // // 删除多余的碎片
        // ele.splinterDeleter();
        
        // 选中最后一帧
        timeline1.currentFrame = timeline1.frameCount - 1;
        timeline1.insertKeyframe();


        // 补间动画
        doc.selectAll();
        timeline1.createMotionTween();
        timeline1.setFrameProperty('motionTweenRotate', 'clockwise');
        timeline1.setFrameProperty('motionTweenRotateTimes', '2');
        // timeline1.setSelectedFrames([]);

        // 更改位置
        timeline1.currentFrame = timeline1.frameCount - 1;
        SelectAll();
        for (var i = 0; i < doc.selection.length; i++) {
            var element = doc.selection[i];

            // 移动到随机位置
            var initialPos = wrapPosition(element);
            var randomPos = rectUtil.generateRandomPoint(explosionRectSize, initialPos);
            // 随机缩放
            var scale = random.uniform(1.5, 3);
            // 随机旋转
            var rotation = random.uniform(-180, 180);
            
            var transform = wrapTransform(element);
            transform.setPosition(randomPos).setScale(scale).setRotation(rotation);
        }

        doc.exitEditMode();
    }

    function Main() {
        if (!checkDom()) {
            return;
        }

        // 碎片
        ele.splinterSymbol(doc.selection[0], "一键爆炸_");

        
        // 爆炸效果
        KFrames(doc.selection[0]);
    }

    Main();
})();

