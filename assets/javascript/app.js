
// Initialize Firebase ---------------------------------------
var config = {
  apiKey: "AIzaSyBYe_ju295Nrb_OiL-P28nxg8aN4HUiQYk",
  authDomain: "nudge-f8a04.firebaseapp.com",
  databaseURL: "https://nudge-f8a04.firebaseio.com",
  projectId: "nudge-f8a04",
  storageBucket: "",
  messagingSenderId: "146504874181"
};
firebase.initializeApp(config);
// Firebase ---------------------------------------------------

// Get users Email and Password from the input fields on Login Screen
  //Check to see if they are in the database
    // Not in Database run

      // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // ...
      // });
      //Prompt for Username and push to database as well as Email and Password
      //update signed in status
      //Take user to App page


    // If user does Exist

      // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // ...
      // });
      //update signed in status
      //Take user to App page

//When window closes run to log them out. 
  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });



var signOut = function(){

return "Signing Out";
  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });

}