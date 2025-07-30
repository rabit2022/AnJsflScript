// 这个文件由脚本 04.!!!安全保存.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "luxon-config", "os", "loglevel"], function (require, exports, checkUtil_1, luxon_config_1, os, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getBaseName = os.path.$basenameWithoutExt;
    var doc = fl.getDocumentDOM();
    if (!(0, checkUtil_1.CheckDom)(doc)) {
        return;
    }
    var selection = doc.selection;
    var library = doc.library;
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var curLayerIndex = timeline.currentLayer;
    var curLayer = layers[curLayerIndex];
    var _frames = curLayer.frames;
    var curFrameIndex = timeline.currentFrame;
    var curFrame = _frames[curFrameIndex];
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    var MAX_SAVE_COUNT = 10;
    var SAVE_FOLDER = window.AnJsflScript.FOLDERS.Save;
    if (!os.path.exists(SAVE_FOLDER)) {
        os.mkdir(SAVE_FOLDER);
    }
    var ORIGINAL_DOC_PATH = doc.pathURI;
    var getSavepath = function () {
        var docBaseName = getBaseName(ORIGINAL_DOC_PATH);
        var now = luxon_config_1.DateTime.now();
        var format = now.toFormat("yyyy年MM月dd日HH时mm分ss秒");
        var saveName = "".concat(format, "_").concat(docBaseName, ".fla");
        return os.path.join(SAVE_FOLDER, saveName);
    };
    var TimeData = (function () {
        function TimeData(flaFile) {
            var flaBaseName = getBaseName(flaFile);
            var _a = flaBaseName.split("_"), timestamp = _a[0], fileName = _a[1];
            var dateTime = luxon_config_1.DateTime.fromFormat(timestamp, "yyyy年MM月dd日HH时mm分ss秒");
            this.fileName = fileName;
            this.timeStamp = dateTime.toISO();
            this.flaFile = flaFile;
        }
        TimeData.prototype.toString = function () {
            return "".concat(this.flaFile);
        };
        return TimeData;
    }());
    function deleteNoneFlaFile(timeDataList) {
        var notMyFlaList = timeDataList
            .filter(function (timeData) {
            return !timeData.flaFile.startsWith("20") || !timeData.flaFile.endsWith(".fla");
        })
            .map(function (timeData) { return os.path.join(SAVE_FOLDER, timeData.flaFile); });
        for (var _i = 0, notMyFlaList_1 = notMyFlaList; _i < notMyFlaList_1.length; _i++) {
            var flaFile = notMyFlaList_1[_i];
            os.remove(flaFile);
        }
    }
    function deleteMoreThanMAX(timeDataList) {
        if (timeDataList.length > MAX_SAVE_COUNT) {
            var deleteFlaList = timeDataList
                .slice(0, timeDataList.length - MAX_SAVE_COUNT)
                .map(function (timeData) { return os.path.join(SAVE_FOLDER, timeData.flaFile); });
            for (var _i = 0, deleteFlaList_1 = deleteFlaList; _i < deleteFlaList_1.length; _i++) {
                var flaFile = deleteFlaList_1[_i];
                os.remove(flaFile);
            }
        }
    }
    function Main() {
        var allowToContinue = confirm("暂时可能闪退，或者导入很慢，请存档后在确认，是否继续？");
        if (!allowToContinue)
            return;
        var savepath = getSavepath();
        log.info("savename: " + savepath);
        fl.saveDocument(doc, savepath);
        fl.saveDocument(doc, ORIGINAL_DOC_PATH);
        var flaList = os.listdir(SAVE_FOLDER);
        var timeDataList = [];
        for (var _i = 0, flaList_1 = flaList; _i < flaList_1.length; _i++) {
            var flaFile = flaList_1[_i];
            timeDataList.push(new TimeData(flaFile));
        }
        timeDataList.sort(function (a, b) { return a.timeStamp.localeCompare(b.timeStamp); });
        deleteNoneFlaFile(timeDataList);
        deleteMoreThanMAX(timeDataList);
    }
    Main();
});
