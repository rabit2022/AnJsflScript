/**
 * @file: FrameOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/9 18:35
 * @project: AnJsflScript
 * @description:
 */

define(["KeyFrameOperation", "Tips", "Context"], function (kfo, tips, Context) {
    const { convertToKeyframesSafety } = kfo;
    const { checkVariableRedeclaration } = tips;

    /**
     * 设置帧标签
     * @param {Timeline} timeline 时间线对象
     * @param {Frame|number} frame 帧对象
     * @param {string} [labelText=""] 标签文本
     * @param {"none"|"name"|"comment"|"anchor"} [labelType="name"] 标签类型
     */
    function setLabel(timeline, frame, labelText, labelType) {
        // 重复定义
        checkVariableRedeclaration(timeline, "timeline");
        checkVariableRedeclaration(frame, "frame");

        // 参数默认值
        if (labelText === undefined) labelText = "";
        if (labelType === undefined) labelType = "name";

        // k帧
        convertToKeyframesSafety(timeline, frame);

        // region context
        var context = new Context();
        context.update();
        var curFrame = context.curFrame;
        // endregion context

        curFrame.name = labelText;
        curFrame.labelType = labelType;
    }

    return {
        setLabel: setLabel
    };
});
