require('colors');
var Scenario = require('./classes/scenario.js');

const NUMBER_OF_TIMESLOTS = 72;
const NUMBER_OF_TUTORS = 8;
const NUMBER_OF_GROUPS = 50;
const NUMBER_OF_PRIORITIES_PER_GROUP = 5;

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * D U M M Y   D A T A                             *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

var scenario = new Scenario(
    NUMBER_OF_TIMESLOTS,
    NUMBER_OF_TUTORS,
    NUMBER_OF_GROUPS,
    NUMBER_OF_PRIORITIES_PER_GROUP);
var timeslots = scenario.timeslots;
var tutors = scenario.tutors;
var participants = scenario.groups;

/*var timeslots = [
  new Timeslot("Mon", 8, 15, 90),       //  0
  new Timeslot("Mon", 10, 15, 90),      //  1 Alfred, Christel
  new Timeslot("Mon", 12, 15, 90),      //  2 Alfred, Dieter
  new Timeslot("Mon", 14, 15, 90),      //  3 Christel, Dieter
  new Timeslot("Mon", 16, 15, 90),      //  4
  new Timeslot("Mon", 18, 15, 90),      //  5 Alfred, Christel, Dieter
  new Timeslot("Tue", 8, 15, 90),       //  6 Christel, Dieter
  new Timeslot("Tue", 10, 15, 90),      //  7 Dieter, Edeltraud
  new Timeslot("Tue", 12, 15, 90),      //  8 Alfred, Dieter, Edeltraud
  new Timeslot("Tue", 14, 15, 90),      //  9 Alfred, Christel, Dieter
  new Timeslot("Tue", 16, 15, 90),      // 10 Christel, Dieter
  new Timeslot("Tue", 18, 15, 90),      // 11 Alfred, Edeltraud
  new Timeslot("Wed", 8, 15, 90),       // 12 Christel
  new Timeslot("Wed", 10, 15, 90),      // 13
  new Timeslot("Wed", 12, 15, 90),      // 14 Dieter
  new Timeslot("Wed", 14, 15, 90),      // 15 Christel, Edeltraud
  new Timeslot("Wed", 16, 15, 90),      // 16 Christel, Barbara, Dieter, Edeltraud
  new Timeslot("Wed", 18, 15, 90),      // 17 Alfred, Barbara, Dieter, Edeltraud
  new Timeslot("Thu", 8, 15, 90),       // 18 Christel, Edeltraud, Franz
  new Timeslot("Thu", 10, 15, 90),      // 19 Alfred, Barbara, Christel, Dieter, Franz
  new Timeslot("Thu", 12, 15, 90),      // 20 Barbara, Dieter, Edeltraud, Franz
  new Timeslot("Thu", 14, 15, 90),      // 21 Barbara, Edeltraud, Franz
  new Timeslot("Thu", 16, 15, 90),      // 22 Alfred, Barbara, Christel, Dieter, Edeltraud, Franz
  new Timeslot("Thu", 18, 15, 90),      // 23 Alfred, Barbara, Dieter, Edeltraud, Franz
  new Timeslot("Fri", 8, 15, 90),       // 24 Christel, Edeltraud, Franz
  new Timeslot("Fri", 10, 15, 90),      // 25 Christel, Dieter, Edeltraud, Franz
  new Timeslot("Fri", 12, 15, 90),      // 26 Alfred, Franz
  new Timeslot("Fri", 14, 15, 90),      // 27 Alfred, Dieter, Franz
  new Timeslot("Fri", 16, 15, 90),      // 28 Barbara, Dieter, Franz
  new Timeslot("Fri", 18, 15, 90),      // 29 Barbara, Dieter, Franz
  new Timeslot("Sat", 8, 15, 90),       // 30 Christel
  new Timeslot("Sat", 10, 15, 90),      // 31 Christel, Edeltraud
  new Timeslot("Sat", 12, 15, 90),      // 32 Christel, Edeltraud
  new Timeslot("Sat", 14, 15, 90),      // 33
  new Timeslot("Sat", 16, 15, 90),      // 34 Dieter
  new Timeslot("Sat", 18, 15, 90)       // 35 Dieter
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
  new Participant("Gruppe 01", [timeslots[14],timeslots[3],timeslots[4],timeslots[32],timeslots[28]]),
  new Participant("Gruppe 02", [timeslots[5],timeslots[7],timeslots[21],timeslots[20],timeslots[27]]),
  new Participant("Gruppe 03", [timeslots[15],timeslots[32],timeslots[35],timeslots[21],timeslots[1]]),
  new Participant("Gruppe 04", [timeslots[4],timeslots[2],timeslots[14],timeslots[15],timeslots[25]]),
  new Participant("Gruppe 05", [timeslots[13],timeslots[27],timeslots[28],timeslots[19],timeslots[8]]),
  new Participant("Gruppe 06", [timeslots[25],timeslots[20],timeslots[19],timeslots[6],timeslots[0]]),
  new Participant("Gruppe 07", [timeslots[16],timeslots[14],timeslots[15],timeslots[21],timeslots[22]]),
  new Participant("Gruppe 08", [timeslots[9],timeslots[3],timeslots[31],timeslots[32],timeslots[33]]),
  new Participant("Gruppe 09", [timeslots[14],timeslots[29],timeslots[20],timeslots[21],timeslots[8]]),
  new Participant("Gruppe 10", [timeslots[22],timeslots[13],timeslots[8],timeslots[9],timeslots[3]]),
  new Participant("Gruppe 11", [timeslots[16],timeslots[2],timeslots[18],timeslots[4],timeslots[9]]),
  new Participant("Gruppe 12", [timeslots[15],timeslots[33],timeslots[34],timeslots[25],timeslots[26]]),
  new Participant("Gruppe 13", [timeslots[15],timeslots[20],timeslots[28],timeslots[10],timeslots[7]]),
  new Participant("Gruppe 14", [timeslots[23],timeslots[22],timeslots[13],timeslots[3],timeslots[4]]),
  new Participant("Gruppe 15", [timeslots[14],timeslots[15],timeslots[29],timeslots[35],timeslots[9]]),
  new Participant("Gruppe 16", [timeslots[19],timeslots[25],timeslots[21],timeslots[14],timeslots[15]]),
  new Participant("Gruppe 17", [timeslots[8],timeslots[15],timeslots[13],timeslots[22],timeslots[28]]),
  new Participant("Gruppe 18", [timeslots[15],timeslots[9],timeslots[8],timeslots[3],timeslots[1]]),
  new Participant("Gruppe 19", [timeslots[21],timeslots[19],timeslots[13],timeslots[26],timeslots[32]]),
  new Participant("Gruppe 20", [timeslots[16],timeslots[22],timeslots[17],timeslots[27],timeslots[28]]),
  new Participant("Gruppe 21", [timeslots[14],timeslots[12],timeslots[13],timeslots[10],timeslots[11]]),
  new Participant("Gruppe 22", [timeslots[9],timeslots[15],timeslots[18],timeslots[23],timeslots[26]]),
  new Participant("Gruppe 23", [timeslots[17],timeslots[23],timeslots[5],timeslots[29],timeslots[35]]),
  new Participant("Gruppe 24", [timeslots[21],timeslots[22],timeslots[15],timeslots[14],timeslots[7]]),
  new Participant("Gruppe 25", [timeslots[14],timeslots[27],timeslots[26],timeslots[28],timeslots[0]]),
  new Participant("Gruppe 26", [timeslots[15],timeslots[8],timeslots[10],timeslots[33],timeslots[18]])
];*/

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * H E L P E R S                                   *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * T U T O R S                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

function assignTutorFromCandidates (timeslot) {
  if (!timeslot.hasTutor() && timeslot.tutorCandidates.length > 0) {

    var tutorCandidates = timeslot.tutorCandidates;

    var candidatesWithCapacity = [];
    var rarestAppointedCandidate = tutorCandidates[0];
    for (var i=0; i<tutorCandidates.length; i++) {
      var curCandidate = tutorCandidates[i];
      if (curCandidate.lessThanIdealNumberOfTimeslotsAssigned()) {
        candidatesWithCapacity.push(curCandidate);
      }
      if (curCandidate.numberOfTimeslotsAssigned < rarestAppointedCandidate.numberOfTimeslotsAssigned) {
        rarestAppointedCandidate = curCandidate;
      }
    }

    var chosenTutor = null;

    if (candidatesWithCapacity.length === 0) {
      chosenTutor = rarestAppointedCandidate;
    } else {
      // Create a set in which every candidate occurs as many times as needed to compensate
      // the difference in probability to the highest probable candidate
      var compensatedSetOfCandidates = [];
      for (i=0; i<candidatesWithCapacity.length; i++) {
        for (var j=0; j<candidatesWithCapacity[i].compensationFactor; j++) {
          compensatedSetOfCandidates.push(candidatesWithCapacity[i]);
        }
      }
      shuffle(compensatedSetOfCandidates);

      // Choose randomly from the compensated set
      var randomIndex = Math.floor((Math.random() * compensatedSetOfCandidates.length));
      chosenTutor = compensatedSetOfCandidates[randomIndex];
    }
    timeslot.assignTutor(chosenTutor);
    try {
      chosenTutor.assignTimeslot(timeslot);
    } catch (error) {
      console.log("wtf");
    }
  }
}

// Gather tutor candidates for each timeslot
for (var i=0; i<tutors.length; i++) {
  var curTutor = tutors[i];
  for (var j=0; j<curTutor.possibleTimeslots.length; j++) {
    var curSlotIndex = curTutor.possibleTimeslots[j];
    timeslots[curSlotIndex].addTutorCandidate(tutors[i]);
  }
}

// calculate average probability of getting chosen for each candidate
var candidateProbabilities = {};
var averageProbabilites = {};
for (i=0; i<tutors.length; i++) {
  candidateProbabilities[tutors[i].name] = [];
}
for (i=0; i<timeslots.length; i++) {
  var curTimeslot = timeslots[i];
  var probability = 1 / curTimeslot.tutorCandidates.length;
  for (j=0; j<curTimeslot.tutorCandidates.length; j++) {
    var curCandidate = curTimeslot.tutorCandidates[j];
    candidateProbabilities[curCandidate.name].push(probability);
  }
}
for (var name in candidateProbabilities) {
  if (candidateProbabilities.hasOwnProperty(name)) {
    var probabilitiesSum = 0;
    for (i=0; i<candidateProbabilities[name].length; i++) {
      probabilitiesSum += candidateProbabilities[name][i];
    }
    var average = probabilitiesSum / candidateProbabilities[name].length;
    averageProbabilites[name] = average;
  }
}
var averageSum = 0;
for (i=0; i<tutors.length; i++) {
  var curAverage = averageProbabilites[tutors[i].name];
  tutors[i].probabilityOfGettingChosen = curAverage;
  averageSum += curAverage;
  tutors[i].idealNumberOfTimeslots = Math.floor(timeslots.length / tutors.length);
}

// Mirror probabilities along average of averages: Least probable will be
// most probable and vice versa
var averageOfAverages = averageSum / tutors.length;
var invertedProbabilities = {};
for (name in averageProbabilites) {
  if (averageProbabilites.hasOwnProperty(name)) {
    var diff = averageOfAverages - averageProbabilites[name];
    invertedProbabilities[name] = averageOfAverages + diff;
  }
}

// For each tutor calculate the factor that will raise (or lower) its probability of being chosen
// to match the inverted probability calculated above
for (i=0; i<tutors.length; i++) {
  tutors[i].compensationFactor =
    Math.round((invertedProbabilities[tutors[i].name] / tutors[i].probabilityOfGettingChosen) * 10);
}

// Assign all slots with only one candidate first
for (i=0; i<timeslots.length; i++) {
  curTimeslot = timeslots[i];
  if (curTimeslot.tutorCandidates.length === 1) {
    var chosenTutor = curTimeslot.tutorCandidates[0];
    curTimeslot.assignTutor(chosenTutor);
    chosenTutor.assignTimeslot(curTimeslot);
  }
}

// Assign all remaining slots
for (i=0; i<timeslots.length; i++) {
  assignTutorFromCandidates(timeslots[i]);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * S T U D E N T S                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

function assignRandomParticipantToTimeslot (timeslot, listOfParticipants) {
  var randomIndex = Math.floor((Math.random() * listOfParticipants.length));
  var chosenParticipant = listOfParticipants[randomIndex];
  timeslot.assignParticipant(chosenParticipant);
  chosenParticipant.assignTimeslot(timeslot);
  return chosenParticipant;
}

var remainingParticipants = participants.slice();

// Prio 1
timeslots.forEach(function(timeslot){
  if (timeslot.hasTutor()) {
    var prioOneCandidates = timeslot.participantCandidatesPrioritized['1'];
    if (prioOneCandidates.length > 0) {
      var chosenParticipant = assignRandomParticipantToTimeslot(timeslot, prioOneCandidates);
      var indexOfChosenParticipant = remainingParticipants.indexOf(chosenParticipant);
      remainingParticipants.splice(indexOfChosenParticipant, 1);
    }
  }
});

// Prio 2-5
var prio = 2;

while (prio < (NUMBER_OF_PRIORITIES_PER_GROUP + 1)) {

  timeslots.forEach(function(timeslot){

    if (timeslot.hasTutor() && !timeslot.hasParticipant()) {

      // Filter candidates of current prio for participants without a group
      var candidatesForCurrentPrio = [];
      timeslot.participantCandidatesPrioritized[prio.toString()].forEach(function(item){
        if(remainingParticipants.indexOf(item) >= 0) {
          candidatesForCurrentPrio.push(item);
        }
      });

      // Assign candidate if possible
      if (candidatesForCurrentPrio.length > 0) {
        var chosenParticipant = assignRandomParticipantToTimeslot(timeslot, candidatesForCurrentPrio);
        var indexOfChosenParticipant = remainingParticipants.indexOf(chosenParticipant);
        remainingParticipants.splice(indexOfChosenParticipant, 1);
      }
    }
  });

  prio++;
}

var remainingTimeslots = [];
timeslots.forEach(function(timeslot){
  if (timeslot.hasTutor() && !timeslot.hasParticipant()) {
    remainingTimeslots.push(timeslot);
  }
});

remainingParticipants.forEach(function(participant, index){
  if (remainingTimeslots[index]) {
    participant.assignTimeslot(remainingTimeslots[index]);
    remainingTimeslots[index].assignParticipant(participant);
  }
});

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * D E B U G G I N G                               *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

timeslots.forEach(function(timeslot){
  console.log(timeslot.toString());
});

tutors.forEach(function(tutor){
  console.log(tutor.toString());
});

participants.forEach(function(participant){
  console.log(participant.toString());
});