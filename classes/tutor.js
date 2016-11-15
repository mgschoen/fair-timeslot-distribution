function Tutor (name, possibleTimeslots) {

  if (typeof name != "string") {
    throw "Failed to init Tutor. Name must be a string.";
  }
  this.name = name;
  this.possibleTimeslots = possibleTimeslots;

  this.assignedTimeslots = [];
}

Tutor.prototype = {

  assignTimeslot: function (slot) {
    this.assignedTimeslots[this.assignedTimeslots.length] = slot;
  },

  toString: function (short) {
    var string = "TUTOR ".blue;
    if (short) {
      string += "[ name: \"" + this.name + "\" ]";
    } else {
      if (this.assignedTimeslots.length === 0) {
        string += "[ name: \"" + this.name + "\" no-timeslots ]";
      } else {
        string += "[ name: \"" + this.name + "\"\n";
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