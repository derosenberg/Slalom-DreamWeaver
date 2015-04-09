$(document).on('pageinit', '#changePassword', function () {
	
	$(document).on('click', '#changePasswordBttn', function () {
		
		   var currentPword = $("#currentPassword").val();
		   var newPword = $("#newPassword").val();
		   var confirmNewPword = $("#confirmNewPassword").val();
		
		if (newPword = confirmNewPword)
		{
		 changePassword(currentPword, newPword, confirmNewPword);
		}
		else if (newPword != confirmNewPword)
		{
			navigator.notification.alert("Passords do not match");
		}
	});
	
});

function changePassword(currentPword, newPword, confirmNewPword) {
	 $.ajax({
       	 	url: S_ROOT + 'api/Account/ChangePassword',
        	async: true,
        	contentType: "application/json",
        	type: 'POST',
        	data: "{ 'OldPassword':'" + currentPword + "', 'NewPassword':'" + newPword + "', 'ConfirmPassword':'" + confirmNewPword + "'}",
            beforeSend: function (request) {
                  
				  request.withCredentials = true;
            	  request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

            },
            complete: function () {
              
            },
            success: function (result) {
				
			navigator.notification.alert("Password Changed");
			$.mobile.changePage("#Home");		
			console.log("Password Changed");
               
            },
            error: function (request, error) {
                var myError = "Error " + request.status + ": " + request.responseJSON.Message;
                navigator.notification.alert(myError, console.log(myError), "Passord Change Failed");

            }    
	
	});
	
};