$( document ).ready(function() {
  // appendMapScript();

  $('#map-container').on("ajax:success", '#new_pin form', function(e, data, status, xhr) {

  });

});

var map;
var pinArray;
var infoWindowArray = [];
var userMarkerArray = [];
var infoWindowMarkerToSave;
var geocoder;

function initMap() {

  geocoder = new google.maps.Geocoder();

  navigator.geolocation.getCurrentPosition(centerMap);
}

function centerMap(position) {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 15,
    center: {lat: position.coords.latitude, lng: position.coords.longitude}
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
    initAutocomplete();

    var request = $.ajax({
      url:      '/map',
      method:   'get',
      dataType: 'json'
    });

    request.done( function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        console.log(response[i]);
        var latLngLiteral = {
          lat: response[i].latitude,
          lng: response[i].longitude
        };

        console.log(latLngLiteral);
        if (!response[i].address) {
          reverseGeocode(latLngLiteral, next);
        } else {
          next(response[i].address);
        }
      }

      function next(inputAddressString) {
        placeDatabaseMarker(latLngLiteral, inputAddressString);
      }
    });
  });

  google.maps.event.addListener(map, 'click', function(event) {
    closeAllInfoWindows();
    removeUnsavedMarkers();

    var latLngLiteral = {
     lat: event.latLng.lat(),
     lng: event.latLng.lng()
    };

    reverseGeocode(latLngLiteral, next);

    function next(inputAddressString) {
      placeUserMarker(event.latLng, inputAddressString);
    }
  });
}

function closeAllInfoWindows() {
  for (var i = 0; i < infoWindowArray.length; i++) {
    infoWindowArray[i].close();
  }
}

function removeUnsavedMarkers() {
  for (var i = 0; i < userMarkerArray.length; i++) {
    userMarkerArray[i].setMap(null);
  }
  userMarkerArray = [];
}
