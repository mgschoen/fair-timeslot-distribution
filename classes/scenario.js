var Timeslot = require('./timeslot.js');
var Tutor = require('./tutor.js');
var Group = require('./participant.js');

const WEEKDAY_STRINGS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Scenario (numberOfTimeslots,
                   numberOfTutors,
                   numberOfGroups,
                   numberOfPrioritiesPerGroup) {

    var that = this;

    var generateTimeslots = function (count) {
        var result = [], idx = 0, weekday = 0, hour = 8;
        while (idx < count) {
            result.push(new Timeslot(WEEKDAY_STRINGS[weekday], hour, 15, 45, numberOfPrioritiesPerGroup));
            if (hour == 20) {
                weekday++;
                hour = 8;
            } else {
                hour++;
            }
            idx++;
        }
        return result;
    };

    var generateTutors = function (count) {
        var result = [], idx = 0;

        while (idx < count) {

            // Create a random number of possible dates for this tutor
            var numberOfPossibleDates = Math.floor(Math.random() * numberOfTimeslots);
            var jdx = 0, possibleDates = [];
            while (jdx < numberOfPossibleDates) {
                var nextPossibleDate = Math.floor(Math.random() * numberOfTimeslots);
                // check if this date is already part of this tutor's possible dates list
                while (possibleDates.indexOf(nextPossibleDate) >= 0) {
                    nextPossibleDate = Math.floor(Math.random() * numberOfTimeslots);
                }
                possibleDates.push(nextPossibleDate);
                jdx++;
            }

            // Add the new tutor
            result.push(new Tutor("Tutor "+(idx+1), possibleDates));
            idx++;
        }
        return result;
    };

    var generateGroups = function (count) {
        var result = [], idx = 0;
        while (idx < count) {

            var priorityList = [];
            if (that.timeslots) {
                var jdx = 0;
                var remainingTimeslots = that.timeslots.slice();
                while (jdx < numberOfPrioritiesPerGroup) {
                    var nextTimeslotIndex = Math.floor(Math.random()*remainingTimeslots.length);
                    var nextTimeslot = remainingTimeslots.splice(nextTimeslotIndex,1);
                    priorityList.push(nextTimeslot[0]);
                    jdx++;
                }
            }

            // Add the new group
            result.push(new Group("Gruppe "+(idx+1), priorityList));
            idx++;
        }
        return result;
    };

    if (numberOfTimeslots > 72) {
        throw "[scenario.js] Error creating Scenario: Maximum number of timeslots (72) exceeded";
        return;
    }

    if (numberOfPrioritiesPerGroup > numberOfTimeslots) {
        throw "[scenario.js] Error creating Scenario: numberOfPrioritiesPerGroup must not be higher than numberOfTimeslots";
        return;
    }

    this.numberOfPrioritiesPerGroup = numberOfPrioritiesPerGroup;

    this.timeslots = generateTimeslots(numberOfTimeslots);
    this.tutors = generateTutors(numberOfTutors);
    this.groups = generateGroups(numberOfGroups);

}

Scenario.prototype = {

};

module.exports = Scenario;