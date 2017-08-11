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
// var database = firebase.database();

console.log('current user', firebase.auth().currentUser);




$(document).ready(function () {
	$('#loginPanel').show();
	$('#createAccountPanel').hide();

	$('#createAcc').on('click', function () {
		event.preventDefault();

		$('#loginPanel').hide();
		$('#createAccountPanel').show();
	});
	$('#createUser').on('click', function () {
		handleSignUp();
	});

	$('#signIn').on('click', function () {

		toggleSignIn();
	});


	var email;
	var password;
	var username;

	/**
		 * Handles the sign in button press.
		 */
	function toggleSignIn() {
		if (firebase.auth().currentUser) {
			// [START signout]
			firebase.auth().signOut();
			console.log("Signed Out")
			// [END signout]
		} else {
			var email = $("[name='eml']").val();
			var password = $("[name='psw']").val();
			if (email.length < 4) {
				alert('Please enter an email address.');
				return;
			}
			if (password.length < 4) {
				alert('Please enter a password.');
				return;
			}
			// Sign in with email and pass.
			// [START authwithemail]
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// [START_EXCLUDE]
				if (errorCode === 'auth/wrong-password') {
					alert('Wrong password.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
				console.log("Signed In");
				// document.getElementById('quickstart-sign-in').disabled = false;
				// [END_EXCLUDE]
			});
			// [END authwithemail]
		}

	}
    /**
     * Handles the sign up button press.
     */
	function handleSignUp() {
		email = $('#inputEmail').val();
		password = $('#inputPassword').val();
		username = $('#inputUserName').val();
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		// Sign in with email and pass.
		// [START createwithemail]
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
			console.log("response", response);
			var user = firebase.auth().currentUser;

			console.log(username);

			user.updateProfile({
				displayName: username
				// photoURL: "https://example.com/jane-q-user/profile.jpg"
			}).then(function () {
				// Update successful.
				console.log('update successful');
				window.location.replace("index.html");
			}).catch(function (error) {
				console.log(error);
				console.log("break");
				// An error happened.
			});

			console.log(firebase.auth().currentUser);
		}, function (errorResponse) {
			console.log('errorResponse', errorResponse);
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode == 'auth/weak-password') {
				alert('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			console.log("Didn't Make account");
			// [END_EXCLUDE]
		});

		
	}
    /**
     * Sends an email verification to the user.
     */
	function sendEmailVerification() {
		// [START sendemailverification]
		firebase.auth().currentUser.sendEmailVerification().then(function () {
			// Email Verification sent!
			// [START_EXCLUDE]
			alert('Email Verification Sent!');
			// [END_EXCLUDE]
		});
		// [END sendemailverification]
	}
	function sendPasswordReset() {
		email = $('#inputEmail').val();
		// [START sendpasswordemail]
		firebase.auth().sendPasswordResetEmail(email).then(function () {
			// Password Reset Email Sent!
			// [START_EXCLUDE]
			alert('Password Reset Email Sent!');
			// [END_EXCLUDE]
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode == 'auth/invalid-email') {
				alert(errorMessage);
			} else if (errorCode == 'auth/user-not-found') {
				alert(errorMessage);
			}
			console.log(error);
			// [END_EXCLUDE]
		});
		// [END sendpasswordemail];
	}
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
	function initApp() {
		// Listening for auth state changes.
		// [START authstatelistener]

		firebase.auth().onAuthStateChanged(function (user) {

			console.log(user);
			if (user) {
				// User is signed in.
				nameUser = user.displayName;
				userEmail = user.email;
				emailVerified = user.emailVerified;
				photoURL = user.photoURL;
				isAnonymous = user.isAnonymous;
				uid = user.uid;
				providerData = user.providerData;

				console.log("Signed In");
				// window.location.replace("index.html");

				// Console.log(JSON.stringify(user, null, '  '));
				// Use the following code if we want to verify emails in the future
				// if (!emailVerified) {
				//   
				// }

			} else {
				// User is signed out.

				console.log('Signed out');

			}

		});

		// [END authstatelistener]
		// document.getElementById('signIn').addEventListener('click', toggleSignIn, false);
		// document.getElementById('createUser').addEventListener('click', handleSignUp, false);
		// document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
		// document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
	}

	initApp();


});

