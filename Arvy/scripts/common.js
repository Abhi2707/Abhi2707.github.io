function showInfo(bgcolor, msg) {
	if($('.info').size() == 0)
	{
		$('body').append('<div class="info"></div>');
	}
	time = 5000;
	$('.info').addClass(bgcolor).html(msg);
	$('.info').fadeIn('slow').delay(time).fadeOut('slow', function(){
		$(this).removeClass(bgcolor);
	});
}

function logMeIn(url)
{
	if (url.slice(-1) != '/') url = url + '/';
	username = $("#username").val();
	password = $("#password").val();
	$.post(url + "validate/",
		{username: username, password: password},
	function(data) {
		console.log(data);
		if (data == "<Ok/>")
		{
			window.location = url;
		}
		else
		{
			showInfo('red', "Invalid login!");
		}
	});
}

function removeListItem(obj)
{
	$(obj).parent().remove();
}

function swapListItem(obj)
{
	$('#sections-used').append($(obj).parent().parent()[0].outerHTML);
	$('#sections-used').sortable('refresh');
	$(obj).parent().parent().remove();
}

function mailForm()
{
	var fname = $("#footer #fname").val();
	var lname = $("#footer #lname").val();
	var phone = $("#footer #phone").val();
	var email = $("#footer #email").val();
	var message = $("#footer #message").val();
	
	$.post("/mail/submit/",
		{fname: fname, lname: lname, phone: phone, email: email, message: message},
	function(data) {
		console.log(data);
		if (data == "<Ok/>")
		{
			showInfo('green', "Your message has been sent.");
			$("#footer #fname").val("");
			$("#footer #lname").val("");
			$("#footer #phone").val("");
			$("#footer #email").val("");
			$("#footer #message").val("");
		}
		else
		{
			showInfo('red', "Unable to send your message!");
		}
	});
}

function mailFormCop()
{
	var fname = $("form#robocop #fname").val();
	var lname = $("form#robocop #lname").val();
	var phone = $("form#robocop #phone").val();
	var email = $("form#robocop #email").val();
	var message = $("form#robocop #message").val();
	
	$.post("/mail/submit/",
		{fname: fname, lname: lname, phone: phone, email: email, message: message},
	function(data) {
		console.log(data);
		if (data == "<Ok/>")
		{
			showInfo('green', "Your message has been sent.");
			$("form#robocop #fname").val("");
			$("form#robocop #lname").val("");
			$("form#robocop #phone").val("");
			$("form#robocop #email").val("");
			$("form#robocop #message").val("");
		}
		else
		{
			showInfo('red', "Unable to send your message!");
		}
	});
}

$(document).ready(function() {
	if ($('#summernote').length) $('#summernote').summernote({
		height: 400,
		codemirror: { // codemirror options
    theme: 'monokai'
  }
	});
	if ($('.sortable.connected').length > 1)
	{
		$('.sortable.connected').sortable({
				connectWith: '.connected'
			});
	}
	else
	{
		if ($('.sortable').length) $('.sortable').sortable();
	}
});

//$('.item-collection').addClass('load-item');

$(document).ready(function() {
	var threshold = $(window).height()/2;
	$('.item-collection').addClass('load-item');
	$('.load-item').each(function( index ){
		threshold = 120;
		if($(this).position().top > (threshold))
		{
			$(this).fadeTo(0,0);
		}
	});
	$('#showroom').parallax("50%", 0.1);
	$('#gregoryjezarian').parallax("50%", 0.1);
});

$(window).scroll(function(){
	$('.load-item').each(function( index ){
		if($(window).scrollTop() > ($(this).position().top - ($(this).height()/1)) ){
			$(this).fadeTo(800, 1);
			$(this).removeClass('load-item');
		}
	});
	
});