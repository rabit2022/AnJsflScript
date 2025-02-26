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
        if (theElems[c].elementType === 'instance') {
            // If the element is an instance, it checks
            // if it is an instance of "myMovieClip".
            // 如果元素是实例，则检查它是否是"myMovieClip"的实例。
            if (theElems[c].libraryItem.name === 'myMovieClip') {
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
