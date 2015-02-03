'use strict';

var testSuiteLogger = (function () {
    // private
    var start;
    var getDuration = function () {
        return ((new Date()).getTime() - start);
    };
    
    var stashed = [];
    var currentTestSuite, currentTestNumber, currentTitle;
    var lastTestSuite, lastTestNumber, lastTitle;
    
    var stashTime = function() {
        stashed.push(getDuration());
    };
    
    var addStashedResults = function(testSuite, testNumber, title) {
        var dTime = 0;
        for (var i = 0; i < stashed.length; i++) {
            dTime += stashed[i];
        }
    
        addResultLine(testSuite, testNumber, title, dTime / stashed.length);
    };
    
    var addResultLine = function(testSuite, testNumber, title, duration) {
        var template = document.querySelector('#row-template');
        var clone = document.importNode(template.content, true);
        var table = document.querySelector('#result-table');

        clone.querySelector('td:nth-child(1)').innerHTML = testSuite;
        clone.querySelector('td:nth-child(2)').innerHTML = testNumber;
        clone.querySelector('td:nth-child(3)').innerHTML = title;
        clone.querySelector('td:nth-child(4)').innerHTML = (testSuite == '---') ? '---' : testSuiteHelpers.round(duration, 2) + "ms";

        table.appendChild(clone);
    };

    // public
    return {
        initStartTime: function () {
            start = (new Date()).getTime();
        },

        addResult: function (testSuite, testNumber, title) {
            if (testSuite == '---') {
                this.flush();
                addResultLine(testSuite, testNumber, title, -1);
                return;
            }
            
            if (currentTestSuite == '') {
                currentTestSuite = testSuite;
                currentTestNumber = testNumber;
                currentTitle = title;
            }
        
            if (currentTestSuite != testSuite || currentTestNumber != testNumber || currentTitle != title) {
                if (stashed.length > 0) {
                    // flush last results to output
                    this.flush();
                } else {

                    // add new testsuite and stash
                    lastTestSuite = currentTestSuite;
                    lastTestNumber = currentTestNumber;
                    lastTitle = currentTitle;
                    
                    currentTestSuite = testSuite;
                    currentTestNumber = testNumber;
                    currentTitle = title;
                    
                    stashTime();
                }
            } else {
                // stash only
                stashTime();
            }
        },
        
        flush: function() {
            if (stashed.length != 0) {
                addStashedResults(currentTestSuite, currentTestNumber, currentTitle);
                stashed = [];
            }
        }
    }
}());