// js/app/module2.js
define('module2', ['module1'], (module1) => {
    log('Loading module2.js');

    return {
        // random: function() { return Math.random(); }
        random: module1.random
    };
});
