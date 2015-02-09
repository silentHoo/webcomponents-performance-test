'use strict';

var testSuiteShadowRootComplex = (function () {
    // private
    var suiteName = 'ShadowRootComplex';
    var testDescr = [
        'ShadowRoots deep in a row - ShadowRoot child on ShadowRoot child.'
    ];
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
            // prepare
            var id = 'id-' + Date.now();
            var div = document.createElement('div');
            div.id = id;
            document.body.appendChild(div);
            
            testSuiteLogger.initStartTime();
            
            var shadowRoot = div.createShadowRoot();
            addShadowsIterative(shadowRoot, times - 1, 'div');

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
                this.runTestNestedShadowRoots
            ];
        }
    }
}());