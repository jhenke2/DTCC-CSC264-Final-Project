/*
    @author Trevor Wilkins
    @author Justin Henke

    JS file for loading posts upon request.
    Used by all pages that can display posts

*/



// Function for loading posts from an array of post IDs stored elsewhere
// This array of posts could be an array of all posts sorted by rating, or by the posts returned from a search result
function loadPost(docArray){
    
    // Pops the first element from the array so it can be loaded
    var id = docArray.pop();

    // Checks to see if data was recieved from the pop method
    if(id != null){
        var newDoc = db.collection("questions").doc(id);
        newDoc.get().then(function(doc) {
            if (doc.exists) {
                //Initializing the post data
                var tempPost = new Post(doc.id, doc.data().username, doc.data().datePosted, doc.data().question, doc.data().company, doc.data().jobTitle, doc.data().dateAsked, doc.data().netRating, doc.data().tags);
                
                // Calling the function in postInserter that creates the HTML template
                generatePost(tempPost, "post-feed");
            }
        }).catch(function(error) {
            console.log(error.message);
        });
    }
    else {
        // Controls the display of the bottom of the page message.
        // The message will not be seen until no more posts can be loaded.
        document.getElementById("bottom-of-page").classList.remove('d-none');
    }
}

//Function for the create post button
function createPost() {
    window.location.href = "newPost.html";
}


// Bottom of page check. Retrieved from https://gist.github.com/nathansmith/8939548
window.onscroll = function() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;
  
    // Loads up to 5 more posts upon the user reaching the bottom of the page
    if (offset >= height) {
        loadPost(docArray);
        loadPost(docArray);
        loadPost(docArray);
    }
  };
