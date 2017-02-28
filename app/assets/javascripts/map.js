$( document ).ready(function() {
  // geocodeSearch(stringOnInputStop());
  console.log('doc ready');
  appendMapScript();
});

// function geocodeSearch(input) {
//   var geocoder = new google.maps.Geocoder();
//
//   function geocodeAddress(geocoder, resultsMap)
// }

function appendMapScript() {
  console.log($('#map'));
  $('#map').append('<script async defer ' +
    'src="https://maps.googleapis.com/maps/api/js?key=' +
    'AIzaSyAfBUbEVb_FUnLMJSzzbp_siSXedx93Kvc&callback=initMap">' +
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

      var latLng = {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};

      geocoder.geocode({'location': latLng}, function(results, status) {
        if (status === 'OK') {
          if (results[1]) {
            infoWindow.setContent(results[1].formatted_address);
          } else {
            infoWindow.setContent(latLng.lat + ', ' + latLng.lng);
          }
        } else {
          infoWindow.setContent(latLng.lat + ', ' + latLng.lng);
        }
      });

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
      });
    }

    request.done( function(response) {
      for (var i = 0; i < response.length; i++) {
        var latLngLiteral = {
          lat: response[i].latitude,
          lng: response[i].longitude
        };

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
