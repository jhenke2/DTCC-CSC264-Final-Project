/*
    @author Justin Henke

    JS file for adding functionality to the Advanced Search tab.
*/



//button title and subtitle of page toggler array
var btnContent = ["advanced search +", "advanced search -"];
var barContent = ["Enter Search Terms...", "Question..."];
var searchContents;
var state = 1;

//Add event listener to the "advanced search +" button
document.getElementById('a-search-button').addEventListener('click', event => {
    //Save the contents of the search bar before clearing and opening advanced search
    if (state == 1)
        searchContents = $('#search-bar').val();
    $("#a-search-tab").toggleClass('d-none');

    //Flip the the button and placeholder text in search bar
    $("#a-search-button").text(btnContent[state]);
    $("#search-bar").attr("placeholder", barContent[state]);


    //Toggle "Advanced Search" and "Search Repository" right above the search bar
    if (state%2 == 1) {
        searchConts = $("#search-bar");
        document.getElementById('type-of-search').innerText = "Advanced Search";
        $("#search-bar").val("");
    }
    else {
        document.getElementById('type-of-search').innerText = "Search Repository";
        $('#search-bar').val(searchContents)
        
        
    }
    //flip the toggle
    state = ++state%2;

});

