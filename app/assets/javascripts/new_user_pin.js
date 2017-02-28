function placeUserMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  userMarkerArray.push(marker);

  var infoWindow = new google.maps.InfoWindow();

  infoWindowArray.push(infoWindow);

  var geocoder = new google.maps.Geocoder();
  var latLng = {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};
  var address;

  geocoder.geocode({'location': latLng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        setInfoWindow(results[1].formatted_address);
      } else {
        setInfoWindow(latLng.lat + ', ' + latLng.lng);
      }
    } else {
      setInfoWindow(latLng.lat + ', ' + latLng.lng);
    }
  });

  function setInfoWindow(address) {
    infoWindow.setContent('<p>Report raid at or near<br>' + address + ' ?</p><div id="new_pin_form"></div>');
  }

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);

    var $pinDiv = $('#new_pin_form');
    var form = $('#_form').html();

    $pinDiv.html(form);

    $('#new_pin_form #pin_latitude').val(location.lat());
    $('#new_pin_form #pin_longitude').val(location.lng());
  });
}
