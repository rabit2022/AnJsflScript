// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

// var util = require('../src/util')
// var Global = util.Global
// var trim = util.trim
//
// module.exports = {
//     name: 'cookieStorage',
//     read: read,
//     write: write,
//     each: each,
//     remove: remove,
//     clearAll: clearAll,
// }

// var doc = Global.document
var doc = window.document

function read(key) {
    if (!key || !_has(key)) { return null }
    var regexpStr = "(?:^|.*;\\s*)" +
        escape(key).replace(/[\-\.\+\*]/g, "\\$&") +
        "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
    return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"))
}

function each(callback) {
    var cookies = doc.cookie.split(/; ?/g)
    for (var i = cookies.length - 1; i >= 0; i--) {
        if (!trim(cookies[i])) {
            continue
        }
        var kvp = cookies[i].split('=')
        var key = unescape(kvp[0])
        var val = unescape(kvp[1])
        callback(val, key)
    }
}

function write(key, data) {
    if(!key ) { return }
    doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
}

function remove(key) {
    if (!key || !_has(key)) {
        return
    }
    doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
}

function clearAll() {
    each(function(_, key) {
        remove(key)
    })
}

function _has(key) {
    return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie)
}

var cookie=document.cookie;
// console.log(cookie);

write("name", "value");

fl.trace(read("name"));

write("name", "value1");


console.log(read("name"));

write("name1", "value2");

console.log(read("name1"));


// // 模拟 document.cookie 的行为
// var cookies = {};
//
// // 解析 cookie 字符串为对象
// function parseCookies(cookieString) {
//     var cookieArray = cookieString.split(/; ?/g);
//     var parsedCookies = {};
//     cookieArray.forEach(function(cookie) {
//         var keyValue = cookie.split('=');
//         var key = unescape(keyValue[0]);
//         var value = unescape(keyValue[1]);
//         parsedCookies[key] = value;
//     });
//     return parsedCookies;
// }
//
// // 将对象序列化为 cookie 字符串
// function stringifyCookies(cookies) {
//     var cookieArray = [];
//     for (var key in cookies) {
//         if (cookies.hasOwnProperty(key)) {
//             cookieArray.push(escape(key) + "=" + escape(cookies[key]));
//         }
//     }
//     return cookieArray.join('; ');
// }
//
// // 模拟 document.cookie 的读取
// function getCookie() {
//     console.log("get cookie: ",stringifyCookies(cookies));
//     return stringifyCookies(cookies);
// }
//
// // 模拟 document.cookie 的写入
// function setCookie(cookieString) {
//     console.log("set cookie: " + cookieString);
//     var cookieArray = cookieString.split(/; ?/g);
//     cookieArray.forEach(function(cookie) {
//         var keyValue = cookie.split('=');
//         var key = unescape(keyValue[0]);
//         var value = unescape(keyValue[1]);
//
//         // 检查是否有过期时间
//         var options = cookie.split(';').slice(1);
//         var expires = null;
//         options.forEach(function(option) {
//             var optionParts = option.split('=');
//             var optionKey = optionParts[0].trim();
//             var optionValue = optionParts[1] ? optionParts[1].trim() : true;
//             if (optionKey.toLowerCase() === 'expires') {
//                 expires = new Date(optionValue);
//             }
//         });
//
//         // 如果设置了过期时间
//         if (expires && expires < new Date()) {
//             // 如果过期时间已过，删除该 cookie
//             delete cookies[key];
//         } else {
//             // 否则，设置该 cookie
//             cookies[key] = value;
//         }
//     });
//
//     console.log("set cookie: " + cookieString);
//
// }
//
// // // 创建一个模拟的 document 对象
// // var document = {
// //     get cookie() {
// //         return getCookie();
// //     },
// //     set cookie(value) {
// //         setCookie(value);
// //     }
// // };
//
// Object.defineProperty(window.document, 'cookie', {
//     get: function() {
//         return getCookie();
//     },
//     set: function(value) {
//         setCookie(value);
//     }
// });
//
// // 测试代码
// console.log(document.cookie); // 初始状态为空
//
// // document.cookie = "name=John; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
// // var cookie=new Cookies(document.cookie);
// var cookie=Cookies;
// cookie.set("name", "John");
// cookie.set("age", "25");
// cookie.set("birthday", "25");
//
// fl.trace(cookie.get("name")); // 输出: name=John

// cookie.

// document.cookie = "age=25; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
// console.log("document.cookie: " + document.cookie); // 输出: name=John; age=25
//
// document.cookie = "name=Jane; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
// console.log(document.cookie); // 输出: name=Jane; age=25
//
// document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
// console.log(document.cookie); // 输出: age=25