$(document).ready(function(){
  toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$('#downloads').hide();
$('#obs').attr('readonly','readonly');

var newRegister = function(){
var name = $('#name').val();
var mail = $('#email').val();
var address = $('#address').val();

var phone = $('#phone').val();

if (name == '' || name == '' || address == '' || phone == '') {
  toastr["error"]("Por favor completa los campos");
}else {
  $.ajax({
    method:'GET',
    url:'/admin_implan/public/save_people/',
    data: {name: name, mail: mail, address: address, phone: phone},
    success: function(response){

      toastr["success"]("Registro guardado correctamente");
      $('#name').val('');
      $('#email').val('');
      $('#address').val('');
      $('#phone').val('');
    }
  });
  $('#downloads').show();
}
}
var newObservation = function(){
  var nameobs = $('#obsname').val();
  var mailobs = $('#obsemail').val();
  var obs = $('#obs').val();
  if (nameobs == '' || mailobs == '' || obs == '') {
    toastr["error"]("Por favor completa los campos");
  }else {
    $.ajax({
      method:'GET',
      url:'/admin_implan/public/save_observations',
      data:{mail:mailobs,obs:obs},
      success: function(response){
         $('#obsname').val('');
         $('#obsemail').val('');
         $('#obs').val('');
         toastr["success"]("Observación guardada correctamente, gracias por participar");
      }
    });
  }
}
$('#obsemail').blur(function(){
  var mailobs = $('#obsemail').val();
  $.ajax({
    method:'GET',
    url:'/admin_implan/public/mail_validate/',
    data:{mail:mailobs},
    success: function(response){
      if(response === "mail not found") {
        $('#obs').attr('readonly','readonly');
      }else {
        $('#obs').attr("readonly", false);
      }
    }
  });
});
$('#sm').on('click', newRegister);
$('#obsreg').on('click', newObservation);
});
