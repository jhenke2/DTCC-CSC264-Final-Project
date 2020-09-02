/*
    @author Trevor Wilkins
    @editor Justin Henke


    File for loading and displaying top-rated posts in the database.
*/


// Array to store every document ID for documents in firebase
var docArray = [];

// Querying the database to store every post in an array, ascending order.
db.collection("questions").orderBy('netRating', 'asc').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        docArray.push(doc.id);
    });
}).then(event => {
    // The top few posts are loaded
    //Additional post loading is controlled by postLoader.js 's window function.
    for (var i = 0; i < 6 || i < docArray.length; i++) {
        loadPost(docArray);
    }
//Ensuring security by catching permission errors, and returning the user to the Landing Page if not authenticated
}).catch(function (FirebaseError) {
    if (FirebaseError.code == 'permission-denied')
        window.location = 'index.html';
});    
