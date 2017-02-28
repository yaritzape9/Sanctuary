function stringOnInputStop() {
  timer = 0;

  function getString() {
    var searchString = $('#address').val();
    return searchString;
  }

  $('#address').on('keyup', function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(getString, 700);
  });
}
