/**
 * @file: Check.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 14:24
 * @project: AnJsflScript
 * @description:
 */

define(['frameRangeUtil', 'frameRange'], function (frUtil, FrameRange) {
    /**
     * 检查选择的元件或帧是否符合指定的模式和条件。
     *
     * @param {Array} selection - 选择的元件或帧数组。
     * @param {'selectElement'|'selectFrame'|'elementOnFrame'|'selectLibItem'} [mode="selectElement"] - 检查模式，默认值为 "selectElement"。
     * @param {'No limit'|'Not Zero'|'Zero'|'Only one'|'Only two'|'More'|'=0'|'=1'|'=2'|'>=2'} [condition="No limit"] - 检查条件，默认值为 "No limit"。
     * @param {string} [exTips] - 额外提示信息。
     * @returns {boolean} - 如果选择符合指定条件，则返回 true，否则返回 false。
     *
     * @throws {Error} 如果 mode 或 condition 为 null，将抛出错误并提示用户。
     * @note
     * - 参数 `mode` 和 `condition` 不允许传入 `null`。如果需要使用默认值，请确保传入 `undefined` 或直接省略参数。
     * - 如果传入 `null`，函数将终止执行并提示用户。
     */
    function CheckSelection(selection, mode, condition, exTips) {
        // 检查 mode 是否为 null
        if (mode === null) {
            // console.error("CheckSelection: 模式不能为 null，请指定一个有效的模式！");
            alert('模式不能为 null，请指定一个有效的模式！');
            return false;
        }

        // 设置 mode 的默认值（仅当 mode 是 undefined 时）
        mode = mode || 'selectElement';

        // 检查 condition 是否为 null
        if (condition === null) {
            // console.error("CheckSelection: 条件不能为 null，请指定一个有效的条件！");
            alert('条件不能为 null，请指定一个有效的条件！');
            return false;
        }

        // 设置 condition 的默认值（仅当 condition 是 undefined 时）
        condition = condition || 'No limit';

        // 定义模式
        var modes = [
            'selectElement',
            'selectFrame',
            'elementOnFrame',
            'selectLibItem'
        ];

        // 定义条件列表（主条件列表和其他别名列表）
        var conditions = [
            ['No limit', 'Zero', 'Not Zero', 'Only one', 'Only two', 'More'], // 主条件列表
            [null, '=0', '>0', '=1', '=2', '>=2'] // 别名列表
        ];

        // 定义提示信息
        var messages = [
            [
                null,
                '请选择一个元件。',
                '请至少选择一个元件。',
                '请只选择一个元件。',
                '请同时选择两个元件。',
                '请选择多个元件。'
            ],
            [
                null,
                '请选择一个帧。',
                '请至少选择一个帧。',
                '请只选择一个帧。',
                '请只选择两个帧。',
                '请选择多个帧。'
            ],
            [
                null,
                '当前帧上需要有元件。',
                '当前帧上至少需要一个元件。',
                '当前帧上只能有一个元件。',
                '当前帧上只能有两个元件。',
                '当前帧上需要多个元件。'
            ],
            [
                null,
                '请选择库中的一个项目。',
                '请至少选择一个库项目。',
                '请只选择一个库项目。',
                '请只选择两个库项目。',
                '请选择多个库项目。'
            ]
        ];

        // 获取模式索引
        var modeIndex = modes.indexOf(mode);
        if (modeIndex === -1) {
            alert('无效的模式：' + mode);
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
            alert('无效的条件：' + condition);
            return false;
        }

        // 内部函数：检查条件并返回结果
        function checkCondition(conditionIndex, length) {
            switch (conditionIndex) {
                case 0: // No limit
                    return true;
                case 1: // Zero 或 =0
                    return length === 0;
                case 2: // Not Zero 或 >0
                    return length > 0;
                case 3: // Only one 或 =1
                    return length === 1;
                case 4: // Only two 或 =2
                    return length === 2;
                case 5: // More 或 >=2
                    return length >= 2;
                default:
                    throw new Error('未知条件：' + condition);
            }
        }

        // 检查条件并返回结果
        if (!checkCondition(conditionIndex, selection.length)) {
            var defaultMessage = messages[modeIndex][conditionIndex];
            var message = exTips
                ? defaultMessage + '(' + exTips + ')'
                : defaultMessage;
            alert(message);
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
            alert('请打开 [.fla] 文件');
            return false;
        }
        return true;
    }

    /**
     * 检查选中的帧是否符合指定的条件
     * @param {Timeline} timeline - 时间轴对象。
     * @param {'No limit'|'Not Zero'|'Zero'|'Only one'|'Only two'|'More'|
     * '>0'|'=0'|'=1'|'=2'|'>1'} [condition="Not Zero"] - 检查条件
     * @returns {FrameRange[]}
     */
    function CheckSelectedFrames(timeline, condition) {
        if (condition === undefined) condition = 'Not Zero';

        var frs = frUtil.getSelectedFrs(timeline);
        if (!CheckSelection(frs, 'selectFrame', condition)) return null;
        return frs;
    }

    return {
        CheckSelection: CheckSelection,
        CheckDom: CheckDom,
        CheckSelectedFrames: CheckSelectedFrames
    };
});
