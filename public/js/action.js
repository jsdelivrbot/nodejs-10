

// setTimeout(function() {
//   alert($(".abcRioButtonContents span:nth-child(2)").html());
//   if ($(".abcRioButtonContents span:nth-child(2)").html() != "Signed in") {
// alert("good");
//   }
// }, 2000);

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}	
// auth2 is initialized with gapi.auth2.init() and a user is signed in.

if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  $(".g-signin2").css("display", "none");
  alert("ok");
}




  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }




$(document).ready(function(){
    $("button").click(function(){
        $.ajax({url: "/stylesheets/test.txt", success: function(result){
            $("#ajax1").html(result);
        }});
    });
});


