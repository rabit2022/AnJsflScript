const fs = require("fs");
const path = require("path");
const CommonConfig = require("./webpack.CheckHead");
const {
  runCommand, deleteDirectory, copyFile, deleteFile, compressFile, addClosure
} = require("../build/utils");

// const config={
//     entry: path.resolve(__dirname, "./CheckHead.jsfl"),
//     output: {
//         path: __dirname,
//         filename: "./CheckHead.zip.jsfl",
//     }
// }
//
// console.log(config);
// const config=
const entryPath = path.resolve(__dirname, CommonConfig.entry);

const filename = CommonConfig.output.filename.replace("[name]", "CheckHead");
const outputPath = path.resolve(CommonConfig.output.path, filename);
console.log(outputPath);

// 构建项目
async function buildProject() {
  try {
    await compressFile(entryPath, outputPath);

    console.log("Build process completed successfully.");
  } catch (error) {
    console.error("Build process failed:", error);
  }
}

// 带性能监控的执行
(async () => {
  const start = Date.now();
  try {
    const report = await buildProject();
    console.log(`构建成功，耗时 ${(Date.now() - start) / 1000}秒`);
    // console.log(report);
  } catch (error) {
    console.error(`构建失败，已运行 ${(Date.now() - start) / 1000}秒`);
    throw error;
  }
})();
