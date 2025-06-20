const path = require("path");
const webpack = require("webpack");
const { readFileSync } = require("node:fs");

// const CheckHeadPath=path.resolve(__dirname,'./output/CheckHead.zip.jsfl');
// const CheckHeadText=readFileSync(CheckHeadPath, 'utf8');
// console.log(CheckHeadText);

const head = `"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");`;


module.exports = {
    entry: "../require/CheckHead.jsfl",
    output: {
        path: path.resolve(__dirname, "output"),
        filename: "./[name].zip.jsfl",
        library: "__AnJsflScript", // 定义一个全局变量
        libraryTarget: "var",
        globalObject: "this"
    },
    custom: {
        Head: head
    }
};
