var testSuiteLogger = (function () {
    // private
    var start;
    var getDuration = function () {
        return ((new Date()).getTime() - start);
    };
    
    var stashed = [];
    var currentTestSuite, currentTestNumber, currentTitle;
    
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
        
        var dur = (testSuite == '---') ? '---' : testSuiteHelpers.round(duration, 2) + 'ms';

        var row = document.createElement('tr');
        row.innerHTML = '<td>' + testSuite + '</td>' +
                        '<td>' + testNumber + '</td>' +
                        '<td>' + title + '</td>' +
                        '<td>' + dur + '</td>';
        table.appendChild(row);
    };

    // public
    return {
        initStartTime: function () {
            start = (new Date()).getTime();
        },
        
        addSeparator: function() {
            this.flush();
            addResultLine('---', '---', '---', -1);
        },

        addResult: function (testSuite, testNumber, title) {
            // first run only
            if (currentTestSuite === undefined) {
                currentTestSuite = testSuite;
                currentTestNumber = testNumber;
                currentTitle = title;
                
                stashTime();
                return;
            }
            
            // is this another test suite as before?
            if (currentTestSuite != testSuite || currentTestNumber != testNumber || currentTitle != title) {
                // flush old one
                this.flush();
                
                // stash new time
                stashTime();
                
                // set new suite to current
                currentTestSuite = testSuite;
                currentTestNumber = testNumber;
                currentTitle = title;
                return;
            }
            
            // stash only
            stashTime();
        },
        
        flush: function() {
            if (stashed.length != 0) {
                addStashedResults(currentTestSuite, currentTestNumber, currentTitle);
                stashed = [];
            }
        }
    }
}());