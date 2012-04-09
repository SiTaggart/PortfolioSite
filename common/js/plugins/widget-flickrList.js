if (!window.st) window.st = {};
var st = window.st;

(function($) {
    st.flickrList = {
        init: function() {
            var $flickrWidget = $('.widget-flickr'),
                $flickrList = $('<ul />', { 'class': 'flickr-list'}),
                accountID = $flickrWidget.data('flickr-account'),
                pictureLimit = $flickrWidget.data('picture-limit');
            
            $flickrWidget.append($flickrList).find('p').remove();        

            $flickrList.jflickrfeed({
                limit: pictureLimit,
                qstrings: {
                    id: accountID
                },
                itemTemplate: '<li><figure class="deco-image"><a href="{{link}}" target="_blank"><img src="{{image_m}}" alt="{{title}}" /></a><figure></li>'
            }, function(data) {
                $flickrList.addClass('flickr-list-loaded');
            });
        }
    }
    st.flickrList.init();
})(jQuery);