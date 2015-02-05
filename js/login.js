// JavaScript Document
$(document).on('pageinit','#login', function(){
	$(document).on('click','#btnLogin', function(){
		$.ajax({
			url: 'http://slalomtest.elasticbeanstalk.com',
			data: $('#loginForm').serialize(),
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
				if(result.success){
					$.mobile.changePage("#map");
				}
				else{
					alert('logon unsuccessful');
				}
			},
			error: function(request, error){
				alert('Error, sorry.');
			}
		});
	});
});