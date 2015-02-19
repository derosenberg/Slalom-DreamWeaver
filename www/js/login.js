// JavaScript Document

var Token = "";


//Login Page Controls
$(document).on('pageinit','#login', function(){
	
	/*//Get user with token
	function GetProfile()
	{
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/values',
			headers: { 'Authorization': 'Bearer ' + Token },
			data: "username=" + $('#username').val() + "&password=" + $('#password').val() + "&grant_type",
			type: 'GET',
			async: true,
			dataType:"json",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				if(result.success){
					$.mobile.changePage("#map");
				}
				else{
					alert('login unsuccessful');
				}
			},
			error: function(request, error){
				alert('Error, sorry.');
			}
		});
	}*/
	
	//AJAX Call for login
	$(document).on('click','#loginSubmitBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/Token',
			data: "username=" + $('#username').val() + "&password=" + $('#password').val() + "&grant_type=password",
			type: 'POST',
			async: true,
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				Token = result.access_token
				$.mobile.changePage("#Home");
			},
			error: function(request, error){
				alert("Error " + request.status + ": " + request.responseJSON.error_description);
				//alert('Error, sorry.');
			}
		});
	});
});

//Forgot Password Page Controls
$(document).on('pageinit','#forgotPassword', function(){
	
	//AJAX call for password recovery
	$(document).on('click','#forgotPasswordBtn', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/Account/forgotpassword/',
			data: "Email=" + $('#emailForgot').val(),
			type: 'POST',
			async: true,
			contentType:"application/x-www-form-urlencoded",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
				$('#emailForgot').val("")
			},
			success: function(){
				alert("Success, email is in your inbox.");
				$.mobile.changePage("#login");
			},
			error: function(request, error){
				alert("Error " + request.status + ": " + request.responseJSON.Message);
				$.mobile.changePage("#login");
			}
		});
	});
});

//Registration page Controls
$(document).on('pageinit','#regisPage', function(){
	
	//AJAX call for Submit New User
	$(document).on('click','#submitNewUser', function(){
		$.ajax({
			url: 'http://slalomtest2.azurewebsites.net/api/account/register',
			data: "Email=" + $('#regisEmail').val() + "&Password=" + $('#regisPassword').val() + "&ConfirmPassword=" + $('#ConfirmPassword').val() + "&fname=" + $('#fname').val() + "&lname=" + $('#lname').val() + "&phone=" + $('#phone').val() + "&picture=" + $('#regisPic').val() + "&guestEmail=" + $('#guestemail').val(),
			type: 'POST',
			async: true,
			contentType:"application/x-www-form-urlencoded",
			beforeSend: function(){
				$.mobile.showPageLoadingMsg(true);
			},
			complete: function(){
				$.mobile.hidePageLoadingMsg();
			},
			success: function(result){
				alert('Congratulations, user registration was successful.');
				$.mobile.changePage("#login");
			},
			error: function(request, error){
				console.log(request);
				var myError = "Error " + request.status + ": " + request.responseJSON.Message;
				alert(myError);
				
				$.mobile.changePage("#login");
			}
		});
	});
});

$(document).on('pageinit', '#Home', function(){
	$.ajax({
		url: 'http://slalomtest2.azurewebsites.net/api/values/',
		type: 'GET',
		async: true,
		dataType:"json",
		beforeSend: function(request){
			//request.withCredentials = true;
        //	request.setRequestHeader("Authorization", "Basic " + Token);
		},
		success: function(result){
			console.log(result);
		},
		error: function(request, error){
			alert('Error, sorry.');
		}
	});
	
});

$(document).on('pageinit', '#mapPage', function(){

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // app.receivedEvent('deviceready');
       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position){
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var locationmarker = {
            url: 'img/blue_dot.png',
            anchor: new google.maps.Point(16, 0)
        }
        var marker = new google.maps.Marker({
              position: latLong,
              map: map,
              title: 'my location',
              icon: locationmarker
          });
    },
    
    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};

app.initialize();

afterEach(function() {
    document.getElementById('stage').innerHTML = '';
});

var helper = {
    trigger: function(obj, name) {
        var e = document.createEvent('Event');
        e.initEvent(name, true, true);
        obj.dispatchEvent(e);
    },
    getComputedStyle: function(querySelector, property) {
        var element = document.querySelector(querySelector);
        return window.getComputedStyle(element).getPropertyValue(property);
    }
};

describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});
});
