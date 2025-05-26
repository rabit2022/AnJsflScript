/**
 * @file: 11.一键描边.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 23:31
 * @project: AnJsflScript
 * @description:
 * @see:https://gitee.com/ninge/WindowSWF/tree/master/
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

require(["checkUtil", "loglevel", "xmlPanelUtil", "os", "chroma-js"], function(
    checkUtil,
    log,
    xmlPanelUtil,
    os,
    chroma
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

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

    // // 获取第一帧
    // var frs = CheckSelectedFrames(timeline);
    // if (frs === null) return;
    // var firstLayer = layers[frs[0].layerIndex];
    // var firstFrame = frs[0].startFrame;

    // endregion doc

    var [folder_name, basename] = os.path.split(fl.scriptURI);
    var XMLPANEL = os.path.join(folder_name, "11.一键描边", "11.一键描边.xml");
    log.info("XMLPANEL: " + XMLPANEL);

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel(XMLPANEL);
        if (panel === null) return null;

        var size = xmlPanelUtil.parseNumber(panel.size, "描边大小 应该使用数字");
        if (size === null) return null;

        var color = xmlPanelUtil.parseColor(
            panel.color,
            "请输入描边颜色，如 #FFFFFF，black等"
        );
        if (color === null) return null;

        // // TODO: 透明度切换 应该使用100或255,增加范围限制
        // var alpha = xmlPanelUtil.parseNumber(panel.alpha, "透明度 应该使用数字");
        // if (alpha === null) return null;

        var alpha = 0;
        var alpha_switch = panel.alpha_switch;
        switch (alpha_switch) {
            case "100":
                alpha = xmlPanelUtil.parseNumber(
                    panel.alpha,
                    "透明度 应该使用数字(0-100)",
                    {
                        start: 0,
                        end: 100
                    });
                // 将获取到的透明度值转换为0-255范围内的整数，做了输入值的合法性判断等处理
                alpha = Math.floor((parseInt(alpha, 10) / 100) * 255);
                break;
            case "255":
                alpha = xmlPanelUtil.parseNumber(
                    panel.alpha,
                    "透明度 应该使用数字(0-255)",
                    {
                        start: 0,
                        end: 255
                    });
                break;
            default:
                throw new Error("透明度切换 应该使用100或255");
        }

        // 使用chroma-js设置透明度
        const colorWithAlpha = chroma(color)
            .alpha(alpha / 255)
            .hex();
        log.info("colorWithAlpha: " + colorWithAlpha);

        return {
            size: size,
            colorWithAlpha: colorWithAlpha,
        };
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 检查XML面板
        var config = checkXMLPanel();
        if (config === null) return;
        const { size, colorWithAlpha } = config;
        log.info("size: ", size, "colorWithAlpha: ", colorWithAlpha);

        }

    Main();
});
