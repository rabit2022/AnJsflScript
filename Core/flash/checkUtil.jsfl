22; /**
 * @file: checkUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 14:24
 * @project: AnJsflScript
 * @description:
 */

define(["Tips", "SAT"], function (Tips, SAT) {
    const { checkVariableRedeclaration } = Tips;
    const { FrameRange, FrameRangeList } = SAT;

    /**
     * 检查选择的元件或帧是否符合指定的模式和条件。
     *
     * @param {Array} selection - 选择的元件或帧数组。
     * @param {"selectElement"|"selectFrame"|"elementOnFrame"|"selectLibItem"|"selectLayer"|"selectedFrameDuration"|"selectedFrameFirstDuration"} [mode="selectElement"] - 检查模式，默认值为 "selectElement"。
     * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|"=0"|"=1"|"=2"|">=2"} [condition="No limit"] - 检查条件，默认值为 "No limit"。
     * @param {string} [exTips] - 额外提示信息。
     * @returns {boolean} - 如果选择符合指定条件，则返回 true，否则返回 false。
     *
     * @throws {Error} 如果 mode 或 condition 为 null，将抛出错误并提示用户。
     * @note
     * - 参数 `mode` 和 `condition` 不允许传入 `null`。如果需要使用默认值，请确保传入 `undefined` 或直接省略参数。
     * - 如果传入 `null`，函数将终止执行并提示用户。
     */
    function CheckSelection(selection, mode, condition, exTips) {
        checkVariableRedeclaration(selection, "selection");

        // 检查 mode 是否为 null
        if (mode === null) {
            // console.error("CheckSelection: 模式不能为 null，请指定一个有效的模式！");
            alert("模式不能为 null，请指定一个有效的模式！");
            return false;
        }

        // 设置 mode 的默认值（仅当 mode 是 undefined 时）
        mode = mode || "selectElement";

        // 检查 condition 是否为 null
        if (condition === null) {
            // console.error("CheckSelection: 条件不能为 null，请指定一个有效的条件！");
            alert("条件不能为 null，请指定一个有效的条件！");
            return false;
        }

        // 设置 condition 的默认值（仅当 condition 是 undefined 时）
        condition = condition || "No limit";

        // 定义模式
        // 定义模式
        const modes = [
            "selectElement",
            "selectFrame",
            "elementOnFrame",
            "selectLibItem",
            "selectLayer",
            "selectedFrameDuration",
            "selectedFrameFirstDuration"
        ];

        // 定义条件列表（主条件列表和其他别名列表）
        var conditions = [
            ["No limit", "Not Zero", "Zero", "Only one", "Only two", "More"], // 主条件列表
            [null, "=0", ">0", "=1", "=2", ">=2"] // 别名列表
        ];

        // 定义提示信息
        var messages = [
            [
                null,
                "请选择一个元件。",
                "请至少选择一个元件。",
                "请只选择一个元件。",
                "请同时选择两个元件。",
                "请选择多个元件。"
            ],
            [
                null,
                "请选择一个帧。",
                "请至少选择一个帧。",
                "请只选择一个帧。",
                "请同时选择两个帧。",
                "请选择多个帧。"
            ],
            [
                null,
                "当前帧上需要有元件。",
                "当前帧上至少需要一个元件。",
                "当前帧上只能有一个元件。",
                "当前帧上只能有两个元件。",
                "当前帧上需要多个元件。"
            ],
            [
                null,
                "请选择库中的一个项目。",
                "请至少选择一个库项目。",
                "请只选择一个库项目。",
                "请同时选择两个库项目。",
                "请选择多个库项目。"
            ],
            [
                null,
                "请选择一个图层。",
                "请至少选择一个图层。",
                "请只选择一个图层。",
                "请同时选择两个图层。",
                "请选择多个图层。"
            ],
            [
                null,
                "所选帧总时长 不能为 0 帧。",
                "所选帧总时长 至少为 1 帧。",
                "所选帧总时长 只能为 1 帧。",
                "所选帧总时长 只能为 2 帧。",
                "所选帧总时长 不能小于 2 帧。"
            ],
            [
                null,
                "所选帧的  第一段 时长 不能为 0 帧。",
                "所选帧的  第一段 时长 至少为 1 帧。",
                "所选帧的  第一段 时长 只能为 1 帧。",
                "所选帧的  第一段 时长 只能为 2 帧。",
                "所选帧的  第一段 时长 不能小于 2 帧。"
            ]
        ];

        // 获取模式索引
        var modeIndex = modes.indexOf(mode);
        if (modeIndex === -1) {
            alert("无效的模式：" + mode);
            return false;
        }

        // 内部函数：查找条件索引
        function findConditionIndex(condition) {
            for (var i = 0; i < conditions.length; i++) {
                var index = conditions[i].indexOf(condition);
                if (index !== -1) {
                    return index; // 返回找到的列索引
                }
            }
            return -1; // 未找到条件
        }

        // 查找条件索引
        var conditionIndex = findConditionIndex(condition);
        if (conditionIndex === -1) {
            alert("无效的条件：" + condition);
            return false;
        }

        // 内部函数：检查条件并返回结果
        function checkCondition(conditionIndex, length) {
            switch (conditionIndex) {
                case 0: // No limit
                    return true;
                case 1: // Not Zero
                    return length > 0;
                case 2: // Zero
                    return length === 0;
                case 3: // Only one
                    return length === 1;
                case 4: // Only two
                    return length === 2;
                case 5: // More
                    return length > 2;
                default:
                    throw new Error("未知条件：" + condition);
            }
        }

        // 检查条件并返回结果
        if (!checkCondition(conditionIndex, selection.length)) {
            var defaultMessage = messages[modeIndex][conditionIndex];
            var message = exTips ? defaultMessage + "(" + exTips + ")" : defaultMessage;

            alert(message);
            return false;
        }

        return true;
    }

    /**
     * 检查文档是否存在
     * @param {Document} [doc] - 文档对象。
     * @returns {Document}
     */
    function CheckDom(doc) {
        if (doc === undefined) doc = fl.getDocumentDOM();

        if (!doc) {
            alert("请打开 一个 [.fla] 文件 或者 创建一个新文档");
            return;
        }
        return doc;
    }

    /**
     * 检查选中的帧是否符合指定的条件
     * @param {Timeline} timeline - 时间轴对象。
     * @param {string} [exTips] - 额外提示信息。
     * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|
     * ">0"|"=0"|"=1"|"=2"|">1"} [condition="Not Zero"] - 检查条件
     * @param {{min: number, max: number,onlyFirst: boolean}} [range] - 帧范围
     * @returns {FrameRangeList}
     */
    function CheckSelectedFrames(timeline, exTips, condition, range) {
        if (condition === undefined) condition = "Not Zero";

        // KeyFrameQuery
        var kfq;
        require(["KeyFrameQuery"], function (KeyFrameQuery) {
            kfq = KeyFrameQuery;
        });
        const { getSelectedFrs } = kfq;

        var frs = getSelectedFrs(timeline);
        if (!CheckSelection(frs, "selectFrame", "Not Zero")) return null;

        if (range) {
            const { min, max, onlyFirst } = range;
            var totalDuration = 0;
            if (onlyFirst) {
                totalDuration = frs[0].duration;
            } else {
                totalDuration = frs.reduce(function (acc, fr) {
                    return acc + fr.duration;
                }, 0);
            }

            var mode = onlyFirst ? "selectedFrameFirstDuration" : "selectedFrameDuration";
            var exTips = exTips ? exTips : "";
            exTips += " 所选帧总时长 [" + totalDuration + "] 帧, ";
            if (min !== undefined && totalDuration < min) {
                exTips += " 要求不能小于 [" + min + "] 帧, 请重新选择";
            }
            if (max !== undefined && totalDuration > max) {
                exTips += " 要求不能大于 [" + max + "] 帧, 请重新选择";
            }
            if (!CheckSelection(frs, mode, condition, exTips)) return null;
        } else {
            // console.log(frs, frs.length);
            if (!CheckSelection(frs, "selectFrame", condition, exTips)) return null;
        }

        frs = FrameRangeList.from(frs);

        return frs;
    }

    return {
        CheckSelection: CheckSelection,
        CheckDom: CheckDom,
        CheckSelectedFrames: CheckSelectedFrames
    };
});
