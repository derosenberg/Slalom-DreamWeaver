// JavaScript Document

$(document).on('pageshow', '#Camera', function (event, ui) {

    console.log(event);
    console.log(ui);

    //Figure out what pic we're getting
    var cameraObject = {};
    cameraObject.lastPage = ui.prevPage.attr('id');
    console.log("the previous page was: " + cameraObject.lastPage);

    //Registration Page
    if (cameraObject.lastPage == "regisPage")
    {
        cameraObject.smallImage = "regisPortrait";
        cameraObject.hiddenField = "regisPic";
    }
    //Edit Profile Page
    if (cameraObject.lastPage == "editProfile")
    {
        cameraObject.smallImage = "regisPortrait1";
        cameraObject.hiddenField = "regisPic1";
    }
    //Status Page
    if (cameraObject.lastPage == "Home")
    {
        cameraObject.smallImage = "";
        cameraObject.hiddenField = "statusPic";
    }

    console.log(cameraObject);
    

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //

    $(document).on('click', '#takePhoto', function () {
        capturePhoto();
    });

    $(document).on('click', '#grabDatPhoto', function () {
        getPhoto(pictureSource.PHOTOLIBRARY);
    });

    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved


    function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64-encoded image data

        window.location.href = "#" + cameraObject.lastPage;

        // Get image handle
        //

        var smallImage = document.getElementById(cameraObject.smallImage);
        var hiddenField = document.getElementById(cameraObject.hiddenField);




        if (cameraObject.smallImage.length > 0)
        {
            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        hiddenField.value = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
        // Uncomment to view the image file URI
        // console.log(imageURI);
        window.location.href = "#" + cameraObject.lastPage;

        // Get image handle
        //
        var largeImage = document.getElementById(cameraObject.smallImage);
        var hiddenField = document.getElementById(cameraObject.hiddenField);


        if (cameraObject.smallImage.length > 0) {

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //

            largeImage.src = imageURI;
        }
    }

    // A button will call this function
    //
    function capturePhoto() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail,
        {
            quality: 50,
            correctOrientation: true,
            destinationType: destinationType.DATA_URL
        });
    }

    function capturePhotoWithFile() {


        navigator.camera.getPicture(onPhotoFileSuccess, onFail,
        {
            quality: 50,
            correctOrientation: true,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }


    // A button will call this function
    //
    function capturePhotoEdit() {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
            quality: 20,
            allowEdit: true,
            destinationType: destinationType.DATA_URL
        });
    }

    // A button will call this function
    //
    function getPhoto(source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail,
         {
             quality: 50,
             correctOrientation: true,
             destinationType: destinationType.FILE_URI,
             sourceType: source
         });
    }


    // Called if something bad happens.
    //
    function onFail(message) {
        alert('Failed because: ' + message);
    }

});


$(document).on('pagebeforehide', '#Camera', function () {

    $(document).off('click', '#takePhoto');
    $(document).off('click', '#grabDatPhoto');

});