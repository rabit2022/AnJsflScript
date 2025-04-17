
// 示例用法
const FolderTraverser = require("../FolderTraverser");

const folderPath =
    'F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/AnJsflScript';
const extensions = ['.jsfl'];
const excludeFolders = ['subdir2'];
const excludeExtensions = ['.log'];
const maxDepth = 2;
const includeFullPath = true;

const traverser = new FolderTraverser(
    folderPath,
    extensions,
    excludeFolders,
    excludeExtensions,
    maxDepth,
    includeFullPath
);

const filePaths = traverser.start();
console.log(filePaths.length);
for (const filePath of filePaths) {
    console.log(filePath);
}