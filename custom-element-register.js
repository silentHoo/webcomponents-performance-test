'use strict';

var testSuiteCustomElements = (function () {
    // private
    var suiteName = "CustomElements";
    var countTestRuns = 0;

    var buildSuffix = function (round) {
        return (round + '-' + countTestRuns);
    };

    // public
    return {
        runTestHTMLElementInheritance: function (times) {
            testSuiteLogger.initStartTime();

            for (var i = 0; i < times; ++i) {
                document.registerElement('perf-element-htmlelement' + buildSuffix(i), {
                    prototype: Object.create(HTMLElement.prototype)
                });
            }

            testSuiteLogger.addResult(suiteName,
                1, 'Registered ' + times + ' Custom Elements with prototype of HTMLElement.');

            ++countTestRuns;
        },

        runTestWithoutInteritance: function (times) {
            testSuiteLogger.initStartTime();

            for (var i = 0; i < times; ++i) {
                document.registerElement('perf-element-without' + buildSuffix(i));
            }

            testSuiteLogger.addResult(suiteName,
                2, 'Registered ' + times + ' Custom Elements without any prototype.');

            ++countTestRuns;
        },

        runTestHTMLButtonElementInheritance: function (times) {
            testSuiteLogger.initStartTime();

            for (var i = 0; i < times; ++i) {
                document.registerElement('perf-element-button' + buildSuffix(i), {
                    prototype: Object.create(HTMLButtonElement.prototype),
                    extends: 'button'
                });
            }

            testSuiteLogger.addResult(suiteName,
                3, 'Registered ' + times + ' Custom Elements with prototype of HTMLButtonElement.');

            ++countTestRuns;
        },

        runTestHTMLAudioElementInheritance: function (times) {
            testSuiteLogger.initStartTime();

            for (var i = 0; i < times; ++i) {
                document.registerElement('perf-element-media' + buildSuffix(i), {
                    prototype: Object.create(HTMLAudioElement.prototype),
                    extends: 'audio'
                });
            }

            testSuiteLogger.addResult(suiteName,
                4, 'Registered ' + times + ' Custom Elements with prototype of HTMLAudioElement.');

            ++countTestRuns;
        }
    }
}());