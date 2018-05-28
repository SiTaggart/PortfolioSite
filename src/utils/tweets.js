const getFormattedTweet = tweet => {
  const base_url = 'http://twitter.com/'; // identica: 'http://identi.ca/'
  const hashtag_part = 'search?q=#'; // identica: 'tag/'
  let text = tweet;
  // convert URLs into links
  text = text.replace(
    /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
    function($0, $1, $2) {
      return $1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>';
    }
  );
  // convert protocol-less URLs into links
  text = text.replace(
    /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
    function($0, $1, $2) {
      return $1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>';
    }
  );
  // convert @mentions into follow links
  text = text.replace(/(:\/\/|>)?(@([_a-z0-9\-]+))/gi, function(
    $0,
    $1,
    $2,
    $3
  ) {
    return $1
      ? $0
      : '<a href="' +
          base_url +
          $3 +
          '" title="Follow ' +
          $3 +
          '" target="_blank">@' +
          $3 +
          '</a>';
  });
  // convert #hashtags into tag search links
  text = text.replace(/(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi, function(
    $0,
    $1,
    $2,
    $3
  ) {
    return $1
      ? $0
      : '<a href="' +
          base_url +
          hashtag_part +
          $3 +
          '" title="Search tag: ' +
          $3 +
          '" target="_blank">#' +
          $3 +
          '</a>';
  });
  return text;
};

const getSizeBasedOnLength = tweet => {
  const tweetLength = tweet.length;
  if (tweetLength < 30) {
    return 'larger';
  } else if (tweetLength < 70) {
    return 'large';
  } else if (tweetLength < 90) {
    return 'medium';
  } else if (tweetLength < 120) {
    return 'small';
  } else {
    return 'smaller';
  }
};

export default {
  getFormattedTweet,
  getSizeBasedOnLength
};
