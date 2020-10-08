const ROOT_URL = "http://localhost:8080/";
const DateTime = luxon.DateTime;
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $("#top-toggle").on("click", function() {
    $(".compose").toggle("fast", function() {
    });
  });

  $("#bottom-toggle").on("click", function() {
    $(".compose").css("display", "block");
    var position = $("#main").offset().top;
    $("body, html").animate({
      scrollTop: position
    });
  });

  $("#tweet-btn").attr("disabled", true);
  $("#tweet-form").submit(event => {
    event.preventDefault();
    var str = $("#tweet-form").serialize();
    $.post({ url: `${ROOT_URL}tweets/` }, str)
      .then((res) => {
        renderTweets(dbData());
      })
      .then((res) => {
        validateInput(0);
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
    $(".tweets .history").empty();
    for (const key in tweets) {
      const tweet = tweets[key];
      const tweetToRender = createTweetElement(tweet);
      $(".tweets .history").append(tweetToRender);
    }
  };

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const tweetElapsedTime = function(jsDate) {
    let result = "";
    let posted = DateTime.fromMillis(jsDate);
    let now = DateTime.fromMillis(Date.now());
    let elapsedTimeObject = now.diff(posted, ['days', 'hours', 'minutes']);
    let daysElapsed = elapsedTimeObject.values.days;
    if (daysElapsed > 5) {
      result = posted.toLocaleString();
    } else if (daysElapsed > 1 && daysElapsed < 5) {
      result = "a few days ago";
    } else {
      result = "recently";
    }
    return result;
  };

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

  renderTweets(dbData());
});


