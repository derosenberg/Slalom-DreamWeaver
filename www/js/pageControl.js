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

$(document).on('pageinit', '#conversations', function () {
    //AJAX call for Submit New User

    var recipients = GetRecipients();
    
    for (i = 0; i < recipients.length; i++)
    {
        $("#popupMenu1").append("<li class='recipientList' value='" + recipients[i].id + "'><a href='#messages'>" + recipients[i].fname + " " + recipients[i].lname + "</a></li>");
    }

    $(document).on('click', '.recipientList', function () {
        $('#recipientId').val($(this).val());

		$('#recipientName').text($(this).text());


    });
});
//------------------------------------------------------------------------------------------------------------

$(document).on('pageinit', '#messages', function () {

    console.log($('#recipientId').val());

    //AJAX call for sending message
    $(document).on('click', '#sendMessage', function (e) {

        //Prevent auto redirect
        e.preventDefault();

        //Clear message
        $("#messageBody").val("");

        //Post Message
        PostMessage($('#recipientId').val(), $('#messageBody').val());

    });
	

});
//------------------------------------------------------------------------------------------------------------

$(document).on('pageinit', '#Home', function () {

    //Onclicking stuff, post the status
    $(document).on('click', '#submitNewPost', function () {

        PostStatus($("#statusbody").val());

    });


    //Reset the form
    function resetform() {
        document.getElementById("statusUpdateForm").reset();
    }
});
//------------------------------------------------------------------------------------------------------------