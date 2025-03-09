// js/app/module1.js

define('module1', [], () => {
    log('Loading module1.js');

    return {
        random: Math.random
    };
});
