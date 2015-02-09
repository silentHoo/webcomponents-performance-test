'use strict';

var testSuiteHelpers = (function () {
    // private

    // public
    return {
        padString: function (strinToPadden, padString) {
            padString = padString || "00000000";
            return (padString + strinToPadden).slice(-padString.length);
        },
        
        round: function(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        },

        repeator: function (functionName, repeatFromZeroTo, stepFactor, repetitionCount) {
            var current = 1;
            while (current <= repeatFromZeroTo) {
                for (var i = 0; i < repetitionCount; i++) {
                    functionName(current);
                }
                current *= stepFactor;
            }
        }
    }
}());