// JavaScript Document

var Token = "";


//Login Page Controls
$(document).on('pageinit','#login', function(){
	
	/*//Get user with token
	function GetProfile()
	{
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/values',
			headers: { 'Authorization': 'Bearer ' + Token },
			data: "username=" + $('#username').val() + "&password=" + $('#password').val() + "&grant_type",
			type: 'GET',
			async: true,
			dataType:"json",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				if(result.success){
					$.mobile.changePage("#map");
				}
				else{
					alert('login unsuccessful');
				}
			},
			error: function(request, error){
				alert('Error, sorry.');
			}
		});
	}*/
	
	//AJAX Call for login
	$(document).on('click','#loginSubmitBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/Token',
			data: "username=" + $('#username').val() + "&password=" + $('#password').val() + "&grant_type=password",
			type: 'POST',
			async: true,
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				Token = result.access_token
				$.mobile.changePage("#Home");
			},
			error: function(request, error){
				alert("Error " + request.status + ": " + request.responseJSON.error_description);
				//alert('Error, sorry.');
			}
		});
	});
});

//Forgot Password Page Controls
$(document).on('pageinit','#forgotPassword', function(){
	
	//AJAX call for password recovery
	$(document).on('click','#forgotPasswordBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/Account/forgotpassword/',
			data: "Email=" + $('#emailForgot').val(),
			type: 'POST',
			async: true,
			contentType:"application/x-www-form-urlencoded",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
				$('#emailForgot').val("")
			},
			success: function(){
				alert("Success, email is in your inbox.");
				$.mobile.changePage("#login");
			},
			error: function(request, error){
				alert("Error " + request.status + ": " + request.responseJSON.Message);
				$.mobile.changePage("#login");
			}
		});
	});
});

//Registration page Controls
$(document).on('pageinit','#regisPage', function(){
	
	//AJAX call for Submit New User
	$(document).on('click','#submitNewUser', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/account/register',
			data: "Email=" + $('#regisEmail').val() + "&Password=" + $('#regisPassword').val() + "&ConfirmPassword=" + $('#ConfirmPassword').val() + "&fname=" + $('#fname').val() + "&lname=" + $('#lname').val() + "&phone=" + $('#phone').val() + "&picture=" + $('#regisPic').val() + "&guestEmail=" + $('#guestemail').val(),
			type: 'POST',
			async: true,
			contentType:"application/x-www-form-urlencoded",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				alert('Congratulations, user registration was successful.');
				$.mobile.changePage("#login");
			},
			error: function(request, error){
				console.log(request);
				var myError = "Error " + request.status + ": " + request.responseJSON.Message;
				alert(myError);
				
				$.mobile.changePage("#login");
			}
		});
	});
});

$(document).on('pageinit', '#Home', function(){
	$.ajax({
		url: 'http://slalomtest2.azurewebsites.net/api/values/',
		type: 'GET',
		async: true,
		dataType:"json",
		beforeSend: function(request){
			//request.withCredentials = true;
        //	request.setRequestHeader("Authorization", "Basic " + Token);
		},
		success: function(result){
			console.log(result);
		},
		error: function(request, error){
			alert('Error, sorry.');
		}
	});
	
});