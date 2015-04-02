// Holds any constants or settings for the program
//Constants are GLOBAL. They will be capitalized and will be prefixed with 'S_' for slalom

//Authentication Token
var S_TOKEN = "";

//Site Root - MUST START WITH HTTP AND END WITH /
var S_ROOT = "http://slalominternaltest.azurewebsites.net/";
//var S_ROOT = "http://slalomhi8usclienttest.azurewebsites.net/";

//User Class
function S_User(Fname, Lname, Email, Password, ConfirmPass, Phone, GuestMail, ImgData) {
	this.fname = Fname;
	this.lname = Lname;
	this.email = Email;
	this.password = Password;
	this.confirm = ConfirmPass;
	this.phone = Phone;
	this.guest = GuestMail;
	this.imgData = ImgData;
	this.imgID = '';
}

//Global Timers
var S_TIMER = []

//Clears all timers
function S_ClearTime() {

    if (S_TIMER.length > 0) {
        for (i = 0; i < S_TIMER.length; i++) {
            clearInterval(S_TIMER[i]);
            console.log("Deleted timer " + i);
        }

        S_TIMER = [];
    }

}

//Global Pagehide
$("document").on('pagebeforehide', '#Home', function () {

    S_ClearTime();

    alert("pagebeforehide");
});