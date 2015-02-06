// JavaScript Document

//Login Page Controls
$(document).on('pageinit','#login', function(){
	
	//AJAX Call for login
	$(document).on('click','#loginSubmitBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/Login/',
			data: $('#loginForm').serialize(),
			type: 'POST',
			async: true,
			contentType:"application/json",
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
			contentType:"application/json",
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
			url: 'http://slalomtest2.azurewebsites.net/api/account/register/',
			data: $('#regisPageForm').serialize(),
			type: 'POST',
			async: true,
			contentType:"application/json",
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