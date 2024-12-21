/**
 * @file: Matrix.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:24
 * @project: WindowSWF-master
 * @description:
 */


/**
 * 新建一个矩阵
 * @returns {Matrix}
 */
function createMatrix(a, b, c, d, tx, ty) {
    var doc = fl.getDocumentDOM();//文档
    var matrix = doc.viewMatrix;
    matrix.a = a;
    matrix.b = b;
    matrix.c = c;
    matrix.d = d;
    matrix.tx = tx;
    matrix.ty = ty;
    return matrix;
}

function getNormalMatrix() {
    var matrix = createMatrix(1, 0, 0, 1, 0, 0);
    return matrix;
}



