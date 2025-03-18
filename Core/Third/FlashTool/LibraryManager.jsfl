define(['checkUtil'], function (checkUtil) {
    const { CheckDom } = checkUtil;

    function LibraryManager() {}

    // 静态方法：为库中的元件添加前缀
    LibraryManager.libRename = function () {
        const doc = CheckDom();
        if (!doc) return;

        const pName = prompt('请输入库元件前缀名', 'lib');
        if (!pName) return;

        const lib = doc.library;
        let counter = 1;

        for (const folder in lib) {
            for (const item of lib[folder]) {
                if (item.itemType !== 'folder') {
                    item.name = `${pName}-${counter++}`;
                }
            }
        }

        alert(`库元件重命名完成，共处理了 ${counter - 1} 个项目`);
    };

    // 静态方法：替换库中选中元件的名称
    LibraryManager.Replace = function () {
        const doc = CheckDom();
        if (!doc) return;

        const libSelection = doc.library.getSelectedItems();
        if (!libSelection || libSelection.length === 0) {
            alert('请在库中选择元件');
            return;
        }

        const input = prompt(
            "请输入 “查找字符”以及“替换字符”\n中间用 ' | ' 符号隔开，分隔符左右两边各有一个空格",
            '查找 | 替换'
        );
        if (!input) return;

        const [searchStr, replaceStr] = input.split(' | ');
        if (!searchStr || !replaceStr) {
            alert('输入格式不正确！');
            return;
        }

        let failedItems = [];
        for (const item of libSelection) {
            const originalName = item.name;
            const newName = originalName.replace(searchStr, replaceStr);

            if (doc.library.getItemByName(newName)) {
                failedItems.push(originalName);
            } else {
                item.name = newName;
            }
        }

        if (failedItems.length > 0) {
            alert(
                `部分元件名替换后会有重名情况，故未命名：\n${failedItems.join('、')}`
            );
        } else {
            alert('替换完成！');
        }
    };

    // 静态方法：设置选中的位图元件为无损压缩
    LibraryManager.BitmapLossless = function () {
        const doc = LibraryManager.checkDocument();
        if (!doc) return;

        const libSelection = doc.library.getSelectedItems();
        if (!libSelection || libSelection.length === 0) {
            alert('请在库中选择一个或多个位图元件');
            return;
        }

        let count = 0;
        for (const item of libSelection) {
            if (item.itemType === 'bitmap') {
                item.allowSmoothing = false;
                item.compressionType = 'lossless';
                count++;
            }
        }

        if (count === 0) {
            alert('选中的库元件都不是位图元件！');
        } else {
            alert(`已设置 ${count} 个位图元件为无损压缩`);
        }
    };

    // 静态方法：按类型整理库
    LibraryManager.Organize = function () {
        const doc = LibraryManager.checkDocument();
        if (!doc) return;

        const confirmResult = confirm(
            '本操作具有一定风险，使用后请检查动画是否正常\n点击取消则取消本操作！'
        );
        if (!confirmResult) return;

        const lib = doc.library;
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
        for (const item of lib.items) {
            const itemName = item.name.replace(/\/.+/g, '');
            if (folderNames.includes(itemName)) continue;

            const itemType = lib.getItemType(item.name);
            if (itemTypeMap[itemType]) {
                itemTypeMap[itemType].push(item);
            }
        }

        // 创建文件夹并移动项目
        for (const folderName of folderNames) {
            if (!lib.getFolderByName(folderName)) {
                lib.newFolder(folderName);
            }
        }

        for (const [type, items] of Object.entries(itemTypeMap)) {
            const folderName = folderNames.find((name) =>
                name.toLowerCase().includes(type)
            );
            if (folderName && items.length > 0) {
                for (const item of items) {
                    lib.selectItem(item.name);
                    lib.moveToFolder(folderName);
                }
            }
        }

        // 清理空文件夹
        for (const folder of lib.items) {
            if (folder.itemType === 'folder' && folder.items.length === 0) {
                try {
                    lib.selectItem(folder.name);
                    lib.deleteItem();
                } catch (err) {
                    // Ignore errors during deletion
                }
            }
        }

        alert('库整理完成！');
    };
    return LibraryManager;
});
