XUL:"Utils","XULControl","XULEvent","XML","xjsfl"
XULControl:"Utils"
XML:"Utils","xjsfl"

"Utils","xjsfl","XULControl","XULEvent","XML",XUL


* r.js仅把不同文件的代码合并到一个文件中，并没有去除require语句
* webpack 好用,但是不支持 XML 语句,babel转译require时会报错,@content 这样的语句也不支持
* 暂时没有找到合适的解决方案,只能自己 手动合并代码

(function(){

})();


