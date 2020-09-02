/*
    @author Trevor Wilkins
    @editor Justin Henke

    System for loading search results into an array to be displayed to the screen by postInserter.js and postLoader.js
*/




// stores an array of search results from the previously set cookie
var results = $.cookie("results");
var search = $.cookie('searchCompleted');

if(search != 'true') {
    window.location.href = 'index.html'
}
// Removes the cookie after its data is saved in the array.
$.removeCookie("results");
$.removeCookie("searchCompleted");
// Checks that the results array is not empty
if (!results == "") {
    var docArray = results.split(",");
    
    //Loading the posts
    for (let i = 0; i < 10 || i < docArray.length; i++) {
        loadPost(docArray)
    }
}


//Let user know search yielded no results
else {
    var noResults = document.createElement("p");
    noResults.classList.add("no-results");
    noResults.textContent = "No results found :(";
    document.getElementById("post-feed").appendChild(noResults);
}
