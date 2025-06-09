const Context = require('../Context');

// library
Object.defineProperty(Context.prototype, 'library', {
    get: function () {
        return this.dom.library;
    },
});

// items
Object.defineProperty(Context.prototype, 'items', {
    get: function () {
        return this.dom.library.items;
    },
});

// AllItems
Context.prototype.AllItems = this.items;
