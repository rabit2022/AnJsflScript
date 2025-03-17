/**
 * 运行此脚本可安装插件
 *
 *
 * 更多插件、脚本和教程可关注b站up主@胖果果K
 *
 **/

// 当前目录
var curDir = getFolder(fl.scriptURI);
var curDirJSFL = curDir + '缓动面板/';

// 工作目录
var winSWF = fl.configURI + 'WindowSWF/';
var winSWFJSFL = winSWF + '缓动面板/';

// 拷贝到工作目录
var swfName = '缓动面板.swf';
var arr = [
    '加速1.jsfl',
    '加速2.jsfl',
    '加速3.jsfl',
    '减速1.jsfl',
    '减速2.jsfl',
    '减速3.jsfl',
    '先加后减1.jsfl',
    '先加后减2.jsfl',
    '先加后减3.jsfl',
    '先加后减6.jsfl',
    '先加后减7.jsfl',
    '波浪.jsfl',
    '自动添加缓冲补间.jsfl',
    '智能补间.jsfl' //工具类
];

//fl.trace("========== 缓动面板 ==========");
var curURI = curDir + swfName;
var winURI = winSWF + swfName;
var isExists = FLfile.exists(curURI);
var lackSWF = '';
if (isExists) {
    if (FLfile.exists(winURI)) FLfile.remove(winURI);
    FLfile.copy(curURI, winURI);
    //fl.trace("拷贝 ./" + swfName);
} else {
    lackSWF = swfName;
}

//if( FLfile.exists(winSWFJSFL) )	FLfile.remove(winSWFJSFL)
FLfile.createFolder(winSWFJSFL);
var lackJSFL = '';
for (var i = 0; i < arr.length; i++) {
    curURI = curDirJSFL + arr[i];
    winURI = winSWFJSFL + arr[i];
    var isExists = FLfile.exists(curURI);
    if (isExists) {
        if (FLfile.exists(winURI)) FLfile.remove(winURI);
        FLfile.copy(curURI, winURI);
        //fl.trace("拷贝 ./缓动面板/" + arr[i]);
    } else {
        lackJSFL += '缺少 ./缓动面板/' + arr[i] + '\n';
    }
}
//fl.trace("安装完成！安装在：\n" + FLfile.uriToPlatformPath(winSWF));
//if( lackSWF )	fl.trace("缺少 "+lackSWF +",安装失败！！！");
//if( lackJSFL )	fl.trace("缺少下列文件：\n"+lackJSFL);
//fl.trace("=============");

alert('安装完成，请重启 AN\n工具位于AN【窗口】-->【扩展】--[缓动面板]');

function getFolder(str) {
    var index = str.lastIndexOf('/');
    if (index != -1) str = str.substring(0, index + 1);
    return str;
}

// 重启AN
fl.quit();
