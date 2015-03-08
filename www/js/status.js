// JavaScript Document
$('#submitPostButton').click(function() {    
	$('.ul_current').append('<li>' + "<div><strong>" + $('#username').val() + ":</strong></div>" + "<div>" + $('#statusmessage').val() + "</div>" + '</li>' + '<hr />' );
resetform();
});

function resetform() {
document.getElementById("statusUpdateForm").reset();
}