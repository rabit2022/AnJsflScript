// js/config.js
// log("Loading config.js");
// var a=80;

require.config({
    baseUrl: 'js', // 设置基础路径为 js 文件夹
    paths: {
        module1: 'app/module1',
        module2: 'app/module2' // 指定 module2 的路径
    }
});

log('Config loaded');
