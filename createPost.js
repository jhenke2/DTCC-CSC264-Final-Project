/*
   @author Justin Henke
   @editor Trevor Wilkins

   JS file for controlling the creation of a post from the post creation page.

*/



document.addEventListener('DOMContentLoaded', function () {
   const btnNewPost = document.getElementById('create-post');
   const btnReturn = document.getElementById('return-home');

   var d = new Date();
   var i = 0;

   const form = document.querySelector('#createPostForm');


   //Event listener for submission of the post creation form
   document.getElementById('createPostForm').addEventListener('submit', e => {
      e.preventDefault();
      var ymd = form.dateAsked.value.split('-');
      var convertedDateAsked = new Date(ymd[0], ymd[1] - 1, ymd[2]);

      var inputTags = $('#tags-id').val().split(",");
      if (inputTags.length == 1)
         inputTags = $('#tags-id').val().split(" ");
      else {
         for (var i = 0; i < inputTags.length; i++)
            if (inputTags[i].charAt(0) == ' ') {
               inputTags[i] = inputTags[i].substring(1, inputTags[i].length);
            }
      }
      //Eliminates redundant tags
      var uniqueTags = inputTags.filter((c, index) => {
         return inputTags.indexOf(c) === index;
     });

     
     //Arrays for storing user profiles that have rated the post
      var temp = [];
      var tempDown = [];

      temp[0] = auth.currentUser.email;
      // Testing whether the post if validly formatted
      // If valid, post is submitted to the database and user is redirected to the top posts page.
      if (form.company.value != "" && convertedDateAsked != 'Invalid Date' && form.jobTitle.value != "" && inputTags != "") {
         db.collection('questions').add({
            company: form.company.value,
            dateAsked: convertedDateAsked,
            datePosted: d,
            jobTitle: form.jobTitle.value,
            question: form.question.value,
            netRating: 1,
            ratedUp: temp,
            ratedDown: tempDown,
            tags: uniqueTags,
            username: auth.currentUser.email

         }).then(event => {
            window.location.href = './top-posts.html';
         });

         
      } else {
         // With animations, alerts user which fields need correction
         console.log(document.getElementsByName('company')[0]);
         if (form.company.value == "")
            shake('company');
         if (form.dateAsked.value == "")
            shake('dateAsked');
         if (form.jobTitle.value == "")
            shake('jobTitle');
         if (form.tags.value == "")
            shake('tags');
         if (form.question.value == "")
            shake('question');
      }
   });
   //Returns user to the top posts page
   btnReturn.addEventListener('click', e => {
      window.location.href = "./top-posts.html";
   });

});

// Function for applying the "shake" animation to a given element
// Used whenever a form text-field holds invalid data
function shake(elementName) {
   var el = document.getElementsByName(elementName)[0];
   
   el.classList.add("shake");
   el.addEventListener("animationend", e => {
      
      el.classList.remove("shake");
   });
}
