/**
 * @file: 常用.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/4 21:26
 * @project: WindowSWF-master
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

// /**
//  * 动画播放速度
//  * @type {Item|SymbolItem} 
//  */
// Element.prototype.libraryItem=undefined;

// /**
//  * @typedef {Item} Item - 所有可视化对象
//  */
// Instance.prototype.libraryItem = undefined;

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
