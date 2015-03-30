//Map page JS
$(document).one('pageshow', '#mapPage', function () {
    var longitude;
    var latitude;
    var latLong;
    var mMarker = [];
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
            var gmarkers = [];

            var mapOptions = {
                center: latLong,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.trigger(map, 'resize');

            $(document).ready(function () {
                setInterval(function () {
                    var appPlacment = {

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
                            navigator.geolocation.getCurrentPosition(appPlacment.onSuccess, appPlacment.onError);

                        },

                        onSuccess: function (position) {
                            longitude = position.coords.longitude;
                            latitude = position.coords.latitude;
                            latLong = new google.maps.LatLng(latitude, longitude);

                            function clearOverlays() {
                                for (var i = 0; i < mMarker.length; i++) {
                                    mMarker[i].setMap(null);
                                }
                                var marker = new google.maps.Marker({
                                    position: latLong,
                                    map: map,
                                    title: 'my location',
                                    icon: locationmarker
                                });
                                mMarker.push(marker);
                            }


                            var locationmarker = {
                                url: 'img/newBlueDot.png',
                                anchor: new google.maps.Point(16, 0)
                            }

                            clearOverlays();
                            PutLocation(longitude, latitude);




                        },
                        onError: function (error) {
                            alert("the code is " + error.code + ". \n" + "message: " + error.message);
                        },
                    };
                    appPlacment.initialize();
                }, 2000);
            });


            function removeMarkers() {
                for (i = 0; i < gmarkers.length; i++) {
                    gmarkers[i].setMap(null);
                }

            }

            function addMarkers() {
                var locations = GetLocationList();

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

                    gmarkers.push(otherMarker)

                    google.maps.event.addListener(otherMarker, 'click', (function (otherMarker, p) {
                        return function () {
                            otherInfoWindow.setContent(locations[p].fname + ' ' + locations[p].lname + '<br>' + 'Last Updated: ' + locations[p].locationdate);
                            otherInfoWindow.open(map, otherMarker);
                        }
                    })(otherMarker, p));

                }

            }

            addMarkers();

            var markers = GetEventsList();

            var infoWindow = new google.maps.InfoWindow(), eventMarker, i;

            var pinColor = "2F76EE";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));
            var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));

            // Loop through our array of markers & place each one on the map  
            for (i = 0; i < markers.length; i++) {
                var pos = new google.maps.LatLng(markers[i].eventlat, markers[i].eventlng);
                var eventMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: pinImage,
                    shadow: pinShadow,
                    title: markers[i].eventname
                });

                google.maps.event.addListener(eventMarker, 'click', (function (eventMarker, i) {
                    return function () {
                        infoWindow.setContent('<h2>' + markers[i].eventdate + '</h2>' + '<h3>' + markers[i].eventname + '</h3>' + '<h5>' + markers[i].address + '</h5>' + '<p>' + markers[i].description + '</p>');
                        infoWindow.open(map, eventMarker);
                    }
                })(eventMarker, i));

            }





            $(document).ready(function () {
                setInterval(function () {

                    removeMarkers();
                    addMarkers();

                }, 10000);
            });
        },
        onError: function (error) {
            alert("the code is " + error.code + ". \n" + "message: " + error.message);
        },
    };

    app.initialize();

    afterEach(function () {
        document.getElementById('stage').innerHTML = '';
    });

    var helper = {
        trigger: function (obj, name) {
            var e = document.createEvent('Event');
            e.initEvent(name, true, true);
            obj.dispatchEvent(e);
        },
        getComputedStyle: function (querySelector, property) {
            var element = document.querySelector(querySelector);
            return window.getComputedStyle(element).getPropertyValue(property);
        }
    };

    describe('app', function () {
        describe('initialize', function () {
            it('should bind deviceready', function () {
                runs(function () {
                    spyOn(app, 'onDeviceReady');
                    app.initialize();
                    helper.trigger(window.document, 'deviceready');
                });

                waitsFor(function () {
                    return (app.onDeviceReady.calls.length > 0);
                }, 'onDeviceReady should be called once', 500);

                runs(function () {
                    expect(app.onDeviceReady).toHaveBeenCalled();
                });
            });
        });

        describe('onDeviceReady', function () {
            it('should report that it fired', function () {
                spyOn(app, 'receivedEvent');
                app.onDeviceReady();
                expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
            });
        });

        describe('receivedEvent', function () {
            beforeEach(function () {
                var el = document.getElementById('stage');
                el.innerHTML = ['<div id="deviceready">',
                                '    <p class="event listening">Listening</p>',
                                '    <p class="event received">Received</p>',
                                '</div>'].join('\n');
            });

            it('should hide the listening element', function () {
                app.receivedEvent('deviceready');
                var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
                expect(displayStyle).toEqual('none');
            });

            it('should show the received element', function () {
                app.receivedEvent('deviceready');
                var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
                expect(displayStyle).toEqual('block');
            });
        });
    });
});

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
function GetLocationList() {

    var locations;

    //AJAX call to get a list of user locations
    $.ajax({
        url: S_ROOT + 'api/Profiles/getlocations/',
        type: 'GET',
        async: false,
        contentType: "application/x-www-form-urlencoded",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

            //Show page loader
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {

            locations = result;
        },
        error: function (request, error) {
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            // navigator.notification.alert(myError, console.log(myError), "Operation Failed");
        }
    });

    return locations;
}

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



function GetEventsList() {

    var events;

    //AJAX call to get a list of user locations
    $.ajax({
        url: S_ROOT + 'api/Event/getevents',
        type: 'GET',
        async: false,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (request) {

            //Attaches credentials to AJAX call
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer " + S_TOKEN);

            //Show page loader
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {

            //Hide loader
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {

            events = result;
        },
        error: function (request, error) {
            var myError = "Error " + request.status + ": " + request.responseJSON.Message;
            navigator.notification.alert(myError, console.log(myError), "Operation Failed");
        }
    });

    return events;
}