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

Modernizr.load({
	load: '//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js',
	callback: function() {
		if (!window.jQuery) {
            Modernizr.load('common/js/libs/jquery-1.5.min.js');
		}
	},
	complete: function() {
		st.siteInit();
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
		test: $('.widget-twitter').length !== 0,
		yep:'common/js/plugins/widget-twitterList.js',
		callback: function() {
			st.twitterList.init();
		}
	});

	Modernizr.load({
		test: $('.widget-flickr').length !== 0,
		yep:{
			'p': 'common/js/plugins/jquery.jFlickrFeed.js',
			'w': 'common/js/plugins/widget-flickrList.js'
		},
	    callback: {
	    	'w': function (url, result, key) {
				st.flickrList.init();
		    }
	    }
	});

	Modernizr.load({
		test: $('.widget-lastfm').length !== 0,
		yep:'common/js/plugins/widget-lastFmAlbum.js',
		callback: function() {
	        st.lastFMAlbum.getLastfmAlbum();
	    }
	});

	if($('#skills-table').length !== 0) {
		Modernizr.load({
			test: "undefined" == typeof window.Raphael,
		    yep: {
		        'r': 'common/js/mylibs/raphael-min.js',
		        'g': 'common/js/mylibs/g.raphael.js',
		        'p': 'common/js/mylibs/g.pie-min.js'
		    },
		    both: 'common/js/plugins/skills-chart.js',
		    complete: function(){
		        st.skillsChart.drawSkills();
		    }
		});
	}

}
















