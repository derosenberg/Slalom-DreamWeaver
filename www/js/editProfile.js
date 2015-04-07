// Input information into edit profile 
$(document).on('pageshow', '#editProfile', function () {
$.ajax({
        type: "GET",
        url: S_ROOT + 'api/getprofile',
        async: true,
        dataType: "json",
        beforeSend: function (request) {

            //Show page loader

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {

            //Hide loader
        },
        success: function (data) {
			
		
		   $("#fname1").val(data.fname);
		   $("#lname1").val(data.lname);
		   $("#regisEmail1").val(data.email);
		   $("#phone1").val(data.phone);
		   $("#guestemail1").val(data.guestemail);
		   
		   getPicture();
		   
            //Log success
            console.log("profile received");
	
      
		   
			
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Get Status Failed");
        }

    });
});

function getPicture(){
$.ajax({
        type: "GET",
        url: S_ROOT + 'api/getpic',
        async: true,
        dataType: "json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {


        },
        success: function (data) {
			
			
		   $('#regisPortrait1').attr('src', data);
		
			console.log("picture received");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Get Status Failed");
        }

    });
	
};

		/*	var picture = GetPic();
			
			var profPic = document.getElementById('#regisPortrait1')
			profPic.src = picture;
	
			*/
           
		   /*$("#regisPic1").val(profPic);
		   $("#fname1").val(data.fname);
		   $("#lname1").val(data.lname);
		   $("#regisEmail1").val(data.email);
		   $("#phone1").val(data.phone);
		   $("#guestemail1").val(data.guestemail);
            //Log success
            console.log("profile received");

*/






