//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//                                         NEW CALLBACK CALLS
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------


//On initialization of conversations page
$(document).on('pageinit', '#conversations', function () {

    //Get the list of recipients (AJAX call)
    GetRecipients();

    //Event listener that loads the messages page when a recipient is clicked
    $(document).on('click', '.recipientList', function () {
        LoadMessagesFromRecipient($(this).val(), $(this).text())
    });

    //Event listener that loads the messages page when a conversation div is clicked
    $(document).on('click', '.conversationContainer', function () {

        //Change the page to messages
        $.mobile.changePage("#messages");

        //Load the messages on the page
        LoadMessagesFromRecipient($(this).find(":input").val(), $(this).find(".conversationName").text());

    });

});

//Every time the conversations page is shown
$(document).on('pageshow', '#conversations', function () {
    GetConversations()
});

//Load available recipients from the server
function GetRecipients() {

    $.ajax({
        url: S_ROOT + 'api/conversations/getrecipients/',
        type: 'GET',
        beforeSend: function (request) {
            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);
        },

        //On success, add recipients to list
        success: function (result) {
            AddRecipientsToList(result)
        },

        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Can't load recipients");
        }
    });

    return;
}

//Once recipients have loaded, add them to the list
function AddRecipientsToList(recipients) {

    //Empty the list
    $("#popupMenu1").empty();

    //Build the list
    for (i = 0; i < recipients.length; i++) {
        $("#popupMenu1").append("<li class='recipientList' value='" + recipients[i].ProfileID + "'><a href='#messages'>" + recipients[i].fname + " " + recipients[i].lname + "</a></li>");
    }
}

//Get a list of conversations
function GetConversations() {

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getconversations',
        type: 'GET',
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {
            //On success, add conversations to list
            AddConversationsToList(result);
        },
        error: function (request, error) {

            //Log failure
            // var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            // navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return;

}

//Once conversations have loaded, add them to list
function AddConversationsToList(conversations)
{
    //Empty conversations page
    $("#conversationPageContent").empty();

    //Add the conversations to the page
    if (conversations != null) {
        for (i = 0; i < conversations.length; i++) {
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
}


//On initialize message page
$(document).on('pageinit', '#messages', function () {

    //Onclick for the send message button
    $(document).on('click', '#sendMessage', function (e) {

        //Prevent auto redirect
        e.preventDefault();

        //Post Message
        PostMessage($('#recipientId').val(), $('#messageBody').val());

        //Clear message
        $("#messageBody").val("");

    });
});

//Function for each time recipients are loaded
function LoadMessagesFromRecipient(recipient_id, recipient_name) {

    //Empty page of content first thing
    $("#messagePageContent").empty();

    var recipient_id = $("#recipientId").val();

    GetMessages(recipient_id);
}

function GetMessages(recipient_id) {

    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/getmessages/' + recipient_id,
        type: 'GET',
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

        //On success, add messages ot the page
        success: function (result) {
            AddMessagesToPage(result)
        },

        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Unable to Load");
        }
    });

    return;

}

//Post a message to the server
function PostMessage(recipient, message) {


    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/conversations/',
        type: 'POST',
        data: '{ "recipient_id": "' + recipient + '", "text": "' + message + '" }',
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (message) {
            OnMessageIsSent(message)
        },

        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Message Send Failed");
        }
    });

}

//Function controlling a successful send message
function OnMessageIsSent(messagetext) {

    //Create new message bubble
    $("#messagePageContent").append("<div class='messageContainer'><div class='senderMessage'>" + messagetext + "</div></div>")
}

//Add a conversation to a messages page
function AddMessagesToPage(conversation) {

    if (conversation != null) {
        for (i = 0; i < conversation[0].Messages.length; i++) {
            if (conversation[0].Messages[i].ProfileID == recipient_id)
                $("#messagePageContent").append("<div class='messageContainer'><div class='recipientMessage'>" + conversation[0].Messages[i].messagetext + "</div></div>");
            else
                $("#messagePageContent").append("<div class='messageContainer'><div class='senderMessage'>" + conversation[0].Messages[i].messagetext + "</div></div>");
        }
    }

}