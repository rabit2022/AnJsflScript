/**
 * @file: First.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:45
 * @project: WindowSWF-master
 * @description:
 */

// 绝对路径导入
var p="F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/mytest/Core/Importer.jsfl";
var uri=FLfile.platformPathToURI(p);
fl.runScript(uri);

// 导入模块,相对路径导入
importMoudle("Core/Object/Curve.jsfl");
importMoudle("Core/Object/Ele.jsfl");
importMoudle("Core/Object/Matrix.jsfl");
importMoudle("Core/Object/Point.jsfl");
importMoudle("Core/Object/Rect.jsfl");
importMoudle("Core/Object/Select.jsfl");

importMoudle("Core/Object/FrameRange.jsfl");
importMoudle("Core/Object/Log.jsfl");
importMoudle("Core/Object/path.jsfl");
importMoudle("Core/Object/random.jsfl");
importMoudle("Core/Object/string.jsfl");

