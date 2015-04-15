// Input information into edit profile 
$(document).on('pageinit', '#editProfile', function () {

	getProfile();
	
	$(document).on('click', '#editProfileSumbit', function () {
		
	    var myUser = new S_User($("#fname1").val(), $("#lname1").val(), $("#regisEmail1").val(), "", "", $("#phone1").val(), $('#guestemail1').val(), $('#regisPic1').val());

	    putProfile(myUser);

	});
	
});

function putProfile(myUser)
{
    $.ajax({
        type: "PUT",
        url: S_ROOT + 'api/putprofile',
        async: true,
        data: "Email=" + myUser.email + "&fname=" + myUser.fname + "&lname=" + myUser.lname + "&phone=" + myUser.phone + "&guestEmail=" + myUser.guest,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        success: function (data) {

            myUser.imgID = data;

            UploadPhoto(myUser);
            navigator.notification.alert("Succesfully Updated Profile");
            $.mobile.changePage("#Home");
            console.log("Edit Success");


        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Put Profile Failed");
        }

    });
}

function getProfile(){	
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
};

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







