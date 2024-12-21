/**
 * @file: 01.批量复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 12:40
 * @project: WindowSWF-master
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


    function MoreElement(element) {
        this.element = element;
        this.positioin = new Point(element.x, element.y);
        this.offsetX = element.width;
    }

    MoreElement.prototype.Next = function (index) {
        var elementX = this.positioin.x + this.offsetX * index;
        return new Point(elementX, this.positioin.y);
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

        var copyCount = prompt("请输入复制次数：", 9);
        if (copyCount == null || copyCount < 0) {
            alert("请输入正确的次数");
            return;
        }

        // 添加数据
        /**
         *
         * @type {MoreElement[]}
         */
        var moreElements = [];
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];

            // 选中当前元件
            onlySelectCurrent(element);

            var moreElement = new MoreElement(element);
            moreElements.push(moreElement);
        }

        // 复制元件
        /**
         *
         * @type {MoreElement}
         */
        var currentMoreElementsCopy;
        for (var i = 0; i < moreElements.length; i++) {
            var moreElement = moreElements[i];

            for (var j = 0; j < copyCount; j++) {
                var nextPoint = moreElement.Next(j);
                // 复制元件
                onlySelectCurrent(moreElement.element);
                
                // 复制粘贴
                doc.clipCopy();
                doc.clipPaste();
                
                // 移动元件
                var newElement = doc.selection[0];
                newElement.x = nextPoint.x;
                newElement.y = nextPoint.y;
            }
        }

        SelectStart();
    }
    Main();
})();
