'use strict';

var testSuiteCustomElements = (function () {
    // private
    var suiteName = 'CustomElements';
    var testDescr = [
        'Custom Elements with prototype of HTMLElement.',
        'Custom Elements without any prototype.',
        'Custom Elements with prototype of HTMLButtonElement.',
        'Custom Elements with prototype of HTMLAudioElement.'
    ];
    var countTestRuns = 0;

    var buildSuffix = function (round) {
        return (round + '-' + countTestRuns + Date.now());
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

            testSuiteLogger.addResult(suiteName, 1, 'Registered ' + times + ' ' + testDescr[0]);

            ++countTestRuns;
        },

        runTestWithoutInteritance: function (times) {
            testSuiteLogger.initStartTime();

            for (var i = 0; i < times; ++i) {
                document.registerElement('perf-element-without' + buildSuffix(i));
            }

            testSuiteLogger.addResult(suiteName, 2, 'Registered ' + times + ' ' + testDescr[1]);

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

            testSuiteLogger.addResult(suiteName, 3, 'Registered ' + times + ' ' + testDescr[2]);

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

            testSuiteLogger.addResult(suiteName, 4, 'Registered ' + times + ' ' + testDescr[3]);

            ++countTestRuns;
        },
        
        getSuiteName: function() {
            return suiteName;
        },
        
        getTestDescr: function() {
            return testDescr;
        },
        
        getTestFunctions: function() {
            return [
                this.runTestHTMLElementInheritance,
                this.runTestWithoutInteritance,
                this.runTestHTMLButtonElementInheritance,
                this.runTestHTMLAudioElementInheritance
            ];
        }
    }
}());