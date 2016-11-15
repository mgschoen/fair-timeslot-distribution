function Tutor (name, possibleTimeslots) {

  if (typeof name != "string") {
    throw "Failed to init Tutor. Name must be a string.";
  }
  this.name = name;
  this.possibleTimeslots = possibleTimeslots;

  this.assignedTimeslots = [];

  this.probabilityOfGettingChosen = null;
  this.compensationFactor = null;
  this.idealNumberOfTimeslots = null;
  this.numberOfTimeslotsAssigned = 0;
}

Tutor.prototype = {

  assignTimeslot: function (slot) {
    this.assignedTimeslots[this.assignedTimeslots.length] = slot;
    this.numberOfTimeslotsAssigned += 1;
  },

  lessThanIdealNumberOfTimeslotsAssigned: function () {
    if (this.numberOfTimeslotsAssigned < this.idealNumberOfTimeslots) {
      return true;
    }
    return false;
  },

  toString: function (short) {
    var string = "TUTOR ".blue;
    if (short) {
      string += "[ name: \"" + this.name + "\" ]";
    } else {
      if (this.assignedTimeslots.length === 0) {
        string += "[ name: \"" + this.name + "\" no-timeslots ]";
      } else {
        string +=
          "probabilityOfGettingChosen: " + this.probabilityOfGettingChosen +
          " idealNumberOfTimeslots: " + this.idealNumberOfTimeslots +
          " actualNumberOfTimeslots: " + this.numberOfTimeslotsAssigned + "\n";
        for (var i=0; i<this.assignedTimeslots.length; i++) {
          string += "  " + this.assignedTimeslots[i].toString(true) + "\n";
        }
        string += "]";
      }
    }
    return string;
  }

};

module.exports = Tutor;