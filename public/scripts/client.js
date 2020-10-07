const maxTweetLength = 140;
const count = document.querySelector("#count");
const $tweetContainer = document.querySelector(".tweet-container");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const ROOT_URL = "http://localhost:8080/";
  count.value = maxTweetLength;
  $("#tweet-text").on('input', function() {
    let charCount = this.value.length;
    count.value = maxTweetLength - charCount;
    if (charCount > maxTweetLength) {
      $(count).css("color", "red");
    } else {
      $(count).css("color", "black");
    }
  });

  $("#tweet-form").submit(event => {
    event.preventDefault();
    var str = $("#tweet-form").serialize();
    $.post({ url: `${ROOT_URL}tweets/` }, str)
      .then((res) => {
        renderTweets(dbData());
      })
      .fail((err) => {
        console.log("Error retieving tweets");
      });
  });


  const dbData = function() {
    $.ajax({ url: `${ROOT_URL}tweets/` })
      .then((res) => {
        renderTweets(res);
      })
      .fail((err) => {
        console.log("Error retieving tweets");
      });
  };


  const renderTweets = function(tweets) {
    $("#tweet-field").val("");
    $(".tweet-container").empty();
    for (const key in tweets) {
      const tweet = tweets[key];
      const tweetToRender = createTweetElement(tweet);
      $(".tweet-container").append(tweetToRender);
    }
  };



  const createTweetElement = function(tweet) {
    let $tweet = ` <article class="tweet">
        <div class="tweet-header">
          <div class="author">
            <div class="author-avatar">
              <img src="${tweet.user.avatars}" alt="Girl in a jacket" width="50" height="50">
            </div>
            <div class="author-name">
              ${tweet.user.name}
            </div>
          </div>
          <div class="author-handle">
            ${tweet.user.handle}
          </div>
        </div>
        <div class="tweet-body">
          <p>${tweet.content.text}</p>
        </div>
        <div class="tweet-footer">
          <div class="tweet-age">
            <p>${tweet.created_at}</p>
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

  renderTweets(dbData());
});


