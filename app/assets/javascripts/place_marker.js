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

function placeDatabaseMarker(newMarkerlocation,
                             newMarkerAddressString,
                             newMarkerReportId,
                             newMarkerReportScore) {
  var newDatabaseMarker = createMarker(newMarkerlocation);

  setupNewInfoWindow(newDatabaseMarker, next);

  function next(inputInfoWindow) {
    setDbInfoWindow(inputInfoWindow,
                    newMarkerAddressString,
                    newMarkerReportId,
                    newMarkerReportScore);
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

function setUserInfoWindow(inputInfoWindow,
                           inputLocation,
                           inputAddressString) {
  setFormValues(inputLocation, inputAddressString, next);

  function next() {
    getNewPinInfoWindow(next);

    function next(newPinInfoWindowHtml) {
      inputInfoWindow.setContent(newPinInfoWindowHtml);
    }
  }
}

function setDbInfoWindow(inputInfoWindow,
                         inputAddressString,
                         inputReportId,
                         inputMarkerReportScore) {

  var $form;
  getInfoWindowContents(next);

  function next() {
    setInfoWindowContents(next);

    function next() {
      setUpvotePinId(next);

      function  next() {
        setReportScore(next);

        function next() {
          setDownvotePinId(next);

          function next() {
            setFormattedAddress();
          }
        }
      }
    }
  }


  function setFormattedAddress() {
    $('#report-' + inputReportId + ' .formatted-address').text(inputAddressString);
  }

  function setDownvotePinId(callback) {
    $('#report-' + inputReportId +
      ' .pin-downvote-form .pin-id-input').attr('value', inputReportId);

    callback();
  }

  function setReportScore(callback) {
    $('#report-' + inputReportId + ' .vote-count').text(inputMarkerReportScore);

    callback();
  }

  function setUpvotePinId(callback) {
    console.log($('#report-' + inputReportId).html());
    $('#report-' + inputReportId +
      ' .pin-upvote-form .pin-id-input').val(inputReportId);

    callback();
  }

  function setInfoWindowContents(callback) {

    inputInfoWindow.setContent(
      '<div id="report-' + inputReportId + '">' +
        $form +
      '</div>'
    );

    callback();
  }

  function getInfoWindowContents(callback) {
    $form = $('.existing-pin-info').html();

    callback();
  }

}


function getForm(callback) {
  callback($('#new-pin-infowindow').html());
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

  function setFormLat(inputLat, callback) {
    $('#blank-form #pin_latitude').val(inputLat);
    callback();
  }

  function setFormLng(inputLng, callback) {
    $('#blank-form #pin_longitude').val(inputLng);
    callback();
  }

  function setFormAddress(inputAddress, callback) {
    $('#blank-form #pin_address').val(inputAddress);
    callback();
  }
}
