'use strict';

var testSuiteShadowRootComplex = (function () {
    // private
    var suiteName = "ShadowRootComplex";
    var countTestRuns = 0;

    var buildSuffix = function (round) {
        return (round + '-' + countTestRuns);
    };

    var addShadowsIterative = function (startShadowRootNode, count) {
        while (count > 0) {
            // add one div container to the root, because the root cannot have a another shadow root
            var div = document.createElement('div');
            startShadowRootNode.appendChild(div);

            var div = startShadowRootNode.querySelector('div');
            startShadowRootNode = div.createShadowRoot();

            --count;
        }
    };

    // public
    return {
        runTestNestedShadowRoots: function (times) {
            document.body.appendChild(document.createElement('div'));

            testSuiteLogger.initStartTime();

            var div = document.querySelector('div');
            var shadowRoot = div.createShadowRoot();
            addShadowsIterative(shadowRoot, times - 1, 'div');

            testSuiteLogger.addResult(suiteName,
                1, 'Created ' + times + ' ShadowRoots deep in a row - ShadowRoot child on ShadowRoot child.');

            // cleanup
            document.body.removeChild(div);
        }
    }
}());