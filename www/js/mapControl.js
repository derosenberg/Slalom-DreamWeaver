//Map page JS
$(document).on('pageinit', '#mapPage', function () {

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
			var longitude = position.coords.longitude;
			var latitude = position.coords.latitude;
			var latLong = new google.maps.LatLng(latitude, longitude);
			var gmarkers = [];
			var mMarker = [];
			

			var mapOptions = {
				center: latLong,
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			
			
		function removeMarkers(){
    		for(i=0; i<gmarkers.length; i++){
       			gmarkers[i].setMap(null);
    		}
			for(i=0; i<mMarker.length; i++){
       			mMarker[i].setMap(null);
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
						otherInfoWindow.setContent(locations[p].fname + ' ' +locations[p].lname);
						otherInfoWindow.open(map, otherMarker);
					}
				})(otherMarker, p));
			
			}
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
				mMarker.push(marker);
		}
			
			addMarkers();
			
			$(document).ready(function(){
       		setInterval(function() {
				
				removeMarkers();
				addMarkers();

			var markers = [
            ['Location 1', 33.200932, -87.538735],
            ['Location 2', 33.212193, -87.553714],
            ['Location 3', 33.213007, -87.558909]
			];

			var infoWindowContent = [
            ['<div class="info_content">' +
            '<h3>Tequila Cowboy</h3>' + '<h5>305 Broadway Nashville, TN 37201</h5>' +'<p>Buzzy, multi-roomed nightspot featuring a live music stage, dance club, game area & mechanical bull.</p>' + '</div>'],
            ['<div class="info_content">' +
            '<h3>Honky Tonk Central</h3>' + '<h5>329 Broadway Nashville, TN 37201</h5>' +'<p>Bustling 3-story gathering place featuring pub eats & live country music all day long</p>' + '</div>'],
            ['<div class="info_content">' +
            '<h3>The Farm House</h3>' + '<h5>210 Almond St Nashville, TN 37201</h5>' +'<p>Reimagined, farm-fresh Southern classics, local brews & house-flavored 		moonshine in a hip space</p>' + '</div>']
			];

			var infoWindow = new google.maps.InfoWindow(), eventMarker, i;

			// Loop through our array of markers & place each one on the map  
			for (i = 0; i < markers.length; i++) {
				var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
				var eventMarker = new google.maps.Marker({
					position: pos,
					map: map,
					title: markers[i][0]
				});



				google.maps.event.addListener(eventMarker, 'click', (function (eventMarker, i) {
					return function () {
						infoWindow.setContent(infoWindowContent[i][0]);
						infoWindow.open(map, eventMarker);
					}
				})(eventMarker, i));

			}
						
    		PutLocation(longitude, latitude);
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