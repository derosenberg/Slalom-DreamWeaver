// JavaScript source code

//Registration page Controls
$(document).on('pageinit', '#regisPage', function () {

    //AJAX call for Submit New User
    $(document).on('click', '#submitNewUser', function () {
		
			var pictureData = document.getElementById('regisPortrait').getAttribute('src');
		
        //Create user variable
        var myUser = new S_User($('#fname').val(), $('#lname').val(), $('#regisEmail').val(), $('#regisPassword').val(), $('#ConfirmPassword').val(), $('#phone').val(), $('#guestemail').val(), pictureData);

        //Register user
        RegisterUser(myUser);

    });
});



//------------------------------------------------------------------------------------------------------------

//AJAX Call to submit photo
function UploadPhoto(user) {
    $.ajax({
        url: S_ROOT + 'api/PostPic',
        async: true,
        contentType: "application/json",
        type: 'POST',
        data: '{ "s": "' + user.imgData + '", "id": "' + user.imgID + '" }',
    });
}
//------------------------------------------------------------------------------------------------------------

function RegisterUser(user) {
    //AJAX call for Submit New User
    $(document).on('click', '#submitNewUser', function () {
        $.ajax({
            url: S_ROOT + 'api/account/register',
            data: "Email=" + user.email + "&Password=" + user.password + "&ConfirmPassword=" + user.confirm + "&fname=" + user.fname + "&lname=" + user.lname + "&phone=" + user.phone + "&guestEmail=" + user.guest,
            type: 'POST',
            async: true,
            contentType: "application/x-www-form-urlencoded",
            beforeSend: function () {
                $.mobile.loader('show', {
                    theme: "a",
                    text: "Registering",
                    textonly: true,
                    textVisible: true
                });

                //AJAX call for Submit New User
                $(document).off('click', '#submitNewUser');

            },
            complete: function () {
                $.mobile.loader('hide');

                //AJAX call for Submit New User
                $(document).on('click', '#submitNewUser', function () {

                    var pictureData = document.getElementById('regisPortrait').getAttribute('src');

                    //Create user variable
                    var myUser = new S_User($('#fname').val(), $('#lname').val(), $('#regisEmail').val(), $('#regisPassword').val(), $('#ConfirmPassword').val(), $('#phone').val(), $('#guestemail').val(), pictureData);

                    //Register user
                    RegisterUser(myUser);

                });
            },
            success: function (result) {
                user.imgID = result;
                UploadPhoto(user);
                navigator.notification.alert("Congrats, log in with your email!", console.log("yay"), "Registration Successful");
                $.mobile.changePage("#login");
            },
            error: function (request, error) {
                var myError = "Error " + request.status + ": " + request.responseJSON.Message;
                navigator.notification.alert(myError, console.log(myError), "Registration Failed");

                $.mobile.changePage("#login");
            }
        });
    });
}