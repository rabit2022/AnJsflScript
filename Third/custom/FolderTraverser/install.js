/**
 * @file: install.js
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 21:46
 * @project: AnJsflScript
 * @description:
 */
// FolderTraverser.js
const { FolderTraverser } = require('./FolderTraverser');

const isNode =
    typeof process === 'object' &&
    typeof require === 'function' &&
    typeof module === 'object';
const isFlash = !isNode && typeof flash === 'object';


var os, shutil;
var ProjectFileDir;

if (isNode) {
    // 处理 Node.js 环境

    const fs = require('fs');
    const path = require('path');

    // 获取当前用户的个人文件夹路径
    const userProfile = process.env.USERPROFILE;
    const appDataPath = path.join(userProfile, 'AppData');
    // C:/Users/admin/AppData/Local
    const localAppDataPath = path.join(appDataPath, 'Local');
    const configURI = path.join(localAppDataPath, '/Adobe/Animate 2024/zh_CN/Configuration/');

    /**
     * 递归创建多级目录
     * @param {string} dirPath 目标目录路径
     * @param {number} [mode=0o777] 目录权限模式
     * @param {boolean} [existOk=false] 如果目录已存在，是否抛出错误
     */
    function mkdirs(dirPath, mode = 0o777, existOk = false) {
        try {
            // 检查路径是否存在
            if (fs.existsSync(dirPath)) {
                if (!existOk) {
                    throw new Error(`目录已存在: ${dirPath}`);
                }
                return;
            }

            // 递归创建父目录
            const parentDir = path.dirname(dirPath);
            if (parentDir !== dirPath) {
                mkdirs(parentDir, mode, existOk);
            }

            // 创建当前目录
            fs.mkdirSync(dirPath, { mode });
            console.log(`目录已创建: ${dirPath}`);
        } catch (err) {
            console.error(err.message);
        }
    }

    // 创建一个类似 Python os 模块的接口
    os = {
        makedirs: mkdirs,
        listdir: fs.readdirSync,
        path: {
            join: (...args) => path.join(...args), // 拼接路径
            exists: (filePath) => fs.existsSync(filePath), // 检查路径是否存在
            isdir: (filePath) => fs.lstatSync(filePath).isDirectory(), // 检查是否为目录
            isfile: (filePath) => fs.lstatSync(filePath).isFile(), // 检查是否为文件
            // basename: (filePath) => path.basename(filePath), // 获取路径的文件名部分
            dirname: (filePath) => path.dirname(filePath), // 获取路径的目录部分
            $PLUGIN_PATH: path.join(configURI, 'WindowSWF'),// 插件目录
            $COMMAND_PATH: path.join(configURI, 'Commands') // 命令目录
        }
    };

    shutil = {
        copyfile: fs.copyFileSync
    };

    function extractPath(fullPath, targetSegment) {
        // 找到目标段的位置
        const index = fullPath.indexOf(targetSegment);
        if (index === -1) {
            throw new Error(`目标段 "${targetSegment}" 未在路径中找到`);
        }
        // 提取从路径开始到目标段结束的部分
        return fullPath.substring(0, index + targetSegment.length);
    }

    const targetSegment = '\\AnJsflScript';
    ProjectFileDir = extractPath(process.cwd(), targetSegment);
} else if (isFlash) {
    // 处理 Adobe Flash 环境

    os = require('os');
    shutil = require('shutil');
    ProjectFileDir = $ProjectFileDir$;
} else {
    throw new Error('Unsupported environment');
}


const COMMAND_PROJECT = os.path.join(os.path.$COMMAND_PATH, 'AnJsflScript');

/**
 * 复制整个文件夹
 * @param {string} src_folder 源文件夹路径
 * @param {string} dst_folder 目标文件夹路径
 */
function copytree(src_folder, dst_folder) {
    // 确保源文件夹存在
    if (!os.path.exists(src_folder)) {
        throw new Error(`源文件夹 ${src_folder} 不存在`);
    }

    // 如果目标文件夹不存在，创建它
    if (!os.path.exists(dst_folder)) {
        os.makedirs(dst_folder);
    }

    // 遍历源文件夹中的所有文件和子文件夹
    for (let item of os.listdir(src_folder)) {
        let src_item = os.path.join(src_folder, item);
        let dst_item = os.path.join(dst_folder, item);

        // 如果是文件，使用 shutil.copyfile 复制文件
        if (os.path.isfile(src_item)) {
            shutil.copyfile(src_item, dst_item);
            console.log(`文件 ${src_item} 已复制到 ${dst_item}`);
        }
        // 如果是文件夹，递归复制
        else if (os.path.isdir(src_item)) {
            copytree(src_item, dst_item);
        }
    }
}

// copytree(ProjectFileDir, COMMAND_PROJECT);


// js代码
/**
 * 创建文件夹和文件
 * @param {string[]} src_files 源文件列表
 * @param {string[]} target_files 目标文件列表
 */
function copy_files(src_files, target_files) {
    if (src_files.length !== target_files.length) {
        throw new Error('源文件列表和目标文件列表的长度必须相同');
    }

    for (let i = 0; i < src_files.length; i++) {
        let src_file = src_files[i];
        let target_file = target_files[i];

        // 获取目标文件的目录路径
        let target_dir = os.path.dirname(target_file);

        // 递归创建目录
        os.makedirs(target_dir);
        // console.log(`目录已创建: ${target_dir}`);

        // 检查源文件是否存在
        if (os.path.exists(src_file)) {
            // 复制文件
            shutil.copyfile(src_file, target_file);
            console.log(`文件已从 ${src_file} 复制到 ${target_file}`);
        }else {
            console.log(`源文件 ${src_file} 不存在`);
        }
    }
}

// // 示例源文件列表和目标文件列表
// let src_files = [
//     'F:/04_ps/沙雕动画/_素材库/template1.txt',
//     'F:/04_ps/沙雕动画/_素材库/template2.txt',
//     'F:/04_ps/沙雕动画/_素材库/template3.txt'
// ];
//
// let target_files = [
//     'F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/AnJsflScript/file1.txt',
//     'F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/AnJsflScript/subfolder/file2.txt',
//     'F:/04_ps/沙雕动画/_素材库/WindowSWF-master/WindowSWF-master/AnJsflScript/another_subfolder/file3.txt'
// ];
//
// // 调用函数
// create_folders_and_files(src_files, target_files);


