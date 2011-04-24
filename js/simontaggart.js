$(function() {
/*place jQuery actions here*/
	
	//hide content on load
	$('.example-sites ul').animate({'height': '290px'}, "slow").addClass('collapsed');
	//add the show hide button
	$('.example-sites').append('<a href=\"#\" class=\"show-more\">Show more +</a>');
	
	//Slide content
	$('.show-more').click(function(){
		if($('.example-sites ul').hasClass('collapsed'))
			$('.example-sites ul').animate({'height': '1200'}, 'slow').removeClass('collapsed').addClass('expanded');
		else
			$('.example-sites ul').animate({'height': '290px'}, 'slow').removeClass('expanded').addClass('collapsed');
		$(this).text(($(this).text() == 'Show more +') ? 'Show less -' : 'Show more +');
		return false;
	});
	
	$(".example-sites p a").hover(
  		function () {
    		$(this).parent().prev().children().addClass("hover");
  		},
  		function () {
    		$(this).parent().prev().children().removeClass("hover");
  		}
	);
	
	$(".example-sites h3 a").hover(
  		function () {
    		$(this).parent().next().children().addClass("hover");
  		},
  		function () {
    		$(this).parent().next().children().removeClass("hover");
  		}
	);
});
