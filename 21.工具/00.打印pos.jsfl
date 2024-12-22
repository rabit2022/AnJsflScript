/**
 * @file: 00.打印pos.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 18:07
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

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Transform(element) {
        // 旋转
        this.rotation = element.rotation;
        // 缩放
        this.scale = new Point(element.scaleX, element.scaleY);
        // 位置
        this.position = new Point(element.x, element.y);
        // 宽高
        this.size = new Point(element.width, element.height);
        // 倾斜
        this.skew = new Point(element.skewX, element.skewY);
    }
    
    Transform.prototype.toString = function () {
        return "Transform(rotation=" + this.rotation + ", scale=" + this.scale + ", position=" + this.position + ", size=" + this.size + ", skew=" + this.skew + ")";
    }


    function Main() {
        if (!checkDom()) {
            return;
        }

        var transformArray = [];
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            var transform = new Transform(element);
            // fl.trace(transform.toString());
            transformArray.push(transform.toString());
        }

        LogArray(transformArray);
    }

    Main();
})();

