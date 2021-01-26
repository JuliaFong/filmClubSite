'use strict';

window.addEventListener('load', function () {
//starts an event listener
  //at page load:
  //detects the Sign Out button and performs a firebase sign out if clicked
  //creates the UI configuration specifing:
  //what resource to redirect to in case of a successful login
  //what are the signInOptions, in this case Google and Email
  document.getElementById('sign-out').onclick = function () {
    firebase.auth().signOut().then(function() {
      window.location.href = "/login";
    });
  };

  var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ]
  };
//when the state of authorization changes, store the token in a cookie, or display the login UI
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // when the user is signed in:
      //display the Login info and the Sign Out button changing "hidden" to false
      //print on console Display Name and Email
      //get the IdToken following authentication and save it in a cookie
      document.getElementById('sign-out').hidden = false;
      document.getElementById('login-info').hidden = false;
      console.log(`Signed in as ${user.displayName} (${user.email})`);
      user.getIdToken().then(function (token) {
        //save the token in a cookie 
        document.cookie = "token=" + token;
      });
    } else {
    //if the user is logged out
    //hide both Login info box and Sign Out button changing "hiddent" to true
    //empty the token cookie
      document.getElementById('sign-out').hidden = true;
      document.getElementById('login-info').hidden = true;
      //reset the cookie
      document.cookie = "token=";
    }
  }, function (error) {
  //in case of any error, print it on console and display it in an alert message
    console.log(error);
    alert('Unable to log in: ' + error)
  });
});
