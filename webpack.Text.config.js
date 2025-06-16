const path = require("path");
const fs = require("fs");

const { merge } = require("webpack-merge");
const common = require("./webpack.config");

const { getEntries }=require("./config/build/utils");

const libDir = path.resolve(__dirname, "lib");
const entries = getEntries(libDir);


const newEntries = {};
for (const [key, value] of Object.entries(entries)) {
    // entries[key] = `${value}.webpack`;
    if (value.endsWith(".Text")){
        console.log("value", value);
        newEntries[key] = `${value}.webpack`;
    }
}

console.log("newEntries", newEntries);

module.exports = merge(common, {
    name: "Text",// requirejs text 插件
    entry: newEntries,
});
