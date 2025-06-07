// ------------------------------------------------------------------------------------------------------------------------
//
//     ██ ██████ ██████ ██     ██        ██               ████                   
//     ██ ██     ██     ██     ██        ██               ██                     
//     ██ ██     ██     ██     ██ █████ █████ █████ ████  ██   █████ █████ █████ 
//     ██ ██████ █████  ██     ██ ██ ██  ██   ██ ██ ██   █████    ██ ██    ██ ██ 
//     ██     ██ ██     ██     ██ ██ ██  ██   █████ ██    ██   █████ ██    █████ 
//     ██     ██ ██     ██     ██ ██ ██  ██   ██    ██    ██   ██ ██ ██    ██    
//  █████ ██████ ██     ██████ ██ ██ ██  ████ █████ ██    ██   █████ █████ █████ 
//
// ------------------------------------------------------------------------------------------------------------------------
// JSFLInterface


define(function() {


    /**
     * JSFLInterface
     * @overview    Serialises values to XML for type-safe communication with Flash panels
     * @instance    JSFLInterface
     */

    var JSFLInterface =
        {
            /**
             * Serializes values to XML so they can be passed to Flash and be deserialized to values again
             * @param    {Value}        value                Any value
             * @param    {Boolean}    allowRecursive        An optional flag to allow recursive structures to be serialised
             * @returns    {String}                        An XML String
             */
            serializeToXMLString: function(value, allowRecursive) {
                // stack to prevent recursion
                var stack = [];
                allowRecursive = !!allowRecursive;

                // utilities

                function escapeXML(xml) {
                    return xml
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/\'/g, "&apos;");
                }

                function objectToXML(obj) {
                    stack.push(obj);
                    var str = "<object>";
                    for (var prop in obj) {
                        str += "<property id=\"" + prop + "\">" + valueToXML(obj[prop]) + "</property>";
                    }
                    stack.pop();
                    return str + "</object>";
                }

                function arrayToXML(arr) {
                    stack.push(arr);
                    var str = "<array>";
                    for (var i = 0; i < arr.length; i++) {
                        str += "<property id=\"" + i + "\">" + valueToXML(arr[i]) + "</property>";
                    }
                    stack.pop();
                    return str + "</array>";
                }

                function valueToXML(value) {
                    var type = typeof value;

                    if (value === null) {
                        return "<null />";
                    } else if (type === "object") {
                        // primitive object types
                        if (value instanceof Date) {
                            return "<date>" + value.getTime() + "</date>";
                        }

                        // recursive check
                        if (!allowRecursive && stack.indexOf(value) !== -1) {
                            return "<null incompatible=\"1\" recursive=\"1\"><![CDATA[" + String(value) + "]]></null>";
                        }

                        // complex types
                        if (value instanceof Array) {
                            return arrayToXML(value);
                        } else if (type == "object") {
                            return objectToXML(value);
                        }

                        // incompatible
                        else {
                            return "<null incompatible=\"1\" />";
                        }
                    } else {
                        if (type == "boolean") {
                            return value ? "<true />" : "<false />";
                        } else if (type == "number") {
                            return "<number>" + value + "</number>";
                        } else if (type == "string") {
                            return "<string>" + escapeXML(value) + "</string>";
                        } else if (type == "xml") {
                            return "<xml>" + escapeXML(value.toXMLString()) + "</xml>";
                        } else if (type == "undefined") {
                            return "<undefined />";
                        }
                    }
                }

                // code
                var xml = valueToXML(value);
                //fl.outputPanel.clear();
                //fl.trace(new XML(xml));
                return xml;

            },

            serializeToString: function(value, allowRecursive) {
                const FormatMessageType = {
                    TEMPLATE_STRING: "TEMPLATE_STRING", // 模板字符串情况

                    NULL: "NULL", // null
                    UNDEFINED: "UNDEFINED", // undefined

                    BOOLEAN: "BOOLEAN", // boolean
                    NUMBER: "NUMBER", // number
                    STRING: "STRING", // string
                    FUNCTION: "FUNCTION", // 函数

                    IAGUEMENT: "IAGUEMENT",// 多参数情况

                    ARRAY: "ARRAY", // 数组
                    DATE: "DATE", // Date 对象
                    REGEXP: "REGEXP", // RegExp 对象

                    OBJECT: "OBJECT", // 普通对象

                    BASIC_ARRAY: "BASIC_ARRAY", // 基本数据类型数组
                    BASIC_OBJECT: "BASIC_OBJECT", // 基本数据类型对象

                    CIRCULAR_REFERENCE_ARRAY: "CIRCULAR_REFERENCE_ARRAY", // 循环引用数组
                    CIRCULAR_REFERENCE_OBJECT: "CIRCULAR_REFERENCE_OBJECT" // 循环引用对象
                };

                function isArrayWithBasicTypes(arr) {
                    if (!Array.isArray(arr)) {
                        return false; // 如果不是数组，直接返回 false
                    }

                    for (var i = 0; i < arr.length; i++) {
                        const element = arr[i];
                        if (
                            typeof element !== "number" &&
                            typeof element !== "boolean" &&
                            typeof element !== "string" &&
                            element !== null
                        ) {
                            return false; // 如果有任意一个元素不是基本数据类型，返回 false
                        }
                    }

                    return true; // 如果所有元素都是基本数据类型，返回 true
                }

                function isObjectWithBasicTypes(obj) {
                    if (typeof obj !== "object" || obj === null) {
                        return false; // 如果不是对象或为 null，直接返回 false
                    }

                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            const value = obj[key];
                            if (
                                typeof value !== "number" &&
                                typeof value !== "boolean" &&
                                typeof value !== "string" &&
                                value !== null
                            ) {
                                return false; // 如果有任意一个属性值不是基本数据类型，返回 false
                            }
                        }
                    }

                    return true; // 如果所有属性值都是基本数据类型，返回 true
                }


                function hasCircularReferenceArray(arr) {
                    var seen = {};

                    function checkCircular(obj) {
                        if (typeof obj !== "object" || obj === null) {
                            return false; // 基本数据类型或 null 不会存在循环引用
                        }

                        var objId = Object.prototype.toString.call(obj);
                        if (seen[objId]) {
                            return true; // 如果已经访问过这个对象，说明存在循环引用
                        }

                        seen[objId] = true; // 标记为已访问

                        // 遍历数组的元素
                        for (var i = 0; i < obj.length; i++) {
                            if (checkCircular(obj[i])) {
                                return true; // 递归检查数组元素
                            }
                        }

                        return false; // 如果没有发现循环引用，返回 false
                    }

                    return checkCircular(arr);
                }

                function hasCircularReferenceObj(obj) {
                    var seen = {};

                    function checkCircular(currentObj) {
                        if (typeof currentObj !== "object" || currentObj === null) {
                            return false; // 基本数据类型或 null 不会存在循环引用
                        }

                        var objId = Object.prototype.toString.call(currentObj);
                        if (seen[objId]) {
                            return true; // 如果已经访问过这个对象，说明存在循环引用
                        }

                        seen[objId] = true; // 标记为已访问

                        // 遍历对象的属性
                        for (var key in currentObj) {
                            if (currentObj.hasOwnProperty(key)) {
                                if (checkCircular(currentObj[key])) {
                                    return true; // 递归检查属性值
                                }
                            }
                        }

                        return false; // 如果没有发现循环引用，返回 false
                    }

                    return checkCircular(obj);
                }


                function useCircularJson(arg) {
                    var result = "";
                    require(["circular-json"], function(CircularJSON) {
                        result = CircularJSON.stringify(arg);
                    });
                    return result;
                }

                function analyzeFormatMessageType(arg) {
                    if (arg === null) {
                        return FormatMessageType.NULL;
                    } else if (arg === undefined) {
                        return FormatMessageType.UNDEFINED;
                    } else if (typeof arg === "boolean") {
                        return FormatMessageType.BOOLEAN;
                    } else if (typeof arg === "number") {
                        return FormatMessageType.NUMBER;
                    } else if (typeof arg === "function") {
                        return FormatMessageType.FUNCTION;
                    } else if (Object.prototype.toString.call(arg) === "[object Arguments]") {
                        return FormatMessageType.IAGUEMENT;
                    } else if (hasCircularReferenceArray(arg)) {
                        return FormatMessageType.CIRCULAR_REFERENCE_ARRAY;
                    } else if (isArrayWithBasicTypes(arg)) {
                        return FormatMessageType.BASIC_ARRAY;
                    } else if (Array.isArray(arg)) {
                        return FormatMessageType.ARRAY;
                    } else if (arg instanceof Date) {
                        return FormatMessageType.DATE;
                    } else if (arg instanceof RegExp) {
                        return FormatMessageType.REGEXP;
                    } else if (Object.prototype.toString.call(arg) === "[object String]") {
                        return FormatMessageType.STRING;
                    } else if (hasCircularReferenceObj(arg)) {
                        return FormatMessageType.CIRCULAR_REFERENCE_OBJECT;
                    } else if (isObjectWithBasicTypes(arg)) {
                        return FormatMessageType.BASIC_OBJECT;
                    } else if (Object.prototype.toString.call(arg) === "[object Object]") {
                        return FormatMessageType.OBJECT;
                    } else {
                        throw new Error("Unrecognized argument type:[" + typeof arg + "] " + arg);
                    }
                }


                function formatArgument(arg) {
                    const messageType = analyzeFormatMessageType(arg);
                    switch (messageType) {
                        case FormatMessageType.IAGUEMENT:
                            arg = Array.prototype.map.call(arg, formatArgument);


                        case FormatMessageType.NULL:
                        case FormatMessageType.UNDEFINED:
                        case FormatMessageType.BOOLEAN:
                        case FormatMessageType.NUMBER:
                        case FormatMessageType.FUNCTION:
                        case FormatMessageType.REGEXP:
                            return String(arg) + "\n";
                        case FormatMessageType.DATE:
                            return arg.toISOString() + "\n";
                        case FormatMessageType.STRING:
                            return "\"" + arg + "\"" + "\n";
                        case FormatMessageType.BASIC_ARRAY:
                            return JSON.stringify(arg) + "\n";
                        case FormatMessageType.CIRCULAR_REFERENCE_ARRAY:
                            return useCircularJson(arg) + "\n";


                        case FormatMessageType.ARRAY:
                            var array = arg;
                            var result = "[\n";
                            for (var i = 0; i < array.length; i++) {
                                result += formatArgument(array[i]);
                                if (i < array.length - 1) {
                                    result += ", \n";
                                }
                            }
                            result += "]";
                            return result;

                        case FormatMessageType.BASIC_OBJECT:
                            return JSON.stringify(arg) + "\n";
                        case FormatMessageType.CIRCULAR_REFERENCE_OBJECT:
                            return useCircularJson(arg) + "\n";

                        case FormatMessageType.OBJECT:
                            var object = arg;
                            var result = "{\n";
                            var keys = Object.keys(object);
                            for (var i = 0; i < keys.length; i++) {
                                var key = keys[i];
                                result += key + ": " + formatArgument(object[key]);
                                if (i < keys.length - 1) {
                                    result += ", \n";
                                }
                            }
                            result += "}";
                            return result;
                        default:
                            throw new Error("Unknown message type");
                    }
                }

                return formatArgument(value);

            },

            toString: function() {
                return "[class JSFLInterface]";
            }
        };

    // xjsfl.classes.register('JSFLInterface', JSFLInterface);
    return JSFLInterface;
});
	