/*
    @author Trevor Wilkins
    @author Justin Henke


    JS file used for generating posts with HTML consistent format so they can be 
    inserted into any given page.
*/


/* Class structure for a post
    Contains all data fields needed for creating a post
*/
class Post {

    constructor(id, username, datePosted, question, company, jobTitle, dateAsked, netRating, tags) {
        this.id = id;
        this.username = username;
        this.datePosted = datePosted;
        this.question = question;
        this.company = company;
        this.jobTitle = jobTitle;
        this.dateAsked = dateAsked;
        this.netRating = netRating;

        this.tags = tags;
    }

}

// Function for converting UTC timestamp to readable format
function timeConverter(datePosted) {
    return datePosted.toDate().toGMTString().substring(0, datePosted.toDate().toGMTString().indexOf(":") - 3);
}

// Function for loading post objects and displaying them to the requested DIV
function generatePost(postObject, divLocationID) {

    // General Post container. The outermost DIV
    var post = document.createElement("div");
    post.setAttribute('id', (postObject.id + postObject.username));
    post.classList.add("post", postObject.id, "panel");

    //User and date text field
    var userAndDate = document.createElement("p");
    userAndDate.classList.add("user-and-date");
    
    
    if (auth.currentUser.email == postObject.username) {
        userAndDate.textContent = "you posted on " + timeConverter(postObject.datePosted);
        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn-custom', 'btn-delete');
        var xIcon = document.createElement('span');
        xIcon.setAttribute('aria-hidden', 'true');
        xIcon.innerHTML = '&times;';
        deleteBtn.appendChild(xIcon);
        deleteBtn.addEventListener('click', ev => {
            if (window.confirm("Are you sure you want to delete this post?")) {
                db.collection("questions").doc(postObject.id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
                document.getElementById((postObject.id + postObject.username)).remove();
            }
        });
        userAndDate.appendChild(deleteBtn);
    }else {
        userAndDate.textContent = "posted by [" + postObject.username.substring(0, postObject.username.indexOf('@')) + "]" + " on " + timeConverter(postObject.datePosted);
    }

    


    // Contains bulk of post content, including rating bar and post box
    var postHolder = document.createElement("div");
    postHolder.classList.add("post-holder");

    // Rating panel contains upvote/downvote functionality and a read-out of the current post rating
    var ratingPanel = document.createElement("div");
    ratingPanel.classList.add("rating-panel");

    var voteUp = document.createElement("i");

    voteUp.classList.add("pointer", 'upvote', "fa-caret-square-up");

    var ratingValue = document.createElement("p");
    ratingValue.setAttribute('id', postObject.id);
    ratingValue.classList.add("rating");
    ratingValue.textContent = postObject.netRating;

    var voteDown = document.createElement("i");

    voteDown.classList.add("pointer", 'dnvote', "fa-caret-square-down");


    //Initializes event listeners for the voting buttons
    initializeRatingListeners(postObject, voteUp, voteDown);


    //Initial loading of the post arrows
    let docRef = db.collection('questions').doc(postObject.id);
    let getDoc = docRef.get()
        .then(post => {
            //If user has post rated up, increase size of up vote and make button solid
            if (post.data().ratedUp.includes(auth.currentUser.email)) {
                voteUp.classList.add('fas');
                voteDown.classList.add('far');
                voteUp.style = 'text-align: center; font-size: 2.5em; padding-top: 3px';
                voteDown.style = 'text-align: center; font-size: 2em';
            }
            //If user has post rated down, increase size of down vote and make button solid
            else if (post.data().ratedDown.includes(auth.currentUser.email)) {
                voteDown.classList.add('fas');
                voteUp.classList.add('far');
                voteDown.style = 'text-align: center; font-size: 2.5em';
                voteUp.style = 'text-align: center; font-size: 2em;padding-top: 10px';

            }
            //If user is neutral
            else {
                voteUp.classList.add('far');
                voteDown.classList.add('far');
                voteDown.style = 'text-align: center; font-size: 2em';
                voteUp.style = 'text-align: center; font-size: 2em;padding-top: 10px';
            }
        });


    //Inserting content into the rating panel
    ratingPanel.appendChild(voteUp);
    ratingPanel.appendChild(ratingValue);
    ratingPanel.appendChild(voteDown);


    // Post box contains the question, company, job title, and date asked
    var postBox = document.createElement("div");
    postBox.classList.add("post-box");

    var questionValue = document.createElement("h4");
    questionValue.classList.add("question", postObject.id);
    questionValue.textContent = postObject.question;
    //<span aria-hidden="true">&times;</span>
    

    var companyValue = document.createElement("p");
    companyValue.classList.add("company", postObject.id);
    companyValue.textContent = postObject.company;

    var jobTitleValue = document.createElement("p");
    jobTitleValue.classList.add("job-title", postObject.id);
    jobTitleValue.textContent = postObject.jobTitle;

    var dateAskedValue = document.createElement("p");
    dateAskedValue.classList.add("date-asked");
    dateAskedValue.textContent = "asked on " + timeConverter(postObject.dateAsked);

    //Inserting content into the main post box
    postBox.appendChild(questionValue);
    postBox.appendChild(companyValue);
    postBox.appendChild(jobTitleValue);
    postBox.appendChild(dateAskedValue);

    //Inserting the two segments of the post into the general content holder
    postHolder.appendChild(ratingPanel);
    postHolder.appendChild(postBox);


    // Tags are the final section
    var tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tags");

    var tagLabel = document.createElement("span", postObject.id);
    tagLabel.textContent = "Tags: ";
    tagsDiv.appendChild(tagLabel);

    for (let i = 0; i < postObject.tags.length; i++) {
        var tempElement = document.createElement("span");
        tempElement.classList.add("tag");
        tempElement.textContent = postObject.tags[i];
        tagsDiv.appendChild(tempElement);
    }

    //Inserting all 3 sections into the outermost post container
    post.appendChild(userAndDate);
    post.appendChild(postHolder);
    post.appendChild(tagsDiv);


    document.getElementById(divLocationID).appendChild(post);

}


// Helper function that creates event listeners for the rating system
// Adds all functionality to rating system
function initializeRatingListeners(postObject, voteUp, voteDown) {

    //Event listeners to the vote up buttons
    voteUp.addEventListener('click', e => {
        var id = postObject.id.toString();
        let docRef = db.collection('questions').doc(postObject.id);
        let getDoc = docRef.get()
            .then(doc => {
                //If user is curretly downvoting the post
                if (doc.data().ratedDown.includes(auth.currentUser.email)) {
                    var temprd = doc.data().ratedDown;
                    temprd.splice(temprd.indexOf(auth.currentUser.email), 1);

                    tempru = doc.data().ratedUp;
                    tempru.push(auth.currentUser.email);

                    docRef.update({
                        ratedDown: temprd,
                        netRating: tempru.length - temprd.length,
                        ratedUp: tempru
                    });
                    voteDown.classList.remove('fas');
                    voteDown.classList.add('far');
                    voteUp.classList.add('fas');
                    voteDown.style = 'text-align: center; font-size: 2em';
                    voteUp.style = 'text-align: center; font-size: 2.5em; padding-top: 3px';
                    document.getElementById(postObject.id).innerText = tempru.length - temprd.length;
                }
                //If user is neutral on the post
                else if (!doc.data().ratedUp.includes(auth.currentUser.email)) {
                    voteUp.classList.add('fas');
                    voteUp.style = 'text-align: center; font-size: 2.5em; padding-top: 3px';
                    var temp = doc.data().ratedUp;
                    temp.push(auth.currentUser.email);
                    docRef.update({
                        netRating: doc.data().netRating + 1,
                        ratedUp: temp
                    });
                    document.getElementById(postObject.id).innerText = temp.length - doc.data().ratedDown.length;

                }
                //If user currently has the post rated up, return the vote to neutral
                else if (doc.data().ratedUp.includes(auth.currentUser.email)) {
                    var temp = doc.data().ratedUp;
                    temp.splice(temp.indexOf(auth.currentUser.email), 1);
                    docRef.update({
                        netRating: doc.data().netRating - 1,
                        ratedUp: temp
                    });
                    document.getElementById(postObject.id).innerText = doc.data().netRating - 1;
                    voteUp.classList.remove('fas');
                    voteUp.classList.add('far');
                    voteUp.style = 'text-align: center; font-size: 2em; padding-top: 10px';
                }

            })
    });

    //Add functionality to the vote down button
    voteDown.addEventListener('click', e => {
        var id = postObject.id.toString();
        let docRef = db.collection('questions').doc(postObject.id);
        let getDoc = docRef.get()
            .then(doc => {
                //If user has the post currently rated up
                if (doc.data().ratedUp.includes(auth.currentUser.email)) {
                    var tempru = doc.data().ratedUp;
                    tempru.splice(tempru.indexOf(auth.currentUser.email), 1);
                    var temprd = doc.data().ratedDown;
                    temprd.push(auth.currentUser.email);
                    docRef.update({
                        ratedDown: temprd,
                        netRating: tempru.length - temprd.length,
                        ratedUp: tempru
                    });
                    voteUp.classList.remove('fas');
                    voteDown.classList.add('fas');
                    voteUp.classList.add('far');
                    voteDown.style = 'text-align: center; font-size: 2.5em';
                    voteUp.style = 'text-align: center; font-size: 2em;padding-top: 10px';
                    document.getElementById(postObject.id).innerText = tempru.length - temprd.length;

                }
                //If user is neutral
                else if (!doc.data().ratedDown.includes(auth.currentUser.email)) {
                    var temp = doc.data().ratedDown;
                    temp.push(auth.currentUser.email);
                    docRef.update({
                        ratedDown: temp,
                        netRating: doc.data().ratedUp.length - temp.length,
                    });
                    document.getElementById(postObject.id).innerText = doc.data().ratedUp.length - temp.length;

                    voteDown.classList.add('fas');
                    voteDown.style = 'text-align: center; font-size: 2.5em';

                }
                //if user currently has the post rated down (to restore a neutral voting)
                else if (doc.data().ratedDown.includes(auth.currentUser.email)) {
                    var temprd = doc.data().ratedDown;
                    temprd.splice(temprd.indexOf(auth.currentUser.email), 1);
                    docRef.update({
                        ratedDown: temprd,
                        netRating: doc.data().ratedUp.length - temprd.length,
                    });
                    document.getElementById(postObject.id).innerText = doc.data().ratedUp.length - temprd.length;
                    voteDown.classList.remove('fas');
                    voteDown.classList.add('far');
                    voteDown.style = 'text-align: center; font-size: 2em';

                }
            })
    });

}