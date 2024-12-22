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


    function Main() {
        if (!checkDom()) {
            return;
        }

        // doc.selection.clear();

        // SelectStart();
        // var element = ele.getMaxRight(selection);
        // fl.trace(element.name);

        // fl.trace("Hello World!");

        // var XMLPANEL = fl.scriptURI.split(".jsfl").join(".xml");
        // var panel = doc.xmlPanel(XMLPANEL);
        // if(panel.dismiss === "cancel") {
        //     fl.trace("取消");
        //     return;
        // }
        // direction = panel.direction;
        // angle = parseInt(panel.angle);
        // fl.trace("direction: " + direction + ", angle: " + angle);

        // // 假设baseURL是页面的URL
        // const baseURL = new URL(window.location.href);
        // return new URL(relativeURL, baseURL).href;
        // var url = getAbsolutePath("./test.txt");
        // fl.trace(url);
        // an.getDocumentDOM().mouseClick({x:250, y:0}, false, true);
        var rect = new Rect(0, 0, 100, 100);
        doc.addNewPrimitiveOval(rect.toObj())
    }

    Main();
})();
