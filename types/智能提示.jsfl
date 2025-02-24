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
 * 帧选择器
 * 动画的结束帧,默认为-1,表示播放到最后一帧
 * @type {number}
 */
SymbolInstance.prototype.lastFrame = 0;

/**
 * @typedef {Element|
 * Instance|BitmapInstance|CompiledClipInstance|SymbolInstance|ComponentInstance|
 * Shape|OvalObject|RectangleObject|
 * Text
 * } Element - 所有可视化对象
 */
// * Parameter|Filter|TextAttrs|TextRun
Element = function () {};

/**
 * @typedef {Item|
 * BitmapItem|FolderItem|FontItem|SoundItem|SymbolItem|
 * VideoItem|SpriteSheetExporter|TextureAtlasExporter
 * }  Item - 所有物品
 */
Item = function () {};

/**
 * 运行命令行
 * 重要：可以调用 powershell,cmd,bash等命令行工具,python,java等脚本语言,以及执行其他可执行文件
 * @param {string} commandLine - 命令行参数
 */
FlashFile.prototype.runCommandLine = function (commandLine) {};

/**
 * 必须为非0的整数
 * 请使用 newCameraPos.toIntPonit().noZero()
 *
 * @since Animate 2019
 * @param {number} frameIndex
 * @param {number} tx  必须为非0的整数
 * @param {number} ty  必须为非0的整数
 */
Camera.prototype.setPosition = function (frameIndex, tx, ty) {};

/**
 * 6个变量，意义相同
 * @since Flash MX 2004
 * @type {Flash}
 */
flash = fl = App = app = animate = an = new Flash();

/**
 * 文档对象。但是没有打开时，不会返回null，无法提前退出，不建议使用。
 * @type {Document}
 * @deprecated 使用fl.getDocumentDOM()代替
 */
document = fl.getDocumentDOM(); //文档
