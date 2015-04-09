

//On initialization of menu page
$(document).on('pageinit', '#menu', function () {

    //Event listener that waits for logout button clicks
    $(document).on('click', '#logOutButton', function () {

        LogOutSlalom();

    });

});


//Log out on server
function LogOutSlalom() {

    $.ajax({
        url: S_ROOT + 'api/Account/Logout',
        type: 'POST',
        beforeSend: function (request) {
            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);
        },

        //On success, finish the logout
        success: function () {
            //Remove Token from Memory
            S_TOKEN = "";

            //Remove Token from storage
            window.localStorage.removeItem("S_TOKEN");

            //Check if succeeded
            console.log(window.localStorage.getItem("S_TOKEN"));

            //Return to login
            $.mobile.changePage("#login");
        },

        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Can't log out");
        }
    });

    return;
}


