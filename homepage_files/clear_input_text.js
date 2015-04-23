$(document).ready(function(){
	$('input[name="search"]').attr('alt', function(){
		return $(this).attr('value');
	});

	$('input[name="search"]').focus(function(){
		if ($(this).val() == $(this).attr('alt')){
			$(this).val('');
		}
	});

	$('input[name="search"]').blur(function(){
		if ($(this).val() == ''){
			$(this).val($(this).attr('alt'));
		}
	});
});
