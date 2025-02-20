/**
 * 运行此脚本可打开AN脚本安装位置
 *
 * 
 * 更多脚本和教程可关注b站up主@胖果果K
 *
 **/

function isMac() {
    return (fl.version.search(/mac/i) > -1);
}

function openDirectory(path) {
    var uri = FLfile.uriToPlatformPath(path);
    if (isMac()) {
        FLfile.runCommandLine("open " + "\"" + uri + "\"");
    } else {
        FLfile.runCommandLine("explorer " + "\"" + uri + "\"");
    }
}

openDirectory(fl.configURI + "Commands");