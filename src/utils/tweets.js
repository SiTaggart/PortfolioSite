const getFormattedTweet = tweet => {
  const baseUrl = 'http://twitter.com/'; // identica: 'http://identi.ca/'
  const hashtagPart = 'search?q=#'; // identica: 'tag/'
  let text = tweet;
  // convert URLs into links
  text = text.replace(
    /(>|<a[^<>]+href=["'])?(https?:\/\/([\d-a-z]+\.)+[a-z]{2,5}(\/[\d!#&(),-./?a-z]*[^ !#(),.?])?)/gi,
    ($0, $1, $2) => ($1 ? $0 : `<a href="${$2}" target="_blank">${$2}</a>`)
  );
  // convert protocol-less URLs into links
  text = text.replace(
    /(:\/\/|>)?\b(([\d-a-z]+\.)+[a-z]{2,5}(\/[\d!#&()-./?a-z]*[^ !#(),.?])?)/gi,
    ($0, $1, $2) => ($1 ? $0 : `<a href="http://${$2}">${$2}</a>`)
  );
  // convert @mentions into follow links
  text = text.replace(/(:\/\/|>)?(@([\w-]+))/gi, ($0, $1, $2, $3) => {
    if ($1) {
      return $0;
    }
    return `<a href="${baseUrl}${$3}" title="Follow ${$3}" target="_blank">@${$3}</a>`;
  });
  // convert #hashtags into tag search links
  text = text.replace(/(:\/\/[^ <]*|>)?(#([\w-]+))/gi, ($0, $1, $2, $3) => {
    if ($1) {
      return $0;
    }
    return `<a href="${baseUrl}${hashtagPart}${3}" title="Search tag: ${$3}" target="_blank">#${$3}</a>`;
  });
  return text;
};

const getSizeBasedOnLength = tweet => {
  const tweetLength = tweet.length;
  switch (tweetLength) {
    case tweetLength < 30:
      return 'larger';
    case tweetLength < 70:
      return 'large';
    case tweetLength < 90:
      return 'medium';
    case tweetLength < 120:
      return 'small';
    default:
      return 'smaller';
  }
};

export { getFormattedTweet, getSizeBasedOnLength };
