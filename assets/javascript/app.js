
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBV3ktLWTPPn8UQuwQc2IBGwcuvWF5ucxc",
  authDomain: "nudge-b7693.firebaseapp.com",
  databaseURL: "https://nudge-b7693.firebaseio.com",
  projectId: "nudge-b7693",
  storageBucket: "nudge-b7693.appspot.com",
  messagingSenderId: "462399864398"
};
firebase.initializeApp(config);
var database = firebase.database();

// console.log('current user', firebase.auth().currentUser);
// Firebase ---------------------------------------------------
//signed in user variables
var nameUser;
var emailUser;
var verifiedUser;
var photoUser;
var isAnonymousUser;
var uidUser;
var providerDataUser;


firebase.auth().onAuthStateChanged(function (user) {
  // [START_EXCLUDE silent]
  // document.getElementById('quickstart-verify-email').disabled = true;
  // [END_EXCLUDE]
  console.log(user);
  if (user) {

    // nameUser = user.email.substr(0, user.email.indexOf('@')); 
    nameUser = user.displayName;
    emailUser = user.email;
    emailVerified = user.emailVerified;
    photoURL = user.photoURL;
    isAnonymous = user.isAnonymous;
    uid = user.uid;
    providerData = user.providerData;

// var user = firebase.auth().currentUser;  

    // User is signed in.
    console.log("Signed In");

  } else {
    // User is signed out.

    console.log('Signed out');

  }

});

var signOut = function () {

  return "Signing Out";
  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });

}

function nudgeButton() {

  event.preventDefault();

  var msgValue = $('#msg-input').val();

  if(msgValue.charAt()[0]=== "@"){
    function weatherAPI() {

    var s = msgValue;


    var rgxWeather = /(@weather\(.+\))+/gi;

    if (rgxWeather.test(s)) {
      // cut string after 9 characters
      var match = s.match(rgxWeather)[0].slice(9);

// cut the last character off the string to just show the word
      var keyword = match.slice(0, match.length -1);

      keyword.split(' ').join('+');
      console.log(keyword);
    }
    // Adding in the Weather API:
    weatherKey = "287114569e933aa0303d709cf76cf42d";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + keyword + "&units=imperial&APPID=" + weatherKey;

		// Creating an AJAX call for the weather. 
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);
      msgValue = ("The temperature in " + keyword + " is " + response.main.temp + " " + String.fromCharCode(176) + "f");
      
      database.ref('Messages').push({

      text: msgValue,
      sender: nameUser

    });
		})
  };
  } else {
    database.ref('Messages').push({

    text: msgValue,
    sender: nameUser

    });
  }


  // Clear the text from the user's input field. 
  $("#msg-input").val("");

  function gifAPI() {
    var s = msgValue;

    var rgxGif = /(@gif\(.+\))+/gi;

    if (rgxGif.test(s)) {
      // cut string after 6 characters
      var match = s.match(rgxGif)[0].slice(5);

      // cut the last chbaracter off the string to just show the word
      var keyword = match.slice(0, match.length - 1);

      keyword.split(' ').join('+');
      console.log(keyword);
    }
    // console.log(match);
  };

  gifAPI();
  weatherAPI();

}

$("#signoutBtn").on("click", function(){
  console.log("clicked");
  firebase.auth().signOut();
  window.location.replace("signin.html");
});
// Uses regex to get the value of keywords for API's
$('#btn-nudge').on('click', nudgeButton);

$("#msg-input").on('keyup', function (e) {
  if (e.keyCode === 13) {
    nudgeButton();
  }
});

database.ref('Messages').on('child_added', function (snapshot) {
  var message = snapshot.val();
  addMessage(message);

});

function addMessage(messageObject) {
  // console.log(messageObject);
  var msgWrapper = $('<div>');
  msgWrapper.addClass('whole-message');
  var msgSender = $('<div>');
  msgSender.addClass('sender-message');
  msgSender.html(messageObject.sender);
  console.log(messageObject.sender);
  var msgContent = $('<div>');
  msgContent.addClass('content-message');
  msgContent.html(messageObject.text);
  console.log(messageObject.text);
  msgWrapper.html(msgSender);
  msgWrapper.append(msgContent);
  $('#msg-written').append(msgWrapper);

};

$("#btn-help").on("click", function(){
event.preventDefault();
  $("#helpModal").modal('show');
});

