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
  let charCount = 0;
  count.value = maxTweetLength;


  const validateInput = function(charCount) {
    count.value = maxTweetLength - charCount;
    if (charCount === 0) {
      $("#tweet-btn").attr("disabled", true);
      $(".tweet-error").css("height", 0);
    } else if (charCount > maxTweetLength) {
      $(count).css("color", "red");
      $("#tweet-btn").attr("disabled", true);
      $(".tweet-error").css("height", 50);
    } else {
      $(count).css("color", "black");
      $("#tweet-btn").attr("disabled", false);
      $(".tweet-error").css("height", 0);
    }
  };

  // validateInput(charCount);
  $("#tweet-field").on('input', function() {
    charCount = this.value.length;
    validateInput(charCount);
  });

  validateInput(0);
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

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let $tweet = ` <article class="tweet">
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
            <p>${escape(tweet.created_at)}</p>
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


