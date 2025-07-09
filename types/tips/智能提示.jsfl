/**
 * @file: 智能提示.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/4 21:26
 * @project: AnJsflScript
 * @description:
 */

// Getting started
// 1. Install "JSFL Support" plugin: File > Settings > Plugins > Marketplace > JSFL Support
// 2. Enable global JSFL library: File > Settings > Libraries & Frameworks > JavaScript > Libraries > JSFL

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
SymbolInstance.prototype.lastFrame = -1;

/**
 * @typedef {Element|
 * Instance|BitmapInstance|CompiledClipInstance|SymbolInstance|ComponentInstance|
 * Shape|OvalObject|RectangleObject|
 * Text
 * } Element - 所有可视化对象
 */
// * Parameter|Filter|TextAttrs|TextRun
Element = function() {
};

/**
 * @typedef {Item|
 * BitmapItem|FolderItem|FontItem|SoundItem|SymbolItem|
 * VideoItem|SpriteSheetExporter|TextureAtlasExporter
 * }  Item - 所有物品
 */
Item = function() {
};

/**
 * 运行命令行
 * 重要：可以调用 powershell,cmd,bash等命令行工具,python,java等脚本语言,以及执行其他可执行文件
 * @param {string} commandLine - 命令行参数
 */
FlashFile.prototype.runCommandLine = function(commandLine) {
};

/**
 * 必须为非0的整数
 * 请使用 newCameraPos.toIntPonit().noZero()
 *
 * @since Animate 2019
 * @param {number} frameIndex
 * @param {number} tx  必须为非0的整数
 * @param {number} ty  必须为非0的整数
 */
Camera.prototype.setPosition = function(frameIndex, tx, ty) {
};

/**
 *  Flash 应用程序
 * @note 6个变量，意义相同
 * @since Flash MX 2004
 * @type {Flash}
 */
flash = fl = App = app = animate = an = new Flash();

/**
 * 文档对象。但是没有打开时，不会返回null，无法提前退出，不建议使用。
 * @type {Document}
 * @deprecated 使用fl.getDocumentDOM()代替
 * @bug 如果第三方库，使用了html5的document，会出现跳进不正常的分支的情况,容易出现bug。
 */
document = fl.getDocumentDOM(); //文档


/**
 * @since Animate 2020
 * @param {number} frameIndex
 * @param {Layer|number} layer
 * @note 该方法设置指定帧的指定层的父级为指定层。
 * @bug 参数顺序错误，导致无法设置父级。
 * @bug 当 layer 是Layer无法工作时，可以传入数字，具体原因未知。
 */
Layer.prototype.setRigParentAtFrame = function(layer, frameIndex) {
};

// 以下不只是 Timeline 的方法
Shape.prototype.getCustomStroke = function() {
};

Shape.prototype.setCustomStroke = function(customStroke) {
};

Shape.prototype.getCustomFill = function() {
};

Shape.prototype.setCustomFill = function(customFill) {
};

/**
 * @since Animate 2020
 * @param {number} frameIndex
 * @param {"normal"|"layer"|"multiply"|"screen"|"overlay"|"hardlight"|"lighten"|"darken"|"difference"|"add"|"subtract"|"invert"|"alpha"|"erase"} blendModeString
 */
Layer.prototype.setBlendModeAtFrame = function(frameIndex, blendModeString) {
};


/**
 * @since Flash 8
 * @param {string} fileURI
 * @param {boolean} [bCurrentPNGSettings]
 * @param {boolean} [bCurrentFrame]
 * @return {boolean}
 * @note 通过doc.exportPNG，猜测的可能api,事实证明是对的·
 */
Document.prototype.exportGIF = function(fileURI, bCurrentPNGSettings, bCurrentFrame) {
};
