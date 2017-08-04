$(document).ready( function () {
	$('#loginPanel').show();
	$('#createAccountPanel').hide();

	$('#createAcc').on('click', function(){
		event.preventDefault();
		
		$('#loginPanel').hide();
		$('#createAccountPanel').show();
	});

});

