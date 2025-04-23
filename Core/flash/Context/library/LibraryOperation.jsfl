/**
 * @file: LibraryOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 18:48
 * @project: AnJsflScript
 * @description:
 */


define(function() {

    /**
     * 为库中的元件添加前缀
     * @param {string} prefix 前缀
     * @see https://github.com/hufang360/FlashTool
     */
    function libRename(prefix) {
        var doc = fl.getDocumentDOM(); //文档
        const library = doc.library;//库

        var counter = 1;
        for (var folder in library) {
            library[folder].forEach(function(item) {
                if (item.itemType !== 'folder') {
                    item.name = prefix + '-' + counter++;
                }
            });
        }

        alert('库元件重命名完成，共处理了 ' + (counter - 1) + ' 个项目');
    };

    /**
     * 替换库中选中元件的名称
     * @param {string} searchStr 查找字符
     * @param {string} replaceStr 替换字符
     * @see https://github.com/hufang360/FlashTool
     */
    function libReplace(searchStr, replaceStr) {
        var doc = fl.getDocumentDOM(); //文档
        const library = doc.library;//库
        const libSelection = library.getSelectedItems();

        if (!libSelection || libSelection.length === 0) {
            alert('请在库中选择元件');
            return;
        }

        // const input = prompt(
        //     '请输入 “查找字符”以及“替换字符”\n中间用 \' | \' 符号隔开，分隔符左右两边各有一个空格',
        //     '查找 | 替换'
        // );
        // if (!input) return;
        //
        // const [searchStr, replaceStr] = input.split(' | ');
        // if (!searchStr || !replaceStr) {
        //     alert('输入格式不正确！');
        //     return;
        // }

        var failedItems = [];
        libSelection.forEach(function(item) {
            const originalName = item.name;
            const newName = originalName.replace(searchStr, replaceStr);

            if (doc.library.getItemByName(newName)) {
                failedItems.push(originalName);
            } else {
                item.name = newName;
            }
        });

        if (failedItems.length > 0) {
            alert(
                '部分元件名替换后会有重名情况，故未命名：\n' + failedItems.join('、')
            );
        } else {
            alert('替换完成！');
        }
    };


    /**
     * 按类型整理库
     * @param {string} type 类型
     * @see https://github.com/hufang360/FlashTool
     */
    function Organize() {
        var doc = fl.getDocumentDOM(); //文档
        const library = doc.library;//库

        const confirmResult = confirm(
            '本操作具有一定风险，使用后请检查动画是否正常\n点击取消则取消本操作！'
        );
        if (!confirmResult) return;

        const folderNames = [
            '■图形■',
            '■图片■',
            '■按钮■',
            '■影片剪辑■',
            '■视频■',
            '■字体■',
            '■声音■',
            '■组件■',
            '■标准组件-编译剪辑■',
            'Component Assets'
        ];

        const itemTypeMap = {
            graphic: [],
            button: [],
            movieclip: [],
            video: [],
            font: [],
            sound: [],
            component: [],
            compiledClip: [],
            bitmap: []
        };

        // 获取库中的所有项目并分类
        for (var i = 0; i < library.items.length; i++) {
            const item = library.items[i];
            const itemName = item.name.replace(/\/.+/g, '');

            if (folderNames.includes(itemName)) continue;

            const itemType = library.getItemType(item.name);
            if (itemTypeMap[itemType]) {
                itemTypeMap[itemType].push(item);
            }
        }

        // 创建文件夹并移动项目
        folderNames.forEach(function(folderName) {
            if (!library.getFolderByName(folderName)) {
                library.newFolder(folderName);
            }
        });

        Object.entries(itemTypeMap).forEach(function(entry) {
            const folderName = folderNames.find(function(name) {
                return name.toLowerCase().includes(type);
            });
            if (folderName && items.length > 0) {
                // for (const item of items) {
                items.forEach(function(item) {
                    library.selectItem(item.name);
                    library.moveToFolder(folderName);
                });
            }
        });

        // 清理空文件夹
        library.items.forEach(function(folder) {
            if (folder.itemType === 'folder' && folder.items.length === 0) {
                try {
                    library.selectItem(folder.name);
                    library.deleteItem();
                } catch (err) {
                    // Ignore errors during deletion
                }
            }
        });

        alert('库整理完成！');
    };

    return {
        libRename: libRename,
        libReplace: libReplace,
        Organize: Organize
    };
});