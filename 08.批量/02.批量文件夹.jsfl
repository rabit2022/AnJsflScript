/**
 * @file: 02.批量文件夹.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 0:14
 * @project: AnJsflScript
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

        // if (selection.length < 1) {
        //     alert("请选择元件？");
        //     return false;
        // }
        // if (selection.length > 1) {
        //     alert("请选择单个元件");
        //     return false;
        // }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }


    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkDom()) {
            return;
        }


        var folderNames = ["一 常用",
            "一 常用/1.配音", "一 常用/2.音效", "一 常用/3.角色", "一 常用/4.特效", "一 常用/5.表情", "一 常用/6.道具", "一 常用/7.背景", "一 常用/8.本集专用",
            "一 常用/3.角色/1.人物一", "一 常用/3.角色/2.人物二", "一 常用/3.角色/3.人物三", "一 常用/3.角色/4.人物四", "一 常用/3.角色/5.人物五", "一 常用/3.角色/6.人物六"
        ];

        for (var i = 0; i < folderNames.length; i++) {
            var folderName = folderNames[i];
            if (!libUtil.findDuplicateNameInLib(folderName)) {
                library.newFolder(folderName);
            }
        }
    }

    Main();
})();
