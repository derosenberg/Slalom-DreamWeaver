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
				alert('Congratulations, user registration was successful.');
				$.mobile.changePage("#login");
			},
			error: function (request, error) {
				var myError = "Error " + request.status + ": " + request.responseJSON.Message;
				alert(myError);

				$.mobile.changePage("#login");
			}
		});
	});
}