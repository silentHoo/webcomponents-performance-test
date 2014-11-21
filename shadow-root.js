'use strict';

var testSuiteShadowRoot = (function () {
    // private
    var suiteName = "ShadowRoot";
    var countTestRuns = 0;

    var buildSuffix = function (round) {
        return (round + '-' + countTestRuns);
    };

    // public
    return {
        runTestWithoutAnyShadowContent: function (times) {
            // setup: create one div to attach into the DOM, to attach the Shadow Roots there
            document.body.appendChild(document.createElement('div'));

            testSuiteLogger.initStartTime();

            var div = document.querySelector('div');
            for (var i = 0; i < times; ++i) {
                div.createShadowRoot();
            }

            testSuiteLogger.addResult(suiteName,
                1, 'Created ' + times + ' ShadowRoots on one single DIV.');

            // cleanup
            document.body.removeChild(div);
        },

        // x times ShadowDOM + div container for each shadow dom
        runTestWithShadowContent: function (times) {
            // setup: create one div to attach into the DOM, to attach the Shadow Roots there
            document.body.appendChild(document.createElement('div'));

            testSuiteLogger.initStartTime();

            var div = document.querySelector('div');
            for (var i = 0; i < times; ++i) {
                var root = div.createShadowRoot();
                root.innerHTML = '<div style="position: absolute; top:10px; width:20px; height:20px; background-color:red;"></div>';
            }

            testSuiteLogger.addResult(suiteName,
                2, 'Created ' + times + ' ShadowRoots on one single DIV with another, boxed+colored DIV in it (only last DIV will render!).');

            // cleanup
            document.body.removeChild(div);
        },

        runTestWithShadowContentAndShadowInsertions: function (times) {
            // setup: create one div to attach into the DOM, to attach the Shadow Roots there
            document.body.appendChild(document.createElement('div'));

            testSuiteLogger.initStartTime();

            var div = document.querySelector('div');
            for (var i = 0; i < times; ++i) {
                var root = div.createShadowRoot();
                root.innerHTML = '<div style="position: absolute; top:10px; width:20px; height:20px; background-color:red;"><shadow></shadow></div>';
            }

            testSuiteLogger.addResult(suiteName,
                3, 'Created ' + times + ' ShadowRoots on one single DIV with another, boxed+colored DIV in it (only last DIV will render!) which used SHADOW elements to get content of previous attached Shadow Root.');

            // cleanup
            document.body.removeChild(div);
        }
    }
}());