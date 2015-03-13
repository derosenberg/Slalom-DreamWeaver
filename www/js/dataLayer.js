//JavaScript Data Layer Functions
//THEY MUST BE PUT IN A DOCUMENT/PAGE READY FUNCTION TO WORK
//Also, the only HTML DOM in these should be for changing pages


//Submits a username and password to retrieve the authentication token
//On success, it stores the token in memory and storage and redirects home
//On failure, it creates an alert and a console log
function GetToken(username, password) {

	//AJAX call begins
	$.ajax({
		url: S_ROOT + 'Token',
		data: "username=" + username + "&password=" + password + "&grant_type=password",
		type: 'POST',
		async: true,
		beforeSend: function () {

			//Show page loading message
			$.mobile.loading('show');
		},
		complete: function () {

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

//AJAX Call to reset the password
//On success or failure there is an alert and redirect to the login page
function ResetPassword(email) {
	$(document).on('click', '#forgotPasswordBtn', function () {
		$.ajax({
			url: S_ROOT + 'api/Account/forgotpassword/',
			data: "Email=" + email,
			type: 'POST',
			async: true,
			contentType: "application/x-www-form-urlencoded",
			beforeSend: function () {

				//Shows the page loading message
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function () {

				//Hides the loading message
				$.mobile.hidePageLoadingMsg();
			},
			success: function () {

				//Notifies the user that the password was reset and returns the user to the login page
				navigator.notification.alert("Your new password has been delivered to you by email.", $.mobile.changePage("#login"), "Password Reset");
				
			},
			error: function (request, error) {

				//Alerts the user that the request failed and then changes the page to login
				var authError = request.status + ": " + request.responseJSON.Message;
				navigator.notification.alert(authError, console.log(authError), "Login Failed");
				$.mobile.changePage("#login");
			}
		});
	});
}

//AJAX Call to submit photo
function UploadPhoto(user) {
	$.ajax({
		url: S_ROOT + 'api/PostPic',
		async: true,
		contentType: "application/json",
		type: 'POST',
		data: '{ "s": "' + user.imgData + '", "id": "' + user.imgID + '" }',
	});
}

function RegisterUser(user){
	//AJAX call for Submit New User
	$(document).on('click', '#submitNewUser', function () {
		$.ajax({
			url: S_ROOT + 'api/account/register',
			data: "Email=" + user.email + "&Password=" + user.password + "&ConfirmPassword=" + user.confirm + "&fname=" + user.fname + "&lname=" + user.lname + "&phone=" + user.phone + "&guestEmail=" + user.guest,
			type: 'POST',
			async: true,
			contentType: "application/x-www-form-urlencoded",
			beforeSend: function () {
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function () {
				$.mobile.hidePageLoadingMsg();
			},
			success: function (result) {
				user.imgID = result;
				UploadPhoto(user);
				navigator.notification.alert("Congrats, log in with your email!", console.log("yay"), "Registration Successful");
				$.mobile.changePage("#login");
			},
			error: function (request, error) {
				var myError = "Error " + request.status + ": " + request.responseJSON.Message;
				navigator.notification.alert(myError, console.log(myError), "Registration Failed");

				$.mobile.changePage("#login");
			}
		});
	});
}

function GetLocationList() {

    var locations;

    //AJAX call to get a list of user locations
    $.ajax({
        url: S_ROOT + 'api/Profiles/getlocation/',
        type: 'GET',
        async: false,
        contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

            //Show page loader
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {

            locations = result;
        },
        error: function (request, error) {
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Operation Failed");
        }
    });

    return locations;
}

function PutLocation(Longitude, Latitude) {


    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/Profile/putlocation/?lat=' + Latitude + '&lo=' + Longitude,
        type: 'PUT',
        async: true,
        contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {

            //Log success
            console.log("Location updated");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            console.log(myError);
        }
    });

}

function PostMessage(recipient, message) {


    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/',
        type: 'POST',
        async: true,
        data: '{ "recipient_id": "' + recipient + '", "text": "' + message + '" }',
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {

            //Log success
            console.log("message sent");
            navigator.notification.alert("Successsssss", console.log("success"), "Message Sent");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Message Send Failed");
        }
    });

}

function GetConversations() {

    var conversations;

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getconversations',
        type: 'GET',
        async: false,
        beforeSend: function (request) {

            //Show page loader
            $.mobile.showPageLoadingMsg(true);

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {

            conversations = result;

            //Log success
            navigator.notification.alert("Received list", console.log(result), "Conversation Received");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return conversations;

}

function GetMessages(recipient_id) {

    var messages;

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getmessages/' + recipient_id,
        type: 'GET',
        async: false,
        beforeSend: function (request) {

            //Show page loader
            $.mobile.showPageLoadingMsg(true);

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {

            messages = result;

            //Log success
            navigator.notification.alert("Received Messages", console.log(result), "Conversation Received");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return messages;

}

function GetRecipients()
{

    var recipients;

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getrecipients/',
        type: 'GET',
        async: false,
        beforeSend: function (request) {

            //Show page loader
            $.mobile.showPageLoadingMsg(true);

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {

            recipients = result;

            //Log success
            navigator.notification.alert("Received Messages", console.log(result), "Conversation Received");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return recipients;

}

function PostStatus(status) {

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/status/',
        type: 'POST',
        async: true,
        data: '{ "body": "' + status + '" }',
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {

            //Log success
            navigator.notification.alert("Successsssss", console.log("success"), "Post Created");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Post Failed");
        }
    });

}

//gets posts in list
function GetStatusList() {

    var statuses;

    $.ajax({
        type: "GET",
        url: S_ROOT + 'api/status/getstatuses/1',
        async: false,
        dataType: "json",
        beforeSend: function (request) {

            //Show page loader
            $.mobile.showPageLoadingMsg(true);

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        success: function (data) {
            statuses = data;
            //Log success
            console.log("message sent");
            navigator.notification.alert("Successsssss", console.log("success"), "Statuses Getted");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Get Status Failed");
        }

    });

    return statuses;
}

