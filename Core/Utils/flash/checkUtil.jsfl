/**
 * @file: Check.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 14:24
 * @project: AnJsflScript
 * @description:
 */


define(function () {
    /**
     * 检查选择的元件或帧是否符合指定的模式和条件。
     *
     * @param {Array} selection - 选择的元件或帧数组。
     * @param {"selectElement"|"selectFrame"|"elementOnFrame"} [mode="selectElement"] - 检查模式，默认值为 "selectElement"。
     * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|
     * ">0"|"=0"|"=1"|"=2"|">1"} [condition="No selection"] - 检查条件，默认值为 "No selection"。
     * @returns {boolean} - 如果选择符合指定条件，则返回 true，否则返回 false。
     */
    function CheckSelection(selection, mode, condition) {
        // 设置默认值
        mode = mode || "selectElement";
        condition = condition || "No selection";
        if (condition === "No limit") return true;

        if (selection.length < 1) {
            if (condition === "Zero" || condition === "=0") return true;

            if (mode === "selectElement") {
                alert("请选择元件？");
            } else if (mode === "selectFrame") {
                alert("请选择至少一个帧");
            } else if (mode === "elementOnFrame") {
                alert("当前帧上至少有一个元件");
            }
            return false;
        }

        if (condition === "Not Zero" || condition === ">0") return true;

        if (selection.length === 1) {
            if (condition === "Only one" || condition === "=1") return true;

            if (mode === "selectElement") {
                alert("请选择至少两个元件");
            } else if (mode === "selectFrame") {
                alert("请选择至少两个帧");
            } else if (mode === "elementOnFrame") {
                alert("当前帧上至少需要两个元件");
            }
            return false;
        }
        if (selection.length === 2) {
            if (condition === "Only two" || condition === "=2") return true;

        }
        if (selection.length > 1) {
            if (condition === "More" || condition === ">1") return true;

            if (mode === "selectElement") {
                alert("请选择单个元件");
            } else if (mode === "selectFrame") {
                alert("请选择单个帧");
            } else if (mode === "elementOnFrame") {
                alert("当前帧上只能有一个元件");
            }
            return false;
        }
        return true;
    }

    /**
     * 检查文档是否存在
     * @param {Document} doc
     * @returns {boolean}
     */
    function CheckDom(doc) {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        return true;
    }

    /**
     * 检查选中的帧是否符合指定的条件
     * @param {Timeline} timeline - 时间轴对象。
     * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|
     * ">0"|"=0"|"=1"|"=2"|">1"} [condition="Not Zero"] - 检查条件
     * @returns {Array}
     */
    function CheckSelectedFrames(timeline, condition) {
        if (condition === undefined) condition = "Not Zero";

        var frs = frUtil.getSelectedFrs(timeline);
        if (!CheckSelection(frs, "selectFrame", condition)) return null;
        return frs;
    }

    return {
        CheckSelection: CheckSelection,
        CheckDom: CheckDom,
        CheckSelectedFrames: CheckSelectedFrames
    };
});