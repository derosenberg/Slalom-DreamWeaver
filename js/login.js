// JavaScript Document
$(document).on('pageinit','#login', function(){
	$(document).on('click','#loginSubmitBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.',
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

$(document).on('pageinit','#forgotPassword', function(){
	$(document).on('click','#forgotPasswordBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.',
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