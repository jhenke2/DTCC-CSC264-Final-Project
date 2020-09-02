/*
    @author Justin Henke
    @author Trevor Wilkins



    Navigation JS script added to nearly every page of the site. 
    The script both loads the Navbar's HTML and adds functionality through event listeners
*/


// Writing the HTML content for the Navigation Bar 
document.write("<nav class = 'navbar fixed-top navbar-expand-sm navbar-custom text-center'>");
document.write("<button id = 'xyzLogo-btn' class = 'btn'>");
document.write("<img id='xyzLogo' src = 'resources/images/xyzLogo.png' alt = 'XYZ University Logo'>");
document.write("</button>");
document.write("<button id = 'xyzBrand' class = 'btn'><ul id = 'xyz-brand-inner-text'><li>XYZ</li><li>University</li></ul></button>");
document.write("<div class = 'navbar-nav ml-auto'>");
document.write("<button id = 'log-out-button' class='btn-custom'>Log Out</button>");
document.write("</div>");
document.write("</nav>");



// Authenticating user state
if (auth.currentUser != null) {
    document.getElementById('log-out-button').classList.remove('d-none');
}


// Assigning functionality to log out button, Logo, and Brand in Navigation bar
document.getElementById('log-out-button').addEventListener('click', e => {
    document.getElementById('log-out-button').classList.add('d-none');
    auth.signOut();
    window.location.assign('./index.html');

});

//add a "go home" feature anywhere on the site to return to top-posts
document.getElementById('xyzLogo').addEventListener('click', e => {
    
        window.location.href = './top-posts.html';

});
document.getElementById('xyzBrand').addEventListener('click', e => {
    
        window.location.href = './top-posts.html';

});
