// JavaScript source code
$(document).on('pageinit', '#Home', function () {

    $(document).on('click', '#loadMoreStatuses', function () {

        S_NUMSTATUS += 10;

        GetStatusList();
    });

    $(document).on('click', '#submitNewStatus', function () {
        PostStatus($("#statusBody").val());
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
            statuses = data;
            //Log success
            console.log("message sent");
            //     navigator.notification.alert("Successsssss", console.log("success"), "Statuses Getted");
            showStatus();
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Get Status Failed");
        }

    });
}

//Make a list of statuses
function showStatus() {
    $("#statusPageContent").empty();


    for (i = 0; i < statuses.length; i++) {
        var temp = "<div class='statusContainer'><label style='float:left'><strong>";
        temp += statuses[i].name;
        temp += "</strong></label><label style='float:right'>";
        temp += statuses[i].date;
        temp += "</label>";
        temp += "<br /><br /><p style='clear:both;'>";
        temp += statuses[i].body;
        temp += "</p></div>";

        $("#statusPageContent").append(temp);
    }
}

//Onclicking stuff, post the status
function PostStatus(status) {

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

            $("#statusBody").val("");
            GetStatusList();
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
function GetStatusPic(guid) {

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/GetStatusPic/' + guid,
        type: 'POST',
        async: true,
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {

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