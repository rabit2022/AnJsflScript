/**
 * @file: FolderQuery.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 18:28
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    //设置根据曾名称要忽略的层
    /**
     * @description: 根据名称忽略的层
     */
    var IGNORE_LAYER_BY_NAME = /^(actionscript|as|label|assist|soundtrack|sound)$/i;
    //扩展 folder 的定义范围
    /**
     * @description: 扩展 folder 的定义范围
     */
    var FOLDER_TYPE = /^(folder|mask|guide)$/; //--;

    return {
        IGNORE_LAYER_BY_NAME: IGNORE_LAYER_BY_NAME,
        FOLDER_TYPE: FOLDER_TYPE
    };
});
