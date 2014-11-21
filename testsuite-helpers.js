'use strict';

var testSuiteHelpers = (function () {
    // private

    // public
    return {
        padString: function (strinToPadden, padString) {
            padString = padString || "00000000";
            return (padString + strinToPadden).slice(-padString.length);
        },

        repeator: function (functionName, repeatFromZeroTo, stepFactor) {
            var current = 1;
            while (current <= repeatFromZeroTo) {
                functionName(current);
                current *= stepFactor;
            }
        }
    }
}());