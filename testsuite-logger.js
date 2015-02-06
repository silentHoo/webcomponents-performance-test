
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

        // don't use innerHTML, it's read-only!
        /*clone.querySelector('td:nth-child(1)').innerText = testSuite;
        clone.querySelector('td:nth-child(2)').innerText = testNumber;
        clone.querySelector('td:nth-child(3)').innerText = title;
        clone.querySelector('td:nth-child(4)').innerText = (testSuite == '---') ? '---' : getDuration() + "s";

        table.appendChild(clone);
        */
        
        table.appendChild('<tr>
            <td>' + testSuite + '</td>
            <td>' + testNumber + '</td>
            <td>' + title + '</td>
            <td>' + (testSuite == '---') ? '---' : getDuration() + 's' + '</td>
        </tr>');
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