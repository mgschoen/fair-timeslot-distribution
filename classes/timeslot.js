
/** GLOBALS */

var validDays = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

/** HELPERS */

var getHourComponent = function (mins) {
  return Math.floor(mins / 60);
};

var getMinuteComponent = function (mins) {
  return mins % 60;
};

var getTimeString = function (mins) {
  return getHourComponent(mins) + ":" + getMinuteComponent(mins);
};

/** CLASS DEFINITION */

function Timeslot (day, startHour, startMin, durationMins) {

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

  this.associatedTutor = null;
  this.associatedParticipant = null;

}

/** PROTOTYPE */

Timeslot.prototype = {

  assignTutor: function (tutor) {
    if (this.hasTutor()) {
      throw "Cannot assign tutor to " + this.toString(true) + ". " + this.associatedTutor.toString(true) + " already assigned.";
    }
    this.associatedTutor = tutor;
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