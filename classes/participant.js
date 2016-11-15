function Participant (name) {

  if (typeof(name) !== "string") {
    throw "Failed to init Participant. Name must be a string.";
  }
  this.name = name;

  this.timeslot = null;

}

Participant.prototype = {

  assignTimeslot: function (slot) {
    if (this.timeslot !== null) {
      throw "Cannot assign timeslot to " + this.toString(true) + ". " + this.timeslot.toString(true) + " already assigned.";
    }
    if (!slot.hasTutor()) {
      throw "Cannot assign timeslot to " + this.toString(true) + ". " + slot.toString(true) + " has no tutor.";
    }
    this.timeslot = slot;
    slot.assignParticipant(this);
  },

  toString: function (short) {
    var string = "PARTICIPANT ".red;
    if (short) {
      string += "[ name: \"" + this.name + "\" ]";
    } else {
      if (this.timeslot === null) {
        string += "[ name: \"" + this.name + "\" no-timeslot ]";
      } else {
        string += "[ name: \"" + this.name + "\" " + this.timeslot.toString(true) + " ]";
      }
    }
    return string;
  }

};

module.exports = Participant;