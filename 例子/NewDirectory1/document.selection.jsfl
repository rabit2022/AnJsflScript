/**
 * Created with JetBrains Rider.
 * User: admin
 * Date: 2024/12/4
 * Time: 19:41
 * To change this template use File | Settings | File Templates.
 */

// The following example assigns all elements on Frame 11 to the current selection (remember that index values are different from frame number values):
// 下面的例子将所有Frame 11上的元素分配给当前选择（请记住，索引值与帧号值不同）：
fl.getDocumentDOM().getTimeline().currentFrame = 10; 
fl.getDocumentDOM().selection = fl.getDocumentDOM().getTimeline()
    .layers[0].frames[10].elements;

// The following example creates a rectangle in the upper left corner of the Stage and a text string underneath the rectangle. Then it selects both objects using [document.setSelectionRect()](../Document_object/docu9689.md) and adds them to the document.selection array. Finally, it displays the contents of document.selection in the Output panel.
// 下面的例子在舞台的左上角创建一个矩形，并在矩形下方创建一个文本字符串。
// 然后使用[document.setSelectionRect()](../Document_object/docu9689.md)选择这两个对象，
// 并将它们添加到document.selection数组中。最后，将document.selection的内容显示在输出面板中。
fl.getDocumentDOM().addNewRectangle({left:0, top:0, right:99, bottom:99}, 0);
fl.getDocumentDOM().addNewText({left:-1, top:117.3, right:9.2, bottom:134.6}); fl.getDocumentDOM().setTextString('Hello World');
fl.getDocumentDOM().setSelectionRect({left:-28, top:-22, right:156.0, bottom:163});
var theSelectionArray = fl.getDocumentDOM().selection;
for(var i=0;i<theSelectionArray.length;i++){
    fl.trace("fl.getDocumentDOM().selection["+i+"] = " + theSelectionArray[i]);
}

// The following example is an advanced example. It shows how to loop through the layer array and elements array to locate instances of a particular symbol and select them. You could extend this example to include loops for multiple frames or scenes. This example assigns all instances of the movie clip myMovieClip in the first frame to the current selection:
// 下面的例子是高级的例子。
// 它展示了如何循环遍历层数组和元素数组，定位特定符号的实例，并选择它们。

// Assigns the layers array to the variable "theLayers". 
// 将层数组赋值给变量"theLayers"。
var theLayers = fl.getDocumentDOM().getTimeline().layers;

// Creates an array to hold all the elements that are instances of "myMovieClip". 
// 创建一个数组，用于保存所有元素都是"myMovieClip"实例。
var myArray = new Array();
// Counter variable 
// 计数器变量
var x = 0;

// Begin loop through all the layers.
// 开始循环遍历所有层。
for (var i = 0; i < theLayers.length; i++) {
    // Gets the array of elements in Frame 1
    // and assigns it to the array "theElems".
    // 获取Frame 1上的元素数组，并将其赋值给数组"theElems"。
    var theElems = theLayers[i].frames[0].elements;
    // Begin loop through the elements on a layer. 
    // 开始循环遍历层上的元素。
    for (var c = 0; c < theElems.length; c++) {
        // Checks to see if the element is of type "instance".
        // 检查元素是否为"instance"类型。
        if (theElems[c].elementType === "instance") {
            // If the element is an instance, it checks
            // if it is an instance of "myMovieClip".
            // 如果元素是实例，则检查它是否是"myMovieClip"的实例。
            if (theElems[c].libraryItem.name === "myMovieClip") {
                // Assigns elements that are instances of "myMovieClip" to "myArray".
                // 如果元素是"myMovieClip"的实例，则将其赋值给"myArray"。
                myArray[x] = theElems[c];
                // Increments counter variable.
                // 计数器变量加1。
                x++;
            }
        }
    }
}

// Now that you have assigned all the instances of "myMovieClip" to "myArray", you then set the document.selection array equal to myArray. This selects the objects on the Stage.
// 现在你已经将所有"myMovieClip"的实例都赋值给"myArray"，
fl.getDocumentDOM().selection = myArray;
