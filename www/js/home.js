// JavaScript source code

//------------------------------------------------------------------------------------------------------------

$(document).on('pageinit', '#Home', function () {

    //Onclicking stuff, post the status
    $(document).on('click', '#submitNewStatus', function () {
        PostStatus($("#statusBody").val());
        $("#statusBody").val("");

        $("#statusPageContent").empty();

        var statuses = GetStatusList();

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
    });

});

$(document).on('pageshow', '#Home', function () {

    $("#statusPageContent").empty();

    var statuses = GetStatusList();

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

});
//------------------------------------------------------------------------------------------------------------

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

//gets posts in list
function GetStatusList() {

    var statuses;

    $.ajax({
        type: "GET",
        url: S_ROOT + 'api/status/getstatuses/1',
        async: false,
        dataType: "json",
        beforeSend: function (request) {

            //Show page loader
            $.mobile.showPageLoadingMsg(true);

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data) {
            statuses = data;
            //Log success
            console.log("message sent");
            //     navigator.notification.alert("Successsssss", console.log("success"), "Statuses Getted");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Get Status Failed");
        }

    });

    return statuses;
}