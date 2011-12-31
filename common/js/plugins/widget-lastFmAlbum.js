if (!window.lastFMAlbum) window.lastFMAlbum = {};
var lastFMAlbum = window.lastFMAlbum;

(function($) {
	if($('.widget-lastfm').length === 0) return;
	lastFMAlbum.getLastfmAlbum = function(){
		var mbid,
		$albumHolder = $('.feature-social .widget-lastfm'),
		$imgHolder = $('<img />')
		$albumLink = $('<a />');

		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql?q=USE%20%22http%3A%2F%2Fwww.simontaggart.com%2Fcommon%2Fxml%2Flastfm.albumchart.xml%22%20AS%20lastfm%3B%20SELECT%20*%20FROM%20lastfm%20where%20api_key%3D%22fd37cceba5468d6c57c10847105dd889%22%20and%20user%3D%22si_taggart%22%3B&format=json&diagnostics=true',
			type: 'GET',
			dataType: 'jsonp',
			success: function(data, textStatus, xhr) {
				//find the albums of the week chart and find the first one that does in fact have an id
				if(!data.query.results.lfm.weeklyalbumchart.album.length) {
					mbid = data.query.results.lfm.weeklyalbumchart.album.mbid;
				} else {
					for (var i=0; i < data.query.results.lfm.weeklyalbumchart.album.length; i++) {
					    if (data.query.results.lfm.weeklyalbumchart.album[i].mbid !== null) {
						    mbid = data.query.results.lfm.weeklyalbumchart.album[i].mbid;
						    break;
					    };
					};
				};
				if(!mbid) { 
					$albumHolder.html('<p>Woops, can&rsquo;t find that album on Last Fm <a href="http://www.last.fm/user/si_taggart">go here instead if you&rsquo;re that fussed</a>.</p>');
					return;
				};
				$.ajax({
					url: 'http://query.yahooapis.com/v1/public/yql?q=USE%20%22http%3A%2F%2Fwww.simontaggart.com%2Fcommon%2Fxml%2Flastfm.albuminfo.xml%22%20AS%20lastfm%3B%20SELECT%20*%20FROM%20lastfm%20where%20api_key%3D%22fd37cceba5468d6c57c10847105dd889%22%20and%20mbid%3D%22'+mbid+'%22%3B&format=json&diagnostics=true }',
					type: 'GET',
					dataType: 'jsonp',
					success: function(data, textStatus, xhr) {
						$imgHolder.attr('src', data.query.results.lfm.album.image[2].content);
						$albumHolder.html($imgHolder);
						$albumLink.attr('href', data.query.results.lfm.album.url);
						$imgHolder.wrap($albumLink);
					},
					error: function(xhr, textStatus, errorThrown) {
						$albumHolder.html('<p>Woops, something broke so just go <a href="http://www.lastfm.com/si_taggart">here instead if you&rsquo;re that fussed</a>.</p>');
					}
				});
			},
			error: function(xhr, textStatus, errorThrown) {
				$albumHolder.html('<p>Woops, something broke so just go <a href="http://www.lastfm.com/si_taggart">here instead if you&rsquo;re that fussed</a>.</p>');
			}
		});   
	}
	lastFMAlbum.getLastfmAlbum(); 

})(jQuery);
