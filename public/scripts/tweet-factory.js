//Create a new "Tweet" <article/> using string literal syntax.
const createTweetElement = function(tweet) {
  let $tweet = `<article class="tweet">
        <div class="tweet-header">
          <div class="author">
            <div class="author-avatar">
              <img src="${escape(tweet.user.avatars)}" alt="Girl in a jacket" width="50" height="50">
            </div>
            <div class="author-name">
              ${escape(tweet.user.name)}
            </div>
          </div>
          <div class="author-handle">
            ${escape(tweet.user.handle)}
          </div>
        </div>
        <div class="tweet-body">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <div class="tweet-footer">
          <div class="tweet-age">
            <p>Posted ${escape(tweetElapsedTime(tweet.created_at))}</p>
          </div>
          <div class="tweet-actions">
            <i class="fas fa-flag fa-xs"></i>
            <i class="fas fa-retweet fa-xs"></i>
            <i class="fas fa-heart fa-xs"></i>
          </div>
        </div>
      </article>`;
  return $tweet;
};