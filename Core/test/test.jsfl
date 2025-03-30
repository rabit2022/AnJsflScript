/**
 * @file: test.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/30 20:28
 * @project: AnJsflScript
 * @description: 简单的测试框架
 */

define(function() {

    // 自定义测试框架
    var assert = {
        equal: function(actual, expected, message) {
            if (actual !== expected) {
                throw new Error(message || '期望值为 ' + expected + '，但实际值为 ' + actual);
            }
        },
        notEqual: function(actual, expected, message) {
            if (actual === expected) {
                throw new Error(message || '期望值不为 ' + expected + '，但实际值为 ' + actual);
            }
        },
        True: function(value, message) {
            if (!value) {
                throw new Error(message || '期望值为 true，但实际值为 ' + value);
            }
        },
        False: function(value, message) {
            if (value) {
                throw new Error(message || '期望值为 false，但实际值为 ' + value);
            }
        },
        Null: function(value, message) {
            if (value !== null) {
                throw new Error(message || '期望值为 null，但实际值为 ' + value);
            }
        },
        NotNull: function(value, message) {
            if (value === null) {
                throw new Error(message || '期望值不为 null，但实际值为 ' + value);
            }
        },
        Undefined: function(value, message) {
            if (value !== undefined) {
                throw new Error(message || '期望值为 undefined，但实际值为 ' + value);
            }
        },
        NotUndefined: function(value, message) {
            if (value === undefined) {
                throw new Error(message || '期望值不为 undefined，但实际值为 ' + value);
            }
        },
        Throws: function(fn, message) {
            try {
                fn();
                throw new Error(message || '期望函数抛出错误，但未抛出');
            } catch (error) {
                // 如果抛出错误，测试通过
            }
        }
    };

    var testResults = {
        passed: 0,
        failed: 0,
        reset: function() {
            this.passed = 0;
            this.failed = 0;
        }
    };

    function test(name, fn) {
        console.log('正在运行测试: ' + name);
        try {
            fn();
            console.log('✅ 测试通过: ' + name);
            testResults.passed++;
        } catch (error) {
            console.error('❌ 测试失败: ' + name);
            console.error('   ' + error.message);
            testResults.failed++;
        }
    }

    function end() {
        console.log('------------------------');
        console.log('测试结果：');
        console.log('通过的测试数量: ' + testResults.passed);
        console.log('失败的测试数量: ' + testResults.failed);
        console.log('------------------------');
        // 归零测试结果
        testResults.reset();
    }

    return {
        test: test,
        end: end,
        assert: assert
    };
});