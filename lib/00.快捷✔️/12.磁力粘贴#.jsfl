/**
 * @file: 12.磁力粘贴#.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/7 0:36
 * @project: AnJsflScript
 * @description:此功能需要相应的网站支持，暂时只有函数的实现,请查看代码
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes('AppData/Local/Temp')) {
    var msg = '【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require(['checkUtil', 'loglevel', 'libUtil', 'os', 'sprintf', 'selectionUtil'], function (
    checkUtil,
    log,
    libUtil,
    os,
    { sprintf },
    selectionUtil
) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;
    const { SelectAll } = selectionUtil;

    const doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    const selection = doc.selection; //选择
    const library = doc.library; //库文件
    const timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    //本地缓存路径
    const LOCAL_CACHE_PATH = $ProjectFileDir$ + '/cache/';
    if (!os.path.exists(LOCAL_CACHE_PATH)) {
        os.mkdir(LOCAL_CACHE_PATH);
    }

    /**
     * 获取剪切板文本
     * @returns {string} 剪切板文本
     * @see https://gitee.com/ninge/WindowSWF/tree/master/
     */
    function getStringFromClipboard() {
        const doc = fl.getDocumentDOM(); //文档

        doc.selectNone();

        doc.addNewText({ left: 36, top: 491.3, right: 46.2, bottom: 508.7 });
        doc.setElementProperty('autoExpand', true);
        fl.getDocumentDOM().selection[0].setTextAttr('face', 'Times New Roman');
        doc.clipPaste();

        fl.selectTool('arrow');
        var element = doc.selection[0];
        if (element === undefined) {
            alert('请先复制磁力链接');
            return null;
        }
        var textString = element.getTextString(0);
        doc.deleteSelection();

        return textString;
    }

    /**
     * 下载文件,到本地缓存目录
     * @param {string} fileUrl 文件url
     * @param {string} localPath 本地缓存路径
     */
    function downloadFileFromWeb(fileUrl, localPath) {
        // 根据操作系统构建不同的命令，这里针对Windows下的PowerShell
        // var powershellCommand = 'powershell -Command "Invoke-WebRequest -Uri \'' + fileUrl + '\' -OutFile \'' + localPath + '\'"';
        var powershellCommand = sprintf(
            "powershell -Command \"Invoke-WebRequest -Uri '%s' -OutFile '%s'\"",
            fileUrl,
            localPath
        );

        try {
            // 执行命令行操作
            FLfile.runCommandLine(powershellCommand);
            alert('图片下载成功！');
        } catch (error) {
            alert('图片下载失败，错误信息：' + error);
        }
    }

    /**
     * 复制新的文档的资源到   当前文档的当前帧
     * @param {string} flaUri  .fla文件路径
     */
    function openFlaAndPaste(flaUri) {
        const doc = fl.getDocumentDOM(); //文档

        // 当前位置：在打开的文档
        fl.openDocument(flaUri);
        var doc2 = fl.getDocumentDOM(); //文档
        SelectAll();
        doc2.clipCopy();
        fl.closeDocument(doc2, false);

        doc.clipPaste();

        // // 删除下载的.fla文件
        // os.rmdir(flaUri);
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'No limit')) return;

        alert('此功能需要相应的网站支持，暂时只有函数的实现,请查看代码');

        // 1，从剪切板获取 加密的磁力链接
        // var magnetLink = getStringFromClipboard();
        // if (magnetLink === null) return;
        // log.info('magnetLink = ' + magnetLink);
        // 2,解密链接，获取资源url
        // 3,调用命令行工具下载.fla文件资源，到本地缓存目录
        // var imageUrl = 'https://img.soogif.com/RTKInXlfxFwm13iuWK5CgekAUfNQMH75.gif';
        // var imageName = libUtil.generateNameUntilUnique('image_') + '.png';
        // var localPath = FLfile.uriToPlatformPath(os.path.join(LOCAL_CACHE_PATH, imageName));
        //
        // log.info('imageUrl = ' + imageUrl);
        // log.info('localPath = ' + localPath);
        // downloadFileFromWeb(imageUrl, localPath);

        // 4,打开.fla文件，复制资源，粘贴到当前文档当前帧,关闭.fla文件
        // var flaUri = os.path.join(LOCAL_CACHE_PATH, '万能头.fla');
        // openFlaAndPaste(flaUri);
    }

    Main();
});
