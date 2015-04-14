// JavaScript source code

//Forgot Password Page Controls
$(document).on('pageinit', '#forgotPassword', function () {
    $(document).on('click', '#forgotPasswordBtn', function () {
    //AJAX call for password recovery
        ResetPassword($('#emailForgot').val());
    });
});
//------------------------------------------------------------------------------------------------------------

//AJAX Call to reset the password
//On success or failure there is an alert and redirect to the login page
function ResetPassword(email) {
    
        $.ajax({
            url: S_ROOT + 'api/Account/forgotpassword/',
            data: "Email=" + email,
            type: 'POST',
            async: true,
            contentType: "application/x-www-form-urlencoded",
            complete: function () {
                $('#emailForgot').val("");
            },
            success: function () {
                //Notifies the user that the password was reset and returns the user to the login page
                navigator.notification.alert("Your new password has been delivered to you by email.", $.mobile.changePage("#login"), "Password Reset");

            },
            error: function (request, error) {

                //Alerts the user that the request failed and then changes the page to login
                var authError = request.status + ": " + request.responseJSON.Message;
                navigator.notification.alert(authError, console.log(authError), "Error Resetting Password");
                $.mobile.changePage("#login");
            }
        });
    
}