$( document ).ready(function() {

  appendMapScript();

});

function appendMapScript() {
  $('#map').append('<script async defer ' +
    'src="https://maps.googleapis.com/maps/api/js?key=' +
    'AIzaSyAfBUbEVb_FUnLMJSzzbp_siSXedx93Kvc&libraries=places&callback=initMap">' +
    '</script>');
}

var map;
var pinArray;
var infoWindowArray = [];
var userMarkerArray = [];

function initMap() {

  navigator.geolocation.getCurrentPosition(centerMap);

  function centerMap(position) {

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: {lat: position.coords.latitude, lng: position.coords.longitude}
    });

    initAutocomplete(map);

    var request = $.ajax({
      url:      '/map',
      method:   'get',
      dataType: 'json'
    });

    function placeDatabaseMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });

      var geocoder = new google.maps.Geocoder();
      var infoWindow = new google.maps.InfoWindow();

      infoWindowArray.push(infoWindow);

      geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
          if (results[1]) {
            infoWindow.setContent(results[1].formatted_address);
          } else {
            console.log(location);
            infoWindow.setContent(location.lat + ', ' + location.lng);
          }
        } else {
          console.log(location);
          infoWindow.setContent(location.lat + ', ' + location.lng);
        }
      });

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
      });
    }

    request.done( function(response) {
      // console.log(response);
      for (var i = 0; i < response.length; i++) {
        // console.log(response[i]);
        var latLngLiteral = {
          lat: response[i].latitude,
          lng: response[i].longitude
        };
        // console.log(latLngLiteral);
        placeDatabaseMarker(latLngLiteral);
      }
    });

    function closeAllInfoWindows() {
      for (var i = 0; i < infoWindowArray.length; i++) {
        infoWindowArray[i].close();
      }
    }

    function removeUnsavedMarkers() {
      for (var i = 0; i < userMarkerArray.length; i++) {
        userMarkerArray[i].setMap(null);
      }
    }

    google.maps.event.addListener(map, 'click', function(event) {
       closeAllInfoWindows();
       removeUnsavedMarkers();
       placeUserMarker(event.latLng);
    });
  }
}
