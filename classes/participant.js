function Participant (name, timeslotPriorityList) {

  if (typeof(name) !== "string") {
    throw "Failed to init Participant. Name must be a string.";
  }
  this.name = name;

  this.timeslotPriorityList = timeslotPriorityList;
  var prio = 1;
  while (prio < 6) {
    this.timeslotPriorityList[prio-1].addParticipantCandidate(this, prio.toString());
    prio++;
  }
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
  },

  toString: function (short) {
    var string = "PARTICIPANT ".red;
    if (short) {
      string += "[ name: \"" + this.name + "\" ]";
    } else {
      if (!this.timeslot) {
        string += "[ name: \"" + this.name + "\" no-timeslot ]";
      } else {
        var priorityOfAssignedTimeslot = this.timeslotPriorityList.indexOf(this.timeslot);
        var prioEvaluationString = "";
        switch (priorityOfAssignedTimeslot) {
          case 0: prioEvaluationString = "This was Prio 1".green; break;
          case 1: prioEvaluationString = "This was Prio 2".yellow; break;
          case 2: prioEvaluationString = "This was Prio 3".yellow; break;
          case 3: prioEvaluationString = "This was Prio 4".magenta; break;
          case 4: prioEvaluationString = "This was Prio 5".magenta; break;
          default: prioEvaluationString = "This was not on the priority list".red;
        }
        string += "[ name: \"" + this.name + "\" " + this.timeslot.toString(true) +
            " - " + prioEvaluationString + " ]";
      }
    }
    return string;
  }

};

module.exports = Participant;