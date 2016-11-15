require('colors');
var Timeslot = require('./classes/timeslot.js');
var Tutor = require('./classes/tutor.js');
var Participant = require('./classes/participant.js');

var timeslots = [
  new Timeslot("Monday", 8, 15, 90),          //  0
  new Timeslot("Monday", 10, 15, 90),         //  1 Alfred, Christel
  new Timeslot("Monday", 12, 15, 90),         //  2 Alfred, Dieter
  new Timeslot("Monday", 14, 15, 90),         //  3 Christel, Dieter
  new Timeslot("Monday", 16, 15, 90),         //  4
  new Timeslot("Monday", 18, 15, 90),         //  5 Alfred, Christel, Dieter
  new Timeslot("Tuesday", 8, 15, 90),         //  6 Christel, Dieter
  new Timeslot("Tuesday", 10, 15, 90),        //  7 Dieter, Edeltraud
  new Timeslot("Tuesday", 12, 15, 90),        //  8 Alfred, Dieter, Edeltraud
  new Timeslot("Tuesday", 14, 15, 90),        //  9 Alfred, Christel, Dieter
  new Timeslot("Tuesday", 16, 15, 90),        // 10 Christel, Dieter
  new Timeslot("Tuesday", 18, 15, 90),        // 11 Alfred, Edeltraud
  new Timeslot("Wednesday", 8, 15, 90),       // 12 Christel
  new Timeslot("Wednesday", 10, 15, 90),      // 13
  new Timeslot("Wednesday", 12, 15, 90),      // 14 Dieter
  new Timeslot("Wednesday", 14, 15, 90),      // 15 Christel, Edeltraud
  new Timeslot("Wednesday", 16, 15, 90),      // 16 Christel, Barbara, Dieter, Edeltraud
  new Timeslot("Wednesday", 18, 15, 90),      // 17 Alfred, Barbara, Dieter, Edeltraud
  new Timeslot("Thursday", 8, 15, 90),        // 18 Christel, Edeltraud, Franz
  new Timeslot("Thursday", 10, 15, 90),       // 19 Alfred, Barbara, Christel, Dieter, Franz
  new Timeslot("Thursday", 12, 15, 90),       // 20 Barbara, Dieter, Edeltraud, Franz
  new Timeslot("Thursday", 14, 15, 90),       // 21 Barbara, Edeltraud, Franz
  new Timeslot("Thursday", 16, 15, 90),       // 22 Alfred, Barbara, Christel, Dieter, Edeltraud, Franz
  new Timeslot("Thursday", 18, 15, 90),       // 23 Alfred, Barbara, Dieter, Edeltraud, Franz
  new Timeslot("Friday", 8, 15, 90),          // 24 Christel, Edeltraud, Franz
  new Timeslot("Friday", 10, 15, 90),         // 25 Christel, Dieter, Edeltraud, Franz
  new Timeslot("Friday", 12, 15, 90),         // 26 Alfred, Franz
  new Timeslot("Friday", 14, 15, 90),         // 27 Alfred, Dieter, Franz
  new Timeslot("Friday", 16, 15, 90),         // 28 Barbara, Dieter, Franz
  new Timeslot("Friday", 18, 15, 90),         // 29 Barbara, Dieter, Franz
  new Timeslot("Saturday", 8, 15, 90),        // 30 Christel
  new Timeslot("Saturday", 10, 15, 90),       // 31 Christel, Edeltraud
  new Timeslot("Saturday", 12, 15, 90),       // 32 Christel, Edeltraud
  new Timeslot("Saturday", 14, 15, 90),       // 33
  new Timeslot("Saturday", 16, 15, 90),       // 34 Dieter
  new Timeslot("Saturday", 18, 15, 90)        // 35 Dieter
];

var tutors = [
  new Tutor("Alfred", [1,2,5,8,9,11,17,19,22,23,26,27]),
  new Tutor("Barbara", [16,17,19,20,21,22,23,28,29]),
  new Tutor("Christel", [1,3,5,6,9,10,12,15,16,18,19,22,24,25,30,31,32]),
  new Tutor("Dieter", [2,3,5,6,7,8,9,10,14,16,17,19,20,22,23,25,27,28,29,34,35]),
  new Tutor("Edeltraud", [7,8,11,15,16,17,18,20,21,22,23,24,25,31,32]),
  new Tutor("Franz", [18,19,20,21,22,23,24,25,26,27,28,29])
];

var participants = [
  new Participant("Gruppe 01"),
  new Participant("Gruppe 02"),
  new Participant("Gruppe 03"),
  new Participant("Gruppe 04"),
  new Participant("Gruppe 05"),
  new Participant("Gruppe 06"),
  new Participant("Gruppe 07"),
  new Participant("Gruppe 08"),
  new Participant("Gruppe 09"),
  new Participant("Gruppe 10"),
  new Participant("Gruppe 11"),
  new Participant("Gruppe 12"),
  new Participant("Gruppe 13"),
  new Participant("Gruppe 14"),
  new Participant("Gruppe 15"),
  new Participant("Gruppe 16"),
  new Participant("Gruppe 17"),
  new Participant("Gruppe 18"),
  new Participant("Gruppe 19"),
  new Participant("Gruppe 20"),
  new Participant("Gruppe 21"),
  new Participant("Gruppe 22"),
  new Participant("Gruppe 23"),
  new Participant("Gruppe 24"),
  new Participant("Gruppe 25"),
  new Participant("Gruppe 26")
];

function assignTutorFromCandidates (timeslot) {
  if (!timeslot.hasTutor() && timeslot.tutorCandidates.length !== 0) {
    var candidatesWithCapacity = [];
    var rarestAppointedCandidate = timeslot.tutorCandidates[0];
    for (var i=0; i<timeslot.tutorCandidates.length; i++) {
      var curCandidate = timeslot.tutorCandidates[i];
      if (curCandidate.lessThanIdealNumberOfTimeslotsAssigned()) {
        candidatesWithCapacity[candidatesWithCapacity.length] = curCandidate;
      }
      if (curCandidate.numberOfTimeslotsAssigned < rarestAppointedCandidate.numberOfTimeslotsAssigned) {
        rarestAppointedCandidate = curCandidate;
      }
    }
    var chosenTutor = null;
    if (candidatesWithCapacity.length === 0) {
      chosenTutor = rarestAppointedCandidate;
    } else {
      var randomIndex = Math.floor((Math.random() * candidatesWithCapacity.length));
      chosenTutor = candidatesWithCapacity[randomIndex];
    }
    timeslot.assignTutor(chosenTutor);
    chosenTutor.assignTimeslot(timeslot);
  }
}

for (var i=0; i<tutors.length; i++) {
  var curTutor = tutors[i];
  for (var j=0; j<curTutor.possibleTimeslots.length; j++) {
    var curSlotIndex = curTutor.possibleTimeslots[j];
    timeslots[curSlotIndex].addTutorCandidate(tutors[i]);
  }
}

var numberOfTutorTimeslotSuggestions = 0;
for (var k=0; k<tutors.length; k++) {
  numberOfTutorTimeslotSuggestions += tutors[k].possibleTimeslots.length;
}
for (var l=0; l<tutors.length; l++) {
  curTutor = tutors[l];
  var percent = curTutor.possibleTimeslots.length / numberOfTutorTimeslotSuggestions;
  curTutor.percentageOfTimeslotSuggestions = percent;
  //curTutor.idealNumberOfTimeslots = Math.ceil(timeslots.length * percent);
  curTutor.idealNumberOfTimeslots = Math.floor(timeslots.length / tutors.length);
}

for (var m=0; m<timeslots.length; m++) {
  var curTimeslot = timeslots[m];
  if (curTimeslot.tutorCandidates.length === 1) {
    var chosenTutor = curTimeslot.tutorCandidates[0];
    curTimeslot.assignTutor(chosenTutor);
    chosenTutor.assignTimeslot(curTimeslot);
  }
}

for (var n=timeslots.length-1; n>=0; n--) {
  assignTutorFromCandidates(timeslots[n]);
}

for (var o=0; o<timeslots.length; o++) {
  console.log(timeslots[o].toString());
}

for (var p=0; p<tutors.length; p++) {
  console.log(tutors[p].toString());
}