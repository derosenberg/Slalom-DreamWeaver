// JavaScript source code


$(document).on('pageinit', '#conversations', function () {
    //AJAX call for Submit New User

    var recipients = GetRecipients();
    
    for (i = 0; i < recipients.length; i++)
    {
        $("#popupMenu1").append("<li class='recipientList' value='" + recipients[i].ProfileID + "'><a href='#messages'>" + recipients[i].fname + " " + recipients[i].lname + "</a></li>");
    }
    
    $(document).on('click', '.recipientList', function () {
        $('#recipientId').val($(this).val());

        $('#recipientName').text($(this).text());

    });

    $(document).on('click', '.conversationContainer', function () {

        $.mobile.changePage("#messages");

        $('#recipientId').val($(this).find(":input").val());

        $('#recipientName').text($(this).find(".conversationName").text());

    });

});

$(document).on('pageshow', '#conversations', function () {

    $("#conversationPageContent").empty();

    var conversations = GetConversations();

    if (conversations != null) {
        for (i = 0; i < conversations.length; i++)
        {
            var temp = "<div class='conversationContainer'><label class='conversationName' style='float:left'><strong>";
            temp += conversations[i].recname;
            temp += "</strong></label><label style='float:right'>";
            temp += conversations[i].latestmessagedate;
            temp += "</label><input type='hidden' value='";
            temp += conversations[i].rec_id;
            temp += "'><br /><br /><p style='color:#666666; clear:both;'>";
            temp += conversations[i].latestmessagetext;
            temp += "</p></div>";

            $("#conversationPageContent").append(temp);
        }
    }
});
//------------------------------------------------------------------------------------------------------------

$(document).on('pageinit', '#messages', function () {
    //AJAX call for sending message
    $(document).on('click', '#sendMessage', function (e) {

        //Prevent auto redirect
        e.preventDefault();

        //Post Message
        PostMessage($('#recipientId').val(), $('#messageBody').val());

        //Create new message bubble
        $("#messagePageContent").append("<div class='messageContainer'><div class='senderMessage'>" + $('#messageBody').val() + "</div></div>")

        //Clear message
        $("#messageBody").val("");

    });
});

$(document).on('pageshow', '#messages', function () {

    $("#messagePageContent").empty();

    var recipient_id = $("#recipientId").val();

    var conversation = GetMessages(recipient_id);

    if (conversation != null) {
        for (i = 0; i < conversation[0].Messages.length; i++) {
            if (conversation[0].Messages[i].ProfileID == recipient_id)
                $("#messagePageContent").append("<div class='messageContainer'><div class='recipientMessage'>" + conversation[0].Messages[i].messagetext + "</div></div>");
            else
                $("#messagePageContent").append("<div class='messageContainer'><div class='senderMessage'>" + conversation[0].Messages[i].messagetext + "</div></div>");
        }
    }
});


//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

function PostMessage(recipient, message) {


    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/',
        type: 'POST',
        async: true,
        data: '{ "recipient_id": "' + recipient + '", "text": "' + message + '" }',
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {

            //Log success
            console.log("message sent");
            //  navigator.notification.alert("Successsssss", console.log("success"), "Message Sent");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Message Send Failed");
        }
    });

}

function GetConversations() {

    var conversations;

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getconversations',
        type: 'GET',
        async: false,
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
        success: function (result) {

            conversations = result;

            //Log success
            //  navigator.notification.alert("Received list", console.log(result), "Conversation Received");
        },
        error: function (request, error) {



            conversations = null;


            //Log failure
            // var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            // navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return conversations;

}

function GetMessages(recipient_id) {

    var messages;

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getmessages/' + recipient_id,
        type: 'GET',
        async: false,
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
        success: function (result) {

            messages = result;

            //Log success
            //  navigator.notification.alert("Received Messages", console.log(result), "Conversation Received");
        },
        error: function (request, error) {


            messages = null;


            //Log failure
            // var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            //navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return messages;

}

function GetRecipients() {

    var recipients;

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getrecipients/',
        type: 'GET',
        async: false,
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
        success: function (result) {

            recipients = result;

            //Log success
            //   navigator.notification.alert("Received Messages", console.log(result), "Conversation Received");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return recipients;

}
