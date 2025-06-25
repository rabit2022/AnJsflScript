(function(){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["store-js"] = factory();else root["store-js"] = factory();
})(void 0, function () {
  return /******/function () {
    // webpackBootstrap
    /******/
    var __webpack_modules__ = {
      /***/"./entry.js": (
      /*!******************!*\
        !*** ./entry.js ***!
        \******************/
      /***/
      function _entryJs(module, __unused_webpack_exports, __webpack_require__) {
        module.exports = __webpack_require__(/*! ./node_modules/store-js/dist/store.everything */"./node_modules/store-js/dist/store.everything.js");

        /***/
      }),
      /***/"./node_modules/store-js/dist/store.everything.js": (
      /*!********************************************************!*\
        !*** ./node_modules/store-js/dist/store.everything.js ***!
        \********************************************************/
      /***/
      function _node_modules_storeJs_dist_storeEverythingJs(module, __unused_webpack_exports, __webpack_require__) {
        var engine = __webpack_require__(/*! ../src/store-engine */"./node_modules/store-js/src/store-engine.js");
        var storages = __webpack_require__(/*! ../storages/all */"./node_modules/store-js/storages/all.js");
        var plugins = __webpack_require__(/*! ../plugins/all */"./node_modules/store-js/plugins/all.js");
        module.exports = engine.createStore(storages, plugins);

        /***/
      }),
      /***/"./node_modules/store-js/plugins/all.js": (
      /*!**********************************************!*\
        !*** ./node_modules/store-js/plugins/all.js ***!
        \**********************************************/
      /***/
      function _node_modules_storeJs_plugins_allJs(module, __unused_webpack_exports, __webpack_require__) {
        module.exports = {
          'defaults': __webpack_require__(/*! ./defaults */"./node_modules/store-js/plugins/defaults.js"),
          'dump': __webpack_require__(/*! ./dump */"./node_modules/store-js/plugins/dump.js"),
          'events': __webpack_require__(/*! ./events */"./node_modules/store-js/plugins/events.js"),
          'observe': __webpack_require__(/*! ./observe */"./node_modules/store-js/plugins/observe.js"),
          'expire': __webpack_require__(/*! ./expire */"./node_modules/store-js/plugins/expire.js"),
          'json2': __webpack_require__(/*! ./json2 */"./node_modules/store-js/plugins/json2.js"),
          'operations': __webpack_require__(/*! ./operations */"./node_modules/store-js/plugins/operations.js"),
          'update': __webpack_require__(/*! ./update */"./node_modules/store-js/plugins/update.js"),
          'v1-backcompat': __webpack_require__(/*! ./v1-backcompat */"./node_modules/store-js/plugins/v1-backcompat.js")
        };

        /***/
      }),
      /***/"./node_modules/store-js/plugins/defaults.js": (
      /*!***************************************************!*\
        !*** ./node_modules/store-js/plugins/defaults.js ***!
        \***************************************************/
      /***/
      function _node_modules_storeJs_plugins_defaultsJs(module) {
        module.exports = defaultsPlugin;
        function defaultsPlugin() {
          var defaultValues = {};
          return {
            defaults: defaults,
            get: get
          };
          function defaults(_, values) {
            defaultValues = values;
          }
          function get(super_fn, key) {
            var val = super_fn();
            return val !== undefined ? val : defaultValues[key];
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/dump.js": (
      /*!***********************************************!*\
        !*** ./node_modules/store-js/plugins/dump.js ***!
        \***********************************************/
      /***/
      function _node_modules_storeJs_plugins_dumpJs(module) {
        module.exports = dumpPlugin;
        function dumpPlugin() {
          return {
            dump: dump
          };
          function dump(_) {
            var res = {};
            this.each(function (val, key) {
              res[key] = val;
            });
            return res;
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/events.js": (
      /*!*************************************************!*\
        !*** ./node_modules/store-js/plugins/events.js ***!
        \*************************************************/
      /***/
      function _node_modules_storeJs_plugins_eventsJs(module, __unused_webpack_exports, __webpack_require__) {
        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var bind = util.bind;
        var each = util.each;
        var create = util.create;
        var slice = util.slice;
        module.exports = eventsPlugin;
        function eventsPlugin() {
          var pubsub = _newPubSub();
          return {
            watch: watch,
            unwatch: unwatch,
            once: once,
            set: set,
            remove: remove,
            clearAll: clearAll
          };

          // new pubsub functions
          function watch(_, key, listener) {
            return pubsub.on(key, bind(this, listener));
          }
          function unwatch(_, subId) {
            pubsub.off(subId);
          }
          function once(_, key, listener) {
            pubsub.once(key, bind(this, listener));
          }

          // overwrite function to fire when appropriate
          function set(super_fn, key, val) {
            var oldVal = this.get(key);
            super_fn();
            pubsub.fire(key, val, oldVal);
          }
          function remove(super_fn, key) {
            var oldVal = this.get(key);
            super_fn();
            pubsub.fire(key, undefined, oldVal);
          }
          function clearAll(super_fn) {
            var oldVals = {};
            this.each(function (val, key) {
              oldVals[key] = val;
            });
            super_fn();
            each(oldVals, function (oldVal, key) {
              pubsub.fire(key, undefined, oldVal);
            });
          }
        }
        function _newPubSub() {
          return create(_pubSubBase, {
            _id: 0,
            _subSignals: {},
            _subCallbacks: {}
          });
        }
        var _pubSubBase = {
          _id: null,
          _subCallbacks: null,
          _subSignals: null,
          on: function on(signal, callback) {
            if (!this._subCallbacks[signal]) {
              this._subCallbacks[signal] = {};
            }
            this._id += 1;
            this._subCallbacks[signal][this._id] = callback;
            this._subSignals[this._id] = signal;
            return this._id;
          },
          off: function off(subId) {
            var signal = this._subSignals[subId];
            delete this._subCallbacks[signal][subId];
            delete this._subSignals[subId];
          },
          once: function once(signal, callback) {
            var subId = this.on(signal, bind(this, function () {
              callback.apply(this, arguments);
              this.off(subId);
            }));
          },
          fire: function fire(signal) {
            var args = slice(arguments, 1);
            each(this._subCallbacks[signal], function (callback) {
              callback.apply(this, args);
            });
          }
        };

        /***/
      }),
      /***/"./node_modules/store-js/plugins/expire.js": (
      /*!*************************************************!*\
        !*** ./node_modules/store-js/plugins/expire.js ***!
        \*************************************************/
      /***/
      function _node_modules_storeJs_plugins_expireJs(module) {
        var namespace = 'expire_mixin';
        module.exports = expirePlugin;
        function expirePlugin() {
          var expirations = this.namespace(namespace);
          return {
            set: expire_set,
            get: expire_get,
            remove: expire_remove
          };
          function expire_set(super_fn, key, val, expiration) {
            if (!this.hasNamespace(namespace)) {
              expirations.set(key, expiration);
            }
            return super_fn();
          }
          function expire_get(super_fn, key) {
            if (!this.hasNamespace(namespace)) {
              var expiration = expirations.get(key, Number.MAX_VALUE);
              if (expiration <= new Date().getTime()) {
                this.remove(key);
              }
            }
            return super_fn();
          }
          function expire_remove(super_fn, key) {
            if (!this.hasNamespace(namespace)) {
              expirations.remove(key);
            }
            return super_fn();
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/json2.js": (
      /*!************************************************!*\
        !*** ./node_modules/store-js/plugins/json2.js ***!
        \************************************************/
      /***/
      function _node_modules_storeJs_plugins_json2Js(module, __unused_webpack_exports, __webpack_require__) {
        module.exports = json2Plugin;
        function json2Plugin() {
          __webpack_require__(/*! ./lib/json2 */"./node_modules/store-js/plugins/lib/json2.js");
          return {};
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/lib/json2.js": (
      /*!****************************************************!*\
        !*** ./node_modules/store-js/plugins/lib/json2.js ***!
        \****************************************************/
      /***/
      function _node_modules_storeJs_plugins_lib_json2Js() {
        //  json2.js
        //  2016-10-28
        //  Public Domain.
        //  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
        //  See http://www.JSON.org/js.html
        //  This code should be minified before deployment.
        //  See http://javascript.crockford.com/jsmin.html

        //  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
        //  NOT CONTROL.

        //  This file creates a global JSON object containing two methods: stringify
        //  and parse. This file provides the ES5 JSON capability to ES3 systems.
        //  If a project might run on IE8 or earlier, then this file should be included.
        //  This file does nothing on ES5 systems.

        //      JSON.stringify(value, replacer, space)
        //          value       any JavaScript value, usually an object or array.
        //          replacer    an optional parameter that determines how object
        //                      values are stringified for objects. It can be a
        //                      function or an array of strings.
        //          space       an optional parameter that specifies the indentation
        //                      of nested structures. If it is omitted, the text will
        //                      be packed without extra whitespace. If it is a number,
        //                      it will specify the number of spaces to indent at each
        //                      level. If it is a string (such as "\t" or "&nbsp;"),
        //                      it contains the characters used to indent at each level.
        //          This method produces a JSON text from a JavaScript value.
        //          When an object value is found, if the object contains a toJSON
        //          method, its toJSON method will be called and the result will be
        //          stringified. A toJSON method does not serialize: it returns the
        //          value represented by the name/value pair that should be serialized,
        //          or undefined if nothing should be serialized. The toJSON method
        //          will be passed the key associated with the value, and this will be
        //          bound to the value.

        //          For example, this would serialize Dates as ISO strings.

        //              Date.prototype.toJSON = function (key) {
        //                  function f(n) {
        //                      // Format integers to have at least two digits.
        //                      return (n < 10)
        //                          ? "0" + n
        //                          : n;
        //                  }
        //                  return this.getUTCFullYear()   + "-" +
        //                       f(this.getUTCMonth() + 1) + "-" +
        //                       f(this.getUTCDate())      + "T" +
        //                       f(this.getUTCHours())     + ":" +
        //                       f(this.getUTCMinutes())   + ":" +
        //                       f(this.getUTCSeconds())   + "Z";
        //              };

        //          You can provide an optional replacer method. It will be passed the
        //          key and value of each member, with this bound to the containing
        //          object. The value that is returned from your method will be
        //          serialized. If your method returns undefined, then the member will
        //          be excluded from the serialization.

        //          If the replacer parameter is an array of strings, then it will be
        //          used to select the members to be serialized. It filters the results
        //          such that only members with keys listed in the replacer array are
        //          stringified.

        //          Values that do not have JSON representations, such as undefined or
        //          functions, will not be serialized. Such values in objects will be
        //          dropped; in arrays they will be replaced with null. You can use
        //          a replacer function to replace those with JSON values.

        //          JSON.stringify(undefined) returns undefined.

        //          The optional space parameter produces a stringification of the
        //          value that is filled with line breaks and indentation to make it
        //          easier to read.

        //          If the space parameter is a non-empty string, then that string will
        //          be used for indentation. If the space parameter is a number, then
        //          the indentation will be that many spaces.

        //          Example:

        //          text = JSON.stringify(["e", {pluribus: "unum"}]);
        //          // text is '["e",{"pluribus":"unum"}]'

        //          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
        //          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

        //          text = JSON.stringify([new Date()], function (key, value) {
        //              return this[key] instanceof Date
        //                  ? "Date(" + this[key] + ")"
        //                  : value;
        //          });
        //          // text is '["Date(---current time---)"]'

        //      JSON.parse(text, reviver)
        //          This method parses a JSON text to produce an object or array.
        //          It can throw a SyntaxError exception.

        //          The optional reviver parameter is a function that can filter and
        //          transform the results. It receives each of the keys and values,
        //          and its return value is used instead of the original value.
        //          If it returns what it received, then the structure is not modified.
        //          If it returns undefined then the member is deleted.

        //          Example:

        //          // Parse the text. Values that look like ISO date strings will
        //          // be converted to Date objects.

        //          myData = JSON.parse(text, function (key, value) {
        //              var a;
        //              if (typeof value === "string") {
        //                  a =
        //   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        //                  if (a) {
        //                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
        //                          +a[5], +a[6]));
        //                  }
        //              }
        //              return value;
        //          });

        //          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
        //              var d;
        //              if (typeof value === "string" &&
        //                      value.slice(0, 5) === "Date(" &&
        //                      value.slice(-1) === ")") {
        //                  d = new Date(value.slice(5, -1));
        //                  if (d) {
        //                      return d;
        //                  }
        //              }
        //              return value;
        //          });

        //  This is a reference implementation. You are free to copy, modify, or
        //  redistribute.

        /*jslint
            eval, for, this
        */

        /*property
            JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
            getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
            lastIndex, length, parse, prototype, push, replace, slice, stringify,
            test, toJSON, toString, valueOf
        */

        // Create a JSON object only if one does not already exist. We create the
        // methods in a closure to avoid creating global variables.

        if ((typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) !== "object") {
          JSON = {};
        }
        (function () {
          "use strict";

          var rx_one = /^[\],:{}\s]*$/;
          var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
          var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
          var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
          var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
          var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
          function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? "0" + n : n;
          }
          function this_value() {
            return this.valueOf();
          }
          if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function () {
              return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
            };
            Boolean.prototype.toJSON = this_value;
            Number.prototype.toJSON = this_value;
            String.prototype.toJSON = this_value;
          }
          var gap;
          var indent;
          var meta;
          var rep;
          function quote(string) {
            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.

            rx_escapable.lastIndex = 0;
            return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) {
              var c = meta[a];
              return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\"" : "\"" + string + "\"";
          }
          function str(key, holder) {
            // Produce a string from holder[key].

            var i; // The loop counter.
            var k; // The member key.
            var v; // The member value.
            var length;
            var mind = gap;
            var partial;
            var value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.

            if (value && _typeof(value) === "object" && typeof value.toJSON === "function") {
              value = value.toJSON(key);
            }

            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.

            if (typeof rep === "function") {
              value = rep.call(holder, key, value);
            }

            // What happens next depends on the value's type.

            switch (_typeof(value)) {
              case "string":
                return quote(value);
              case "number":
                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : "null";
              case "boolean":
              case "null":
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce "null". The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

              // If the type is "object", we might be dealing with an object or an array or
              // null.

              case "object":
                // Due to a specification blunder in ECMAScript, typeof null is "object",
                // so watch out for that case.

                if (!value) {
                  return "null";
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === "[object Array]") {
                  // The value is an array. Stringify every element. Use null as a placeholder
                  // for non-JSON values.

                  length = value.length;
                  for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                  }

                  // Join all of the elements together, separated with commas, and wrap them in
                  // brackets.

                  v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                  gap = mind;
                  return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && _typeof(rep) === "object") {
                  length = rep.length;
                  for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                      k = rep[i];
                      v = str(k, value);
                      if (v) {
                        partial.push(quote(k) + (gap ? ": " : ":") + v);
                      }
                    }
                  }
                } else {
                  // Otherwise, iterate through all of the keys in the object.

                  for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = str(k, value);
                      if (v) {
                        partial.push(quote(k) + (gap ? ": " : ":") + v);
                      }
                    }
                  }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
            }
          }

          // If the JSON object does not yet have a stringify method, give it one.

          if (typeof JSON.stringify !== "function") {
            meta = {
              // table of character substitutions
              "\b": "\\b",
              "\t": "\\t",
              "\n": "\\n",
              "\f": "\\f",
              "\r": "\\r",
              "\"": "\\\"",
              "\\": "\\\\"
            };
            JSON.stringify = function (value, replacer, space) {
              // The stringify method takes a value and an optional replacer, and an optional
              // space parameter, and returns a JSON text. The replacer can be a function
              // that can replace values, or an array of strings that will select the keys.
              // A default replacer method can be provided. Use of the space parameter can
              // produce text that is more easily readable.

              var i;
              gap = "";
              indent = "";

              // If the space parameter is a number, make an indent string containing that
              // many spaces.

              if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                  indent += " ";
                }

                // If the space parameter is a string, it will be used as the indent string.
              } else if (typeof space === "string") {
                indent = space;
              }

              // If there is a replacer, it must be a function or an array.
              // Otherwise, throw an error.

              rep = replacer;
              if (replacer && typeof replacer !== "function" && (_typeof(replacer) !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
              }

              // Make a fake root object containing our value under the key of "".
              // Return the result of stringifying the value.

              return str("", {
                "": value
              });
            };
          }

          // If the JSON object does not yet have a parse method, give it one.

          if (typeof JSON.parse !== "function") {
            JSON.parse = function (text, reviver) {
              // The parse method takes a text and an optional reviver function, and returns
              // a JavaScript value if the text is a valid JSON text.

              var j;
              function walk(holder, key) {
                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && _typeof(value) === "object") {
                  for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                        value[k] = v;
                      } else {
                        delete value[k];
                      }
                    }
                  }
                }
                return reviver.call(holder, key, value);
              }

              // Parsing happens in four stages. In the first stage, we replace certain
              // Unicode characters with escape sequences. JavaScript handles many characters
              // incorrectly, either silently deleting them, or treating them as line endings.

              text = String(text);
              rx_dangerous.lastIndex = 0;
              if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                  return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
              }

              // In the second stage, we run the text against regular expressions that look
              // for non-JSON patterns. We are especially concerned with "()" and "new"
              // because they can cause invocation, and "=" because it can cause mutation.
              // But just to be safe, we want to reject all unexpected forms.

              // We split the second stage into 4 regexp operations in order to work around
              // crippling inefficiencies in IE's and Safari's regexp engines. First we
              // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
              // replace all simple value tokens with "]" characters. Third, we delete all
              // open brackets that follow a colon or comma or that begin the text. Finally,
              // we look to see that the remaining characters are only whitespace or "]" or
              // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

              if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === "function" ? walk({
                  "": j
                }, "") : j;
              }

              // If the text is not JSON parseable, then a SyntaxError is thrown.

              throw new SyntaxError("JSON.parse");
            };
          }
        })();

        /***/
      }),
      /***/"./node_modules/store-js/plugins/observe.js": (
      /*!**************************************************!*\
        !*** ./node_modules/store-js/plugins/observe.js ***!
        \**************************************************/
      /***/
      function _node_modules_storeJs_plugins_observeJs(module, __unused_webpack_exports, __webpack_require__) {
        var eventsPlugin = __webpack_require__(/*! ./events */"./node_modules/store-js/plugins/events.js");
        module.exports = [eventsPlugin, observePlugin];
        function observePlugin() {
          return {
            observe: observe,
            unobserve: unobserve
          };
          function observe(_, key, callback) {
            var subId = this.watch(key, callback);
            callback(this.get(key));
            return subId;
          }
          function unobserve(_, subId) {
            this.unwatch(subId);
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/operations.js": (
      /*!*****************************************************!*\
        !*** ./node_modules/store-js/plugins/operations.js ***!
        \*****************************************************/
      /***/
      function _node_modules_storeJs_plugins_operationsJs(module, __unused_webpack_exports, __webpack_require__) {
        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var slice = util.slice;
        var assign = util.assign;
        var updatePlugin = __webpack_require__(/*! ./update */"./node_modules/store-js/plugins/update.js");
        module.exports = [updatePlugin, operationsPlugin];
        function operationsPlugin() {
          return {
            // array
            push: push,
            pop: pop,
            shift: shift,
            unshift: unshift,
            // obj
            assign: assign_
          };

          // array
          function push(_, key, val1, val2, val3, etc) {
            return _arrayOp.call(this, 'push', arguments);
          }
          function pop(_, key) {
            return _arrayOp.call(this, 'pop', arguments);
          }
          function shift(_, key) {
            return _arrayOp.call(this, 'shift', arguments);
          }
          function unshift(_, key, val1, val2, val3, etc) {
            return _arrayOp.call(this, 'unshift', arguments);
          }

          // obj
          function assign_(_, key, props1, props2, props3, etc) {
            var varArgs = slice(arguments, 2);
            return this.update(key, {}, function (val) {
              if (_typeof(val) != 'object') {
                throw new Error('store.assign called for non-object value with key "' + key + '"');
              }
              varArgs.unshift(val);
              return assign.apply(Object, varArgs);
            });
          }

          // internal
          ///////////
          function _arrayOp(arrayFn, opArgs) {
            var res;
            var key = opArgs[1];
            var rest = slice(opArgs, 2);
            this.update(key, [], function (arrVal) {
              res = Array.prototype[arrayFn].apply(arrVal, rest);
            });
            return res;
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/update.js": (
      /*!*************************************************!*\
        !*** ./node_modules/store-js/plugins/update.js ***!
        \*************************************************/
      /***/
      function _node_modules_storeJs_plugins_updateJs(module) {
        module.exports = updatePlugin;
        function updatePlugin() {
          return {
            update: update
          };
          function update(_, key, optDefaultVal, updateFn) {
            if (arguments.length == 3) {
              updateFn = optDefaultVal;
              optDefaultVal = undefined;
            }
            var val = this.get(key, optDefaultVal);
            var retVal = updateFn(val);
            this.set(key, retVal != undefined ? retVal : val);
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/plugins/v1-backcompat.js": (
      /*!********************************************************!*\
        !*** ./node_modules/store-js/plugins/v1-backcompat.js ***!
        \********************************************************/
      /***/
      function _node_modules_storeJs_plugins_v1BackcompatJs(module, __unused_webpack_exports, __webpack_require__) {
        var dumpPlugin = __webpack_require__(/*! ./dump */"./node_modules/store-js/plugins/dump.js");
        var json2Plugin = __webpack_require__(/*! ./json2 */"./node_modules/store-js/plugins/json2.js");
        module.exports = [dumpPlugin, json2Plugin, v1BackcompatPlugin];
        function v1BackcompatPlugin() {
          this.disabled = !this.enabled;
          return {
            has: backcompat_has,
            transact: backcompat_transact,
            clear: backcompat_clear,
            forEach: backcompat_forEach,
            getAll: backcompat_getAll,
            serialize: backcompat_serialize,
            deserialize: backcompat_deserialize
          };
        }
        function backcompat_has(_, key) {
          return this.get(key) !== undefined;
        }
        function backcompat_transact(_, key, defaultVal, transactionFn) {
          if (transactionFn == null) {
            transactionFn = defaultVal;
            defaultVal = null;
          }
          if (defaultVal == null) {
            defaultVal = {};
          }
          var val = this.get(key, defaultVal);
          var ret = transactionFn(val);
          this.set(key, ret === undefined ? val : ret);
        }
        function backcompat_clear(_) {
          return this.clearAll.call(this);
        }
        function backcompat_forEach(_, fn) {
          return this.each.call(this, function (val, key) {
            fn(key, val);
          });
        }
        function backcompat_getAll(_) {
          return this.dump.call(this);
        }
        function backcompat_serialize(_, value) {
          return JSON.stringify(value);
        }
        function backcompat_deserialize(_, value) {
          if (typeof value != 'string') {
            return undefined;
          }
          try {
            return JSON.parse(value);
          } catch (e) {
            return value || undefined;
          }
        }

        /***/
      }),
      /***/"./node_modules/store-js/src/store-engine.js": (
      /*!***************************************************!*\
        !*** ./node_modules/store-js/src/store-engine.js ***!
        \***************************************************/
      /***/
      function _node_modules_storeJs_src_storeEngineJs(module, __unused_webpack_exports, __webpack_require__) {
        var util = __webpack_require__(/*! ./util */"./node_modules/store-js/src/util.js");
        var slice = util.slice;
        var pluck = util.pluck;
        var each = util.each;
        var create = util.create;
        var isList = util.isList;
        var isFunction = util.isFunction;
        var isObject = util.isObject;
        module.exports = {
          createStore: _createStore
        };
        var storeAPI = {
          version: '2.0.3',
          enabled: false,
          // addStorage adds another storage to this store. The store
          // will use the first storage it receives that is enabled, so
          // call addStorage in the order of preferred storage.
          addStorage: function addStorage(storage) {
            if (this.enabled) {
              return;
            }
            if (this._testStorage(storage)) {
              this._storage.resolved = storage;
              this.enabled = true;
            }
          },
          // addPlugin will add a plugin to this store.
          addPlugin: function addPlugin(plugin) {
            var self = this;

            // If the plugin is an array, then add all plugins in the array.
            // This allows for a plugin to depend on other plugins.
            if (isList(plugin)) {
              each(plugin, function (plugin) {
                self.addPlugin(plugin);
              });
              return;
            }

            // Keep track of all plugins we've seen so far, so that we
            // don't add any of them twice.
            var seenPlugin = pluck(this._seenPlugins, function (seenPlugin) {
              return plugin === seenPlugin;
            });
            if (seenPlugin) {
              return;
            }
            this._seenPlugins.push(plugin);

            // Check that the plugin is properly formed
            if (!isFunction(plugin)) {
              throw new Error('Plugins must be function values that return objects');
            }
            var pluginProperties = plugin.call(this);
            if (!isObject(pluginProperties)) {
              throw new Error('Plugins must return an object of function properties');
            }

            // Add the plugin function properties to this store instance.
            each(pluginProperties, function (pluginFnProp, propName) {
              if (!isFunction(pluginFnProp)) {
                throw new Error('Bad plugin property: ' + propName + ' from plugin ' + plugin.name + '. Plugins should only return functions.');
              }
              self._assignPluginFnProp(pluginFnProp, propName);
            });
          },
          // get returns the value of the given key. If that value
          // is undefined, it returns optionalDefaultValue instead.
          get: function get(key, optionalDefaultValue) {
            var data = this._storage().read(this._namespacePrefix + key);
            return this._deserialize(data, optionalDefaultValue);
          },
          // set will store the given value at key and returns value.
          // Calling set with value === undefined is equivalent to calling remove.
          set: function set(key, value) {
            if (value === undefined) {
              return this.remove(key);
            }
            this._storage().write(this._namespacePrefix + key, this._serialize(value));
            return value;
          },
          // remove deletes the key and value stored at the given key.
          remove: function remove(key) {
            this._storage().remove(this._namespacePrefix + key);
          },
          // each will call the given callback once for each key-value pair
          // in this store.
          each: function each(callback) {
            var self = this;
            this._storage().each(function (val, namespacedKey) {
              callback(self._deserialize(val), namespacedKey.replace(self._namespaceRegexp, ''));
            });
          },
          // clearAll will remove all the stored key-value pairs in this store.
          clearAll: function clearAll() {
            this._storage().clearAll();
          },
          // additional functionality that can't live in plugins
          // ---------------------------------------------------

          // hasNamespace returns true if this store instance has the given namespace.
          hasNamespace: function hasNamespace(namespace) {
            return this._namespacePrefix == '__storejs_' + namespace + '_';
          },
          // namespace clones the current store and assigns it the given namespace
          namespace: function namespace(_namespace) {
            if (!this._legalNamespace.test(_namespace)) {
              throw new Error('store.js namespaces can only have alhpanumerics + underscores and dashes');
            }
            // create a prefix that is very unlikely to collide with un-namespaced keys
            var namespacePrefix = '__storejs_' + _namespace + '_';
            return create(this, {
              _namespacePrefix: namespacePrefix,
              _namespaceRegexp: namespacePrefix ? new RegExp('^' + namespacePrefix) : null
            });
          },
          // createStore creates a store.js instance with the first
          // functioning storage in the list of storage candidates,
          // and applies the the given mixins to the instance.
          createStore: function createStore(storages, plugins) {
            return _createStore(storages, plugins);
          }
        };
        function _createStore(storages, plugins) {
          var _privateStoreProps = {
            _seenPlugins: [],
            _namespacePrefix: '',
            _namespaceRegexp: null,
            // _legalNamespace: /^[a-zA-Z0-9_\-]+$/,
            // 修改：支持中文命名空间
            _legalNamespace: /^[a-zA-Z0-9_\-\u4e00-\u9fff]+$/,
            // alpha-numeric + underscore and dash

            _storage: function _storage() {
              if (!this.enabled) {
                throw new Error("store.js: No supported storage has been added! " + "Add one (e.g store.addStorage(require('store/storages/cookieStorage')) " + "or use a build with more built-in storages (e.g " + "https://github.com/marcuswestin/store.js/tree/master/dist/store.legacy.min.js)");
              }
              return this._storage.resolved;
            },
            _testStorage: function _testStorage(storage) {
              try {
                var testStr = '__storejs__test__';
                storage.write(testStr, testStr);
                var ok = storage.read(testStr) === testStr;
                storage.remove(testStr);
                return ok;
              } catch (e) {
                return false;
              }
            },
            _assignPluginFnProp: function _assignPluginFnProp(pluginFnProp, propName) {
              var oldFn = this[propName];
              this[propName] = function pluginFn() {
                var args = slice(arguments, 0);
                var self = this;

                // super_fn calls the old function which was overwritten by
                // this mixin.
                function super_fn() {
                  if (!oldFn) {
                    return;
                  }
                  each(arguments, function (arg, i) {
                    args[i] = arg;
                  });
                  return oldFn.apply(self, args);
                }

                // Give mixing function access to super_fn by prefixing all mixin function
                // arguments with super_fn.
                var newFnArgs = [super_fn].concat(args);
                return pluginFnProp.apply(self, newFnArgs);
              };
            },
            _serialize: function _serialize(obj) {
              return JSON.stringify(obj);
            },
            _deserialize: function _deserialize(strVal, defaultVal) {
              if (!strVal) {
                return defaultVal;
              }
              // It is possible that a raw string value has been previously stored
              // in a storage without using store.js, meaning it will be a raw
              // string value instead of a JSON serialized string. By defaulting
              // to the raw string value in case of a JSON parse error, we allow
              // for past stored values to be forwards-compatible with store.js
              var val = '';
              try {
                val = JSON.parse(strVal);
              } catch (e) {
                val = strVal;
              }
              return val !== undefined ? val : defaultVal;
            }
          };
          var store = create(_privateStoreProps, storeAPI);
          each(storages, function (storage) {
            store.addStorage(storage);
          });
          each(plugins, function (plugin) {
            store.addPlugin(plugin);
          });
          return store;
        }

        /***/
      }),
      /***/"./node_modules/store-js/src/util.js": (
      /*!*******************************************!*\
        !*** ./node_modules/store-js/src/util.js ***!
        \*******************************************/
      /***/
      function _node_modules_storeJs_src_utilJs(module, __unused_webpack_exports, __webpack_require__) {
        var assign = make_assign();
        var create = make_create();
        var trim = make_trim();
        var Global = typeof window !== 'undefined' ? window : __webpack_require__.g;
        module.exports = {
          assign: assign,
          create: create,
          trim: trim,
          bind: bind,
          slice: slice,
          each: each,
          map: map,
          pluck: pluck,
          isList: isList,
          isFunction: isFunction,
          isObject: isObject,
          Global: Global
        };
        function make_assign() {
          if (Object.assign) {
            return Object.assign;
          } else {
            return function shimAssign(obj, props1, props2, etc) {
              for (var i = 1; i < arguments.length; i++) {
                each(Object(arguments[i]), function (val, key) {
                  obj[key] = val;
                });
              }
              return obj;
            };
          }
        }
        function make_create() {
          if (Object.create) {
            return function create(obj, assignProps1, assignProps2, etc) {
              var assignArgsList = slice(arguments, 1);
              return assign.apply(this, [Object.create(obj)].concat(assignArgsList));
            };
          } else {
            var F = function F() {}; // eslint-disable-line no-inner-declarations
            return function create(obj, assignProps1, assignProps2, etc) {
              var assignArgsList = slice(arguments, 1);
              F.prototype = obj;
              return assign.apply(this, [new F()].concat(assignArgsList));
            };
          }
        }
        function make_trim() {
          if (String.prototype.trim) {
            return function trim(str) {
              return String.prototype.trim.call(str);
            };
          } else {
            return function trim(str) {
              return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
          }
        }
        function bind(obj, fn) {
          return function () {
            return fn.apply(obj, Array.prototype.slice.call(arguments, 0));
          };
        }
        function slice(arr, index) {
          return Array.prototype.slice.call(arr, index || 0);
        }
        function each(obj, fn) {
          pluck(obj, function (key, val) {
            fn(key, val);
            return false;
          });
        }
        function map(obj, fn) {
          var res = isList(obj) ? [] : {};
          pluck(obj, function (v, k) {
            res[k] = fn(v, k);
            return false;
          });
          return res;
        }
        function pluck(obj, fn) {
          if (isList(obj)) {
            for (var i = 0; i < obj.length; i++) {
              if (fn(obj[i], i)) {
                return obj[i];
              }
            }
          } else {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (fn(obj[key], key)) {
                  return obj[key];
                }
              }
            }
          }
        }
        function isList(val) {
          return val != null && typeof val != 'function' && typeof val.length == 'number';
        }
        function isFunction(val) {
          return val && {}.toString.call(val) === '[object Function]';
        }
        function isObject(val) {
          return val && {}.toString.call(val) === '[object Object]';
        }

        /***/
      }),
      /***/"./node_modules/store-js/storages/all.js": (
      /*!***********************************************!*\
        !*** ./node_modules/store-js/storages/all.js ***!
        \***********************************************/
      /***/
      function _node_modules_storeJs_storages_allJs(module, __unused_webpack_exports, __webpack_require__) {
        module.exports = {
          // Listed in order of usage preference
          'localStorage': __webpack_require__(/*! ./localStorage */"./node_modules/store-js/storages/localStorage.js"),
          'oldFF-globalStorage': __webpack_require__(/*! ./oldFF-globalStorage */"./node_modules/store-js/storages/oldFF-globalStorage.js"),
          'oldIE-userDataStorage': __webpack_require__(/*! ./oldIE-userDataStorage */"./node_modules/store-js/storages/oldIE-userDataStorage.js"),
          'cookieStorage': __webpack_require__(/*! ./cookieStorage */"./node_modules/store-js/storages/cookieStorage.js"),
          'sessionStorage': __webpack_require__(/*! ./sessionStorage */"./node_modules/store-js/storages/sessionStorage.js"),
          'memoryStorage': __webpack_require__(/*! ./memoryStorage */"./node_modules/store-js/storages/memoryStorage.js")
        };

        /***/
      }),
      /***/"./node_modules/store-js/storages/cookieStorage.js": (
      /*!*********************************************************!*\
        !*** ./node_modules/store-js/storages/cookieStorage.js ***!
        \*********************************************************/
      /***/
      function _node_modules_storeJs_storages_cookieStorageJs(module, __unused_webpack_exports, __webpack_require__) {
        // cookieStorage is useful Safari private browser mode, where localStorage
        // doesn't work but cookies do. This implementation is adopted from
        // https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var Global = util.Global;
        var trim = util.trim;
        module.exports = {
          name: 'cookieStorage',
          read: read,
          write: write,
          each: each,
          remove: remove,
          clearAll: clearAll
        };
        var doc = Global.document;
        function read(key) {
          if (!key || !_has(key)) {
            return null;
          }
          var regexpStr = "(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
          return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"));
        }
        function each(callback) {
          var cookies = doc.cookie.split(/; ?/g);
          for (var i = cookies.length - 1; i >= 0; i--) {
            if (!trim(cookies[i])) {
              continue;
            }
            var kvp = cookies[i].split('=');
            var key = unescape(kvp[0]);
            var val = unescape(kvp[1]);
            callback(val, key);
          }
        }
        function write(key, data) {
          if (!key) {
            return;
          }
          doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
        }
        function remove(key) {
          if (!key || !_has(key)) {
            return;
          }
          doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        function clearAll() {
          each(function (_, key) {
            remove(key);
          });
        }
        function _has(key) {
          return new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(doc.cookie);
        }

        /***/
      }),
      /***/"./node_modules/store-js/storages/localStorage.js": (
      /*!********************************************************!*\
        !*** ./node_modules/store-js/storages/localStorage.js ***!
        \********************************************************/
      /***/
      function _node_modules_storeJs_storages_localStorageJs(module, __unused_webpack_exports, __webpack_require__) {
        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var Global = util.Global;
        module.exports = {
          name: 'localStorage',
          read: read,
          write: write,
          each: each,
          remove: remove,
          clearAll: clearAll
        };
        function localStorage() {
          return Global.localStorage;
        }
        function read(key) {
          return localStorage().getItem(key);
        }
        function write(key, data) {
          return localStorage().setItem(key, data);
        }
        function each(fn) {
          for (var i = localStorage().length - 1; i >= 0; i--) {
            var key = localStorage().key(i);
            fn(read(key), key);
          }
        }
        function remove(key) {
          return localStorage().removeItem(key);
        }
        function clearAll() {
          return localStorage().clear();
        }

        /***/
      }),
      /***/"./node_modules/store-js/storages/memoryStorage.js": (
      /*!*********************************************************!*\
        !*** ./node_modules/store-js/storages/memoryStorage.js ***!
        \*********************************************************/
      /***/
      function _node_modules_storeJs_storages_memoryStorageJs(module) {
        // memoryStorage is a useful last fallback to ensure that the store
        // is functions (meaning store.get(), store.set(), etc will all function).
        // However, stored values will not persist when the browser navigates to
        // a new page or reloads the current page.

        module.exports = {
          name: 'memoryStorage',
          read: read,
          write: write,
          each: each,
          remove: remove,
          clearAll: clearAll
        };
        var memoryStorage = {};
        function read(key) {
          return memoryStorage[key];
        }
        function write(key, data) {
          memoryStorage[key] = data;
        }
        function each(callback) {
          for (var key in memoryStorage) {
            if (memoryStorage.hasOwnProperty(key)) {
              callback(memoryStorage[key], key);
            }
          }
        }
        function remove(key) {
          delete memoryStorage[key];
        }
        function clearAll(key) {
          memoryStorage = {};
        }

        /***/
      }),
      /***/"./node_modules/store-js/storages/oldFF-globalStorage.js": (
      /*!***************************************************************!*\
        !*** ./node_modules/store-js/storages/oldFF-globalStorage.js ***!
        \***************************************************************/
      /***/
      function _node_modules_storeJs_storages_oldFFGlobalStorageJs(module, __unused_webpack_exports, __webpack_require__) {
        // oldFF-globalStorage provides storage for Firefox
        // versions 6 and 7, where no localStorage, etc
        // is available.

        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var Global = util.Global;
        module.exports = {
          name: 'oldFF-globalStorage',
          read: read,
          write: write,
          each: each,
          remove: remove,
          clearAll: clearAll
        };
        var globalStorage = Global.globalStorage;
        function read(key) {
          return globalStorage[key];
        }
        function write(key, data) {
          globalStorage[key] = data;
        }
        function each(fn) {
          for (var i = globalStorage.length - 1; i >= 0; i--) {
            var key = globalStorage.key(i);
            fn(globalStorage[key], key);
          }
        }
        function remove(key) {
          return globalStorage.removeItem(key);
        }
        function clearAll() {
          each(function (key, _) {
            delete globalStorage[key];
          });
        }

        /***/
      }),
      /***/"./node_modules/store-js/storages/oldIE-userDataStorage.js": (
      /*!*****************************************************************!*\
        !*** ./node_modules/store-js/storages/oldIE-userDataStorage.js ***!
        \*****************************************************************/
      /***/
      function _node_modules_storeJs_storages_oldIEUserDataStorageJs(module, __unused_webpack_exports, __webpack_require__) {
        // oldIE-userDataStorage provides storage for Internet Explorer
        // versions 6 and 7, where no localStorage, sessionStorage, etc
        // is available.

        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var Global = util.Global;
        module.exports = {
          name: 'oldIE-userDataStorage',
          write: write,
          read: read,
          each: each,
          remove: remove,
          clearAll: clearAll
        };
        var storageName = 'storejs';
        var doc = Global.document;
        var _withStorageEl = _makeIEStorageElFunction();
        var disable = (Global.navigator ? Global.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./); // MSIE 9.x, MSIE 10.x

        function write(unfixedKey, data) {
          if (disable) {
            return;
          }
          var fixedKey = fixKey(unfixedKey);
          _withStorageEl(function (storageEl) {
            storageEl.setAttribute(fixedKey, data);
            storageEl.save(storageName);
          });
        }
        function read(unfixedKey) {
          if (disable) {
            return;
          }
          var fixedKey = fixKey(unfixedKey);
          var res = null;
          _withStorageEl(function (storageEl) {
            res = storageEl.getAttribute(fixedKey);
          });
          return res;
        }
        function each(callback) {
          _withStorageEl(function (storageEl) {
            var attributes = storageEl.XMLDocument.documentElement.attributes;
            for (var i = attributes.length - 1; i >= 0; i--) {
              var attr = attributes[i];
              callback(storageEl.getAttribute(attr.name), attr.name);
            }
          });
        }
        function remove(unfixedKey) {
          var fixedKey = fixKey(unfixedKey);
          _withStorageEl(function (storageEl) {
            storageEl.removeAttribute(fixedKey);
            storageEl.save(storageName);
          });
        }
        function clearAll() {
          _withStorageEl(function (storageEl) {
            var attributes = storageEl.XMLDocument.documentElement.attributes;
            storageEl.load(storageName);
            for (var i = attributes.length - 1; i >= 0; i--) {
              storageEl.removeAttribute(attributes[i].name);
            }
            storageEl.save(storageName);
          });
        }

        // Helpers
        //////////

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        function fixKey(key) {
          return key.replace(/^\d/, '___$&').replace(forbiddenCharsRegex, '___');
        }
        function _makeIEStorageElFunction() {
          if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) {
            return null;
          }
          var scriptTag = 'script',
            storageOwner,
            storageContainer,
            storageEl;

          // Since #userData storage applies only to specific paths, we need to
          // somehow link our data to a specific path.  We choose /favicon.ico
          // as a pretty safe option, since all browsers already make a request to
          // this URL anyway and being a 404 will not hurt us here.  We wrap an
          // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
          // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
          // since the iframe access rules appear to allow direct access and
          // manipulation of the document element, even for a 404 page.  This
          // document can be used instead of the current document (which would
          // have been limited to the current path) to perform #userData storage.
          try {
            /* global ActiveXObject */
            storageContainer = new ActiveXObject('htmlfile');
            storageContainer.open();
            storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>');
            storageContainer.close();
            storageOwner = storageContainer.w.frames[0].document;
            storageEl = storageOwner.createElement('div');
          } catch (e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storageEl = doc.createElement('div');
            storageOwner = doc.body;
          }
          return function (storeFunction) {
            var args = [].slice.call(arguments, 0);
            args.unshift(storageEl);
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storageOwner.appendChild(storageEl);
            storageEl.addBehavior('#default#userData');
            storageEl.load(storageName);
            storeFunction.apply(this, args);
            storageOwner.removeChild(storageEl);
            return;
          };
        }

        /***/
      }),
      /***/"./node_modules/store-js/storages/sessionStorage.js": (
      /*!**********************************************************!*\
        !*** ./node_modules/store-js/storages/sessionStorage.js ***!
        \**********************************************************/
      /***/
      function _node_modules_storeJs_storages_sessionStorageJs(module, __unused_webpack_exports, __webpack_require__) {
        var util = __webpack_require__(/*! ../src/util */"./node_modules/store-js/src/util.js");
        var Global = util.Global;
        module.exports = {
          name: 'sessionStorage',
          read: read,
          write: write,
          each: each,
          remove: remove,
          clearAll: clearAll
        };
        function sessionStorage() {
          return Global.sessionStorage;
        }
        function read(key) {
          return sessionStorage().getItem(key);
        }
        function write(key, data) {
          return sessionStorage().setItem(key, data);
        }
        function each(fn) {
          for (var i = sessionStorage().length - 1; i >= 0; i--) {
            var key = sessionStorage().key(i);
            fn(read(key), key);
          }
        }
        function remove(key) {
          return sessionStorage().removeItem(key);
        }
        function clearAll() {
          return sessionStorage().clear();
        }

        /***/
      })

      /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/
    var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/var cachedModule = __webpack_module_cache__[moduleId];
      /******/
      if (cachedModule !== undefined) {
        /******/return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/
      var module = __webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/exports: {}
        /******/
      };
      /******/
      /******/ // Execute the module function
      /******/
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      /******/
      /******/ // Return the exports of the module
      /******/
      return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/global */
    /******/
    (function () {
      /******/__webpack_require__.g = function () {
        /******/if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') return globalThis;
        /******/
        try {
          /******/return this || new Function('return this')();
          /******/
        } catch (e) {
          /******/if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') return window;
          /******/
        }
        /******/
      }();
      /******/
    })();
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module used 'module' so it can't be inlined
    /******/
    var __webpack_exports__ = __webpack_require__("./entry.js");
    /******/
    /******/
    return __webpack_exports__;
    /******/
  }();
});
})();