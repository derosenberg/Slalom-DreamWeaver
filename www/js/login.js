// JavaScript source code
//Login Page Controls
$(document).on('pageinit', '#login', function () {

    //Get Token to latest value
    if (window.localStorage.getItem("S_TOKEN") !== null) {
        S_TOKEN = window.localStorage.getItem("S_TOKEN");
    }
    console.log(S_TOKEN);


    //Attempt to authenticate with token
    if (S_TOKEN.length > 0) {
        AuthenticateToken();
    }

    //When submit button clicked, get the token
    $(document).on('click', '#loginSubmitBtn', function () {

        //Gets the token and either logs in or alerts failure
        GetToken($('#username').val(), $('#password').val());

    });
});
//------------------------------------------------------------------------------------------------------------

//Submits a username and password to retrieve the authentication token
//On success, it stores the token in memory and storage and redirects home
//On failure, it creates an alert and a console log
function GetToken(username, password) {

    //AJAX call begins
    $.ajax({
        url: S_ROOT + 'Token',
        data: "username=" + username + "&password=" + password + "&grant_type=password",
        type: 'POST',
        cache: false,
        async: true,
        beforeSend: function () {

            //Disable form
            $(document).off('click', '#loginSubmitBtn');

            //Show page loading message
            $.mobile.loading('show');
        },
        complete: function () {

            //When submit button clicked, get the token
            $(document).on('click', '#loginSubmitBtn', function () {

                //Gets the token and either logs in or alerts failure
                GetToken($('#username').val(), $('#password').val());

            });

            //On complete, hide loader
            $.mobile.loading('hide');
        },
        success: function (result) {

            //On success, store the token in the global variable AND local storage
            S_TOKEN = result.access_token;
            window.localStorage.setItem("S_TOKEN", S_TOKEN);

            //Then redirect the user to the home page
            $.mobile.changePage("#Home");

        },
        error: function (request, error) {

            //If error, return the reason
            var authError = request.status + ": " + request.responseJSON.error_description;
            navigator.notification.alert(authError, console.log(authError), "Login Failed");

        }
    });
}
//------------------------------------------------------------------------------------------------------------

//A quick check to determine authentication
//If successful, the function takes the user to the homepage
//On failure, it removes the token from storage and memory
function AuthenticateToken() {
    $.ajax({
        url: S_ROOT + 'api/values/',
        type: 'GET',
        async: true,
        dataType: "json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);
        },
        success: function (result) {

            //On success, changes page to home
            $.mobile.changePage("#Home");
        },
        error: function (request, error) {

            //On failure, removes token traces from local storage
            window.localStorage.removeItem("S_TOKEN");
        }
    });
}