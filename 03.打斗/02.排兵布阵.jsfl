/**
 * @file: 02.排兵布阵.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 12:23
 * @project: AnJsflScript
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
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

    var [folder_name,basename] =osPath.split(fl.scriptURI);
    var onlyName= osPath.basenameWithoutExt(fl.scriptURI);
    var XMLFOLDER = "02.排兵布阵";
    
    function Main() {
        if (!checkDom()) {
            return;
        }

        var XMLPANEL = osPath.join([folder_name,XMLFOLDER, onlyName + ".xml"]);
        print(XMLPANEL)
        var panel = xmlPanelUtil.getXMLPanel(XMLPANEL);
        if (panel == null) return;
        
        var radioGroup = panel.layoutRadioGroup;
        switch (radioGroup) {
            case "neat":
                // fl.trace("整齐排布");
                var SCRIPT_PATH= osPath.join([folder_name,XMLFOLDER, onlyName + "_neat.jsfl"]);
                fl.runScript(SCRIPT_PATH);
                break;
            case "staggered":
                // fl.trace("交错排布");
                var SCRIPT_PATH= osPath.join([folder_name,XMLFOLDER, onlyName + "_staggered.jsfl"]);
                fl.runScript(SCRIPT_PATH);
                break;
            case "random":
                // fl.trace("随机排布");
                var SCRIPT_PATH= osPath.join([folder_name,XMLFOLDER, onlyName + "_random.jsfl"]);
                fl.runScript(SCRIPT_PATH);
                break;
            default:
                throw new Error("未知排布方式");
        }
    }

    Main();
})();
