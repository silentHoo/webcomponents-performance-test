'use strict';

var testSuiteShadowRootComplex = (function () {
    // private
    var suiteName = "NoComponents";
    var countTestRuns = 0;

    var buildSuffix = function (round) {
        return (round + '-' + countTestRuns);
    };

    var addElementsIterative = function (startNode, count) {
        while (count > 0) {
            var div = document.createElement('div');
            startNode.appendChild(div);

            startNode = startNode.querySelector('div');

            --count;
        }
    };

    // public
    return {
        runTestNestedElements: function (times) {
            document.body.appendChild(document.createElement('div'));

            testSuiteLogger.initStartTime();

            var div = document.querySelector('div');
            addElementsIterative(div, times - 1);

            testSuiteLogger.addResult(suiteName,
                1, 'Created ' + times + ' Elements deep in a row - Element child on Element child.');

            // cleanup
            document.body.removeChild(div);
        }
    }
}());