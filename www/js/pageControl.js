// JavaScript Document
//------------------------------------------------------------------------------------------------------------

//Login Page Controls
$(document).on('pageinit', '#login', function () {

    //Get Token to latest value
    if (window.localStorage.getItem("S_TOKEN") !== null) {
        S_TOKEN = window.localStorage.getItem("S_TOKEN");
    }
    console.log(S_TOKEN);


    //Attempt to authenticate with token
    if (Token.length > 0) {
    	AuthenticateToken();
    }

    //When submit button clicked, get the token
    $(document).on('click', '#loginSubmitBtn', function () {

    	//Gets the token and either logs in or alerts failure
    	GetToken($('#username').val(), $('#password').val());

    });
});
//------------------------------------------------------------------------------------------------------------

//Forgot Password Page Controls
$(document).on('pageinit', '#forgotPassword', function () {

    //AJAX call for password recovery
	ResetPassword($('#emailForgot').val());
	$('#emailForgot').val("");
});
//------------------------------------------------------------------------------------------------------------

//Registration page Controls
$(document).on('pageinit', '#regisPage', function () {

    //AJAX call for Submit New User
	$(document).on('click', '#submitNewUser', function () {

		//Create user variable
		var myUser = new S_User($('#fname').val(), $('#lname').val(), $('#regisEmail').val(), $('#regisPassword').val(), $('#ConfirmPassword').val(), $('#phone').val(), $('#guestemail').val(), $("#regisPic").val());

		//Register user
		RegisterUser(myUser);

    });
});
//------------------------------------------------------------------------------------------------------------

$(document).on('pageinit', '#Home', function () {
    console.log("Home sweet home");
});
//------------------------------------------------------------------------------------------------------------


