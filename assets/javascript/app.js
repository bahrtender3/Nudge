
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

console.log('current user', firebase.auth().currentUser);
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

      if (user) {
        nameUser = user.displayName;
        emailUser = user.email;
        emailVerified = user.emailVerified;
        photoURL = user.photoURL;
        isAnonymous = user.isAnonymous;
        uid = user.uid;
        providerData = user.providerData;
      };

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



// Uses regex to get the value of keywords for API's
$('#btn-nudge').on('click', function(){
  event.preventDefault();
  console.log("CLick");

  

  function weatherAPI() {
    var msgValue = $('#msg-input').val();
    var s = msgValue;


    var rgxWeather = /(@weather\(.+\))+/gi;

    if (rgxWeather.test(s)) {
// cut string after 9 characters
      var match = s.match(rgxWeather)[0].slice(9);

// cut the last chbaracter off the string to just show the word
      var keyword = match.slice(0, match.length -1)
      keyword.split(' ').join('+');
      console.log(keyword);

    }


    // console.log(match);
  };

  function gifAPI() {
    var msgValue = $('#msg-input').val();
    var s = msgValue;


    var rgxGif = /(@gif\(.+\))+/gi;

    if (rgxGif.test(s)) {
// cut string after 6 characters
      var match = s.match(rgxGif)[0].slice(5);

// cut the last chbaracter off the string to just show the word
      var keyword = match.slice(0, match.length -1)
      console.log(keyword);
    }


    // console.log(match);
  };

  weatherAPI();
  gifAPI();
});
