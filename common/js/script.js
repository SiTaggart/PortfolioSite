/* Author: Simon Taggart */
if (!window.st) window.st = {};
var st = window.st;

Modernizr.load({
	load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js',
	callback: function() {
		window._gaq = [['_setAccount','UA-10401619-1'],['_trackPageview'],['_trackPageLoadTime']];
	}
});

Modernizr.load([
	{
		load: '//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js',
		callback: function() {
			if (!window.jQuery) {
	            Modernizr.load('common/js/libs/jquery-1.5.min.js');
			}
		}
	}
]);

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

//load helper
Modernizr.load({
	load:'common/js/plugins.js'
});
Modernizr.load({
	load:'ielt9!/common/js/mylibs/selectivizr-min.js'
});
Modernizr.load({
	load:'common/js/plugins/widget-twitterList.js'
});
Modernizr.load({
	load:'common/js/plugins/widget-flickrList.js'
});
Modernizr.load({
	load:'common/js/plugins/widget-lastFmAlbum.js'
});
Modernizr.load({
	load:'common/js/plugins/skills-chart.js'
});

























