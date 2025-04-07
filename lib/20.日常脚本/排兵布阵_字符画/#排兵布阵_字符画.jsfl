/**
 * @file: 排兵布阵_字符画.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/27 21:27
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'loglevel', 'os', 'open', 'XUL'], function (
    checkUtil,
    log,
    os,
    open,
    XUL
) {
    const { CheckDom, CheckSelection } = checkUtil;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    // 资源文件夹路径ascii_art_library
    const ASCII_ART_LIBRARY_PATH = os.path.join(os.getcwd(), './ascii_art_library/');
    log.info('ASCII_ART_LIBRARY_PATH:', ASCII_ART_LIBRARY_PATH);

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        // var ascii = prompt(
        //     '请输入排列的文字：(必须资源文件夹下存在同名的字符画文件)',
        //     '一万人'
        // );
        //
        // var asciiFilePath = os.path.join(ASCII_ART_LIBRARY_PATH, ascii + '.txt');
        // log.info('asciiFilePath:', asciiFilePath);
        //
        // with (open(asciiFilePath, 'r')) {
        //     log.info('文件内容：', f.read());
        //     var lines = f.readLines();
        //     log.info('文件内容：', lines);
        //     log.info('文件行数：', lines.length);
        // }

        var listdir = os.listdir(ASCII_ART_LIBRARY_PATH);
        log.info('listdir:', listdir);

        // 获取.txt文件列表
        var txtFileList = listdir.filter(function (file) {
            return file.endsWith('.txt');
        });
        log.info('txtFileList:', txtFileList);

        var menuItems = txtFileList.map(function (file) {
            return {
                label: file.replace('.txt', ''),
                value: os.path.join(ASCII_ART_LIBRARY_PATH, file)
            };
        });
        log.info('menuItems:', menuItems);

        var xul = new XUL('排兵布阵_字符画').addMenuList(
            '选择字符画',
            'ascii-art-menu',
            {},
            menuItems
        );
        log.info('xmlFileList:', xul.xml);

        var dialog = fl.xmlPanelFromString(xul.xml);

        // 如果点击的是“取消”按钮，直接返回，不执行后续代码，确保功能符合需求
        if (dialog.dismiss === 'cancel') {
            alert('取消修改');
            return;
        }

        log.info('dialog:', dialog);
    }

    Main();
});
