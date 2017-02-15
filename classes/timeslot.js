
/** GLOBALS */

var validDays = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

/** HELPERS */

var getHourComponent = function (mins) {
  return Math.floor(mins / 60);
};

var getMinuteComponent = function (mins) {
  return mins % 60;
};

var getTimeString = function (mins) {
  var hour = getHourComponent(mins);
  var min = getMinuteComponent(mins);
  var hourString = (hour < 10) ? "0"+hour : ""+hour;
  var minString = (min < 10) ? "0"+min : ""+min;
  return hourString + ":" + minString;
};

/** CLASS DEFINITION */

function Timeslot (day, startHour, startMin, durationMins, numberOfPrioritiesPerGroup) {

  if (validDays.indexOf(day) < 0) {
    throw "Failed to init timeslot. " + day + " is not a valid day string";
  }
  if (startHour < 0 || startHour > 23) {
    throw "Failed to init timeslot. Start hour out of bounds.";
  }
  if (startMin < 0 || startMin > 59) {
    throw "Failed to init timeslot. Start minute out of bounds.";
  }
  if (durationMins < 0 || durationMins % 15 != 0) {
    throw "Failed to init timeslot. Duration must be multiple of 15.";
  }

  this.day = day;
  this.startMin = (startHour * 60) + startMin;
  this.durationMins = durationMins;
  this.endMin = this.startMin + this.durationMins;

  this.tutorCandidates = [];
  this.associatedTutor = null;

  var prio = 1;
  this.participantCandidatesPrioritized = {};
  while (prio <= numberOfPrioritiesPerGroup) {
    this.participantCandidatesPrioritized[prio.toString()] = [];
    prio++;
  }
  this.associatedParticipant = null;

}

/** PROTOTYPE */

Timeslot.prototype = {

  addTutorCandidate: function (tutor) {
    this.tutorCandidates[this.tutorCandidates.length] = tutor;
  },

  assignTutor: function (tutor) {
    if (this.hasTutor()) {
      throw "Cannot assign tutor to " + this.toString(true) + ". " + this.associatedTutor.toString(true) + " already assigned.";
    }
    this.associatedTutor = tutor;
  },

  addParticipantCandidate: function (participant, prio) {
    this.participantCandidatesPrioritized[prio].push(participant);
  },

  assignParticipant: function (participant) {
    if (this.hasParticipant()) {
      throw "Cannot assign participant to " + this.toString(true) + ". " + this.associatedParticipant.toString(true) + " already assigned.";
    }
    this.associatedParticipant = participant;
  },

  hasTutor: function () {
    if (this.associatedTutor === null) {
      return false;
    }
    return true;
  },

  hasParticipant: function () {
    if (this.associatedParticipant === null) {
      return false;
    }
    return true;
  },

  toString: function (short) {
    var string = "TIMESLOT ".bold.green;
    string += "[ " + this.day + " " + getTimeString(this.startMin) + " - " + getTimeString(this.endMin);
    if (short) {
      string  += " ]";
    } else {

      if (this.associatedTutor === null && this.associatedParticipant === null) {
        string += " no-tutor no-participant]";
      } else if (this.associatedTutor === null) {
        string += " no-tutor\n";
        string += "  " + this.associatedParticipant.toString(true) + "\n";
        string += "]";
      } else if (this.associatedParticipant === null) {
        string += " no-participant\n";
        string += "  " + this.associatedTutor.toString(true) + "\n";
        string += "]";
      } else {
        string += "\n";
        string += "  " + this.associatedTutor.toString(true) + "\n";
        string += "  " + this.associatedParticipant.toString(true) + "\n";
        string += "]";
      }

    }
    return string;
  }

};

module.exports = Timeslot;