$(document).ready(function(){

            window.fbAsyncInit = function() {
                FB.init({
                        appId      : '1430075097245039',
                        status     : true, 
                        cookie     : true,
                        xfbml      : true,
                        oauth      : true,
                });
                FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    var uid = response.authResponse.userID;
    localStorage['uid'] = uid;
    var accessToken = response.authResponse.accessToken;
    getYourProfile(accessToken);
    $('#loginfb').hide();
    $('#logoutfb').show();
    $('#start').show();
    $('#output h3').text( 'Hi, '+localStorage['firstname'] );
    
   $.parse.post('Users',{ email : localStorage['email'],username:localStorage['userID'], firstname:localStorage['firstname']}, function(json){
           console.log(json);
          });
      
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    $('#loginfb').show();
    $('#logoutfb').hide();
  } else {
    // the user isn't logged in to Facebook.
    $('#loginfb').show();
    $('#logoutfb').hide();
  }
 });
$('#loginfb').click(function(){
             FB.login(function(response) {
   if (response.authResponse) {
   	$('#loginfb').css('display','none');
    $('#logoutfb').hide();
    $('#start').show();
     console.log('Welcome!  Fetching your information.... ');
    var accessToken = response.authResponse.accessToken;
    getYourProfile(accessToken);
    $.parse.post('Users',{ email : localStorage['email'], username:localStorage['userID'],firstname:localStorage['firstname']}, function(json){
           console.log(json);
          });
     

   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 },{scope: 'email'});
    });
   $('#logoutfb').click(function(){
FB.logout(function(response){
window.location = 'http://weatherhack.com';
});
    });
   function getYourProfile(token){
FB.api('/me', 'GET', function(response){
  console.log(response);
var YourID = response.id;
localStorage['userID'] = YourID;
localStorage['email'] = response.email;
var YourName = response.first_name;
localStorage['firstname'] = YourName;

});
  }
            };

// Load the SDK Asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId= Your-App-Id ";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
});