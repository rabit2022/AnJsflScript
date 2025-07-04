/**
 * @file: 01.批量复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 12:40
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "MoreElement", "ElementSelect"], function (
    checkUtil,
    MoreElement,
    es
) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;
    const { OnlySelectCurrent, SelectStart } = es;

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

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Not Zero")) return;

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
            OnlySelectCurrent(element);

            var me = new MoreElement(element);
            // print("moreElement"+moreElement.toString())
            moreElements.push(me);
        }

        // 复制元件
        /**
         *
         * @type {MoreElement}
         */
        var currentMoreElementsCopy;
        for (var i = 0; i < moreElements.length; i++) {
            var moreElement = moreElements[i];
            // print("moreElement"+moreElement.toString())

            for (var j = 0; j < copyCount; j++) {
                var nextPoint = moreElement.NeatOffset(j + 1, 0);
                // print("nextPoint:"+nextPoint.toString())
                // 复制元件
                OnlySelectCurrent(moreElement.element);

                // 复制粘贴
                doc.clipCopy();
                doc.clipPaste();

                // 移动元件
                var newElement = doc.selection[0];
                newElement.x = nextPoint.x;
                newElement.y = nextPoint.y;
            }
        }

        SelectStart(selection);
    }

    Main();
});
