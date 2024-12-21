/**
 * @file: 00.跨域剪切.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 11:15
 * @project: WindowSWF-master
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }

        // if (selection.length < 1) {
        //     alert("请选择元件？");
        //     return false;
        // }
        // if (selection.length > 1) {
        //     alert("请选择单个元件");
        //     return false;
        // }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkDom()) {
            return;
        }

        /**
         * @type {Matrix}
         */
        var worldViewMatrixAnti = fl.tempWorldViewMatrixAnti;
        if (!worldViewMatrixAnti) {
            fl.trace("未找到之前的观察矩阵。请先运行脚本：00.跨域剪切.jsfl");
            return;
        }
        // if (worldViewMatrixAnti==null){
        //     // 设置观察矩阵
        //     worldViewMatrixAnti=getNormalMatrix();
        // }

        doc.selectNone();
        doc.clipPaste(true);

        // 本地摄像机的逆矩阵
        var localViewMatrixAnti = doc.viewMatrix;

        // 一个矩阵的逆可以用来撤销该矩阵所代表的变换。
        // 例如，如果有一个变换矩阵（可能包含旋转、缩放、平移等），它的逆矩阵将包含相反的变换，可以用来恢复原始状态。
        // 本地摄像机的矩阵
        var localViewMatrix = fl.Math.invertMatrix(localViewMatrixAnti);//逆矩阵

        var selection1 = doc.selection;
        for (var i = 0; i < selection1.length; i++) {
            var element = selection1[i];

            // 从一种坐标系到另一种坐标系的转换，然后立即撤销这个转换。
            // 计算一个点在不同坐标系之间的相对位置。
            // 例如，如果你有一个在世界坐标系下的点，通过乘以观察矩阵，你可以得到这个点在相机坐标系下的位置。
            // 然后，通过乘以逆观察矩阵，你可以将这个点转换回世界坐标系
            var worldMatrix = fl.Math.concatMatrix(worldViewMatrixAnti, localViewMatrix);//矩阵相乘
            var finalMatrix = fl.Math.concatMatrix(element.matrix, worldMatrix);

            element.matrix = finalMatrix;
        }
    }

    Main();
})();

