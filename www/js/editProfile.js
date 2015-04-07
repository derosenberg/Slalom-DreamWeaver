// Input information into edit profile 
$(document).one('pageshow', '#editProfile', function () {
	
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

	getProfile();
	
	$(document).on('click', '#editProfileSumit', function () {
		
		   var firstName = $("#fname1").val();
		   var lastName = $("#lname1").val();
		   var regisEmail = $("#regisEmail1").val();
		   var phoneNum = $("#phone1").val();
		   var guestEmail = $("#guestemail1").val();
		
		$.ajax({
        type: "PUT",
        url: S_ROOT + 'api/putprofile',
        async: true,
		data: "Email=" + regisEmail + "&fname=" + firstName + "&lname=" + lastName + "&phone=" + phoneNum + "&guestEmail=" + guestEmail,
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {
			
            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {
		
			

        },
        success: function (data) {
			
			var picture = document.getElementById('regisPortrait1').getAttribute('src');
			
			function imgUser(imgData, imgID){
				picture = imgData;
				data = imgID;
			}
			
			UploadPhoto(imgUser);
			
			getProfile();
			console.log("Edit Success");
			
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Put Profile Failed");
        }

    });
		
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
function UploadPhoto(imgUser) {
 $.ajax({
       	 	url: S_ROOT + 'api/PostPic',
        	async: true,
        	contentType: "application/json",
        	type: 'POST',
        	data: '{ "s": "' + imgUser.imgData + '", "id": "' + imgUser.imgID + '" }',
    });
}




