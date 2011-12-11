/* Author: Simon Taggart */
if (!window.st) window.st = {};
var st = window.st;

Modernizr.load({
	load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js',
	complete: function() {
		window._gaq = [['_setAccount','UA-10401619-1'],['_trackPageview'],['_trackPageLoadTime']];
	}
});

Modernizr.load([
	{
		load: '//ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.js',
		complete: function() {
			if (!window.jQuery) {
	            Modernizr.load('common/js/libs/jquery-1.5.min.js');
			}
		}
	},
	{
		complete: function(){
			st.portfolio();
		}
	}
]);

st.portfolio = function() {

	this.load = function() {
		//Load fonts
		Modernizr.load({
			test: "undefined" == typeof window.WebFont,
			load: '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
			complete: function() {
				WebFont.load({
					typekit: {
						id: 'ecr4fxx'
					}
				});
			}
		});
		//load helper
		Modernizr.load({
			load: 'ie6!ie7!ie8!common/js/plugins.js'	
		});
		//load selectivizr
		Modernizr.load({
			load: 'ie6!ie7!ie8!common/js/mylibs/selectivizr-min.js'	
		});
		//Skills chart
		Modernizr.load({
			test: $('#skills-table').length !== 0,
			load: 'common/js/plugins/skills-chart.js'
		});
		//Twitter List
		Modernizr.load({
			test: $('.widget-twitter').length !== 0,
			load: 'common/js/plugins/widget-twitterList.js'
		});
		//Flickr List
		Modernizr.load({
			test: $('.widget-flickr').length !== 0,
			load: 'common/js/plugins/widget-flickrList.js'
		});
		//LastFm Album
		Modernizr.load({
			test: $('.widget-lastfm').length !== 0,
			load: 'common/js/plugins/widget-lastFmAlbum.js'
		});

	}
	this.load();
} 

























