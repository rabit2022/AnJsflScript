/**
 * @file: 智能提示.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/4 21:26
 * @project: AnJsflScript
 * @description:
 */



/**
 * 帧选择器
 * @type {"loop"|"play once"|"single frame"|"loop reverse"|"play once reverse"} 
 * loop播放动画，play once播放一次动画，single frame播放单帧动画
 */
SymbolInstance.prototype.loop = undefined;

/**
 * @typedef {Element|
 * Instance|BitmapInstance|CompiledClipInstance|SymbolInstance|ComponentInstance|
 * Shape|OvalObject|RectangleObject|
 * Text
 * } Element - 所有可视化对象
 */
// * Parameter|Filter|TextAttrs|TextRun
Element = function () {
};

/**
 * @typedef {Item|
 * BitmapItem|FolderItem|FontItem|SoundItem|SymbolItem|
 * VideoItem|SpriteSheetExporter|TextureAtlasExporter
 * }  Item - 所有物品
 */
Item = function () {
};





/**
 * 运行命令行
 * 重要：可以调用 powershell,cmd,bash等命令行工具,python,java等脚本语言,以及执行其他可执行文件
 * @param {string} commandLine - 命令行参数
 */
FlashFile.prototype.runCommandLine = function (commandLine) {
};

/**
 * 帧选择器
 * 动画的结束帧,默认为-1,表示播放到最后一帧
 * @type {number}  
*/
SymbolInstance.prototype.lastFrame = 0;
