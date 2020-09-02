/*
   @author Justin Henke
   @editor Trevor Wilkins

   Main code for search algorithm.
   Includes both simple search and advanced search algorithms
   These algorithms work independently.
*/

//Stopwords from https://www.ranks.nl/stopwords
const vagueTerms = ["a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected",
   "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among",
   "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately",
   "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes",
   "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol",
   "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing",
   "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed",
   "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody",
   "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly",
   "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h",
   "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself"
   , "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance",
   "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it'd", "it'll", "its", "itself", "i've", "j", "just", "k",
   "keep", "keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked",
   "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile",
   "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd",
   "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless",
   "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted",
   "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own",
   "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp",
   "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re",
   "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting",
   "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves",
   "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly",
   "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere",
   "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest",
   "sup", "sure t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that've", "the", "their", "theirs", "them",
   "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "thereto", "thereupon", "there've",
   "these", "they", "theyd", "they'll", "theyre", "they've", "think", "this", "those", "thou", "though", "thoughh", "thousand", "throug", "through", "throughout", "thru", "thus", "til",
   "tip", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlike",
   "unlikely", "until", "unto", "up", "upon", "ups", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "v", "value", "various", "'ve", "very", "via", "viz",
   "vol", "vols", "vs", "w", "want", "wants", "was", "wasnt", "way", "we", "wed", "welcome", "we'll", "went", "were", "werent", "we've", "what", "whatever", "what'll", "whats", "when", "whence",
   "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole",
   "who'll", "whom", "whomever", "whos", "whose", "why", "widely", "willing", "wish", "with", "within", "without", "wont", "words", "world", "would", "wouldnt", "www", "x", "y", "yes",
   "yet", "you", "youd", "you'll", "your", "youre", "yours", "yourself", "yourselves", "you've", "z", "zero"];



//Array for storing document IDs of all search results
var searchResults = [];
var matchedTerms = [];
var searchBarContent;

// Event listener for determining form submission, and likewise determining which search algorithm to call
document.getElementById('search-box').addEventListener('submit', e => {
   e.preventDefault();

   searchResults = [];
   matchedTerms = [];

   if ($('#search-bar').val() != "") {
      if (document.getElementById('a-search-tab').classList.contains('d-none')) {
         search();
      }
      else {
         advancedSearch();

      }

   }
   else {

      //Implement UX shake to empty fields
      searchFailed("search-box");
   }

});

//Advanced Search tab input validation
document.getElementById('a-search-tab').addEventListener('submit', e => {
   e.preventDefault();
   var company = $('#companyAdv').val();
   var jobTitle = $('#jobTitleAdv').val();
   var startDate = $('#startDateAdv').val();
   var endDate = $('#endDateAdv').val();

   if ($('#search-bar').val() != "" || company != "" || jobTitle != "" || (startDate != "" && endDate != "") || $('#tagsAdv').val() != "")
      advancedSearch();
   else {

      //shake the box if all advanced search fields are empty
      searchFailed("search-container");

   }
});

//Add functionality to the return to main button
function returnToMain() {
   window.location = 'top-posts.html';
}

// Shake styling function
function searchFailed(element) {
   var searchBar = document.getElementById(element);
   searchBar.classList.add("shake");
   searchBar.addEventListener("animationend", e => {

      searchBar.classList.remove("shake");
   });
}


//Helper function to check firebase document tags
function checkTags(tag, docTags) {
   var match = false;

   docTags.forEach(element => {
      element = element.toUpperCase();

      if (tag === element) {

         match = true;
         matchedTerms.push(tag);
      }
      else if (tag.length > element.length) {
         if (tag.substring(0, element.length) === element) {

            match = true;
            matchedTerms.push(tag);
         }
      }
      else if (tag.length < element.length) {
         if (tag === element.substring(0, tag.length)) {

            match = true;
            matchedTerms.push(tag);
         }
      }
   });
   return match;
}

//Helper function to check a document's property for a search term
function checkString(string, property) {
   var matches = false;
   if (string == "")
      matches = false;
   else if (property === string) {

      matches = true;
   }
   else {
      propertyArr = property.toString().split(" ");
      for (var i = 0; i < propertyArr.length; i++) {
         if (string.length < propertyArr[i].length) {
            if (string === propertyArr[i].substring(0, string.length))
               matches = true;
         }
         if (string === propertyArr[i].substring(0, string.length)) {

            matches = true;
            matchedTerms.push(string);
            i = propertyArr.length;
         }
      };
   }

   return matches;
}


//Creates two parallel arrays. Search Results is which elements match the array
//Matched terms is the specific term matched (so we can bold them or something in the future)
//General search functionality to search every term in the database
function search() {
   db.collection("questions").orderBy('netRating', 'asc').get().then((snapshot) => {
      searchBarContent = $('#search-bar').val();
      var searchArray = searchBarContent.split(" ");

      for (var i = 0; i < searchArray.length; i++) {
         if (vagueTerms.includes(searchArray[i].toLowerCase())) {
            searchArray.splice(i--, 1);
         }
      }

      snapshot.docs.forEach(doc => {

         searchArray.forEach(element => {
            element = element.replace("?", "");

            if (checkString(element.toUpperCase(), doc.data().company.toUpperCase()))
               searchResults.push(doc.id);

            else if (checkString(element.toUpperCase(), doc.data().jobTitle.toUpperCase()))
               searchResults.push(doc.id);

            else if (checkString(element.toUpperCase(), doc.data().question.replace("?", "").toUpperCase())) {
               searchResults.push(doc.id);
            }
            else if (checkTags(element.toUpperCase(), doc.data().tags)) {
               searchResults.push(doc.id);
            }
         });
      });

      
   }).then(event => {
         toSearchPage();
      });;

}

//Core functionality of advanced search tab
//Searches each specific field in each document to what was inputted in the respective fields in the advanced search tab
function advancedSearch() {
   searchBarContent = $('#search-bar').val();
   var company = $('#companyAdv').val();
   var jobTitle = $('#jobTitleAdv').val();
   var startDate = $('#startDateAdv').val();
   var endDate = $('#endDateAdv').val();
   var ymd = startDate.split('-');
   var convertedStartDate = new Date(ymd[0], Number(ymd[1]) - 1, ymd[2]);              //Convert date to js date format
   ymd = endDate.split('-');
   var convertedEndDate = new Date(ymd[0], Number(ymd[1]) - 1, Number(ymd[2]) + 1);    //Convert date to js date format
   searchResults = [];
   matchedTerms = [];

   if (convertedEndDate < convertedStartDate) {
      alert("Please enter an end date that is after the start date")
   }
   else {

      //load documents from database
      db.collection("questions").orderBy('netRating', 'asc').get().then((snapshot) => {



         //Parse tags
         var inputTags = $('#tagsAdv').val().split(",");
         if (inputTags.length == 1)
            inputTags = $('#tagsAdv').val().split(" ");
         else {
            for (var i = 0; i < inputTags.length; i++)
               if (inputTags[i].charAt(0) == ' ') {
                  inputTags[i] = inputTags[i].substring(1, inputTags[i].length);
               }
         }
         if (inputTags.length == 1 && inputTags[0] == "")
            inputTags = [];

         //Parse question search bar into array of words
         var searchArray = $("#search-bar").val().split(" ");
         for (var i = 0; i < searchArray.length; i++) {
            if (vagueTerms.includes(searchArray[i].toLowerCase())) {
               searchArray.splice(i--, 1);
            }
         }

         snapshot.docs.forEach(doc => {
            searchArray.forEach(element => {
               element = element.replace("?", "");


               if (checkString(element.toUpperCase(), doc.data().question.replace("?", "").toUpperCase())) {
                  searchResults.push(doc.id);
               }
            });

            //Where the magic happens. Searches each respective fields, then searches the tags in a forEach loop
            if ((searchResults.length > 0 || searchArray[0] == "")
               && (checkString(company.toUpperCase(), doc.data().company.toUpperCase()) || company.length == 0)
               && (checkString(jobTitle.toUpperCase(), doc.data().jobTitle.toUpperCase()) || jobTitle.length == 0)
               && ((doc.data().dateAsked.toDate() >= convertedStartDate || convertedStartDate == 'Invalid Date') && (doc.data().dateAsked.toDate() <= convertedEndDate || convertedEndDate == 'Invalid Date'))) {
               if (inputTags.length > 0) {
                  inputTags.forEach(element => {
                     if (checkTags(element.toUpperCase(), doc.data().tags))
                        searchResults.push(doc.id);
                  });
               }
               else {
                  searchResults.push(doc.id);
               }
            }

         });
         //After search is complete, load the search results page
      }).then(event => {
         toSearchPage();
      });
   }

}


//function for searching after search buttons are clicked on Top Posts and Search Results pages
function toSearchPage() {
   var uniqueResults = searchResults.filter((c, index) => {
      return searchResults.indexOf(c) === index;
   });
   $.cookie("results", uniqueResults);
   $.cookie("searchCompleted", true);
   
   window.location.href = 'search.html';

}