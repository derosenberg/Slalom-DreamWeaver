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
			dataType:"json",
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
			url: 'http://slalomtest2.azurewebsites.net/api/forgotpassword/',
			data: $('#forgotPasswordForm').serialize(),
			type: 'POST',
			async: true,
			contentType:"application/x-www-form-urlencoded",
			dataType:"json",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				$.mobile.changePage("#login");
			},
			error: function(request, error){
				alert('Sorry, something went wrong.');
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
			data: $('#regisPageForm').serialize(),
			type: 'POST',
			async: true,
			contentType:"application/x-www-form-urlencoded",
			dataType:"json",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				$.mobile.changePage("#login");
			},
			error: function(request, error){
				alert('Sorry, something went wrong.');
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
			request.withCredentials = true;
        	request.setRequestHeader("Authorization", "Basic " + Token);
		},
		success: function(result){
			console.log(result);
		},
		error: function(request, error){
			alert('Error, sorry.');
		}
	});
	
});