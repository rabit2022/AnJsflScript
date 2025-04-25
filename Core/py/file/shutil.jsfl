/**
 * @file: shutil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 22:15
 * @project: AnJsflScript
 * @description:
 */

define(['os', 'loglevel'], function (os, log) {
    function shutil() {}

    /**
     * 复制文件
     * @param {string} src 源文件路径
     * @param {string} dst 目标文件路径
     */
    shutil.copyfile = FLfile.copy;

    /**
     * 复制整个文件夹
     * @param {string} src_folder 源文件夹路径
     * @param {string} dst_folder 目标文件夹路径
     */
    function copytree(src_folder, dst_folder) {
        // 确保源文件夹存在
        if (!os.path.exists(src_folder)) {
            // throw new Error(`源文件夹 ${src_folder} 不存在`);
            throw new Error('源文件夹不存在:' + src_folder);
        }

        // 如果目标文件夹不存在，创建它
        if (!os.path.exists(dst_folder)) {
            os.makedirs(dst_folder);
        }

        // 遍历源文件夹中的所有文件和子文件夹
        // for (var item of os.listdir(src_folder)) {
        os.listdir(src_folder).forEach(function (item) {
            var src_item = os.path.join(src_folder, item);
            var dst_item = os.path.join(dst_folder, item);

            // 如果是文件，使用 shutil.copyfile 复制文件
            if (os.path.isfile(src_item)) {
                shutil.copyfile(src_item, dst_item);
                // console.log(`文件 ${src_item} 已复制到 ${dst_item}`);
                log.info('文件 ' + src_item + ' 已复制到 ' + dst_item);
            }

            // 如果是文件夹，递归复制
            else if (os.path.isdir(src_item)) {
                copytree(src_item, dst_item);
            }
        });
    }

    shutil.copytree = copytree;

    return shutil;
});
