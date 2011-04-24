/* Author: Simon Taggart

*/ 
function portfolio() {
	  
	this.getTweets = function(){ 
		var $tweetHolder = $('.feature-social .tweet p');
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql?q=USE%20%22http%3A%2F%2Fwww.simontaggart.com%2Fcommon%2Fxml%2Ftwitter.timeline.xml%22%20AS%20twitter%3B%20SELECT%20*%20FROM%20twitter(1)%20where%20screen_name%3D%22SiTaggart%22%20limit%201%3B&format=json&diagnostics=true }',
			type: 'GET',
			dataType: 'jsonp',
			success: function(data, textStatus, xhr) {
				$tweetHolder.html(data.query.results.statuses.status.text);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(errorThrown);
				$tweetHolder.html('Woops, something broke so just go <a href="http://www.twitter.com/SiTaggart">here instead if you&rsquo;re that fussed</a>.');
			}
		});
	}
	this.getLastfmAlbum = function(){
		var mbid,
			$albumHolder = $('.feature-social .album'),
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
					$albumHolder.append('<p>Woops, can&rsquo;t find that album on Last Fm <a href="http://www.lastfm.com/si_taggart">go here instead if you&rsquo;re that fussed</a>.</p>');
					return;
				};
		    	$.ajax({
				  	url: 'http://query.yahooapis.com/v1/public/yql?q=USE%20%22http%3A%2F%2Fwww.simontaggart.com%2Fcommon%2Fxml%2Flastfm.albuminfo.xml%22%20AS%20lastfm%3B%20SELECT%20*%20FROM%20lastfm%20where%20api_key%3D%22fd37cceba5468d6c57c10847105dd889%22%20and%20mbid%3D%22'+mbid+'%22%3B&format=json&diagnostics=true }',
				  	type: 'GET',
				  	dataType: 'jsonp',
				  	success: function(data, textStatus, xhr) {
				    	$imgHolder.attr('src', data.query.results.lfm.album.image[2].content);
						$albumHolder.append($imgHolder);
						$albumLink.attr('href', data.query.results.lfm.album.url);
						$imgHolder.wrap($albumLink);
				  	},
				  	error: function(xhr, textStatus, errorThrown) {
				    	$albumHolder.append('<p>Woops, something broke so just go <a href="http://www.lastfm.com/si_taggart">here instead if you&rsquo;re that fussed</a>.</p>');
				  	}
				});
		  	},
		  	error: function(xhr, textStatus, errorThrown) {
		    	$albumHolder.append('<p>Woops, something broke so just go <a href="http://www.lastfm.com/si_taggart">here instead if you&rsquo;re that fussed</a>.</p>');
		  	}
		});		
	}
	this.getLatestPhoto = function(){
		var $photoHolder = $('.feature-social .pic ul');
		$.ajax({
			url: "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20flickr.people.publicphotos(0%2C6)%20WHERE%20user_id%3D'51539284%40N00'%20AND%20extras%3D'url_sq'&format=json&diagnostics=true",
			type: 'GET',
			dataType: 'jsonp',
		  	success: function(data, textStatus, xhr) {
		    	for (var i=0; i < data.query.results.photo.length; i++) {
					var pic = $('<img />').attr('src', data.query.results.photo[i].url_sq),
						listItem = $('<li />').append(pic);
					$photoHolder.append(listItem);
				};
		  	},
		  	error: function(xhr, textStatus, errorThrown) {
		    	$photoHolder.html('Woops, something broke so just go <a href="http://www.flickr.com/photos/simontaggart/">here instead if you&rsquo;re that fussed</a>.');
		  	}
		});
	}
	this.killFOUT = function() {
		WebFont.load({
			typekit: {
				id: 'ecr4fxx'
			}
		});
	}
	this.addSomeCSS3ForIE = function() {
		$('section:first-child').addClass('first-child');
		$('section:last-child').addClass('last-child');
	}
	this.drawSkills = function() {
		//Stolen and a bit hacked around with from here http://raphaeljs.com/pie.js
		Raphael.fn.pieChart = function (cx, cy, r, datatable, stroke) {
		    var paper = this,
		        rad = Math.PI / 180,
		        chart = this.set(),
				values = [],
	            labels = [];
	        $(datatable).find("tbody tr").each(function () {
	            values.push(parseInt($("td", this).text(), 10));
	            labels.push($("th", this).text());
	        });
		    function sector(cx, cy, r, startAngle, endAngle, params) {
		        var x1 = cx + r * Math.cos(-startAngle * rad),
		            x2 = cx + r * Math.cos(-endAngle * rad),
		            y1 = cy + r * Math.sin(-startAngle * rad),
		            y2 = cy + r * Math.sin(-endAngle * rad);
		        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
		    }
		    var angle = 0,
		        total = 0,
		        start = .400,
		        process = function (j) {
		            var value = values[j],
		                angleplus = 360 * value / total,
		                popangle = angle + (angleplus / 2),
		                color = "hsb(" + start + ", .2, .7)",
		                ms = 500,
		                delta = 30,
		                bcolor = "hsb(" + start + ", .2, 1)",
		                p = sector(cx, cy, r, angle, angle + angleplus, {gradient: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 2}),
		                txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-family": 'Fontin-Sans, Arial', "font-size": "20px"});
		            p.mouseover(function () {
		                p.animate({scale: [1.1, 1.1, cx, cy]}, ms, "backOut");
						$(datatable).find("tbody tr").eq(j).addClass('selected');
		            }).mouseout(function () {
		                p.animate({scale: [1, 1, cx, cy]}, ms, "backOut");
						$(datatable).find("tbody tr").eq(j).removeClass('selected');
		            });
		            angle += angleplus;
		            chart.push(p);
		            chart.push(txt);
		            start += .1;
		        };
		    for (var i = 0, ii = values.length; i < ii; i++) {
		        total += values[i];
		    }
		    for (var i = 0; i < ii; i++) {
		        process(i);
		    }
		    return chart;
		};
		(function (raphael) {
		    $(function () {
		        raphael("skills", 380, 380).pieChart(190, 190, 170, $("#skills-table"), "#fff");
				raphael("tools", 380, 380).pieChart(190, 190, 170, $("#tools-table"), "#fff");
		    });
		})(Raphael.ninja());
	}
	this.init = function(){ 
		var obj = this; 
		obj.getTweets(); 
		obj.getLastfmAlbum();
		obj.getLatestPhoto();
		obj.killFOUT();
		obj.addSomeCSS3ForIE();
		obj.drawSkills();
	}
	this.init(); 
} 

$(document).ready(function() { 
	portfolio();
});

























