'use strict';

var testSuiteNoComponents = (function () {
    // private
    var suiteName = 'NoComponents';
    var testDescr = [
        'Elements deep in a row - Element child on Element child.'
    ];
    var countTestRuns = 0;

    var buildSuffix = function (round) {
        return (round + '-' + countTestRuns);
    };

    var addElementsIterative = function (startNode, count) {
        while (count > 0) {
            var div = document.createElement('div');
            startNode.appendChild(div);
            startNode = div;

            --count;
            
        }
    };

    // public
    return {
        runTestNestedElements: function (times) {
            // prepare
            var id = 'id-' + Date.now();
            var div = document.createElement('div');
            div.id = id;
            document.body.appendChild(div);

            testSuiteLogger.initStartTime();
            addElementsIterative(div, times - 1);
            testSuiteLogger.addResult(suiteName, 1, 'Created ' + times + ' ' + testDescr[0]);

            // cleanup
            document.body.removeChild(div);
        },
        
        getSuiteName: function() {
            return suiteName;
        },
        
        getTestDescr: function() {
            return testDescr;
        },
        
        getTestFunctions: function() {
            return [
                this.runTestNestedElements
            ];
        }
    }
}());