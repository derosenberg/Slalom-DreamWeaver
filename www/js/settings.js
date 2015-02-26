// Holds any constants or settings for the program
//Constants are GLOBAL. They will be capitalized and will be prefixed with 'S_' for slalom

//Authentication Token
var S_TOKEN = "";

//Site Root - MUST START WITH HTTP AND END WITH /
var S_ROOT = "http://slalomtest3.azurewebsites.net/";

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
