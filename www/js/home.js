// JavaScript source code
$(document).on('pageinit', '#Home', function () {
    console.log("pageinit");

    $(document).on('click', '#loadMoreStatuses', function () {

        S_NUMSTATUS += 10;

        GetStatusList();
    });

    $(document).on('click', '#submitNewStatus', function () {
        var statusImg = $("#statusPic").val();
        $("#statusPic").val("");

        console.log(statusImg);

        PostStatus($("#statusBody").val(), statusImg);
    });
});


//------------------------------------------------------------------------------------------------------------
$(document).on('pageshow', '#Home', function () {

    S_NUMSTATUS = 10;

    GetStatusList();

    S_TIMER.push(setInterval(function () {
        GetStatusList();
        console.log("status page reloaded");
        }, 60000));
});


//Get a list of statuses
function GetStatusList() {
    $.ajax({
        type: "GET",
        url: S_ROOT + 'api/status/getstatuses/' + S_NUMSTATUS,
        async: true,
        dataType: "json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {

            //Hide loader
        },
        success: function (data) {
            var statuses = data;
            //Log success
            console.log("message sent");
            //     navigator.notification.alert("Successsssss", console.log("success"), "Statuses Getted");
            showStatus(statuses);
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Get Status Failed");
        }

    });
}

//Make a list of statuses
function showStatus(statuses) {
    $("#statusPageContent").empty();


    for (i = 0; i < statuses.length; i++) {
        var temp = "<div class='statusContainer' id='" + statuses[i].StatusID + "'><label style='float:left'><strong>";
        temp += statuses[i].name;
        temp += "</strong></label><label style='float:right'>";
        temp += statuses[i].date;
        temp += "</label>";
        temp += "<br /><br /><p style='clear:both;'>";
        temp += statuses[i].body;
        temp += "</p>";
        temp += "</div>";

        $("#statusPageContent").append(temp);

        if (statuses[i].postpicguid != null)
        {
            GetStatusPic(statuses[i].StatusID, statuses[i].postpicguid);
        }
    }
}


//Onclicking stuff, post the status
function PostStatus(status, img) {

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/status/',
        type: 'POST',
        async: true,
        data: '{ "body": "' + status + '" }',
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {
            console.log(img);
            if (img.length > 0)
            {
                PostStatusPic(result, img);
            }
            else
            {
                GetStatusList();
            }

            $("#statusBody").val("");
            
            //Log success
            //     navigator.notification.alert("Successsssss", console.log("success"), "Post Created");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Post Failed");
        }
    });

}

//Onclicking stuff, post the status pic
function PostStatusPic(status_id, img_data) {
    console.log("post status pic");
    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/PostStatusPic/',
        type: 'POST',
        async: true,
        data: '{ "s": "' + img_data + '", "statusid": "' + status_id + '" }',
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function () {

            GetStatusList();
            //Log success
            //     navigator.notification.alert("Successsssss", console.log("success"), "Post Created");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Pic Post Failed");
        }
    });

}

//Get status pic
function GetStatusPic(status, guid) {

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/GetStatusPic/' + guid,
        type: 'GET',
        cache: true,
        async: true,
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {
            $('#' + status).append("<img src='" + result + "' />");
            //Log success
            //     navigator.notification.alert("Successsssss", console.log("success"), "Post Created");
        },
        error: function (request, error) {
            $('#' + status).append("<p>Couldn't load image</p>");
            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Pic Post Failed");
        }
    });

}