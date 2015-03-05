// JavaScript Document
//------------------------------------------------------------------------------------------------------------

//Login Page Controls
$(document).on('pageinit', '#login', function () {

    //Disable form on submit
    $('#loginForm :input').prop("disabled", false);

    //Get Token to latest value
    if (window.localStorage.getItem("S_TOKEN") !== null) {
        S_TOKEN = window.localStorage.getItem("S_TOKEN");
    }
    console.log(S_TOKEN);


    //Attempt to authenticate with token
    if (S_TOKEN.length > 0) {
    	AuthenticateToken();
    }

    //Enable form
    $('#regisPageForm :input').prop("disabled", false);

    //When submit button clicked, get the token
    $(document).on('click', '#loginSubmitBtn', function () {

        //Disable form on submit
        $('#loginForm :input').prop("disabled", true);

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

    //Enable form
    $('#regisPageForm :input').prop("disabled", false);

    //AJAX call for Submit New User
	$(document).on('click', '#submitNewUser', function () {

	    //Disable form on submit
	    $('#regisPageForm :input').prop("disabled", true);

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

$(document).on('pageinit', '#message', function () {
    //AJAX call for Submit New User
    $(document).on('click', '#sendMessage', function () {

        //Disable form on submit
        $('#regisPageForm :input').prop("disabled", true);

        //Register user
        PostMessage(5, "It is nice outside.");

    });
});
//------------------------------------------------------------------------------------------------------------

