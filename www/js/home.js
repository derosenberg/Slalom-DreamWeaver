// JavaScript source code

//------------------------------------------------------------------------------------------------------------
$(document).on('pageshow', '#Home', function () {
var numStatus = 10;
function GetStatusList(){
	$.ajax({
        type: "GET",
        url: S_ROOT + 'api/status/getstatuses/' + numStatus,
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
function showStatus(){
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
GetStatusList();
 $(document).ready(function () {
                setInterval(function () {
GetStatusList();
                }, 60000);
            });

      $(document).on('click', '#loadMoreStatuses', function () {
		  numStatus = numStatus + 10;
		  GetStatusList();
	  });
	  
	   $(document).on('click', '#submitNewStatus', function () {
       	 PostStatus($("#statusBody").val());
	});		

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
});

    //Onclicking stuff, post the status



