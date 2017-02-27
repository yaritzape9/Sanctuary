var map;
var pinArray;

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

    function placeMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });


      var geocoder = new google.maps.Geocoder();
      var infoWindow = new google.maps.InfoWindow();

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
          lat: response[i].longitude,
          lng: response[i].latitude
        };

        placeMarker(latLngLiteral);
      }
    });

    google.maps.event.addListener(map, 'click', function(event) {
       placeMarker(event.latLng);
    });
  }
}
