$(document).ready( function(){
  $(this).on('ajax:error', function() {
    document.location.href = '/login';
  });
});
