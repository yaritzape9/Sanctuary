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

    request.done( function(response) {
      for (var i = 0; i < response.length; i++) {
        var marker = new google.maps.Marker({
          position: {lat: response[i].longitude, lng: response[i].latitude},
          map: map
        });
      }
    });
  }
}
