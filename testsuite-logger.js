'use strict';

var testSuiteLogger = (function () {
    // private
    var start;
    var getDuration = function () {
        return (((new Date()).getTime() - start) / 1000);
    };

    // public
    return {
        initStartTime: function () {
            start = (new Date()).getTime();
        },

        addResult: function (testSuite, testNumber, title) {
            var template = document.querySelector('#row-template');
            var clone = document.importNode(template.content, true);
            var table = document.querySelector('#result-table');

            // don't use innerHTML, it's read-only!
            clone.querySelector('td:nth-child(1)').innerText = testSuite;
            clone.querySelector('td:nth-child(2)').innerText = testNumber;
            clone.querySelector('td:nth-child(3)').innerText = title;
            clone.querySelector('td:nth-child(4)').innerText = (testSuite == '---') ? '---' : getDuration() + "s";

            table.appendChild(clone);
        }
    }
}());