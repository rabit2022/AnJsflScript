var path = require("path");

var dirname = path.resolve(__dirname, "../");
var alias = {
    "Utils": path.resolve(dirname, "src/Utils"),
    "xjsfl": path.resolve(dirname, "src/xjsfl"),
    "XML": path.resolve(dirname, "src/XML"),
    "XUL": path.resolve(dirname, "src/XUL.webpack"),
    "XULControl": path.resolve(dirname, "src/XULControl"),
    "XULEvent": path.resolve(dirname, "src/XULEvent"),
};
// console.log(alias);

module.exports = alias;
