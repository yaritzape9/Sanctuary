function placeUserMarker(newMarkerlocation, newUserAddressString) {
  var newUserMarker = createMarker(newMarkerlocation);
  putInUserMarkerArray(newUserMarker);

  setupNewInfoWindow(newUserMarker, next);

  function next(inputInfoWindow) {
    setUserInfoWindow(inputInfoWindow, newMarkerlocation, newUserAddressString);
    inputInfoWindow.open(map, newUserMarker);
    infoWindowMarkerToSave = inputInfoWindow.Anchor;
  }
}

function placeDatabaseMarker(newMarkerlocation, newMarkerAddressString) {
  var newDatabaseMarker = createMarker(newMarkerlocation);

  setupNewInfoWindow(newDatabaseMarker, setWindowContent);

  function setWindowContent(inputInfoWindow) {
    inputInfoWindow.setContent(newMarkerAddressString);
  }
}

function setupNewInfoWindow(inputMarker, callback) {
  var newInfoWindow = new google.maps.InfoWindow();

  putInInfoWindowArray(newInfoWindow, next);

  function next(infoWindow) {
    google.maps.event.addListener(inputMarker, 'click', function() {
      infoWindow.open(map, inputMarker);
    });
  }
  if (callback) { callback(newInfoWindow); }
}

function setUserInfoWindow(inputInfoWindow, inputLocation, inputAddressString) {

  setFormValues(inputLocation, inputAddressString, next);

  function next() {
    getForm(next);

    function next(formHtml) {
      inputInfoWindow.setContent(
        '<span id="ask_if_report">Report raid at or near</span><br><br>' +
        '<span id="address">' + inputAddressString +
        ' ?</span><br><br>' + '<div id="new_pin">' + formHtml +'</div>'
      );
    }
  }
}

function getForm(callback) {
  callback($('#_form').html());
}

function createMarker(inputLocation) {
  var marker = new google.maps.Marker({
    position: inputLocation,
    map: map
  });

  return marker;
}

function putInUserMarkerArray(inputMarker) {
  userMarkerArray.push(inputMarker);
}

function putInInfoWindowArray(inputInfoWindow, callback) {
  infoWindowArray.push(inputInfoWindow);
  callback(inputInfoWindow);
}

function setFormValues(inputLocation, inputAddressString, callback) {
  setFormLat(inputLocation.lat, next);

  function next() {
    setFormLng(inputLocation.lng, next);

    function next() {
      setFormAddress(inputAddressString, next);

      function next() {
        callback();
      }
    }
  }
}

function setFormLat(inputLat, callback) {
  $('#_form #pin_latitude').val(inputLat);
  callback();
}

function setFormLng(inputLng, callback) {
  $('#_form #pin_longitude').val(inputLng);
  callback();
}

function setFormAddress(inputAddress, callback) {
  $('#_form #pin_address').val(inputAddress);
  callback();
}
