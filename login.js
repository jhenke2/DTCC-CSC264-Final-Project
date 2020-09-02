/*
   @author Justin Henke
   @editor Trevor Wilkins


   JS file for controlling login on Landing Page through Firebase.


*/

// Controls initial display of landing page.
function loadSignUpForm() {
   document.getElementById('load-sign-up-button').classList.add('d-none');
   document.getElementById('sign-up-fields').classList.remove('d-none');
   document.getElementById('sign-up-text').classList.add('d-none');
}


document.addEventListener('DOMContentLoaded', function () {
   const btnLogin = document.getElementById('log-in-block')
   const btnLoadSignUp = document.getElementById('load-sign-up-button');
   const btnSignup = document.getElementById('sign-up-block');


   // Assigning functionality to each button on the landing page
   btnLoadSignUp.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo(0,document.body.scrollHeight);
      loadSignUpForm();
   });
   btnLogin.addEventListener('submit', e => {
      e.preventDefault();
      login();
   });

   btnSignup.addEventListener('submit', e => {
      e.preventDefault();
      signUp();
   });


   const form = document.querySelector('#occupation');


   // Function for signing up new users
   function signUp() {
      const email = $('#newEmail').val();
      const password = $('#confPassword').val();
      if (password == $('#newPassword').val() && $('#occupation').val() != "") {
         const promise = auth.createUserWithEmailAndPassword(email, password);

         promise.then(e => {
            var defaultImg = "resources/images/defaultImg.png";
            db.collection('users').doc(email).set({
               occupation: $('#occupation').val(),
               profileImg: defaultImg
            }).then(e => {
               window.href = 'top-posts.html';
            });

         }).catch(e => {
            if (e.code == 'auth/email-already-in-use') {
               document.getElementById('sign-up-alert-message').innerHTML = '<strong>Error:</strong> Specified Email already in use';

               document.getElementById('sign-up-alert').classList.remove('d-none');
               shake('newEmail');
               $('#newEmail').val('');
               document.getElementById("newEmail").focus();
               
            }
            else {
               document.getElementById('sign-up-alert-message').innerHTML = '<strong>Error:</strong>' + " " + e.message;
               document.getElementById('sign-up-alert').classList.remove('d-none');
               console.log(e.code);
               
            }
         });
         
      } if (password != $('#newPassword').val() || (password == "" && $('#newPassword').val() == "")) {
         document.getElementById('sign-up-alert-message').innerHTML = '<strong>Error:</strong> Passwords do not match';
         document.getElementById('sign-up-alert').classList.remove('d-none');
         $('#confPassword').val('');
         $('#newPassword').val('');
         shake('confPassword');
         shake('newPassword');
         document.getElementById("newPassword").focus();
         
      } if ($('#occupation').val() == "") {
         document.getElementById('sign-up-alert-message').innerHTML = '<strong>Error:</strong> Please enter an occupation';
         document.getElementById('sign-up-alert').classList.remove('d-none');
         shake('occupation');
         document.getElementById("occupation").focus();
         
      } if ($('#newEmail').val() == "") {

         document.getElementById("newEmail").focus();
         shake('newEmail');
         
      }
   }

   // Check for login state change on the Login page so that users are redirected upon logging in
   auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {

         currentUser = auth.firebaseUser;
         window.location.href = 'top-posts.html';
      }
      else {
         console.log('not logged in');
         console.log('no user!');


      }
   });


});

// Called when Log-in button is clicked. Credentials are validated automatically.
function login() {

   const email = $('#email').val();
   const password = $('#password').val();


   const promise = firebase.auth().signInWithEmailAndPassword(email.trim(), password);

   promise.catch(e => {
      console.log(e.code);
      if (e.code == 'auth/user-not-found') {
         shake('email');
         shake('password');
         document.getElementById('alertMessage').innerHTML = '<strong>Error:</strong> Account ' + email + ' does not exist';
         document.getElementById('alert').classList.remove('d-none');
         $('input').val('');
         document.getElementById("email").focus();
         
      }
      else if (e.code == 'auth/wrong-password') {
         shake('password');
         document.getElementById('alertMessage').innerHTML = '<strong>Error:</strong> Incorrect Password';
         document.getElementById('alert').classList.remove('d-none');
         $('#password').val("");
         document.getElementById("password").focus();
         

      }
   });
}

// Function for applying the shake animation to a given element
// Used for text-field input validation response
function shake(elementId) {
   var element = document.getElementById(elementId);
   element.classList.add('shake');
   element.addEventListener('animationend', e => {
      element.classList.remove('shake');
   });
   element = document.getElementById('alert');
   element.classList.add('shake');
   element.addEventListener('animationend', e => {
      element.classList.remove('shake');
   });

   element = document.getElementById('sign-up-alert');
   element.classList.add('shake');
   element.addEventListener('animationend', e => {
      element.classList.remove('shake');
   });
   
   
}
