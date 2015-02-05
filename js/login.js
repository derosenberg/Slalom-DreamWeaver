// JavaScript Document
$(document).on('pageinit','#login', function(){
	$(document).on('click','#btnLogin', function(){
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