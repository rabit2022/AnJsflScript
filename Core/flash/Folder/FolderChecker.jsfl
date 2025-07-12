/**
 * @file: FolderChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 18:24
 * @project: AnJsflScript
 * @description:
 */

define(["LayerHierarchy", "FolderQuery", "LayerChecker", "Tips"], function (
    lh,
    fq,
    lc,
    Tips
) {
    const { countChild } = lh;
    const { IGNORE_LAYER_BY_NAME, FOLDER_TYPE } = fq;
    const { IsLayerBlank } = lc;
    const { checkVariableRedeclaration } = Tips;

    /**
     * 检查文件夹是否为空
     * @param {Timeline} timeline
     * @param {number} folderID
     * @see https://github.com/hufang360/FlashTool
     */
    function IsEmptyFolder(timeline, folderID) {
        checkVariableRedeclaration(timeline, "timeline");

        const folder = timeline.layers[folderID];
        const endLayer = folderID + countChild(timeline, folderID);

        for (var i = folderID + 1; i <= endLayer; i++) {
            const child = timeline.layers[i];
            if (!child) return true;

            if (child.parentLayer === folder) {
                // 忽略特定名称的图层
                if (IGNORE_LAYER_BY_NAME.test(child.name)) {
                    return false;
                }

                if (FOLDER_TYPE.test(child.layerType)) {
                    // 检查子文件夹是否为空
                    if (!IsEmptyFolder(timeline, i)) {
                        return false;
                    }
                } else {
                    // 检查子图层是否为空
                    if (!IsLayerBlank(timeline.layers,child)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    return {
        IsEmptyFolder: IsEmptyFolder
    };
});
