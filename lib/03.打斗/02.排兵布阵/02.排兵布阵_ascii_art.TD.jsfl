/**
 * @file: 02.排兵布阵_ascii_art.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/27 21:27
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require([
    "checkUtil",
    "loglevel",
    "os",
    "open",
    "MoreElement",
    "ElementSelect",
    "XUL"
], function (checkUtil, log, os, open, MoreElement, es, XUL) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { SelectSameName } = es;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    // 资源文件夹路径ascii_art_library
    const ASCII_ART_LIBRARY_PATH = os.path.join(
        window.AnJsflScript.$ProjectFileDir$,
        "./config/ascii_art_library/"
    );
    log.info("ASCII_ART_LIBRARY_PATH:", ASCII_ART_LIBRARY_PATH);

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

        var listdir = os.listdir(ASCII_ART_LIBRARY_PATH);
        log.info("listdir:", listdir);

        // 获取.txt文件列表
        var txtFileList = listdir.filter(function (file) {
            return file.endsWith(".txt");
        });
        log.info("txtFileList:", txtFileList);

        var menuItems = txtFileList.map(function (file) {
            return {
                label: file.replace(".txt", ""),
                value: os.path.join(ASCII_ART_LIBRARY_PATH, file)
            };
        });
        log.info("menuItems:", menuItems);

        var xul = new XUL("排兵布阵_字符画")
            .addMenuList("bug", "bug", [
                {
                    label: "只能tab选中,第一个无法被鼠标选中,",
                    value: "bug"
                }
            ])
            .addMenuList("选择字符画", "ascii-art-menu", menuItems);

        xul.show();
        var dialog = xul.settings;

        // 如果点击的是“取消”按钮，直接返回，不执行后续代码，确保功能符合需求
        if (dialog.dismiss === "cancel") {
            alert("取消修改");
            return;
        }

        log.info("dialog:", dialog);

        var asciiFilePath = dialog["ascii-art-menu"];
        log.info("asciiFilePath:", asciiFilePath);

        var content_2d = [];
        // eslint-disable-next-line no-with
        with (open(asciiFilePath, "r")) {
            log.info("文件内容：", f.read());
            var lines = f.readLines();
            log.info("文件内容：", lines);
            log.info("文件行数：", lines.length);
            // content_2d.push(Array.from(lines[0]));
            lines.forEach(function (line) {
                content_2d.push(Array.from(line));
            });
        }

        log.info("content_2d:", content_2d);

        var firstElement = selection[0],
            horizontalSpacing = 0.5,
            verticalSpacing = 0.5,
            horizontalCount = content_2d[0].length,
            verticalCount = content_2d.length;

        var me = new MoreElement(firstElement, horizontalSpacing, verticalSpacing);
        doc.clipCopy();

        for (var i = 0; i < horizontalCount; i++) {
            for (var j = 0; j < verticalCount; j++) {
                if (i === 0 && j === 0) {
                    doc.deleteSelection();
                    continue;
                }

                var character = content_2d[j][i];
                if (character === "#") {
                    var nextPoint = me.NeatOffset(i, j);

                    // 复制粘贴
                    doc.clipPaste();

                    // 移动元件
                    var newElement = doc.selection[0];
                    newElement.x = nextPoint.x;
                    newElement.y = nextPoint.y;
                }
            }
        }

        SelectSameName(firstElement);
    }

    Main();
});
