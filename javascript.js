var config = {
  apiKey: "AIzaSyBXSiCRTjjdGkFOC2xiCCk8U1hTQbz50lw",
  authDomain: "homework7-c3a44.firebaseapp.com",
  databaseURL: "https://homework7-c3a44.firebaseio.com",
  projectId: "homework7-c3a44",
  storageBucket: "homework7-c3a44.appspot.com",
  messagingSenderId: "5674526430"
};
firebase.initializeApp(config);

  var database = firebase.database();

  console.log("this should show up")
// need to grab the frequency from the user input, tried $("#rate-input")
  // var tFrequency = $("#rate-input").val();  
  
  // var firstTime = "03:30";
  // var firstTimeConverted = moment(firstTime, "HH:mm");
  // var currentTime = moment().format("hh:mm");
  // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // var tRemainder = diffTime % tFrequency;
  // console.log("remander", tRemainder);
  // // // Minute Until Train
  // var tMinutesTillTrain = tFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // // // Next Train
  // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //   User input

  var trainName = $("#train-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var tFrequency = $("#rate-input").val();  
  
  var firstTime = $("#first-input").val();
  var firstTimeConverted = moment(firstTime, "HH:mm");
  var currentTime = moment().format("hh:mm");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  console.log("remander", tRemainder);
  // // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  
  var newTrain = {
     name: trainName,
     where: newDestination,
     when: firstTime,
     rate: tMinutesTillTrain,
     mins:tFrequency,
   };

   database.ref().push(newTrain);
   alert("Train added to the schedule");

// // //   // Clears all of the text-boxes
   $("#train-input").val("");
   $("#destination-input").val("");
   $("#first-input").val("");
   $("#rate-input").val("");
 });

 database.ref().on("child_added", function(childSnapshot) {

  // variables that are pulled from the database that are referred to as snapshot
   var trainName = childSnapshot.val().name;
   var newDestination = childSnapshot.val().where;
   var tMinutesTillTrain = childSnapshot.val().rate;
   var tFrequency = childSnapshot.val().mins;
   var firstTime= childSnapshot.val().when;

  
// // New row that will appear in the train schedule table 
   var newRow = $("<tr>").append(
     $("<td>").text(trainName),
     $("<td>").text(newDestination),
     $("<td>").text(tFrequency),
     $("<td>").text(firstTime),
     $("<td>").text(tMinutesTillTrain),
  );
   $("#train-table > tbody").append(newRow);
 
   });

