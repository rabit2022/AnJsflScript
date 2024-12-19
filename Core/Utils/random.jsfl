/**
 * @file: random.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/18 14:08
 * @project: WindowSWF-master
 * @description:
 */

/**
 * 获取随机3位数字
 * @return {string} 随机3位数字
 */
function getRandom3() {
    var num = Math.floor(Math.random() * 999) + 1;
    return padStart(num.toString(), 3, '0')
}
