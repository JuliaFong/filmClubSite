'use strict';

window.addEventListener('load', function () {
//starts an event listener
//at page load, creates the UI configuration specifing:
  //what resource to redirect to in case of a successful login
  //what are the signInOptions, in this case Google and Email
  var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
//when the state of authorization changes, store the token in a cookie, or display the login UI
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // when the user is signed in, print on console Display Name and Email
      //get the IdToken following authentication and save it in a cookie
      console.log(`Signed in as ${user.displayName} (${user.email})`);
      user.getIdToken().then(function (token) {
        //save the token in a cookie  
        document.cookie = "token=" + token;
        window.location.href = "/";
      });
    } else {
      //if the user is logged out, set the UI variable as the Firebase authentication UI
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // Display the Firebase log in UI
      ui.start('#firebaseui-auth-container', uiConfig);
      //resets the cookie
      document.cookie = "token=";
    }
  }, function (error) {
    //in case of any error, print it on console and display it in an alert message
    console.log(error);
    alert('Unable to log in: ' + error)
  });

});
