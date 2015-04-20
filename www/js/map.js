$(document).one('pageshow', '#mapPage', function () {
	    app.initialize();
});

    var longitude;
    var latitude;
    var latLong;
	var gmarkers = [];
	var locations = [];
	
    var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {

            // app.receivedEvent('deviceready');
            navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);

        },

        onSuccess: function (position) {
            
			longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            latLong = new google.maps.LatLng(latitude, longitude);
		
            var mapOptions = {
                center: latLong,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.trigger(map, 'resize');
			
			var locationmarker = {
               	url: 'img/newBlueDot.png',
               	anchor: new google.maps.Point(16, 0)
			}               
             var marker = new google.maps.Marker({
                map: map,
                title: 'my location',
                icon: locationmarker
              });
			 
			 setMarker(marker, position); 
			 watchCurrentPosition();
			           
            function setMarker(marker, pos){  
				marker.setPosition(
					new google.maps.LatLng(pos.coords.latitude,
                        pos.coords.longitude)
				);
			}
			
			function watchCurrentPosition() {
				var watchPos = navigator.geolocation.watchPosition(
					function (pos) {
						setMarker(marker, pos)
						PutLocation(pos.coords.longitude, pos.coords.latitude)
					});
			}

            function removeMarkers() {
                for (i = 0; i < gmarkers.length; i++) {
                    gmarkers[i].setMap(null);
                }
            }

            function getMarkers(){
				GetLocationList();
			}
			
			function getEventMarkers(){
				GetEventsList();
			}
			
			function addMarkers(locations) {
                var otherInfoWindow = new google.maps.InfoWindow(), otherMarker, p;
				
                for (p = 0; p < locations.length; p++) {
					
                    var otherLocationMarker = {
                        url: 'img/pink_Dot.png',
                        anchor: new google.maps.Point(16, 0)
                    }
					
                    var position = new google.maps.LatLng(locations[p].latitude, locations[p].longitude);
                    var otherMarker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: locations[p].lname,
                        icon: otherLocationMarker
                    });

                    gmarkers.push(otherMarker);

                    google.maps.event.addListener(otherMarker, 'click', (function (otherMarker, p) {
                        return function () {
                            otherInfoWindow.setContent(locations[p].fname + ' ' + locations[p].lname + '<br>' + 'Last Updated: ' + locations[p].locationdate);
                            otherInfoWindow.open(map, otherMarker);
                        }
                    })(otherMarker, p));

                }
				
				

            }
			
			getMarkers();
			getEventMarkers();
			
		function addEventMarkers(markers){
            var infoWindow = new google.maps.InfoWindow(), eventMarker, i;
			var hotelInfoWindow = new google.maps.InfoWindow(), hotelMarker;
			 
            var pinColor = "2F76EE";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));

            // Loop through our array of markers & place each one on the map  
            for (i = 0; i < markers.length; i++) {
                var pos = new google.maps.LatLng(markers[i].eventlat, markers[i].eventlng);
                var eventMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: pinImage,
                    title: markers[i].eventname
                });

                google.maps.event.addListener(eventMarker, 'click', (function (eventMarker, i) {
                    return function () {
                        infoWindow.setContent('<h2>' + markers[i].eventdate + '</h2>' + '<h3>' + markers[i].eventname + '</h3>' + '<h5>' + markers[i].address + '</h5>' + '<p>' + markers[i].description + '</p>');
                        infoWindow.open(map, eventMarker);
                    }
                })(eventMarker, i));

            }
			

var hotelPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "00b100",
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));

			 var hotelMarker = new google.maps.Marker({
                    map: map,
					icon: hotelPinImage, 
                    title: "Omni Nashville Hotel"
                });
				
				hotelMarker.setPosition(
					new google.maps.LatLng(36.157599, -86.775199)
				);
				
				google.maps.event.addListener(hotelMarker, 'click', (function (hotelMarker) {
                    return function () {
                        hotelInfoWindow.setContent('<h2>' + "Omni Nashville Hotel" + '</h2>' + '<h5>' + "250 Fifth Avenue South" + '<br>' + "Nashville, TN 37203" + '</h5>' + '<p>' + "The Omni Nashville Hotel is created specifically to be an authentic expression of the city's vibrant music culture. Across from the Music City Center, this downtown Nashville hotel is a one-of-a-kind experience, fully integrated with an expansion of the Country Music Hall of Fame® and Museum on three levels. " + '</p>');
                        hotelInfoWindow.open(map, hotelMarker);
                    }
                })(hotelMarker));
			
		};

            $(document).ready(function () {
                setInterval(function () {

                    getMarkers();

                }, 10000);
            });
			
	function GetLocationList() {
    //AJAX call to get a list of user locations
    $.ajax({
        url: S_ROOT + 'api/Profile/getlocations',
        type: 'GET',
        async: true,
		cache: false,
        contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

            //Show page loader
        },
        complete: function () {

			
        },
        success: function (result) {
			
			removeMarkers();
			addMarkers(result);
			console.log("other users location list updated");
			
        },
        error: function (request, error) {
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            // navigator.notification.alert(myError, console.log(myError), "Operation Failed");
        }
    });
	}
	
	function GetEventsList() {
    //AJAX call to get a list of user locations
    $.ajax({
        url: S_ROOT + 'api/Event/getevents',
        type: 'GET',
        async: true,
        contentType: "application/json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);
        },
        complete: function () {

        },
        success: function (result) {
			
			addEventMarkers(result);
			console.log("Event Location list obtained");
            
        },
        error: function (request, error) {
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Operation Failed");
        }
    });
}

        },
        onError: function (error) {
            alert("the code is " + error.code + ". \n" + "message: " + error.message);
        },
    };


//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------


function PutLocation(Longitude, Latitude) {
    //AJAX call to update location
    $.ajax({
        url: S_ROOT + 'api/Profile/putlocation/?lat=' + Latitude + '&lo=' + Longitude,
        type: 'PUT',
        async: true,
        contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

        },

        success: function (result) {

            //Log success
            console.log("Location updated");
        },
        error: function (request, error) {

            //Log failure
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            console.log(myError);
        }
    });

}



