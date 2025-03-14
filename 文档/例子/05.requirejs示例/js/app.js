// js/app.jsfl
log('Loading app.js');

// requirejs(['config'], function() {
//     // log("Config loaded successfully");
//
//     require(['module2',"module1"], function(module2,module1) {
//         // log("module2 loaded successfully");
//         if (module2) {
//             var randomNumber = module1.random();
//             log("Random number1:"+randomNumber);
//
//             var randomNumber = module2.random();
//             log("Random number2:"+randomNumber);
//         } else {
//             log("module2 is undefined");
//         }
//
//         log("a:"+a);
//     }, function(err) {
//         log("Failed to load module2:"+err);
//     });
// });

require(['./math'], (math) => {
    log('math module loaded');

    // var result = math.add(2, 3);
    // log("2+3="+result);
    //
    // log(math.add(2, 3)); // 输出：5
    // log(math.subtract(5, 2)); // 输出：3
    const add_result = math.add(2, 3);
    const subtract_result = math.subtract(5, 2);
    log(`2+3=${add_result}`);
    log(`5-2=${subtract_result}`);
});
