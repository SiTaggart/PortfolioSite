/* Author: Simon Taggart */
if (!window.st) window.st = {};
var st = window.st;

//Load fonts
Modernizr.load({
	test: "undefined" == typeof window.WebFont,
	yep: '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
	callback: function() {
		WebFont.load({
			typekit: {
				id: 'ecr4fxx'
			}
		});
	}
});

//load utilities
Modernizr.load({
	load:[
		'ielt9!/common/js/mylibs/selectivizr-min.js',
		'common/js/plugins.js'
	]
});

st.siteInit = function(){

	Modernizr.load({
		load:[
			'common/js/plugins/widget-twitterList.js',
			'common/js/plugins/jquery.jFlickrFeed.js',
			'common/js/plugins/widget-flickrList.js',
			'common/js/plugins/widget-lastFmAlbum.js'
		]
	});

}
$(function(){
	st.siteInit();
	
	// initialize the plugin, pass in the class selector for the sections of content (blocks)
	var scrollorama = $.scrollorama({ blocks:'.scrollblock', enablePin:false });
	scrollorama.animate('#who .scrollblock-fade',{ delay: 300, duration: 400, property:'opacity', start:0, end:1 });
	scrollorama.animate('#who h4',{ delay: 1200, duration: 400, property:'opacity', start:0, end:1 });
	scrollorama.animate('#move .scrollblock-fade',{ delay: 200, duration: 200, property:'opacity', start:0, end:1 });
	scrollorama.animate('#bio .scrollblock-fade',{ delay: 300, duration: 400, property:'opacity', start:0, end:1 });
	scrollorama.animate('#stuff .scrollblock-fade',{ delay: 300, duration: 400, property:'opacity', start:0, end:1 });
	scrollorama.animate('#example-morethan .scrollblock-fade',{ delay: 100, duration: 600, property:'opacity', start:0, end:1 });
	scrollorama.animate('#example-orchard .scrollblock-fade',{ delay: 100, duration: 600, property:'opacity', start:0, end:1 });
	scrollorama.animate('#example-myswitch .scrollblock-fade',{ delay: 100, duration: 600, property:'opacity', start:0, end:1 });
	scrollorama.animate('#example-mycoffee .scrollblock-fade',{ delay: 100, duration: 600, property:'opacity', start:0, end:1 });
	scrollorama.animate('#tweets .scrollblock-fade',{ delay: 300, duration: 400, property:'opacity', start:0, end:1 });
	scrollorama.animate('#pics .scrollblock-fade',{ delay: 300, duration: 400, property:'opacity', start:0, end:1 });
	scrollorama.animate('#albums .scrollblock-fade',{ delay: 300, duration: 400, property:'opacity', start:0, end:1 });

	scrollorama.onBlockChange(function(){
		if(scrollorama.blockIndex > 0) st.stickyLinks.show();
		else st.stickyLinks.hide();
	});

	var waitForIt = setTimeout(function(){
		$('#scroll-indication').addClass('go');
	}, 5000);

	st.stickyLinks.init();
	st.setGreeting();
});

st.stickyLinks = {
	$links: '',
	$sticky: '',

	init: function() {
		this.$links = $('.contact-thingy-majigs').clone().addClass('contact-thingy-majigs-sticky');
		this.$sticky = $('<div />', {'class':'sticky-links'});
		this.$sticky.append(this.$links);
		$('body').prepend(this.$sticky);
	},

	show: function() {
		this.$sticky.addClass('on');
	},

	hide: function() {
		this.$sticky.removeClass('on');
	}
};

st.setGreeting = function() {
	var datetoday = new Date(),
		timenow = datetoday.getTime(),
		thehour,
		greeting;
	datetoday.setTime(timenow);
	thehour = datetoday.getHours();
	if (thehour > 17) greeting = 'Evening';
	else if (thehour >12) greeting = 'Afternoon';
	else greeting = 'Morning';
	$('header h1').text('Good ' + greeting);
}


















