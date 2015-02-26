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

			var mapOptions = {
				center: latLong,
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"), mapOptions);


			var markers = [
            ['Location 1', 33.200932, -87.538735],
            ['Location 2', 33.212193, -87.553714],
            ['Location 3', 33.213007, -87.558909]
			];

			var infoWindowContent = [
            ['<div class="info_content">' +
            '<h3>Location 1</h3>' + '</div>'],
            ['<div class="info_content">' +
            '<h3>Location 2 </h3>' +
            '</div>'],
            ['<div class="info_content">' +
            '<h3>Location 3</h3>' + '</div>']
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